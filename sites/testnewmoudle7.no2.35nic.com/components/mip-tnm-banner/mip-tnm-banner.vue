<template>
  <div class="banner_box">
    <div
      v-if="banner_list.length<=1"
      class="bimg" >
      <mip-img
        :src="img"
        :height="bheight"/>
    </div>
    <div v-else>
      <mip-carousel
        :width="bwidth"
        :height="bheight"
        autoplay
        defer="5000"
        layout="responsive"
        indicator-id="mip-carousel-example">
        <div
          v-for="item in banner_list"
          :key="item.infoId"
          class="bimg">
          <mip-img
            :src="item.wapAdsImage"
          />
        </div>
      </mip-carousel>
      <div class="mip-carousel-indicator-wrapper">
        <div
          id="mip-carousel-example"
          class="mip-carousel-indicatorDot">
          <div class="mip-carousel-activeitem mip-carousel-indecator-item"/>
          <div class="mip-carousel-indecator-item"/>
          <div class="mip-carousel-indecator-item"/>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
<script>
export default {
  props: {
    bwidth: {
      type: String,
      default: ''
    },
    bheight: {
      type: String,
      default: ''
    },
    src: {
      type: String,
      default () {
        return ''
      }
    }
  },
  data () {
    return {
      banner_list: [],
      img: ''
    }
  },
  mounted () {
    fetch(this.src).then(response => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error('banner went wrong!')
      }
    }).then(bannerinfos => {
      if (bannerinfos.data.items.length === 1) this.img = bannerinfos.data.items[0].wapAdsImage
      this.banner_list = bannerinfos.data.items
    })
  }
}
</script>
