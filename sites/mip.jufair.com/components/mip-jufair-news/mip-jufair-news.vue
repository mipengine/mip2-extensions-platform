<template>
  <div class="mip-jufair-news-wrapper">
    <div class="mip-news-box">
      <div class="mip-news-logo">
        聚展<br>头条
      </div>
      <div
        ref="Tnews"
        class="mip-news-list">
        <div
          v-for="item in informationhot"
          :key="item.id"
          class="mip-news-item">
          <div class="mip-news-title">{{ item.title }}</div>
          <mip-img
            :src="item.coverMap"
            class="mip-news-cover"
            layout="responsive"
            width="50"
            height="46"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less">
@scale: 375/10;

/* 聚展头条 */
.mip-news-box {
  margin: 10px 12px;
  background: #fff;
  border-radius: 10px;
  padding: 8px 0;
  display: flex;
  justify-content: space-between;
}
.mip-news-logo {
  /* width: 1.6rem; */
  font-family: \\4eff\5b8b;
  text-align: center;
  font-size: 0.453rem;
  font-weight: bolder;
  line-height: 1.2em;
  color: #fb423c;
  flex: 1;
}
.mip-news-list {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  flex: 5;
  box-sizing: border-box;
  height: 43rem / @scale;
  overflow: hidden;
}
.mip-news-item {
  display: flex;
}
.mip-news-title {
  flex: 5;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  font-size: 14rem / @scale;
}
.mip-news-cover {
  flex: 1;
  margin: 0 10px;
}
</style>

<script>
import * as $ from 'jquery'
export default {
  props: {
    informationhot: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data () {
    return {}
  },
  created () {
    console.log(this.informationhot)
  },
  mounted () {
    // console.log(this.informationhot)

    /* 底部滚动图 */
    setInterval(() => {
      let firstNode = $(this.$refs.Tnews)[0].firstChild
      $(this.$refs.Tnews)
        .stop(true)
        .animate({ marginTop: '-1.573rem' }, 500, () => {
          $(this.$refs.Tnews).css({ marginTop: '0px' })
          $(this.$refs.Tnews).append(firstNode)
        })
    }, 3000)
  },
  methods: {}
}
</script>
