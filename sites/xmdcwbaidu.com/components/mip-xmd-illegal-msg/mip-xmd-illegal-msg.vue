<template>
  <div class="illegal-page">
    <div class="illegal-title">
      <div>
        <p>
          <span>待处理</span>
          <span>{{ handlingNumber }}</span>条
        </p>
      </div>
      <!-- <div>
        <p>
          <span>保险：</span>
          <span>已过期</span>
        </p>
      </div> -->
      <!-- <div v-if="!matchExemptingInspection && handlingNumber == 0" @click="goPage('six')">
         <p>
           <span>年检：</span>
           <span v-if="overdueStatus == 1">即将过期</span>
           <span v-if="overdueStatus == 0">已过期</span>
         </p>
       </div>
       <div v-if="!matchExemptingInspection && handlingNumber == 0">
         <span class="ldf-field-icon">
           <i class="icon iconfont icon-forward"></i>
         </span>
       </div>-->
    </div>

    <div
      v-if="isShowNoticeTip"
      class="ldf-business-tips">
      <p>
        <mip-img
          layout="container"
          src="../static/img/business-tips.png"
          alt=""/>
      </p>
      <p v-html="tipContent"/>
    </div>

    <div class="illegal-msg">
      <!--<mt-tab-container>-->
      <div class="mint-tab-container-item">
        <div
          v-for="(item) in allIllegals"
          :key="item.decisionNumber"
          :class="{'item-disable':item.illegal_status === -1 || item.illegal_status === '-1'}"
          class="illegal-item">
          <div class="item-content-con">
            <div
              class="item-content"
              @click.stop="clickItem(item.decisionNumber,item.illegal_status,item)">
              <div class="content-left">
                <p v-text="item.violationBehavior"/>
                <p v-text="item.violationTime"/>
                <p v-text="item.violationLocation"/>
              </div>
              <div
                v-if="(item.illegal_status === 3 || item.illegal_status === '3')"
                class="content-right2">
                <span>
                  办理中
                </span>
              </div>
              <div
                v-if="(item.illegal_status === -1 || item.illegal_status === '-1')"
                class="content-right2">
                <span>
                  暂不可办理
                </span>
              </div>
              <div
                v-if="(item.illegal_status === 0 || item.illegal_status === '0')"
                class="content-right">
                <span>
                  <input
                    :id="item.decisionNumber"
                    :value="item.decisionNumber"
                    v-model="illegalChosen"
                    class="input_check"
                    type="checkbox">
                  <label
                    :for="item.decisionNumber"
                    @click.self.prevent/>
                </span>
                <div class="item-mask"/>
              </div>

            </div>
            <div class="item-msg">
              <div>
                <p>
                  <span>罚款</span>
                  <span>
                    <span v-text="item.fine"/>元
                  </span>
                </p>
              </div>
              <div>
                <p>
                  <span>扣</span>
                  <span>
                    <span v-text="item.violationPoints"/>分
                  </span>
                </p>
              </div>
              <div>
                <p>
                  <span>服务费</span>
                  <span>
                    <span v-text="serveFee"/>元
                  </span>
                </p>
              </div>
              <div>
                <p>
                  <span>滞纳金</span>
                  <span>
                    <span v-text="item.overdue"/>元
                  </span>
                </p>
              </div>

            </div>
          </div>
        </div>

        <div
          v-show="!!noIllegalShow"
          class="noIllegal">
          <div class="up">
            <div class="img-box">
              <mip-img src="../static/img/zan744@2x.png"/>
            </div>
            <div class="text">
              <p>恭喜你</p>
              <p>没有新的违章~!</p>
            </div>
          </div>

        </div>
      </div>
    </div>

    <div class="pay-banner">
      <div class="pay">
        <div
          style="display: none"
          class="content-right is-allchosen"
          @click="toChosenALL()">
          <span>
            <input
              id="chosenALL"
              v-model="chosenALL"
              class="input_check"
              type="checkbox"
              value="chosenALL">
            <label
              for="chosenALL"
              @click.self.prevent/>
          </span>
          <div class="item-mask"/>
        </div>
        <div
          style="margin-left: 20px"
          class="pay-all">
          <div>
            <p>
              <span>共</span>
              <span>
                <span v-text="allPay"/>元
              </span>
            </p>
          </div>
          <div>
            <p>
              <span>扣</span>
              <span>
                <span v-text="allIllegalPoints"/>分
              </span>
            </p>
          </div>
          <div>
            <p>
              <span
                class="ldf-num"
                v-text="illegalChosen.length"/>
              <span>
                笔
              </span>
            </p>
          </div>
        </div>
        <div
          class=""
          @click="handleAtOnce">
          <p>立即办理</p>
        </div>
      </div>
    </div>

    <!-- <div v-if="info.isLogin">hi，{{ info.userInfo.aliasname }}，欢迎回来！<span
      style="color:#f00;"
      on="tap:log.logout">退出</span></div>
    <div v-else>你没有<span
      style="color:#f00;"
      on="tap:log.login"
    >登录</span>哦。</div> -->

    <mt-popup
      :value="clauseVisible"
      :close-on-click-modal="(false)"
      class="six-popup-statement"
      @touchmove.native.prevent.stop
      @click.native.prevent.stop
      @set-popup-value="setPopupValue">
      <div class="rule-content">
        <div class="text-container">
          <h3>办理须知</h3>
          <p>① 本服务能办理粤牌私人
            <stronger>小车</stronger>
            ，在全国产生的大部分交通违法，针对扣分业务，只能办理本人本车，个人驾驶证累计记分不能超过
            <span>12分（含）</span>。
          </p>
          <p>② 本服务由小优车务提供，收取
            <!--<span>{{serveFee}}元／笔</span>服务费，至少需要-->
            <span>25元 ／笔</span>服务费，至少需要
          <span>3-5个工作日</span>办结。</p>
          <p>③ 本服务不提供相关票据，如遇特殊情况无法办理，将于结果反馈后7个工作日内原路退款，如有疑问，可致电客服
          <span class="clause-num">020-31136463</span>。</p>
          <p>④ 付款成功后，请勿通过其他渠道
            <span>重复处理</span>，生成的纠纷
          <span>不做退款</span>，请自行通过行政复议处理。</p>
          <p>⑤ 广东省外产生的交通违法
            <span>处罚条款</span>与车牌所在地有异时，本服务按
            <sapn>车牌所在地</sapn>
            法规处理。
          </p>
        </div>
        <div class="clause-btn">
          <div class="rule-button">
            <p @click="(clauseVisible=false)">不同意</p>
            <p @click="agreeToTransaction">同意</p>
          </div>
        </div>
      </div>
    </mt-popup>
  </div>
</template>

<script>
import '../../common/less/common.less'
import {resetRem, Storage, Url} from '../../common/utils/common'
import mtPopup from '../../common/components/mip-popup'
import Reqs from '../../common/api/illegalApi'
import {Mdialog} from '../../common/utils/dialog'
import {gConst} from '../../common/js/config'

export default {
  name: 'IllegalMsg',
  components: {
    mtPopup
  },
  props: {
    info: {
      type: Object,
      required: true
    },
    config: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      isShowNoticeTip: false,
      tipContent: '',

      illegalIndexResult: {}, // 违法查询结果

      plateNumber: '',
      plateType: '',
      engine: '', // 发动机号

      // 已选择的违章
      illegalChosen: [],
      // dx新增 已选择的违章数组对象
      illegalChosenArr: [],
      // 全选按钮
      chosenALL: [],
      isDisable: 1,
      isAll: false,
      clauseVisible: false,
      // 过期时间
      validEndDate: '',
      // 服务费
      serveFee: '',
      // 可办理的违章
      canHandleIllegals: [],
      // 排序后的所有违章
      allIllegals: [],
      // 车牌号
      allIllegalPoints: 0, // 所有扣分数
      allPay: 0,
      list: {},
      handlingNumber: 0,
      // 创建订单的页面的总罚款金额
      allPayOrder: 0,
      // 创建订单的页面的总滞纳金
      allOverdue: 1,
      // 是否过期
      overdueStatus: '',
      illegals: [],
      ads: [],
      matchExemptingInspection: false,
      noIllegalShow: false, // 无违章的状态
      isShowBanner: false
    }
  },
  watch: {
    /*
                *监听选择项的改变,  计算总价 总扣分数
                */
    illegalChosen (nVal, oVal) {
      const self = this
      if (nVal.length > 1) {
        self.illegalChosen.splice(0, 1)
      }
      self.allIllegalPoints = 0 // 所有扣分数
      self.allPay = 0 // 罚款金额+手续费
      self.allPayOrder = 0 // 总罚款金额
      self.allOverdue = 0 // 总滞纳金
      nVal.forEach((val) => {
        self.canHandleIllegals.forEach((val2) => {
          if (val === val2.decisionNumber) {
            self.allIllegalPoints += val2.violationPoints
            self.allPay += (val2.fine + self.serveFee + val2.overdue)

            // 创建订单的页面的总罚款金额
            self.allPayOrder += val2.fine

            // 创建订单的页面的总滞纳金
            self.allOverdue += val2.overdue
          }
        })
      })

      Storage.set('illegalMsgData', {
        allPayOrder: self.allPayOrder, // 总罚款金额
        allOverdue: self.allOverdue, // 总滞纳金
        serveFee: self.serveFee, // 单条服务费
        allPay: self.allPay, // 罚款金额 + 手续费
        allServeFee: self.serveFee * self.illegalChosen.length, // 总服务费
        allCount: self.illegalChosen.length, // 共选择多少笔
        allIllegalPoints: self.allIllegalPoints
      })
      // 判断是否已选择所有
      if (nVal.length === self.canHandleIllegals.length) {
        self.chosenALL.push('chosenALL')
      } else {
        self.chosenALL = []
      }

      self.illegalChosenArr.length = 0// 清空数组
      self.illegalIndexResult.illegals.forEach((val) => {
        self.illegalChosen.forEach((val2) => {
          if (val.decisionNumber === val2) {
            self.illegalChosenArr.push(val)
          }
        })
      })
      // console.log(self.illegalChosenArr.length);
      Storage.set('illegalChosenArr', self.illegalChosenArr) // 选中的所有违章
    }
  },
  created () {
    // const self = this
    resetRem()
  },
  mounted () {
    const self = this
    self.setContainerH('.illegal-page')
    self.initData()

    self.$element.customElement.addEventAction('login', event => {
      console.log('登录信息', event)
      Storage.set('apitoken', event.userInfo.apitoken)
      Reqs.getMember({}).then((data) => {
        self.isMember = data.isMember
        Storage.setSession('memberSimpleInfo', data)
      })
    })

    // // 判断用户是否已下单
    // // 改变下单状态 （1：用户已下单  0：用户还没有下单 2：用户已取消订单）
    // if (window.sessionStorage.getItem('placeOrderStatus') == 1 || window.sessionStorage.getItem('placeOrderStatus') == 2) {
    //   // MessageBox.confirm('违章数据已更新，是否重新查询？').then((action) => {
    //   //   self.$router.push({ name: 'IllegalIndex' });
    //   //   // window.location.href = process.env.BASE_API + 'login/xmd/icbc_rongE/illegal_payment/auth'
    //   // });
    // }
    // 获取广告数据
    // self.getAdvertisementData();
    self.isSupportTest()
  },
  methods: {
    initData () {
      const self = this
      const illegalIndexInput = Storage.get('illegalIndexInput') || null
      const illegalIndexResult = Storage.get('illegalIndexResult') || null
      const queryParams = Url.getUrlData()

      if (queryParams && queryParams.hasOwnProperty('PLATENUMBER')) {
        self.plateNumber = queryParams.PLATENUMBER
        if (!/^[a-z|A-Z|0-9]/i.test(queryParams.PLATENUMBER)) {
          self.plateNumber = queryParams.PLATENUMBER.slice(1) // 统一不加 粤
        }
        self.engine = queryParams.FDJH
        self.plateType = queryParams.hasOwnProperty('PLATETYPE') ? queryParams.PLATETYPE : '02'

        // 获取违法数据
        self.innerIllegalsSearch()
        // URL 传参优先级更高
        // 更新参数
        Storage.set('illegalIndexInput', {
          plateNumber: self.plateNumber,
          plateType: self.plateType,
          engine: self.engine
        })
        return
      }

      if (illegalIndexInput && illegalIndexResult) {
        self.plateNumber = illegalIndexInput.plateNumber
        self.plateType = illegalIndexInput.plateType
        self.engine = illegalIndexInput.engine
        self.illegalIndexResult = illegalIndexResult
        // 以车牌号作为title
        document.title = `粤${self.plateNumber}`

        self.illegalsSearch()
      }
    },
    agreeToTransaction () {
      MIP.viewer.open(gConst.BASE_URL_PAGE + 'mip-xmd-illegal-createorder.html')
    },
    isSupportTest () {
      window.localStorage.setItem('isSupportTest', 'test')
      if (!window.localStorage.getItem('isSupportTest', 'test')) {
        let Dialog = new Mdialog()
        Dialog.open({
          message: '请关闭无痕浏览模式，才能办理违章哦~',
          showCancelButton: false
        })
      }
      window.localStorage.removeItem('isSupportTest')
    },
    // 从query查询
    innerIllegalsSearch () {
      const self = this
      const params = {
        plateNumber: `粤${self.plateNumber}`,
        plateType: self.plateType,
        engine: self.engine
      }
      Reqs.innerIllegalsSearch(params).then((data) => {
        self.illegalIndexResult = data
        self.serveFee = data.fee
        if (data.illegals.length === 0) {
          self.noIllegalShow = true
        }
        self.handleData()
      }, () => {

      })
    },
    goPage (e) {
      let Dialog = new Mdialog()
      if (e === 'six') {
        Dialog.open({
          message: '敬请期待',
          title: '',
          showCancelButton: false
        })
        // window.location.href = process.env.BASE_API + 'login/xmd/icbc_rongE/inspection/auth'
      }
    },
    illegalsSearch () {
      const self = this
      if (self.illegalIndexResult.illegals.length === 0 || self.illegalIndexResult.illegals.length === 0) {
        self.noIllegalShow = true
      }
      self.handleData()
    },
    handleData () {
      const self = this
      self.matchExemptingInspection = self.illegalIndexResult.vehInspection.matchExemptingInspection
      self.handlingNumber = self.illegalIndexResult.illegals.length
      self.validEndDate = self.illegalIndexResult.vehInspection.validEndDate
      // 判断年检是否过期
      if (new Date() > new Date(self.validEndDate.replace(/-/g, '/'))) {
        self.overdueStatus = 0
      } else {
        self.overdueStatus = 1
      }
      self.illegals = self.illegalIndexResult.illegals
      self.serveFee = self.illegalIndexResult.fee// 每条违章的列表服务费价格一样，存起来和 i（循环次数）相乘
      self.handleIllegalData(self.illegals)

      // 判断是否有待支付订单
      for (const v of self.illegalIndexResult.illegals) {
        if (v.illegal_status === 1 || v.illegal_status === '1') {
          let Dialog = new Mdialog()
          Dialog.open({
            title: '',
            message: '您有待支付订单,是否前往我的订单页面？',
            showCancelButton: true
          }, function (action) {
            if (action === 'confirm') {
              MIP.viewer.open(gConst.BASE_URL_PAGE + 'mip-my-order.html')
            }
          })
          break
        }
      }
    },
    // 立即办理
    handleAtOnce () {
      const self = this
      const Dialog = new Mdialog()
      // ---------------------------------------dx-------------------------------------
      // -------------------------校验有无可办理违章和用户是否勾选了违章----------------------
      // 可办理违章的数组对象 存可办理违章的数据对象，length为0则说明无可办理的违章数据
      window.localStorage.setItem('isSupportTest', 'test')
      if (!window.localStorage.getItem('isSupportTest', 'test')) {
        Dialog.open({
          message: '请关闭无痕浏览模式，才能办理违章哦'
        })
        return
      }
      window.localStorage.removeItem('isSupportTest')
      const transactIllegals = []
      for (const v of self.allIllegals) {
        if (v.illegal_status === 0 || v.illegal_status === '0') {
          transactIllegals.push(v)
        }
      }
      if (transactIllegals.length === 0 || transactIllegals.length === '0') {
        Dialog.open({
          message: '没有可办理违章'
        })
        return
      } else if (self.illegalChosen.length === 0 || self.illegalChosen.length === '0') {
        Dialog.open({
          message: '请至少选择一条违章'
        })
        return
      }
      // -------------------------校验有无可办理违章和用户是否勾选了违章end----------------------
      if (self.allIllegalPoints > 11) {
        Dialog.open({
          // message: '总扣分数不能大于11分，请重新选择'
          message: '<p style="font-size:0.7rem">办理后驾驶证分数将不足1分</p><p style="font-size:0.6rem;color:#a6a6a6;">请重新选择如有疑问可咨询客服</p>'
        })
      } else {
        self.clauseVisible = true
      }
    },
    /*
                * 选择某一项违法
                * dx 新增一个参数item
                */
    clickItem (val, isDisable, item) {
      const self = this
      const Dialog = new Mdialog()
      if (isDisable === -1 || isDisable === '-1') {
        Dialog.open({
          message: item.tip
        })
        return
      }
      // 只有是可办理的, 才往下执行
      if (isDisable !== 0 && isDisable !== '0') {
        return
      }
      if (self.isInArray(self.illegalChosen, val)) {
        self.delArrayVal(self.illegalChosen, val)
      } else {
        self.illegalChosen.push(val)
      }
    },
    /*
                * 违法数据排序
                */
    handleIllegalData (data) {
      const self = this
      const canNotHandle = [] // 暂不可办理
      const canHandle = []
      const handling = [] // 办理中
      data.forEach((val) => {
        const status = String(val.illegal_status)
        if (status === '0') { // 可办理
          self.canHandleIllegals.push(val) // 保存起来, 后面需要用到
          canHandle.push(val)
        } else if (status === '-1') {
          canNotHandle.push(val)// 不可办理
        } else if (status === '3') {
          handling.push(val) // 办理中
        }
      })
      // 注意!allIllegals并没有含待支付列表!!!上面的操作等于去除了待支付列表 illegal_status  = 1
      self.allIllegals.push(...canHandle) // 合并
      self.allIllegals.push(...handling)
      self.allIllegals.push(...canNotHandle)

      // 待处理条数也是没有含待支付列表!!!
      self.handlingNumber = self.allIllegals.length
    },
    /*
                *点击全选按钮
                */
    toChosenALL () {
      const self = this
      if (self.isInArray(self.chosenALL, 'chosenALL')) {
        self.illegalChosen = []
        self.chosenALL = []
      } else {
        self.chosenALL.push('chosenALL')
        self.illegalChosen = []
        self.canHandleIllegals.forEach((val) => {
          self.illegalChosen.push(val.decisionNumber)
        })
      }
    },
    /*
                *判断是否在数组中
                */
    isInArray (arr, val) {
      if (arr.indexOf && typeof (arr.indexOf) === 'function') {
        const index = arr.indexOf(val)
        if (index >= 0) {
          return true
        }
      }
      return false
    },
    /*
                *删除数组中某一项
                */
    delArrayVal (arr, val) {
      if (arr.indexOf && typeof (arr.indexOf) === 'function') {
        const index = arr.indexOf(val)
        if (index > -1) {
          return arr.splice(index, 1)
        }
      }
    },
    getAdvertisementData () {
      // const self = this
      // const params = {
      //   channel: 82
      // }
      // Req.post('banner/getBanner', params, true).then((data) => {
      //   console.log('img', data)
      //   self.ads = data
      //   if (self.ads !== 'null' && self.ads !== null && !!self.ads.length) {
      //     setTimeout(() => {
      //       self.isShowBanner = true
      //     }, 500)
      //   }
      // }, (err) => {
      //   console.log(err.msg)
      // })
    },
    setContainerH (dom) {
      const agent = window.navigator.userAgent
      let containerH = window.innerHeight || document.documentElement.clientHeight
      containerH -= 44
      if (/iphone/ig.test(agent) && /Baidu/ig.test(agent)) {
        containerH -= 56
      }
      document.querySelector(dom).style.height = `${containerH}px`
    },
    showTip () {
      // const self = this
      // // status 1展示 0不展示
      // const params = {
      //   business_tag: 'illegal_payment'
      // }
      // Req.post('notice/getNoticeBar', params).then((data) => {
      //   if (!data.length) {
      //     return
      //   }
      //   data.forEach((val, index) => {
      //     if ((val.status === '1' || val.status === 1) && val.position_tag === 'illegalList_top') {
      //       self.isShowNoticeTip = true
      //       self.tipContent = val.content
      //     }
      //   })
      // }, (err) => {
      //
      // })
    },
    getNoticeBar () {
      const self = this
      const params = {
        business_tag: 'illegal_payment'
      }
      Reqs.getNoticeBar(params)
        .then(data => {
          if (!data.length) {
            return
          }
          data.forEach((val) => {
            if ((val.status === '1' || val.status === 1) && val.position_tag === 'illegalList_top') {
              self.isShowNoticeTip = true
              self.tipContent = val.content
            }
          })
          console.log(data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    setPopupValue () {
      const self = this
      self.clauseVisible = false
    }
  }
}
</script>

<style lang="less" scoped>
  @import "../../common/less/const";
  // @import "../../common/less/common.less";

  .illegal-page {
    width: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;

    .illegal-msg {
      flex-grow: 2;
      margin: 12px 0;
      width: 100%;
      box-sizing: border-box;
      overflow: hidden;
      overflow-y: scroll;
      .noIllegal {
        width: 100%;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        .up {
          display: flex;
          justify-content: center;
          align-items: center;
          .img-box {
            width: 1.04rem;
            height: 1.1rem;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .text {
            text-align: center;
            margin-left: 0.4rem;
            margin-top: 0.2rem;
            p {
              font-size: 0.36rem;
              font-family: PingFang-SC-Regular;
              color: rgba(0, 0, 0, 1);
            }
          }
        }
        .down {
          width: 95%;
          margin: 0 auto;
          margin-top: 0.8rem;
          background-color: #ffffff;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 1.4rem;
          .text {
            span {
              color: #000000;
              font-size: 1.2rem;
              font-family: PingFang-SC-Regular;
            }
            .red {
              color: #ff3a3a;
            }
          }
          .img-box {
            width: 1.1rem;
            height: 0.92rem;
            margin-left: 0.74rem;
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }

    .item-disable {
      .item-content-con {
        div,
        p,
        span {
          color: #bababa !important;
        }
        .input_check + label {
          background-color: @color-background !important;
        }
      }
    }

    .illegal-title {
      font-size: 16px;
      min-height: 0.8rem;
      box-sizing: border-box;
      background-color: #fff;
      display: flex;
      align-items: stretch;
      padding: 0 0.3rem;
      & > div {
        &:not(:first-child) {
          span:last-child {
            color: #ff3a3a;
          }
        }
        display: flex;
        align-items: center;
        p {
          display: flex;
          align-items: center;
        }
      }
      & > div:first-child {
        flex-grow: 2;
        span:last-child {
          padding: 0 0.1rem;
          color: @color-btn;
        }
      }
      & > div:nth-last-child(2) {
        margin-left: 0.3rem;
      }
      & > div:last-child {
        span {
          padding-left: 0.1rem;
          padding-top: 0.04rem;
          i {
            color: @color-text-l;
          }
        }
      }
    }

    .illegal-item:first-child {
      margin-top: 0;
    }

    .illegal-item {
      position: relative;
      margin-top: 0.3rem;
      background-color: #fff;
      box-sizing: border-box;
      .show-state {
        background-color: @color-background;
        color: @color-text-l;
        font-weight: normal;
        text-align: center;
        font-size: @font-small;
        height: 0.8rem;
      }
    }

    .item-content-con {
      position: relative;
    }

    .item-content {
      display: flex;
      flex-wrap: nowrap;
      padding: 0 0.3rem;
    }

    .content-left {
      flex-grow: 2;
      padding-top: 0.04rem;
      font-size: @font-small;
      p {
        margin-top: 0.15rem;
      }
      p:first-child {
        font-size: 0.3rem;
        font-weight: bold;
        text-align: justify;
        text-justify: inter-ideograph;
      }
      p:last-child {
        padding-bottom: 0.15rem;
      }
    }

    .content-right {
      position: relative;
      width: 0.48rem;
      padding-top: 0.3rem;
      margin-left: 8px;
      span {
        position: relative;
      }
      .input_check {
        position: absolute;
        visibility: hidden;
        display: none;
      }
      .input_check + label {
        display: inline-block;
        width: 0.44rem;
        height: 0.44rem;
        border: 0.02rem solid @color-background;
        border-radius: 50%;
        background-color: white;
        position: relative;
      }
      .input_check:checked + label {
        background-color: @color-btn;
      }
      .input_check:checked + label:after {
        content: '';
        position: absolute;
        left: 20%;
        bottom: 44%;
        width: 0.2rem;
        height: 0.08rem;
        border: 0.04rem solid white;
        border-top-color: transparent;
        border-right-color: transparent;
        -ms-transform: rotate(-60deg);
        -moz-transform: rotate(-60deg);
        -webkit-transform: rotate(-60deg);
        transform: rotate(-52deg);
      }
    }

    .is-allchosen {
      width: initial;
      padding: 0;
    }

    .content-right2 {
      min-width: 0.8rem;
      margin-left: 0.16rem;
      padding-top: 0.3rem;
      span {
        position: relative;
        color: @color-btn;
        font-size: @font-small;
      }
    }

    .item-msg {
      display: flex;
      flex-wrap: nowrap;
      justify-content: space-between;
      align-items: center;
      padding: 0 0.3rem;
      border-top: 0.02rem dashed @color-border;
      height: 0.8rem;
      p {
        display: flex;
        align-items: center;
        font-size: @font-small;
        & > span:nth-child(2) {
          color: @color-remind;
        }
      }
    }

    .item-triangle {
      position: absolute;
      top: 0;
      left: 0;
      width: 0rem;
      height: 0rem;
      border-top: 0.1rem solid @color-remind;
      border-right: 0.1rem solid transparent;
      border-bottom: 0.1rem solid transparent;
      border-left: 0.1rem solid @color-remind;
    }

    .item-mask {
      opacity: 1;
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: transparent;
      top: 0;
    }

    .pay-banner {
      font-size: 16px;
      box-sizing: border-box;
      border-top: 0.02rem solid @color-background;
      width: 100%;
    }

    .pay {
      background-color: #fff;
      width: 100%;
      height: 1rem;
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      & > div:nth-child(1) {
        padding-left: 0.3rem;
        width: 0.4rem;
      }
      & > div:nth-child(3) {
        text-align: center;
        width: 27%;
        background-color: @color-btn;
        color: white;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        p {
          font-size: @font-large;
        }
      }
      .pay-all {
        flex-grow: 2;
        display: flex;
        align-items: center;
        p {
          border-right: 0.02rem solid @color-background;
          display: flex;
          align-items: center;
          padding: 0 0.2rem;
          & > span:last-child {
            color: @color-remind;
          }
        }
        div:first-child {
          p {
            padding-left: 0;
          }
        }
        div:last-child {
          p {
            border: none;
            & > span:first-child {
              color: @color-btn;
              padding-right: 0.06rem;
            }
            & > span:last-child {
              color: inherit;
            }
          }
        }
        .ldf-num {
          min-width: 0.2rem;
        }
      }
    }
    .six-popup-statement {
      overflow: hidden;
      border-radius: 5px;
      width: 290px;
      .rule-content {
        text-align: left;
        padding-bottom: 0;
      }
      .text-container {
        padding: 15px;
        h3 {
          text-align: center;
          font-size: 17px;
          padding-bottom: 10px;
          color: #2E2E2E;
        }
        p {
          font-size: 14px;
          line-height: 20px;
          margin-bottom: 6px;
          span {
            color: @color-remind;
          }
        }
      }
      .rule-button {
        border-top: 1px solid #e6e6e6;
        text-align: center;
        height: 47px;
        display: flex;
        align-items: stretch;
        justify-content: center;
        text-align: center;
        p:first-child {
          background-color: @color-background;
          color: @color-text-p;
        }
        p {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 50%;
          font-size: 18px;
          background-color: @color-btn;
          color: white;
        }
      }
    }
  }

</style>
