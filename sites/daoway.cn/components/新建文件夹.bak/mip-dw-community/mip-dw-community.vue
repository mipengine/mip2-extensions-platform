<template>
    <div class="wrapper">


        <div class="fixed">
            <div class="selectCity">
                <div class="c-position">北京</div><i>▼</i>
            </div>
            <div class="c-inputxt">
                <img class="c-icon-small" src="http://www.daoway.cn/images/serch.png" >
                <input class="com-input"  @change="getlist" v-model="val" type="text" placeholder="搜索您所在的小区" />
            </div>
            <div class="clear">取消</div>
        </div>
        <div class="listbox">
            <div class="list">
                <div class="listLeft">
                    <div class="listadd">tem.nam</div>
                    <div class="liststreet">北京朝阳区时代家园</div>
                </div>
            </div>
        </div>



    </div>
</template>
<script>
    import base from '../../common/utils/base'
    import '../../common/utils/base.less'
    export default {
        data(){
            return {
                city: '',
                cityList: {},
                warn: {// 弹窗
                    show: false,
                    texts: ''
                },
                getlist:''
            }
        },
        mounted () {
            //this.getlist()
        },

        methods: {
            getlist:function(){
                let val = this.val;
                console.log(111)
                //this.searchHandler.search(value)
                /*if (value === '') {
                    this.searchData = []
                }*/

            }

                /*if (val.length == 0) {
                    that.setData({
                        searchMerge: []
                    });
                }
*/
/*
                let url = "/daoway/rest/community/city_list" + "?channel=" + base.channel;
                fetch(url, {
                    method: 'get',
                }).then(function (res) {
                    if (res && res.status == "200") {
                        return res.json();
                    }
                }).then(function (text) {
                    let data = text.data;
                    console.log(data)
                }).catch(function (error) {
                    this.warn.show = true;
                    this.warn.texts = error.msg;
                });*/




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

    .list {
        border-bottom: 1px solid #e5e5e5;
        padding: 10px 3%;
    }

    .listLeft {
        display: inline-block;
        height: 20px;
    }
    .com-input{
        padding-left:16%;height:25px;
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

