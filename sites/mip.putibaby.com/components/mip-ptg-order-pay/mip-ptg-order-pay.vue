<template>
  <div class="root">
    <div class="header">
      支付订单{{ data.order_number }}，{{ data.text }}
    </div>
    <div class="row">
      <div class="left">应付金额</div>
      <div class="right bold">¥{{ (data.amount/100).toFixed(2) }} </div>
      <div class="border"/>
    </div>
    <div class="row">
      <div class="left">优惠金额</div>
      <div class="right text_red">- ¥{{ (data.coupon/100).toFixed(2) }} </div>
      <div class="border"/>
    </div>
    <div class="row">
      <div class="left">实付金额</div>
      <div class="right text_red">¥{{ (data.payamount/100).toFixed(2) }} </div>
    </div>
    <div class="header">
      支付方式
    </div>
    <div
      class="row"
      @click="useBalancePay">
      <div class="left">余额支付
        <div class="shengyu">(剩余:
          <span class="text_red">{{ (data.reward_balance/100).toFixed(2) }}
          </span>元)
        </div>
      </div>

      <div class="right balance">¥{{ (balancePayAmount/100).toFixed(2) }} </div>
      <div :class="{'checked' : balanceChecked , 'unchecked' : !balanceChecked}" />
      <div class="border"/>
    </div>

    <div
      class="row"
      @click="useInservicePay">
      <div class="left">还需支付</div>
      <div class="right">¥{{ (inservicePayAmount/100).toFixed(2) }} </div>
      <!-- <div :class="{'checked' : inservicePayChecked , 'unchecked' : !inservicePayChecked}" />-->
    </div>
    <!-- <div class="btn" @click="doPay">确定支付</div> -->
    <mip-data>
      <script type="application/json">
        {
        "payConfig":{
        "subject":"支付商品",
        "sessionId": "",
        "fee": 0,
        "redirectUrl": "https://mip.putibaby.com/pay/verifypay",
        "endpoint":
        {
        "baifubao":  "https://mip.putibaby.com/api/pay/baifubao",
        "alipay":  "https://mip.putibaby.com/api/pay/alipay",
        "weixin":  "https://mip.putibaby.com/api/pay/weixin"
        },
        "postData":
        {
        "orderId": 0,
        "pay_id": 0,
        "token": "",
        "useBalance": false,
        "amount" : 0,
        "balance_amount" : 0,
        "fee": 0
        }
        }
        }
      </script>
    </mip-data>
    <mip-inservice-pay
      id="payDialog"
      m-bind:pay-config="payConfig"/>
    <button
      v-if="ajaxLoaded && inservicePayAmount>0"
      class="button"
      on="tap:payDialog.toggle">确定支付</button>
    <button
      v-else-if="ajaxLoaded"
      class="button"
      @click="submitBalancePay" >余额支付</button>

    <p class="tip">温馨提示：如果您使用百度极速支付过程中遇到问题。请拨打菩提果客户服务电话： 400-618-8835。</p>

  </div>
</template>
<style scoped>
.wrapper {
  margin: 0 auto;
  text-align: center;
}

.root {
  background: #f2f2f2;
  width: 100%;
  color: #666666;
  font-size: 14px;
}

.btn {
  background: #FF6867;
  color: #fff;
  cursor: pointer;
  line-height: 36px;
  text-align: center;
  border-radius: 4;
  margin: 30px 20px;
}

.row {
  padding-top:15px;
  padding-bottom:15px;
  height: 14px;
  line-height: 14px;
  position: relative;
  background: #fff;
}
.border {
  width:345px;
  height: 1px;
  position: relative;
  top: 28px;
  background: #f4f4f4;
  left: 50%;
  margin-left: -172.5px;
}

.header {
  padding-top: 20px;
  padding-bottom: 10px;
  position: relative;
  padding-left: 15px;
  height: 14px;
  line-height: 14px;
  background-color:#f4f4f4;
  color: #999999;
}

.left {
  position: absolute;
  left: 15px;
}

.right {
  position: absolute;
  right: 15px;
  font-size: 14px;
  color: #666666;
}

.icon {
  position: absolute;
  right: 10px;
  top: 5px;
  width: 30px;
  height: 30px;
  background-size: contain;
}

.checked {
  /* background-image: url('/i/balance_checked.png'); */
  background-size: 22px 22px;
  width: 22px;
  height: 22px;
  position: absolute;
  right: 15px;
  top: 11px;
}

.unchecked {
  /* background-image: url('/i/balance_unchecked.png'); */
  background-size: 22px 22px;
  width: 22px;
  height: 22px;
  position: absolute;
  right: 15px;
  top: 11px;
}

.go {
  /* background-image: url('/i/jt-right.png'); */
}

.tip {
  padding: 30px 20px;
  text-align: center;
}

.button {
  border-style: none;
  width: 335px;
  left: 50%;
  margin-left: -167.5px;
  position: relative;
  color: #fff;
  background-color: #afd03b;
  height: 47px;
  border-radius: 4px;
  margin-top: 30px;
  font-size:18px;
}

.bold {
  font-weight: bold;
}
.text_red {
  color: #ff0200;
}
.balance {
  right: 47px;
}
.shengyu {
  position: absolute;
  top: 0px;
  left: 60px;
  width: 120px;
  font-size: 12px;
  color: #999
}

</style>
<script>
var API = {}

function checkStatus (response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

function parseJSON (response) {
  return response.json()
}

API.wrapRet_ = function (api, opts, fn) {
  console.log('posting to ' + api)
  opts.mip_sid = API.sessionId || ''
  fetch(api, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(opts)
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(ret => {
      console.log(ret)
      if (ret.success) fn(true, ret.data)
      else fn(false, ret.error)
    })
    .catch(e => {
      console.error(e.message)
      fn(false, e.message)
    })
}

API.payOrderWithBalance = function (orderId, type, amount, fn) {
  API.wrapRet_(
    'https://mip.putibaby.com/api/pay/pay_order_with_balance', {
      'order_id': orderId,
      'type': type,
      'amount': amount

    },
    fn)
}
API.ajaxDoPay = function (orderId, fn) {
  API.wrapRet_(
    'https://mip.putibaby.com/api/ajax_do_pay', {
      'order_id': orderId

    },
    fn)
}

export default {
  props: {
    src: {
      type: String,
      default: null
    },
    dataJsonstr: {
      type: String,
      default: null

    }
  },
  data () {
    console.log(this)
    var pdata = JSON.parse(this.dataJsonstr)
    console.log('padta:', pdata)

    var payConfig = {
      'subject': '支付商品',
      'fee': 0,
      'sessionId': '',
      'redirectUrl': 'https://mip.putibaby.com/pay/verifypay',
      'endpoint': {
        'baifubao': 'https://mip.putibaby.com/api/pay/baifubao',
        'alipay': 'https://mip.putibaby.com/api/pay/alipay',
        'weixin': 'https://mip.putibaby.com/api/pay/weixin'
      },
      'postData': {
        'orderId': pdata.order_id,
        'order_type': '',
        'pay_id': 0,
        'useBalance': false,
        'token': '',
        'fee': 0,
        'amount': 0,
        'balance_amount': 0,
        'anyData': {}
      }
    }

    MIP.setData({payConfig: payConfig})

    pdata.amount = 0
    pdata.coupon = 0
    pdata.payamount = 0
    pdata.reward_balance = 0
    pdata.amount = 0

    return {
      data: pdata,
      balanceChecked: false,
      inservicePayChecked: false,
      payConfig: payConfig
    }
  },
  computed: {
    inservicePayAmount: function () {
      if (this.balanceChecked) {
        if (this.data.payamount <= this.data.reward_balance) {
          return 0
        }
        return this.data.payamount - this.data.reward_balance
      } else {
        return this.data.payamount
      }
    },
    balancePayAmount: function () {
      if (this.data.payamount >= this.data.reward_balance) {
        return this.data.reward_balance
      } else {
        return this.data.payamount
      }
    }
  },
  prerenderAllowed () {
    return true
  },
  mounted () {
    console.log('This is pty order pay component !')
    var self = this
    function setData (ajaxData) {
      console.log(ajaxData)
      var pdata = ajaxData

      var payConfig = {
        'subject': '支付商品',
        'fee': (pdata.payamount / 100).toFixed(2),
        'sessionId': pdata.sessionId,
        'redirectUrl': 'https://mip.putibaby.com/pay/verifypay?order_number=' +
          pdata.order_number + '&pay_id=' + pdata.pay_id,
        'endpoint': {
          'baifubao': 'https://mip.putibaby.com/api/pay/baifubao',
          'alipay': 'https://mip.putibaby.com/api/pay/alipay',
          'weixin': 'https://mip.putibaby.com/api/pay/weixin'
        },
        'postData': {
          'orderId': pdata.order_number,
          'order_type': pdata.type,
          'pay_id': pdata.pay_id,
          'useBalance': false,
          'token': pdata.token,
          'fee': (pdata.payamount / 100).toFixed(2),
          'amount': pdata.payamount,
          'balance_amount': 0,
          'anyData': {}
        }
      }

      // console.log(payConfig)
      MIP.setData({payConfig: payConfig})

      self.data = pdata
      self.balanceChecked = false
      self.inservicePayChecked = false
      self.payConfig = payConfig

      self.ajaxLoaded = true
    }
    this.$element.customElement.addEventAction('logindone', function (event, str) {
      console.log(event)
      API.sessionId = event.sessionId
      self.$set(self, 'isLogin', true)
      self.$set(self, 'isUnion', event.userInfo.isUnion)
      if (event.userInfo.wx_url) {
        window.location.href = event.userInfo.wx_url
      }
      API.ajaxDoPay(self.data.order_id, function (isOk, res) {
        if (isOk) {
          setData(res)
        } else {
          console.error(res)
        }
      })
    })
  },
  firstInviewCallback () {
    this.init()
  },
  methods: {
    init () {
      console.log('should loading')
    },

    load_data () {
      console.log('should set data')
    },

    reload_ () {
      location.reload()
    },
    useBalancePay () {
      console.log('using balance')
      this.$set(this, 'balanceChecked', !this.balanceChecked)
      if (this.balanceChecked) {
        this.payConfig.postData.useBalance = true
        this.payConfig.postData.amount = this.data.payamount - this.data.reward_balance
        this.payConfig.postData.balance_amount = this.data.reward_balance
        this.payConfig.fee = ((this.data.payamount - this.data.reward_balance) / 100).toFixed(2)
      } else {
        this.payConfig.postData.useBalance = false
        this.payConfig.postData.amount = this.data.payamount
        this.payConfig.postData.balance_amount = 0
        this.payConfig.fee = (this.data.payamount / 100).toFixed(2)
      }
      this.payConfig.postData.fee = this.payConfig.fee
      MIP.setData({payConfig: this.payConfig})
      console.log(this)
    },
    useInservicePay () {
      console.log('using inservice pay')
      this.inservicePayChecked = !this.inservicePayChecked
    },
    submitBalancePay () {
      if (!this.ajaxLoaded) {
        console.error('can not do pay while data not loaded')
        return false
      }
      API.payOrderWithBalance(
        this.data.order_id,
        this.data.type,
        this.balancePayAmount,
        function (isOk, res) {
          if (isOk) {
            var donePage = 'https://mip.putibaby.com/order_list'
            var xzUrl = 'https://xiongzhang.baidu.com/opensc/wps/payment' +
                  '?id=1544608709261251&redirect=' + encodeURIComponent(donePage)
            // window.top.location.href = xzUrl
            window.MIP.viewer.open(xzUrl, {isMipLink: false})
          } else {
            console.error(res)
            window.MIP.viewer.open(MIP.util.makeCacheUrl('https://mip.putibaby.com/order_list'), {replace: true})
          }
        }
      )
    }
  }

}

</script>
