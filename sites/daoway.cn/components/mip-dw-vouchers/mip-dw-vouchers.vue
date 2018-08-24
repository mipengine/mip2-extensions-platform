<template>
  <div class="wrapper">
    <div class="div">
      <div
        v-for="c in coupone"
        :key="c"
        :info="c"
        class="list"
        @click="back(c)">
        <img
          class="vimg"
          src="http://www.daoway.cn/mip/common/images/vouchersbg1.jpg"
          style="width:344px; height:86px">
        <div class="tit">{{ c.categoryName }}</div>
        <div class="vname">{{ c.name }}</div>
        <div class="vn">{{ c.note }}</div>
        <div class="time">有效期{{ c.startTime }}至{{ c.endTime }}</div>
        <div class="nub">
          <div class="yang">¥</div>
          <div class="yuan">{{ c.bill }}</div>
        </div>
      </div>
      <img
        v-if="unableCoupone.length > 0"
        class="fenge"
        src="http://www.daoway.cn/mip/common/images/fengexian.jpg"
        style="width:343px; height:12px">
      <div
        v-for="u in unableCoupone"
        :key="u"
        class="list gray">
        <img
          class="vimg"
          src="http://www.daoway.cn/mip/common/images/vouchersbg2.jpg"
          style="width:344px; height:86px">
        <div class="tit">{{ u.categoryName }}</div>
        <div class="vname">{{ u.name }}</div>
        <div class="vn">{{ u.note }}</div>
        <div class="time">有效期{{ u.startTime }}至{{ u.endTime }}</div>
        <div class="nub">
          <div class="yang">¥</div>
          <div class="yuan">{{ u.bill }}</div>
        </div>
      </div>
    </div>
    <mip-fixed
      type="bottom"
      @touchend="back">
      <button class="btn3">不使用代金券</button>
    </mip-fixed>

    <div
      v-if="noquan"
      class="noquan">
      <img
        src="http://www.daoway.cn/mip/common/images/coupon.png"
        style="width:200px; height:200px">
      <div class="classname">暂无可用代金券</div>
    </div>
  </div>
</template>
<script>
import base from '../../common/utils/base'
import '../../common/utils/base.less'
export default {
  data () {
    return {
      requestUrl: '',
      warn: {
        // 弹窗
        show: false,
        texts: ''
      },
      noquan: false,
      coupone: [],
      unableCoupone: [],
      userId: localStorage.getItem('mipUserId'),
      channel: 'baidu'
    }
  },

  mounted () {
    if (base.getRequest(location.href).requestUrl) {
      this.requestUrl = JSON.parse(decodeURIComponent(base.getRequest(location.href).requestUrl))
    } else {
      this.requestUrl = ''
    }
    this.getCoupone()
  },
  methods: {
    getCoupone () {
      let that = this
      let serviceId = that.requestUrl.serviceId || null
      let priceIds = that.requestUrl.priceIds
      let url = '/daoway/rest/coupon/user/' + that.userId + '?serviceId=' + serviceId + '&ignoreMinBill=true&channel=' + that.channel
      let bill = that.requestUrl ? that.requestUrl.bill : null
      if (bill) {
        url += '&bill=' + bill
      }
      if (priceIds) {
        url += '&priceIds=' + priceIds
      }
      fetch(url, {
        method: 'get', credentials: 'include'
      }).then(function (res) {
        return res.json()
      }).then(function (text) {
        let datas = text.data
        if (datas.length > 0) {
          let coupone = []
          let unableCoupone = []
          for (let i = 0; i < datas.length; i++) {
            let data = datas[i]
            data.endTime = base.timeformat(data.endTime, 'yyyy-MM-dd')
            data.startTime = base.timeformat(data.startTime, 'yyyy-MM-dd')
            if (bill && bill < data.minBill) {
              unableCoupone.push(data)
            } else {
              coupone.push(data)
            }
          }
          that.coupone = coupone
          that.unableCoupone = unableCoupone
        } else {
          that.noquan = true
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    back (c) {
      // MIP.setData(c);
      sessionStorage.setItem('coupone', JSON.stringify(c))
      MIP.viewer.page.back()
    }

  }
}
</script>
<style scoped>
  .wrapper {
    margin: 0 auto;
  }
  .div {
    width: 94%;
    margin: 0 3% 55px;
  }

  .list {
    width: 100%;
    height: 86px;
    position: relative;
    margin-top: 10px;
  }

  .vimg {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
  }

  .tit {
    padding: 0 2px;
    background: #35bee5;
    color: #fff;
    width: 75px;
    border-radius: 0 10px 10px 0;
    font-size: 14px;
    margin-top: 10px;
    text-align: center;
    height: 15px;
    line-height: 15px;
  }

  .vname, .vn, .time {
    margin-left: 5px;
    margin-top: 5px;
  }

  .vn {
    color: #898989;
    font-size: 12px;
  }

  .time {
    font-size: 12px;
    color: #898989;
    position: absolute;
    bottom: 3px;
  }

  .nub {
    position: absolute;
    top: 23px;
    right: 30px;
  }

  .nub div {
    display: inline;
    color: #35bee5;
  }

  .yuan {
    font-size: 40px;
    font-weight: bold;
  }

  .yang {
    margin-right: 8px;
  }

  .fenge {
    margin-top: 68px;
  }

  .gray .tit {
    background: #cecece;
  }

  .gray .yuan, .gray .yang {
    color: #cecece;
  }

  .btn3 {
    width: 100%;
    font-size: 14px;
    padding: 10px 0;
    background: #fff;
    color: #4c4c4c;
    border: none;
    border-top: 1px solid #ccc;
  }

  .noquan {
    text-align: center;
  }

  .noquan {
    margin-top: 40%;
  }

  .noquan div {
    position: relative;
    bottom: 60px;
    font-size: 14px;
    color: #ccc;
  }

</style>
