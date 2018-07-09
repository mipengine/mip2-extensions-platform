<template>
  <div class="wrapper">
    <h1>MIP 2.0 component example</h1>
    <mip-img
      layout="responsive"
      width="350"
      height="263"
      src="https://www.mipengine.org/static/img/sample_01.jpg"/>
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
  mounted () {
    console.log('This is my first custom component !')
  }
}
</script>
