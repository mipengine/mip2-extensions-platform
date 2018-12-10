<template>
  <section main="role">
    <div v-if="orderList.length > 0">
      <div
        v-for="order in orderList"
        :key="order.Id"
        class="order-item">
        <div
          class="order-item-wrap"
          @click="orderDetail(order)">
          <div class="order-item-hd">
            <div
              :class="{ gray: order.Status === 10132005, orange: order.Status !== 10132005 }"
            >{{ order.OrderStatusName }}</div>
          </div>

          <div class="ui-flex align-center">
            <div class="cell order-item-bd">
              <div class="ui-flex algin-start">
                <div>订单号：</div>
                <div class="cell">{{ order.Id }}</div>
              </div>
              <div class="ui-flex algin-start">
                <div>车型：</div>
                <div
                  class="cell"
                >{{ order.CarType.Name }}/{{ order.CarType.GearName }}/{{ order.CarType.StructureName }}/{{ order.CarType.Emission }}{{ order.CarType.EmissionUnit }}</div>
              </div>
              <div class="ui-flex algin-start">
                <div>取车门店：</div>
                <div class="cell">
                  <div>{{ order.PickupAddress.CityName }} {{ order.PickupAddress.StoreName }}</div>
                  <div>{{ order.PickupAddress.Address }}</div>
                </div>
              </div>
              <div class="ui-flex algin-start">
                <div>还车门店：</div>
                <div class="cell">
                  <div>{{ order.DropoffAddress.CityName }} {{ order.DropoffAddress.StoreName }}</div>
                  <div>{{ order.DropoffAddress.Address }}</div>
                </div>
              </div>
              <div class="ui-flex algin-start">
                <div>用车时间：</div>
                <div class="cell">{{ order.PickupTime }} - {{ order.DropoffTime }}</div>
              </div>
              <div class="ui-flex algin-start">
                <div>总价：</div>
                <div class="cell orange">
                  <text class="rmb">¥</text>
                  {{ order.TotalAmount }}
                </div>
              </div>
            </div>

            <div class="arrow aw-right"/>
          </div>
        </div>
      </div>
    </div>

    <div v-if="orderList.length === 0">
      <div class="none-tip">
        <div>暂无订单</div>
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
import './mip-1hai-order-list.less'

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
      loading: false,
      orderList: [],
      page: 1,
      perPage: 20,
      status: ''
    }
  },

  created () {
    console.log('全部订单')
    console.log(
      'info:',
      this.info,
      'config:',
      this.config,
      'orderData:',
      this.orderData,
      'globalData:',
      this.globalData
    )

    // 订单列表
    this.getOrderList()
  },

  mounted () {
    window.addEventListener('show-page', () => {
      // 订单列表
      this.getOrderList()
    })

    window.addEventListener('hide-page', () => {
      // do something when page hide
    })
  },

  methods: {
    // 订单详情
    orderDetail (order) {
      MIP.viewer.open(urls.htmlHref.orderDetail + '?orderId=' + order.Id, {
        isMipLink: true
      })
    },

    // 订单列表
    getOrderList () {
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
          '&channelId=' +
          this.globalData.ChannelId +
          '&enterpriseId=' +
          util.getStorage('EhiUser').AccountNo +
          '&page=' +
          this.page +
          '&perPage=' +
          this.perPage +
          '&status=' +
          this.status
      let paramObj = util.getParamEncrypt(this.globalData.md5_key, param)

      this.showLoading()
      fetch(urls.apiHref.GetOrderList + paramObj.des, {
        method: 'GET',
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

          this.orderList = result.Result.Items
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
