<template>
  <div class="panel author-panel">
    <div class="author-body">
      <mip-img
        v-if="item.img!==''"
        :src="item.img"
        layout="fixed-height"
        height="120"/>
      <div class="author-inner">
        <div class="author-name">
          <a
            :href="'https://mip.gushici.com/a_'+item.id+'.html'"
            mip-link>{{ item.name }}</a>
        </div>
        <div
          class="author-desc"
          v-html="item.intro"/>
      </div>
    </div>
    <div class="author-foot">
      <a
        :href="'https://mip.gushici.com/a_'+item.id+'.html'"
        mip-link>共 {{ item.num }} 篇诗文></a>
    </div>
  </div>
</template>

<script>
import './index.less'
export default{
  props: {
    item: {
      type: Object,
      default: function () {
        return {}
      }
    },
    index: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {

    }
  },
  methods: {

  }
}
</script>
