<template>
  <div class="wrapper">
      <div class="pay-head">
          <div class="content">
            <div v-text="head.time" class="time"></div>
            <div class="pay-address">
                <div class="item left">
                    <span v-text="head.moveOut" class="title"></span>
                    <p v-text="head.moveOutfloor"></p>
                </div>
                <div class="item center">
                    <p v-text="head.carType" class="title"></p>
                    <p class="img arrow"></p>
                </div>
                <div class="item right">
                    <span v-text="head.moveIn" class="title"></span>
                    <p v-text="head.moveInfloor"></p>
                </div>
            </div>
          </div>
      </div>
      <div class="pay-content">
            <div class="head">
                  <span class="arrow-down"></span>
                <span class="">费用明细</span>
            </div>
              <div class="pay-list">
                  <ul>
                      <li v-for="item in pillList" :class="{title:item.billName==='合计'}" :key="item.billName">
                          <span v-text="item.billName"></span>
                          <span v-text="item.billMount"></span>
                      </li>
                  </ul>
            </div>
            <div class="desc">
                <ul>
                    <li>付款须知:</li>
                    <li>1、线上预付费用,支付资金由平台监管,未服务100%退款。</li>
                    <li>2、待确定的额外费用服务结束后按收费标准支付。</li>
                    <li>3、如因额外服务产生费用,请通过在线支付,杜绝乱收费。</li>
                </ul>
            </div>
      </div>
      <div class="footer">
          <p class="baoxian"><span class="img safe"></span><span class="safe-span">免费提供5000元搬家服务险,服务前40分钟外,免费取消</span></p>
          <p on="tap:payElement.toggle " class="btn">
              确认支付
          </p>
      </div>
  </div>
</template>

<script>
import base from "../../common/utils/base";
import "../../common/utils/base.css";
import axios from "axios";
base.setHtmlRem();
export default {
  props: {
    globaldata: {
      type: Object
    },
    payConfig: {
      type: Object
    }
  },
  data() {
    return {
      head: {
        time: "-",
        moveOut: "-",
        moveOutfloor: "-",
        carType: "-",
        moveIn: "-",
        moveInfloor: "-"
      },
      pillList: [
        {
          billName: "-",
          billMount: "-"
        },
        {
          billName: "-",
          billMount: "-"
        },
        {
          billName: "-",
          billMount: "-"
        }
      ]
    };
  },
  created() {
    console.log("创建数据");

    console.log(this.globaldata);
    this.setList();
  },
  mounted() {
    console.log("这里是支付页面 !");
    this.initData();
    this.clickRipple();

    // $emit
  },
  watch: {
    globaldata(val, oldval) {
      console.log("数据改变了+重置数据=======");
    }
  },
  methods: {
    //   初始化数据
    initData() {
      var lxndata = base.getSession();
      var orderNum = lxndata.order.OrderNum;
      var price = lxndata.order.billTotal;
      var sessionid = base.getbaiduLogMsg();
      console.log("token:" + sessionid + "======" + "orderNum:" + orderNum);

      var obj = {
        sessionId: sessionid,
        redirectUrl: "https://www.lanxiniu.com/Pay/success",
        fee: price,
        postData: {
          orderNum: orderNum,
          token: sessionid
        }
      };
      MIP.setData({
        payConfig: obj
      });
    },

    //请求订单数据
    setList() {
      var _this = this;
      var data = base.getSession();
      console.log("查看订单信息============");
      console.log(data);

      var order = data.order;
      var poiList = order.poiList;
      var floorData = [
        "有电梯",
        "无电梯1楼",
        "无电梯2楼",
        "无电梯3楼",
        "无电梯4楼",
        "无电梯5楼",
        "无电梯6楼",
        "无电梯7楼",
        "无电梯8楼"
      ];
      // 头部
      _this.head = {
        time: order.TransTime,
        moveOut: poiList[0].deliverAddress,
        moveIn: poiList[1].deliverAddress,
        carType: order.CarTypeName,
        moveOutfloor: floorData[data.moveOutNum],
        moveInfloor: floorData[data.moveInNum]
      };
      //列表
      var billinfos = order.billinfo;
      billinfos.push({
        billName: "合计",
        billMount: order.billTotal
      });
      _this.pillList = billinfos;
    },
    //点击波纹效果
    clickRipple() {
      var util = MIP.util;
      var undelegate = util.event.delegate(
        this.$element,
        ".btn",
        "click",
        function(e) {
          var target = e.target;
          console.log(target);
          if (target.className.indexOf("btn") > -1) {
            var rect = target.getBoundingClientRect();
            var ripple = target.querySelector(".ripple");
            if (!ripple) {
              ripple = document.createElement("span");
              ripple.className = "ripple";
              ripple.style.height = ripple.style.width =
                Math.max(rect.width, rect.height) + "px";
              target.appendChild(ripple);
            }
            ripple.classList.remove("show");
            var top =
              e.pageY -
              rect.top -
              ripple.offsetHeight / 2 -
              document.body.scrollTop;
            var left =
              e.pageX -
              rect.left -
              ripple.offsetWidth / 2 -
              document.body.scrollLeft;
            ripple.style.top = top + "px";
            ripple.style.left = left + "px";
            ripple.classList.add("show");
            return false;
          }
        }
      );
    },
    //   支付
    pay() {}
  }
};
</script>

<style scoped>
.pay-head .content {
  background: #36a0e9;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  text-align: center;
  color: #ffffff;
  padding: 0.32rem 0.3975rem;
}
.pay-address {
  margin-top: 0.1rem;
  display: flex;
}
.pay-address > div.item {
  flex: 1;
  height: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.pay-address > div span.title {
  font-size: 0.28rem;
}
.pay-address > div p:last-child {
  font-size: 0.24rem;
  margin-top: 0.05rem;
}
.pay-address .left {
  text-align: left;
}
.pay-address .center {
  align-items: center;
  padding-top: 0.1rem;
  font-size: 0.24rem;
}
.pay-address .right {
  text-align: right;
}
.pay-content {
  padding: 0 0.2rem;
  margin-top: 0.4rem;
}
.pay-content .head {
  position: relative;
  padding-left: 0.4rem;
  font-size: 0.28rem;
  color: #555555;
  letter-spacing: 0.06px;
}
.arrow-down {
  position: absolute;
  top: 0.16rem;
  left: 0;
  width: 0;
  height: 0;
  border-left: 0.12rem solid transparent;
  border-right: 0.12rem solid transparent;
  border-top: 0.12rem solid #36a0e9;
}
.pay-list {
  margin-top: 0.2rem;
  padding: 0 0.3975rem;
  background: #ffffff;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.1);
  border-radius: 2px;
}
.pay-list li {
  font-size: 0.28rem;
  color: #555555;
  letter-spacing: 0.06px;
  padding: 0.24rem 0;
  border-bottom: 0.02rem solid #f1f1f1;
}
.pay-list li span:last-child {
  float: right;
}
.pay-list li.title span:last-child {
  font-size: 0.32rem;
  color: #ff6666;
  letter-spacing: 0.07px;
}
.desc {
  margin-top: 0.3rem;
  padding: 0 0.1975rem;
  font-size: 0.2rem;
  color: #999999;
  letter-spacing: 0.04px;
}
.desc li {
  margin-top: 0.1rem;
}
.desc li span {
  color: #36a0e9;
}
.footer {
  margin: 0.4rem 0;
  text-align: center;
  padding: 0 0.2rem;
}
.footer .baoxian {
  background: #fcf0ae;
  height: 0.38rem;
  line-height: 0.38rem;
}
.footer .safe-span {
  font-size: 0.2rem;
  color: #666666;
  position: relative;
}
.footer .safe {
  position: relative;
  top: 0.05rem;
  right: 0.05rem;
}
.footer p.btn {
  margin-top: 0.1rem;
  height: 0.76rem;
  line-height: 0.76rem;
  background: #36a0e9;
  box-shadow: 0 0.02rem 0.04rem 0 rgba(0, 0, 0, 0.3);
  border-radius: 0.02rem;
  color: #ffffff;
  text-align: center;
}
</style>
