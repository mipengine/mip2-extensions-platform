<template>
  <div class="mip-order">
    <div class="hotel" v-for="hotel in hotels">
      <h3>{{hotel.name}}（{{hotel.address}}）<span>{{hotel.state}}</span></h3>
      <p><span>{{hotel.date}}</span><span>{{hotel.time}}</span><span>{{hotel.people}}人</span></p>
      <p><span>{{hotel.room}}</span><a v-if="hotel.isNow" href="./index.html"><button>取消预约</button></a><a v-else href="./details.html"><button>再次预约</button></a></p>
    </div>
  </div>
</template>

<style scoped>
.hotel{
  padding: 15px 10px 10px;
  background: #FFFFFF;
  margin-bottom: 10px;
}
.hotel h3{
  font-weight: normal;
}
.hotel h3 span{
  font-size: 13px;
  color: #666666;
  float: right;
}
.hotel>p:nth-of-type(1){
  color: #666666;
  margin-top: 15px;
}
.hotel>p:nth-of-type(1) span{
  margin-right: 15px;
}
.hotel>p:nth-of-type(2){
  margin-top: 10px;
  height: 24px;
  line-height: 24px;
}
.hotel>p:nth-of-type(2) span{
  color: #FD8F14;
}
.hotel>p:nth-of-type(2) button{
  border: none;
  color: #FFFFFF;
  height: 24px;
  padding: 0 7px;
  border-radius: 12px;
  background: #00C093;
  float: right;
  outline: none;
  font-size: 12px;
}
</style>

<script>
export default {
  data(){
    return{
      hotels:[
        {name:"白家大院",address:"苏州街店",state:"进行中",date:"2018年1月12日",time:"11:00",people:"6",room:"包间12",isNow:true},
        {name:"白家大院",address:"苏州街店",state:"撤单",date:"2018年1月12日",time:"11:00",people:"6",room:"包间12",isNow:false},
        {name:"白家大院",address:"苏州街店",state:"消费成功",date:"2018年1月12日",time:"11:00",people:"6",room:"包间12",isNow:false}
      ]
    }
  }
}
</script>
