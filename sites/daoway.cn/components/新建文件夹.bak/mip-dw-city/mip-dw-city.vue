<template>
    <div class="wrapper">


        <div class="scroll-div-right">
            <div id="cityLocation" class="pos">定位</div>
            <div class="position-city">北京</div>
            <div id="cityHot" class="pos">热门</div>
            <div class="positon-item">
                <div class="item">上海</div><div class="item">上海</div><div class="item">上海</div><div class="item">上海</div><div class="item">上海</div><div class="item">上海</div><div class="item">上海</div>
            </div>
            <div id="city" class="citydiv">
                <div class="pos">A</div>
                <div class="city">
                    <div>北京</div><div>北京</div><div>北京</div><div>北京</div><div>北京</div><div>北京</div><div>北京</div><div>北京</div>
                </div>
            </div>
        </div>
        <div class="right">
            <div>*</div>
            <div>#</div>
            <div v-for="i in items">{{i}}</div>
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


    .citydiv {
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
        right: 0;
        text-align: center;
        line-height: 17px;
        font-size: 14px;
        z-index: 99;
    }

    .positonimg {
        float: right;
        margin: 5px 10% 5px 0;
    }

</style>

<script>
    let bseurl = 'https://test.daoway.cn/daoway/rest';
    import base from '../../common/utils/base'
    import '../../common/utils/base.less'
    base.setHtmlRem()
    export default {
        data(){
            return {
                items: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
            }
        },
        mounted () {

        },
        methods: {


        }
    }
</script>
