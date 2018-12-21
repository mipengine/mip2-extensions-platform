<template>
  <div class="s4s-page">
    <div class="s4s-body">
      <div class="s4s-car-info">
        <div class="s4s-car-model">
          <span class="s4s-car-name">{{ provice + car_no || '-' }}</span>
          <span
            class="s4s-car-change"
            on="tap:info.login"
            @click="gotoForm">更换爱车</span>
          <a
            ref="car"
            data-type="mip"
            href="car.html"/>
          <a
            ref="pay1"
            data-type="mip"
            href="pay1.html"/>
        </div>
        <div
          class="s4s-car-illegal"
          style="color:#666;" >共有未处理违章
          <span>{{ illegal.total || 0 }} </span>条，扣
          <span>{{ illegal.degree || 0 }} </span>分，罚款
          <span>{{ illegal.fine || 0 }} </span>元。
        </div>
      </div>
      <div class="s4s-title">违章记录</div>
      <div v-if="!!lists&&lists.length" >
        <div
          v-for="list in lists"
          :key="list"
          class="s4s-illegal-item" >
          <div class="s4s-illegal-list-body">
            <div class="s4s-illegal-hd">
              <span class="s4s-illegal-addr"><mip-img
                src="https://s4s-imges.oss-cn-hangzhou.aliyuncs.com/xiongzhang/position.png"
                style="margin-right:.07rem;vertical-align: -.02rem;"
                width="10"
                height="14" />{{ list.Address || '未知' }}</span>
            </div>
            <div class="s4s-illegal-bd">
              <div class="s4s-illegal-bd-number"> 扣
                <span class="s4s-origin">{{ list.Point || 0 }}</span>分  罚款
                <span class="s4s-origin">{{ list.Fine || 0 }}</span>元
              </div>
              <div class="s4s-illegal-bd-txt" >{{ list.Reason || '未知' }}</div>
              <span class="s4s-illegal-bd-txt" >{{ list.OccTime || '' }}</span>
            </div>
            <div
              v-if="list.ProcessStatus == 1"
              class="s4s-illegal-btn"
              on="tap:info.login"
              @click="gotoTicketPay(list)">
              <span>立即办理</span>
            </div>
            <div
              v-if="list.ProcessStatus != 1"
              class="s4s-illegal-btn disable-btn" >
              <!-- <span>不可办理</span> -->
              <span style="padding-right:0;">暂不支持处理该类型的违章</span>
            </div>
          </div>
        </div>
      </div>
      <div
        v-show="!lists.length"
        class="s4s-empty">
        <mip-img
          src="https://s4s-imges.oss-cn-hangzhou.aliyuncs.com/xiongzhang/empty.png"
          style="width:60%;margin: .4rem auto;"/>
      </div>
      <div
        v-if="detail"
        class="s4s-mask"
        @click="closeMake"/>

      <mip-fixed type="top">
        <div
          v-show="showCaptcha"
          class="captcha"
        >
          <div
            class="s4s-mask"
          />
          <div class="captcha-container">
            <div class="captcha-title">请输入验证码</div>
            <mip-img
              :src="captchUrl"
              width="272"
              height="90"
              @click="getCaptcha"/>
            <p
              class="captcha-change"
              @click="getCaptcha">看不清？换一张</p>
            <div
              class="captcha-input-container">
              <div
                v-for="item in captchValue"
                :key="item"
                class="captcha-input" >
                {{ item||'' }}
              </div>
            </div>
            <div class="captcha-keyboard">
              <div
                v-for="item in captchKeyArray"
                :key="item"
                class="captcha-key-list" >
                <button
                  v-for="ele in item"
                  :key="ele"
                  class="captcha-key"
                  @click="onInputCaptcha(ele)">
                  {{ ele }}
                </button>
              </div>
              <div class="captcha-key-list">
                <div class="captcha-key  captcha-key-disable">
                  {{ '' }}
                </div>
                <button
                  class="captcha-key"
                  @click="onInputCaptcha(0)">
                  0
                </button>
                <button
                  class="captcha-key"
                  @click="onInputCaptcha('←')">
                  ←
                </button>
              </div>
            </div>
            <!-- <div
              class="captch-btn"
              @click="captchReady" >确定</div> -->
          </div>
        </div>
      </mip-fixed>
    </div>
  </div>
</template>

<script>
import util from '../../common/util'

export default {
  props: {
    globalData: {
      type: Object,
      default () {
        return {}
      },
      required: true
    }
  },
  data () {
    return {
      provice: '省',
      proviceShow: false,
      detail: false,
      src: '',
      user: {},
      illegal: {},
      code: 1,
      lists: [],
      car_no: '',
      engine: '',
      vin: '',
      car: null,
      driveUrl: '',
      showProvice: false,
      car_type: '',
      system: {},
      needCaptcha: false,
      captchKey: '',
      showCaptcha: false,
      captchValue: ['', '', '', ''],
      captchKeyArray: [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
      captchUrl: ''
    }
  },
  watch: {
  },
  prerenderAllowed () {
    return true
  },
  mounted () {
    this.$on('customError', event => {
      // window.localStorage.clear()
      util.toast('登陆失败')
      // this.$emit('loginAgain')
      // this.$refs.index.click()
    })

    if (!this.globalData.car_no && this.getQueryString('carno')) {
      console.log('url模式')
      this.globalData.car_no = this.getQueryString('carno').slice(1)
      this.globalData.provice = this.getQueryString('carno').slice(0, 1)
      this.globalData.vin = this.getQueryString('vin')
      this.globalData.engine = this.getQueryString('engine')
      this.globalData.car_type = this.getQueryString('car_type')
    }
    if (this.globalData.car_no) {
      try {
        window.localStorage.setItem('violationData', JSON.stringify(this.globalData))
      } catch (error) {
        util.toast('由于您处在无痕模式，不能存储您当前的记录')
      }
    } else {
      try {
        console.log('cache模式')
        let globalData = window.localStorage.getItem('violationData')
        if (globalData && JSON.parse(globalData)) {
          this.globalData = JSON.parse(globalData)
        }
      } catch (error) {
        util.toast('由于您处在无痕模式，不能载入您之前输入的记录')
      }
    }
    this.provice = this.globalData.provice
    this.car_no = this.globalData.car_no
    this.engine = this.globalData.engine
    this.vin = this.globalData.vin
    this.car_type = this.globalData.car_type
    if (this.globalData.channel) {
      window.localStorage.channel = this.$route.query.channel
    } else {
      window.localStorage.channel = ''
    }
    this.getIllegal(
      null,
      this.globalData.provice + this.globalData.car_no,
      this.globalData.vin,
      this.globalData.engine
    )

    const that = this
    this.$on('search', function () {
      that.getIllegal(
        null,
        that.globalData.provice + that.globalData.car_no,
        that.globalData.vin,
        that.globalData.engine
      )
    })
  },
  methods: {
    // 删除按键逻辑 删除前一位  2 3 4 格有效。
    captchDelete (index, value) {
      switch (index) {
        case 1:
          break
        case 2:
          if (this.captchValue2 === '') {
            this['captchValue1'] = ''
            setTimeout(() => { this.$refs['captchValue1'].focus() }, 0)
          }
          break
        case 3:
          if (this.captchValue3 === '') {
            this['captchValue2'] = ''
            setTimeout(() => { this.$refs['captchValue2'].focus() }, 0)
          }
          break
        case 4:
          if (this.captchValue4 === '') {
            this['captchValue3'] = ''
            setTimeout(() => { this.$refs['captchValue3'].focus() }, 0)
          }
          break
        default:
          break
      }
    },
    captchReady () {
      this.getIllegal(
        null,
        this.globalData.provice + this.globalData.car_no,
        this.globalData.vin,
        this.globalData.engine
      )
    },
    getCaptcha () {
      const that = this
      util.fetchData('v3/captcha', {
        width: 180,
        height: 80,
        cap_len: 4,
        dot_count: 80,
        skew: 1
      }).then(res => {
        if (res.code === 0) {
          that.captchKey = res.data.key
          that.captchUrl = res.data.image
          that.captchValue = ['', '', '', '']
        } else {
          util.toast(res.msg)
        }
      })
    },
    closeCaptch () {
      this.showCaptcha = false
    },
    onInputCaptcha (value) {
      let arr = [...this.captchValue]
      let index = 3
      if (value === '←') {
        let array = [...this.captchValue].join('')
        arr = array.substring(0, array.length - 1).split('')
        arr.length = 4
      } else {
        if (this.captchValue[3]) {
          return
        }
        if (!this.captchValue[0]) {
          index = 0
        } else if (!this.captchValue[1]) {
          index = 1
        } else if (!this.captchValue[2]) {
          index = 2
        } else if (!this.captchValue[3]) {
          index = 3
        }
        arr[index] = value + ''
      }
      this.captchValue = arr
      if (arr[3]) {
        this.captchReady()
      }
    },
    getQueryString (name) {
      let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
      let r = window.location.search.substr(1).match(reg)
      if (r != null) return decodeURIComponent(r[2])
      return null
    },
    closeMake () {
      this.detail = false
    },
    gotoTicketPay (item) {
      MIP.setData({
        '#payCarData': item
      })
      // MIP.viewer.open("pay1.html");
      this.$refs.pay1.click()
    },
    // 获取违章
    getIllegal (formid, carNo, vin, engine) {
      this.showCaptcha = false
      let self = this
      let param = {
        car_no: carNo ? carNo.toUpperCase() : '',
        vin: vin ? vin.toUpperCase() : '',
        engine: engine ? engine.toUpperCase() : '',
        car_type: this.globalData.car_type
      }

      if (this.needCaptcha) {
        param.key = this.captchKey
        param.value = this.captchValue.join('')
      }
      // car_no车牌号，vin车架号，engion发动机，{car_no: 陕KC1166 vin: LSVNJ49J472028756 engine: 020297
      util
        .fetchData('v3/violation/web/query', param)
        .then(res => {
          // res.code = 90027
          if (res.code === 90027) {
            self.getCaptcha()
            util.toast(res.msg || '需要填写验证码')
            self.needCaptcha = true
            self.showCaptcha = true
          } else if (res.code === 0 && res.data) {
            self.needCaptcha = false
            let newList = []
            if (res.data.Records && res.data.Records.length > 0) {
              res.data.Records.forEach(function (item) {
                newList.push({
                  OccTime: item.OccTime,
                  Address: item.Address,
                  Reason: item.Reason,
                  Fine: item.Fine,
                  Status: item.Status,
                  Point: item.Point,
                  ViolationCode: item.ViolationCode,
                  ViolationWritNo: item.ViolationWritNo,
                  Category: item.Category,
                  Locationid: item.Locationid,
                  LocationName: item.LocationName,
                  Free: item.Free,
                  CooperFree: item.CooperFree,
                  ProcessStatus: item.ProcessStatus,
                  ProcessMsg: item.ProcessMsg,
                  ExecutePoint: item.ExecutePoint,
                  FreeCode: item.FreeCode,
                  FreeRule: item.FreeRule,
                  FreeRuleObject: item.FreeRuleObject || {},
                  ViolationId: item.ViolationId,
                  car_no: carNo ? carNo.toUpperCase() : '',
                  vin: vin ? vin.toUpperCase() : '',
                  engine: engine ? engine.toUpperCase() : ''
                })
              })
            }
            let illegal = {
              total: res.data.Total || 0,
              degree: res.data.Degree || 0,
              fine: res.data.Fine || 0
            }
            self.illegal = illegal
            self.lists = newList
            self.code = res.code

            let addParam = {
              car_no: param.car_no ? param.car_no.toUpperCase() : '',
              vin: param.vin ? param.vin.toUpperCase() : '',
              engine: param.engine ? param.engine.toUpperCase() : '',
              car_type: param.car_type ? param.car_type : ''
            }
            console.log(this.globalData.dont ? '不' : '', '存储')
            if (!this.globalData.dont) {
              // 本地存储一波
              try {
                let localCarList = []
                let localCarListString = window.localStorage.getItem('localCarList')
                if (localCarListString) {
                  localCarList = JSON.parse(localCarListString)
                }
                let newLocalCarList = [...localCarList].filter(item => {
                  return item.carNo !== addParam.car_no
                })
                if (addParam.car_no) {
                  newLocalCarList.unshift({
                    carNo: addParam.car_no,
                    engine: addParam.engine,
                    vin: addParam.vin,
                    car_type: addParam.car_type
                  })
                }

                window.localStorage.setItem('localCarList', JSON.stringify(newLocalCarList))
              } catch (error) {
                util.toast('由于您处在无痕模式，不能存储您所查询存储的记录')
              }

              // 个人账号存储一波
              // 接口参数 engine
              util.fetchData('v3/violation/car/manage', addParam).then(res => {
              // if (res.code > 0) {
              //   util.toast(res.msg)
              //   return
              // }
              // if (res.code === 0) {
              //   // util.toast("操作成功");
              // }
              }).catch(e => {

              })
            }
          } else {
            self.needCaptcha = false
            util.toast(res.msg)
          }
        })
        .catch(function (e, xhr, response) {
          // util.toast('查询失败,请稍后重试:' + response)
        })
    },
    gotoForm () {
      let localCarList = []
      try {
        let localCarListString = window.localStorage.getItem('localCarList')
        if (localCarListString) {
          localCarList = JSON.parse(localCarListString)
        }
      } catch (e) {
        console.log(e)
        // this.getCar()
        this.$refs.car.click()
      }
      // 如果本地有数据 同步
      if (localCarList.length) {
        util.toast('爱车同步中，请稍后')
        const promiseList = []
        localCarList.forEach((item, index) => {
          promiseList.push(util.fetchData('v3/violation/car/manage', {
            car_no: item.carNo ? item.carNo.toUpperCase() : '',
            vin: item.vin ? item.vin.toUpperCase() : '',
            engine: item.engine ? item.engine.toUpperCase() : '',
            car_type: item.car_type ? item.car_type : ''
          }).catch(e => {
          }))
        })
        Promise.all(promiseList).then(res => {
          // this.getCar()
          this.$refs.car.click()
        })
      } else {
        // this.getCar()
        this.$refs.car.click()
      }
      // MIP.viewer.open("car.html");
    }
  }
}
</script>

<style scoped>
.s4s-illegal-body {
  margin: 0 0.1rem 0.1rem 0.1rem;
  background: #fff;
  border-radius: 0.07rem;
  padding: 0 0.1rem;
  -webkit-box-shadow: 0 0.01rem 0.03rem rgba(0, 0, 0, 0.05);
  box-shadow: 0 0.01rem 0.03rem rgba(0, 0, 0, 0.05);
}
.s4s-car-sel {
  border: 0.01rem rgba(0, 161, 238, 0.23) solid;
  color: #00a1ee;
  padding: 0.03rem 0.05rem;
  border-radius: 0.03rem;
  font-size: 0.14rem;
  -ms-flex-item-align: end;
  align-self: flex-end;
}

.s4s-car-info {
  background-color: #fff;
  padding: .25rem 0.15rem ;
  font-size: .15rem;
}

.s4s-car-model {
  display:-webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items:center;
  -webkit-box-align:center;
  -moz-box-align:center;
  -webkit-box-align:center;
}

.s4s-car-name {
  -webkit-box-flex:1;
  -moz-box-flex:1;
  flex:1;
  -webkit-flex:1;
  -ms-box-flex:1;
  color: #333;
  font-size: .2rem;
  font-weight: 500;
}

.s4s-car-illegal {
  padding-top: .15rem;
  color: #00a1ee;
  font-size: .14rem;
}

.s4s-car-select {
  padding-top: 0.1rem;
  color: #00a1ee;
  font-size: 0.13rem;
  text-align: center;
  text-decoration: underline;
  font-weight: bold;
}

.s4s-origin {
  color: #fe7000;
}

.s4s-car-illegal span {
  color: #fe7000;
}
.s4s-right {
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items:center;
  -webkit-box-align:center;
  -moz-box-align:center;
  -webkit-box-align:center;
  margin-right: 0.1rem;
}

.s4s-right-txt {
  font-size: 0.13rem;
  color: #aaa;
  display: block;
}

.s4s-illegal-item {
  display: -ms-flexbox;
  display:-webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: flex;
  margin: 0 .12rem .1rem .12rem;
  box-sizing: border-box;
  -moz-box-sizing:border-box;
  -webkit-box-sizing:border-box;
}
.s4s-illegal-list-body {
  -webkit-box-flex:1;
  -moz-box-flex:1;
  flex:1;
  -webkit-flex:1;
  -ms-box-flex:1;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  background: #fff;
  border-radius: 0.04rem;
  -webkit-box-shadow: 0 0.01rem 0.03rem 0 rgba(0, 0, 0, 0.05);
  box-shadow: 0 0.01rem 0.03rem 0 rgba(0, 0, 0, 0.05);
  padding: .15rem .15rem .15rem;
  -webkit-box-orient:vertical;
  -webkit-box-direction:normal;
  -moz-box-orient:vertical;
  -moz-box-direction:normal;
  flex-direction:column;
  -webkit-flex-direction:column;
  overflow: hidden;
  border-radius: .05rem;
}

.s4s-illegal-hd {
  display: -webkit-box;
  display: -ms-flexbox;
  display: -moz-box;
  display: flex;
  -ms-flex-align: center;
  align-items:center;
  -webkit-box-align:center;
  -moz-box-align:center;
  -webkit-box-align:center;
  padding: 0.05rem 0 .15rem;
  border-bottom: .01rem rgba(0, 0, 0, 0.05) solid;
}

.s4s-illegal-icon {
  width: 0.11rem;
  height: 0.15rem;
}

.s4s-illegal-addr {
  -webkit-box-flex:1;
  -moz-box-flex:1;
  flex:1;
  -ms-box-flex:1;
  font-size: 0.13rem;
  color: #666;
  /* padding-right: 0.15rem; */
  overflow: hidden;
  /* white-space: nowrap; */
  text-overflow: ellipsis;
}

.s4s-illegal-bd {
  padding: 0.17rem 0;
  font-size: 0.16rem;
  color: #333;
}
.s4s-illegal-bd-number{
  font-weight: bold;
}
.s4s-illegal-bd-number span {
  padding: 0 0.03rem;
}

.s4s-illegal-bd-txt {
  width: 100%;
  padding-top: 0.1rem;
  line-height: 150%;
  color: #999;
  font-size: .12rem;
  line-height: .2rem;
  overflow: hidden;
  /* white-space: nowrap; */
  text-overflow: ellipsis;
}

.s4s-illegal-time {
  padding: 0.1rem 0;
  border-top: 0.01rem rgba(0, 0, 0, 0.05) solid;
  font-size: 0.14rem;
  color: #999;
  display:-webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
}

.s4s-illegal-ft {
  padding: 0.1rem 0;
  border-top: 0.01rem rgba(0, 0, 0, 0.05) solid;
  font-size: 0.14rem;
  color: #f55d4c;
}

.s4s-illegal-tips {
  border-top: 0.01rem rgba(0, 0, 0, 0.05) solid;
  padding: 0.1rem 0;
  font-size: 0.14rem;
  color: #f40;
}

.s4s-illegal-btn {
  text-align: right;
  padding-top: .15rem;
  border-top: .01rem rgba(0, 0, 0, 0.05) solid;
}
.s4s-illegal-btn.disable-btn span {
  background: none;
  color: #999;
}
.s4s-illegal-btn span {
  font-weight: 300;
  background-image: linear-gradient(-133deg, #FF7907 0%, #FFA018 100%);
  border-radius: .04rem;
  padding: .1rem .22rem;
  text-align: center;
  width: .93rem;
  font-size: .14rem;
  line-height: .3rem;
  color: #fff;
}

.s4s-title {
  font-size: .2rem;
  padding: .15rem;
  padding-top: 0.25rem;
  font-weight: bold;
}
.s4s-car-change {
  border: .01rem solid #fe7000;
  border-radius: .04rem;
  background: #ffffff;
  padding: .03rem .1rem;
  color: #fe7000;
}

.s4s-mask {
  height: 100%;
  height: 100vh;
  z-index: 101;
  background-color: rgba(0, 0, 0, 0.3);
}

.captcha{
  position: relative;
}
.captcha-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  background-color: #fff;
  padding:.15rem;
  border-radius: .05rem;
  padding-bottom: 0;
}
.captcha-title{
  color:#333333;
  font-size: .18rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: .1rem;
}
.captcha-input:focus ,.captcha-input,.captcha-key {
  outline: none;
}
.captcha-input-container {
  width: 100%;
  margin: .2rem 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.captcha-input-list {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.captcha-change {
  color:#6F6F6F;
  font-size: .12rem;
  margin-bottom: .125rem;
  text-align: center;
}
.captcha-input {
  height: .4rem;
  line-height: .4rem;
  font-size: .22rem;
  color:#333;
  flex: 1;
  width:.4rem;
  border:.01rem solid #eaeaea;
  margin-right:.1rem;
  max-width: .4rem;
  text-align: center;
}
.captcha-input:last-child {
  margin-right:0;
}
.captcha-btn {
  width: 100%;
  text-align: center;
  line-height: .5rem;
  font-size: .18rem;
  background-image: linear-gradient(40deg, #FF7C00 0%, #FE5A00 100%);
  border-radius: .05rem;
  color:#fff;
}
.captcha-keyboard {
  /* display: flex; */
  /* justify-content: space-around; */
  /* flex-wrap: wrap; */
  margin-top:.25rem;
}
.captcha-key-list {
  display: flex;
  justify-content: space-around;
  margin:.1rem;
}
.captcha-key {
  border:none;
  text-align: center;
  color:#24252D;
  font-size: .24rem;
  width: .8rem;
  height: .4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  user-select: none;
}

.captcha-key.captcha-key-disable:active {
  background: none!important;
}

.captcha-key:active {
  background-color: #ebebeb;
}
input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
  color: #6F6F6F;
}
input:-moz-placeholder, textarea:-moz-placeholder {
  color:#6F6F6F;
}
input::-moz-placeholder, textarea::-moz-placeholder {
  color:#6F6F6F;
}
input:-ms-input-placeholder, textarea:-ms-input-placeholder {
  color:#6F6F6F;
}
</style>
