<template>
  <div class="sentence-list">
    <div class="load-box" v-if="arr.length==0&&!isempty"><div class="loading"></div></div>
    <div v-else-if="isempty" class="panel">
      <div class="nodata"> 
        <p>抱歉，暂无收录数据</p> 
      </div>
    </div>
    <div 
      class="panel" 
      v-else>
      <ul>
        <mip-sentence-item
          v-for="(item, index) in arr"
          :key="item.id"
          :item="item"
          :index="index"
          v-on:filter="_childfilter" />
      </ul>
    </div>
  </div>
</template>

<script>
import './index.less'
import MipSentenceItem from './mip-sentences-item'
import ajax from '../../common/ajax.js'
export default{
  components:{
    MipSentenceItem
  },
  props:{
    page:{
      type: Number,
      default: 1
    },
    url:{
      type: String,
      default: ''
    }
  },
  data(){
    return {
      arr:[],
      pagesize:0,
      paging:[],
      query:{},
      isempty:false
    }
  },
  created(){
    // 无携带ID的情况 直接获取
    if(location.pathname.indexOf('_')==-1){
      this._getlist(this.url,this.page)
    }
  },
  mounted(){
    let t = this;
    // 名句列表
    this.$on('paging',function(pg) {
      if(typeof pg=='undefined'){
        // 无指定页码，则再当前页码上加一
        t.page++
      }else{
        t.page = pg
      }
      MIP.setData({page:t.page})
      t._getlist(t.url,t.page)
      MIP.viewport.setScrollTop(0)
    })
    // 监听筛选组件 接口执行完成触发
    this.$on('filter',function(q) {
      t._filter(q)
    })
  },
  methods:{
    _filter(q){
      let t = this
      let query = {
        page:1
      }
      MIP.setData({page:1,pagesize:0})
      if(q.key=='themes'){
        query.theme = q.val
      }else if(q.key=='tags'){
        query.tag = q.val
      }else if(q.key=='poetry_type'){
        query.type = q.val
      }else{
        query[q.key]=q.val
      }
      t.query = query
      t._renderdata(t.url,query)
    },
    _getlist(url,pg){
      let t = this
      let query = this.query
      if(typeof pg!='undefined'){
        query.page = pg
      }
      t._renderdata(url,query)
    },
    _renderdata(url,query){
      let t = this
      t.arr=[]
      ajax.get(url,query,function(res) {
        if(res.page_max==0){
          t.isempty=true
        }else{
          t.arr = res.list
          MIP.setData({pagesize:res.page_max})
        }
      })
    },
    _paging(pg,max){

    },
    _change(e){
      let i = e.target.attributes['data-i'].value
      let v = e.target.attributes['data-v'].value
      this.arr[i]['is_'+v] = !this.arr[i]['is_'+v]
    }
  }
}
</script>