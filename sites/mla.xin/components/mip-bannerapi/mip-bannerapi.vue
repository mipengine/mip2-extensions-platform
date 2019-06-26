<template>
  <div class="banner_box">
    <div v-if="bannerList.length<=1">
      <mip-img
        :src="img"
        class="banner"/>
    </div>
    <div v-else>
      <mip-carousel
      autoplay
      :defer="de"
      layout="responsive" :width="bw" :height="bh" indicator indicatorId="mip-carousel-yd">
        <a data-type="mip" :href="bannerItem.redirecturl" :key="bannerItem.id" v-for="bannerItem in bannerList">
            <mip-img :src="bannerItem.litpic" alt="">
            </mip-img>
        </a>
      </mip-carousel>
      <div class="mip-carousel-indicator-wrapper">
          <div class="mip-carousel-indicatorDot" id="mip-carousel-yd">
              <div :class="index==0?'mip-carousel-activeitem mip-carousel-indecator-item' : 'mip-carousel-indecator-item'" :key="bannerItem.id" v-for="(bannerItem,index) in bannerList">
              </div>
          </div>
      </div>
    </div>
  </div>  
</template>
<script>
export default {
  props: {
    url: {
      type: String,
    },
    bwidth:{
      type: String
    },
    bheight:{
      type: String
    },
    defer:{
      type: String
    },
  },
  data () {
    return {
      bw:'',
      bh:'',
      de:'',
      bannerList:[]
    }
  },
  created() {
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
      me.bannerList=JSON.parse(data)
    })
  }
}
</script>