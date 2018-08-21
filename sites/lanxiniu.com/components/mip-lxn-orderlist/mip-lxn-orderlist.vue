<template>
  <div class="wrapper">
    <div>
      <ul >
        <li
          v-show="nodata"
          class="li-nodata">
          暂无数据
        </li>

        <li
          v-for="item in orderList"
          :key="item.OrderNum"
          class="list"
          @click="orderDetail(item)">
          <div >
            <p class="head">
              <span>普通搬家</span>
              <span
                v-if="item.OrderStatus.Desc === '待支付'"
                class="status wait-pay"
                v-text="item.OrderStatus.Desc"/>
              <span
                v-else-if="item.OrderStatus.Desc === '已取消'"
                class="status already-cancel"
                v-text="item.OrderStatus.Desc"/>
              <span
                v-else-if="item.OrderStatus.Desc === '已完成'"
                class="status already-cancel"
                v-text="item.OrderStatus.Desc"/>
              <span
                v-else
                class="status wait-service"
                v-text="item.OrderStatus.Desc"/>

            </p>
            <dl class="detail">
              <dt v-text="item.TransTime"/>
              <dt class="address-dt">
                <span class="dt-des">搬出地址:</span>
                <p v-text="item.poiList[0].deliverAddress"/>
              </dt>
              <dt class="address-dt">
                <span class="dt-des">搬入地址:</span>
                <p v-text="item.poiList[1].deliverAddress"/>
              </dt>
            </dl>
            <div class="head-footer">
              <span
                v-show="item.OrderStatus.isCancelable === 1"
                class="cancel btn"
                @click.stop ="cancelOrder(item)">取消订单</span>
              <a
                v-show="item.OrderStatus.isConnectDriver === 1"
                :href="item.driverInfo.phone"
                @click.stop>
                <span class="normal btn">联系司机</span>
              </a>
              <span
                v-show="item.OrderStatus.isNeedPay === 1"
                class="normal btn"
                @click.stop="payOrder(item)">立即支付</span>
            </div>
          </div>

        </li>

      </ul>
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
        @touchend.stop.prevent="closeLayer">
        <p
          class="btns active-layer"
          @touchend.stop.prevent="sureMethod">先不等了</p>
        <p
          class="btns btns2 active-layer"
          @touchend.stop.prevent="cancelMethod">再等等吧</p>
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
      orderList: [],
      warn: {
        // 弹窗
        show: false,
        texts: ''
      },
      deleteItem: '',
      loading: true,
      nodata: true
    }
  },
  created () {
    console.log('创建数据')
    base.setHtmlRem()
    console.log(this.globaldata)
  },
  mounted () {
    console.log('这里是订单列表页面 !')
    this.$element.customElement.addEventAction('login', (event, str) => {
      console.log('查看用户信息:' + JSON.stringify(event.userInfo, null, 2))

      let interval = setInterval(() => {
        console.log(JSON.stringify(this.userlogin, null, 2))
        if (this.userlogin.sessionId !== '') {
          this.getOrderList()
          clearInterval(interval)
        }
      }, 200)
    })
    if (this.userlogin.sessionId !== '') {
      this.getOrderList()
    }
  },
  methods: {
    // 获取订单列表
    getOrderList () {
      this.showloading()
      console.log('查看登录信息:' + JSON.stringify(this.userlogin, null))

      let sessionid = this.userlogin.sessionId
      let isLogin = this.userlogin.isLogin
      if (isLogin) {
        let updata = {
          token: sessionid,
          pageSize: 30,
          pageIndex: 1
        }
        let urls = base.url + '/Order/list?' + base.setUrlParam(updata)
        fetch(urls, {
          method: 'get'
        })
          .then(response => response.json())
          .catch(error => console.error('Error:', error))
          .then(response => {
            console.log(JSON.stringify(response, null, 2))
            this.hideloading()
            if (response.data.length !== 0) {
              this.nodata = false
              this.orderList = response.data.map(element => {
                if (element.driverInfo.phone) {
                  element.driverInfo.phone = 'tel:' + element.driverInfo.phone
                }
                element.isdefault = false
                return element
              })
            }
          })
      }
    },
    // 取消订单
    cancelOrder (item) {
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
    sureMethod () {
      this.showloading()
      let item = this.deleteItem
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
          this.getOrderList()
        })
    },
    // 查看订单详情
    orderDetail (item) {
      console.log('查看订单详情')
      MIP.viewer.open(base.htmlhref.listdetail + '?OrderNum=' + item.OrderNum, {
        isMipLink: true
      })
    },
    // 支付订单
    payOrder (item) {
      console.log('支付订单')
      //   let sessionid = base.getbaiduLogMsg()
      let sessionid = this.userlogin.sessionId
      let price = item.noPay
      let urlsParam = base.setUrlParam({
        orderNum: item.OrderNum,
        sessionId: sessionid,
        total_fee: price
      })
      let obj = {
        sessionId: sessionid,
        redirectUrl: 'https://www.lanxiniu.com/Pay/success?' + urlsParam,
        fee: price + '元',
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
.wrapper {
  -webkit-overflow-scrolling: touch;
}
.wrapper ul {
  padding-top: 0.24rem;
  min-height: 2rem;
}
.wrapper li {
  background: #ffffff;
  padding: 0.24rem 0.4rem;
  box-shadow: 0 0.02rem 0.04rem 0 rgba(0, 0, 0, 0.1);
  border-radius: 0.04rem;
  margin-bottom: 0.2rem;
}
.wrapper li:first-child {
  margin-top: 0;
}
.wrapper li .head {
  font-size: 0.3rem;
  color: #555555;
  letter-spacing: 0.07px;
  padding-bottom: 0.2rem;
  border-bottom: 0.02rem solid rgba(85, 85, 85, 0.1);
}
li .head .status {
  float: right;
  font-size: 0.28rem;
  letter-spacing: 0.06px;
}
/*待服务*/
.wait-service {
  color: #36a0e9;
}
/*服务中*/
.on-service {
  color: #36a0e9;
}
/*待支付*/
.wait-pay {
  color: #f66060;
}
/*已取消*/
.already-cancel {
  color: #999999;
}
/*已完成*/
.alread-finish {
  color: #999999;
}
.detail {
  padding: 0.28rem 0;
}
.detail dt {
  font-size: 0.28rem;
  color: #666666;
  margin-top: 0.1rem;
}
.address-dt {
  position: relative;
}
.address-dt p {
  padding-left: 1.3rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.dt-des {
  position: absolute;
  left: 0;
}
.head-footer {
  text-align: right;
}
.head-footer span {
  display: inline-block;
  /* height: 0.48rem; */
  /* line-height: 0.6rem; */
  text-emphasis: center;
  border-radius: 0.06rem;
  font-size: 0.28rem;
  padding: .1rem 0.2rem;
  position: relative;
}
.head-footer span:active{
    background: rgba(0, 0, 0, 0.05);
}

.cancel {
  border: 0.02rem solid #a8a8a8;
  color: #777777;
}

.normal {
  border: 0.02rem solid rgba(57, 161, 232, 0.8);
  color: #36a0e9;
  margin-left: 0.2rem;
}

.li-nodata {
  position: absolute;
  left: 0;
  right: 0;
}
</style>
