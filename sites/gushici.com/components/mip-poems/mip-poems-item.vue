<template>
  <div  class="panel poem-panel" :class="isopen?'open':''">
    <div class="more" v-if="item.hasmore" @click="_more">展开阅读全文<i></i></div>
    <div class="poem-box" :class="isopen?'':'box-mask'">
      <div class="poem-head">
        <div class="poem-handler">
          <span class="change y" :class="item.is_y?'active':''" v-if="item.has_y" @click="_change" :data-i="index" data-v="y">译</span>
          <span class="change z" :class="item.is_z?'active':''" v-if="item.has_z" @click="_change" :data-i="index" data-v="z">注</span>
          <span class="change s" :class="item.is_s?'active':''" v-if="item.has_s" @click="_change" :data-i="index" data-v="s">赏</span>
        </div>
        <a class="poem-title" :href="'https://mip.gushici.com/t_'+item.id+'.html'" v-html="item.title" mip-link></a>
      </div>
      <div class="poem-body" :class="{y:item.is_y,z:item.is_z,s:item.is_s}">
        <div class="poem-sub">
          <a :href="'https://mip.gushici.com/p_d_'+item.dynasty_id+'.html'" v-html="'['+item.dynasty+']'" mip-link></a>
          <a :href="'https://mip.gushici.com/a_'+item.auth_id+'.html'" v-html="item.auth" mip-link></a>
        </div>
        <div class="poem-item"
          v-for="(def,i) in item.line" :key="i">
          <div v-html="def.def"></div>
          <p class="y" v-html="def.y"></p>
          <p class="z" v-html="def.z"></p>
        </div>
        <div class="poem-s" v-if="item.has_s">
          <div class="poem-sub">[赏析]</div>
          <div v-html="item.s"></div>
        </div>
        <div class="poem-tip" v-html="item.t"></div>
      </div>
      <div class="poem-foot">
        <div class="tag">
          <a
            v-for="(c,i) in item.tag_arr"
            :key="i"
            :href="'https://mip.gushici.com/p_t_'+c.id+'.html'"
            v-text="c.tag"
            mip-link></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default{
  props:{
    item:{
      type: Object,
      default:{}
    },
    index:{
      type: Number,
      default: 0
    }
  },
  data(){
    return {
      isopen:false
    }
  },
  methods:{
    _chosefilter(e){
      let v = e.target.innerText
      if(this.item.key=='refresh'){
        // 首页时，需要跳转到诗文列表页，且进行条件筛选
        MIP.viewer.open('/example/p.html?tags='+v,{isMipLink:true})
      }else{
        // 触发父组件内_childfilter函数
        this.$emit('filter',{key:'tags',val:v})
      }
    },
    _change(e){
      let i = e.target.attributes['data-i'].value
      let v = e.target.attributes['data-v'].value
      this.item['is_'+v] = !this.item['is_'+v]
    },
    _more(){
      this.isopen = !this.isopen
    }
  }
}
</script>