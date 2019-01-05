<template>
  <div
    :style="showNotice?'max-height:110px;':'max-height:0;'"
    :class="['notice',absolute?'notice-absolute':'']">
    <div
      class="notice-content"
      @click="handleTapNotice">
      <div
        :style="showNotice?'':'animation:none;'"
        class="notice-text">
        {{ noticeData.Title }}：{{ noticeData.Alert }}
      </div>
    </div>
    <div
      class="notice-close"
      @click="handleCloseNotice">
      <mip-img
        src="https://app.s4s.cn/razio/close.png"
        style="width:30rpx;height:30rpx;" />
    </div>
  </div>

</template>

<script>
import util from '../../common/util'

export default {
  props: {
    notice: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      noticeData: {},
      showNotice: false,
      absolute: true
    }
  },
  prerenderAllowed () {
    return true
  },
  mounted () {
    if (this.notice) {
      this.absolute = false
      console.log(this.absolute)
    }
    this.getCommonNotice()
  },
  methods: {
    handleTapNotice () {
      if (this.noticeData.Type === 1) {
      // h5
        window.location.href = this.noticeData.Link
      } else if (this.noticeData.Type === 3) {
      // tanchuang
        // this.$showModal({
        //   title: this.noticeData.Title,
        //   content: this.noticeData.Alert,
        //   confirmText: '我知道了'
        // })
      }
    },
    handleCloseNotice () {
      this.showNotice = false
    },
    getCommonNotice () {
      util.fetchData('v5/notify/query', {
        app: 'vio',
        channel: 'xzapp'
      }).then((res) => {
        console.log(res)
        if (res.code === 0 && res.data) {
          res.data.forEach((item) => {
            if (item.Tab === 'index' && item.Notify && item.Notify.Alert && item.Notify.Title) {
              setTimeout(() => {
                this.noticeData = item.Notify
                this.showNotice = true
              }, 1000)
              console.log(item.Notify, 'item.Notifyitem.Notify')
            }
          })
        }
      })
    }
  }
}
</script>

<style scoped>

.notice {
  width: 100%;
  background: rgba(255, 237, 151, 0.75);
  font-size: 15px;
  display: flex;
  white-space: nowrap;
  z-index: 999;
  z-index: 99999;
  transition: top 1800ms;
  padding-left: 15px;
  box-sizing: border-box;
  transition: all 1s ease;
    overflow: hidden;

}
.notice-absolute {
  position: absolute;
}
.notice-content {
  overflow: hidden;
  width: 100%;
  padding: 10px 0;
}
.notice-text {
  color: rgb(97, 92, 68);
  line-height: 1;
  position: relative;
  width: 100%;
  animation:notice 20s linear infinite;
  animation-delay:4s;
}
.notice-close {
  line-height: 1;
  padding: 10px 15px;
  display: flex;
  align-items: center;
}

@keyframes notice {
0% {
    margin-left:0rpx;
  }
30% {
    margin-left:0rpx;
  }
90% {
    margin-left:-140%;
  }
100% {
    margin-left:-140%;
  }
}

</style>
