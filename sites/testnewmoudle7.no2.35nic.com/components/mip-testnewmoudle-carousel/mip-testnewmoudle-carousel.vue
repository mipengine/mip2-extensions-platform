<template>
    <mip-carousel autoplay defer="5000" layout="responsive" width="600" height="400">
    <mip-img
        src="https://www.mipengine.org/static/img/sample_01.jpg">
    </mip-img>
    <mip-img
        src="https://www.mipengine.org/static/img/sample_02.jpg">
    </mip-img>
    <mip-img
        src="https://www.mipengine.org/static/img/sample_03.jpg">
    </mip-img>
</mip-carousel>
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
