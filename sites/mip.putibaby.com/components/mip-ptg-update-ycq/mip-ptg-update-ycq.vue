
<template>
  <div class="root">
    <p class="title">需要您填写如下信息，让我们帮您更好的推荐。</p>
    <h4>您希望找：</h4>
    <div class="gap"/>
    <div class="ygap"/>
    <table class="radio">
      <tr>
        <td>
          <div
            :class="{'checked': tuijian,'unchecked':!tuijian}"
            class="yuesao"
            @click="Checked"/>
          <input
            :checked="tuijian"
            v-model="tuijian"
            type="radio"
            name="masterType"
            value="true"
            @change="checked_">月嫂&nbsp;&nbsp;&nbsp;&nbsp;
        <span class="grayys">在月子期间护理新生儿和产妇</span></td>
      </tr>
      <tr>
        <td>
          <div
            :class="{'checked': !tuijian,'unchecked':tuijian}"
            class="yuer"
            @click="Checked"/>
          <input
            :checked="!tuijian"
            v-model="tuijian"
            type="radio"
            name="masterType"
            value="false"
            @change="checked_">育儿嫂&nbsp;&nbsp;&nbsp;&nbsp;
        <span class="grayyrs">为0-3岁幼儿提供照料和早教服务</span></td>
      </tr>
    </table>
    <p class="margin"/>
    <table class="name_table">
      <tr>
        <td>姓名：</td>
        <td><input
          v-model="name"
          type="text"
          name="name"
          class="name your_name"
          required="required"
          placeholder="请填写您的称呼"
          @keyup="checkAgain"></td>
      </tr>
    </table>
    <div class="g"/>
    <table class="ycq_table">
      <tr>
        <td class="ycq_td">宝宝生日\预产期：</td>
        <td><input
          v-model="date"
          type="date"
          name="ycq"
          class="name ycq"
          required="required"
          @change="checkAgain"></td>
      </tr>
    </table>
    <div
      v-show="rea"
      class="err">请填写姓名和宝宝预产期</div>
    <div class="gl"/>
    <input
      type="submit"
      name="提交"
      class="submit"
      @click="handleSubmit_">

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
}

p {
  margin: 0px;
  padding: 0px;
  font-family: '黑体';
}

body {
  background-color: #fff;
  font-family: Arial, 'Hiragino Sans GB', 'Microsoft Yahei', '微软雅黑', '宋体', 宋体, Tahoma, Arial, Helvetica, STHeiti;
}

.root {
  width: 100%;
  font-size: 14px;
  color: #333;
}

h4 {
  color: #666;
  font-weight: normal;
  position: relative;
  padding-left: 15px;
}

.gap {
  width: 100%;
  height: 1px;
  background: #e5e5e5;
  position: relative;
  margin-top: 10px;
}

.ygap {
  height: 1px;
  width: 89.3%;
  position: relative;
  left: 50%;
  margin-left: -44.65%;
  background: #e5e5e5;
  top: 47px;
  z-index: 22;
}

.title {
  margin: 20px 10px 15px 15px;
  color: #333;
  font-size: 15px;
}

mip-form {}

input[type='radio'] {
  margin-right: 10px;
  margin-left: 5px;
  position: relative;
  top: 5px;
  opacity: 0;
}

.grayys {
  font-size: 14px;
  ;
  color: #666;
  position: absolute;
  left: 105px;
  display: inline-block;
  width: 210px;
  height: 44px;
  line-height: 44px;
  top: 2px;

}

.grayyrs {
  font-size: 14px;
  color: #666;
  position: absolute;
  left: 105px;
  top: 48px;
  display: inline-block;
  width: 210px;
  height: 44px;
  line-height: 44px;

}

.name {
  /*width: 100px;*/
  border-radius: 5px;
  /*border: solid 1px #ddd !important;*/
}

table tr td {
  height: 44px;
}

.radio {
  position: relative;
  padding-left: 15px;
  padding-right: 15px;
}

.name_table {
  position: relative;
  left: 15px;
}

.ycq_table {
  position: relative;
  left: 15px;
}

.submit {
  position: relative;
  left: 50%;
  margin-left: -44.65%;
  outline: none;
  -webkit-appearance: none;
  border-radius: 5px;
  width: 89.3%;
  border-style: none;
  height: 47px !important;
  line-height: 20px;
  text-align: center;
  background-color: #afd03b !important;
  color: #fff !important;
  margin-top: 30px;
  font-size: 18px;
}

.margin {
  height: 10px;
  background-color: #f3f3f3;
  margin-left: -10px;
}

.mip_form {
  margin-left: 10px;
}

.name_table {
  width: 95%;
}

.your_name {
  border: none !important;
  font-size: 14px !important;
  position: absolute;
  left: 90px;
  top: 16px;
  color: #999;

}

.ycq_table {
  width: 95%;
}

.ycq_td {
  width: 120px;
}

.ycq {
  background-color: #fff;
  border: solid 1px #e5e5e5;
  width: 120px;
  height: 30px;
  line-hight: 10px;
  color: #666666;
  font-size: 14px;
  -webkit-appearance: none;
}

.checked {
  /* background-image: url('/i/balance_checked.png'); */
  background-size: 22px 22px;
  width: 22px;
  height: 22px;
  position: absolute;
  top: 20px;
  z-index: 22;
}

.unchecked {
  /* background-image: url('/i/balance_unchecked.png'); */
  background-size: 22px 22px;
  width: 22px;
  height: 22px;
  position: absolute;
  top: 20px;
  z-index: 22;
}

.yuesao {
  left: 15px;
  top: 13px;
}

.yuer {
  left: 15px;
  top: 59px;
}

.date {
  /* background-image: url('/i/date_checked.png'); */
  background-size: 22px 22px;
  width: 22px;
  height: 22px;
  z-index: 22;
  position: absolute;
  left: 210px;
  top: 6px;
}

.g {
  width: 89.3%;
  background: #e5e5e5;
  height: 1px;
  position: relative;
  left: 50%;
  margin-left: -44.65%;
}

.gl {
  height: 1px;
  position: relative;
  background: #e5e5e5;
}

.err {
  position: absolute;
  left: 15px;
  color: #ff0000;
  padding-top: 5px;
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

API.update_ycq = function (name, ycq, masterType, fn) {
  API.wrapRet_(
    'https://mip.putibaby.com/api/update_ycq', {
      'name': name,
      'ycq': ycq,
      'masterType': masterType
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
    // var pdata = JSON.parse(this.dataJsonstr)
    // var data = pdata.order
    if (sessionStorage.savedState) {
      var saved = JSON.parse(sessionStorage.savedState)
      console.log(saved)
      sessionStorage.clear()
      return {
        isLogin: false,
        isUnion: false,
        rea: false,
        dateChecked: saved.dateChecked,
        name: saved.name,
        date: saved.date,
        tuijian: saved.tuijian
      }
    }
    return {
      isLogin: false,
      isUnion: false,
      rea: false,
      dateChecked: true,
      name: '',
      date: '',
      tuijian: true
    }
  },
  computed: {

  },
  prerenderAllowed () {
    return true
  },
  mounted () {
    var self = this
    this.$element.customElement.addEventAction('logindone', event => {
      // 这里可以输出登录之后的数据

      // 获取用户信息
      console.log(event)
      API.sessionId = event.sessionId

      self.$set(self, 'isLogin', true)
      self.$set(self, 'isUnion', event.userInfo.isUnion)
      // if (!event.userInfo.isUnion) {
      //   console.log('logindone to submit_ph')
      //   window.MIP.viewer.open(MIP.util.makeCacheUrl('https://mip.putibaby.com/submit_ph?to=' + encodeURIComponent(window.location.href)), {})
      // }
    })
  },
  firstInviewCallback () {
    this.init()
  },
  methods: {
    init () {
      console.log('should loading')
      console.log(this.dataJson)
    },
    load_data () {
      console.log('should set data')
    },

    Checked () {
      this.tuijian = !this.tuijian
    },
    checkAgain () {
      console.log(this)
      if (this.name === '' || this.date === '') {
        this.rea = true
      } else {
        this.rea = false
      }
    },
    handleSubmit_ () {
      // save to sessionStorage
      sessionStorage.savedState = JSON.stringify({
        name: this.name,
        date: this.date,
        dateChecked: this.dateChecked,
        tuijian: this.tuijian
      })

      if (!this.isUnion) {
        console.log('logindone to submit_ph')
        window.MIP.viewer.open(MIP.util.makeCacheUrl('https://mip.putibaby.com/submit_ph?to=' + encodeURIComponent(window.location.href)), {replace: true})
      }
      if (this.name === '' || this.date === '') {
        this.rea = true
        return
      }
      var masterType
      if (this.tuijian === true) {
        masterType = 'yuesao'
      } else {
        masterType = 'yuersao'
      }
      API.update_ycq(this.name, this.date, masterType, function (isOk, res) {
        if (isOk) {
          // window.location.replace(url);
          window.MIP.viewer.open(MIP.util.makeCacheUrl('https://mip.putibaby.com/update_ycq_ok'), {replace: true})
        }
      })
    }
  }
}
</script>
