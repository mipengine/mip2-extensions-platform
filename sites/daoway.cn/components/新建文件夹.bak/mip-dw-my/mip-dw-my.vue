<template>
    <div class="wrapper">
        <div class="mybg" >
            <img src="http://www.daoway.cn/images/myicon.png" class="myicon">
            <div class="txt">
                <div class="username">小明明
                    <img src="http://www.daoway.cn/images/h.png" class="starimg">
                </div>
            </div>
            <div class="txt2" style="display: none">请登录</div>
        </div>
        <div class="mylist" style='margin-top:0; border:0' >
            <div class="item">
                <img src="http://www.daoway.cn/images/quan.png" class="cartimg" style="width:20px; height:20px">
                <div class="cart">代金券</div>
                <div class="carttel">9张<img class="m-more" src="https://www.daoway.cn/h5/image/go_06.png"></div>
            </div>
        </div>
        <div class="mylist">
            <div class="item" >
                <img src="http://www.daoway.cn/images/tel.png" class="cartimg"  style="width:20px; height:20px">
                <div class="cart">联系客服</div>
                <div class="carttel">132688888888<img class="m-more" src="https://www.daoway.cn/h5/image/go_06.png"></div>
            </div>
        </div>
        <div class="mylist">
            <div class="item">
                <img src="http://www.daoway.cn/images/about.png" class="cartimg"  style="width:20px; height:20px">
                <div class="cart">关于</div>
                <div class="carttel"><img class="m-more" src="https://www.daoway.cn/h5/image/go_06.png"></div>
            </div>
        </div>
        <div class="exit">退出登录</div>

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

    .mybg {
        width: 700px;
        height: 134px;
        position: relative;
        padding: 35px 15px;
        color: #fff;
        background: -webkit-linear-gradient(#fd5f46, #fd322b);
        background: linear-gradient(#fd5f46, #fd322b);

    }


    .username, .txt, .starimg, .myicon, .set, .rightarrow {
        display: inline-block;
    }
    .username{
        font-size: 18px;
    }

    .myicon {
        width: 64px;
        height: 64px;
        border-radius: 100%;
        border: 3px solid #fff;
        margin-left: 10px;
    }

    .txt {
        width: 60%;
        line-height: 30px;
        vertical-align: top;
        margin-top: 15px;
        margin-left: 10px;
    }

    .txt2 {
        width: 60%;
        line-height: 30px;
        vertical-align: top;
        margin-top: 15px;
        margin-left: 10px;
    }

    .starimg {
        width: 17px;
        height: 17px;
        position: relative;
        top: 2px;
        margin-right: 3px;
    }


    .mylist {
        width: 100%;
        background: #fff;
        margin-top: 10px;
    }

    .cart {
        display: inline-block;
        color: #4c4c4c;
        font-size: 16px
    }

    .cartimg {
        position: absolute;
        top: 12px;
        left: 1.5%;
    }

    .item {
        margin-left: 1.5%;
        width: 97%;
        height: 40px;
        line-height: 40px;
        position: relative;
    }

    .cart {
        margin-left: 10%;
    }


    .carttel {
        float: right;
        margin-right: 3%;
        color: #898989;
        font-size: 14px
    }

    .exit {
        text-align: center;
        width: 94%;
        margin: 0 3%;;
        border: none;
        border-radius: 5px;
        height: 40px;
        line-height: 40px;
        background: #fff;
        margin-top: 20px;
        color: #4c4c4c;
        font-size: 16px
    }
    .m-more{
        width: 7px;
        height: auto;
        margin-left: 5px;
    }

</style>

<script>
    let bseurl = 'https://test.daoway.cn/daoway/rest';
    import base from '../../common/utils/base'
    import '../../common/utils/base.less'
    base.setHtmlRem()
    export default {
        data(){
            return {}
        },
        mounted () {

        },
        methods: {


        }
    }
</script>
