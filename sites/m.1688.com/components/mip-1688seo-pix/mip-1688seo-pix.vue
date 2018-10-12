<template>
  <div/>
</template>

<style scoped>
</style>
<script>
import './log'
export default {
  props: {
    src: {
      type: String,
      required: true
    },
    canonical: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },
  mounted () {
  }
}
</script>
