<template>
  <div >
    <mip-fixed type="bottom" class="buttonWrap" v-if="source == 1">
        <!-- 非百城我要优惠为询底价 百城我要优惠为IM-->
        <button class="preButton button"    @click='showAsk'>我要优惠</button>
        <!-- 电话组件，非百城拨打普通400电话  百城拨打天津400电话池-->
         <!-- <a ref='telPhone' :href="'tel:' + telPhone" ></a> -->
         <button class="callButton button"  @click="call">电话客服</button>
        <!-- 非百城 普通IM  百城 专家IM-->
        <button @click="gotoIm"  class="chatButton button">在线客服</button>
    </mip-fixed>
    <mip-fixed type="bottom">
        <button @click="gotoIm" class="chatButton button fixedButton" v-if="source==2" >在线客服</button>
    </mip-fixed>
    <div v-if="source==3">
        <!-- <a class="trigger-button" id="telPhoneButton" ref='telPhone' :href="'tel:' + telPhone"></a> -->
        <button class=" askCall bigImgCall " id="bigImgCall"  @click="call">电话咨询</button>
    </div>
    <mip-fixed type="bottom" class=" buttonWrap reportButton" v-if="source == 4">
         <!-- <a ref='telPhone' :href="'tel:' + telPhone" ></a> -->
         <button class="askCall button"  @click="call">电话客服</button>
    </mip-fixed>
  </div>
</template>

<style scoped>
h1 {
  margin: 0 auto;
  text-align: center;
}

.buttonWrap {
  width: 100%;
  height: 0.88rem;
  display: flex;
  justify-content: space-between;
}

.button {
  display: block;
  width: 100%;
  height: 0.88rem;
  line-height: 0.88rem;
  font-size: 0.3rem;
  text-align: center;
  border: none;
  outline: none;
  background: none;
}

.preButton {
  background-color: #fff;
  color: #585858;
}

.callButton {
  background: linear-gradient(
    90deg,
    rgba(255, 197, 0, 1),
    rgba(255, 164, 0, 1)
  );
  color: #fff;
}

.chatButton {
  background: linear-gradient(90deg, rgba(252, 150, 0, 1), rgba(248, 93, 0, 1));
  color: #fff;
}
.askCall {
  font-size: 0.3rem;
  text-align: center;
  border: none;
  outline: none;
  background: linear-gradient(90deg, rgba(252, 150, 0, 1), rgba(248, 93, 0, 1));
  color: #fff;
}
.bigImgCall {
  line-height: 0.7rem;
  border-radius: 0.04rem;
  width: 2.6rem;
  height: 0.7rem;
}
.reportButton {
  z-index: 9;
}
</style>

<script>
import xzh from "xzh-sdk";
import { viewPoint, clickPoint } from "../../common/utils/stastic.js";
import "../../common/css/base.css";
import base from "../../common/utils/base.js";
import { requestFun } from "../../common/utils/reqUtils.js";
import { jsSdkCheck } from "../../common/utils/jsSdkCheck";
import {
  getLocalStorage,
  getCarId,
  getCityId
} from "../../common/utils/utils.js";
const pid = "/pages/detail";
let context = null;
export default {
  // source 1 :车辆详情 2 :参数配置页 3 大图 4 检测报告页
  // props: ["isBaiCheng", "imUrl", "source", "carInfo"],
  props: {
    isBaiCheng: {
      type: String
    },
    imUrl: {
      type: String
    },
    source: {
      type: String
    },
    carInfo: {
      type: Object
    },
    isShowButton: {
      type: Boolean
    }
  },
  data() {
    return {
      telPhone: "",
      isDirect: ""
    };
  },
  created() {
    base.setMediaBase();
    this.init();
  },
  mounted() {
    this.isDirect = getLocalStorage("isDirect");
    this.imUrl = this.imUrl;
    // 不要删，此处是用于监听轮播图滚动的。。。。
    let vm = this;
    this.$on("change", function(event) {
      vm.change(event);
    });
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
    async tel(tel) {
      try {
        //获取400电话 逻辑
        let context = await this.init();
        let res = await xzh.tel({
          data: {
            tel: tel,
            sendData: {}
          },
          context
        });
      } catch (err) {
        console.log(err);
      }
    },
    call() {
      // 详情页电话客服执行的方法
      requestFun("/ajax/common/get_tel_400", {
        method: "POST",
        param: {
          carid: getCarId(),
          cityid: getCityId()
        }
      }).then(res => {
        this.tel(res.tel);
        if (this.source == 1) {
        // 详情页埋点
        clickPoint(
          "tel_consulting_detail",
          {
            carid: getCarId(),
            "400_num": res.tel,
            type: this.carInfo.is_zg_car //0为非直购，1为直购
          },
          null,
          {
            pid: pid
          }
        );
      } else if (this.source == 3) {
        // 大图埋点
        clickPoint(
          "tel_consulting_pic",
          {
            carid: getCarId(),
            "400_num": res.tel,
            type: this.isDirect //0为非直购，1为直购
          },
          null,
          {
            pid: pid
          }
        );
      }else if(this.source == 4){
        // 检测报告页
        clickPoint(
          "tel_consulting_examine",
          {
            carid: getCarId(),
            "400_num": res.tel
          },
          null,
          {
            pid: pid
          }
        );
      }
      });
    },
    showAsk() {
      if(this.isBaiCheng == 1){
          clickPoint(
          "bottomprice_vehicle_detail",
          {
            carid: getCarId(),
            type: this.carInfo.is_zg_car //0为非直购，1为直购
          },
          () => {
            MIP.viewer.open(this.imUrl, {
                isMipLink: true
            });
          },
          {
            pid: pid
          }
        );
      }else{
          this.$emit("showConsultingToast");
          clickPoint(
            "bottomprice_vehicle_detail",
            {
              carid: getCarId(),
              type: this.carInfo.is_zg_car //0为非直购，1为直购
            },
            null,
            {
              pid: pid
            }
          );
      }
    },
    gotoIm() {
      if (this.source == 1) {
        clickPoint(
          "im",
          {
            carid: getCarId(),
            type: this.carInfo.is_zg_car //0为非直购，1为直购
          },
          () => {
            MIP.viewer.open(this.imUrl, {
                isMipLink: true
            });
          },
          {
            pid: pid
          }
        );
      } else if (this.source == 2) {
        clickPoint(
          "im_config",
          {
            carid: getCarId(),
            type: this.isDirect //0为非直购，1为直购
          },
          () => {
            MIP.viewer.open(this.imUrl, {
                isMipLink: true
            });
          },
          {
            pid: pid
          }
        );
      }
    },
    // 监听大图页滑动   
    // 不要删，此处是用于监听轮播图滚动的。。。。
    change(event) {
      this.$emit("changeNum", event.currIndex);
    }
  }
};
</script>