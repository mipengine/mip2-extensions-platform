<template>
  <div class="com-home-operatorhub-container">
    <div class="title">回收工具</div>
    <div class="operator-wrapper">
      <a
        :href="[baseUrl+'/account/login']"
        class="operator-item">
        <span class="iconfont icon-gerenzhongxin" />
        <p>个人中心</p>
      </a>
      <a
        :href="[baseUrl+'/order']"
        class="operator-item">
        <span class="iconfont icon-huishouliucheng1" />
        <p>回收订单</p>
      </a>
      <a
        :href="[baseUrl+'/product']"
        class="operator-item">
        <span class="iconfont icon-shebeigujia" />
        <p>免费估价</p>
      </a>
      <a
        :href="[baseUrl+'/help/commonquestion']"
        class="operator-item">
        <span class="iconfont icon-changjianwenti1" />
        <p>帮助中心</p>
      </a>
    </div>
  </div>
</template>
<script>
import config from '../../config.js'
const baseUrl = config[config.env]['baseUrl'] // 获取当前环境下的baseUrl
export default {
  data: () => ({
    baseUrl
  })
}
</script>
<style lang="less" scoped>
@import "../../styles/index.less";
.com-home-operatorhub-container {
  padding: 0.1rem 0.16rem 0.15rem;
  background-color: #fff;
  .title {
    text-align: center;
    .set-font-color(0.16rem,#4f4f4f,bold);
  }
  .operator-wrapper {
    margin-top: 0.19rem;
    display: flex;
    justify-content: space-between;
    .operator-item {
      text-align: center;
      p {
          margin-top: 0.04rem;
        .set-font-color(0.14rem,#333);
      }
      .iconfont {
        .set-font-color(0.22rem,#333);
      }
    }
  }
}
</style>
