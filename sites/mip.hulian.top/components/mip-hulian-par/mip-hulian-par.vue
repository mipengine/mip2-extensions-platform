<template>
<div>
<mip-iframe
    :src="greeting"
    allowfullscreen
    width="100%"
    :height="height"
    allowtransparency="true">
</mip-iframe>
</div>

</template>

<style scoped>
    

</style>

<script>
var hashstr = location.hash.replace('#','');
var params = hashstr.split('&');
var url = 'https://m.hulian.top/help/'+params[1].replace('type=','')+'/m/'+params[0].replace('id=','')+'.html'
var height = MIP.viewport.getHeight('mip-iframe');
export default {
    // props: [],
    computed: {
      greeting() { 
        return url;
      },
      height(){
        return  height;
      }
    }
  }
</script>