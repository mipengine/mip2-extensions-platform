<template>
  <div class="wrapper">
    <div
      class="list"
    >
      <li
        v-for="item in data"
        :key="item.id"
        class="navList"
        @click="goOrder(item.href)">
        <mip-img
          :src="item.src"
          :alt="item.name"
          class="img"
          layout="container"
          width="1"
          height="1"/>
        <p>{{ item.name }}</p>
      </li>
    </div>
</div></template>

<style scoped>
.wrapper {
  width: 100%;
  margin: 10px auto;
  text-align: center;
  background: #fff;
  padding-bottom: 10px;
}
.list{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.list li{
  width: 25%;
}
.img{
  display: block;
    width: 38px;
    height: 38px;
    margin: 10px auto;
}
p{
  text-align: center;
    color: #333;
}
</style>

<script>
export default {
  props: {
    info: {
      type: Object,
      required: true,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      data: [{
        'name': '手机换屏',
        'src': 'https://rs.jikexiu.com/appresources/images/tg/li1.png',
        'href': 'order.html'
      }, {
        'name': '电池换新',
        'src': 'https://rs.jikexiu.com/appresources/images/tg/li2.png',
        'href': 'order.html'
      }, {
        'name': '内存升级',
        'src': 'https://rs.jikexiu.com/appresources/images/tg/li3.png',
        'href': 'order.html'
      }, {
        'name': '按键更换',
        'src': 'https://rs.jikexiu.com/appresources/images/tg/li4.png',
        'href': 'order.html'
      }, {
        'name': '外壳更换',
        'src': 'https://rs.jikexiu.com/appresources/images/tg/li6.png',
        'href': 'order.html'
      }, {
        'name': '信号连接',
        'src': 'https://rs.jikexiu.com/appresources/images/tg/li7.png',
        'href': 'order.html'
      }, {
        'name': '摄像头',
        'src': 'https://rs.jikexiu.com/appresources/images/tg/li8.png',
        'href': 'order.html'
      }, {
        'name': '主板故障',
        'src': 'https://rs.jikexiu.com/appresources/images/tg/li9.png',
        'href': 'order.html'
      }]
    }
  },
  mounted () {
    // 监听login
    this.$on('customLogin', (e) => {
      console.log('触发登陆')
      // 判断当前收到登录成功事件是来自哪个动作触发的
      if (e.origin === 'asynLog') {
        this.alertTip()
      }
    })
    // 监听logout
    this.$on('customLogout', (e) => {
      console.log('用户登出了')
    })
  },
  methods: {
    goOrder (href) {
      // 如果已经登录，自己处理跳转
      if (this.info.isLogin) {
        window.MIP.viewer.open('' + href, {isMipLink: true})
      } else {
        // 设置登录组件的config属性中，重定向地址:redirectUri为订单页地址
        MIP.setData({
          config: {
            redirectUri: 'https://m.jikexiu.com/resources/mip/' + href
          }
        })
        // 在下一个执行时机触发事件
        this.$nextTick(function () {
          this.$emit('actionOrder')
        })
      }
    }
  }
}
</script>
