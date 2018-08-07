<template>
  <div class="order-list-content">
    <mip-vd-tabs>
      <section>
        <li>全部</li>
        <li>待付款</li>
        <li>已付款</li>
      </section>
      <div>
        <div
          v-for="(allOrder,index) in allOrderList"
          v-show="allOrderList.length != 0"
          :key="index"
          class="order-course-scoped"
          @click.stop="goOrderDetail(allOrder,index)">
          <div class="br"/>
          <div class="order-title-content">
            <p class="order-num">订单编号：{{ allOrder.orderNumber }}</p>
            <span class="order-statusstr">{{ allOrder.orderStatusStr }}</span>
          </div>
          <div class="order-course">
            <mip-img
              :src="allOrder.img"
              width="130"
              height="76"/>
            <div>
              <p>
                <span>{{ allOrder.title }}</span>
                <span>￥{{ allOrder.currentPrice }}</span>
              </p>
              <p>过期时间：{{ allOrder.expiresTime }}</p>
            </div>
          </div>
          <div class="total">
            <span>共1个商品</span>
            <span>合计￥{{ allOrder.currentPrice }}元（含运费￥{{ allOrder.sysExpressPrice }}）</span>
          </div>
          <div
            v-show="allOrder.payStatus !== 1 && allOrder.orderStatus !== 3"
            class="btn-group">
            <span
              v-show="allOrder.payStatus === 0"
              class="order-btn"
              @click.stop="cancelOrder(allOrder,index)">取消订单</span>
            <span
              v-show="allOrder.payStatus === 0"
              class="order-btn order-btn-red"
              @click.stop="goPay(allOrder,index)">去付款</span>
          </div>
          <div
            v-show="allOrder.payStatus === 1"
            class="btn-group">
            <span
              v-show="allOrder.evaluate === 0"
              class="order-btn"
              @click.stop="goEvaluate(allOrder,index)">去评价</span>
            <span
              v-show="allOrder.payStatus === 1"
              class="order-btn order-btn-red"
              @click.stop="goStudy(allOrder,index)">去学习</span>
          </div>
        </div>
      </div>
      <div>
        <div
          v-for="(unpayOrder,index) in unpayList"
          v-show="unpayList.length != 0"
          :key="index"
          class="order-course-scoped"
          @click.stop="goOrderDetail(unpayOrder,index)">
          <div class="br"/>
          <div class="order-title-content">
            <p class="order-num">订单编号：{{ unpayOrder.orderNumber }}</p>
            <span class="order-statusstr">{{ unpayOrder.orderStatusStr }}</span>
          </div>
          <div class="order-course">
            <mip-img
              :src=" unpayOrder.img "
              width="130"
              height="76"/>
            <div>
              <p>
                <span>{{ unpayOrder.title }}</span>
                <span>￥{{ unpayOrder.currentPrice }}</span>
              </p>
              <p>过期时间：{{ unpayOrder.expiresTime }}</p>
            </div>
          </div>
          <div class="total">
            <span>共1个商品</span>
            <span>合计￥{{ unpayOrder.currentPrice }}元（含运费￥{{ unpayOrder.sysExpressPrice }}）</span>
          </div>
          <div class="btn-group">
            <span
              v-show="unpayOrder.payStatus === 0"
              class="order-btn"
              @click.stop="cancelOrder(unpayOrder,index)">取消订单</span>
            <span
              v-show="unpayOrder.payStatus === 0"
              class="order-btn order-btn-red"
              @click.stop="goPay(unpayOrder,index)">去付款</span>
          </div>
        </div>
      </div>
      <div>
        <div
          v-for="(payOrder,index) in payList"
          v-show="payList.length != 0"
          :key="index"
          class="order-course-scoped"
          @click.stop="goOrderDetail(payOrder,index)">
          <div class="br"/>
          <div class="order-title-content">
            <p class="order-num">订单编号：{{ payOrder.orderNumber }}</p>
            <span class="order-statusstr">{{ payOrder.orderStatusStr }}</span>
          </div>
          <div class="order-course">
            <mip-img
              :src=" payOrder.img "
              width="130"
              height="76"/>
            <div>
              <p>
                <span>{{ payOrder.title }}</span>
                <span>￥{{ payOrder.currentPrice }}</span>
              </p>
              <p>过期时间：{{ payOrder.expiresTime }}</p>
            </div>
          </div>
          <div class="total">
            <span>共1个商品</span>
            <span>合计￥{{ payOrder.currentPrice }}元（含运费￥{{ payOrder.sysExpressPrice }}）</span>
          </div>
          <div class="btn-group">
            <span
              v-show="payOrder.evaluate === 0"
              class="order-btn"
              @click.stop="goEvaluate(payOrder,index)">去评价</span>
            <span
              v-show="payOrder.payStatus === 1"
              class="order-btn order-btn-red"
              @click.stop="goStudy(payOrder,index)">去学习</span>
          </div>
        </div>
      </div>
    </mip-vd-tabs>
    <div
      v-show="showErrorMessage"
      class="errorMessage">
      {{ errorMessage }}
    </div>
  </div>
</template>
<script>
import base from '../../common/base'
export default {
  components: {},
  data () {
    return {
      allOrderList: [],
      unpayList: [],
      payList: [],
      currentOrderId: '',
      showErrorMessage: false,
      errorMessage: ''
    }
  },
  computed: {},
  watch: {
    showErrorMessage: function (newQuestion, oldQuestion) {
      if (newQuestion) {
        setTimeout(() => {
          this.showErrorMessage = !this.showErrorMessage
        }, 2000)
      }
    }
  },
  mounted () {
    base.setToken(base.getQueryString('token'))
    let _this = this
    this.$element.customElement.addEventAction('login', event => {
      if (event.sessionId) {
        base.setToken(event.sessionId)
      }
      if (event.userInfo.userStatus === 0) {
        _this.getPageData()
      } else if (event.userInfo.userStatus === 3) {
        _this.errorMessage = '异常访问！'
        _this.showErrorMessage = true
      } else {
        _this.errorMessage = '网络异常！'
        _this.showErrorMessage = true
      }
    })
  },
  methods: {
    getPageData () {
      let _this = this
      fetch(base.api.getOrderList, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          token: base.getToken() || base.getQueryString('token')
        })
      })
        .then(function (response) {
          // 获得后台实际返回的内容
          response.json().then(function (data) {
            _this.allOrderList = data.data.total
            _this.unpayList = data.data.noPay
            _this.payList = data.data.pay
          })
        })
        .catch(function (err) {
          console.log('Fetch Error :-S', err)
        })
    },
    goEvaluate (order, index) {
      let goodsId = order.goodsId || ''
      let orderId = order.orderNumber || ''
      MIP.viewer.open(MIP.util.makeCacheUrl(base.url + 'order/evaluate?id=' + goodsId + '&orderId=' + orderId + '&token=' + base.getToken()))
    },
    goStudy (order, index) {
      MIP.viewer.open(MIP.util.makeCacheUrl(base.url + 'user/study?token=' + base.getToken()))
    },
    goPay (order, index) {
      let orderId = order.orderNumber || ''
      MIP.viewer.open(MIP.util.makeCacheUrl(base.url + 'order/pay?orderId=' + orderId + '&token=' + base.getToken()))
    },
    goOrderDetail (order) {
      let orderId = order.orderNumber || ''
      MIP.viewer.open(MIP.util.makeCacheUrl(base.url + 'order/detail?orderId=' + orderId + '&token=' + base.getToken()))
    },
    cancelOrder (order, index) {
      let orderId = order.orderNumber || ''
      if (!orderId) {
        return
      }
      let _this = this
      this.currentOrderId = order.orderId
      fetch(base.api.cancelOrder, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          orderNumber: orderId,
          token: base.getToken() || base.getQueryString('token')
        })
      })
        .then(function (response) {
          // 获得后台实际返回的内容
          response.json().then(function (data) {
            // 判断如果取消成功了，需要重新渲染数据。修改allOrderList和unpayList对应的数据。
            if (data.code === '000000') {
              _this.getPageData()
              _this.errorMessage = '订单取消成功！'
              _this.showErrorMessage = true
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
.order-course-scoped {
  border-top: 1px solid #e6e6e6;
}

.order-course-scoped .order-course {
  background-color: #f8f8f8;
}
.order-title-content {
  display: flex;
  justify-content: space-between;
  padding-right: 1rem;
  background: #fff;
  align-items: center;
}
.order-num,
.order-course > span:first-of-type {
  font-size: 1.3rem;
  color: #333;
}
.errorMessage {
  position: absolute;
  left: 50%;
  top: 35%;
  color: #fff;
  background: #999;
  padding: 1rem;
  border-radius: 6px;
  text-align: center;
  max-width: 18rem;
  transform: translate(-50%,-50%);
}
.order-num {
  padding: 0 1.2rem;
  height: 3.3rem;
  line-height: 3.3rem;
  background-color: #fff;
  display: inline-block;
}
.order-statusstr {
  font-size: 1.3rem;
  color: #ff6a4c;
}
.order-course {
  padding: 1rem 1.2rem;
  display: flex;
  font-size: 1.3rem;
}

.order-course > div {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-left: 1.2rem;
  flex-grow: 1;
}

.order-course > p {
  width: 15.75rem;
  height: 6rem;
}

.order-course > p img {
  width: 100%;
  height: 100%;
}

.order-course > div p:first-of-type {
  display: flex;
  justify-content: space-between;
}

.order-course > div span:first-of-type {
  display: inline-block;
  width: 16rem;
  color: #333;
}

.order-course div span:last-of-type {
  font-size: 1.4rem;
  color: #ff6a4d;
}

.total {
  text-align: right;
  color: #333;
  height: 3.2rem;
  line-height: 3.2rem;
  background-color: #fff;
  padding-right: 1.2rem;
  font-size: 1.2rem;
}

.btn-group {
  text-align: right;
  color: #333;
  height: 3.8rem;
  line-height: 3.8rem;
  background-color: #fff;
  border-top: 1px solid #e6e6e6;
}

.total > span:first-of-type {
  margin-right: 0.7rem;
}

.order-course div > p:last-of-type {
  color: #999;
}
.order-btn {
  font-size: 1.2rem;
  padding: 0.4rem 0.8rem;
  border: 1px solid #333;
  margin-right: 1.2rem;
  border-radius: 2.8rem;
}

.order-btn-red {
  border: 1px solid #ff6a4d;
  color: #ff6a4d;
}
</style>
