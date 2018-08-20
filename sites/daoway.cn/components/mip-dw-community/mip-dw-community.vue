<template>
    <div class="wrapper">


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
            <div class="list" v-bind:position="c" v-for="c in cityList"  @touchend="toindex(c)">
                <div class="listLeft">
                    <div class="listadd">{{c.name}}</div>
                    <div class="liststreet">{{c.addr?c.addr:""}}</div>
                </div>
            </div>
        </div>



    </div>
</template>

<script>

    import base from '../../common/utils/base'
    import '../../common/utils/base.less'
    //base.setHtmlRem();
    export default {
        data(){
            return {
                city: '',
                cityList: {},
                warn: {// 弹窗
                    show: false,
                    texts: ''
                },
                searchval:''
            }
        },
        mounted () {
            this.city = decodeURIComponent(base.getRequest(location.href).city);
        },
        methods: {
            getlist(){
                var that = this;
                var url = "/daoway/rest/community/searchMerge?manualCity=" + encodeURIComponent(this.city) + "&search=" + this.searchval + "&channel=" + base.channel;
                fetch(url, {
                    method: 'get',
                }).then(function (res) {
                    if (res && res.status == "200") {
                        return res.json();
                    }
                }).then(function (text) {
                    let data = text.data;
                    that.cityList = data;
                }).catch(function (error) {
                    this.warn.show = true;
                    this.warn.texts = error.msg;
                });
            },
            toindex(c){
                if(c){
                    base.position(c);
                }
                let reservation = base.getRequest(location.href).reservation;
                if(reservation){
                    MIP.viewer.open(base.htmlhref.reservation, {isMipLink: true })
                }else{
                    MIP.viewer.open(base.htmlhref.index, {isMipLink: true })
                }

            },
            tocity(){
                let city = this.city;
                MIP.viewer.open(base.htmlhref.city+'?city='+city, {isMipLink: true })
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
    }

    .liststreet {
        color: #898989;
        font-size: 14px;
    }

    .listbox {
        margin-top: 40px;
        width: 94%;
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


</style>

