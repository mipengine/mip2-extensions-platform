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
            placeholder="请输入手机号码接收订单状态" >

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
            on="tap:info.login"
            @click="sendcode">获取验证码</span>
        </div>
        <!-- <div class="s4s-group" v-else>
                        <span class="s4s-group-tit">手机号码</span>
                        <span class="s4s-group-txt">{{this.phone ? this.phone : (this.user.Tel || '-')}}</span>
                        <p  @click="refillTelClick" class="s4s-group-btn">更换</p>
                    </div> -->

        <div
          v-if="canQuick"
          class="s4s-group">
          <span
            class="s4s-group-tit"
            style="width:auto;flex: 1;">2小时加急办理
            <span
              class="s4s-help"
              @click="openQ">
              ?
            </span>
          </span>
          <span
            class="s4s-group-txt"
            style="text-align:right;">
            <span
              :class="{'weui-switch-on' : quick}"
              class="weui-switch"
              @click="toggleQuick"/>
          </span>
        </div>
        <div class="s4s-group">
          <span class="s4s-group-tit">罚款金额</span>
          <span
            class="s4s-group-txt"
            style="color:#333">¥ {{ payForm&&payForm.money || 0 }}</span>
        </div>
        <div class="s4s-group">
          <span class="s4s-group-tit">滞纳金额</span>
          <span
            class="s4s-group-txt"
            style="color:#333">¥ {{ payForm&&payForm.late_free || 0 }}</span>
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
        <div
          v-if="canQuick&&quick"
          class="s4s-group">
          <span class="s4s-group-tit">加急费用</span>
          <span
            class="s4s-group-txt"
            style="color:#ff7a00">¥ {{ quickFee || 0 }}</span>
        </div>
      </div>
      <a
        ref="newWebpay"
        href="#"/>
      <div class="agree-container" >
        <p><mip-img
          v-show="!agree"
          src="https://s4s-imges.oss-cn-hangzhou.aliyuncs.com/xiongzhang/disagree.png"
          width="22"
          height="22"
          @click="goAgree" />
          <mip-img
            v-show="agree"
            src="https://s4s-imges.oss-cn-hangzhou.aliyuncs.com/xiongzhang/agree.png"
            width="22"
            height="22"
            @click="goAgree" />
          我同意
          <a
            data-type="mip"
            href="agreement.html"
            style="color: #666666;text-decoration:underline" >《服务协议》</a>
          <!-- <span style="color: #666666;text-decoration:underline" @click="gotoAgreement">《服务协议》</span> -->
          中的说明</p>
      </div>
      <div style="height:.6rem;"/>
      <mip-fixed type="bottom">
        <div class="pay-contaienr">
          <div class="pay-contaienr-first">
            <p class="pay-contaienr-p1">合计金额：<span class="pay-contaienr-num">¥ {{ (((Number(payForm.money) * 100 + Number(payForm.late_free)* 100 + Number(payForm.own_free)* 100 + ( canQuick?quick?Number(quickFee) * 100:0:0) ) || 0) / 100).toFixed(2) }}</span></p>
            <p class="pay-contaienr-p2" >
              {{ canQuick
                ? quick
                  ?'预计2小时内办理完成'
                  :'预计24小时内办理完成'
                :'预计24小时内办理完成'
              }}
            </p>
          </div>
          <div
            id="pay2btn"
            :class="agree?'pay-contaienr-last' :'pay-contaienr-last disabled-btn'"
            on="tap:pay2.pay2event" >
            立即办理
          </div>
        </div>
      </mip-fixed>
      <mip-fixed type="top">
        <div
          v-if="showQ"
          class="s4s-mask"
          @click="closeMake">
          <div class="quick-container">
            <div class="quick-title">温馨提示</div>
            <div class="quick-item"><span class="quick-num">1</span><div>勾选“2小时加急”选项，我们将在<span style="color:#FE7000;" >2小时</span>内缴纳罚款至银行。</div></div>
            <div class="quick-item"><span class="quick-num">2</span><div>未勾选“2小时加急”选项，我们将在<span style="color:#FE7000;" >24小时</span>内缴纳罚款至银行。</div></div>
            <div class="quick-btn" >我知道了</div>
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
      agree: true,
      btntext: '获取验证码',
      isTrueCode: false,
      cansend: true,
      canQuick: false,
      quickFee: 0,
      showQ: false,
      quick: false
    }
  },
  watch: {
    code (val) {
      let tel = /^1\d{10}$/
      if (!this.cansend && val.length === 4 && tel.test(this.phone)) {
        this.testCode()
      }
    }
  },
  prerenderAllowed () {
    return true
  },
  mounted () {
    this.$on('customError', event => {
      // window.localStorage.clear()
      util.toast('登陆失败')
      // this.$emit('loginAgain')
      // this.$refs.index.click()
    })

    MIP.viewer.fixedElement.init()
    let me = this
    this.$on('pay2event', event => {
      console.log('pay2event')
      me.payFee()
    })

    if (this.globalData && this.globalData.orderNumber) {
      try {
        window.localStorage.setItem(
          'pay2Data',
          JSON.stringify(this.globalData)
        )
      } catch (error) {
        util.toast('由于您处在无痕模式，不能存储您当前的记录')
      }
    } else {
      try {
        let globalData = window.localStorage.getItem('pay2Data')
        if (globalData && JSON.parse(globalData)) {
          this.globalData = JSON.parse(globalData)
        }
      } catch (error) {
        util.toast('由于您处在无痕模式，不能载入您之前输入的记录')
      }
    }

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

    this.getFee()
  },
  methods: {
    closeMake () {
      this.showQ = false
    },
    openQ () {
      this.showQ = true
    },
    toggleQuick () {
      this.quick = !this.quick
    },
    getFee () {
      let param = {
        notice_num: this.globalData.orderNumber,
        fine: Number(this.globalData.price) * 100 + '',
        vio_time: this.globalData.date
      }
      let self = this
      util.fetchData('v3/violation/fee', param).then(res => {
        if (res.code === 0) {
          self.payForm.own_free = Number(res.data.OwnFree) / 100
          self.payForm.late_free = Number(res.data.LateFree) / 100
          self.canQuick = res.data.Quick
          self.quickFee = Number(res.data.Qfee) / 100
        } else {
          util.toast(res.msg)
        }
      })
    },
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
            util.toast('发送成功')
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
      let totalPrice =
        Math.round(price) +
        Math.round(this.payForm.own_free * 100) +
        Math.round(this.payForm.late_free * 100)
      let param = {
        source: 'xzapp',
        fine: price + '', // 罚金
        ownFree:
          (this.payForm.own_free
            ? Math.round(this.payForm.own_free * 100)
            : 0) + '', // 服务费
        lateFree:
          (this.payForm.late_free
            ? Math.round(this.payForm.late_free * 100)
            : 0) + '', // 滞纳金
        totalPrice: totalPrice + '', // 总金额
        notice_num: this.orderNumber.replace(/\s/g, '') || '', // 文书号
        vio_time: this.payForm.renfa_time
          ? this.payForm.renfa_time.slice(0, 10)
          : '', // 文章时间：格式：2017-12-13
        img_url: this.payForm.ticketUrl || '', // 罚单连接
        carno: this.payForm.car_no ? this.payForm.car_no : '',
        mobile: this.phone ? this.phone : window.localStorage.UserTelAll,
        name: this.payForm.name || '', // 罚款人
        drive_no: this.payForm.drive_no || '' // 驾驶证号
      }
      if (this.canQuick && this.quick) {
        // 如果加急
        param.totalPrice = totalPrice + Math.round(this.quickFee * 100) + ''
        param.urge = 1
        param.qfee = this.quickFee * 100
        totalPrice = param.totalPrice
      }
      util.fetchData('v3/violation/web/order/create', param).then(res => {
        if (res.code === 0) {
          MIP.setData({
            payConfig: {
              fee: totalPrice / 100,
              sessionId: window.localStorage.getItem(
                'mip-login-xzh:sessionId:https://mys4s.cn/v3/nc/auth?source=xzapp'
              ),
              postData: {
                order_id: res.data + ''
              },
              redirectUrl:
                'https://mys4s.cn/static/vio/xz/success.html?orderId=' +
                res.data
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
  margin-top: 0.1rem;
  background: #fff;
  padding: 0 0.15rem;
  padding-top: 0.25rem;
}
.s4s-group mip-img {
  width: 0.2rem;
  height: 0.2rem;
}
.s4s-sum {
  margin: 0.2rem 0.1rem 0 0.1rem;
  -webkit-box-flex: 1;
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  flex: 1;
  -webkit-flex: 1;
  -ms-box-flex: 1;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -moz-box-align: center;
  -webkit-box-align: center;
  text-align: left;
  font-size: 0.15rem;
  color: #50b0de;
}
.s4s-sum span {
  color: #f40;
  padding-right: 0.05rem;
}

.s4s-close {
  width: 0.35rem;
  height: 0.35rem;
  margin: 1.25rem auto 0 auto;
}
.s4s-order-container {
  background-color: #fff;
  padding: 0.15rem;
  padding-top: 0.25rem;
}
.s4s-order-title {
  font-size: 0.2rem;
  color: #474245;
  font-weight: bold;
}

.s4s-order-input {
  border: 0.01rem solid #eeeeee;
  border-radius: 0.04rem;
  padding: 0.06rem 0.1rem;
  margin-top: 0.1rem;
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
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
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  flex: 1;
  -webkit-flex: 1;
  -ms-box-flex: 1;
  background: #3388ff;
  margin: 0;
  height: 0.25rem;
  line-height: 0.25rem;
}
.s4s-order-mip-img-container {
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  align-items: center;
  -moz-box-align: center;
  -webkit-box-align: center;
  -webkit-justify-content: space-around;
  justify-content: space-around;
  -moz-box-pack: space-around;
  -webkit-box-pack: space-around;
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
  max-width: 0.11rem;
  height: 0.2rem;
  -webkit-box-flex: 1;
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  flex: 1;
  -webkit-flex: 1;
  -ms-box-flex: 1;
}
.s4s-order-content {
  font-size: 0.13rem;
  color: #636363;
}
.s4s-order-content span {
  text-decoration: underline;
}
.agree-container {
  font-size: 0.15rem;
  color: #999999;
}
.agree-container p {
  padding: 0.15rem;
}
.agree-container mip-img {
  vertical-align: bottom;
  margin-right: 0.12rem;
}

.s4s-group {
  position: relative;
  line-height: 0.15rem;
  border-bottom: 0.01rem #eaeaea solid;
  color: #666;
  overflow: hidden;
  align-items: center;
  display: flex;
  padding: 0.15rem 0;
  box-sizing: content-box;
}
.s4s-group-tit {
  font-size: 0.15rem;
  width: 0.9rem;
  line-height: 0.25rem;
  padding-top: 0.025rem;
}
.s4s-group-txt {
  font-size: 0.15rem;
  color: #777;
  text-align: right;
}
.s4s-group input {
  border: none;
  font-size: 0.15rem;
  text-align: left;
  line-height: 0.25rem;
  flex: 1;
}
select {
  font-size: 0.15rem;
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
  border-radius: 0.04rem;
  height: 0.5rem;
  color: #474245;
  font-size: 0.18rem;
  font-weight: 400;
  line-height: 0.5rem;
  padding: 0 0.15rem;
  margin-top: 0.15rem;
}
.s4s-order-text {
  color: #fe7000;
  font-size: 0.12rem;
  margin-top: 0.15rem;
}
.s4s-title {
  font-size: 0.2rem;
  /* padding: .15rem; */
  /* padding-top: 0.25rem; */
  font-weight: bold;
}
.code-btn,
.code-btn-disable {
  color: #fe5c00;
  background-color: #fff;
  border: 0;
  border-radius: 0.03rem;
  font-size: 0.14rem;
  border: 0.01rem solid #ff7b00;
  padding: 0.05rem 0.075rem;
  line-height: 0.2rem;
  position: absolute;
  right: 0;
  top: 50%;
  margin-top: -0.15rem;
}
.code-btn-disable {
  opacity: 0.5;
}

.pay-contaienr {
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  width: 100%;
  background: #fff;
}

.pay-contaienr-first {
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  flex: 1;
  -webkit-flex: 1;
  font-size: 0.16rem;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -moz-box-orient: vertical;
  -moz-box-direction: normal;
  flex-direction: column;
  -webkit-flex-direction: column;
  -webkit-justify-content: center;
  justify-content: center;
  -moz-box-pack: center;
  -webkit-box-pack: center;
  -moz-box-pack: center;
  padding: 0 0.1rem;
}

.pay-contaienr-num {
  color: #fe7000;
  font-size: 0.2rem;
  font-weight: bold;
}

.pay-contaienr-p1 {
  color: #000;
  font-size: 0.17rem;
}
.pay-contaienr-p2 {
  color: #999;
  font-size: 0.11rem;
}

.pay-contaienr-last {
  width: 1.2rem;
  background-image: linear-gradient(40deg, #ff7c00 0%, #fe5a00 100%);
  text-align: center;
  line-height: 0.5rem;
  font-size: 0.18rem;
  font-weight: 300;
  color: #fff;
}

.disabled-btn {
  color: #999;
  background: #e6e6e6 !important;
}
input::-webkit-input-placeholder,
textarea::-webkit-input-placeholder {
  color: #ccc;
}
input:-moz-placeholder,
textarea:-moz-placeholder {
  color: #ccc;
}
input::-moz-placeholder,
textarea::-moz-placeholder {
  color: #ccc;
}
input:-ms-input-placeholder,
textarea:-ms-input-placeholder {
  color: #ccc;
}
.weui-switch {
  display: inline-block;
  position: relative;
  width: 52px;
  height: 32px;
  border: 1px solid #dfdfdf;
  outline: 0;
  border-radius: 16px;
  box-sizing: border-box;
  background-color: #dfdfdf;
  transition: background-color 0.1s, border 0.1s;
  cursor: pointer;
}
.weui-switch:before {
  content: " ";
  position: absolute;
  top: 0;
  left: 0;
  width: 50px;
  height: 30px;
  border-radius: 15px;
  background-color: #fdfdfd;
  transition: transform 0.35s cubic-bezier(0.45, 1, 0.4, 1);
}
.weui-switch:after {
  content: " ";
  position: absolute;
  top: 0;
  left: 0;
  width: 30px;
  height: 30px;
  border-radius: 15px;
  background-color: #ffffff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
  transition: transform 0.35s cubic-bezier(0.4, 0.4, 0.25, 1.35);
}
.weui-switch-on {
  border-color: #1aad19;
  background-color: #1aad19;
}
.weui-switch-on:before {
  border-color: #1aad19;
  background-color: #1aad19;
}
.weui-switch-on:after {
  transform: translateX(20px);
}

.quick-container {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  background: #fff;
  border-radius: 0.05rem;
  width: 75%;
}
.quick-btn {
  text-align: center;
  color: #4f7eff;
  font-size: 0.14rem;
  padding: 0.16rem 0 0.13rem;
  margin-top: 0.21rem;
  border-top: 0.01rem solid #eaeaea;
}
.quick-item {
  display: flex;
  margin: 0 0.18rem 0.15rem 0.2rem;
  color: #6f6f6f;
}
.quick-num {
  font-size: 0.15rem;
  color: #fff;
  background: #d8d8d8;
  border-radius: 50%;
  line-height: 0.185rem;
  width: 0.185rem;
  display: inline-block;
  margin-right: 0.06rem;
  height: 0.19rem;
  min-width: 0.19rem;
  text-align: center;
  flex: 1;
  margin-right: 0.065rem;
}
.quick-title {
  font-size: 0.16rem;
  font-weight: bold;
  margin: 0.21rem auto 0.125rem;
  text-align: center;
}
.s4s-mask {
  height: 100%;
  height: 100vh;
  z-index: 101;
  background-color: rgba(0, 0, 0, 0.3);
}
.s4s-help {
  border-radius: 50%;
  border: 0.02rem solid #fe7000;
  color: #fe7000;
  font-size: 0.13rem;
  height: 0.2rem;
  min-width: 0.2rem;
  line-height: 0.18rem;
  text-align: center;
  font-weight: bold;
  display: inline-block;
}
</style>
