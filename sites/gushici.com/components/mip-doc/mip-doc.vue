<template>
  <div>
    <div class="panel doc-panel" v-if="isload">
      <div class="load-box"><div class="loading"></div></div>
    </div>
    <div 
      class="panel doc-panel" 
      :class="isopen?'open':''"
      v-if="typeof part.title!='undefined'&&part.arr.length>0">     
      <div class="more" v-if="part.hasmore" @click="_more">展开阅读全文<i></i></div>
      <div class="doc-box" :class="isopen?'':'box-mask'">
        <div class="doc-title" v-text="part.title"></div>
        <div
          v-for="(item, index) in part.arr"
          :key="index">
          <p class="doc-sub" v-if="typeof item.sub!='undefined'" v-text="item.sub"></p>
          <p
            v-for="(d, i) in item.arr"
            :key="i"
            v-html="d"></p>
        </div>
        <i v-if="part.hasmore" v-show="isopen" class="close" @click="_more"></i>
        <div class="doc-tip" v-if="part.tip!=''" v-html="part.tip"></div>
      </div>
    </div>
  </div>
  
</template>

<script>
import './index.less'
import ajax from '../../common/ajax.js'
export default{
  props:{
    part:{
      type: Object,
      default:{}
    }
  },
  data(){
    return{
      isload:true,
      isopen:false
    }
  },
  created(){

  },
  mounted(){
    this.isload = false
  },
  updated(){
    
  },
  methods:{
    _more(){
      this.isopen = !this.isopen
    }
  }
}
</script>