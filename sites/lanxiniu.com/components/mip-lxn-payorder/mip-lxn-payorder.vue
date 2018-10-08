<template>
  <div
    id="payorder"
    class="wrapper">
    <div class="pay-head">
      <div class="content">
        <div class="pay-address">
          <div class="item left">
            <span
              class="title"
              v-text="head.moveOut"/>
            <p v-text="head.moveOutfloor"/>
          </div>
          <div class="item center">
            <p
              class="title"
              v-text="head.carType"/>
            <p class="img arrow"/>
          </div>
          <div class="item right">
            <span
              class="title"
              v-text="head.moveIn"/>
            <p v-text="head.moveInfloor"/>
          </div>
        </div>
      </div>
    </div>
    <div class="pay-content">
      <div class="head">
        <div class="arrow-down"/>
        <div class="">费用明细</div>
      </div>
      <div class="pay-list">
        <ul>
          <li
            v-for="item in pillList"
            :class="{title:item.billName==='订金'}"
            :key="item.billName">
            <span v-text="item.billName"/>
            <span
              v-if="item.billName==='订金'"
              class="sub"
              v-text="item.sub"/>
            <span v-text="item.billMount"/>
          </li>
        </ul>
      </div>

      <div class="head">
        <div class="arrow-down"/>
        <div class="">完善信息</div>
      </div>
      <div class="remark">
        <ul>
          <li>
            <div>
              搬家时间
            </div>
            <div
              class="actives inputfix"
              @click="picker()">
              <input
                v-model="moveTime"
                type="text"
                placeholder="请选择搬家时间">
            </div>
          </li>
          <li>
            <div>
              联系人
            </div>
            <div>
              <input
                v-model="userPhone"
                type="number"
                placeholder="请填写联系方式"
                @input="setUserPhone">
            </div>
          </li>
          <li>
            <div>
              备注
            </div>
            <div>
              <input
                v-model="remark"
                type="text"
                placeholder="请填写备注信息"
                @input="setRemark">
            </div>
          </li>
        </ul>
      </div>

      <div class="head">
        <div class="arrow-down"/>
        <div class="">收费说明<a href="tel:4006785966">(咨询客服:400-678-5966)</a></div>
      </div>
      <div class="des">
        <div>
          <div class="point"/>
          <div>
            <p>额外服务费<span class="red">(服务时按实际收取)</span></p>
            <p>大件搬运、拆装、加工人、多地装卸费、高速费停车费</p>
          </div>
        </div>
        <div>
          <div class="point"/>
          <div>
            <p>取消费<span>(未服务免费取消)</span></p>
            <p>服务前40分钟可免费取消，临近服务时间或司机已上门，会收取取消费</p>
          </div>
        </div>
      </div>
      <div class="zhankong"/>

    </div>

    <mip-fixed type="bottom">
      <div class="footer">
        <p
          data-stats-baidu-obj="%7B%22type%22%3A%22click%22%2C%22data%22%3A%5B%22_trackEvent%22%2C%22payorder%22%2C%22click%22%5D%7D"
          class="sure-order"
          @click="sureOrder">
          {{ btnText }}
        </p>
      </div>
    </mip-fixed>

    <div
      v-show="warn.show"
      class="layer"
      @touchstart.prevent/>
    <div
      v-show="warn.show"
      class="layer-content zoomIn">
      <p
        class="layer-text"
        v-text="warn.texts"/>
      <p
        class="layer-sure active-layer"
        @touchend.stop.prevent="closeLayer">知道了</p>
    </div>
  </div>
</template>

<script>
import base from '../../common/utils/base'
import '../../common/utils/base.less'
import picker from '../../common/utils/picker.js'

base.setHtmlRem()
export default {
  props: {
    globaldata: {
      type: Object,
      default: function () {
        return {}
      }
    },
    payConfig: {
      type: Object,
      default: function () {
        return {}
      }
    },
    userlogin: {
      type: Object,
      default: function () {
        return {}
      }
    },
    mipClickToken: {
      type: String,
      default: function () {
        return ''
      }
    }
  },
  data () {
    return {
      head: {
        // time: '-',
        moveOut: '-',
        moveOutfloor: '-',
        carType: '-',
        moveIn: '-',
        moveInfloor: '-'
      },
      pillList: [
        // {
        //   billName: '起步价(小面)',
        //   billMount: '96元'
        // },
      ],
      interval: '',
      //   frontMoney: '-',
      //   useFontMoney: true,
      //   beizhu: '备注',
      remark: '',
      moveTime: '', // 搬家时间
      userPhone: '', // 联系方式
      btnText: '下一步',
      currentOrder: {
        order: ''
      },
      warn: {
        // 弹窗
        show: false,
        texts: ''
      },
      debounceTimeout: ''
    }
  },

  mounted () {
    // window.addEventListener('hide-page', e => {
    //   this.interval && clearInterval(this.interval)
    // })
    // // this.setList()
    // console.log('这里是支付页面 !')
    // this.$element.customElement.addEventAction('login', (event, str) => {
    //   this.interval = setInterval(() => {
    //     if (this.userlogin.sessionId !== '') {
    //       this.initData()
    //       clearInterval(this.interval)
    //     }
    //   }, 200)
    // })

    // if (this.userlogin.sessionId !== '') {
    //   this.initData()
    // }

    // $emit
    this.init()
    this.addMipWatch()
    this.calPrice()
  },
  methods: {
    init () {
      let lxnData = base.getSession()
      let moveout = lxnData.moveOutAddress
      let movein = lxnData.moveInAddress
      let moveOutNum = +lxnData.moveOutAddress.floor
      let moveInNum = +lxnData.moveInAddress.floor
      let floorData = [
        '有电梯',
        '无电梯1楼',
        '无电梯2楼',
        '无电梯3楼',
        '无电梯4楼',
        '无电梯5楼',
        '无电梯6楼',
        '无电梯7楼',
        '无电梯8楼'
      ]
      let carType = {
        '3': '小面',
        '2': '金杯',
        '23': '大面包',
        '20': '4.2米厢货'
      }

      this.head.moveOut = moveout.localtion.name
      this.head.moveIn = movein.localtion.name
      this.head.moveOutfloor = floorData[moveOutNum]
      this.head.moveInfloor = floorData[moveInNum]
      this.head.carType = carType[String(lxnData.currentCarItem.carType)]

      if (lxnData.orderTime !== '') {
        this.moveTime = base.timeformat(new Date(lxnData.orderTime * 1000), 'yyyy-MM-dd hh:mm')
      }
      if (lxnData.phone !== '') {
        this.userPhone = lxnData.phone
      }
      if (lxnData.remark !== '') {
        this.remark = lxnData.remark
      }
    },
    // 添加tab监听
    addMipWatch () {
      this.$element.customElement.addEventAction('login', (event, str) => {
        console.log('查看登录的信息:' + JSON.stringify(event, null, 2))

        if (event.origin === 'actionPay') {
          this.checkData(event.sessionId)
        }

        if (MIP.util.platform.isWechatApp()) {
          console.log('在微信内')
          let wxauth = event.userInfo.wxauth
          let promas = base.getRequest()
          if (+wxauth === 1 && !promas.hasOwnProperty('istop')) {
            MIP.viewer.open(
              'https://www.lanxiniu.com/Weixin/auth?token=' +
                event.sessionId +
                '&redirect_url=' +
                location.href +
                '&isdev=1',
              { isMipLink: false }
            )
          }
        } else {
          console.log('不是微信内')
        }
      })
    },
    // 计算订单价格
    calPrice () {
      let lxnData = base.getSession()
      let focusCity = lxnData.ordercity
      let carType = lxnData.currentCarItem.carType
      let kilometer = lxnData.kilometer
      let orderTime = lxnData.orderTime
      let moveOutNum = lxnData.moveOutAddress.floor
      let moveInNum = lxnData.moveInAddress.floor
      let sessionId = this.userlogin.sessionId
      let data = {
        from: 'baidumip',
        orderCity: focusCity, // 下单城市
        carType: carType, // 车型（影响费用）
        kilometer: kilometer, // 公里数
        orderTime: orderTime, // 服务时间(时间戳 单位s)
        start_stairs_num: moveOutNum, // 搬出楼层 code
        end_stairs_num: moveInNum, // 搬入楼层 code
        couponsId: 0, // 所用的优惠券id(默认0)
        channel: 15, // 下单渠道(默认15)
        orderType: 5, // 订单类型
        serverType: 100, // 服务类型(默认100)
        square: 0, // 平米数(默认0)
        cityCode: 12, // 城市code
        sessionId: sessionId
      }
      let urls = base.url + '//Order/calPrice?' + base.setUrlParam(data)

      window
        .fetchJsonp(urls, {
          method: 'get'
        })
        .then(response => response.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
          let data = response.data
          console.log(JSON.stringify(data, null, 2))
          if (data.fareInfo) {
            let fareInfo = data.fareInfo
            let unit = '元'
            if (fareInfo.basicInfo && +fareInfo.basicInfo.fare > 0) {
              this.pillList.push({
                billName: '起步价',
                billMount: +fareInfo.basicInfo.fare + unit
              })
            }
            if (fareInfo.extraInfo && +fareInfo.extraInfo.fare > 0) {
              this.pillList.push({
                billName: '超里程费',
                billMount: +fareInfo.extraInfo.fare + unit
              })
            }
            if (fareInfo.carryMoneyInfo && +fareInfo.carryMoneyInfo.fare > 0) {
              this.pillList.push({
                billName: '无电梯楼层费',
                billMount: +fareInfo.carryMoneyInfo.fare + unit
              })
            }
            if (+data.couponsDisplay > 0) {
              this.pillList.push({
                billName: '优惠券',
                billMount: '-' + data.couponsDisplay + unit
              })
            }
            this.pillList.push({
              billName: '合计',
              billMount: +fareInfo.fare + unit
            })

            let dingjin = 60
            if (+carType === 2 || +carType === 23) {
              dingjin = 100
            }
            if (+carType === 20) {
              dingjin = 150
            }

            this.pillList.push({
              billName: '订金',
              sub: '(付订金即可预约)',
              billMount: dingjin + unit
            })
          }
        })
    },
    // 确认下单
    sureOrder () {
    //   this.checkData()
      let islogin = this.userlogin.isLogin
      let sessionId = this.userlogin.sessionId
      if (islogin) {
        console.log('已经登录')
        this.checkData(sessionId)
      } else {
        console.log('未登录')
        let config = {
          redirectUri: ''
        }
        MIP.setData({ config: config })
        this.$nextTick(() => {
          this.$emit('actionOrder')
        })
      }
    },
    // 提交订单前检查数据
    checkData (sessionId) {
      // 搬家时间
      let time = this.moveTime
      let phone = this.userPhone

      let Nowtime = Date.parse(new Date(new Date().getTime() - 1800000))
      let orderTime = base.getSession().orderTime * 1000
      console.log(Nowtime)
      console.log(orderTime)

      if (time) {
        if (orderTime < Nowtime) {
          this.openLayer('搬家时间不能早于当前时间半小时')
        } else {
          if (phone) {
            if (this.checkPhone(phone)) {
              console.log('可以提交订单')
              // let sessionid = base.getbaiduLogMsg()
              let sessionid = this.userlogin.sessionId
              console.log('本地取id:' + sessionid)
              this.upOrder(sessionid)
            } else {
              this.openLayer('手机号格式不正确')
            }
          } else {
            this.openLayer('请填写联系方式')
          }
        }
      } else {
        this.openLayer('请选择搬家时间')
      }
    },
    // 提交订单
    upOrder (sessionid) {
      console.log('查看ID:' + sessionid)
      let promas = base.getRequest()
      let lxnData = base.getSession()

      let moveout = lxnData.moveOutAddress
      let movein = lxnData.moveInAddress
      let kilometer = lxnData.kilometer
      let orderCity = lxnData.ordercity
      let orderTime = lxnData.orderTime
      let carType = lxnData.currentCarItem.carType
      let startSairsNum = moveout.floor
      let endStairsNum = movein.floor
      let remark = lxnData.remark
      let fr = ''
      if (promas.hasOwnProperty('fr')) {
        fr = promas.fr
      }

      let moveOutRemark = ''
      let moveInRemark = ''
      if (moveout.address) {
        moveOutRemark = '(' + moveout.address + ')'
      }
      if (movein.address) {
        moveInRemark = '(' + movein.address + ')'
      }

      let poiList = [
        {
          deliver: '',
          deliverAddress: moveout.localtion.name,
          deliverCity: moveout.localtion.city,
          deliverLat: moveout.localtion.location.lat,
          deliverLng: moveout.localtion.location.lng,
          deliverPhone: lxnData.phone,
          deliverRemark: moveout.localtion.address + moveOutRemark,
          deliverType: 1
        },
        {
          deliver: '',
          deliverAddress: movein.localtion.name,
          deliverCity: movein.localtion.city,
          deliverLat: movein.localtion.location.lat,
          deliverLng: movein.localtion.location.lng,
          deliverPhone: lxnData.phone,
          deliverRemark: movein.localtion.address + moveInRemark,
          deliverType: 2
        }
      ]
      let data = {
        fr: fr, // 来自哪里
        Kilometer: kilometer, // 公里数
        TransTime: orderTime, // 服务时间
        orderCity: orderCity, // 下单城市
        CarType: carType, // 车型
        start_stairs_num: startSairsNum, // 搬出楼层
        end_stairs_num: endStairsNum, // 搬入楼层
        OrderNum: '', // 订单号,（空为新建订单）
        Remark: '', // 订单备注信息
        SafePrice: '', // 保价金额
        couponsId: this.couponsId, // 订单所用的优惠券id
        detailType: '', // 详细的子车型
        discountAmount: '', // 折扣总额
        networkenvironment: '', // 网络环境
        orderFrom: 16, // 订单来源
        userLat: '', // 用户所在纬度
        userLog: '', // 用户所在经度
        orderType: 5, // 订单类型
        usedServeType: 100, // 服务类型
        carringType: 0, // 是否需要搬运， 0 无需
        receiptType: 0, // 是否需要回单， 0 不需要回单
        returnMoneyType: '', // 是否需要回款
        remark: remark
      }
      console.log(JSON.stringify(data, null, 2))
      console.log('查看mipclicktoken' + this.mipClickToken)
      let updata = {
        from_detail: 'baidu',
        fr: 'xiongzhanghao',
        click_token: this.mipClickToken,
        token: sessionid,
        couponsId: this.couponsId,
        OrderNum: '', // 订单号(空为新建订单)这里默认新建订单
        assignCarType: 0, // 默认个人选择
        poiList: JSON.stringify(poiList), // 配送地点信息
        data: JSON.stringify(data) // 订单信息
      }
      let urls = base.url + '//Order/update?' + base.setUrlParam(updata)
      //   this.fetchShow = true
      window
        .fetchJsonp(urls, {
          method: 'get'
        })
        .then(response => response.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
          //   this.fetchShow = false
          if (+response.code === 0) {
            let data = response.data
            console.log('查看订单号:' + data.OrderNum)
            this.currentOrder.order = data
            this.payOrders()
          } else {
            this.openLayer(response.msg)
          }

        //   }
        })
    },
    // 支付
    payOrders () {
      let lxndata = this.currentOrder
      let orderNum = lxndata.order.OrderNum
      let price = ''
      let billTotal = lxndata.order.billTotal
      if (lxndata.order.frontMoney) {
        let money = lxndata.order.frontMoney
        if (+money !== 0) {
          price = money + '元'
        } else {
          price = billTotal
        }
      } else {
        price = billTotal
      }
      //   let price = lxndata.order.billTotal
      //   let price = lxndata.order.frontMoney
      //   let sessionid = base.getbaiduLogMsg()
      let sessionid = this.userlogin.sessionId
      console.log('token:' + sessionid + '======' + 'orderNum:' + orderNum)
      let urlsParam = base.setUrlParam({
        orderNum: orderNum,
        sessionId: sessionid,
        remark: this.remark,
        total_fee: price,
        ver: 2.0
      })
      let obj = {
        sessionId: sessionid,
        redirectUrl: 'https://www.lanxiniu.com/Pay/success?' + urlsParam,
        fee: price,
        postData: {
          orderNum: orderNum,
          token: sessionid,
          remark: this.remark,
          ver: 2.0
        }
      }
      MIP.setData({
        payConfig: MIP.util.fn.extend({}, this.payConfig, obj)
      })
      this.$emit('actionPay', {})
    },
    // 设置联系方式
    setUserPhone (e) {
      console.log(this.userPhone)

      if (this.debounceTimeout) {
        clearTimeout(this.debounceTimeout)
      }
      this.debounceTimeout = setTimeout(() => {
        let lxnData = base.getSession()
        lxnData.phone = this.userPhone
        this.setGlobalData(lxnData)
      }, 300)
    },
    // 设置 备注
    setRemark () {
      if (this.debounceTimeout) {
        clearTimeout(this.debounceTimeout)
      }
      this.debounceTimeout = setTimeout(() => {
        let lxnData = base.getSession()
        lxnData.remark = this.remark
        this.setGlobalData(lxnData)
      }, 300)
    },
    // 设置全局数据
    setGlobalData (obj) {
      let data = base.mipExtendData(this.globaldata, obj)
      base.mipSetGlobalData(obj)
      base.setSession(data)
    },
    // 选择器关闭
    pickerMaskClose () {
      let element = this.$element
      let picker = element.querySelector('.picker')
      picker.classList.remove('open')
      let elementParentNode = element.parentNode
      setTimeout(function () {
        if (elementParentNode.tagName === 'MIP-FIXED') {
          MIP.util.css(elementParentNode, {
            height: 'auto'
          })
        }

        MIP.util.css(element, {
          height: 'auto'
        })
      }, 10)
    },
    picker () {
      let that = this
      let Picker = picker.Picker()
      let params = ''
      let lxnData = base.getSession()
      params = {
        title: ' ',
        pickerType: 'time',
        type: 5,
        defaultValue: '',
        separator: '',
        successCallback: function (val) {
          that.moveTime = val.value
          let values = val.value.replace(/-/g, '/')
          let date = Date.parse(new Date(values)) / 1000
          lxnData.orderTime = date
          that.setGlobalData(lxnData)
        },
        cancelCallback: function () {
          that.pickerMaskClose()
        },
        createCallback: function () {
          let mask = that.$element.querySelector('.picker-mask')
          mask.addEventListener('click', function (e) {
            that.pickerMaskClose()
            that.cityPicker.hidePicker()
          })
        }
      }
      that.cityPicker = new Picker(params, that.$element)
    },
    // 关闭弹窗
    closeLayer () {
      this.warn.show = false
    },
    // 打开弹窗
    openLayer (str) {
      let warn = this.warn
      warn.show = true
      warn.texts = str
    },
    // 校验电话号码
    checkPhone (phone) {
      if (!/^1(3|4|5|7|8)\d{9}$/.test(phone)) {
        return false
      }
      return true
    }

  }
}
</script>

<style scoped lang="less">
.pay-head .content {
  background: #36a0e9;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  text-align: center;
  color: #ffffff;
  padding: 0.32rem 0.3975rem;
}
.pay-address {
  margin-top: 0.1rem;
  display: flex;
  > div.item {
    flex: 1;
    height: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  > div span.title {
    font-size: 0.28rem;
  }
  > div p:last-child {
    font-size: 0.24rem;
    margin-top: 0.05rem;
  }
  .left {
    text-align: left;
  }
  .center {
    align-items: center;
    padding-top: 0.1rem;
    font-size: 0.24rem;
  }
  .right {
    text-align: right;
  }
}
.pay-content {
  padding: 0 0.2rem;
  .head {
    padding: 0.2rem 0;
    padding-top: 0.24rem;
    font-size: 0.24rem;
    color: #555555;
    letter-spacing: 0.05px;
    display: flex;
    align-items: center;
    .arrow-down {
      margin-right: 0.08rem;
      width: 0.08rem;
      height: 0.32rem;
      background: #36a0e9;
    }
    a {
      color: #36a0e9;
    }
  }
}

.pay-list {
  padding: 0 0.3975rem;
  background: #ffffff;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.1);
  border-radius: 2px;
  li {
    font-size: 0.28rem;
    color: #333;
    letter-spacing: 0.06px;
    padding: 0.24rem 0;
    border-bottom: 0.02rem solid #f1f1f1;
  }
  li span:last-child {
    float: right;
  }
  li.title span:first-child {
    font-weight: 700;
  }
  li.title span:last-child {
    font-size: 0.32rem;
    color: #ff6666;
    letter-spacing: 0.07px;
  }
  li:last-child {
    border-bottom: none;
  }
  .sub{
    font-size: 0.2rem !important;
    color: #666;
  }
}

.remark {
  //   margin-top: 0.2rem;
  padding: 0 0.3975rem;
  background: #ffffff;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.1);
  border-radius: 2px;
  li {
    color: #555555;
    letter-spacing: 0.06px;
    // height: 0.8rem;
    display: flex;
    align-items: center;
    border-bottom: 0.02rem solid #f1f1f1;
  }
  li:last-child {
    border-bottom: none;
  }
  li div:last-child {
    flex: 1;
    justify-content: flex-end;
    height: 100%;
    padding-left: 0.1rem;
    input {
      height: 0.8rem;
      text-align: right;
      font-size: 0.28rem;
    }
  }
}
.actives:active {
  transform: translate(0.02rem, 0.02rem);
  background: rgba(0, 0, 0, 0.02);
}
.inputfix {
  position: relative;
  display: block;
  height: 100%;
  width: 100%;
  &::before {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    content: "";
    background-color: rgba(0, 0, 0, 0);
  }
}

.des {

  padding: 0 0.3975rem;
  background: #ffffff;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.1);
  border-radius: 2px;
  > div {
    display: flex;
    align-items: center;
    padding: 0.2rem 0;
    font-size: 0.28rem;
    color: #333333;
    letter-spacing: 0.06px;
    p:last-child {
      font-size: 0.2rem;
      color: #999999;
      letter-spacing: 0.04px;
      margin-top: 0.05rem;
    }
    span {
      font-size: 0.2rem;
      color: #666;
    }
    span.red {
      color: #fe6d6d;
    }
  }
  > div:first-child {
    border-bottom: 0.02rem solid #f1f1f1;
  }
  .point {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #d1d1d1;
    margin-right: 0.3rem;
  }
}
.footer {
  border-top: 0.02rem solid #f1f1f1;
  background: #ffffff;
  padding: .28rem 0.2rem;
  .baoxian {
    background: #fcf0ae;
    display: flex;
    justify-content: center;
    font-size: 0.2rem;
    color: #666666;
    align-items: center;
    padding: 0.1rem 0;
    // padding-left: 0.2rem;
    margin-bottom: .1rem;
    .tips {
      margin-right: 0.1rem;
      display: inline-block;
      width: 0.28rem;
      height: 0.28rem;
      background-size: 100% 100%;
      background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAY1BMVEUAAABxx2Byx2F3zm9yx19xx2Bxx2BzyGFyx19xx19xx2Bxx19xx19yx2ByyGBzymR9zmJyxmBxx2Bxx19xx19yx19xx2ByyGByyGBzyGF0yGJ1y2KI3mZxx19xx2B1x2Fxxl8FL1ThAAAAIHRSTlMA+V4K9bLIPtzN6uW5qVYbD/LhvqObkG1kQCkTB6mFMlLCCsgAAACrSURBVCjPrdLJDgIhDIDhAsMMzL7vat//KU2kKY7gSf9b86UHSOHSw9gd4jUTIoq5iVA2CnSVUoFvW+46x7eErSZJ2GGkjhBjiT9jMtsA2TbYQyTLANYQq55MYoAjtClZiKaFdmDz6D41VQDeMCE0bhzOl1GGUNOsmwU5TVhjJEl4FqHlCr6vSuCqT9PgUyly/CzusBc74JLS3m68x8ncUVFDJLWWRU93+WNPmLcwoQe88x0AAAAASUVORK5CYII=);
    }
  }
  .sure-order {
    text-align: center;
    // margin: 0.28rem 0;

    height: 0.76rem;
    line-height: 0.76rem;
    font-size: 0.34rem;
    color: #ffffff;
    background: #36a0e9;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.3);
    border-radius: 2px;
  }
  .sure-order:active {
    background: rgba(54, 160, 233, 0.9);
  }
}

.yfdj {
  line-height: unset;
  padding: 0.03rem 0.1rem;
  background: #ffd552;
  border-radius: 3px;
  margin-right: 0.1rem;
}

.zhankong{
  height: 2.5rem;
//   background: red;
}
</style>
