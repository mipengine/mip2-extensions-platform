<template>
    <div class="wrapper">


        <div class="stabox">
            <div class="state">
                <div class="icon">
                    <img class="od-icon1" :src="orderhtml.images1">
                    <img :src="orderhtml.line1" class="line">
                    <img class="od-icon1" :src="orderhtml.images2" style="width:24px; height:auto">
                    <img :src="orderhtml.line2" class="line">
                    <img class="od-icon1" :src="orderhtml.images3">
                    <img :src="orderhtml.line3" class="line">
                    <img class="od-icon1" :src="orderhtml.images4">
                </div>
                <div class="statetit">
                    <div style="margin-left:0" class="tit" :class="{act: orderhtml.images1=='/common/images/11_03.png'}">{{orderhtml.status1}}
                        <div class="time">{{orderhtml.time1}}</div>
                    </div>
                    <div class="tit" :class="{act: orderhtml.images2=='/common/images/11_03.png'}">{{orderhtml.status2}}
                        <div class="time">{{orderhtml.time2}}</div>
                    </div>
                    <div class="tit" :class="{act: orderhtml.images3=='/common/images/11_03.png'}">{{orderhtml.status3}}
                        <div class="time">{{orderhtml.time3}}</div>
                    </div>
                    <div class="tit" :class="{act: orderhtml.images4=='/common/images/11_03.png'}">{{orderhtml.status4}}
                        <div class="time">{{orderhtml.time4}}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="bigdiv">
            <div class="buchajia">
                <div class="name">{{orderhtml.serviceTitle}}</div>
            </div>
            <div class="xiangmu" v-for="i in orderhtml.items"  style="line-height: 90px;height: 90px;">
                <div class="xtit">{{i.name}}</div>
                <div>x{{i.quantity}}</div>
                <div class="price">{{i.price}}元</div>
            </div>
            <div class="xiangmu small" v-if="orderhtml.allStatusPartReturnOrder && orderhtml.allStatusPartReturnOrder.status == 'RETURNED' ">
                <div class="xtit">退款金额</div>
                <div class="price red">-{{orderhtml.allStatusPartReturnOrder.bill}}元</div>
            </div>
            <div class="xiangmu small" v-if="orderhtml.allStatusAppendOrder">
                <div class="xtit">补差价</div>
                <div class="price">{{orderhtml.allStatusAppendOrder}}元</div>
            </div>
            <div class="xiangmu small" v-if="orderhtml.fixFee && orderhtml.fixFee>0">
                <div class="xtit">上门费</div>
                <div class="price">{{orderhtml.fixFee}}元</div>
            </div>
            <div class="xiangmu small" v-if="orderhtml.extraFee && orderhtml.extraFee>0">
                <div class="xtit">增项费用</div>
                <div class="price">{{orderhtml.extraFee}}元</div>
            </div>
            <div class="xiangmu small" v-if="orderhtml.couponBill && orderhtml.couponBill>0">
                <div class="xtit">代金券</div>
                <div class="price red">-{{orderhtml.couponBill}}元</div>
            </div>
            <div class="xiangmu small" v-if="orderhtml.statusId == '9'" style="border-bottom:none">
                <div class="price">待付金额:
                    <div class="red">{{bill}}元</div>
                </div>
                <div class="price">实付金额:
                    <div class="red">{{bill}}元</div>
                </div>
            </div>
        </div>
        <div class="address">
            <div class="user">{{orderhtml.contactPerson}}
                <div class="phone">{{orderhtml.buyerPhone}}</div>
            </div>
            <div class="city">{{orderhtml.address}}
            </div>
        </div>
        <div class="bigdiv">
            <div class="buchajia" style="height:45px; line-height:45px">订单信息</div>
            <div class="xiangmu">
                <div class="xtit2">预约时间:</div>
                <div class="red">{{orderhtml.formatTime}}</div>
            </div>
            <div class="xiangmu" v-if="orderhtml.tv">
                <div class="xtit2">服务人员:</div>
                <div>{{orderhtml.tv.name}}</div>
            </div>
            <div class="xiangmu noborder">
                <div class="xtit2">订单备注:</div>
                <div>{{orderhtml.note||""}}</div>
            </div>
        </div>
       <!-- <div class="od-daigou" v-if="userPhone &&　userPhone !=　orderhtml.userPhone">该订单由您的好友{{orderhtml.userPhone}}为您订购</div>-->
        <div class="last"></div>
        <div class="footer">
            <mip-fixed class="mipfds" type="bottom">
                <div class="call">
                    <img src="http://www.daoway.cn/call.png">联系商家
                </div>
                <div class="rightbtn">
                    <button v-if="orderhtml.button1" @click="buybtn(orderhtml.button1)">{{orderhtml.button1.text}}</button>
                    <button class="bgred" v-if="orderhtml.button2" @click="buybtn(orderhtml.button2)">{{orderhtml.button2.text}}</button>
                </div>
            </mip-fixed>
        </div>
        <!--提示-->
        <div v-show="warn.show" class="layer">
            <div class="layer-content zoomIn">
                <p class="layer-text" v-text="warn.texts"></p>
                <div class="theclose">
                    <p v-if="sure" class="layer-sure active-layer" @touchend="close">取消</p>
                    <p v-if="sure" class="layer-sure active-layer" @touchend="closeLayer">确定</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import base from '../../common/utils/base'
    export default {
        data(){
            return {
                orderId:base.getRequest(location.href).orderId,
                friendId:'',
                orderhtml:{},
                bill:0,
                warn: {
                    // 弹窗
                    show: false,
                    texts: ''
                },
                action:'',
                sure:true,
                channel:'baidu',
                userId: localStorage.getItem('userId'),
                token:localStorage.getItem('token')
            }
        },
        mounted () {
            this.getState();
        },
        methods: {
            getState() {
                var that = this;
                var url = "/daoway/rest/order/" + that.orderId + "?userId=" + that.userId + "&channel=" + that.channel;
                fetch(url, {
                    method: 'get',
                    credentials: "include",
                }).then(function (res) {
                    if (res && res.status == "200") {
                        return res.json();
                    }
                }).then(function (text) {
                    if(text.status== 'ok'){
                        var data = text.data;
                        that.friendId = data.sellerId;
                        data.formatTime = base.timeformat(data.appointTime, "yyyy-MM-dd(day) HH:mm")
                        var paid = data.paid;
                        var statusId = data.statusId;
                        switch (statusId) {
                            case "9":  // 待付款
                                data.status1 = "等待付款";
                                data.status2 = "商家接单";
                                data.status3 = "上门服务";
                                data.status4 = "确认完成";
                                data.images1 = "/common/images/11_03.png";
                                data.line1 = "/common/images/line2.png";
                                data.images2 = "/common/images/yuan.png";
                                data.line2 = "/common/images/line2.png";
                                data.images3 = "/common/images/yuan.png";
                                data.line3 = "/common/images/line2.png";
                                data.images4 = "/common/images/yuan.png";
                                data.button1 = {
                                    text: '立即支付',
                                    action: 'pay'
                                }
                                data.button2 = {
                                    text: '取消订单',
                                    action: 'cancelBtn'
                                }
                                break;
                            case "0":  // 下单成功
                                data.status1 = "下单成功";
                                data.status2 = "商家接单";
                                data.status3 = "上门服务";
                                data.status4 = "确认完成";
                                data.images1 = "/common/images/11_03.png";
                                data.line1 = "/common/images/line3.png";
                                data.images2 = "/common/images/yuan.png";
                                data.line2 = "/common/images/line2.png";
                                data.images3 = "/common/images/yuan.png";
                                data.line3 = "/common/images/line2.png";
                                data.images4 = "/common/images/yuan.png";
                                data.button2 = {
                                    text: '取消订单',
                                    action: 'cancelBtn'
                                }
                                break;
                            case "1":  // 卖家已确认
                                data.status1 = "下单成功";
                                data.status2 = "商家接单";
                                data.status3 = "上门服务";
                                data.status4 = "确认完成";
                                data.images1 = "/common/images/11_03.png";
                                data.line1 = "/common/images/line3.png";
                                data.images2 = "/common/images/11_03.png";
                                data.line2 = "/common/images/line3.png";
                                data.images3 = "/common/images/yuan.png";
                                data.line3 = "/common/images/line2.png";
                                data.images4 = "/common/images/yuan.png";
                                /*if (paid && paid == "1") {
                                    if (data.totalPrice + data.fixFee > 0) {
                                        data.button1 = {
                                            text: '申请退款',
                                            action: 'refund'
                                        };
                                    }
                                }*/
                                data.button2 = {
                                    text: '确认完成',
                                    action: 'confirmBtn'
                                }
                                break;
                            case "10": // 卖家确认订单完成
                                data.status1 = "下单成功";
                                data.status2 = "商家接单";
                                data.status3 = "服务完成";
                                data.status4 = "等待确认";
                                data.images1 = "/common/images/11_03.png";
                                data.line1 = "/common/images/line3.png";
                                data.images2 = "/common/images/11_03.png";
                                data.line2 = "/common/images/line3.png";
                                data.images3 = "/common/images/11_03.png";
                                data.line3 = "/common/images/line.png";
                                data.images4 = "/common/images/yuan.png";
                                /*if (paid && paid == "1") {
                                    if (data.totalPrice + data.fixFee > 0) {
                                        data.button1 = {
                                            text: '申请退款',
                                            action: 'refund'
                                        };
                                    }
                                }*/
                                data.button2 = {
                                    text: '确认完成',
                                    action: 'confirmBtn'
                                }
                                break;
                            case "11": // 申请退款
                                data.status1 = "下单成功";
                                data.status2 = "商家接单";
                                data.status3 = "上门服务";
                                data.status4 = "申请退款";
                                data.images1 = "/common/images/11_03.png";
                                data.line1 = "/common/images/line3.png";
                                data.images2 = "/common/images/11_03.png";
                                data.line2 = "/common/images/line3.png";
                                data.images3 = "/common/images/yuan.png";
                                data.line3 = "/common/images/line2.png";
                                data.images4 = "/common/images/yuan.png";
                                /*data.button2 = {
                                    text: '取消退款',
                                    action: 'cancelApplyRefund'
                                }*/
                                break;
                            case "12": // 待仲裁
                                data.status1 = "下单成功";
                                data.status2 = "商家接单";
                                data.status3 = "上门服务";
                                data.status4 = "官方仲裁";
                                data.images1 = "/common/images/11_03.png";
                                data.line1 = "/common/images/line3.png";
                                data.images2 = "/common/images/11_03.png";
                                data.line2 = "/common/images/line3.png";
                                data.images3 = "/common/images/yuan.png";
                                data.line3 = "/common/images/line2.png";
                                data.images4 = "/common/images/yuan.png";
                                break;
                            case "2": // 交易成功
                            case "6": // 系统自动交易成功
                                data.status1 = "下单成功";
                                data.status2 = "商家接单";
                                data.status3 = "服务完成";
                                data.status4 = "确认完成";
                                data.images1 = "/common/images/11_03.png";
                                data.line1 = "/common/images/line3.png";
                                data.images2 = "/common/images/11_03.png";
                                data.line2 = "/common/images/line3.png";
                                data.images3 = "/common/images/11_03.png";
                                data.line3 = "/common/images/line3.png";
                                data.images4 = "/common/images/11_03.png";
                                data.button1 = {
                                    text: '再次购买',
                                    action: 'buyAgain'
                                }
                                /*data.button2 = {
                                    text: '评价',
                                    action: 'addComment'
                                }*/
                                break;
                            case "7": // 我已评价
                            case "8": // 系统自动五星评价
                                data.status1 = "下单成功";
                                data.status2 = "商家接单";
                                data.status3 = "服务完成";
                                data.status4 = "确认完成";
                                data.images1 = "/common/images/11_03.png";
                                data.line1 = "/common/images/line3.png";
                                data.images2 = "/common/images/11_03.png";
                                data.line2 = "/common/images/line3.png";
                                data.images3 = "/common/images/11_03.png";
                                data.line3 = "/common/images/line3.png";
                                data.images4 = "/common/images/11_03.png";
                                data.button2 = {
                                    text: '再次购买',
                                    action: 'buyAgain'
                                }
                                break;
                            case "4": // 我已取消
                            case "3": // 卖家已取消
                            case "13": // 系统取消
                                data.status1 = "下单成功";
                                data.status2 = "商家接单";
                                data.status3 = "上门服务";
                                data.status4 = "取消订单";
                                data.images1 = "/common/images/yuan.png";
                                data.line1 = "/common/images/line2.png";
                                data.images2 = "/common/images/yuan.png";
                                data.line2 = "/common/images/line2.png";
                                data.images3 = "/common/images/yuan.png";
                                data.line3 = "/common/images/line2.png";
                                data.images4 = "/common/images/11_03.png";
                                data.button2 = {
                                    text: '再次购买',
                                    action: 'buyAgain'
                                }
                                break;
                            case "5": // 未支付取消
                                data.status1 = "等待支付";
                                data.status2 = "商家接单";
                                data.status3 = "上门服务";
                                data.status4 = "取消订单";
                                data.images1 = "/common/images/yuan.png";
                                data.line1 = "/common/images/line2.png";
                                data.images2 = "/common/images/yuan.png";
                                data.line2 = "/common/images/line2.png";
                                data.images3 = "/common/images/yuan.png";
                                data.line3 = "/common/images/line2.png";
                                data.images4 = "/common/images/11_03.png";
                                data.button2 = {
                                    text: '再次购买',
                                    action: 'buyAgain'
                                }
                                break;
                        }
                        var action = data.action;
                        for (var i = 0; i < action.length; i++) {
                            var actionObj = action[i];
                            switch (actionObj.statusId) {
                                case "0":  // 下单成功
                                case "9":  // 待付款
                                    data.time1 = base.timeformat(actionObj.actionTime, "MM-dd HH:mm");
                                    break;
                                case "1":  // 卖家已确认
                                    data.time2 = base.timeformat(actionObj.actionTime, "MM-dd HH:mm");
                                    break;
                                case "10": // 卖家确认订单完成
                                    data.time3 = base.timeformat(actionObj.actionTime, "MM-dd HH:mm");
                                    break;
                                case "2": // 交易成功
                                    if (!data.time3) {
                                        data.time3 = base.timeformat(actionObj.actionTime, "MM-dd HH:mm");
                                    }
                                    data.time4 = base.timeformat(actionObj.actionTime, "MM-dd HH:mm");
                                    break;
                                case "5": // 未支付取消
                                case "6": // 交易成功
                                case "7": // 我已评价
                                case "8": // 系统自动五星评价
                                case "4": // 我已取消
                                case "3": // 卖家已取消
                                case "13": // 系统取消
                                case "12": // 待仲裁
                                case "11": // 申请退款
                                    data.time4 = base.timeformat(actionObj.actionTime, "MM-dd HH:mm");
                                    break;
                            }
                        }
                        that.orderhtml = data,
                        that.bill=(data.totalPrice + data.fixFee - data.couponBill).toFixed(2)
                    }else {
                        that.warn.show = true;
                        that.warn.texts = text.msg;
                    }
                }).catch(function (error) {
                    console.log(error)
                });
            },
            buybtn(status) {
                let that = this;
                let action = status.action;
                let orderId = that.orderhtml.orderId
                if(action == 'buyAgain'){
                    MIP.viewer.open(base.htmlhref.reservation+'?orderId=' + orderId, { isMipLink: true })
                    //再次购买
                }else  if(action == 'pay'){
                    let totalPrice = that.orderhtml.totalPrice
                    let couponBill = that.orderhtml.couponBill;
                    let couponId = that.orderhtml.couponId;
                    let fixFee = that.orderhtml.fixFee;
                    let redirectUrl = 'https://xiongzhang.baidu.com/opensc/wps/payment?id=1581486019780982&redirect='+ encodeURIComponent('http://test.daoway.cn/mip/components/mip-dw-orderdetail/example/mip-dw-orderdetail.html?orderId='+orderId);
                    MIP.setData({'payConfig':{
                        "fee": (totalPrice +fixFee - couponBill).toFixed(2),
                        "sessionId": that.token,
                        "redirectUrl":redirectUrl,
                        "postData":{
                            orderId: orderId,
                            token: that.token,
                            bill: (totalPrice + fixFee - couponBill).toFixed(2),
                            userId: that.userId,
                            wallet: 0,
                            couponId:couponId || '',
                            "appendOrderId": '',
                            "returnUrl":redirectUrl
                        }
                    }});
                    that.$emit('actionpay')
                }else if(action == 'cancelBtn'){
                    that.warn.show = true;
                    that.warn.texts = '确认取消该订单吗';
                    that.action = 'buyer_cancel'
                    //取消订单
                }else if(action == 'confirmBtn'){
                    //console.log(action)
                    that.warn.show = true;
                    that.warn.texts = '确认完成订单？';
                    that.action = 'buyer_confirm';
                    //确认完成
                }

            },
            close(){
                this.warn.show = false;
                this.warn.texts = '';
            },
            closeLayer(){
                let orderId = this.orderhtml.orderId;
                let action = this.action;
                this.closesure(orderId,action)
            },
            closesure(orderId,action){
                let that =this;
                let url = "/daoway/rest/order/" + orderId + "/" + action + "?channel=" + that.channel+"&userId="+ that.userId;
                fetch(url, {
                    method: 'POST',
                    credentials: "include",
                    headers: {'content-type': 'application/x-www-form-urlencoded'},
                }).then(function (res) {
                    if (res && res.status == "200") {
                        return res.json();
                    }
                }).then(function (text) {
                    if(text.status == 'ok'){
                        if(action == 'buyer_cancel'){
                            that.sure = false;
                            that.warn.show = true;
                            that.warn.texts = '订单已取消';
                        }else if(action == "buyer_confirm"){
                            that.sure = false;
                            that.warn.show = true;
                            that.warn.texts = '订单已完成';
                        }
                        setTimeout(() => {
                            that.warn.show = false
                        }, 600)
                        MIP.viewer.open(base.htmlhref.orderdetail+"?orderId="+that.orderId,{isMipLink: false})
                        //that.getState();
                    }else {
                        that.warn.show = true;
                        that.warn.texts = text.msg;
                    }
                }).catch(function (error) {
                    console.log(error)
                });
            },

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
    }
    .mipfds{
        width: 94%;
        margin: 0 auto 6px;
    }

    .theclose{width: 80%; margin: 0 auto}
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
        height: 110px;
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
        width: 88%;
        margin: 4px auto;
    }

    .line {
        margin-left: 2px;
        margin-right: 2px;
        width: 60px;
        height: auto;
    }
    .od-icon1{
        width: 24px;
        height: auto;
    }

    .icon img {
        display: inline-block;
        vertical-align: middle;
    }

    .statetit {
        width: 94%;
        margin: 8px auto 0;
    }

    .tit {
        color: #fcb3b0;
        display: inline-block;
        font-size: 12px;
        margin-left: 9%;
        vertical-align: top;
        position: relative;
        left: 6px;
    }

    .act {
        color: #fff;
    }

    .time {
        color: #ffe4e4;
        font-size: 12px;
        margin-top: 2px;
    }

    .buchajia {
        width: 94%;
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
    }


    .xiangmu {
        width: 97%;
        margin-left: 3%;
        border-bottom: 1px solid #e5e5e5;
        line-height: 35px;
        height: 35px;
    }

    .xiangmu div {
        display: inline-block;
    }

    .xtit {
        width: 70%;
    }

    .xtit2 {
        width: 18%;
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
    }

    .user div, .city div {
        display: inline-block;
        line-height: 30px;
    }

    .user{
       height: 30px;
    }

    .last {
        margin-bottom: 55px;
        height: 10px;
    }

    .footer {
        width: 100%;
        height: 50px;
        background: #fff;
        padding: 0 3%;
        border-top: 1px solid #e5e5e5;
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
</style>
