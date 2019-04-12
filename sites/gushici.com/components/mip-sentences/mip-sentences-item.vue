<template>
  <li>
    <span v-text="item.body" @click="_go" :data-id="item.id"></span>
    <p><a :href="'https://mip.gushici.com/a_'+item.auth_id+'.html'" v-text="item.auth" mip-link></a>《<a :href="'https://mip.gushici.com/t_'+item.poetry_id+'.html'" v-text="item.poetry" mip-link></a>》</p>
  </li> 
</template>

<script>
const cookie = MIP.util.customStorage(0)
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
    }
  },
  methods:{
    _go(e){
      let id = e.target.attributes['data-id'].value
      let val = e.target.innerText
      cookie.set('dt',val)
      MIP.viewer.open('https://mip.gushici.com/dt_'+id+'.html',{isMipLink:true})
    },
  }
}
</script>