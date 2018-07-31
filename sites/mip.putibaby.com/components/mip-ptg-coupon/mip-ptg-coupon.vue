<template>
  <div class="wrapper">
    <div class="main">
      <div class="coupon">
        <mip-img
          src="i/coupon.png"
          height="90px"/>
        <span class="code">{{ coupon_code }}</span>
      </div>
      <div class="content">
        <span>优惠券使用规则：</span>
        <p>1、该优惠券仅用于在菩提果公司请月嫂，签约价格满9800元以上，且服务时间满26天以上，缴纳尾款时可直接抵用168元；</p>
        <p>2、请务必在签约前告知派单师，签约后无法激活使用；</p>
        <p>3、每单最多使用1张优惠券，不可累计；</p>
        <p>4、本券使用有效期截止至2018年12月31日；</p>
        <p>5、本券不可用于育儿嫂服务；</p>
        <p>6、本券不可兑换现金，不找零；</p>
        <p>7、本券不与菩提果公司其他优惠同享。</p>

      </div>
      <a @click="handleGoBack"><div class="close_btn">关闭</div></a>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  margin: 0 auto;
  text-align: center;
}
.no {
  display: none;
}
.has {
  display: inline-block;
}
  .content{
    padding: 20px;
    font-size: 14px;
    text-align: left;
    background-color: #fff;
    color: #666;
    margin: 15px;
    margin-top: 25px;
    border: solid 1px #e5e5e5;
    border-radius: 5px;
    padding-top: 15px;
  }
  .content p{
    margin: 10px 0 0 0;
  }
  .close_btn{
    background-color: #afd03b;
    text-align: center;
    height: 47px;
    line-height: 47px;
    color: #fff;
    font-size: 14px;
    margin-top: 20px;
    border-radius: 5px;
    margin: 20px;
    margin-top:30px;
    font-size: 18px;

  }

  .coupon{
    width: 100%;
    height: 80px;
    position: relative;

  }
  .code{
    position: absolute;
    top: 53px;
    right: 15%;
    font-size: 16px;
    color: #fff;
  }

  .content span{
    color: #333;
    font-size: 15px;
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
      if (ret.success) fn(true, ret.data)
      else fn(false, ret.error)
    })
    .catch(e => {
      console.error(e.message)
      fn(false, e.message)
    })
}

API.ajaxCoupon = function (opt, fn) {
  API.wrapRet_(
    'https://mip.putibaby.com/api/ajax_coupon', opt, fn)
}

export default {

  props: {
    dataJsonstr: {
      type: String,
      default: null
    }
  },
  data () {
    console.log(this)
    // var pdata = JSON.parse(this.dataJsonstr);
    return {
      coupon_code: '',
      isLogin: false,
      isUnion: false
    }
  },
  computed: {

  },
  prerenderAllowed () {
    return true
  },
  mounted () {
    console.log('This is coupon component !')
    var self = this
    this.$element.customElement.addEventAction('logindone', event => {
      console.log(event)
      API.sessionId = event.sessionId

      self.$set(self, 'isLogin', true)
      self.$set(self, 'isUnion', event.userInfo.isUnion)

      API.ajaxCoupon({}, function (isOk, res) {
        if (isOk) {
          self.coupon_code = res.coupon_code
        } else {
          console.error(res)
        }
      })
    })
  },
  methods: {
    init () {
      console.log('should loading')
    },
    created () {

    },

    checkLogin_ (cmd) {
      if (!this.isLogin) {
        API.next_cmd = cmd
        this.$emit('login')
        return false
      }

      return true
    },

    reload_ () {
      console.log('reloading')
    },

    load_data () {
      console.log('should set data')
    },
    handleGoBack () {
      MIP.viewer.page.back()
    }
  }

}
</script>
