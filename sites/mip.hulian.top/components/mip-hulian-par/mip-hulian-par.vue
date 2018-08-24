<template>
  <div>
    <mip-iframe
      :src="greeting"
      :height="height"
      allowfullscreen
      width="100%"
      allowtransparency="true"/>
  </div>
</template>

<style scoped>
</style>

<script>
let hashstr = location.hash.replace('#', '')
let params = hashstr.split('&')
let url = 'https://m.hulian.top/help/' + params[1].replace('type=', '') + '/m/' + params[0].replace('id=', '') + '.html'
let height = MIP.viewport.getHeight('mip-iframe')
export default {
  computed: {
    greeting () {
      return url
    },
    height () {
      return height
    }
  }
}
</script>
