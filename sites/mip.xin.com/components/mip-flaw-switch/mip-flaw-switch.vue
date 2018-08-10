<template>
  <div class="tabWrap">
    <mip-flaw-tab id="tab" :flaws="flaws" :paint="paint" v-if="flaws" 
    @getOuterCurrentIndex="getOuterCurrentIndex" 
    @getInnerCurrentIndex="getInnerCurrentIndex" 
    @getFrameCurrentIndex="getFrameCurrentIndex" 
      @switchSwiper='getSwiperIndex'
       @switchTabWrap="isShowSwiper"
        @switchPaint="getPaintIndex" 
        :outer-arr="outerImgArr" 
    :inner-arr="innerImgArr" :frame-arr="frameImgArr"  :is-detail = "isDetail"
    ></mip-flaw-tab>
    <!--swiper -->
   <!-- TODO:百度的swiper组件支持外部控制时，向子组件传参即可控制swiper的切换 -->
    <div class="swiperWrap" v-if=" isShow">
        <mip-carousel
        key="carousel-1"
        layout="responsive" 
        width="6.7rem" 
        height="4rem"
        :buttonController="outerImgArr.length>1?true:false"
        on="switchCompleted:tab.tabOuterChange"  v-if=" outerImgArr.length>0  && swiperIndex==0 ">
        <block v-for="(flawItem,index) in outerImgArr" :key="index">
            <mip-img class="flawImg"   :src="flawItem.pic">
            </mip-img> 
            <div v-if="flawItem.flaw_point.length>0" class="flawDescWrap" :class="[item.detectitemmapid[0] > 0.9 ? 'f_ds_wrap_r' : '' ,isCoincide && changeItem == item.flaw?'f_ds_wrap_r_t':'']"
                v-for="(item,index) in flawItem.flaw_point" :key="index" :style="{top:(item.detectitemmapid[1] >0.92 ? item.detectitemmapid[1] - 0.1 :  item.detectitemmapid[1])*100 + '%',left:(item.detectitemmapid[0] > 0.9 ?item.detectitemmapid[0] - 0.1 : item.detectitemmapid[0])*100 + '%'}">
                    <span class="flawIcon"></span>
                    <span class="flawDesc">
                      <span :class="[item.detectitemmapid[0] > 0.9 ? 'f_ds_cir_r' : '',isCoincide && changeItem == item.flaw?'f_ds_cir_r_t':'']">{{item.flaw_desc}}</span>
                      </span>
            </div>
        </block>
      </mip-carousel>
      <mip-carousel
      key="carousel-2"
      layout="responsive" 
      width="6.7rem" 
      height="4rem"
      :buttonController="innerImgArr.length>1?true:false"
      on="switchCompleted:tab.tabInnerChange" v-if="innerImgArr.length>0 &&  swiperIndex==1">
      <block v-for="(flawItem,index) in innerImgArr" :key="index">
        <mip-img   :src="flawItem.pic" >
        </mip-img>
        <div v-if="flawItem.flaw_point.length>0"  class="flawDescWrap" :class="[item.detectitemmapid[0] > 0.9 ? 'f_ds_wrap_r' : '' ,isCoincide && changeItem == item.flaw?'f_ds_wrap_r_t':'']"
           v-for="(item,index) in flawItem.flaw_point" :key="index" :style="{top:(item.detectitemmapid[1] >0.92 ? item.detectitemmapid[1] - 0.1 :  item.detectitemmapid[1] )*100 + '%',left:(item.detectitemmapid[0] > 0.9 ?item.detectitemmapid[0] - 0.1 :item.detectitemmapid[0])*100 + '%'}">
                <span class="flawIcon"></span>
                <span class="flawDesc" >
                  <span :class="[item.detectitemmapid[0] > 0.9 ? 'f_ds_cir_r' : '',isCoincide && changeItem == item.flaw?'f_ds_cir_r_t':'']">{{item.flaw_desc}}</span>
                  </span>
        </div>
      </block>
    </mip-carousel>
    <mip-carousel
        key="carousel-3"
        layout="responsive" 
        width="6.7rem" 
        height="4rem"
       :buttonController="frameImgArr.length>1?true:false"
        on="switchCompleted:tab.tabFrameChange" v-if="swiperIndex==2&&frameImgArr.length>0">
        <block v-for="(flawItem,index) in frameImgArr"   :key="index">
            <mip-img   :src="flawItem.pic">
            </mip-img>
            <div v-if="flawItem.flaw_point.length>0" class="flawDescWrap"  :class="[item.detectitemmapid[0] > 0.9 ? 'f_ds_wrap_r' : '' ,isCoincide && changeItem == item.flaw?'f_ds_wrap_r_t':'']"
              v-for="(item,index) in flawItem.flaw_point" :key="index" :style="{top:(item.detectitemmapid[1] >0.92 ? item.detectitemmapid[1] - 0.1 :  item.detectitemmapid[1])*100 + '%',left:(item.detectitemmapid[0] > 0.9 ?item.detectitemmapid[0] - 0.1 :item.detectitemmapid[0])*100 + '%'}">
                    <span class="flawIcon"></span>
                    <span class="flawDesc">
                      <span  :class="[item.detectitemmapid[0] > 0.9 ? 'f_ds_cir_r' : '',isCoincide && changeItem == item.flaw?'f_ds_cir_r_t':'']">{{item.flaw_desc}}</span></span>
            </div>
        </block>
      </mip-carousel>
    </div>
    <mip-car-flawcount id="count" v-if="isShow&&swiperIndex == 0&& outerImgArr.length>0" :img-arr="outerImgArr" :current-index="currentOuterIndex"></mip-car-flawcount>
    <mip-car-flawcount id="count" v-if="isShow&&swiperIndex == 1&& innerImgArr.length>0" :img-arr="innerImgArr" :current-index="currentInnerIndex"></mip-car-flawcount>
    <mip-car-flawcount id="count" v-if="isShow&&swiperIndex == 2&& frameImgArr.length>0" :img-arr="frameImgArr" :current-index="currentFrameIndex"></mip-car-flawcount>
    <mip-car-flawcount id="count" v-if="!isShow&&paintIndex==0&&paintOuter.length>0" :img-arr="paintOuter"></mip-car-flawcount>
    <mip-car-flawcount id="count" v-if="!isShow&&paintIndex==1&&paintOuter.length>0" :img-arr="paintFrame"></mip-car-flawcount>
     <div v-if="flaws">
        <slot  name="bottomTitle"></slot>  
  </div>
    
</div>
</template>

<style scoped>
.wrapper {
  margin: 0 auto;
  text-align: center;
}

.swiperWrap {
  margin: 0 auto;
  width: 6.7rem;
}
.currentSwiper{
  width:6.7rem;
  height:4rem;
}
.flawImg {
  position: relative;
}
.flawDescWrap {
  position: absolute;
  height: 0.36rem;
  line-height: 0.36rem;
}
.f_ds_wrap_r{
transform: rotate(180deg);
}
.f_ds_cir_r{
  display: block;
  transform: rotate(180deg);
}
.f_ds_wrap_r_t{
  transform: rotate(180deg) translateX(1rem);
}
.f_ds_cir_r_t{
  display: block;
  transform: rotate(-180deg);
}
.flawIcon {
  display: inline-block;
  width: 0.32rem;
  height: 0.36rem;
  margin-right: 0.02rem;
  background-image: url(http://c2.xinstatic.com/f3/20180724/1559/5b56dc55c013b568308.png);
  background-size: 0.32rem 0.36rem;
  vertical-align: middle;
}
.flawDesc {
  display: inline-block;
  height: 0.36rem;
  position: relative;
  font-size: 0.22rem;
  font-family: PingFangSC-Regular;
  color: #fff;
  background: rgba(0, 0, 0, 0.5);
}
.flawDesc:before {
  position: absolute;
  top: 0;
  left: -0.18rem;
  display: inline-block;
  content: "";
  width: 0.18rem;
  height: 0.36rem;
  background-image: url(http://c2.xinstatic.com/f3/20180724/1559/5b56dc55ef97d217077.png);
  background-size: 0.18rem 0.36rem;
}
.flawDesc:after {
  position: absolute;
  top: 0;
  right: -0.1rem;
  display: inline-block;
  content: "";
  width: 0.1rem;
  height: 0.36rem;
  background-image: url(http://c2.xinstatic.com/f3/20180724/1559/5b56dc562c408234190.png);
  background-size: 0.1rem 0.36rem;
}
</style>

<script>
import base from "../../common/utils/base.js";
import "../../common/css/base.css";
import { requestFun } from "../../common/utils/reqUtils.js";
export default {
  props: ["carid", "isDetail"],
  data() {
    return {
      flaws: "", //传给子组件的瑕疵数据对象
      paint: "", //传给子组件的修复数据对象
      swiperIndex: 0, //图片轮播图的索引
      isShow: true, //是否显示图片swiper
      outerImgArr: [], //车辆瑕疵图外观件图片数组
      innerImgArr: [], //车辆瑕疵图内饰件件图片数组
      frameImgArr: [], //车辆瑕疵图骨架件图片数组
      paintIndex: 0, //为0显示修复图外观件 1修复图骨架件
      currentOuterIndex: 0, //瑕疵图外观件轮播图当前索引
      currentInnerIndex: 0, //瑕疵图内饰件轮播图当前索引
      currentFrameIndex: 0, //瑕疵图骨架件轮播图当前索引
      isDetail:'', //是否被引用在详情页
      isCoincide: false, // 图片上的瑕疵点是否重合
      changeItem: '',

    };
  },
  created() {
    base.setMediaBase();
  },
  mounted() {
    requestFun("/ajax/report/get_flaw_pics", {
      method: "POST",
      param: {
        carid: this.carid
      }
    }).then(res => {
      this.flaws = res.flaws;
      this.paint = res.paint;
      this.outerImgArr = this.getImgArr(res.flaws.outer);
      this.innerImgArr = this.getImgArr(res.flaws.inner);
      this.frameImgArr = this.getImgArr(res.flaws.frame);
      this.paintFrame = res.paint.frame;
      this.paintOuter = this.paint.outer;
      this.paintFrame = this.paint.frame;
      this.isDetail = this.isDetail && this.isDetail;
      this.getIsCoinCide(this.outerImgArr,this.currentOuterIndex);
    });
  },
  methods: {
    // 获取图片数组
    getImgArr: function(arr) {
      let imgArr = []; //瑕疵图片数组
      // arr为（外观件，内饰件，骨架件的瑕疵项的数组）；
      // imgListsArr的每一项为 每个瑕疵的瑕疵图片数组
      let imgListsArr = arr.map((item, index) => {
        return item.car_pic;
      });
      let arrLength = arr.length;
      // 通过两次遍历获取所有的瑕疵图图片的数组，给每一项添加所需属性
      for (let i = 0; i < arrLength; i++) {
        imgListsArr[i].forEach((item, index) => {
          item.flawIndex = i; // flawIndex为第几项瑕疵点
          item.imgNum = imgListsArr[i].length; //每一个瑕疵的图片个数
          item.flaw_desc = arr[i].u2_name; //每一个瑕疵点的位置描述
          imgArr.push(item);
        });
      }
      return imgArr;
    },
    // 判断瑕疵点是否重合
    getIsCoinCide(arr,index){
        let _this = this;
        let flawArr = arr.length >= 1 ? arr[index].flaw_point : [];
        if(flawArr && flawArr.length >=2){
          function compare(property){
            return function(a,b){
                var value1 = a[property][0];
                var value2 = b[property][0];
                return value1 - value2;
            }
        }
        flawArr =  flawArr.sort(compare('detectitemmapid'));
        let arrLength = flawArr.length;
        for(let i =0;i<arrLength - 1 ; i++ ){
          if(Math.abs(flawArr[i].detectitemmapid[0] - flawArr[i + 1].detectitemmapid[0]) < 0.1 && Math.abs(flawArr[i].detectitemmapid[1] - flawArr[i + 1].detectitemmapid[1]) < 0.1){
                this.isCoincide = true;
                this.changeItem = flawArr[i].flaw;
                
          }
        }
        }
    },
    getSwiperIndex: function(e) {
      this.swiperIndex = e.detail[0];
    },
    isShowSwiper: function(e) {
      this.isShow = e.detail[0];
    },
    getPaintIndex: function(e) {
      this.paintIndex = e.detail[0];
    },
    getOuterCurrentIndex: function(e) {
      this.currentOuterIndex = e.detail[0];
    },
    getInnerCurrentIndex: function(e) {
      this.currentInnerIndex = e.detail[0];
    },
    getFrameCurrentIndex: function(e) {
      this.currentFrameIndex = e.detail[0];
    }
  },
  watch:{
    swiperIndex(newVal){
        if(newVal == 0){
          this.getIsCoinCide(this.outerImgArr,this.currentOuterIndex);
        }else if(newVal == 1){
           this.getIsCoinCide(this.innerImgArr,this.currentInnerIndex);
        }else{
          this.getIsCoinCide(this.frameImgArr,this.currentFrameIndex);
        }
    },
    currentOuterIndex(newVal){
      this.isCoincide = false;
      this.getIsCoinCide(this.outerImgArr,newVal);
    },
    currentInnerIndex(newVal){
      this.isCoincide = false;
      this.getIsCoinCide(this.innerImgArr,newVal);
    },
    currentFrameIndex(newVal){
      this.isCoincide = false;
      this.getIsCoinCide(this.frameImgArr,newVal);
    },
  }
};
</script>