<template>
  <div class="panel filter-panel">
    <div class="filter-head">
      <p class="filter-title">{{ cur!==''?cur:title }}</p>
      <small>{{ page }}/{{ pagesize>1000?'1000+':pagesize }}页</small>
    </div>
    <div class="filter-body">
      <div
        v-for="(item, i) in list"
        :class="item.isopen?'open':''"
        :key="i"
        class="filter-item">
        <div class="item-label">{{ item.title }}：</div>
        <div
          v-if="item.title==='类型'"
          class="item-inner">
          <a
            v-for="(c, ci) in item.arr"
            :class="c.iscur?'cur':''"
            :key="ci"
            :href="'https://mip.gushici.com/p_t_'+c.id+'.html'"
            mip-link
            v-text="c.val"/>
        </div>
        <div
          v-if="item.title==='作者'"
          class="item-inner">
          <a
            v-for="(c, ci) in item.arr"
            :class="c.iscur?'cur':''"
            :key="ci"
            :href="'https://mip.gushici.com/a_'+c.id+'.html'"
            mip-link
            v-text="c.val"/>
        </div>
        <div
          v-if="item.title==='朝代'"
          class="item-inner">
          <a
            v-for="(c, ci) in item.arr"
            :class="c.iscur?'cur':''"
            :key="ci"
            :href="'https://mip.gushici.com/p_d_'+c.id+'.html'"
            mip-link
            v-text="c.val"/>
        </div>
        <div
          v-if="item.title==='形式'"
          class="item-inner">
          <a
            v-for="(c, ci) in item.arr"
            :class="c.iscur?'cur':''"
            :key="ci"
            :href="'https://mip.gushici.com/p_p_'+c.id+'.html'"
            mip-link
            v-text="c.val"/>
        </div>
        <div
          v-if="item.title==='主题'"
          class="item-inner">
          <a
            v-for="(c, ci) in item.arr"
            :class="c.iscur?'cur':''"
            :key="ci"
            :href="'https://mip.gushici.com/d_'+c.id+'.html'"
            mip-link
            v-text="c.val"/>
        </div>
        <div
          v-if="item.show"
          :data-i="i"
          class="item-handler"
          @click="_open"/>
      </div>
    </div>
  </div>
</template>

<script>
import './index.less'
import ajax from '../../common/ajax.js'
export default{
  props: {
    page: {
      type: Number,
      default: 1
    },
    pagesize: {
      type: Number,
      default: 0
    },
    title: {
      type: String,
      default: ''
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
      list: [],
      keyValue: [
        {key: 'tags', cn: '类型'},
        {key: 'auths', cn: '作者'},
        {key: 'dynasty', cn: '朝代'},
        {key: 'poetry_type', cn: '形式'},
        {key: 'themes', cn: '主题'}
      ],
      cur: '',
      query: {}
    }
  },
  created () {
    this.param()
    this.init()
  },
  methods: {
    param () {
      let path = location.pathname.replace('.html', '').replace('/', '').split('_')
      console.log('path', path)
      let q = {}
      if (path.length > 2) {
        if (/[a-z]/.test(path[1]) && path[0] === 'p') {
          let key = ''
          if (path[1] === 't') {
            key = 'tags'
          } else if (path[1] === 'd') {
            key = 'dynasty'
          } else if (path[1] === 'p') {
            key = 'poetry_type'
          }
          q.key = key
          q.val = path[2]
        }
      } else if (path.length === 2) {
        if (!/[a-z]/.test(path[1]) && path[0] === 'd') {
          q.key = 'themes'
          q.val = path[1]
        } else if (!/[a-z]/.test(path[1]) && path[0] === 'e') {
          q.key = 'dynasty'
          q.val = path[1]
        }
      }
      console.log('q', q)
      this.query = q
    },
    /**
     * 初始化组件
     * 获取数据
    */
    init () {
      let keys = this.key.split(',')
      let arr = []
      let t = this
      let keyValues = this.keyValue
      for (let i = 0; i < keyValues.length; i++) {
        for (let j = 0; j < keys.length; j++) {
          if (keys[j] === keyValues[i].cn) {
            arr.push(keyValues[i])
          }
        }
      }
      ajax.get(this.url, {}, function (res) {
        for (let i = 0; i < arr.length; i++) {
          let o = {
            title: arr[i].cn,
            arr: [],
            show: true,
            isopen: false
          }
          for (let j = 0; j < res[arr[i].key].length; j++) {
            let v = ''
            if (arr[i].key === 'poetry_type') {
              v = res[arr[i].key][j].type_name
            } else if (arr[i].key === 'dynasty') {
              v = res[arr[i].key][j].dynasty
            } else {
              v = res[arr[i].key][j].name
            }
            o.arr.push({
              id: res[arr[i].key][j].id,
              key: arr[i].key,
              val: v,
              iscur: false
            })
            if (typeof t.query.key !== 'undefined') {
              let k = arr[i].key
              let id = res[arr[i].key][j].id
              if (t.query.key === k && Number(t.query.val) === id) {
                t.cur = v
                t.query.val = v
              }
            }
          }
          if (o.arr.length < 6) {
            o.show = false
          }
          t.list.push(o)
        }
        t._changefilter()
      })
    },
    _changefilter (q) {
      q = this.query
      let t = this
      if (typeof q.val === 'undefined') { return }
      t.cur = q.val
      let old = {}
      let oldi = null
      let oldci = null
      for (let i = 0; i < t.list.length; i++) {
        for (let j = 0; j < t.list[i].arr.length; j++) {
          if (t.list[i].arr[j].key === q.key && t.list[i].arr[j].val === q.val) {
            old = t.list[i].arr[j]
            oldi = i
            oldci = j
          } else {
            t.list[i].arr[j].iscur = false
          }
        }
      }
      if (oldi !== null && oldci !== null) {
        t.list[oldi].arr.splice(oldci, 1)
        old.iscur = true
        t.list[oldi].arr.unshift(old)
      }
      this.$emit('ready', t.query)
    },
    /**
     * 展开收起筛选栏
     */
    _open (e) {
      let i = e.target.attributes['data-i'].value
      this.list[i].isopen = !this.list[i].isopen
    }
  }
}
</script>
