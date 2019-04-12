<template>
  <div class="paging" v-if="pagesize!=0">
    <div class="left">
      <span 
        class="page-link prev" 
        v-if="page!=1"
        @click="_selectPage(page-1)"></span>
      <span 
        v-if="page!=1"
        class="page-link" 
        @click="_selectPage(1)">1</span>
      <span class="cur" v-text="page"></span>
      <span
        v-if="page!=pagesize&&page+2!=pagesize&&page+1!=pagesize">...</span>
      <span 
        v-if="page+2==pagesize"
        class="page-link"
        v-text="page+1"
        @click="_selectPage(page+1)"></span>
      <span 
        v-if="page!=pagesize"
        class="page-link" 
        v-text="pagesize"
        @click="_selectPage(pagesize)"></span>
      <span 
        v-if="page!=pagesize"
        class="page-link next" 
        @click="_selectPage(page+1)"></span>
    </div>
    <div class="right">
      <span>跳至</span>
      <div class="pgselect-box">
        <input type="number" :value="page+1" @keyup.enter="_input"/>
      </div>
    </div>
  </div>
</template>

<script>
import './index.less'
import ajax from '../../common/ajax.js'
export default{
  props:{
    page:{
      type: Number,
      default: 1
    },
    pagesize:{
      type: Number,
      default: 0
    }
  },
  data(){
    return{

    }
  },
  created(){

  },
  mounted(){

  },
  updated(){

  },
  methods:{
    _selectPage(pg){
      this.page = pg
      // 触发翻页
      this.$emit('paging',pg)
    },
    _input(e){
      let pg = e.target.value
      if(pg!=''&&pg<=this.pagesize){
        this._selectPage(Number(pg))
      }
    }
  }
}
</script>