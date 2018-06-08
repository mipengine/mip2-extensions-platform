<template>
  <div class="wrapper">
    <h1>MIP 2.0 component example</h1>
    <h3>This is my first custom component !</h3>
  </div>
</template>

<style scoped>
.wrapper {
  margin: 0 auto;
  text-align: center;
  background: url(../../static/test.png);
}
</style>

<script>
import axios from 'axios'
export default {
  mounted () {
    console.log('This is my first custom component !')
  }
}
</script>
