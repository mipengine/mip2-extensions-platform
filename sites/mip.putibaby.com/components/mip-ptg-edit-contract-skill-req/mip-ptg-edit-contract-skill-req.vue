
<template>
  <div class="root">

    <div
      v-for="items in list"
      :key="items.title"
      class="part">
      <div class="sub_head">
        <p>{{ items.title }}</p>
      </div>
      <div
        v-for="it in items.list"
        :key="it.title"
        class="item">
        <p for="it.id">
          {{ it.title }}
        </p>
        <input
          id="it.id"
          :disabled="rea"
          :checked="sk_c[it.id]"
          type="checkbox"
          name="services"
          value="it.id"
          @click="changeChecked_(it.id,it.id)"
          @change="Change_(it.id)">

      </div>
    </div>

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
  padding-bottom: 15px;
  background: #f2f2f2;
  font-size: 14px;
  position: relative;
  width: 100%;
  color: #666;
  font-family: '黑体';
}

.main_head {
  height: 20px;
  margin-bottom: 15px;
}

.main_head p {
  position: relative;
  width: 80%;
  left: 15px;
}

.part {
  position: relative;
  width: 100%;
}

.sub_head {
  height: 44px;
  line-height: 44px;
  background: #f4f4f4;
  color: #999;
}

.sub_head p {
  position: relative;
  width: 50%;
  left: 15px;
  font-family: '黑体';
}

.item {
  position: relative;
  height: 44px;
  line-height: 44px;
  background: #fff;
}

.item p {
  display: inline;
  position: relative;
  left: 15px;
  font-family: '黑体';
}

.item input {
  position: absolute;
  right: 15px;
  width: 22px;
  height: 22px;
  top: 10px;
}

.mbtn {
  -webkit-appearance: none;
  background: #afd03b;
  color: #fff;
  width: 89.3%;
  line-height: 3px;
  border-radius: 5px;
  cursor: pointer;
  margin: 20px auto 10px auto;
  text-align: center;
  height: 47px;
  position: relative;
  left: 50%;
  margin-left: -44.65%;
  font-size: 18px;
  border-style: none;
}

.checked {
  /* background-image: url('/i/balance_checked.png'); */
  background-size: 22px 22px;
  width: 22px;
  height: 22px;
  top: 10px;
  right: 35px;
  position: absolute;
  z-index: 22;
}

.unchecked {
  /* background-image: url('/i/balance_unchecked.png'); */
  background-size: 22px 22px;
  width: 22px;
  height: 22px;
  top: 10px;
  right: 35px;
  position: absolute;
  z-index: 22;
}

input[type="checkbox"] {
  -webkit-appearance: none;
  /* background: #f4f4f4 url('/i/checkbox_22px.png'); */
  border-radius: 50%;
  border-style: none;
}

input[type="checkbox"]:checked {
  background-position: -22px 0;
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
      'contract_skill_req': opts.contract_skill_req,
      'id': opts.id,
      'order_id': opts.order_id
    }, fn)
}

API.ajaxContractSkillReq = function (orderId, fn) {
  API.wrapRet_(
    'https://mip.putibaby.com/api/ajax_contract_skill_req', {
      'id': orderId
    }, fn)
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
    console.log('this', this)
    var pdata = JSON.parse(this.dataJsonstr)
    var readonly
    if (parseInt(pdata.readonly) !== 1) {
      readonly = false
    } else {
      readonly = true
    }
    // if (JSON.parse(this.dataJsonstr).contract_skill_req.indexOf(',') !== -1) {
    //   var skillList = JSON.parse(this.dataJsonstr).contract_skill_req.split(',');
    // } else {
    //   var skillList = [];
    //   skillList.push(JSON.parse(this.dataJsonstr).contract_skill_req);
    // }
    return {
      isLogin: false,
      isUnion: false,
      ajaxLoaded: false,
      order_id: pdata.id,
      list: [],
      check: false,
      contract_skill_req: [],
      skill_req: [],
      sk_c: {},
      rea: readonly
    }
  },
  computed: {

  },
  beforeMount () {

  },
  prerenderAllowed () {
    return true
  },
  mounted () {
    console.log('This is edit contract_skill_req component !')
    var self = this
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
    this.$element.customElement.addEventAction('logindone', function (event, str) {
      console.log(event)
      API.sessionId = event.sessionId
      self.$set(self, 'isLogin', true)
      self.$set(self, 'isUnion', event.userInfo.isUnion)
      API.ajaxContractSkillReq(self.order_id, function (isOk, res) {
        var pdata = res
        console.log('pdata', pdata)
        var skillList
        if (pdata.contract_skill_req.indexOf(',') !== -1) {
          skillList = pdata.contract_skill_req.split(',')
        } else {
          skillList = []
          skillList.push(pdata.contract_skill_req)
        }

        self.list = pdata.list
        self.check = false
        self.contract_skill_req = []
        self.skill_req = skillList
        self.sk_c = pdata.sk_c

        self.ajaxLoaded = true
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
    changePhoneNumber_ () {

    },
    checked_ (id) {
      return false
    },
    Checked_ (id) {
      this.checked_(id)
    },
    Change_ (id) {},
    check_: function (id) {
      var skill = this.skill_req.length
      for (var i = 0; i < skill; i++) {
        if (id === this.skill_req[i]) {
          return true
        } else {
          return false
        }
      }
    },
    changeChecked_ (id, state) {
      if (!this.ajaxLoaded) {
        console.error('can not save while data not loaded')
        return false
      }
      var self = this
      var skillList = this.skill_req
      var skillReq = []
      if (skillList.indexOf(id.toString()) === -1) {
        skillReq = skillList
        skillReq.push(id.toString())
      } else {
        var skillList2 = skillList
        var index = skillList.indexOf(id.toString())
        var c = skillList.splice(index, 1)
        for (var i = 0; i < skillList2.length; i++) {
          if (skillList2[i] === c[0]) {} else {
            skillReq.push(skillList2[i])
          }
        }
      }
      var skillL = []
      for (var j = 0; j < skillReq.length; j++) {
        if (skillReq[j] === '') {} else {
          skillL.push(skillReq[j])
        }
      }
      var opts = {}
      opts.id = JSON.parse(self.dataJsonstr).id
      opts.contract_skill_req = skillL.join(',')

      API.saveIt_(opts, function (isOk, res) {
        if (isOk) {
          console.log('success')
        }
      })
    },
    submit_ () {
      var url = 'https://mip.putibaby.com/edit_contract?id=' + JSON.parse(this.dataJsonstr).id
      // window.location.replace(url);
      window.MIP.viewer.open(MIP.util.makeCacheUrl(url), {replace: true})
    }
  }
}
</script>
