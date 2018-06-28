<template>
  <div class="wrapper">
        <div class="tab">
            <div class="tab-div">
                <ul class="lxn-tab-title">
                    <li v-for="item in tabData" @click="changeTab(item)"   :class="{active:item.isActive,'lxn-hide':item.hide}">
                        <span >{{item.name}}</span>
                    </li>
                </ul>
                <div class="swiper-div">
                        <div class="swiper-container">
                        <div class="swiper-wrapper">
                            <div class="swiper-slide">
                                <div class="car-img-div">
                                    <div class="car xiaomian"></div>
                                </div>
                            </div>
                            <div class="swiper-slide">
                                <div class="car-img-div">
                                    <div class="car jinbei"></div>  
                                </div>
                            </div>
                            <div :class='{"lxn-hide":hide}' class="swiper-slide">
                                <div class="car-img-div">
                                    <div class="car xianghuo"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="car-deccription">
                    <div>
                        <div class="des-div">
                            <p>{{currentCar.weight}}</p>
                            <p>载重</p>
                        </div>
                        <div class="des-div">
                            <p>{{currentCar.ckg}}</p>
                            <p>长宽高</p>
                        </div>
                        <div class="des-div">
                            <p>{{currentCar.volume}}</p>
                            <p>体积</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>



  </div>
  
</template>

<script>
import base from "../../common/utils/base.js";
// import "swiper/dist/css/swiper.css";
import "../../common/utils/base.css";

// import axios from "axios";
export default {
  props: {
    // globaldata: [Object, Array]
    globaldata: {
      type: Object
    }
  },
  data() {
    return {
      mySwiper: "", //滑动轮播图

      carTypes: [
        {
          stairsFee: [
            {
              id: 0,
              name: "有电梯,无楼梯费"
            },
            {
              id: 1,
              name: "无电梯1层,楼层费0元"
            },
            {
              id: 2,
              name: "无电梯2层,楼层费10元"
            },
            {
              id: 3,
              name: "无电梯3层,楼层费20元"
            },
            {
              id: 4,
              name: "无电梯4层,楼层费40元"
            },
            {
              id: 5,
              name: "无电梯5层,楼层费60元"
            },
            {
              id: 6,
              name: "无电梯6层,楼层费80元"
            },
            {
              id: 7,
              name: "无电梯7层,楼层费110元"
            },
            {
              id: 8,
              name: "无电梯8层,楼层费140元"
            }
          ]
        },
        {
          stairsFee: [
            {
              id: 0,
              name: "有电梯,无楼梯费"
            },
            {
              id: 1,
              name: "无电梯1层,楼层费0元"
            },
            {
              id: 2,
              name: "无电梯2层,楼层费12元"
            },
            {
              id: 3,
              name: "无电梯3层,楼层费24元"
            },
            {
              id: 4,
              name: "无电梯4层,楼层费48元"
            },
            {
              id: 5,
              name: "无电梯5层,楼层费72元"
            },
            {
              id: 6,
              name: "无电梯6层,楼层费96元"
            },
            {
              id: 7,
              name: "无电梯7层,楼层费132元"
            },
            {
              id: 8,
              name: "无电梯8层,楼层费168元"
            }
          ]
        },
        {
          stairsFee: [
            {
              id: 0,
              name: "有电梯,无楼梯费"
            },
            {
              id: 1,
              name: "无电梯1层,楼层费0元"
            },
            {
              id: 2,
              name: "无电梯2层,楼层费15元"
            },
            {
              id: 3,
              name: "无电梯3层,楼层费30元"
            },
            {
              id: 4,
              name: "无电梯4层,楼层费60元"
            },
            {
              id: 5,
              name: "无电梯5层,楼层费90元"
            },
            {
              id: 6,
              name: "无电梯6层,楼层费120元"
            },
            {
              id: 7,
              name: "无电梯7层,楼层费165元"
            },
            {
              id: 8,
              name: "无电梯8层,楼层费210元"
            }
          ]
        }
      ], //车型数据
      currentCar: {
        //当前车型---效果用数据
        name: "小面",
        index: 0,
        weight: "600KG", //载重
        ckg: "1.7m×1.1m×1.0m", //长宽高
        volume: "1.87立方", //体积
        hide: false, //是否隐藏
        isActive: true //被选中状态
      },
      currentCarItem: "", //当前车型---数据用
      tabData: [
        //自定义车型数据
        {
          name: "小面",
          index: 0,
          weight: "600KG", //载重
          ckg: "1.7m×1.1m×1.0m", //长宽高
          volume: "1.87立方", //体积
          hide: false, //是否隐藏
          isActive: true //被选中状态
        },
        {
          name: "金杯",
          index: 1,
          weight: "1500KG", //载重
          ckg: "2.7m×1.4m×1.2m", //长宽高
          volume: "4.5立方", //体积
          hide: false, //是否隐藏
          isActive: false //被选中状态
        },
        {
          name: "4.2米厢货",
          index: 2,
          weight: "3000KG", //载重
          ckg: "4.2m×1.8m×1.8m", //长宽高
          volume: "13立方", //体积
          hide: false, //是否显示
          isActive: false //被选中状态
        }
      ],
      swiperWidth: 0,
      currentIndex: 0,
      maxIndex: 2,
      transform: 0,
      startX: 0,
      endX: 0
    };
  },
  created() {
    base.setHtmlRem();
  },
  mounted() {
    this.getwidth();
    this.swiperTouch();
  },
  methods: {
    // 基本数据初始化
    initData() {},
    changeTab(item) {
        var num = -this.swiperWidth * item.index;
        this.moveSBack(num);
    },
    getwidth() {
      var swiper = this.$element.querySelector(".swiper-wrapper");
      var width = MIP.util.css(swiper, "width");
      width = Number(width.substring(0, width.length - 2));
      this.swiperWidth = width;
      console.log("查看宽度:" + width);
    },
    // 移动
    moves(num) {
      var swiper = this.$element.querySelector(".swiper-wrapper");
      num = -num;
      var currentIndex = this.currentIndex;
      num = -currentIndex * this.swiperWidth + num;
      var transformNum = Math.abs(num);
      this.transform = num;
      var t = "translateX(" + num + "px)";
      MIP.util.css(swiper, {
        transform: t,
        "transition-duration": "0ms"
      });
    },
    // 不足距离 返回
    moveSBack(num) {
      var swiper = this.$element.querySelector(".swiper-wrapper");
      this.transform = num;
      var t = "translateX(" + num + "px)";
      MIP.util.css(swiper, {
        transform: t,
        "transition-duration": "300ms"
      });

      var transformNum = Math.abs(num);
      this.currentIndex = parseInt(transformNum / this.swiperWidth);

      setTimeout(function() {
        MIP.util.css(swiper, {
          "transition-duration": "0ms"
        });
      }, 100);
    },
    swiperTouch() {
      var that = this;
      var swiper = this.$element.querySelector(".swiper-wrapper");
      swiper.addEventListener("touchstart", function(event, str) {
        event.preventDefault();  
       var touch = event.touches[0];
        that.startX = touch.pageX;
      });
      swiper.addEventListener("touchmove", function(event, str) {
         event.preventDefault();  
       var touch = event.touches[0];
        that.endX = touch.pageX;
        var num = that.startX - touch.pageX;
        that.moves(num);
      });
      swiper.addEventListener("touchend", function(event, str) {
        var num = that.startX - that.endX;
        if (that.transform > 0) {
          that.moveSBack(0);
        } else {
          var temp = num;
          if (num < 0) {
            temp = -num;
          }

          if (num < 0) {
            if (temp > that.swiperWidth / 4) {
              var curentIndex = that.currentIndex;
              if (curentIndex !== 0) {
                that.moveSBack(-that.swiperWidth * (curentIndex - 1));
              }
            } else {
              console.log("不足一半回到之前");
              var num = -that.currentIndex * that.swiperWidth;
              that.moveSBack(num);
            }
          } else {
            if (temp > that.swiperWidth / 4) {
              var curentIndex = that.currentIndex;
              console.log(that.swiperWidth + num);
              if (curentIndex !== that.maxIndex) {
                that.moveSBack(-that.swiperWidth * (curentIndex + 1));
              } else {
                that.moveSBack(-that.swiperWidth * that.maxIndex);
              }
            } else {
              console.log("不足一半回到之前");
              var num = -that.currentIndex * that.swiperWidth;
              console.log("结束的距离:" + num);
              that.moveSBack(num);
            }
          }
        }

        if (num < 0) {
          console.log("右滑动");
        } else {
          console.log("左滑动");
        }
      });
    }
  }
};
</script>

<style scoped>
.wrapper {
  margin: 0 auto;
  text-align: center;
  height: 100%;
}
.tab {
  padding: 0 0.2rem;
  margin-top: 0.2rem;
}
.tab-div {
  background: #ffffff;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  padding: 0 0.3975rem;
  padding-top: 0.28rem;
  padding-bottom: 0.28rem;
}
.lxn-tab-title {
  display: flex;
}
.lxn-tab-title li {
  flex: 1;
  color: #666666;
  font-size: 0.28rem;
  letter-spacing: 0.7px;
}
.active {
  color: #39a1e8 !important;
  position: relative;
}
.active::after {
  content: "";
  display: inline-block;
  position: absolute;
  width: 0.72rem;
  height: 0.06rem;
  background: #39a1e8;
  bottom: -0.1rem;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 1.44rem;
}

.swiper-div {
  margin-top: 0.3rem;
  margin-bottom: 0.2rem;
}
.swiper-container {
  width: 100%;
  height: 1.08rem;
}
.car-img-div {
  width: 2.24rem;
  height: 1.06rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.car-img-div .car {
  width: 100%;
  height: 100%;
  background-size: 100%;
}
.car-img-div .xiaomian {
  background-image: url(https://www.lanxiniu.com/Public/baidumip/xiaomian.png);
}
.car-img-div .jinbei {
  background-image: url(https://www.lanxiniu.com/Public/baidumip/jinbei.png);
}
.car-img-div .xianghuo {
  background-image: url(https://www.lanxiniu.com/Public/baidumip/xianghuo.png);
}

.car-deccription > div {
  display: flex;
  height: 0.75rem;
  align-items: center;
  background: #f1f1f1;
  box-shadow: 0 2px 4px 0 rgba(234, 234, 234, 0.5);
  border-radius: 0.04rem;
  font-size: 0.2rem;
  color: #666666;
  position: relative;
  padding-top: 0.02rem;
}
.car-deccription > div::before {
  display: block;
  content: "";
  position: absolute;
  left: 50%;
  top: -0.24rem;
  transform: translateX(-50%);

  border-width: 0.16rem 0.16rem 0.1rem 0.16rem;
  border-style: solid;
  border-color: transparent transparent #f1f1f1 transparent;
}
.des-div {
  flex: 1;
  position: relative;
}
.des-div:not(:last-child)::after {
  content: "";
  display: inline-block;
  position: absolute;
  width: 0.02rem;
  height: 0.28rem;
  background: #ffffff;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 1.44rem;
}
.des-div p:last-child {
  /* margin-top: 0.05rem; */
}

.swiper-container {
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  z-index: 1;
}

/*主体数据*/
.main-conten {
  margin-top: 0.24rem;
  height: 2.75rem;
}
.address {
  width: 100%;
  /* background: blue; */
}
.point {
  width: 0.16rem;
  height: 0.16rem;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
}
.move-out-point {
  background: #feb02a;
}
.move-in-point {
  background: #a1d48f;
}

.address-div {
  height: 0.75rem;
  padding-left: 0.6rem;
  /* background: red; */
  position: relative;
  font-size: 0.28rem;
}
.address-div input {
  font-size: 0.28rem;
  color: #999999 !important;
}
.address-div-flex {
  display: flex;
  height: 100%;
  border-bottom: 0.02rem solid rgba(68, 68, 68, 0.1);
}
.address-div-flex2 {
  border: none;
}
.address-div div.left {
  position: relative;
  flex: 3;
}
.address-div div.left::after {
  content: "";
  display: inline-block;
  position: absolute;
  width: 0.02rem;
  height: 0.3rem;
  background: #e1e1e1;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 1.44rem;
}
.noafter::after {
  width: 0 !important;
}
.address-div div.right {
  flex: 2;
}
.address-div div.right input {
  text-align: right;
}
.move-second {
  border-top: 0.02rem solid rgba(68, 68, 68, 0.1);
  border-bottom: 0.02rem solid rgba(68, 68, 68, 0.1);
}
.move-second .address-div-time {
  border: none;
}
.move-second .left {
  text-align: left;
  position: relative;
}
.move-second .left span {
  font-size: 0.28rem;
  color: #666666;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
.movetime,
.beizhu {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
}
/*价格*/
.price {
  margin-top: 0.57rem;
}
.price-num {
  font-size: 0.56rem;
  color: #f37272;
  position: relative;
  top: 0.06rem;
}
.price-unit {
  position: relative;
  color: #f37272;
  margin-right: 0.2rem;
}
.price-unit::after {
  content: "";
  display: inline-block;
  position: absolute;
  width: 0.02rem;
  height: 0.35rem;
  background: #f37272;
  right: -0.07rem;
  bottom: -0.01rem;
  /* transform: translateY(-50%); */
  border-radius: 1.44rem;
}
.zifei {
  font-size: 0.24rem;
  color: #4dabeb;
}
.sure-order {
  margin: 0.28rem 0;
  height: 0.76rem;
  line-height: 0.76rem;
  font-size: 0.34rem;
  color: #ffffff;
  background: #36a0e9;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.3);
  border-radius: 2px;
}

/*swiper*/
.swiper-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 1;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-transition-property: -webkit-transform;
  -moz-transition-property: -moz-transform;
  -o-transition-property: -o-transform;
  -ms-transition-property: -ms-transform;
  transition-property: transform;
  -webkit-box-sizing: content-box;
  -moz-box-sizing: content-box;
  box-sizing: content-box;
}

.swiper-container-android .swiper-slide,
.swiper-wrapper {
  -webkit-transform: translate3d(0, 0, 0);
  -moz-transform: translate3d(0, 0, 0);
  -o-transform: translate(0, 0);
  -ms-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}

.swiper-container-multirow > .swiper-wrapper {
  -webkit-box-lines: multiple;
  -moz-box-lines: multiple;
  -ms-flex-wrap: wrap;
  -webkit-flex-wrap: wrap;
  flex-wrap: wrap;
}

.swiper-container-free-mode > .swiper-wrapper {
  -webkit-transition-timing-function: ease-out;
  -moz-transition-timing-function: ease-out;
  -ms-transition-timing-function: ease-out;
  -o-transition-timing-function: ease-out;
  transition-timing-function: ease-out;
  margin: 0 auto;
}

.swiper-slide {
  -webkit-flex-shrink: 0;
  -ms-flex: 0 0 auto;
  flex-shrink: 0;
  width: 100%;
  height: 100%;
  position: relative;
}

.swiper-container-autoheight,
.swiper-container-autoheight .swiper-slide {
  height: auto;
}

.swiper-container-autoheight .swiper-wrapper {
  -webkit-box-align: start;
  -ms-flex-align: start;
  -webkit-align-items: flex-start;
  align-items: flex-start;
  -webkit-transition-property: -webkit-transform, height;
  -moz-transition-property: -moz-transform;
  -o-transition-property: -o-transform;
  -ms-transition-property: -ms-transform;
  transition-property: transform, height;
}

.swiper-container .swiper-notification {
  position: absolute;
  left: 0;
  top: 0;
  pointer-events: none;
  opacity: 0;
  z-index: -1000;
}

.swiper-wp8-horizontal {
  -ms-touch-action: pan-y;
  touch-action: pan-y;
}

.swiper-wp8-vertical {
  -ms-touch-action: pan-x;
  touch-action: pan-x;
}

@-webkit-keyframes swiper-preloader-spin {
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes swiper-preloader-spin {
  100% {
    transform: rotate(360deg);
  }
}

.layer-sure {
  line-height: 0.8rem;
}
</style>

