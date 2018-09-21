<template>
  <div class="wrapper">
    <div class="stabox">
      <div class="state">
        <div class="icon">
          <img
            :src="orderhtml.images1"
            class="od-icon1">
          <img
            :src="orderhtml.line1"
            class="line">
          <img
            :src="orderhtml.images2"
            class="od-icon1"
            style="width:24px; height:auto">
          <img
            :src="orderhtml.line2"
            class="line">
          <img
            :src="orderhtml.images3"
            class="od-icon1">
          <img
            :src="orderhtml.line3"
            class="line">
          <img
            :src="orderhtml.images4"
            class="od-icon1">
        </div>
        <div class="statetit">
          <div
            :class="{act: orderhtml.images1=='https://www.daoway.cn/mip/common/images/11_03.png'}"
            style="margin-left:0"
            class="tit">{{ orderhtml.status1 }}
            <div class="time">{{ orderhtml.time1 }}</div>
          </div>
          <div
            :class="{act: orderhtml.images2=='https://www.daoway.cn/mip/common/images/11_03.png'}"
            class="tit">{{ orderhtml.status2 }}
            <div class="time">{{ orderhtml.time2 }}</div>
          </div>
          <div
            :class="{act: orderhtml.images3=='https://www.daoway.cn/mip/common/images/11_03.png'}"
            class="tit">{{ orderhtml.status3 }}
            <div class="time">{{ orderhtml.time3 }}</div>
          </div>
          <div
            :class="{act: orderhtml.images4=='https://www.daoway.cn/mip/common/images/11_03.png'}"
            class="tit">{{ orderhtml.status4 }}
            <div class="time">{{ orderhtml.time4 }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="bigdiv">
      <div class="buchajia">
        <div class="name">{{ orderhtml.serviceTitle }}</div>
      </div>
      <div
        v-for="i in orderhtml.items"
        :key="i"
        class="xiangmu"
        style="line-height: 60px;height: 60px;">
        <div class="xtit">{{ i.name }}</div>
        <div>×{{ i.quantity }}</div>
        <div class="price">{{ i.price.toFixed(2) }}元</div>
      </div>
      <div
        v-if="orderhtml.allStatusPartReturnOrder && orderhtml.allStatusPartReturnOrder.status == 'RETURNED' "
        class="xiangmu small">
        <div class="xtit">退款金额</div>
        <div class="price red">-{{ orderhtml.allStatusPartReturnOrder.bill.toFixed(2) }}元</div>
      </div>
      <div
        v-if="orderhtml.allStatusAppendOrder"
        class="xiangmu small">
        <div class="xtit">补差价</div>
        <div class="price">{{ orderhtml.allStatusAppendOrder.toFixed(2) }}元</div>
      </div>
      <div
        v-if="orderhtml.fixFee && orderhtml.fixFee>0"
        class="xiangmu small">
        <div class="xtit">上门费</div>
        <div class="price">{{ orderhtml.fixFee.toFixed(2) }}元</div>
      </div>
      <div
        v-if="orderhtml.extraFee && orderhtml.extraFee>0"
        class="xiangmu small">
        <div class="xtit">增项费用</div>
        <div class="price">{{ orderhtml.extraFee.toFixed(2) }}元</div>
      </div>
      <div
        v-if="orderhtml.couponBill && orderhtml.couponBill>0"
        class="xiangmu small">
        <div class="xtit">代金券</div>
        <div class="price red">-{{ orderhtml.couponBill.toFixed(2) }}元</div>
      </div>
      <div
        class="xiangmu small"
        style="border-bottom:none">
        <div
          v-if="orderhtml.statusId == '9'"
          class="price">待付金额:
          <div class="red">{{ bill }}元</div>
        </div>
        <div
          v-else
          class="price">实付金额:
          <div class="red">{{ bill }}元</div>
        </div>
      </div>
    </div>
    <div class="address">
      <div class="user">{{ orderhtml.contactPerson }}
        <div class="phone">{{ orderhtml.buyerPhone }}</div>
      </div>
      <div class="city">{{ orderhtml.address }}
      </div>
    </div>
    <div class="bigdiv bigd">
      <div
        class="buchajia"
        style="height:45px; line-height:45px">订单信息</div>
      <div class="xiangmu">
        <div class="xtit2">预约时间:</div>
        <div class="red">{{ orderhtml.formatTime }}</div>
      </div>
      <div
        v-if="orderhtml.tv"
        class="xiangmu">
        <div class="xtit2">服务人员:</div>
        <div>{{ orderhtml.tv.name }}</div>
      </div>
      <div class="xiangmu noborder">
        <div class="xtit2">订单备注:</div>
        <div>{{ orderhtml.note||"" }}</div>
      </div>
    </div>
    <div class="footer">
      <mip-fixed
        class="mipfds"
        type="bottom">
        <div class="call">
          <a :href="'tel:' + sellerPhone">
            <img src="https://www.daoway.cn/call.png">联系商家
          </a>
        </div>
        <div class="rightbtn">
          <button
            v-if="orderhtml.button2"
            @click="buybtn(orderhtml.button2)">{{ orderhtml.button2.text }}</button>
          <button
            v-if="orderhtml.button1"
            class="bgred"
            @click="buybtn(orderhtml.button1)">{{ orderhtml.button1.text }}</button>
        </div>
      </mip-fixed>
    </div>
    <!--提示-->
    <div
      v-show="warn.show"
      class="layer">
      <div class="layer-content zoomIn">
        <p
          class="layer-text"
          v-text="warn.texts"/>
        <div class="theclose">
          <p
            v-if="sure"
            class="layer-sure active-layer"
            @click="close">取消</p>
          <p
            v-if="sure"
            class="layer-sure active-layer"
            @click="closeLayer">确定</p>
        </div>
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
      orderId: base.getRequest(location.href).orderId,
      friendId: '',
      orderhtml: {},
      bill: 0,
      warn: {
        // 弹窗
        show: false,
        texts: ''
      },
      action: '',
      sure: true,
      channel: 'mip',
      userId: localStorage.getItem('mipUserId'),
      token: localStorage.getItem('mipToken'),
      oauthCode: '',
      tradeType: '',
      returnurl: base.htmlhref.orderdetail,
      sellerPhone: '',
      quantity: '',
      serviceId: ''
    }
  },
  mounted () {
    this.getState()
    let that = this
    if (MIP.util.platform.isWechatApp()) { // 在微信里
      let wxcode = base.getRequest(location.href).code
      if (wxcode) {
        that.oauthCode = wxcode
        that.tradeType = 'JSAPI'
      }
    } else {
      that.oauthCode = ''
      that.tradeType = 'MWEB'
    }
  },
  methods: {
    getState () {
      let that = this
      let url = 'https://www.daoway.cn/daoway/rest/order/' + that.orderId + '?userId=' + that.userId + '&channel=' + that.channel
      fetch(url, {
        method: 'get',
        credentials: 'include'
      }).then(function (res) {
        return res.json()
      }).then(function (text) {
        if (text.status === 'ok') {
          let data = text.data
          that.quantity = data.items[0].quantity
          that.serviceId = data.serviceId
          that.friendId = data.sellerId
          that.sellerPhone = data.sellerPhone
          data.formatTime = base.timeformat(data.appointTime, 'yyyy-MM-dd(day) HH:mm')
          // let paid = data.paid
          let statusId = data.statusId
          switch (statusId) {
            case '9': // 待付款
              data.status1 = '等待付款'
              data.status2 = '商家接单'
              data.status3 = '上门服务'
              data.status4 = '确认完成'
              data.images1 = 'https://www.daoway.cn/mip/common/images/11_03.png'
              data.line1 = 'https://www.daoway.cn/mip/common/images/line2.png'
              data.images2 = 'https://www.daoway.cn/mip/common/images/yuan.png'
              data.line2 = 'https://www.daoway.cn/mip/common/images/line2.png'
              data.images3 = 'https://www.daoway.cn/mip/common/images/yuan.png'
              data.line3 = 'https://www.daoway.cn/mip/common/images/line2.png'
              data.images4 = 'https://www.daoway.cn/mip/common/images/yuan.png'
              data.button1 = {
                text: '立即支付',
                action: 'pay'
              }
              data.button2 = {
                text: '取消订单',
                action: 'cancelBtn'
              }
              break
            case '0': // 下单成功
              data.status1 = '下单成功'
              data.status2 = '商家接单'
              data.status3 = '上门服务'
              data.status4 = '确认完成'
              data.images1 = 'https://www.daoway.cn/mip/common/images/11_03.png'
              data.line1 = 'https://www.daoway.cn/mip/common/images/line3.png'
              data.images2 = 'https://www.daoway.cn/mip/common/images/yuan.png'
              data.line2 = 'https://www.daoway.cn/mip/common/images/line2.png'
              data.images3 = 'https://www.daoway.cn/mip/common/images/yuan.png'
              data.line3 = 'https://www.daoway.cn/mip/common/images/line2.png'
              data.images4 = 'https://www.daoway.cn/mip/common/images/yuan.png'
              data.button2 = {
                text: '取消订单',
                action: 'cancelBtn'
              }
              break
            case '1': // 卖家已确认
              data.status1 = '下单成功'
              data.status2 = '商家接单'
              data.status3 = '上门服务'
              data.status4 = '确认完成'
              data.images1 = 'https://www.daoway.cn/mip/common/images/11_03.png'
              data.line1 = 'https://www.daoway.cn/mip/common/images/line3.png'
              data.images2 = 'https://www.daoway.cn/mip/common/images/11_03.png'
              data.line2 = 'https://www.daoway.cn/mip/common/images/line3.png'
              data.images3 = 'https://www.daoway.cn/mip/common/images/yuan.png'
              data.line3 = 'https://www.daoway.cn/mip/common/images/line2.png'
              data.images4 = 'https://www.daoway.cn/mip/common/images/yuan.png'
              /* if (paid && paid == "1") {
                                    if (data.totalPrice + data.fixFee > 0) {
                                        data.button1 = {
                                            text: '申请退款',
                                            action: 'refund'
                                        };
                                    }
                                } */
              data.button2 = {
                text: '确认完成',
                action: 'confirmBtn'
              }
              break
            case '10': // 卖家确认订单完成
              data.status1 = '下单成功'
              data.status2 = '商家接单'
              data.status3 = '服务完成'
              data.status4 = '等待确认'
              data.images1 = 'https://www.daoway.cn/mip/common/images/11_03.png'
              data.line1 = 'https://www.daoway.cn/mip/common/images/line3.png'
              data.images2 = 'https://www.daoway.cn/mip/common/images/11_03.png'
              data.line2 = 'https://www.daoway.cn/mip/common/images/line3.png'
              data.images3 = 'https://www.daoway.cn/mip/common/images/11_03.png'
              data.line3 = 'https://www.daoway.cn/mip/common/images/line.png'
              data.images4 = 'https://www.daoway.cn/mip/common/images/yuan.png'
              /* if (paid && paid == "1") {
                                    if (data.totalPrice + data.fixFee > 0) {
                                        data.button1 = {
                                            text: '申请退款',
                                            action: 'refund'
                                        };
                                    }
                                } */
              data.button2 = {
                text: '确认完成',
                action: 'confirmBtn'
              }
              break
            case '11': // 申请退款
              data.status1 = '下单成功'
              data.status2 = '商家接单'
              data.status3 = '上门服务'
              data.status4 = '申请退款'
              data.images1 = 'https://www.daoway.cn/mip/common/images/11_03.png'
              data.line1 = 'https://www.daoway.cn/mip/common/images/line3.png'
              data.images2 = 'https://www.daoway.cn/mip/common/images/11_03.png'
              data.line2 = 'https://www.daoway.cn/mip/common/images/line3.png'
              data.images3 = 'https://www.daoway.cn/mip/common/images/yuan.png'
              data.line3 = 'https://www.daoway.cn/mip/common/images/line2.png'
              data.images4 = 'https://www.daoway.cn/mip/common/images/yuan.png'
              /* data.button2 = {
                                    text: '取消退款',
                                    action: 'cancelApplyRefund'
                                } */
              break
            case '12': // 待仲裁
              data.status1 = '下单成功'
              data.status2 = '商家接单'
              data.status3 = '上门服务'
              data.status4 = '官方仲裁'
              data.images1 = 'https://www.daoway.cn/mip/common/images/11_03.png'
              data.line1 = 'https://www.daoway.cn/mip/common/images/line3.png'
              data.images2 = 'https://www.daoway.cn/mip/common/images/11_03.png'
              data.line2 = 'https://www.daoway.cn/mip/common/images/line3.png'
              data.images3 = 'https://www.daoway.cn/mip/common/images/yuan.png'
              data.line3 = 'https://www.daoway.cn/mip/common/images/line2.png'
              data.images4 = 'https://www.daoway.cn/mip/common/images/yuan.png'
              break
            case '2': // 交易成功
            case '6': // 系统自动交易成功
              data.status1 = '下单成功'
              data.status2 = '商家接单'
              data.status3 = '服务完成'
              data.status4 = '确认完成'
              data.images1 = 'https://www.daoway.cn/mip/common/images/11_03.png'
              data.line1 = 'https://www.daoway.cn/mip/common/images/line3.png'
              data.images2 = 'https://www.daoway.cn/mip/common/images/11_03.png'
              data.line2 = 'https://www.daoway.cn/mip/common/images/line3.png'
              data.images3 = 'https://www.daoway.cn/mip/common/images/11_03.png'
              data.line3 = 'https://www.daoway.cn/mip/common/images/line3.png'
              data.images4 = 'https://www.daoway.cn/mip/common/images/11_03.png'
              data.button1 = {
                text: '再来一单',
                action: 'buyAgain'
              }
              /* data.button2 = {
                                    text: '评价',
                                    action: 'addComment'
                                } */
              break
            case '7': // 我已评价
            case '8': // 系统自动五星评价
              data.status1 = '下单成功'
              data.status2 = '商家接单'
              data.status3 = '服务完成'
              data.status4 = '确认完成'
              data.images1 = 'https://www.daoway.cn/mip/common/images/11_03.png'
              data.line1 = 'https://www.daoway.cn/mip/common/images/line3.png'
              data.images2 = 'https://www.daoway.cn/mip/common/images/11_03.png'
              data.line2 = 'https://www.daoway.cn/mip/common/images/line3.png'
              data.images3 = 'https://www.daoway.cn/mip/common/images/11_03.png'
              data.line3 = 'https://www.daoway.cn/mip/common/images/line3.png'
              data.images4 = 'https://www.daoway.cn/mip/common/images/11_03.png'
              data.button1 = {
                text: '再来一单',
                action: 'buyAgain'
              }
              break
            case '4': // 我已取消
            case '3': // 卖家已取消
            case '13': // 系统取消
              data.status1 = '下单成功'
              data.status2 = '商家接单'
              data.status3 = '上门服务'
              data.status4 = '取消订单'
              data.images1 = 'https://www.daoway.cn/mip/common/images/yuan.png'
              data.line1 = 'https://www.daoway.cn/mip/common/images/line2.png'
              data.images2 = 'https://www.daoway.cn/mip/common/images/yuan.png'
              data.line2 = 'https://www.daoway.cn/mip/common/images/line2.png'
              data.images3 = 'https://www.daoway.cn/mip/common/images/yuan.png'
              data.line3 = 'https://www.daoway.cn/mip/common/images/line2.png'
              data.images4 = 'https://www.daoway.cn/mip/common/images/11_03.png'
              data.button2 = {
                text: '再来一单',
                action: 'buyAgain'
              }
              break
            case '5': // 未支付取消
              data.status1 = '等待支付'
              data.status2 = '商家接单'
              data.status3 = '上门服务'
              data.status4 = '取消订单'
              data.images1 = 'https://www.daoway.cn/mip/common/images/yuan.png'
              data.line1 = 'https://www.daoway.cn/mip/common/images/line2.png'
              data.images2 = 'https://www.daoway.cn/mip/common/images/yuan.png'
              data.line2 = 'https://www.daoway.cn/mip/common/images/line2.png'
              data.images3 = 'https://www.daoway.cn/mip/common/images/yuan.png'
              data.line3 = 'https://www.daoway.cn/mip/common/images/line2.png'
              data.images4 = 'https://www.daoway.cn/mip/common/images/11_03.png'
              data.button1 = {
                text: '再来一单',
                action: 'buyAgain'
              }
              break
          }
          let action = data.action
          for (let i = 0; i < action.length; i++) {
            let actionObj = action[i]
            switch (actionObj.statusId) {
              case '0': // 下单成功
              case '9': // 待付款
                data.time1 = base.timeformat(actionObj.actionTime, 'MM-dd HH:mm')
                break
              case '1': // 卖家已确认
                data.time2 = base.timeformat(actionObj.actionTime, 'MM-dd HH:mm')
                break
              case '10': // 卖家确认订单完成
                data.time3 = base.timeformat(actionObj.actionTime, 'MM-dd HH:mm')
                break
              case '2': // 交易成功
                if (!data.time3) {
                  data.time3 = base.timeformat(actionObj.actionTime, 'MM-dd HH:mm')
                }
                data.time4 = base.timeformat(actionObj.actionTime, 'MM-dd HH:mm')
                break
              case '5': // 未支付取消
              case '6': // 交易成功
              case '7': // 我已评价
              case '8': // 系统自动五星评价
              case '4': // 我已取消
              case '3': // 卖家已取消
              case '13': // 系统取消
              case '12': // 待仲裁
              case '11': // 申请退款
                data.time4 = base.timeformat(actionObj.actionTime, 'MM-dd HH:mm')
                break
            }
          }
          that.orderhtml = data

          that.bill = (data.totalPrice + data.fixFee - data.couponBill).toFixed(2)
        } else {
          that.warn.show = true
          that.warn.texts = text.msg
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    buybtn (status) {
      let that = this
      let action = status.action
      let orderId = that.orderhtml.orderId
      if (action === 'buyAgain') {
        if (MIP.util.platform.isWechatApp()) {
          let appid = 'wx0290cc2004b61c97'
          let loginUrl = encodeURIComponent(base.htmlhref.reservation + '?orderId=' + encodeURIComponent(orderId) + '&serviceId=' + that.serviceId + '&quantity=' + that.quantity)
          let scope = 'snsapi_base'
          MIP.viewer.open('https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appid + '&redirect_uri=' + loginUrl + '&response_type=code&scope=' + scope + '&state=STATE#wechat_redirect', { isMipLink: true })
        } else {
          MIP.viewer.open(base.htmlhref.reservation + '?orderId=' + encodeURIComponent(orderId) + '&serviceId=' + that.serviceId + '&quantity=' + that.quantity, { isMipLink: true })
        }
      } else if (action === 'pay') {
        let totalPrice = that.orderhtml.totalPrice
        let couponBill = that.orderhtml.couponBill
        let couponId = that.orderhtml.couponId
        let fixFee = that.orderhtml.fixFee
        // let redirectUrl = 'https://xiongzhang.baidu.com/opensc/wps/payment?id=1581486019780982&redirect=' + encodeURIComponent(that.returnurl + '?orderId=' + orderId)
        let redirectUrl = that.returnurl + '?orderId=' + orderId
        MIP.setData({'payConfig': {
          'fee': (totalPrice + fixFee - couponBill).toFixed(2),
          'sessionId': that.token,
          'redirectUrl': redirectUrl,
          'postData': {
            orderId: orderId,
            token: that.token,
            bill: (totalPrice + fixFee - couponBill).toFixed(2),
            userId: that.userId,
            wallet: 0,
            couponId: couponId || '',
            'appendOrderId': '',
            'returnUrl': redirectUrl,
            'oauthCode': that.oauthCode,
            'tradeType': that.tradeType
          }
        }})
        that.$emit('actionpay')
      } else if (action === 'cancelBtn') {
        that.warn.show = true
        that.warn.texts = '确定要取消此订单吗'
        that.action = 'buyer_cancel'
        // 取消订单
      } else if (action === 'confirmBtn') {
        // console.log(action)
        that.warn.show = true
        that.warn.texts = '确认完成订单？'
        that.action = 'buyer_confirm'
        // 确认完成
      }
    },
    close () {
      this.warn.show = false
      this.warn.texts = ''
    },
    closeLayer () {
      let orderId = this.orderhtml.orderId
      let action = this.action
      this.closesure(orderId, action)
    },
    closesure (orderId, action) {
      let that = this
      let url = 'https://www.daoway.cn/daoway/rest/order/' + orderId + '/' + action + '?channel=' + that.channel + '&userId=' + that.userId
      fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {'content-type': 'application/x-www-form-urlencoded'}
      }).then(function (res) {
        return res.json()
      }).then(function (text) {
        if (text.status === 'ok') {
          if (action === 'buyer_cancel') {
            that.sure = false
            that.warn.show = true
            that.warn.texts = '订单已取消'
          } else if (action === 'buyer_confirm') {
            that.sure = false
            that.warn.show = true
            that.warn.texts = '订单已完成'
          }
          setTimeout(() => {
            that.warn.show = false
          }, 600)
          MIP.viewer.open(base.htmlhref.orderdetail + '?orderId=' + that.orderId, {isMipLink: true})
          // that.getState();
        } else {
          that.warn.show = true
          that.warn.texts = text.msg
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    toindex () {
      MIP.viewer.open(base.htmlhref.index, { isMipLink: true })
    }

  }

}
</script>
<style scoped>
    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }

    i {
        font-style: normal
    }

    li, ol {
        list-style: none
    }
    .call img{
        width: 18px;
        height: auto;
      display: block;
      margin: 0 auto;
    }
    .mipfds{
      width: 100%;
      margin: 0 auto;
      background: #fff;
      padding: 5px 3%;
      border-top: 1px solid #f5f5f5;
    }

    .theclose{width: 90%; margin: 0 auto}
    .layer p.active-layer{
        width: 50%;
        float: left;
        margin: 0;
        border-radius: 0;
    }
    .layer p:first-child{
        border-radius: 0;
        border-right: 1px solid #ededed;
    }
    body,body:before{
        background: #f5f5f5;
    }

    .stabox {
        width: 99%;
        padding: 0 2%;
        background: #fff;
        height: 100px;
        margin-top: 10px;
    }

    .state {
        width: 100%;
        height: 87px;
        background: linear-gradient(#f9604b, #f93633);
        border-radius: 5px;
        box-shadow: 2px 2px 10px rgba(249, 53, 51, 0.6);
        padding-top: 10px;
    }

    .icon {
        width: 92%;
        margin: 4px auto;
        text-align: center;
    }

    .line {
        margin-left: 2px;
        margin-right: 2px;
        width: 56px;
        height: auto;
    }
    .od-icon1{
        width: 22px;
        height: auto;
    }

    .icon img {
        display: inline-block;
        vertical-align: middle;
    }

    .statetit {
        width: 100%;
        margin: 8px auto 0;
    }

    .tit {
        color: #fcb3b0;
        display: inline-block;
        font-size: 11px;
        vertical-align: top;
        width: 24%;
        text-align: center;
    }

    .act {
        color: #fff;
    }

    .time {
        color: #ffe4e4;
        font-size: 10px;
        margin-top: 2px;
    }

    .buchajia {
        width: 100%;
        padding: 0 3%;
        border-bottom: 1px solid #e5e5e5;
        height: 50px;
        line-height: 50px;
        font-size: 14px;
    }

    .name {
        width: 78%;
        display: inline-block;
        font-size: 16px;
      color: #303030;
    }

    .xiangmu {
        width: 97%;
        margin-left: 3%;
        border-bottom: 1px solid #e5e5e5;
        line-height:40px;
        height: 40px;
      color: #303030;
    }

    .xiangmu div {
        display: inline-block;
    }

    .xtit {
        width: 70%;
    }

    .xtit2 {
        width: 19%;
    }

    .price {
        float: right;
        margin-right: 3%;
    }

    .small div {
        font-size: 14px;
    }

    .red {
        color: #f93030;
    }

    .address {
        width: 100%;
        padding: 10px 3%;
        margin: 10px 0;
        line-height: 23px;
        background: #fff;
        font-size: 14px;
        height:100%;
      color: #303030;
    }

    .user div, .city div {
        display: inline-block;
        line-height: 30px;
    }

    .user{
       height: 30px;
    }

    .footer img {
        display: block;
        margin: 0 auto;
    }

    .footer div, .footer button {
        display: inline-block;
    }

    .rightbtn {
        float: right;
        padding: 5px 0 0;
    }

    .rightbtn button {
        margin-left: 20px;
        height: 30px;
        line-height: 30px;
        font-size: 14px;
        background: #fff;
        padding: 0 10px;
        border: 1px solid #ddd;
        border-radius: 4px;
    }

    .rightbtn button.bgred{
        background: #e52f21;
        color: #fff;
        border: 1px solid red;
    }

    .call {
        margin-top:2px;
        font-size: 12px;
        color: #4c4c4c;
        float: left;
    }

    .bigdiv {
        background: #fff;
        width: 100%;

    }
    .bigd{
      margin-bottom: 50px;
    }

    .edit div{
        top: 17px;
    }
    .xiangmu img{
        width: 14px;
        height: 14px;
        padding: 3px;
        vertical-align: -10%;
    }
    .noborder{
        border: none;
    }
    .od-daigou{
        line-height: 40px;
        padding: 0 3%;
        color: #898989;
    }
  .wrapper{
    height: 100%;
  }
</style>
