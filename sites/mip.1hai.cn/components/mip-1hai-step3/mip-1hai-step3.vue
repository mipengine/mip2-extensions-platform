<template>
  <section main="role">
    <div v-if="cartInfo.Cartype.Name !== null">
      <div
        v-if="additionalInfo.LimitTips.length !== 0"
        class="tip">{{ additionalInfo.LimitTips }}</div>

      <div class="mod info">
        <div
          v-if="cartInfo.Cartype === null"
          class="info-car">
          <div class="ui-flex-colum-wrap align-center justify-center">
            <div class="cell item-pic">
              <mip-img
                :data-src="cartInfo.Cartype.SmallImagePath"
                :src="cartInfo.Cartype.SmallImagePath"
                layout="responsive"
              />
            </div>
            <div class="cell item-title">
              <div class="blue text-ellipsis">{{ cartInfo.Cartype.Name }}</div>
              <div
                class="gray"
              >{{ cartInfo.Cartype.GearName }}{{ cartInfo.Cartype.Emission }}{{ cartInfo.Cartype.EmissionUnit }} | {{ cartInfo.Cartype.StructureName }} | {{ cartInfo.Cartype.MaxPassenger }}</div>
            </div>
          </div>
        </div>

        <div
          v-if="cartInfo.Cartype !== null"
          class="info-car">
          <div class="ui-flex-colum-wrap align-center justify-center">
            <div class="cell item-pic">
              <mip-img
                :data-src="cartInfo.Cartype.SmallImagePath"
                :src="cartInfo.Cartype.SmallImagePath"
                layout="responsive"
              />
            </div>
            <div class="cell item-title">
              <div class="blue text-ellipsis">{{ cartInfo.Cartype.Name }}</div>
              <div class="gray">{{ cartInfo.Cartype.GearName }} | {{ cartInfo.Cartype.MaxPassenger }}座</div>
            </div>
          </div>
        </div>

        <div class="ui-flex align-center info-store">
          <div>
            <div>{{ cartInfo.PickupCity.Name }}</div>
            <div>
              <div class="text-ellipsis">{{ cartInfo.PickupStore.Name }}</div>
            </div>
            <div>{{ cartInfo.PickupTime }}</div>
          </div>

          <div class="cell blue text-center panel-new-status">
            <div class="panel-new-status-wrap">
              <div
                v-if="!rentDays.h"
                class="panel-new-status-text">
                <div>{{ rentDays }}</div>
              </div>

              <div
                v-if="rentDays.h"
                class="panel-new-status-text">
                <div>{{ rentDays.d }}</div>
                <div>{{ rentDays.h }}</div>
              </div>
            </div>
          </div>

          <div class="text-right">
            <div>{{ cartInfo.ReturnCity.Name }}</div>
            <div>
              <div class="text-ellipsis">{{ cartInfo.ReturnStore.Name }}</div>
            </div>
            <div>{{ cartInfo.ReturnTime }}</div>
          </div>
        </div>
      </div>

      <div class="mod-wrap">
        <!-- 费用明细 -->
        <div class="pay-total">
          <div class="ui-flex-colum-wrap align-center justify-center black money">
            <div class="cell rmb">¥</div>
            <div class="cell">{{ priceAll.OrderPriceTotal }}</div>
          </div>
          <div class="orange type">{{ choosedPriceType === 1 ? '门店现付价' : '在线预付价' }}</div>
          <div
            class="ui-flex-colum-wrap align-center justify-center blue detail"
            @click="showPriceDetail"
          >
            <div class="cell">费用明细</div>
            <div class="cell arrow aw-right"/>
          </div>
        </div>

        <!-- 指定车型 -->
        <div
          v-if="groupCarTypeDetail"
          class="mod panel mgt0 mgb0 bd0 item-list toggle-choose">
          <div class="item border-bottom-px1">
            <div class="item-bd">
              <span class="blue">指定车型</span>
            </div>
            <div
              :class="{current : isSelectChooseCar}"
              class="ui-switch"
              @click="toggleChooseCar"
            >
              <div
                :class="{current : isSelectChooseCar}"
                class="ui-switch-bg"/>
              <div class="ui-switch-scroll"/>
            </div>
          </div>
        </div>
        <div
          v-if="isSelectChooseCar"
          class="radio-group">
          <div class="mod panel mgt0 mgb0 bd0 item-list choose-car">
            <div
              v-for="item in groupCarTypeDetail.CarTypeList"
              :key="item.CartType">
              <div
                v-if="item.IsAvailbale"
                @click="radioChooseCar(item.CarType)">
                <div
                  :class="{active: chooseCar === item.CarType}"
                  class="item border-bottom-px1">
                  <div class="item-bd">
                    <span class="blue">{{ item.Name }}</span>
                  </div>

                  <div class="icon-radio"/>
                </div>
              </div>
            </div>

            <div
              v-for="item in groupCarTypeDetail.CarTypeList"
              :key="item.CartType">
              <label v-if="!item.IsAvailbale">
                <div class="item border-bottom-px1 unavailable">
                  <div class="item-bd">
                    <span class="gray">{{ item.Name }}</span>
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>

        <!-- 新版增值服务 -->
        <div class="mod panel mgt0 mgb0 bd0 item-list normal-added">
          <div
            v-for="item in addedServicesPackage"
            :key="item.FeeBrief">
            <div class="item border-bottom-px1">
              <div class="added">
                <div class="ui-flex align-center added-item icon-question-gray">
                  <!-- <div class="cell" data-service="item" @click="openAddedDescModal"> -->
                  <div
                    class="cell"
                    data-service="item">
                    <span class="blue">{{ item.Description }}</span>
                    <span
                      v-if="item.Recommend.length > 0"
                      class="icon-recommend">{{ item.Recommend }}</span>
                    <span class="gray added-item-desc">{{ item.FeeBrief }}</span>
                  </div>

                  <div
                    :class="{current : (chooseAdded.indexOf(item.Type) > -1)}"
                    class="ui-switch"
                    @click="chooseAddedNew(item)"
                  >
                    <div
                      :class="{current : (chooseAdded.indexOf(item.Type) > -1)}"
                      class="ui-switch-bg"
                    />
                    <div class="ui-switch-scroll"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="mod-line-fix"/>

        <!-- 选项 -->
        <div class="mod panel option">
          <div class="item border-top-px1">
            <div class="item-hd">支付方式</div>
            <div class="item-bd">{{ finalPayWay.Name }}</div>
            <div class="arrow aw-right"/>
          </div>

          <!-- <div class="item border-top-px1" onTap="goPromotion">
            <div class="item-hd"><div class="icon-promotion orange">优惠折扣</div/>
            <div class="item-bd" v-if="promotionName.length === 0"><span class="gray">请选择</span/>
            <div class="item-bd" v-if="promotionName.length !== 0"><div>{{ promotionName }}</div/>
            <div class="gray">更多优惠</div>
            <div class="arrow aw-right"/>
          </div>-->
        </div>

        <!-- <div class="mod mg0 bdb0 panel option">
          <div class="item border-top-px1" onTap="goRenter">
            <div class="item-hd">常用租车人</div>
            <div class="item-bd" v-if="renterName.length === 0"><text class="gray">请选择</text/>
            <div class="item-bd" v-if="renterName.length !== 0"><div>{{ renterName }}</div/>
            <div class="arrow aw-right"/>
          </div>
        </div>-->
        <div class="mod mg0 bdb0 order-tip">
          <div>温馨提示：</div>
          <div>1、首次租车请使用本人信用卡，
            <span class="orange">本人二代有效身份证，本人有效地方驾驶证正副本</span>。
          </div>
          <div>2、本订单仅为客户租车预约登记，提交该订单后，客户需要到门店办理具体租车手续，具体权利义务以签署的合同为准。</div>
          <!-- <div>3、为了您能更好的用车请点击查看<text class="blue" onTap="openWV" data-url="https://app.1hai.cn/Order/Step3/Index">规则说明</text>。</div> -->
        </div>
      </div>
    </div>

    <mip-fixed
      v-show="showPriceDetailModal"
      still
      class="layer-fixed">
      <div
        :class="{ show: showPriceDetailModal, hide: showPriceDetailModal }"
        class="price"
        @click="hidePriceDetail"
      >
        <div class="price-wrap">
          <div class="price-hd">费用明细</div>

          <div class="price-bd">
            <div
              v-for="item in commonFees"
              :key="item.Title">
              <div class="ui-flex align-center">
                <div class="cell name">{{ item.Tilte }}</div>
                <div class="money orange">
                  <span class="rmb">¥</span>
                  {{ item.PriceTotal }}
                </div>
              </div>
            </div>

            <div
              v-for="item in otherFees"
              :key="item.Description">
              <div class="ui-flex align-center">
                <div class="cell name">{{ item.Description }}</div>
                <div class="money orange">
                  <span class="rmb">¥</span>
                  {{ item.Amount }}
                </div>
              </div>
            </div>

            <div
              v-if="priceAll.OrderPromotionItem.PriceDetails.length > 0"
              class="divide-dashed"/>

            <div
              v-for="item in priceAll.OrderPromotionItem.PriceDetails"
              :key="item.Title">
              <div class="ui-flex align-center">
                <div class="cell name">{{ item.PromotionTitle }}</div>
                <div class="money green">-
                  <span class="rmb">¥</span>
                  {{ item.Amount }}
                </div>
              </div>
            </div>
          </div>

          <div
            v-if="!priceAll.IsZhimaPromotion"
            class="price-total" >
            <div class="ui-flex align-center price-total-bd">
              <div class="cell">违章押金
                <span class="rmb">¥</span>
                {{ priceAll.IllegalPrice }}
              </div>
              <div>订单总额
                <span class="orange price-total-number">
                  <span class="rmb">¥</span>
                  {{ priceAll.OrderPriceTotal }}
                </span>
              </div>
            </div>

            <div class="ui-flex align-center price-total-bd">
              <div class="cell">预授权
                <span class="rmb">¥</span>
                {{ priceAll.Guarantee }}
              </div>
            </div>
          </div>

          <div
            v-if="priceAll.IsZhimaPromotion"
            class="price-total zhima-credit">
            <div class="ui-flex align-center price-total-bd">
              <div class="cell">违章押金
                <span class="rmb">¥</span>
                {{ priceAll.IllegalPrice }}
              </div>
              <div>订单总额
                <span class="orange price-total-number">
                  <span class="rmb">¥</span>
                  {{ priceAll.OrderPriceTotal }}
                </span>
              </div>
            </div>

            <div class="ui-flex align-center price-total-bd">
              <div class="cell">
                <div class="zhima-credit-tip">您的免预授权服务已开启</div>
              </div>
            </div>
          </div>

          <div class="price-ft">
            <div>费用说明：</div>
            <div>1、预授权（可退）：车辆保证金以“预授权”（冻结额度）形式支付，还车无问题前提下，操作“预授权撤销”（解冻额度）；租期如满15天，以消费形式支付。</div>
            <div>2、违章押金（可退）：以“预授权”（冻结额度）形式支付，交易日起、满30-45天，无违章前提下，由发卡银行自动解冻（恢复额度），已知交通、农业银行为45天解冻周期。</div>
            <div>3、超时费：超出约定还车时间、所收取的费用。</div>
            <div>4、油费：还车时少于发车时的油量，客户需根据市价支付油费和加油服务费；若多于发车时的油量，会根据油市价返还给到客户余额账户。</div>
            <div>5、异地还车费：取还车、非相同城市、门店，根据两地之间公里数、计算出的费用（部分同城市门店取还车、无需收取该费用，以最终下单信息为准）。</div>
            <div>6、基本保障服务费：包含交强险，增值保障服务，车损险。</div>
            <div>7、改签费：预订高端车型，在取车前72小时内修改订单所收取的费用。</div>
          </div>
        </div>
      </div>
    </mip-fixed>

    <mip-fixed
      still
      type="bottom"
      class="submit-warp">
      <div
        class="ui-btn btn-block btn-lg btn-primary2"
        @click="createOrderBefore">提交订单</div>
    </mip-fixed>

    <div
      :class="{show : sweetAlert.show, hide: !sweetAlert.show}"
      class="c-layer"
      @click="cancelMethod"
    >
      <div
        class="c-layer-box"
        @touchstart.prevent>
        <div
          v-if="sweetAlert.title"
          class="hd" >{{ sweetAlert.title }}</div>
        <div class="bd">
          <p class="confirm-content">{{ sweetAlert.content }}</p>
        </div>
        <div class="ft ui-flex align-center">
          <div
            v-if="sweetAlert.showCancel"
            class="cell"
            @touchend.stop.prevent="cancelMethod">取消</div>
          <div
            v-if="sweetAlert.showOk"
            class="cell btn-sure"
            @touchend.stop.prevent="sureMethod">确定</div>
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
import './mip-1hai-step3.less'

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
      sweetAlert: {
        show: false,
        title: '默认标题',
        content: '默认内容',
        showCancel: true,
        onCancel: null,
        showOk: true,
        onOk: null
      },

      rentDays: '',
      cartInfo: {},

      priceAll: {
        OrderPromotionItem: {
          PriceDetails: ''
        }
      },
      additionalInfo: {
        LimitTips: ''
      },

      commonFees: {},
      otherFees: {},

      totalPrice: '',
      choosedPriceType: '', // 价格类型

      showPriceDetailModal: false,

      placePayWayIndex: {}, // 支付方式
      defaultPayWayIndex: {},
      listPayWay: {},
      finalPayWay: {},
      showPayWayModal: false,

      chooseCar: '', // 已指定车型id
      isSelectChooseCar: false, // 是否指定车型
      groupCarTypeDetail: {},

      chooseAdded: [], // 已选择增值服务
      addedServicesPackage: {},
      addedServicesPackagePair: [],
      addedServicesPackageChoosed: '',
      AddedDescModal: false,
      AddedDescModalText: '',

      promotionName: '', // 已选优惠标题

      renterName: '', // 常用租车人

      loading: false
    }
  },

  created () {
    console.log('订单详情')
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

    // // 初始化，清除 globalData OrderData
    // MIP.setData({
    //   "#orderData": {
    //     IsZhimaPromotion: "", // 是否预授权
    //     SelectedPromotion: "", // 已选优惠
    //     SelectedPromotionName: "", // 已选优惠标题

    //     SelectedRenter: "", // 已选常用租车人
    //     SelectedRenterName: "", // 已选常用租车人姓名

    //     ChoosedCar: "", // 已指定车型id
    //     IsSelectChoosedCar: false, // 是否指定车型
    //     ChoosedAdded: [] // 已选增值服务
    //   }
    // });

    // 没有 globData 回调到 step1
    if (!Object.keys(this.globalData).length) {
      MIP.viewer.open(urls.htmlHref.step1, {
        isMipLink: false
      })
    }

    let cartInfo = util.getCartData()
    if (cartInfo) {
      this.cartInfo = cartInfo
      this.rentDays = util.formatRentDays(
        cartInfo.PickupTime,
        cartInfo.ReturnTime
      )
      this.choosedPriceType = cartInfo.PriceType

      // console.log(this.cartInfo);

      this.getZhimaAndIllegal(cartInfo)

      // 指定车型
      if (cartInfo.Cartype.GroupId > 0) {
        this.appointCarTypes(cartInfo)
      }

      // 新版增值服务;
      this.getAddedServiceList(cartInfo)
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
    // 获取价格信息
    getPriceDetail (cartInfo) {
      // Identify
      let identify = util.encrypt(
        'Version=' +
          this.globalData.Version +
          '&Source=' +
          this.globalData.Source
      )
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
          OrderPriceTotal: {
            CarTypeId:
              this.isSelectChooseCar && this.chooseCar
                ? this.chooseCar
                : cartInfo.Cartype.CarTypeId, // 已指定车型id
            CarGroupId: cartInfo.Cartype.GroupId,

            DropoffCityId: cartInfo.ReturnCity.Id,
            DropoffStoreId: cartInfo.ReturnStore.Id,
            DropoffTime: cartInfo.ReturnTime,
            PickupCityId: cartInfo.PickupCity.Id,
            PickupStoreId: cartInfo.PickupStore.Id,
            PickupTime: cartInfo.PickupTime,

            UserId: util.getStorage('EhiUser').CustomerId,

            AddedServiceTypes: this.chooseAdded, // 已选增值服务
            PickupDeliver: '',
            DropoffDeliver: '',
            OrderId: '',
            OrderType: '',
            Promotions: '',

            PaymentType: cartInfo.PaymentType,
            PriceType: cartInfo.PriceType
          },
          SelectPromotion: this.selectePromotion, // 已选择优惠

          SelectPointPromotion: '',

          PromotionAction: 1,
          IdCardNo: util.getStorage('EhiUser').IdCardNo,
          TrueName: util.getStorage('EhiUser').UserName,
          AcctId: util.getStorage('EhiUser').AccountNo,

          IsSpecialCarGroupType: this.isSelectChooseCar, // 是否指定车型

          GroupCartypeId: cartInfo.Cartype.CarTypeId,
          CarGroupId: cartInfo.Cartype.GroupId,

          ChannelId: this.globalData.ChannelId,
          EdmId: '',
          CorpUid: '',
          Ldata: '',
          BeforeCartypeId: null,
          BeforeCarGroupId: null
        }
      }
      let paramObj = util.postParamEncrypt(this.globalData.md5_key, param)

      this.showLoading()
      fetch(urls.apiHref.GetPriceDetail, {
        method: 'POST',
        body: paramObj.des,
        headers: new Headers({
          'Content-Type': 'application/json;charset=utf-8',
          Token: this.globalData.Token,
          AppVersion: this.globalData.Version,
          Remark: 'Unchecked',
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

          // console.log(result);

          // 获取失败跳回 step1
          if (result.IsSuccess === false) {
            MIP.viewer.open(urls.htmlHref.step1, {
              replace: true
            })
            return
          }

          // 费用
          let commonFees = []
          let otherFees = []
          result.Result.OrderPriceItems.forEach(function (item) {
            if (item.ClassType === 0) {
              otherFees = item.PriceDetails
            } else {
              commonFees.push(item)
            }
          })

          this.priceAll = result.Result
          this.commonFees = commonFees
          this.otherFees = otherFees
          this.totalPrice = result.Result.OrderPriceTotal

          // // 是否使用预授权，获取优惠使用
          // this.orderData.IsZhimaPromotion = result.Result.IsZhimaPromotion;

          // // 优惠名称
          // this.promotionName = this.orderData.SelectedPromotionName;

          // // 常用租车人
          // this.renterName = this.orderData.SelectedRenterName;
        })
    },

    // 获取其他价格信息
    getZhimaAndIllegal (cartInfo) {
      // Identify
      let identify = util.encrypt(
        'Version=' +
          this.globalData.Version +
          '&Source=' +
          this.globalData.Source
      )

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
          DropoffCityId: cartInfo.ReturnCity.Id,
          DropoffStoreId: cartInfo.ReturnStore && cartInfo.ReturnStore.Id,
          CarTypeUserLevel: cartInfo.Cartype.UserLevel,
          PickupDeliver: cartInfo.PickupService,
          DropoffDeliver: cartInfo.ReturnService,
          CityId: cartInfo.PickupCity.Id,
          PickupStoreId: cartInfo.PickupStore && cartInfo.PickupStore.Id,

          CarTypeId:
            this.isSelectChooseCar && this.chooseCar
              ? this.chooseCar
              : cartInfo.Cartype.CarTypeId, // 已指定车型id
          CarGroupId: cartInfo.Cartype.GroupId,

          PriceType: cartInfo.PriceType,
          PaymentType: cartInfo.PaymentType,

          ChannelId: this.globalData.ChannelId,

          UserId: util.getStorage('EhiUser').CustomerId,

          OrderId: cartInfo.OrderId,
          IsHoliday: '',
          IsQueue: '',
          IsCallCenter: '',
          IsUpdate: cartInfo.IsModifyOrder,
          // "PrepayStatus": '',
          OrderType: cartInfo.OrderType,
          IsNewUser: '',
          IsLongRent: cartInfo.IsBatch,
          AcctId: cartInfo.EnterpriseId,
          CellPhone: '',
          IsEnterpriseUsage: cartInfo.IsEnterpriseUse,
          PickupTime: cartInfo.PickupTime,
          DropoffTime: cartInfo.ReturnTime
          // "IsHighCar": '',
          // "IsHiCarShare": '',
        }
      }
      let paramObj = util.postParamEncrypt(this.globalData.md5_key, param)

      this.showLoading()
      fetch(urls.apiHref.GetZhimaAndIllegal, {
        method: 'POST',
        body: paramObj.des,
        headers: new Headers({
          'Content-Type': 'application/json;charset=utf-8',
          Token: this.globalData.Token,
          AppVersion: this.globalData.Version,
          Remark: 'Unchecked',
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

          // console.log(result);

          if (result.IsSuccess) {
            // 支付方式
            let payway = result.Result.PaymentWayList
            let arrPayWay = []
            let defaultPayWayIndex = []
            let defaultPayWay = null
            for (let i = 0; i < payway.length; i++) {
              if (
                payway[i].PaymentType === 10119004 ||
                payway[i].PaymentType === 10119005
              ) {
                arrPayWay.push(payway[i])
              }
            }

            arrPayWay.forEach(function (item, i) {
              if (result.Result.DefaultPayType.Name === item.Name) {
                defaultPayWay = item
                defaultPayWayIndex.push(i)
              }
            })

            this.additionalInfo = result.Result
            this.listPayWay = arrPayWay
            this.finalPayWay =
              Object.keys(this.finalPayWay).length > 0
                ? this.finalPayWay
                : defaultPayWay
            this.defaultPayWayIndex =
              this.defaultPayWayIndex || defaultPayWayIndex

            // getPriceDetail
            let cartInfoAdd = util.getCartData()
            cartInfoAdd.PaymentType = result.Result.DefaultPayType.PaymentType
            util.setCartData(cartInfoAdd)

            this.getPriceDetail(cartInfoAdd)

            // console.log(cartInfoAdd);
          }
        })
    },

    // 价格明细
    // 显示
    showPriceDetail () {
      this.showPriceDetailModal = true
    },

    // 隐藏
    hidePriceDetail () {
      this.showPriceDetailModal = false
    },

    /*
     * 指定车型
     */
    // 获取列表
    appointCarTypes (cartInfo) {
      // Identify
      let identify = util.encrypt(
        'Version=' +
          this.globalData.Version +
          '&Source=' +
          this.globalData.Source
      )

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
          OrderId: cartInfo.OrderId,
          CityId: cartInfo.PickupCity.Id,
          PickUpDateTime: cartInfo.PickupTime,
          ReturnDateTime: cartInfo.ReturnTime,

          LocationId: cartInfo.PickupStore.Id,
          GroupId: cartInfo.Cartype.GroupId,
          EnterpriseId: cartInfo.EnterpriseId,

          OperatorId: util.getStorage('EhiUser').CustomerId,
          ChannelId: this.globalData.ChannelId
        }
      }
      let paramObj = util.postParamEncrypt(this.globalData.md5_key, param)

      this.showLoading()
      fetch(urls.apiHref.AppointCarTypes, {
        method: 'POST',
        body: paramObj.des,
        headers: new Headers({
          'Content-Type': 'application/json;charset=utf-8',
          Token: this.globalData.Token,
          AppVersion: this.globalData.Version,
          Remark: 'Unchecked',
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

          // console.log(result);

          if (result.IsSuccess && result.Result && result.Result.CarTypeList) {
            this.groupCarTypeDetail = result.Result
          }
        })
    },

    // 打开
    toggleChooseCar () {
      this.isSelectChooseCar = !this.isSelectChooseCar
      this.chooseCar = this.cartInfo.Cartype.CarTypeId // 默认车型
      this.chooseAddedLast = null
      this.addedServicesPairRultDescription = null

      // MIP.setData({
      //   "#orderData": {
      //     ChoosedCar: this.chooseCar, // 已指定车型id
      //     IsSelectChoosedCar: this.isSelectChooseCar // 是否指定车型
      //   }
      // });

      this.getPriceDetail(this.cartInfo)
    },

    // 选择
    radioChooseCar (carType) {
      this.chooseCar = carType // 选择车型

      // MIP.setData({
      //   "#orderData": {
      //     ChoosedCar: this.chooseCar // 已指定车型id
      //   }
      // });

      this.getPriceDetail(this.cartInfo)
    },

    /*
     * 增值服务
     */
    // 新版
    getAddedServiceList (cartInfo) {
      // Identify
      let identify = util.encrypt(
        'Version=' +
          this.globalData.Version +
          '&Source=' +
          this.globalData.Source
      )

      let param = {
        PickupStoreId: cartInfo.PickupStore.Id,
        DropoffStoreId: cartInfo.ReturnStore.Id,

        CartypeId:
          this.orderData.IsSelectChoosedCar && this.orderData.ChoosedCar
            ? this.orderData.ChoosedCar
            : cartInfo.Cartype.CarTypeId, // 已指定车型id

        PickupDateTime: cartInfo.PickupTime,
        DropoffDateTime: cartInfo.ReturnTime,
        IsRelet: false,
        CityId: cartInfo.PickupCity.Id,
        DropoffCityId: cartInfo.ReturnCity.Id,
        PickupDistrictName: '',
        DropoffDistrictName: '',

        OrderId: cartInfo.OrderId,
        PriceType: cartInfo.PriceType,

        UserId: util.getStorage('EhiUser').CustomerId,
        ChannelId: this.globalData.ChannelId,

        Drivers: '',
        AcctId: cartInfo.IsEnterpriseUse ? cartInfo.EnterpriseId : ''
      }

      let paramObj = util.postParamEncrypt(this.globalData.md5_key, param)

      this.showLoading()
      fetch(urls.apiHref.GetAddedServiceList, {
        method: 'POST',
        body: paramObj.des,
        headers: new Headers({
          'Content-Type': 'application/json;charset=utf-8',
          Token: this.globalData.Token,
          AppVersion: this.globalData.Version,
          Remark: 'Unchecked',
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

          // console.log(result);

          if (result.IsSuccess && result.Result) {
            let services = []
            let pair = []

            result.Result.forEach(item => {
              let addedServices = item.AddedService

              if (addedServices && addedServices.length > 1) {
                addedServices.forEach(s => {
                  if (!s.hasOwnProperty('IsDefault')) {
                    s['IsDefault'] = item.IsDefault
                    services.push(s)
                    pair.push(s.Type)
                  }
                })
              } else if (addedServices.length === 1) {
                services.push(addedServices[0])
              }
            })

            // console.log(services, pair);

            this.addedServicesPackage = services
            this.addedServicesPackagePair = pair
          }
        })
    },

    // 增值服务选择
    chooseAddedNew (item) {
      let services = [].concat(this.chooseAdded)
      let s = item

      // console.log(s);

      if (services.indexOf(s.Type) === -1) {
        // 先删除已选中的单选项
        if (this.addedServicesPackagePair.indexOf(s.Type) > -1) {
          this.addedServicesPackagePair.forEach(item => {
            if (services.indexOf(item) > -1) {
              services.splice(services.indexOf(item), 1)
            }
          })
        }

        // 添加
        services.push(s.Type)
      } else {
        // 已选中的取消
        this.addedServicesPackage.forEach(item => {
          if (item.Type === s.Type && services.indexOf(s.Type) > -1) {
            services.splice(services.indexOf(s.Type), 1)
          }
        })
      }

      // console.log(services);

      this.chooseAdded = services

      // MIP.setData({
      //   "#orderData": {
      //     ChoosedAdded: this.chooseAdded
      //   }
      // });

      this.getPriceDetail(this.cartInfo)
    },

    // 黑名单验证
    createOrderBefore () {
      // Identify
      let identify = util.encrypt(
        'Version=' +
          this.globalData.Version +
          '&Source=' +
          this.globalData.Source
      )

      let param =
          '' +
          'Version=' +
          this.globalData.Version +
          '&DeviceId=' +
          this.globalData.DeviceId +
          '&Source=' +
          this.globalData.Source +
          '&AppStoreId=' +
          this.globalData.AppStoreId +
          '&Idfa=' +
          this.globalData.Idfa +
          '&SessionId=' +
          this.globalData.SessionId +
          '&PromotionUrl=' +
          this.globalData.PromotionUrl +
          '&PromotionTemplateId=' +
          this.globalData.PromotionTemplateId +
          '&Longitude=' +
          this.globalData.Longitude +
          '&Latitude=' +
          this.globalData.Latitude +
          '&IpAddress=' +
          this.globalData.IpAddress +
          '&PromotionId=' +
          this.globalData.PromotionId +
          '&PhoneIMSI=' +
          this.globalData.PhoneIMSI +
          '&PhoneMAC=' +
          this.globalData.PhoneMAC +
          '&Extend=' +
          this.globalData.Extend +
          '&OperatorId=' +
          this.globalData.Extend +
          '&userId=' +
          util.getStorage('EhiUser').CustomerId +
          '&dCardNo=' +
          this.globalData.IdCardNo
      let paramObj = util.getParamEncrypt(this.globalData.md5_key, param)

      this.showLoading()
      fetch(urls.apiHref.GetBlackListUserInfo + paramObj.des, {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json;charset=utf-8',
          Token: this.globalData.Token,
          AppVersion: this.globalData.Version,
          Remark: 'Unchecked',
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

          // console.log(result);

          if (!result.Result.InBlackList) {
            this.createOrder()
          } else if (result.Result.InBlackList) {
            // 一级黑名单，弹框提示会强制预付，走下单接口
            if (result.Result.RiskLevel === 1) {
              this.sweetAlert = Object.assign(this.sweetAlert, {
                show: true,
                title: '',
                content: result.Result.Tips,
                showCancel: true,
                onCancel: () => {},
                showOk: true,
                onOk: this.createOrder
              })
            } else if (result.Result.RiskLevel >= 2) {
              // 一级以上黑名单，弹框提示账户限制，拦截下单接口
              this.sweetAlert = Object.assign(this.sweetAlert, {
                show: true,
                title: '',
                content: result.Result.Tips,
                showCancel: false,
                onCancel: () => {},
                showOk: true,
                onOk: () => {}
              })
            }
          }
        })
    },

    // sweetAlert
    cancelMethod () {
      this.sweetAlert.show = false
      this.sweetAlert.onCancel()
    },
    sureMethod () {
      this.sweetAlert.show = false
      this.sweetAlert.onOk()
    },

    // 创建订单
    createOrder () {
      // Identify
      let identify = util.encrypt(
        'Version=' +
          this.globalData.Version +
          '&Source=' +
          this.globalData.Source
      )

      let cartInfo = util.getCartData()

      // console.log(cartInfo, globalData.SelectedPromotion, globalData.SelectedRenter);

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
          UserId: util.getStorage('EhiUser').CustomerId,
          OrderFrom: this.globalData.OrderFrom,

          PickupTime: cartInfo.PickupTime,
          DropoffTime: cartInfo.ReturnTime,
          PickupStoreId: cartInfo.IsPickupService
            ? 0
            : cartInfo.PickupStore.Id,
          DropoffStoreId: cartInfo.IsReturnService
            ? 0
            : cartInfo.ReturnStore.Id,
          PickupCityId: cartInfo.PickupCity.Id,
          DropoffCityId: cartInfo.ReturnCity.Id,

          CarTypeId:
            this.isSelectChooseCar && this.chooseCar
              ? this.chooseCar
              : cartInfo.Cartype.CarTypeId, // 已指定车型id
          CarGroupId: cartInfo.Cartype.GroupId,

          AddedServiceTypes: this.chooseAdded, // 已选增值服务

          ChannelId: this.globalData.ChannelId,

          Driver: this.selecteRenter, // 已选常用租车人
          DropoffDeliver: '',

          EnterpriseSettlement: {},

          GiftCards: null,
          Invoice: null,

          OrderType: cartInfo.OrderType,
          PaymentType: cartInfo.PaymentType,

          PickupDeliver: cartInfo.PickupService,
          PriceType: cartInfo.PriceType,
          Promotions: '',

          // "PrepayStatus": cartInfo.PrepayStatus,
          // "OrderPackType": cartInfo.OrderPackType,

          Remark: '',
          SelectPromotion: this.selectePromotion, // 已选择优惠
          SelectPointPromotion: {},

          IdCardNo: util.getStorage('EhiUser').IdCardNo,
          TrueName: util.getStorage('EhiUser').UserName,
          AcctId: util.getStorage('EhiUser').AccountNo,

          EdmId: cartInfo.EdmId,
          CorpUid: cartInfo.CorpUid,
          Ldata: cartInfo.Ldata,
          IsEnterpriseUsage: cartInfo.IsEnterpriseUse,

          IsSpecialCarGroupType: this.isSelectChooseCar, // 是否指定车型

          GroupCartypeId: cartInfo.Cartype.CarTypeId,
          BeforeCartypeId: null,
          BeforeCarGroupId: null
        }
      }
      let paramObj = util.postParamEncrypt(this.globalData.md5_key, param)

      this.showLoading()
      fetch(urls.apiHref.CreateOrder, {
        method: 'POST',
        body: paramObj.des,
        headers: new Headers({
          'Content-Type': 'application/json;charset=utf-8',
          Token: util.getStorage('EhiUser').Token,
          AppVersion: this.globalData.Version,
          Remark: 'Unchecked',
          Authorization: paramObj.auth,
          AppPlatform: this.globalData.Source,
          AppIdentity: identify
        })
      })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
          this.hideLoading()

          let result = response.Result
          result = util.decrypt(result)
          result = JSON.parse(result)

          // console.log(result);

          if (result.IsSuccess) {
            // 跳转 step4
            MIP.viewer.open(
              urls.htmlHref.step4 +
                '?totalPrice=' +
                result.Result.TotalAmount +
                '&orderId=' +
                result.Result.OrderId,
              {
                isMipLink: true
              }
            )
          } else {
            if (result.ErrorCode === 1010106) {
              MIP.viewer.open(
                urls.htmlHref.step3Complete + '?totalPrice=' + this.totalPrice,
                {
                  isMipLink: true
                }
              )
            } else {
              this.$emit('show', result.Message)
            }
          }
        })
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
