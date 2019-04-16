<template>
  <li>
    <span
      :data-id="item.id"
      @click="_go"
      v-text="item.body"/>
    <p><a
      :href="'https://mip.gushici.com/a_'+item.auth_id+'.html'"
      mip-link
      v-text="item.auth"/>《<a
        :href="'https://mip.gushici.com/t_'+item.poetry_id+'.html'"
        mip-link
        v-text="item.poetry"/>》</p>
  </li>
</template>

<script>
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
    }
  },
  methods: {
    _go (e) {
      let id = e.target.attributes['data-id'].value
      let val = e.target.innerText
      cookie.set('dt', val)
      MIP.viewer.open('https://mip.gushici.com/dt_' + id + '.html', {isMipLink: true})
    }
  }
}
</script>
