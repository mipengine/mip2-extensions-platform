<template>
  <div class="wrapper">
    <div class="detail-head">
      <div class="item">当前进度</div>
      <div class="item status">
        <p><span
          class="status-text"
          v-text="detail.OrderStatus.Desc"/></p>
        <p class="status-line"/>
        <p
          class="status-time"
          v-text="detail.flagTime"/>
      </div>
    </div>
    <div
      v-show="hasDriver"
      class="driver">
      <div class="driver-img">
        <img
          :src="driverInfo.picture"
          alt="">
      </div>
      <div class="driver-msg">
        <p>
          <span
            class="name"
            v-text="driverInfo.name"/>
          <span
            class="car-num"
            v-text="driverInfo.carNum"/>
        </p>
        <p class="msg-detail">
          <span
            v-for="item in driverInfo.lables"
            v-show="item !==''"
            :key="item"
            v-text="item"/>

        </p>
      </div>
      <div class="call-driver">
        <a :href="driverInfo.phone">
          <p><span class="img phone"/></p>
          <p>拨打</p>
        </a>

      </div>
    </div>
    <div class="cost">
      <span class="title">费用</span>
      <span class="content"><span v-text="detail.needPay"/> 元</span>
      <span class="order-detail"><a
        href="javascript:void(0)"
        @click="coseDetail(detail)">费用明细</a></span>
    </div>
    <div class="order-list">
      <ul>
        <li>
          <span class="title">搬家时间</span>
          <span v-text="detail.TransTime"/>
        </li>
        <li>
          <span class="title">服务车型</span>
          <span v-text="detail.CarTypeName"/>
        </li>
        <li class="address">
          <div class="left">搬出地址</div>
          <div class="right">
            <p v-text="detail.poiList[0].deliverRemark"/>
            <p v-text="moveOutFloor">有电梯,无楼梯费</p>
          </div>
        </li>
        <li class="address">
          <div class="left">搬入地址</div>
          <div class="right">
            <p v-text="detail.poiList[1].deliverRemark"/>
            <p v-text="moveInFloor">有电梯,无楼梯费</p>
          </div>
        </li>
        <li>
          <span class="title">支付方式</span>
          <span v-text="detail.payInfo.name"/>
        </li>
        <li>
          <span class="title">订单备注</span>
          <span v-text="detail.remark">小面</span>
        </li>
        <li>
          <span class="title">订单号码</span>
          <span v-text="detail.OrderNum"/>
        </li>

      </ul>
    </div>
    <div class="options">
      <span
        v-show="detail.OrderStatus.isCancelable === 1"
        class="cancel"
        @click.stop ="cancelOrder(detail)">取消订单</span>
      <a
        v-show="detail.OrderStatus.isConnectDriver === 1"
        :href="driverInfo.phone"
        @click.stop>
        <span class="normal">联系司机</span>
      </a>
      <span
        v-show="detail.OrderStatus.isNeedPay === 1"
        class="order-again"
        @click.stop="payOrder(detail)">立即支付</span>

    </div>

    <div
      v-show="warn.show"
      class="layer"
      @touchstart.prevent/>
    <div
      v-show="warn.show"
      class="layer-content layer-content-explain zoomIn">
      <div class="order-cancel">
        <p class="title-cancel">取消订单</p>
        <p
          class="title-content"
          v-text="warn.texts"/>
      </div>
      <div
        class="layer-sure"
        @click="closeLayer">
        <p
          class="btns active-layer"
          @click="sureMethod(detail)">先不等了</p>
        <p
          class="btns btns2 active-layer"
          @click="cancelMethod">再等等吧</p>
      </div>
    </div>

    <div
      v-if="loading"
      class="mip-loading-box">
      <div class="point-span">
        <span class="point-first"/><span class="point-second"/><span class="point-last"/>
      </div>
    </div>
  </div>
</template>

<script>
import base from '../../common/utils/base'
import '../../common/utils/base.less'
export default {
  props: {
    globaldata: {
      type: Object,
      default: function () { return {} }
    },
    payConfig: {
      type: Object,
      default: function () { return {} }
    },
    userlogin: {
      type: Object,
      default: function () { return {} }
    }
  },
  data () {
    return {
      detail: {
        OrderStatus: {
          Desc: '请求中'
        },
        poiList: [
          {
            deliverRemark: ''
          },
          {
            deliverRemark: ''
          }
        ],
        payInfo: {
          name: ''
        }
      },
      moveOutFloor: '', // 搬出楼层
      moveInFloor: '', // 搬入楼层
      hasDriver: false,
      driverInfo: {},
      warn: {
        // 弹窗
        show: false,
        texts: ''
      },
      loading: false
    }
  },
  created () {
    base.setHtmlRem()
  },
  mounted () {
    this.$element.customElement.addEventAction('login', (event, str) => {
      let interval = setInterval(() => {
        console.log(JSON.stringify(this.userlogin, null, 2))
        if (this.userlogin.sessionId !== '') {
          this.getRequest()
          clearInterval(interval)
        }
      }, 200)
      console.log('查看用户信息:' + JSON.stringify(event, null, 2))
    })

    if (this.userlogin.sessionId !== '') {
      console.log('已经登录')
      console.log('直接调起数据')
      this.getRequest()
    } else {
      console.log('未登录')
    }
  },
  methods: {
    getOrderDetail (item) {
      this.showloading()
      let sessionid = this.userlogin.sessionId
      console.log('查看用户sessionId:' + sessionid)
      let updata = {
        token: sessionid,
        orderNum: item.OrderNum
      }
      let urls = base.url + '/Order/detail?' + base.setUrlParam(updata)
      fetch(urls, {
        method: 'get'
      })
        .then(response => response.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
          console.log(response)
          this.hideloading()
          this.detail = response.data
          console.log(this.detail)
          let floorData = [
            '有电梯',
            '无电梯1楼',
            '无电梯2楼',
            '无电梯3楼',
            '无电梯4楼',
            '无电梯5楼',
            '无电梯6楼',
            '无电梯7楼',
            '无电梯8楼'
          ]
          this.driverInfo = response.data.driverInfo
          this.detail = response.data
          this.moveOutFloor = floorData[this.detail.start_stairs_num]
          this.moveInFloor = floorData[this.detail.end_stairs_num]
          if (Number(this.driverInfo.did) !== 0) {
            this.hasDriver = true
            this.driverInfo.phone = 'tel:' + this.driverInfo.phone
          }
        })
    },
    getRequest () {
      let url = location.search // 获取url中"?"符后的字串
      console.log('查看url:' + url)
      let theRequest = {}
      if (url.indexOf('?') !== -1) {
        let str = url.substr(1)
        let strs = str.split('&')
        for (let i = 0; i < strs.length; i++) {
          theRequest[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1])
        }
      }
      this.getOrderDetail(theRequest)
    },
    // 取消订单
    cancelOrder (item) {
      console.log(item.OrderNum)
      console.log('订单号:' + item.OrderNum)
      this.showloading()
      this.deleteItem = item
      //   let sessionid = base.getbaiduLogMsg()
      let sessionid = this.userlogin.sessionId
      let updata = {
        token: sessionid,
        orderNum: item.OrderNum
      }

      // 判断当前订单取消的费用
      let urlsprice = base.url + '/Order/cancelWin?' + base.setUrlParam(updata)

      fetch(urlsprice, {
        method: 'get'
      })
        .then(response => response.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
          this.hideloading()
          this.warn.show = true
          this.warn.texts = response.data.tips
        })
    },
    // 取消删除
    cancelMethod () {
      this.warn.show = false
    },
    // 确认删除
    sureMethod (item) {
      //   let item =   this.deleteItem;
      this.showloading()
      //   let sessionid = base.getbaiduLogMsg()
      let sessionid = this.userlogin.sessionId
      let updata = {
        token: sessionid,
        orderNum: item.OrderNum
      }
      let urls = base.url + '/Order/cancel?' + base.setUrlParam(updata)
      fetch(urls, {
        method: 'get'
      })
        .then(response => response.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
          console.log(response)
          this.hideloading()
          this.warn.show = false
          this.getOrderDetail(item)
        })
    },
    // 立即支付
    payOrder (item) {
      console.log(item.OrderNum)
      console.log('支付订单')
      //   let sessionid = base.getbaiduLogMsg()
      let sessionid = this.userlogin.sessionId
      let urlsParam = base.setUrlParam({
        orderNum: item.OrderNum,
        sessionId: sessionid,
        total_fee: item.needPay
      })

      let obj = {
        sessionId: sessionid,
        redirectUrl: 'https://www.lanxiniu.com/Pay/success?' + urlsParam,
        fee: item.needPay + '元',
        postData: {
          orderNum: item.OrderNum,
          token: sessionid
        }
      }
      MIP.setData({
        payConfig: MIP.util.fn.extend({}, this.payConfig, obj)
      })
      this.$emit('actionPay', {})
    },
    coseDetail (item) {
      // let orderNumber = item.
      MIP.viewer.open(base.htmlhref.costdetail + '?OrderNum=' + item.OrderNum, {
        isMipLink: true
      })
    },
    showloading () {
      this.loading = true
    },
    hideloading () {
      this.loading = false
      let that = this
      setTimeout(function () {
        that.loading = false
      }, 500)
    }
  }
}
</script>

<style scoped>

.wrapper{
    width: 1px;
    min-width: 100%;
}
.detail-head {
  display: flex;
  height: 1.72rem;
  background: #36a0e9;
  align-items: center;
}
.detail-head .item {
  flex: 1;
  text-align: center;
  align-items: center;
  color: #ffffff;
  font-size: 0.3rem;
  letter-spacing: 0.07px;
}
.detail-head .status {
  flex: 2;
  text-align: left;
  font-size: 0.32rem;
}
.status-text {
  display: inline-block;
  /* padding-bottom: .1rem; */
}
.status-line {
  height: 0.02rem;
  width: 2.6rem;
  margin: 0.14rem 0;
  background: rgba(255, 255, 255, 0.3);
}
.status-time {
  font-size: 0.24rem;
}
.driver {
  margin-top: 0.2rem;
  padding: 0.28rem 0.4rem;
  background: #ffffff;
  position: relative;
}
.driver-img {
  float: left;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  /* background: red; */
  overflow: hidden;
  margin-right: 0.3rem;
}
.driver-msg p:first-child {
  padding-top: 0.09rem;
}
.name {
  font-size: 0.28rem;
  color: #333333;
  letter-spacing: 0.07px;
}
.car-num {
  font-size: 0.24rem;
  color: #666666;
  letter-spacing: 0.06px;
  margin-left: 0.1rem;
}
.msg-detail {
  margin-top: 0.1rem;
}
.msg-detail span {
  display: inline-block;
  padding: 0.02rem 0.12rem;
  background: #36a0e9;
  border-radius: 2px;
  font-size: 0.22rem;
  color: #ffffff;
  margin-right: 0.1rem;
}
.call-driver {
  float: right;
  position: absolute;
  top: 0.35rem;
  right: 0.5rem;
  font-size: 0.2rem;
  color: #888888;
}
.call-driver p {
  text-align: center;
}
.cost {
  margin-top: 0.2rem;
  background: #ffffff;
  color: #555555;
  font-size: 0.28rem;
  padding: 0.24rem 0.4rem;
  /* padding-right: 0; */
}
.title {
  text-align: justify;
  text-justify: distribute-all-lines;
  text-align-last: justify;
  display: inline-block;
  width: 1.13rem;
  margin-right: 0.81rem;
  font-size: 0.28rem;
}
.cost .content {
  color: #e46766;
}
.order-detail {
  float: right;
}
.order-detail a {
  font-size: 0.24rem;
  color: #36a0e9;
  position: relative;
  padding-right: 0.3rem;
  display: inline-block;
  /* background: red; */
}
.order-detail a::after {
  top: 0.05rem;
  right: 0;
  content: "";
  position: absolute;
  display: inline-block;
  width: 0.15rem;
  height: 0.15rem;
  border: 0.03rem solid #36a0e9;
  border-left: none;
  border-bottom: none;
  transform: rotate(45deg);
}
.order-list {
  background: #ffffff;
  margin-top: 0.2rem;
}
.order-list ul {
  padding: 0 0.4rem;
  color: #555555;
  width: 100%;
}
.order-list ul li {
  width: 100%;
  font-size: 0.28rem;
  padding: 0.24rem 0;
  border-bottom: 0.02rem solid #f4f4f4;
}
.order-list li:last-child {
  border-bottom: none;
}

.address {
  display: flex;
  align-items: center;
  padding: 0.6rem 0 !important;
}

.address .left {
  width: 2.9rem !important;
}
.address .right {
  width: 100%;
  text-align: left;
  /* background: red; */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.address .right p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.address .right p:last-child {
  margin-top: 0.05rem;
  font-size: 0.24rem;
  color: #777777;
}
.options {
  margin: 0.16rem 0.4rem;
  margin-bottom: 0.3rem;
  text-align: right;
}
.options span {
  display: inline-block;
  padding: 0.15rem 0.3rem;
  border: 0.02rem solid #a8a8a8;
  border-radius: 0.06rem;
  margin-left: 0.2rem;
}
.options .order-again {
  color: #ffffff;
  border: none;
  background: #36a0e9;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.3);
}

</style>
