<template>
    <div class="wrapper">
        <div class="re-input">
            <div class="line"><img src="https://www.daoway.cn/h5/image/line.jpg"></div>
            <mip-form>
                <ul class="re-form">
                    <li><img src="https://www.daoway.cn/images/icon2.jpg"><input type="text" placeholder="请填写您的住址"><img
                            class="re-more" src="https://www.daoway.cn/h5/image/go_06.png"></li>
                    <li><img src="https://www.daoway.cn/images/icon3.jpg"><input type="text" placeholder="请输入具体楼号、门牌号">
                    </li>
                    <li><img src="https://www.daoway.cn/images/icon4.jpg"><input type="text" placeholder="联系人"></li>
                    <li><img src="https://www.daoway.cn/images/icon5.jpg"><input type="number" maxlength="11"
                                                                                 placeholder="联系电话"></li>
                </ul>
            </mip-form>
            <div class="line2"><img src="https://www.daoway.cn/h5/image/line.jpg"></div>
        </div>
        <div class="re-input re-input2">
            <ul class="re-form re-form2">
                <li><span><img src="https://www.daoway.cn/images/icon2.jpg">服务时间</span>
                    <div><i class="re-time">07月19日(今天) 17:30</i><img class="re-more"
                                                                     src="https://www.daoway.cn/h5/image/go_06.png">
                    </div>
                </li>
                <li><span><img src="https://www.daoway.cn/images/icon3.jpg">服务人员</span>
                    <div><i class="re-tech">小明 女 <img
                            src="http://images.yishengdaojia.cn/upload/20180418/305337747c636c0b7fd06ed5c2e4e39c.jpg"></i><img
                            class="re-more" src="https://www.daoway.cn/h5/image/go_06.png"></div>
                </li>
            </ul>
        </div>

        <div class="re-input2">


            <div class="goumai">
                <div class="gimg">
                    <img class="re-iconm"
                         src="http://img.daoway.cn/img/2016/08/10/5010f717-6a00-460c-b241-7231eb15dc64_thumb.jpg">
                    <div class="gtit">
                        <div class="gtitname">上门保洁</div>
                        88元/次
                    </div>
                    <div class="gadd">
                        <img class="jian" src="http://www.daoway.cn/images/jia.jpg">
                        <div class="nub">12</div>
                        <img class="jia" src="http://www.daoway.cn/images/jian.jpg">
                    </div>
                </div>
                <div class="quan">
                    <div class="quantxt">代金券</div>
                    <div class="noquan act">宜生到家 首单代金券</div>
                    <div class="guize guize1">-55元<img class="re-more" src="https://www.daoway.cn/h5/image/go_06.png">
                    </div>
                </div>
                <div class="quan" style="padding:8px 0">
                    <div class="quantxt">备注</div>
                    <input class="note" placeholder="如有特殊要求，请给商家留言"/>
                </div>
            </div>
            <div class="project">
                <div class="project-tit">服务金额
                    <div class="price">99</div>
                </div>
                <div class="project-tit">上门费
                    <div class="price">88元</div>
                </div>
                <div class="project-tit ">优惠金额
                    <div class="price">22</div>
                </div>
                <div class="project-tit">夜间上门费
                    <div class="price">30</div>
                </div>

            </div>
            <div class="footer">
                <div class="gomai">
                    待支付
                    <div class="pricenum">77元</div>
                    <button class="btn2">立即购买</button>
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

    .re-form {
        margin-left: 3%
    }

    .re-form li {
        line-height: 42px;
    }

    .re-form li img {
        width: 13px;
        height: auto
    }

    .re-form2 li img {
        margin-right: 10px;
        position: relative;
        top: 2px
    }

    .re-input {
        background: #fff;
        font-size: 0
    }

    .re-form input {
        width: 88%;
        margin-left: 3%;
        display: inline-block;
        height: 40px;
        line-height: 40px;
        border-bottom: 1px solid #ececec;
        font-size: 14px
    }

    .re-form li:last-child input {
        border: none
    }

    .re-form li img.re-more, .re-more {
        width: 8px;
        height: auto
    }

    .re-input2 {
        margin-top: 10px;
        font-size: 14px;
        background: #fff
    }

    .re-form2 span {
        display: inline-block;
        width: 30%;
        color: #898989
    }

    .re-form2 div {
        float: right;
        width: 60%;
        border-bottom: 1px solid #ececec;
        text-align: right
    }

    .re-form2 li {
        border-bottom: 1px solid #ececec
    }

    .re-form2 li:last-child {
        border: none
    }

    .re-time {
        color: red;
        margin-right: 5px
    }

    .re-form2 li .re-tech img {
        width: 20px;
        height: 20px;
        border-radius: 100% 100%;
    }

    .re-iconm {
        width: 60px;
        height: 60px;
        border-radius: 3px;
    }

    .jia, .jian {
        width: 25px;
        height: 25px
    }

    .quan .re-more {
        position: relative;
        top: 2px;
        margin-left: 5px
    }

    .goumai {
        margin: 0 auto;
        width: 98%;
        padding: 10px 0 10px 2%;
    }

    .gimg {
        border-bottom: 1px solid #e5e5e5;
        padding-bottom: 10px;
    }

    .gtitname {
        margin-bottom: 36px;
    }

    .gtit {
        margin-left: 16px;
        margin-top: 10px;
    }

    .gtit, .gadd {
        display: inline-block;
        vertical-align: top;
    }

    .gadd {
        float: right;
        width: 25%;
        margin-top: 36px;
    }

    .noquan {
        color: #d1d1d1;
        margin-left: 16px;

    }

    .quan div {
        display: inline-block;
    }

    .quan {
        border-bottom: 1px solid #e5e5e5;
        padding: 15px 0;
    }

    .note {
        width: 80%;
        display: inline-block;
        margin-left: 40px;
        vertical-align: middle;
        padding: 8px 0;
    }

    .project {
        width: 94%;
        margin-bottom: 100px;
        margin-left: 3%;
    }

    .project-tit {
        height: 30px;
        line-height: 30px;
        width: 100%;
        color: #4c4c4c;
    }

    .project-tit div {
        float: right;
        padding: 0 8px;
    }

    .footer {
        position: fixed;
        bottom: 0;
        height: 50px;
        width: 100%;
        background: #fff;
        z-index: 99;
        text-align: inherit;
        border-top: 1px solid #e5e5e5
    }

    .guize {
        float: right;
        margin-right: 12px;
    }

    .footxt img {
        margin-right: 10px;
    }

    .pricenum {
        display: inline-block;
        font-size: 20px;
    }

    .gomai {
        height: 50px;
        line-height: 50px;
        padding: 0 3%;
        font-size: 14px;
    }

    .btn2 {
        width: 40%;
        text-align: center;
        height: 36px;
        line-height: 36px;
        margin-top: 6px;
        float: right;
        font-size: 14px;
        background: #e63020;
        color: #fff;
        outline: none;
        border-radius: 4px;
        border: 0;
    }

    .pricenum {
        color: #e63020;
    }

    .nub {
        margin: 0 5px;
        display: inline-block;
        vertical-align: top;
        margin-top: 5px;
    }

    .guize1 {
        color: #e63020;
        margin-right: 12px;
    }

    .act {
        color: #212121;
    }


</style>

<script>
    import base from '../../common/utils/base'
    import '../../common/utils/base.less'
    base.setHtmlRem()
    export default {}
</script>
