<template>
<div class="message">
    <div class="textBox" >
        <span class="num">{{num}}/60</span>
        <textarea maxlength="60" class="jkx_textBox" placeholder="您还可以详细描述故障，或提出其他要求" v-model="desc" @input="descInput" @blur="blur"></textarea>
    </div>
<div class="tips"> <p>工作时间（08:00-22:00）内将有来自重庆区号023的电话与您联系确认详情！</p> </div>
</div>

</template>
<script>
export default{
    data(){
        return{
            num:0,  //输入的字数
            desc:'',
        }
    },
    methods:{
        descInput(){
            if(this.desc.length==60){
                MIP.setData({
                    alertMsg : {
                        errorTitle: "最多输入60个字",
                        isError: true
                    },
                })
            }
            this.num = this.desc.length
        },
        blur(){
             MIP.setData({
                orderData : {
                    desc:this.desc
                },
            })
        }
    }
}

</script>
<style lang="less" scoped>
.textBox{
    position: relative;
    margin: 10px 0;
    padding: 0 10px;
    background: #fff;
    .jkx_textBox{
        display: block;
        width: 100%;
        height: 60px;
        padding: 10px 0;
        line-height: 150%;
        text-indent: 10px;
        font-size: 12px;
        border: none;
        outline:none;
    }
    .num{
        position: absolute;
        bottom:10px;
        right: 10px;
    }
}
.tips{
    padding: 10px;
    margin-bottom: 50px;
    p{
        padding: 5px;
        background: #f5ebc2;

    }
}

</style>
