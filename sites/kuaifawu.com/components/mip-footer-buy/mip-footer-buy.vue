<template>
  <div class="wrapper">
    <!-- 底部固定栏 -->
    <mip-fixed
      type="bottom"
      bottom="0"
      class="fb">
      <div class="fix-bottom">
        <a
          class="right"
          data-type="mip"
          @click="removeSku">购买服务</a>
        <a
          href="tel:4006028082"
          class="left">免费电话咨询</a>
      </div>
    </mip-fixed>
    <!-- 底部固定栏 -->
  </div>
</template>
<style scoped>
.wrapper {
  margin: 0 auto
}

.wrapper .fb {
  height: 0.54rem;
  line-height: .54rem;
}

.fix-bottom {
  height: 0.54rem;
  line-height: .54rem;
  text-align: center;
  border-top: .014rem solid #d9d9d9;
  width: 100%;
  display: flex;
  z-index: 999;
  font-size: .17rem;
  color: #fff
}

.fix-bottom .left {
  width: 70%;
  background-color: #007bc7;
  color: #fff;
}

.fix-bottom a.right {
  width: 30%;
  background-color: #e85555;
  color: #fff
}

</style>
<style>
.s4s-toast {
  position: fixed;
  top: 50%;
  left: 50%;
  padding: 0.2rem 0.1rem;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 0.1rem;
  color: #fff;
}

</style>
<script>
import config from '../../utils/config'
import util from '../../utils/toast'
export default {
  props: {
    info: {
      type: Object,
      required: true,
      isreg: '',
      isLogin: '',
      isrelate: '',
      haverelate: '',
      pp: ''
    }
  },
  prerenderAllowed () {
    return true
  },
  mounted () {
    MIP.viewer.fixedElement.init()
    // 自定义login事件
    this.$element.customElement.addEventAction('login', event => {
      // 这里可以输出登录之后的数据
      console.log(event.userInfo)
      // 获取用户信息

      if (event.origin === 'pay') {
        console.log(event.userInfo)
        this.jump()
      }
    })
    // 自定义exit事件
    this.$element.customElement.addEventAction('exit', event => {
      console.log('登出了')
    })

    // const self = this
    // let id = getRequest().id

    // 存储sessionId

    if (this.info.userInfo.isreg === 1 && this.info.isLogin) {
      // window.location.href = '/user/register.html'
      window.MIP.viewer.open(config.data().burl + '/user/register.html', { isMipLink: true })
    }

    // document.querySelector('.right').setAttribute('href', '/product/relate.html?id=' + pp + '.html')
  },
  methods: {
    removeSku: function () {
      let CustomStorage = MIP.util.customStorage
      let storage = new CustomStorage(0)
      storage.rm('sku')
      let saleprice = storage.get('saleprice')

      if (saleprice === '暂无价格') {
        util.toast('该服务暂不支持此地区')
        return true
      }

      if (this.info.isLogin) {
        this.jump()
      } else {
        this.$nextTick(() => {
          this.$emit('actionPay')
        })
      }
      // if (xxx.isLogin) {
      //     // 跳转到你的目标地址
      // }
      // else {
      //     this.$emit('eventname');

      // }
      // console.log(1234567890)
    },
    jump: function () {
      // sessionIds
      // nickname

      console.log(this.info.userInfo.isreg, 22)

      const self = this

      console.log(self.info.userInfo.isreg, 11)
      let CustomStorage = MIP.util.customStorage
      let storage = new CustomStorage(0)
      // storage.set('sessionId', this.info.userInfo.sessionId)
      // storage.set('isreg', this.info.userInfo.isreg)
      // storage.set('isLogin', this.info.isLogin)
      // 取 productskuid 和 providerid
      let pp = storage.get('provideridProductskuid')
      console.log(pp)
      window.fetchJsonp('https://api.kuaifawu.com/mip/product/haverelate.html?id=' + pp, {
        jsonpCallback: 'callback'
      }).then(function (res) {
        return res.json()
      }).then(function (data) {
        self.haverelate = data.data.items.haverelate
        console.log(self.haverelate)
        storage.set('sessionIds', self.info.userInfo.sessionId)
        // 判断是否需要注册 如果注册 跳转注册页面

        storage.set('isreg', self.info.userInfo.isreg)
        storage.set('isLogin', self.info.isLogin)
        storage.set('nickname', self.info.userInfo.nickname)
        if (self.info.userInfo.isreg === 1) {
          if (self.haverelate === 2) {
            storage.set('returnurl', config.data().burl + '/product/relate.html')
          } else {
            storage.set('returnurl', config.data().burl + '/orders/confirm.html')
          }
          window.MIP.viewer.open(MIP.util.makeCacheUrl(config.data().burl + '/user/register.html'), { isMipLink: true })
        } else if (self.haverelate === 2) {
          window.MIP.viewer.open(MIP.util.makeCacheUrl(config.data().burl + '/product/relate.html'), { isMipLink: true })
        } else {
          window.MIP.viewer.open(MIP.util.makeCacheUrl(config.data().burl + '/orders/confirm.html'), { isMipLink: true })
        }
      })
    }
  }
}

</script>
