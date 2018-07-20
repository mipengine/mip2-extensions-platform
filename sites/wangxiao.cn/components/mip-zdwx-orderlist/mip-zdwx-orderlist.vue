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
          :key="index"
          class="order-course-scoped">
          <div class="br"/>
          <p class="order-num">订单编号：{{ allOrder.orderNumber }}</p>
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
          <div class="btn-group">
            <span
              v-show="allOrder.evaluate === 0"
              class="order-btn"
              @click="goEvaluate(allOrder,index)">去评价</span>
            <span
              v-show="allOrder.payStatus === 0"
              class="order-btn"
              @click="cancelOrder(allOrder,index)">取消订单</span>
            <span
              v-show="allOrder.payStatus === 1"
              class="order-btn order-btn-red"
              @click="goStudy(allOrder,index)">去学习</span>
            <span
              v-show="allOrder.payStatus === 0"
              class="order-btn order-btn-red"
              @click="goPay(allOrder,index)">去付款</span>
          </div>
        </div>
      </div>
      <div>
        <div
          v-for="(unpaiyOrder,index) in unpaiyList"
          :key="index"
          class="order-course-scoped">
          <div class="br"/>
          <p class="order-num">订单编号：{{ unpaiyOrder.orderNumber }}</p>
          <div class="order-course">
            <mip-img
              :src=" unpaiyOrder.img "
              width="130"
              height="76"/>
            <div>
              <p>
                <span>{{ unpaiyOrder.title }}</span>
                <span>￥{{ unpaiyOrder.currentPrice }}</span>
              </p>
              <p>过期时间：{{ unpaiyOrder.expiresTime }}</p>
            </div>
          </div>
          <div class="total">
            <span>共1个商品</span>
            <span>合计￥{{ unpaiyOrder.currentPrice }}元（含运费￥{{ unpaiyOrder.sysExpressPrice }}）</span>
          </div>
          <div class="btn-group">
            <span
              v-show="unpaiyOrder.payStatus === 0"
              class="order-btn"
              @click="cancelOrder(unpaiyOrder,index)">取消订单</span>
            <span
              v-show="unpaiyOrder.payStatus === 0"
              class="order-btn order-btn-red"
              @click="goPay(unpaiyOrder,index)">去付款</span>
          </div>
        </div>
      </div>
      <div>
        <div
          v-for="(paiyOrder,index) in paiyList"
          :key="index"
          class="order-course-scoped">
          <div class="br"/>
          <p class="order-num">订单编号：{{ paiyOrder.orderNumber }}</p>
          <div class="order-course">
            <mip-img
              :src=" paiyOrder.img "
              width="130"
              height="76"/>
            <div>
              <p>
                <span>{{ paiyOrder.title }}</span>
                <span>￥{{ paiyOrder.currentPrice }}</span>
              </p>
              <p>过期时间：{{ paiyOrder.expiresTime }}</p>
            </div>
          </div>
          <div class="total">
            <span>共1个商品</span>
            <span>合计￥{{ paiyOrder.currentPrice }}元（含运费￥{{ paiyOrder.sysExpressPrice }}）</span>
          </div>
          <div class="btn-group">
            <span
              v-show="paiyOrder.evaluate === 0"
              class="order-btn"
              @click="goEvaluate(paiyOrder,index)">去评价</span>
            <span
              v-show="paiyOrder.payStatus === 1"
              class="order-btn order-btn-red"
              @click="goStudy(paiyOrder,index)">去学习</span>
          </div>
        </div>
      </div>
    </mip-vd-tabs>
  </div>
</template>
<script>
import base from '../../common/base'
export default {
  components: {},
  data () {
    return {
      allOrderList: [],
      unpaiyList: [],
      paiyList: []
    }
  },
  computed: {},
  mounted () {
    let _this = this
    fetch(base.api.getOrderList, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
      })
    })
      .then(function (response) {
        // 获得后台实际返回的内容
        response.json().then(function (data) {
          _this.allOrderList = data.data.total
          _this.unpaiyList = data.data.noPay
          _this.paiyList = data.data.pay
        })
      })
      .catch(function (err) {
        console.log('Fetch Error :-S', err)
      })
  },
  methods: {
    goEvaluate (order, index) {
      let goodsId = order.goodsId || ''
      window.MIP.viewer('payorder.jsp?goodsId=' + goodsId)
    },
    goStudy (order, index) {
      window.top.location.href = order.url
    },
    goPay (order, index) {
      let orderId = order.orderNumber || ''
      window.MIP.viewer('evaluate.jsp?orderId=' + orderId)
    },
    cancelOrder (order, index) {
      let orderId = order.orderNumber || ''
      if (!orderId) {
        return
      }
      let _this = this
      fetch(base.api.cancelOrder, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          orderNumber: orderId
        })
      })
        .then(function (response) {
          // 获得后台实际返回的内容
          response.json().then(function (data) {
            // 判断如果取消成功了，需要重新渲染数据。修改allOrderList和unpaiyList对应的数据。
            _this.allOrderList.forEach(function (value, key) {
              value.orderStatus = data.orderStatus
            })
            _this.unpaiyList.forEach(function (value, key) {
              value.orderStatus = data.orderStatus
            })
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

.order-num,
.order-course > span:first-of-type {
  font-size: 1.3rem;
  color: #333;
}

.order-num {
  padding: 0 1.2rem;
  height: 3.3rem;
  line-height: 3.3rem;
  background-color: #fff;
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
