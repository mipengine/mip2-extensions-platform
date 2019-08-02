<template>
  <div
    v-if="pagesize!==0"
    class="paging">
    <div class="left">
      <span
        v-if="page!==1"
        class="page-link prev"
        @click="_selectPage(page-1)"/>
      <span
        v-if="page!==1"
        class="page-link"
        @click="_selectPage(1)">1</span>
      <span
        class="cur"
        v-text="page"/>
      <span
        v-if="page!==pagesize&&page+2!==pagesize&&page+1!==pagesize">...</span>
      <span
        v-if="page+2===pagesize"
        class="page-link"
        @click="_selectPage(page+1)"
        v-text="page+1"/>
      <span
        v-if="page!==pagesize"
        class="page-link"
        @click="_selectPage(pagesize)"
        v-text="pagesize"/>
      <span
        v-if="page!==pagesize"
        class="page-link next"
        @click="_selectPage(page+1)"/>
    </div>
    <div class="right">
      <span>跳至</span>
      <div class="pgselect-box">
        <input
          :value="page+1"
          type="number"
          @keyup.enter="_input">
      </div>
    </div>
  </div>
</template>

<script>
import './index.less'
export default{
  props: {
    page: {
      type: Number,
      default: 1
    },
    pagesize: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {

    }
  },
  created () {

  },
  mounted () {

  },
  updated () {

  },
  methods: {
    _selectPage (pg) {
      this.page = pg
      // 触发翻页
      this.$emit('paging', pg)
    },
    _input (e) {
      let pg = e.target.value
      if (pg !== '' && pg <= this.pagesize) {
        this._selectPage(Number(pg))
      }
    }
  }
}
</script>
