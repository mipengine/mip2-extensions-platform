<template>
  <mip-fixed
    v-if="show"
    type="bottom">
    <div
      class="bot_bar"
      data-stats-baidu-obj="%7B%22type%22%3A%22load%22%2C%22data%22%3A%5B%22_setCustomVar%22%2C1%2C%22downloadbarinview%22%2C%221%22%2C2%5D%7D">
      <div
        class="close_btn"
        data-stats-baidu-obj="%7B%22type%22%3A%22click%22%2C%22data%22%3A%5B%22_trackEvent%22%2C%22downloadbar%22%2C%22close%22%5D%7D"
        @click="_close">
        <mip-img
          :src="closeImgUrl"
          class="close_icon"
          width="18"
          height="18" />
      </div>
      <div class="word_wrapper">
        {{ title }}
      </div>
      <div class="link_btn"> <mip-img
        :src="downloadImgUrl"
        class="downloadImgUrl"
        width="18"
        height="18" /> 一键下载</div>
      <div
        class="whole_link_btn"
        data-stats-baidu-obj="%7B%22type%22%3A%22click%22%2C%22data%22%3A%5B%22_trackEvent%22%2C%22downloadbar%22%2C%22gotodownload%22%5D%7D"
        @click="_jumpDownload" />
    </div>
  </mip-fixed>
</template>

<script>
import close from '@/static/close_btn.png'
import download from '@/static/download.png'
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
    title: {
      type: String,
      default: '离线免费看全文'
    }
  },
  data () {
    return {
      linkHref: '',
      show: true,
      closeImgUrl: close,
      downloadImgUrl: download
    }
  },
  created () {
    if (MIP.util.platform.isIOS()) {
      this.linkHref = this.ioshref // Ios下载链接
    } else {
      this.linkHref = this.androidhref // Android下载链接
    }
  },
  prerenderAllowed () {
    return true
  },
  methods: {
    _close () {
      this.show = false
    },
    _jumpDownload () {
      window.location.href = this.linkHref
    }
  }
}
</script>

<style lang="less" scoped>
  .bot_bar {
    width: 100%;
    height: 55px;
    background-color: rgba(255, 255, 255, 0.96);
    overflow: hidden;

    div {
      position: absolute;

      &.close_btn {
        width: 42px;
        height: 55px;
        top: 0;
        left: 0;
        box-sizing: border-box;

        .close_icon {
          position: absolute;
          top: 18.5px;
          left: 12px;
        }
      }

      &.word_wrapper {
        width: 100%;
        padding-right: 192px;
        height: 55px;
        left: 42px;
        line-height: 55px;
        font-size: 16px;
        color: #31323E;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
      }

      .downloadImgUrl {
        position: relative;
        top: 4px;
      }
    }

    .link_btn {
      position: absolute;
      padding: 0 18px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      border: 1px solid #38f;
      background: #38f;
      border-radius: 3px;
      color: #fff;
      top: 7.5px;
      box-sizing: border-box;
      right: 13px;
      font-size: 16px;
    }

    .whole_link_btn {
      position: absolute;
      width: 100%;
      height: 55px;
      margin-left: 42px;
    }
  }
</style>
