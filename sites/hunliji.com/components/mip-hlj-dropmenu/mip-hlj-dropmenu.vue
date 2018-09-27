<template>
  <div :class="{'dropmenu-pd-warp': downloadShow}">
    <div
      v-show="downloadShow"
      id="j_download"
      class="download-bar">
      <div
        class="download-bar__hd"
        @click="closeDownload()">
        <div
          id="j_downloadBarClose"
          class="download-bar__close" />
      </div>
      <div class="download-bar__bd">
        <div class="download-bar__logo" />
        <div class="download-bar__slogan">
          <p class="download-bar__slogan-1">免费制作请帖、结婚分期付款</p>
          <p class="download-bar__slogan-2">一站解决备婚难题</p>
        </div>
      </div>
      <div class="download-bar__ft">
        <a
          id="j_downloadBarBtn"
          :href="downloadHref"
          class="download-bar__btn">
          立即下载
        </a>
      </div>
    </div>

    <div
      v-show="showMenu"
      id="j_dropdown"
      class="dropdown">
      <div
        id="j_dropdownMask"
        class="dropdown__mask"
        @click="toggleEvent"/>
      <div class="dropdown__list">
        <div
          v-for="(row, i) of menuList"
          :key="i"
          class="dropdown__list__row">
          <a
            v-for="(col, j) of row"
            :key="j"
            :href="col.href"
            class="dropdown__item">
            <div class="dropdown__item__icon">
              <mip-img :src="col.img" />
            </div>
            <div class="dropdown__item__txt">{{ col.text }}</div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    menuList: {
      default: undefined,
      type: Array
    },
    showDownload: {
      default: false,
      type: Boolean
    },
    downloadHref: {
      default: '',
      type: String
    }
  },
  data: function () {
    return {
      showMenu: false,
      downloadShow: this.showDownload
    }
  },
  mounted () {
  },
  created () {
    this.$element.customElement.addEventAction('toggle', this.toggleEvent)
  },
  methods: {
    closeDownload: function () {
      this.downloadShow = false
      document.body.style.paddingTop = 0
    },
    toggleEvent: function () {
      this.showMenu = !this.showMenu
      this.stopBodyScroll(this.showMenu)
    },
    stopBodyScroll (isFixed) {
      let bodyEl = document.body
      let top = 0
      if (isFixed) {
        top = window.scrollY
        bodyEl.style.position = 'fixed'
        bodyEl.style.top = -top + 'px'
        bodyEl.style.width = '100%'
      } else {
        bodyEl.style.position = ''
        bodyEl.style.top = ''
        bodyEl.style.width = ''
        window.scrollTo(0, top)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.dropmenu-pd-warp .dropdown {
  top: 104PX;
}

.dropdown {
  position: absolute;
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