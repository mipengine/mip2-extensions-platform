<template>
  <div class="wrapper">
    <h1>MIP 2.0 component example</h1>
    <h3>{{ldata.name}}</h3>
  </div>
</template>

<style scoped>
.wrapper {
  margin: 0 auto;
  text-align: center;
}
</style>

<script>
export default {
  props: {
    ldata: {
      type: Object,
      required: true
    }
  },
  mounted () {
    console.log(this.ldata)
    console.log('This is my first custom component !')
  }
}
</script>
