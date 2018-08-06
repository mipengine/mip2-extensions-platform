<template>
  <div class="headerBox">
    <div class="search-content">
      <input
        v-model="keyword"
        type="text"
        placeholder="请输入企业关键词">
      <span
        class="search-btn"
        @click="search()"/>
    </div>
  </div>
</template>

<style lang="less" scoped>
 .headerBox{
     width: 100%;
     padding-top: 10px;
     padding-bottom: 10px;
     background:#4F89F5;
     .search-content{
       width: 280px;
       height: 30px;
       background: #ffffff;
       margin: 0 auto;
       border-radius: 4px;
       padding:0 4px;
       input{
         padding-left:10px;
         width: 235px;
         height: 30px;
         outline: none;
         float: left;
         border: 0;
       }
       .search-btn{
         display: inline-block;
         float: right;
         height: 30px;
         width: 30px;
         background: url('/static/image/indexsearch.png') no-repeat center;
         background-size: 60% 60%;
       }
     }
 }
</style>

<script>
let util = MIP.util
let CustomStorage = util.customStorage
let storage = new CustomStorage(0)
export default {
  data () {
    return {
      keyword: ''
    }
  },
  mounted () {
    this.initHeader()
    this.search()
  },
  methods: {
    /**
         * 初始化组件
         *
         */
    initHeader () {
      this.keyword = storage.get('keyword') ? storage.get('keyword') : this.keyword
    },
    /**
         * 把搜索数据存入缓存，触发搜索方法
         *
         */
    search () {
      storage.set('keyword', this.keyword)
      console.log(this.keyword)
      this.$emit('search')
    }
  }
}
</script>
