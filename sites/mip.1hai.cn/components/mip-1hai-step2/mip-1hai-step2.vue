<template>
  <section main="role">
    <!-- <div class="ui-flex align-start text-center carlist-hd" v-for="item in carFilterTypeList" :key="item.TypeId">
        <div @click="typeFilter" data-index="index" data-type-id="item.TypeId" class="cell" :class="{active : typeActive === index}">{{ item.Name }}</div>
    </div>-->
    <div class="carlist-bd">
      <div class="car-list">
        <div v-if="stockPriceList.length !== 0">
          <div class="car-list-panel">
            <div
              v-for="item in stockPriceList"
              :key="item.Name">
              <div v-if="item.IsChangeStore === false">
                <div
                  class="ui-flex align-center car-item"
                  @click="carChoosedTap(item)">
                  <div class="car-item-pic">
                    <mip-img
                      :data-src="item.SmallImagePath"
                      :src="item.SmallImagePath"/>
                  </div>
                  <div class="cell car-item-title">
                    <div class="text-ellipsis">{{ item.Name }}</div>
                    <div
                      v-if="item.CarTypeItem.length === 0"
                      class="text-ellipsis"
                    >{{ item.GearName }}{{ item.Emission }}{{ item.EmissionUnit }} | {{ item.StructureName }} | {{ item.MaxPassenger }}座</div>
                    <div
                      v-if="item.CarTypeItem.length > 0"
                      class="text-ellipsis"
                    >{{ item.CarTypeItem[0].GearName }} | {{ item.CarTypeItem[0].MaxPassenger }}座</div>
                  </div>
                  <div class="car-item-info">
                    <div class="car-item-info-hd">日均价</div>
                    <div class="car-item-info-bd">
                      <div class="rmb">¥</div>
                      <div class="orange">{{ item.FloorPrice }}</div>
                      <div>起</div>
                    </div>
                  </div>
                  <div class="car-item-arrow">
                    <div class="arrow aw-right"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="stockPriceList.length === 0 && showNoneTip">
          <div class="none-tip carlist-none">
            <div>对不起，当前门店该时间段内车辆已经租满。</div>
            <div>您可以重新选择其他门店。</div>
          </div>
        </div>

        <!-- <div v-if="showTypeFilterTip">
          <div class="carfilter-none">
            <div>抱歉，暂无符合要求的车型</div>
          </div>
        </div>-->
      </div>
    </div>

    <div
      :class="{show : modalShow, hide: !modalShow}"
      class="c-layer popup-car"
      @click="hideModal"
    >
      <div
        class="c-layer-box"
        @touchstart.prevent>
        <div class="hd">请选择优惠价格</div>

        <div class="bd">
          <div
            v-if="carObj.CarTypeItem === null"
            class="ui-flex align-center popup-car-info" >
            <mip-img
              :data-src="carObj.SmallImagePath"
              :src="carObj.SmallImagePath"
              layout="responsive"/>
            <div class="cell">
              <div class="title">{{ carObj.Name }}</div>
              <div
                class="extra"
              >{{ carObj.GearName }}{{ carObj.Emission }}{{ carObj.EmissionUnit }} | {{ carObj.StructureName }} | {{ carObj.MaxPassenger }}座</div>
            </div>
          </div>

          <div
            v-if="carObj.CarTypeItem !== null"
            class="ui-flex align-center popup-car-info">
            <div class="cell">
              <div class="title">{{ carObj.Name }}</div>
              <div class="extra">{{ carObj.GroupDescription }}</div>
            </div>
          </div>

          <div
            v-if="carObj.CarTypeItem !== null"
            class="popup-car-random">
            <div class="ui-flex align-center">
              <div
                v-for="item in carObj.CarTypeItem"
                :key="item.Name"
                class="cell">
                <mip-img
                  :data-src="item.CarImagePath"
                  :src="item.CarImagePath"
                  layout="responsive"/>
                <div class="text-ellipsis">{{ item.Name }}</div>
              </div>
            </div>
            <div class="orange text">{{ carObj.GroupDes }}</div>
          </div>

          <div class="popup-car-list">
            <div
              v-for="item in carObj.BookingPrice"
              :key="item.CarTypeId">
              <div v-if="item.PriceType === 1">
                <div
                  :class="{gray : !item.IsAvailble, '': item.IsAvailble}"
                  class="ui-flex align-center"
                  @touchend.stop.prevent="modalSubmitStep2(item)"
                >
                  <div class="name">{{ item.PriceName }}</div>
                  <div class="cell number">
                    <span class="rmb">¥</span>
                    <span class="orange">{{ item.AvgPrice }}</span>/日均
                  </div>
                  <div class="arrow aw-right"/>
                </div>
              </div>
            </div>

            <div
              v-for="item in carObj.BookingPrice"
              :key="item.CarTypeId">
              <div v-if="item.PriceType === 3">
                <div
                  class="ui-flex align-center gray"
                  data-price="item">
                  <div class="name">
                    {{ item.PriceName }}
                    <span>{{ item.PrepayTitle }}</span>
                  </div>
                  <div class="cell number">
                    <span class="rmb">¥</span>
                    <span class="orange">{{ item.AvgPrice }}</span>/日均
                  </div>
                  <div class="arrow aw-right"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
import './mip-1hai-step2.less'

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
      stockPriceListRaw: {},
      stockPriceList: {},
      carFilterTypeList: {},
      showNoneTip: false,
      carObj: {},
      modalShow: false,

      typeActive: 0,
      stockArray: [],
      showTypeFilterTip: false,
      loading: false
    }
  },

  created () {
    console.log('车型选择')
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

    let cartInfo = util.getCartData()
    if (cartInfo) {
      let serviceAddress = ''
      let isReturnService = false

      this.getStockPriceList(
        cartInfo.PickupTime,
        cartInfo.ReturnTime,
        cartInfo.PickupCity.Name,
        cartInfo.PickupStore.Id,
        this.globalData.IsGoldCard,
        cartInfo.PickupCity.AllowSendCar,
        serviceAddress,
        isReturnService,
        cartInfo.OrderId,
        cartInfo.EnterpriseId,
        cartInfo.IsEnterpriseUse,
        cartInfo.PickupCity.Id,
        1,
        cartInfo.ReturnStore.Id
      )
    } else {
      // 回跳
      MIP.viewer.page.back()
    }
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
    // 获取车型列表
    getStockPriceList (
      pickupTime,
      returnTime,
      cityName,
      locationId,
      isGoldCard,
      isSendCar,
      serviceAddress,
      isReturnService,
      confirmationNo,
      enterpriseId,
      isEnterpriseUse,
      cityId,
      stockType,
      returnStore
    ) {
      // Identify
      let identify = util.encrypt(
        'Version=' +
          this.globalData.Version +
          '&Source=' +
          this.globalData.Source
      )

      let lat = 0
      let lng = 0
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
          StartTime: pickupTime,
          EndTime: returnTime,
          CityName: cityName,
          LocationId: locationId,
          IsGoldCard: isGoldCard,
          IsSendCard: isSendCar,
          ServiceAddress: serviceAddress,
          IsReturnService: isReturnService,
          ConfirmationNo: confirmationNo,
          EnterpriseId: enterpriseId,
          IsEnterpriseUse: isEnterpriseUse,
          CityId: cityId,
          StockType: stockType,
          DropoffStoreId: returnStore,
          Latitude: lat,
          Longitude: lng
        }
      }
      let paramObj = util.postParamEncrypt(this.globalData.md5_key, param)

      this.showLoading()

      fetch(urls.apiHref.StockList, {
        method: 'POST',
        body: paramObj.des,
        headers: new Headers({
          'Content-Type': 'application/json;charset=utf-8',
          Token: this.globalData.Token,
          Remark: 'Unchecked',
          AppVersion: this.globalData.Version,
          Authorization: paramObj.auth,
          AppPlatform: this.globalData.Source,
          Appidentity: identify
        })
      })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
          this.hideLoading()

          let result = response.Result
          result = util.decrypt(result)
          result = JSON.parse(result)

          // console.log(result.Result);

          if (result.IsSuccess === 'false') {
            // console.log(result.Message);

            // 回跳
            MIP.viewer.page.back()

            return
          }

          this.stockPriceListRaw = result.Result.StockPriceList
          this.stockPriceList = result.Result.StockPriceList
          this.carFilterTypeList = result.Result.CarFilterTypeList
          this.showNoneTip =
            result.Result.StockPriceList.length === 0 ? 1 : 0

          // console.log( this.stockPriceList);
        })
    },

    // 点击车型
    carChoosedTap (item) {
      this.carObj = item

      this.showModal()
    },

    // 显示 Modal 框
    showModal () {
      this.modalShow = true
    },

    // 隐藏 Modal 框
    hideModal () {
      this.modalShow = false
    },

    // 支付方式选择
    modalSubmitStep2 (item) {
      // console.log(item);

      if (item.IsAvailble) {
        this.validateCartData(this.carObj, item)
      }
    },

    // 校验 step2 提交的数据
    validateCartData (cartype, price) {
      let cartInfo = util.getCartData()

      // 保存车型、价格类型信息
      cartInfo.Cartype = util.setCartype(cartype)
      cartInfo.PriceType = price.PriceType
      util.setCartData(cartInfo)

      // 有用户信息到 step3，没有到登录
      if (util.getStorage('EhiUser')) {
        MIP.viewer.open(urls.htmlHref.step3, {
          isMipLink: true
        })
      } else {
        MIP.viewer.open(urls.htmlHref.login + '?from=step2', {
          isMipLink: true
        })
      }

      // 隐藏价格弹层
      this.hideModal()
    },

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
