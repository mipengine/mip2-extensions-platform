<template>
  <mip-form
    method="post"
    fetch-url="https://api.kuaifawu.com/mip/user/register.html"
    class="register"
    clear>
    <mip-toast/>
    <h1><mip-img
      src="https://b.kuaifawu.com/static/image/regist_bg_title.png"
      class="imgs"/></h1>
    <div class="reg-list">
      <ul class="">
        <li>
          <div class="reg-single">
            <input
              id="phone-mobile"
              v-model="mobile"
              type="tel"
              name="reg[mobile]"
              placeholder="请输入手机号"
              class="reg-single-input">
          </div>
        </li>
        <li>
          <div class="reg-single pic">
            <input
              id="phone-code"
              v-model="code"
              type="text"
              name="forget[code]"
              placeholder="请输入图片验证码"
              class="reg-single-input ver-code">
            <mip-img
              :src="'data:image/gif;base64,' + captchasrc"
              class="reg-ver-img"
              @click="getcaptcha()"/>
          </div>
        </li>
        <li>
          <div class="reg-single yzm">
            <input
              v-model="yzmcode"
              type="text"
              name="forget[verifycode]"
              placeholder="请输入验证码"
              class="reg-single-input ver-code">
            <div class="reg-single-btn-box">
              <input
                id="getcode"
                type="button"
                class="reg-single-btn"
                value="获取验证码"
                @click="SendCode()">
            </div>
          </div>
        </li>
      </ul>
    </div>
    <p class="reg-tip">
      绑定账号即表示同意并遵守<a
        :href="geturl('/help/license.html')"
        date-type="mip">《快法务用户协议》</a>
    </p>
    <input
      id="sendtype"
      type="hidden"
      value="registersend">
    <input
      type="hidden"
      value="1"
      name="logintype">
    <input
      id="sessionid"
      type="hidden"
      value=""
      name="sessionid">
    <!-- <input type="submit" class="reg-submit js-submit" value="快速注册"> -->
    <div
      class="reg-submit"
      @click="reg()">绑定</div>
    <mip-lightbox
      id="msglightbox"
      layout="nodisplay"
      class="mip-hidden">
      <div class="lightbox">
        <h1>提示</h1>
        <p> {{ msg }}</p>
        <span
          on="tap:my-lightbox.toggle"
          class="lightbox-close">关闭弹层</span>
      </div>
    </mip-lightbox>
  </mip-form>
</template>

<style scoped>
  *{padding:0;margin:0;list-style:none;}
  .register{width:100%;height:100vh;background: url(../../static/image/regist_bg.jpg) no-repeat;background-size:cover;position: absolute;top:0;left:0;overflow: hidden;}
  .register h1{width:1.35rem;margin:0.3rem auto 0.1rem;}
  .register h1 .imgs{width: 100%;height: 100%;}
  .reg-list {background-color:#fff;margin:0 auto;width: 3.4rem;}
  .reg-list ul li{margin:0 0.1rem 0 0.1rem;padding:0.01rem;border-bottom:0.014rem solid #eee;}
  .reg-single {text-align: left;height:0.57rem;}
  .pic{display:flex;justify-content: space-between;align-items: center;}
  .yzm{display:flex;justify-content: space-between;align-items: center;}
  .yzm>.reg-single-btn{position: absolute;right:0;top:8px;}
  .reg-single .reg-single-text {width:120px;line-height:106px;vertical-align: middle;display: inline-block;font-size:26px;margin-right:22px;color:#999;}
  .reg-single .reg-single-input {width:100%;height:100%;font-size:0.14rem;vertical-align: middle;border: 0;position: relative;outline: none;}
  .reg-single .reg-single-text .ver-code {vertical-align:middle;width:446px;font-size:26px;height:104px;border: 0;}
  .reg-single .reg-single-btn-box {width:1.8rem;height:0.5rem;font-size:0.14rem;border-radius:5px;color: #fff;border: 0;background-color: #00baf8;vertical-align: middle;}
  .reg-single .reg-single-btn {width:100%;height:0.5rem;font-size:0.14rem;border-radius:5px;color: #fff;border: 0;background-color: #00baf8;vertical-align: middle;}
  .reg-single .reg-single-btn .down {background-color: #999;}
  .reg-single .reg-ver-img {height:0.5rem;vertical-align: middle;width: 1.8rem;}
  .reg-tip{color:#999;text-align:center;padding-top:10px;}
  .reg-tip a{color: #00baf8;}
  .register .reg-submit{font-size: 0.14rem;width: 3.4rem;height: 0.4rem;background-color: #00baf8;color: #ffffff;border: 0;border-radius:4px;margin:0.2rem auto 0;line-height: 0.4rem;text-align: center;}
  /*mip-form div{display: inline-block}*/
  .validate{display: none;margin: 5px 15px}

</style>

<style>
  .s4s-toast {
  position: fixed;
  top: 50%;
  left: 50%;
  padding: 0.2rem 0.1rem;
  transform: translate(-50%, -50%);
  background-color: rgba(0,0,0,0.7);
  border-radius: 0.1rem;
  color: #fff;
}
</style>

<script>
import util from '../../utils/toast.js'
import config from '../../utils/config.js'
export default {
  data () {
    return {
      msg: '',
      captchasrc: '',
      sessionid: '',
      provideridProductskuid: '',
      mobile: '',
      code: '',
      yzmcode: '',
      password: '',
      name: '',
      top: '',
      email: ''

    }
  },
  mounted () {
    let self = this
    let CustomStorage = MIP.util.customStorage
    let storage = new CustomStorage(0)
    let thissessionid = storage.get('sessionIds')
    let isrelate = storage.get('isrelate')
    console.log(storage.get('sessionIds'))
    console.log(isrelate)
    // 取 productskuid 和providerid
    let thisprovideridProductskuid = storage.get('provideridProductskuid')
    self.sessionid = thissessionid
    self.name = storage.get('nickname')
    self.provideridProductskuid = thisprovideridProductskuid
    document.getElementById('sessionid').value = thissessionid

    window.fetchJsonp('https://api.kuaifawu.com/mip/index/getcaptcha?token=' + encodeURIComponent(thissessionid), {
      jsonpCallback: 'callback'
    }).then(function (res) {
      return res.json()
    }).then(function (data) {
      self.captchasrc = data.data.items
    })

    // 取sessionId的值+

    console.log(this.provideridProductskuid)
    console.log(this.sessionid)
  },
  prerenderAllowed () {
    return true
  },
  methods: {

    reset () {
      this.captchasrc = []
      this.msg = ''
    },
    SendCode () {
      let pattern = /^1[34578]\d{9}$/
      let mobile = document.getElementById('phone-mobile').value
      let code = document.getElementById('phone-code').value
      if (!mobile || !pattern.test(mobile)) {
        util.toast('请输入正确的手机号')
        return
      }
      if (!code) {
        util.toast('请输入验证码')
        return
      }

      let getcode = document.getElementById('getcode')
      console.log(this.sessionid)
      window.fetchJsonp('https://api.kuaifawu.com/mip/index/verificationcode?token=' + encodeURIComponent(this.sessionid) + '&imgcode=' + code + '&mobile=' + mobile, {
        jsonpCallback: 'callback'
      }).then(function (res) {
        return res.json()
      }).then(function (data) {
        if (data.status === 500) {
          util.toast(data.msg)
        } else {
          console.log('发送成功，按钮禁用，怎么不走下面的')
          let setTime
          console.log('已经进行到这一步了')
          let time = 60
          setTime = setInterval(function () {
            if (time <= 0) {
              getcode.value = '重新发送'
              getcode.setAttribute('disabled', false)
              getcode.style.background = '#00baf8'
              clearInterval(setTime)
              return
            }
            time--
            getcode.value = time + 's后重发'
            getcode.setAttribute('disabled', 'disabled')
            getcode.style.background = '#d9d9d9'
          }, 1000)
        }
      })
    },
    getcaptcha () {
      let self = this
      window.fetchJsonp('https://api.kuaifawu.com/mip/index/getcaptcha?token=' + encodeURIComponent(this.sessionid), {
        jsonpCallback: 'callback'
      }).then(function (res) {
        return res.json()
      }).then(function (data) {
        self.captchasrc = data.data.items
      })
    },
    reg () {
      // let password = document.getElementById('phone-password').value
      // let realname = document.getElementById('phone-realname').value
      // let email = document.getElementById('phone-email').value
      window.fetchJsonp('https://api.kuaifawu.com/mip/user/register?mobile=' + this.mobile + '&code=' + this.code + '&verifycode=' + this.yzmcode + '&realname=' + this.name + '&sessionid=' + encodeURIComponent(this.sessionid), {
        jsonpCallback: 'callback'
      }).then(function (res) {
        return res.json()
      }).then(function (data) {
        console.log(data)
        if (data.status === 500) {
          console.log('粗错啦')
          util.toast(data.msg)
        } else {
          let CustomStorage = MIP.util.customStorage
          let storage = new CustomStorage(0)
          let returnurl = storage.get('returnurl') ? storage.get('returnurl') : config.data().burl + '/index/index.html'

          window.MIP.viewer.open(MIP.util.makeCacheUrl(returnurl), {isMipLink: true})
        }
      })
    },
    geturl (url) {
      return MIP.util.makeCacheUrl(config.data().burl + url)
    }
  }
}
</script>
