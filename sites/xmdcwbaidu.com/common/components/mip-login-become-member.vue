<template>
  <div
    v-show="loginBecomeMemberVisible"
    class="loginBecomeMember">
    <!--<mt-popup v-model="loginBecomeMemberVisible" popup-transition="popup-fade" class="supplement-phone-popup">-->
    <mt-popup
      :value="loginBecomeMemberPopup"
      :close-on-click-modal="(false)"
      class="supplement-phone-popup"
      @touchmove.native.prevent.stop
      @click.native.prevent.stop
      @set-popup-value="setPopupValue">
      <div class="container">
        <div class="title">补充手机号码成为会员 体验完整线上车务服务</div>
        <div class="input-container">
          <a class="mint-cell mint-field">
            <div class="mint-cell-left"/>
            <div class="mint-cell-wrapper">
              <div class="mint-cell-title"><span class="mint-cell-text">手机号</span></div>
              <div class="mint-cell-value"><input
                v-model="mobile"
                placeholder="请输入车主手机号"
                type="text"
                class="mint-field-core"
                maxlength="11">
                <div
                  class="mint-field-clear"
                  style="display: none;"><i class="mintui mintui-field-error"/></div>
                <span class="mint-field-state is-default"><i class="mintui mintui-field-default"/></span>
                <div class="mint-field-other"/>
              </div>
            </div>
            <div class="mint-cell-right"/>
          </a>
          <a
            class="mint-cell mint-field">
            <div class="mint-cell-left"/>
            <div class="mint-cell-wrapper">
              <div class="mint-cell-title"><span class="mint-cell-text">验证码</span></div>
              <div class="mint-cell-value"><input
                v-model="vCode"
                placeholder="短信验证码"
                type="text"
                class="mint-field-core"
                maxlength="4">
                <div
                  class="mint-field-clear"
                  style="display: none;"><i class="mintui mintui-field-error"/></div>
                <span class="mint-field-state is-default"><i class="mintui mintui-field-default"/></span>
                <div
                  class="mint-field-other"
                  @click="countDown">
                  <div class="get-code-button"><span v-text="showTime"/></div>
                </div>
              </div>
            </div>
            <div class="mint-cell-right"/>
          </a>
        </div>
        <div class="mint-msgbox-btns input-button">
          <button
            class="mint-msgbox-btn mint-msgbox-cancel"
            @click="cancal">取消</button>
          <button
            class="mint-msgbox-btn mint-msgbox-confirm"
            @click="loginMember">确认</button>
        </div>
      </div>
    </mt-popup>
  </div>
</template>

<script>
import mtPopup from './mip-popup'
import {Mtoast} from '../utils/toast'
import commonApi from '../api/common'
import {Storage} from '../utils/common.js'

export default {
  name: 'LoginBecomeMember',
  components: {
    mtPopup
  },
  props: {
    loginBecomeMemberVisible: {
      type: Boolean,
      default: false
    },
    routerName: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      loginBecomeMemberPopup: false,
      mobile: '',
      vCode: '',
      showTime: '获取验证码'
    }
  },
  watch: {
    loginBecomeMemberVisible (val) {
      this.loginBecomeMemberPopup = val
    }
  },
  mounted () {
    if (this.loginBecomeMemberVisible) {
      this.open()
    }
  },
  methods: {
    open () {
      this.loginBecomeMemberPopup = true
    },
    loginMember () {
      const self = this
      const Toast = new Mtoast()
      if (self.inputCheck()) {
        return
      }
      const params = {
        mobile: self.mobile,
        code: self.vCode
      }
      commonApi.popupCheckMsmCode(params).then(() => {
        const loginParams = {
          mobile: self.mobile
        }
        commonApi.popupLoginBecomeMember(loginParams).then((data) => {
          // let loginInfo = Storage.get('loginInfo')
          // console.log('loginInfo信息',loginInfo.userInfo)
          // if(loginInfo.userInfo){
          //   loginInfo.userInfo.apitoken = data.apitoken
          // }
          // Storage.set('loginInfo',loginInfo)
          console.log('这里是loginBecomeMember.vue的apitoken', data.apitoken)
          Storage.set('apitoken', data.apitoken)
          self.$emit('loginBecomeMember', { bol: 'login', routerName: self.routerName })
        }).catch((err) => {
          setTimeout(() => {
            Toast.open({
              message: err.msg
            })
          }, 20)
        })
      }).catch((err) => {
        setTimeout(() => {
          Toast.open({
            message: err.msg
          })
        }, 20)
      })
    },
    inputCheck () {
      let self = this
      const Toast = new Mtoast()
      if (!/^1[345678]\d{9}$/.test(self.mobile)) {
        Toast.open({
          message: '手机号输入有误,<br>请重新输入'
        })
        return true
      }
      if (self.vCode.length !== 4) {
        Toast.open({
          message: '验证码输入有误, <br>请重新输入'
        })
        return true
      }
      return false
    },
    countDown: function () {
      let self = this
      const Toast = new Mtoast()
      if (!/^1[345678]\d{9}$/.test(self.mobile)) {
        Toast.open({
          message: '手机号输入有误,<br>请重新输入'
        })
        return true
      }
      if (/获取/.test(self.showTime)) {
        let startTime = (new Date()).getTime()
        let count = 0

        let timer = setInterval(function () {
          let now = (new Date()).getTime()
          count = 60 - Math.round((now - startTime) / 1000)
          self.showTime = count + 's'
          if (count <= 0) {
            clearInterval(timer)
            self.showTime = '重新获取'
            count = 0
          }
        }, 1000)
        let params = {
          mobile: self.mobile
        }
        commonApi.getMsmCode(params).then(function () {
          setTimeout(() => {
            Toast.open({
              message: '短信验证码已发送!'
            })
          }, 20)
        }, function () {
          clearInterval(timer)
          self.showTime = '重新获取'
        })
      }
    },
    cancal () {
      this.$emit('loginBecomeMember', { bol: false })
    },
    setPopupValue () {
      const self = this
      self.loginBecomeMemberVisible = false
    }
  }
}
</script>

<style lang="less" scoped>
.loginBecomeMember {
  z-index: 999;
  .supplement-phone-popup {
    /*width: 90%;*/
    left: 28px;
    right: 28px;
    transform: translate3d(0, -50%, 0);
    border-radius: 4px;
    overflow: hidden;
    .container {
      text-align: left;
      .title {
        text-align: center;
        margin-bottom: 0.4rem;
        font-size: 14px;
        font-weight: bold;
        padding: 0 15px;
      }
      width: 100%;
      margin: 0 auto;
      margin-top: 0.4rem;
      text-align: left;
      .input-container {
        .mint-cell {
          .mint-cell-wrapper {
            padding: 0;
            .mint-cell-title {
              width: 1.4rem;
            }
          }
        }
        padding: 0 15px;
        .get-code-button {
          width: 1.72rem;
          height: 0.6rem;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #333333;
          border-radius: 0.06rem;
          color: white;
          span {
            font-size: 0.26rem;
            font-family: PingFang-SC-Medium;
            color: white;
          }
        }
      }
      .input-button {
        height: 44px;
        .mint-msgbox-cancel {
          border-left: 1px solid #E6E6E6;
        }
      }
    }
  }
  .mint-field .mint-cell-value {
    align-items: center;
  }
  .mint-msgbox-btn {
    font-size: 16px;
  }
  .mint-msgbox-confirm {
    color: #FED41D;
  }
}
.mint-toast {
  z-index: 3000;
}
</style>
