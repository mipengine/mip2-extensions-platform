<template>
  <div class="wrapper">
    <h1>电话组件</h1>
  </div>
</template>

<style scoped>
.wrapper {
  margin: 0 auto;
  text-align: center;
}
</style>

<script>
import xzh from "xzh-sdk";
import { requestFun } from "../../common/utils/reqUtils";
import { jsSdkCheck} from "../../common/utils/jsSdkCheck";
let context = null;
export default {
  mounted() {
    console.log("This is my first custom component !");
    var tel = this.tel();
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      if (!context) {
        context = Promise.resolve()
          .then(() => {
            return jsSdkCheck();
          })
          .then(data => {
            return xzh.init({
              data: {
                appid: data.appid,
                nonce_str: data.nonce_str,
                signature: data.sign,
                timestamp: data.timestamp,
                url: data.url
              }
            });
          });
      }
      return context;
    },
    async tel() {
      try {
        //获取400电话 逻辑 
        let context = await this.init();
        let res = await xzh.tel({
          data: {
            tel: "18888888888",
            sendData: {}
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
