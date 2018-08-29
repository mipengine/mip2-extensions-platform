<template>
  <div class="search-list">
    <div
      id="list-main"
      class="list_column"
      data-spm="1998744630">
      <template v-for="(offer,index) in offers">
        <template v-if="index==4">
          <div
            :key="index"
            class="hot_keyword_wap">
            <h1 class="key_suggest">{{ keyword }}</h1>
            <p class="mt10 suggest_txt">
              阿里巴巴为您推荐
              <span class="col_orage">
                <template v-for="(keyItem,index) in topCrosslinkList">
                  <em
                    :key="index"
                    class="suggest_keyword">{{ keyItem.name }}</em>
                  <template v-if="index!=topCrosslinkList.length-1">
                    、
                  </template>
                </template>
              </span>
              同款货源、相似款货源
            </p>
          </div>
        </template>
        <div
          :key="offer.id"
          class="item list_column">
          <div class="list_group-item">
            <a
              :href="offer.taobaoItem.detailUrl"
              class="item-link">
              <div class="item-image">
                <mip-img
                  :data-src="offer.taobaoItem.imageUrl"
                  :alt="offer.taobaoItem.title"
                  :src="offer.taobaoItem.imageUrl"
                  class="image_src loaded"
                  data-was-processed="true" />
                <span
                  v-if="offer.taobaoItem.sellerType=='taobao'"
                  class="item-image_tag">淘宝</span>
                <span
                  v-else
                  class="item-image_tag">天猫</span>
              </div>
              <div class="item-info">
                <div class="item-info_title">
                  <p v-html="offer.taobaoItem.highlightTitle" />
                </div>
                <div class="item-info_count">
                  <div class="count_price">
                    <span class="mr10 lsj">零售价</span><em>￥</em><span class="price">{{ offer.taobaoItem.price }}</span>
                  </div>
                  <div class="count_vol">成交{{ offer.taobaoItem.dealCount }}笔</div>
                </div>
              </div>
              <div class="simple_position">
                <span class="sp">1688</span><span class="sp1">相似热销货源</span>
              </div>
            </a>
            <div class="simple_warp">
              <template v-for="(item,index) in offer.sameItemList">
                <a
                  v-if="index<=4"
                  :href="item.detailUrl"
                  :key="index">
                  <div class="simple_item">
                    <mip-img
                      :src="item.picUrl"
                      :alt="item.pureSubject"
                      width=""
                      height="" />
                    <div class="bg_whilte_opcity"/>
                    <div class="price_flag">
                      ¥ {{ item.price }}
                    </div>
                  </div>
                </a>
              </template>
              <template v-if="offer.sameItemList.length ===2">
                <a>
                  <div class="simple_item"/>
                </a>
                <a>
                  <div class="simple_item"/>
                </a>
              </template>
              <template v-if="offer.sameItemList.length == 3">
                <a>
                  <div class="simple_item"/>
                </a>
              </template>
            </div>
          </div>
        </div>
      </template>
    </div>
    <div>
      <div class="suggest">
        <p class="suggest_txt">
          阿里巴巴为您推荐{{ keyword }}产品的详细参数、实时报价、价格行情、优质批发/供应等信息。您还可以找
          <template v-for="(keyItem,index) in topCrosslinkList">
            <em
              :key="index"
              class="suggest_keyword"
              @click="go">{{ keyItem.name }}</em>
            <template v-if="index!=topCrosslinkList.length-1">
              、
            </template>
          </template>
          等产品信息。</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
</style>

<script>

import './mip-1688seo-list-huo.less'
export default {
  props: {
    offers: {
      type: Array,
      required: true
    },
    topCrosslinkList: {
      type: Array,
      required: true
    },
    keyword: {
      type: String,
      required: true
    }
  },
  data () {
    return {}
  },
  mounted () {
    //  let element = this.$element
    //  element.on('click', '.suggest_keyword', function (e) {
    //   //
    //   const search = $(e.currentTarget).text();
    //   if (search) {
    //       window.location.href = "https://m.1688.com/huo/.htm?keyword=" + encodeURIComponent(search);
    //   }
    // });
  },
  methods: {
    go: (e) => {
      const search = e.target.innerText
      if (search) {
        window.location.href = 'https://m.1688.com/huo/.htm?keyword=' + encodeURIComponent(search)
      }
    }
  }
}
</script>
