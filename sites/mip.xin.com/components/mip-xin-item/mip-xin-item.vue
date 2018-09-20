<template>
  <div class="wrapper">
    <mip-fixed
      v-show="isFixed"
      type="top"
      class="listWrap">
      <ul
        ref="scrollX"
        class="titleListWrap">
        <li
          v-for="(item,index) in report_title"
          :class="[currentIndex == index ?'currentTitle':'']"
          :key="index"
          class="titleLi"
          @click="jump(index)">{{ item.cat_name }}</li>
      </ul>
    </mip-fixed>
    <div
      v-if="isShowVideo">
      <div class="boxTop"/>
      <div v-if="videoUrl&&videoImg">
        <mip-video
          :poster="videoImg"
          width="640"
          height="360"
          layout="responsive"
          controls>
          <source
            :src="videoUrl"
            type="video/mp4">
        </mip-video>
      </div>
    </div>
    <diV
      v-for="(item,index) in car_repair_num"
      :key="index"
      class="reportTitleWrap">
      <div class="boxTop"/>
      <div class="reportTitle" >
        <span class="title">{{ item.cat_name }}</span>
      </div>
      <div
        v-for="(checkItem,index) in (item.child)"
        :key="index"
        class="checkContent">
        <div
          class="checkTitleWrap"
          @click="switchCheckDesc(checkItem.cat_name)">
          <div class="checkTitle">
            <span>{{ checkItem.cat_name }}</span>
            <img
              :class="[carTypeStatus[checkItem.cat_name]?'angleDir':'']"
              src="//c2.xinstatic.com/f3/20180416/1840/5ad47da2428ad535567.png">
          </div>
          <div class="checkoutCountWrap">
            <div
              v-if="checkItem.flaw_all_num"
              class="checkCount">
              <span>{{ checkItem.flaw_all_num }}项</span>
              <img src="//c2.xinstatic.com/f3/20180416/1840/5ad47da23e611535388.png">
            </div>
            <div class="checkCount">
              <span>{{ checkItem.all_num }}项</span>
              <img src="//c2.xinstatic.com/f3/20180416/1840/5ad47da23e2e4430972.png">
            </div>
          </div>
        </div>
        <div
          v-for="(flawItem,index) in (checkItem.child)"
          v-show="carTypeStatus[checkItem.cat_name]"
          :key="index"
          class="checkDescWrap">
          <div class="checkDesc">
            <span class="descText">{{ flawItem.cat_name }}</span>
            <span>
              <img
                v-if="flawItem.flaw_num"
                class="reportIcon"
                src="//c2.xinstatic.com/f3/20180416/1840/5ad47da23e611535388.png">
              <img
                v-else
                class="reportIcon"
                src="//c2.xinstatic.com/f3/20180416/1840/5ad47da23e2e4430972.png">
            </span>
          </div>
          <div
            v-if="flawItem.flaw_code_describe"
            class="flawDescWrap">
            <span class="flawTitle">{{ flawItem.flaw_code_describe }}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- <mip-xin-button
      v-if="carid"
      :source="4"/> -->
    <div class="boxTop"/>
    <div class="reportTitle lastTitle">
      <span class="title">瑕疵及修复</span>
    </div>
    <mip-xin-switch
      v-if="carid"
      :carid="carid"
      class="borderBottom"/>
  </div>
</template>
<script>
import {viewPoint} from '../../common/utils/stastic.js'
import base from '../../common/utils/base.js'
import { setLocalStorage } from '../../common/utils/utils.js'
import '../../common/css/base.css'
import { requestFun } from '../../common/utils/reqUtils.js'
let pid = '/pages/report'
export default {
  props: {
    query: {
      type: Object,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      report_title: [],
      currentIndex: 0,
      isShowCheckDesc: false,
      car_repair_num: '',
      repairSum: 0,
      carTypeStatus: '',
      carid: this.query.carId,
      flag: true, //   是否执行监听页面滚动的方法，为了防止顶部导航栏抖动
      isFixed: false, //  导航条是否固定显示在顶部
      videoImg: '', //  视频封面图
      videoUrl: '', //  视频路径
      isShowVideo: false, //  是否显示视频组件
      num: 0
    }
  },
  watch: {
    //   当currentIndex发生变化时，顶部导航滚动到指定位置
    currentIndex (newIndex) {
      let _this = this
      this.$nextTick(function () {
        _this.navScroll(newIndex)
      })
    }
  },
  created () {
    base.setMediaBase()
  },
  mounted () {
    viewPoint('', null, {
      pid: pid
    })
    if (this.token) {
      setLocalStorage('ajaxToken', this.token)
    }
    requestFun('/ajax/report/car_report', {
      method: 'POST',
      param: {
        carid: this.carid
      }
    }).then(res => {
      let carTypeStatus = {}
      if (res.report_complete_video.video_url && res.report_videos_all) {
        let video = res.report_videos_all.biao
          ? res.report_videos_all.biao
          : res.report_complete_video
          //  无分级视频时，使用完整视频
        // 视频数据延迟渲染
        setTimeout(() => {
          this.videoUrl = video.video_url
          this.videoImg = res.report_complete_video.pic
        }, 1000)
        // end

        this.videoTime = video.duration / (1000 * 60)
        this.isShowVideo = true
      } else {
        this.isShowVideo = false
      }
      this.car_repair_num = res.car_repair_num
      this.report_title = res.report_title
      let repairArr = []
      let sum = 0
      this.car_repair_num.forEach((item, index) => {
        sum += item.all_num
        repairArr[index] = item
      })
      this.repairSum = sum
      repairArr.forEach((item, index) => {
        item.child.forEach((item, index) => {
          if (item.flaw_all_num) {
            carTypeStatus[item.cat_name] = true
          } else {
            carTypeStatus[item.cat_name] = false
          }
        })
      })
      this.carTypeStatus = carTypeStatus
      let _this = this
      MIP.viewport.on('scroll', _this.handleScroll)
      if (this.query && this.query.index) {
        this.$nextTick(() => {
          setTimeout(() => {
            this.jump(this.query.index)
            this.currentIndex = this.query.index
          }, 100)
        })
      }
    })
  },
  methods: {
    switchCheckDesc: function (carname) {
      let carTypeStatus = this.carTypeStatus
      carTypeStatus[carname] = carTypeStatus[carname] ? !true : true
      this.$set(carTypeStatus, carTypeStatus)
    },
    handleScroll () {
      if (!this.flag) {
        return
      }
      //  获取当前滚动距离
      let scrollTop = MIP.viewport.getScrollTop()
      //  获取所有boxTop距离页面顶部的距离，并放到topList的数组中
      let jump = document.querySelectorAll('.boxTop')
      let topList = []
      for (let i = 0; i < jump.length; i++) {
        topList.push(jump[i].offsetTop - 44)
      }
      //   scrollArr的所有项都小于当前的页面滚动的距离，最后一项为当前高亮项的索引。
      let scrollArr = topList.filter(function (item, index) {
        return item < scrollTop
      })
      this.currentIndex = scrollArr.length - 1
      if (scrollTop <= 15) {
        this.isFixed = false
      } else if (this.currentIndex > 0) {
        this.isFixed = true
      }
    },
    jump (index) {
      if (index === 0) {
        this.isFixed = false
      } else {
        this.isFixed = true
      }
      this.flag = false
      let jump = document.querySelectorAll('.boxTop')
      //  mip的mip-shell的高度会影响页面的滚动，所以将其从滚动的距离中减去
      let total = jump[index].offsetTop - 40
      MIP.viewport.setScrollTop(total)
      this.currentIndex = index
      let _this = this
      setTimeout(function () {
        _this.flag = true
      }, 800)
    },
    //   让导航条滑动到指定位置,只有页面垂直滚动时，导航条随之滑动
    navScroll (index) {
      let navScroll = document.querySelectorAll('.titleLi')
      let total =
        navScroll[index] &&
        navScroll[index].offsetLeft - navScroll[2].offsetLeft
      this.$refs.scrollX.scrollLeft = total
    },
    playing () {
      this.isShowVideo = true
    }
  }
}
</script>
<style scoped>
.listWrap {
  margin-top: 0.8rem;
  width: 100%;
  overflow: hidden;
  z-index: 9999;
}
.titleListWrap {
  white-space: nowrap;
  overflow-x: auto;
  padding-left: 0.4rem;
  padding-right: 0.4rem;
  box-sizing: border-box;
  height: 0.88rem;
  line-height: 0.88rem;
  display: flex;
  display: -webkit-box;
  display: box;
  justify-content: space-between;
  flex-wrap: nowrap;
  background: #fff;
}

.titleLi {
  list-style: none;
  display: inline-block;
  line-height: 0.88rem;
  font-size: 0.3rem;
  text-align: center;
  font-family: PingFangSC-Regular;
  color: rgba(27, 27, 27, 1);
  margin-right: 0.4rem;
  white-space: nowrap;
}
.titleLi:last-child {
  padding-right: 0.4rem;
}
/*tabList的横向滚动条 */
::-webkit-scrollbar {
  width: 0;
  height: 0;
  color: transparent;
}
.currentTitle {
  position: relative;
}
.currentTitle::before {
  position: absolute;
  bottom: 0;
  left: 50%;
  display: inline-block;
  content: "";
  width: 0.8rem;
  height: 0.06rem;
  background: #f85d00;
  margin-left: -0.4rem;
  border-radius: 0.03rem;
}
/*视频组件的样式*/
.videoWrap {
  width: 7.5rem;
  height: 4.2rem;
  background: #bfa;
}
.reportTitleList {
  height: 0.88rem;
  line-height: 0.88rem;
}

.reportTitle {
  height: 1.1rem;
  line-break: 1.1rem;
  background-color: #fff;
  border-left: 0.04rem solid #f85d00;
  padding-left: 0.36rem;
  box-sizing: border-box;
  font-weight: bold;
}

.border {
  height: 0.1rem;
  background-color: #f1f1f1;
}
.lastTitle {
  border-bottom: 0.01rem solid #f1f1f1;
}

.title {
  font-size: 0.3rem;
  color: #585858;
  line-height: 1.1rem;
  font-family: PingFangSC-Medium;
}

.checkTitleWrap {
  display: flex;
  justify-content: space-between;
  height: 0.9rem;
  line-height: 0.9rem;
  padding: 0 0.4rem;
  border-top: 0.01rem solid #f1f1f1;
  border-bottom: 0.01rem solid #f1f1f1;
}

.checkoutCountWrap {
  display: flex;
  justify-content: space-between;
}

.checkTitle span {
  color: #585858;
  font-size: 0.28rem;
  font-family: PingFangSC-Regular;
  margin-right: 0.2rem;
}

.checkTitle img {
  width: 0.24rem;
  height: 0.24rem;
  vertical-align: middle;
}

.angleDir {
  transform: rotate(-180deg);
}

.checkCount {
  width: 1.3rem;
  text-align: right;
}

.checkCount span {
  font-size: 0.24rem;
  font-family: PingFangSC-Regular;
  color: #c5c5c5;
}

.checkCount img {
  width: 0.32rem;
  height: 0.32rem;
  vertical-align: middle;
  margin-left: 0.1rem;
}

.checkDescWrap {
  line-height: 0.8rem;
  background: #fafafb;
  border-bottom: 0.01rem solid #f1f1f1;
}
.checkDesc {
  padding: 0 0.4rem;
  display: flex;
  justify-content: space-between;
}
.flawDescWrap {
  padding: 0.2rem 0.4rem;
  font-size: 0.22rem;
  background-color: #f7f7f7;
  line-height: 0.3rem;
}
.flawTitle {
  color: #efcd26;
}
.flawContent {
  color: #c5c5c5;
}
.descText {
  font-size: 0.24rem;
  color: #585858;
}

.reportIcon {
  line-height: 0.8rem;
  width: 0.32rem;
  height: 0.32rem;
}
.video{
  width: 7.5rem;
  height: 4.2rem;
}
.videoMask {
  width: 7.5rem;
  height: 4.2rem;
}
.videoMask {
  position: relative;
  font-size: 0.28rem;
  font-family: PingFangSC-Regular;
  color: rgba(255, 255, 255, 1);
  text-align: center;
}
.maskImg,
.maskContent {
  position: absolute;
  top: 0;
  left: 0;
  width: 7.5rem;
  height: 4.2rem;
}
.maskContent {
  z-index: 10;
  box-sizing: border-box;
  padding-top: 1.46rem;
  background: rgba(0, 0, 0, 0.5);
}
.playButon {
  margin: 0.4rem auto;
  width: 2rem;
  height: 0.6rem;
  background: rgba(248, 93, 0, 1);
  border-radius: 0.04rem;
  line-height: 0.6rem;
}
.borderBottom {
  /**padding-bottom: 0.88rem;*/
  padding-bottom:0.44rem;
}
::-webkit-scrollbar {
  width: 0;
  height: 0;
  color: transparent;
}
</style>
