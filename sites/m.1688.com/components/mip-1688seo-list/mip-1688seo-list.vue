<template>
  <div class="search-list">
    <div class="title_warp aaa">
      共<span>{{ totalCount }}</span>件<h1>{{ keyword }}</h1>相关产品
    </div>
    <div class="list_column">
      <div
        v-for="offer in list"
        :key="offer.id"
        class="list_group-item">
        <a
          :href="offer.detailUrl"
          class="item-link">
          <div class="item-image">
            <mip-img
              :src="offer.picUrl+'_270x270xzq60.jpg'"
              :alt="offer.pureSubject"
              class="img_block"
              width="110"
              height="110" />
          </div>
          <div class="item-info">
            <div class="item-info_title">
              <span v-html="offer.subject">{{ offer.subject }}</span>
            </div>
            <div class="item-info_count">
              <div class="count_price">
                <i>￥</i>{{ offer.price }}
              </div>
            </div>
          </div>
        </a>
      </div>
    </div>
    <nav class="ac t-nav-page">
      <div>
        <a
          id="nextA"
          href="javascript:;"
          class="pagination"
          rel="nofollow">
          <div
            id="nextBtn"
            class="btn on"
            @click="next">下一页</div>
          <span>共{{ totalPage }}</span>页
        </a>
      </div>
    </nav>
  </div>
</template>
<style scoped lang="less">
</style>
<script>
import './mip-1688seo-list.less'
export default {
  props: {
    list: {
      type: Array,
      required: true
    },
    totalPage: {
      type: Number,
      required: true
    },
    canonicalUrl: {
      type: String,
      required: true
    },
    keyword: {
      type: String,
      required: true
    },
    totalCount: {
      type: Number,
      required: true
    }
  },
  data () {
    return {}
  },
  mounted () {},
  methods: {
    next () {
      let pageIndex = 2
      let _href = this.canonicalUrl || ''
      if (_href.indexOf('?') !== -1) {
        window.location.href = _href + '&beginPage=' + pageIndex
      } else {
        window.location.href = _href + '?beginPage=' + pageIndex
      }
    }
  }
}
</script>
