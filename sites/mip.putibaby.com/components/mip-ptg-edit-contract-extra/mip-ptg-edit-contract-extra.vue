
<template>
  <div class="root">
    <textarea
      :readonly="rea"
      v-model="contract_extra"
      class="textarea"
      name="edit_contract_extra"
      validatetype="must"
      maxlength="500"
      required
      placeholder="点击输入补充条款，如：上户遇节假日工资多倍结算/休息日约定；双胞胎加收金额；特殊上户要求等……"
      @change="saveIt_"/>
    <input
      v-show="!rea"
      class="mbtn"
      type="submit"
      value="提交"
      @click="submit_">
  </div>
</template>

<style scoped>
.wrapper {
  margin: 0 auto;
  text-align: center;
}

* {
  margin: 0px;
  padding: 0px;
  width: 100%;
}

p {
  margin: 0px;
  padding: 0px;
  font-family: '黑体';
}

a {
  color: black !important;
  text-decoration: none !important;
}

a:checked {
  text-decoration: none !important;
}

a:visited {
  text-decoration: none !important;
}

a:hover {
  text-decoration: none !important;
}

.root {
  padding-top: 20px;
  padding-bottom: 30px;
  background: #fff;
  font-size: 14px;
  position: relative;
}

.textarea {
  -webkit-appearance: none;
  position: relative;
  display: block;
  width: 92%;
  height: 300px;
  margin: 0px auto;
  border: 1px solid #e5e5e5;
  background: #fff;
  color: #666;
  line-height: 18px;
  font-size: 14px;
  border-radius: 5px;
  padding-top: 10px;
  padding-left: 10px;
  box-sizing: border-box;
}

.mbtn {
  -webkit-appearance: none;
  background: #afd03b;
  color: #fff;
  width: 89.3%;
  line-height: 3px;
  border-radius: 4px;
  cursor: pointer;
  margin: 30px auto 10px auto;
  text-align: center;
  height: 47px;
  position: absolute;
  left: 50%;
  margin-left: -44.65%;
  font-size: 18px;
  border-style: none;
}

.btn {
  background: #FF6867;
  color: #fff;
  width: 300px;
  line-height: 40px;
  border-radius: 4px;
  cursor: pointer;
  margin: 20px auto 10px auto;
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

API.saveIt_ = function (opts, fn) {
  API.wrapRet_(
    'https://mip.putibaby.com/api/set_contract', {
      'contract_extra': opts.contract_extra,
      'id': opts.id,
      'order_id': opts.id
    },
    fn)
}
API.ajaxContractExtra = function (orderId, fn) {
  API.wrapRet_(
    'https://mip.putibaby.com/api/ajax_contract_extra', {
      'id': orderId
    }, fn)
}

export default {
  beforeMounted () {
    // API.getExtra_();
  },

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
    var pdata = JSON.parse(this.dataJsonstr)
    console.log('data1:', pdata)
    var readonly
    if (pdata.readonly !== '1') {
      readonly = false
    } else {
      readonly = true
    }

    return {
      ajaxLoaded: false,
      order_id: pdata.id,
      rea: readonly,
      contract_extra: ''
    }
  },
  computed: {

  },
  prerenderAllowed () {
    return true
  },
  mounted () {
    var self = this
    console.log('This is edit contract_extra component !')
    this.$element.customElement.addEventAction('echo', function (event, str) {
      console.log(event)
    })
    this.$element.customElement.addEventAction('dook', function (event, str) {
      // console.log(event);
      console.log(event.from)
      event.from.bind(self)(event.data, true)
      // var eval_str = 'this.' + event.handler + '(event_order)'
    })
    this.$element.customElement.addEventAction('docancel', function (event, str) {
      console.log(event)
      console.log(str)
    })

    function setData (ajaxData) {
      console.log(ajaxData)
      var pdata = ajaxData
      console.log('data2:', pdata)
      // var readonly
      // if (pdata.readonly !== '1') {
      //   readonly = false
      // } else {
      //   readonly = true
      // }
      if (pdata.contract_extra === '') {
        pdata.contract_extra = '无补充条款'
      }
      // self.rea = readonly
      self.contract_extra = pdata.contract_extra
      self.ajaxLoaded = true
    }

    this.$element.customElement.addEventAction('logindone', function (event, str) {
      console.log(event)
      API.sessionId = event.sessionId
      self.$set(self, 'isLogin', true)
      self.$set(self, 'isUnion', event.userInfo.isUnion)
      API.ajaxContractExtra(self.order_id, function (isOk, res) {
        setData(res)
      })
    })
  },
  methods: {
    init () {
      console.log('should loading')
      console.log(this.dataJson)
    },
    load_data () {
      console.log('should set data')
    },
    saveIt_ () {
      if (!this.ajaxLoaded) {
        console.error('can not save while data not loaded')
        return false
      }
      var self = this
      var opts = {}
      opts.contract_extra = self.contract_extra
      opts.id = JSON.parse(self.dataJsonstr).id
      API.saveIt_(opts, function (isOk, res) {
        if (isOk) {
          console.log('success')
        } else {

        }
      })
    },
    submit_ () {
      var self = this
      var url = 'https://mip.putibaby.com/edit_contract?id=' + JSON.parse(self.dataJsonstr).id
      // window.location.href = url;
      window.MIP.viewer.open(MIP.util.makeCacheUrl(url), {replace: true})
    }
  }
}
</script>
