<template>
  <div
    v-show="alertmsg.isError"
    class="wrapper"
    @click="disappear">
    <!-- 输入错误提醒 -->
    <div
      ref="jkxmsg"
      class="jkx_msg">
      <p class="msg_main">{{ alertmsg.errorTitle }}</p>
    </div>
  </div>
</template>
<script>
const viewport = MIP.viewport
export default{
  props: {
    alertmsg: {
      default () {
        return {}
      },
      type: Object
    }
  },
  watch: {
    alertmsg (val) {
      if (val.isError) {
        setTimeout(() => {
          MIP.setData({
            alertMsg: {
              'isError': false,
              'errorTitle': ''
            }
          })
        }, 1000)
      }
    }
  },
  mounted () {
    //  获取页面高度
    this.$refs.jkxmsg.style.height = viewport.getHeight() + 'px'
  },
  methods: {
    disappear () {
      MIP.setData({
        alertMsg: {
          'isError': false,
          'errorTitle': ''
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
  .wrapper{
    position:relative;
    left:0;
    top:0;
    width: 100%;
    z-index: 100;
    .jkx_msg{
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height:100%;
      background-color: transparent;
      z-index: 5;
      text-align: center;
      .msg_main{
        display: inline-block;
        color:#fff;
        padding:10px;
        background-color: rgba(0,0,0,.4);
        border-radius:5px;
      }
    }
  }
</style>
