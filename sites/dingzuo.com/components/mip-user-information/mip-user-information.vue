<template type="mip-mustache">
      <div class="mip-details">
        <div class="dateout">
            <ul class="date" ref="date">
                <li @click="choiceDate" v-for="date in dates"><p>{{date.date}}</p><span>{{date.week}}</span></li>
            </ul>
        </div>
        <div class="timeout">
            <ul class="time">
                <li @click="choiceTime" class="timeselect">11:30</li>
                <li @click="choiceTime" v-for="time in times">{{time}}</li>
            </ul>
        </div>
        <div class="rooms">
            <div class="peopleout">
                <ul class="people">
                    <li @click="choiceNum" v-for="people in peoples">{{people}}人</li>
                </ul>
            </div>
            <div class="hall" v-if="isKeman">
                <mip-img
                 width="94"
                 height="94"
                 :src="url1"></mip-img>
                <div class="details">
                    <p class="mes">领地被占光！</p>
                    <p class="remark">重新选择人数开战</p>
                </div>
            </div>
            <div class="hall" v-else-if="isKongzhuo">
                <mip-img
                 width="94"
                 height="94"
                 :src="url2"></mip-img>
                <div class="details">
                    <p class="surplus">大厅/<span>{{dtNum}}</span>包间/<span>{{bjNum}}</span></p>
                    <p class="remark">缴获战场，快速准备</p>
                </div>
            </div>
            <div class="hall" v-else>
                <mip-img
                 width="94"
                 height="94"
                 :src="url3"></mip-img>
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
        <mip-fixed class="pay" v-if="isKongzhuo" @click="toJump">有座，马上预定</mip-fixed>
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
border-bottom: 2px solid #F0F0F8;
background: #FFFFFF;
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
border-bottom: 2px solid #FD8F14;
}
.mip-details .date .dateselect p{
color: #FD8F14;
}
.mip-details .date .dateselect span{
color: #FD8F14;
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
height: 38px;
background: #FFFFFF;
}
.mip-details .time{
height: 38px;
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
background: #FD8F14;
color: #FFFFFF;
}
.mip-details .rooms{
background: #FFFFFF;
margin-top: 10px;
}
.mip-details .rooms .peopleout{
width: 100%;
height: 60px;
border-bottom: 2px solid #F0F0F8;
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
import img1 from "@/static/keman.png"
import img2 from "@/static/kongzhuo.png"
import img3 from "@/static/zhunbei.png"
import img4 from "@/static/white.png"
export default{
    data(){
        return{
            dates:[],
            times:["12:00","12:30","13:00","13:30","14:00","14:30"],
            peoples:["2","3","4","5","6","7","8","9","10"],
            isKeman:false,
            isKongzhuo:false,
            url1:img1,
            url2:img2,
            url3:img3,
            url4:img4,
            dtNum:0,
            bjNum:0
        }
    },
    methods:{
        // 选择日期
        choiceDate(e){
            let el = e.currentTarget;
            let lis = el.parentNode.children;
            let linum = lis.length;
            for(let i = 0;i < linum;i ++){
                lis[i].className="";
            }
            el.className = "dateselect";
            let orderDate = el.children[0].innerHTML;
            if(!Number(orderDate)&&orderDate==="明"){
                orderDate = this.dates[1].date;
            }else if(!Number(orderDate)){
                orderDate = this.dates[0].date;
            }
            let orderWeek = el.children[1].innerHTML;
            sessionStorage.setItem('orderDate',orderDate);
            sessionStorage.setItem('orderWeek',orderWeek);
        },
        // 选择时间
        choiceTime(e){
            let el = e.currentTarget;
            let lis = el.parentNode.children;
            let linum = lis.length;
            for(let i = 0;i < linum;i ++){
                lis[i].className="";
            }
            el.className = "timeselect";
            let orderTime = el.innerHTML;
            sessionStorage.setItem('orderTime',orderTime);
        },
        // 选择用餐人数
        choiceNum(e){
            let el = e.currentTarget;
            let lis = el.parentNode.children;
            let linum = lis.length;
            for(let i = 0;i < linum;i ++){
                lis[i].className="";
            }
            el.className = "numselect";
            let orderNum = el.innerHTML;
            sessionStorage.setItem('orderNum',orderNum);
            let date = new Date();
            let nowMonth = date.getMonth()+1;
            let nowTime = new Date("2018-"+nowMonth+"-"+sessionStorage.getItem("orderDate")+" "+sessionStorage.getItem("orderTime")).getTime()/1000;
            let reqUrl = "http://booking.shengyan.com.cn/api/Table/QueryAilableTables";
            let hotelId = sessionStorage.getItem("hotelId");
            let that = this;
            // 获取餐厅桌位信息
            fetch(reqUrl,{
                method:"POST",
                headers:{
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body:"ePoiIds="+hotelId+"&bookingTime="+nowTime
            }).then(function(response){
                return response.json();
            }).then(function(myJson){
                let hotelMes = myJson.Data;
                if(hotelMes[0].num != 0||hotelMes[1].num != 0){
                    that.isKeman = false;
                    that.isKongzhuo = true;
                    that.dtNum = hotelMes[0].num;
                    that.bjNum = hotelMes[1].num;
                }else{
                    that.isKeman = true;
                    that.isKongzhuo = false;
                }
            }).catch(function(err){
                console.log(err);
            });
        },
        // 页面跳转
        toJump(){
            MIP.viewer.open("./reserve.html");
        }
    },
    created(){
        // 获取日期
        let date = new Date();
        let month = date.getMonth();
        let today = date.getDate();
        for(let i = 0;;i ++){
            let dateObj = {};
            date.setDate(today);
            let week = date.getDay();
            switch(week){
                case 1 : dateObj.week="周一";break;
                case 2 : dateObj.week="周二";break;
                case 3 : dateObj.week="周三";break;
                case 4 : dateObj.week="周四";break;
                case 5 : dateObj.week="周五";break;
                case 6 : dateObj.week="周六";break;
                default:dateObj.week="周日";break
            }
            dateObj.date = today;
            this.dates.push(dateObj);
            let newMonth = date.getMonth();
            today ++;
            if(newMonth !== month){
                break;
            }
        }
        this.dates.pop();
    },
    mounted(){
        this.$refs.date.children[0].className = "dateselect";
        let nowdate =  this.$refs.date.children[0].children[0].innerHTML;
        this.$refs.date.children[0].children[0].innerHTML = "今" + nowdate;
        this.$refs.date.children[1].children[0].innerHTML = "明";
        sessionStorage.setItem('orderDate',this.dates[0].date);
        sessionStorage.setItem('orderWeek',this.dates[0].week);
        sessionStorage.setItem('orderTime','11:30');
        // let url = window.location.href;
        let nowUrl = "http://mip.kebide.com/details.html?code=561b93000767539cb73b2fa8e677d7c9&state=STATE";
        let codeStr = nowUrl.split("?")[1].split("=")[1];
        let url = "http://booking.shengyan.com.cn/api/User/GetPageAccessToken?mipCode="+codeStr;
        fetch(url,{
            method:"GET",
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept':'application/json'
            }
        }).then(function(response){
            return response.json();
        }).then(function(myJson){
            sessionStorage.setItem("openid",myJson.openid);
        }).catch(function(err){
            console.log(err);
        });
    }
}
</script>
