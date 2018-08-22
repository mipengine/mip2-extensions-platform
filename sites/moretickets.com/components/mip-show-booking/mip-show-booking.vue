<template>
  <div class="booking-page">
    <div
      class="calender-container"
      swipe-move
      swipe-up="swipeUp($event)"
      swipe-down="swipeDown($event)">
      <calendar-component
        v-if="book.aggregatedSessions"
        disable-judge="noSession(day)"
        mode="calendarMode"
        current-month="book.currentMonth"
        selected-date="book.selectedDate"/>
      <div
        v-show="book.sessions && book.sessions.length>8"
        class="simple-calendar-title">
        <span class="title">选择时间范围</span>
      </div>
      <div
        v-show="book.sessions && book.sessions.length>8"
        class="simple-calendar">
        <div
          v-for="(item,index) in dateRange"
          v-show="item.display"
          :class="{selected:item.value === selectedValue}"
          :key="index"
          class="simple-item"
          @click="selectDateRange(item)">{{ item.text }}</div>
      </div>
      <div
        class="check-list"
        active-in-view>
        <div class="check-title">
          <span class="title">选择场次</span>
        </div>
        <div class="check-container">
          <div
            v-for="(s,index) in book.dateRangeSessions"
            :key="index"
            :class="{active: s.sessionName===book.session.sessionName,'disable':!s.available}"
            class="check-item"
            @click="sessionSeleted(s)">
            <div class="check-name">
              <span v-html="formatSession(s).sessionStr"/>
              <div
                v-if="s.supportVr"
                :class="formatSession(s).tagClass"
                class="tag tag-vr">VR选座</div>
              <div
                v-if="s.supportSeatPicking && !s.supportVr"
                :class="formatSession(s).tagClass"
                class="tag tag-seat">可选座</div>
              <div
                v-if="s.showStatus.code === 2"
                :class="formatSession(s).tagClass"
                class="tag tag-presell">预售中</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="main-content"
      swipe-move
      swipe-up="swipeUp($event)"
      swipe-down="swipeDown($event)">
      <div
        class="ticket-container"
        ng-style="{'min-height': ticketContainerMin+'px'}">
        <div class="check-list">
          <div class="check-title">
            <div class="ticket-left">
              <span class="title">选择票面</span>
              <span
                v-if="!!book.show.seatPlanURL && book.show.seatPlanURL !== 'undefined'"
                class="show-seatplan"
                @click="book.showSeatplan=true">查看座位图</span>
              <br>
              <span class="tag">根据所选票面随机分配座位</span>
            </div>
            <span
              v-show="book.session.supportEticket"
              :class="{'checked' : showEticket}"
              class="show-eticket"
              @click="showEticket = !showEticket">只看电子票</span>
          </div>
          <div class="check-container">
            <div
              v-for="(sp,index) in book.session.seatPlan"
              v-if="!showEticket || (showEticket && sp.supportEticket)"
              :key="index"
              :class="{'disable':!sp.available,active: sp.seatPlanOID=== (seat && seat.seatPlanOID)}"
              class="check-item"
              @click="sp.available && seatSelected(sp)">
              <div class="check-name">
                <div class="price">
                  {{ sp.seatPlanName || (sp.originalPrice + '票面') }}
                  <span
                    v-if="sp.overflow && sp.available"
                    class="ticket-tag low-price">超值</span>
                  <span
                    v-if="sp.supportEticket"
                    class="ticket-tag tag-eticket">电子票</span>
                  <br>
                  <span class="inner-info">{{ sp.comments }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <mip-fixed type="bottom">
      <div class="book-show-footer">
        <div class="abv-footer">
          <div
            v-if="compensatedPrice ||(showTip&&hasServiceCharge)"
            class="price-overflow-tip"
            @click="controls.displayChargeTips=true">
            报价所含
            <span v-if="compensatedPrice">拆单费{{ compensatedPrice }}元</span>
            <span v-if="compensatedPrice && showTip&&hasServiceCharge()">及</span>
            <span v-if="hasServiceCharge">服务费</span>
            由第三方收取
            <div class="right-forward-icon-small"/>
          </div>
          <div class="amount-container">
            <div class="amount-label">
              选择数量
              <div class="amount-tip">本演出最多购买{{ limitation }}张</div>
            </div>
            <div class="amount-value">
              <div class="amount-ajuster">
                <div
                  :class="{disabled: count<=1}"
                  class="minus"
                  @click="minus()"/>
                <div class="number">{{ count }}</div>
                <div
                  :class="{disabled: 6<=count}"
                  class="plus"
                  @click="plus()"/>
              </div>
              <div
                :class="{checked: count<=3}"
                class="amount-tip">
                <span
                  class="checked-icon"
                  ng-show="count<=3"/>
                <span
                  v-if="seat && count<=3"
                  class="tip-content">同一订单3张及以内保证连座</span>
                <span
                  v-if="seat && count>3"
                  class="tip-content">同一订单3张以上尽可能提供连座</span>
              </div>
            </div>
          </div>
        </div>
        <div
          class="footer"
          ng-show="seat">
          <div class="text-content">
            <div class="price" >
              <span class="label">合计:</span>
              <span
                v-if=" singlePrice < originalPrice "
                class="origin-price">{{ count * originalPrice }}</span>
              {{ total||0 }}<span class="unit">元</span>
            </div>
            <div class="single-price">{{ singlePrice||0 }}元/{{ (seat && seat.seatPlanUnit && seat.seatPlanUnit.displayName) || '张' }}</div>
          </div>
          <div
            class="button"
            @click="confirmCallback()">
            下一步
          </div>
        </div>
        <!-- <bottom-popup switch="controls.displayChargeTips">
            <div class="popup-title"></div>
            <div class="popup-inner-content">
                <div class="tag-detail" v-if="compensatedPrice()">
                    <div class="tag-name charge-tag">拆单费</div>
                    <div class="tag-content">您所购买的数量，导致卖家库存仅剩一张。由于演出票品的特殊性，剩下的单张门票将增加销售成本，因此供票卖家要求额外的补偿费用，即“拆单费”</div>
                </div>
                <div class="tag-detail" v-if="hasServiceCharge()">
                    <div class="tag-name charge-tag">服务费</div>
                    <div class="tag-content">平台为100%保证卖家所提供给用户的票品为真票，对票品进行的验票鉴定服务</div>
                </div>
            </div>
        </bottom-popup> -->
      </div>
    </mip-fixed>
    <div class="content-other">
      <div
        v-if="!!book.showSeatplan && !!book.show.seatPlanURL && book.show.seatPlanURL!=='undefined'"
        class="pop"
        @click="book.showSeatplan=false"/>
      <div
        v-if="!!book.showSeatplan && !!book.show.seatPlanURL && book.show.seatPlanURL!=='undefined'"
        class="seatplan">
        <ul class="seat_title bgColor-main">
          <li>
            <a @click="book.showSeatplan=false"/>
        </li>座位图</ul>
        <div style="padding:10px 0;background-color:#fff;height:100%">
          <img :src="book.show.seatPlanURL">
        </div>
      </div>
    </div>
    <div
      v-show="pageData.toastmsg"
      class="toast-msg">
      {{ pageData.toastmsg }}
    </div>
  </div>
</template>

<style scoped lang="less">
@main-color: #ff1d41;
@dark-font: #323038;
@normal-font: #494949;
@light-font: #aaa;
@normal-border: 1px solid #e4e4e4;
@medium-font: #95949d;
.simple-calendar-title {
  padding: 1rem 1.5rem;
  font-weight: bold;
}
.simple-calendar {
  padding: 1rem 1.5rem;
  overflow-x: auto;
  display: flex;
}
.simple-item {
  flex: 1;
  border: 1px solid #eaeaeb;
  padding: 0.5rem 1rem;
  margin-right: 1rem;
  min-width: 65px;
}
.simple-item.selected {
  color: #ff1d41;
  border: 1px solid #ff1d41;
  background-color: #fff6f7;
}
.box-orient(@orient) {
  -moz-box-orient: @orient;
  -webkit-box-orient: @orient;
  box-orient: @orient;
}
.box-flex(@flex) {
  -moz-box-flex: @flex;
  -webkit-box-flex: @flex;
  box-flex: @flex;
  flex: @flex;
  display: block;
}
.booking-page {
  height: 100%;
  display: flex;
  flex-direction: column;
  color: @normal-font;
  .box-orient(vertical);
  .shadow {
    margin: 0 -1.5rem;
    height: 2rem;
    background-image: linear-gradient(
      -180deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(13, 13, 13, 0.03) 9%,
      rgba(255, 255, 255, 0.48) 100%,
      rgba(0, 0, 0, 0.75) 100%
    );
  }
  .calender-container {
    .calendar-title {
      line-height: 3rem;
      height: 3rem;
      font-size: 1.6rem;
      text-align: center;
    }
  }
  .check-list {
    font-size: 1.4rem;
    width: 100%;
    padding: 1rem 1.5rem;
    overflow: hidden;
    .check-title {
      width: 100%;
      line-height: 20px;
      .title {
        font-size: 1.6rem;
        font-weight: bold;
      }
    }
    .check-container {
      column-count: 2;
      column-gap: 2;
      .check-item {
        position: relative;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        float: left;
        break-inside: avoid;
        box-sizing: border-box;
        width: 99%;
        height: auto;
        min-height: 62px;
        margin-top: 1.5rem;
        padding: 5px 10px;
        border: 1px solid #eaeaeb;
        border-radius: 4px;
        &.active {
          color: @main-color;
          border: 1px solid @main-color;
          background-color: #fff6f7;
        }
        &.disable {
          color: @medium-font;
          border: 1px solid #f6f6f7;
          background-color: #f6f6f7;
        }
        .check-name {
          line-height: 2rem;
        }
        .tag {
          position: absolute;
          display: inline-block;
          line-height: 1;
          padding: 2px;
          font-size: 1rem;
          right: 6px;
          &.tag-1 {
            top: 22px;
          }
          &.tag-2:nth-of-type(1) {
            top: 10px;
          }
          &.tag-2:nth-of-type(2) {
            bottom: 10px;
          }
          &.tag-presell {
            color: #ff6900;
            background-color: RGBA(255, 105, 0, 0.08);
          }
          &.tag-seat {
            color: @main-color;
            background-color: RGBA(255, 29, 65, 0.08);
          }
          &.tag-vr {
            color: #576bff;
            background-color: RGBA(87, 107, 255, 0.08);
          }
        }
      }
    }
  }
  .main-content {
    overflow-y: auto;
    .box-flex(1);
    .ticket-container {
      .box-flex(1);
      .check-list {
        .check-title {
          overflow: hidden;
          .ticket-left {
            float: left;
            .show-seatplan {
              padding-left: 1rem;
              font-size: 1.1rem;
              color: #3385ff;
            }
            .tag {
              color: @medium-font;
              font-size: 1.1rem;
            }
          }
          .show-eticket {
            float: right;
            padding-left: 18px;
            line-height: 42px;
            background-image: url(~@/static/icon/eticket_unchecked.png);
            background-size: 16px;
            background-repeat: no-repeat;
            background-position: left;
            &.checked {
              background-image: url(~@/static/icon/eticket_checked.png);
              color: @main-color;
            }
          }
        }
        .check-item {
          .ticket-tag {
            font-size: 1rem;
            break-inside: avoid;
            box-sizing: border-box;
            display: inline-block;
            height: 1.4rem;
            line-height: 1.4rem;
            padding: 0 2px;
            &.low-price {
              border-radius: 2px;
              background-image: linear-gradient(118deg, #ef6856, #ff3165);
              color: #fff;
            }
            &.tag-eticket {
              background-color: RGBA(51, 133, 255, 0.08);
              color: #3385ff;
            }
          }
          .inner-info {
            color: @medium-font;
            font-size: 1.3rem;
          }
          &.active {
            .inner-info {
              color: @main-color;
            }
          }
          &.disable {
            .ticket-tag {
              &.tag-eticket {
                background-color: #eaeaec;
                color: @medium-font;
              }
            }
          }
        }
      }
    }
  }
}

.box-pack(@pack) {
  -moz-box-pack: @pack;
  -webkit-box-pack: @pack;
  box-pack: @pack;
}
.box-align(@align) {
  -moz-box-align: @align;
  -webkit-box-align: @align;
  box-align: @align;
}
.toast-msg {
  width: 180px;
  padding: 15px 10px;
  line-height: 20px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.65);
  position: absolute;
  border-radius: 5px;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  z-index: 1000;
}
.book-show-footer {
  background-color: #fff;
  .price-overflow-tip {
    background: #fffad8;
    padding: 0.7rem 0;
    padding-left: 1.5rem;
    color: @dark-font;
    text-align: left;
    font-size: 1.2rem;
    margin: 0 -1.5rem;
    border-top: 1px solid #e4e4e4;
    border-bottom: 1px solid #e4e4e4;
  }
  .right-forward-icon-small {
    float: right;
    margin-right: 1.5rem;
  }
  .amount-container {
    margin: 0 -1.5rem;
    padding: 1rem 1.5rem 0.2rem 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: auto;
    .box-pack(justify);
    .box-align(center);
    color: #494949;
    font-size: 1.4rem;
    border-top: 1px solid #e4e4e4;
    .amount-label {
      font-size: 16px;
      color: #000;
      font-weight: bold;
      line-height: 3rem;
    }
    .amount-tip {
      padding: 0.5rem 0;
      color: @medium-font;
      font-size: 11px;
      font-weight: normal;
      line-height: 2rem;
      &.checked {
        color: #fb5200;
      }
      .tip-content {
        padding-left: 0.4rem;
      }
    }
    .compensated-price {
      color: @light-font;
      font-size: 1.2rem;
      padding-right: 1rem;
    }
    .amount-ajuster {
      display: flex;
      height: 3rem;
      min-height: 3rem;
      line-height: 3rem;
      background-color: #fff;
      z-index: 10;
      justify-content: flex-end;
      .minus {
        &:before {
          content: "";
          position: absolute;
          border-top: 1px solid #494949;
          width: 1.2rem;
          top: 50%;
          left: 50%;
          transform: translateX(-50%);
        }
      }
      .number {
        width: 4rem;
        text-align: center;
      }
      .plus,
      .minus {
        border: 1px solid #cccccc;
        width: 3rem;
        height: 100%;
        position: relative;
        &.disabled {
          border: 1px dashed #ccc;
        }
      }
      .plus {
        &:before {
          content: "";
          position: absolute;
          border-top: 1px solid #494949;
          width: 1.2rem;
          top: 50%;
          left: 50%;
          transform: translateX(-50%);
        }
        &:after {
          content: "";
          position: absolute;
          border-top: 1px solid #494949;
          width: 1.2rem;
          top: 50%;
          left: 50%;
          transform: translateX(-50%) rotateZ(90deg);
          transform-origin: center cernter;
        }
      }
    }
  }
  .abv-footer {
    padding: 0 1.5rem;
  }
  .footer {
    border-top: 1px solid #f1f1f1;
    height: 6.2rem;
    min-height: 6.2rem;
    flex-basis: 6.2rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    padding: 0 1.8rem;
    .text-content {
      display: flex;
      flex-direction: column;
      font-size: 1.2rem;
      padding-right: 1rem;
      .favourable {
        font-size: 1.2rem;
        color: #aaa;
        padding-right: 0.4rem;
        text-decoration: line-through;
      }
      .label {
        font-size: 1.4rem;
        padding-right: 0.4rem;
      }
      .price {
        padding-left: 0.5rem;
        color: @main-color;
        font-size: 1.8rem;
        font-weight: bold;
        vertical-align: baseline;
        .origin-price {
          color: @medium-font;
          text-decoration: line-through;
          font-weight: normal;
        }
        .label {
          color: @dark-font;
          font-size: 1.4rem;
        }
      }
      .single-price {
        text-align: right;
        color: @medium-font;
        font-size: 1.2rem;
      }
      .unit {
        color: @medium-font;
        font-size: 1.2rem;
        font-weight: normal;
        padding-left: 2px;
      }
    }
    .button {
      width: 13rem;
      height: 4.5rem;
      line-height: 4.5rem;
      text-align: center;
      border-radius: 2px;
      color: #fff;
      font-size: 16px;
      background-image: linear-gradient(289deg, #ff1d41, #ee0e87);
    }
  }
}
</style>

<script>
import { httpGet } from '@/common/httpUtil'
import * as sessionStorageUtil from '@/common/sessionStorageUtil'
import * as adapterStorageUtil from '@/common/adapterStorageUtil'
import { templateCompile } from '@/common/urlUtil'

export default {
  props: {
    prefixUrl: {
      type: String,
      default: ''
    },
    sessionParUrl: {
      type: String,
      default: ''
    },
    sessionUrl: {
      type: String,
      default: ''
    },
    nextUrl: {
      type: String,
      default: ''
    },
    loginUrl: {
      type: String,
      default: ''
    },
    info: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      book: {
        sessions: [],
        dateRangeSessions: [],
        show: {},
        session: {
          seatPlan: []
        }
      },
      seat: {},
      count: 0,
      showEticket: false,
      limitation: 0,
      token: '',
      pageData: {
        toastmsg: ''
      },
      dateRange: [
        { text: '全部', value: 365, display: false },
        { text: '今天', value: 0, display: false },
        { text: '一周内', value: 7, display: false },
        { text: '二周内', value: 14, display: false },
        { text: '三周内', value: 21, display: false },
        { text: '一个月', value: 30, display: false },
        { text: '二个月', value: 60, display: false },
        { text: '三个月', value: 90, display: false }
      ],
      selectedValue: 365
    }
  },
  computed: {
    compensatedPrice () {
      let _self = this
      if (!_self.count || !_self.seat) {
        return
      }
      if (_self.seat && _self.seat.compensatedPrice !== undefined) {
        return _self.seat.compensatedPrice
      }
      return (
        _self.seat &&
        _self.seat.tickets &&
        _self.seat.tickets[(_self.count || 1) - 1].compensatedPrice
      )
    },
    originalPrice () {
      let _self = this
      return _self.seat && _self.seat.originalPrice
    },
    singlePrice () {
      let _self = this
      if (_self.seat && _self.seat.price) {
        return _self.seat.price
      }
      return (
        _self.seat &&
        _self.seat.tickets &&
        _self.seat.tickets[(_self.count || 1) - 1].price
      )
    },
    total () {
      let _self = this
      if (!_self.count || !_self.seat) {
        return
      }
      return _self.count * _self.singlePrice || 0
    },
    hasServiceCharge () {
      let _self = this
      return (
        _self.total - _self.compensatedPrice > _self.count * _self.originalPrice
      )
    },
    baiduIsLogin () {
      return this.info && this.info.isLogin
    }
  },
  mounted () {
    sessionStorageUtil.syncSessionData()
    let _self = this
    this.prefixUrl && sessionStorageUtil.set('prefix', this.prefixUrl)
    if (MIP.hash.get('id')) {
      _self.fetchShow(MIP.hash.get('id'))
    }
    _self.limitation = adapterStorageUtil.get('buy_num_limit') || 0
    // 自定义login事件
    this.$on('baiduLogin', event => {
      // 百度登录后
      if (event.userInfo && event.userInfo.openid) {
        adapterStorageUtil.set('bd_openid', event.userInfo.openid)
      }
      if (event.userInfo && event.userInfo.sessionId) {
        sessionStorageUtil.set('bd_session', event.sessionId)
      }
      if (
        event.userInfo &&
        event.userInfo.bindMobile &&
        event.userInfo.tsessionid
      ) {
        sessionStorageUtil.set('mtl_session', event.userInfo.tsessionid)
        _self.saveUserSelect(false)
      } else {
        _self.saveUserSelect(false)
        sessionStorageUtil.set('login_back_url', _self.nextUrl)
        _self.loginUrl && MIP.viewer.open(_self.loginUrl)
      }
    })
    // 自定义error事件
    this.$on('baiduLoginError', event => {
      // 百度登录后
      _self.saveUserSelect(false)
      this.$emit('showlogin', {})
      // sessionStorageUtil.set("login_back_url", _self.nextUrl);
      // _self.loginUrl && MIP.viewer.open(_self.loginUrl);
    })

    // 在页面切换，也就是 <iframe> 展现/隐藏时，会在页面中触发切换事件
    window.addEventListener('show-page', () => {
      if (MIP.hash.get('id')) {
        _self.fetchShow(MIP.hash.get('id'))
      }
    })
  },
  methods: {
    toast (msg, timeout) {
      let me = this
      if (msg !== '') {
        timeout = timeout || 2000
        me.pageData.toastmsg = msg
        setTimeout(() => {
          me.pageData.toastmsg = ''
        }, timeout)
      }
    },
    sessionSeleted (session) {
      if (session && !session.available) return
      let self = this
      self.book.session = session
      let showSessionOID = session.showSessionOID
      let locationCityOIDQuery = MIP.getData('#locationCityOID')
        ? `locationCityOID=${MIP.getData('#locationCityOID')}`
        : ''
      let fetchURL = templateCompile(this.sessionParUrl, {
        showSessionOID,
        locationCityOIDQuery
      })
      httpGet(fetchURL).then(function (data) {
        self.mySeats = data.result.data
        self.book.session.seatPlan = self.mySeats
        self.token = data.result.token
        self.seat = self.findAvailabeItem(
          self.book.session.seatPlan,
          'available'
        )
        self.count = 1
        // listTracker.push({"showSessionOID":self.session.showSessionOID,"seatPlanOID":self.seat ? self.seat.seatPlanOID : "", "count":self.ct});
      })
    },
    seatSelected (seat) {
      let self = this
      self.count = 1
      self.seat = seat
      // listTracker.push({"showSessionOID":self.session.showSessionOID,"seatPlanOID":self.seat.seatPlanOID,"count":self.ct});
    },
    saveUserSelect (checkSeat) {
      let me = this
      if (this.count > 0 && this.seat) {
        adapterStorageUtil.set('token', this.token)
        adapterStorageUtil.set('showOID', this.book.session.showOID)
        adapterStorageUtil.set('sessionName', this.book.session.sessionName)
        adapterStorageUtil.set('sessionID', this.book.session.showSessionOID)

        if (this.seat.tickets && this.seat.tickets.length > 0) {
          let currentTicket = this.seat.tickets[this.count - 1]
          adapterStorageUtil.set(
            'seller_totalSalePrice',
            currentTicket.price * this.count
          )
          adapterStorageUtil.set(
            'seller_compensatedPrice',
            currentTicket.compensatedPrice || 0
          )
          adapterStorageUtil.set('seller_name', currentTicket.sellerName)
          adapterStorageUtil.set('seller_ticketOID', currentTicket.ticketOID)
        }
        adapterStorageUtil.set('ticketOriginalPrice', this.seat.originalPrice)
        adapterStorageUtil.set('ticketOriginalName', this.seat.seatPlanName)
        adapterStorageUtil.set('ticketOriginalOID', this.seat.seatPlanOID)
        adapterStorageUtil.set(
          'ticketUnitCNName',
          (this.seat.seatPlanUnit && this.seat.seatPlanUnit.displayName) || ''
        )
        adapterStorageUtil.set('ticketComments', this.seat.comments)
        adapterStorageUtil.set('count', this.count)
        if (MIP.getData('#locationCityOID')) {
          adapterStorageUtil.set(
            't_locationCityOID',
            MIP.getData('#locationCityOID')
          )
        }
        return true
      } else if (checkSeat) {
        me.toast('选择一个可用票面')
        return false
      } else {
        return false
      }
    },
    confirmCallback () {
      //  else if (adapterStorageUtil.get("bd_openid")) {
      //   this.nextUrl && MIP.viewer.open(this.nextUrl);
      // }
      if (this.saveUserSelect(true)) {
        let loginInfo = MIP.getData('info')
        if (loginInfo.isLogin || this.baiduIsLogin) {
          this.nextUrl && MIP.viewer.open(this.nextUrl)
        } else {
          this.$emit('showlogin', {})
        }
      }
    },
    findAvailabeItem (list, prop, value) {
      if (typeof value !== 'function') {
        let _val = value
        value = function (v) {
          return (!!_val && v === _val) || (!_val && v)
        }
      }
      if (list && prop) {
        for (let i = 0; i < list.length; i++) {
          let item = list[i]
          if (value(item[prop])) {
            return item
          }
        }
      }
      return null
    },
    fetchShow (id, callback) {
      if (!id) return
      let _self = this
      let featchUrl = templateCompile(this.sessionUrl, { id })
      httpGet(featchUrl)
        .then(function (data) {
          if (data.statusCode === 200) {
            _self.token = data.result.token
            if (data.result.data && data.result.data.length > 0) {
              _self.book.dateRangeSessions = _self.book.sessions = data.result.data
              _self.dateRange.map(item1 => {
                _self.book.dateRangeSessions.find(item2 => {
                  let calcInitDate = (new Date()).setHours(0, 0, 0, 0) // 当天凌晨0点
                  let diffTime = item2.showTime_long - calcInitDate
                  let diffDay = Math.floor(diffTime / 86400000)
                  item1.display = item1.value >= diffDay
                  return item1.display
                })
              })

              _self.book.session = _self.book.sessions.find(item => {
                return (
                  item.available && item.seatPlan && item.seatPlan.length > 0
                )
              })
              if (
                _self.book.session &&
                _self.book.session.seatPlan &&
                _self.book.session.seatPlan.length > 0
              ) {
                _self.seat = _self.book.session.seatPlan.find(item => {
                  return item.available
                })
              }
            }
            _self.ticketMaxBuyCount =
              (_self.seat && _self.seat.tickets.length) || 0
            _self.count = (_self.seat && _self.seat.tickets.length) > 0 ? 1 : 0
            typeof callback === 'function' && callback()
          } else {
            _self.toast('该演出无任何场次数据')
          }
        })
        .catch(function (err) {
          console.log(err)
        })
    },
    selectDateRange (item) {
      let me = this
      me.selectedValue = item.value
      let dateRangeEndDate = new Date()
      dateRangeEndDate.setDate(dateRangeEndDate.getDate() + item.value)
      if (me.book.sessions && me.book.sessions.length > 0) {
        me.book.dateRangeSessions = me.book.sessions.filter(item2 => {
          return new Date(item2.showTime_long) < dateRangeEndDate
        })
        if (me.book.dateRangeSessions && me.book.dateRangeSessions.length > 0) {
          me.book.session = me.book.dateRangeSessions.find(item3 => {
            return item3.available
          })
          if (
            me.book.session &&
            me.book.session.seatPlan &&
            me.book.session.seatPlan.length > 0
          ) {
            me.seat = me.book.session.seatPlan.find(item => {
              return item.available
            })
          } else if (me.book.session) {
            me.sessionSeleted(me.book.session)
          }
        }
      }
    },
    formatSession: function (session) {
      let sessionName = session.sessionName
      if (sessionName.indexOf('星期') > -1) {
        sessionName = sessionName.replace(/星期/, '周')
      }
      let sessionStr = sessionName
      let tagNum = 0
      session.showStatus && session.showStatus.code === 2 && tagNum++ // 预售
      session.supportSeatPicking && tagNum++ // 可选座
      let strArray = sessionName.split(' ')
      if (sessionName.indexOf('星期') > -1 || sessionName.indexOf('周') > -1) {
        if (strArray.length === 3) {
          // yyyy-mm-dd 星期/周x hh:mm
          if (tagNum > 0) {
            // 有标签
            sessionStr = strArray[0] + '<br>' + strArray[1] + ' ' + strArray[2]
          } else {
            // 无标签
            sessionStr = strArray[0] + ' ' + strArray[1] + '<br>' + strArray[2]
          }
        }
      } else {
        if (strArray.length === 2) {
          sessionStr = strArray[0] + '<br>' + strArray[1]
        } else if (strArray.length === 3) {
          sessionStr = strArray[0] + '<br>' + strArray[1] + ' ' + strArray[2]
        }
      }
      return {
        sessionStr: sessionStr,
        tagClass: 'tag-' + tagNum
      }
    },
    minus () {
      if (this.count > 1) {
        this.count--
      }
    },
    plus () {
      if (this.count < this.ticketMaxBuyCount) {
        this.count++
      }
    },
    tips () {
      return [
        '演出详情仅供参考，具体信息以主办方公布信息及现场为准，请准时到场以免错过演出。',
        '鉴于文体演出票品特殊性（具有时效性、唯一性等特征），一旦用户与卖家达成有效订单代表交易协议生效，用户不能主动要求取消交易（因演出活动被取消或延期除外）。',
        '鉴于票品的不可复制性与稀缺性，本平台对每个演出（活动）均设有限购数量，平台有权无理由取消任何用户超过限购数量的交易，平台识别同一用户的方式包括但不限于同一注册手机号、同一收货手机号、同一快递地址、同一付款账户、同一下单设备等。',
        '本平台尽最大努力促使卖家对交易协议的履行，如果卖家付票过程中发生问题，本平台可寻求其它卖家提供更高票面或相同票面更好位置票品代替，否则，平台将全额退款并按订单上约定的赔付方式与金额向用户进行赔付，详细规则请见<常见问题-无票赔付>。'
      ]
    }
  }
}
</script>
