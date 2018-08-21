<template>
  <div class="wrapper">
    <div class="switchTabWrap">
      <div
        :class="[currentTab==0?'currentTab':'']"
        class="leftTab tab"
        @click="switchTabWrap(0)">车辆瑕疵图</div>
      <div
        :class="[currentTab==1?'currentTab':'']"
        class="rightTab tab"
        @click="switchTabWrap(1)">漆面修复图</div>
    </div>
    <!-- 车辆瑕疵图 -->
    <div v-show="currentTab==0">
      <div class="optionsListLeft">
        <span
          :class="[flawOptionIndex==0?'currentOption':'']"
          @click="switchFlawIndex(0)">外观件</span>
        <div class="border"/>
        <span
          :class="[flawOptionIndex==1?'currentOption':'']"
          @click="switchFlawIndex(1)">内饰件</span>
        <div class="border"/>
        <span
          :class="[flawOptionIndex==2?'currentOption':'']"
          @click="switchFlawIndex(2)">骨架件</span>
      </div>
      <div
        v-show="flawOptionIndex == 0"
        class="imgWrap featureImg">
        <img
          class="featureImg"
          src="//c2.xinstatic.com/f3/20180316/1413/5aab60a7dc4ba209895.png">
        <div><span
          v-for="(item,index) in flawsOuterArr"
          :class="[flawsOuterIndex == index ? 'anchorNumActive' :'']"
          :style="{top:item.location[1]*2/100 + 'rem',left:item.location[0]*2/100 + 'rem'}"
          :key="index"
          class="anchorNum"
          @click="changeFlawsAnchor" >{{ index+1 }}</span></div>
      </div>
      <div
        v-show="flawOptionIndex == 1"
        class="imgWrap trimImg">
        <img
          class="trimImg"
          src="//c2.xinstatic.com/f3/20180316/1213/5aab4458a77bf330025.png">
        <div><span
          v-for="(item,index) in flawsInnerArr"
          :class="[flawsInnerIndex == index ? 'anchorNumActive' :'']"
          :style="{top:item.location[1]*2/100 + 'rem',left:item.location[0]*2/100 + 'rem'}"
          :key="index"
          class="anchorNum" >{{ index+1 }}</span></div>
      </div>
      <div
        v-show="flawOptionIndex == 2"
        class="imgWrap frameImg">
        <img
          class="frameImg"
          src="//c2.xinstatic.com/f3/20180316/1414/5aab60a818c28832566.png">
        <div><span
          v-for="(item,index) in flawsFrameArr"
          :class="[flawsFrameIndex == index ? 'anchorNumActive' :'']"
          :style="{top:item.location[1]*2/100 + 'rem',left:item.location[0]*2/100 + 'rem'}"
          :key="index"
          class="anchorNum">{{ index+1 }}</span></div>
      </div>
      <div
        v-show="flawOptionIndex == 0"
        class="flawNum">{{ flawsOuterArr.length!=0?flawsOuterArr.length+ '项':'无' }}瑕疵</div>
      <div
        v-show="flawOptionIndex == 1"
        class="flawNum">{{ flawsInnerArr.length!=0?flawsInnerArr.length+ '项':'无' }}瑕疵</div>
      <div
        v-show="flawOptionIndex == 2"
        class="flawNum">{{ flawsFrameArr.length!=0?flawsFrameArr.length+ '项':'无' }}瑕疵</div>
    </div>
    <!-- 漆面修复图 -->
    <div v-show="currentTab==1">
      <div class="optionsListRight">
        <span
          :class="[repairOptionIndex==0?'currentOption':'']"
          @click="switchRepairIndex(0)">外观件</span>
        <div class="border"/>
        <span
          :class="[repairOptionIndex==1?'currentOption':'']"
          @click="switchRepairIndex(1)">骨架件</span>
      </div>
      <div
        v-show="repairOptionIndex==0"
        class="imgWrap featureImg">
        <img
          class="featureImg"
          src="//c2.xinstatic.com/f3/20180316/1413/5aab60a7dc4ba209895.png">
        <div><span
          v-for="(item,index) in paintOuterArr"
          :style="{top:item.location[1]*2/100 + 'rem',left:item.location[0]*2/100 + 'rem'}"
          :key="index"
          class="anchorNum " >{{ index+1 }}</span></div>
      </div>
      <div
        v-show="repairOptionIndex==1"
        class="imgWrap frameImg">
        <img
          class="frameImg"
          src="//c2.xinstatic.com/f3/20180316/1414/5aab60a818c28832566.png">
        <div><span
          v-for="(item,index) in paintFrameArr"
          :style="{top:item.location[1]*2/100 + 'rem',left:item.location[0]*2/100 + 'rem'}"
          :key="index"
          class="anchorNum">{{ index + 1 }}</span></div>
      </div>
      <div
        v-show="repairOptionIndex == 0"
        class="flawNum">{{ paintOuterArr.length!=0?paintOuterArr.length + '项':'无' }}修复</div>
      <div
        v-show="repairOptionIndex == 1"
        class="flawNum">{{ paintFrameArr.length!=0?paintFrameArr.length+ '项':'无' }}修复</div>
    </div>
  </div>
</template>

<script>
import { clickPoint } from '../../common/utils/stastic.js'
import base from '../../common/utils/base.js'
import '../../common/css/base.css'
import { getCarId } from '../../common/utils/utils.js'
const pid = '/pages/detail'
let imgArr = []
export default {
  props: {
    flaws: {
      type: Object,
      required: true
    },
    paint: {
      type: Object,
      required: true
    },
    outerArr: {
      type: Array,
      required: true
    },
    innerArr: {
      type: Array,
      required: true
    },
    frameArr: {
      type: Array,
      required: true
    },
    isDetail: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      currentTab: 0,
      flawOptionIndex: 0, // 0 外观件，1 内饰件 ，2 骨架件
      repairOptionIndex: 0, // 0 外观件，1 骨架件
      flawsOuterArr: [], // 车辆瑕疵 外观件瑕疵点数组
      flawsInnerArr: [], // 车辆瑕疵 内饰件瑕疵点数组
      flawsFrameArr: [], // 车辆瑕疵 骨架件瑕疵点数组
      paintFrameArr: [], // 漆面修复 外观件修复点数组
      paintOuterArr: [], // 漆面修复 骨架件修复点数组
      flawsOuterIndex: 0, // 瑕疵图当前高亮的外观件瑕疵点的index
      flawsInnerIndex: 0, // 瑕疵图当前高亮的内饰件瑕疵点的index
      flawsFrameIndex: 0 // 瑕疵图当前高亮的骨架件瑕疵点的index
    }
  },
  created () {
    base.setMediaBase()
  },
  mounted () {
    this.flawsInnerArr = this.flaws.inner
    this.flawsOuterArr = this.flaws.outer
    this.flawsFrameArr = this.flaws.frame
    this.paintOuterArr = this.paint.outer
    this.paintFrameArr = this.paint.frame
    imgArr = this.outerArr
    let vm = this
    this.$on('tabOuterChange', function (event) {
      vm.tabOuterChange(event)
    })
    this.$on('tabInnerChange', function (event) {
      vm.tabInnerChange(event)
    })
    this.$on('tabFrameChange', function (event) {
      vm.tabFrameChange(event)
    })
  },
  methods: {
    // 车辆瑕疵图和漆面修复图切换
    switchTabWrap: function (index) {
      this.$emit('switchTabWrap', index)
      this.currentTab = index
      if (this.isDetail) {
        clickPoint(
          'examine_defect_detail',
          {
            carid: getCarId(),
            tab1: (index + 1),
            tab2: 1,
            operation: 0
          },
          null,
          {
            pid: pid
          })
      }
    },
    /* 瑕疵图的外观件、内饰件、骨架件切换 */
    switchFlawIndex: function (index) {
      // 用if判断的原因：返回数据为对象，没法用数组索引获取
      if (index === 0) {
        imgArr = this.outerArr
      } else if (index === 1) {
        imgArr = this.innerArr
      } else {
        imgArr = this.frameArr
      }
      this.$emit('switchSwiper', index)
      this.flawOptionIndex = index
      if (this.isDetail) {
        clickPoint(
          'examine_defect_detail',
          {
            carid: getCarId(),
            tab1: (this.currentTab + 1),
            tab2: (index + 1),
            operation: 0
          },
          null,
          {
            pid: pid
          })
      }
    },
    /* 修复图的外观件、内饰件、骨架件切换 */
    switchRepairIndex: function (index) {
      this.$emit('switchPaint', index)
      this.repairOptionIndex = index
      if (this.isDetail) {
        clickPoint(
          'examine_defect_detail',
          {
            carid: getCarId(),
            tab1: (this.currentTab + 1),
            tab2: (index + 1),
            operation: 0
          },
          null,
          {
            pid: pid
          })
      }
    },
    tabOuterChange: function (event) {
      this.$emit('getOuterCurrentIndex', (event.currIndex - 1))
      this.flawsOuterIndex = imgArr[event.currIndex - 1].flawIndex
    },
    tabInnerChange: function (event) {
      this.$emit('getInnerCurrentIndex', (event.currIndex - 1))
      this.flawsInnerIndex = imgArr[event.currIndex - 1].flawIndex
    },
    tabFrameChange: function (event) {
      this.$emit('getFrameCurrentIndex', (event.currIndex - 1))
      this.flawsFrameIndex = imgArr[event.currIndex - 1].flawIndex
    }
  }
}
</script>
<style scoped>
    .wrapper {
        margin: 0.7rem auto 0;
        text-align: center;
    }

    .switchTabWrap {
        margin: 0 auto;
        text-align: center;
        width: 4rem;
        height: 0.66rem;
        background-color: #fff;
        border-radius: 0.04rem;
        display: flex;
        justify-content: space-between;
    }

    .tab {
        width: 2rem;
        height: 0.66rem;
        line-height: 0.66rem;
        border: #F85D00 solid 0.02rem;
        border-radius: 0.04rem;
        color: #f85d00;
        font-size:0.26rem;
    }

    .leftTab {
        margin-right: -0.02rem;
    }

    .currentTab {
        background-color: #f85d00;
        color: #fff;
    }

    .optionsListLeft {
        margin: 0.4rem auto;
        width: 4rem;
        display: flex;
        justify-content: space-between;
    }
    .optionsListLeft span{
        font-size: 0.26rem;
    }
    .border {
        width: 0.025rem;
        height: 0.24rem;
        background-color: grey;
        margin-top: 0.09rem;
    }

    .optionsListRight {
        margin: 0.4rem auto;
        width: 2.4rem;
        display: flex;
        justify-content: space-between;
    }
    .optionsListRight span{
        font-size: 0.26rem;
    }
    .imgWrap {
        position: relative;
        margin: 0 auto;
    }

    .anchorNum {
        position: absolute;
        /* top: 0;
        left: 0; */
        display: inline-block;
        width: 0.35rem;
        height: 0.35rem;
        line-height: 0.35rem;
        text-align: center;
        background-color: #F3D334;
        border-radius: 50%;
        color: rgba(255, 255, 255, 1);
        font-size: 0.22rem;
        font-family: PingFangSC-Semibold;
    }

    .anchorNumActive {
        animation: anchorPoint 2s infinite alternate;
    }

    @keyframes anchorPoint {
        from {
            box-shadow: 0 0 0 0 rgba(243, 211, 52, .2);
        }
        to {
            box-shadow: 0 0 0 0.2rem rgba(243, 211, 52, .2);
        }
    }

    .featureImg {
        width: 6.7rem;
        height: 4.22rem;
    }

    .trimImg {
        width: 6.7rem;
        height: 4.59rem;
    }

    .frameImg {
        width: 6.7rem;
        height: 3.75rem;
    }

    .currentOption {
        color: #F85D00;
    }

    .flawNum {
        height: 0.96rem;
        line-height: 0.96rem;
        color: #999;
        font-size: 0.22rem;
        text-align: right;
        padding-right: 0.4rem;
    }
</style>
