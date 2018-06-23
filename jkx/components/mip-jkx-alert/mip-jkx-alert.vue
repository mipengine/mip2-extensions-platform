<template>
<div class="wrapper"   v-show="alertmsg.isError"  ref="jkxmsg">
     <!-- 输入错误提醒 -->
    <div class="jkx_msg">
      <p class="msg_main">{{alertmsg.errorTitle}}</p>
    </div>
</div>
   
</template>
<script>
export default{
    props:{
        alertmsg:{
            default(){
                return{}
            },
            type:Object
        }
    },
    watch:{
        alertmsg(val){
            setTimeout(()=>{
                MIP.setData({
                    alertMsg:{
                        "isError":false,
                        "errorTitle":""
                    }
                })
            }, 2000);
        }
    },
    mounted(){
        this.$refs.jkxmsg.style.height = document.documentElement.clientHeight+"px"
    },
    created(){
    }
}
    
</script>
<style lang="css" scoped>
.wrapper{
    position:relative;
        left:0;
        top:0;
        width: 100%;
}
    .jkx_msg{
        display: flex;   
        justify-content: center;  
        align-items: center;  
        
        width: 100%;
        height:100%;
        background-color: transparent;
        z-index: 5;
        text-align: center;
        }
    .jkx_msg .msg_main{
        color:#fff;
        padding:20px; 
        background-color: rgba(0,0,0,.4);
       display: inline-block;
       }
</style>
