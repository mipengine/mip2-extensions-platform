<template>
  <div class="floatConsult"><a @click="callIM" data-type="mip">咨询</a></div>
</template>
<style scoped>
  .floatConsult{width:1.2rem;background:url(/static/images/consult-icon.png) no-repeat center .24rem #ff9a49;background-size:.52rem .48rem;-webkit-border-radius:100px;border-radius:100px;position:fixed;right:.4rem;bottom:2.92rem;z-index:800;-webkit-box-shadow:0 .04rem .08rem rgba(195,107,36,35);box-shadow:0 .04rem .08rem rgba(195,107,36,35);}
  .floatConsult a{display:block;padding-top:.72rem;height:.48rem;line-height:.4rem;color:#fff;font-size:.27rem;text-align:center;}
</style>

<script>
import xzh from "xzh-sdk";
const authDataUrl = "";
let context = null;
export default {
  created() {
    this.init();
  },
  methods: {
    init() {
      if (!context) {
        let url = window.location.href;
        context = Promise.resolve()
          .then(() => {
            return fetchJsonp(
              "//m.chinaacc.com/m_member/baidu/getXZJs.shtm?redirectUrl=" + url,
              {
                jsonpCallback: "jsonpCallback"
              }
            );
          })
          .then(resp => {
            return resp.json();
          })
          .then(data => {
            return xzh.init({
              data: {
                appid: data.appid,
                nonce_str: data.nonce_str,
                signature: data.signature,
                timestamp: data.timestamp,
                url: data.url
              }
            });
          })
          .catch(err => {
            console.log(err);
          });
      }
      return context;
    },
    async callIM() {
      const that = this;
      try {
        let { result: context } = await that.init();
        //console.log(xzh);
        let res = await xzh.invokeBcpIM({
          data: {
            onlyWiseIM: true
          },
          success: function(res) {
          },
          fail: function(res) {
          },
          complete: function(res) {
          },
          context
        });
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>
