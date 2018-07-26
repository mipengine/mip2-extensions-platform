<template>
  <div class="comp-home-salebtn-container">
    <a
      :href="[baseUrl+'/product']"
      class="sale-btn">
      {{ text }}
    </a>
  </div>
</template>
<script>
import config from '../../config.js'
const baseUrl = config[config.env]['baseUrl'] // 获取当前环境下的baseUrl
export default {
  data: () => ({
    text: '免费估价',
    baseUrl
  })
}
</script>
<style lang="less" scoped>
@import (reference) "../../styles/index.less";
.comp-home-salebtn-container {
  background-color: #fff;
  padding: 0.12rem 0.15rem;
  box-sizing: border-box;
  .sale-btn {
    display: block;
    background-color: @main-color;
    border-radius: 4px;
    line-height: 0.44rem;
    text-align: center;
    .set-font-color(0.16rem,#333);
    font-weight: normal;
  }
}
</style>
