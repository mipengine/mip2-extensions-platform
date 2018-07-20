<template>
  <div class="wrap">

    <hr >
    <div v-if="info.isLogin">hi，{{ info.userInfo.nickname }}，欢迎回来！<span
      style="color:#f00;"
      on="tap:log.logout">退出</span></div>
    <div v-else>你没有<span
      style="color:#f00;"
      on="tap:log.login">登录</span>哦。</div>
  </div>
</template>

<style scoped>
.wrapper {
  margin: 0 auto;
  text-align: center;
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
  fetch(api, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
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

API.hideFinishedOrder = function (orderId, fn) {
  API.wrapRet_(
    '/api/hide_finished_order', {
      'id': orderId
    },
    fn)
}

export default {
  props: {
    info: {
      type: Object,
      required: true
    }
  },

  data () {
    // var pdata = JSON.parse(this.dataJsonstr);

    return {

    }
  },
  computed: {

  },
  mounted () {
    console.log('This is ptg login component !')
    var self = this
    // 自定义login事件
    this.$element.customElement.addEventAction('login', event => {
      // 这里可以输出登录之后的数据

      // 获取用户信息
      console.log(event)

      MIP.setData({
        userInfo: {nickname: event.userInfo.nkckname, province: ''}
      })
      self.$set(self.info, 'isLogin', true)

      // 后端交互会话标识
      // event.sessionId
    })
    // 自定义exit事件
    this.$element.customElement.addEventAction('exit', event => {
      console.log('登出了')
      console.log(event)
      self.$set(self.info.userInfo, 'nickname', '')
      self.$set(self.info, 'isLogin', false)
    })
  },
  methods: {
    init () {
      console.log('should loading')
      console.log(this.dataJson)
    },

    load_data () {
      console.log('should set data')
    }

  }

}
</script>
