<template>
    <div class="s4s-page">
        <div class="s4s-body" style="margin-bottom:.7rem">
            <div class="s4s-order-container" >
                <p class="s4s-order-title">处罚决定书编号</p>
               <div class="s4s-order-ready">
                    <div class="s4s-order-onum">
                        {{orderNumber}}
                    </div>
                    <p class="s4s-order-text">处罚决定书编号、车牌号和处罚人为办单依据，请咨询核对！</p>
                </div>
            </div>
                <div  class="s4s-pay-body">
                    <div class="s4s-title">
                        罚单信息
                    </div>
                    <div class="s4s-group"  v-if="payForm.name">
                        <span class="s4s-group-tit">被处罚人</span>
                        <span class="s4s-group-txt" >{{ payForm&&payForm.name}}</span>
                    </div>
                    <div class="s4s-group" v-if="payForm.car_no">
                        <span class="s4s-group-tit">车牌号码</span>
                         <span class="s4s-group-txt">{{payForm&&payForm.car_no|| '-'}}</span>
                    </div>
                    <div class="s4s-group" v-if="payForm.drive_no">
                        <span class="s4s-group-tit">驾驶证号</span>
                         <span class="s4s-group-txt">{{payForm&&payForm.drive_no|| '-'}}</span>
                    </div>
                    <div class="s4s-group" v-if="!this.user.Tel || refillTel">
                        <span class="s4s-group-tit">手机号码</span>
                        <div class="s4s-group-txt">
                            <input type="text" v-model="phone" placeholder="请输入手机号码" />
                        </div>
                    </div>
                    <div class="s4s-group" v-if="!this.user.Tel || refillTel">
                        <span class="s4s-group-tit">验证码</span>
                        <input type="text" v-model="code" placeholder="请输入短信校验码" />
                        <span v-if ="!cansend" style="background-color: #fff; color: #666;border:0;border-radius:3px;margin-left:5px;font-size:0.13rem"  disabled>{{btntext}}</span>
                        <span type="button" v-show="btnenable && cansend" @click="sendcode" class="s4s-group-btn">发送验证码</span>
                    </div>
                    <div class="s4s-group" v-else>
                        <span class="s4s-group-tit">手机号码</span>
                        <span class="s4s-group-txt">{{this.phone ? this.phone : (this.user.Tel || '-')}}</span>
                        <p  @click="refillTelClick" class="s4s-group-btn">更换</p>
                    </div>
                    <div class="s4s-group">
                        <span class="s4s-group-tit">罚款金额</span>
                        <span  class="s4s-group-txt" style="color:#ff7a00">¥ {{payForm&&payForm.money || 0}}</span>
                    </div>
                    <div class="s4s-group">
                        <span class="s4s-group-tit">滞纳金额</span>
                        <span class="s4s-group-txt" style="color:#ff7a00">¥ {{ payForm&&payForm.late_free || 0 }}</span>
                    </div>
                    <div class="s4s-group">
                        <span class="s4s-group-tit">服务费用</span>
                        <!-- <span style="width:auto;color:#959595;font-size:0.14rem;margin-right:0.10rem" v-if="payForm&&payForm.money && payForm.money > 0">已优惠5元</span> -->
                        <!-- <span style="width:auto;color:#f6f6f6;text-decoration:line-through;margin-right:0.15rem" v-if="payForm&&payForm.money && payForm.money > 0">¥ {{ payForm.own_free + 5 || 5 }}</span> -->
                        <span class="s4s-group-txt" style="color:#ff7a00" >¥ {{ payForm&&payForm.own_free || 0 }}</span>
                        <!-- <span>{{ ((ownFree || 0) / 100).toFixed(2) }}</span> 元 滞纳金：<span>{{ ((lateFree || 0) / 100).toFixed(2) }}</span> 元 -->
                    </div>
                </div>
            <a href="#" ref="newWebpay"></a>
             <div class="agree-container" >
                <p><mip-img src="https://s4s-imges.oss-cn-hangzhou.aliyuncs.com/xiongzhang/disagree.png" v-show="!agree" width="25" height="25" @click="goAgree" ></mip-img>
                <mip-img src="https://s4s-imges.oss-cn-hangzhou.aliyuncs.com/xiongzhang/agree.png" v-show="agree" width="25" height="25" @click="goAgree" ></mip-img>
                我同意
                <a data-type="mip" href="agreement.html" style="color: #666666;text-decoration:underline" >《服务协议》</a>
                <!-- <span style="color: #666666;text-decoration:underline" @click="gotoAgreement">《服务协议》</span> -->
                中的说明</p>
            </div>
            <div class="pay-contaienr">
                <div>
                    <p>合计金额：<span>¥ {{ (((price * 100 + ownFree * 100 + lateFree * 100) || 0) / 100).toFixed(2) }}</span></p>
                    <p>预计1-5个工作日办理完成 </p>
                </div>
                <div :class="agree?'' :'disabled-btn'" @click="payFee" >
                    <button > 立即办理</button>
                </div>
            </div>
            <!-- <button v-if="user.Tel && !refillTel" class="s4s-btn" @click="payFee"> 支付金额{{ (((Number(payForm.money) * 100 + Number(payForm.late_free)* 100  + Number(payForm.own_free)* 100 ) || 0) / 100).toFixed(2) }}元 | 立即办理 </button> -->
            <div class="s4s-mask" @click="closeMake" v-if="openShow">
                <mip-img :src="src" ></mip-img>
            </div>
            <div class="s4s-mask-pay" @click="closePay" v-if="showpay">
                <p>请扫码付款</p>
                <mip-img :src="paysrc" ></mip-img>
            </div>
        </div>
    </div>
</template>

<script>
import util from '../../common/util';

export default {
   props: {
    globalData: {
      type: Object,
      default() {
        return {};
      },
      required: true
    },
  },
    data() {
        return {
            code: '',
            phone: '',
            user: {},
            orderNumber:  '',
            payForm:{},
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
            agree:false,
        }
    },
    mounted() {
      if(this.globalData){
        this.orderNumber = this.globalData.orderNumber
        this.payForm = {
              money: this.globalData.price || '',
              renfa_time: this.globalData.date || '',
              late_free: this.globalData.lateFree || '',
              own_free: this.globalData.ownFree || '',
              name: this.globalData.nick,
              car_no: this.globalData.nickCarNo || '',
              ticketUrl: this.globalData.ticketUrl || '',
              drive_no: this.globalData.drive_no || '',
          }
      }
    },
    methods: {
      goAgree(){
        this.agree = !this.agree
      },
        // 服务协议
        gotoAgreement() {
           MIP.viewer.open('agreement.html');
        },
        refillTelClick() {
          this.refillTel = true
          this.phone = ''
        },
        // 支付
        payFee() {
          if(this.agree)this.GenerateOrders();
        },
         openCode() {
            this.openShow = true;
            this.src = 'https://s4s-mip-imges.oss-cn-hangzhou.aliyuncs.com/mip-img/notice@3x.png';
        },
        closeMake() {
            this.openShow = false;
        },
        closePay() {
            this.showpay = false
            clearInterval(this.timer)
        },
    }
}
</script>

<style scoped>

.s4s-pay-body {
    margin-top: 10px;
    background: #fff;
    padding: 0 15px;
    padding-top:20px;
}
.s4s-group mip-img {
    width: 20px;
    height: 20px;
}
.s4s-sum {
    margin: 20px 10px 0 10px;
    -webkit-box-flex: 1;
        -ms-flex: 1;
            flex: 1;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
    text-align: left;
    font-size: 15px;
    color: #50B0DE;
}
.s4s-sum span {
    color: #f40;
    padding-right: 5px;
}
.s4s-pop {
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 9999;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    width: 300px;
    margin-top: -50px;
    margin-left: -150px;
}
.s4s-pop-body {
    background-color: #fff;
    border-radius: 4px;
    padding: 10px;
    position: absolute;
}
.s4s-pop-title {
    background: rgba(37,170,255,0.90);
    border-radius: 20px;
    height: 35px;
    line-height: 35px;
    text-align: center;
    color: #fff;
    font-size: 17px;
    position: relative;
    z-index: 9999;
}
.s4s-pop-bg {
    /* background: #fff url(https://s4s-imges.oss-cn-hangzhou.aliyuncs.com/xiongzhang/help.png) no-repeat .02rem .04rem / 100% 100%; */
    width: 100px;
    height: 100px;
    border-radius: 100px;
    position: absolute;
    left: 50%;
    top: -55px;
    margin-left: -50px;
    z-index: 99;
}
.s4s-close {
    width: 35px;
    height: 35px;
    margin: 125px auto 0 auto;
}
.s4s-order-container{
    background-color:#fff;
    padding:15px;
    padding-top: 21px;
}
.s4s-order-title{
    font-size: 20px;
    color:#474245;
    font-weight: bold;
}

.s4s-order-input{
    border: 1px solid #EEEEEE;
    border-radius: 4px;
    padding: 6px 10px;
    margin-top:10px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
}
.s4s-order-ready{
    
}
.s4s-order-input input{
   height: auto;
    -webkit-box-flex: 4;
    -ms-flex: 4;
        flex: 4;
        
}
.s4s-order-input span{
    -webkit-box-flex: 1;
    -ms-flex: 1;
        flex: 1;
    background: #3388FF;
    margin:0;
    height: .25rem;
    line-height: .25rem;
}
.s4s-order-mip-img-container{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin: .2rem 0 ;
}
.s4s-order-mip-img-container .pic{
        max-width: .57rem;
        height: .62rem;
            -webkit-box-flex: 3;
    -ms-flex: 3;
        flex: 3;
        
}
.s4s-order-mip-img-container .arr{
        max-width: 11px;
        height: 20px;
            -webkit-box-flex: 1;
    -ms-flex: 1;
        flex: 1;
}
.s4s-order-content{
    font-size: 13px;
    color:#636363;
}
.s4s-order-content span{
    text-decoration: underline;
}
.s4s-select-date{
    border: none;
    color:#666;
    -webkit-box-flex: none;
    -ms-flex: none;
        flex: none;
}

.agree-container{
    font-size: 15px;
    color:#999999;
}
.agree-container p{
    padding: 15px;
}
.agree-container mip-img{
        vertical-align: bottom;
}

.pay-contaienr{
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fff;
}
.pay-contaienr>div:first-child{
    flex:1;
    font-size: 16px;
        display: flex;
    flex-direction: column;
    justify-content: center;
        padding: 0 10px;
}
.pay-contaienr span {
    color:#FE7000;
}
.pay-contaienr button {
    color:#fff;
    font-size: 18px;
    font-weight: 300;
}
.pay-contaienr p:last-child{
    color:#999;
    font-size: 11px;
}
.pay-contaienr>div:last-child{
    width:120px;
    background-image: linear-gradient(40deg, #FE5A00 0%, #FF7C00 100%);
    text-align: center;
    line-height: 50px;
    font-size: 18px;
}
.pay-contaienr .disabled-btn{
    background: #E6E6E6!important;
}
.pay-contaienr .disabled-btn button{
    color: #999999;
}
.s4s-group {
  height: 32px;
  border-bottom: 1px rgba(0, 0, 0, 0.1) solid;
  color: #666;
  overflow: hidden;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
      padding: 15px 0px;
  box-sizing: content-box;
}
.s4s-group-tit {
  font-size: 15px;
  width: 90px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}
.s4s-group-txt {
  font-size: 15px;
  color: #777;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
}
.s4s-group input {
  border: none;
  font-size: 15px;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  text-align: left;
}
select {
  font-size: 15px;
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
.s4s-order-onum{
  background:#f5f5f5;
  border-radius:4px;
  height: 50px;
  color:#474245;
  font-size:18px;
  font-weight:400;
  line-height:50px;
  padding:0 15px;
  margin-top:15px;
}
.s4s-order-text{
    color:#FE7000;
    font-size:12px;
    margin-top:15px;
}
.s4s-title{
  font-size:20px;
  /* padding-top: 15px; */
}
</style>
