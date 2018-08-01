<template>
  <div/>
</template>
<script>
export default {
  data () {
  },
  watch: {
  },
  mounted () {
    window.addEventListener('hide-page', () => {
      document.getElementsByTagName('video')[0].pause()
    })
  }
}
</script>
<style lang='less' scoped>
</style>
