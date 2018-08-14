<template>
  <div>
    <mip-fixed
      type="bottom">
      <button
        v-if="userInfo && userInfo.isBuy"
        class="pay-btn"
        on="tap:user.login"
        @click="signUp">
        去学习
      </button>
      <button
        v-else
        class="pay-btn"
        on="tap:user.login"
        @click="signUp">
        立即报名
      </button>
    </mip-fixed>
    <div
      v-show="showErrorMessage"
      class="errorMessage">
      {{ errorMessage }}
    </div>
  </div>
</template>
<script>
import base from '../../common/base.js'
export default {
  data () {
    return {
      btnMessage: '立即报名',
      showErrorMessage: false,
      errorMessage: '网络异常，请稍后再试！',
      userInfo: null,
      iscomit: false
    }
  },
  watch: {
    showErrorMessage: function (newQuestion, oldQuestion) {
      if (newQuestion) {
        setTimeout(() => {
          this.showErrorMessage = !this.showErrorMessage
        }, 2000)
      }
    }
  },
  mounted () {
    let _this = this
    this.$element.customElement.addEventAction('login', event => {
      if (event.sessionId) {
        base.setToken(event.sessionId)
      }
      _this.userInfo = event.userInfo
      if (_this.userInfo && _this.userInfo.isBuy) {
        _this.btnMessage = '去学习'
      }
      _this.signUp()
      // if (event.userInfo.userStatus === 1 || event.userInfo.userStatus === 0) {
      //   if (event.userInfo.url) {
      //     MIP.viewer.open(event.userInfo.url, {isMipLink: false})
      //   }
      // } else {
      //   _this.showErrorMessage = true
      // }
    })
  },
  prerenderAllowed () {
    return true
  },
  methods: {
    signUp () {
      let _this = this
      if (!_this.userInfo) {
        return
      }
      if (_this.userInfo && _this.userInfo.isBuy) {
        MIP.viewer.open(MIP.util.makeCacheUrl(base.url + 'user/study?token=' + base.getToken()))
      } else {
        if (_this.userInfo && _this.userInfo.userStatus === 1) {
          MIP.viewer.open(_this.userInfo.url, {isMipLink: false})
        } else if (_this.userInfo && _this.userInfo.userStatus === 0) {
          if (_this.iscomit) {
            return
          } else {
            _this.iscomit = true
          }
          fetch(base.api.placeOrder, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              goodsId: base.getQueryString('id') || '',
              token: base.getToken()
            })
          })
            .then(function (response) {
              _this.iscomit = false
              // 获得后台实际返回的内容
              response.json().then(function (response) {
                if (response.data.orderId) {
                  MIP.viewer.open('https://mip.wangxiao.cn/order/pay?orderId=' + response.data.orderId, {isMipLink: false})
                } else {
                  _this.errorMessage = '下单失败，请重新下单！'
                  _this.showErrorMessage = true
                  setTimeout(() => {
                    MIP.viewer.open(MIP.util.makeCacheUrl('https://mip.wangxiao.cn/course/detail?id=' + base.getQueryString('goodsId')))
                  }, 2000)
                }
              })
            })
        }
      }
    }
  }
}
</script>
<style lang='less' scoped>
.errorMessage {
  position: absolute;
  left: 50%;
  top: 35%;
  color: #fff;
  background: #999;
  padding: 1rem;
  border-radius: 6px;
  text-align: center;
  max-width: 18rem;
  transform: translate(-50%,-50%);
}
.pay-btn {
    width: 100%;
    display: inline-block;
    line-height: 5rem;
    height: 5rem;
    color: #fff;
    text-align: center;
    background: linear-gradient(to right, #FF8F53, #FF5E59);
    font-size: 1.6rem;
    border: none;
    border-radius: .2rem;
}
.pay-btn {
    width: 100%;
    display: inline-block;
    line-height: 5rem;
    height: 5rem;
    color: #fff;
    text-align: center;
    background: linear-gradient(to right, #FF8F53, #FF5E59);
    font-size: 1.6rem;
    border: none;
    border-radius: .2rem;
}
</style>
