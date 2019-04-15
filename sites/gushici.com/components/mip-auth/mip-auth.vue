<template>
  <div
    v-if="!item.ishide"
    class="wrapper">
    <div
      v-if="typeof item.id==='undefined'"
      class="panel author-panel">
      <div class="load-box"><div class="loading"/></div>
    </div>
    <div
      v-else
      class="panel author-panel">
      <div class="author-body">
        <mip-img
          v-if="item.img!==''"
          :src="item.img"
          layout="fixed-height"
          height="120"/>
        <div class="author-inner">
          <div
            v-if="typeof item.title!=='undefined'"
            class="author-name">
            <a
              :href="'https://mip.gushici.com/a_'+item.id+'.html'"
              mip-link>{{ item.title }}{{ item.name }}介绍</a>
          </div>
          <div
            v-else
            class="author-name"
            v-text="item.name"/>
          <div
            class="author-desc"
            v-html="item.intro"/>
        </div>
      </div>
      <div
        v-if="key===''"
        class="author-foot">
        <a
          :href="'https://mip.gushici.com/a_'+item.id+'.html'"
          mip-link>查看详情</a>
      </div>
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
    key: {
      type: String,
      default: ''
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
