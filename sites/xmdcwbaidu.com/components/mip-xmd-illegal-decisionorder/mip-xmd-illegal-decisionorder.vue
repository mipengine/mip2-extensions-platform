<template>
  <div class="num-create-order">
    <!--<div v-if="isShowNoticeTip" id="headerTips">-->
    <!--<p><mip-img src="../../../../assets/images/tips.png" alt="">-->
    <!--<span v-html="tipContent"></span>-->
    <!--</p>-->
    <!--</div>-->
    <div class="ldf-normal-item">
      <span>违法信息</span>
    </div>
    <div class="dx-data-content">
      <div class="dx-data-content-box">
        <span>车牌号码</span>
        <span>{{ plateNumber }}</span>
      </div>
      <div class="dx-data-content-box">
        <span>违法地点</span>
        <span>{{ violationLocation }}</span>
      </div>
      <div class="dx-data-content-box">
        <span>违法时间</span>
        <span>{{ violationTime }}</span>
      </div>
      <div class="dx-data-content-box">
        <span>违法行为</span>
        <span>{{ violationBehavior }}</span>
      </div>
    </div>

    <div class="dx-pay-money">
      <div class="dx-data-content-box">
        <span>罚款金额</span>
        <span class="price">{{ fine }}元</span>
      </div>
      <div class="dx-data-content-box">
        <span>服务费</span>
        <span class="price">{{ fee }}元</span>
      </div>
      <div class="dx-data-content-box">
        <span>滞纳金</span>
        <span class="price">{{ overdue }}元</span>
      </div>
    </div>

    <div class="ldf-normal-item">
      <span>请补充线上代办所需的车主姓名资料</span>
    </div>
    <div class="input-container">
      <!--<mt-field label="车主姓名" :attr="{ maxlength:5 }" placeholder="请输入车主姓名" v-model="contactsSpot"></mt-field>-->
      <!--<mt-field label="车主手机号" :attr="{ maxlength:11 }" placeholder="请输入车主手机号" v-model="contactNumberSpot"></mt-field>-->
      <!--<mt-field label="验证码" :attr="{ maxlength:4 }" placeholder="请输入短信验证码" v-model="code" v-if="!isMember">-->
      <!--<div class="get-code-button" @click="getMsgCode">-->
      <!--<span>{{timerShow}}</span>-->
      <!--</div>-->
      <!--</mt-field>-->
      <a class="mint-cell mint-field">
        <div class="mint-cell-left"/>
        <div class="mint-cell-wrapper">
          <div class="mint-cell-title"><span class="mint-cell-text">车主姓名</span></div>
          <div class="mint-cell-value"><input
            v-model="contacts"
            placeholder="请输入车主姓名"
            type="text"
            class="mint-field-core"
            maxlength="5">
            <div
              class="mint-field-clear"
              style="display: none;"><i class="mintui mintui-field-error"/></div>
            <span class="mint-field-state is-default"><i class="mintui mintui-field-default"/></span>
            <div class="mint-field-other"/>
          </div>
        </div>
        <div class="mint-cell-right"/>
      </a>
      <a class="mint-cell mint-field">
        <div class="mint-cell-left"/>
        <div class="mint-cell-wrapper">
          <div class="mint-cell-title"><span class="mint-cell-text">车主手机号</span></div>
          <div class="mint-cell-value"><input
            v-model="mobile"
            placeholder="请输入车主手机号"
            type="text"
            class="mint-field-core"
            maxlength="11">
            <div
              class="mint-field-clear"
              style="display: none;"><i class="mintui mintui-field-error"/></div>
            <span class="mint-field-state is-default"><i class="mintui mintui-field-default"/></span>
            <div class="mint-field-other"/>
          </div>
        </div>
        <div class="mint-cell-right"/>
      </a>
      <a
        v-if="(!isMember)"
        class="mint-cell mint-field">
        <div class="mint-cell-left"/>
        <div class="mint-cell-wrapper">
          <div class="mint-cell-title"><span class="mint-cell-text">验证码</span></div>
          <div class="mint-cell-value"><input
            v-model="vCode"
            placeholder="请输入短信验证码"
            type="text"
            class="mint-field-core"
            maxlength="4">
            <div
              class="mint-field-clear"
              style="display: none;"><i class="mintui mintui-field-error"/></div>
            <span class="mint-field-state is-default"><i class="mintui mintui-field-default"/></span>
            <div
              class="mint-field-other"
              @click="countDown">
              <div class="get-code-button"><span v-text="showTime"/></div>
            </div>
          </div>
        </div>
        <div class="mint-cell-right"/>
      </a>
    </div>

    <div class="btn-container">
      <button
        class="mint-button ldf-mint-button mint-button--default mint-button--normal"
        @click="nextStep">
        <label class="mint-button-text">创建订单</label>
      </button>
    </div>
  </div>
</template>

<script>
import '../../common/less/common.less'
import {resetRem, Storage} from '../../common/utils/common'
import Reqs from '../../common/api/illegalApi'
import {Mtoast} from '../../common/utils/toast'
import {Mdialog} from '../../common/utils/dialog'
import {gConst} from '../../common/js/config'

export default {
  name: 'NumCreateOrder',
  data () {
    return {
      isShowNoticeTip: false,
      tipContent: '',

      illegals: {},

      plateType: '',

      plateNumber: '',
      violationLocation: '',
      violationTime: '',
      violationBehavior: '',
      fine: '',
      fee: '',
      overdue: '',

      isMember: false, // 是否为会员 默认为否

      contacts: '',
      mobile: '',
      vCode: '',
      showTime: '获取验证码',

      isOrdered: false // 是否已点击下单
    }
  },
  created () {
    resetRem()
  },
  mounted () {
    const self = this
    self.initData()
    // self.showTip();
  },
  methods: {
    initData () {
      const self = this
      const decisinNumInput = Storage.get('decisinNumInput') || null
      const decisinNumResult = Storage.get('decisinNumResult') || null
      const memberSimpleInfo = Storage.getSession('memberSimpleInfo') || null
      if (decisinNumInput) {
        self.plateType = decisinNumInput.plateType
      }
      if (decisinNumResult) {
        self.illegals = decisinNumResult.illegal
        self.plateNumber = decisinNumResult.illegal.plateNumber
        self.violationLocation = decisinNumResult.illegal.violationLocation
        self.violationTime = decisinNumResult.illegal.violationTime
        self.violationBehavior = decisinNumResult.illegal.violationBehavior
        self.fine = decisinNumResult.illegal.fine
        self.fee = decisinNumResult.fee
        self.overdue = decisinNumResult.illegal.overdue
      }
      if (memberSimpleInfo) {
        self.isMember = memberSimpleInfo.isMember
      }
    },
    nextStep () {
      const self = this
      if (self.inputCheck()) {
        return
      }
      if (self.isMember) {
        self.createDecisionOrder()
      } else {
        self.checkMsmCode()
      }
    },
    checkMsmCode () {
      const self = this
      const params = {
        mobile: self.mobile,
        code: self.vCode
      }
      Reqs.checkMsmCode(params).then(() => {
        self.createDecisionOrder()
      }).catch(() => {

      })
    },
    createDecisionOrder () {
      const self = this
      const Dialog = new Mdialog()
      if (self.isOrdered) {
        Dialog.open({
          message: '请勿重复点击下单'
        })
        return
      }
      const params = {
        plateNumber: self.plateNumber,
        plateType: self.plateType,
        // engine: window.localStorage.getItem('engine'), // 发动机号待定
        illegals: `[${JSON.stringify(self.illegals)}]`,
        mobile: self.mobile.replace(/[\s+]/g, ''),
        contacts: self.contacts.replace(/[\s+]/g, '')
      }
      Reqs.decisionCreatelllegalsOrder(params).then((data) => {
        self.isOrdered = true
        const decisionPayParams = {
          orderId: data.orderId, // 订单编号
          orderType: '1', // 订单类型
          totalFee: data.amount, // 订单金额
          orderName: data.orderName, // 订单名称
          beforeDiscount: parseFloat(self.fine) + parseFloat(self.fee) + parseFloat(self.overdue) // 打折前金额
        }
        Storage.set('decisionPayParams', decisionPayParams)
        MIP.viewer.open(gConst.BASE_URL_PAGE + 'mip-xmd-illegal-decisionpay.html')
      }).catch((err) => {
        if (err.code === 4301 || err.code === '4301') {
          Dialog.open({
            message: '该机动车订单已经存在，是否前往我的订单页面查看详情？',
            showCancelButton: true
          }, function (action) {
            if (action === 'confirm') {
              MIP.viewer.open(gConst.BASE_URL_PAGE + 'mip-my-order.html')
            }
          })
        } else {
          Dialog.open({
            message: err.msg || '网络异常'
          })
        }
      })
    },
    countDown: function () {
      let self = this
      const Toast = new Mtoast()
      if (!/^1[34578]\d{9}$/.test(self.mobile)) {
        Toast.open({
          message: '手机号输入有误,<br>请重新输入'
        })
        return true
      }
      if (/获取/.test(self.showTime)) {
        let startTime = (new Date()).getTime()
        let count = 0

        let timer = setInterval(function () {
          let now = (new Date()).getTime()
          count = 60 - Math.round((now - startTime) / 1000)
          self.showTime = count + 's'
          if (count <= 0) {
            clearInterval(timer)
            self.showTime = '重新获取'
            count = 0
          }
        }, 1000)
        let params = {
          mobile: self.mobile
        }
        Reqs.getMsmCode(params).then(function () {
          setTimeout(() => {
            Toast.open({
              message: '短信验证码已发送!'
            })
          }, 20)
        }, function () {
          clearInterval(timer)
          self.showTime = '重新获取'
        })
      }
    },
    inputCheck () {
      const self = this
      const Toast = new Mtoast()
      if (self.contacts.length < 2) {
        Toast.open({
          message: '车主姓名输入有误, <br>请重新输入'
        })
        return true
      }
      if (!/^1[345678]\d{9}$/.test(self.mobile)) {
        Toast.open({
          message: '手机号输入有误,<br>请重新输入'
        })
        return true
      }
      if (!self.isMember && self.vCode.length !== 4) {
        Toast.open({
          message: '验证码输入有误,<br>请重新输入'
        })
        return true
      }
      return false
    },
    showTip () {
      const self = this
      // status 1展示 0不展示
      const params = {
        business_tag: 'illegal_payment'
      }
      Reqs.getNoticeBar(params).then((data) => {
        if (!data.length) {
          return
        }
        data.forEach((val, index) => {
          if ((val.status === '1' || val.status === 1) && val.position_tag === 'NumCreateOrder_top') {
            self.isShowNoticeTip = true
            self.tipContent = val.content
          }
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
  @import "../../common/less/const";
  // @import "../../common/less/common.less";

  .num-create-order {
    .dx-data-content {
      padding: 12px 0;
      background-color: white;
      .dx-data-content-box {
        display: flex;
        justify-content: space-between;
        // padding: 0.3rem 0rem 0.3rem 0;
        min-height: 0.73rem;
        /*line-height: 0.73rem;*/
        margin-left: 0.3rem;
        margin-right: 0.3rem;
        text-align: left;
        span {
          font-size: 0.3rem;
          font-weight: 500;
        }
        & > span:last-child {
          max-width: 4rem;
        }
      }
    }
    .input-container {
      padding: 0 0.3rem;
      background-color: white;
      .mint-cell {
        .mint-cell-wrapper {
          padding: 0;
        }
        .mint-cell-title {

        }
      }
      .get-code-button {
        width: 1.72rem;
        height: 0.6rem;
        background: rgba(248, 248, 248, 1);
        border-radius: 0.06rem;
        border: 0.02rem solid #00ae70;
        text-align: center;
        line-height: 0.6rem;
        span {
          font-size: 0.26rem;
          font-family: PingFang-SC-Medium;
          color: rgba(0, 174, 112, 1);
        }
      }
    }
  }

  .num-create-order {
    .dx-pay-money {
      /*height: 2.6rem;*/
      background-color: white;
      .dx-data-content-box:first-child {
        border-top: 1px solid #f0f0f0;
      }
      .dx-data-content-box {
        display: flex;
        justify-content: space-between;
        // padding: 0.3rem 0.725rem 0.3rem 0.3rem;
        height: 0.9rem;
        line-height: 0.9rem;
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
  }

  .btn-container {
    margin-top: 0.52rem;
  }
</style>
