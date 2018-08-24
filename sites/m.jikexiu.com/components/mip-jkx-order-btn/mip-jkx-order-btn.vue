<template>
  <div class="wrapper">
    <!-- 类名不能包含fixed -->
    <div class="fix_btn jj_fixBtn"><span>
      <a
        id="float_tel"
        class="ask_btn"
        href="tel:4008112112"
        rel="external">
        电话咨询
      </a>
    </span>
      <span>
        <p @click="goOrder('order.html')">免费预约</p>
      </span>
    </div>
</div></template>

<style scoped>
  .fix_btn {
      display: -webkit-flex;
      display: flex;
      overflow: hidden;
      width: 100%;
      height: 50px;
      background-color: #fff;
      padding: 0 4%;
      text-align: center;
      z-index: 999;
  }
  .fix_btn span {
      margin-top: 6px;
      background-color: #F10215;
      overflow: hidden;
      border-radius: 4px;
      border: 1px solid #f10215;
      height: 38px;
      display: inline-block;
      width: 43.5%;
      line-height: 38px;
      color: #fff;
  }
  .fix_btn span:first-child {
      margin-right: 3%;
      background-color: #fff;
  }
  a:visited {
      text-decoration: none;
      color: #333;
  }
  a:link {
      text-decoration: none;
  }
  .ask_btn,
  .fast_order {
      padding-left: 28px;
      color: #F10215;
      font-size: 16px;
      background: url('//rs.jikexiu.com/appresources/images2016/landing/tell1.png') no-repeat left center;
      background-size: auto 90%;
  }
  .fast_order:visited {
      color: #fff!important;
  }
  a:visited {
      text-decoration: none;
      color: #333;
  }
  a:link {
      text-decoration: none;
  }
  .fast_order {
      color: #fff;
      background: url(//rs.jikexiu.com/appresources/images2016/landing/tool.png) no-repeat left center;
      background-size: auto 90%;
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
    }
  },
  mounted () {
    // 监听login
    this.$on('customLogin', (e) => {
      console.log('触发登陆')
      // 判断当前收到登录成功事件是来自哪个动作触发的
    })
  },
  methods: {
    goOrder (href) {
      // 如果已经登录，自己处理跳转
      if (this.info.isLogin) {
        window.MIP.viewer.open('./' + href, {isMipLink: true})
      } else {
        console.log('hbb')
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
