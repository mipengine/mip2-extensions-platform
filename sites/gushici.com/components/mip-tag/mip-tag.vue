<template>
  <div class="tag-block">
    <div class="tag-body">
      <ul>
        <li
          v-for="item in list"
          :key="item.id"><a
            :href="'https://mip.gushici.com/t_'+item.id+'.html'"
            mip-link>{{ item.title }}</a></li>
      </ul>
    </div>
    <div class="tag-foot">共{{ count }}篇诗文</div>
  </div>
</template>

<script>
import './index.less'
export default{
  props: {
    list: {
      type: Array,
      default: function () {
        return []
      }
    },
    count: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {

    }
  },
  methods: {

  }
}
</script>
