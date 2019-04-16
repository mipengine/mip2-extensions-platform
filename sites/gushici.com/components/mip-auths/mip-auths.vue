<template>
  <div class="author-list">
    <div
      v-if="arr.length===0&&!isempty"
      class="load-box"><div class="loading"/></div>
    <div
      v-else-if="isempty"
      class="panel">
      <div class="nodata">
        <p>抱歉，暂无收录数据</p>
      </div>
    </div>
    <mip-auth-item
      v-for="(item, index) in arr"
      v-else
      :key="index"
      :item="item"
      :index="index"
      @filter="_childfilter" />
  </div>
</template>

<script>
import './index.less'
import MipAuthItem from './mip-auths-item'
import ajax from '../../common/ajax.js'
export default{
  components: {
    MipAuthItem
  },
  props: {
    page: {
      type: Number,
      default: 1
    },
    url: {
      type: String,
      default: ''
    },
    key: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      arr: [],
      pagesize: 0,
      paging: [],
      query: {},
      isempty: false
    }
  },
  created () {
    // 无携带ID的情况 直接获取
    let path = location.pathname.replace('.html', '').replace('/', '').split('_')
    if (path.length === 1) {
      this._getlist(this.url, this.page)
    } else if (path[0] === 'a') {
      this._getlist(this.url)
    }
  },
  mounted () {
    let t = this
    // 作者列表
    this.$on('paging', function (pg) {
      if (typeof pg === 'undefined') {
        // 无指定页码，则再当前页码上加一
        t.page++
      } else {
        t.page = pg
      }
      MIP.setData({page: t.page})
      t._getlist(t.url, t.page)
      MIP.viewport.setScrollTop(0)
    })
    // 监听筛选组件 接口执行完成触发
    this.$on('filter', function (q) {
      t._filter(q)
    })
  },
  updated () {
    if (this.key === 'like') {
      this.arr = this.list
    }
  },
  methods: {
    _filter (q) {
      let t = this
      let query = {
        page: 1
      }
      MIP.setData({page: 1, pagesize: 0})
      if (q.key === 'themes') {
        query.theme = q.val
      } else if (q.key === 'tags') {
        query.tag = q.val
      } else if (q.key === 'poetry_type') {
        query.type = q.val
      } else {
        query[q.key] = q.val
      }
      t.query = query
      t._renderdata(t.url, query)
    },
    _getlist (url, pg) {
      let t = this
      let query = this.query
      if (typeof pg !== 'undefined') {
        query.page = pg
      }
      t._renderdata(url, query)
    },
    _renderdata (url, query) {
      let t = this
      t.arr = []
      ajax.get(url, query, function (res) {
        let list = res.list
        if (res.page_max === 0) {
          t.isempty = true
        } else {
          t.pagesize = res.page_max
          MIP.setData({pagesize: res.page_max})
          t.arr = list
        }
      })
    }
  }
}
</script>
