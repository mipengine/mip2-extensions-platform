<template>
    <div class="wrapper">
        <div class="detail-banner">
            <img :src="sericePrice.picUrl"/>
            <ul>
                <li><span class="d-h">{{sericePrice.name}}</span>
                    <div class="d-add">
                        <img @touchend="jian(counter)" src="/common/images/jian.jpg">
                        <i class="d-number">{{counter}}</i>
                        <img @touchend="add(counter)" src="/common/images/jia.jpg">
                    </div>
                </li>
                <li><span class="d-h d-h2">{{sericePrice.price}}<i>{{sericePrice.priceUnit}}</i></span>
                    <div class="d-add">已售{{sericePrice.salesNum}}单</div>
                </li>
                <li class="d-maojian"><span class="b-bz">促销</span>
                    <div class="d-maojian-r">
                        <div class="d-add d-add2" v-if="promotion.first_reduce"><span class="mj">首单</span>
                            <span>新客立减{{promotion.first_reduce}}元</span>
                        </div>
                        <div v-if="promotion.total_reduce" class="d-add d-add2"><span class="mj">满减</span>
                            <span v-for="j in promotion.total_reduce">满{{j.total}}减{{j.reduce}}元</span>
                        </div>
                    </div>
                </li>
                <li v-if="service.guarantee" class="d-baozhang"><span class="b-bz">保障</span>
                    <div class="d-add d-add2">
                        <span v-for="g in service.guarantee.items"><img :src="g.iconUrl">{{g.label}}</span>
                    </div>
                </li>
                <li></li>
            </ul>
        </div>
        <div class="d-hh" v-if="similarItems> 0" v-bind:id="priceId" @click="thidpage(priceId)">
            <div class="d-hh-l"><i>已选</i>{{sericePrice.name}}</div>
            <div class="d-hh-r">类似项目<img class="d-more" src="/common/images/go_06.png"></div>
        </div>
        <div class="d-hh">
            <div class="d-hh-l d-timet">服务时间</div>
            <div class="d-hh-r">最近可约<i class="d-time" v-html="service.nextime"></i>
            </div>
        </div>
        <div class="d-text">
            <p v-text="sericePrice.description"></p>
        </div>
        <div class="d-hh">
            <div class="d-hh-l">此服务由<span class="d-home" v-html="service.title"></span>提供</div>
            <div class="d-hh-r"><i class="lv">接单率{{sericePrice.orderTakingRate}}</i> <i class="lv">好评率{{sericePrice.positiveCommentRate}}</i>
            </div>
        </div>
        <div class="d-hh d-hhline" @click="tocomments()">
            <div class="d-hh-l d-timet">用户评论</div>
            <div class="d-hh-r"><i class="lv">{{lastComment.commentCount}}条评论</i><img class="d-more" src="/common/images/go_06.png">
            </div>
        </div>
        <div class="d-comment">
            <div class="d-comment-l">
                <img class="d-icon" :src="lastComment.iconUrl?lastComment.iconUrl:'/common/images/iconimg.png'">
            </div>
            <div class="d-comment-r">
                <div>{{lastComment.nick}}</div>
                <div>
                    <span class="d-star">
                    <img v-for="(i,index) in [1, 2, 3, 4, 5]"
                         :src="lastComment.star<index ? '/common/images/star.png/' : '/common/images/red_star.png'">{{index}}
                </span>
                    <span class="d-c-t" v-html="lastComment.time"></span>
                </div>
                <div v-html="lastComment.comment"></div>
            </div>
        </div>
        <div class="d-hh d-hhline" @click="toxuzhi()">
            <div class="d-hh-l d-timet">订购须知</div>
            <div class="d-hh-r"><i class="lv">查看取消、退款、赔付规则</i><img class="d-more" src="/common/images/go_06.png"></div>
        </div>
        <div class="d-text d-xuzhi">
            <p v-text="service.orderingNotice"></p>
        </div>
        <div class="d-img-box">
            <p @touchend="moreimg" v-if="images.length>0">↑点击查看图文详情</p>
            <img v-for="img in images" :src="img.img">
        </div>

        <mip-fixed type="bottom">
                <div class="footer" >
                    <div class="telimg telg"  @touchend="toindex()">
                        <img src="/common/images/icon2.png" style="width:17px; height:auto">
                        <div class="lianxi">首页</div>
                    </div>
                    <div class="telimg telg">
                        <a :href="'tel:' + service.phone">
                            <img src="/common/images/tel.jpg" style="width:15px; height:auto">
                            <div class="lianxi">联系商家</div>
                        </a>
                    </div>
                    <!--<div class="telimg share">
                        <div class='btnshare'>
                            <img src="/common/images/share.jpg" style="width:16px; height:auto">
                            <div class="lianxi">分享</div>
                        </div>
                    </div>-->
                    <div class="btngo" @click="reservation()">立即购买</div>
                </div>

        </mip-fixed>

        <div v-show="warn.show" class="layer">
            <div class="layer-content zoomIn">
                <p class="layer-text" v-text="warn.texts"></p>
                <p class="layer-sure active-layer" @click="closeLayer">知道了</p>
            </div>
        </div>

        <!--弹出层-->

        <div class="commodity_screen" v-if="showpops">
            <div class="commodity_attr_box">
                <div class="headtit">
                    <div class="hh">选择服务项目</div>
                    <div class="smalltit">{{service.title}}{{pops[0].catName}}</div>
                    <img @touchend="close()" class="close" src="/common/images/close2.jpg">
                </div>
                <div class="commodity-list">
                    <div class="comlist" :class="{activity:index == activity}" v-for="(p,index) in pops" v-bind:id="p.id" @touchend="tap(index)">{{pops[index].selected}}
                        <div class="listconter">{{p.name}}<i class='poptxt' v-if="totalPromotions">满{{p.totalPromotions[0].total}}减{{p.totalPromotions[0].reduce}}</i>
                        </div>
                        <div class="listprice">{{p.price}}
                            <div class="unit2">{{p.priceUnit}}</div>
                        </div>
                    </div>
                </div>
                <button class="d-btn" @touchend="confirm()">确定选择</button>
            </div>
        </div>
    </div>
</template>
<script>
    import base from '../../common/utils/base'
    import '../../common/utils/base.less'
    import login from '../../common/utils/login'
    export default {
        data() {
            return {
                id:base.getRequest(location.href).detailid,
                sericePrice: {},
                service: {},
                lastComment: {},
                promotion: {},
                images: [],
                images2:[],
                loading: false,
                counter: 0,
                minBuyNum: 1,
                warn: {
                    // 弹窗
                    show: false,
                    texts: ''
                },
                minbuyprice: 0,//最低起购金额
                totoprice: 0,
                price: 0,
                priceId: '',
                serviceId: '',
                dwid: '',
                priceType: '',
                similarItems: {},
                pops: [],
                showpops: false,
                activity:0,
                similarPricesId:'',
                apptime :null,
                appointTime:'',
                limitNum:1,
                redirect_uri:'',
                client_id:'vnQZ7pPB0gsWHZZF4n6h0WDOl8KOr7Lq',
                ClientSecret:'kM6rbBN43zhAEOFxeQ9Wnj2MzVzkROA0',
                code: base.getRequest(location.href).code,
                id2:'',
                toservation:''
            }
        },
        mounted () {
            this.detailstr();
        },
        methods: {
            detailstr(){
                let that = this;
                let url = "/daoway/rest/service/full/" + that.id + "?channel=" + base.channel;
                fetch(url, {
                    method: 'get',
                }).then(function (res) {
                    if (res && res.status == "200") {
                        return res.json();
                    }
                }).then(function (text) {
                    let data = text.data;
                    console.log(data)
                    that.service = data.service;
                    let sericePrice = data.sericePrice;
                    that.sericePrice = sericePrice;
                    let lastComment = data.service.lastComment;
                    lastComment.time = base.timeformat(lastComment.createtime, "yyyy-MM-dd");
                    that.appointTime = data.service.nextAppointTime;
                    that.service.nextime = base.timeformat(data.service.nextAppointTime, "appDate HH:mm")
                    lastComment.commentCount = data.service.commentCount;
                    that.lastComment = lastComment;
                    that.promotion = data.promotion;
                    that.images2 = data.imgs;
                    that.counter = sericePrice.minBuyNum;
                    that.minBuyNum = sericePrice.minBuyNum;
                    that.service.minBuyPrice = data.service.minBuyPrice;
                    that.price = sericePrice.price;
                    that.priceId = sericePrice.id;
                    that.serviceId = sericePrice.serviceId;
                    that.priceType = sericePrice.priceType;
                    that.similarItems = data.similarItems;
                    that.limitNum = data.sericePrice.limitNum;
                }).catch(function (error) {
                    console.error('Error:', error)
                });
            },
            add(counter){
                counter += 1;
                if(this.limitNum &&　this.limitNum > counter){
                    this.warn.show = true;
                    this.warn.texts = '该项目每单限购'+this.limitNum+'份';
                }else {
                    this.counter = counter;
                }

            },
            jian(counter){
                var that = this;
                if (counter <= that.minBuyNum || counter == 0) {
                    this.warn.show = true;
                    this.warn.texts = "不能再减了";
                } else {
                    counter -= 1;
                    that.counter = counter;
                }
            },
            moreimg(){
                this.images = this.images2;
            },
            closeLayer () {
                this.warn.show = false
            },
            close(){
                this.showpops = false
            },
            toindex(){
                MIP.viewer.open(base.htmlhref.index, { isMipLink: true })
            },
            toxuzhi(){
                MIP.viewer.open(base.htmlhref.xuzhi, { isMipLink: true })
            },
            /*totime(){
                var parm = {
                    serviceId:this.serviceId,
                    priceId:this.priceId
                };
                parm =JSON.stringify(parm)
                MIP.viewer.open("http://t.daoway.cn/components/mip-dw-time/example/mip-dw-time.html?parm="+ encodeURIComponent(parm), { isMipLink: true })
            },*/
            tocomments(){
                let serviceId = this.serviceId;
                let priceId = this.priceId;
                MIP.viewer.open(base.htmlhref.comments+"?serviceId="+serviceId +"&priceId="+priceId, { isMipLink: true })
            },
            tap(index){
                this.activity = index;
                this.similarPricesId = this.pops[index].id
            },
            thidpage: function (priceId) {//选择服务项目
                var that = this;
                var position =  base.getposition();
                var url = "/daoway/rest/servicePrice/similarPricesByPriceId?priceId=" + priceId + "&city=" + encodeURIComponent(position.city) + '&lot=' + position.lot + '&lat=' + position.lat + "&channel=" + base.channel;
                fetch(url, {
                    method: 'get',
                }).then(function (res) {
                    if (res && res.status == "200") {
                        return res.json();
                    }
                }).then(function (text) {
                    if(text.status == "ok"){
                        that.pops = text.data;
                        that.showpops = true;
                    }else {
                        that.warn.show = true;
                        that.warn.texts = text.msg;
                    }

                }).catch(function (error) {
                    console.log(error)
                });
            },
            confirm: function () {//确定选择
                var that = this;
                that.showpops = false;
                var similarPricesId = that.similarPricesId;
                var priceId = that.priceId;
                 if (similarPricesId != priceId) {
                     that.id = similarPricesId;
                     that.detailstr();
                }
            },
            reservation(){
                var that = this;
                var quantity = that.counter;// 购买数量
                var minBuyPrice = that.minBuyPrice;
                if (quantity <= 0) {
                    quantity = that.minBuyNum;
                }
                var price = that.price;
                var totalPrices = price * quantity;
                sessionStorage.setItem('apptime','');
                let userId = localStorage.getItem('userId');
                let token = localStorage.getItem('token');

                /*跳转带出去的参数*/
                let priceId = that.priceId;
                let priceMap = {};
                priceMap.id = priceId;
                priceMap.quantity = quantity;
                if (minBuyPrice > totalPrices) {
                    this.warn.show = true;
                    this.warn.texts = '该店铺需满' + minBuyPrice + '元起购，还差' + (minBuyPrice - totalPrices) + '元即可下单哦~';
                } else {
                    if(userId && token){
                        let param = {
                            serviceId: that.serviceId,
                            priceId: that.priceId,
                            quantity: quantity,
                            appointTime: that.appointTime,
                            priceType: that.priceType
                        };
                        param =JSON.stringify(param);
                        MIP.viewer.open(base.htmlhref.reservation+"?param="+encodeURIComponent(param), { isMipLink: true })
                    }else {
                        let baseparam = base.setUrlParam({
                            serviceId: that.serviceId,
                            priceId: that.priceId,
                            quantity: quantity,
                            appointTime: that.appointTime,
                            priceType: that.priceType
                        });
                        let redirect_uri = 'http://test.daoway.cn/mip/components/mip-dw-reservation/example/mip-dw-reservation.html?'+baseparam;

                        let url = 'https://openapi.baidu.com/oauth/2.0/authorize?response_type=code&client_id='+that.client_id+'&redirect_uri='+ encodeURIComponent(redirect_uri) +'&scope=snsapi_userinfo&state=STATE';
                        MIP.viewer.open(url, { isMipLink: true })
                    }
                }
            }
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


    .detail-banner {
        background: #fff
    }

    .d-add {
        float: right
    }

    .d-add img {
        width: 24px;
        height: 24px;
        vertical-align: middle
    }

    .detail-banner ul {
        padding: 0 3%
    }

    .detail-banner ul li {
        line-height: 42px
    }

    .detail-banner ul li.d-maojian, .detail-banner ul li.d-shoujian {
        line-height: 32px
    }

    .d-maojian, .d-baozhang {
        border-top: 1px solid #ececec
    }

    .d-number {
        padding: 0 10px;
    }

    .d-h {
        font-size: 18px;
    }

    .d-h2 {
        color: red;
        font-size: 24px;
    }

    .d-h2 i {
        font-size: 12px
    }

    .d-add2 span {
        margin-left: 5px
    }

    .d-add2 span.mj {
        padding: 0 5px;
        border: 1px solid red;
        border-radius: 4px;
        color: red
    }

    .d-shoujian span.mj {
        margin-left: 0
    }

    .d-add2 {
        float: inherit;
        width: 90%;
        display: inline-block;
        vertical-align: top;
        margin-left: 2%
    }

    .d-shoujian .d-add2 {
        width: 93%
    }

    .d-add span img {
        width: 14px;
        height: 14px
    }

    .b-bz {
        font-size: 12px;
        color: #898989;
        vertical-align: top;
    }

    .d-more {
        width: 8px;
        height: auto;
        position: relative;
        top: 2px;
        margin-left: 5px
    }

    .d-hh-l i {
        font-size: 12px;
        color: #898989;
        margin-right: 5px
    }

    .d-hh {
        height: 45px;
        line-height: 45px;
        background: #fff;
        margin-top: 10px;
        padding: 0 3%
    }

    .d-hh div {
        display: inline-block
    }

    .d-hh .d-hh-r {
        float: right
    }

    .d-timet {
        font-size: 16px
    }

    .d-time {
        color: red
    }

    .d-text {
        background: #fff;
        padding: 10px 3%;
        margin-top: 10px;
    }

    .d-text p {
        line-height: 25px
    }

    .lv {
        color: #898989
    }

    .d-home {
        color: red
    }

    .d-comment {
        background: #fff;
        padding: 10px 3%
    }

    .d-icon {
        width: 35px;
        height: auto;
        border-radius: 100% 100%
    }

    .d-star img {
        width: 12px;
        height: auto;
        margin-right: 3px
    }

    .d-comment-l, .d-comment-r {
        display: inline-block
    }

    .d-comment-l {
        width: 15%;
        vertical-align: top
    }

    .d-comment-r {
        width: 80%;
        line-height: 26px
    }

    .d-c-t {
        margin-left: 10px
    }

    .d-hhline {
        border-bottom: 1px solid #ececec
    }

    .d-xuzhi {
        margin-top: 0
    }

    .d-img-box {
        margin-bottom: 50px;
    }

    .d-img-box p {
        text-align: center;
        padding: 8px 0;
        color: #898989;
    }

    .d-img-box img {
        width: 100%;
        height: auto
    }

    .footer {
        height: 45px;
        width: 100%;
        z-index: 100;
        background: #fff;
        padding-left: 3%;
        border-top: 1px solid #e5e5e5;
    }

    .telimg {
        float: left;
        text-align: center;
        font-size: 14px;
        margin-top: 5px;
    }

    .telg {
        margin-right: 20px
    }

    .btngo {
        float: right;
        width: 140px;
        height: 100%;
        line-height: 45px;
        background: #ec242c;
        color: #fff;
        text-align: center;
        font-size: 16px;
    }

    .d-maojian-r {
        display: inline-block;
        width: 90%;
    }

    .d-maojian-r .d-add2 {
        width: 98%;
    }


    @keyframes fade-in {
        0% {opacity: 0;}/*初始状态 透明度为0*/
        40% {opacity: 0;}/*过渡状态 透明度为0*/
        100% {opacity: 1;}/*结束状态 透明度为1*/
    }
    @-webkit-keyframes fade-in {/*针对webkit内核*/
        0% {opacity: 0;}
        40% {opacity: 0;}
        100% {opacity: 1;}
    }

    .commodity_screen {
        width: 100%;
        height: 100%;
        position: absolute;
        bottom: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.6);
        color: #000;
        animation: fade-in;/*动画名称*/
        animation-duration: 0.2s;/*动画持续时间*/
        -webkit-animation:fade-in 0.2s;/*针对webkit内核*/
        z-index: 10001;
    }

    .commodity_attr_box {
        width: 100%;
        overflow: hidden;
        position: fixed;
        top: 40%;
        left: 0;
        z-index: 2000;
        background: #fff;
        padding: 10px 0;
        height: 100%;
    }

    .headtit {
        padding-top: 10px;
        height: 60px;
        line-height: 30px;
        width: 100%;
        text-align: center;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 99;
    }

    .close {
        position: absolute;
        right: 3%;
        top: 10px;
        padding: 0;
        width:14px; height:auto;
    }

    .smalltit {
        font-size: 14px;
        color: #4c4c4c;
    }

    .commodity-list {
        width: 94%;
        margin: 55px auto 0;
        overflow-y: scroll;
        height: 42%;
        border-bottom: 1px solid #f5f5f5;
    }

    .poptxt {
        font-size: 14px;
        padding: 0 3px;
        border: 1px solid #ec242c;
        border-radius:3px;
        color: #ec242c;
        margin-left: 8px
    }

    .comlist {
        border: 1px solid #d1d1d1;
        padding: 7px 1%;
        font-size: 14px;
        border-radius: 4px;
        margin-top: 10px;
        position: relative;
    }

    .comlist view {
        display: inline-block;
    }

    .listconter {
        width: 76%;
        font-size: 14px;
    }

    .listprice {
        width: 22%;
        text-align: right;
        color: #f93030;
    }

    .activity {
        border: 1px solid #f93030;
        color: #f93030;
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAsCAYAAADxRjE/AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo1N2UyYWYyOC04NGFiLTQwZTEtYjM5OS1hZTkyYjQwOGZmZjMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MEUyOUExREREODk0MTFFNkIzMzdGNjgzNTQzNjE0NjIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MEUyOUExRENEODk0MTFFNkIzMzdGNjgzNTQzNjE0NjIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKE1hY2ludG9zaCkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpmOTk4ZTkxOS02NmZmLTQ2ODEtYTU3NC1mODI0Yzc5OGYwNWQiIHN0UmVmOmRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDo4NTUzYTQyNi0wZDZlLTExN2EtOWMxMi1iYWNlYjJiODY5MTMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz64HJiFAAAB6UlEQVR42tTXvbLBQBQH8LMrVJih0zIKKjyE2kv4GGOUSlzmtlofjc4beAedjopegRlUl7E38TGClWxkk2xOk0iO5Df/nGIXEUJAqb90uikfGiB+/aI72k1wrP7hm04V9I+r0LcSHo4/XBcajjXuCQvHOveFhGOGHuHgmLFPKDg20Gsf3O8H73AI3tEIUCRiCm0PXAF3u4BSKUCJBEidzluL9MVjm7djwxJwvw8omXxcOx5NJ208cZ8PPLUaeKpVAIQ+9wUCb2Ayn8OxUuGStKHEpXYbcDZ7OUehEJxaLVlD6GB5HJ7ApRLAbsctaebEUSbzeFkuB1K9Lp+oXhsM0sHFIhXMA60LP5XLANstHa6Aez06eL//HAR5+VTy8tQMnjoqKB6/pAnyeNzrPB4DikafwbPZdSQ0wLzR2vBYDKTBAFA4TP0jK5jXeDCNClks4FQoANlsTIGtQOvD83kg6/UzWGeG7UBrw5fLK3y1gvNkcgUfDoYeznum1Vs3y/acViVt6Z5Tsgqs+mLc1yqWJm3V6tAuNFe4nWhucLvRXOBOoE3DnUKbgjuJ/hruNPoruAhow3BR0IbgIqGZ4aKhmRZZwqFZ4EKi9eDCorXgQqM/wYVH0+CuQL/CJXBRKXBlG/e2G3dD/QswAMtuzQG7jNalAAAAAElFTkSuQmCC);
        background-repeat: no-repeat;
        background-position: top right;
        background-size: 7% 70%;
    }

    .d-btn {
        position: fixed;
        border: none;
        width: 90%;
        bottom: 10px;
        left: 5%;
        height: 40px;
        line-height: 40px;
        background: #f93030;
        color: #fff;
        border-radius: 4px;
    }

    .unit2 {
        font-size: 12px;
    }

    .comlist div {
        display: inline-block;
    }


</style>


