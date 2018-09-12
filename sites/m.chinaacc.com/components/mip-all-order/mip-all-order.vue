<template>
  <div class="payforListMod">
    <!--登录-->
    <mip-login
      id="mipLogin"
      on="isLogin:allOrder.watchLogin"/>
    <!--登录 end-->
    <div
      v-for="(saleOrder, index) in resultList"
      v-if="!loginFlag && saleOrder.payStatus != -10"
      :key="index"
      class="payforList">
      <div class="order">
        <div class="orderNums fl">订单号：{{ saleOrder.orderId }}</div>
        <div class="state fr">
          <span v-if="saleOrder.payStatus == 0">未付款</span>
          <span v-if="saleOrder.payStatus == 1">交易完成</span>
        </div>
      </div>
      <div
        v-for="(orderDetail, index) in saleOrder.orderDetailList"
        v-if="orderDetail.productType == 1"
        :key="index">
        <div
          v-if="courseNum == 0"
          class="cate">课程</div>
        <div class="con clearfix">
          <div class="name fl">
            <h3>{{ orderDetail.eduSubjectName }}[{{ orderDetail.selCourseTitle }}]</h3>
          </div>
          <div class="price fr">
            <p>￥{{ orderDetail.money }}</p>
            <p class="pur">￥{{ orderDetail.price }}</p>
            <p class="nums">X{{ orderDetail.productNum }}</p>
          </div>
        </div>
      </div>
      <div
        v-for="(orderDetail, index) in saleOrder.orderDetailList"
        v-if="orderDetail.productType != 1"
        :key="index">
        <div
          v-if="bookNum == 0"
          class="cate">图书</div>
        <div class="con clearfix">
          <div class="name fl">
            <h3>{{ orderDetail.eduSubjectName }}[{{ orderDetail.selCourseTitle }}]</h3>
          </div>
          <div class="price fr">
            <p>￥{{ orderDetail.money }}</p>
            <p class="pur">￥{{ orderDetail.price }}</p>
            <p class="nums">X{{ orderDetail.productNum }}</p>
          </div>
        </div>
      </div>
      <div class="total">已选{{ productNum }}件商品&#12288;合计：￥<em>{{ saleOrder.payMoney }}</em></div>
      <div class="btn">
        <!-- <a
          v-if="saleOrder.payStatus != 1 && saleOrder.payStatus != -2 && saleOrder.isDel == 1"
          class="del"
          @click="delOrder(saleOrder.orderId)">删除订单</a> -->
        <a
          v-if="saleOrder.payStatus == 0"
          class="pay"
          @click="gotoPay(saleOrder.orderId)">付款</a>
      </div>

    </div>
  </div>
</template>
<script>
import { gotoUrl } from '../../common/utils'
import { getCookie } from '../../common/utils/cookie'
import {
  getAllOrderData,
  updateOrder
} from '../../common/api'
export default {
  data () {
    return {
      resultList: [],
      productNum: 0,
      courseNum: 0,
      bookNum: 0,
      loginFlag: true
    }
  },
  mounted () {
    const that = this
    // 登录监听
    that.$on('watchLogin', function () {
      // 已登录
      that.loginFlag = false
      that.allOrder()
    })
  },
  methods: {
    allOrder () {
      const that = this
      getAllOrderData({
        pageNum: '1',
        pageSize: '10'
      }).then(allOrderData => {
        if (allOrderData != null) {
          that.resultList = allOrderData.resultList
        }
      })
    },
    gotoPay (orderId) {
      let orderBookList = getCookie('order_book_list')
      if (orderBookList != null) {
        orderBookList = orderBookList.replace(/"/g, '')
      }
      let setting = {
        orderId: orderId + '',
        prules: '0',
        pvip: '1',
        buy_book_list: orderBookList,
        voucherIds: '',
        yqm: '0'
      }
      updateOrder(setting).then(res => {
        if (res.code + '' === '1') {
          gotoUrl('/payment/confirmOrder.html')
        }
      })
    }/* ,
    delOrder (orderId) {

    } */
  }
}
</script>
