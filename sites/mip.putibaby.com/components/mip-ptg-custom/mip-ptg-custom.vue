<template>

  <div class="wrapper">
    <div class="text">基于个性化需求，通过菩提果服务大数据找到最适合您的好月嫂，已服务数万妈妈，是众多网红妈妈推荐的找月嫂靠谱新模式。</div>
    <div class="img"><mip-img src="https://mip.putibaby.com/i/four.png"/></div>
    <div class="bot_div">
      <img src="https://mip.putibaby.com/i/bot.png">
      <div class="start"><a @click="handleUpdateYcq">开始定制</a></div>
    </div>
    <!-- <mip-fixed
      type="bottom"
      class="bottom">
      <div class="start"><a @click="handleUpdateYcq">开始定制</a></div>
    </mip-fixed> -->

  </div>
</template>

<style scoped>
  .wrapper {
    /* margin: 0 auto; */
    /* text-align: center; */
    /*background-color: #f1f5e2;*/
    /* margin-top:44px; */
  }

  .text{
    margin:15px;
    margin-bottom: 12px;
    font-size: 15px;
    color: #666;
    line-height: 22px;
    background-color: #fff;

  }
  .img{
    margin-left: 15px;
    margin-right: 15px;
  }

  .bot_div{
    margin-top:10px;
    padding:18px 10px 10px 10px;
    /* background-color: #f1f5e2; */
  }
  .start{
    margin-top: 15px;
    text-align: center;
    color: #fff;
    height: 47px;
    line-height: 47px;
    border-radius:5px;
    background-color: #afd03b;
  }
  .start a{
    color: #fff;
    font-size: 18px;
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
    handleUpdateYcq () {
      console.log('handleUpdateYcq')
      if (!this.checkLogin_('update_ycq')) { return }
      window.MIP.viewer.open(MIP.util.makeCacheUrl('https://mip.putibaby.com/update_ycq'), {})
    },
    load_data () {
      console.log('should set data')
    }
  }

}
</script>
