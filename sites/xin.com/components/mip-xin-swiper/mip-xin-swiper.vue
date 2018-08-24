<template>
  <div>
    <mip-carousel
      defer="3000"
      id="carousel"
      layout="responsive"
      width="750"
      height="500"
      :index="currentIndex"
      on="switchCompleted:position.change"
      v-if="totalLenght.length>0">
      <block v-for="(item,index) in big_image_info.img_six" :key="index">
        <mip-img @click="handleShowMaskClick" :src="item.pic" v-if="index != 0"></mip-img>
        <mip-img  @click="handlePlayVideo" :src="item.pic" v-if="index == 0"></mip-img>
        <mip-img v-if="index==0&&big_image_info.is_video && status == 1" class="play" @click="handlePlayVideo" src="http://c2.xinstatic.com/f3/20180323/1111/5ab470517f150445829.png"></mip-img>   
        <mip-img v-if="status == -1" class="play-sold" src="http://c2.xinstatic.com/f3/20180731/1427/5b600155b5fc8949695.png"></mip-img>   
      </block>
    </mip-carousel>
    <mip-xin-position @changeNum="changeCurrentNum" :status="status" id="position" :show-play="big_image_info.is_video" :total="totalLenght.length" :carid="big_image_info.carid"></mip-xin-position>
    <!-- <mip-xin-image :carid="carid" :car-info="carInfo" :cityid="cityMessage.cityid" v-if="carInfo&&isHideMask" :current-index='this.currentIndex' @changeMask="handleHideMaskClick" :big-image="big_image_info.img_six" :price="price"></mip-xin-image> -->
  </div>
</template>

<script>
import base from "../../common/utils/base";
import { requestFun } from "../../common/utils/reqUtils";
import { clickPoint } from "../../common/utils/stastic.js";
import { setLocalStorage, getLocalStorage } from "../../common/utils/utils.js";
const pid = "/pages/detail";
const pidReport = "/pages/report";
export default {
  props: ["carid", "cityMessage", "carInfo", "status"],
  data() {
    return {
      big_image_info: [],
      currentIndex: 1,
      isHideMask: false,
      totalLenght: [],
      price: 0,
      carInfo: ""
    };
  },
  created() {
    base.setMediaBase();
    var that = this;
  },
  mounted() {
    var that = this;
    requestFun("/ajax/car/big_image", {
      method: "POST",
      param: { carid: this.carid, cityid: JSON.parse(this.cityMessage).cityid }
    })
      .then(res => {
        if (res.img_six) {
          that.big_image_info = res;
          that.totalLenght = res.img_six;
          that.price = res.price;
          // 有视频时需要第一张要多出来显示
          if (that.big_image_info.is_video == 1) {
            that.big_image_info.img_six.unshift(that.big_image_info.img_six[0]);
          }
          setLocalStorage("carImgInfo", JSON.stringify(res));
        }
      })
      .catch(err => {
        console.log(err);
      });
    this.carInfo && (this.carInfo = JSON.parse(this.carInfo));
  },
  methods: {
    changeCurrentNum: function(currentIndex) {
      this.currentIndex = currentIndex.detail[0];
    },
    handleHideMaskClick(e) {
      this.isHideMask = e.detail[0];
    },
    handleShowMaskClick() {
      if (this.status == 1) {
        // this.isHideMask = true;
        let opurl = getLocalStorage("locationUrl")
          ? getLocalStorage("locationUrl") + "&"
          : "?";
        // let opurl = getLocalStorage("optoken")
        //   ? `&optoken=${getLocalStorage("optoken")}`
        //   : "";
        MIP.viewer.open(
          `/car/big_image.html${opurl}currentIndex=${this.currentIndex}&carid=${
            this.carid
          }`,
          {
            isMipLink: true
          }
        );
      }
    },
    handlePlayVideo() {
      if (this.big_image_info.is_video == 1 && this.status == 1) {
        let opurl = getLocalStorage("locationUrl")
          ? getLocalStorage("locationUrl") + "&"
          : "?";
        let options = `/report_${this.carid}.html${opurl}`;
        clickPoint(
          "examine_video_detail",
          {
            carid: this.carid
          },

          () => {
            MIP.viewer.open(options, {
              isMipLink: true
            });
          },
          {
            pid: pidReport
          }
        );
      } else {
        this.handleShowMaskClick();
        let ev = "video_examine";
        clickPoint(
          ev,
          {
            carid: this.carid
          },
          null,
          {
            pid: pid
          }
        );
      }
    }
  },
  watch: {
    isHideMask(newVal) {
      this.$emit("handleBigImg", newVal);
    }
  }
};
</script>
<style scoped>
.play {
  display: block;
  height: 0.9rem;
  width: 0.9rem;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
}
.play-sold {
  display: block;
  height: 2.9rem;
  width: 2.9rem;
  left: 50%;
  transform: -50%;
  top: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
}
.mip-fill-content {
  min-width: 0;
}
/* .swiper-position {
        display: flex;
        justify-content: space-between;
        position: absolute;
        bottom: 0.27rem;
        left: 0;
        margin: 0 0.3rem;
        width: 6.9rem;
    }
    
    .swiper-position .video {
        display: inline-block;
        width: 1rem;
        height: 0.5rem;
        line-height: 0.5rem;
        border-radius: 25px;
        background: #F85D00;
        text-align: center;
        color: #fff;
        font-size: 0.24rem;
    }
    
    .swiper-position .current {
        display: inline-block;
        width: 1.28rem;
        height: 0.5rem;
        line-height: 0.5rem;
        border-radius: 25px;
        background: rgba(0, 0, 0, 0.3957);
        text-align: center;
        font-size: 0.24rem;
        color: #fff;
    }
    
    .swiper-position .code {
        display: inline-block;
        width: 2.63rem;
        height: 0.5rem;
        line-height: 0.5rem;
        border-radius: 25px;
        background: rgba(0, 0, 0, 0.3957);
        text-align: center;
        color: #fff;
        font-size: 0.24rem;
    } */
</style>
