
<template>
  <div class="root">
    <mip-form
      method="get"
      url="https://www.mipengine.org?we=123">
      <div class="warn">
        <span class="span">尊敬的用户：</span><br>
        <span>为了能让菩提果的老师和月嫂更好的为您服务，需要您提供正确的手机号码：</span>
      </div>
      <div class="get">
        <input
          id="ph"
          v-model="phoneNumber"
          class="ph"
          type="number"
          placeholder="请输入您的手机号码"
          @input="changePhoneNumber_">
        <input
          id="code"
          v-model="sms"
          class="code"
          type="number"
          placeholder="输入验证码"
          @input="changeVerifySms_">
        <input
          :disabled="smsDisabled"
          :value="text"
          class="smsSend"
          type="button"
          @click="getVerify_">
      </div>
      <div
        v-if="err"
        id="err"
        class="err">{{ errMessage }}</div>
      <div class="submit">
        <input
          :disabled="subDisabled"
          class="submitbtn"
          type="submit"
          value="确认提交"
          @click="handleSubmit_" >
      </div>
    </mip-form>
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

body {}

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
  background: #fff;
  font-size: 14px;
  width: 100%;
  padding-left: 15px;
  padding-right: 15px;
}

.warn {
  color: rgba(102, 102, 102);
  position: relative;
  margin-top: 20px;
}

.warn span:nth-of-type(1) {
  color: #333333;
  font-size: 15px;
  position: relative;
  display: inline-block;
}

.warn span:nth-of-type(2) {
  color: #666;
  font-size: 14px;
  left: 0px;
  position: relative;
  display: inline-block;
  margin-top: 10px;
}

.get {
  margin-top: 20px;
  height: 100px;
  position: relative;
}

.get .btn1 {
  position: relative;
  width: 42%;
  right: -228px;
  top: 49px;
  height: 38px;
  border-radius: 4px;
  border-style: none;
  background-color: #46ab49;
  color: #fff;
  text-align: center;

}

.ph {
  -webkit-appearance: none;
  position: relative;
  display: block;
  border: 1px solid #e5e5e5;
  border-radius: 5px;
  height: 36px;
  line-height: 36px;
  height: 44px;
  padding-left: 15px;
  font-size: 14px;
  color: #b2b2b2;
}

.code {
  -webkit-appearance: none;
  position: relative;
  top: 20px;
  display: block;
  border: 1px solid #e5e5e5;
  border-radius: 5px;
  height: 44px;
  line-height: 36px;
  padding-left: 15px;
  width: 57%;
  color: #b2b2b2;
}

.err {
  position: relative;
  color: #ff0200;
  margin-top: 15px;
}

.smsSend {
  position: absolute;
  right: 0px;
  top: 64px;
  border-radius: 5px;
  line-height: 36px;
  text-align: center;
  background: #fff;
  color: #afd03b;
  font-size: 14px;
  border: 1px solid #afd03b;
  cursor: pointer;
  width: 40%;
  height: 44px;

}

.smsSend.disabled {
  pointer-events: none;
  cursor: default;
  opacity: 0.6;
}

.submit .submitbtn {
  background: #afd03b;
  color: #fff;
  cursor: pointer;
  line-height: 36px;
  text-align: center;
  border-radius: 4px;
  margin: 0 auto;
  border-style: none;
  position: relative;
  top: 30px;
  height: 47px;
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
      if (ret.success) fn(true, ret.data)
      else fn(false, ret.error)
    })
    .catch(e => {
      console.error(e.message)
      fn(false, e.message)
    })
}

API.sendPhoneNumberVerifySms = function (phoneNumber, fn) {
  API.wrapRet_(
    'https://mip.putibaby.com/api/send_sms', {
      'phone_number': phoneNumber
    },
    fn)
}

// API.sendPhoneNumberVerifySmsWithGt = function(phoneNumber, fn) {
//   if (!/^1\d{10}$/.test(phoneNumber)) {
//     fn(false, '错误的手机号');
//     return;
//   }
//   var handler = function(captchaObj) {
//     // captchaObj.appendTo('#captcha');
//     captchaObj.onReady(function() {
//       $("#wait").hide();
//       captchaObj.verify();
//     }).onSuccess(function() {
//       var result = captchaObj.getValidate();
//       if (!result) {
//         return alert('请完成验证');
//       }
//       // window.gt_loading = false;
//       API.wrapRet_(
//         'https://mip.putibaby.com/api/send_sms_validate', {
//           'phone_number': phoneNumber,
//           'geetest_challenge': result.geetest_challenge,
//           'geetest_validate': result.geetest_validate,
//           'geetest_seccode': result.geetest_seccode
//         },
//         fn);
//     });
//     window.captchaObj = captchaObj;
//   };

//   $.ajax({
//     url: "/api/gt_register?t=" + (new Date()).getTime(),
//     type: "get",
//     dataType: "json",
//     success: function(ret) {
//       console.log(ret);
//       var data = ret.data;
//       initGeetest({
//         gt: data.gt,
//         challenge: data.challenge,
//         offline: !data.success,
//         new_captcha: data.new_captcha,
//         product: "bind",
//         width: "300px"
//       }, handler);
//     }
//   });
// }

API.verifyPhoneNumber = function (phoneNumber, sms, fn) {
  API.wrapRet_(
    'https://mip.putibaby.com/api/verify_sms', {
      'phone_number': phoneNumber,
      'sms': sms
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
    // console.log('data:', this)
    // var pdata = JSON.parse(this.dataJsonstr)
    return {
      isLogin: false,
      isUnion: false,
      errPhoneNumber: false,
      errSms: false,
      phoneNumber: '',
      sms: '',
      text: '获取验证码',
      djs: 0,
      verifyInput: true,
      smsDisabled: true,
      subDisabled: true,
      err: false,
      errMessage: ''
    }
  },
  computed: {

  },
  prerenderAllowed () {
    return true
  },
  mounted () {
    console.log('This is pty submit phone number component !')
    var self = this
    this.$element.customElement.addEventAction('logindone', event => {
      // 这里可以输出登录之后的数据

      // 获取用户信息
      console.log(event)
      API.sessionId = event.sessionId

      self.$set(self, 'isLogin', true)
      self.$set(self, 'isUnion', event.userInfo.isUnion)
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
      if (!/^1\d{10}$/.test(this.phoneNumber)) {
        this.errMessage = '请输入正确的手机号码'
        this.err = true
      } else {
        this.smsDisabled = false
        this.errMessage = ''
        this.err = false
      }
    },
    changeVerifySms_ () {
      if (!/^\d{4,6}$/.test(this.sms)) {
        this.errMessage = '请输入正确的验证码'
        this.err = true
      } else {
        this.subDisabled = false
        this.errMessage = ''
        this.err = false
      }
    },
    daojishi_ () {
      if (this.djs === 1) {
        var self = this
        var t = 60
        var daojishi = setInterval(function () {
          self.errMessage = ''
          self.err = false
          t--
          self.text = t + 'S后可重新获取'
          if (t === 0) {
            self.text = '获取验证码'
            clearInterval(daojishi)
          }
        }, 1000)
      }
    },
    getVerify_ () {
      this.verifyInput = false
      this.djs = 1
      var self = this
      API.sendPhoneNumberVerifySms(this.phoneNumber, function (isOk, res) {
        if (isOk) {
          self.daojishi_()
        } else {
          self.errMessage = res || '该号码已注册'
          self.err = true
        }
      })
    },
    handleSubmit_ () {
      var self = this
      if (this.subDisabled) {
        return
      }
      this.subDisabled = true
      if (!/^1\d{10}$/.test(this.phoneNumber)) {
        self.errMessage = '请输入正确的手机号码'
        self.err = true
        this.subDisabled = false
      } else {
        if (!/^\d{4,6}$/.test(this.sms)) {
          self.errMessage = '请输入正确的验证码'
          self.err = true
          this.subDisabled = false
        } else {
          self.errMessage = ''
          self.err = false
          API.verifyPhoneNumber(this.phoneNumber, this.sms, function (isOk, res) {
            if (isOk) {
              // window.location.href = JSON.parse(self.dataJsonstr).redirect
              var url = JSON.parse(self.dataJsonstr).redirect
              // window.location.replace(url);
              window.MIP.viewer.open(MIP.util.makeCacheUrl(url), {replace: true})
            } else {
              self.errMessage = '验证码出错或手机号已经注册'
              self.err = true
              this.subDisabled = false
            }
          })
        }
      }
    }
  }
}
</script>
