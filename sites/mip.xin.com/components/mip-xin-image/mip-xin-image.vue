<template>

  <div
    id="imgbox"
    class="big-image-box"
    @click="returnCardetail">
    <!-- <mip-fixed type="top" @click="hanldeHideMackClick"> -->
    <div class="big-img-content">
      <div style="color:#fff;margin-left:46%;">{{ currentIndex }}/{{ imageitems.length }}</div>
      <mip-carousel
        v-if="imageitems.length>0"
        defer="1000"
        layout="responsive"
        width="750"
        height="620"
        button-controller
        on="switchCompleted:showindex.change"
        @click="handle">
        <block
          v-for="(item,index ) in imageitems"
          :key="index">
          <mip-img
            :src="item.pic"
            style="height:5rem"/>
          <span class="describe">{{ item.desc }}</span>
        </block>
      </mip-carousel>
    </div>
    <div class="bottom-content">
      <span class="reference-price">参考价：{{ price }}万</span>
      <div class="askButton"><mip-xin-button
        v-if="carInfo"
        id="showindex"
        :source="3"
        :car-info="carInfo"
        @changeNum="changeCurrentNum"/></div>
    </div>
  <!-- </mip-fixed> -->

  </div>

</template>
<style scoped>
.big-image-box {
  padding-top: 1.5rem;
  background: #000;
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
  padding-bottom: 4rem;
  margin-left: 0.3rem;
  margin-top: 1.5rem;
}
.reference-price {
  font-size: 0.3rem;
  color: #fff;
}
</style>
<script>
import base from '../../common/utils/base'
import { requestFun } from '../../common/utils/reqUtils'
import { viewPoint } from '../../common/utils/stastic.js'
import {
  getQuery,
  getLocalStorage
} from '../../common/utils/utils.js'
let pid = '/pages/bigimage'
export default {
  data () {
    return {
      currentIndex: 1,
      imageitems: [],
      price: '',
      carInfo: {}
    }
  },
  created () {
    base.setMediaBase()
  },
  // updated() {
  //   document
  //     .querySelector("#imgbox")
  //     .addEventListener("touchmove", function(e) {
  //       e.preventDefault();
  //     });
  // },
  mounted () {
    viewPoint('', null, {
      pid: pid
    })
    requestFun('/ajax/car/big_image', {
      method: 'POST',
      param: { carid: getQuery().carid, cityid: JSON.parse(getLocalStorage('currentCity')).cityid }
    })
      .then(res => {
        if (res.img_six) {
          this.carInfo = res
          this.imageitems = this.carInfo.img_six
          this.price = this.carInfo.price
        }
      })
      .catch(err => {
        console.log(err)
      })
  },
  methods: {
    returnCardetail (e) {
      if (e.target.id !== 'telPhoneButton' && e.target.id !== 'bigImgCall') {
        window.history.back()
      }
    },
    handle (ev) {
      // 阻止冒泡
      // var oEvent = ev || event;
      let oEvent = ev
      oEvent.cancelBubble = true
    },
    hanldeHideMackClick (e) {
      if (e.target.id !== 'telPhoneButton' && e.target.id !== 'bigImgCall') {
        this.$emit('changeMask', false)
      }
    },
    changeCurrentNum: function (currentIndex) {
      this.currentIndex = currentIndex.detail[0]
    }
  }
}
</script>
