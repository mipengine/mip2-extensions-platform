<template type="mip-mustache">
  <div class="mip-list" @click="maskNone">
      <!-- 占位符 -->
      <div style="height:90px;"></div>
      <mip-fixed class="fixbox" type="top" left="0px">
        <div class="header">
            <mip-img
                class="mylogo"
                width="22"
                height="22"
                :src="urlmy"
                @click="sideShow"
            ></mip-img>
            <div class="search">
                <i @click="toSelect" class="iconfont">&#xe6a8;</i>
                <div class="inpout"><input type="text" @focus="search" @blur="noSearch" placeholder="找餐厅" v-model="hotelname"/></div>
            </div>
            <!-- <span @click="toSelect">搜索</span> -->
        </div>
        <ul class="listheader" v-show="!isSearch">
            <li :class='isRecommend?"liselect":""' @click="isRecommend=true">推荐</li>
            <li :class='isRecommend?"":"liselect"' @click="isRecommend=false">去过的餐厅</li>
        </ul>
      </mip-fixed>
      <div class="main" v-show="!isSearch">
          <ul class="hotellist">
              <li class="hotel" v-for="hotel in hotels" :key="hotel.Id">
                  <mip-img
                   class="hotelimg"
                   width="115"
                   height="76"
                   :src="hotel.ImgPath"
                  ></mip-img>
                  <div class="hotelmes">
                      <p>{{hotel.Name}}</p>
                      <p><i class="iconfont">&#xe628;</i>新源南路</P>
                      <p><span>人均 {{hotel.AverageSpendBegin}}-{{hotel.AverageSpendEnd}}元</span><span>&nbsp;|&nbsp;&nbsp;{{hotel.Cuisine}}</span></p>
                      <p><span style="display:none">{{hotel.Id}}</span><a @click="toJump" href="https://openapi.baidu.com/oauth/2.0/authorize?response_type=code&client_id=g8TDnemHMwFBwr33zAIxG9mGnYoOoBcw&redirect_uri=http://mip.kebide.com/details.html&scope=snsapi_base&state=STATE" mip-link :data-title="hotel.Name">预订</a></p>
                  </div>
              </li>
          </ul>
      </div>
      <div class="searchbox" v-show="isSearch">
          <p>猜你喜欢</p>
          <ul class="hotels">
              <li v-for="like in likes" @click="select">{{like}}</li>
          </ul>
      </div>
      <mip-fixed id="mask" type="top" left="0px" ref="mask">
          <div class="contactus" @click.stop="maskBlock">
              <p>赶快联系我们吧</p>
              <p>400-6789-434</p>
              <ul class="operation">
                  <li>
                      <mip-img
                        class="hotelimg"
                        width="46"
                        height="46"
                        :src="url1"
                        ></mip-img>
                      <p>复制</p>
                  </li>
                  <li>
                      <mip-img
                        class="hotelimg"
                        width="46"
                        height="46"
                        :src="url2"
                        ></mip-img>
                      <p>拨打</P>
                  </li>
                  <li>
                      <mip-img
                        class="hotelimg"
                        width="46"
                        height="46"
                        :src="url3"
                        ></mip-img>
                      <p>添加到通讯录</p>
                  </li>
              </ul>
          </div>
      </mip-fixed>
      <!-- 侧边栏 -->
      <mip-fixed
        class="sidebar"
        type="top"
        left="0"
        ref="sidebar"
        @click="sideHidden"
      >
        <div class="sidelist" ref="sidelist" @click.stop="hiddenSide = false">
            <ul>
                <!-- <li><a href="./order.html" @click="toHidden">
                    <mip-img
                        class="listlogo"
                        width="22"
                        height="22"
                        :src="myorder"
                    ></mip-img>
                    我的订单
                </a></li> -->
                <li><a href="./abouts.html" @click="toHidden">
                    <mip-img
                        class="listlogo"
                        width="22"
                        height="22"
                        :src="aboutdz"
                    ></mip-img>
                    关于盯座
                </a></li>
                <li><a href="#" @click="maskBlock">
                    <mip-img
                        class="listlogo"
                        width="22"
                        height="22"
                        :src="callus"
                    ></mip-img>
                    联系我们
                </a></li>
            </ul>
        </div>
      </mip-fixed>
  </div>
</template>
<style scoped>
li{
list-style: none;
}
/* 固定部分 */
.fixbox{
width: 100%;
background: #F0F0F8;
top: 44px;
z-index: 5;
}
.fixbox::before{
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
.header{
background: #FFFFFF;
height: 38px;
padding-top: 6px;
font-size: 15px;
color: #000000;
}
.header .mylogo{
vertical-align: middle;
margin-left: 3%;
}
.header span{
display: inline-block;
width: 12%;
text-align: center;
}
.header .search{
display: inline-block;
margin-left: 2%;
width: 78%;
height: 30px;
border: 1px solid #DCDCE2;
border-radius: 4px;
line-height: 30px;
}
.header .search i{
color: #BEBEBE;
margin-left: 5px;
float: left;
}
.header .search .inpout{
margin-left: 30px;
}
.header .search .inpout input{
height: 28px;
outline: none;
border: none;
width: 100%;
background: none;
}
/* 餐厅列表 */
.listheader{
height: 40px;
padding-left: 15px;
border-bottom: 1px solid #F0F0F8;
background: #FFFFFF;
margin-top: 5px;
}
.listheader li{
width: 80px;
float: left;
height: 36px;
line-height: 36px;
margin-right: 15px;
text-align: center;
}
.listheader .liselect{
color: #00C093;
border-bottom: 2px solid #00C093;
}
.main{
background: #FFFFFF;
}
.main .hotellist{
padding: 0 16px;
}
.main .hotellist .hotel{
padding: 19px 0 15px 0;
border-bottom: 2px solid #F0F0F8;
overflow: hidden;
}
.main .hotellist .hotel .hotelimg{
float: left;
margin-right: 8px;
}
.main .hotellist .hotel .hotelmes p:nth-of-type(1){
font-size: 16px;
}
.main .hotellist .hotel .hotelmes p:nth-of-type(1) span{
color: #666666;
margin-left: 5px;
}
.main .hotellist .hotel .hotelmes p:nth-of-type(2){
font-size: 13px;
color: #FD8F14;
margin-top: 5px;
}
.main .hotellist .hotel .hotelmes p:nth-of-type(3){
font-size: 13px;
color: #FD8F14;
margin-top: 5px;
height: 20px;
}
.main .hotellist .hotel .hotelmes p:nth-of-type(3) span{
display: inline-block;
float: left;
}
.main .hotellist .hotel .hotelmes p:nth-of-type(3) span:last-child{
margin-left: 4px;
color: #666666;
height: 17px;
width: 90px;
overflow: hidden;
white-space: nowrap;
text-overflow:ellipsis;
}
.main .hotellist .hotel .hotelmes p:nth-of-type(4){
height: 26px;
margin-top: 5px;
}
.main .hotellist .hotel .hotelmes p:nth-of-type(4) a{
width: 70px;
height: 26px;
border: none;
color: #FFFFFF;
font-size: 13px;
border-radius: 2px;
background: #00C093;
float: right;
outline: none;
display: block;
text-align: center;
line-height: 26px;
}
/* 弹出层 */
#mask{
width: 100%;
height: 100%;
background: rgba(0,0,0,0.7);
display: none;
z-index: 10000 !important;
}
#mask .contactus{
width: 300px;
padding: 15px 0;
background: #FFFFFF;
position: absolute;
margin: 50%;
transform: translateX(-50%);
border-radius: 4px;
}
#mask .contactus p:nth-of-type(1){
padding:0 15px;
color: #666666;
}
#mask .contactus p:nth-of-type(2){
height: 76px;
line-height: 76px;
text-align: center;
font-size: 30px;
color: #FD8F14;
}
#mask .contactus .operation{
display: flex;
justify-content: space-around;
border-top: 1px solid #DCDCDC;
padding-top: 20px;
}
#mask .contactus .operation li{
width: 90px;
display: flex;
flex-direction: column;
align-items: center;
}
#mask .contactus .operation li p{
text-align: center;
padding: 0;
margin-top: 10px;
color: #999999
}
/* 搜索部分 */
.searchbox{
margin-top: -46px;
padding: 0 5%;
}
.searchbox p{
color: #666666;
height: 28px;
line-height: 28px;
}
.searchbox .hotels{
padding-bottom: 10px;
overflow: hidden;
}
.searchbox .hotels li{
color: #333333;
background: #F0F0F8;
height: 30px;
line-height: 30px;
float: left;
padding: 0 10px;
border-radius: 2px;
margin-right: 10px;
margin-top: 5px;
}
/* 侧边栏 */
.sidebar{
width: 100%;
height: 100%;
background: rgba(0,0,0,0.7);
z-index: 10000 !important;
overflow: hidden;
display: none;
}
.sidebar .sidelist{
width: 160px;
height: 100%;
background: #FFFFFF;
position: absolute;
left: -160px;
}
.sidebar .sidelist ul{
margin-top: 44px;
padding: 15px;
padding-right: 0;
}
.sidebar .sidelist ul li{
height: 40px;
line-height: 40px;
font-size: 16px;
color: #333333;
}
.sidebar .sidelist ul li .listlogo{
vertical-align: middle;
margin-right: 10px;
}
</style>

<script>
import img1 from "@/static/copy.png"
import img2 from "@/static/phone.png"
import img3 from "@/static/add.png"
import imgmy from "@/static/my.png"
import myorder from "@/static/myorder.png"
import aboutdz from "@/static/aboutdz.png"
import callus from "@/static/callus.png"
export default {
    data(){
        return{
            // 餐厅列表
            hotels:[],
            // 猜你喜欢
            likes:["白家大院","晋风庄园","九十九顶毡房","天水雅居","万龙洲","京兆伊","又一村"],
            // 是否是推荐餐厅列表
            isRecommend:true,
            url1:img1,
            url2:img2,
            url3:img3,
            urlmy:imgmy,
            myorder:myorder,
            aboutdz:aboutdz,
            callus:callus,
            // 是否是搜索
            isSearch:false,
            // 搜索的餐厅名
            hotelname:'',
            hidddenSide:false
        }
    },
    mounted(){
        // let req = new Request("http://218.245.1.14:8018/api/restaurant/GetRestaurants",{
        //   method:"POST",
        //   headers:{
        //     'Content-Type': 'application/x-www-form-urlencoded' // 指定提交方式为表单提交
        //   }
        // });
        let reqUrl = "http://booking.shengyan.com.cn/api/restaurant/GetRestaurants";
        let that = this;
        // 获取餐厅列表
        fetch(reqUrl,{
            method:"POST",
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body:'epoiName'
        }).then(function(response){
            return response.json();
        }).then(function(myJson){
            that.hotels = myJson.Data;
        }).catch(function(err){
            console.log(err);
        });
        // 点击显示联系我们窗口
        this.$nextTick(()=>{
            let oBtn = document.getElementsByClassName("mip-shell-button")[1];
            let oMask = this.$refs.mask;
            if(oBtn){
                oBtn.onclick = ()=>{
                   oMask.style.display = "block";
                }
            }
        });
    },
    methods:{
        // 联系我们窗口隐藏
        maskNone(){
            this.$refs.mask.style.display = "none";
        },
        // 联系我们窗口显示
        maskBlock(){
            this.hiddenSide = true;
            if(this.hiddenSide){
                let sideBar = this.$refs.sidebar;
                let sideList = this.$refs.sidelist;
                let listLeft = 0;
                let timer = setInterval(()=>{
                    listLeft -= 5;
                    sideList.style.left = listLeft + "px";
                    if(listLeft <= -160){
                        clearInterval(timer);
                        setTimeout(()=>{
                            sideBar.style.display="none";
                            this.$refs.mask.style.display = "block";
                        },200)
                    }
                },10)
            }
        },
        // 页面跳转
        toJump(e){
            let el = e.target;
            sessionStorage.setItem("hotelId",el.parentNode.firstChild.innerHTML);
            sessionStorage.setItem("hotelName",el.parentNode.parentNode.children[0].innerHTML);
        },
        search(){
            this.isSearch = true;
            document.querySelector('body').style.background="#FFFFFF";
        },
        noSearch(){
            if(this.hotelname===""){
                this.isSearch = false;
                document.querySelector('body').style.background="";
            }
        },
        select(e){
            let el = e.target;
            this.hotelname = el.innerHTML;
            this.isSearch = true;
            document.querySelector('body').style.background="#FFFFFF";
        },
        toSelect(){
            if(this.hotelname != ""){
                // MIP.viewer.open("./search.html");
                this.isSearch = false;
                document.querySelector('body').style.background="";
            }
        },
        sideShow(){
            let sideBar = this.$refs.sidebar;
            let sideList = this.$refs.sidelist;
            sideBar.style.display="block";
            let listLeft = -160;
            let timer = setInterval(()=>{
                listLeft += 5;
                sideList.style.left = listLeft + "px";
                if(listLeft >= 0){
                    clearInterval(timer);
                }
            },10)
        },
        sideHidden(){
            this.hiddenSide = true;
            if(this.hiddenSide){
                let sideBar = this.$refs.sidebar;
                let sideList = this.$refs.sidelist;
                let listLeft = 0;
                let timer = setInterval(()=>{
                    listLeft -= 5;
                    sideList.style.left = listLeft + "px";
                    if(listLeft <= -160){
                        clearInterval(timer);
                        let opacity = 10;
                        let timer2 = setInterval(()=>{
                            opacity--;
                            sideBar.style.opacity = opacity/10;
                            if(opacity<=0){
                                clearInterval(timer2);
                                sideBar.style.display="none";
                                sideBar.style.opacity = 10;
                            }
                        },20)
                    }
                },10)
            }
        },
        toHidden(){
            let sideBar = this.$refs.sidebar;
            let sideList = this.$refs.sidelist;
            sideBar.style.display = "none";
            sideList.style.left = "-160px";
        }
    }
}
</script>
