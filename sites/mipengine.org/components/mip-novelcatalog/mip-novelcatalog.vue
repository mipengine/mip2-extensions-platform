<template>
  <div class = "chapter">
    <div class = "container">
      <h2>目录
        <span
          class = "text-right"
          @click = "reverseChapter">
          <i class = "icon icon-order"/>{{ order }}
        </span>
      </h2>
      <div class = "catalog-list">
        <ul>
          <li
            v-for = "item in list"
            :key = "item.id">
            <a
              :href = "item.contentUrl[0]"
              data-type="mip"
              data-title="item.name">
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
const util = MIP.util
const CustomStorage = util.customStorage
const storage = new CustomStorage(0)
export default {
  props: {
    'novelName': {
      default () {
        return ''
      },
      type: String
    },
    'originUrl': {
      default () {
        return ''
      },
      type: String
    },
    'bkid': {
      default () {
        return ''
      },
      type: String
    }
  },
  data () {
    return {
      list: [],
      url: '',
      order: '倒序'
    }
  },
  mounted () {
    this.order = storage.get('order') ? storage.get('order') : this.order
    this.initData()
  },
  methods: {
    initData () {
      this.url = this.originUrl ? this.originUrl : MIP.util.getOriginalUrl(window.location.href)
      let url = 'https://sp0.baidu.com/5LMDcjW6BwF3otqbppnN2DJv/novelsearch.pae.baidu.com/novel/api/mipinfo?originUrl=' + this.url
      const logid = MIP && MIP.hash && MIP.hash.get ? MIP.hash.get('lid') : ''
      if (this.novelName) {
        url += ('&novelName=' + this.novelName)
      }
      if (logid) {
        url += ('&logid=' + logid)
      }
      if (this.bkid) {
        url += ('&bkid=' + this.bkid)
      }
      window.fetchJsonp(url, {
        jsonpCallback: 'callback'
      }).then(function (res) {
        // 处理响应数据
        return res.json()
      }).then((data) => {
        // 处理parse 后的data数据
        this.list = data.data.catalog.chapters || []
        if (this.order === '正序') this.list = this.list.reverse()
      }).catch(function () {
        // 捕获 parse的异常
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
