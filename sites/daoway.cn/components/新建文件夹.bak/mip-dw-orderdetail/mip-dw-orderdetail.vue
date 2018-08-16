<template>
    <div class="wrapper">


        <div class="stabox">
            <div class="state">
                <div class="icon">
                    <img class="od-icon1" src="http://www.daoway.cn/images/11_03.png">
                    <img src="http://www.daoway.cn/images/line3.png" class="line">
                    <img class="od-icon1" src="http://www.daoway.cn/images/11_03.png" style="width:24px; height:auto">
                    <img src="http://www.daoway.cn/images/line3.png" class="line">
                    <img class="od-icon1" src="http://www.daoway.cn/images/11_03.png">
                    <img src="http://www.daoway.cn/images/line3.png" class="line">
                    <img class="od-icon1" src="http://www.daoway.cn/images/11_03.png">
                </div>
                <div class="statetit">
                    <div style="margin-left:0" class="tit">下单成功
                        <div class="time">01-12 14:24</div>
                    </div>
                    <div class="tit act">商家接单
                        <div class="time">01-12 14:24</div>
                    </div>
                    <div class="tit">上门服务
                        <div class="time">01-12 14:24</div>
                    </div>
                    <div class="tit">确认完成
                        <div class="time">01-12 14:24</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="bigdiv">
            <div class="buchajia">
                <div class="name">测试</div>
            </div>
            <div class="xiangmu"  style="line-height: 90px;height: 90px;">
                <div class="xtit">上门保洁</div>
                <div>x6</div>
                <div class="price">99元</div>
            </div>
            <div class="xiangmu small" >
                <div class="xtit">退款金额</div>
                <div class="price red">-20</div>
            </div>
            <div class="xiangmu small">
                <div class="xtit">补差价</div>
                <div class="price">99元</div>
            </div>
            <div class="xiangmu small" >
                <div class="xtit">上门费</div>
                <div class="price">20元</div>
            </div>
            <div class="xiangmu small">
                <div class="xtit">增项费用</div>
                <div class="price">99元</div>
            </div>
            <div class="xiangmu small">
                <div class="xtit">代金券</div>
                <div class="price red">-30元</div>
            </div>
            <div class="xiangmu small" style="border-bottom:none ">
                <div class="price">待付金额:
                    <div class="red">88元</div>
                </div>
                <div class="price">实付金额:
                    <div class="red">22元</div>
                </div>
            </div>
        </div>
        <div class="address">
            <div class="user">小明
                <div class="phone">13265252632</div>
            </div>
            <div class="city">北京市朝职区时代家园5号楼4层
            </div>
        </div>
        <div class="bigdiv">
            <div class="buchajia" style="height:45px; line-height:45px ">订单信息</div>
            <div class="xiangmu">
                <div class="xtit2">预约时间:</div>
                <div class="red">2018-12-02</div>
            </div>
            <div class="xiangmu">
                <div class="xtit2">服务人员:</div>
                <div>小明</div>
            </div>
            <div class="xiangmu noborder">
                <div class="xtit2">订单备注:</div>
                <div>没有</div>
            </div>
        </div>
        <div class="od-daigou">该订单由您的好友小明小为您订购</div>
        <div class="last"></div>
        <div class="footer">
            <div class="call">
                <img src="http://www.daoway.cn/call.png" style="width:20px; height:auto">联系商家
            </div>
            <div class="rightbtn">
                <button>申请退款</button>
                <button class="bgred">确认完成</button>
            </div>
        </div>

    </div>
</template>
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
        margin-left: 6%;
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
        height: 70px;
    }

    .user div, .city div {
        display: inline-block;
    }


    .last {
        margin-bottom: 55px;
        height: 10px;
    }

    .footer {
        position: fixed;
        bottom: 0;
        width: 100%;
        height: 50px;
        background: #fff;
        z-index: 99;
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
        padding: 10px 0 0;
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
        margin-top: 7px;
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

<script>
    import base from '../../common/utils/base'
    import '../../common/utils/base.less'
    base.setHtmlRem()
    export default {
        data(){
            return {}
        },
        mounted () {
        },
        methods: {}

    }
</script>
