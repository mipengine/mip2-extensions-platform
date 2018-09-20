<template>
  <div class="vbox">
    <div class="main_wap row-row orderPay ">
      <div
        class="time_count"
        ng-show="order.orderStatus.code!=12"><i class="clock_icon"/>&nbsp;支付剩余时间: <span>{{ reserveTimeFormat }}</span></div>
      <div class="cell">
        <div>
          <div class="pay_orderInfoWrap">
            <div class="show_name">
              {{ order.items[0].showName }}
            </div>
            <ul style="font-size: 13px;padding: 5px 0;display: inline-block;line-height: 20px;">
              <li>时间：{{ order.items[0].session_name }}</li>
              <li>数量：{{ order.items[0].qty }}</li>
            </ul>
          </div>
          <div
            v-if="false"
            class="select_text">
            支持支付宝和微信
          </div>
          <div
            v-if="false"
            class="pay_wayWrap">
            <ul class="pay_way">
              <li
                v-if="!isAlipay"
                :class="{b_bottom_gray: !isWeixin}">
                <div @click="payWayName ='wxPay'" >
                  <div class="payWay_icon wxPay"/>
                  <div
                    :class="{true: 'active', false: 'inactive'}[payWayName ==='wxPay']"
                    class="payWaySelectFlag"/>
                  微信支付
                </div>
              </li>

              <li v-if="!isWeixin">
                <div @click="payWayName ='aliPay'">
                  <div class="payWay_icon alipay"/>
                  支付宝
                  <div
                    :class="{true: 'active', false: 'inactive'}[payWayName ==='aliPay']"
                    class="payWaySelectFlag"/>
                </div>
              </li>
            </ul>
          </div>
          <div
            class="pay_btn gradient_btn"
            @click="wakePay">
            支付{{ order.additionalOffer ||order.total }}&nbsp;元
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
  //选择支付方式页面
  .orderPay{
    font-size: 1.4rem;
    color: #494949;
    background: rgba(239,239,247,0.60);
    .time_count{
      text-align: center;
      font-size: 1.2rem;
      //font-weight: bold;
      padding: 1.5rem 0;
      background: #F6F6FB;
    }
    .pay_orderInfoWrap{
      background: #FFF;
      padding: 0 1.5rem;
      .show_name{
        font-size: 1.3rem;
        line-height: 1.2em;
        padding: 1.2rem 0;
        //border-bottom:1px solid #E4E4E4;
      }
      .pay_orderMoney{
        font-size: 1.4rem;
        padding: 1.5rem 0;
      }
      .money{
        font-size: 1.6rem;
        color: #F2593F;
        padding-left: 1rem;
      }
    }
    .select_text{
      font-size: 12px;
      padding: 15px 0 0px 10px;
    }
    .pay_wayWrap{
      margin-top: 1rem;
      background: #FFF;
      padding: 0 1.5rem;

      .pay_way li{
        line-height: 2.4rem;
        font-size: 1.4rem;
        font-weight: bold;
        padding: 2rem 0;
        //border-top:1px solid #E4E4E4;

      }
      .payWay_icon{
        width: 2.4rem;
        height:2.4rem;
        background: red;
        float: left;
        margin-right: 1rem;

      }
      .payWay_icon.wxPay{
        background:url(~@/static/icon/wxpay.png);
        background-size: 100% 100%;
      }
      .payWay_icon.alipay{
        background:url(~@/static/icon/alipay.png);
        background-size: 100% 100%;
      }

      .payWaySelectFlag{
        width: 2rem;
        height: 2rem;
        float: right;

        &.active{
          background:url(~@/static/icon/chosenicon.png);
          background-size: 100% 100%;
        }

        &.inactive{
          background: url(~@/static/icon/unchosenicon.png);
          background-size: 100% 100%;
        }

      }

    }
    .pay_btn{
      height: 5rem;
      line-height: 5rem;
      background: #F2593F;
      text-align: center;
      font-size: 1.6rem;
      color: #FFFFFF;
      margin:4.5rem 1.5rem 0;

    }
  }
</style>

<script>
import { httpGet } from '@/common/httpUtil'
import * as sessionStorageUtil from '@/common/sessionStorageUtil'
import * as adapterStorageUtil from '@/common/adapterStorageUtil'
import { templateCompile } from '@/common/urlUtil'
import { Base64Encode } from '@/common/encryptUtil'

export default {
  props: {
    prefixUrl: {
      type: String,
      default: ''
    },
    reserveTimeUrl: {
      type: String,
      default: ''
    },
    payOrderUrl: {
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
    }
  },
  data () {
    return {
      order: {
        items: [{}]
      },
      reserveTimeFormat: '00:00',
      isWeixin: false,
      payWayName: '',
      paymentChecktime: undefined
    }
  },
  mounted () {
    sessionStorageUtil.syncSessionData()
    let self = this
    this.prefixUrl && sessionStorageUtil.set('prefix', this.prefixUrl)
    self.reserveTimeFormat = ''
    self.reserveTime = 18000000

    // 默认支付选择
    MIP.util.platform.start()
    self.isWeixin = MIP.util.platform.isWechatApp()
    self.payWayName = MIP.util.platform.isWechatApp() ? 'wxPay' : 'aliPay'
    self.isAlipay = navigator.userAgent.indexOf('AlipayClient') > -1

    self.loadOrder(MIP.hash.get('transactionOID'))
  },
  methods: {
    wakePay () {
      if ((this.order.additionalOffer) || (this.order.total)) {
        MIP.util.platform.start()
        MIP.setData({payConfig:
          {
            sessionId: sessionStorageUtil.get('bd_session') || '',
            subject: (this.order && this.order.items && this.order.items.length > 0 && this.order.items[0].showName) || '',
            fee: this.order.additionalOffer || this.order.total || 0,
            postData: {
              orderId: this.order.orderOID || '',
              transactionOID: MIP.hash.get('transactionOID') || '',
              deviceType: MIP.util.platform.isWechatApp() ? 'weixinApp' : 'weixinH5'
            }
          }
        })
        this.$nextTick(function () {
          this.$emit('showPay', {})
        })
      }
    },
    // 格式化时间
    getReserveFormat (clTime) {
      let minute = parseInt(clTime / (60 * 1000))
      let leftMinuteTime = clTime % (60 * 1000)
      let second = parseInt(leftMinuteTime / 1000)
      return second < 10 ? minute + ':0' + second : minute + ':' + second
    },
    loadOrder (transactionOID) {
      let self = this
      // 获取支付订单相关详情
      if (transactionOID) {
        let fetchUrl = templateCompile(this.payOrderUrl, { transactionOID })
        httpGet(fetchUrl)
          .then(function (data) {
            if (data.statusCode === 200 || data.statusCode === 510) {
              self.order = (data.result && data.result.data) || {}
              // 未支付状态，获取剩余支付时间
              if (self.order.orderStatus.name === 'Unpaid') {
                self.getReserveTime(transactionOID)
              } else if (self.order.orderStatus.name === 'Canceled') {
                let nextpage = `${self.nextUrl}#orderOID=${self.order.orderOID}`
                self.nextUrl && MIP.viewer.open(nextpage, {replace: true})
              } else {

              }
            } else {
              self.loginUrl && MIP.viewer.open(self.loginUrl)
            }
          })
          .catch(function (err) {
            console.log(err)
          })
      }
    },
    getReserveTime (transactionOID) {
      let self = this
      // 获取支付订单相关详情
      let fetchUrl = templateCompile(this.reserveTimeUrl, { transactionOID })
      httpGet(fetchUrl).then(function (data) {
        if (data.statusCode === 200) {
          if (data.result.time <= 0) {
            self.reserveTime = 0
            self.nextUrl && MIP.viewer.open(`${self.nextUrl}#orderOID=${self.order.orderOID}`, {replace: true})
          } else {
            self.reserveTime = data.result.time
            self.reserveTimeFormat = self.getReserveFormat(self.reserveTime)
            // 获取系统后台支付剩余时间，执行倒计时逻辑定时器
            self.setOrderPayOverdueInterval()
          }
        }
      })
    },
    setOrderPayOverdueInterval () {
      let self = this
      // 1秒一次，直到循环条件不成立，取消计时器
      self.paymentChecktime = setInterval(function () {
        // 验证有没有付款
        self.reserveTime -= 1000
        self.reserveTimeFormat = self.getReserveFormat(self.reserveTime)
        // 倒计时结束
        if (self.reserveTime <= 0) {
          clearInterval(self.paymentChecktime)
          self.reserveTime = 0
          self.reserveTimeFormat = '00:00'
          self.nextUrl && MIP.viewer.open(`${self.nextUrl}#orderOID=${self.order.orderOID}`, {replace: true})
        }
      }, 1000)
    },
    wxAuth (isForceAuth) {
      let urlHost = 'mqa666.moretickets.com'
      let callback = MIP.viewer.page.currentPageId
      let appid = ''
      if (urlHost.indexOf('moretickets.com') > -1 && urlHost.indexOf('qa') < 0 && urlHost.indexOf('dev') < 0) {
        appid = 'wx53b25b22e471f008'
      } else {
        appid = 'wx3ea72a4a401668d8'
      }
      callback = Base64Encode(Base64Encode(callback))

      let user = adapterStorageUtil.get('user')
      let openid = adapterStorageUtil.get('openid')
      if (user || openid) {
        window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?' +
        'appid=' + appid + '&redirect_uri=http%3A%2F%2F' + urlHost +
        '%2Fopenapi%2Fweixin%2Fnotify%2F' + callback + '%3FappID%3D' + appid + '&response_type=code&scope=' +
        'snsapi_base&state=moreticketState#wechat_redirect'
      }
    }
  }
}
</script>
