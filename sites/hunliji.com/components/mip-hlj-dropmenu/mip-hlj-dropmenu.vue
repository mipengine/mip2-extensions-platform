<template>
  <div :class="{'dropmenu-pd-warp': downloadShow}">
    <div class="download-bar" id="j_download" v-show="downloadShow">
      <div class="download-bar__hd" @click="closeDownload()">
        <div class="download-bar__close" id="j_downloadBarClose"></div>
      </div>
      <div class="download-bar__bd">
        <div class="download-bar__logo"></div>
        <div class="download-bar__slogan">
          <p class="download-bar__slogan-1">免费制作请帖、结婚分期付款</p>
          <p class="download-bar__slogan-2">一站解决备婚难题</p>
        </div>
      </div>
      <div class="download-bar__ft">
        <a class="download-bar__btn" id="j_downloadBarBtn">立即下载</a>
      </div>
    </div>

    <div class="dropdown" id="j_dropdown" v-show="showMenu">
      <div class="dropdown__mask" id="j_dropdownMask" @click="toggleEvent"></div>
      <div class="dropdown__list">
        <div class="dropdown__list__row" v-for="(row, i) of menuList" :key="i">
          <a class="dropdown__item" v-for="(col, j) of row" :key="j" :href="col.href">
            <div class="dropdown__item__icon">
              <img :src="col.img" alt="">
            </div>
            <div class="dropdown__item__txt">{{col.text}}</div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
let {
  CustomElement,
  util,
  viewer
} = MIP

let Gesture = util.Gesture

export default {
  props: {
    menuList: Array,
    showDownload: Boolean
  },
  data: function() {
    return {
      showMenu: false,
      downloadShow: this.showDownload
    }
  },
  mounted () {
    console.log(this.showDownload)

  },
  created() {
    this.$element.customElement.addEventAction('toggle', this.toggleEvent)
  },
  methods: {
    closeDownload: function() {
      this.downloadShow = false;
      document.body.style.paddingTop = 0
      console.log(this.downloadShow, 111)
    },
    toggleEvent: function () {
      this.showMenu = !!!this.showMenu
      if (this.showMenu) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = 'visible'
      }
    }
  }
}
</script>

<style lang="less">
.dropmenu-pd-warp .dropdown {
  top: 114PX;
}

.dropdown {
  position: fixed;
  z-index: 2;
  left: 0;
  top: 44PX;
  bottom: 0;
  width: 100%;
  display: block;
  &__mask {
    position: absolute;
    z-index: 2;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: #000;
    opacity: 0.55;
  }
  &__list {
    position: relative;
    z-index: 2;
    padding: 5PX 10PX 14PX;
    background: #fff;
    &__row {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }
  }
  &__item {
    margin-bottom: 10PX;
    &__icon {
      width: 78PX;
      height: 50PX;
      img {
        width: 100%;
        height: 100%;
      }
    }
    &__txt {
      font-size: 12PX;
      line-height: 1;
      text-align: center;
      color: #333;
    }
  }
}

@media (max-width: 320PX) {
  .dropdown__list {
    padding: 5PX 4PX 14PX;
  }
}


.download-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  width: 100%;
  height: 60PX;
  background: #222;
  &__hd {
    flex-shrink: 0;
  }
  &__bd {
    flex: 1;
    display: flex;
    align-items: center;
    overflow: hidden;
  }
  &__ft {
    flex-shrink: 0;
  }
  &__close {
    margin: 0 10PX;
    width: 16PX;
    height: 16PX;
    background: url('https://qnm.hunliji.com/o_1ckfceqa31li21ekg175n1ill1h4a67.png') 0 0 no-repeat;
    background-size: contain;
  }
  &__logo {
    flex-shrink: 0;
    display: block;
    width: 36PX;
    height: 36PX;
    background: url('https://qnm.hunliji.com/o_1ckfceqa21mep1sq21k54ef21sap66.png') 0 0 no-repeat;
    background-size: contain;
    margin-right: 8PX;
  }
  &__slogan {
    line-height: 1;
    color: #fff;
    &-1 {
      font-size: 14PX;
      font-weight: bold;
    }
    &-2 {
      margin-top: 6PX;
      font-size: 12PX;
    }
  }
  &__btn {
    display: block;
    margin-right: 12PX;
    width: 80PX;
    height: 30PX;
    border-radius: 15PX;
    font-size: 13PX;
    line-height: 30PX;
    text-align: center;
    color: #fff;
    background: #f83244;
  }
}
.page-padding-top {
  padding-top: 60PX;
}
</style>

