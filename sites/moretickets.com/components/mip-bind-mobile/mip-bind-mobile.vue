<template>
  <div class="login-page">
    <page-header
      content-center="true"
      header-text="title"
      back-fn="back()"/>
    <div class="input-container">
      <div class="input-row">
        <input
          v-model="loginFormData.tel"
          placeholder="请输入手机号码">
      </div>
      <div
        v-if="pageData.showImgCode"
        class="input-row">
        <input
          v-model="loginFormData.imgCode"
          placeholder="请输入图形码"
          maxlength="4">
        <img
          v-if="pageData.imgBase64Data"
          :src="pageData.imgBase64Data"
          class="code-image"
          @click="refreshImg()">
      </div>
      <div class="input-row">
        <input
          v-model="loginFormData.telCode"
          placeholder="请输入验证码">
        <div
          :disabled="pageData.blood"
          class="yzm-link"
          @click="getyzm()">
          <span v-if="!pageData.blood">获取验证码</span><span
            v-if="pageData.blood"
            style="color: #95949d;">({{ pageData.blood }})重新获取</span>
        </div>
      </div>
    </div>
    <div class="login-btn-wrapper">
      <div
        class="login-btn"
        @click="login()">登录摩天轮</div>
      <div class="login-tip">* 未注册过的手机号将自动创建摩天轮账号</div>
    </div>
    <div
      v-if="toastmsg"
      class="toast-msg">
      {{ toastmsg }}
    </div>
  </div>
</template>

<style scoped lang="less">
.toast-msg {
  width: 180px;
  padding: 15px 10px;
  line-height: 20px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.65);
  position: absolute;
  border-radius: 5px;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  z-index: 1000;
}
.login-page {
  background-size: 100% 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  .logo-container {
    margin: 0 auto;
    margin-top: 12%;
    width: 10rem;
  }
  .input-container {
    width: 80%;
    margin: 0 auto;
    margin-top: 3rem;
    font-size: 1.6rem;
    line-height: 1.6rem;
    .input-row {
      margin-top: 1rem;
      width: 100%;
      border-bottom: 1px solid #eaeaeb;
      padding-bottom: 1rem;
      display: flex;
      .code-image {
        height: 3rem;
      }
      input {
        height: 3rem;
        line-height: 3rem;
        flex: 1;
        border: none;
        outline: none;
        color: #494949;
        font-size: 1.6rem;
        width: 10rem;
        &::-webkit-input-placeholder {
          color: #cfcfcf;
        }
        &::-moz-placeholder {
          color: #cfcfcf;
        }
        &::-moz-placeholder {
          color: #cfcfcf;
        }
        &::-ms-input-placeholder {
          color: #cfcfcf;
        }
      }
      .yzm-link {
        color: #323038;
        // border-left: 1px solid rgb(228,228,228);
        padding-left: 1.5rem;
        height: 3rem;
        line-height: 3rem;
        white-space: nowrap;
      }
    }
  }
  .login-btn-wrapper {
    width: 80%;
    margin: 0 auto;
    margin-top: 4rem;
    .login-btn {
      height: 5rem;
      line-height: 5rem;
      color: #fff;
      text-align: center;
      // background-color: rgb(253,104,87);
      // box-shadow: 0 2px 5px 0 rgb(253,104,87);
      // border-radius: 0.5rem;
      font-size: 1.6rem;
      // width: 317px;
      // height: 44px;
      border-radius: 2px;
      background-image: linear-gradient(278deg, #ff1d41, #ee0e87);
    }
    .login-tip {
      padding-top: 15px;
      color: #95949d;
      font-size: 1.2rem;
      text-align: center;
    }
  }
}
.agree-mask {
  position: absolute;
  z-index: 2000;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}
.agree-wrapper-full {
  color: #333;
  background-color: #fff;
  z-index: 2002;
  position: absolute;
  bottom: 0;
  top: 0;
  width: 100%;
}
.agree-wrapper-full .agree-content {
  max-height: 80%;
}
.disagree-wrapper {
  color: #333;
  background-color: #fff;
  z-index: 2002;
  position: absolute;
  bottom: 40%;
  width: 90%;
  border-radius: 10px;
  left: 5%;
}
.disagree-wrapper .agree-footer-left {
  border-top: 1px solid #eaeaeb;
  color: #3385ff;
}
.disagree-wrapper .agree-footer {
  padding: 9px 0px;
}
.agree-wrapper {
  border-radius: 0.6rem;
  color: #333;
  background-color: #fff;
  z-index: 2002;
  position: absolute;
  bottom: 15%;
  width: 80%;
  left: 10%;
}
.agree-title {
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  padding: 18px 0;
  color: rgba(0, 0, 0, 1);
}
.agree-content {
  padding: 0 18px;
  font-size: 14px;
  line-height: 1.64;
  letter-spacing: normal;
  text-align: left;
  color: #68676c;
  max-height: 268px;
  overflow-y: scroll;
}
.agree-content-tip {
  padding: 10px 18px;
  font-size: 12px;
  line-height: 1.7;
  color: rgba(149, 148, 157, 1);
}
.agree-link {
  color: #006bff;
  text-decoration: underline;
}
.agree-footer {
  padding: 9px 18px;
  overflow: auto;
}
.agree-footer-left {
  width: 100%;
  height: 44px;
  border-radius: 2px;
  font-size: 16px;
  line-height: 44px;
  text-align: center;
  float: left;
  cursor: pointer;
}
.agree-footer-right {
  width: 100%;
  height: 44px;
  border-radius: 2px;
  font-size: 16px;
  line-height: 44px;
  text-align: center;
  background-image: linear-gradient(285deg, #ff1d41, #ee0e87);
  float: right;
  color: #fff;
  cursor: pointer;
}
</style>

<script>
import { httpGet } from '@/common/httpUtil'
import { base64Encode } from '@/common/encryptUtil'

import * as sessionStorageUtil from '@/common/sessionStorageUtil.js'
import * as adapterStorageUtil from '@/common/adapterStorageUtil.js'
import { templateCompile } from '@/common/urlUtil'
export default {
  props: {
    'prefixUrl': {
      type: String,
      default: ''
    },
    nextUrl: {
      type: String,
      default: ''
    },
    yzmUrl: {
      type: String,
      default: ''
    },
    loginUrl: {
      type: String,
      default: ''
    },
    imgDataUrl: {
      type: String,
      default: ''
    },
    preLoginUrl: {
      type: String,
      default: ''
    },
    deviceUrl: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      pageData: {
        imgBase64Data: '',
        showImgCode: false,
        blood: 0
      },
      toastmsg: '',
      loginFormData: {}
    }
  },
  mounted () {
    sessionStorageUtil.syncSessionData()
    this.prefixUrl && sessionStorageUtil.set('prefix', this.prefixUrl)
    // 获取smstoken,imgCode
    this.uuid()
    this.preLogin()
  },
  methods: {
    encryptLoginCode (uuid, timestamp) {
      return uuid + '_:_' + timestamp
    },
    getLoginUUId () {
      const loginOID = adapterStorageUtil.get('device_uuid')
      const timestamp = sessionStorageUtil.get('login_date') || 1000459
      return base64Encode(this.encryptLoginCode(loginOID, timestamp))
    },
    login () {
      let me = this
      if (!me.loginFormData.telCode) {
        me.toast('请输入有效的手机验证码')
      } else {
        let token = me.loginFormData.telCode
        let mobile = me.loginFormData.tel
        let loginUUId = me.getLoginUUId()
        let thirdpartyOID = adapterStorageUtil.get('bd_openid')
        let fetchUrl = templateCompile(this.loginUrl, {
          mobile,
          token,
          thirdpartyOID,
          loginUUId
        })
        httpGet(fetchUrl).then(function (jsonData) {
          if (jsonData.statusCode === 200) {
            // 存入后台返回的tsessionid
            if (jsonData.result.data && jsonData.result.data.tsessionid) {
              sessionStorageUtil.set('mtl_session', jsonData.result.data.tsessionid)
            }
            let loginBackUrl = sessionStorageUtil.get('loginBackUrl')
            if (loginBackUrl) {
              sessionStorageUtil.remove('loginBackUrl')
              setTimeout(() => {
                MIP.viewer.open(loginBackUrl, {replace: true})
              }, 10)
            } else {
              me.nextUrl && MIP.viewer.open(me.nextUrl, {replace: true})
            }
          } else {
            me.toast(jsonData.comments || '登录异常，请联系客服')
          }
        })
      }
    },
    getyzm () {
      let me = this
      if (me.pageData.blood > 0) {
        me.toast('不能重复获取')
      } else if (!/1\d{10}/.test(me.loginFormData.tel)) {
        me.toast('请输入有效的手机号码')
      } else if (
        me.pageData.showImgCode &&
        !/\d{4,6}/.test(me.loginFormData.imgCode)
      ) {
        me.toast('请输入图形验证码')
      } else {
        me.pageData.blood = 60
        let token = sessionStorageUtil.get('sms_token')
        let mobile = me.loginFormData.tel
        let imgCodeQuery = me.loginFormData.imgCode ? `&code=${me.loginFormData.imgCode}` : ''
        let fetchUrl = templateCompile(me.yzmUrl, { mobile, token, imgCodeQuery })
        httpGet(fetchUrl)
          .then(function (jsonData) {
            if (jsonData.statusCode === 200) {
              me.countDown()
            } else if (jsonData.statusCode === 1007) {
              me.pageData.blood = 0
              me.refreshImg()
              me.pageData.showImgCode = true
              me.toast('请输入图形验证码')
            } else {
              me.pageData.blood = 0
              me.refreshImg()
              me.toast(jsonData.comments)
            }
          })
          .catch(function (err) {
            me.pageData.blood = 0
            me.toast(err.message)
          })
      }
    },
    toast (msg, timeout) {
      let me = this
      if (msg !== '') {
        timeout = timeout || 2000
        me.toastmsg = msg
        setTimeout(() => {
          me.toastmsg = ''
        }, timeout)
      }
    },
    refreshImg () {
      let me = this
      httpGet(this.imgDataUrl)
        .then(function (imgBase64Data) {
          me.pageData.imgBase64Data = imgBase64Data
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    countDown () {
      let me = this
      let stop
      me.pageData.blood = 60
      // Don't start a new fight if we are already fighting
      if (stop !== null) return
      stop = setInterval(function () {
        if (me.pageData.blood > 0) {
          --me.pageData.blood
        } else {
          stop = null
        }
      }, 1000)
    },
    uuid () {
      let me = this
      if (!adapterStorageUtil.get('device_uuid')) {
        me.deviceUrl &&
          httpGet(me.deviceUrl)
            .then(function (jsonData) {
              if (jsonData.result.data) {
                adapterStorageUtil.set('device_uuid', jsonData.result.data)
              }
            })
            .catch(function (err) {
              me.toast(err.message)
            })
      }
    },
    preLogin () {
      let me = this
      me.preLoginUrl &&
        httpGet(me.preLoginUrl)
          .then(function (jsonData) {
            if (jsonData.statusCode === 1007) {
              me.refreshImg()
              me.pageData.showImgCode = true
            }
          })
          .catch(function (err) {
            me.toast(err.message)
          })
    }
  }
}
</script>
