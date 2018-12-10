<template>
  <section main="role">
    <div class="mod order-success">
      <div class="ui-flex-colum-wrap align-center justify-center order-success-title">
        <div class="cell icon-m icon-success"/>
        <div class="cell">订单创建成功</div>
      </div>

      <div class="order-success-tip text-center">
        <div>取车时请带好二证一卡（身份证原件、驾驶证、信用卡）</div>
      </div>

      <div class="order-success-total text-center">
        <span class="orange">订单金额
          <span class="rmb">¥</span>
          {{ totalPrice }}
        </span>
      </div>
    </div>

    <div class="btn-lg-wrap">
      <div
        class="ui-btn btn-block btn-lg btn-primary2"
        @click="ordersManage">订单管理</div>
      <div
        v-if="paymentType === 10119005"
        class="ui-btn btn-block btn-lg btn-primary2"
        @click="payOrder"
      >立即支付</div>
    </div>

    <div
      v-if="loading"
      class="loading">
      <div class="loading-bd"/>
    </div>
  </section>
</template>

<style scoped lang="less">
</style>

<script>
import util from '../../common/util'
import urls from '../../common/urls'
import '../../common/base.less'
import './mip-1hai-step4.less'

export default {
  props: {
    info: {
      type: Object,
      default () {
        return {}
      }
    },
    config: {
      type: Object,
      default () {
        return {}
      }
    },
    orderData: {
      type: Object,
      default: function () {
        return {}
      }
    },
    globalData: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },

  data () {
    return {
      loading: false
    }
  },

  created () {
    console.log('订单成功')
    // console.log(
    //   "info:",
    //   this.info,
    //   "config:",
    //   this.config,
    //   "orderData:",
    //   this.orderData,
    //   "globalData:",
    //   this.globalData
    // );

    // 没有 globData 回调到 step1
    if (!Object.keys(this.globalData).length) {
      MIP.viewer.open(urls.htmlHref.step1, {
        isMipLink: false
      })
    }

    let cartInfo = util.getCartData()
    let qs = this.getQS()

    this.totalPrice = qs.totalPrice
    this.orderId = qs.orderId
    this.paymentType = cartInfo.PaymentType
  },

  mounted () {
    window.addEventListener('show-page', () => {
      // do something when page show
    })

    window.addEventListener('hide-page', () => {
      // do something when page hide
    })
  },

  methods: {
    // query string
    getQS () {
      let url = location.search
      let qs = {}

      if (url.indexOf('?') !== -1) {
        let str = url.substr(1)
        let strs = str.split('&')

        strs.map(item => {
          qs[item.split('=')[0]] = unescape(item.split('=')[1])
        })
      }

      return qs
    },

    // 订单管理
    ordersManage () {
      MIP.viewer.open(urls.htmlHref.my, {
        isMipLink: false
      })
    },

    // 支付
    payOrder () {},

    // loading
    showLoading () {
      this.loading = true
    },
    hideLoading () {
      this.loading = false

      let that = this
      setTimeout(function () {
        that.loading = false
      }, 360)
    }
  }
}
</script>
