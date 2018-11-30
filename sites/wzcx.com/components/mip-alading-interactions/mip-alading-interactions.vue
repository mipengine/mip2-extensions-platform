<template>
  <div class="container lad-wrapper">
    <div>
      <!-- 没有输入信息就跳到结果页--其实不太可能 -->
      <!-- 驾驶证输入错误的信息 -->
      <div
        v-if="noInfo || wrongInfo_license"
        class="newerror">
        <mip-img
          id="tu"
          width="84"
          height="84"
          src="../static/img/tu.png" />
        <h1 class="weihuzhong">您所输入的信息有误，无法<br>查询到违章信息，请重新输入正确信息</h1>
        <div
          class="inputagain"
          @click="inputAgain">点击重新输入</div>
      </div>
      <!-- 车辆输入了错误的信息 -->
      <div
        v-if="wrongInfo"
        class="newerror">
        <mip-img
          id="tu"
          width="84"
          height="84"
          src="../static/img/tu.png" />
        <h1 class="weihuzhong" >暂无法查询违章信息，可能原因如下：</h1>
        <h1 class="weihuzhong2">1.你的车辆是以下其中一种状态：转出，被盗抢，注销，达到报废标准<br>2.你所输入的车辆查询信息有误</h1>
        <div
          class="inputagain"
          @click="inputAgain">点击重新输入</div>
      </div>
      <div
        v-if="isFixBottomTip === true"
        class="fix_bottom">更多服务请关注"广东公安熊掌号"和"粤警民通公众号"</div>
    </div>

    <!-- 输入正确且有返回的情况 -->
    <div v-if="!noInfo && !wrongInfo && !wrongInfo_license">
      <!-- license 驾驶证 -->
      <div v-if="isLicense">
        <div class="card-bg idcard">
          <div class="card-top">
            <div class="card-num">
              {{ id_license }}
            </div>
            <div @click="deleteCardOrLicense">
              <mip-img
                class="delete-img"
                layout="responsive"
                width="200"
                height="200"
                src="../static/img/delete.png" />
            </div>
          </div>
          <div class="middle">
            <div class="middle-item">
              <div class="middle-item-text">
                {{ weizhangcishu_license }}
              </div>
              <div class="middle-item-text2">违章</div>
            </div>
            <div class="middle-item">
              <div class="middle-item-text">
                {{ fakuanshu_license }}
              </div>
              <div class="middle-item-text2">罚款</div>
              <div class="fengexian" />
            </div>
            <div class="middle-item">
              <div class="middle-item-text">
                {{ koufenshu_license }}
              </div>
              <div class="middle-item-text2">扣分</div>
              <div class="fengexian" />
            </div>
          </div>
          <div class="card-bottom">
            <div>检验有效期至：{{ tyyxqz_license }}</div>
            <div>累计记分：{{ leijijifen_license }}分</div>
          </div>
          <div class="card-bottom">
            <div>强制报废时间：{{ qzbfsj_license }}</div>
          </div>
          <div class="card-bottom">
            <div class="staus-left">
              状态<span class="id-staus-right-span">违法未处理</span>
            </div>
            <div class=""/>
          </div>
        </div>
        <div
          v-if="hasLicenseIllegal"
          class="two-bottom-box">
          <div
            v-if="isShowMyOrder"
            class="common-button first-button"
            @click="ckwddd">查看我的订单</div>
          <div
            v-if="isShowViolation"
            class="common-button second-button"
            @click="ljblwz">立即办理违章</div>
        </div>
        <div
          v-if="!hasLicenseIllegal"
          class="two-bottom-box">
          <div
            v-if="isShowMyOrder"
            class="common-button first-button"
            @click="ckwddd">查看我的订单</div>
          <div
            v-if="isShowViolation"
            class="common-button second-button-no">立即办理违章</div>
        </div>
        <div class="cxjg">
          <div class="cxjg-line" />
          <div class="cxjgtext">查询结果</div>
          <div class="cxjg-line" />
        </div>
        <div v-if="hasLicenseIllegal">
          <div
            v-for="item in results_license"
            :key="item.index"
            class="cxjgresult">
            <div class="cxjgitem-1">{{ item.cljgmc }}</div>
            <div class="cxjgfgx" />
            <div class="weifadetail">
              <div class="weifa-detail-item">
                <div class="weifa-left-item">违法时间</div>
                <div class="weifa-right-item">{{ item.wfsj }}</div>
              </div>
              <div class="weifa-detail-item">
                <div class="weifa-left-item">违法地址</div>
                <div class="weifa-right-item">{{ item.wfdz }}</div>
              </div>
              <div class="weifa-detail-item">
                <div class="weifa-left-item">违法行为</div>
                <div class="weifa-right-item">{{ item.wfxw }}</div>
              </div>
              <div class="weifa-detail-item">
                <div class="weifa-left-item">罚款金额</div>
                <div class="weifa-right-item">
                <strong class="amount">{{ item.fkje }}</strong>元</div>
              </div>
              <div class="weifa-detail-item">
                <div class="weifa-left-item">违纪记分</div>
                <div class="weifa-right-item">
                <strong class="amount">{{ item.wfjfs }}</strong>分</div>
              </div>
              <div class="weifa-detail-item">
                <div class="weifa-left-item">滞纳金</div>
                <div class="weifa-right-item">
                  <strong class="amount">{{ item.znj }}</strong>元
                </div>
              </div>
              <div class="weifa-detail-item">
                <div class="weifa-left-item">决定书编号</div>
                <div class="weifa-right-item">{{ item.jdsbh }}</div>
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="!hasLicenseIllegal"
          class="noresult">
          <mip-img
            id="tu"
            width="84"
            height="84"
            src="../static/img/tu.png" />
          <h1 class="noweifa">恭喜你尚无新违法记录</h1>
          <div
            v-if="isShowViolation"
            class="chufajuedingshu"
            @click="cxwzcl">查询车辆违章</div>
        </div>
      </div>
      <!-- card 车辆 -->
      <div v-if="isCard">
        <div class="card-bg license">
          <div class="card-top">
            <p class="card-num">
              {{ id_card }}
            </p>
            <div @click="deleteCardOrLicense">
              <mip-img
                class="delete-img"
                layout="responsive"
                width="200"
                height="200"
                src="../static/img/delete.png" />
            </div>
          </div>
          <div class="middle">
            <div class="middle-item">
              <div class="middle-item-text">
                {{ weizhangcishu }}
              </div>
              <div class="middle-item-text2">违章</div>
            </div>
            <div class="middle-item">
              <div class="middle-item-text">
                {{ fakuanshu }}
              </div>
              <div class="middle-item-text2">罚款</div>
              <div class="fengexian" />
            </div>
            <div class="middle-item">
              <div class="middle-item-text">
                {{ koufenshu }}
              </div>
              <div class="middle-item-text2">扣分</div>
              <div class="fengexian" />
            </div>
          </div>
          <div class="card-bottom">
            <div>检验有效期至：{{ tyyxqz }}</div>
          </div>
          <div class="card-bottom">
            <div>强制报废时间：{{ qzbfsj }}</div>
          </div>
          <div class="card-bottom">
            <div class="staus-left">
              状态
              <span class="staus_right">{{ status }}</span>
            </div>
          </div>
        </div>
        <div
          v-if="hasCardIllegal"
          class="two-bottom-box">
          <div
            v-if="isShowMyOrder"
            class="common-button first-button"
            @click="ckwddd">查看我的订单</div>
          <div
            v-if="isShowViolation"
            class="common-button second-button"
            @click="ljblwz">立即办理违章</div>
        </div>
        <div
          v-if="!hasCardIllegal"
          class="two-bottom-box">
          <div
            v-if="isShowMyOrder"
            class="common-button first-button"
            @click="ckwddd">查看我的订单</div>
          <div
            v-if="isShowViolation"
            class="common-button second-button-no">立即办理违章</div>
        </div>
        <div class="cxjg">
          <div class="cxjg-line" />
          <div class="cxjgtext">查询结果</div>
          <div class="cxjg-line" />
        </div>
        <div v-if="hasCardIllegal">
          <div
            v-for="item in results"
            :key="item.index"
            class="cxjgresult">
            <div class="cxjgitem-1">{{ item.cjjgmc }}</div>
            <div class="cxjgfgx" />
            <div class="weifadetail">
              <div class="weifa-detail-item">
                <div class="weifa-left-item">违法时间</div>
                <div class="weifa-right-item">{{ item.wfsj }}</div>
              </div>
              <div class="weifa-detail-item">
                <div class="weifa-left-item">违法地址</div>
                <div class="weifa-right-item">{{ item.wfdz }}</div>
              </div>
              <div class="weifa-detail-item">
                <div class="weifa-left-item">违法行为</div>
                <div class="weifa-right-item">{{ item.wfxw }}</div>
              </div>
              <div class="weifa-detail-item">
                <div class="weifa-left-item">罚款金额</div>
                <div class="weifa-right-item">
                <strong class="amount">{{ item.fkje }}</strong>元</div>
              </div>
              <div class="weifa-detail-item">
                <div class="weifa-left-item">违纪记分</div>
                <div class="weifa-right-item">
                <strong class="amount">{{ item.wfjfs }}</strong>分</div>
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="!hasCardIllegal"
          class="noresult">
          <mip-img
            id="tu"
            width="84"
            height="84"
            src="../static/img/tu.png" />
          <h1 class="noweifa">恭喜你尚无新违法记录</h1>
          <div
            v-if="isShowViolation"
            class="chufajuedingshu"
            @click="wycfjds">我有处罚决定书</div>
        </div>
      </div>

      <div
        v-if="isFixBottomTip === false"
        class="no_fix_bottom">更多服务请关注"广东公安熊掌号"和"粤警民通公众号"</div>

      <div
        v-if="isFixBottomTip === true"
        class="fix_bottom">更多服务请关注"广东公安熊掌号"和"粤警民通公众号"</div>

    </div>
  </div>
</template>

<style scoped lang="less">
@import "../../common/less/common.less";
/* 自定义样式 */
.no_fix_bottom {
  width: 100%;
  text-align: center;
  font-size: 0.55rem;
  color: rgba(153, 153, 153, 1);
  box-sizing: border-box;
  margin: 0.5rem auto;
}
.inputagain {
  width: 8rem;
  height: 2.2rem;
  background: rgba(0, 160, 233, 1);
  border-radius: 0.5rem;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 1);
  line-height: 2.2rem;
  margin: 2rem auto 0 auto;
}

.container {
  margin: 0 0.75rem;
  overflow: auto !important;
}

.card-bg {
  width: 100%;
  margin: 1rem auto 0 auto;
  height: 9.95rem;
}
.idcard {
  background: url(../../static/img/idcard.png) no-repeat;
  background-size: 100% 100%;
}

.license {
  background-size: 100% 100%;
  background-image: url(../../static/img/license.png);
}
.card-top {
  display: flex;
  width: 100%;
  justify-content: space-between;
  height: 1rem;
  align-items: bottom;
  padding-top: 0.8rem;
}
.delete-img {
  border-width: 0.75rem;
  border-radius: 0.375rem;
  width: 1rem;
  height: 1rem;
  text-align: center;
  margin-right: 0.75rem;
  color: blue;
}
.card-num {
  padding-left: 0.75rem;
  font-size: 1rem;
  font-weight: bold;
  color: rgba(255, 255, 255, 1);
}

.middle {
  margin-top: 0.6rem;
  width: 100%;
  display: flex;
}
.middle-item {
  width: 33.3%;
  text-align: center;
}
.middle-item-text {
  font-size: 1rem;
  color: rgba(255, 255, 255, 1);
  font-weight: bold;
}
.middle-item-text2 {
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 1);
}
.fengexian {
  margin-top: -2rem;
  background: white;
  width: 0.05rem;
  height: 1.75rem;
}

.card-bottom {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  height: 1.5rem;
  margin-left: 0.775rem;
  margin-right: 0.9rem;
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 1);
}

.staus-left {
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 1);
  height: 0.9rem;
  line-height: 0.9rem;
}
.card-bottom .id-staus-right-span {
  line-height: 0.9rem;
  display: inline-block;
  padding: 0 0.75rem;
  height: 0.9rem;
  background: rgba(29, 112, 47, 1);
  border-radius: 0.9rem;
  text-align: center;
  margin-left: 0.725rem;
  color: #60b66d;
  font-size: 0.6rem;
}

.card-bottom .staus_right {
  line-height: 0.9rem;
  display: inline-block;
  padding: 0 0.75rem;
  height: 0.9rem;
  background: rgba(0, 58, 95, 1);
  border-radius: 0.9rem;
  text-align: center;
  margin-left: 0.725rem;
  color: rgba(53, 103, 179, 1);
  font-size: 0.6rem;
}

.two-bottom-box {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.common-button {
  margin-top: 0.9rem;
  width: 8rem;
  height: 2.2rem;
  border-radius: 0.25rem;
  float: left;
  text-align: center;
  font-size: 0.9rem;
  color: rgba(51, 51, 51, 1);
  line-height: 2.2rem;
}
.first-button {
  background: rgba(255, 255, 255, 1);
  border: #cccccc 1px solid;
}
.second-button {
  background: #00a0e9;
  color: #fff;
}
.second-button-no {
  background: rgba(229, 229, 229, 1);
  color: rgba(51, 51, 51, 0.3);
}

.cxjg {
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 0.6rem;
}

.cxjg-line {
  float: left;
  width: 40%;
  height: 0.05rem;
  background: rgba(204, 204, 204, 1);
  margin-top: 0.4rem;
}

.cxjgtext {
  float: left;
  width: 15%;
  margin-left: 0.25rem;
  font-size: 0.6rem;
  color: rgba(153, 153, 153, 1);
}

.cxjgresult {
  padding-bottom: 0.75rem;
  margin-bottom: 0.75rem;
  margin-top: 0.75rem;
  width: 100%;
  border-radius: 0.5rem;
  background: #fff;
}

.cxjgitem-1 {
  margin-left: 0.775rem;
  margin-top: 0.75rem;
  font-size: 0.85rem;
  color: #333333;
  line-height: 2.2rem;
}

.cxjgfgx {
  width: 100%;
  height: 0.05rem;
  background: rgba(230, 230, 230, 1);
}

.weifadetail {
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
  display: -webkit-box;
  /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
  -webkit-flex-direction: column;
  -webkit-box-orient: vertical;
}

.weifa-detail-item {
  margin-top: 0.725rem;
}

.weifa-left-item {
  margin-left: 0.775rem;
  float: left;
  display: -webkit-box;
  /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
  display: flex;
  font-size: 0.7rem;
  color: rgba(51, 51, 51, 1);
}

.weifa-right-item {
  font-size: 0.7rem;
  width: 7.3rem;
  margin-right: 0.725rem;
  float: right;
  color: #333333;
  text-align: right;
}

.amount {
  font-size: 0.7rem;
  color: rgba(255, 73, 37, 1);
}

.noresult {
  margin-top: 1.25rem;
  width: 100%;
  text-align: center;
  margin-bottom: 1.5rem;
}

.noweifa {
  font-size: 0.7rem;
  color: rgba(153, 153, 153, 1);
  margin: 0.5rem 0 1.475rem 0;
}

.chufajuedingshu {
  margin: auto;
  width: 8rem;
  height: 2.2rem;
  background: rgba(0, 160, 233, 1);
  border-radius: 0.25rem;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 1);
  line-height: 2.25rem;
}

.newerror {
  margin-top: 5rem;
  width: 100%;
  text-align: center;
}

.weihuzhong {
  margin-top: 0.5rem;
  font-size: 0.7rem;
  color: rgba(153, 153, 153, 1);
}

.weihuzhong2 {
  margin-top: 0.7rem;
  font-size: 0.7rem;
  color: rgba(153, 153, 153, 1);
  text-align: left;
}

#tu {
  height: calc(100vw / 5) !important;
  width: calc(100vw / 5) !important;
}

</style>

<script>
import {
  resetRem,
  getContainerH
} from '../../common/utils/common'
import { gConst } from '../../common/js/config.js'
import aladingReqs from '../../common/api/alading.js'
import { Mdialog } from '../../common/utils/dialog.js'
export default {
  data () {
    return {
      noInfo: false,
      isLicense: false,
      isCard: false,
      hasLicenseIllegal: false,
      hasCardIllegal: false,
      isFixBottomTip: false,
      id_card: '',
      weizhangcishu: '',
      koufenshu: '',
      tyyxqz: '',
      qzbfsj: '',
      status: '',
      id_license: '',
      weizhangcishu_license: '',
      koufenshu_license: '',
      tyyxqz_license: '',
      qzbfsj_license: '',
      status_license: '',
      results: [],
      results_license: [],
      wrongInfo: false,
      wrongInfo_license: false,
      isShowMyOrder: true, // 是否展示 “查看我的订单按钮”
      isShowViolation: true // 是否展示所有 “违章” 按钮
    }
  },
  created () {},
  mounted () {
    resetRem()
    this.getControlBtn()

    let reg1 = /[0-9a-zA-Z]/g
    console.log('This is my first custom component !')
    /* url上没有任何参数 */
    if (!this.getUrlParam('token') && !this.getUrlParam('plate_no')) {
      let that = this
      that.noInfo = true
      that.isFixBottomTip = true
    }
    /* 驾驶证 */
    if (this.getUrlParam('token')) {
      let that = this
      let params = {
        encryDate: that.getUrlParam('token')
      }
      aladingReqs
        .getLicenseInfoForEncry(params)
        .then(res => {
          that.noInfo = false
          if (res.errcode === 0) {
            that.isLicense = true
            let realLicense = res.result.license_no
            let licenseLength = realLicense.length
            let one = realLicense.substring(6, licenseLength - 10)
            let two = realLicense
              .substring(licenseLength - 10, licenseLength - 1)
              .replace(reg1, '*')
            let three = realLicense.substring(licenseLength - 1)
            let chulied = one.concat(two, three)
            that.id_license = chulied
            that.weizhangcishu_license = res.result.undeal_count
            that.fakuanshu_license = res.result.undeal_amount_of_money
            that.koufenshu_license = res.result.undeal_amount_of_score
            that.tyyxqz_license = res.result.check_date
            that.qzbfsj_license = res.result.valid_date
            that.leijijifen_license = res.result.ljjf
            that.status_license = res.result.status
            if (res.result_set.length > 0) {
              that.hasLicenseIllegal = true
              that.results_license = res.result_set
              that.isFixBottomTip = false
            }
            if (res.result_set.length === 0) {
              that.hasLicenseIllegal = false
              that.isFixBottomTip = true
              let containerH = getContainerH('.root-box')
              if (containerH < 600) {
                that.isFixBottomTip = false
              }
            }
          }
        })
        .catch((res) => {
          if (res.errcode === -200) {
            that.wrongInfo_license = true
            that.isFixBottomTip = true
          }
        })
    }
    // 如果能获取
    if (this.getUrlParam('plate_no')) {
      let that = this
      let params = {
        plate_no: that.getUrlParam('plate_no'),
        car_type: that.getUrlParam('car_type'),
        eng_no: that.getUrlParam('eng_no')
      }
      aladingReqs
        .getCarInfo(params)
        .then(res => {
          that.isCard = true
          that.noInfo = false
          that.isLicense = false
          that.id_card = res.result.hphm
          that.weizhangcishu = res.result.undeal_count
          that.fakuanshu = res.result.undeal_amount_of_money
          that.koufenshu = res.result.undeal_amount_of_score
          that.tyyxqz = res.result.invalidated_date
          that.qzbfsj = res.result.valid_date
          that.leijijife = res.result.ljjf
          that.status = res.result.status
          if (res.result_set.length > 0) {
            that.hasCardIllegal = true
            that.results = res.result_set
            that.isFixBottomTip = false
          }
          if (res.result_set.length === 0) {
            that.isFixBottomTip = true
            let containerH = getContainerH('.root-box')
            if (containerH < 600) {
              that.isFixBottomTip = false
            }
          }
        })
        .catch((res) => {
          if (res.errcode === -200) {
            that.wrongInfo = true
            that.isFixBottomTip = true
          }
        })
    }
  },
  methods: {
    againInput () {
      console.log(124)
    },
    getUrlParam (name) {
      // 用于获取url的参数后置参数
      let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)') // 构造一个含有目标参数的正则表达式对象
      let r = window.location.search.substr(1).match(reg) // 匹配目标参数
      if (r != null) {
        return decodeURI(r[2])
      }
      return null // 返回参数值
    },
    inputAgain () {
      /* 驾驶证 */
      if (this.getUrlParam('token')) {
        MIP.viewer.open('https://www.baidu.com/s?wd=驾驶人违法查询', {
          isMipLink: false
        })
      } else {
        MIP.viewer.open('https://www.baidu.com/s?wd=违章查询', {
          isMipLink: false
        })
      }
    },
    ckwddd () {
      MIP.viewer.open(gConst.outAldhttp + 'mip-my-order.html', {
        isMipLink: true
      })
    },
    ljblwz () {
      let that = this
      if (that.getUrlParam('token')) {
        /* 驾驶证 */
        MIP.viewer.open(
          gConst.outAldhttp + 'mip-xmd-illegal-index.html?selected=decision',
          { isMipLink: true }
        )
      }
      if (that.getUrlParam('plate_no')) {
        let plateNo = that.getUrlParam('plate_no')
        plateNo = plateNo.substr(0, 1) === '粤' ? plateNo : '粤' + plateNo
        plateNo = encodeURIComponent(plateNo)
        MIP.viewer.open(
          gConst.outAldhttp +
            'mip-xmd-illegal-msg.html?' +
            'PLATENUMBER=' +
            plateNo +
            '&FDJH=' +
            that.getUrlParam('eng_no') +
            '&PLATETYPE=' +
            that.getUrlParam('car_type'),
          { isMipLink: true }
        )
      }
    },
    cxwzcl () {
      MIP.viewer.open(
        gConst.outAldhttp + 'mip-xmd-illegal-index.html?selected=illegal',
        { isMipLink: true }
      )
    },
    wycfjds () {
      MIP.viewer.open(
        gConst.outAldhttp + 'mip-xmd-illegal-index.html?selected=decision',
        { isMipLink: true }
      )
    },
    deleteCardOrLicense (str) {
      const that = this
      let Dialog = new Mdialog()
      Dialog.open(
        {
          title: '提示',
          message: '是否确定清除车辆信息',
          showCancelButton: true
        },
        function (actions) {
          if (actions === 'confirm') {
            // 确定
            console.log('点击了确定')
            if (that.getUrlParam('token')) {
              /* 驾驶证 */
              MIP.viewer.open('https://www.baidu.com/s?wd=驾驶人违法查询', {
                isMipLink: false
              })
            } else {
              MIP.viewer.open('https://www.baidu.com/s?wd=违章查询', {
                isMipLink: false
              })
            }
          }
        }
      )
    },

    getControlBtn () {
      const that = this
      fetch('https://wxcity.fundway.net/gdjmt.wx.xcx/ad/getAdsToBdald.do')
        .then(function (res) {
          return res.json()
        })
        .then(function (res) {
          if (res.code === 200 || res.code === '200') {
            const result = JSON.parse(res.result)
            that.isShowMyOrder = result.isShow_orderBtn
            that.isShowViolation = result.isShow_blBtn
          }
        })
    }
  }
}
</script>
