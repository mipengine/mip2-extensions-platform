<template>
    <div class="wrapper">

        <div class="order-nav">
            <mip-fixed type="top">
                <div class="list" @click="changeTab(index)" :class="{acty:o.id == filter?'acty':none}" v-for="(o,index) in orderitems">
                    <img :src="o.image">{{o.name}}
                    <div class="number" v-if="o.count>0 && o.name!= '全部'">{{o.count}}</div>
                </div>
            </mip-fixed>
        </div>
        <div class="order-box">
            <div class="orderbox" >
                <div class="orderitem" v-for="i in orderitems[index]['items']">
                    <div class="ordertit">
                        <img class="order-home" src="https://www.daoway.cn/h5/image/home1.png">{{i.service.title}}
                        <div class="quxiao">{{i.statusDesc}}</div>
                    </div>
                    <div>
                        <div class="ordername" v-for="m in i.items" @click="toorderdetail(i.orderId)">
                            <img :src="m.picUrl"  class="ordernameimg">
                            <div class="name">{{m.name}}</div>
                            <div class="orderprice">{{m.price}}元
                                <div class="num">x{{m.quantity}}</div>
                            </div>
                        </div>
                    </div>
                    <div class="data">
                        <div class="dataleft">{{i.modifyTime}}</div>
                        <div class="dataright">共{{i.totalQuantity}}件
                            <div class="dr">总价:
                                <div>{{i.totalPrice + i.fixFee}}</div>
                                元
                            </div>
                        </div>
                    </div>
                    <div class="btn">
                        <div class="btnright">
                            <button v-if="i.button1" v-bind:param="i.button1.param" @click="toaction(i.button1)" class="red">{{i.button1.text}}</button>
                            <button v-if="i.button2" v-bind:param="i.button2.param" @click="toaction(i.button2)" class="red">{{i.button2.text}}</button>
                        </div>
                    </div>
                </div>
                <p class="loding" v-if="loding">加载中...</p>
                <div class="noorder" v-if="noList">
                    <img src="https://www.daoway.cn/h5/image/dingdanye_03.png">
                    <div class="classname">还没有订单哦~</div>
                    <div class="classname">快去挑选心怡的服务吧~</div>
                </div>
                <div v-if="noMoreList" class="zhexie">~暂时只有这些了~</div>
            </div>
        </div>
        <mip-fixed class="mipfd" type="bottom">
            <div class="bottomnav">
                <a  data-type="mip" data-title="首页" href="/components/mip-dw-index/example/mip-dw-index" @click="toindex"><img src="/common/images/home2.png">首页</a>
                <a class="regclolr" data-type="mip" data-title="订单" href="/components/mip-dw-order/example/mip-dw-order"><img src="/common/images/order.png">订单</a>
                <a data-type="mip" data-title="我的" href="/components/mip-dw-my/example/mip-dw-my"><img src="/common/images/my2.png">我的</a>
            </div>
        </mip-fixed>
        <div v-show="warn.show" class="layer">
            <div class="layer-content zoomIn">
                <p class="layer-text" v-text="warn.texts"></p>
                <div class="theclose">
                    <p v-if="sure" class="layer-sure active-layer" @click="close">取消</p>
                    <p v-if="sure" class="layer-sure active-layer" @click="closeLayer">确定</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import base from '../../common/utils/base'
    import login from '../../common/utils/login'
    export default {
        props: {
            payConfig: {
                type: Object,
                default: function () { return {} }
            },
        },
        data(){
            return {
                index: 0,
                filter: 'ALL',
                noList: false,
                noMoreList: false,
                userPhone: '',
                loading:'',
                param:{},
                sure:true,
                action:'',
                warn: {
                    // 弹窗
                    show: false,
                    texts: ''
                },
                orderitems : [
                    {
                        id: 'ALL',
                        name: '全部',
                        image: "/common/images/dingdanye_03.png",
                        count: 0,
                        items: []
                    }, {
                        id: 'PENDING_PAY',
                        name: '待付款',
                        image: "/common/images/dingdanye_12.png",
                        count: 0,
                        items: []
                    }, {
                        id: 'ONGOING2',
                        name: '进行中',
                        image: "/common/images/dingdanye_07.png",
                        count: 0,
                        items: []
                    }, {
                        id: 'COMPLETED',
                        name: '已完成',
                        image: "/common/images/dingdanye_05.png",
                        count: 0,
                        items: []
                    }, {
                        id: 'PENDING_COMMENT',
                        name: '待评价',
                        image: "/common/images/dingdanye_09.png",
                        count: 0,
                        items: []
                    }
                ],
                redirect_uri:'http://test.daoway.cn/mip/components/mip-dw-order/example/mip-dw-order.html',
                client_id:'vnQZ7pPB0gsWHZZF4n6h0WDOl8KOr7Lq',
                ClientSecret:'kM6rbBN43zhAEOFxeQ9Wnj2MzVzkROA0',
                code: base.getRequest(location.href).code,
                userId:localStorage.getItem('userId'),
                token:localStorage.getItem('token'),
                sw:true,
                loding:false,
                channel:'baidu'
            }
        },
        mounted () {
            if(this.token && this.userId){
                this.getOrderList(0)
                window.addEventListener('scroll', this.morelist)
            }else {
                if(this.code){
                    login.codelogin(this.code);
                }else {
                    this.goLoginPage();
                }
            }

        },
        methods: {
            getOrderList(index) {
                let that = this;
                let orderitems = that.orderitems;
                let orderitem = orderitems[index];
                let status = "";
                let filter = orderitem.id;
                if (that.loading === filter)return;
                that.loading = filter;
                if (filter != 'ALL') {
                    status = "&status=" + filter;
                }
                var start = orderitem.items.length;
                let url = "/daoway/rest/orders/bought_by/" + that.userId + "?channel=" + that.channel + "&start=" + start + "&size=30" + status;

                fetch(url, {
                    method: 'get',
                    credentials: "include"
                }).then(function (res) {
                    if (res && res.status == "200") {
                        return res.json();
                    }
                }).then(function (text) {
                    var len =text.data.length;
                    if (len == 0) {
                        if (start == 0) {
                            orderitem.loading = 'noList';
                            // 没有评论
                            that.index = index,
                            that.filter = filter,
                            that.noList =  true
                            that.noMoreList = false

                        } else {
                            orderitem.loading = 'noMoreList';
                            that.index = index,
                            that.filter = filter,
                            that.noList =  false
                            that.noMoreList = true
                        }
                        return;
                    }

                    for (var i = 0; i < len; i++) {
                        var item = text.data[i];
                        var statusId = item.statusId;
                        switch (statusId) {
                            case "5":
                            case "4":
                            case "3":
                                item.className = "gray";
                                break;
                            case "11":
                            case "12":
                                item.className = "green";
                                break;
                            default: item.className = "";
                        }
                        switch (statusId) {
                            case "9":
                                item.button1 = {
                                    text: "立即支付",
                                    action: 'pay',
                                    param: {
                                        orderid: item.orderId,
                                        coupon: item.coupon,
                                        fixFee: item.fixFee,
                                        totalPrice: item.totalPrice,
                                        couponId: item.couponId
                                    }
                                };
                                item.button2 = {
                                    text: "取消订单",
                                    action: 'cancelBtn',
                                    param: item.orderId
                                };
                                break;
                            case "0":
                                item.button1 = null;
                                item.button2 = {
                                    text: "取消订单",
                                    action: 'cancelBtn',
                                    param: item.orderId
                                };
                                break;
                            case "1":
                            case "10":
                                item.button1 = {
                                    text: "确认订单",
                                    action: 'confirmBtn',
                                    param: item.orderId
                                };
                                /*var appendBill = item.appendBill;
                                 if (appendBill == 0) {
                                 item.button2 = {
                                 text: "补差价",
                                 action: 'fn',
                                 param: item.orderId
                                 };
                                 } else {
                                 item.button2 = null;
                                 }*/
                                item.button2 = null;
                                break;
                            case "2":
                            case "6":
                                item.button1 = {
                                    text: "再次购买",
                                    action: 'buyAgain',
                                    param: {
                                        orderId: item.orderId,
                                        serviceId: item.service.id
                                    }
                                };
                            /*item.button2 = {
                                    text: "评价",
                                    action: 'addComment',
                                    param: {
                                        orderId: item.orderId,
                                        title: item.service.title,
                                        imgurl: item.servImgUrl
                                    }
                                };
                                break;*/
                            case "7":
                            case "4":
                            case "3":
                            case "5":
                            case "8":
                                item.button1 = {
                                    text: "再次购买",
                                    action: 'buyAgain',
                                    param: {
                                        orderId: item.orderId,
                                        serviceId: item.service.id
                                    }
                                };
                                item.button2 = null;
                                break;
                           /* case "11":
                                item.button1 = {
                                    text: "联系商家",
                                    action: 'phoneCall',
                                    param: item.seller.phone
                                };
                                item.button2 = null;
                                break;
                            case "12":
                                item.button1 = {
                                    text: "联系商家",
                                    action: 'phoneCall',
                                    param: item.seller.phone
                                };
                                item.button2 = null;
                                break;*/
                        }
                        item.modifyTime = base.timeformat(item.modifyTime, "yyyy-MM-dd HH:mm");
                        var tempItems = item.items;
                        item.totalQuantity = 0;
                        for (var t = 0, l = tempItems.length; t < l; t++) {
                            item.totalQuantity += tempItems[t].quantity
                        }
                    }
                    orderitem.items = orderitem.items.concat(text.data);
                    for (var c = 0; c < 5; c++) {
                        var ct = orderitems[c];
                        var id = ct.id;

                        switch (id) {
                            case 'ALL':
                                ct.count = text.total;
                                break;
                            case 'ONGOING2':
                                ct.count = text.onging;
                                break;
                            // case 'NEW':
                            //  ct.count = result.new;
                            //  break;
                            case 'PENDING_PAY':
                                ct.count = text.pending_pay;
                                break;
                            case 'PENDING_COMMENT':
                                ct.count = text.pending_comment;
                                break;
                        }
                    }
                    that.index = index;
                    that.filter = filter;
                    that.sw = true;
                    that.orderitems = orderitems

                }).catch(function (error) {
                    console.log(error)
                });
            },
            changeTab: function (index) {
                let that = this;
                let orderitems = that.orderitems;
                let tager = orderitems[index];
                let loading = tager.loading;
                let items = tager.items;
                let start = items.length;
                let filter = tager.id;
                if (loading == "noList") {
                    // 没有评论
                    that.filter = filter;
                    that.noList = true;
                    that.noMoreList = false;
                    that.index = index;
                } else {
                    if (start == 0) {
                        that.noList = false;
                        that.noMoreList = false;
                        that.getOrderList(index);
                    } else {
                        // 从原有记录里加载
                        that.filter = filter;
                        that.noList = false;
                        that.noMoreList = false;
                        that.index = index;
                    }
                }
            },
            // 完成订单
            toaction: function (param) {
                var that = this;
                let payparam = param.param
                var text = param.text;
                if(param.text == '再次购买'){
                    MIP.viewer.open(base.htmlhref.reservation+'?orderId=' + param.param.orderId, { isMipLink: true })
                }else if(param.text == '确认订单'){
                    that.warn.show = true;
                    that.warn.texts = '确认订单完成？';
                    that.param = param;
                }else if(param.text == '取消订单'){
                    that.warn.show = true;
                    that.warn.texts = '确定取消订单？';
                    that.param = param;
                }else if(param.text == '立即支付'){
                    let redirectUrl = 'https://xiongzhang.baidu.com/opensc/wps/payment?id=1581486019780982&redirect='+ encodeURIComponent('http://test.daoway.cn/mip/components/mip-dw-orderdetail/example/mip-dw-orderdetail.html?orderId='+payparam.orderid);
                    MIP.setData({'payConfig':{
                        "fee": (payparam.totalPrice + payparam.fixFee - payparam.coupon).toFixed(2),
                        "sessionId": that.token,
                        "redirectUrl":redirectUrl,
                        "postData":{
                            orderId: payparam.orderid,
                            token: that.token,
                            bill: (payparam.totalPrice + payparam.fixFee - payparam.coupon).toFixed(2),
                            userId: that.userId,
                            wallet: 0,
                            couponId:payparam.couponId || '',
                            "appendOrderId": '',
                            "returnUrl":redirectUrl
                        }
                    }});
                    that.$emit('actionpay');
                }
            },
            close(){
                this.warn.show = false;
            },
            closeLayer(){
                let orderId = this.param.param;
                let action = '';
                if(this.param.text == "取消订单"){
                    action = 'buyer_cancel'
                }else if(this.param.text == "确认订单"){
                    action = 'buyer_confirm'
                }
                this.closesure(orderId,action)
            },
            closesure(orderId,action){
                let that = this;
                let url = "/daoway/rest/order/" + orderId + "/" + action + "?channel=" + that.channel +"&userId="+ that.userId;
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
                            that.warn.show = false;
                            MIP.viewer.open(base.htmlhref.order,{isMipLink: false})
                        }, 600)

                    }else {
                        that.warn.show = true;
                        that.warn.texts = text.msg;
                    }
                }).catch(function (error) {
                    console.log(error)
                });
            },
            toorderdetail(id){
                MIP.viewer.open(base.htmlhref.orderdetail+'?orderId='+id, { isMipLink: true })
            },
            goLoginPage: function () {
                let that = this;
                let url = 'https://openapi.baidu.com/oauth/2.0/authorize?response_type=code&client_id='+that.client_id+'&redirect_uri='+that.redirect_uri+'&scope=snsapi_userinfo&state=STATE';
                MIP.viewer.open(url)
            },
            morelist(){
                let that = this;
                let index  = that.index;
                let orderitems = that.orderitems;
                let tager = orderitems[that.index];
                if(document.body.scrollTop||document.documentElement.scrollTop + window.innerHeight >= document.body.offsetHeight) {
                        that.loading = tager.loading;
                        if (that.loading != "noList") {
                            if (that.loading != "noMoreList") {
                                if(that.sw==true){
                                    that.sw = false;
                                    setTimeout(() => {
                                        that.loding = true
                                    }, 10)
                                    that.getOrderList(index);
                                }
                            } else {
                                // 暂时只有这些了
                                that.noList = false;
                                that.noMoreList = true
                            }
                    }
                }
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
    .theclose{width: 80%; margin: 0 auto}
    .layer p.active-layer{
        width: 50%;
        float: left;
        margin: 0;
        border-radius: 0;
    }
    .zhexie{
        text-align: center;
        margin-bottom: 10px;
    }
    .layer p:first-child{
        border-radius: 0;
        border-right: 1px solid #ededed;
    }
    .regclolr{
        color:#f64e4e ;
    }
    .loding{
        text-align: center;
    }

    body,body:before{
        background: #f5f5f5;
    }
    .orderbox{
        margin-bottom: 50px;
    }
    .noorder img{
        width: 100px;
        height: auto
    }
    .noorder{
        padding-top: 40%;
    }

    .bottomnav{
        width: 100%;
        background: #fff;
        border-top: 1px solid #ededed;
    }
    .bottomnav a{
        line-height: 23px;
        display: inline-block;
        width: 32%;
        text-align: center;
        font-size: 12px;
        margin-top: 5px;
    }
    .bottomnav a img{
        width: 25px;
        height: auto;
        display: block;
        text-align: center;
        margin: 0 auto;
    }

    .mipfd{
        width: 100%;
        height: 70px;
        background: #fff;
        padding-top: 10px;
    }
    .order-nav img{
        width: 20px;
        height: auto;
    }

    .list {
        float: left;
        margin: 0 2%;
        width: 16%;
        text-align: center;
        font-size: 14px;
        color: #4c4c4c;
        position: relative;
        height: 55px;
    }

    .order-box {
        margin-top: 80px;
    }

    .list img {
        display: block;
        margin: 0 auto 5px;
    }

    .number {
        position: absolute;
        top: -8px;
        right: 26%;
        width: 16px;
        height: 16px;
        line-height: 16px;
        text-align: center;
        border: 1px solid #f93030;
        color: #f93030;
        border-radius: 100%;
        font-size: 10px;
        z-index: 99;
        background: #fff;
    }

    .orderitem {
        margin-top: 10px;
        background: #fff;
    }

    .ordertit {
        height: 40px;
        line-height: 40px;
        margin: 0 2%;
    }

    .homeimg {
        position: relative;
        top: 4px;
        margin-right: 5px;
    }

    .rig {
        display: inline-block;
        vertical-align: top;
        margin-top: 20px;
        margin-left: 2px;
    }

    .quxiao {
        float: right;
        color: #f64e4e;
    }

    .ordername {
        width: 100%;
        background: #f5f5f5;
        padding: 6px 3%;
    }

    .ordernameimg {
        width: 52px;
        height: 52px;
    }

    .name, .ordernameimg {
        display: inline-block;
    }

    .name {
        vertical-align: top;
        margin-top: 15px;
        margin-left: 5px;
    }

    .orderprice {
        float: right;
        margin-top: 13px;
    }

    .num {
        display: block;
        color: #8b8b8b;
        margin-top: 5px;
        text-align: right;
    }

    .data {
        height: 40px;
        line-height: 40px;
        padding: 0 3%;
        color: #898989;
        font-size: 14px;
    }

    .dataleft, .dataright, .dr, .dr div {
        display: inline-block;
    }

    .dataright {
        float: right;
        font-size: 14px;
    }

    .dr {
        margin-left: 5px;
    }

    .dr div {
        font-size: 14px;
        color: #212121;
    }

    .btn {
        width: 100%;
        border-top: 1px solid #e5e5e5;
        height: 45px;
        position: relative;
        margin-top: 0;
    }

    .btnright {
        position: absolute;
        right: 2.5%;
    }

    .btnright button {
        margin-top: 6px;
        margin-left: 10px;
        padding: 4px 8px;
        border-radius: 4px;
        background: none;
        border: 1px solid #898989;
        color: #898989;
    }

    .btnright button.red{
        border: 1px solid #f64e4e;
        color: #f64e4e;
    }

    .acty {
        border-bottom: 2px solid #f64e4e;
    }


    .daiding div {
        margin-right: 10px;
        margin-bottom: 6px;
    }

    .noorder {
        width: 100%;
        text-align: center
    }

    .noorder div {
        font-size: 14px;
        color: #8f8f8f;
        line-height: 30px
    }

    .order-home{
        width: 15px;
        height: auto;
        margin-right: 5px;
        position: relative;
        top:2px;
    }


</style>

