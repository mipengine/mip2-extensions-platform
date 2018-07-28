<template>
  <div class="wrapper">
    <h1/>
    <h3/>
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
    MIP.viewer.fixedElement.init()
    console.log('This is 文章列表页的js !')
  },
  methods: {
    greet () {
      console.log('This is 8569547 !')
    }
  }
}
</script>
