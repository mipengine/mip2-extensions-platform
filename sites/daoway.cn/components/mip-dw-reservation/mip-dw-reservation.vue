<template>
    <div class="wrapper">
        <div class="re-input">
            <div class="line"><img src="https://www.daoway.cn/h5/image/line.jpg"></div>
            <mip-form>
                <ul class="re-form">
                    <li><img src="https://www.daoway.cn/images/icon2.jpg"><input type="text" @touchend="toposition" v-model="addr" placeholder="请填写您的住址"><img class="re-more" src="https://www.daoway.cn/h5/image/go_06.png"></li>
                    <li><img src="https://www.daoway.cn/images/icon3.jpg"><input type="text" v-model="doorNum" placeholder="请输入具体楼号、门牌号">
                    </li>
                    <li><img src="https://www.daoway.cn/images/icon4.jpg"><input type="text" v-model="contactPerson" placeholder="联系人"></li>
                    <li><img src="https://www.daoway.cn/images/icon5.jpg"><input type="number" v-model="phone" maxlength="11"
                                                                                 placeholder="联系电话"></li>
                </ul>
            </mip-form>
            <div class="line2"><img src="https://www.daoway.cn/h5/image/line.jpg"></div>
        </div>
        <div class="re-input re-input2">
            <ul class="re-form re-form2">
                <li><span><img src="https://www.daoway.cn/images/icon2.jpg">服务时间</span>
                    <div @touchend ='totime'><i class="re-time">{{formatTime}}</i><img class="re-more" src="https://www.daoway.cn/h5/image/go_06.png">
                    </div>
                </li>
                <li v-if="canChooseTechnician" v-bind:id="selectedTechnical.technicianId" @touchend="totechnical(selectedTechnical.technicianId)"><span><img src="https://www.daoway.cn/images/icon3.jpg">服务人员</span>
                    <div><i class="re-tech">{{selectedTechnical.name}} {{selectedTechnical.sex}} <img :src="selectedTechnical.photoURL"></i><img class="re-more" src="https://www.daoway.cn/h5/image/go_06.png"></div>
                </li>
            </ul>
        </div>

        <div class="re-input2">
            <div class="goumai">
                <div class="gimg" v-for="p in prices" v-bind="p.id">
                    <img class="re-iconm" :src="p.pic_url">
                    <div class="gtit">
                        <div class="gtitname">{{p.name}}</div>
                        {{p.price}}{{p.price_unit}}
                    </div>
                    <div class="gadd">
                        <img class="jia" src="http://www.daoway.cn/images/jian.jpg" @touchend="jian(quantity,p.price)">
                        <div class="nub">{{quantity}}</div>
                        <img class="jian" src="http://www.daoway.cn/images/jia.jpg" @touchend="add(quantity,p.price)">
                    </div>
                </div>
                <div class="quan">
                    <div class="quantxt">代金券</div>
                    <div class="noquan act"  v-if="coupone">{{coupone.name}}</div>
                    <div class="guize guize1" v-bind:id="coupone.id" v-if="coupone" @touchend="tovouchers">-{{coupone.bill}}元<img class="re-more" src="https://www.daoway.cn/h5/image/go_06.png"></div>
                    <div class="guize guize1" v-else>暂无适用代金券</div>
                </div>
                <div class="quan" style="padding:8px 0">
                    <div class="quantxt">备注</div>
                    <input class="note" placeholder="如有特殊要求，请给商家留言"/>
                </div>
            </div>
            <div class="project">
                <div class="project-tit">服务金额
                    <div class="price">{{totalPrice}}</div>
                </div>
                <div class="project-tit" v-if="realyFixFee>0">上门费
                    <div class="price">{{realyFixFee}}元</div>
                </div>
                <div class="project-tit" v-if="coupone">优惠金额
                    <div class="price">-{{coupone.bill}}元</div>
                </div>
                <!--<div class="project-tit" style="display: none">夜间上门费
                    <div class="price">30</div>
                </div>-->
            </div>


            <div class="footer">



                <div class="gomai">
                    待支付
                    <div class="pricenum">{{alltotalPrices}}元</div>
                    <button  class="btn2" @click="tobuy">立即购买</button>
                </div>
            </div>
        </div>




        <!--提示-->
        <div v-show="warn.show" class="layer">
            <div class="layer-content zoomIn">
                <p class="layer-text" v-text="warn.texts"></p>
                <p class="layer-sure active-layer" @touchend="closeLayer">知道了</p>
            </div>
        </div>
    </div>
</template>

<script>
    import base from '../../common/utils/base'
    import '../../common/utils/base.less'
    export default {
        props: {
            globaldata: {
                type: Object,
                default: function () { return {} }
            },
            payConfig: {
                type: Object,
                default: function () { return {
                
                payConfig:{
                        subject:"支付商品",
                        fee: 300,
                        sessionId:"c8fbd3e0-a617-4eac-84b3-1f289c5ce857",
                        redirectUrl:"https://api.example.com/pay/verifypay",
                        endpoint:{
                            baifubao:  "https://api.example.com/pay/baifubao",
                            alipay:  "https://api.example.com/pay/alipay",
                            weixin:  "https://api.example.com/pay/weixin"
                        },
                        postData:{
                            orderId: 235,
                            token: "xxxx",
                            anydata:"anydata"
                        }
                }
                
                } }
            },
            userlogin: {
                type: Object,
                default: function () { return {} }
            }
        },
        data(){
            return{
                param:base.getRequest(location.href).param?JSON.parse(decodeURIComponent(base.getRequest(location.href).param)):'',
                warn: {
                    // 弹窗
                    show: false,
                    texts: ''
                },
                totalPrice:0,
                prices: [],
                formatTime: '',
                nextAppointTime: '',
                appointTime: '',
                noFixFeePrice:0,
                fixFee: 0,
                minBuyPrice: 0,
                quantity:0,
                realyFixFee:0,
                alltotalPrices:0,
                minBuyNum:1,
                selectedTechnical:{},
                position:'',
                doorNum:'',
                contactPerson:'',
                phone:'',
                addr : '',
                communityId:'',
                canChooseTechnician:false,
                serviceId:'',
                coupone:'',
                orderId:base.getRequest(location.href).orderId,
            };
        },
        mounted () {
            var that = this;
            that.position = base.getposition();
            if(that.orderId){
                that.buyAgain(that.orderId)
            }else {
                that.gethtml();
                that.setPostion();
            }
            window.addEventListener('show-page', () => {
                let technician =JSON.parse(sessionStorage.getItem('tech'));
                that.selectedTechnical = technician;
                if(that.canChooseTechnician){
                    if(technician){
                        that.selectedTechnical = technician;
                    }
                }
                let coupone = JSON.parse(sessionStorage.getItem('coupone'));
                that.coupone = coupone;
                if(coupone && coupone.bill > 0){
                    that.alltotalPrices = parseFloat((that.totalPrice + that.realyFixFee - coupone.bill).toFixed(2));
                }
                let apptime = Number(sessionStorage.getItem('apptime'));
                if(apptime){
                    that.formatTime = base.timeformat(apptime,"MM月dd日(day) HH:mm");
                }
                that.position =  base.getposition();
                if(that.position){
                    that.gethtml();
                    that.setPostion();
                }
            })
        },
        methods: {
            gethtml(){
                let that = this;
                let position = that.position;
                that.prices = that.param.prices || '';
                that.appointTime = that.param.appointTime || '';
                that.quantity= that.param.quantity;
                let url = "/daoway/rest/service/" + that.param.serviceId || that.serviceId + "?manualCity=" + encodeURIComponent(position.city)+ "&lot=" + position.lot + "&lat=" + position.lat + "&channel=" + base.channel;
                fetch(url, {
                    method: 'get',
                }).then(function (res) {
                    if (res && res.status == "200") {
                        return res.json();
                    }
                }).then(function (text) {
                    let data = text.data;
                    let pricesItem = data.prices;
                    let priceIds = that.param.priceId;
                    let prices = [];
                    if(pricesItem) {
                        for(let i = 0; i < pricesItem.length; i++) {
                            if(priceIds == pricesItem[i].id) {
                                prices.push(pricesItem[i]);
                            }
                        }

                        if(!prices) {
                            that.warn.show = true;
                            that.warn.texts = "该项目已下线";
                        }
                    } else {
                        that.warn.show = true;
                        that.warn.texts = "该项目已下线";
                    }
                    let apptime = Number(sessionStorage.getItem('apptime'));
                    that.serviceId = data.id;
                    that.noFixFeePrice = data.noFixFeePrice;
                    that.fixFee = data.fixFee;
                    that.nextAppointTime = data.nextAppointTime;
                    that.appointTime = apptime ? apptime: that.param.appointTime  || data.nextAppointTime;
                    that.formatTime = base.timeformat(that.appointTime, "MM月dd日(day) HH:mm");
                    that.prices = prices;
                    that.minBuyNum = prices[0].minBuyNum;
                    that.totalPrice = prices[0].price*that.param.quantity.toFixed(2);
                    that.alltotalPrices = that.totalPrice + data.fixFee;
                    that.canChooseTechnician = data.canChooseTechnician;
                    that.setFixFee(data);
                    that.setPostion();
                }).catch(function (error) {
                    that.warn.show = true;
                    that.warn.texts = error.msg;
                });
            },
            getCoupone(){
                let that = this;
                let url ='/daoway/rest/coupon/user/' + base.userId +'?serviceId='+ that.serviceId + "&bill=" + that.totalPrice +'&ignoreMinBill=false&priceIds='+ (that.param.priceIds || that.priceId) + '&channel=' + base.channel;
                fetch(url, {
                    method: 'get',
                    credentials: "include"
                }).then(function (res) {
                    if (res && res.status == "200") {
                        return res.json();
                    }
                }).then(function (text) {
                    if(text.status== 'ok'){
                        if(text.data && text.data[0].bill >0){
                            that.coupone = text.data[0];
                            that.alltotalPrices = parseFloat((that.totalPrice + that.realyFixFee - that.coupone.bill).toFixed(2));
                        }
                    }else {
                        that.warn.show = true;
                        that.warn.texts = text.msg;
                    }
                }).catch(function (error) {
                    console.log(error)
                });
            },
            closeLayer () {
                this.warn.show = false
            },
            setFixFee: function (data) {
                var that = this;
                var realyFixFee = 0;
                if (data.noFixFeePrice && that.totalPrices < data.noFixFeePrice) {
                    realyFixFee = data.fixFee;
                }
                that.realyFixFee = realyFixFee;
                that.getCoupone();
            },
            add(counter,price){
                var that = this;
                if(counter > that.prices.limit){
                    this.warn.show = true;
                    this.warn.texts = "该项目每单限购"+that.prices.limit+"份";
                }else {
                    counter += 1;
                    this.quantity = counter;
                    let couponebill = 0;
                    if(that.coupone){
                        couponebill = that.coupone.bill || 0;
                    }
                    that.alltotalPrices = Number((counter*price).toFixed(2)+ that.realyFixFee -couponebill )
                }

            },
            jian(counter,price){
                var that = this;
                let couponebill = 0;
                if(that.coupone){
                    couponebill = that.coupone.bill || 0;
                }
                if (counter <= that.minBuyNum || counter == 0) {
                    this.warn.show = true;
                    this.warn.texts = "不能再减了";
                } else {
                    counter -= 1;
                    that.quantity = counter;
                    that.alltotalPrices = Number((counter*price).toFixed(2)+ that.realyFixFee - couponebill)
                }
            },
            setPostion: function () {
                let that = this;
                let position = that.position;
                if(that.position.addr){
                    that.addr = that.position.addr+that.position.name;
                }else {
                    that.addr = that.position.city + that.position.area +that.position.name
                }
               if (position.communityId || position.id){
                    if (position.doorNum) {
                    that.doorNum = position.doorNum
                    }
                    if (position.contactPerson) {
                        that.contactPerson = position.contactPerson
                    }
                    if (position.phone) {
                       that.phone = position.phone
                    }
                }
                if(that.canChooseTechnician){
                    let selectedTechnical = JSON.parse(sessionStorage.getItem('tech'));
                    if(selectedTechnical){
                        that.selectedTechnical = selectedTechnical;
                    }else {
                        that.getTechnicalInfo();
                    }
                }
            },
            getTechnicalInfo(){
                let that = this;
                let position = that.position;
                let serviceId = that.param.serviceId || that.serviceId
                let time = base.timeformat(that.appointTime, "yyyy-MM-dd HH:mm:ss");
                let url = "/daoway/rest/service/" + serviceId  + "/avalible_technician?manualCity=" + encodeURIComponent(position.city || that.city) + "&lot=" + (position.lot || that.lot) + "&lat=" + (position.lat || that.lat) + "&street=" + encodeURIComponent(position.addr || that.street) + "&includeBusyFlag=true&priceId=" + (that.param.priceId || that.priceId) + "&quantity=" + that.quantity  + "&serviceTime=" + encodeURIComponent(time) + "&channel=" + base.channel;
                if (that.doorNum) {
                    url += "&house=" + encodeURIComponent(that.doorNum);
                }
                fetch(url, {
                    method: 'get',
                }).then(function (res) {
                    if (res && res.status == "200") {
                        return res.json();
                    }
                }).then(function (text) {
                    if(text.status == "ok"){
                        let data = text.data;
                        if(data.technicianList){
                            that.selectedTechnical = data.technicianList[0];
                            localStorage.setItem('technician',JSON.stringify(data));
                        }
                    }else {
                        localStorage.setItem('technician',null);
                        that.warn.show = true;
                        that.warn.texts = text.msg;
                    }
                }).catch(function (error) {
                    console.log(error)
                });
            },
            totechnical(id){
                MIP.viewer.open(base.htmlhref.technician+'?technicianId='+id, { isMipLink: true })
            },
            toposition(){
                MIP.viewer.open(base.htmlhref.position+'?technicianId='+id+'&reservation=true', { isMipLink: true })
            },
            tovouchers(){
                let that = this;
                let serviceId = that.serviceId;
                let requestUrl = {
                    serviceId:serviceId,
                    priceIds:that.param.priceId,
                    bill:that.totalPrice
                };
                requestUrl = JSON.stringify(requestUrl)
                let url = base.htmlhref.vouchers +'?requestUrl='+ encodeURIComponent(requestUrl);
                MIP.viewer.open(url, { isMipLink: true })
            },
            totime(){
                var that = this;
                var parm = {
                    serviceId:that.param.serviceId || that.serviceId ,
                    priceId:that.param.priceId
                };
                parm =JSON.stringify(parm)
                MIP.viewer.open(base.htmlhref.time+"?parm="+ encodeURIComponent(parm), { isMipLink: true })
            },
            buyAgain(orderId) {
                var that = this;
                let url = "/daoway/rest/order/" + orderId + "/again?userId=" + base.userId + "&channel=" + base.channel;
                fetch(url, {
                    method: 'get'
                }).then(function (res) {
                    if (res && res.status == "200") {
                        return res.json();
                    }
                }).then(function (text) {
                    if(text.status == 'ok'){
                        let resultData = text.data;
                        var prices = resultData.prices;
                        for (var i = 0; i < prices.length; i++){
                            prices[i].quantity = prices[i].minBuyNum || 1;
                            prices[i].pic_url = prices[i].picUrl;
                        }
                        var totalPrice = prices[0].price * prices[0].quantity;
                        var communityId = resultData.communityId;
                        var addr = communityId ? resultData.city + " " + resultData.communityArea + resultData.communityName : resultData.street;
                        var appointTime = resultData.nextAppointTime;
                        var canChooseTechnician = resultData.canChooseTechnician;
                        that.prices = prices;
                        that.totalPrice = totalPrice;
                        that.formatTime = base.timeformat(appointTime, "yyyy-MM-dd HH:mm");
                        that.nextAppointTime = appointTime;
                        that.appointTime =  appointTime;
                        that.noFixFeePrice =  resultData.noFixFeePrice;
                        that.fixFee =  resultData.fixFee;
                        that.minBuyPrice =  resultData.minBuyPrice;
                        that.quantity = prices[0].quantity;
                        that.canChooseTechnician =  canChooseTechnician;
                        that.doorNum =  resultData.house;
                        that.contactPerson =  resultData.contactPerson;
                        that.phone =  resultData.phone;
                        that.serviceId = prices[0].serviceId;
                        that.addr =  addr;
                        that.communityId =  communityId;
                        that.lot =  resultData.lng;
                        that.lat =  resultData.lat;
                        that.city =  resultData.city;
                        that.alltotalPrices = totalPrice + resultData.fixFee;
                        that.priceId = prices[0].id;
                        that.setFixFee(resultData);
                        that.getTechnicalInfo();
                    }else {
                        that.warn.show = true;
                        that.warn.texts = text.msg;
                        setTimeout(() => {
                            that.closeLayer();
                            MIP.viewer.page.back();
                        }, 1000)

                    }
                }).catch(function (error) {
                    console.log(error)
                });

            },
            tobuy(){
            /* 	 console.log("tobuy");
            	document.getElementById("payDialog").toggle(); 
            	 console.log(document.getElementById("payDialog"));*/
            	 let self = this;
            	 self.$emit('actionpay')
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

