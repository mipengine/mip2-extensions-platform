<template>
  <div class="coupon-page">
    <div class="coupon-exchange">
      <input
        :class="{empty: !exchangeCode}"
        v-model="exchangeCode"
        placeholder="请输入兑换码"
        class="exchange-input" >
      <div
        class="exchange-btn"
        @click="getCoupon()">兑换</div>
    </div>
    <div class="coupon-list-container">
      <div
        v-for="(cp,index) in coupons"
        v-show="cp.usable"
        :class="{expired: isExpired(cp),used: isUsed(cp),disabled: !isUseful(cp),fetched: isFetched(cp)}"
        :key="index"
        class="coupon-item-component"
        @click="clickCoupon(cp)">
        <div class="layout">
          <div class="right-semi-circle"/>
          <div class="inner">
            <div class="coupon-left">
              <div class="coupon-number"><span class="unit">￥</span><span>{{ cp.discount }}</span></div>
              <div class="coupon-condition">{{ "满"+cp.limitation+"元可使用" }}</div>
            </div>
            <div class="coupon-right">
              <div class="coupon-title">{{ cp.title }}</div>
              <div class="coupon-expire">
                {{ getExpired(cp) }}
                <div
                  :class="{selected:couponOID===cp.couponOID}"
                  class="for-select"/>
              </div>
              <div
                class="coupon-comment"
                @click.stop="toggleComment(cp)">
                <span class="comment">{{ cp.couponRuleComment }}</span>
                <div :class="{'hide-comment': !cp.displayMoreComment,'show-comment':cp.displayMoreComment}"/>
              </div>
            </div>
          </div>
          <div class="left-semi-circle"/>
        </div>
        <div
          v-show="cp.displayMoreComment"
          class="more-comment">
          {{ cp.couponRuleComment }}
        </div>
      </div>
      <div
        class="dont-use"
        @click="clickCoupon()">
        有钱任性,不使用优惠券
        <div
          :class="{selected:couponOID===''}"
          class="for-select"/>
      </div>
      <div class="splitor"/>
      <coupon-item
        data="cp"
        ng-if="!cp.usable"
        ng-repeat="cp in allCoupons"/>
    </div>
    <div
      v-if="toastmsg"
      class="toast-msg">
      {{ toastmsg }}
    </div>
  </div>
</template>

<style scoped lang="less">
@main-color: #ff1d41;
@dark-font: #323038;
@normal-font: #494949;
@light-font: #aaa;
@normal-border: 1px solid #e4e4e4;
@medium-font: #95949d;
.box-orient(@orient) {
  -moz-box-orient: @orient;
  -webkit-box-orient: @orient;
  box-orient: @orient;
}
.box-pack(@pack) {
  -moz-box-pack: @pack;
  -webkit-box-pack: @pack;
  box-pack: @pack;
}
.box-align(@align) {
  -moz-box-align: @align;
  -webkit-box-align: @align;
  box-align: @align;
}
.box-flex(@flex) {
  -moz-box-flex: @flex;
  -webkit-box-flex: @flex;
  box-flex: @flex;
  flex: @flex;
  display: block;
}
.place-holder(@color,@size) {
  &:-moz-placeholder,
  &::-moz-placeholder,
  &:-ms-input-placeholder,
  &::-webkit-input-placeholder {
    color: @color;
    font-size: @size;
  }
}
.toast-msg {
  width: 180px;
  padding: 15px 10px;
  line-height: 20px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.65);
  position: absolute;
  border-radius: 5px;
  left: 50%;
  top: 100px;
  transform: translateX(-50%) translateY(-50%);
  z-index: 1000;
}
.coupon-item-component {
  .layout {
    display: flex;
    align-items: center;
  }
  &.disabled {
    .coupon-left {
      opacity: 0.5;
    }
    .coupon-title {
      opacity: 0.5;
    }
  }
  &.expired {
    .disabled;
    .coupon-right {
      background: url(~@/static/icon/coupon-expired.png) 95% 20% no-repeat;
      background-size: 62px 51px;
    }
  }
  &.used {
    .disabled;
    .coupon-right {
      background: url(~@/static/icon/coupon-used.png) 95% 20% no-repeat;
      background-size: 62px 51px;
    }
  }
  &.fetched {
    .coupon-right {
      background: url(~@/static/icon/coupon-fetched.png) 95% 20% no-repeat;
      background-size: 62px 51px;
    }
  }
  .for-select {
    float: right;
    margin-right: 1.8rem;
    height: 2rem;
    width: 2rem;
    background-image: url(~@/static/icon/noselect.png);
    background-size: 20px 20px;
    background-position: center center;
  }
  .for-select.selected {
    background-image: url(~@/static/icon/select.png);
  }
  .for-use {
    width: 5rem;
    height: 2.2rem;
    border-radius: 1.1rem;
    line-height: 2.2rem;
    color: #fff;
    text-align: center;
    background-image: linear-gradient(294deg, #ff1d41, #ee0e87);
    position: absolute;
    bottom: 1rem;
    right: 1.8rem;
  }
  .inner {
    border-radius: 0.4rem;
    border: solid 1px #eaeaeb;
    display: flex;
    width: 100%;
    overflow: hidden;
    margin: 0 -0.6rem;
  }
  .semi-circle {
    width: 0.5rem;
    height: 1rem;
    background: #fff;
    transform: translateZ(1px);
  }
  .right-semi-circle {
    .semi-circle;
    border-right: solid 1px #eaeaeb;
    border-top: solid 1px #eaeaeb;
    border-bottom: solid 1px #eaeaeb;
    border-top-right-radius: 1rem;
    border-bottom-right-radius: 1rem;
  }
  .left-semi-circle {
    border-left: solid 1px #eaeaeb;
    border-top: solid 1px #eaeaeb;
    border-bottom: solid 1px #eaeaeb;
    .semi-circle;
    border-top-left-radius: 1rem;
    border-bottom-left-radius: 1rem;
  }
  .coupon-left {
    min-width: 9.5rem;
  }
  .coupon-right {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .coupon-number {
    width: 100%;
    height: 7rem;
    line-height: 7rem;
    background: #f84563;
    color: #fff;
    text-align: center;
    font-size: 3.8rem;
    .unit {
      font-size: 1.4rem;
    }
  }
  .coupon-condition {
    height: 3rem;
    width: 100%;
    line-height: 3rem;
    background: #e91c3d;
    text-align: center;
    color: #fff;
  }
  .coupon-title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 0 1rem;
    height: 4rem;
    line-height: 4rem;
    font-weight: bold;
    font-size: 1.4rem;
  }
  .coupon-expire {
    color: @medium-font;
    font-size: 1.1rem;
    padding-left: 1rem;
    height: 3rem;
    line-height: 3rem;
    position: relative;
  }
  .coupon-comment {
    border-top: dashed 1px #eaeaeb;
    height: 3rem;
    line-height: 3rem;
    white-space: nowrap;
    padding-left: 1rem;
    padding-right: 3.5rem;
    color: @medium-font;
    font-size: 1.1rem;
    overflow: hidden;
    text-overflow: ellipsis;
    position: relative;
  }
  .comment-icon {
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    position: absolute;
    display: inline-block;
    border-radius: 1.2rem;
    width: 1.2rem;
    height: 1.2rem;
    background: #bcbcbc;
  }
  .show-comment {
    .comment-icon;
    &:before {
      left: 0;
      top: 0;
      content: "";
      position: absolute;
      transform: rotateZ(-45deg) translateX(-0.15rem) translateY(0.5rem);
      border-right: 1px solid #fff;
      border-top: 1px solid #fff;
      height: 0.6rem;
      width: 0.6rem;
    }
  }
  .hide-comment {
    .comment-icon;
    &:before {
      left: 0;
      top: 0;
      content: "";
      position: absolute;
      transform: rotateZ(-45deg) translateX(0.15rem) translateY(0.2rem);
      border-left: 1px solid #fff;
      border-bottom: 1px solid #fff;
      height: 0.6rem;
      width: 0.6rem;
    }
  }
  .more-comment {
    color: @dark-font;
    font-size: 1.1rem;
    line-height: 1.6rem;
    padding: 1rem;
    border-radius: 0.2rem;
    border: solid 1px #eaeaeb;
    border-top: none;
    margin: 0 1rem;
  }
}
.dont-use {
  .for-select {
    float: right;
    height: 2rem;
    width: 2rem;
    background-image: url(~@/static/icon/noselect.png);
    background-size: 20px 20px;
    background-position: center center;
  }
  .for-select.selected {
    background-image: url(~@/static/icon/select.png);
  }
}
.coupon-page {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  .coupon-exchange {
    padding: 1rem 1.8rem;
    width: 100%;
    background: #fff;
    display: flex;
    border: solid 1px rgba(0, 0, 0, 0.08);
    .exchange-input {
      flex: 1;
      height: 3.2rem;
      line-height: 3.2rem;
      border-radius: 2px;
      background-color: #f6f6f7;
      color: @dark-font;
      &.empty {
        color: @medium-font;
      }
      margin-right: 1rem;
      border: none;
      padding-left: 1.5rem;
    }
    .exchange-btn {
      width: 6.4rem;
      height: 3.2rem;
      line-height: 3.2rem;
      text-align: center;
      color: #fff;
      border-radius: 2px;
      background-image: linear-gradient(297deg, #ff1d41, #ee0e87);
      font-size: 1.4rem;
    }
  }
  .coupon-list-container {
    flex: 1;
    padding: 1.8rem;
    background-color: #f6f6f7;
    overflow-y: auto;
    .dont-use {
      background: #fff;
      width: 100%;
      padding: 1.8rem;
      color: @dark-font;
      font-size: 1.4rem;
      border-radius: 0.4rem;
      border: solid 1px #eaeaeb;
      align-items: center;
      justify-content: space-between;
      display: flex;
    }
    .splitor {
      border-top: solid 1px #eaeaeb;
      margin: 1.8rem 0;
    }
    .coupon-item-component {
      margin-bottom: 1.8rem;
      .inner,
      .more-comment {
        background-color: #fff;
      }
      .right-semi-circle,
      .left-semi-circle {
        background-color: #f6f6f7;
      }
    }
  }
}
</style>

<script>
import { httpGet, httpPost } from '@/common/httpUtil'
import * as sessionStorageUtil from '@/common/sessionStorageUtil.js'
import * as adapterStorageUtil from '@/common/adapterStorageUtil'
import { templateCompile } from '@/common/urlUtil'
export default {
  props: {
    prefixUrl: {
      type: String,
      default: ''
    },
    couponUrl: {
      type: String,
      default: ''
    },
    nextUrl: {
      type: String,
      default: ''
    },
    loginUrl: {
      type: String,
      default: ''
    },
    postCouponUrl: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      coupons: [],
      couponOID: '',
      pageData: {},
      orderPending: true,
      toastmsg: ''
    }
  },
  mounted () {
    sessionStorageUtil.syncSessionData()
    this.loadCoupon()
    this.couponOID = MIP.hash.get('couponOID')
  },
  methods: {
    getCoupon () {
      let fetchUrl = this.postCouponUrl
      let me = this
      let exchangeCode = me.exchangeCode
      httpPost(fetchUrl, { code: exchangeCode, user: '000' }).then(function (
        data
      ) {
        if (data.statusCode === 200) {
          me.toast('兑换成功')
          me.loadCoupon()
        } else {
          me.toast(data.comments)
        }
      })
    },
    toggleComment (cp) {
      this.$set(cp, 'displayMoreComment', !cp.displayMoreComment)
    },
    loadCoupon () {
      let me = this
      let showOID = adapterStorageUtil.get('showOID')
      let price = adapterStorageUtil.get('seller_totalSalePrice')
      let couponUrl = templateCompile(this.couponUrl, { price, showOID })
      httpGet(couponUrl)
        .then(function (res) {
          if (res.statusCode === 200) {
            me.coupons = res.result.data || []
            me.coupons.map(item => {
              this.$set(item, 'displayMoreComment', true)
            })
          } else if (res.statusCode === 1005) {
            sessionStorageUtil.set(
              'login_back_url',
              MIP.viewer.page.currentPageId
            )
            me.loginUrl && MIP.viewer.open(me.loginUrl)
          }
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    clickCoupon (a) {
      if (a) {
        sessionStorageUtil.set('selected_coupon', a)
        window.MIP.viewer.page.back()
      } else {
        this.couponOID = ''
        sessionStorageUtil.set('selected_coupon', { noUse: true })
        window.MIP.viewer.page.back()
      }
    },
    isSelected (a) {
      return a.couponOID === this.couponOID
    },
    saveCoupon (callback) {
      let me = this
      me.location.default = me.location.default || false
      me.toast('系统正在处理地址请求，请稍后')
      if (me.validate() && me.orderPending) {
        me.orderPending = false
        httpPost(me.couponUrl, me.location)
          .then(function (res) {
            me.orderPending = true
            if (res.statusCode === 200) {
              me.showEditCouponFlag = false
              me.toastmsg = ''
              res.result.data &&
                res.result.data.couponOID &&
                me.coupons.push(res.result.data)
            } else if (res.statusCode === 1005) {
              sessionStorageUtil.set(
                'login_back_url',
                MIP.viewer.page.currentPageId
              )
              me.loginUrl && MIP.viewer.open(me.loginUrl)
            } else {
              me.toast(res.comments)
            }
          })
          .catch(function (err) {
            me.toast(err.message)
          })
      }
    },
    toast (msg, timeout) {
      let me = this
      if (msg !== '') {
        timeout = timeout || 2000
        me.toastmsg = msg
        setTimeout(() => {
          me.toastmsg = ''
        }, timeout)
      }
    },
    isExpired (item) {
      return item.couponStatus && item.couponStatus.code === 3
    },
    isUsed (item) {
      return item.couponStatus && item.couponStatus.code === 2
    },
    isUseful (item) {
      return item.usable
    },
    isFetched (item) {
      return item.fetched
    },
    getExpired (cp) {
      if (cp.startTimeDot && cp.expireTimeDot) { return cp.startTimeDot + '-' + cp.expireTimeDot }
    }
  }
}
</script>
