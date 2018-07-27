<template>
  <div class="comp-home-header-container">
    <a
      :href="[baseUrl + '/product/search']"
      class="top-search">
      <span class="iconfont icon-sousuo">&nbsp;</span>
      <span class="text">点击搜索您要评估的型号</span>
    </a>
    <template v-if="bannerLength">
      <mip-carousel
        autoplay
        layout="responsive"
        width="750"
        height="360">
        <mip-img
          v-for="img in bannerList"
          :key="img.id"
          :src="img.file_url"
          layout="responsive">&nbsp;</mip-img>
      </mip-carousel>
    </template>
  </div>
</template>
<script>
import Request from '../../common/request.js'
import config from '../../config.js'
const baseUrl = config[config.env]['baseUrl'] // 获取当前环境下的baseUrl
export default {
  data: () => ({
    bannerList: [],
    baseUrl
  }),
  computed: {
    bannerLength () {
      return this.bannerList.length
    }
  },
  async mounted () {
    const opts = {
      url: 'https://neon.aihuishou.com/v1/current_app/banners/home_top'
    }
    let res = null
    try {
      res = await Request(opts)
    } catch (e) {
      console.warn(e)
      return false
    }
    this.bannerList = res.images
  }
}
</script>
<style lang="less" scoped>
@import (reference) "../../styles/index.less";
.comp-home-header-container {
  position: relative;
  background: #f8f8f8;
  .top-search {
    z-index: 1;
    position: absolute;
    top: 0.09rem;
    left: 0.15rem;
    right: 0.15rem;
    line-height: 0.32rem;
    .set-font-color(0.15rem,#b2b2b2);
    background-color: #fff;
    border-radius: 0.04rem;
    .iconfont {
      margin: 0 0.1rem;
    }
  }
}
</style>
