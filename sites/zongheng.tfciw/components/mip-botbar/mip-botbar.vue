<template>
  <mip-fixed
    v-if="show"
    type="bottom">
    <div class="bot_bar">
      <div
        class="close_btn"
        @click="_close">
        <mip-img
          :src="closeImgUrl"
          class="close_icon"
          width="18"
          height="18"/>
      </div>
      <div class="logo_icon">
        <mip-img
          :src="logoimgsrc"
          width="36"
          height="36"/>
      </div>
      <div class="word_wrapper">
        <p class="title">{{ title }}</p>
        <p class="brief">{{ brief }}</p>
      </div>
      <a
        :href="linkHref"
        class="link_btn">打开</a>
    </div>
  </mip-fixed>
</template>

<script>
import img from '@/static/close_btn.png'
export default {
  props: {
    ioshref: {
      type: String,
      default: ''
    },
    androidhref: {
      type: String,
      default: ''
    },
    logoimgsrc: {
      type: String,
      default: 'https://img.xmkanshu.com/operateimg/novel/55/558c64914884316a24fb6abc51ca2470.png'
    },
    title: {
      type: String,
      default: ''
    },
    brief: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      linkHref: '',
      show: true,
      closeImgUrl: img
    }
  },
  prerenderAllowed () {
    return true
  },
  created () {
    if (localStorage.getItem('isClosed')) {
      let today = new Date().getDate()
      if (String(today) === String(localStorage.getItem('closeDay'))) {
        this.show = false
      } else {
        localStorage.setItem('isClosed', false)
        localStorage.removeItem('closeDay')
      }
    }
    if (MIP.util.platform.isIOS()) {
      this.linkHref = this.ioshref // Ios下载链接
    } else {
      this.linkHref = this.androidhref // Android下载链接
    }
  },
  methods: {
    _close () {
      this.show = false
      localStorage.setItem('isClosed', true)
      localStorage.setItem('closeDay', new Date().getDate())
    }
  }
}
</script>

<style lang="less" scoped>
.bot_bar {
  width: 100%;
  height: 50px;
  transform: translateY(0px);
  transition: transform .2s ease-in-out;
  background-color: rgba(255, 255, 255, .96);
  div {
    position: absolute;
    &.close_btn {
      width: 18px;
      height: 50px;
      top: 0px;
      left: 17px;
      box-sizing: border-box;
      .close_icon {
        position: absolute;
        top: 16px;
        left: 0;
      }
    }
    &.logo_icon {
      width: 36px;
      height: 36px;
      background-size: 100% 100%;
      top: 6px;
      left: 45px;
      img {
        width: 36px;
        height: 36px;
      }
    }
    &.word_wrapper {
      top: 8px;
      left: 89px;
      .title {
        font-size: 17px;
        height: 17px;
        line-height: 17px;
        color: #000000;
        margin: 0;
        padding: 0;
      }
      .brief {
        font-size: 12px;
        height: 12px;
        line-height: 12px;
        margin-top: 5px;
        color: #999999;
      }
    }
  }
  .link_btn {
    position: absolute;
    width: 57px;
    height: 28px;
    line-height: 28px;
    text-align: center;
    border: 1px solid #3388FF;
    border-radius: 2px;
    color: #3388FF;
    top: 11px;
    box-sizing: border-box;
    right: 17px;
    font-size: 13px;
  }
}
</style>
