<template>

  <div class="big-image-box" @click="returnCardetail">
    <!-- <mip-fixed type="top" @click="hanldeHideMackClick"> -->
      <div class="big-img-content">
          <div style="color:#fff;margin-left:46%;">{{this.currentIndex}}/{{imageitems.length}}</div>
          <mip-carousel
            defer="1000"
            layout="responsive"
            width="750"
            height="620"
            buttonController
            on="switchCompleted:showindex.change"
            @click="handle"
            v-if="imageitems.length>0">
            <block v-for="(item,index ) in this.imageitems" :key="index">
              <mip-img style="height:5rem" :src="item.pic"></mip-img>
              <span class="describe">{{item.desc}}</span>
            </block>
          </mip-carousel>
      </div>
      <div class="bottom-content">
        <span class="reference-price">参考价：{{this.price}}万</span>
        <div class="askButton"><mip-car-button :source='3' @changeNum="changeCurrentNum"  id="showindex" :car-info="carInfo" v-if="carInfo"></mip-car-button></div>
      </div>
  <!-- </mip-fixed> -->
    
  </div>
  
</template>
<style scoped>
.big-image-box {
  padding-top: 2rem;
}
.mack {
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  background: #000;
  overflow: hidden;
}
.big-img-content {
  /* position: absolute; */
  top: 25%;
  left: 0;
  width: 100%;
}
.mip-lightbox {
  background: #000;
  height: 100%;
  overflow: hidden;
}
.lightbox {
  width: 100%;
}
.describe {
  position: absolute;
  bottom: 0;
  z-index: 999;
  color: #fff;
  font-size: 0.3rem;
  line-height: 0.3rem;
  margin-left: 0.3rem;
}
.bottom-content {
  /* position: absolute; */
  bottom: 0.4rem;
  z-index: 999999;
  display: flex;
  justify-content: space-between;
  width: 6.9rem;
  height: 0.7rem;
  line-height: 0.7rem;
  top: 8.5rem;
  padding-bottom: 2rem;
  margin-left: 0.3rem;
  margin-top: 2rem;
}
.reference-price {
  font-size: 0.3rem;
  color: #fff;
}
</style>
<script src="/mip-example/mip-example.js"></script>
<script>
import base from "../../common/utils/base";
import { requestFun } from "../../common/utils/reqUtils";
import { viewPoint, clickPoint } from "../../common/utils/stastic.js";
import {
  setLocalStorage,
  getLocalStorage,
  getCarinfo,
  getQuery
} from "../../common/utils/utils.js";
let pid = "/pages/bigimage";
export default {
  data() {
    return {
      currentIndex: 1,
      imageitems: [],
      price: "",
      carInfo: {},
    };
  },
  created() {
    base.setMediaBase();
  },
  mounted() {
    viewPoint("", null, {
      pid: pid
    });
    this.carInfo = JSON.parse(getLocalStorage('carImgInfo'));
    if (this.carInfo.is_video == 1) {
      // 大图模式下删除第一个
      this.carInfo.img_six.shift();
      this.imageitems = this.carInfo.img_six;
    } else {
      this.imageitems = this.carInfo.img_six;
    }
    this.price = this.carInfo.price;
    let query = getQuery();
    // this.currentIndex = query.currentIndex;
  },
  methods: {
    returnCardetail(e) {
      if (e.target.id != "telPhoneButton" && e.target.id != "bigImgCall") {
        window.history.back();
      }
    },
    handle(ev) {
      //阻止冒泡
      // var oEvent = ev || event;
      var oEvent = ev;
      oEvent.cancelBubble = true;
    },
    hanldeHideMackClick(e) {
      if (e.target.id != "telPhoneButton" && e.target.id != "bigImgCall") {
        this.$emit("changeMask", false);
      }
    },
    changeCurrentNum: function(currentIndex) {
      this.currentIndex = currentIndex.detail[0];
    }
  }
};
</script>
