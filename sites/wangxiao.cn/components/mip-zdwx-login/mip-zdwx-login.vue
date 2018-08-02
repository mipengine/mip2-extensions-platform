<template>
  <div
    v-show="showErrorMessage"
    class="errorMessage">
    {{ errorMessage }}
  </div>
</template>
<script>
import base from '../../common/base.js'
export default {
  data () {
    return {
      showErrorMessage: false,
      errorMessage: '网络异常，请稍后再试！'
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
      if (event.userInfo.userStatus === 1 || event.userInfo.userStatus === 0) {
        if (event.userInfo.url) {
          MIP.viewer.open(event.userInfo.url, {isMipLink: false})
        }
      } else {
        _this.showErrorMessage = true
      }
    })
  }
}
</script>
<style lang='less' scoped>
.errorMessage {
  position: absolute;
  left: 50%;
  top: 35%;
  margin-left: -50px;
  margin-top: -50px;
  color: #fff;
  background: #999;
  padding: 1rem;
  border-radius: 6px;
}
</style>
