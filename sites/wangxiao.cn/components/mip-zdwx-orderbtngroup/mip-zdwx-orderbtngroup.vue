<template>
  <div>
    <div
      v-show="orderInfo.payStatus !== 1 && orderInfo.orderStatus !== 3"
      class="btn-group">
      <span
        v-show="orderInfo.payStatus === 0"
        class="order-btn"
        @click="cancelOrder(orderInfo)">取消订单</span>
      <span
        v-show="orderInfo.payStatus === 0"
        class="order-btn order-btn-red"
        @click="goPay(orderInfo)">去付款</span>
    </div>
    <div
      v-show="orderInfo.payStatus === 1"
      class="btn-group">
      <span
        v-show="orderInfo.evaluate === 0"
        class="order-btn"
        @click.stop="goEvaluate(orderInfo,index)">去评价</span>
      <span
        v-show="orderInfo.payStatus === 1"
        class="order-btn order-btn-red"
        @click.stop="goStudy(orderInfo,index)">去学习</span>
    </div>
  </div>
</template>
<script>
import base from '../../common/base.js'
export default {
  props: {
    orderInfo: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data () {
    return {}
  },
  computed: {
  },
  mounted () {
    base.setToken(base.getQueryString('token'))
  },
  methods: {
    goEvaluate (order) {
      let goodsId = order.goodsId || ''
      let orderId = order.orderNumber || ''
      MIP.viewer.open(MIP.util.makeCacheUrl(base.url + 'order/evaluate?id=' + goodsId + '&orderId=' + orderId + '&token=' + base.getToken()))
    },
    goStudy (order) {
      MIP.viewer.open(MIP.util.makeCacheUrl(base.url + 'user/study?token=' + base.getToken()))
    },
    goPay (order) {
      let orderId = order.orderNumber || ''
      MIP.viewer.open(MIP.util.makeCacheUrl(base.url + 'order/pay?orderId=' + orderId + '&token=' + base.getToken()))
    },
    cancelOrder (order) {
      let orderId = order.orderNumber || ''
      if (!orderId) {
        return
      }
      fetch(base.api.cancelOrder, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          orderNumber: orderId,
          token: base.getQueryString('token') || base.getToken()
        })
      })
        .then(function (response) {
          // 获得后台实际返回的内容
          response.json().then(function (data) {
            if (data.code === '000000') {
              MIP.viewer.open(MIP.util.makeCacheUrl(base.url + 'Order/orderList?token=' + base.getToken()))
            }
          })
        })
        .catch(function (err) {
          console.log('Fetch Error :-S', err)
        })
    }
  }
}
</script>
<style lang='less' scoped>
.btn-group {
  text-align: right;
  color: #333;
  height: 3.8rem;
  line-height: 3.8rem;
  background-color: #fff;
  border-top: 1px solid #e6e6e6;
}

.order-btn {
  font-size: 1.2rem;
  padding: 0.8rem;
  border: 1px solid #333;
  margin-right: 1.2rem;
  border-radius: 2.8rem;
}

.order-btn-red {
  border: 1px solid #ff6a4d;
  color: #ff6a4d;
}
</style>
