<template>
  <div class="order-details">
    <p class="type">待就餐</p>
    <div class="main">
      <h3>{{ hotelName }}</h3>
      <div class="hotelmes">
        <mip-img
          class="hotelimg"
          width="86px"
          height="63px"
          src="http://fs.kebide.com/2016/11/18/858eca3a7ab44df88ac2c12312a18de9.jpg"
        />
        <div class="mesdetails">
          <p>包间&nbsp;&nbsp;<span>VIP2</span>&nbsp;&nbsp;|&nbsp;&nbsp;{{ orderNum }}</p>
          <p>{{ orderYear }}-{{ orderMonth }}-{{ orderDate }}&nbsp;&nbsp;{{ orderTime }}</p>
          <p>备注 {{ userRemark }}</p>
        </div>
      </div>
      <div class="usermes">
        <h3>
          <mip-img
            :src="userimg"
            class="userimg"
            width="18"
            height="22"
          />
          {{ userName }}&nbsp;&nbsp;&nbsp;&nbsp;
          <mip-img
            :src="telimg"
            class="telimg"
            width="14"
            height="14"
          />
          {{ userPhone | phone }}</h3>
        <p><span>下单时间</span>{{ orderYear }}-{{ orderMonth }}-{{ orderDate }}&nbsp;&nbsp;{{ orderTime }}</p>
      </div>
    </div>
    <mip-fixed
      v-show="isMask"
      class="confirmmask"
      type="top"
      left="0">
      <div class="confirmbox">
        <p>确定取消预订</p>
        <p>取消后将不预留桌位</p>
        <p><a @click="maskHidden">取消</a><a href="./cancelreason.html">确认</a></p>
      </div>
    </mip-fixed>
    <!-- <mip-fixed class="pay" @click="maskShow">取消订单</mip-fixed> -->
  </div>
</template>
<style scoped>
/* 预定状态 */
.type{
  font-weight: normal;
  color: #FD8F14;
  height: 50px;
  line-height: 50px;
  padding-left: 15px;
  font-size: 18px;
}
/* 主体部分 */
.main{
  background: #FFFFFF;
}
/* 餐厅名 */
.main h3{
  height: 42px;
  line-height: 42px;
  border-bottom: 1px solid #DCDCDC;
  padding: 0 15px;
  color: #333333;
  font-size: 16px;
}
/* 订单餐厅详情 */
.main .hotelmes{
  padding: 15px;
  border-bottom: 1px solid #DCDCDC;
}
.main .hotelmes .hotelimg{
  float: left;
}
.main .hotelmes .mesdetails{
  margin-left: 95px;
  height: 63px;
}
.main .hotelmes .mesdetails p{
  color: #666666;
}
.main .hotelmes .mesdetails p span{
  color: #333333;
  font-weight: bold;
}
.main .hotelmes .mesdetails p:nth-of-type(2){
  height: 30px;
  line-height: 30px;
}
.main .hotelmes .mesdetails p:nth-of-type(3){
  color: #999999;
}
/* 订单用户详情 */
.main .usermes{
  padding-bottom: 10px;
}
.main .usermes h3{
  border-bottom: none;
}
.main .usermes .userimg{
  vertical-align: middle;
  margin-right: 5px;
}
.main .usermes .telimg{
  vertical-align: middle;
  margin-right: 5px;
}
.main .usermes p{
  height: 36px;
  line-height: 36px;
  padding: 0 15px;
  text-align: right;
}
.main .usermes p span{
  color: #999999;
  float: left;
}
/* 遮罩层 */
.confirmmask{
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.7);
  z-index: 9996 !important;
}
.confirmmask .confirmbox{
  height: 134px;
  width: 85%;
  background: #FFFFFF;
  border-radius: 4px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}
.confirmmask .confirmbox p{
  padding: 0 18px;
}
.confirmmask .confirmbox p:nth-child(1){
  height: 36px;
  line-height: 36px;
  color: #333333;
  font-size: 20px;
  padding-top: 10px;
}
.confirmmask .confirmbox p:nth-child(2){
  height: 30px;
  line-height: 30px;
  font-size: 16px;
  color: #FD8F14;
}
.confirmmask .confirmbox p:nth-child(3){
  height: 20px;
  line-height: 20px;
  text-align: right;
  margin-top: 30px;
  font-size: 16px;
}
.confirmmask .confirmbox p:nth-child(3) a:first-child{
  margin-right: 20px;
  color: #666666;
}
.confirmmask .confirmbox p:nth-child(3) a:last-child{
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
  color: #E46A75;
  display: block !important;
}
</style>

<script>
import userimg from '@/static/userimg.png'
import telimg from '@/static/telimg.png'
export default {
  filters: {
    phone (value) {
      if (!value) {
        return ''
      }
      let phone1 = value.substring(0, 3)
      let phone2 = value.substring(3, 7)
      let phone3 = value.substring(7)
      return phone1 + '-' + phone2 + '-' + phone3
    }
  },
  data () {
    return {
      orderDate: '',
      orderTime: '',
      orderNum: '',
      userName: '',
      userPhone: '',
      userRemark: '',
      orderMonth: '',
      orderYear: '',
      hotelName: '',
      userimg: userimg,
      telimg: telimg,
      isMask: false
    }
  },
  mounted () {
    let date = new Date()
    this.orderDate = (sessionStorage.getItem('orderDate') + '').padStart(2, 0)
    this.orderTime = sessionStorage.getItem('orderTime')
    this.orderNum = sessionStorage.getItem('orderNum')
    this.userName = sessionStorage.getItem('userName')
    this.userPhone = sessionStorage.getItem('userPhone')
    this.userRemark = sessionStorage.getItem('userRemark')
    this.hotelName = sessionStorage.getItem('hotelName')
    this.orderMonth = (sessionStorage.getItem('orderMonth') + '').padStart(2, 0)
    this.orderYear = date.getFullYear()
  },
  methods: {
    maskShow () {
      this.isMask = true
    },
    maskHidden () {
      this.isMask = false
    }
  }
}
</script>
