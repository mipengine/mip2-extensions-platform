<template>
    <div class="wrapper">
        <div class="scroll-div-right" id="all">
            <div id="cityLocation" class="pos">定位</div>
            <div class="position-city">北京</div>
            <div id="cityHot" class="pos">热门</div>
            <div class="positon-item">
                <div class="item" v-for="h in hot" @touchend="tocommunity(h.name)">{{h.name}}</div>
            </div>
            <div class="citydiv" v-for="i in cityList" >
                <div class="pos" v-bind:id="i.title">{{i.title}}</div>
                <div class="city">
                    <div v-for="v in i.value" @touchend="tocommunity(v.name)">{{v.name}}</div>
                </div>
            </div>
        </div>
        <div class="right">
            <div><a href="#all">*</a></div>
            <div v-for="m in cityList"><a :href="'#'+ m.title">{{m.title}}</a></div>
        </div>
    </div>
</template>
<script>
    import base from '../../common/utils/base'
    export default {
        data(){
            return {
                city:'',
                cityLists: [],
                warn: {// 弹窗
                    show: false,
                    texts: ''
                },
                hot:[]
            }
        },
        mounted () {
            this.city = decodeURIComponent(base.getRequest(location.href).city);
            this.citylist();
        },
        methods: {
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
                MIP.viewer.open(base.htmlhref.community+'?city='+city, {isMipLink: true })
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


