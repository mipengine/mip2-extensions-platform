<template>
  <div class="wrapper">
    <h1>122121121</h1>
    <h3>This is my first custom component !</h3>
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
    setTimeout(() => {
      MIP.viewer.open('./index2.html', {isMipLink: true})
    }, 3000)
  }
}
</script>
