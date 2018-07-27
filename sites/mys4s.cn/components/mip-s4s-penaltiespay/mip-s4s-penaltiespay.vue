<template>
  <div class="s4s-page">
    <div
      class="s4s-body"
      style="margin-bottom:.7rem">
      <div class="s4s-order-container" >
        <p class="s4s-order-title">处罚决定书编号</p>
        <div class="s4s-order-ready">
          <div class="s4s-order-onum">
            {{ orderNumber }}
          </div>
          <p class="s4s-order-text">处罚决定书编号、车牌号和处罚人为办单依据，请咨询核对！</p>
        </div>
      </div>
      <div class="s4s-pay-body">
        <div class="s4s-title">
          罚单信息
        </div>
        <div
          v-if="payForm.name"
          class="s4s-group">
          <span class="s4s-group-tit">被处罚人</span>
          <span class="s4s-group-txt" >{{ payForm&&payForm.name }}</span>
        </div>
        <div
          v-if="payForm.car_no"
          class="s4s-group">
          <span class="s4s-group-tit">车牌号码</span>
          <span class="s4s-group-txt">{{ payForm&&payForm.car_no|| '-' }}</span>
        </div>
        <div
          v-if="payForm.drive_no"
          class="s4s-group">
          <span class="s4s-group-tit">驾驶证号</span>
          <span class="s4s-group-txt">{{ payForm&&payForm.drive_no|| '-' }}</span>
        </div>
        <div class="s4s-group">
          <span class="s4s-group-tit">手机号码</span>
          <input
            v-model="phone"
            type="text"
            maxlength="11"
            style="width:auto;max-width:3rem;min-width:1.05rem"
            placeholder="请输入手机号码" >

        </div>
        <div class="s4s-group">
          <span class="s4s-group-tit" >验证码</span>
          <input
            v-model="code"
            type="text"
            maxlength="4"
            placeholder="请输入短信验证码" >
          <span
            v-show="!cansend"
            type="button"
            class="code-btn-disable"
            disabled>{{ btntext }}</span>
          <span
            v-show="cansend"
            type="button"
            class="code-btn"
            @click="sendcode">获取验证码</span>
        </div>
        <!-- <div class="s4s-group" v-else>
                        <span class="s4s-group-tit">手机号码</span>
                        <span class="s4s-group-txt">{{this.phone ? this.phone : (this.user.Tel || '-')}}</span>
                        <p  @click="refillTelClick" class="s4s-group-btn">更换</p>
                    </div> -->
        <div class="s4s-group">
          <span class="s4s-group-tit">罚款金额</span>
          <span
            class="s4s-group-txt"
            style="color:#ff7a00">¥ {{ payForm&&payForm.money || 0 }}</span>
        </div>
        <div class="s4s-group">
          <span class="s4s-group-tit">滞纳金额</span>
          <span
            class="s4s-group-txt"
            style="color:#ff7a00">¥ {{ payForm&&payForm.late_free || 0 }}</span>
        </div>
        <div class="s4s-group">
          <span class="s4s-group-tit">服务费用</span>
          <!-- <span style="width:auto;color:#959595;font-size:0.14rem;margin-right:0.10rem" v-if="payForm&&payForm.money && payForm.money > 0">已优惠5元</span> -->
          <!-- <span style="width:auto;color:#f6f6f6;text-decoration:line-through;margin-right:0.15rem" v-if="payForm&&payForm.money && payForm.money > 0">¥ {{ payForm.own_free + 5 || 5 }}</span> -->
          <span
            class="s4s-group-txt"
            style="color:#ff7a00" >¥ {{ payForm&&payForm.own_free || 0 }}</span>
            <!-- <span>{{ ((ownFree || 0) / 100).toFixed(2) }}</span> 元 滞纳金：<span>{{ ((lateFree || 0) / 100).toFixed(2) }}</span> 元 -->
        </div>
      </div>
      <a
        ref="newWebpay"
        href="#"/>
      <div class="agree-container" >
        <p><mip-img
          v-show="!agree"
          src="https://s4s-imges.oss-cn-hangzhou.aliyuncs.com/xiongzhang/disagree.png"
          width="25"
          height="25"
          @click="goAgree" />
          <mip-img
            v-show="agree"
            src="https://s4s-imges.oss-cn-hangzhou.aliyuncs.com/xiongzhang/agree.png"
            width="25"
            height="25"
            @click="goAgree" />
          我同意
          <a
            data-type="mip"
            href="agreement.html"
            style="color: #666666;text-decoration:underline" >《服务协议》</a>
          <!-- <span style="color: #666666;text-decoration:underline" @click="gotoAgreement">《服务协议》</span> -->
          中的说明</p>
      </div>
      <mip-fixed type="bottom">
        <div class="pay-contaienr">
          <div>
            <p>合计金额：<span>¥ {{ (((Number(payForm.money) * 100 + Number(payForm.late_free)* 100 + Number(payForm.own_free)* 100 ) || 0) / 100).toFixed(2) }}</span></p>
            <p>预计1-5个工作日办理完成 </p>
          </div>
          <div
            :class="agree?'' :'disabled-btn'"
            @click="payFee" >
            <span> 立即办理</span>
          </div>
        </div>
      </mip-fixed>
    </div>
  </div>
</template>

<script>
import util from '../../common/util'

export default {
  props: {
    globalData: {
      type: Object,
      default () {
        return {}
      },
      required: true
    }
  },
  data () {
    return {
      code: '',
      phone: '',
      user: {},
      orderNumber: '',
      payForm: {},
      canTryToPay: true,
      searchAgain: false,
      openShow: false,
      src: '',
      paysrc: '',
      showpay: false,
      timer: null,
      out_trade_no: '',
      payType: 'alipay',
      system: {},
      agree: false,
      btntext: '获取验证码',
      isTrueCode: false,
      cansend: true
    }
  },
  watch: {
    code (val) {
      let tel = /^1\d{10}$/
      if (!this.cansend && val.length === 4 && tel.test(this.phone)) this.testCode()
    }
  },
  mounted () {
    if (this.globalData) {
      this.orderNumber = this.globalData.orderNumber
      this.payForm = {
        money: this.globalData.price || '',
        renfa_time: this.globalData.date || '',
        late_free: this.globalData.lateFree || '',
        own_free: this.globalData.ownFree || '',
        name: this.globalData.nick,
        car_no: this.globalData.nickCarNo || '',
        ticketUrl: this.globalData.ticketUrl || '',
        drive_no: this.globalData.drive_no || ''
      }
    }
  },
  methods: {
    testCode () {
      util
        .fetchData('v5/user/login', {
          tel: this.phone,
          code: this.code,
          no_token: true
        })
        .then(res => {
          if (res.code === 0) {
            this.isTrueCode = true
            util.toast('验证成功')
          } else {
            util.toast(res.msg)
          }
        })
    },
    sendcode () {
      let tel = /^1\d{10}$/
      if (!this.phone) {
        util.toast('请输入手机号码')
        return
      } else if (!tel.test(this.phone)) {
        util.toast('输入手机号码有误')
        return
      }
      this.cansend = false
      this.leftTime = 60
      this.btntext = this.leftTime + 's后重发'
      this.timer = setInterval(this.enableResend, 1000)
      util
        .fetchData('v5/user/code', { tel: this.phone })
        .then(res => {
          if (res.code === 0) {
            util.toast(res.data)
          } else {
            util.toast(res.msg)
          }
        })
        .catch(function (e, xhr, response) {
          util.toast('发送验证码失败，请重试')
          clearInterval(this.timer)
          this.cansend = true
          this.btn = true
        })
    },
    enableResend () {
      this.btntext = this.leftTime-- + 's后重发'
      if (this.leftTime === 0) {
        this.cansend = true
        clearInterval(this.timer)
        this.btntext = '发送验证码'
      }
    },
    goAgree () {
      this.agree = !this.agree
    },
    // 服务协议
    gotoAgreement () {
      MIP.viewer.open('agreement.html')
    },
    refillTelClick () {
      this.refillTel = true
      this.phone = ''
    },
    // 支付
    payFee () {
      if (!this.agree) {
        return
      }
      // let drivenoReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
      let telReg = /^1[3|4|5|6|7|8|9][0-9]{9}$/
      if (!this.user.Tel) {
        if (!telReg.test(this.phone)) {
          util.toast('请输入正确的手机号码')
          return
        }
      }
      if (!this.isTrueCode) {
        util.toast('手机号码未验证')
        return
      }
      // let carno = this.provice + this.carno
      let price = Number(this.payForm.money * 100)
      let totalPrice = Math.round(price) + Math.round(this.payForm.own_free * 100) + Math.round(this.payForm.late_free * 100)
      let param = {
        'source': 'xzapp',
        fine: price + '', // 罚金
        ownFree: (this.payForm.own_free ? Math.round(this.payForm.own_free * 100) : 0) + '', // 服务费
        lateFree: (this.payForm.late_free ? Math.round(this.payForm.late_free * 100) : 0) + '', // 滞纳金
        totalPrice: totalPrice + '', // 总金额
        notice_num: this.orderNumber.replace(/\s/g, '') || '', // 文书号
        vio_time: this.payForm.renfa_time ? this.payForm.renfa_time.slice(0, 10) : '', // 文章时间：格式：2017-12-13
        img_url: this.payForm.ticketUrl || '', // 罚单连接
        carno: this.payForm.car_no ? this.payForm.car_no : '',
        mobile: this.phone ? this.phone : window.localStorage.UserTelAll,
        name: this.payForm.name || '', // 罚款人
        drive_no: this.payForm.drive_no || ''// 驾驶证号
      }
      util.fetchData('v3/violation/web/order/create', param).then(res => {
        if (res.code === 0) {
          MIP.setData({
            payConfig: {
              fee: totalPrice / 100,
              sessionId: window.localStorage.getItem('mip-login-xzh:sessionId:https://mys4s.cn/v3/nc/auth?source=xzapp'),
              postData: {
                order_id: res.data + ''
              }
            }
          })
          this.$emit('canpay', {})
        } else {
          util.toast(res.msg)
        }
      })
    }
  }
}
</script>

<style scoped>
.s4s-pay-body {
  margin-top: .1rem;
  background: #fff;
  padding: 0 .15rem;
  padding-top: .2rem;
}
.s4s-group mip-img {
  width: .2rem;
  height: .2rem;
}
.s4s-sum {
  margin: .2rem .1rem 0 .1rem;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  text-align: left;
  font-size: .15rem;
  color: #50b0de;
}
.s4s-sum span {
  color: #f40;
  padding-right: .05rem;
}

.s4s-close {
  width: .35rem;
  height: .35rem;
  margin: 1.25rem auto 0 auto;
}
.s4s-order-container {
  background-color: #fff;
  padding: .15rem;
  padding-top: .21rem;
}
.s4s-order-title {
  font-size: .2rem;
  color: #474245;
  font-weight: bold;
}

.s4s-order-input {
  border: .01rem solid #eeeeee;
  border-radius: .04rem;
  padding: .06rem .1rem;
  margin-top: .1rem;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}

.s4s-order-input input {
  height: auto;
  -webkit-box-flex: 4;
  -ms-flex: 4;
  flex: 4;
}
.s4s-order-input span {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  background: #3388ff;
  margin: 0;
  height: 0.25rem;
  line-height: 0.25rem;
}
.s4s-order-mip-img-container {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 0.2rem 0;
}
.s4s-order-mip-img-container .pic {
  max-width: 0.57rem;
  height: 0.62rem;
  -webkit-box-flex: 3;
  -ms-flex: 3;
  flex: 3;
}
.s4s-order-mip-img-container .arr {
  max-width: .11rem;
  height: .2rem;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
}
.s4s-order-content {
  font-size: .13rem;
  color: #636363;
}
.s4s-order-content span {
  text-decoration: underline;
}
.agree-container {
  font-size: .15rem;
  color: #999999;
}
.agree-container p {
  padding: .15rem;
}
.agree-container mip-img {
  vertical-align: bottom;
}

.pay-contaienr {
  display: flex;
  width: 100%;
  background: #fff;
}
.pay-contaienr > div:first-child {
  flex: 1;
  font-size: .16rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 .1rem;
}
.pay-contaienr span {
  color: #fff;
    font-size: .18rem;
  font-weight: 300;
}
.pay-contaienr p:last-child {
  color: #999;
  font-size: .11rem;
}
.pay-contaienr > div:last-child {
  width: 1.2rem;
  background-image: linear-gradient(40deg, #fe5a00 0%, #ff7c00 100%);
  text-align: center;
  line-height: .5rem;
  font-size: .18rem;
}
.pay-contaienr .disabled-btn {
  background: #e6e6e6 !important;
}
.pay-contaienr .disabled-btn span {
  color: #999999;
}
.s4s-group {
  height: .32rem;
  border-bottom: .01rem rgba(0, 0, 0, 0.1) solid;
  color: #666;
  overflow: hidden;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  padding: .15rem 0;
  box-sizing: content-box;
}
.s4s-group-tit {
  font-size: .15rem;
  width: .9rem;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}
.s4s-group-txt {
  font-size: .15rem;
  color: #777;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
}
.s4s-group input {
  border: none;
  font-size: .15rem;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  text-align: left;
}
select {
  font-size: .15rem;
}
.s4s-group input:focus,
.s4s-group select:focus {
  border: none;
  outline: none;
  padding: 0;
}
.s4s-group:last-child {
  border: none;
}
.s4s-order-onum {
  background: #f5f5f5;
  border-radius: .04rem;
  height: .5rem;
  color: #474245;
  font-size: .18rem;
  font-weight: 400;
  line-height: .5rem;
  padding: 0 .15rem;
  margin-top: .15rem;
}
.s4s-order-text {
  color: #fe7000;
  font-size: .12rem;
  margin-top: .15rem;
}
.s4s-title {
  font-size: .2rem;
  /* padding-top: .15rem; */
}
.code-btn, .code-btn-disable{
  color: #FE5C00;
  background-color: #fff;
  border:0;
  border-radius:.03rem;
  font-size:0.14rem;
  border:.01rem solid #FF7B00;
  padding: .05rem .075rem;
}
.code-btn-disable {
  opacity: 0.5;
}
</style>
