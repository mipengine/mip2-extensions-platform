<template>
    <div class="s4s-page">
            <!-- <div style="background-color:#fff;padding:4%">
                <h3 style="font-size: .2rem; font-weight:medium; ">尊敬的客户您好</h3>
                <p style="font-size: .14rem;padding-top: .05rem;color:#666">当前待付款 <span style="color:#f40">{{ statics.UnpaySum || 0}}</span> 条，处理中 <span style="color:#f40">{{ statics.HandleSum || 0}}</span> 条，已完成 <span style="color:#f40">{{ statics.FinishSum || 0}}</span> 条。</p>
            </div> -->
            <div class="s4s-tab">
                <template v-for="(item, index) in tabs">
                    <span v-bind:key="index" :class="selIndex == index ? 's4s-tab-item s4s-tab-cur' : 's4s-tab-item'" @click="selTab(index)">{{ item }}</span>
                </template>
            </div>
            <div class="s4s-order-body">
                <div v-if="lists.length > 0">
                    <template v-for="item in lists">
                        <div  v-bind:key="item.AliOrderId"  :class="['s4s-cell', (item.Status == 2 || item.Status == 5) ? 's4s-cell-hd-image' : item.Status == 7 ? 's4s-cell-hd-image-down' :'']"> 
                            <div class="s4s-cell-hd" >
                                <p >{{item.AliOrderId}}</p><span v-if="item.Status == 0">等待支付</span>
                            </div>
                            <div class="s4s-cell-bd" v-if="item.car_no">
                                <span class="s4s-cell-tit">车牌号码：</span>
                                <span class="s4s-cell-txt">{{ item.car_no }}</span>
                            </div>
                            <div class="s4s-cell-bd" v-if="item.fine_name">
                                <span class="s4s-cell-tit">被处罚人：</span>
                                <span class="s4s-cell-txt">{{ item.fine_name }}</span>
                            </div>
                            <div class="s4s-cell-bd">
                                <span class="s4s-cell-tit">认罚时间：</span>
                                <span class="s4s-cell-txt">{{ item.btr_time && item.btr_time.substring(0, 10) || '-' }}</span>
                            </div>
                            <div class="s4s-cell-bd">
                                <span class="s4s-cell-tit">支付金额：</span>
                                <span class="s4s-cell-txt" style="color: #FE7000;">￥{{ ((item&&item.TotalPrice || 0) / 100).toFixed(2) }}</span>
                            </div>
                            <div class="s4s-cell-bd">
                                <span class="s4s-cell-tit">创建时间：</span>
                                <span class="s4s-cell-txt">{{ item.CreateTime }}</span>
                                <span v-if="item.Status == 5" style="color:#FFAC0D;font-size:13px;margin-left:15px;" >退款成功</span>
                            </div>
                            <div class="s4s-cell-fd" v-if="item.Status == 0">
                                <span @click="cancelOrder(item.id)" style="border: 1px #E6E6E6 solid;color: #999;background:none;">取消订单</span>
                                <span @click="bindPay(item)">在线付款</span>
                            </div>
                        </div>
                    </template>
                </div>
                <div v-else class="s4s-empty">
                    <mip-img src="https://s4s-imges.oss-cn-hangzhou.aliyuncs.com/xiongzhang/empty2.png" ></mip-img>
                </div>
                <a href="#" ref="newWeborder"></a>
            </div>
            <div class="s4s-confirm" v-if="showConfirm">
                <div class="s4s-confirm-body">
                    <!-- <div class="s4s-confirm-title">提示</div> -->
                    <div class="s4s-confirm-content">确认删除此订单？</div>
                    <div class="s4s-confirm-btn">
                        <span @click="cancelBtn">取消</span>
                        <span @click="confirmBtn" style="color: #108EE9;">确认</span>
                    </div>
                </div>
                <div class="s4s-mask"></div>
            </div>
    </div>
</template>

<script>
import util from "../../common/util";

export default {
  data() {
    return {
      tabs: ["待付款", "处理中", "已完成", "已退款", "已取消"],
      selIndex: 0,
      lists: [],
      user: {},
      statics: {},
      showConfirm: false,
      orderId: 0,
      timer: null,
      out_trade_no: "",
      paysrc: "",
      showpay: false,
      selectPrice: 0,
      system: {}
    };
  },
  mounted() {
    this.user = {
      Id: window.localStorage.UserId || "",
      Tel: window.localStorage.UserTel || window.UserTel || "",
      Icon: window.localStorage.UserIcon || window.UserIcon || "",
      Nick: window.localStorage.UserName || window.UserName || ""
    };
    this.getOrder(0);
    this.getOrderStatic();
  },
  methods: {
    selTab(index) {
      switch (index) {
        case 0:
          this.getOrder(0);
          break;
        case 1:
          this.getOrder(3);
          break;
        case 2:
          this.getOrder(7);
          break;
        case 3:
          this.getOrder(5);
          break;
        case 4:
          this.getOrder(2);
          break;
      }
      this.selIndex = index;
    },
    // 取消订单
    cancelOrder(id) {
      this.showConfirm = true;
      this.orderId = id;
    },
    cancelBtn(val) {
      this.showConfirm = false;
    },
    confirmBtn(val) {
      this.showConfirm = false;
      let param = {
        order_id: this.orderId
      };
      let self = this
      util.fetchData("v3/violation/order/cancel", param).then(res => {
        if (res.code == 0) {
          self.getOrder(0);
          self.getOrderStatic();
          util.toast("取消成功");
        }
      });
    },
    // 获取订单
    getOrder(status) {
      let self = this;
      let param = {
        status: status + ""
      };
      util.fetchData("v3/violation/order/list", param).then(res => {
        if (res.code == 20022) {
          // self.$router.push({
          // 	path: '/login',
          // 	query: {
          // 		redirect: '/order'
          // 	}
          // })
          return;
        }
        if (res.code >= 40000 && res.code < 50000) {
          // self.$router.push({
          //     path: '/login',
          //     query: {
          //         login: true,
          //         redirect: '/order'
          //     }
          // });
          return;
        }
        if (res.code == 0 && res.data) {
          self.lists = res.data;
        } else {
          self.lists = [];
          
        }

        
      });
    },
    // 获取订单状态
    getOrderStatic() {
      let self = this;
      util.fetchData("v3/violation/order/static").then(res => {
        if (res.code == 0) {
          self.statics = res.data;
        }
      });
    },
    bindPay(item, payType) {
      let self = this;
      let param = {
        order_id: item.id
      };
      if (payType == "wechat_web") {
        param.pay_method = "wechat_web";
      }
      util.fetchData("v3/violation/web/order/repay", param).then(res => {
        if (res.code == 0) {
              window.location.href = res.data.qr_code;
        } else {
          util.toast(res.msg);
        }
      });
    },
  }
};
</script>

<style scoped>

.s4s-tab {
  background: #fff;
  font-size: 15px;
  color: #999;
  height: 50px;
  line-height: 0.45rem;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
}
.s4s-tab-cur {
  border-bottom: 3px #fe7000 solid;
  color: #333;
}
.s4s-tab-item {
  margin: 0 0.1rem;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
@media screen and (min-width: 590px) {
  .s4s-tab-item {
    margin: 0;
  }
}
.s4s-order-body {
  margin: 10px 15px;
  /* padding-bottom: 60px; */
  height: calc(100vh - 164px);
    overflow-y: auto;
}
.s4s-cell {
  background: #fff;
  margin-bottom: 0.1rem;
  border-radius: 4px;
  font-size: 16px;
  padding: 4%;
}
.s4s-cell-hd {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  border-bottom: 1px rgba(0, 0, 0, 0.1) solid;
  padding-bottom: 10px;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
.s4s-cell-hd p {
  color: #999;
  font-size: 14px;
  flex: 1;
}
.s4s-cell-hd span {
  font-size: 14px;
  color: #fe7000;
}
.s4s-cell-hd-time {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  color: #333;
}
.s4s-cell-bd {
  padding-top: 15px;
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
  padding-bottom: 10px;
}
.s4s-cell-fd {
  border-top: 1px rgba(0, 0, 0, 0.1) solid;
  margin-top: 15px;
  padding-top: 15px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: end;
  -ms-flex-pack: end;
  justify-content: flex-end;
}
.s4s-cell-fd span {
  border-radius: 2px;
  padding: 5px 15px;
  color: #fff;
  font-size: 15px;
  margin-left: 10px;
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
  position: fixed;
  left: 50%;
  top: 50%;
  background: #fff;
  border-radius: 4px;
  z-index: 9999;
  margin-left: -38%;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
}
.s4s-confirm-title {
  text-align: center;
  padding-top: 20px;
}
.s4s-confirm-content {
  font-size: 16px;
  color: #888;
  text-align: center;
  padding: 25px;
}
.s4s-confirm-btn {
  height: 45px;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  border-top: 1px rgba(0, 0, 0, 0.1) solid;
  font-size: 15px;
}
.s4s-confirm-btn span {
  line-height: 45px;
  border-right: 1px rgba(0, 0, 0, 0.1) solid;
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
.s4s-mask {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9998;
      margin-bottom: -50px;
}
</style>
