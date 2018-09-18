<template type="mip-mustache">
  <div class="mip-details">
    <div class="dateout">
      <ul
        ref="date"
        class="date">
        <li
          v-for="date in dates"
          :key="date.id"
          @click="choiceDate"><p>{{ date.date }}</p><span>{{ date.week }}</span><span style="display:none">{{ date.month+1 }}</span></li>
      </ul>
    </div>
    <div class="timeout">
      <ul class="time">
        <li
          class="timeselect"
          @click="choiceTime">11:00</li>
        <li
          v-for="time in times"
          :key="time.id"
          @click="choiceTime">{{ time }}</li>
      </ul>
    </div>
    <div class="rooms">
      <div class="peopleout">
        <ul class="people">
          <li
            v-for="people in peoples"
            :key="people.id"
            @click="choiceNum">{{ people }}人</li>
        </ul>
      </div>
      <div
        v-if="isKeman"
        class="hall">
        <mip-img
          :src="url1"
          width="112px"
          height="64px"/>
        <div class="details">
          <p class="mes">领地被占光！</p>
          <p class="remark">重新选择人数开战</p>
        </div>
      </div>
      <div
        v-else-if="isKongzhuo"
        class="hall">
        <mip-img
          :src="url2"
          width="90px"
          height="72px"/>
        <div class="details">
          <p class="surplus">大厅/<span>{{ dtNum }}</span>包间/<span>{{ bjNum }}</span></p>
          <p class="remark">有座哦</p>
        </div>
      </div>
      <div
        v-else
        class="hall">
        <mip-img
          :src="url3"
          width="100px"
          height="80px"/>
        <div class="details">
          <p class="choice">选择开战人数</p>
          <p class="remark">与您并肩作战</p>
        </div>
      </div>
    </div>
    <!-- <div class="deposit">每单需预付<span>¥300.00</span>订金，提前60分钟取消可退<a><mip-img
                 width="16"
                 height="16"
                 :src="url4"></mip-img></a></div> -->
    <div class="supporter">【客必得】提供技术支持</div>
    <mip-fixed
      :class="isKongzhuo?&quot;payselect&quot;:&quot;&quot;"
      class="pay"><a
        :href="isKongzhuo?&quot;./reserve.html&quot;:&quot;&quot;"
        :data-title="hotelname"
        mip-link>有座，马上预定</a></mip-fixed>
  </div>
</template>
<style scoped>
 /* 自定义样式 */
li{list-style: none;display: inline-block;}
.mip-details{
width: 100%;
overflow-x: auto;
}
.mip-details .dateout{
width: 100%;
height: 60px;
border-bottom: 1px solid #F0F0F8;
background: #FFFFFF;
position: relative;
}
.mip-details .dateout::before{
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
/* 隐藏滚动条 */
.mip-details .dateout .date::-webkit-scrollbar{
width: 0;
height: 0;
}
.mip-details .date{
height: 62px;
white-space: nowrap;
overflow-x: auto;
overflow-y: hidden;
padding-left: 17px;
}
.mip-details .date li{
width: 42px;
height: 50px;
padding-top: 10px;
margin-right: 17px;
}
.mip-details .date li p{
height: 21px;
}
/* 日期选中 */
.mip-details .date .dateselect{
border-bottom: 1px solid #00C093;
}
.mip-details .date .dateselect p{
color: #00C093;
}
.mip-details .date .dateselect span{
color: #00C093;
}
.mip-details .date li p{
color: #333333;
font-size: 16px;
text-align: center;
}
.mip-details .date span{
color: #999999;
font-size: 13px;
display: block;
text-align: center;
}
.mip-details .timeout{
width: 100%;
height: 72px;
background: #FFFFFF;
border-bottom: 1px solid #F0F0F8;
}
.mip-details .time{
height: 38px;
padding-top: 17px;
white-space: nowrap;
overflow-x: auto;
overflow-y: hidden;
padding-left: 7px;
}
.mip-details .timeout .time::-webkit-scrollbar{
width: 0;
height: 0;
}
.mip-details .time li{
margin-right: 7px;
height: 24px;
line-height: 24px;
width: 52px;
text-align: center;
border-radius: 2px;
margin-top: 7px;
border-radius: 2px;
}
.mip-details .time .timeselect{
background: #00C093;
color: #FFFFFF;
}
.mip-details .rooms{
background: #FFFFFF;
}
.mip-details .rooms .peopleout{
width: 100%;
height: 60px;
border-bottom: 10px solid #F0F0F8;
}
.mip-details .rooms .peopleout .people::-webkit-scrollbar{
width: 0;
height: 0;
}
.mip-details .rooms .people{
height: 60px;
white-space: nowrap;
overflow-x: auto;
overflow-y: hidden;
padding-left: 16px;
}
.mip-details .rooms .people li{
width: 40px;
height: 30px;
text-align: center;
line-height: 30px;
border-radius: 2px;
border: 1px solid #DCDCE2;
margin-right: 4px;
margin-top: 14px;
}
/* 人数选中 */
.mip-details .rooms .people .numselect{
background: #00C093;
color: #FFFFFF;
border-color: #00C093;
}
.mip-details .rooms .people li:last-of-type{
margin-right: 16px;
}
.mip-details .rooms .hall{
height: 146px;
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
}
.mip-details .rooms .hall .details{
margin-left: 30px;
}
.mip-details .rooms .hall .details .mes{
color: #E46A75;
font-size: 22px;
font-weight: bold;
}
.mip-details .rooms .hall .details .surplus{
color: #333333;
font-size: 22px;
font-weight: bold;
}
.mip-details .rooms .hall .details .choice{
color: #FD8F14;
font-size: 22px;
font-weight: bold;
}
.mip-details .rooms .hall .details .surplus span{
color: #00C093;
}
.mip-details .rooms .hall .details .surplus span:nth-of-type(1){
margin-right: 25px;
}
.mip-details .rooms .hall .details .remark{
color: #666666;
font-size: 16px;
margin-top: 10px;
}
.mip-details .deposit{
height: 20px;
color: #999999;
font-size: 13px;
line-height: 20px;
margin-top: 15px;
padding-left: 16px;
display: flex;
}
.mip-details .deposit a{
display: inline-block;
margin-left: 5px;
}
.mip-details .deposit span{
color: #FD8F14;
}
.mip-details .supporter{
padding-left: 10px;
color: #999999;
font-size: 13px;
margin-top: 10px;
text-align: center;
}
.pay{
height: 48px;
width: 90%;
left: 5%;
bottom: 10px;
line-height: 48px;
background: #F0F0F8;
font-size: 16px;
border-radius: 4px;
display: block !important;
}
.payselect{
background: #00C093;
}
.pay a{
display: block;
width: 100%;
height: 48px;
text-align: center;
color: #FFFFFF;
background: none;
}
</style>

<script>
import img1 from '@/static/keman.png'
import img2 from '@/static/kongzhuo.png'
import img3 from '@/static/zhunbei.png'
import img4 from '@/static/white.png'
export default{
  data () {
    return {
      dates: [],
      times: ['11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00'],
      peoples: ['2', '3', '4', '5', '6', '7', '8', '9', '10'],
      isKeman: false,
      isKongzhuo: false,
      url1: img1,
      url2: img2,
      url3: img3,
      url4: img4,
      dtNum: 0,
      bjNum: 0,
      hotelname: ''
    }
  },
  created () {
    // 获取日期
    let date = new Date()
    let month = date.getMonth()
    let today = date.getDate()
    let newDate = today
    for (let i = 0; i < 30; i++) {
      let dateObj = {}
      date.setDate(newDate)
      let newMonth = date.getMonth()
      if (month !== newMonth) {
        month = newMonth
        newDate = 1
      }
      dateObj.date = newDate
      dateObj.month = month
      let week = date.getDay()
      switch (week) {
        case 1 : dateObj.week = '周一'; break
        case 2 : dateObj.week = '周二'; break
        case 3 : dateObj.week = '周三'; break
        case 4 : dateObj.week = '周四'; break
        case 5 : dateObj.week = '周五'; break
        case 6 : dateObj.week = '周六'; break
        default:dateObj.week = '周日'; break
      }
      this.dates.push(dateObj)
      newDate++
    }
    this.dates.pop()
  },
  mounted () {
    this.$refs.date.children[0].className = 'dateselect'
    let nowdate = this.$refs.date.children[0].children[0].innerHTML
    this.$refs.date.children[0].children[0].innerHTML = '今' + nowdate
    this.$refs.date.children[1].children[0].innerHTML = '明'
    sessionStorage.setItem('orderDate', this.dates[0].date)
    sessionStorage.setItem('orderWeek', this.dates[0].week)
    sessionStorage.setItem('orderMonth', this.dates[0].month)
    sessionStorage.setItem('orderTime', '11:30')
    this.hotelname = sessionStorage.getItem('hotelName')
    let nowUrl = window.location.href
    // let nowUrl = "http://mip.shengyan.com.cn/details.html?code=561b93000767539cb73b2fa8e677d7c9&state=STATE";
    let codeStr = nowUrl.split('?')[1].split('=')[1]
    let url = 'http://booking.shengyan.com.cn/api/User/GetPageAccessToken?mipCode=' + codeStr
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      }
    }).then(function (response) {
      return response.json()
    }).then(function (myJson) {
      sessionStorage.setItem('openid', myJson.openid)
    }).catch(function (err) {
      console.log(err)
    })
  },
  methods: {
    // 选择日期
    choiceDate (e) {
      let el = e.currentTarget
      let lis = el.parentNode.children
      let linum = lis.length
      for (let i = 0; i < linum; i++) {
        lis[i].className = ''
      }
      el.className = 'dateselect'
      let orderDate = el.children[0].innerHTML
      if (!Number(orderDate) && orderDate === '明') {
        orderDate = this.dates[1].date
      } else if (!Number(orderDate)) {
        orderDate = this.dates[0].date
      }
      let orderWeek = el.children[1].innerHTML
      let orderMonth = el.children[2].innerHTML
      sessionStorage.setItem('orderDate', orderDate)
      sessionStorage.setItem('orderWeek', orderWeek)
      sessionStorage.setItem('orderMonth', orderMonth)
    },
    // 选择时间
    choiceTime (e) {
      let el = e.currentTarget
      let lis = el.parentNode.children
      let linum = lis.length
      for (let i = 0; i < linum; i++) {
        lis[i].className = ''
      }
      el.className = 'timeselect'
      let orderTime = el.innerHTML
      sessionStorage.setItem('orderTime', orderTime)
    },
    // 选择用餐人数
    choiceNum (e) {
      let el = e.currentTarget
      let lis = el.parentNode.children
      let linum = lis.length
      for (let i = 0; i < linum; i++) {
        lis[i].className = ''
      }
      el.className = 'numselect'
      let orderNum = el.innerHTML
      sessionStorage.setItem('orderNum', orderNum)
      let date = new Date()
      let nowMonth = date.getMonth() + 1
      let nowTime = new Date('2018-' + nowMonth + '-' + sessionStorage.getItem('orderDate') + ' ' + sessionStorage.getItem('orderTime')).getTime() / 1000
      let reqUrl = 'http://booking.shengyan.com.cn/api/Table/QueryAilableTables'
      let hotelId = sessionStorage.getItem('hotelId')
      let that = this
      // 获取餐厅桌位信息
      fetch(reqUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'ePoiIds=' + hotelId + '&bookingTime=' + nowTime
      }).then(function (response) {
        return response.json()
      }).then(function (myJson) {
        let hotelMes = myJson.Data
        if (Number(hotelMes.length) !== 0) {
          if (Number(hotelMes[0].num) !== 0 || Number(hotelMes[1].num) !== 0) {
            that.isKeman = false
            that.isKongzhuo = true
            that.dtNum = hotelMes[0].num
            that.bjNum = hotelMes[1].num
          } else {
            that.isKeman = true
            that.isKongzhuo = false
          }
        } else {
          that.isKeman = true
          that.isKongzhuo = false
        }
      }).catch(function (err) {
        console.log(err)
      })
    }
  }
}
</script>
