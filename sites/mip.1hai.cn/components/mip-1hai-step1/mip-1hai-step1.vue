<template>
  <section main="role">
    <div class="panel-new">
      <div class="panel-new-bd">

        <div class="ui-flex align-start list-item">
          <div class="cell list-item-pickup" @click="chooseCity" data-type="0">
            <div class="gray">取车城市</div>
            <div class="gray" v-if="!pickUpCity.Name">请选择城市</div>
            <div v-if="pickUpCity.Name">{{pickUpCity.Name}}</div>
          </div>
          <div class="cell list-item-dropoff" @click="chooseCity" data-type="1">
            <div class="gray">还车城市</div>
            <div class="gray" v-if="!dropOffCity.Name">请选择城市</div>
            <div v-if="dropOffCity.Name">{{dropOffCity.Name}}</div>
          </div>
        </div>

        <div class="ui-flex align-start list-item">
          <div class="cell list-item-pickup" @click="chooseStore" data-type="0" data-city-id="pickUpCity.Id" data-city-name="pickUpCity.Name">
            <div class="gray">取车门店</div>
            <div class="gray" v-if="!pickUpStore.Name">请选择门店</div>
            <div v-if="pickUpStore.Name">{{pickUpStore.Name}}</div>
          </div>
          <div class="cell list-item-dropoff" @click="chooseStore" data-type="1" data-city-id="dropOffCity.Id" data-city-name="dropOffCity.Name">
            <div class="gray">还车门店</div>
            <div class="gray" v-if="!dropOffStore.Name">请选择门店</div>
            <div v-if="dropOffStore.Name">{{dropOffStore.Name}}</div>
          </div>
        </div>

        <div class="ui-flex align-center list-item">
          <div class="list-item-pickup" @click="showDatePicker" data-type='PickUp'>
            <div class="gray">取车时间</div>
            <div>{{pickUpDate.simply}}</div>
            <div>{{pickUpDate.week}} {{pickUpTime}}</div>
          </div>

          <div class="cell blue text-center panel-new-status">
            <div class="panel-new-status-wrap">
              <div class="panel-new-status-text" v-if="!rentDays.h">
                <div>{{rentDays}}</div>
              </div>

              <div class="panel-new-status-text" v-if="rentDays.h">
                <div>{{rentDays.d}}</div>
                <div>{{rentDays.h}}</div>
              </div>
            </div>
          </div>

          <div class="list-item-dropoff" @click="showDatePicker" data-type='DropOff'>
            <div class="gray">还车时间</div>
            <div>{{dropOffDate.simply}}</div>
            <div>{{dropOffDate.week}} {{dropOffTime}}</div>
          </div>
        </div>

      </div>
    </div>

    <div class="btn-lg-wrap">
      <div class="ui-btn btn-block btn-lg btn-primary2" @click="submitStep1">去选车</div>
    </div>

    <!-- <view class="c-layer {{showDatePickerModal ? 'show' : 'hide'" @click="hideDatePicker">
      <view class="c-layer-box" catchTap="cancelBubble">

        <view class="hd">{{isDropOff ? '请选择还车时间' : '请选择取车时间'}}</view>

        <view class="bd">
          <picker-view value="defaultPickUpIndex" onChange="changePickUp" v-if="showDatePickerModal && !isDropOff">
            <picker-view-column>
              <block a:for="dateList">
                <view>{{item.simply}} {{item.week}}</view>
              </block>
            </picker-view-column>

            <picker-view-column>
              <block a:for="timeList">
                <view>{{item}}</view>
              </block>
            </picker-view-column>
          </picker-view>

          <picker-view value="defaultDropOffIndex" onChange="changeDropOff" v-if="showDatePickerModal && isDropOff">
            <picker-view-column>
              <block a:for="dateList">
                <view>{{item.simply}} {{item.week}}</view>
              </block>
            </picker-view-column>

            <picker-view-column>
              <block a:for="timeList">
                <view>{{item}}</view>
              </block>
            </picker-view-column>
          </picker-view>
        </view>

        <view class="ft ui-flex align-center">
          <view class="cell btn-cancel" @click="btnCancel">取消</view>
          <view class="cell btn-sure" @click="btnConfirm">确定</view>
        </view>

      </view>
    </view> -->

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
import "./mip-1hai-step1.less";

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
      loading: false,

      pickUpCity: "",
      dropOffCity: "",
      pickUpStore: "",
      dropOffStore: "",

      rentDays: "",
      pickUpDate: {},
      dropOffDate: {},
      pickUpTime: "",
      dropOffTime: "",

      isDropOff: false,
      dateList: null,
      timeList: null,
      showDatePickerModal: false
    };
  },

  created() {
    console.log("自驾短租");
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

    let cartInfo = util.getCartData();

    if (cartInfo) {
      this.pickUpCity = cartInfo.PickupCity;
      this.dropOffCity = cartInfo.ReturnCity;
      this.pickUpStore = cartInfo.PickupStore;
      this.dropOffStore = cartInfo.ReturnStore;

      this.pickUpDate = util.createDate(cartInfo.PickupTime.split(" ")[0]);
      this.dropOffDate = util.createDate(cartInfo.ReturnTime.split(" ")[0]);
      this.pickUpTime = cartInfo.PickupTime.split(" ")[1];
      this.dropOffTime = cartInfo.ReturnTime.split(" ")[1];

      this.rentDays = util.formatRentDays(
        cartInfo.PickupTime,
        cartInfo.ReturnTime
      );

      this.getInitCart("", this.pickUpTime, this.dropOffTime, "", "", "", "");
    } else {
      this.getInitCart("", "", "", "", "", "", "");
    }
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
    // 初始化订单
    getInitCart(isBatch, pickUpTime, dropOffTime, storeId, cityId, lng, lat) {
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
            IsBatch: isBatch || false,
            SpecifyStoreId: "",
            SpecifyCityId: "",
            Logitude: lng,
            Latitude: lat,
            SpecifyPickupTime: "",
            SpecifyReturnTime: ""
          }
        },
        paramObj = util.postParamEncrypt(this.globalData.md5_key, param);

      this.showLoading();
      fetch(urls.apiHref.BookingInit, {
        method: "POST",
        body: paramObj.des,
        headers: new Headers({
          "Content-Type": "application/json;charset=utf-8",
          Token: this.globalData.Token,
          Remark: "Unchecked",
          AppVersion: this.globalData.Version,
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

          if (result.IsSuccess === true) {
            let cartInfo = {
              PickupTime: util.formatStrWithSpace(result.Result.PickupTime),
              ReturnTime: util.formatStrWithSpace(result.Result.ReturnTime),
              PickupCity: result.Result.DefaultCity,
              PickupStore: result.Result.DefaultStore,
              IsPickupService: false,
              PickupService: "",
              ReturnCity: result.Result.DefaultCity,
              ReturnStore: result.Result.DefaultStore,
              IsReturnService: false,
              ReturnService: "",
              IsBatch: false,
              IsModifyOrder: false,
              UserId: "",
              OrderId: "",
              ChannelId: "",
              EdmId: "",
              EnterpriseId: "",
              IsEnterpriseUse: false,
              CorpUid: "",
              Ldata: "",
              PromotionUrl: "",
              Cartype: "",
              PaymentType: 10119004,
              PriceType: 1,
              OrderType: 10118001
            };

            util.setCartData(cartInfo);

            this.pickUpCity = cartInfo.PickupCity;
            this.dropOffCity = cartInfo.ReturnCity;
            this.pickUpStore = cartInfo.PickupStore;
            this.dropOffStore = cartInfo.ReturnStore;

            this.pickUpDate = util.createDate(
              cartInfo.PickupTime.split(" ")[0]
            );
            this.dropOffDate = util.createDate(
              cartInfo.ReturnTime.split(" ")[0]
            );
            this.pickUpTime = cartInfo.PickupTime.split(" ")[1];
            this.dropOffTime = cartInfo.ReturnTime.split(" ")[1];

            this.rentDays = util.formatRentDays(
              cartInfo.PickupTime,
              cartInfo.ReturnTime
            );
          } else {
            console.log(result.Message);
          }
        });
    },

    // // 城市
    // chooseCity(event) {
    //   let isReturn = ~~event.target.dataset.type,
    //     isReturnFlag = isReturn ? "Y" : "N",
    //     that = this;

    //   my.navigateTo({
    //     url: "../step1-city/index?isReturn=" + isReturnFlag
    //   });
    // },

    // // 门店
    // chooseStore(event) {
    //   let isReturn = ~~event.target.dataset.type,
    //     cityId = event.target.dataset.cityId,
    //     cityName = event.target.dataset.cityName,
    //     isReturnFlag = isReturn ? "Y" : "N",
    //     that = this;

    //   my.navigateTo({
    //     url:
    //       "../step1-store/index?cityId=" +
    //       cityId +
    //       "&cityName=" +
    //       cityName +
    //       "&isReturn=" +
    //       isReturnFlag
    //   });
    // },

    // 去选车
    submitStep1(event) {
      if (!this.pickUpCity) {
        console.log("请选择取车城市");

        return;
      }

      if (!this.dropOffCity) {
        console.log("请选择还车城市");

        return;
      }

      if (!this.pickUpStore) {
        console.log("请选择取车门店");

        return;
      }

      if (!this.dropOffStore) {
        console.log("请选择还车门店");

        return;
      }

      let cartInfoFull = util.getCartData();
      cartInfoFull.UserId = util.getStorage("EhiUser")
        ? util.getStorage("EhiUser").CustomerId
        : "";

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
          RequestParam: cartInfoFull
        },
        paramObj = util.postParamEncrypt(this.globalData.md5_key, param);

      this.showLoading();

      fetch(urls.apiHref.Step1SubmitValidate, {
        method: "POST",
        body: paramObj.des,
        headers: new Headers({
          "Content-Type": "application/json;charset=utf-8",
          Token: this.globalData.Token,
          Remark: "Unchecked",
          AppVersion: this.globalData.Version,
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

          if (result.IsSuccess === true) {
            MIP.viewer.open(urls.htmlHref.step2, {
              isMipLink: true
            });
          } else {
            console.log(result.Message);
            return;
          }
        });
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
