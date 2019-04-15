<template>
  <div class="tab-head">
    <span
      v-for="(item, index) in tabs"
      :key="index"
      :class="{cur:item.iscur}"
      class="tab-item"
      @click="_tab(index,item.id)"
      v-text="item.title"/>
  </div>
</template>

<script>
import './index.less'
export default{
  props: {
    tabs: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data () {
    return {

    }
  },
  methods: {
    _tab (ind, id) {
      let tabs = this.tabs
      for (let i = 0; i < tabs.length; i++) {
        tabs[i].iscur = false
      }
      this.tabs[ind].iscur = true
      MIP.viewer.page.scrollToHash('#tab' + id)
    }
  }
}
</script>
