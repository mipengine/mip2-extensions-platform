<template type="mip-mustache">
  <div class="mip-reserve">
    <div class="datemes">
      <span>{{ orderMonth }}</span>
      <span>{{ orderDate }}日</span>
      <span>{{ orderWeek }}</span>
      <span>{{ orderTime }}</span>
      <mip-img
        :src="editimg"
        class="editimg"
        width="22"
        height="22"
        @click="toReturn"
      />
      <span>{{ orderNum }}</span>
    </div>
    <div class="usermes">
      <div class="name-sex">
        <div class="sex">
          <span
            :class="isSex?&quot;select&quot;:&quot;&quot;"
            @click="isSex=true">男</span><span
              :class="isSex?&quot;&quot;:&quot;select&quot;"
              @click="isSex=false">女</span>
        </div>
        <div
          :class="isIncompleteN?&quot;&quot;:&quot;incomplete&quot;"
          class="name">
          <span>
            <mip-img
              :src="username"
              class="mesimg"
              width="22"
              height="22"
            />
          </span>
          <div class="inpout"><input
            v-model="name"
            type="text"
            placeholder="请输入姓名"></div>
        </div>
      </div>
      <div
        :class="isIncompleteP?&quot;&quot;:&quot;incomplete&quot;"
        class="phone">
        <span>
          <mip-img
            :src="userphone"
            class="mesimg"
            width="22"
            height="22"
          />
        </span>
        <div class="inpout"><input
          v-model="phone"
          type="text"
          placeholder="请输入手机号"
          @keyup="isNum()"></div>
      </div>
      <div class="remarks">
        <span>
          <mip-img
            :src="userremark"
            class="mesimg"
            width="22"
            height="22"
          />
        </span>
        <div class="inpout">
          <input
            v-model="remark"
            type="text"
            placeholder="请输入内容">
        </div>
      </div>
    </div>
    <ul class="label"><li
      v-for="label in labels"
      :key="label.id"
      @click="selectRemark">{{ label }}</li></ul>
    <!-- <div class="deposit">每单需预付<span>¥300.00</span>订金，提前60分钟取消可退
      <a>
        <mip-img
          width="16"
          height="16"
          :src="url1"></mip-img>
      </a>
    </div> -->
    <div class="supporter">【客必得】提供技术支持</div>
    <mip-fixed
      :class="isEject?&quot;eject&quot;:&quot;ejectno&quot;"
      type="top"
      left="0">
      请完善信息，再预定
    </mip-fixed>
    <mip-fixed
      class="pay"
      @click="toJump">有座，马上预定</mip-fixed>
  </div>
</template>

<style scoped>
input{
  outline: none;
  padding: 0;
}
.datemes{
  background: #FFFFFF;
  height: 46px;
  color: #333333;
  border-bottom: 10px solid #F0F0F8;
}
.datemes::before{
content: "";
position: absolute;
background:  #E0E0EB;
width: 200%;
height: 1px;
-webkit-transform-origin: 0 0;
-moz-transform-origin: 0 0;
-ms-transform-origin: 0 0;
-o-transform-origin: 0 0;
transform-origin: 0 0;
-webkit-transform: scale(0.5, 0.5);
-ms-transform: scale(0.5, 0.5);
-o-transform: scale(0.5, 0.5);
transform: scale(0.5, 0.5);
}
.datemes span{
  height: 46px;
  line-height: 46px;
  margin-left: 15px;
  font-size: 13px;
}
.datemes span:nth-of-type(1){
  color: #FD8F14;
  font-size: 14px;
}
.datemes span:nth-of-type(2){
  font-size: 16px;
  font-weight: bold;
}
.datemes span:nth-of-type(5){
  float: right;
  margin-right: 40px;
  font-size: 16px;
}
.datemes .editimg{
  float: right;
  margin-top: 12px;
  margin-right: 15px;
}
.usermes{
  margin-top: 10px;
  background: #FFFFFF;
  padding: 0 15px;
}
.usermes .incomplete{
  color: #E46A75;
}
.usermes .incomplete input{
  color: #E46A75;
}
.usermes .incomplete input::-webkit-input-placeholder{
  color:#E46A75;
}
.usermes .incomplete input::-moz-placeholder{   /* Mozilla Firefox 19+ */
  color:#E46A75;
}
.usermes .incomplete input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
  color:#E46A75;
}
.usermes .incomplete input:-ms-input-placeholder{  /* Internet Explorer 10-11 */
  color:#E46A75;
}
.usermes .name-sex{
  width: 100%;
  height: 41px;
  line-height: 40px;
  border-bottom: 1px solid #F0F0F8;
  padding: 5px 0;
}
.usermes .name-sex .name{
  margin-right: 100px;
  height: 41px;
}
.usermes span{
  float: left;
  height: 41px;
  line-height: 40px;
  display: block;
}
.usermes span .mesimg{
  margin-top: 10px;
  margin-left: 5px;
}
.usermes .name-sex .name .inpout{
  margin-left: 40px;
  height: 41px;
}
.usermes .inpout input{
  height: 41px;
  width: 100%;
  border: none;
}
.usermes .name-sex .sex{
  width: 81px;
  float: right;
  height: 24px;
  border: 1px solid #DCDCDC;
  margin-top: 8px;
  font-size: 13px;
  color: #666666;
}
.usermes .name-sex .sex span{
  width: 40px;
  text-align: center;
  display: inline-block;
  height: 24px;
  line-height: 24px;
}
.usermes .name-sex .sex .select{
  color: #FFFFFF;
  background: #00C093;
}
.usermes .name-sex .sex span:first-child{
  border-right: 1px solid #DCDCDC;
}
.usermes .name-sex .sex .sexselect em{
  border-color: #FD8F14;
}
.usermes .name-sex .sex .sexselect em i{
  visibility: visible;
}
.usermes .phone{
  height: 42px;
  box-sizing: border-box;
  border-bottom: 1px solid #F0F0F8;
}
.usermes .phone .inpout{
  margin-left: 40px;
}
.usermes .remarks{
  height: 42px;
  box-sizing: border-box;
  border-bottom: 1px solid #F0F0F8;
}
.usermes .remarks .inpout{
   margin-left: 40px;
}
.label{
  padding: 0 15px;
  overflow: hidden;
  margin-top: 10px;
}
.label li{
  list-style: none;
  float: left;
  margin-top: 10px;
  height: 30px;
  line-height: 30px;
  padding: 0 10px;
  background: #F0F0F8;
  margin-right: 8px;
  border-radius: 2px;
  color: #333333;
}
.label .select{
  color: #FFFFFF;
  background: #00C093;
}
.deposit{
    height: 20px;
    color: #999999;
    font-size: 13px;
    line-height: 20px;
    margin-top: 15px;
    padding-left: 16px;
    display: flex;
}
.deposit a{
  display: inline-block;
  margin-left: 5px;
}
.deposit span{
  color: #FD8F14;
}
.supporter{
    padding-left: 10px;
    color: #999999;
    font-size: 13px;
    margin-top: 10px;
}
.pay{
  height: 48px;
  width: 90%;
  left: 5%;
  bottom: 0;
  line-height: 48px;
  text-align: center;
  background: #FFFFFF;
  font-size: 16px;
  background: #00C093;
  color: #FFFFFF;
  bottom: 10px;
  display: block !important;
  border-radius: 4px;
}
/* 弹出层 */
.eject{
  width: 192px;
  height: 40px;
  background: #000000;
  color: #FFFFFF;
  text-align: center;
  line-height: 40px;
  opacity: 0.6;
  border-radius: 4px;
  top: 250px;
  left: 50%;
  transform: translateX(-50%);
}
.ejectno{
  display: none;
}
</style>

<script>
import img1 from '@/static/white.png'
import editimg from '@/static/edit.png'
import username from '@/static/username.png'
import userphone from '@/static/userphone.png'
import userremark from '@/static/userremark.png'
export default {
  props: {
    mipClickToken: {
      required: true,
      type: String
    }
  },
  data () {
    return {
      isSex: true,
      labels: ['儿童椅', '靠窗', '有老人', '尽量安静', '无烟', '过生日'],
      name: '',
      phone: '',
      remark: '',
      orderDate: '',
      orderWeek: '',
      orderTime: '',
      orderNum: '',
      orderMonth: '',
      isIncompleteN: true,
      isIncompleteP: true,
      isEject: false,
      url1: img1,
      editimg: editimg,
      username: username,
      userphone: userphone,
      userremark: userremark
    }
  },
  mounted () {
    let date = new Date()
    this.orderDate = sessionStorage.getItem('orderDate')
    this.orderWeek = sessionStorage.getItem('orderWeek')
    this.orderTime = sessionStorage.getItem('orderTime')
    this.orderNum = sessionStorage.getItem('orderNum')
    // 修改今天和明天的日期显示格式
    if (this.orderDate === date.getDate()) {
      this.orderMonth = '今'
    } else if (this.orderDate === date.getDate() + 1) {
      this.orderMonth = '明'
    } else {
      this.orderMonth = sessionStorage.getItem('orderMonth') + '月'
    }
  },
  methods: {
    // 页面跳转
    toJump () {
      if (this.name !== '' && this.phone.length === 11) {
        this.isIncomplete = true
        // let schema = {
        //   "order_id": 0,
        //   "timestamp":(new Date()).getTime(),
        //   "order_name":"餐厅订单",
        //   "order_user":sessionStorage.getItem("openid"),
        //   "order_status":"WAITING_PAY",
        //   "order_fields":{
        //     "restaurantName":"白家大院",
        //     "orderTime":this.orderTime,
        //     "customerCount":this.orderNum,
        //     "phoneNum":this.phone,
        //     "depositAmount":0
        //   }
        // };
        // let req = new Request("https://openapi.baidu.com/rest/2.0/cambrian/opensc/order/sync?access_token="+sessionStorage.getItem("access_token"),{
        //   method:"POST",
        //   headers: new Headers({
        //     'Accept': 'application/json',
        //     'Content-Type': 'application/x-www-form-urlencoded'
        //   }),
        //   mode:'cors',
        //   cache:'reload',
        //   body:schema
        // });
        // fetch(req).then(function(res){
        //   MIP.viewer.open("./complete.html");
        // }).catch(function(err){
        //   console.log(err);
        // })
        sessionStorage.setItem('userName', this.name)
        sessionStorage.setItem('userPhone', this.phone)
        sessionStorage.setItem('userRemark', this.remark)
        let sex = 1
        if (this.isSex) {
          sex = 1
        } else {
          sex = 0
        }
        let date = new Date()
        let mealTime = '2018-' + (date.getMonth() + 1) + '-' + this.orderDate + ' ' + this.orderTime
        let reqUrl = 'http://booking.shengyan.com.cn/api/Order/create'
        let numArr = this.orderNum.split('')
        numArr.pop()
        let ordernum = numArr.join('')
        fetch(reqUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: 'MealNum=' + ordernum + '&MealTime=' + mealTime + '&CustomerName=' + this.name + '&CustomerSex=' + sex + '&CustomerPhone=' + this.phone + '&Remark=' + this.remark + '&ePoiId=' + sessionStorage.getItem('hotelId') + '&openId=' + sessionStorage.getItem('openid') + '&clickToken=' + this.mipClickToken
        }).then(function (response) {
          return response.json()
        }).then(function (myJson) {
          MIP.viewer.open('./complete.html')
        }).catch(function (err) {
          console.log(err)
        })
      } else {
        this.isEject = true
        setTimeout(() => {
          this.isEject = false
        }, 800)
        if (this.name === '') {
          this.isIncompleteN = false
        } else {
          this.isIncompleteN = true
        };
        if (this.phone.length !== 11) {
          this.isIncompleteP = false
        } else {
          this.isIncompleteP = true
        }
      }
    },
    // 电话号码仅为数字且只能为11位
    isNum () {
      let phone1 = this.phone.split('')
      let phoneLen = phone1.length - 1
      for (let i = phoneLen; i >= 0; i--) {
        if ((!Number(phone1[i])) && Number(phone1[i]) !== 0) {
          phone1.pop()
        } else {
          break
        }
      }
      this.phone = phone1.join('')
      if (this.phone.length > 11) {
        let phone2 = this.phone.substring(0, 11)
        this.phone = phone2
      }
    },
    selectRemark (e) {
      let el = e.target
      if (el.className === '') {
        el.className = 'select'
        this.remark += el.innerHTML + ','
      } else {
        el.className = ''
        if (this.remark.indexOf(el.innerHTML) !== -1) {
          let text = el.innerHTML
          this.remark = this.remark.replace(text, '')
        }
      }
    },
    toReturn () {
      MIP.viewer.open('./details.html')
    }
  }
}
</script>
