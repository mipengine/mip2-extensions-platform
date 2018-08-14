<template>
  <div class="wapper">
    <!-- 登陆后的状态 -->
    <div class="mycenter-head">
      <div v-if="isreg === 2">
        <div class="info">
          <dl class="infomate">
            <dt>
              <a href="javascript:;">
                <mip-img
                  src="https://b.kuaifawu.com/static/image/touxiang.png"
                  alt=""
                  class="img"/>
              </a>
            </dt>
            <dd>
              <div class="name">{{ nickname }}</div>
              <div class="tel">{{ mobile }}</div>
            </dd>
          </dl>
        </div>
        <div class="yue">
          <div class="mycenter-module-li yu_e">
            <a
              href="javascript:;"
              class="a">
              <span class="word">账户余额(元):</span>
              <span><b>{{ userbalance }}</b></span>
            </a>
          </div>
        </div>
      </div>
      <div
        v-if="isreg === 1"
        class="btn"
        on="tap:log.login">
        <a
          class="word"
        >注册</a>
        <span class="line"/>
        <a
          class="word"
        >登录</a>
      </div>
    </div>
    <!-- 列表 -->
    <div class="mycenter-module">
      <ul>
        <li class="mycenter-module-li first-li">
          <a
            data-type="mip"
            @click="openurl('order')">
            <span>
              <b class="list_icon">
                <mip-img
                  src="../static/image/wddd.png"
                  alt=""
                  class="imgs"/>
              </b>
              <b class="list_list">我的订单</b>
            </span>
            <span class="arrow"/>
          </a>
        </li>
        <li class="mycenter-module-li second_li">
          <a
            data-type="mip"
            @click="openurl('coupon')">
            <span>
              <b class="coupon_icon">
                <mip-img
                  src="../static/image/yhq.png"
                  alt=""
                  class="imgs"/>
              </b>
              <b class="list_list">优惠券</b>
            </span>
            <span class="arrow"/>
          </a>
        </li>
      </ul>
    </div>
    <div class="mycenter-module">
      <ul>
        <li class="mycenter-module-li first-li">
          <a
            data-type="mip"
            @click="openurl('evaluate')">
            <span>
              <b class="evaluate_icon">
                <mip-img
                  src="../static/image/pj_icon.png"
                  alt=""
                  class="imgs"/>
              </b>
              <b class="list_list">评价</b>
            </span>
            <span class="arrow"/>
          </a>
        </li>
        <li class="mycenter-module-li">
          <a
            data-type="mip"
            @click="openurl('refund')">
            <span>
              <b class="refund_icon">
                <mip-img
                  src="../static/image/tk.png"
                  alt=""
                  class="imgs"/>
              </b>
              <b class="list_list">退款</b>
            </span>
            <span class="arrow"/>
          </a>
        </li>
      </ul>
    </div>
    <div class="mycenter-module">
      <ul>
        <li class="mycenter-module-li first-li">
          <a
            :href="geturl('/user/question.html')"
            data-type="mip">
            <span>
              <b class="question_icon">
                <mip-img
                  src="../static/image/cjwt.png"
                  alt=""
                  class="imgs"/>
              </b>
              <b class="list_list">常见问题</b>
            </span>
            <span class="arrow"/>
          </a>
        </li>
        <li class="mycenter-module-li">
          <a
            :href="geturl('/user/about.html')"
            data-type="mip">
            <span>
              <b class="about_icon">
                <mip-img
                  src="../static/image/gywm.png"
                  alt=""
                  class="imgs"/>
              </b>
              <b class="list_list">关于我们</b>
            </span>
            <span class="arrow"/>
          </a>
        </li>
      </ul>
    </div>
    <div
      v-if="sessionid"
      class="mycenter-module exit_login">
      <ul>
        <li>
          <a
            on="tap:log.logout"
            @click="removeSession">退出登录</a>
        </li>
      </ul>
    </div>
    <div
      v-else
      class="mycenter-module exit_login"/>
  </div>
</template>

<style scoped>
*{padding:0;margin:0;list-style:none;text-decoration: none;}
.wapper{padding-bottom: 1rem;}
.mycenter-head {display: flex;flex-direction: column;background-color: #00a5d5;width: 100%;text-align: center;
border-bottom: 1px solid #d9d9d9;}
.mycenter-head .btn {border:1px solid #fff;width:1rem;margin:0.8rem auto;padding:0.08rem;border-radius:0.03rem;}
.mycenter-head .btn a{color:#fff;}
.mycenter-head .btn .line {width: 0.01rem;height: 0.12rem;display: inline-block;background-color: #f3f6f6;margin:0.05rem;vertical-align: middle;}
.mycenter-head .yue{height:0.5rem;}
.mycenter-head .yue .yu_e{margin:0 0.1rem;position: relative;}
.mycenter-head .yue .yu_e .a{width:100%;display:flex;justify-content: space-between;color:#fff;padding-top:0.03rem;}
.mycenter-head .yue .yu_e .a .word{padding-top:0.1rem;font-size:16px;}
.mycenter-head .yue .yu_e .a span b{font-size:0.4rem;font-weight:normal;}
.mycenter-head .info {display: inline-block;color: #ffffff;border-bottom: 1px solid #6fcce7;width: 100%; }
.mycenter-head .info .infomate {display: flex;padding: 0.35rem 0;padding-left: 0.4rem; }
.mycenter-head .info .infomate dt a {width: 0.8rem;height: 0.8rem;display: inline-block; }
.mycenter-head .info .infomate dt a .img {width: 100%;height: 100%;border-radius: 50%; }
.mycenter-head .info .infomate dd {padding-left: 0.2rem;padding-top: 0.1rem; font-size: 0.2rem;}
.mycenter-head .info .name {margin-bottom: 0.06rem; text-align: left;}
.mycenter-head .info .tel{text-align: left;padding-top:0.04rem;}
.mycenter-module ul{background:#fff;margin-top:0.1rem;border-bottom:1px solid #d9d9d9;border-top:1px solid #d9d9d9;}
.exit_login ul{position: relative;}
.exit_login ul li{padding:0.2rem 0;}
.exit_login ul li a{position: absolute;left:43%;bottom:0.1rem;font-size:15px;}
.mycenter-module .first-li{border-bottom:1px solid #d9d9d9;}
.mycenter-module .first-li a span {padding-top: 0.02rem;}
.mycenter-module .first-li a span .list_icon{width: 0.15rem;height: 0.15rem;display:block;padding-bottom:0.15rem;margin:0 0.1rem;}
.mycenter-module .first-li a span .evaluate_icon{width: 0.2rem;height: 0.2rem;display:block;padding-bottom:0.05rem;margin:0 0.1rem;}
.mycenter-module .second_li a span .coupon_icon{width: 0.2rem;height: 0.15rem;display:block;margin:0 0.1rem;}
.mycenter-module .mycenter-module-li a span .list_list{color:#333;font-weight: normal;}
.mycenter-module .mycenter-module-li a span .refund_icon{width: 0.2rem;height: 0.2rem;display:block;margin:0 0.1rem;}
.mycenter-module .mycenter-module-li a span .question_icon{width: 0.2rem;height: 0.2rem;display:block;margin:0 0.1rem;padding-bottom:0.1rem;}
.mycenter-module .mycenter-module-li a span .about_icon{width: 0.2rem;height: 0.2rem;display:block;margin:0 0.1rem;}
.mycenter-module-li{margin:0.1rem;position: relative;}
.mycenter-module-li a span{display:flex;}
.mycenter-module-li a span.arrow{width: 0.08rem;height: 0.12rem;background: url(../../static/image/right_arrow.png) no-repeat;
background-size: 100% 100%;position: absolute;right:0.1rem;top:0.01rem;}
</style>
<style>
  .s4s-toast {
  position: fixed;
  top: 50%;
  left: 50%;
  padding: 0.2rem 0.4rem;
  transform: translate(-50%, -50%);
  background-color: rgba(0,0,0,0.7);
  border-radius: 0.1rem;
  color: #fff;
}
</style>
<script>
import util from '../../utils/toast.js'
import config from '../../utils/config'
export default {
  props: {
    info: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      mobile: '',
      nickname: '',
      userbalance: '',
      sessionid: '',
      isreg: 1
    }
  },
  mounted () {
    MIP.viewer.fixedElement.init()
    // 自定义exit事件
    const self = this
    this.$element.customElement.addEventAction('logout', event => {
      console.log(12312)
      this.removeSession()
    })

    let CustomStorage = MIP.util.customStorage
    let storage = new CustomStorage(0)
    let sessionid = storage.get('sessionIds')
    console.log(sessionid, 'dddddddddddddd')
    if (sessionid) {
      window.fetchJsonp(config.data().apiurl + '/user/getinfo?sessionid=' + encodeURIComponent(sessionid), {
        jsonpCallback: 'callback'
      }).then(function (res) {
        return res.json()
      }).then(function (data) {
        self.mobile = data.data.items.mobile
        self.nickname = data.data.items.nickname
        self.userbalance = data.data.items.userbalance
        if (!self.mobile) {
          storage.set('returnurl', config.data().burl + '/user/index.html')
          window.MIP.viewer.open(MIP.util.makeCacheUrl(config.data().burl + '/user/register.html'), {isMipLink: true})
        }
        self.isreg = data.data.items.isreg
        console.log(self.mobile)
      })
    }

    this.$element.customElement.addEventAction('login', event => {
      console.log(event.sessionId)
      console.log(event.userInfo.nickname)
      if (event.sessionId) {
        storage.set('sessionIds', event.sessionId)
        storage.set('nickname', event.userInfo.nickname)
      }
      let sessionid = storage.get('sessionIds')
      // sessionid = 'uJN/qa+3uKO6lXywhZ94epifraF3jWKDjKs='
      self.sessionid = sessionid
      if (sessionid) {
        window.fetchJsonp(config.data().apiurl + '/user/getinfo?sessionid=' + encodeURIComponent(sessionid), {
          jsonpCallback: 'callback'
        }).then(function (res) {
          return res.json()
        }).then(function (data) {
          self.mobile = data.data.items.mobile
          self.nickname = data.data.items.nickname
          self.userbalance = data.data.items.userbalance
          if (!self.mobile) {
            storage.set('returnurl', config.data().burl + '/user/index.html')
            window.MIP.viewer.open(MIP.util.makeCacheUrl(config.data().burl + '/user/register.html'), {isMipLink: true})
          }
          self.isreg = data.data.items.isreg
          console.log(self.mobile)
        })
      }
    })

    // console.log(config.data().apiurl)
  },
  prerenderAllowed () {
    return true
  },
  methods: {
    openurl: function (url) {
      console.log(!this.sessionid, 111)
      console.log(this.sessionid, 222)
      if (!this.sessionid) {
        util.toast('请先登录'); return true
      }
      switch (url) {
        case 'order':
          // window.location.href = '/user/orders.html'
          // window.MIP.viewer.open('/user/orders.html', {isMipLink: true});
          window.MIP.viewer.open(MIP.util.makeCacheUrl(config.data().burl + '/user/orders.html'), {isMipLink: true})
          break
        default:
          util.toast('暂未开放')
          break
      }
    },
    removeSession: function () {
      let CustomStorage = MIP.util.customStorage
      let storage = new CustomStorage(0)
      this.sessionid = null
      storage.rm('sessionIds')
      this.isreg = 1
      console.log(this.isreg)
    },
    geturl (url) {
      return MIP.util.makeCacheUrl(config.data().burl + url)
    }
  }
}
</script>
