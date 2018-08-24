<template>
  <div>
    <mip-carousel
      v-if="totalLenght.length>0"
      id="carousel"
      :index="currentIndex"
      defer="3000"
      layout="responsive"
      width="750"
      height="500"
      on="switchCompleted:position.change">
      <block
        v-for="(item,index) in big_image_info.img_six"
        :key="index">
        <mip-img
          v-if="index!=0"
          :src="item.pic"
          @click="handleShowMaskClick(index)"/>
        <div v-if="index == 0 && big_image_info.is_video == 1 && status == 1">
          <a
            :href="urlReport">
            <mip-img
              :src="item.pic"
              @click="handlePlayVideo" />
          </a>
        </div>
        <div v-if="index==0&&big_image_info.is_video == 1 && status == 1">
          <a
            :href="urlReport">
            <mip-img
              class="play"
              src="//c2.xinstatic.com/f3/20180323/1111/5ab470517f150445829.png"
              @click="handlePlayVideo"/>
          </a>
        </div>
        <mip-img
          v-if="index == 0 && big_image_info.is_video == 0 && status == 1"
          :src="item.pic"
          @click="handlePlayVideo" />
        <mip-img
          v-if="status == -1"
          class="play-sold"
          src="//c2.xinstatic.com/f3/20180731/1427/5b600155b5fc8949695.png"/>
      </block>
    </mip-carousel>
    <mip-xin-position
      id="position"
      :status="status"
      :show-play="big_image_info.is_video"
      :total="totalLenght.length"
      :carid="big_image_info.carid"
      @changeNum="changeCurrentNum"/>
      <!-- <mip-xin-image :carid="carid" :car-info="carInfo" :cityid="cityMessage.cityid" v-if="carInfo&&isHideMask" :current-index='this.currentIndex' @changeMask="handleHideMaskClick" :big-image="big_image_info.img_six" :price="price"></mip-xin-image> -->
  </div>
</template>

<script>
import base from '../../common/utils/base'
import { requestFun } from '../../common/utils/reqUtils'
import { clickPoint } from '../../common/utils/stastic.js'
import { getLocalStorage, getDomain } from '../../common/utils/utils.js'
const pid = '/pages/detail'
const pidReport = '/pages/report'
export default {
  props: {
    carid: {
      type: String,
      default: ''
    },
    cityMessage: {
      type: String,
      default: ''
    },
    carInfo: {
      type: String,
      default: ''
    },
    status: {
      type: Object,
      default: function () {

      }
    }
  },
  data () {
    return {
      big_image_info: [],
      currentIndex: 1,
      isHideMask: false,
      totalLenght: [],
      price: 0,
      urlReport: ''
    }
  },
  watch: {
    isHideMask (newVal) {
      this.$emit('handleBigImg', newVal)
    }
  },
  created () {
    base.setMediaBase()
  },
  mounted () {
    let that = this
    requestFun('/ajax/car/big_image', {
      method: 'POST',
      param: { carid: this.carid, cityid: JSON.parse(this.cityMessage).cityid }
    })
      .then(res => {
        if (res.img_six) {
          that.big_image_info = res
          that.totalLenght = res.img_six
          that.price = res.price
          // 有视频时需要第一张要多出来显示
          if (that.big_image_info.is_video === 1) {
            that.big_image_info.img_six.unshift(that.big_image_info.img_six[0])
            let opurl = getLocalStorage('locationUrl')
            this.urlReport = `${getDomain()}/report_${this.carid}.html${opurl}`
          }
          // setLocalStorage('carImgInfo', JSON.stringify(res))
        }
      })
      .catch(err => {
        console.log(err)
      })
    this.carInfo && (this.carInfo = JSON.parse(this.carInfo))
  },
  methods: {
    changeCurrentNum (currentIndex) {
      this.currentIndex = currentIndex.detail[0]
    },
    handleHideMaskClick (e) {
      this.isHideMask = e.detail[0]
    },
    handleShowMaskClick (index) {
      if (this.status === 1) {
        // this.isHideMask = true
        let opurl = getLocalStorage('locationUrl')
          ? getLocalStorage('locationUrl') + encodeURIComponent('&')
          : encodeURIComponent('?')
        let currentIndex = encodeURIComponent(`currentIndex=${this.currentIndex}`)
        let carid = encodeURIComponent(`&carid=${this.carid}`)
        MIP.viewer.open(
          `${getDomain()}/car/big_image.html${opurl}${currentIndex}${carid}`,
          {
            isMipLink: true
          }
        )
        if (index === 1) {
          clickPoint(
            'examine_video_detail',
            {
              carid: this.carid
            },
            null,
            {
              pid: pid
            }
          )
        }
      }
    },
    handlePlayVideo () {
      if (this.big_image_info.is_video === 1 && this.status === 1) {
        let ev = 'video_examine'
        clickPoint(
          ev,
          {
            carid: this.carid,
            operation: 1
          },
          null,
          {
            pid: pidReport
          }
        )
        // MIP.viewer.open(this.urlReport, {
        //   isMipLink: true
        // })
      } else {
        clickPoint(
          'examine_video_detail',
          {
            carid: this.carid
          },
          null,
          {
            pid: pid
          }
        )
        this.handleShowMaskClick()
      }
    }
  }
}
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
</style>
