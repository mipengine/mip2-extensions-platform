<template>
  <div class="wrapper">
    <div
      v-for="(val,index) in sku"
      :key="index"
      class="choosed"
      type="mip-mustache">
      <div class="title">已选服务：</div>
      <div class="name flex">
        <div class="l-name">{{ val.producttitle }}（{{ val.productsalesattrtitle }}）</div>
        <div class="r-op">
          <a
            href="javascript:;"
            class="down js-num-down"
            @click="down(index)">－</a>

          <span>{{ val.num }}</span>
          <a
            href="javascript:;"
            class="down js-num-down"
            @click="add(index)">＋</a>
        </div>
      </div>
      <div class="infos flex">
        <div>
          <span>地区：{{ val.areatitle }}</span>
          <span>服务者：{{ val.providerinfo.realname }}</span>
          <mip-img :src="val.providerinfo.avatar"/>
        </div>
        <div class="r-money">{{ val.saleprice*val.num }}元</div>
      </div>
    </div>
    <!-- 底部固定栏 -->
    <mip-fixed
      type="bottom"
      bottom="0">
      <div class="fix-bottom">
        <div>{{ total }}</div>
        <div class="left">应付：<span>￥{{ moneyTotle }}</span></div>
        <div
          class="right"
          on="tap:payDialog.toggle">去结算
        </div>
      </div>
    </mip-fixed>
    <!-- 底部固定栏 -->
  </div>
</template>

<style scoped>
    .wrapper {margin: 0 auto;}
    .flex{display: flex;justify-content: space-between;}
    .choosed{padding:0.2rem 0.1rem 0rem;border-bottom: 0.014rem solid #d9d9d9;background-color: #fff;}
    .choosed .title{color: #666;margin-bottom: 0.13rem;font-size: 0.16rem;}
    .choosed .name .l-name{color: #333;font-size: 0.18rem;font-weight: bold;width:72%;}
    .choosed .name .r-op{width: 26%;}
    .choosed .infos{color: #999;font-size: 0.10rem;display: flex;align-items: center;height: 0.5rem;}
    .choosed .infos span{margin-right: 0.12rem;}
    .choosed .infos mip-img{width:0.26rem;display: inline-block;vertical-align: middle;}
    .choosed .infos .r-money{color: #f85555;font-size: 0.18rem;}
    .r-op a{display: inline-block;width:0.2rem;height: 0.2rem;text-align: center;border:0.014rem solid #d9d9d9;float: left;color: #666;}
    .r-op input{display: inline-block;width:0.4rem;height: 0.2rem;border:0.014rem solid #d9d9d9;border-left: 0;border-right: 0;float: left;text-align: center;outline:none}
    .r-op span{display: inline-block;width:0.4rem;height: 0.2rem;border:0.014rem solid #d9d9d9;border-left: 0;border-right: 0;float: left;text-align: center;line-height: 0.2rem;}
    .fix-bottom{background-color: #fff;border-top: 0.014rem solid #d9d9d9;height: 0.54rem;line-height: 0.54rem;width:100%;display: flex;}
    .fix-bottom .left{width:70%;color: #999;text-align: right;padding-right: 0.2rem;}
    .fix-bottom .left span{font-size: 0.2rem;color: #e85555;}
    .fix-bottom .right{width:30%;background-color: #e85555;color: #fff;text-align: center;}
</style>

<script>
import config from '../../utils/config'
export default {
  props: {
    payConfig: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      sessionId: '',
      orderId: [],
      moneyTotle: 0,
      sku: [],
      proInfo: [],
      orderArr: []
    }
  },
  computed: {
    total: function () {
      const self = this
      self.moneyTotle = 0
      self.orderArr = []
      self.sku.forEach(function (item, index) {
        self.moneyTotle = item.num * item.saleprice + self.moneyTotle
        console.log([item.id, item.num])
        self.orderArr.push([item.id, item.num])
      })
      console.log(this.moneyTotle)
      console.log(this.orderArr)

      MIP.setData({
        payConfig: {
          fee: this.moneyTotle,
          postData: {orderId: this.orderArr},
          sessionId: this.sessionId
        }
      })
      return ''
    }
  },
  mounted () {
    MIP.util.platform.start()
    console.log(MIP.util.platform.isWechatApp())
    if (MIP.util.platform.isWechatApp()) {
      MIP.setData({
        payConfig: {
          endpoint: {weixin: 'https://m.kuaifawu.com/pay/mip/wxorderspay'}
        }
      })
    }
    console.log(this.payConfig, 'ccccccccc')
    // console.log(this.payConfig.endpoint.alipay,'这里是微信支付回调')
    MIP.viewer.fixedElement.init()
    console.log('This is 订单确认页 !')
    const self = this
    let CustomStorage = MIP.util.customStorage
    let storage = new CustomStorage(0)
    let ids = storage.get('ids')
    let strSku = storage.get('sku')
    let strProviderskuid = storage.get('providerskuid')
    console.log(ids)
    console.log(strSku)
    self.sessionId = storage.get('sessionIds')
    let id = strSku || strProviderskuid
    console.log(id)
    window.fetchJsonp(config.data().apiurl + '/orders/confirm?ids=' + id, {
      jsonpCallback: 'callback'
    }).then(function (res) {
      return res.json()
    }).then(function (data) {
      console.log(data)
      self.sku = data.data.items
      self.proInfo = data.data.items.providerinfo
    })
  },
  methods: {
    add: function (index) {
      ++this.sku[index].num
    },
    down: function (index) {
      --this.sku[index].num
      if (this.sku[index].num < 1) {
        this.sku[index].num = 1
      }
    }
  }
}
</script>
