<template>
  <div>
    <div
      v-if="isload"
      class="panel doc-panel">
      <div class="load-box"><div class="loading"/></div>
    </div>
    <div
      v-if="typeof part.title!='undefined'&&part.arr.length>0"
      :class="isopen?'open':''"
      class="panel doc-panel">
      <div
        v-if="part.hasmore"
        class="more"
        @click="_more">展开阅读全文<i/></div>
      <div
        :class="isopen?'':'box-mask'"
        class="doc-box">
        <div
          class="doc-title"
          v-text="part.title"/>
        <div
          v-for="(item, index) in part.arr"
          :key="index">
          <p
            v-if="typeof item.sub!='undefined'"
            class="doc-sub"
            v-text="item.sub"/>
          <p
            v-for="(d, i) in item.arr"
            :key="i"
            v-html="d"/>
        </div>
        <i
          v-if="part.hasmore"
          v-show="isopen"
          class="close"
          @click="_more"/>
        <div
          v-if="part.tip!=''"
          class="doc-tip"
          v-html="part.tip"/>
      </div>
    </div>
  </div>

</template>

<script>
import './index.less'
export default{
  props: {
    part: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data () {
    return {
      isload: true,
      isopen: false
    }
  },
  created () {

  },
  mounted () {
    this.isload = false
  },
  updated () {

  },
  methods: {
    _more () {
      this.isopen = !this.isopen
    }
  }
}
</script>
