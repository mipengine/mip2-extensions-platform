<template>
  <div class="wrapper">
    <!-- 底部固定栏 -->
    <div class="fix-bottom">
      <div class="left">点击咨询</div>
      <a
        class="right"
        data-type="mip"
        href=""
        on="tap:log.login(http://b.t.kuaifawu.com/product/relate.html)"
        @click="removeSku">购买服务</a>
    </div>
    <!-- 底部固定栏 -->
  </div>
</template>

<style scoped>
  .wrapper{margin:0 auto}.fix-bottom{position:fixed;bottom:0;left:0;text-align:center;border-top:.014rem solid #d9d9d9;height:.54rem;line-height:.54rem;width:100%;display:flex;z-index:1;font-size:.17rem;color:#fff}.fix-bottom .left{width:30%;background-color:#007bc7}.fix-bottom a.right{width:70%;background-color:#e85555;color:#fff}
</style>

<script>
export default {
  props: {
    info: {
      type: Object,
      required: true,
      pp: ''
    }
  },
  mounted () {
    if (this.info.userInfo.isreg === 1 && this.info.isLogin) {
      window.location.href = '/user/register.html'
    }

    // 存储sessionId
    let CustomStorage = MIP.util.customStorage
    let storage = new CustomStorage(0)
    storage.set('sessionId', this.info.userInfo.sessionId)
    storage.set('isreg', this.info.userInfo.isreg)
    storage.set('isLogin', this.info.isLogin)
    // 取 productskuid 和 providerid
    let pp = storage.get('provideridProductskuid')
    console.log(pp)

    document.querySelector('.right').setAttribute('href', '/product/relate.html?id=' + pp + '.html')
  },
  methods: {
    removeSku: function () {
      let CustomStorage = MIP.util.customStorage
      let storage = new CustomStorage(0)
      storage.rm('sku')
      // console.log(1234567890)
    }
  }
}
</script>
