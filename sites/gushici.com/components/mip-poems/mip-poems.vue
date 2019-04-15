<template>
  <div class="poem-list">
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
    <mip-poem-item
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
import MipPoemItem from './mip-poems-item'
import ajax from '../../common/ajax.js'
import poem from '../../common/poem.js'
export default{
  components: {
    MipPoemItem
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
    },
    list: {
      type: Array,
      default: function () {
        return []
      }
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
    let t = this
    if (this.key !== 'like') {
      if (this.key === 'refresh') {
        t._getlist(this.url)
      } else {
        // 无携带ID的情况 直接获取
        if (location.pathname.indexOf('_') === -1) {
          t._getlist(this.url, this.page)
        }
      }
    } else {
      this.arr = this.list
    }
  },
  mounted () {
    let t = this
    // 首页推荐
    this.$on('refresh', function (event) {
      console.log('refresh')
      t._getlist(t.url)
    })
    // 诗文列表
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
    console.log('updated like', this.list)
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
          if (t.key !== 'refresh') {
            MIP.setData({pagesize: res.page_max})
          }
          for (let i = 0; i < list.length; i++) {
            let o = poem.poem(list[i].body, list[i].translation, list[i].explanation, list[i].appreciation)
            let p = {
              key: t.key,
              id: list[i].id,
              title: list[i].title,
              auth_id: list[i].auth_id,
              auth: list[i].auth,
              dynasty_id: list[i].dynasty_id,
              dynasty: list[i].dynasty,
              tag_arr: list[i].tag_arr,
              has_y: list[i].translation !== '',
              has_z: list[i].explanation !== '',
              has_s: list[i].appreciation !== '',
              line: o.line,
              s: o.s,
              t: o.t,
              is_y: false,
              is_z: false,
              is_s: false,
              hasmore: o.line_count > 7
            }
            t.arr.push(p)
          }
        }
      })
    },
    _change (e) {
      let i = e.target.attributes['data-i'].value
      let v = e.target.attributes['data-v'].value
      this.arr[i]['is_' + v] = !this.arr[i]['is_' + v]
    }
  }
}
</script>
