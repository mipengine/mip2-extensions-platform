<template>
    <div class="payforListMod">
        <!--登录-->
        <mip-login id="mipLogin" on="isLogin:allOrder.watchLogin"></mip-login>
        <!--登录 end-->
        <div class="payforList" v-if="!loginFlag && saleOrder.payStatus != -10" v-for="(saleOrder, index) in resultList" :key="index">
            <div class="order">
                <div class="orderNums fl">订单号：{{saleOrder.orderId}}</div>
                <div class="state fr">
                    <span v-if="saleOrder.payStatus == 0">未付款</span>
                    <span v-if="saleOrder.payStatus == 1">交易完成</span>
                </div>
            </div>
            <div v-if="orderDetail.productType == 1" v-for="(orderDetail, index) in saleOrder.orderDetailList" :key="index">
                <div class="cate" v-if="courseNum == 0">课程</div>
                <div class="con clearfix">
                    <div class="name fl">
                        <h3>{{orderDetail.eduSubjectName}}[{{orderDetail.selCourseTitle}}]</h3>
                    </div>
                    <div class="price fr">
                        <p>￥{{orderDetail.money}}</p>
                        <p class="pur">￥{{orderDetail.price}}</p>
                        <p class="nums">X{{orderDetail.productNum}}</p>
                    </div>
                </div>
            </div>
            <div v-if="orderDetail.productType != 1" v-for="(orderDetail, index) in saleOrder.orderDetailList" :key="index">
                <div class="cate" v-if="bookNum == 0">图书</div>
                <div class="con clearfix">
                    <div class="name fl">
                        <h3>{{orderDetail.eduSubjectName}}[{{orderDetail.selCourseTitle}}]</h3>
                    </div>
                    <div class="price fr">
                        <p>￥{{orderDetail.money}}</p>
                        <p class="pur">￥{{orderDetail.price}}</p>
                        <p class="nums">X{{orderDetail.productNum}}</p>
                    </div>
                </div>
            </div>
            <div class="total">已选{{productNum}}件商品&#12288;合计：￥<em>{{saleOrder.payMoney}}</em></div>
            <div class="btn">
                <!-- <a href="javascript:void(0)" class="fahuo" v-if="saleOrder.sendStatus == 0 && saleOrder.payStatus == 1 && saleOrder.bookProductNum > 0" style="cursor: auto;"  >待发货</a> -->
                <!-- <a v-if="saleOrder.sendStatus > 0 && saleOrder.bookProductNum > 0" href="pageContext.request.contextPath +'/shopClass/shopClass_logisticsMarketDetail.shtm?orderID='+ saleOrder.orderId" class="del" >查看发货</a> -->
                <!-- <a v-if="saleOrder.bookProductNum > 0 && saleOrder.canUpdateAddress == true" href="'http://m.chinaacc.com/sale/order/orderDetail_getSendList.shtm?orderId='+saleOrder.orderId+'&postHisId=$'+saleOrder.shopMemPostInfo.postHisId" class="del" >修改地址</a>	 -->
                <a v-if="saleOrder.payStatus != 1 && saleOrder.payStatus != -2 && saleOrder.isDel == 1" href="javascript:void(0)" class="del" onclick="delOrder(saleOrder.orderId)">删除订单</a>
                <a v-if="saleOrder.payStatus == 0" href="javascript:void(0)" class="pay" onclick="goToPay(saleOrder.orderId,saleOrder.payStyle)">付款</a>
                <!-- <a v-if="saleOrder.payStatus == 1" href="_currSiteUrlNew+'/m_member/selectcourse/index.shtm" class="continue">继续选课</a> -->
            </div>
        </div>
    </div>
</template>
<script>
import { getUrlParams } from "../../common/utils";
import { getAllOrderData } from "../../common/api";

export default {
  data() {
    return {
      resultList: [],
      productNum: 0,
      courseNum: 0,
      bookNum: 0,
      loginFlag: true
    };
  },
  mounted() {
    const that = this;
    //登录监听
    that.$on("watchLogin", function() {
      //已登录
      that.loginFlag = false;
      that.allOrder();
    });
  },
  methods: {
    allOrder() {
      const that = this;
      let params = getUrlParams();
      getAllOrderData({
        pageNum: "1",
        pageSize: "10"
      }).then(allOrderData => {
        if (allOrderData != null) {
          that.resultList = allOrderData.resultList;
        }
      });
    }
  }
};
</script>
