
<template>
  <div class="root">

    <mip-img
      layout="responsive"
      width="375"
      height="170"

      src="i/jghy_01_01.jpg"/>
    <mip-img
      layout="responsive"
      width="375"
      height="646"

      src="i/jghy_01_02.jpg"/>
    <mip-img
      layout="responsive"
      width="375"
      height="740"

      src="i/jghy_01_03.jpg"/>
    <mip-img
      layout="responsive"
      width="375"
      height="414"

      src="i/jghy_01_04.jpg"/>
  </div>
</template>
<style scoped>
.wrapper {
  margin: 0 auto;
  text-align: center;
}

* {
  margin: 0px;
  padding: 0px;
}

p {
  margin: 0px;
  padding: 0px;
  font-family: '黑体';
}

.root {
  background: #f4f4f4;
  color: #666;
  font-size: 14px;
}

</style>

<script>

export default {
  props: {

    src: {
      type: String,
      default: null
    },
    dataJsonstr: {
      type: String,
      default: null

    }
  },
  data () {
  },
  computed: {

  },
  prerenderAllowed () {
    return true
  },
  mounted () {
  },
  methods: {
    init () {
    },
    load_data () {
    }
  }
}
</script>
