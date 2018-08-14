<template>
  <div class="num-pay">

    <!-- <div v-if="info.isLogin">hi，{{ info.userInfo.aliasname }}，欢迎回来！<span
      style="color:#f00;"
      on="tap:log.logout">退出</span></div>
    <div v-else>你没有<span
      style="color:#f00;"
      on="tap:log.login"
    >登录</span>哦。</div> -->

    <div class="welcome">
      <div class="img-box">
        <mip-img src="../static/img/hg.png"/>
      </div>
      <p
        v-if="!isMember"
        class="text-1">恭喜成为小优车务会员</p>
      <p class="text-2">下单后凭手机号码可至各渠道查询本人订单信息</p>
    </div>

    <div class="ldf-normal-item">
      <span>扣分资料</span>
    </div>
    <div class="dx-pay-money">
      <div class="dx-data-content-box">
        <span v-text="('粤'+plateNumber)"/>
        <span
          style="color: #333333"
          class="price">{{ allCount }} 笔</span>
      </div>
    </div>
    <div class="ldf-normal-item">
      <span>支付金额</span>
    </div>

    <div class="dx-pay-money">
      <div class="dx-data-content-box">
        <span>罚款金额</span>
        <span class="price">{{ allPayOrder }}元</span>
      </div>
      <div class="dx-data-content-box">
        <span>服务费</span>
        <span class="price">{{ allServeFee }}元</span>
      </div>
      <div class="dx-data-content-box">
        <span>滞纳金</span>
        <span class="price">{{ allOverdue }}元</span>
      </div>
      <div class="dx-data-content-box ">
        <span>优惠券</span>
        <span class="dx-field-icon">
          无优惠券可选
          <i class="icon iconfont icon-forward"/>
        </span>
      </div>
      <div class="dx-data-content-box">
        <span style="font-weight: bold;">车主卡优惠</span>
        <!--<span style="font-weight: bold;" class="price">{{allPayOrder + allFee + allOverdue}}元</span>-->
        <span
          style="font-weight: bold;"
          class="price">{{ discountFee }}元</span>
      </div>
      <div class="dx-data-content-box">
        <span style="font-weight: bold;">实付金额</span>
        <!--<span style="font-weight: bold;" class="price">{{allPayOrder + allFee + allOverdue}}元</span>-->
        <span
          style="font-weight: bold;"
          class="price">{{ totalFee }}元</span>
      </div>
    </div>

    <div class="btn-container">
      <button
        class="mint-button ldf-mint-button mint-button--default mint-button--normal"
        @click.stop="toPay()" >
        <label class="mint-button-text">确定支付</label>
      </button>
    </div>
  </div>
</template>

<script>
import { resetRem, Storage } from '../../common/utils/common'
import '../../common/less/common.less'

export default {
  name: 'NumPay',
  props: {
    info: {
      type: Object,
      required: true
    },
    config: {
      type: Object,
      required: true
    },
    payConfig: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      isMember: false,
      plateNumber: '',
      allCount: '',
      allPay: 0, // 打折前金额
      discountFee: 0, // 车主卡优惠金额
      totalFee: '', // 打折后, 创建订单返回
      illegalPayParams: {} // 支付所需参数
    }
  },
  created () {
    resetRem()
  },
  mounted () {
    const self = this

    // 自定义login事件
    this.$element.customElement.addEventAction('login', event => {
      // 这里可以输出登录之后的数据
      console.log('用户信息', event)
      MIP.setData({
        payConfig: {
          sessionId: event.sessionId
        }
      })
      Storage.set('apitoken', event.userInfo.apitoken)
    })
    // 自定义exit事件
    this.$element.customElement.addEventAction('exit', event => {
      console.log('登出了')
    })

    self.initData()
  },
  methods: {
    initData () {
      const self = this
      const memberSimpleInfo = Storage.getSession('memberSimpleInfo') || null
      const illegalPayParams = Storage.get('illegalPayParams') || null
      const illegalMsgData = Storage.get('illegalMsgData') || null
      const illegalIndexInput = Storage.get('illegalIndexInput') || null
      if (memberSimpleInfo) {
        self.isMember = memberSimpleInfo.isMember
      }
      if (illegalPayParams && illegalMsgData) {
        self.illegalPayParams = illegalPayParams
        self.totalFee = illegalPayParams.totalFee // 创建订单返回实际付金额(打折后)

        self.allPayOrder = illegalMsgData.allPayOrder
        self.allPay = illegalMsgData.allPay // 违章列表页 打折前费用
        self.allServeFee = illegalMsgData.allServeFee
        self.allOverdue = illegalMsgData.allOverdue
        self.allCount = illegalMsgData.allCount

        self.discountFee = self.allPay - self.totalFee
      }
      if (illegalIndexInput) {
        self.plateNumber = illegalIndexInput.plateNumber
      }
    },
    toPay () {
      let self = this
      let apitoken = Storage.get('apitoken')
      MIP.setData({
        payConfig: {
          fee: self.illegalPayParams.totalFee,
          subject: self.illegalPayParams.orderName,
          postData: {
            orderId: self.illegalPayParams.orderId,
            orderType: self.illegalPayParams.orderType,
            orderName: self.illegalPayParams.orderName,
            apitoken: apitoken
          }
        }
      })
      self.$emit('actionpay')
    }
    /* onBridgeReady (data) {
        const self = this
        console.log(data)
        WeixinJSBridge.invoke('getBrandWCPayRequest', {
          appId: data.params.appId, // 熊掌号名称，由商户传入
          timeStamp: data.params.timeStamp, // 时间戳，自1970年以来的秒数
          nonceStr: data.params.nonceStr, // 随机串
          package: data.params.packageValue,
          signType: data.params.signType, // 微信签名方式:
          paySign: data.params.paySign // 微信签名
        }, (res) => {
          console.log(res)
          if (res.err_msg === 'get_brand_wcpay_request:ok') {
            self.$router.push({ name: 'PaySuccess' }) // 可在此设置跳转到支付成功页面
          } else if (res.err_msg === 'get_brand_wcpay_request:cancel') {
            // alert('您的支付已取消!')
            // MessageBox({
            //   message: '您的支付已取消!'
            // })
            MessageBox.confirm('您的支付已取消,是否前往我的订单页面？').then((action) => {
              window.sessionStorage.setItem('selected', 'notpay')
              // self.$router.push({ name: 'MyOrder' })
              // window.location.href = process.env.BASE_API + 'login/xmd/icbc_rongE/myOrder/auth'
              self.$router.push({ name: 'MyOrder' })
            })
          } else {
            // alert('支付失败！请稍后再试！')
            MessageBox({
              message: '支付失败！请稍后再试！'
            })
          }
        })
      } */
  }
}
</script>

<style lang="less" scoped>
  @import "../../common/less/const";
  // @import "../../common/less/common.less";

  .num-pay {
    .welcome {
      margin-top: 8px;
      width: 100%;
      background: #fff;
      line-height: 0.48rem;
      padding: 0.2rem 0;
      font-size: 16px;
      .img-box {
        width: 0.8rem;
        height: 0.8rem;
        margin: 0 auto;
        img {
          width: 100%;
          height: 100%;
        }
      }
      p {
        text-align: center;
      }
    }
    .dx-data-content {
      background-color: white;
      .dx-data-content-box {
        display: flex;
        justify-content: space-between;
        height: 0.73rem;
        line-height: 0.73rem;
        margin-left: 0.3rem;
        margin-right: 0.3rem;
        span {
          font-size: 0.3rem;
          font-weight: 500;
        }
      }
    }
  }
  .num-pay {
    .dx-pay-money {
      background-color: white;
      .dx-data-content-box {
        display: flex;
        justify-content: space-between;
        height: 0.75rem;
        line-height: 0.75rem;
        border-bottom: 1px solid #f0f0f0;
        margin-left: 0.3rem;
        margin-right: 0.3rem;
        span {
          font-size: 0.3rem;
          font-weight: 500;
        }
        .price {
          color: #ff3a3a;
        }
        .dx-field-icon {
          color: #d2d2d2;
        }
      }
    }
    .btn-container {
      margin-top: 0.4rem;
    }
  }
</style>
