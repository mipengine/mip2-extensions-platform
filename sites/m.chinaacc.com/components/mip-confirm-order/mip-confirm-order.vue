<template>
  <div class="wrapper">
    <!--登录-->
    <mip-login
      id="mipLogin"
      on="isLogin:confirmPay.watchLogin"/>
    <!--登录 end-->
    <!--订单信息-->
    <div class="ddxx clearfix">
      <div class="tit clearfix">
        <div class="tit-left fl pr">
        <i class="dian abs"/>订单信息</div>
        <div class="fr">订单号：
          <span v-text="order.orderId"/>
        </div>
      </div>
      <div
        v-for="(detail, index) in productList"
        :key="index"
        class="cen clearfix">
        <div
          v-if="detail.productType == 1"
          class="left fl zgtype">课程</div>
        <div
          v-else
          class="left fl zgtype">图书</div>
        <div class="right fl sgd">
          <p
            v-if="detail.productType == 1"
            class="right-t zgname">
            <span v-text="detail.productName"/>——[
            <span v-text="detail.courseEduName"/>]
          </p>
          <p
            v-else
            class="right-t zgname">
            <span v-text="detail.productName"/>
            <em class="fr">×
              <span v-text="detail.productNum"/>
            </em>
          </p>
          <p class="right-c zgprice">
            <span/>
            <em class="fr">
              <span v-text="currency(detail.price)"/>
            </em>
          </p>
          <div
            v-if="detail.giftProducts != null && detail.giftProducts != '' && detail.giftProducts != '[]'"
            class="sxx">
            <div
              v-for="(item, index) in detail.giftProducts"
              :key="index"
              class="xnr clearfix">
              <div v-if="item.productId != null && item.productId != ''">
                <p class="xnr-l fl">[赠品]&nbsp;{{ item.productName }}</p>
                <p class="fr">
                  <span v-text="currency(0)"/>
                </p>
              </div>
              <div v-else>
                <p class="xnr-l fl">无赠品</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--订单信息 end-->

    <!--提交浮层-->
    <div class="tjfd">
      <div class="zj fl">应付总额：
        <b>
          <span class="totalneedmoney">{{ order.payMoney }}</span>
        </b>
      </div>
      <span
        v-if="loginFlag"
        class="han fr zgtjdd"
        on="tap:log.login">确认支付</span>
      <span
        v-else
        class="han fr zgtjdd"
        @click="confirmOrder">确认支付</span>
    </div>
    <!--提交浮层 end-->
  </div>
</template>

<script>
import { getCookie } from '../../common/utils/cookie'
import { currency, compareSort } from '../../common/utils'
import { getOrderDetail, toBankPage } from '../../common/api'
import { Loading } from '../../common/utils/toast'

export default {
  data () {
    return {
      order: [],
      productList: [],
      totalMoney: 0,
      finalTotalMoney: 0,
      loginFlag: true
    }
  },
  async mounted () {
    const that = this
    await that.initOrderDetail()
    // 登录监听
    that.$on('watchLogin', function () {
      // 已登录
      that.loginFlag = false
    })
  },
  methods: {
    confirmOrder () {
      const that = this
      let payConfig = {
        subject: '支付商品',
        fee: that.order.payMoney,
        sessionId: getCookie('sessionId'),
        // redirectUrl: redirectUrl,
        endpoint: {
          baifubao: '//m.chinaacc.com/m_member/baidu/gotoSalePay.shtm?type=4',
          alipay: '//m.chinaacc.com/m_member/baidu/gotoSalePay.shtm?type=3',
          weixin: '//m.chinaacc.com/m_member/baidu/gotoSalePay.shtm?type=1'
        },
        postData: {
          uid: getCookie('cdeluid'),
          payBankStyle: '18_BFBH5_10536',
          payMoney: that.order.payMoney,
          orderid: that.order.orderId,
          token: getCookie('mip-token'),
          openId: getCookie('wxOpenId')
        }
      }
      MIP.setData({ payConfig: payConfig })
      that.$emit('payAction', {})
    },
    currency (num) {
      return currency(num)
    },
    initOrderDetail () {
      const that = this
      let $Loading = new Loading()
      $Loading.open()
      let memberId = getCookie('username')

      // 获取书籍及课程列表
      let orderCourseList = getCookie('order_course_list')
      if (orderCourseList != null) {
        orderCourseList = orderCourseList.replace(/"/g, '')
      }
      let orderBookList = getCookie('order_book_list')
      if (orderBookList != null) {
        orderBookList = orderBookList.replace(/"/g, '')
      }

      // 订单详情接口
      let setting = {
        buy_book_list: orderBookList,
        select_course_list: orderCourseList,
        memberId: memberId,
        payStyle: '3',
        invoiceType: '3'
      }
      getOrderDetail(setting).then(res => {
        $Loading.close()
        // 商品信息、账户信息和优惠信息
        let discountResultList = JSON.parse(res.discountResultList)
        // 订单信息
        that.order = res.order
        that.postMoney = that.order.postMoney
        that.productList = discountResultList[0].productList
        that.productList = that.productList.sort(compareSort('productType'))
        let settings = {
          orderId: that.order.orderId + '',
          cps360: '',
          cpsyiqifa: '',
          detailIDs: '',
          payMoney: that.order.payMoney + '',
          v_why: '',
          isManual: ''
        }
        toBankPage(settings).then(res => {})
      })
    }
  }
}
</script>

<style scoped>
</style>
