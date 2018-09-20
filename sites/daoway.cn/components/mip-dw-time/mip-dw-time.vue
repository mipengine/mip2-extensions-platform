<template>
  <div class="wrapper">
    <mip-fixed type="top">
      <div class="t-nav">
        <div class="data">
          <div
            v-for="(t,index) in timeary"
            :key="t"
            :class="{atv:inds == index}"
            class="item"
            @touchend="getime(index)">{{ t.week }}
            <div
              class="datanum"
              v-text="t.day"/>
          </div>
        </div>
      </div>
    </mip-fixed>
    <div class="t-box">
      <div
        v-for="(m,index) in timeary[tab].times"
        :key="m"
        :class="{man:m.busy,activity:dis == index }"
        class="time"
        @touchend="getli(index)">{{ m.time }}</div>
    </div>
    <mip-fixed
      class="fixbotm"
      type="bottom">
      <div class="t-footer">
        <div class="beizhu">实际到达时间可能会有30分钟的浮动</div>
        <button
          class="t-btn"
          @touchend="sure()">确定选择</button>
      </div>
    </mip-fixed>
    <div
      v-show="warn.show"
      class="layer">
      <div class="layer-content zoomIn">
        <p
          class="layer-text"
          v-text="warn.texts"/>
        <p
          class="layer-sure active-layer"
          @touchend="closeLayer">知道了</p>
      </div>
    </div>

  </div>
</template>

<script>
import base from '../../common/utils/base'
import '../../common/utils/base.less'
export default {
  data () {
    return {
      parm: JSON.parse(decodeURIComponent(base.getRequest(location.href).parm)),
      warn: {
        // 弹窗
        show: false,
        texts: ''
      },
      inds: 0,
      timeary: [],
      tab: 0,
      dis: null,
      channel: 'baidu'
    }
  },
  mounted () {
    this.timelist()
  },
  methods: {
    timelist () {
      let that = this
      let parm = that.parm
      let position = base.getposition()
      let communityId = position.id || position.communityId
      let url = '/daoway/rest/service/' + parm.serviceId + '/appointable_times?includeBusyFlag=true&channel=' + that.channel + '&manualCity=' + encodeURIComponent(position.city) + '&lot=' + position.lot + '&lat=' + position.lat + '&communityId=' + communityId
      if (parm.street) {
        url += '&street=' + encodeURIComponent(parm.street)
      }
      if (parm.house) {
        url += '&house=' + encodeURIComponent(parm.house)
      }
      if (parm.priceId) {
        url += '&priceId=' + parm.priceId
      }
      if (parm.quantity) {
        url += '&quantity=' + parm.quantity
      }
      fetch(url, {
        method: 'get'
      }).then(function (res) {
        return res.json()
      }).then(function (text) {
        let datas = text.data
        for (let i = 0, len = datas.length; i < len; i++) {
          let data = datas[i]
          data.week = base.timeformat(data.date, 'day')
          data.day = base.timeformat(data.date, 'MM-dd')
          that.timeary.push(data)
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    getime (index) {
      let that = this
      that.inds = index
      that.tab = index
    },
    getli (index) {
      this.dis = index
    },
    sure () {
      let that = this
      let tab = that.timeary[that.tab]
      let dis = tab.times[that.dis].time
      let date = base.timeformat(tab.date, 'yyyy/MM/dd')
      let appointTime = new Date(date + ' ' + dis).getTime()
      sessionStorage.setItem('apptime', appointTime)
      MIP.viewer.page.back()
    }
  }
}
</script>

<style scoped>
.wrapper {
  margin: 0 auto;
  text-align: center;
}

.t-nav {
  width: 100%;
  height: 60px;
  background: #fff;
  overflow-x: scroll;
}

.data {
  width: 3400px;
}

.item {
  width:45px;
  margin: 0 5px;
  text-align: center;
  height: 55px;
  line-height: 20px;
  float: left;
  padding: 6px 0 0;
}

.atv {
  border-bottom: 2px solid #f34e55;
  color: #f34e55;
}

.datanum {
  font-size: 14px;
}

.t-box {
  margin: 70px 0 auto 0;
  width:100%;
  height: 80%;
  overflow-y: scroll;
  text-align: left;
}
.fixbotm{
  bottom: 10px;
}

.time {
  width: 21%;
  display: inline-block;
  text-align: center;
  height: 33px;
  line-height: 33px;
  border: 1px solid #ececec;
  color: #4c4c4c;
  background: #fff;
  border-radius: 3px;
  margin: 1% 1.5%;
  position: relative;
  overflow: hidden;
}

.activity {
  color: #dc7d77;
  border: 1px solid #dc7d77;
  background: #fef4f3;
}

.beizhu {
  color: #878787;
  width: 100%;
  padding-bottom: 10px;
  font-size: 14px;
}

.man {
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAxCAYAAACcXioiAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDY3IDc5LjE1Nzc0NywgMjAxNS8wMy8zMC0yMzo0MDo0MiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MzM3MzQzOEVCQjBFMTFFNkI0MzhBRDU2ODRCQUQ0RTYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MzM3MzQzOEZCQjBFMTFFNkI0MzhBRDU2ODRCQUQ0RTYiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozMzczNDM4Q0JCMEUxMUU2QjQzOEFENTY4NEJBRDRFNiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDozMzczNDM4REJCMEUxMUU2QjQzOEFENTY4NEJBRDRFNiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PozKx/oAAANySURBVHja1JjdThpREMePKEarQYHwJXAjiaG94B1o6DP0FZr0pXrbZ2hTb7xrbQuxhZZgSCAQKh/FaCQSbc9/c4bswn6wy+7K+ScD7rCL5zczZ+aEjXK5XGCMxZlc+setyq2zxV8m3N5xS0sGMeX2OsBffnN7CRrJAILc3gTEBSCKEkI8C6gupMxEYO76l4DouvHlm5ubbHd31/DzZDLJcrmcxnd0dLTgswNAEEU3IBKJBDs+PmaRSGQGZKXHx0fDYOhpg7dRo+/Kc/vELbUKRDabZeFwmHW7XWUR8bizjn15eclubm7m3WdmAARximy7AdFut9n9/f3MDx9KrNPpmPqgu7s79vDwsACwZfG/a6KcVoJotVpsMpmw4XCo8e/v77Pt7W1NZPV8ZrLKAOm5KKekl5vaTAZAlhkgVUV3WhoCC0U0r66uND5saieqVCorZUCdCZRTwupGdJ5MJsNub29Zs9nUq19FJycnSr1ThNFCr6+vNeAmOgvYDERV7Ime1Y2o93q9rpRNPp9XsqGnnZ2dBR827LKymwHSC1FOiWXqHsMJUR2Px8rwsttKDVqorT0wr59iT5xaHcVROuhCaqGsGo2G8nehUGC1Wm3WXnGtXjCu7U5iOxAopz9Ov4A6Ei2epq2dEloFQJ0JUwjUfywWMwSgd9ondPTwAwD6ISAM2wamK2xeoVBIGXCY1NDe3p5SXtgjy84LNwAIoqgHgbLAQkejkcaPaQs/WizuQYYODg5Yv99ng8FgBuUXgGEmsCgscP4YgZMqoFD/mAPBYFDxo1NhBuAZdCw/AaCLeQhaqHqQofcj+nRgAwRKrNfrzToXPjMafl4CaCAQQUSWFkZC3aNV0gJRTpgT6ixRJqy0xbzRRTqdfnt4ePieR39DfYTWm7ZYLIxg0I30nvETgEWj0Q88wuc8+ji9Rew8m0qlZjNhOp2azgWnRwk7wij9yC1GEcbi7AwrNw9zjk7C3F7RxkZpuLR4zzaxnsoCou/1zypeQ5TchvATwJNM+A0AfRcQA1kBCKLkBsRTAbgG8ZQArpTTUwNA3wTEUFYAgig5gVgXAMeZWCcA6KuAGMkKQBClZSHWEcBWJtYVADoXEH9lBSCIkhnEugNYQsgAYFpOsgBAXwTEWFYAgiipIWQDWMiEjADQZ4Lw42cVLxX/L8AA59NvcWAJN5QAAAAASUVORK5CYII=);
  background-repeat: no-repeat;
  background-position: top right;
  background-size: 30% 80%;
}

.t-footer{
  width: 100%;
  text-align: center;
}
  .t-btn{
    width: 90%;
    height: 40px;
    line-height: 40px;
    background: #f34e55;
    color: #fff;
    border: none;
    border-radius: 4px;
  }
</style>
