<template>
    <div class="wrapper">

        <div class="fixed">
            <div class="position">北京</div>
            <div class="inputxt">
                <div class="inputButton"><img class="icon-small" src="http://www.daoway.cn/images/serch.png">搜索您所在的小区</div>
            </div>
        </div>
        <div class="box">
            <div>
                <div class="usedadd">我的常用地址</div>
                <div class="noborder">
                    <div class="listadd">
                        <img class="p-icon" src="https://www.daoway.cn/h5/image/position.png">
                        <div class="addname">
                            <div class="addcur">小明 13285555555
                            </div>
                            <div class="lin">
                                <div class="lin">北京市朝阳区时代家园5号楼1201</div>
                            </div>
                        </div>
                    </div>
                   <!-- <div class="bottomarrow">展开全部地址
                        <div class="botrow">
                            <div class="bottom-arrow1"></div>
                            <div class="bottom-arrow2"></div>
                        </div>
                    </div>-->
                    <div class="bottomarrow" >收起部分地址
                        <div class="botrow" style="bottom:14px">
                            <div class="top-arrow1"></div>
                            <div class="top-arrow2"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="usedadd" style="margin-top:0">附近小区</div>
            <div class="listadd">
                <img class="p-icon" src="https://www.daoway.cn/h5/image/position.png">
                <div class="addname">
                    <div class="addcur">name
                    </div>
                    <div class="lin">北京市朝阳区时代家园5号楼1201</div>
                </div>
            </div>
            <div class="listadd">
                <img class="p-icon" src="https://www.daoway.cn/h5/image/position.png">
                <div class="addname">
                    <div class="addcur">name</div>
                    <div class="lin">北京市朝阳区时代家园5号楼1201</div>
                </div>
            </div>
            <div class="listadd">
                <img class="p-icon" src="https://www.daoway.cn/h5/image/position.png">
                <div class="addname">
                    <div class="lin">北京市朝阳区时代家园5号楼1201</div>
                </div>
            </div>
            <div class="listadd">
                <img class="p-icon" src="https://www.daoway.cn/h5/image/position.png">
                <div class="addname">
                    <div class="addcur" style="font-weight:bold">找不到所在的小区？</div>
                    <div class="lin">点我选择:北京</div>
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
