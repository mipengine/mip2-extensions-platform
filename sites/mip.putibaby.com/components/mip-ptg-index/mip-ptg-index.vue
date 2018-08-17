<template>
  <div class="wrapper">
    <!-- <slot name="banner" /> -->
    <div class="top_level_1">
      <mip-carousel
        autoplay
        defer="3000"
        width="400"
        height="277"
        layout="responsive"
        indicator-id="mip-carousel-example">
        <mip-img src="https://mip.putibaby.com/i/b1.png"/>
        <mip-img src="https://mip.putibaby.com/i/b2.png"/>
        <mip-img src="https://mip.putibaby.com/i/b3.png"/>
      </mip-carousel>
      <div class="mip-carousel-indicator-wrapper">
        <div
          id="mip-carousel-example"
          class="mip-carousel-indicatorDot">
          <div class="mip-carousel-activeitem mip-carousel-indecator-item"/>
          <div class="mip-carousel-indecator-item"/>
          <div class="mip-carousel-indecator-item"/>
          <div class="mip-carousel-indecator-item"/>
        </div>
      </div>
    </div>
    <div @click="handleCoupon">
      <mip-img src="https://mip.putibaby.com/i/yhq_jt.png"/>
      <!-- <slot name="yhq" /> -->
    </div>
    <div class="clear_float">
      <div
        class="find"
        @click="handleSelectMaster">
        <!-- <mip&#45;img src="https://mip.putibaby.com/i/find_ys.png"/> -->
      </div>
      <div
        class="help"
        @click="handleCustom">
        <!-- <mip&#45;img src="https://mip.putibaby.com/i/help_me.png"/> -->
      </div>
    </div>

    <mip-fixed
      type="bottom"
      class="bottom">
      <a
        class="bottom_left"
        href="tel:4006188835">
        <mip-img
          src="https://mip.putibaby.com/i/index_phone.png"
          width="132px"
          height="22px"
          class="bottom_left_img"/>
      </a>
      <a @click="handleOrderList">
        <mip-img
          src="https://mip.putibaby.com/i/ind_person.png"
          width="38px"
          height="25px"
          class="bottom_right_img"/>
      </a>
    </mip-fixed>

  </div>
</template>

<style scoped>
  .wrapper {
    margin: 0 auto;
    text-align: center;
    margin-top:44px;
  }

  /* <!-- index.css --> */

  p {
    margin: 0px;
    padding: 0px;
    font-family: '黑体';
  }

  /* <!-- banner.css --> */
  mip-form form {
    position: relative;
    left: 0px;
    width: 90vw;
  }

  mip-form input[type='text'] {
    padding-right: 30px;
    width: 80%;
    margin: auto;
    position: relative;
    top: 20px;
    background-color: rgba(0, 0, 0, 0);
  }

  mip-form input[type='submit'] {
    border: 1px solid #fe7834;
    border-radius: 5px;
    color: #333;
    background-color: #fe7834;
    width: 98%;
    margin: auto;
    position: relative;
    top: 40px;
  }

  mip-carousel {
    width: 100%;
    height: 73.8%;
  }

  .mip-carousel-indicator-wrapper {
    display: none;
    text-align: center;
    background-color: rgba(0, 0, 0, .0);
    left: 44%;
    bottom: 10px;
  }

  .mip-layout-container {
    /* display: block; */
    position: relative;
    display: inline-block;
    width: 100%;
    margin: auto;
  }

  .mip-login-container {
    display: inline-block;
  }

  .test-login-div {
    margin-bottom: 130px;
  }

  mip-form div {
    display: none;
    color: #ec1f5c;
    font-size: 12px;
    text-align: left;
    padding: 0 10% 0 3%;
    position: relative;
    left: 30px;
    top: 28px;
  }

  .find {
    width: 44%;
    background-size: contain;
    margin-left: 4%;
    margin-right: 2%;
    height: 150px;
    text-align: center;
    float: left;
    background-position:center;
  }

  .help {
    width: 44%;
    background-size: contain;
    margin-left: 2%;
    margin-right: 4%;
    height: 150px;
    text-align: center;
    float: left;
    background-position:center;
  }

  .bottom {
    bottom: 0;
    height: 45px;
    line-height: 45px;
    background-color: #fff;
    width: 100%;
    z-index: 9999;
  }

  .bottom_left {
    width: 80%;
    height: 45px;
    text-align: center;
    display: inline-block;
    color: black;
    padding-left: 0;
  }

  .bottom_left_img {
    vertical-align: -6px;
  }

  .bottom_right_img {
    vertical-align: -6px;
  }
  .clear_float{
  clear:both;
  height:240px;
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
      if (ret.success) {
        return fn(true, ret.data)
      } else {
        fn(false, ret.error)
      }
    })
    .catch(e => {
      console.error(e.message)
      fn(false, e.message)
    })
}

API.checkUnionAgain = function (opt, fn) {
  API.wrapRet_(
    'https://mip.putibaby.com/api/check_union_again', {
      'opt': opt
    },
    fn)
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
      // data: pdata.data,
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
    console.log('This is index component !')
    window.MIP.viewer.fixedElement.init()
    var self = this

    window.addEventListener('show-page', () => {
      console.log('show-page')
      if (self.isUnion || !self.isLogin) {
        return
      }
      API.checkUnionAgain('', function (isOk, res) {
        if (isOk) {
          console.log(res)
          self.isLogin = res.isLogin
          self.isUnion = res.isUnion
          // MIP.setData({'#isLogin': true})
          // MIP.setData({'#isUnion': event.userInfo.isUnion})
        } else {
          console.log(res)
        }
      })
    })
    window.addEventListener('hide-page', () => {

    })

    this.$element.customElement.addEventAction('logindone', event => {
      // 这里可以输出登录之后的数据

      // 获取用户信息
      console.log(event)
      API.sessionId = event.sessionId

      self.$set(self, 'isLogin', true)
      self.$set(self, 'isUnion', event.userInfo.isUnion)

      console.log(MIP)

      var origin = API.next_cmd || event.origin
      // origin = origin || sessionStorage.next_cmd || localStorage.getItem('origin')

      API.next_cmd = ''
      // sessionStorage.next_cmd = ''
      // localStorage.clear()

      if (event.userInfo.isUnion && origin === 'order_list') {
        console.log('logindone to order_list')
        window.MIP.viewer.open(MIP.util.makeCacheUrl('https://mip.putibaby.com/order_list'), {})
      } else if (event.userInfo.isUnion && origin === 'coupon') {
        console.log('logindone to coupon')
        window.MIP.viewer.open(MIP.util.makeCacheUrl('https://mip.putibaby.com/coupon'), {})
      } else if (event.userInfo.isUnion && origin === 'update_ycq') {
        console.log('logindone to update_ycq')
        window.MIP.viewer.open(MIP.util.makeCacheUrl('https://mip.putibaby.com/update_ycq'), {})
      } else if (!event.userInfo.isUnion && origin) {
        console.log('logindone to submit_ph')
        var to = 'https://mip.putibaby.com/' + origin
        window.MIP.viewer.open(MIP.util.makeCacheUrl('https://mip.putibaby.com/submit_ph?to=' + encodeURIComponent(to)), {})
      }
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
        // sessionStorage.next_cmd = cmd
        // localStorage.setItem('origin', cmd)
        // console.log(cmd)
        if (cmd === 'coupon') {
          this.$emit('login1')
        } else if (cmd === 'order_list') {
          this.$emit('login2')
        } else if (cmd === 'update_ycq') {
          this.$emit('login3')
        }
        return false
      }
      console.log(MIP.getData('isUnion'))
      if (!this.isUnion) {
        var to = 'https://mip.putibaby.com/' + cmd
        console.log('uuu' + to)
        window.MIP.viewer.open(MIP.util.makeCacheUrl('https://mip.putibaby.com/submit_ph?to=' + encodeURIComponent(to)), {})

        return false
      }

      return true
    },

    reload_ () {
      console.log('reloading')
    },
    handleCoupon () {
      console.log('handleCoupon')
      if (!this.checkLogin_('coupon')) { return }
      window.MIP.viewer.open(MIP.util.makeCacheUrl('https://mip.putibaby.com/coupon'), {})
    },
    handleSelectMaster () {
      console.log('handleSelectMaster')
      // if (!this.checkLogin_('select_master'))
      //   return;
      window.MIP.viewer.open(MIP.util.makeCacheUrl('https://mip.putibaby.com/select_master'), {})
    },
    handleUpdateYcq () {
      console.log('handleUpdateYcq')
      if (!this.checkLogin_('update_ycq')) { return }
      window.MIP.viewer.open(MIP.util.makeCacheUrl('https://mip.putibaby.com/update_ycq'), {})
    },
    handleCustom () {
      console.log('handleCustom')
      window.MIP.viewer.open(MIP.util.makeCacheUrl('https://mip.putibaby.com/custom'), {})
    },
    handleOrderList () {
      console.log('handleOrderList')
      if (!this.checkLogin_('order_list')) { return }
      window.MIP.viewer.open(MIP.util.makeCacheUrl('https://mip.putibaby.com/order_list'), {})
    },
    load_data () {
      console.log('should set data')
    }
  }

}
</script>
