<template>
  <div>
    <mip-fixed
      type="bottom">
      <div class="bottom-btn-content">
        <span
          class="consult"
          on="tap:consult.consult">
          <span class="consult-img" />
          <span class="consult-text">在线咨询</span>
        </span>
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
      </div>
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
.bottom-btn-content{
  display: flex;
  line-height: 5rem;
  height: 5rem;
}
.consult-img{
  background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADkAAAA5CAYAAACMGIOFAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjVGNDk5RTZFQjRFMDExRThCQkI1QkYyNkEwMDQyRTVDIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjVGNDk5RTZGQjRFMDExRThCQkI1QkYyNkEwMDQyRTVDIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NUY0OTlFNkNCNEUwMTFFOEJCQjVCRjI2QTAwNDJFNUMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NUY0OTlFNkRCNEUwMTFFOEJCQjVCRjI2QTAwNDJFNUMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5l73dpAAAF1UlEQVR42txa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");
  width: 2rem;
  height: 2rem;
  background-size: contain;
  background-repeat: no-repeat;
}
.consult{
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  width: 10rem;
  text-align: center;
  color: #FE6A4C;
  background: #fff;
  flex-direction: column;
  padding-top: 1rem;
}
.consult-text{
  line-height: 2rem;
  height: 2rem;
  font-size: 1rem;
}
.pay-btn {
  flex-grow: 1;
  display: inline-block;
  line-height: 5rem;
  height: 5rem;
  color: #fff;
  text-align: center;
  background: -webkit-gradient(linear, right, #ff8f53, from(#FF5E59));
  background: linear-gradient(to right,#FF8F53, #FF5E59);
  font-size: 1.6rem;
  border: none;
  border-radius: .2rem;
}
</style>
