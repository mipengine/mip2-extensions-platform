<template>
  <div class = "chapter">
    <header id = "header">
      <div class="left">
        <a href="xiaoshuo.html">
          <i class="icon icon-left"/>
        </a>
      </div>
      <h4 class = "line-clamp1"> {{ novelName }} </h4>
    </header>
    <div class="container">
      <h2>目录
        <span
          class = "text-right"
          @click = "reverseChapter">
          <i class="icon icon-order"/>{{ order }}
        </span>
      </h2>
      <div class = "catalog-list">
        <ul>
          <li
            v-for = "item in list"
            :key = "item.id">
            <a
              :href="item.contentUrl[0]">
              <p
                v-clock
                class = "line-clamp1 gap-top gap-bottom"> {{ item.name }}
              </p>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
let util = MIP.util
console.log(MIP.util)
let CustomStorage = util.customStorage
let storage = new CustomStorage(0)
export default {
  props: {
    'novelName': {
      default () {
        return {}
      },
      type: String
    }
  },
  data () {
    return {
      originUrl: 'http%3a%2f%2fwww.xmkanshu.com%2fbook%2fmip%2fread%3fbkid%3d672340121%26crid%3d371%26fr%3dxs_aladin_free%26mip%3d1',
      list: [],
      order: '倒序'
    }
  },
  mounted () {
    // this.originUrl = MIP.util.getOriginalUrl(window.location.href) || this.originUrl
    this.order = storage.get('order') ? storage.get('order') : this.order
    this.initData()
  },
  methods: {
    initData () {
      // let url = 'https://sp0.baidu.com/5LMDcjW6BwF3otqbppnN2DJv/novelsearch.pae.baidu.com/novel/api/mipinfo?originUrl='+this.originUrl
      // let logid = MIP && MIP.hash && MIP.hash.get ? MIP.hash.get(key) : ''
      // let _from = MIP && MIP.standalone ? 'noshell': ""
      let url = 'https://yq01-psdy-diaoyan1016.yq01.baidu.com:8001/novel/api/mipinfo?originUrl=' + this.originUrl
      if (this.novelName) {
        url += ('&novelName=' + this.novelName)
      }
      // 以下参数后端未接入
      // if(bkid){
      //     url += ("&bkid="+bkid);
      // }
      // if(logid){
      //     url += ("&logid="+logid);
      // }
      // if(_from){
      //     url += ("&from="+_from);
      // }

      window.fetchJsonp(url, {
        jsonpCallback: 'callback'
      }).then(function (res) {
        // 处理响应数据
        return res.json()
      }).then((data) => {
        // 处理parse 后的data数据
        this.list = data.data.catalog.chapters || []
        if (this.order === '正序') this.list = this.list.reverse()
      }).catch(function (ex) {
        // 捕获 parse的异常
        console.log('parsing failed', ex)
      })
    },
    reverseChapter () {
      // 正序，倒序
      if (this.list.length === 0) return
      this.order = (this.order === '倒序' ? '正序' : '倒序')
      this.list = this.list.reverse()
      storage.set('order', this.order)
    }
  }
}
</script>
<style scoped>
    .chapter ul li{
        list-style: none;
    }
    .chapter #header{
        border-bottom: 1px solid #f1f1f1;
        height: 44px;
        line-height: 44px;
        padding-left: 17px;
        padding-right: 17px;
    }
    #header .left{
        left: 17px;
        text-align: left;
        position: absolute;
        top: 0;
        z-index: 10;
    }
    .chapter h4{
        margin: 0;
        padding: 0 50px;
        text-align: center;
        font-size: 18px;
    }
    .chapter .container{
        margin: .1rem 0;
        padding: .1rem .17rem .15rem;
        background-color: #fff;
        width: auto;
        word-break: break-word;
        word-wrap: break-word;
        border: 0 none;
    }
    .container .text-right{
        float: right;
        font-size: 16px;
        font-weight: normal;
    }
    .catalog-list li {
        border-bottom: 1px solid #f1f1f1;
    }
    .catalog-list li a{
        width: 100%;
    }
</style>
