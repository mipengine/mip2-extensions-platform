<template>
  <div
    v-show="scrollshow"
    class="scroll-container"
    @touchmove.prevent>
    <div class="scroll-select">
      <div class="scroll-header">
        <span
          class="left"
          @click="closeScrollSelect()">取消</span>
        <span
          class="right cfont"
          @click="getScrollSelectValue()">确定</span>
      </div>
      <div
        :style="getWrapperHeight"
        :isclick = "getTag"
        class="col-wrapper">
        <ul
          ref="wheel"
          :style="getListTop"
          :class="{'tm0':isinit}"
          class="wheel-list">
          <li
            v-for="item in scrollValues" 
            :key="item"
            :style="initWheelItemDeg(item.index)"
            class="wheel-item">{{ item.value }}</li>
        </ul>
        <div
          :style="getCoverStyle"
          class="cover"/>
        <div
          :style="getDividerStyle"
          class="divider"/>
      </div>
    </div>
  </div>
</template>
<script>
import Animate from './utils/animate';
const a = -0.003; // 加速度
const radius = 100; // 半径
const lineHeight = 36; // 文字行高
let selectValue = '';
let isInertial = false; // 是否正在惯性滑动
// 根据三角形余弦公式
// 反余弦得到弧度再转换为度数,这个度数是单行文字所占有的。
let deg = Math.round((Math.acos((((radius * radius) + (radius * radius)) - (lineHeight * lineHeight)) / (2 * radius * radius)) * 180) / Math.PI);
// deg这个值须360能整除，因为当滚动列占满一周后可以再次均匀的覆盖在上一周文字上；滚动时不会出现错位
while (360 % deg !== 0 && deg <= 360) {
	deg += 1;
}
const singleDeg = deg;
// 半圆下的内容条数
const space = 3;
export default {
	props: {
		values: {
			type:Array,
			default:function () { return [
				'按照工资',
				'按照最低标准',
				'自定义',
			];}
		},
		scrollshow: {
			type: false,
			default: false
		},
		tag: {
			type: Number,
			default: 0,
		},
		isclick:{
			type:Boolean,
			default:false,
		},
	},
	data () {
		return {
			finger: {
				startY: 0,
				endY: 0,
				startTime: 0, // 开始滑动时间（单位：毫秒）
				entTime: 0, // 结束滑动时间（单位：毫秒）
				currentMove: 0,
				prevMove: 0
			},
			range: {
				start: -space,
				end: space,
				space
			},
			valueLenth:1,
			isinit:false,
		};
	},
	computed: {
		scrollValues () {
			const result = [];
			for (let i = 0; i <this.values.length; i++) {
				result.push({
					value: this.getRangeData(i),
					index: i
				});
			}
			return result;
		},
		getListTop () {
			return {
				top: `${radius - Math.round(lineHeight / 2)}px`,
				height: `${lineHeight}px`
			};
		},
		getWrapperHeight () {
			return {
				height: `${2 * radius}px`
			};
		},
		getCoverStyle () {
			return {
				backgroundSize: `100% ${radius - Math.round(lineHeight / 2)}px`
			};
		},
		getDividerStyle () {
			return {
				top: `${radius - Math.round(lineHeight / 2)}px`,
				height: `${lineHeight - 2}px`
			};
		},
		animate () {
			return new Animate();
		},
		getTag (){
			this.initValue();
			return this.tag;
		}
	},
	/*  beforeDestory() {
    this.$el.removeEventListener('touchstart', this.listenerTouchStart, false);
    this.$el.removeEventListener('touchmove', this.listenerTouchMove, false);
    this.$el.removeEventListener('touchend', this.listenerTouchEnd, false);
	}, */
	mounted () {
		this.$el.addEventListener('touchstart', this.listenerTouchStart, false);
		this.$el.addEventListener('touchmove', this.listenerTouchMove, false);
		this.$el.addEventListener('touchend', this.listenerTouchEnd, false);
	},
	methods: {
		initWheelItemDeg (index) {
			return {
				transform: `rotate3d(1, 0, 0, ${(-1 * index) * singleDeg}deg) translate3d(0, 0, ${radius}px)`,
				height: `${lineHeight}px`,
				lineHeight: `${lineHeight}px`
			};
		},
		listenerTouchStart (ev) {
			/* document.body.scrollTop = 0; */
			/* ev.stopPropagation();
      ev.preventDefault(); */
			/* var mo=function(e){e.preventDefault();};
			document.body.addEventListener("touchmove",mo,true); */
			this.isinit = false;
			isInertial = false;
			this.finger.startY = ev.targetTouches[0].pageY;
			this.finger.prevMove = this.finger.currentMove;
			this.finger.startTime = Date.now();
		},
		listenerTouchMove (ev) {
			/* ev.stopPropagation();
      ev.preventDefault(); */
			const move = (this.finger.startY - ev.targetTouches[0].pageY) + this.finger.prevMove;
			this.finger.currentMove = move;
			this.$refs.wheel.style.transform = `rotate3d(1, 0, 0, ${(move / lineHeight) * singleDeg}deg)`;
			this.updateRange(Math.round(move / lineHeight));
		},
		listenerTouchEnd (ev) {
			/* ev.stopPropagation();
      ev.preventDefault(); */
			this.finger.endY = ev.changedTouches[0].pageY;
			this.finger.endTime = Date.now();
			this.getInertiaDistance();
		},
		updateRange (spinAim) {
			this.range.start = (this.range.space * -1) + spinAim;
			this.range.end = this.range.start + (this.range.space * 2);
		},
		getRangeData (index) {
			index %= this.values.length;
			return this.values[index >= 0 ? index : index + this.values.length];
		},
		getSelectValue (move) {
			const index = Math.abs(move / lineHeight);
			const pickValue = this.getRangeData(index);
			// this.$emit('select', pickValue);
			selectValue = pickValue;
		},
		/**
     * 求移动速度（v = s / t），判断用户操作快慢，从而得到惯性的滑动距离
     */
		getInertiaDistance () {
			// 移动距离
			const s = this.finger.startY - this.finger.endY;
			// 移动时间
			const t = this.finger.endTime - this.finger.startTime;
			// 移动速度
			const v = s / t;
			const absV = Math.abs(v);
			isInertial = true;
			this.inertia(absV, Math.floor(absV / v), 0);
		},
		inertia (start, position, target) {
			if (start <= target || !isInertial) {
				this.animate.stop();
				this.finger.prevMove = this.finger.currentMove;
				this.updateRange(Math.round(this.finger.currentMove / lineHeight));
				this.getSelectValue(this.finger.currentMove);
				return;
			}
			// 这段时间走的位移 S = vt + 1/2at^2;
			const move = (position * start * (1000 / 60)) + (0.5 * a * (1000 / 60) * (1000 / 60)) + this.finger.currentMove;
			// 根据求末速度公式： v末 = v初 + at
			const newStart = (position * start) + (a * (1000 / 60));
			let moveDeg = (move / lineHeight) * singleDeg;
			let actualMove = move;
			// 已经到达目标
			if (newStart <= target) {
				moveDeg = Math.round(move / lineHeight) * singleDeg;
				actualMove = Math.round(move / lineHeight) * lineHeight;
				this.$refs.wheel.style.transition = 'transform 700ms cubic-bezier(0.19, 1, 0.22, 1)';
			} else {
				this.$refs.wheel.style.transition = '';
			}
			if(moveDeg<0){
				moveDeg = 0;
				deg = 21;
				actualMove = 0;
			}
			if(this.values.length == 3 && actualMove>72){
				moveDeg = 48;
				actualMove = 72;
			}else if(this.values.length == 2 && actualMove >36){
				moveDeg = 24;
				actualMove = 36;
			}
			this.finger.currentMove = actualMove;
			this.$refs.wheel.style.transform = `rotate3d(1, 0, 0, ${moveDeg}deg)`;
			this.updateRange(Math.round(this.finger.currentMove / lineHeight));
			this.animate.start(this.inertia.bind(this, newStart, position, target));
		},
		// 关闭选择器
		closeScrollSelect () {
			this.$emit('colsescrollselect', '');
			this.$refs.wheel.style.transform = 'rotate3d(1, 0, 0, 0)';
		},
		// 获取选中值，传递到父组件显示
		getScrollSelectValue (ev) {
			this.$emit('showselect', selectValue);
		},
		//初始化滚轮
		initValue () {
			if(this.tag === 0){
				this.isinit = false;
			}else{
				this.isinit = true;
			}
		}
	},
};

</script>
<style scoped>
span{
	-webkit-tap-highlight-color: transparent; 
}
.tm0{
	transform: rotate3d(1,0,0,0) !important;
}
.scroll-container {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 140;
  background: rgba(0, 0, 0, .3);
}

.scroll-select {
  width: 100%;
  position: absolute;
  bottom: 0;
  background: #fff;
}

span {
  margin: 0 15px;
}

.scroll-header {
  height: 45px;
  line-height: 45px;
  font-size: 16px;
  color: #ACA9A7;
  border: none;
}
.left{
  float: left;
}
.right{
  float: right;
}
.cfont{
    color:#FF8D1D;
}
.c-disable{
    color:#ACA9A7;
}
li,
ul {
  list-style: none;
  padding: 0;
  margin: 0
}

.col-wrapper {
  position: relative;
  height: 300px;
  overflow: hidden;
  text-align: center
}

.col-wrapper .wheel-list {
  position: absolute;
  width: 100%;
  transform-style: preserve-3d
}

.col-wrapper .wheel-list .wheel-item {
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%
}

.col-wrapper .cover {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-image: linear-gradient(180deg, hsla(0, 0%, 100%, .95), hsla(0, 0%, 100%, .6)), linear-gradient(0deg, hsla(0, 0%, 100%, .95), hsla(0, 0%, 100%, .6));
  background-position: top, bottom;
  background-repeat: no-repeat
}

.col-wrapper .divider {
  position: absolute;
  width: 80%;
  left: 50%;
  margin-left: -40%;
  left: 50%;
  border-top: 1px solid #FF8D1D;
  border-bottom: 1px solid #FF8D1D;
	opacity: 0.2;
}

</style>
