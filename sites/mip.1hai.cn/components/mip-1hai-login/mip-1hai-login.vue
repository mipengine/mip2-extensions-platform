<template>
  <section main="role">
    <div class="mod panel">
      <div class="phone item border-bottom-px1">
        <div class="icon item-hd">
          <mip-img src="/static/image/phone_grey.png"></mip-img>
        </div>

        <input class="item-bd" v-model.trim="phone" type="tel" maxlength="15" placeholder="请输入手机号" />
      </div>

      <div class="code item border-bottom-px1">
        <div class="icon item-hd">
          <mip-img src="/static/image/code_grey.png"></mip-img>
        </div>

        <input class="item-bd" v-model.trim="code" type="number" maxlength="6" placeholder="请输入6位手机验证码" />
        
        <div class="ui-btn btn-xs btn-primary2 ui-hide" v-show="!showCountDown" @click="getVerityCode">获取验证码</div>
        <div class="ui-btn btn-xs btn-default ui-hide" v-show="showCountDown">{{count}}秒后重发</div>
      </div>
    </div>

    <div class="btn-lg-wrap">
      <div class="ui-btn btn-lg btn-block btn-primary2" @click="loginButton">登录</div>
    </div>
    
    <div class="loading" v-if="loading">
        <div class="loading-bd"></div>
    </div>
  </section>
</template>

<style scoped lang="less">
</style>

<script>
import util from "../../common/util";
import urls from "../../common/urls";
import "../../common/base.less";
import "./mip-1hai-login.less";

export default {
  props: {
    info: {
      type: Object,
      default() {
        return {};
      }
    },
    config: {
      type: Object,
      default() {
        return {};
      }
    },
    orderData: {
      type: Object,
      default: function() {
        return {};
      }
    },
    globalData: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },

  data() {
    return {
      loading: false,
      phone: "",
      code: "",
      showCountDown: false,
      count: "",
      timer: null
    };
  },

  created() {
    console.log("登录");
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
  },

  mounted() {},

  methods: {
    // query string
    getQS() {
      let url = location.search;
      let qs = {};

      if (url.indexOf("?") !== -1 && url.indexOf("from") !== -1) {
        let str = url.substr(1);
        let strs = str.split("&");

        strs.map(item => {
          qs[item.split("=")[0]] = unescape(item.split("=")[1]);
        });
      }

      return qs;
    },

    // 倒计时
    countDown() {
      const TIME_COUNT = 59;

      if (!this.timer) {
        this.count = TIME_COUNT;
        this.showCountDown = true;
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--;
          } else {
            this.showCountDown = false;
            clearInterval(this.timer);
            this.timer = null;
          }
        }, 1000);
      }
    },

    // 验证手机号
    verityPhone(str) {
      let reg = /^1\d{10}$/,
        result = false;

      if (reg.test(str)) {
        result = true;
      } else {
        result = false;
      }

      return result;
    },

    // 获取验证码
    getVerityCode() {
      if (!this.verityPhone(this.phone)) {
        this.$emit("show", "请输入正确手机号");
      } else {
        // Identify
        let identify = util.encrypt(
          "Version=" +
            this.globalData.Version +
            "&Source=" +
            this.globalData.Source
        );

        let param = {
            MobileContext: {
              Version: this.globalData.Version,
              DeviceId: this.globalData.DeviceId,
              Source: this.globalData.Source,
              AppStoreId: this.globalData.AppStoreId,
              Idfa: this.globalData.Idfa,
              SessionId: this.globalData.SessionId,
              PromotionUrl: this.globalData.PromotionUrl,
              PromotionTemplateId: this.globalData.PromotionTemplateId,
              Longitude: this.globalData.Longitude,
              Latitude: this.globalData.Latitude,
              IpAddress: this.globalData.IpAddress,
              PromotionId: this.globalData.PromotionId,
              PhoneIMSI: this.globalData.PhoneIMSI,
              PhoneMAC: this.globalData.PhoneMAC,
              Extend: this.globalData.Extend,
              OperatorId: this.globalData.Extend
            },
            RequestParam: {
              MobilePhone: this.phone,
              AuthCode: "",
              Type: 3
            }
          },
          paramObj = util.postParamEncrypt(this.globalData.md5_key, param);

        this.showLoading();
        fetch(urls.apiHref.GetVerifyCode, {
          method: "POST",
          body: paramObj.des,
          headers: new Headers({
            "Content-Type": "application/json;charset=utf-8",
            Token: this.globalData.Token,
            Remark: "Unchecked",
            Authorization: paramObj.auth,
            AppPlatform: this.globalData.Source,
            Appidentity: identify
          })
        })
          .then(res => res.json())
          .catch(error => console.error("Error:", error))
          .then(response => {
            this.hideLoading();

            let result = response.Result;
            result = util.decrypt(result);
            result = JSON.parse(result);

            if (result.IsSuccess === "false") {
              this.$emit("show", result.Message);
            } else {
              // 开启验证码
              this.countDown();
            }
          });
      }
    },

    // 登录
    loginButton() {
      // Identify
      let identify = util.encrypt(
        "Version=" +
          this.globalData.Version +
          "&Source=" +
          this.globalData.Source
      );

      let phone = this.phone;
      let code = this.code;

      if (phone === "" || code === "") {
        this.$emit("show", "手机号与密码不为空");
      } else {
        let param = {
            MobileContext: {
              SessionId: this.globalData.SessionId,
              AppStoreId: this.globalData.AppStoreId,
              Version: this.globalData.Version,
              Source: this.globalData.Source,
              Latitude: this.globalData.Latitude,
              DeviceId: this.globalData.DeviceId,
              PhoneMAC: this.globalData.PhoneMAC,
              TimeStamp: new Date(),
              Idfa: this.globalData.Idfa,
              Extend: this.globalData.Extend,
              Longitude: this.globalData.Longitude,
              IpAddress: this.globalData.IpAddress,
              PhoneIMSI: this.globalData.PhoneIMSI,
              promotionUrl: this.globalData.PromotionUrl
            },
            RequestParam: {
              ChannelId: this.globalData.ChannelId,
              LoginName: phone,
              Password: code,
              Type: 2
            }
          },
          paramObj;

        paramObj = util.postParamEncrypt(this.globalData.md5_key, param);

        this.showLoading();
        fetch(urls.apiHref.LoginPass, {
          method: "POST",
          body: paramObj.des,
          headers: new Headers({
            "Content-Type": "application/json;charset=utf-8",
            Token: this.globalData.Token,
            Remark: "Unchecked",
            Authorization: paramObj.auth,
            AppPlatform: this.globalData.Source,
            Appidentity: identify
          })
        })
          .then(res => res.json())
          .catch(error => console.error("Error:", error))
          .then(response => {
            this.hideLoading();

            let result = response.Result;
            result = util.decrypt(result);
            result = JSON.parse(result);

            // console.log(result.Result);

            if (result.IsSuccess === false) {
              this.$emit("show", result.Message);
            } else {
              // 用户信息
              util.setStorage({
                key: "EhiUser", // 缓存数据的 key
                data: result.Result // 要缓存的数据
              });

              // 回跳
              if (this.getQS().from === "step2") {
                MIP.viewer.open(urls.htmlHref.step3, {
                  replace: true
                });
              } else {
                MIP.viewer.page.back();
              }
            }
          });
      }
    },

    // loading
    showLoading() {
      this.loading = true;
    },
    hideLoading() {
      this.loading = false;

      let that = this;
      setTimeout(function() {
        that.loading = false;
      }, 360);
    }
  }
};
</script>
