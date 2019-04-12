<template>
  <div class="tab-head">
    <span 
    v-for="(item, index) in tabs"
    :key="index"
    class="tab-item" 
    :class="{cur:item.iscur}" 
    v-text="item.title"
    @click="_tab(index,item.id)"></span>
  </div>
</template>

<script>
import './index.less'
import ajax from '../../common/ajax.js'
export default{
  props:{
    tabs:{
      type:Array,
      default:[]
    }
  },
  data(){
    return{

    }
  },
  methods:{
    _tab(ind,id){
      let tabs = this.tabs
      for(let i=0;i<tabs.length;i++){
        tabs[i].iscur=false
      }
      this.tabs[ind].iscur = true
      MIP.viewer.page.scrollToHash('#tab'+id)
    }
  }
}
</script>