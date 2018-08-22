<template>
  <div class="illegal-index">
    <div>
      <div class="mint-navbar">
        <a
          :class="{'is-selected': selected === 'illegal'}"
          class="mint-tab-item"
          @click="(selected='illegal')">
          <div class="mint-tab-item-icon"/>
          <div class="mint-tab-item-label">交通违法缴罚</div>
        </a>
        <a
          :class="{'is-selected': selected === 'decision'}"
          class="mint-tab-item"
          @click="(selected='decision')">
          <div class="mint-tab-item-icon"/>
          <div class="mint-tab-item-label">罚单代缴</div>
        </a>
      </div>
    </div>

    <!-- <div v-if="info.isLogin">hi，{{ info.userInfo.aliasname }}，欢迎回来！<span
      style="color:#f00;"
      on="tap:log.logout">退出</span></div>
    <div v-else>你没有<span
      style="color:#f00;"
      on="tap:log.login"
    >登录</span>哦。</div> -->

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
    <div
      v-if="(selected==='illegal')"
      class="illegal">
      <div class="input-container">
        <div class="before-input-tips">
          <p>支持粤牌小型汽车和小型能源汽车交通违法缴罚</p>
        </div>
        <div class="input-content">
          <div class="mint-cell mint-field mint-input-inline">
            <div class="mint-cell-wrapper">
              <div class="mint-cell-title"><span class="mint-cell-text">车牌号</span></div>
              <div class="mint-cell-value">
                <div class="ldf-inline-field-other">
                  粤
                </div>
                <a class="mint-cell mint-field illegal-input is-nolabel">
                  <div class="mint-cell-left"/>
                  <div class="mint-cell-wrapper">
                    <div class="mint-cell-title"><span class="mint-cell-text"/></div>
                    <div class="mint-cell-value">
                      <input
                        v-model="plateNumber"
                        placeholder="请输入车牌号"
                        type="text"
                        class="mint-field-core"
                        maxlength="7">
                      <div
                        class="mint-field-clear"
                        style="display: none;"><i class="mintui mintui-field-error"/>
                      </div>
                      <span class="mint-field-state is-default"><i class="mintui mintui-field-default"/></span>
                      <div class="mint-field-other"/>
                    </div>
                  </div>
                  <div class="mint-cell-right"/>
              </a></div>
            </div>
          </div>
          <a class="mint-cell mint-field attention-input">
            <div class="mint-cell-left"/>
            <div class="mint-cell-wrapper">
              <div class="mint-cell-title"><span class="mint-cell-text">发动机号</span></div>
              <div class="mint-cell-value">
                <input
                  v-model="engine"
                  placeholder="请输入发动机号后6位"
                  type="text"
                  class="mint-field-core"
                  maxlength="6">
                <div
                  class="mint-field-clear"
                  style="display: none;"><i class="mintui mintui-field-error"/></div>
                <span class="mint-field-state is-default"><i class="mintui mintui-field-default"/></span>
                <div class="mint-field-other"/>
              </div>
            </div>
            <div class="mint-cell-right"/>
          </a>
          <a class="mint-cell mint-field v-input">
            <div class="mint-cell-left"/>
            <div class="mint-cell-wrapper">
              <div class="mint-cell-title"><span class="mint-cell-text">验证码</span></div>
              <div class="mint-cell-value">
                <input
                  v-model="imgCode"
                  placeholder="请输入验证码"
                  type="text"
                  class="mint-field-core"
                  maxlength="4">
                <div
                  class="mint-field-clear"
                  style="display: none;"><i class="mintui mintui-field-error"/></div>
                <span class="mint-field-state is-default"><i class="mintui mintui-field-default"/></span>
                <div
                  class="mint-field-other"
                  @click="updateVcode"><mip-img :src="imgCodeUrl"/></div>
              </div>
            </div>
            <div class="mint-cell-right"/>
          </a>
        </div>
      </div>
    </div>
    <div
      v-if="(selected==='decision')"
      class="decision">
      <div class="input-container">
        <div class="before-input-tips">
          <p>支持各类车辆在广东省产生的处罚决定书线上缴罚<br>（非告知单）</p>
        </div>
        <div class="input-content">
          <a class="mint-cell mint-field">
            <div class="mint-cell-left"/>
            <div
              class="mint-cell-wrapper"
              @click="(carTypeVisible=true)">
              <div class="mint-cell-title"><span class="mint-cell-text">号牌种类</span></div>
              <div class="mint-cell-value">
                <input
                  v-model="plateTypeSelected"
                  placeholder="请点击选择"
                  type="text"
                  disabled="disabled"
                  class="mint-field-core"
                  maxlength="7">
                <div
                  class="mint-field-clear"
                  style="display: none;"><i class="mintui mintui-field-error"/></div>
                <span class="mint-field-state is-default"><i class="mintui mintui-field-default"/></span>
                <div class="mint-field-other"><span class="ldf-field-icon"><i
                  class="icon iconfont icon-downforward"/></span></div>
              </div>
            </div>
            <div class="mint-cell-right"/>
          </a>
          <div class="mint-cell mint-field mint-input-inline">
            <div class="mint-cell-wrapper">
              <div class="mint-cell-title"><span class="mint-cell-text">车牌号</span></div>
              <div class="mint-cell-value">
                <div
                  class="mint-field-other"
                  @click="(carProvinceVisible=true)">
                  <div class="ldf-inline-field-other"><span v-text="carProvinceSelected"/> <span
                    class="ldf-former-icon"><i
                      class="icon iconfont icon-downforward"/></span></div>
                </div>
                <a class="mint-cell mint-field decision-input is-nolabel">
                  <div class="mint-cell-left"/>
                  <div class="mint-cell-wrapper">
                    <div class="mint-cell-title"><span class="mint-cell-text"/></div>
                    <div class="mint-cell-value">
                      <input
                        v-model="dPlateNumber"
                        placeholder="请输入车牌号"
                        type="text"
                        class="mint-field-core"
                        maxlength="7">
                      <div
                        class="mint-field-clear"
                        style="display: none;"><i class="mintui mintui-field-error"/>
                      </div>
                      <span class="mint-field-state is-default"><i class="mintui mintui-field-default"/></span>
                      <div class="mint-field-other"/>
                    </div>
                  </div>
                  <div class="mint-cell-right"/>
              </a></div>
            </div>
          </div>
          <a class="mint-cell mint-field">
            <div class="mint-cell-left"/>
            <div class="mint-cell-wrapper">
              <div class="mint-cell-title"><span class="mint-cell-text">决定书号</span></div>
              <div class="mint-cell-value">
                <input
                  v-model="decisionNumber"
                  placeholder="请输入决定书号"
                  type="text"
                  class="mint-field-core"
                  maxlength="16">
                <div
                  class="mint-field-clear"
                  style="display: none;"><i class="mintui mintui-field-error"/></div>
                <span class="mint-field-state is-default"><i class="mintui mintui-field-default"/></span>
                <div class="mint-field-other"/>
              </div>
            </div>
            <div class="mint-cell-right"/>
          </a>
          <a class="mint-cell mint-field v-input">
            <div class="mint-cell-left"/>
            <div class="mint-cell-wrapper">
              <div class="mint-cell-title"><span class="mint-cell-text">验证码</span></div>
              <div class="mint-cell-value">
                <input
                  v-model="imgCode"
                  placeholder="请输入验证码"
                  type="text"
                  class="mint-field-core"
                  maxlength="4">
                <div
                  class="mint-field-clear"
                  style="display: none;"><i class="mintui mintui-field-error"/></div>
                <span class="mint-field-state is-default"><i class="mintui mintui-field-default"/></span>
                <div
                  class="mint-field-other"
                  @click="updateVcode"><mip-img :src="imgCodeUrl"/></div>
              </div>
            </div>
            <div class="mint-cell-right"/>
          </a>
        </div>
      </div>
    </div>
    <div class="btn-container">
      <button
        class="mint-button ldf-mint-button mint-button--default mint-button--normal"
        @click="nextStep">
        <label class="mint-button-text">查询</label>
      </button>
    </div>
    <div
      class="to-myorder"
      @click="toMyOrder">
      <p><span>查看我的订单</span><span><i class="icon iconfont icon-forward"/></span></p>
    </div>
    <div class="line-container">
      <line-content :line-content="'常见问题'"/>
    </div>
    <div class="state-container">
      <accordion :accordion="illegalStatement"/>
    </div>
    <mt-popup
      :value="carTypeVisible"
      class="ldf-popup-picker"
      position="bottom"
      @touchmove.native.prevent.stop
      @set-popup-value="setPopupValue">
      <div class="picker-toolbar">
        <span class="mint-datetime-action mint-datetime-cancel"/>
        <span
          class="mint-datetime-action mint-datetime-confirm"
          @click="(carTypeVisible = false)">完成</span>
      </div>
      <select-box style="width: 100%">
        <select-item
          :list-data="carTypes"
          :value-key="'value'"
          v-model="pickValue"/>
          <!--<select-item :listData="listData2" type="cycle" v-model="day"></select-item>-->
      </select-box>
    </mt-popup>

    <mt-popup
      :value="carProvinceVisible"
      class="ldf-popup-picker"
      position="bottom"
      @touchmove.native.prevent.stop
      @set-popup-value="setPopupValue">
      <div class="picker-toolbar">
        <span class="mint-datetime-action mint-datetime-cancel"/>
        <span
          class="mint-datetime-action mint-datetime-confirm"
          @click="(carProvinceVisible = false)">完成</span>
      </div>
      <div class="ldf-province-container">
        <div
          v-for="(pro) in province"
          :key="pro">
          <p
            :style="{display:pro?'':'none'}"
            :class="{'pro-chosen': pro===carProvinceSelected}"
            @click="chooseAction(pro)"
            v-text="pro===null?'':pro"/>
        </div>
      </div>
    </mt-popup>

    <mt-popup
      :value="statementVisible"
      :close-on-click-modal="(false)"
      class="six-popup-statement"
      @touchmove.native.prevent.stop
      @click.native.prevent.stop
      @set-popup-value="setPopupValue">
      <div class="rule-content">
        <div class="text-container">
          <!--<h3>六年免检标志申请条例</h3>-->
          <p>①本服务能办理各类型车辆在
            <span>广东省</span>产生的处罚决定书违章（非告知书）。
          </p>
          <p>②本服务由
            <span>小优车务</span>提供，收取
            <span>25元／笔</span>服务费，至少需要
            <span>3个工作日</span>办结。
          </p>
          <p>③本服务不提供相关票据，如遇特殊情况无法办理，将于结果反馈后
            <span class="clause-num">7个工作日</span>原路退款，如有疑问，可致电客服。
            <span class="clause-num">020-31136463。</span>
          </p>
          <p>④付款成功后，请勿通过其他渠道
            <span>重复处理</span>，生成的纠纷
          <span>不做退款</span>，请自行通过行政复议处理。</p>
          <p>⑤已转决定书号的违章认罚后
            <span>15天内</span>未处理的，须缴纳
            <sapn>每天3%</sapn>
            滞纳金，因涉及办理周期，滞纳金计算自认罚第
            <sapn>11日</sapn>
            起。
          </p>
          <p>⑥业务有可能通过合作第三方进行处理，用户所有信息将受严密保护，本服务最终解释权归小优车务所有。</p>
        </div>
        <div class="rule-button">
          <p @click="(statementVisible=false)">不同意</p>
          <p @click="decisionInquire">同意</p>
        </div>
      </div>
    </mt-popup>

    <login-become-member
      :login-become-member-visible="loginBecomeMemberVisible"
      @loginBecomeMember="loginBecomeMember"
    />
  </div>
</template>

<style lang="less" scoped>
@import "../../common/less/const";
// @import "../../common/less/common.less";

.illegal-index {
  margin: 0 auto;
  text-align: center;

  .mint-cell {
    .mint-cell-wrapper {
      padding: 0 15px;
      .mint-cell-title {
        text-align: left;
      }
    }
  }

  .input-container {
    .before-input-tips {
      margin: 0.3rem;
      margin-bottom: 0.2rem;
      font-size: 0.28rem;
      color: @color-text-l;
      text-align: left;
    }
    .input-content {
      border-radius: 0.2rem;
      margin: 0 0.3rem;
      padding: 0.14rem 0.3rem;
      background-color: white;
      .input-tips {
        display: flex;
        justify-content: space-between;
        padding: 0.2rem 0;
        font-size: 0.24rem;
        color: @color-remind;
        img {
          width: 0.32rem;
          height: 0.32rem;
          position: relative;
          top: -2px;
        }
      }
      .ldf-inline-field-other {
        min-width: 1rem;
        padding-right: 6px;
      }
      .mint-cell-wrapper {
        .mint-cell-title {
          width: 80px;
        }
        padding: 0;
        .mint-cell:last-child {
          background: initial;
        }
      }
    }
  }

  .mint-navbar {
    border-bottom: 1px solid #e6e6e6;
    margin-bottom: 2px;
    .mint-tab-item {
      padding: 0.24rem;
      .mint-tab-item-label {
        font-size: 0.3rem;
      }
      &.is-selected {
        border-bottom: 2px solid @color-btn;
        margin-bottom: 0;
        .mint-tab-item-label {
          color: @color-btn;
        }
      }
    }
  }

  .btn-container {
    padding-bottom: 3px;
  }

  .to-myorder {
    text-align: center;
    margin: 0.4rem 0;
    p {
      font-size: 0.28rem;
      color: @color-btn;
      span:first-child {
        padding-right: 0.14rem;
      }
      i {
        position: relative;
        top: 1px;
      }
    }
  }

  .state-container {
    .ldf-accordion {
      border: 1px solid #e6e6e6;
      border-radius: 0.2rem;
      overflow: hidden;
    }
    padding: 0 15px;
    margin-top: 8px;
  }

  .smooth-picker {
    font-size: 16px;
  }

  .ldf-province-container {
    padding-top: 15px;
    padding-bottom: 30px;
    background-color: #ffffff;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    font-size: 18px;
    justify-content: space-around;
    & > div {
      margin-bottom: 8px;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 13%;
      p {
        margin: 0;
        border-radius: 5px;
        padding: 0 7px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: white;
        border: 1px solid #cccccc;
      }
      .pro-chosen {
        background-color: @color-btn;
        border-color: @color-btn;
        color: white;
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
        color: #2e2e2e;
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

<script>
import '../../common/less/common.less'
import { resetRem, Storage, Url } from '../../common/utils/common'
import accordion from '../../common/components/mip-accordion'
import lineContent from '../../common/components/mip-line-content'
import mtPopup from '../../common/components/mip-popup'
import selectBox from '../../common/components/picker/mip-selectbox'
import selectItem from '../../common/components/picker/mip-selectitem'
import loginBecomeMember from '../../common/components/mip-login-become-member'
import Reqs from '../../common/api/illegalApi'
import { gConst } from '../../common/js/config'
import { Mtoast } from '../../common/utils/toast'
// import PROVINCES from '../../common/js/constant'
// import CARTYPES from '../../common/js/constant'
// import ILLEGAL_STATEMENT from '../../common/js/constant'

export default {
  components: {
    accordion,
    lineContent,
    mtPopup,
    selectBox,
    selectItem,
    loginBecomeMember
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
      selected: 'illegal', // decision

      isShowNoticeTip: false,
      tipContent: '',

      isMember: false,

      plateNumber: '',
      engine: '',
      imgCode: '',
      imgCodeUrl: '',

      dPlateNumber: '',
      decisionNumber: '',

      carProvinceVisible: false,
      carProvinceSelected: '粤',
      province: [
        '京',
        '津',
        '冀',
        '晋',
        '蒙',
        '辽',
        '吉',
        '黑',
        '沪',
        '苏',
        '浙',
        '皖',
        '闽',
        '赣',
        '鲁',
        '豫',
        '鄂',
        '湘',
        '粤',
        '桂',
        '琼',
        '渝',
        '川',
        '贵',
        '云',
        '藏',
        '陕',
        '甘',
        '青',
        '宁',
        '新',
        null,
        null,
        null,
        null
      ],
      statementVisible: false,
      illegalStatement: [
        {
          title: '1.  查询范围',
          state: false,
          content:
            '交通违法缴罚：粤牌小型汽车和粤牌小型新能源汽车在各地产生的违法行为。<br> 罚单代缴：各类型车辆在广东省产生的处罚决定书（不是告知单，请完成认罚，领取处罚决定书后再进行查询办理'
        },
        {
          title: '2.  处理时间',
          state: false,
          content:
            '交通违法缴罚：2-5个工作日（不含下单日）内处理完成，国家法定节假日不属于工作日，会导致办理时限延长，请各位耐心等待。<br> 罚单代缴：下单成功后将在1-4个工作日内处理完毕。'
        },
        {
          title: '3.  办理结果',
          state: false,
          content: '在查询首页直接进入“我的订单”，或关注“小优车务”百度熊掌号。'
        },
        {
          title: '4.  退款情况',
          state: false,
          content:
            '订单处理结果为失败的，我们会及时进行退款，款项将于7个工作日内原路退回。'
        },
        {
          title: '5.  滞纳金',
          state: false,
          content:
            '针对电子违法，处理时间延长不会产生滞纳金。<br/>针对已转决定书的违法，认罚后请在15天内缴费，若超期需缴纳每天3％的滞纳金，因涉及办理周期，决定书代缴计算滞纳金自认罚第11日起。（由于客户信息填写错误导致的经济损失将由客户自行承担，办理延误所产生的滞纳金由我方承担。）'
        },
        {
          title: `6.  一车三证与一证三车`,
          state: false,
          content: `一车三证：一台机动车在一个年检周期内最多可以使用三本驾驶证来处理本车的违章行为。<br/>一证三车：一本驾驶证在一个年检周期内最多只能处理三台机动车的交通违法行为。`
        }
      ],
      carTypeVisible: false,
      plateTypeSelected: '',
      plateTypeSelectedCode: '',
      pickValue: {},
      carTypes: [
        { code: '51', value: '大型新能源汽车' },
        { code: '52', value: '小型新能源汽车' },
        { code: '01', value: '大型汽车' },
        { code: '02', value: '小型汽车' },
        { code: '03', value: '使馆汽车' },
        { code: '04', value: '领馆汽车' },
        { code: '05', value: '境外汽车' },
        { code: '06', value: '外籍汽车' },
        { code: '07', value: '普通摩托车' },
        { code: '08', value: '轻便摩托车' },
        { code: '09', value: '使馆摩托车' },
        { code: '10', value: '领馆摩托车' },
        { code: '11', value: '境外摩托车' },
        { code: '12', value: '外籍摩托车' },
        { code: '13', value: '低速车' },
        { code: '14', value: '拖拉机' },
        { code: '15', value: '挂车' },
        { code: '16', value: '教练汽车' },
        { code: '17', value: '教练摩托车' },
        { code: '18', value: '试验汽车' },
        { code: '19', value: '试验摩托车' },
        { code: '20', value: '临时入境汽车' },
        { code: '21', value: '临时入境摩托车' },
        { code: '22', value: '临时行驶车' },
        { code: '23', value: '警用汽车' },
        { code: '24', value: '警用摩托车' },
        { code: '25', value: '原农机号牌' },
        { code: '26', value: '香港入出境车' },
        { code: '27', value: '澳门入出境车' }
      ],

      loginBecomeMemberVisible: false,
      routerName: ''
    }
  },
  watch: {
    pickValue (nVal) {
      const self = this
      self.plateTypeSelected = nVal.value
      self.plateTypeSelectedCode = nVal.code
    }
  },
  created () {
    resetRem()
    // resetUrl()
  },
  mounted () {
    console.log('这里进入了mounted')
    const self = this

    console.log('url', window.location.href)
    // MIP.setData({
    //   info: {
    //       redirectUri: window.location.href
    //     }
    // })
    self.$element.customElement.addEventAction('login', event => {
      console.log('登录信息', event)
      // if(event.userInfo.isMember === true){
      //   Storage.set("loginInfo", event);
      // }

      Storage.set('apitoken', event.userInfo.apitoken)
      Reqs.getMember({}).then(data => {
        self.isMember = data.isMember
        Storage.setSession('memberSimpleInfo', data)
      })
      self.updateVcode()
      self.getNoticeBar()
    })
    self.initData()
    // 失败事件
    self.$element.customElement.addEventAction('error', event => {
      console.log('loginerror')
    })

    self.$element.customElement.addEventAction('exit', event => {
      console.log('登出了')
    })
  },
  methods: {
    initData () {
      const self = this
      // self.updateVcode()
      const urlParams = Url.getUrlData()
      const decisinNumInput = Storage.get('decisinNumInput') || null
      const illegalIndexInput = Storage.get('illegalIndexInput') || null
      if (urlParams) {
        console.log('urlParams', urlParams, urlParams.hasOwnProperty('decision'))
        self.selected = urlParams.hasOwnProperty('selected') && urlParams.selected === 'decision' ? 'decision' : 'illegal'
      }
      if (decisinNumInput) {
        self.carProvinceSelected = decisinNumInput.plateNumber.slice(0, 1)
        self.dPlateNumber = decisinNumInput.plateNumber.slice(1)
        self.plateTypeSelected = decisinNumInput.plateTypeSelected
        self.plateTypeSelectedCode = decisinNumInput.plateType
        self.decisionNumber = decisinNumInput.decisionNumber
      }
      if (illegalIndexInput) {
        self.plateNumber = illegalIndexInput.plateNumber
        self.plateType = illegalIndexInput.plateType
        self.engine = illegalIndexInput.engine
      }
      // Reqs.getMember({}).then((data) => {
      //   self.isMember = data.isMember
      //   Storage.setSession('memberSimpleInfo', data)
      // })
    },
    nextStep () {
      const self = this
      if (self.inputCheck()) {
        return
      }
      if (self.selected === 'illegal') {
        self.illegalInqurire()
        return
      }
      if (self.selected === 'decision') {
        self.statementVisible = true
        // self.decisionInquire()
      }
    },
    illegalInqurire () {
      const self = this
      const params = {
        // 去除空格replace(/[\s+]/g, '')
        plateNumber: `粤${self.plateNumber
          .toUpperCase()
          .replace(/[\s+]/g, '')}`,
        plateType: self.plateNumber.length === 6 ? '02' : '52',
        engine: self.engine.replace(/[\s+]/g, ''),
        imgCode: self.imgCode.replace(/[\s+]/g, '')
      }
      Reqs.illegalsSearch(params)
        .then(data => {
          console.log('illegalsSearch', data)
          Storage.set('illegalIndexInput', {
            plateNumber: params.plateNumber.slice(1), // 未加 粤
            plateType: params.plateType,
            engine: params.engine
          })
          Storage.set('illegalIndexResult', data)
          MIP.viewer.open(gConst.BASE_URL_PAGE + 'mip-xmd-illegal-msg.html')
        })
        .catch(() => {
          self.updateVcode()
        })
    },
    decisionInquire () {
      const self = this
      const params = {
        // 去除空格replace(/[\s+]/g, '')
        plateNumber: `${
          self.carProvinceSelected
        }${self.dPlateNumber.toUpperCase().replace(/[\s+]/g, '')}`,
        plateType: self.plateTypeSelectedCode,
        decisionNumber: self.decisionNumber.replace(/[\s+]/g, ''),
        imgCode: self.imgCode.replace(/[\s+]/g, '')
      }
      self.statementVisible = false
      Reqs.siteIllegalsSearch(params)
        .then(data => {
          // let res = {}
          const decisinNumInput = Object.assign({}, params, {
            plateTypeSelected: self.plateTypeSelected
          })
          Storage.set('decisinNumResult', data)
          Storage.set('decisinNumInput', decisinNumInput)
          MIP.viewer.open(
            gConst.BASE_URL_PAGE + 'mip-xmd-illegal-decisionorder.html'
          )
        })
        .catch(() => {
          self.updateVcode()
        })
    },
    inputCheck () {
      const self = this
      const Toast = new Mtoast()

      if (self.selected === 'illegal') {
        if (self.plateNumber.length < 6) {
          Toast.open({
            message: '车牌号输入有误, <br>请重新输入'
          })
          return true
        }
        if (self.engine.length !== 6) {
          Toast.open({
            message: '发动机号输入有误, <br>请重新输入'
          })
          return true
        }
      }

      if (self.selected === 'decision') {
        // ---------------------由此进入决定书号缴罚-----------------------
        if (!self.plateTypeSelectedCode) {
          Toast.open({
            message: '请选择号牌种类'
          })
          return true
        }
        if (self.dPlateNumber.length < 6) {
          Toast.open({
            message: '车牌号输入有误, <br>请重新输入'
          })
          return true
        }
        if (!self.decisionNumber) {
          Toast.open({
            message: '决定书编号输入有误, <br>请重新输入'
          })
          return true
        }
      }

      if (self.imgCode.length !== 4) {
        Toast.open({
          message: '验证码输入有误, <br>请重新输入'
        })
        return true
      }

      return false
    },
    updateVcode () {
      const self = this
      let loginInfo = Storage.get('loginInfo')
      let apitoken = ''
      if (loginInfo) {
        apitoken = loginInfo.userInfo.apitoken
      } else {
        console.error('loginInfo 参数缺失')
      }
      self.imgCodeUrl = `${
        gConst.BASE_URL
      }code/getImgCode?apitoken=${apitoken}&t=${Date.parse(new Date())}`
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
            if ((val.status === '1' || val.status === 1) && val.position_tag === 'index_top') {
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
    loginBecomeMember (params) {
      const self = this
      self.loginBecomeMemberVisible = false
      if (params.bol === 'login') {
        Reqs.getMember({}).then(data => {
          Storage.setSession('memberSimpleInfo', data)
          // let loginInfo = Storage.get('loginInfo')
          // loginInfo.userInfo.apitoken = data.apitoken
          // Storage.set('loginInfo',loginInfo)

          MIP.viewer.open(gConst.BASE_URL_PAGE + 'mip-my-order.html')
        })
      }
    },
    setPopupValue () {
      const self = this
      console.log('emitemit')
      self.carTypeVisible = false
      self.carProvinceVisible = false
      self.statementVisible = false
    },
    chooseAction (pro) {
      const self = this
      if (pro) {
        self.carProvinceSelected = pro
        // self.provinceVisible = false;
      }
    },
    toMyOrder () {
      // MIP.viewer.open(gConst.BASE_URL_PAGE + "mip-my-order.html");
      // return;
      const self = this
      if (!self.isMember) {
        self.loginBecomeMemberVisible = true
      } else {
        MIP.viewer.open(gConst.BASE_URL_PAGE + 'mip-my-order.html')
      }
    }
  }
}
</script>
