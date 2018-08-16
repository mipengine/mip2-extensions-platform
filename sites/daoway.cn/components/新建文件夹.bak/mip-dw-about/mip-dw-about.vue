<template>
    <div class="wrapper">
        <div class="logodiv">
            <img class="logo" src="https://www.daoway.cn/h5/image/logo.png" style="width:55px; height:55px">
        </div>
        <div class="list">官方微信号
            <div class="rightv">到位</div>
        </div>
        <div class="list">商务合作
            <div class="rightv rig">010-64522010</div>
            <div class="navigator-arrow"></div>
        </div>
        <div class="list last">客服电话
            <div class="rightv rig">4000908608</div>
            <div class="navigator-arrow"></div>
        </div>
        <div class="daoway">
            <div class="linjia">北京邻家科技有限公司</div>
            <div class="www">daoway.com</div>
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

    .logo{margin-top:35px}
    .logodiv{width: 100%; height: 140px; line-height: 140px; text-align: center;}
    .list{width: 100%; height: 45px; line-height: 45px; background: #fff; padding: 0 3%; border-bottom: 1px solid #e5e5e5; position: relative; font-size:14px}
    .last{border: none}
    .list div{display: inline-block}
    .rightv{float: right;color: #969696; width: 120px; text-align: right}
    .daoway{position: fixed; bottom: 10px; left: 0;width: 100%; line-height: 18px;  text-align: center; }
    .www{color: #969696}
    .navigator-arrow{position: absolute; top: 22px; right: 3%;}
    .rig{padding-right: 3%}


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
