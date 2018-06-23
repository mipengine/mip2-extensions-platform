<template>
  <div class="wrapper" ref='wrapper' v-show="loading">
    <p class="img-wrapper">

    </p>
  </div>
</template>
<script>
export default {
  props:['loading'],
  mounted () {
    this.$refs.wrapper.style.height = document.documentElement.clientHeight+"px"
    
  },
  created(){ 
  }
}
</script>
<style scoped lang="less">
.wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,.5);
  .img-wrapper{
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 100000;
    margin: auto;
    width: 100px;
    height: 100px;
    background: url(https://rs.jikexiu.com/appresources//images2016/loading128.gif) no-repeat center center;
    background-size: 100% 100%;
  }
}

</style>
