<template>
  <div
    v-if="showToast"
    id="askPrice"
    :class="{'mask-top':showSimilarToast && showList}">
    <!-- 询价弹框 -->
    <mip-fixed
      v-if="showToast && showAskToast"
      id="callmask"
      class="callMask"
      type="top"
      still
      @click="hideMask">
      <div
        id="askPrice"
        class="enquiryContent" >
        <span class="leaveContact">提交询价，立即获取最低报价</span>
        <span class="car-price-current">本车可议价，当前报价{{ carPrice }}万元</span>
        <div class="input-box">
          <mip-form>
            <input
              id="telInput"
              :value="telValue"
              class="enquiryTel"
              type="tel"
              validatetype="phone"
              maxlength="11"
              placeholder="请输入手机号"
              @input="enquiryInput"
              @focus="focusInput">
          </mip-form>
          <!-- <mip-img
            class="close"
            src="//s4.xinstatic.com/m/img/smallprogram/close.png"
            @click="clearTel" /> -->
        </div>
        <div
          v-if="remain"
          class="remain-correct-tel">{{ reminMessage }}</div>
        <div class="tel-submit-query">
          <div
            v-if="!info.isLogin"
            class="bd-auth"
            @click="authMessage">
            <!-- <input type="checkbox" :value="baAuth" checkedid="bdAuth">  -->
            <mip-img
              v-if="baAuth"
              class="auth-icon "
              src="//c2.xinstatic.com/f3/20180803/1517/5b64017eea4a3722229.png"/>
            <mip-img
              v-if="!baAuth"
              class="auth-icon "
              src="//c2.xinstatic.com/f3/20180803/1517/5b6401764c164734049.png"/>
            <label
              for="bdAuth"
              class="auth-font">登陆百度账号，第一时间了解订单状态</label>
          </div>
          <button
            v-if="!info.isLogin && baAuth && telCorrect"
            :style="{'margin-top':authBottom}"
            class="enquiryBtn tel-submit"
            on="tap:customlog.login">获取底价</button>
          <button
            v-else
            :style="{'margin-top':authBottom}"
            class="enquiryBtn tel-submit"
            @click="queryClick">获取底价</button>
        </div>
      </div>
    </mip-fixed>
    <!-- 相似推荐弹框 -->
    <mip-fixed
      v-if="showToast && showSimilarToast"
      id="callmaskSimilar"
      type="top"
      class="callMask"
      still
      @click="hideMask">
      <div
        id="similarToast"
        class="askprice-success-box">
        <div class="ask-price-success">
          <mip-img
            class="askprice-success-boximg"
            src="//c2.xinstatic.com/f3/20180717/1102/5b4d5c379c451177647.png"/>
          <span class="askprice-success-font">询价成功</span>
        </div>
      </div>
      <div
        v-if="showList && carList.length > 0"
        style="border-top: 0.12rem solid rgba(246, 246, 249, 1);">
        <div class="similar-recommend-title">
          <span>
            为您推荐相似车源，一键询价，秒知底价
          </span>
        </div>
        <div style="max-height: 5rem;overflow: scroll;background: #fff;">
          <div
            v-for="(item, index) in carList"
            :key="index"
            class="similar-recommend-scroll">
            <div
              id="similarRecommend"
              :class="{'carcontent-bottom-scroll': index != carList.length-1}"
              class="carcontent-scroll">
              <mip-img
                :src=" item.pic"
                class="image-scroll"
                style="margin-left: 0.3rem; margin-right: 0.27rem;"/>
              <div class="contentright-scroll">
                <div class="righttop-scroll">
                  <span class="carname-scroll">{{ item.carname }} </span>
                  <div class="priceint-scroll">
                    <span class="carbday-scroll">{{ item.regist_date }}年 / {{ item.mileage }}公里</span>
                  </div>
                  <div class="pricedetail-scroll">
                    <span class="similar-recommend-price-scroll">{{ item.panel_price }}万元</span>
                    <span class="similar-recommend-monthprice-scroll">首付{{ item.show_price }}万</span>
                    <div
                      v-if="item.isAsk && item.enquiry_status == 1"
                      class="pricedetail-div-scroll"
                      @click="askPriceOne(index)">一键询价</div>
                    <div
                      v-if="!item.isAsk && item.enquiry_status == 1"
                      class="asked-price-scroll">已询价</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </mip-fixed>
  </div>
</template>
<script>
import { requestFun } from '../../common/utils/reqUtils'
import { clickPoint } from '../../common/utils/stastic.js'
import {
  getLocalStorage,
  getCarId,
  setLocalStorage
} from '../../common/utils/utils.js'
const pid = '/pages/detail'
export default {
  props: {
    carPrice: {
      type: String,
      default: '0'
    },
    isDirect: {
      type: Number,
      default: 0
    },
    cityMessage: {
      type: String,
      default: ''
    },
    showToast: {
      type: String,
      default: ''
    }
    // info: {
    //   type: Object,
    //   default: function () {
    //     return {}
    //   }
    // }
  },
  // props: ['carPrice', 'isDirect', 'cityMessage', 'showToast', 'info'],
  data () {
    return {
      showAskToast: true, // 询价弹框
      showSimilarToast: false, // 相似推荐弹框
      telValue: '', // 电话
      telCorrect: false, // 电话是否正确
      carList: [], // 车源列表
      remain: false, // 电话错误提示
      reminMessage: '请输入正确的手机号', // 提示信息
      showList: true,
      baAuth: true, // 是否允许授权标志
      // currentLocation: "",
      // showAuth: true, //是否显示授权
      authBottom: '0.2rem', // 按钮样式
      info: {}
    }
  },
  mounted () {
    this.info = MIP.getData('info')
    this.telValue = getLocalStorage('phoneAskNumber')
    if (this.telValue) {
      this.telCorrect = true
    }
    this.$on('clientLogin', event => {
      // 这里可以输出登录之后的数据
      // 获取用户信息
      // event.userInfo;
      // 后端交互会话标识
      // event.sessionId;
      if (event.userInfo && window.location.href.indexOf('code=') > 0 && window.location.href.indexOf('state=') > 0) {
        console.log('授权成功')
      }
    })
    // 自定义exit事件
    this.$on('clientLogout', event => {
      console.log('登出了')
    })
    if (window.location.href.indexOf('code=') > 0 && window.location.href.indexOf('state=') > 0) {
      this.bottomPrice()
      this.showAskToast = false
      this.showSimilarToast = true
    }
  },
  beforeUpdate () {
    this.info = MIP.getData('info')
    this.authBottom = this.info.isLogin ? '0.4rem' : '0.2rem'
  },
  updated () {
    if (document.querySelector('#askPrice')) {
      document
        .querySelector('#askPrice')
        .addEventListener('touchmove', function (e) {
          if (
            e.target.className.indexOf('-scroll') < 0 &&
            e.target.parentNode.className.indexOf('-scroll') < 0
          ) {
            e.preventDefault()
          }
        })
    }
  },
  methods: {
    authMessage () {
      this.baAuth = !this.baAuth
    },
    hideMask (e) {
      if (e.target.id === 'callmask' || e.target.id === 'callmaskSimilar') {
        this.$emit('closeToast')
        this.showAskToast = true
        this.showSimilarToast = false
      }
    },
    focusInput () {
      this.$emit('hiddenButton')
    },
    enquiryInput (e) {
      this.telValue = e.target.value
      if (
        this.telValue &&
        this.telValue.length === 11 &&
        /^1[3|4|6|7|5|8][0-9]\d{4,8}$/.test(this.telValue)
      ) {
        this.telCorrect = true
        // 存储手机号用于授权成功后调用
        setLocalStorage('phoneNumber', this.telValue)
        this.remain = false
      } else if (this.telValue.length !== 11) {
        this.telCorrect = false
      }
    },
    clearTel () {
      this.telValue = ''
      this.telCorrect = false
    },
    // 询底价接口
    bottomPrice () {
      this.remain = false
      let param = {
        // type: "enquiry",
        carid: getCarId(),
        mobile: this.telValue || getLocalStorage('phoneNumber'),
        cityid: JSON.parse(this.cityMessage).cityid
      }
      requestFun('/apis/enquiry/add_enquiry', {
        method: 'POST',
        param: param
      })
        .then(res => {
          if (res.reco) {
            this.carList = res.reco
            this.carList.map((item, index) => {
              item.isAsk = true
            })
            this.showList = true
            this.showAskToast = false
            this.showSimilarToast = true
            // 询底价成功后存储询底价成功的号码
            setLocalStorage(
              'phoneAskNumber',
              this.telValue || getLocalStorage('phoneNumber')
            )
            // 页面无刷新跳转时需要再次赋值
            this.telValue = getLocalStorage('phoneAskNumber')
            if (this.telValue) {
              this.telCorrect = true
            }
          } else {
            this.showList = false
            this.showAskToast = false
            this.showSimilarToast = true
          }
        })
        .catch(err => {
          if (err.error_code === 412) {
            this.remain = true
            this.reminMessage = '30秒内不能重复提交'
          }
        })
      clickPoint(
        'bottomprice_submit_vehicle_details',
        {
          carid: getCarId(),
          type: this.isDirect,
          tel_num: this.telValue
        },
        null,
        {
          pid: pid
        }
      )
    },
    // 询底价
    queryClick () {
      if (!this.telCorrect) {
        this.remain = true
        this.reminMessage = '请输入正确的手机号'
        return
      }
      this.bottomPrice()
    },
    // 一键询价
    askPriceOne (index) {
      let param = {
        // type: "enquiry",
        carid: getCarId(),
        mobile: this.telValue,
        cityid: JSON.parse(this.cityMessage).cityid
      }
      let that = this
      requestFun('/apis/enquiry/add_enquiry_one_key', {
        method: 'POST',
        param: param
      })
        .then(res => {
          that.carList[index].isAsk = false
          // Object.assign(that.carList[index], { isAsk: false });
          // 深层对象的更新需要使用$set api
          that.$set(that.carList, index, that.carList[index])
        })
        .catch(err => {
          console.log(err)
        })
      clickPoint('inquiry_price_detail', { carid: getCarId() }, null, {
        pid: pid
      })
    }
  }
}
</script>
<style scoped>
.auth-icon {
  margin-right: 0.08rem;
  height: 0.26rem;
  width: 0.26rem;
}
.callMask {
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999 !important;
  top: 0.8rem;
}
.ask-price-success {
  display: flex;
  align-items: center;
}
.mask-top {
  max-height: 9rem;
}
.enquiryContent {
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #ffffff;
}

.leaveContact {
  height: 0.8rem;
  font-size: 0.28rem;
  font-size: 0.4rem;
  font-family: PingFangSC-Medium;
  color: rgba(51, 51, 51, 1);
  margin-left: 0.5rem;
  margin-top: 0.25rem;
  line-height: 0.36rem;
  font-weight: bold;
}

.car-price-current {
  font-size: 0.26rem;
  font-family: PingFangSC-Regular;
  color: rgba(153, 153, 153, 1);
  margin-left: 0.5rem;
}

.enquiryTel {
  font-size: 0.28rem;
  color: #585858;
  line-height: 0.4rem;
  width: 5.2rem;
  height: 1rem;
  background: rgba(245, 245, 245, 1);
  border: none;
  padding-left: 0.3rem;
  padding-right: 1rem;
  outline: none;
}

.clear-input {
  height: 1rem;
  margin-left: 4rem;
}

.input-box {
  height: 0.88rem;
  color: #1b1b1b;
  border-radius: 0.06rem;
  margin-top: 0.4rem;
  text-align: center;
}

.close {
  width: 0.3rem;
  height: 0.3rem;
  position: absolute;
  left: 6.5rem;
  top: 2.1rem;
}
.enquiryBtn {
  width: 6.5rem;
  height: 0.88rem;
  background-color: #cccccc;
  border-radius: 0.05rem;
  font-size: 0.28rem;
  color: #ffffff;
  line-height: 0.88rem;
  border: none;
}

.tel-submit {
  /* background-color: #f85c00; */
  background: linear-gradient(to right, #fc981b, #f65e02);
}
.bd-auth {
  display: flex;
  justify-content: baseline;
  align-items: center;
  padding-top: 0.3rem;
  padding-left: 0.5rem;
}
.auth-font {
  font-size: 0.26rem;
  font-family: PingFangSC-Regular;
  color: rgba(153, 153, 153, 1);
}
.remain-correct-tel {
  color: #ff5a37;
  margin-left: 0.5rem;
  margin-top: 0.2rem;
}
.tel-submit-query {
  text-align: center;
  padding-bottom: 0.3rem;
}

.askprice-success-box {
  background: rgba(255, 255, 255, 1);
  line-height: 1.62rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.askprice-success-boximg {
  width: 0.62rem;
  height: 0.62rem;
}

.askprice-success-font {
  font-size: 0.36rem;
  font-family: PingFangSC-Medium;
  color: rgba(27, 27, 27, 1);
}
.askprice-focus-xiongzhang {
  font-size: 0.26rem;
  font-family: PingFangSC-Regular;
  color: rgba(153, 153, 153, 1);
  line-height: 0.26rem;
}
.askprice-focus {
  font-size: 0.26rem;
  line-height: 0.26rem;
  border: 0.01rem solid rgba(248, 93, 0, 1);
  padding: 0.15rem 0.4rem;
  display: flex;
  font-family: PingFangSC-Regular;
  color: rgba(248, 93, 0, 1);
  border-radius: 0.05rem;
  margin-top: 0.24rem;
  margin-bottom: 0.3rem;
}
.askprice-focus strong {
  font-size: 0.4rem;
  line-height: 0.2rem;
}
.similar-recommend-title {
  background: rgba(255, 255, 255, 1);
  padding-top: 0.3rem;
  padding-bottom: 0.3rem;
  padding-left: 0.3rem;
  border-bottom: 0.01rem solid rgba(246, 246, 249, 1);
}

.similar-recommend-title span {
  font-size: 0.28rem;
  font-family: PingFangSC-Regular;
  color: rgba(51, 51, 51, 1);
}

.similar-recommend-scroll {
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 1);
  padding-bottom: 0.3rem;
}

.carcontent-scroll {
  margin-top: 0.31rem;
  /* height: 280px; */
  display: flex;
  /**border-color: #f9f9f9;**/
  border-bottom-width: 0.1rem;
  padding-bottom: 0.2rem;
}
.carcontent-bottom-scroll {
  border: solid rgba(246, 246, 249, 1);
  border-width: 0 0 0.01rem 0;
}
/* .contentleft img {
  width: 2.56rem;
  height: 1.7rem;
  margin-left: 0.3rem;
  margin-right: 0.27rem;
} */

.carpic {
  /* height: 1.6rem; */
}

.contentright-scroll {
  display: flex;
  flex-direction: column;
  margin-right: 0.2rem;
}

.righttop-scroll {
  margin-top: -0.04rem;
  width: 100%;
  height: 1.8rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.carname-scroll {
  text-overflow: ellipsis;
  font-size: 0.28rem;
  font-family: PingFangSC-Regular;
  color: rgba(27, 27, 27, 1);
}

.priceint-scroll {
  width: 3.9rem;
  padding-right: 0.47rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.overprice {
  width: 0.54rem;
  font-size: 0.18rem;
  color: #ffffff;
  border-radius: 0.02rem;
  text-align: center;
}

.carbday-scroll {
  font-size: 0.2rem;
  font-family: PingFangSC-Regular;
  color: rgba(153, 153, 153, 1);
}

.carprice {
  font-size: 0.28rem;
  color: #f85d00;
  font-weight: normal;
  margin-right: 0.06rem;
}

.pricedetail-scroll {
  margin-top: 0.05rem;
  height: 0.3rem;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}

.pricedetail-div-scroll {
  border-radius: 0.03rem;
  border: 0.01rem solid rgba(255, 90, 55, 1);
  font-size: 0.24rem;
  font-family: PingFangSC-Regular;
  color: rgba(255, 90, 55, 1);
  width: 1.22rem;
  height: 0.46rem;
  text-align: center;
  line-height: 0.46rem;
  margin-left: 0.2rem;
  margin-right: 0.2rem;
}
.asked-price-scroll {
  border-radius: 0.03rem;
  border: 0.01rem solid #e5e5e5;
  font-size: 0.24rem;
  font-family: PingFangSC-Regular;
  width: 1.22rem;
  height: 0.46rem;
  text-align: center;
  line-height: 0.46rem;
  margin-left: 0.2rem;
  margin-right: 0.2rem;
  background-color: #e5e5e5;
  color: #aaa;
}
.similar-recommend-price-scroll {
  font-size: 0.28rem;
  font-family: PingFangSC-Medium;
  color: rgba(248, 93, 0, 1);
  line-height: 0.3rem;
}

.similar-recommend-monthprice-scroll {
  font-size: 0.24rem;
  font-family: PingFangSC-Regular;
  color: rgba(248, 93, 0, 1);
  margin-left: 0.08rem;
}
</style>
