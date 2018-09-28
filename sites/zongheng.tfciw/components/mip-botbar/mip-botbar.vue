<template>
  <mip-fixed
    v-if="show"
    type="bottom">
    <div class="main_wrapper">
      <div class="wrapper">
        <div
          class="bot_bar"
          data-stats-baidu-obj="%7B%22type%22%3A%22load%22%2C%22data%22%3A%5B%22_setCustomVar%22%2C1%2C%22botbarinview%22%2C%221%22%2C2%5D%7D">
          <div
            class="close_btn"
            data-stats-baidu-obj="%7B%22type%22%3A%22click%22%2C%22data%22%3A%5B%22_trackEvent%22%2C%22botbar%22%2C%22close%22%5D%7D"
            @click="_close">
            <img
              :src="closeImgUrl"
              class="close_icon">
          </div>
          <div class="logo_icon">
            <img
              :src="dataList[pre].icon"
              width="26"
              height="34" >
          </div>
          <div class="word_wrapper">
            <p class="title">{{ dataList[pre].name }}</p>
            <p class="brief">{{ dataList[pre].content }}</p>
          </div>
          <div
            class="link_btn"
            data-stats-baidu-obj="%7B%22type%22%3A%22click%22%2C%22data%22%3A%5B%22_trackEvent%22%2C%22botbar%22%2C%22download%22%5D%7D"
            @click="_jumpDownload(dataList[pre])">打开</div>
        </div>
        <div
          class="bot_bar"
          data-stats-baidu-obj="%7B%22type%22%3A%22load%22%2C%22data%22%3A%5B%22_setCustomVar%22%2C1%2C%22botbarinview%22%2C%221%22%2C2%5D%7D">
          <div
            class="close_btn"
            data-stats-baidu-obj="%7B%22type%22%3A%22click%22%2C%22data%22%3A%5B%22_trackEvent%22%2C%22botbar%22%2C%22close%22%5D%7D"
            @click="_close">
            <img
              :src="closeImgUrl"
              class="close_icon">
          </div>
          <div class="logo_icon">
            <img
              :src="dataList[right].icon"
              width="26"
              height="34" >
          </div>
          <div class="word_wrapper">
            <p class="title">{{ dataList[right].name }}</p>
            <p class="brief">{{ dataList[right].content }}</p>
          </div>
          <div
            class="link_btn"
            data-stats-baidu-obj="%7B%22type%22%3A%22click%22%2C%22data%22%3A%5B%22_trackEvent%22%2C%22botbar%22%2C%22download%22%5D%7D"
            @click="_jumpDownload(dataList[right])">打开</div>
        </div>
        <div
          class="bot_bar"
          data-stats-baidu-obj="%7B%22type%22%3A%22load%22%2C%22data%22%3A%5B%22_setCustomVar%22%2C1%2C%22botbarinview%22%2C%221%22%2C2%5D%7D">
          <div
            class="close_btn"
            data-stats-baidu-obj="%7B%22type%22%3A%22click%22%2C%22data%22%3A%5B%22_trackEvent%22%2C%22botbar%22%2C%22close%22%5D%7D"
            @click="_close">
            <img
              :src="closeImgUrl"
              class="close_icon">
          </div>
          <div class="logo_icon">
            <img
              :src="dataList[next].icon"
              width="26"
              height="34" >
          </div>
          <div class="word_wrapper">
            <p class="title">{{ dataList[next].name }}</p>
            <p class="brief">{{ dataList[next].content }}</p>
          </div>
          <div
            class="link_btn"
            data-stats-baidu-obj="%7B%22type%22%3A%22click%22%2C%22data%22%3A%5B%22_trackEvent%22%2C%22botbar%22%2C%22download%22%5D%7D"
            @click="_jumpDownload(dataList[next])">打开</div>
        </div>
      </div>
      <div class="hd">
        <ul>
          <li
            v-for="(item, index) in dataList"
            :key="index"
            :class="index === right ? 'active' : ''"/>
        </ul>
      </div>
    </div>
  </mip-fixed>
</template>

<script>
import img from '@/static/close_btn.png'
export default {
  props: {
    datalistprops: {
      type: Array,
      default () {
        return [
          {
            'icon': 'https://gss2.bdstatic.com/-fo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike92%2C5%2C5%2C92%2C30/sign=bcf219beb2096b63951456026d5aec21/6d81800a19d8bc3e0781d85b8e8ba61ea9d34592.jpg',
            'name': '斗破苍穹',
            'content': '下载更多精彩小说',
            'iosHref': '#ios',
            'androidHref': '#android'
          },
          {
            'icon': 'https://gss2.bdstatic.com/-fo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike92%2C5%2C5%2C92%2C30/sign=bcf219beb2096b63951456026d5aec21/6d81800a19d8bc3e0781d85b8e8ba61ea9d34592.jpg',
            'name': '剑来',
            'content': '下载更多精彩小说',
            'iosHref': '#ios',
            'androidHref': '#android'
          },
          {
            'icon': 'https://gss2.bdstatic.com/-fo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike92%2C5%2C5%2C92%2C30/sign=bcf219beb2096b63951456026d5aec21/6d81800a19d8bc3e0781d85b8e8ba61ea9d34592.jpg',
            'name': '神墓',
            'content': '下载更多精彩小说',
            'iosHref': '#ios',
            'androidHref': '#android'
          },
          {
            'icon': 'https://gss2.bdstatic.com/-fo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike92%2C5%2C5%2C92%2C30/sign=bcf219beb2096b63951456026d5aec21/6d81800a19d8bc3e0781d85b8e8ba61ea9d34592.jpg',
            'name': '雪中悍刀行',
            'content': '下载更多精彩小说',
            'iosHref': '#ios',
            'androidHref': '#android'
          }
        ]
      }
    }
  },
  data () {
    return {
      show: true,
      closeImgUrl: img,
      bookList: '',
      book: '',
      pre: 3,
      right: 0,
      next: 1,
      dataList: ''
    }
  },
  prerenderAllowed () {
    return true
  },
  created () {
    // 从localstorage中获取书单
    this.dataList = this.datalistprops
    this.bookList = localStorage.getItem('bookList')
    // 从url获取本书
    this.book = this.getQuery().bkid
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
    // 判断该书是否被关闭，并且是当天被关闭，就不显示广告，不满足其一，就显示。14400000 = 4 * 60 * 60 * 1000 ms = 4h
    if (this.bookList[this.book].isClosed && this.bookList[this.book].day === new Date().getDate() && (new Date().getTime() - this.bookList[this.book].time) < 14400000) {
      this.show = false
    }
  },
  mounted () {
    // 绑定滑动事件
    const oWrapper = this.$element.querySelector('.wrapper')
    const oWidth = document.documentElement.clientWidth
    const util = MIP.util
    if (!oWrapper) {
      return
    }
    util.css(oWrapper, {
      transform: `translateX(-${oWidth}px)`
    })
    let originX, timer
    timer = setInterval(() => {
      util.css(oWrapper, {
        transition: 'transform .5s ease-in-out',
        transform: `translateX(-${oWidth * 2}px)`
      })
      this.initNum('left')
    }, 5000)
    oWrapper.addEventListener('touchstart', e => {
      util.css(oWrapper, {
        transition: ''
      })
      originX = e.touches[0].clientX
      clearInterval(timer)
    })
    oWrapper.addEventListener('touchmove', e => {
      if ((e.changedTouches[0].clientX - originX) > 0) {
        // 手指向右 translate为正
        util.css(oWrapper, {
          transform: `translateX(${-oWidth + e.changedTouches[0].clientX - originX}px)`
        })
      } else {
        util.css(oWrapper, {
          transform: `translateX(${-(oWidth + originX - e.changedTouches[0].clientX)}px)`
        })
      }
    })
    oWrapper.addEventListener('touchend', e => {
      const distance = e.changedTouches[0].clientX - originX
      util.css(oWrapper, {
        transition: 'transform .3s ease-in-out'
      })
      if (distance > 0) { // 手指向右
        if (Math.abs(distance) >= 80) {
          util.css(oWrapper, {
            transform: `translateX(0px)`
          })
          this.initNum('right')
        } else {
          util.css(oWrapper, {
            transform: `translateX(-${oWidth}px)`
          })
        }
      } else {
        if (Math.abs(distance) >= 80) {
          util.css(oWrapper, {
            transform: `translateX(-${oWidth * 2}px)`
          })
          this.initNum('left')
        } else {
          util.css(oWrapper, {
            transform: `translateX(-${oWidth}px)`
          })
        }
      }
      timer = setInterval(() => {
        util.css(oWrapper, {
          transition: 'transform .5s ease-in-out',
          transform: `translateX(-${oWidth * 2}px)`
        })
        this.initNum('left')
      }, 5000)
    })
  },
  methods: {
    _close () {
      this.show = false
      this.bookList[this.book] = {
        isClosed: true,
        day: new Date().getDate(),
        time: new Date().getTime()
      }
      localStorage.setItem('bookList', JSON.stringify(this.bookList))
    },
    getQuery (url) {
      url = url || MIP.util.getOriginalUrl()
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
    },
    _jumpDownload (href) {
      if (MIP.util.platform.isIOS()) {
        window.top.location.href = href.iosHref
      } else {
        window.top.location.href = href.androidHref
      }
    },
    initNum (dis) {
      const oWrapper = this.$element.querySelector('.wrapper')
      const oWidth = document.documentElement.clientWidth
      const util = MIP.util
      let timer
      if (dis === 'right') {
        // 手指向右，数字--
        clearInterval(timer)
        timer = setTimeout(() => {
          util.css(oWrapper, {
            transition: '',
            transform: `translateX(-${oWidth}px)`
          })
          if (this.right === 0) {
            this.right = 3
            this.pre--
            this.next--
            return
          }
          if (this.right === 3) {
            this.right--
            this.pre--
            this.next = 3
            return
          }
          if (this.right === 2) {
            this.right--
            this.pre--
            this.next--
            return
          }
          if (this.pre === 0) {
            this.pre = 3
            this.right--
            this.next--
          }
        }, 300)
      } else {
        clearInterval(timer)
        timer = setTimeout(() => {
          util.css(oWrapper, {
            transition: '',
            transform: `translateX(-${oWidth}px)`
          })
          if (this.right === 0) {
            this.right++
            this.pre = 0
            this.next++
            return
          }
          if (this.right === 3) {
            this.right = 0
            this.pre++
            this.next++
            return
          }
          if (this.right === 2) {
            this.right++
            this.pre++
            this.next = 0
            return
          }
          if (this.pre === 0) {
            this.pre++
            this.right++
            this.next++
          }
        }, 300)
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .main_wrapper {
    width: 100%;
    height: 50px;
    position: relative;
    overflow: hidden;
  }
  .wrapper {
    height: 50px;
    width: 300%;
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
  }
  .hd {
    width: 100%;
    height: 8px;
    position: absolute;
    text-align: center;
    bottom: 2px;
    padding-bottom: 4px;
    ul {
      width: 100%;
      height: 4px;
      line-height: 4px;
      li {
        display: inline-block;
        margin-left: 3px;
        line-height: 4px;
        width: 4px;
        height: 4px;
        background: #9B9B9B;
        border-radius: 4px;
        &.active {
          background: #E0E0E0;
        }
      }
    }
  }
  .bot_bar {
    height: 50px;
    flex: 1;
    background-color: rgba(255, 255, 255, 0.96);
    overflow: hidden;
    position: relative;

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
          width: 18px;
          height: 18px;
        }
      }

      &.logo_icon {
        width: 26px;
        height: 34px;
        top: 8px;
        left: 45px;

        img {
          width: 26px;
          height: 34px;
        }
      }

      &.word_wrapper {
        top: 8px;
        left: 78px;

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
          margin-top: 4px;
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
  }
</style>
