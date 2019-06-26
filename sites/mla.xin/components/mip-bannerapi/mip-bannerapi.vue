<template>
  <div class="banner_box">
    <div v-if="bannerList.length<=1">
      <mip-img
        :src="img"
        class="banner"/>
    </div>
    <div v-else>
      <mip-carousel
        :defer="de"
        :width="bw"
        :height="bh"
        autoplay
        indicator
        buttonController
        layout="responsive">
        <a
          v-for="bannerItem in bannerList"
          :href="bannerItem.redirecturl"
          :key="bannerItem.id"
          data-type="mip">
          <mip-img :src="bannerItem.litpic"/>
        </a>
      </mip-carousel>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    url: {
      type: String,
      default: '#'
    },
    bwidth: {
      type: String,
      default: '1920'
    },
    bheight: {
      type: String,
      default: '450'
    },
    defer: {
      type: String,
      default: '3000'
    }
  },
  data () {
    return {
      bw: '',
      bh: '',
      de: '',
      bannerList: []
    }
  },
  created () {
    let me = this
    me.bw = me.bwidth
    me.bh = me.bheight
    me.de = me.defer
    window.fetchJsonp(me.url, {
      jsonpCallback: 'callback',
      jsonpCallbackFunction: 'yd'
    }).then(function (res) {
      return res.json()
    }).then(function (data) {
      // 渲染逻辑,直接进行数据赋值就可以了
      me.bannerList = JSON.parse(data)
    })
  }
}
</script>
