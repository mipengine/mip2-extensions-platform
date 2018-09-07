<template type="mip-mustache">
  <div class="mip-list" @click="maskNone">
      <!-- 占位符 -->
      <div style="height:90px;"></div>
      <mip-fixed class="fixbox" type="top" left="0px">
        <div class="header">
            <div class="search">
                <i class="iconfont">&#xe6a8;</i>
                <div class="inpout"><input type="text" placeholder="找餐厅"></div>
            </div>
        </div>
        <ul class="listheader">
                <li :class='isRecommend?"liselect":""' @click="isRecommend=true">推荐</li>
                <li :class='isRecommend?"":"liselect"' @click="isRecommend=false">去过的餐厅</li>
        </ul>
      </mip-fixed>
      <div class="main">
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
                      <p>人均 {{hotel.AverageSpendBegin}}-{{hotel.AverageSpendEnd}}元<span>&nbsp;|&nbsp;&nbsp;{{hotel.Cuisine}}</span></p>
                      <p><span style="display:none">{{hotel.Id}}</span><a @click="toJump" :data-title="hotel.name">预订</a></p>
                  </div>
              </li>
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
.header{
    background: #FFFFFF;
    height: 38px;
    padding-top: 6px;
}
.header .search{
    width: 90%;
    margin: 0 auto;
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
}
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
}
.main .hotellist .hotel .hotelmes p:nth-of-type(3) span{
    margin-left: 4px;
    color: #666666;
    display: inline-block;
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
#mask{
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    display: none;
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
</style>

<script>
import img1 from "@/static/copy.png"
import img2 from "@/static/phone.png"
import img3 from "@/static/add.png"
export default {
    data(){
        return{
            // 餐厅列表
            hotels:[],
            // 是否是推荐餐厅列表
            isRecommend:true,
            url1:img1,
            url2:img2,
            url3:img3
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
            this.$refs.mask.style.display = "block";
        },
        // 页面跳转
        toJump(e){
            let el = e.target;
            sessionStorage.setItem("hotelId",el.parentNode.firstChild.innerHTML);
            MIP.viewer.open("./details.html");
            // MIP.viewer.open("https://openapi.baidu.com/oauth/2.0/authorize?response_type=code&client_id=g8TDnemHMwFBwr33zAIxG9mGnYoOoBcw&redirect_uri=http://mip.kebide.com/details.html&scope=snsapi_base&state=STATE");
        }
    }
}
</script>
