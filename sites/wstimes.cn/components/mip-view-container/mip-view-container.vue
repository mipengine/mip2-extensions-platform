<template>
  <div class="view">
    <!-- 文字 -->
    <div class="view-text" 
          v-if="type == 'text'">
      <a 
          :href="data.href" 
          class="adv-text dan">{{data.text}}</a>
    </div>
    <!-- 图片 -->
    <div 
          class="view-img" 
          v-if="type == 'image'">
      <a 
        :href="data.href">
        <mip-img
          class="img"
          :src="data.src"
          :style="{width:(size[0] / 375) * 100+'vw',height:(size[1] / 375) * 100+'vw'}"
        ></mip-img>
      </a>
    </div>
    <!-- 轮播图 -->
    <div class="view-carousel" 
          v-if="type == 'carousel'">
      <mip-carousel
        layout="responsive"
        autoplay
        defer="6000"
        indicatorId="mip-carousel-dot"
        :width="(size[0] / 375) * 100+'vw'"
        :height="(size[1] / 375) * 100+'vw'"
      >
        <a 
          v-for="(item, index) in data.list" 
          :key="index" 
          :href="item.href">
          <mip-img 
            class="img" 
            :src="item.src"></mip-img>
        </a>
      </mip-carousel>
      <div class="mip-carousel-indicator-wrapper">
        <div class="mip-carousel-indicatorDot" id="mip-carousel-dot">
          <div 
          v-for="(item, index) in data.list" 
          :key="index"  
          class="mip-carousel-indecator-item"></div>
        </div>
      </div>
    </div>
    <!-- 图文 -->
    <div 
      class="view-graphic" 
      v-if="type == 'graphic'">
      <a 
        :href="data.href" 
        class="item">
        <div class="info">
          <h3 class="info-title shuang">{{data.title}}</h3>
          <div class="info-about">
            <span>{{data.date}}</span>
            <span>阅读({{data.total}}+)</span>
          </div>
        </div>
        <mip-img 
          class="img" 
          :src="data.src"></mip-img>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    //   类型
    type: {
      type: String,
      default: ""
    },
    //   数据
    data: {
      type: Object,
      default: {}
    },
    //   大小
    size: {
      type: Array,
      default: []
    }
  },
  data() {
    return {};
  },
  updated() {},
  mounted() {},
  methods: {}
};
</script>
<style lang="less" scoped>
.view {
  width: 100%;
  height: 100%;
}
.view-text a {
  color: #333;
  text-decoration: underline;
  font-size: (14 / 375) * 100vw;
}
.view-img {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.view-img a {
  width: 100%;
  height: 100%;
  display: block;
}
.view-img .img,
.view-img img {
  width: 100%;
  height: 100%;
  position: relative;
}
.view-img .img::after {
  content: "";
  width: (26 / 375) * 100vw;
  height: (12 / 375) * 100vw;
  background: url("../../static/adv-icon.png") no-repeat center/cover;
  position: absolute;
  bottom: (4 / 375) * 100vw;
  right: (6 / 375) * 100vw;
  opacity: 0.7;
}

.view-carousel {
  position: relative;
}

.view-carousel::after {
  content: "";
  width: (26 / 375) * 100vw;
  height: (12 / 375) * 100vw;
  background: url("../../static/adv-icon.png") no-repeat center/cover;
  position: absolute;
  bottom: (4 / 375) * 100vw;
  right: (6 / 375) * 100vw;
  opacity: 0.7;
}

.view-carousel .mip-carousel-indicator-wrapper {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
}

.view-carousel .mip-carousel-indicator-wrapper .mip-carousel-indecator-item {
  width: (6 / 375) * 100vw;
  height: (6 / 375) * 100vw;
  background: rgba(238, 238, 238, 1);
  border-radius: (3 / 375) * 100vw;
  opacity: 0.5;
}

.view-carousel .mip-carousel-indicator-wrapper .mip-carousel-activeitem {
  width: (18 / 375) * 100vw;
  height: (6 / 375) * 100vw;
  background: rgba(255, 255, 255, 1) !important;
  opacity: 1;
}

.view-graphic .item {
  padding: (16 / 375) * 100vw;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #f6f6f6;
}

.view-graphic .item .info {
  flex: 1;
  overflow: hidden;
  margin-right: (8 / 375) * 100vw;
}

.view-graphic .item .info .info-title {
  font-size: (16 / 375) * 100vw;
  color: rgba(51, 51, 51, 1);
  line-height: (22 / 375) * 100vw;
  margin-bottom: (10 / 375) * 100vw;
  height: (44 / 375) * 100vw;
}

.view-graphic .item .info .info-about {
  font-size: (12 / 375) * 100vw;
  color: rgba(153, 153, 153, 1);
  line-height: (17 / 375) * 100vw;
}

.view-graphic .item .info .info-about span:first-child {
  margin-right: (18 / 375) * 100vw;
}

.view-graphic .item .img {
  width: (120 / 375) * 100vw;
  height: (80 / 375) * 100vw;
  position: relative;
}
.view-graphic .item .img::after {
  content: "";
  width: (26 / 375) * 100vw;
  height: (12 / 375) * 100vw;
  background: url("../../static/adv-icon.png") no-repeat center/cover;
  position: absolute;
  bottom: (4 / 375) * 100vw;
  right: (6 / 375) * 100vw;
  opacity: 0.7;
}
</style>