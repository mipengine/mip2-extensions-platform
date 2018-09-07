<template>
  <div class="mip-complete">
    <h2>预定成功</h2>
    <p>座位号（<span>包间12</span>）</p>
    <div class="detail">到店就餐情报手机号即可<a href="./orderdetails.html">订单详情</a></div>
    <mip-fixed class="pay" @click="toJump">完成</mip-fixed>
  </div>
</template>

<style scoped>
.mip-complete{
  color: #666666;
}
h2{
  text-align: center;
  margin-top: 50px;
  color: #FD8F14;
  
}
.mip-complete>p{
  text-align: center;
  margin-top: 20px;
  margin-bottom: 30px;
  font-size: 16px;
}
.mip-complete>p span{
  color: #00C093;
}
.detail{
  padding-top: 10px;
  width: 90%;
  margin: 0 auto;
  border-top: 2px solid #E4E4E4;
}
.detail a{
  color: #FD8F14;
  float: right;
}
.pay{
    height: 48px;
    width: 100%;
    left: 0;
    bottom: 0;
    line-height: 48px;
    text-align: center;
    border-top: 1px solid #BEBEBE;
    background: #FFFFFF;
    font-size: 16px;
    color: #00C093;
    display: block !important;
}
</style>

<script>
export default {
  methods:{
    toJump(){
        MIP.viewer.open("./index.html");
    }
  }
}
</script>
