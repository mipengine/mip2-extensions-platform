<template>
  <div class="tagbox">
    <a 
      v-for="(item, i) in arr"
      :key="i"
      :href="'https://mip.gushici.com/p_t_'+item.id+'.html'"
      mip-link>
        <span v-text="item.name"></span>
      </a>
  </div>
</template>

<script>
import './index.less'
import ajax from '../../common/ajax.js'
export default{
  props:{
    url:{
      type: String,
      default:''
    }
  },
  data(){
    return{
      arr:[]
    }
  },
  created(){
    this.init()
  },
  mounted(){

  },
  methods:{
    init(){
      let t = this
      ajax.get(this.url,{},function(res) {
        t.arr = res.list        
      })
    }
  }
}
</script>