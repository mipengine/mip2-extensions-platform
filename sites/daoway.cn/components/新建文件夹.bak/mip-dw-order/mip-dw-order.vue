<template>
    <div class="wrapper">

        <div class="order-nav">
            <div class="list acty" >
                <img src="https://www.daoway.cn/h5/image/dingdanye_03.png">全部
                <div class="number">4</div>
            </div>
            <div class="list" >
                <img src="https://www.daoway.cn/h5/image/dingdanye_12.png">待付款
                <div></div>
            </div>
            <div class="list " >
                <img src="https://www.daoway.cn/h5/image/dingdanye_07.png">进行中
                <div></div>
            </div>
            <div class="list " >
                <img src="https://www.daoway.cn/h5/image/dingdanye_05.png">已完成
                <div></div>
            </div>
            <div class="list " >
                <img src="https://www.daoway.cn/h5/image/dingdanye_09.png">待评价
                <div></div>
            </div>
        </div>
        <div class="order-box">
            <div class="orderbox">
                <div class="orderitem">
                    <div class="ordertit">
                        <img class="order-home" src="https://www.daoway.cn/h5/image/home1.png">店铺设计
                        <div class="quxiao">订单已完成</div>
                    </div>
                    <div>
                        <div class="ordername">
                            <img src="http://img.daoway.cn/img/2017/04/11/ceb6c9a9-6204-4b5b-9bdc-bae3dda0334b.jpg"  class="ordernameimg">
                            <div class="name">上门保洁</div>
                            <div class="orderprice">88元
                                <div class="num">x9</div>
                            </div>
                        </div>
                        <div class="ordername">
                            <img src="http://img.daoway.cn/img/2017/04/11/ceb6c9a9-6204-4b5b-9bdc-bae3dda0334b.jpg"  class="ordernameimg">
                            <div class="name">上门保洁</div>
                            <div class="orderprice">88元
                                <div class="num">x1</div>
                            </div>
                        </div>
                    </div>
                    <div class="data">
                        <div class="dataleft">2018-07-13 16:57</div>
                        <div class="dataright">共22件
                            <div class="dr">总价:
                                <div>99</div>
                                元
                            </div>
                        </div>
                    </div>
                    <div class="btn">
                        <div class="btnright">
                            <button class="red">再次购买</button>
                            <button>评价</button>
                        </div>
                    </div>
                </div>
                <div class="noorder" style="display: none">
                    <img src="https://www.daoway.cn/h5/image/dingdanye_03.png" style="width:100px; height:100px">
                    <div class="classname">还没有订单哦~</div>
                    <div class="classname">快去挑选心怡的服务吧~</div>
                </div>
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


    .order-nav {
        width: 100%;
        height: 70px;
        position: fixed;
        top: 0;
        left: 0;
        background: #fff;
        padding-top: 15px;
        z-index: 100;
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
        width: 15px;
        height: 15px;
        line-height: 15px;
        text-align: center;
        border: 1px solid #f93030;
        color: #f93030;
        border-radius: 100%;
        font-size: 12px;
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
        margin-top: 30%;
        text-align: center
    }

    .noorder div {
        font-size: 14px;
        color: #8f8f8f;
        position: relative;
        bottom: 100px;
        line-height: 40px
    }

    .order-home{
        width: 15px;
        height: auto;
        margin-right: 5px;
        position: relative;
        top:2px;
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
