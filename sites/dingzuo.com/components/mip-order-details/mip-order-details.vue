<template>
  <div class="order-details">
    <h3>预定成功</h3>
    <p>白家大院（苏州街店）</p>
    <p><span>{{orderYear}}年{{orderMonth}}月{{orderDate}}日</span><span>{{orderTime}}</span><span>{{orderNum}}</span><span>包间12</span></p>
    <p>{{userName}} {{userPhone}}</p>
    <p>备注：{{userRemark}}</p>
    <mip-fixed class="pay" @click="toJump">取消订单</mip-fixed>
  </div>
</template>
<style scoped>
.order-details{
  background: #FFFFFF;
  padding:0 20px 50px;
}
h3{
  font-weight: normal;
  color: #FD8F14;
  text-align: center;
  height: 60px;
  line-height: 60px;
  border-bottom: 1px solid #BEBEBE;
}
.order-details>p{
  margin-top: 20px;
  color: #666666;
}
.order-details>p:nth-of-type(1){
  font-size: 18px;
  color: #333333;
}
.order-details>p:nth-of-type(2) span{
  margin-right: 20px;
}
.order-details>p:nth-of-type(2) span:last-child{
  color: #00C093;
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
  data(){
    return{
      orderDate:"",
      orderTime:"",
      orderNum:"",
      userName:"",
      userPhone:"",
      userRemark:"",
      orderMonth:"",
      orderYear:""
    }
  },
  methods:{
    toJump(){
      MIP.viewer.open("./index.html");
    }
  },
  mounted(){
    let date = new Date();
    this.orderDate = sessionStorage.getItem("orderDate");
    this.orderTime = sessionStorage.getItem("orderTime");
    this.orderNum = sessionStorage.getItem("orderNum");
    this.userName = sessionStorage.getItem("userName");
    this.userPhone = sessionStorage.getItem("userPhone");
    this.userRemark = sessionStorage.getItem("userRemark");
    this.orderMonth = date.getMonth() + 1;
    this.orderYear = date.getFullYear();
  }
}
</script>
