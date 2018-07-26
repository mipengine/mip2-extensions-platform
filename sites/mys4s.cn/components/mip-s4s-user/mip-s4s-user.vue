<template>
  <div class="s4s-page">
    <a
      ref="tel"
      href="tel://400-000-1199"/>
    <!-- <div style="background-color:#fff;padding:4%">
                <h3 style="font-size: .2rem; font-weight:medium; ">尊敬的客户您好</h3>
                <p style="font-size: .14rem;padding-top: .05rem;color:#666">当前待付款 <span style="color:#f40">{{ statics.UnpaySum || 0}}</span> 条，处理中 <span style="color:#f40">{{ statics.HandleSum || 0}}</span> 条，已完成 <span style="color:#f40">{{ statics.FinishSum || 0}}</span> 条。</p>
            </div> -->
    <div class="s4s-tab">
      <div
        v-for="(item, index) in tabs"
        :key="index"
        class="s4s-tab-item">
        <p
          :class="selIndex == index ? ' s4s-tab-cur' : ''"
          @click="selTab(index)">
          {{ item }}
          <span
            v-if="index == 1 && statics.UnpaySum && UnpaySumClick"
            class="s4s-tab-num">{{ statics.UnpaySum }}</span>
          <span
            v-if="index == 2 && statics.HandleSum && HandleSumClick"
            class="s4s-tab-num">{{ statics.HandleSum }}</span>
        </p>
      </div>
    </div>
    <div class="s4s-order-body">
      <div v-show="!!lists.length">
        <template v-for="item in lists">
          <div
            :key="item.AliOrderId"
            :class="['s4s-cell', (item.Status == 2 || item.Status == 5) ? 's4s-cell-hd-image' : item.Status == 7 ? 's4s-cell-hd-image-down' :'']">
            <div class="s4s-cell-hd" >
              <p >{{ item.SwiftNum || '-' }}</p><span v-if="item.Status == 0">等待支付</span>
            </div>
            <div
              v-if="item.car_no"
              class="s4s-cell-bd">
              <span class="s4s-cell-tit">车牌号码：</span>
              <span class="s4s-cell-txt">{{ item.car_no }}</span>
            </div>
            <div
              v-if="item.fine_name"
              class="s4s-cell-bd">
              <span class="s4s-cell-tit">被处罚人：</span>
              <span class="s4s-cell-txt">{{ item.fine_name }}</span>
            </div>
            <div class="s4s-cell-bd">
              <span class="s4s-cell-tit">认罚时间：</span>
              <span class="s4s-cell-txt">{{ item.btr_time && item.btr_time.substring(0, 10) || '-' }}</span>
            </div>
            <div class="s4s-cell-bd">
              <span class="s4s-cell-tit">支付金额：</span>
              <span
                class="s4s-cell-txt"
                style="color: #FE7000;">￥{{ ((item&&item.TotalPrice || 0) / 100).toFixed(2) }}</span>
            </div>
            <div class="s4s-cell-bd">
              <span class="s4s-cell-tit">创建时间：</span>
              <span class="s4s-cell-txt">{{ item.CreateTime }}</span>
              <span
                v-if="item.Status == 5"
                style="color:#FFAC0D;font-size:.13rem;margin-left:.15rem;" >退款成功</span>
            </div>
            <div
              v-if="item.Status == 0"
              class="s4s-cell-fd">
              <span
                style="border: .01rem #E6E6E6 solid;color: #999;background:none;"
                @click="cancelOrder(item.id)">取消订单</span>
              <span @click="bindPay(item)">在线付款</span>
            </div>
            <div
              v-if="item.Status == 3"
              class="s4s-cell-fd">
              <span
                style="border: .01rem #E6E6E6 solid;color: #999;background:none;"
                @click="closeOrder(item.id)">申请退款</span>
            </div>
          </div>
        </template>
      </div>
      <div
        v-show="!lists.length"
        class="s4s-empty">
        <mip-img
          src="https://s4s-imges.oss-cn-hangzhou.aliyuncs.com/xiongzhang/empty2.png" />
      </div>
      <a
        ref="newWeborder"
        href="#"/>
    </div>
    <div
      v-if="showConfirm"
      class="s4s-confirm">
      <div class="s4s-confirm-body">
        <!-- <div class="s4s-confirm-title">提示</div> -->
        <div class="s4s-confirm-content">确认删除此订单？</div>
        <div class="s4s-confirm-btn">
          <span @click="cancelBtn">取消</span>
          <span
            style="color: #108EE9;"
            @click="confirmBtn">确认</span>
        </div>
      </div>
      <div class="s4s-mask-user"/>
    </div>
  </div>
</template>

<script>
import util from '../../common/util'

export default {
  data () {
    return {
      tabs: ['全部', '待付款', '处理中', '已完成', '已取消'],
      selIndex: 0,
      lists: [],
      statics: {},
      showConfirm: false,
      orderId: 0,
      timer: null,
      out_trade_no: '',
      paysrc: '',
      showpay: false,
      selectPrice: 0,
      system: {},
      HandleSumClick: true,
      UnpaySumClick: true
    }
  },
  mounted () {
    this.getOrder(-1)
    this.getOrderStatic()
    this.$on('enter', () => {
      this.getOrder(-1)
      this.getOrderStatic()
    })
  },
  methods: {
    selTab (index) {
      switch (index) {
        case 0:
          this.getOrder(-1)
          break
        case 1:
          this.UnpaySumClick = false
          this.getOrder(0)
          break
        case 2:
          this.HandleSumClick = false
          this.getOrder(3)
          break
        case 3:
          this.getOrder(7)
          break
        case 4:
          this.getOrder(2)
          break
      }
      this.selIndex = index
    },
    closeOrder () {
      this.$refs.tel.click()
    },
    // 取消订单
    cancelOrder (id) {
      this.showConfirm = true
      this.orderId = id
    },
    cancelBtn (val) {
      this.showConfirm = false
    },
    confirmBtn (val) {
      this.showConfirm = false
      let param = {
        order_id: this.orderId + ''
      }
      let self = this
      util.fetchData('v3/violation/order/cancel', param).then(res => {
        if (res.code === 0) {
          self.getOrder(0)
          self.getOrderStatic()
          util.toast('取消成功')
        }
      })
    },
    // 获取订单
    getOrder (status) {
      let self = this
      let param = {
        status: status + ''
      }
      util.fetchData('v3/violation/order/list', param).then(res => {
        if (res.code === 20022) {
          return
        }
        if (res.code >= 40000 && res.code < 50000) {
          // self.$router.push({
          //     path: '/login',
          //     query: {
          //         login: true,
          //         redirect: '/order'
          //     }
          // });
          return
        }
        if (res.code === 0 && res.data) {
          self.lists = res.data
        } else {
          self.lists = []
        }
        // self.lists = [{
        //   Address: '[余杭]余杭-邱桥路_红旗路()',
        //   AliOrderId: '2018012021001004100580225064',
        //   CancelTime: '',
        //   CarLateFee: 0,
        //   CarOrderNum: '',
        //   CarSerFee: '',
        //   CarTotalPrice: '',
        //   CooperFree: 0,
        //   CreateTime: '2018-01-20 15:26:21',
        //   Fine: 20000,
        //   FinishTime: '',
        //   FormId: 'MjA4ODAwMjI5NDkwMzEwNF8xNTE2NDMzMTgxMDU0XzAxNA==',
        //   LocationName: '浙江杭州',
        //   Locationid: 3301,
        //   Msg: '',
        //   OwnFree: 8000,
        //   Reason: '机动车违反规定停放、临时停车，妨碍其它车辆、行人通行的',
        //   RefundFee: 0,
        //   RefundPerson: '',
        //   RefundReason: '',
        //   Status: 0,
        //   SucTime: '',
        //   SwiftNum: 'violation_362',
        //   TotalPrice: 28000,
        //   UrgeCount: 0,
        //   UrgeReason: '',
        //   ViolationCode: '1039',
        //   ViolationId: '2536479',
        //   btr_time: '2017-12-12 08:43:42',
        //   car_no: '粤X8837C',
        //   drive_licence: 'https://s4s-imges.oss-cn-hangzhou.aliyuncs.com/report/180120152614947.JPEG',
        //   drive_licence_num: '330281168563355596',
        //   drive_no: 0,
        //   fine_image_url: '',
        //   fine_name: '',
        //   id: 362,
        //   jsz_drive_licence: '',
        //   jsz_travel_licence: '',
        //   late_free: 0,
        //   mobile: '13867820265',
        //   travel_licence: 'https://s4s-imges.oss-cn-hangzhou.aliyuncs.com/report/180120152618945.JPEG',
        //   user_id: 5606112,
        //   writ_notice_num: ''
        // }]
      })
    },
    // 获取订单状态
    getOrderStatic () {
      let self = this
      util.fetchData('v3/violation/order/static').then(res => {
        if (res.code === 0) {
          self.statics = res.data
        }
      })
    },
    bindPay (item) {
      MIP.setData({
        payConfig: {
          fee: item.TotalPrice / 100,
          sessionId: window.localStorage.getItem(
            'mip-login-xzh:sessionId:https://mys4s.cn/v3/nc/auth?source=xzapp'
          ),
          postData: {
            order_id: item.id + ''
          }
        }
      })
      this.$emit('canpay', {})
    }
  }
}
</script>

<style scoped>
.s4s-tab {
  background: #fff;
  font-size: 0.15rem;
  color: #999;
  height: 50px;
  line-height: 45px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
}
.s4s-tab-cur {
  border-bottom: 0.03rem #fe7000 solid;
  color: #333;
      width: 100%;
    text-align: center;
}
.s4s-tab-item {
  padding: 0 0.1rem;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  font-size:.15rem;
}
.s4s-tab-num {
    background: #fe5a00;
    background-image:linear-gradient(40deg, #fe5a00 0%, #ff7c00 100%);
    /* min-width: .185rem;
    width:auto;
    padding:0 .0485rem; */
    display: inline-block;
    border-radius: 2rem;
    text-align: center;
    color: #fff;
    align-items: center;
    justify-content: center;
    box-sizing: content-box;
    font-size: .12rem;
    line-height: .18rem;
    position: absolute;
    right: 0;
    top: .03rem;
    padding: .01rem .05rem;
    font-weight: 100;
}
@media screen and (min-width: 590px) {
  .s4s-tab-item {
    margin: 0;
  }
}
.s4s-order-body {
  margin: 10px 0.15rem;
  /* padding-bottom: 60px; */
  height: calc(100vh - 174px);
  /* height: 100%; */
  overflow-y: auto;
}
.s4s-cell {
  background: #fff;
  margin-bottom: 0.1rem;
  border-radius: 0.04rem;
  font-size: 0.16rem;
  padding: 4%;
}
.s4s-cell:last-child {
  margin-bottom: 0;
}
.s4s-cell-hd {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  border-bottom: 0.01rem rgba(0, 0, 0, 0.1) solid;
  padding-bottom: 0.1rem;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
.s4s-cell-hd p {
  color: #999;
  font-size: 0.14rem;
  flex: 1;
}
.s4s-cell-hd span {
  font-size: 0.14rem;
  color: #fe7000;
}
.s4s-cell-hd-time {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  color: #333;
}
.s4s-cell-bd {
  padding-top: 0.15rem;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
.s4s-cell-tit {
  color: #999;
}
.s4s-cell-txt {
  color: #666;
}
.s4s-cell-bd:last-child {
  padding-bottom: 0.1rem;
}
.s4s-cell-fd {
  border-top: 0.01rem rgba(0, 0, 0, 0.1) solid;
  margin-top: 0.15rem;
  padding-top: 0.15rem;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: end;
  -ms-flex-pack: end;
  justify-content: flex-end;
}
.s4s-cell-fd span {
  border-radius: 0.02rem;
  padding: 0.05rem 0.15rem;
  color: #fff;
  font-size: 0.15rem;
  margin-left: 0.1rem;
}

.s4s-cell-fd span:last-child {
  background-image: linear-gradient(-149deg, #ff7907 0%, #ffa018 100%);
  border: none;
}

.s4s-cell-hd-image {
  background-image: url("https://s4s-imges.oss-cn-hangzhou.aliyuncs.com/xiongzhang/cancel.png");
  background-repeat: no-repeat;
  background-position: 97% 0;
  background-size: 0.66rem 0.56rem;
}
.s4s-cell-hd-image-down {
  background-image: url("https://s4s-imges.oss-cn-hangzhou.aliyuncs.com/xiongzhang/complete.png");
  background-repeat: no-repeat;
  background-position: 97% 0;
  background-size: 0.66rem 0.56rem;
}
.s4s-confirm-body {
  width: 76%;
  position: absolute;
  left: 50%;
  top: 50%;
  background: #fff;
  border-radius: 0.04rem;
  z-index: 9999;
  margin-left: -38%;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
}
.s4s-confirm-title {
  text-align: center;
  padding-top: 0.2rem;
}
.s4s-confirm-content {
  font-size: 0.16rem;
  color: #888;
  text-align: center;
  padding: 0.25rem;
}
.s4s-confirm-btn {
  height: 0.45rem;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  border-top: 0.01rem rgba(0, 0, 0, 0.1) solid;
  font-size: 0.15rem;
}
.s4s-confirm-btn span {
  line-height: 0.45rem;
  border-right: 0.01rem rgba(0, 0, 0, 0.1) solid;
  display: -ms-flexbox;
  display: flex;
  -ms-flex: 1;
  flex: 1;
  -ms-flex-pack: center;
  justify-content: center;
}
.s4s-confirm-btn span:last-child {
  border-right: 0;
}
.s4s-mask-user {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9998;
}
</style>
