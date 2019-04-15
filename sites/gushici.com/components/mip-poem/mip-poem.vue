<template>
  <div class="panel poem-panel">
    <div
      v-if="typeof item.id==='undefined'"
      class="load-box"><div class="loading"/></div>
    <div
      v-else
      class="poem-box">
      <div class="poem-head">
        <div class="poem-handler">
          <span
            v-if="item.has_y"
            :class="item.is_y?'active':''"
            :data-i="index"
            class="change y"
            data-v="y"
            @click="_change">译</span>
          <span
            v-if="item.has_z"
            :class="item.is_z?'active':''"
            :data-i="index"
            class="change z"
            data-v="z"
            @click="_change">注</span>
          <span
            v-if="item.has_s"
            :class="item.is_s?'active':''"
            :data-i="index"
            class="change s"
            data-v="s"
            @click="_change">赏</span>
        </div>
        <span
          v-if="hlt!=''"
          class="poem-title"
          v-text="hlt"/>
        <span
          v-else
          class="poem-title"
          v-text="item.title"/>
      </div>
      <div
        :class="{y:item.is_y,z:item.is_z,s:item.is_s}"
        class="poem-body">
        <div
          v-if="hlt!=''"
          class="poem-sub">
          出自<a
            :href="'https://mip.gushici.com/p_d_'+item.dynasty_id+'.html'"
            mip-link>[{{ item.dynasty }}]</a>
          <a
            :href="'https://mip.gushici.com/a_'+item.auth_id+'.html'"
            mip-link>{{ item.auth }}</a>
          《<span
            :data-id="item.id"
            @click="_go"
            v-text="item.title"/>》
        </div>
        <div
          v-else
          class="poem-sub">
          <a
            :href="'https://mip.gushici.com/p_d_'+item.dynasty_id+'.html'"
            mip-link>[{{ item.dynasty }}]</a>
          <a
            :href="'https://mip.gushici.com/a_'+item.auth_id+'.html'"
            mip-link>{{ item.auth }}</a>
        </div>
        <div
          v-for="(def,i) in item.line"
          :key="i"
          class="poem-item">
          <div
            :class="def.def==hlt?'hlt':''"
            v-html="def.def"/>
          <p
            class="y"
            v-html="def.y"/>
          <p
            class="z"
            v-html="def.z"/>
        </div>
        <div
          v-if="item.has_s"
          class="poem-s">
          <div class="poem-sub">[赏析]</div>
          <div v-html="item.s"/>
        </div>
        <div
          class="poem-tip"
          v-html="item.t"/>
      </div>
      <div class="poem-foot">
        <div class="tag">
          <a
            v-for="(c,i) in item.tag_arr"
            :key="i"
            :href="'https://mip.gushici.com/p_t_'+c.id+'.html'"
            mip-link
            v-text="c.tag"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import './index.less'
const cookie = MIP.util.customStorage(0)
export default{
  props: {
    item: {
      type: Object,
      default: function () {
        return {}
      }
    },
    index: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      hlt: ''
    }
  },
  created () {
    if (cookie.get('dt') !== null) {
      this.hlt = cookie.get('dt')
    }
  },
  methods: {
    _go (e) {
      let id = e.target.attributes['data-id'].value
      cookie.rm('dt')
      MIP.viewer.open('/example/t.html?id=' + id, {isMipLink: true})
    },
    _chosefilter (e) {
      let v = e.target.innerText
      if (this.item.key === 'refresh') {
        // 首页时，需要跳转到诗文列表页，且进行条件筛选
        MIP.viewer.open('/example/p.html?tags=' + v, {isMipLink: true})
      } else {
        // 触发父组件内_childfilter函数
        this.$emit('filter', {key: 'tags', val: v})
      }
    },
    _change (e) {
      let v = e.target.attributes['data-v'].value
      this.item['is_' + v] = !this.item['is_' + v]
    }
  }
}
</script>
