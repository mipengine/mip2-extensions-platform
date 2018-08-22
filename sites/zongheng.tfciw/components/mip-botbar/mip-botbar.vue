<template>
  <mip-fixed
    v-if="show"
    type="bottom">
    <div
      class="bot_bar"
      data-stats-baidu-obj="%7B%22type%22%3A%22load%22%2C%22data%22%3A%5B%22_setCustomVar%22%2C1%2C%22botbarinview%22%2C%221%22%2C2%5D%7D">
      <div
        class="close_btn"
        data-stats-baidu-obj="%7B%22type%22%3A%22click%22%2C%22data%22%3A%5B%22_trackEvent%22%2C%22botbar%22%2C%22close%22%5D%7D"
        @click="_close">
        <mip-img
          :src="closeImgUrl"
          class="close_icon"
          width="18"
          height="18" />
      </div>
      <div class="logo_icon">
        <mip-img
          :src="logoimgsrc"
          width="36"
          height="36" />
      </div>
      <div class="word_wrapper">
        <p class="title">{{ title }}</p>
        <p class="brief">{{ brief }}</p>
      </div>
      <div class="link_btn">打开</div>
      <div
        class="whole_link_btn"
        data-stats-baidu-obj="%7B%22type%22%3A%22click%22%2C%22data%22%3A%5B%22_trackEvent%22%2C%22botbar%22%2C%22download%22%5D%7D"
        @click="_jumpDownload" />
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
      closeImgUrl: img,
      bookList: '',
      book: ''
    }
  },
  prerenderAllowed () {
    return true
  },
  created () {
    function getQuery (url) {
      url = url || location.href
      let query = url.split('?')[1] || ''
      query = query.split('#')[0] || ''
      if (!query) {
        return {}
      }
      return query.split('&').reduce(function (obj, item) {
        let data = item.split('=')
        obj[data[0]] = decodeURIComponent(data[1])
        return obj
      }, {})
    }
    // 从localstorage中获取书单
    this.bookList = localStorage.getItem('bookList')
    // 从url获取本书
    this.book = getQuery().bkid
    // 如果有过书单（不是第一次进入这个页面），则将该书单赋值给data - bookList。
    if (this.bookList) {
      this.bookList = JSON.parse(this.bookList)
      // 如果这本书是第一次读则在书单中新建该书，然后重新打上缓存，赋值给 data - bookList
      if (!this.bookList[this.book]) {
        this.bookList[this.book] = {
          isClosed: false,
          day: new Date().getDate()
        }
        localStorage.setItem('bookList', JSON.stringify(this.bookList))
        this.bookList = JSON.parse(localStorage.getItem('bookList'))
      }
    } else { // 第一次进入该页面，初始化书单，第一本书，并打上缓存，赋值给data - bookList
      let data = {}
      data[this.book] = {
        isClosed: false,
        day: new Date().getDate()
      }
      localStorage.setItem('bookList', JSON.stringify(data))
      this.bookList = JSON.parse(localStorage.getItem('bookList'))
    }
    // 这个时候不管是不是第一次，我们的书单都已经准备好，可以使用了。
    // 判断该书是否被关闭，并且是当天被关闭，就不显示广告，不满足其一，就显示。
    if (this.bookList[this.book].isClosed && this.bookList[this.book].day === new Date().getDate()) {
      this.show = false
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
      this.bookList[this.book] = {
        isClosed: true,
        day: new Date().getDate()
      }
      localStorage.setItem('bookList', JSON.stringify(this.bookList))
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
      height: 50px;
      transform: translateY(0);
      transition: transform 0.2s ease-in-out;
      background-color: rgba(255, 255, 255, 0.96);
      overflow: hidden;

      div {
        position: absolute;

        &.close_btn {
          width: 45px;
          height: 50px;
          top: 0;
          left: 0;
          box-sizing: border-box;

          .close_icon {
            position: absolute;
            top: 16px;
            left: 17px;
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
            color: #000;
            margin: 0;
            padding: 0;
          }

          .brief {
            font-size: 12px;
            height: 12px;
            line-height: 12px;
            margin-top: 5px;
            color: #999;
          }
        }
      }

      .link_btn {
        position: absolute;
        width: 57px;
        height: 28px;
        line-height: 28px;
        text-align: center;
        border: 1px solid #38f;
        border-radius: 2px;
        color: #38f;
        top: 11px;
        box-sizing: border-box;
        right: 17px;
        font-size: 13px;
      }

      .whole_link_btn {
        position: absolute;
        width: 100%;
        height: 50px;
        margin-left: 45px;
      }
    }
</style>
