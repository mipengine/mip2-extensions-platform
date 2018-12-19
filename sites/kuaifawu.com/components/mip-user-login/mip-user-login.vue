<template>
  <div class="login">
    <h1><mip-img
      src="../../static/image/login_bg_title.png"
      class="imgs"/></h1>
    <div class="reg-list">
      <mip-vd-tabs>
        <section>
          <li>手机动态码登录</li>
          <li>账号密码登录</li>
        </section>
        <div class="box iphone">
          <ul>
            <li>
              <div class="reg-single">
                <input
                  type="tel"
                  value=""
                  placeholder="请输入手机号"
                  class="reg-single-input">
              </div>
            </li>
            <li>
              <div class="reg-single pic">
                <input
                  id="phone-code"
                  type="text"
                  value=""
                  placeholder="请输入图片验证码"
                  class="reg-single-input ver-code">
                <img
                  src=""
                  alt=""
                  class="reg-ver-img">
              </div>
            </li>
            <li>
              <div class="reg-single yzm">
                <input
                  type="text"
                  name=""
                  value=""
                  placeholder="请输入验证码"
                  class="reg-single-input ver-code">
                <button
                  id="getcode"
                  class="reg-single-btn">获取验证码</button>
              </div>
            </li>
          </ul>
        </div>
        <div class="box password">
          <ul>
            <li>
              <div class="reg-single">
                <input
                  id="phone-mobile"
                  type="tel"
                  value=""
                  placeholder="请输入手机号"
                  class="reg-single-input">
              </div>
            </li>
            <li>
              <div class="reg-single">
                <input
                  id="phone-password"
                  type="password"
                  placeholder="请输入密码"
                  class="reg-single-input">
              </div>
            </li>
          </ul>
        </div>
      </mip-vd-tabs>
    </div>
    <input type="hidden">
    <input
      id="sendtype"
      type="hidden">
    <input
      type="hidden"
      value="1">
    <button class="reg-submit js-submit">登录</button>
    <p
      v-show="showTishi"
      class="tishi">{{ tishi }}</p>
    <p class="reg-tip">
      注册账号即表示同意并遵守<a href="/help/license.html">《快法务用户协议》</a>
    </p>
    <a href="/user/register.html">
      <img
        src="../../static/image/login_bottom_rg.png"
        class="login-reg">
    </a>
  </div>
</template>
<style scoped>
  *{padding:0;margin:0;list-style:none;}
  mip-vd-tabs .mip-vd-tabs-nav .mip-vd-tabs-nav-selected {border-bottom: 2px solid #007bc7;color: #007bc7;}
  .login{width: 100%;background: url(../../static/image/login_bg.jpg) no-repeat;background-size:100% 100%;position: absolute;top:0;left:0;height:100vh;}
  .login h1{width:150px;height:130px;left: 28%;top: 30px;position: absolute;}
  .login h1 .imgs{width: 100%;height: 100%;}
  .reg-list {background-color:#fff;margin:193px 10px 0 12px;}
  .reg-list ul li{margin:0 22px 0 22px;padding:0;border-bottom:1px solid #eee;}
  .reg-single {text-align: left;height:50px;}
  .pic{display:flex;}
  .yzm{position: relative;}
  .yzm>.reg-single-btn{position: absolute;right:0;top:8px;}
  .reg-single .reg-single-text {width:120px;line-height:106px;vertical-align: middle;display: inline-block;font-size:26px;margin-right:22px;color:#999;}
  .reg-single .reg-single-input {width:260px;height:46px;font-size:13px;vertical-align: middle;border: 0;position: relative;outline: none;}
  .reg-single .reg-single-text .ver-code {vertical-align:middle;width:446px;font-size:26px;height:104px;border: 0;}
  .reg-single .reg-single-btn {width:90px;height:35px;font-size:12px;border-radius:5px;color: #fff;border: 0;background-color: #00baf8;vertical-align: middle;}
  .reg-single .reg-single-btn .down {background-color: #999;}
  .reg-single .reg-ver-img {width:216px;height:80px;vertical-align: middle;}
  .reg-tip{color:#999;text-align:center;padding-top:10px;}
  .reg-tip a{color: #00baf8;}
  .login .reg-submit{font-size: 14px;width: 350px;height: 40px;background-color: #007bc7;;color: #ffffff;border: 0;border-radius:4px;
  margin:10px 10px 0 13px;}
  .login .login-reg{position:absolute;left:0;bottom:0;}
  .login .tishi{color:red;}
</style>
<script>
export default {
  data () {

  },
  mounted () {

  }
}
</script>
