<template>
  <div class="num-create-order">
    <div
      v-if="isVerifySelf"
      class="ldf-normal-item">
      <span>含扣分违章，只能扣除车主本人分数</span>
    </div>
    <div
      v-if="isVerifySelf"
      class="input-container">
      <a class="mint-cell mint-field">
        <div class="mint-cell-left"/>
        <div class="mint-cell-wrapper">
          <div class="mint-cell-title"><span class="mint-cell-text">驾驶证号</span></div>
          <div class="mint-cell-value"><input
            v-model="drivingLicnse"
            placeholder="请输入车主本人驾驶证号扣分"
            type="text"
            class="mint-field-core"
            maxlength="18">
            <div
              class="mint-field-clear"
              style="display: none;"><i class="mintui mintui-field-error"/></div>
            <span class="mint-field-state is-default"><i class="mintui mintui-field-default"/></span>
            <div class="mint-field-other"/>
          </div>
        </div>
        <div class="mint-cell-right"/>
    </a></div>
    <div class="ldf-normal-item">
      <span>请补充线上代办所需的车主姓名资料</span>
    </div>
    <div class="input-container">
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
    <div class="ldf-remind-tip">
      <p>1. 如对违章真实性有异议, 可先通过违章当地交警大队进行查询, 建议核实后再进行支付。</p>
      <p>2. 如有违章需扣分, 则按照违章对应的违章代码进行扣分处罚, 请慎重选择需要办理的违章。</p>
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

      plateNumber: '',
      plateType: '',
      engine: '',
      drivingLicnse: '',

      isMember: false, // 是否为会员 默认为否

      contacts: '',
      mobile: '',
      vCode: '',
      showTime: '获取验证码',

      isVerifySelf: false, // 是否需要验证本人本车
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
      const illegalIndexInput = Storage.get('illegalIndexInput') || null
      const illegalChosenArr = Storage.get('illegalChosenArr') || null
      const memberSimpleInfo = Storage.getSession('memberSimpleInfo') || null

      if (illegalIndexInput && illegalChosenArr) {
        self.plateNumber = illegalIndexInput.plateNumber
        self.plateType = illegalIndexInput.plateType
        self.engine = illegalIndexInput.engine
        self.illegals = illegalChosenArr
      }

      if (memberSimpleInfo) {
        self.isMember = memberSimpleInfo.isMember
      }

      self.isVerifySelfCar()
    },
    isVerifySelfCar () {
      const self = this
      self.illegals.forEach((val, index) => {
        console.log('illegalChosenArr', val)
        if (val.violationPoints > 0 && val.type !== 9 && val.type !== '9') {
          self.isVerifySelf = true
        }
      })
    },
    nextStep () {
      const self = this
      if (self.inputCheck()) {
        return
      }
      if (self.isVerifySelf) {
        // 需要验证本人本车或
        self.checkOwnVehicle()
      } else {
        self.createIllegalOrder()
      }
    },
    checkOwnVehicle () {
      let self = this
      const Dialog = new Mdialog()

      let params = {
        plateNumber: `粤${self.plateNumber}`,
        plateType: self.plateType
      }
      if (self.isVerifySelf) {
        params.driverLicense = self.drivingLicnse.replace(/[\s+]/g, '')
      }

      Reqs.checkOwnVehicle(params).then(function (data) {
        if (typeof (data.error) !== 'undefined' && data.error === '驾驶证不存在') {
          Dialog.open({
            message: '驾驶证不存在!'
          })
          return
        } else if (!data.privateCar) {
          Dialog.open({
            message: '只能办理私家车!'
          })
          return
        } else if (!data.ownCar) {
          Dialog.open({
            message: '非本人车,无法办理!'
          })
          return
        } else if (data.score + data.orderScore + parseInt(window.sessionStorage.getItem('allIllegalPoints')) > 11) {
          Dialog.open({
            message: '<p style="font-size:0.7rem">驾照剩余分数不足，请重新选择办理数量</p><p style="font-size:0.6rem;color:#a6a6a6;">我的车库绑定驾照，清分提醒不愁不忘</p>'
          })
          return
        } else if (!data.drivingLicenseValid) {
          Dialog.open({
            message: '驾驶证状态异常,无法办理!'
          })
          return
        } else if (!data.drivingLicenseMobileCheck) {
          Dialog.open({
            message: '登记手机不正常,无法办理!'
          })
          return
        }

        if (self.isMember) {
          self.createIllegalOrder()
        } else {
          self.checkMsmCode()
        }
      }, function () {

      })
    },
    checkMsmCode () {
      const self = this
      const params = {
        mobile: self.mobile,
        code: self.vCode
      }
      Reqs.checkMsmCode(params).then(() => {
        self.createIllegalOrder()
      }).catch(() => {

      })
    },
    createIllegalOrder () {
      const self = this
      const Dialog = new Mdialog()
      if (self.isOrdered) {
        Dialog.open({
          message: '请勿重复点击下单'
        })
        return
      }
      const params = {
        plateNumber: `粤${self.plateNumber}`,
        plateType: self.plateType,
        drivingLicnse: self.drivingLicnse.replace(/[\s+]/g, ''),
        engine: self.engine,
        illegals: JSON.stringify(self.illegals),
        mobile: self.mobile.replace(/[\s+]/g, ''),
        contacts: self.contacts.replace(/[\s+]/g, '')
      }
      Reqs.createlllegalsOrder(params).then((data) => {
        self.isOrdered = true
        const illegalPayParams = {
          orderId: data.orderId, // 订单编号
          orderType: '1', // 订单类型
          totalFee: data.amount, // 订单金额
          orderName: data.orderName // 订单名称
        }
        Storage.set('illegalPayParams', illegalPayParams)
        MIP.viewer.open(gConst.BASE_URL_PAGE + 'mip-xmd-illegal-pay.html')
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
      if (self.isVerifySelf && self.drivingLicnse.length < 15) {
        Toast.open({
          message: '驾驶证号输入有误, <br>请重新输入'
        })
        return true
      }
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
    .ldf-remind-tip {
      margin: 22px 0 58px 0;
      padding: 0 0.3rem;
      p {
        margin-bottom: 6px;
        // color: @color-text-l;
        // font-size: @font-small;
        font-size: 0.24rem;
        color: #2e2e2e;
        font-weight: 500;
        // line-height: 16px;
        line-height: 1.5;
        margin-left: 13px;
        text-indent: -13px;
        text-align: justify;
        text-justify: inter-ideograph;
      }
    }
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

  .btn-container {
    margin-top: 0.52rem;
  }
</style>
