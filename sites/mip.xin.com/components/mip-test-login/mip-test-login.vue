<template>
  <div class="wrap">
    <mip-inservice-login
      id="log"
      :config="config"
      on="login:example.customLogin logout:example.customLogout"/>
    <h3>这是一个渲染片段示例</h3>
    <p>默认未登录，由用户交互（如点击按钮）触发登录/登出</p>
    <hr >
    <div v-if="info.isLogin">hi，，欢迎回来！
      <span
        style="color:#f00;"
        on="tap:log.logout">退出</span>
    </div>
    <div v-else>你没有
      <span
        style="color:#f00;"
        on="tap:log.login">登录</span>哦。</div>
  </div>
</template>
<script>
export default {
  props: {
    info: {
      type: Object,
      required: true
    },
    config: {
      type: Object,
      required: true
    }
  },

  mounted () {
    // 自定义login事件
    this.$on('customLogin', event => {
      // 这里可以输出登录之后的数据
      // 获取用户信息
      // event.userInfo;
      // 后端交互会话标识
      // event.sessionId;
      console.log('授权后', event)
    })
    // 自定义exit事件
    this.$on('customLogout', event => {
      console.log('登出了')
    })
  }
}
</script>
