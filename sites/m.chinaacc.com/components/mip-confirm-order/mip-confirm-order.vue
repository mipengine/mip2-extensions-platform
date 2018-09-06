<template>
  <div class="wrapper">
    <!--登录-->
    <mip-login id="mipLogin" on="isLogin:confirmPay.watchLogin"></mip-login>
    <!--登录 end-->
    <!--订单信息-->
    <div class="ddxx clearfix">
      <div class="tit clearfix">
        <div class="tit-left fl pr">
          <i class="dian abs"></i>订单信息</div>
        <div class="fr">订单号：
          <span v-text="order.orderId"></span>
        </div>
      </div>
      <div class="cen clearfix" v-for="(detail, index) in productList" :key="index">
        <div class="left fl zgtype" v-if="detail.productType == 1">课程</div>
        <div class="left fl zgtype" v-else>图书</div>
        <div class="right fl sgd">
          <p class="right-t zgname" v-if="detail.productType == 1">
            <span v-text="detail.productName"></span>——[
            <span v-text="detail.courseEduName"></span>]
          </p>
          <p class="right-t zgname" v-else>
            <span v-text="detail.productName"></span>
            <em class="fr">×
              <span v-text="detail.productNum"></span>
            </em>
          </p>
          <p class="right-c zgprice">
            <span></span>
            <em class="fr">
              <span v-text="currency(detail.price)"></span>
            </em>
          </p>
          <div class="sxx" v-if="detail.giftProducts != null && detail.giftProducts != '' && detail.giftProducts != '[]'">
            <div class="xnr clearfix" v-for="(item, index) in detail.giftProducts" :key="index">
              <div v-if="item.productId != null && item.productId != ''">
                <p class="xnr-l fl">[赠品]&nbsp;{{item.productName}}</p>
                <p class="fr">
                  <span v-text="currency(0)"></span>
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
          <span class="totalneedmoney">{{order.payMoney}}</span>
        </b>
      </div>
      <span class="han fr zgtjdd" v-if="loginFlag" on="tap:log.login">确认支付</span>
      <span class="han fr zgtjdd" v-else @click="confirmOrder">确认支付</span>
    </div>
    <!--提交浮层 end-->
  </div>
</template>

<script>
import { getCookie } from "../../common/utils/cookie";
import { currency, compareSort } from "../../common/utils";
import { getOrderDetail, getPayUrl, toBankPage } from "../../common/api";
import { Loading } from "../../common/utils/toast";

export default {
  data() {
    return {
      order: [],
      productList: [],
      totalMoney: 0,
      finalTotalMoney: 0,
      loginFlag: true
    };
  },
  async mounted() {
    const that = this;
    await that.initOrderDetail();
    //登录监听
    that.$on("watchLogin", function() {
      //已登录
      that.loginFlag = false;
    });
  },
  methods: {
    confirmOrder() {
      const that = this;
      let payConfig = {
        subject: "支付商品",
        fee: that.order.payMoney,
        sessionId: getCookie("sessionId"),
        // redirectUrl: redirectUrl,
        endpoint: {
          baifubao: "//m.chinaacc.com/m_member/baidu/gotoSalePay.shtm?type=4",
          alipay: "//m.chinaacc.com/m_member/baidu/gotoSalePay.shtm?type=3",
          weixin: "//m.chinaacc.com/m_member/baidu/gotoSalePay.shtm?type=1"
        },
        postData: {
          uid: getCookie("cdeluid"),
          payBankStyle: "18_BFBH5_10536",
          payMoney: that.order.payMoney,
          orderid: that.order.orderId,
          token: getCookie("mip-token"),
          openId: getCookie("wxOpenId")
        }
      };
      MIP.setData({ payConfig: payConfig });
      that.$emit("payAction", {});
    },
    currency(num) {
      return currency(num);
    },
    initOrderDetail() {
      const that = this;
      let $Loading = new Loading();
      $Loading.open();
      let memberId = getCookie("username");

      // 获取书籍及课程列表
      let order_course_list = getCookie("order_course_list");
      if (order_course_list != null) {
        order_course_list = order_course_list.replace(/"/g, "");
      }
      let order_book_list = getCookie("order_book_list");
      if (order_book_list != null) {
        order_book_list = order_book_list.replace(/"/g, "");
      }

      //订单详情接口
      let setting = {
        buy_book_list: order_book_list,
        select_course_list: order_course_list,
        memberId: memberId,
        payStyle: "3",
        invoiceType: "3"
      };
      getOrderDetail(setting).then(res => {
        $Loading.close();
        // 商品信息、账户信息和优惠信息
        let discountResultList = JSON.parse(res.discountResultList);
        // 订单信息
        that.order = res.order;
        that.postMoney = that.order.postMoney;
        that.productList = discountResultList[0].productList;
        that.productList = that.productList.sort(compareSort("productType"));
        let settings = {
          orderId: that.order.orderId + "",
          cps360: "",
          cpsyiqifa: "",
          detailIDs: "",
          payMoney: that.order.payMoney + "",
          v_why: "",
          isManual: ""
        };
        toBankPage(settings).then(res => {});
      });
    }
  }
};
</script>

<style scoped>
</style>

