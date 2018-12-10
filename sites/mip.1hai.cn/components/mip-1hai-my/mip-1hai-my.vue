<template>
  <section main="role">
    <div class="home-head">
      <div class="bd text-center">
        <div class="face bg-avatar"/>
        <div class="user-rating">
          <div class="ui-flex-colum-wrap align-center justify-center">
            <div
              :class="['bg-heart-' + user.SelfLevel]"
              class="cell bg-heart" />
            <div class="cell">爱车指数</div>
          </div>
        </div>
        <div class="user-level">{{ user.CardLevelDesc || '普卡' }}</div>
      </div>
    </div>

    <div class="mod mgt0 home-mod">
      <div class="mod-title">我的钱包</div>
      <div class="ui-flex text-center line-separate">
        <div class="cell">
          <div class="item-hd orange">
            <span>{{ user.Balance || 0 }}</span>元
          </div>
          <div class="item-bd gray">用户余额</div>
        </div>
        <div class="cell">
          <div class="item-hd orange">
            <span>{{ user.UserPoint || 0 }}</span>分
          </div>
          <div class="item-bd gray">用户积分</div>
        </div>
        <div class="cell">
          <div class="item-hd orange">
            <span>{{ user.FreeDays || 0 }}</span>天
          </div>
          <div class="item-bd gray">免费天数</div>
        </div>
      </div>
    </div>

    <div class="mod panel item-list">
      <div
        class="item border-top-px1"
        @click="wallet('order')">
        <span class="icon-m icon-order"/>
        <p class="item-bd">订单管理</p>
        <span class="arrow aw-right"/>
      </div>
    </div>

    <div class="btn-lg-wrap">
      <a
        v-if="!hasLogin"
        data-type="mip"
        data-title="登录"
        href="login.html"
        class="ui-btn btn-lg btn-block btn-primary2"
      >登录</a>
      <div
        v-if="hasLogin"
        class="ui-btn btn-lg btn-block btn-primary2"
        @click="loginOut">退出登录</div>
    </div>

    <div
      v-if="loading"
      class="loading">
      <div class="loading-bd"/>
    </div>
  </section>
</template>

<style scoped lang="less">
</style>

<script>
import util from '../../common/util'
import urls from '../../common/urls'
import '../../common/base.less'
import './mip-1hai-my.less'

export default {
  props: {
    info: {
      type: Object,
      default () {
        return {}
      }
    },
    config: {
      type: Object,
      default () {
        return {}
      }
    },
    orderData: {
      type: Object,
      default: function () {
        return {}
      }
    },
    globalData: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },

  data () {
    return {
      loading: false,
      hasLogin: false,
      user: {}
    }
  },

  created () {
    console.log('我的一嗨')
    // console.log(
    //   "info:",
    //   this.info,
    //   "config:",
    //   this.config,
    //   "orderData:",
    //   this.orderData,
    //   "globalData:",
    //   this.globalData
    // );

    // 登录状态
    this.getLoginState()
    // 用户信息
    this.getUser()
  },

  mounted () {
    window.addEventListener('show-page', () => {
      // 登录状态
      this.getLoginState()
      // 用户信息
      this.getUser()
    })

    window.addEventListener('hide-page', () => {
      // do something when page hide
    })
  },

  methods: {
    // 登录状态
    getLoginState () {
      if (util.getStorage('EhiUser')) {
        this.hasLogin = true
      } else {
        this.hasLogin = false
      }
    },

    // 基本信息
    getUser () {
      if (!util.getStorage('EhiUser')) {
        return
      }

      // Identify
      let identify = util.encrypt(
        'Version=' +
          this.globalData.Version +
          '&Source=' +
          this.globalData.Source
      )
      let param =
          '' +
          'Version=' +
          this.globalData.Version +
          '&DeviceId=' +
          this.globalData.DeviceId +
          '&Source=' +
          this.globalData.Source +
          '&AppStoreId=' +
          this.globalData.AppStoreId +
          '&Idfa=' +
          this.globalData.Idfa +
          '&SessionId=' +
          this.globalData.SessionId +
          '&PromotionUrl=' +
          this.globalData.PromotionUrl +
          '&PromotionTemplateId=' +
          this.globalData.PromotionTemplateId +
          '&Longitude=' +
          this.globalData.Longitude +
          '&Latitude=' +
          this.globalData.Latitude +
          '&IpAddress=' +
          this.globalData.IpAddress +
          '&PromotionId=' +
          this.globalData.PromotionId +
          '&PhoneIMSI=' +
          this.globalData.PhoneIMSI +
          '&PhoneMAC=' +
          this.globalData.PhoneMAC +
          '&Extend=' +
          this.globalData.Extend +
          '&OperatorId=' +
          this.globalData.Extend +
          '&userId=' +
          util.getStorage('EhiUser').CustomerId
      let paramObj = util.getParamEncrypt(this.globalData.md5_key, param)

      this.showLoading()
      fetch(urls.apiHref.UserBase + paramObj.des, {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json;charset=utf-8',
          Token: this.globalData.Token,
          Remark: 'Unchecked',
          AppVersion: this.globalData.Version,
          Authorization: paramObj.auth,
          AppPlatform: this.globalData.Source,
          Appidentity: identify
        })
      })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
          this.hideLoading()

          let result = response.Result
          result = util.decrypt(result)
          result = JSON.parse(result)

          // console.log(result.Result);

          this.user = result.Result
        })
    },

    // 退出登录
    loginOut () {
      this.hasLogin = false
      this.user = {}
      util.removeStorage('EhiUser')
    },

    // 钱包跳转
    wallet (type) {
      if (this.hasLogin) {
        switch (type) {
          case 'order':
            // 查看订单详情
            MIP.viewer.open(urls.htmlHref.orderList, {
              isMipLink: true
            })

            break
          default:
            break
        }
      } else {
        this.$emit('show', '您还没有登录，请登录后再试')
      }
    },

    // loading
    showLoading () {
      this.loading = true
    },
    hideLoading () {
      this.loading = false

      let that = this
      setTimeout(function () {
        that.loading = false
      }, 360)
    }
  }
}
</script>
