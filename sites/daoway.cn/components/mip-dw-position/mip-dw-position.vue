<template>
    <div class="wrapper">
        <baidu-map ak="epGAmM09OL7Lwy7cIu47pxzK" :center="center" :zoom="zoom" @ready="handler"></baidu-map>
        <div id="position" v-if="positionpage">
            <div class="fixed">
                <div class="position">{{city}}</div>
                <div class="inputxt">
                    <div class="inputButton" @touchend="searchcommunity()"><img class="icon-small" src="http://www.daoway.cn/images/serch.png">搜索您所在的小区</div>
                </div>
            </div>
            <div class="box">
                <div>
                    <div class="usedadd" v-if="useraddr.length >0">我的常用地址</div>
                    <div class="noborder" v-if="useraddr.length >0">
                        <div class="listadd" v-bind:position="i" v-for="i in useraddr" @click="tapback(i)">
                            <img class="p-icon" src="https://www.daoway.cn/h5/image/position.png">
                            <div class="addname">
                                <div class="addcur">{{i.contactPerson}} {{i.phone}}
                                </div>
                                <div class="lin">
                                    <div class="lin">{{i.city}}{{i.area}}{{i.name}}{{i.doorNum}}</div>
                                </div>
                            </div>
                        </div>
                         <div @touchend="taptoggle"  v-if="tapshow" class="bottomarrow">展开全部地址 ∨</div>
                         <div @touchend="taptoggle" v-else class="bottomarrow" >收起部分地址 ∧</div>
                    </div>
                </div>
                <div class="usedadd" style="margin-top:0">附近小区</div>
                <div v-for="p in community" v-bind:position="p" class="listadd" @click="tapback(p)">
                    <img class="p-icon" src="https://www.daoway.cn/h5/image/position.png">
                    <div class="addname">
                        <div class="addcur">{{p.name}}
                        </div>
                        <div class="lin">{{p.addr}}</div>
                    </div>
                </div>
            </div>

        </div>
        <div v-if="communitypage" id="community">
            <div class="fixed">
                <div class="selectCity">
                    <div class="c-position" @touchend="tocity()">{{city}}</div><i>▼</i>
                </div>
                <div class="c-inputxt">
                    <img class="c-icon-small" src="http://www.daoway.cn/images/serch.png" >
                    <input class="com-input" placeholder="搜索您所在的小区" v-model="searchval" type="text"
                           @input="getlist"/>
                </div>
                <div class="clear">取消</div>
            </div>
            <div class="listbox">
                <div class="list" v-bind:position="c" v-for="c in cityList"  @touchend="tapback(c)">
                    <div class="listLeft">
                        <div class="listadd">{{c.name}}</div>
                        <div class="liststreet">{{c.addr?c.addr:""}}</div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="citypage" id="city">
            <div class="scroll-div-right" id="all">
                <div id="cityLocation" class="pos">定位</div>
                <div class="position-city">北京</div>
                <div id="cityHot" class="pos">热门</div>
                <div class="positon-item">
                    <div class="item" v-for="h in hot" @touchend="tocommunity(h.name)">{{h.name}}</div>
                </div>
                <div class="citydiv" v-for="i in cityLists" >
                    <div class="pos" v-bind:id="i.title">{{i.title}}</div>
                    <div class="city">
                        <div v-for="v in i.value" @touchend="tocommunity(v.name)">{{v.name}}</div>
                    </div>
                </div>
            </div>
            <div class="right">
                <div><a href="#all">*</a></div>
                <div v-for="m in cityLists"><a :href="'#'+ m.title">{{m.title}}</a></div>
            </div>
        </div>
    </div>
</template>

<script>
    import base from '../../common/utils/base'
    import '../../common/utils/base.less'
    import BaiduMap from '../../node_modules/vue-baidu-map/components/map/Map.vue'
    import login from '../../common/utils/login'

    export default {
        data(){
            return {
                zoom: 3,
                city:'',
                warn: {
                    // 弹窗
                    show: false,
                    texts: ''
                },
                community:[],
                useraddr:[],
                useraddr2:[],
                useraddr3:[],
                cityList: {},
                searchval:'',
                cityLists: [],
                ak:true,
                positionpage:true,
                communitypage:false,
                citypage:false,
                tapshow:false,
                taphide:false,
            }
        },
        components: {
            BaiduMap
        },
        mounted () {

            if(base.userId && base.token){
                this.userAddress(base.userId,base.token)
            }
        },
        methods: {
            handler ({BMap}) {
                var that = this;
                var geolocation = new BMap.Geolocation();
                geolocation.getCurrentPosition(function (r) {
                    if (r.point) {
                        var city = r.address.city;
                        that.city = city.replace(/市$/g,"");
                        that.getCommunity(r.point.lng,r.point.lat)
                    }else{
                        this.warn.show = true;
                        this.warn.texts = 'GPS定位失败！请手动搜索小区';
                    }
                })

            },
            getCommunity(lot,lat){
                var that = this;
                let url ="/daoway/rest/community/autoPositionMerge?lot=" + lot + "&lat=" + lat + "&channel=" + base.channel
                fetch(url, {
                    method: 'get',
                }).then(function (res) {
                    if (res && res.status == "200") {
                        return res.json();
                    }
                }).then(function (text) {
                    let data = text.data;
                    that.community = data.communities;
                }).catch(function (error) {
                    this.warn.show = true;
                    this.warn.texts = error.msg;
                });
            },
            userAddress(userId){
                var that = this;
                let url ="/daoway/rest/user/" + userId + "/getUserAddress" + "?channel=" + base.channel
                fetch(url, {
                    method: 'get',
                    credentials: "include",
                }).then(function (res) {
                    if (res && res.status == "200") {
                        return res.json();
                    }
                }).then(function (text) {
                    that.useraddr2 = text.data;
                    if(text.data.length > 2){
                        that.tapshow = true;
                        that.useraddr = text.data.slice(0,2);
                    }
                    that.useraddr3 = text.data.slice(0,2);
                }).catch(function (error) {
                    this.warn.show = true;
                    this.warn.texts = error.msg;
                });
            },
            taptoggle(){
                if(this.tapshow){
                    this.tapshow = false;
                    this.useraddr = this.useraddr2 ;
                }else {
                    this.tapshow = true;
                    this.useraddr = this.useraddr3;
                }
            },
            tapback(i){
                base.position(i);
                MIP.setData({"#position":i})
                MIP.viewer.page.back();
            },
            searchcommunity: function () {
                this.positionpage = false;
                this.communitypage = true;
            },
            getlist(){//community
                var that = this;
                var url = "/daoway/rest/community/searchMerge?manualCity=" + encodeURIComponent(this.city) + "&search=" + this.searchval + "&channel=" + base.channel;
                fetch(url, {
                    method: 'get',
                }).then(function (res) {
                    if (res && res.status == "200") {
                        return res.json();
                    }
                }).then(function (text) {
                    that.cityList = text.data;
                }).catch(function (error) {
                    this.warn.show = true;
                    this.warn.texts = error.msg;
                });
            },
            tocity(){
                this.positionpage = false;
                this.communitypage = false;
                this.citypage = true;
                this.citylist();
            },
            citylist(){
                var that = this;
                let url = "/daoway/rest/community/city_list?channel=" + base.channel;
                fetch(url, {
                    method: 'get',
                }).then(function (res) {
                    if (res && res.status == "200") {
                        return res.json();
                    }
                }).then(function (text) {
                    let datas = text.data;
                    that.hot = datas.hot;
                    let items =  ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
                    let ary =[];
                    for(let i=0; i<items.length; i++){
                        let item = items[i];
                        let data = datas[item];
                        if(data.length > 0){
                            ary.push({
                                'title':item.toUpperCase(),
                                'value':data
                            })
                        }
                    }
                    that.cityLists = ary;
                }).catch(function (error) {
                    this.warn.show = true;
                    this.warn.texts = error.msg;
                });
            },
            tocommunity(city){
                this.city = city;
                this.positionpage = false;
                this.communitypage = true;
                this.citypage = false;
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
    .position{display: inline-block; width: 80px}
    .fixed{background: #fff; padding: 10px 3%}
    .inputxt{width: 76%; display: inline-block}


    .fixed .inputButton {
        width:94%;
        height: 25px;
        line-height: 25px;
        text-align: center;
        font-size: 14px;
        color: #898989;
        margin: 0;
        background: #ddd;
        border-radius: 14px;
    }

    .usedadd {
        padding-left: 3%;
        width: 97%;
        height:30px;
        line-height: 30px;

        font-size: 14px;
    }

    .listadd {
        width: 100%;
        padding: 12px 2% 0;
        background: #fff;
    }

    .listadd img {
        width: 12px;
        height: 12px;
        display: inline-block;
        vertical-align: top;
        margin: 0 3%;
    }

    .addname {
        display: inline-block;
        width: 88%;
        line-height: 20px;
        border-bottom: 1px solid #e5e5e5;
        padding-bottom: 7px;
    }

    .addname div {
        display: inline-block;
    }

    .lin {
        font-size: 14px;
        color: #898989;
        margin-top: 2px
    }

    .lin div {
        display: inline-block;
        margin-right: 5px;
    }

    .listadd:last-child .addname {
        border: none;
    }
    .noborder{background: #fff}

    .noborder .listadd:last-child .addname {
        border: none;
    }

    .addcur {
        width: 100%;
    }

    .bottomarrow {
        text-align: center;
        width: 100%;
        height: 40px;
        line-height: 40px;
        font-size: 14px;
    }

    .botrow {
        position: relative;
        display: inline-block;
        bottom: 9px;
        left: 5px;
    }

    .top-arrow1, .top-arrow2 {
        width: 0;
        height: 0;
        display: block;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 5; /*兼容ie8-*/
        border-top: 6px transparent dashed;
        border-left: 6px transparent dashed;
        border-right: 6px transparent dashed;
        border-bottom: 6px white solid;
        overflow: hidden;
    }

    .top-arrow1 {
        border-bottom: 6px #4c4c4c solid;
    }

    .top-arrow2 {
        top: 1px; /*重要*/
        border-bottom: 6px white solid;
    }
    .p-icon{
        width: 12px;
        height: auto;
        position: relative;
        top:3px
    }
    .icon-small{
        width: 15px;
        height: auto;
        position: relative;
        top:3px;
        margin-right: 5px;
    }

    .com-input{
        padding-left:16%;height:25px;
    }

    .list {
        border-bottom: 1px solid #e5e5e5;
        padding: 10px 3%;
    }

    .listLeft {
        display: inline-block;
        height: 20px;
        width: 96%;
    }

    .liststreet {
        color: #898989;
        font-size: 14px;
    }

    .listbox {
        width: 100%;
        background: #fff;
    }

    .fixed .selectCity {
        height: 40px;
        line-height: 40px;
        margin: 0 3px;
        display: inline-block;
    }
    .c-position{
        display: inline-block;
    }
    .fixed .c-inputxt{
        display: inline-block;
        background: #ddd;
        height: 30px;
        line-height: 30px;
        border-radius: 16px;
        width: 70%;
    }
    .c-inputxt input{
        width: 66%;
        display: inline-block;
        background: none;

    }
    .c-icon-small{
        width: 15px;
        height: auto;
        position: relative;
        top:4px;
        left: 5%;
    }
    .clear{display: inline-block}
    .city div {
        width: 100%;
    }

    .pos {
        padding: 0 2%;
        width: 96%;
        background: #ebebeb;
        height: 30px;
        line-height: 30px;
    }

    .position-city {
        padding-left: 5%;
        line-height: 30px;
        width: 100%;
    }

    .positon-item {
        margin: 10px 0;
        width: 96%;
    }

    .item {
        width: 21%;
        margin: 5px 1.2% 0;
        border: 1px solid #e5e5e5;
        height: 27px;
        line-height: 27px;
        text-align: center;
        display: inline-block;
        border-radius: 3px;
        background: #f5f5f5;
        font-size: 14px;
    }

    .city {
        width: 94%;
        margin: 0 auto;
    }

    .city div {
        line-height: 33px;
        width: 100%;
        border-bottom: 1px solid #e5e5e5;
    }

    .city div:last-child {
        border: none;
    }

    .right {
        width: 30px;
        position: fixed;
        top: 40px;
        right:3%;
        text-align: center;
        line-height: 17px;
        font-size: 14px;
        z-index: 99;
    }
    .right div{
        margin-top: 5px;
    }

    .positonimg {
        float: right;
        margin: 5px 10% 5px 0;
    }

</style>

