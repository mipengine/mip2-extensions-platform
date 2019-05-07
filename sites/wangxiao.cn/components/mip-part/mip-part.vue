<template>
  <div>
    <transition name="slide">
      <div class="pop" v-if="show">
        <span class="pop__close" @click="closeEL">×</span>
        <img class="pop__img" src="http://wap.wangxiao.cn/content/website2/img/app_logo.png" alt>
        <span class="pop__text">准题库-考试通关听课刷题神器</span>
        <div class="pop__btn" @click="downLode">免费下载</div>
      </div>
    </transition>
    <div>
      <div class="courseTop">
        <a href="/" class="sourseTop__logo">
          <mip-img
            src="http://static.wangxiao.cn/commonResoures/mip/logo-1.png"
            width="86"
            height="0"
            alt
            layout="responsive"
            class="mip-element mip-layout-responsive mip-layout-size-defined mip-img-loaded"
            mip-firstscreen-element
          >
            <mip-i-space style="display: block; padding-top: 20.9302%;">space</mip-i-space>
            <img
              class="mip-fill-content mip-replaced-content"
              src="http://static.wangxiao.cn/commonResoures/mip/logo-1.png"
              alt
            >
          </mip-img>
        </a>
        <a data-type="mip" :href="'/h/'+sign+'.html'" class="sourseTop__title">{{name}}</a>
        <transition name="app">
          <a class="courseTop__down" href="javascript:void(0);" v-if="app" @click="downLode">下载App</a>
        </transition>
        <a :href="'/TikuUserData/Personal/?sign='+sign" class="sourseTop__user">用户中心</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "part1",
  data() {
    return {
      show: true,
      app: ""
    };
  },
  props: {
    sign: String,
    name: String
  },
  methods: {
    hide() {
      setTimeout(() => {
        this.show = false;
        this.app = !this.show;
      }, 5000);
    },
    closeEL() {
      this.show = false;
      this.app = !this.show;
    },
    downLode() {
      if (this.sign == "") {
        this.sign = "ztk";
      };
      window.location.href =
        "http://appconfig.wangxiao.cn/download/index?sign=" + this.sign;
    }
  },
  mounted() {
    this.hide();
  }
};
</script>


<style lang="less" scoped>
.slide-leave-active {
  transition: all 0.5s ease;
}
.slide-leave-to {
  transform: translateY(-60px);
  opacity: 0;
}
.pop {
  width: 18.75rem;
  padding: 0.5rem 0.25rem;
  box-sizing: border-box;
  background-color: rgba(0, 0, 0, 0.8);
  white-space: nowrap;
  text-align: center;
}
.pop__bt {
  height: 2.5rem;
  background-color: #f7f7f7;
}
.pop__close {
  display: inline-block;
  color: #f7f7f7;
  border-radius: 50%;
  background-color: #000;
  text-align: center;
  padding: 0rem 0.175rem;
  box-sizing: border-box;
}
.pop__img {
  width: 2rem;
  vertical-align: middle;
}
.pop__text {
  font-size: 0.75rem;
  color: #fafcfd;
}
.pop__btn {
  font-size: 0.7rem;
  color: #fafcfd;
  display: inline-block;
  padding: 0.45rem 0.5rem;
  box-sizing: border-box;
  background-color: #f22f3f;
  border-radius: 0.15rem;
}
.courseTop {
  margin: 0 auto;
  color: #333;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: start;
  -ms-flex-pack: start;
  justify-content: flex-start;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  padding: 0.5rem 1rem;
  background-color: #fff;
  position: relative;
  z-index: 3;
}
.sourseTop__logo {
  width: 4.5rem;
}
.sourseTop__title {
  font-size: 0.7rem;
  padding: 0.075rem 0.15rem;
  color: #fff;
  border-radius: 0.15rem;
  white-space: nowrap;
  background-color: #ff5c43;
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    from(#ff7b41),
    to(#ff4845)
  );
  background: linear-gradient(#ff7b41, #ff4845);
  margin-left: 0.4rem;
}
.sourseTop__user {
  margin-left: auto;
  width: 0.9rem;
  height: 0.95rem;
  background: url(http://static.wangxiao.cn/commonResoures/mip/css_sprites.png) -2.65rem -0.25rem;
  background-size: 4.8rem 2.625rem;
  font-size: 0;
}
.curseBook_listItem_img img {
  min-width: auto;
}
.app-enter-active {
  transition: all 0.5s ease 1.5s;
}
.app-enter {
  transform: translateX(30/40rem);
  opacity: 0;
}
.courseTop__down {
  display: inline-block;
  padding: 3/40rem 20/40rem;
  box-sizing: border-box;
  font-size: 22/40rem;
  color: #eb6d4d;
  border-radius: 20/40rem;
  border: 1px solid #ee804f;
  vertical-align: middle;
  position: absolute;
  top: 0.45rem;
  right: 110/40rem;
  white-space: nowrap;
}
</style>
