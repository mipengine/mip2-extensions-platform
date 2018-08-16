<template>
    <div class="wrapper" />
        <mip-semi-fixed id="semi-fixed2">
            <div mip-semi-fixed-container class="absoluteStyle">

                <img class="i-p-img" src="http://www.daoway.cn/images/position1.png">
                <span class="spn">{{}}</span>
                <mip-form><input class="search" type="text" name="search" validatetarget="username" validatetype="must"
                                 placeholder="快速搜索商家、服务"></mip-form>
            </div>
        </mip-semi-fixed>

        <div class="banner">
            <mip-carousel autoplay defer="5000" layout="responsive" width="600" height="300">
                <mip-img src="https://www.mipengine.org/static/img/sample_01.jpg"></mip-img>
                <mip-img src="https://www.mipengine.org/static/img/sample_02.jpg"></mip-img>
                <mip-img src="https://www.mipengine.org/static/img/sample_03.jpg"></mip-img>
            </mip-carousel>
            <div class="mip-carousel-indicator-wrapper iconimg">
                <div class="mip-carousel-indicatorDot" id="mip-carousel-example">
                    <div class="mip-carousel-activeitem mip-carousel-indecator-item"></div>
                    <div class="mip-carousel-indecator-item"></div>
                    <div class="mip-carousel-indecator-item"></div>
                </div>
            </div>
        </div>

        <div class="service-item">
            <ul>
                <li><img src="http://img.daoway.cn/img/icon/new/xianhualvzhi.png"><i>家庭保洁</i></li>
                <li><img src="http://img.daoway.cn/img/icon/new/xianhualvzhi.png"><i>上门按摩</i></li>
                <li><img src="http://img.daoway.cn/img/icon/new/xianhualvzhi.png"><i>上门维修</i></li>
                <li><img src="http://img.daoway.cn/img/icon/new/xianhualvzhi.png"><i>家电清洗</i></li>
                <li><img src="http://img.daoway.cn/img/icon/new/xianhualvzhi.png"><i>衣物洗护</i></li>
                <li><img src="http://img.daoway.cn/img/icon/new/xianhualvzhi.png"><i>家庭保洁</i></li>
                <li><img src="http://img.daoway.cn/img/icon/new/xianhualvzhi.png"><i>上门按摩</i></li>
                <li><img src="http://img.daoway.cn/img/icon/new/xianhualvzhi.png"><i>上门维修</i></li>
                <li><img src="http://img.daoway.cn/img/icon/new/xianhualvzhi.png"><i>家电清洗</i></li>
                <li><img src="http://img.daoway.cn/img/icon/new/xianhualvzhi.png"><i>衣物洗护</i></li>
            </ul>
        </div>


        <div class="project">
            <div class="h2">即刻达<span>最快30分钟上门</span></div>
            <div class="down">
                <ul>
                    <li><img src="http://api.daoway.cn/img/tags/jiazhuangjiaxiu.png"><i>家庭保洁</i></li>
                    <li><img src="http://api.daoway.cn/img/tags/jiazhuangjiaxiu.png"><i>家庭保洁</i></li>
                    <li><img src="http://api.daoway.cn/img/tags/jiazhuangjiaxiu.png"><i>家庭保洁</i></li>
                    <li><img src="http://api.daoway.cn/img/tags/jiazhuangjiaxiu.png"><i>家庭保洁</i></li>
                    <li><img src="http://api.daoway.cn/img/tags/jiazhuangjiaxiu.png"><i>家庭保洁</i></li>
                </ul>
            </div>
        </div>
        <div class="box">
            <div class="h2">家庭保洁<span>更多<img src="https://www.daoway.cn/h5/image/go_06.png"></span></div>
            <ul class="item-name">
                <li class="detailItem">
                    <img class="liimg"
                         src="http://img.daoway.cn/img/price/2018/06/22/b6686442-d97f-4f5d-b390-dc5c2b4b49f0_thumb.jpg">
                    <i class="name">日常家庭保洁</i>
                    <i class="price"><strong>40</strong>元/小时</i>
                    <i class="home"><img src="https://www.daoway.cn/h5/image/home1.png">e城e家家政</i>
                </li>
                <li class="detailItem">
                    <img class="liimg"
                         src="http://img.daoway.cn/img/price/2018/06/22/b6686442-d97f-4f5d-b390-dc5c2b4b49f0_thumb.jpg">
                    <i class="name">日常家庭保洁</i>
                    <i class="price"><strong>40</strong>元/小时</i>
                    <i class="home"><img src="https://www.daoway.cn/h5/image/home1.png">e城e家家政</i>
                </li>
                <li class="detailItem">
                    <img class="liimg"
                         src="http://img.daoway.cn/img/price/2018/06/22/b6686442-d97f-4f5d-b390-dc5c2b4b49f0_thumb.jpg">
                    <i class="name">日常家庭保洁</i>
                    <i class="price"><strong>40</strong>元/小时</i>
                    <i class="home"><img src="https://www.daoway.cn/h5/image/home1.png">e城e家家政</i>
                </li>
            </ul>
        </div>

</template>

<script>
    import base from '../../common/utils/base.js'
    import '../../common/utils/base.less'
    import picker from '../../common/utils/picker.js'

    //base.setHtmlRem();
    export default {
       /* data: {
            newTodoText: '',
            todos: [
                'Do the dishes',
                'Take out the trash',
                'Mow the lawn'
            ]
        },
        created () {
            console.log(this)
        },
        mounted () {

            this.city();
           // let po = localStorage.getItem("position");

        },
        methods: {
            city(){
                var that = this;

                var url = "/daoway/rest/user/city";
                /!*fetch(url, {
                    method: 'get'
                }).then(function (res) {
                    if (res && res.status == "200") {
                        return res.text();
                    }
                }).then(function (text) {
                    let data = JSON.parse(text);

                    //that.communityid(data.data);
                }).catch(function (error) {
                    console.error('Error:', error)
                });*!/

            },
            communityid(data){
                var that = this;
                var url = "/daoway/rest/community/autoPosition?lot=" + data.lot + "&lat=" + data.lat;
                fetch(url, {
                    method: 'get'
                }).then(function (res) {
                    if (res && res.status == "200"){
                        return res.text();
                    }
                }).then(function (text) {
                    var positon = JSON.parse(text);
                    //console.log(that);
                   // that._data.position = positon;
                    //that.data.position = positon;
                    localStorage.setItem("position",JSON.stringify(positon));
                    base.position =  positon;
                   // MIP.setData({'position': position})
                }).catch(function (error) {
                    console.error('Error:', error)
                });

            }

        }*/





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

    body {
        background: #f5f5f5;
    }

    .banner {
        height: 155px;
        position: relative;
        bottom: 40px;
    }

    .iconimg {
        position: relative;
        bottom: 22px
    }

    .i-p-img {
        width: 16px;
        height: auto;
        margin-top: 8px;
    }

    .servicePro [role=list] {
        display: -webkit-flex;
        display: flex;
        width: 98%;
        padding: 0 1%;
        flex-direction: row;
        background: #fff;
    }

    .servicePro [role=listitem] {
        width: 20%;
        padding: 0 0 10px
    }

    .servicePro [role=listitem] > li {
        width: 100%
    }

    .servicePro1 [role=list] {
        display: inline-block;
        padding: 10px 0;
    }

    .servicePro [role=listitem] {
        display: inline-block;
    }

    .servicePro [role=listitem] li > p {
        text-align: center
    }

    #semi-fixed2 div {
        position: relative;
        width: 100%;
        height: 40px;
        background-color: rgba(255, 255, 255, 0.5);
        z-index: 999;
        padding-left: 3%;
    }

    .search {
        border-radius: 20px;
        padding: 10px 10px;
        width: 50%;
        position: absolute;
        right: 4%;
        top: 6px;
        border: none;
        outline: none
    }

    .spn {
        display: inline-block;
        max-width: 42%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #fff;
    }

    .position {
        margin: 8px 5px 0 10px
    }

    .price {
        color: red
    }

    .h2 {
        line-height: 40px;
        padding: 0 2%;
        background: #fff;
        width: 96%
    }

    .h2 span {
        float: right;
        color: #898989
    }

    #semi-fixed2 {
        position: -webkit-sticky;
        position: sticky;
        top: 0;
        background: none;
    }

    .project, .box {
        border-top: 10px solid #f5f5f5
    }

    .service-item {
        width: 98%;
        padding: 10px 1%;
        height: 190px;
        background: #fff;
        overflow: hidden
    }

    .service-item ul li {
        width: 20%;
        float: left;
        text-align: center;
        height: 90px
    }

    .service-item ul li i {
        display: block;
        margin-top: 1px;
        color: #000
    }

    .service-item ul li img {
        width: 46px;
        height: 46px;
        margin: 0 auto
    }

    .service-item:last-child {
        border-bottom: 1px solid #e5e5e5
    }

    .service-item ul li i {
        margin-top: 0;
    }

    .down {
        width: 100%;
        margin-top: 10px;
        height: 80px
    }

    .down ul li {
        width: 19%;
        display: inline-block;
        text-align: center;
        border-right: 1px solid #f5f5f5
    }

    .down ul li img {
        width: 27px;
        height: 27px
    }

    .down ul li i {
        display: block;
        position: relative;
        top: 15px
    }

    .down ul li:last-child {
        border: none
    }

    .h2 span img {
        width: 7px;
        height: auto
    }

    .item-name {
        padding-left: 3%;
    }

    .item-name li {
        display: inline-block;
        width: 31%;
        margin-top: 3px;
        margin-left: 1%;
    }

    .item-name li:nth-child(1) {
        margin-left: 0
    }

    .item-name li i {
        display: block;
        text-align: left;
        line-height: 20px;
        height: 20px;
        width: 100%;
        overflow: hidden;
        margin-top: 2px
    }

    .name {
        margin-top: 2px
    }

    .price {
        color: #e94840;
    }

    .price strong {
        font-size: 16px;
        font-weight: normal
    }

    .home {
        color: #b1b1b1;
        margin-top: 3px
    }

    .home img {
        margin-right: 2px
    }

    .liimg {
        border-radius: 4px
    }

    .home img {
        width: 12px;
        height: auto
    }

</style>
