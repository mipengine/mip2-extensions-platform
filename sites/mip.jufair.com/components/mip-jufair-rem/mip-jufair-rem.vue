<template>
  <div class="wrapper"/>
</template>

<style lang="scss" scoped>

</style>

<script>
export default {
  props: {

  },
  data () {
    return {
    }
  },
  mounted () {
    let docEl = document.documentElement
    let rem
    if (docEl.clientWidth > 640) {
      rem = 640 / 10
    } else {
      rem = docEl.clientWidth / 10
    }
    docEl.style.fontSize = rem + 'px'
  },
  methods: {
  }
}
</script>
