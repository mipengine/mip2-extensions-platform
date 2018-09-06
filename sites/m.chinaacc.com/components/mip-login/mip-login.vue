
<template>
    <div>
        <mip-inservice-login id="log" :config="loginData.config" on="login:mipLogin.customLogin logout:mipLogin.customLogout"></mip-inservice-login>
        
        <div class="login" v-if="loginFlag">
          <p class="login-txt fl">登录后可同步电脑与手机购物车中的商品</p>
          <span class="login-han fr" on="tap:log.login">登录</span>
        </div>
    </div>
</template>

<script>
import { getCookie, setCookie } from "../../common/utils/cookie";
import { Toast, Loading } from "../../common/utils/toast";
export default {
  data() {
    return {
      loginFlag: false, //true 表示未登录 false表示已登录
      loginData: {
        info: {},
        config: {
          appid: "1601150861293373",
          clientId: "FhsbGxXc6Exf3nYBThZsHabKSk4VLbCi",
          id: "info",
          autologin: false,
          endpoint: "//m.chinaacc.com/m_member/baidu/mipLogin.shtm",
          isGlobal: true,
          redirectUri: ""
        }
      }
    };
  },
  mounted() {
    const that = this;
    // 自定义login事件
    that.$on("customLogin", event => {
      let isLogin = event.userInfo.isLogin;
      if (isLogin) {
        that.loginFlag = false;
        //已登录
        setCookie("sessionId", event.sessionId);
        setCookie("mip-token", event.sessionId);
        that.$emit("isLogin", {});
      } else {
        that.loginFlag = true;
      }
    });
    // 自定义exit事件
    that.$on("customLogout", event => {
      let $Toast = new Toast();
      $Toast.open({ message: "退出登录" });
    });

    let result = fetchJsonp(
      "//m.chinaacc.com/m_member/baidu/verifyBDLogin.shtm",
      {
        jsonpCallback: "jsonpCallback"
      }
    );
    result
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        let _json = JSON.parse(JSON.stringify(json));
        //flag = true登录了；flag = false未登录
        if (_json.flag) {
          //存在登录用户
          that.loginFlag = false;
          //扩散
          that.$emit("isLogin", {});
        } else {
          that.loginFlag = true;
        }
      })
      ["catch"](function(ex) {
        let $Toast = new Toast();
        $Toast.open({ message: "获取登录用户信息，failed:" + ex });
      });
  }
};
</script>

<style scoped>
.login {
  height: 1.09rem;
  background: #f4f4f4;
}
.login-txt {
  line-height: 1.09rem;
  padding-left: 1.86rem;
  font-size: 0.32rem;
  color: #999;
}
.login-han {
  display: block;
  width: 1.3rem;
  height: 0.61rem;
  border: 1px solid #d0d0d0;
  text-align: center;
  line-height: 0.61rem;
  margin: 0.22rem 0.4rem 0 0;
  border-radius: 3px;
}
</style>
