<template>
  <div class="search-bar">
    <div class="main-title">
      <div class="main-title_bg">
        <mip-img
          class="img_block"
          width="375"
          height="44"
          layout="responsive"
          src="//gw.alicdn.com/tfs/TB1unLRyY9YBuNjy0FgXXcxcXXa-2250-267.png"
          alt="1688" />
      </div>
      <a
        class="main-title_link"
        href="//m.1688.com"/>
      <a
        class="main-title_app"
        href="javascript:"
        @click="goToApp"/>
    </div>
    <div class="main-block">
      <div class="bar_back"/>
      <div class="bar_search">
        <a
          class="bar_search-btn"
          href="//m.1688.com/search.html?fromMode=qingqu">
          <i class="icon search bar_search-icon_search"><mip-img
            class="img_block"
            width="17"
            height="17"
            src="data:image/png;base64,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" /></i>
          <span class="bar_search-btn_text">{{ keyword }}</span>
        </a>
      </div>
    </div>
    <div
      id="pageModel"
      class="search-modal"/>
  </div>
</template>
<style scoped lang="less">
</style>
<script>

import './mip-1688seo-header.less'
import appJump from './jump/index'

export default {
  props: {
    keyword: {
      type: String,
      required: true
    }
  },
  data () {
  },
  mounted () {
  },
  methods: {
    clearInput () {
      this.keyword = '请输入关键词'
    },
    goToApp () {
      const targetUrl = ''
      appJump(targetUrl)
    }
  }
}
</script>
