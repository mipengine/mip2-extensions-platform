<template>
  <section main="role">

    <div class="mod order-detail-order">
      <div><span class="gray">订单号：</span>{{orderDetail.OrderId}}</div>
      <div><span class="gray">订单状态：</span>{{orderDetail.StatusDescription}}</div>
      <div><span class="gray">订单金额：</span><span class="rmb">¥</span>{{orderDetail.AmountTotal}}</div>
      <div><span class="gray">支付状态：</span><span class="orange">{{orderDetail.OrderPayStaus}}</span></div>
    </div>

    <div class="mod order-detail-info">
      <div class="ui-flex align-center info-car">
        <div class="item-pic">
          <mip-img layout="responsive" :data-src="orderDetail.ImagePath" :src="orderDetail.ImagePath"></mip-img>
        </div>
        <div class="item-title">
          <div class="gray">选定车型:</div>
          <div class="text-ellipsis">{{orderDetail.Name}}</div>
          <div class="gray">{{orderDetail.GearName}} | {{orderDetail.EmissionUnit}} | {{orderDetail.StructureName}} | {{orderDetail.MaxPassenger}}</div>
        </div>
      </div>

      <div class="info-store">
        <div class="ui-flex align-start">
          <div>取车时间：</div>
          <div class="cell">{{orderDetail.PickupTime}}</div>
        </div>
        <div class="ui-flex align-start">
          <div>取车门店：</div>
          <div class="cell">
            <div>{{orderDetail.PickupAddress.Store.CityName}} {{orderDetail.PickupAddress.Store.Name}}</div>
            <div>{{orderDetail.PickupAddress.Store.Address}}</div>
          </div>
        </div>
        <div class="ui-flex align-start">
          <div>还车时间：</div>
          <div class="cell">{{orderDetail.DropoffTime}}</div>
        </div>
        <div class="ui-flex align-start">
          <div>还车门店：</div>
          <div class="cell">
            <div>{{orderDetail.DropoffAddress.Store.CityName}} {{orderDetail.DropoffAddress.Store.Name}}</div>
            <div>{{orderDetail.DropoffAddress.Store.Address}}</div>
          </div>
        </div>
        <div class="gray info-store-time" v-if="orderDetail.ActualDropoffTime">实际用车时间： {{orderDetail.ActualPickupTime}} 至 {{orderDetail.ActualDropoffTime}}</div>
      </div>
    </div>

    <div class="mod order-detail-price">
      <div class="div-title">订单明细</div>

      <div class="price-detail" v-for="item in orderDetail.PriceDetails" v-bind:key="item.Type">
        <div class="ui-flex align-center">
          <div class="name">{{item.PriceTitle}}</div>
          <div class="dotline cell"></div>
          <div class="money" v-if="item.Type != 1">{{item.PriceTotal}}元</div>
          <div class="money green" v-if="item.Type == 1">-{{item.PriceTotal}}元</div>
        </div>
      </div>

      <div class="price-total" v-if="orderDetail.GuaranteeFee">
        <div class="ui-flex align-center price-total-bd">
          <div class="cell">预授权<span>{{orderDetail.GuaranteeFee}}</span>元</div>
          <div class="money">总价<span class="orange">{{orderDetail.AmountTotal}}</span>元</div>
        </div>

        <div class="orange" style="font-size: .857em; padding-bottom: 10rpx;" v-if="orderDetail.IsShowGuaranteeTip">{{orderDetail.GuaranteeTip}}</div>

        <div class="ui-flex align-center price-total-bd">
          <div class="cell">违章押金<span>{{orderDetail.IllegalFee}}</span>元</div>
        </div>
      </div>

      <div class="price-total zhima-credit" v:if="!orderDetail.GuaranteeFee">
        <div class="ui-flex align-center price-total-bd">
          <div class="cell">
            <div class="zhima-credit-tip">您的免预授权服务已开启</div>
          </div>
          <div class="money">总价<span class="orange">{{orderDetail.AmountTotal}}</span>元</div>
        </div>

        <div class="ui-flex align-center price-total-bd">
          <div class="cell">违章押金<span>{{orderDetail.IllegalFee}}</span>元</div>
        </div>
      </div>
    </div>


    <div class="mod panel order-detail-price-status" v-if="orderDetail.PaidAmount > 0 && orderDetail.AmountTotal > orderDetail.PaidAmount">
      <div class="item">
        <div class="item-bd">已付金额：<span class="orange">{{orderDetail.PaidAmount}}</span> 元，还需支付<span class="orange">{{orderDetail.PaymentAmount}}</span>元</div>
      </div>
    </div>

    <div class="mod panel order-detail-price-status" v-if="orderDetail.PaymentAmount <= 0">
      <div class="item">
        <div class="item-bd">已付金额：<span class="orange">{{orderDetail.PaidAmount}}</span>元</div>
        <div>{{orderDetail.RebateMessage}}</div>
      </div>
    </div>


    <div class="mod ui-flex align-center order-detail-operate" v-if="orderDetail.IsAllowCancel">
      <!-- <div class="cell ui-btn btn-inline btn-lg btn-primary-line">修改</div> -->
      <div class="cell ui-btn btn-inline btn-lg btn-primary-line" @click="cancelOrderWrap">取消</div>
    </div>

    <!-- <div class="pay-total" v-if="orderDetail.Status == '10132001' && orderDetail.OrderType != '10118007' && orderDetail.PaymentAmount > 0">
      <div class="money">
        <div @click="payOrder">支付</div>
        <div>订单总额：<span class="rmb">¥</span><span>{{orderDetail.PaymentAmount}}</span></div>
      </div>
    </div> -->

    <div class="c-layer" v-bind:class="{show : sweetAlert.show, hide: !sweetAlert.show}" @click="cancelMethod">
      <div class="c-layer-box" @touchstart.prevent>
        <div class="hd" v-if="sweetAlert.title">{{sweetAlert.title}}</div>
        <div class="bd">
          <p class="confirm-content">{{sweetAlert.content}}</p>
        </div>
        <div class="ft ui-flex align-center">
          <div class="cell" @touchend.stop.prevent="cancelMethod">取消</div>
          <div class="cell btn-sure" @touchend.stop.prevent="sureMethod">确定</div>
        </div>
      </div>
    </div>

    <div class="loading" v-if="loading">
      <div class="loading-bd"></div>
    </div>
  </section>
</template>

<style scoped lang="less">
</style>

<script>
import util from "../../common/util";
import urls from "../../common/urls";
import "../../common/base.less";
import "./mip-1hai-order-detail.less";

export default {
  props: {
    info: {
      type: Object,
      default() {
        return {};
      }
    },
    config: {
      type: Object,
      default() {
        return {};
      }
    },
    orderData: {
      type: Object,
      default: function() {
        return {};
      }
    },
    globalData: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },

  data() {
    return {
      sweetAlert: {
        show: false,
        title: "默认标题",
        content: "默认内容"
      },
      loading: false,
      orderId: "",
      orderDetail: {
        PickupAddress: {
          Store: {}
        },
        DropoffAddress: {
          Store: {}
        }
      }
    };
  },

  created() {
    console.log("订单详情");
    console.log(
      "info:",
      this.info,
      "config:",
      this.config,
      "orderData:",
      this.orderData,
      "globalData:",
      this.globalData
    );

    // query string
    this.getQS();

    // 订单详情
    this.getOrderDetail();
  },

  mounted() {
    window.addEventListener("show-page", () => {
      // do something when page show
    });

    window.addEventListener("hide-page", () => {
      // do something when page hide
    });
  },

  methods: {
    // query string
    getQS() {
      let url = location.search;
      let qs = {};

      if (url.indexOf("?") !== -1 && url.indexOf("orderId") !== -1) {
        let str = url.substr(1);
        let strs = str.split("&");

        strs.map(item => {
          qs[item.split("=")[0]] = unescape(item.split("=")[1]);
        });

        this.orderId = qs.orderId;
      }
    },

    // 获取订单详情
    getOrderDetail() {
      // Identify
      let identify = util.encrypt(
        "Version=" +
          this.globalData.Version +
          "&Source=" +
          this.globalData.Source
      );
      let param =
          "" +
          "Version=" +
          this.globalData.Version +
          "&DeviceId=" +
          this.globalData.DeviceId +
          "&Source=" +
          this.globalData.Source +
          "&AppStoreId=" +
          this.globalData.AppStoreId +
          "&Idfa=" +
          this.globalData.Idfa +
          "&SessionId=" +
          this.globalData.SessionId +
          "&PromotionUrl=" +
          this.globalData.PromotionUrl +
          "&PromotionTemplateId=" +
          this.globalData.PromotionTemplateId +
          "&Longitude=" +
          this.globalData.Longitude +
          "&Latitude=" +
          this.globalData.Latitude +
          "&IpAddress=" +
          this.globalData.IpAddress +
          "&PromotionId=" +
          this.globalData.PromotionId +
          "&PhoneIMSI=" +
          this.globalData.PhoneIMSI +
          "&PhoneMAC=" +
          this.globalData.PhoneMAC +
          "&Extend=" +
          this.globalData.Extend +
          "&OperatorId=" +
          this.globalData.Extend +
          "&userId=" +
          util.getStorage("EhiUser").CustomerId +
          "&orderId=" +
          this.orderId,
        paramObj = util.getParamEncrypt(this.globalData.md5_key, param);

      this.showLoading();
      fetch(urls.apiHref.GetOrderDetail + paramObj.des, {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json;charset=utf-8",
          Token: this.globalData.Token,
          AppVersion: this.globalData.Version,
          Remark: "Unchecked",
          Authorization: paramObj.auth,
          AppPlatform: this.globalData.Source,
          Appidentity: identify
        })
      })
        .then(res => res.json())
        .catch(error => console.error("Error:", error))
        .then(response => {
          this.hideLoading();

          let result = response.Result;
          result = util.decrypt(result);
          result = JSON.parse(result);

          // console.log(result.Result);

          if (result.IsSuccess) {
            this.orderDetail = result.Result;
          } else {
            // 回跳
            MIP.diver.page.back();
          }
        });
    },

    // 取消订单
    cancelOrder() {
      // Identify
      let identify = util.encrypt(
        "Version=" +
          this.globalData.Version +
          "&Source=" +
          this.globalData.Source
      );
      let param = {
          MobileContext: {
            Version: this.globalData.Version,
            DeviceId: this.globalData.DeviceId,
            Source: this.globalData.Source,
            AppStoreId: this.globalData.AppStoreId,
            Idfa: this.globalData.Idfa,
            SessionId: this.globalData.SessionId,
            PromotionUrl: this.globalData.PromotionUrl,
            PromotionTemplateId: this.globalData.PromotionTemplateId,
            Longitude: this.globalData.Longitude,
            Latitude: this.globalData.Latitude,
            IpAddress: this.globalData.IpAddress,
            PromotionId: this.globalData.PromotionId,
            PhoneIMSI: this.globalData.PhoneIMSI,
            PhoneMAC: this.globalData.PhoneMAC,
            Extend: this.globalData.Extend,
            OperatorId: this.globalData.Extend
          },
          RequestParam: {
            OrderId: this.orderId,
            UserId: util.getStorage("EhiUser").CustomerId,
            OperatorId: "",
            ChannelId: this.globalData.ChannelId,
            CancelComment: ""
          }
        },
        paramObj = util.postParamEncrypt(this.globalData.md5_key, param);

      this.showLoading();
      fetch(urls.apiHref.CancelOrder + this.orderId, {
        method: "POST",
        body: paramObj.des,
        headers: new Headers({
          "Content-Type": "application/json;charset=utf-8",
          Token: this.globalData.Token,
          AppVersion: this.globalData.Version,
          Remark: "Unchecked",
          Authorization: paramObj.auth,
          AppPlatform: this.globalData.Source,
          Appidentity: identify
        })
      })
        .then(res => res.json())
        .catch(error => console.error("Error:", error))
        .then(response => {
          this.hideLoading();

          let result = response.Result;
          result = util.decrypt(result);
          result = JSON.parse(result);

          // console.log(result);

          if (result.IsSuccess) {
            this.$emit("show", "订单取消成功");

            // 成功刷新
            this.getOrderDetail();
          } else {
            this.$emit("show", result.Message);
          }
        });
    },

    cancelOrderWrap() {
      this.sweetAlert = {
        show: true,
        title: "",
        content: "确定取消该订单？"
      }
    },

    // sweetAlert
    cancelMethod() {
      this.sweetAlert.show = false;
    },
    sureMethod() {
      this.sweetAlert.show = false;

      // 取消订单
      this.cancelOrder();
    },

    // loading
    showLoading() {
      this.loading = true;
    },
    hideLoading() {
      this.loading = false;

      let that = this;
      setTimeout(function() {
        that.loading = false;
      }, 360);
    }
  }
};
</script>
