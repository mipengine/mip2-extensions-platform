<template>
  <div
    :class="{'toggle-show':show}"
    class="wrapper">
    <div class="Loading">{{ msg||努力加载中 }}</div>
  </div>
</template>

<style scoped lang="less">
.wrapper {
  margin: 0 auto;
  text-align: center;
  position: absolute;
  background-color:transparent;
  height: 100%;
  width: 100%;
  bottom: 0;
  top:0;
  left:0;
  right:0;
  display: none;
  z-index: 9999;
  .Loading{
    margin: 0 auto;
    margin-top:300px;
    height: 200px;
    width: 200px;
    text-align: center;
    color: #080707;
    text-shadow: -1px 0px 7px #080707;
    font-size: 30px;
    line-height: 200px;
  }
}
.toggle-show{
  display: block;
}
</style>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    msg: {
      type: String,
      default: ''
    }
  },
  mounted () {
    console.log('loding data')
  }
}
</script>
