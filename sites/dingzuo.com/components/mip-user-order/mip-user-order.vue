<template>
  <div class="mip-order">
    <mip-fixed class="fixbox" type="top" left="0px">
      <span @click="selectAll" :class="isAll?'select':''">全部</span>
      <span @click="selectWait" :class="isWait?'select':''">待就餐</span>
      <span @click="selectOk" :class="isOk?'select':''">完成</span>
    </mip-fixed>
    <div style="height: 46px;"></div>
    <div class="hotel" v-for="hotel in hotels" :key="hotel.id">
      <h3>{{hotel.name}}（{{hotel.address}}）<span v-if="hotel.isOk" class="success">完成</span><span v-else>待就餐</span></h3>
      <div class="listmain">
        <mip-img
          class="hotelimg"
          width="86px"
          height="63px"
          src="http://fs.kebide.com/2016/11/18/858eca3a7ab44df88ac2c12312a18de9.jpg"
        ></mip-img>
        <div class="hoteldetails">
          <p>{{hotel.room}}&nbsp;&nbsp;<span>VIP2</span>&nbsp;&nbsp;|&nbsp;&nbsp;{{hotel.people}}人<a href="./orderdetails.html">订单详情&nbsp;&nbsp;&gt;</a></p>
          <p>{{hotel.date}}&nbsp;&nbsp;{{hotel.time}}</p>
          <a v-if="hotel.isOk" class="zcyy" href="#">再次预约</a>
          <a v-else href="#">取消预约</a>
          <p>位置 大厅</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 标题 */
.fixbox{
  height: 45px;
  background: #FFFFFF;
  top: 44px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-around;
}
.fixbox span{
  display: inline-block;
  height: 44px;
  line-height: 44px;
  padding: 0 15px;
}
.fixbox .select{
  color: #00C093;
  border-bottom: 1px solid #00C093;
}
.hotel{
  background: #FFFFFF;
  margin-bottom: 10px;
}
/* 头部标题 */
.hotel h3{
  height: 42px;
  line-height: 42px;
  font-size: 16px;
  border-bottom: 1px solid #DCDCDC;
  padding: 0 10px;
}
.hotel h3 span{
  font-size: 13px;
  float: right;
  color: #FD8F14;
}
.hotel h3 .success{
  color: #00C093;
}
/* 头部主体 */
.hotel .listmain{
  padding: 15px;
}
.hotel .listmain .hotelimg{
  float: left;
}
.hotel .listmain .hoteldetails{
  margin-left: 95px;
  height: 63px;
}
.hotel .listmain .hoteldetails a{
  float: right;
}
.hotel .listmain .hoteldetails p{
  font-size: 13px;
  color: #666666;
}
.hotel .listmain .hoteldetails p:nth-of-type(1) span{
  color: #333333;
  font-weight: bold;
}
.hotel .listmain .hoteldetails p:nth-of-type(1) a{
  color: #666666;
}
.hotel .listmain .hoteldetails p:nth-of-type(2){
  height: 30px;
  line-height: 30px;
}
.hotel .listmain .hoteldetails p:nth-of-type(3){
  color: #999999;
}
.hotel .listmain .hoteldetails>a{
  background: #E46A75;
  width: 72px;
  height: 26px;
  text-align: center;
  line-height: 26px;
  color: #FFFFFF;
  border-radius: 4px;
  font-size: 13px;
  margin-top: -10px;
}
.hotel .listmain .hoteldetails>.zcyy{
  background: #00C093;
}
</style>

<script>
export default {
  data(){
    return{
      hotels:[],
      hotellist:[
        {id:1,name:"万龙洲海鲜大酒店",address:"望京店",date:"2018-08-12",time:"11:30",people:"6",room:"包间12",isOk:false},
        {id:2,name:"白家大院",address:"苏州街店",date:"2018-08-11",time:"12:30",people:"6",room:"包间12",isOk:true},
        {id:3,name:"白家大院",address:"望京店",date:"2018-08-13",time:"11:00",people:"6",room:"包间12",isOk:false}
      ],
      isAll:true,
      isWait:false,
      isOk:false
    }
  },
  methods:{
    selectAll(){
      this.isAll = true;
      this.isWait = false;
      this.isOk = false;
      this.hotels = this.hotellist;
    },
    selectWait(){
      this.isAll = false;
      this.isWait = true;
      this.isOk = false;
      this.hotels = [];
      let len = this.hotellist.length;
      for(let i = 0;i < len;i ++){
        if(!this.hotellist[i].isOk){
          this.hotels.push(this.hotellist[i]);
        }
      }
    },
    selectOk(){
      this.isAll = false;
      this.isWait = false;
      this.isOk = true;
      this.hotels = [];
      let len = this.hotellist.length;
      for(let i = 0;i < len;i ++){
        if(this.hotellist[i].isOk){
          this.hotels.push(this.hotellist[i]);
        }
      }
    }
  },
  mounted(){
    this.hotels = this.hotellist;
  }
}
</script>
