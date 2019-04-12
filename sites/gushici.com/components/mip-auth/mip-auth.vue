<template>
  <div class="wrapper" v-if="!item.ishide">
    <div class="panel author-panel" v-if="typeof item.id=='undefined'">
      <div class="load-box"><div class="loading"></div></div>
    </div>
    <div class="panel author-panel" v-else> 
      <div class="author-body">
        <mip-img
          v-if="item.img!=''"
          layout="fixed-height"
          height="120"
          :src="item.img"></mip-img>
        <div class="author-inner">
          <div class="author-name"
            v-if="typeof item.title!='undefined'">
            <a 
              :href="'https://mip.gushici.com/a_'+item.id+'.html'" 
              mip-link>{{item.title}}{{item.name}}介绍</a>
          </div>
          <div class="author-name" v-else v-text="item.name"></div>
          <div class="author-desc" v-html="item.intro"></div>
        </div>
      </div>
      <div v-if="key==''" class="author-foot">
        <a :href="'https://mip.gushici.com/a_'+item.id+'.html'" mip-link>查看详情</a>
      </div>
    </div>
  </div>
</template>

<script>
import './index.less'
import ajax from '../../common/ajax.js'
export default{
  props:{
    item:{
      type: Object,
      default:{}
    },
    key:{
      type: String,
      default:''
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

  }
}
</script>