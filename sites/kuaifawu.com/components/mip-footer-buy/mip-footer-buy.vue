<template>
  <div class="wrapper">
    <!-- 底部固定栏 -->
    <div class="fix-bottom">
    	<div class="left">点击咨询</div>
    	<a class="right" data-type="mip" href="" on="tap:log.login(http://b.t.kuaifawu.com/product/relate.html)" @click="removeSku">购买服务</a>
    </div>
    <!-- 底部固定栏 -->
  </div>
</template>

<style scoped>
	.wrapper {
	  margin: 0 auto;
	}
	.fix-bottom{position: fixed;bottom: 0;left: 0;text-align:center;border-top: 0.014rem solid #d9d9d9;height: 0.54rem;line-height: 0.54rem;width:100%;display: flex;z-index: 1;font-size: 0.17rem;color: #fff;}
	.fix-bottom .left{width:30%;;background-color: #007bc7;}
	.fix-bottom a.right{width:70%;background-color: #e85555;color: #fff;}
</style>

<script>
export default {

  props: {
  	info: {
  		type:Object,
  		required:true,
  		pp:""
  	}
  },
  mounted () {
    console.log('This is 底部购买按钮组件')
    console.log(this.info)
    console.log(this.info.userInfo.isreg)
    console.log(this.info.userInfo.sessionId)
    if (this.info.userInfo.isreg ===1 && this.info.isLogin) {
    	window.location.href = "/user/register.html"
    }

    // 存储sessionId
    let CustomStorage = MIP.util.customStorage
    let storage = new CustomStorage(0);
    storage.set('sessionId',this.info.userInfo.sessionId)
    storage.set('isreg',this.info.userInfo.isreg)
    storage.set('isLogin',this.info.isLogin)
    // 取 productskuid 和 providerid
    let pp = storage.get('provideridProductskuid');
    console.log(pp);

    document.querySelector(".right").setAttribute("href","/product/relate.html?id=" + pp + ".html");
    // this.$element.customElement.addEventAction('login', event => {
    //     // 这里可以输出登录之后的数据
    //     console.log(event)
    //     // console.log(event)
    //     // 获取用户信息
    //     event.userInfo;
    //     // 后端交互会话标识
    //     event.sessionId;
    // });
    // // 自定义exit事件
    // this.$element.customElement.addEventAction('exit', event => {
    //     console.log('登出了');
    // });
  },
  methods:{
  	removeSku:function () {
  		let CustomStorage = MIP.util.customStorage
    	let storage = new CustomStorage(0);
  		storage.rm(sku)
  		// console.log(1234567890)
  	}
  }
}
</script>
