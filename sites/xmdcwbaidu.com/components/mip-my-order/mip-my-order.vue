<template>
  <div class="my-order">
    <div>
      <div class="mint-navbar">
        <a
          :class="{'is-selected': selected === 'notpay'}"
          class="mint-tab-item"
          @click="(selected='notpay')">
          <div class="mint-tab-item-icon"/>
          <div class="mint-tab-item-label">未付款</div>
        </a>
        <a
          :class="{'is-selected': selected === 'payed'}"
          class="mint-tab-item"
          @click="(selected='payed')">
          <div class="mint-tab-item-icon"/>
          <div class="mint-tab-item-label">已付款</div>
        </a>
        <a
          :class="{'is-selected': selected === 'canceled'}"
          class="mint-tab-item"
          @click="(selected='canceled')">
          <div class="mint-tab-item-icon"/>
          <div class="mint-tab-item-label">已取消</div>
        </a>
      </div>
    </div>

    <!-- <div v-if="info.isLogin">hi，{{ info.userInfo.aliasname }}，欢迎回来！<span
      style="color:#f00;"
      on="tap:log.logout">退出</span></div>
    <div v-else>你没有<span
      style="color:#f00;"
      on="tap:log.login"
    >登录</span>哦。</div> -->

    <div
      v-if="(selected==='notpay')"
      class="notpay my-order-content">
      <div
        v-for="(item,index) in unPay"
        :key="index"
        class="ldf-order-item dx-order-item"
        @click="orderDetail(item,item.orderId,item.orderType)">
        <div class="order-head">
          <p>订单编号:
            <span v-text="item.orderId"/>
          </p>
          <p>未付款</p>
        </div>
        <div class="order-content">
          <div>
            <div>
              <mip-img :src="busIcon(item.orderType)"/>
            </div>
            <div>
              <p v-text="busType(item.orderType, item.remark)"/>
              <p v-text="showBusContent(item.orderType,item)"/>
            </div>
          </div>
          <div>
            <p>创建时间：
              <span v-text="item.createTime.slice(0,10)"/>
            </p>
          </div>
        </div>
        <div class="order-operation">
          <div>
            <p>金额：
              <span v-text="item.amount + '元'"/>
            </p>
          </div>
          <div>
            <button @click.stop="cancelOrder(item.orderId)">取消</button>
            <button @click.stop="toPay(item,item.orderId,item.orderType)" >去付款</button>
          </div>
        </div>
      </div>

    </div>
    <div
      v-if="(selected==='payed')"
      class="payed my-order-content">
      <div
        v-for="(item,index) in paid"
        :key="index"
        class="ldf-order-item dx-order-item"
        @click="orderDetail(item,item.orderId,item.orderType)">
        <div class="order-head">
          <p>订单编号:
            <span v-text="item.orderId"/>
          </p>
          <p v-text="item.orderPayStatue === '3' ? '已付款' : '已退款' "/>
        </div>
        <div class="order-content">
          <div>
            <div>
              <mip-img :src="busIcon(item.orderType)"/>
            </div>
            <div>
              <p v-text="busType(item.orderType, item.remark)"/>
              <p v-text="showBusContent(item.orderType,item)"/>
            </div>
          </div>
          <div>
            <p>创建时间：
              <span v-text="item.createTime.slice(0,10)"/>
            </p>
          </div>
        </div>
        <div class="order-operation">
          <div>
            <p>金额：
              <span v-text="item.amount + '元'"/>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="(selected==='canceled')"
      class="canceled my-order-content">
      <div
        v-for="(item,index) in canceled"
        :key="index"
        class="ldf-order-item dx-order-item"
        @click="orderDetail(item,item.orderId,item.orderType)">
        <div class="order-head">
          <p>订单编号:
            <span v-text="item.orderId"/>
          </p>
          <p>未付款</p>
        </div>
        <div class="order-content">
          <div>
            <div>
              <mip-img :src="busIcon(item.orderType)"/>
            </div>
            <div>
              <p v-text="busType(item.orderType, item.remark)"/>
              <p v-text="showBusContent(item.orderType,item)"/>
            </div>
          </div>
          <div>
            <p>创建时间：
              <span v-text="item.createTime.slice(0,10)"/>
            </p>
          </div>
        </div>
        <div class="order-operation">
          <div>
            <p>金额：
              <span v-text="item.amount + '元'"/>
            </p>
          </div>
          <div>
            <button @click.stop="delOrder(item.orderId)">删除</button>
          </div>
        </div>
      </div>
      <div class="ldf-order-item dx-order-item">
        <div class="order-head">
          <p>订单编号:
            <span>0220180726711013</span>
          </p>
          <p>未付款</p>
        </div>
        <div class="order-content">
          <div>
            <div>
              <mip-img src="../static/img/icon03.png"/>
            </div>
            <div>
              <p >六年免检</p>
              <p >粤SNN111</p>
            </div>
          </div>
          <div>
            <p>创建时间：
              <span >2018-02-2</span>
            </p>
          </div>
        </div>
        <div class="order-operation">
          <div>
            <p>金额：
              <span >30元</span>
            </p>
          </div>
          <div>
            <button >删除</button>

          </div>
        </div>
      </div>
    </div>
    <div class="details-footer">
      <div class="details-footer-box">
        <p>本服务由小优车务提供</p>
        <p>客服热线：<span>020-3113646</span>(工作日：9:00-17:00)</p>
      </div>
    </div>

    <login-become-member
      :login-become-member-visible="loginBecomeMemberVisible"
      @loginBecomeMember="loginBecomeMember"
    />
  </div>
</template>

<style lang="less" scoped>
@import "../../common/less/const";
@import "../../common/less/common.less";
.my-order {
  min-height: 90vh;
  position: relative;
  margin: 0 auto;
  text-align: center;

  .mint-cell {
    .mint-cell-wrapper {
      padding: 0 15px;
      .mint-cell-title {
        text-align: left;
      }
    }
  }

  .mint-navbar {
    border-bottom: 1px solid #e6e6e6;
    margin-bottom: 2px;
    .mint-tab-item {
      padding: 0.24rem;
      .mint-tab-item-label {
        font-size: 0.3rem;
      }
      &.is-selected {
        border-bottom: 2px solid @color-btn;
        margin-bottom: 0;
        .mint-tab-item-label {
          color: @color-btn;
        }
      }
    }
  }
  .my-order-content{
    padding-bottom: 1.2rem;
  }
  .ldf-order-item {
    margin-top: 0.2rem;
    border-top: 1px solid #e5e5e5;
    background-color: white;
    font-size: @font-small;
    color: @color-text;
    &.dx-order-item {
      margin-bottom: 0.16em;
    }
    .order-head {
      height: 0.8rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-direction: row;
      p {
        margin: 0 0.2rem;
      }
      p:last-child {
        color: #dd2727;
      }
    }
    .order-content {
      border-bottom: 1px solid #f8f8f8;
      border-top: 1px solid #f8f8f8;
      padding: 0.4rem 0.2rem;
      display: flex;
      justify-content: space-between;
      & > div:first-child {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        & > div:first-child {
          margin-right: 0.24rem;
          img {
            width: 0.56rem;
          }
        }

        & > div:last-child {
          p {
            line-height: 0.4rem;
          }
          p:first-child {
            font-size: @font-medium;
            font-weight: bold;
          }
        }
      }
    }
    .order-operation {
      border-bottom: 1px solid #e5e5e5;
      height: 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 0.2rem;
      & > div:first-child {
        p {
          font-size: @font-medium;
          span {
            font-size: @font-medium-x;
            color: #dd2727;
          }
        }
      }
      & > div:last-child {
        & > button {
          width: 1.4rem;
          height: 0.48rem;
          border-radius: 3px;
          color: @color-text-d;
          background-color: white;
          border: 1px solid #e5e5e5;
          //padding-bottom:2px;
        }
        & > button:last-child {
          margin-left: 0.36rem;
          color: #1e82d2;
          border-color: #1e82d2;
        }
      }
    }
  }
  .payContain .mipPayBtn[data-v-8ae40b72] {
    font-size: 14px !important;
  }
  .payContain[data-v-8ae40b72] {
    font-size: 16px !important;
  }
  .details-footer {
    position: absolute;
    bottom: 0.3rem;
    font-size: @font-small;
    padding-top: 0.3rem;
    width: 100%;
    text-align: center;
    color:rgba(153,153,153,1);
    .details-footer-box{
      width: 100%;
    }
    span{
      color: #4082CD;
    }
  }
}
</style>

<script>
import { resetRem, Storage } from '../../common/utils/common'
import { gConst } from '../../common/js/config.js'
import myOrderReqs from '../../common/api/myOrderApi.js'
import commonApi from '../../common/api/common.js'
import { Mdialog } from '../../common/utils/dialog.js'
import loginBecomeMember from '../../common/components/mip-login-become-member'

export default {
  components: {
    loginBecomeMember
  },
  props: {
    info: {
      type: Object,
      required: true
    },
    config: {
      type: Object,
      required: true
    },
    payConfig: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      selected: 'notpay',
      unPay: [],
      canceled: [],
      paid: [],
      loginBecomeMemberVisible: false
    }
  },
  created () {
    resetRem()
  },
  mounted () {
    let self = this
    // 自定义login事件 登录成功之后会执行
    this.$element.customElement.addEventAction('login', event => {
      // 这里可以输出登录之后的数据
      console.log('用户信息mip-my-order', event)
      // Storage.set('loginInfo',event)

      // let apitoken = Storage.get('apitoken')
      // console.log('mip-my-order登录成功后的apitoken',apitoken)
      // if(apitoken === undefined || apitoken === null ) {
      //   Storage.set('apitoken',event.userInfo.apitoken)
      // }

      Storage.set('apitoken', event.userInfo.apitoken)
      MIP.setData({
        payConfig: {
          sessionId: event.sessionId
        }
      })
      // 获取一次是不是会员的请求，必须放在登录成功之后
      commonApi.getMember({
      }).then(data => {
        Storage.setSession('memberSimpleInfo', data)
        console.log(data.isMember)
        if (data.isMember === false) {
          // 弹框
          self.loginBecomeMemberVisible = true
        } else {
          console.log('进来了allOrder')
          self.allOrder()
        }
      })
    })
    this.$element.customElement.addEventAction('exit', event => {
      // 这里可以输出登录之后的数据
      console.log('登出了')
    })
    // 正式上线的时候下面的代码注释掉
    // self.allOrder()
  },
  methods: {
    allOrder: function () {
      let self = this
      // 用户为会员执行的操作
      // let params = {}
      myOrderReqs
        .getMyOrders({})
        .then(data => {
          self.unPay = data.unPay
          self.canceled = data.canceled
          self.paid = data.paid
        })
        .catch(() => {})
    },
    busType: function (type, remark) {
      type = '' + type
      if (type === '1') {
        return '违章缴罚'
      }
      if (type === '2') {
        return '加油卡业务'
      }
      if (type === '3') {
        return '六年免检'
      }
      if (type === '4') {
        return '驾驶证业务'
      }
      if (type === '5') {
        return '行驶证业务'
      }
      if (type === '6') {
        return '广州车展门票'
      }
      if (type === '7') {
        return '上线年检'
      }
      if (type === '9') {
        if (remark !== null || remark !== '' || remark !== undefined) {
          return remark
        }
        return 'VIP'
      }
    },
    showBusContent: function (type, item) {
      if (type === '6') {
        return ''
      }
      if (type === '4') {
        return '驾驶证号 : ' + item.drivingLicense
      }
      return item.plateNumber
    },
    busIcon: function (type) {
      type = '' + type
      if (type === '1') {
        return '../static/img/icon01.svg'
      }
      if (type === '2') {
        return '../static/img/icon02.svg'
      }
      if (type === '3') {
        return '../static/img/icon03.png'
      }
      if (type === '4') {
        return '../static/img/icon04.svg'
      }
      if (type === '5') {
        return '../static/img/icon05.svg'
      }
      if (type === '6') {
        return '../static/img/icon06.svg'
      }
      if (type === '7') {
        return '../static/img/icon07.png'
      }
      if (type === '9') {
        return '../static/img/vipOrder.png'
      }
    },
    cancelOrder (orderId) {
      console.log(2)
      let self = this
      let Dialog = new Mdialog()
      Dialog.open(
        {
          title: '提示',
          message: '确定要取消订单吗',
          showCancelButton: true
        },
        function (actions) {
          if (actions === 'confirm') {
            // 确定
            console.log('点击了确定')
            let params = {
              orderId: orderId,
              status: 0
            }
            myOrderReqs
              .cancelOrDelOrder(params)
              .then(data => {
                Dialog.open({
                  title: '提示',
                  message: '取消成功',
                  showCancelButton: false
                })
                self.allOrder()
              })
              .catch(() => {})
          }
        }
      )
    },
    // 有问题
    delOrder (orderId) {
      let self = this
      let params = {
        orderId: orderId,
        status: -1
      }
      let Dialog = new Mdialog()
      myOrderReqs
        .cancelOrDelOrder(params)
        .then(data => {
          Dialog.open({
            title: '提示',
            message: '删除成功',
            showCancelButton: false
          })
          self.allOrder()
        })
        .catch(() => {})
    },
    toPay (theOrder, orderId, orderType) {
      let self = this
      let orderName = self.busType(theOrder.orderType, theOrder.remark)
      let apitoken = Storage.get('apitoken')
      MIP.setData({
        payConfig: {
          fee: theOrder.amount,
          subject: orderName,
          postData: {
            orderId: orderId,
            orderType: orderType,
            orderName: orderName,
            apitoken: apitoken
          }
        }
      })
      this.$emit('actionpay')
    },
    orderDetail (theOrder, orderId, orderType) {
      console.log(orderType)
      orderType = '' + orderType
      let Dialog = new Mdialog()
      let params = {
        orderId: orderId,
        orderType: orderType
      }
      myOrderReqs
        .findOrderDetails(params)
        .then(data => {
          console.log(data)
          if (orderType === '1') {
            console.log(data)
            MIP.viewer.open(
              gConst.BASE_URL_PAGE + 'mip-my-illegal-details.html'
            )
            Storage.set('orderDetail', data)
            Storage.set('theOrder', theOrder)
            Storage.set('getOrderDetailParams', params)
            return true
          } else {
            Dialog.open({
              message: '暂时只能查看违章缴罚订单详情, <br>敬请期待!',
              showCancelButton: false
            })
          }
        })
        .catch(() => {})
    },
    loginBecomeMember (params) {
      const self = this
      self.loginBecomeMemberVisible = false
      if (params.bol === 'login') {
        myOrderReqs.getMember({}).then(data => {
          console.log('loginBecomeMember-->getMember-->success')
          Storage.setSession('memberSimpleInfo', data)
          // let loginInfo = Storage.get('loginInfo')
          // console.log('loginInfo信息',loginInfo.userInfo)
          // loginInfo.userInfo.apitoken = data.apitoken
          // Storage.set('loginInfo',loginInfo)
          self.allOrder()
        })
      }
    }
  }
}
</script>
