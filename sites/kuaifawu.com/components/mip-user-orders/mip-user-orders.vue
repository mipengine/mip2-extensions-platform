<template>
  <mip-vd-tabs>
    <section>
      <li
        class="tab"
        @click="changelist(0)">全部</li>
      <li
        class="tab"
        @click="changelist('notpay')">待付款</li>
      <li
        class="tab"
        @click="changelist('payed')">已付款</li>
      <li
        class="tab"
        @click="changelist('refunded')">已退款</li>
    </section>
    <!-- 全部 -->
    <div
      v-if="state === 0"
      class="tabContent padding-top">
      <div
        v-for="(val,index) in orders"
        v-if="val !== ''"
        :key="index"
        class="all_main">
        <div class="allList">
          <p class="first_p">下单时间：<span>{{ val.createtimemsg }}</span></p>
          <div class="listContent">
            <div
              v-for="(val1,index1) in val.sublist"
              :key="index1"
              class="order_number">
              <p>
                <span class="list-title"><a href="javascript:;">{{ val1.title }}({{ val1.areatitle }})</a></span>
                <span/>
                <span class="color333">￥{{ val1.saleprice - val1.platformdiscount - val1.providerdiscount }}</span>
              </p>
              <p>
                <span>订单号：<b>{{ val1.ordersno }}</b></span>
                <span/>
              </p>
              <p>
                <span>服务者：
                  <b>
                    {{ val1.currentproviderrealname ? val1.currentproviderrealname : val1.choiceproviderrealname }}
                    ({{ val1.currentprovidermobile ? val1.currentprovidermobile : val1.choiceprovidermobile }})
                  </b>
                </span>
                <span/>
                <span class="color00a5d5">{{ val1.statemsg }}</span>  <!-- 需要变化的 -->
              </p>
            </div>
          </div>
          <p class="second_p">共<span>{{ val.subcount }}</span>件产品&nbsp;&nbsp;&nbsp;合计:<span class="colorff4343">￥{{ val.saleprice - val.platformdiscount - val.providerdiscount }}</span>(优惠&nbsp;￥<span>{{ val.totaldiscount }}</span>)</p>
          <!-- 需要变化的 -->
          <p
            v-if="val.state === 2"
            class="last_p">
            <label @click="cancelorders(val.id)">取消订单</label>
            <button @click="pay(val.id, val.saleprice - val.platformdiscount - val.providerdiscount)">去支付</button>
            <!--on="tap:payDialog.toggle"-->
          </p>
          <!--<p class="last_p" v-if="val.state === 10">
            <span>评价即送<b>10</b>元优惠券</span>
            <a href=""> <button>立即评价</button></a>
          </p>-->
        </div>
      </div>
    </div>
    <div
      v-else
      class="tabContent padding-top">
      <div class="all_main"/>
    </div>
    <!-- 全部 -->

    <!-- 待付款 -->
    <div
      v-if="state === 'notpay'"
      class="tabContent padding-top">
      <div
        v-for="(val,index) in orders"
        v-if="val !== ''"
        :key="index"
        class="all_main">
        <div class="allList">
          <p class="first_p">下单时间：<span>{{ val.createtimemsg }}</span></p>
          <div class="listContent">
            <div
              v-for="(val1,index1) in val.sublist"
              :key="index1"
              class="order_number">
              <p>
                <span class="list-title"><a href="javascript:;">{{ val1.title }}({{ val1.areatitle }})</a></span>
                <span/>
                <span class="color333">￥{{ val1.saleprice - val1.platformdiscount - val1.providerdiscount }}</span>
              </p>
              <p>
                <span>订单号：<b>{{ val1.ordersno }}</b></span>
                <span/>
              </p>
              <p>
                <span>服务者：
                  <b>
                    {{ val1.currentproviderrealname ? val1.currentproviderrealname : val1.choiceproviderrealname }}
                    ({{ val1.currentprovidermobile ? val1.currentprovidermobile : val1.choiceprovidermobile }})
                  </b>
                </span>
                <span/>
                <span class="color00a5d5">{{ val1.statemsg }}</span>  <!-- 需要变化的 -->
              </p>
            </div>
          </div>
          <p class="second_p">共<span>{{ val.subcount }}</span>件产品&nbsp;&nbsp;&nbsp;合计:<span class="colorff4343">￥{{ val.saleprice - val.platformdiscount - val.providerdiscount }}</span>(优惠&nbsp;￥<span>{{ val.totaldiscount }}</span>)</p>
          <!-- 需要变化的 -->
          <p class="last_p">
            <label @click="cancelorders(val.id)">取消订单</label>
            <button @click="pay(val.id, val.saleprice - val.platformdiscount - val.providerdiscount)">去支付</button>
          </p>
        </div>
      </div>
    </div>
    <div
      v-else
      class="tabContent padding-top">
      <div class="all_main"/>
    </div>
    <!-- 待付款 -->

    <!-- 已付款 -->
    <div
      v-if="state === 'payed'"
      class="tabContent padding-top">
      <div
        v-for="(val,index) in orders"
        v-if="val !== ''"
        :key="index"
        class="all_main">
        <div class="allList">
          <p class="first_p">下单时间：<span>{{ val.createtimemsg }}</span></p>
          <div class="listContent">
            <div
              v-for="(val1,index1) in val.sublist"
              :key="index1"
              class="order_number">
              <p>
                <span class="list-title"><a href="javascript:;">{{ val1.title }}({{ val1.areatitle }})</a></span>
                <span/>
                <span class="color333">￥{{ val1.saleprice - val1.platformdiscount - val1.providerdiscount }}</span>
              </p>
              <p>
                <span>订单号：<b>{{ val1.ordersno }}</b></span>
                <span/>
              </p>
              <p>
                <span>服务者：
                  <b>
                    {{ val1.currentproviderrealname ? val1.currentproviderrealname : val1.choiceproviderrealname }}
                    ({{ val1.currentprovidermobile ? val1.currentprovidermobile : val1.choiceprovidermobile }})
                  </b>
                </span>
                <span/>
                <span class="color00a5d5">{{ val1.statemsg }}</span>  <!-- 需要变化的 -->
              </p>
            </div>
          </div>
          <p class="second_p">共<span>{{ val.subcount }}</span>件产品&nbsp;&nbsp;&nbsp;合计:<span class="colorff4343">￥{{ val.saleprice - val.platformdiscount - val.providerdiscount }}</span>(优惠&nbsp;￥<span>{{ val.totaldiscount }}</span>)</p>
          <!-- 需要变化的 -->
          <!--<p class="last_p">
            <span>评价即送<b>10</b>元优惠券</span>
            <a href=""> <button>立即评价</button></a>
          </p>-->
        </div>
      </div>
    </div>
    <div
      v-else
      class="tabContent padding-top">
      <div class="all_main"/>
    </div>
    <!-- 已付款 -->

    <!-- 已退款 -->
    <div
      v-if="state === 'refunded'"
      class="tabContent padding-top">
      <div
        v-for="(val,index) in orders"
        :key="index"
        class="all_main">
        <div class="allList">
          <p class="first_p">下单时间：<span>{{ val.createtimemsg }}</span></p>
          <div class="listContent">
            <div class="order_number">
              <p>
                <span class="list-title"><a href="javascript:;">{{ val.productsalesattrtitle }}({{ val.areatitle }})</a></span>
                <span/>
                <span class="color333">￥{{ val.pricepayed }}</span>
              </p>
              <p>
                <span>订单号：<b>{{ val.ordersno }}</b></span>
                <span/>
              </p>
              <p>
                <span>服务者：
                  <b>
                    {{ val.currentproviderrealname ? val.currentproviderrealname : val.choiceproviderrealname }}
                    ({{ val.providermobile }})
                  </b>
                </span>
                <span/>
                <span class="color00a5d5">{{ val.statemsg }}</span>  <!-- 需要变化的 -->
              </p>
            </div>
          </div>
          <p class="second_p">共<span>1</span>件产品&nbsp;&nbsp;&nbsp;合计:<span class="colorff4343">￥{{ val.money }}</span>(优惠&nbsp;￥<span>{{ val.moneygmv - val.money }}</span>)</p>
          <!-- 需要变化的 -->
          <p class="last_p">
            <em>已退款</em>
          </p>
        </div>
      </div>
    </div>
    <div
      v-else
      class="tabContent padding-top">
      <div class="all_main"/>
    </div>
    <!-- 已退款 -->
  </mip-vd-tabs>

</template>

<style scoped>
  .tabContent{text-align:center;}
  mip-vd-tabs .mip-vd-tabs-nav .mip-vd-tabs-nav-selected {border-bottom: 4px solid #00a5d5;color: #00a5d5;}
  section{border-top: 0.01rem solid #ccc;}
  .tabContent{text-align:center;padding-bottom: 0.64rem;}
  .all_main .allList{font-size:14px;border-top:1px solid #eceded;margin-top:0.1rem;color:#333333;}
  .all_main .allList .first_p{padding: 0.1rem;text-align:left;padding-left:0.1rem;background:#fff;color:#999;}
  .all_main .allList .listContent{background:#f9f9fb;}
  .all_main .allList .listContent .order_number{background:#f9f9fb;padding:0.1rem 0.2rem;}
  .all_main .allList .listContent .order_number p{display:flex;justify-content: space-between;line-height:0.26rem;color:#999;}
  .all_main .allList .listContent .order_number p .list-title{width:75%;font-size:16px;padding-bottom:0.04rem;color:#333;
  overflow: hidden;text-overflow: ellipsis;white-space: nowrap;display:inline-block;text-align: left;}
  .all_main .allList .listContent .order_number p b{font-weight:normal;}
  .all_main .allList .second_p{text-align: right;padding:0.1rem 0.2rem 0.1rem 0;border-bottom: 1px solid #f1f1f1;background:#fff;}
  .all_main .allList .last_p{text-align: right;border-bottom:1px solid #eceded;background:#fff;color:#666;padding:0.1rem;
  padding-right:0.2rem;}
  .all_main .allList .last_p label{display:inline-block;line-height:0.2rem;text-align: center;color:#333;border:1px solid #dfdfdf;
  border-radius: 0.04rem;padding:0.04rem;}
  .all_main .allList .last_p span{display:inline-block;line-height:0.2rem;text-align: center;color:#333;padding:0.04rem;}
  .all_main .allList .last_p span>b{color:red;font-weight:normal;}
  .all_main .allList .last_p>em{color:#666;font-style:normal;}
  .all_main .allList .last_p>button{padding:0.03rem;text-align: center;border:none;background:#fff;color:#00a5d5;
  border:1px solid #00a5d5;border-radius: 0.04rem;margin-right:0.04rem;display:inline-block;line-height:0.21rem;}
  .color333{color:#333;}
  .color00a5d5{color:#00a5d5;}
  .colorff4343{font-size:14px;padding:0 0.1rem;color:#ff4343;}
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
      orders: [],
      state: 0,
      sessionid: ''
    }
  },
  mounted () {
    MIP.util.platform.start()
    console.log(MIP.util.platform.isWechatApp())
    console.log('This is 订单列表 !')
    const self = this
    let state = 0
    let CustomStorage = MIP.util.customStorage
    let storage = new CustomStorage(0)
    let sessionid = storage.get('sessionIds')
    // sessionid = 'uJN/qa+3yY2xsGiwiWiJpduasImjlXxmlQ=='
    self.sessionid = sessionid
    window.fetchJsonp(config.data().apiurl + '/orders/orderslist/state?state=' + state + '&sessionid=' + encodeURIComponent(sessionid), {
      jsonpCallback: 'callback'
    }).then(function (res) {
      return res.json()
    }).then(function (data) {
      self.state = state
      self.orders = data.data.items
    })
  },
  methods: {
    changelist (state) {
      state = state || 0
      const self = this
      window.fetchJsonp(config.data().apiurl + '/orders/orderslist?state=' + state + '&sessionid=' + encodeURIComponent(this.sessionid), {
        jsonpCallback: 'callback'
      }).then(function (res) {
        return res.json()
      }).then(function (data) {
        self.state = state
        self.orders = data.data.items
      })
    },
    cancelorders (ordersId) {
      console.log(ordersId, '这是取消订单')
      window.fetchJsonp(config.data().apiurl + '/orders/cancel?ordersid=' + ordersId + '&sessionid=' + encodeURIComponent(this.sessionid), {
        jsonpCallback: 'callback'
      }).then(function (res) {
        return res.json()
      }).then(function (data) {
        // console.log(data);
        // window.MIP.viewer.open(MIP.util.makeCacheUrl(config.data().burl + "/user/orders.html"), {isMipLink: true});
        window.location.reload()
      })
    },
    pay (ordersId, price) {
      console.log(ordersId, price)
      let wxurl = ''
      if (MIP.util.platform.isWechatApp()) {
        wxurl = 'https://m.kuaifawu.com/pay/mip/wxpay'
      } else {
        wxurl = config.data().apiurl + '/pay/weixinorders?ordersid=' + ordersId
      }
      let payConfig = {
        'fee': price,
        'endpoint': {
          // "baifubao":  "https://api.example.com/pay/baifubao",
          'alipay': config.data().apiurl + '/pay/alipayorders?ordersid=' + ordersId,
          'weixin': wxurl
        },
        'postData': {
          'orderid': ordersId
        },
        'sessionId': this.sessionid
      }
      MIP.setData({payConfig: payConfig})
      console.log(payConfig)
      /**
                 * 触发事件
                 * @param {string} eventName 事件名称
                 * @param {HTMLElement} element 触发的目标元素，注意：事件往递归的向上传播找到匹配 `on="eventName:xxx.xx` 并执行
                 * @param {Object} event 事件对象，原生的 Event 对象，如果没有事件对象可以为 {} ，支持透传自定义参数，如：{userinfo: {}}
                 */
      MIP.viewer.eventAction.execute('blur', document.querySelector('#topay'), {})
    }
  }
}
</script>
