<template>
  <div>
    <div
      v-show="display"
      class="successfully-paid">
      <div class="successful-copy-container">
        <div class="copy">支付成功</div>
      </div>
      <div class="buttons">
        <div
          class="button"
          onclick="window._hmt.push(['_trackEvent','完成订单','click','h5'])"
          @click="queryOrder()">查看订单</div>
        <div class="space"/>
        <div
          class="button"
          onclick="window._hmt.push(['_trackEvent','完成订单','click','h5'])"
          @click="returnIndex()">返回首页</div>
      </div>
      <div class="tips">
        <div>如有疑问,请联系我们的客服</div>
        <div>服务热线：<span class="service-number">400-636-2266</span></div>
        <div>工作时间：周一至周日 9:00-21:00</div>
      </div>
    </div>
    <div
      v-show="!display"
      class="result-paid">
      {{ resultMsg }}
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

@credit-stye-color: #6A3FBE;
.result-paid{
  text-align: center;
  padding-top:40px;
  font-size:2rem;
}
.successfully-paid{
  height: 100%;
  .successful-copy-container{
    font-size: 2.4rem;
    color: #fff;
    width: 100%;
    .bg{
      width: 100%;
    }
    .copy{
      width: 100%;
      padding-top: 100px;
      line-height: 3.5rem;
      text-align: center;
      color: #2d9a00;
    }
  }
  .buttons{
    margin-top: 3.6rem;
    display: flex;
    justify-content: center;
    .space{
      width: 3rem;
    }
    .button{
      padding: 1rem 3rem;
      border: @normal-border;
      border-radius: 0.2rem;
      font-size: 1.4rem;
      color: @dark-font;
    }
  }
  .tips{
    margin-top: 3.6rem;
    text-align: center;
    color: @medium-font;
    font-size: 1.2rem;
    line-height: 2rem;
  }
}
</style>

<script>
import { httpGet } from '@/common/httpUtil'
import { templateCompile } from '@/common/urlUtil'
import * as sessionStorageUtil from '@/common/sessionStorageUtil.js'
export default {
  props: {
    prefixUrl: {
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
    },
    homeUrl: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      order: {},
      display: false,
      resultMsg: '支付结果处理中...',
      count: 3
    }
  },
  mounted () {
    sessionStorageUtil.syncSessionData()
    let self = this
    self.prefixUrl && sessionStorageUtil.set('prefix', self.prefixUrl)
    self.loadOrder()
  },
  methods: {
    loadOrder () {
      let self = this
      let transactionOID = MIP.hash.get('transactionOID')
      if (transactionOID) {
        let fetchUrl = templateCompile(self.payOrderUrl, {transactionOID})
        httpGet(fetchUrl).then(function (data) {
          if (data.statusCode === 200) {
            if (data.result.data.orderStatus.name === 'Canceled') {
              self.display = false
              self.resultMsg = '订单已经取消'
            } else if (data.result.data.orderStatus.name === 'Unpaid') {
              self.resultInterval = setInterval(function () {
                if (self.count > 0) {
                  self.count = self.count - 1
                  self.loadOrder()
                } else {
                  clearInterval(self.resultInterval)
                }
              }, 2000)
            } else {
              self.order = data.result.data
              self.display = true
            }
          } else if (data.statusCode === 1005) {
            MIP.viewer.page.currentPageId && sessionStorageUtil.set('login_back_url', MIP.viewer.page.currentPageId + '#transactionOID=' + MIP.hash.get('transactionOID'))
            self.loginUrl && MIP.viewer.open(self.loginUrl)
          }
        })
      }
    },
    queryOrder () {
      this.nextUrl && MIP.viewer.open(`${this.nextUrl}#orderOID=${this.order.orderOID}`)
    },
    returnIndex () {
      this.homeUrl && MIP.viewer.open(this.homeUrl)
    }
  }
}
</script>
