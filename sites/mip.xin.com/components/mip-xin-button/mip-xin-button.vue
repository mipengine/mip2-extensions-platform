<template>
  <div >
    <mip-fixed
      v-if="source == 1"
      type="bottom"
      class="buttonWrap">
      <!-- 非百城我要优惠为询底价 百城我要优惠为IM-->
      <button
        class="preButton button"
        @click="showAsk">我要优惠</button>
      <!-- 电话组件，非百城拨打普通400电话  百城拨打天津400电话池-->
      <a
        :href="'tel:' + telPhone"
        target="_top"
        class="callButton button"
        @click="call">电话客服</a>
      <!-- 非百城 普通IM  百城 专家IM-->
      <button
        class="chatButton button"
        @click="gotoIm">在线客服</button>
    </mip-fixed>
    <mip-fixed type="bottom">
      <button
        v-if="source==2"
        class="chatButton button fixedButton"
        @click="gotoIm">在线客服</button>
    </mip-fixed>
    <div v-if="source==3">
      <!--<a
      id="telPhoneButton"
      ref="telPhone"
      :href="'tel:' + telPhone"
      class="trigger-button"/> -->
      <a
        id="bigImgCall"
        :href="'tel:' + telPhone"
        target="_top"
        class=" askCall bigImgCall "
        @click="call">电话咨询</a>
    </div>
    <mip-fixed
      v-if="source == 4"
      type="bottom"
      class=" buttonWrap reportButton">
      <a
        :href="'tel:' + telPhone"
        target="_top"
        class="askCall button"
        @click="call">电话客服</a>
    </mip-fixed>
  </div>
</template>

<style scoped>
h1 {
  margin: 0 auto;
  text-align: center;
}

.buttonWrap {
  width: 100%;
  height: 0.88rem;
  display: flex;
  justify-content: space-between;
}

.button {
  display: block;
  width: 100%;
  height: 0.88rem;
  line-height: 0.88rem;
  font-size: 0.3rem;
  text-align: center;
  border: none;
  outline: none;
  background: none;
}

.preButton {
  background-color: #fff;
  color: #585858;
}

.callButton {
  background: linear-gradient(
    90deg,
    rgba(255, 197, 0, 1),
    rgba(255, 164, 0, 1)
  );
  color: #fff;
}

.chatButton {
  background: linear-gradient(90deg, rgba(252, 150, 0, 1), rgba(248, 93, 0, 1));
  color: #fff;
}
.askCall {
  font-size: 0.3rem;
  text-align: center;
  border: none;
  outline: none;
  background: linear-gradient(90deg, rgba(252, 150, 0, 1), rgba(248, 93, 0, 1));
  color: #fff;
}
.bigImgCall {
  line-height: 0.7rem;
  border-radius: 0.04rem;
  width: 2.6rem;
  height: 0.7rem;
  padding: 0.15rem 0.4rem;
}
.reportButton {
  z-index: 9;
}
</style>

<script>
import { clickPoint } from '../../common/utils/stastic.js'
import '../../common/css/base.css'
import base from '../../common/utils/base.js'
import { requestFun } from '../../common/utils/reqUtils.js'
import {
  getLocalStorage,
  getCarId,
  getCityId
} from '../../common/utils/utils.js'
const pid = '/pages/detail'
const pidParams = '/pages/params'
const pidReport = '/pages/report'
export default {
  // source 1 :车辆详情 2 :参数配置页 3 大图 4 检测报告页
  props: {
    isBaiCheng: {
      type: String,
      default: ''
    },
    imUrl: {
      type: String,
      default: ''
    },
    source: {
      type: String,
      default: ''
    },
    carInfo: {
      type: Object,
      default: null
    },
    isShowButton: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      telPhone: '',
      isDirect: ''
    }
  },
  created () {
    base.setMediaBase()
  },
  mounted () {
    this.call()
    this.isDirect = getLocalStorage('isDirect')
    this.imUrl = this.imUrl
    // 不要删，此处是用于监听轮播图滚动的。。。。
    let vm = this
    this.$on('change', function (event) {
      vm.change(event)
    })
  },
  methods: {
    call () {
      // 详情页电话客服执行的方法
      requestFun('/ajax/common/get_tel_400', {
        method: 'POST',
        param: {
          carid: getCarId(),
          cityid: getCityId()
        }
      }).then(res => {
        this.telPhone = res.tel
        // this.$nextTick(() => {
        //   this.$refs.telPhone.click()
        //   // window.location.href = 'tel:' + this.telPhone
        // })
        if (this.source === '1') {
        // 详情页埋点
          clickPoint(
            'tel_consulting_detail',
            {
              carid: getCarId(),
              '400_num': res.tel,
              type: this.carInfo.is_zg_car, // 0为非直购，1为直购
              button: 2
            },
            null,
            {
              pid: pid
            }
          )
        } else if (this.source === '3') {
          // 大图埋点
          clickPoint(
            'tel_consulting_pic',
            {
              carid: getCarId(),
              '400_num': res.tel,
              type: this.isDirect // 0为非直购，1为直购
            },
            null,
            {
              pid: pid
            }
          )
        } else if (this.source === '4') {
          // 检测报告页
          clickPoint(
            'tel_consulting_examine',
            {
              carid: getCarId(),
              '400_num': res.tel
            },
            null,
            {
              pid: pidReport
            }
          )
        }
      })
    },
    showAsk () {
      if (this.isBaiCheng === '1') {
        clickPoint(
          'bottomprice_vehicle_detail',
          {
            carid: getCarId(),
            type: this.carInfo.is_zg_car // 0为非直购，1为直购
          },
          () => {
            MIP.viewer.open(this.imUrl, {
              isMipLink: false
            })
          },
          {
            pid: pid
          }
        )
      } else {
        this.$emit('showConsultingToast')
        clickPoint(
          'bottomprice_vehicle_detail',
          {
            carid: getCarId(),
            type: this.carInfo.is_zg_car // 0为非直购，1为直购
          },
          null,
          {
            pid: pid
          }
        )
      }
    },
    gotoIm () {
      if (this.source === '1') {
        clickPoint(
          'im',
          {
            carid: getCarId(),
            type: this.carInfo.is_zg_car // 0为非直购，1为直购
          },
          () => {
            MIP.viewer.open(this.imUrl, {
              isMipLink: false
            })
          },
          {
            pid: pid
          }
        )
      } else if (this.source === '2') {
        clickPoint(
          'im_config',
          {
            carid: getCarId(),
            type: this.isDirect // 0为非直购，1为直购
          },
          () => {
            MIP.viewer.open(this.imUrl, {
              isMipLink: false
            })
          },
          {
            pid: pidParams
          }
        )
      }
    },
    // 监听大图页滑动
    // 不要删，此处是用于监听轮播图滚动的。。。。
    change (event) {
      this.$emit('changeNum', event.currIndex)
    }
  }
}
</script>
