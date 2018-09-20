<template>
  <div>
    <!-- <mip-xin-loading v-if="showLoading" :show-mask="showMaskBack"></mip-xin-loading> -->
    <div class="certificationContent">
      <div class="bdline">
        <span class="car-file">优信认证</span>
        <!-- <button class="car-ask" @click="showAsk">服务咨询</button> -->
        <!-- <button class="car-ask"  on="tap:my-lightbox.open" id="btn-open" role="button" tabindex="0">服务咨询</button> -->
        <!-- <a
          ref="telPhone"
          :href="'tel:' + telPhone"/> -->
        <a
          v-if="status == 1"
          :href="'tel:' + telPhone"
          target="_top"
          class="car-ask"
          @click="askPrice">服务咨询</a>
      </div>
      <!-- <div class='car-set u-certified'> -->
      <div class="car-set-content">
        <div
          class="params-info"
          @click="certified('1')">
          <mip-img
            class="paramsIcon u-certified-img"
            src="//s3.xinstatic.com/static/newcar-m/widget/car_detail/uxin/img/icon1_09b4d50.png" />
          <div>
            <span class="u-certified-name ">30天包退</span>
          </div>
          <div
            v-if="showList == '1'"
            class="car-certification-choiced"/>
        </div>
        <div
          class="params-info"
          @click="certified('2')">
          <mip-img
            class="paramsIcon u-certified-img"
            src="//c2.xinstatic.com/f4/20180814/1853/5b72b4b882a0e565755.png" />
          <div>
            <span class="u-certified-name ">一年保修</span>
          </div>
          <div
            v-if="showList == '2'"
            class="car-certification-choiced"/>
        </div>
        <div
          class="params-info"
          @click="certified('3')">
          <mip-img
            class="paramsIcon u-certified-img"
            src="//c2.xinstatic.com/f4/20180814/1853/5b72b4b9088da186218.png" />
          <div>
            <span class="u-certified-name">315项排查</span>
          </div>
          <div
            v-if="showList == '3'"
            class="car-certification-choiced"/>
        </div>
        <div
          class="params-info"
          @click="certified('4')">
          <mip-img
            class="paramsIcon u-certified-img"
            src="//c2.xinstatic.com/f4/20180814/1853/5b72b4b9218ac500018.png" />
          <div>
            <span class="u-certified-name">全国联保</span>
          </div>
          <div
            v-if="showList == '4'"
            class="car-certification-choiced"/>
        </div>
      </div>
      <!-- </div> -->
      <!-- 30天保修 -->
      <div
        v-if="showList == '1'"
        class="car-exchange ">
        <div class="car-exchange-summarize">
          <span class="car-exchange-title">重大事故车 30天包退</span>
          <span class="car-exchange-subtitle">退车保障 让风险更可控</span>
        </div>
        <div class="car-certification-title">
          <span class="car-exchange-big ">重大事故车概括</span>
          <!-- <a :href="certUrl"> -->
          <div
            class="car-certification-message"
            @click="nextPage('big')">
            <span>详情</span>
            <div class="paramsArrow car-exchange-posi"/>
          </div>
          <!-- </a> -->
        </div>
        <div class="car-exchange-content">
          <div class="car-exchange-contentlist">
            <div class="car-exchange-font"/>
            <span class="car-exchange-value">发动机舱前尾板 纵梁及横梁 避震器塔座 ABC柱有修整或变形痕迹的</span>
          </div>
          <div class="car-exchange-contentlist">
            <div class="car-exchange-font"/>
            <span class="car-exchange-value">因撞击导致气囊弹出</span>
          </div>
          <div class="car-exchange-contentlist">
            <div class="car-exchange-font"/>
            <span class="car-exchange-value">水泡车、火烧车</span>
          </div>
        </div>
        <div class="car-exchange-process car-certification-title">
          <span class="car-exchange-big">退车流程</span>
          <!-- <a :href="certUrl"> -->
          <div
            class="car-certification-message"
            @click="nextPage('progress')">
            <span>详情</span>
            <div class="paramsArrow car-exchange-posi"/>
          </div>
          <!-- </a>-->
        </div>
        <div class="car-exchange-step">
          <div class="car-exchange-stepbox">
            <span class="car-exchange-stepno">①</span>
            <span class="car-exchange-steptitle">电话申诉</span>
            <span class="paramsArrow car-exchange-position"/>
          </div>
          <div class="car-exchange-stepbox">
            <span class="car-exchange-stepno">②</span>
            <span class="car-exchange-steptitle">车辆鉴定</span>
            <span class="paramsArrow car-exchange-position"/>
          </div>
          <div class="car-exchange-stepbox">
            <span class="car-exchange-stepno">③</span>
            <span class="car-exchange-steptitle">过户退款</span>
          </div>
        </div>
      </div>
      <!-- 一年保修 -->
      <div
        v-if="showList == '2'"
        class="car-exchange ">
        <div class="car-exchange-summarize">
          <span class="car-exchange-title">15大系统 1年或2万公里保修</span>
          <span class="car-exchange-subtitle">无忧售后 让用车更省心</span>
        </div>
        <div class="car-exchange-process car-certification-title">
          <span class="car-exchange-big">保修部件</span>
          <!--<a :href="certUrl"> -->
          <div
            class="car-certification-message"
            @click="nextPage('component')">
            <span>详情</span>
            <div class="paramsArrow car-exchange-posi"/>
          </div>
          <!-- </a> -->
        </div>
        <div class="car-unprofor-content">
          <div class="car-unprofor-box">
            <mip-img
              src="//s3.xinstatic.com/static/newcar-m/widget/car_detail/uxin/img/ic1_1f2ad13.png"
              class="car-unprofor-font"/>
            <span class="car-unprofor-desc">发动机系统</span>
          </div>
          <div class="car-unprofor-box">
            <mip-img
              src="//s2.xinstatic.com/static/newcar-m/widget/car_detail/uxin/img/ic2_42b3bbe.png"
              class="car-unprofor-font"/>
            <span class="car-unprofor-desc">变速箱系统</span>
          </div>
          <div class="car-unprofor-box">
            <mip-img
              src="//s1.xinstatic.com/static/newcar-m/widget/car_detail/uxin/img/ic3_2417ea4.png"
              class="car-unprofor-font"/>
            <span class="car-unprofor-desc">差速器系统</span>
          </div>
          <div class="car-unprofor-box">
            <mip-img
              src="//s3.xinstatic.com/static/newcar-m/widget/car_detail/uxin/img/ic4_eaee618.png"
              class="car-unprofor-font"/>
            <span class="car-unprofor-desc">分动箱系统</span>
          </div>
          <div class="car-unprofor-box">
            <mip-img
              src="//s2.xinstatic.com/static/newcar-m/widget/car_detail/uxin/img/ic5_e43ec78.png"
              class="car-unprofor-font"/>
            <span class="car-unprofor-desc">润滑系统</span>
          </div>
          <div class="car-unprofor-box">
            <mip-img
              src="//s5.xinstatic.com/static/newcar-m/widget/car_detail/uxin/img/ic6_bd0e738.png"
              class="car-unprofor-font"/>
            <span class="car-unprofor-desc">驱动系统</span>
          </div>
          <div class="car-unprofor-box">
            <mip-img
              src="//s2.xinstatic.com/static/newcar-m/widget/car_detail/uxin/img/ic7_6af55a2.png"
              class="car-unprofor-font"/>
            <span class="car-unprofor-desc">转向系统</span>
          </div>
          <div class="car-unprofor-box">
            <mip-img
              src="//s5.xinstatic.com/static/newcar-m/widget/car_detail/uxin/img/ic8_ccc6464.png"
              class="car-unprofor-font"/>
            <span class="car-unprofor-desc">制动系统</span>
          </div>
          <div class="car-unprofor-box">
            <mip-img
              src="//s6.xinstatic.com/static/newcar-m/widget/car_detail/uxin/img/ic9_7e34707.png"
              class="car-unprofor-font"/>
            <span class="car-unprofor-desc">悬挂系统</span>
          </div>
          <div class="car-unprofor-box">
            <mip-img
              src="//s5.xinstatic.com/static/newcar-m/widget/car_detail/uxin/img/ic10_02895f1.png"
              class="car-unprofor-font"/>
            <span class="car-unprofor-desc">燃油系统</span>
          </div>
          <div class="car-unprofor-box">
            <mip-img
              src="//s1.xinstatic.com/static/newcar-m/widget/car_detail/uxin/img/ic11_cbeb301.png"
              class="car-unprofor-font"/>
            <span class="car-unprofor-desc">冷却系统</span>
          </div>
          <div class="car-unprofor-box">
            <mip-img
              src="//s4.xinstatic.com/static/newcar-m/widget/car_detail/uxin/img/ic12_93505a6.png"
              class="car-unprofor-font"/>
            <span class="car-unprofor-desc">空调系统</span>
          </div>
          <div class="car-unprofor-box">
            <mip-img
              src="//s2.xinstatic.com/static/newcar-m/widget/car_detail/uxin/img/ic13_a8877ed.png"
              class="car-unprofor-font"/>
            <span class="car-unprofor-desc">安全系统</span>
          </div>
          <div class="car-unprofor-box">
            <mip-img
              src="//s1.xinstatic.com/static/newcar-m/widget/car_detail/uxin/img/ic14_4a7d986.png"
              class="car-unprofor-font"/>
            <span class="car-unprofor-desc">电控系统</span>
          </div>
          <div class="car-unprofor-box">
            <mip-img
              src="//s2.xinstatic.com/static/newcar-m/widget/car_detail/uxin/img/ic15_e77f88b.png"
              class="car-unprofor-font"/>
            <span class="car-unprofor-desc">电气系统</span>
          </div>
        </div>
        <div class="car-exchange-process car-certification-title">
          <span class="car-exchange-big">保修流程</span>
          <!-- <a :href="certUrl"> -->
          <div
            class="car-certification-message"
            @click="nextPage()">
            <span>详情</span>
            <div class="paramsArrow car-exchange-posi"/>
          </div>
          <!-- </a> -->
        </div>
        <div class="car-exchange-step">
          <div class="car-exchange-stepbox">
            <span class="car-exchange-stepno">①</span>
            <span class="car-exchange-steptitle">电话申诉</span>
            <span class="paramsArrow car-exchange-position"/>
          </div>
          <div class="car-exchange-stepbox">
            <span class="car-exchange-stepno">②</span>
            <span class="car-exchange-steptitle">确认保修费用</span>
            <span class="paramsArrow car-exchange-position"/>
          </div>
          <div class="car-exchange-stepbox">
            <span class="car-exchange-stepno">③</span>
            <span class="car-exchange-steptitle">服务保障</span>
          </div>
        </div>
      </div>
      <!-- 315项检查 -->
      <div
        v-if="showList == '3'"
        class="car-exchange">
        <div class="car-exchange-summarize">
          <span class="car-exchange-title">315项深度检测</span>
          <span class="car-exchange-subtitle">专业质检，让买车更放心</span>
        </div>
        <div>
          <span class="car-warranty-troubleshoot">由资深行业权威专家制定的315项全面深度检测，由经过专业培训，经验丰富的检测师严格执行检测项及流程，包括车辆外部检测，内部检测，重大事故损伤排查，涉水及火烧车排查，发动机室检测等，点滴细节，保障您的购车权益！</span>
        </div>
      </div>
      <!-- 全国联保 -->
      <div
        v-if="showList == '4'"
        class="car-exchange">
        <div class="car-exchange-summarize">
          <span class="car-exchange-title">保修服务遍布300+城市</span>
          <span class="car-exchange-subtitle">随时随地保修，让出行更自由</span>
        </div>
        <div>
          <span class="car-warranty-content">在全国300+城市，为每一台优信认证车辆随时随地提供专业优质的保修服务，让每一位优信认证车主畅行无忧。</span>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
// import xzh from 'xzh-sdk'
import { requestFun } from '../../common/utils/reqUtils'
import config from '../../common/utils/config'
import { clickPoint } from '../../common/utils/stastic.js'
import {
  getCarId,
  getCityId,
  getLocalStorage
} from '../../common/utils/utils.js'
// import { jsSdkCheck } from '../../common/utils/jsSdkCheck'
const pid = '/pages/detail'
// let context = null
export default {
  props: {
    isDirect: {
      type: Number,
      default: 0
    },
    status: {
      type: String,
      default: '1'
    },
    carid: {
      type: String,
      default: ''
    }
  },
  // props: ['isDirect', 'status', 'carid'],
  data () {
    return {
      showList: '1', // 优信认证显示flag
      telPhone: '', // 电话号码
      certUrl: ''
      // showLoading: false,
      // showMaskBack: false //是否显示loading的背景色
    }
  },
  mounted () {
    this.certUrl = config.mHost + `/car/iws/${decodeURIComponent(getLocalStorage('locationUrl'))}`
    this.askPrice()
  },
  methods: {
    // init () {
    //   if (!context) {
    //     context = Promise.resolve()
    //       .then(() => {
    //         return jsSdkCheck()
    //       })
    //       .then(data => {
    //         console.log(data)
    //         return xzh.init({
    //           data: {
    //             appid: data.appid,
    //             nonce_str: data.nonce_str,
    //             signature: data.sign,
    //             timestamp: data.timestamp,
    //             url: data.url
    //           }
    //         })
    //       })
    //   }
    //   return context
    // },
    async tel (tel) {
      try {
        // 获取400电话 逻辑
        // let context = await this.init()
        // let res = await xzh.tel({
        //   data: {
        //     tel: tel,
        //     sendData: {}
        //   },
        //   context
        // })
      } catch (err) {
        console.log(err)
      }
    },
    showAsk () {
      this.$emit('showConsultingToast')
    },
    // 优信认证切换
    certified (target) {
      this.showList = target
      clickPoint(
        'uxin_standard',
        {
          carid: this.carid,
          rank: target
        },
        null,
        {
          pid: pid
        }
      )
    },
    // 服务咨询
    askPrice () {
      // this.showLoading = true;
      let param = {
        carid: getCarId(),
        cityid: getCityId()
      }
      let that = this
      requestFun('/ajax/common/get_tel_400', {
        method: 'POST',
        param: param
      })
        .then(res => {
          // this.tel(res.tel);
          that.telPhone = res.tel
          // this.$nextTick(() => {
          //   // this.$refs.telPhone.click()
          //   window.location.href = 'tel:' + that.telPhone
          // })
          clickPoint(
            'tel_consulting_detail',
            {
              carid: this.carid,
              type: this.isDirect,
              '400_num': res.tel,
              button: 1
            },
            null,
            {
              pid: pid
            }
          )
        })
        .catch(err => {
          console.log(err)
        })
    },
    nextPage (key) {
      switch (key) {
        case 'big':
          clickPoint(
            'uxin_detail',
            {
              carid: this.carid,
              operation: 1
            },
            () => {
              MIP.viewer.open(
                config.mHost + `/car/iws/${decodeURIComponent(getLocalStorage('locationUrl'))}`,
                {
                  isMipLink: false
                }
              )
            },
            {
              pid: pid
            }
          )
          break
        case 'progress':
          clickPoint(
            'uxin_refund_detail',
            {
              carid: this.carid,
              operation: 1
            },
            () => {
              MIP.viewer.open(
                config.mHost +
                  `/service/refund_flow/${decodeURIComponent(getLocalStorage('locationUrl'))}`,
                {
                  isMipLink: false
                }
              )
            },
            {
              pid: pid
            }
          )
          break
        case 'component':
          clickPoint(
            'uxin_detail',
            {
              carid: this.carid,
              operation: 2
            },
            () => {
              MIP.viewer.open(
                config.mHost +
                  `/car/iws/${decodeURIComponent(getLocalStorage('locationUrl'))}#getzhibao`,
                {
                  isMipLink: false
                }
              )
            },
            {
              pid: pid
            }
          )
          break
        default:
          clickPoint(
            'uxin_refund_detail',
            {
              carid: this.carid,
              operation: 2
            },
            () => {
              MIP.viewer.open(
                config.mHost +
                  `/service/refund_flow/${decodeURIComponent(getLocalStorage('locationUrl'))}#getzhibao`,
                {
                  isMipLink: false
                }
              )
            },
            {
              pid: pid
            }
          )
      }
    }
  }
}
</script>
<style scoped>
.certificationContent {
  display: flex;
  flex-direction: column;
}

.bdline {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 0.01rem solid #f1f1f1;
  border-left: 0.04rem solid rgb(248, 93, 0);
}

.car-ask {
  font-size: 0.26rem;
  font-family: PingFangSC-Regular;
  color: rgba(88, 88, 88, 1);
  border-radius: 0.04rem;
  border: 0.01rem solid rgba(170, 170, 170, 1);
  padding: 0.12rem 0.2rem;
  margin-right: 0.36rem;
  background: none;
  outline: none;
}

.car-file {
  font-size: 0.34rem;
  height: 1.1rem;
  line-height: 1.1rem;
  color: #333333;
  font-weight: bold;
  margin-left: 0.36rem;
}

.u-certified {
  margin-top: 0.24rem;
}

.car-set-content {
  display: flex;
  /* justify-content: space-between; */
  padding-bottom: 0.4rem;
  padding-top: 0.4rem;
}

.params-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  /* margin-right: 0.6rem; */
}

.paramsIcon {
  width: 0.54rem;
  height: 0.56rem;
  margin-left: 0.45rem;
}

.u-certified-name {
  color: #585858;
  font-size: 0.26rem;
  height: 0.26rem;
}

.car-certification-choiced {
  width: 0.5rem;
  height: 0.06rem;
  background: linear-gradient(to right, #fc981b, #f65e02);
  margin-top: 0.2rem;
}

.u-certified-namecolor {
  color: #f85d00;
}

.u-certified-img {
  margin-bottom: 0.24rem;
  margin-left: 0rem;
}

.car-exchange {
  display: flex;
  flex-direction: column;
  padding-left: 0.58rem;
  padding-right: 0.58rem;
  background-color: #f9f9f9;
  padding-bottom: 0.6rem;
}

.car-exchange-summarize {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 0.76rem;
  padding-bottom: 0.28rem;
}

.car-certification-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.car-certification-message {
  display: flex;
}

.car-certification-message span {
  margin-right: 0.1rem;
  font-size: 0.26rem;
  font-family: PingFangSC-Regular;
  color: rgba(88, 88, 88, 1);
}

.u-triangle {
  width: 0.4rem;
  height: 0.4rem;
  margin-bottom: -0.11rem;
}

.u-triangle-big {
  margin-left: 0.74rem;
}

.paramsArrow {
  width: 0.14rem;
  height: 0.14rem;
  line-height: 1rem;
  transform: rotate(-315deg);
  border: solid #dbdada;
  border-width: 0.02rem 0.02rem 0 0;
}

.u-triangle-warranty {
  margin-left: 2.48rem;
}

.u-triangle-troubleshoot {
  margin-left: 4.3rem;
}

.u-triangle-unprofor {
  margin-left: 6.05rem;
}

.car-exchange-content {
  display: flex;
  flex-direction: column;
  margin-top: 0.2rem;
  margin-bottom: 0.3rem;
}

.car-exchange-contentlist {
  display: flex;
}

.car-exchange-posi {
  margin-top: 0.09rem;
  margin-right: 0.14rem;
}

.car-exchange-title {
  color: #1b1b1b;
  font-size: 0.34rem;
  font-weight: bold;
}

.car-exchange-subtitle {
  color: #848484;
  font-size: 0.26rem;
  margin-top: 0.16rem;
}

.car-exchange-big {
  font-size: 0.26rem;
  margin-right: 0.06rem;
  font-family: PingFangSC-Regular;
  color: rgba(88, 88, 88, 1);
}

.car-exchange-font {
  background-color: #f85d00;
  width: 0.1rem;
  height: 0.1rem;
  border-radius: 50%;
  margin-top: 0.2rem;
  margin-right: 0.22rem;
}

.car-exchange-value {
  color: #999999;
  font-size: 0.26rem;
  line-height: 0.5rem;
}

.car-exchange-process {
  margin-bottom: 0.2rem;
}

.car-exchange-step {
  display: flex;
  justify-content: space-between;
  /* margin-bottom: 0.6rem; */
}

.car-exchange-stepbox {
  display: flex;
  align-items: center;
}

.car-exchange-stepno {
  width: 0.3rem;
  /* height: 0.3rem; */
  color: #f85d00;
  margin-right: 0.14rem;
}

.car-exchange-steptitle {
  color: #848484;
  font-size: 0.26rem;
}

.car-exchange-position {
  margin-top: 0.05rem;
  margin-left: 0.34rem;
  margin-right: 0.04rem;
  color: #585858;
}

.car-warranty-content {
  color: #585858;
  width: 6.34rem;
  height: 1.11rem;
  font-size: 0.26rem;
}

.car-warranty-troubleshoot {
  color: #585858;
  width: 6.34rem;
  height: 1.85rem;
  font-size: 0.26rem;
}

.car-unprofor-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 0.2rem;
}

.car-unprofor-font {
  width: 0.38rem;
  height: 0.38rem;
  line-height: 0.3rem;
  margin-right: 0.12rem;
}

.car-unprofor-desc {
  color: #848484;
  font-size: 0.26rem;
  white-space: nowrap;
}

.car-unprofor-box {
  display: flex;
  align-items: center;
  padding-bottom: 0.41rem;
  width: 1.8rem;
}
</style>
