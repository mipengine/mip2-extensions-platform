<template>
  <div/>
</template>
<style scoped>
</style>
<script>
export default {
  props: {
    src: {
      type: String,
      required: true
    }
  },
  mounted () {
    let element = this.$element
    let img = new Image()
    img.style.display = 'none'
    img.src = this.src
    element.appendChild(img)
  }
}
</script>
