<template>
  <div class="wrapper">
    <div class="re-input">
      <div class="line"><img src="https://www.daoway.cn/h5/image/line.jpg"></div>
      <mip-form>
        <ul class="re-form">
          <li @click="toposition"><img src="https://www.daoway.cn/images/icon2.jpg"><input
            v-model="addr"
            style="background:rgba(0,0,0,0); text-align: left; vertical-align: middle"
            type="button"
            placeholder="请填写您的住址"><img
              class="re-more"
              src="https://www.daoway.cn/h5/image/go_06.png"></li>
          <li><i class="imgp"/><input
            v-model="doorNum"
            type="text"
            placeholder="请输入具体楼号、门牌号"
            maxlength = "100">
          </li>
          <li><img src="https://www.daoway.cn/images/icon3.jpg"><input
            v-model="contactPerson"
            type="text"
            placeholder="联系人"
            maxlength = "20"></li>
          <li><img src="https://www.daoway.cn/images/icon4.jpg"><input
            v-model="phone"
            type="number"
            maxlength="11"
            placeholder="联系电话"></li>
        </ul>
      </mip-form>
      <div class="line2"><img src="https://www.daoway.cn/h5/image/line.jpg"></div>
    </div>
    <div class="re-input re-input2">
      <ul class="re-form re-form2">
        <li v-if="hasDstAddr"><span><img src="https://www.daoway.cn/images/icon5.jpg">目的地址</span>
          <div
            style="width: 74%"
            @click="tohasDstAddr"><i
              class="re-time"
              style="color: #303030;width: 80%; overflow: hidden;text-overflow:ellipsis;
white-space: nowrap; display: inline-block; vertical-align: middle">{{ dst_addr }}</i>
            <img
              class="re-more"
              src="https://www.daoway.cn/h5/image/go_06.png">
          </div>

        </li>
        <li><span><img src="https://www.daoway.cn/images/icon5.jpg">服务时间</span>
          <div @click="totime"><i class="re-time">{{ formatTime }}</i><img
            class="re-more"
            src="https://www.daoway.cn/h5/image/go_06.png">
          </div>
        </li>
        <!-- && selectedTechnical-->
        <li
          v-if="canChooseTechnician"
          :id="selectedTechnical.technicianId"
          @click="totechnical(selectedTechnical.technicianId)"><span><img src="https://www.daoway.cn/images/icon3.jpg">服务人员</span>
          <div><i class="re-tech">{{ selectedTechnical.name }} {{ selectedTechnical.sex }} <img :src="selectedTechnical.photoURL"></i><img
            class="re-more"
            src="https://www.daoway.cn/h5/image/go_06.png"></div>
        </li>
      </ul>
    </div>

    <div class="re-input2 renput">
      <div class="goumai">
        <div
          v-for="p in prices"
          :key="p"
          v-bind="p.id"
          class="gimg">
          <img
            :src="p.pic_url"
            class="re-iconm">
          <div class="gtit">
            <div class="gtitname">{{ p.name }}</div>
            {{ p.price }}{{ p.price_unit || p.priceUnit }}
          </div>
          <div class="gadd">
            <img
              class="jia"
              src="https://www.daoway.cn/mip/common/images/subtract.png"
              @click="jian(quantity,p.price)">
            <div class="nub">{{ quantity }}</div>
            <img
              class="jian"
              src="https://www.daoway.cn/mip/common/images/add.png"
              @click="add(quantity,p.price)">
          </div>
        </div>
        <div class="quan">
          <div class="quantxt">代金券</div>
          <div
            v-if="coupone"
            class="noquan act">{{ coupone.name }}</div>
          <div
            v-if="coupone"
            :id="coupone.id"
            class="guize guize1"
            @click="tovouchers">-{{ coupone.bill }}元<img
              class="re-more"
              src="https://www.daoway.cn/h5/image/go_06.png"></div>
          <div
            v-else
            class="guize guize1 novouchers">暂无适用代金券</div>
        </div>
        <div
          class="quan"
          style="padding:8px 0">
          <div class="quantxt">备注</div>
          <input
            class="note"
            placeholder="如有特殊要求，请给商家留言">
        </div>
      </div>
      <div class="project">
        <div class="project-tit">服务金额
          <div class="price">{{ totalPrice }}元</div>
        </div>
        <div
          v-if="realyFixFee>0"
          class="project-tit">上门费
          <div class="price">{{ realyFixFee.toFixed(2) }}元</div>
        </div>
        <div
          v-if="coupone"
          class="project-tit">优惠金额
          <div class="price">-{{ coupone.bill.toFixed(2) }}元</div>
        </div>
        <div
          v-if="feebill"
          class="project-tit">{{ feename }}
          <div class="price">{{ feebill }}元</div>
        </div>

        <!--<div class="project-tit" style="display: none">夜间上门费
                    <div class="price">30</div>
                </div>-->
      </div>

      <mip-fixed
        class="fbotom"
        type="bottom">
        <div class="gomai">
          待支付
          <div class="pricenum">{{ alltotalPrices }}元</div>
          <button
            class="btn2"
            @click="tobuy">立即购买</button><!-- -->
        </div>
      </mip-fixed>
    </div>

    <!--提示-->
    <div
      v-show="warn.show"
      class="layer">
      <div class="layer-content zoomIn">
        <p
          class="layer-text"
          v-text="warn.texts"/>
        <p
          class="layer-sure active-layer"
          @click="closeLayer">知道了</p>
      </div>
    </div>

  </div>
</template>

<script>
import base from '../../common/utils/base'
import '../../common/utils/base.less'
export default {
  prerenderAllowed () {
    return true
  },
  props: {
    payConfig: {
      type: Object,
      default: function () { return {} }
    }
  },
  data () {
    return {
      param: base.getRequest(location.href).param ? JSON.parse(decodeURIComponent(base.getRequest(location.href).param)) : '',
      warn: {
        // 弹窗
        show: false,
        texts: ''
      },
      totalPrice: 0,
      prices: [],
      formatTime: '',
      priceId: base.getRequest(location.href).priceId || '',
      nextAppointTime: '',
      appointTime: base.getRequest(location.href).appointTime || '',
      noFixFeePrice: 0,
      fixFee: 0,
      minBuyPrice: 0,
      quantity: base.getRequest(location.href).quantity || 1,
      realyFixFee: 0,
      alltotalPrices: 0,
      minBuyNum: 1,
      selectedTechnical: {},
      position: '',
      doorNum: '',
      contactPerson: '',
      phone: '',
      addr: '',
      communityId: '',
      canChooseTechnician: false,
      serviceId: base.getRequest(location.href).serviceId || '',
      coupone: '',
      orderId: base.getRequest(location.href).orderId,
      orderInfo: {},
      // code: base.getRequest(location.href).code,
      userId: localStorage.getItem('mipUserId') || base.getCookie('mipUserId'),
      channel: 'mip',
      oauthCode: '',
      tradeType: '',
      returnurl: base.htmlhref.orderdetail,
      useradd: '',
      hasDstAddr: false,
      feebill: 0,
      dst_addr: '',
      dst_communityId: '',
      dst_city: '',
      dst_lot: '',
      dst_lat: '',
      dst_phone: '',
      dst_contactPerson: '',
      dst_house: '',
      dst_street: '',
      dynamicPricing: '',
      feename: ''
    }
  },
  mounted () {
    let that = this
    that.position = base.getposition()
    if (!that.position) {
      that.position = {
        id: '272026',
        name: '天安门',
        addr: '北京市东城区东长安街',
        lot: '116.40387423499',
        lat: '39.915167717716',
        area: '东城区',
        city: '北京'
      }
    }
    if (that.position && that.position.contactPerson) {
      that.contactPerson = that.position.contactPerson
    } else {
      let nick = localStorage.getItem('nick')
      that.contactPerson = nick
    }
    if (that.position && that.position.phone) {
      that.phone = that.position.phone
    }
    if (that.orderId) {
      that.buyAgain(that.orderId)
      that.gethtml()
    } else {
      that.gethtml()
      that.setPostion()
    }
    if (MIP.util.platform.isWechatApp()) { // 在微信里
      let wxcode = base.getRequest(location.href).code
      if (wxcode) {
        that.oauthCode = wxcode
        that.tradeType = 'JSAPI'
      } else {
        that.wxlogincode()
      }
    } else {
      that.oauthCode = ''
      that.tradeType = 'MWEB'
    }
    window.addEventListener('show-page', () => {
      let technician = JSON.parse(sessionStorage.getItem('tech'))
      if (that.canChooseTechnician) {
        if (technician) {
          that.selectedTechnical = technician
        } else {
          that.selectedTechnical = JSON.parse(localStorage.getItem('technician')).technicianList[0]
        }
      }
      let coupone = JSON.parse(sessionStorage.getItem('coupone'))
      that.coupone = coupone
      if (coupone && coupone.bill > 0) {
        that.alltotalPrices = parseFloat(Number((that.totalPrice + that.realyFixFee - coupone.bill)))
      }
      let apptime = Number(sessionStorage.getItem('apptime'))
      if (apptime) {
        that.formatTime = base.timeformat(apptime, 'MM月dd日(day) HH:mm')
        that.appointTime = apptime
      }
      let useradd = JSON.parse(localStorage.getItem('useradd'))
      let position2 = JSON.parse(localStorage.getItem('position2'))
      if (useradd) {
        this.phone = useradd.phone
        this.contactPerson = useradd.contactPerson
        this.addr = useradd.addr
        this.doorNum = useradd.doorNum
      } else {
        if (base.getposition()) {
          that.position = base.getposition()
          that.setPostion()
        }
      }
      if (position2) {
        if (that.hasDstAddr && position2) {
          that.dst_addr = position2.addr ? (position2.city + position2.addr) : (position2.city + position2.area + position2.name + position2.doorNum)
          that.dst_communityId = position2.communityId || position2.id
          that.dst_city = position2.city
          that.dst_lot = position2.lot || position2.lng
          that.dst_lat = position2.lat
          that.dst_phone = position2.phone
          that.dst_contactPerson = position2.contactPerson
          that.dst_house = position2.doorNum
          that.dst_street = position2.street || null
          that.extrafee()
        }
      }
    })
  },
  methods: {
    wxlogincode () {
      let appid = 'wx0290cc2004b61c97'
      let loginUrl = encodeURIComponent(location.href)
      let scope = 'snsapi_base'
      MIP.viewer.open('https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appid + '&redirect_uri=' + loginUrl + '&response_type=code&scope=' + scope + '&state=STATE#wechat_redirect', { isMipLink: true })
    },
    gethtml () {
      let that = this
      let position = that.position
      // that.prices = that.param.prices || '';
      that.appointTime = that.param.appointTime || ''
      that.quantity = that.param.quantity || that.quantity
      let serviceId = that.param.serviceId || that.serviceId
      let url = 'https://www.daoway.cn/daoway/rest/service/' + serviceId + '?manualCity=' + encodeURIComponent(position.city) + '&lot=' + (position.lot || position.lng) + '&lat=' + position.lat + '&channel=' + that.channel
      fetch(url, {
        method: 'get'
      }).then(function (res) {
        return res.json()
      }).then(function (text) {
        if (text.status === 'ok') {
          let data = text.data
          let pricesItem = data.prices
          let priceIds = that.param.priceId || that.priceId
          let prices = []
          if (pricesItem) {
            for (let i = 0; i < pricesItem.length; i++) {
              if (priceIds === Number(pricesItem[i].id)) {
                prices.push(pricesItem[i])
              }
            }
            if (!prices || prices.length === 0) {
              that.warn.show = true
              that.warn.texts = '该项目已下线或超出服务范围'
            }
          } else {
            that.warn.show = true
            that.warn.texts = '该项目已下线或超出服务范围'
          }
          let apptime = Number(sessionStorage.getItem('apptime'))
          that.serviceId = data.id
          that.noFixFeePrice = data.noFixFeePrice
          that.fixFee = data.fixFee
          that.nextAppointTime = data.nextAppointTime
          that.appointTime = apptime || that.param.appointTime || data.nextAppointTime
          that.formatTime = base.timeformat(that.appointTime, 'MM月dd日(day) HH:mm')
          that.prices = prices
          that.minBuyNum = prices ? prices[0].minBuyNum : 1
          that.quantity = that.param.quantity || that.quantity
          that.totalPrice = (prices[0].price * that.quantity).toFixed(2)
          that.alltotalPrices = Number(prices[0].price * that.quantity + (data.fixFee || 0))
          that.canChooseTechnician = data.canChooseTechnician
          that.hasDstAddr = data.hasDstAddr
          that.dynamicPricing = data.dynamicPricing
          that.setFixFee(data)
          that.setPostion()
        } else {
          that.warn.show = true
          that.warn.texts = text.msg
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    getCoupone () {
      let that = this
      let url = 'https://www.daoway.cn/daoway/rest/coupon/user/' + that.userId + '?serviceId=' + that.serviceId + '&bill=' + that.totalPrice + '&ignoreMinBill=false&priceIds=' + (that.param.priceIds || that.priceId) + '&channel=' + that.channel
      fetch(url, {
        method: 'get',
        credentials: 'include'
      }).then(function (res) {
        return res.json()
      }).then(function (text) {
        if (text.status === 'ok') {
          if (text.data[0] && text.data[0].bill > 0) {
            that.coupone = text.data[0]
            that.alltotalPrices = parseFloat((Number(that.totalPrice) + that.realyFixFee) - that.coupone.bill)
          }
        } else {
          /* that.warn.show = true
          that.warn.texts = text.msg */
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    closeLayer () {
      this.warn.show = false
    },
    setFixFee (data) {
      let that = this
      let realyFixFee = 0
      if (data.noFixFeePrice && that.totalPrice < data.noFixFeePrice) {
        realyFixFee = data.fixFee
      }
      that.realyFixFee = realyFixFee
      that.getCoupone()
    },
    add (counter, price) {
      counter = Number(counter)
      let that = this
      if (counter > that.prices.limit) {
        this.warn.show = true
        this.warn.texts = '该项目每单限购' + that.prices.limit + '份'
      } else {
        counter += 1
        this.quantity = counter
        let couponebill = 0
        if (that.coupone) {
          couponebill = that.coupone.bill || 0
        }
        that.alltotalPrices = Number((counter * price).toFixed(2) + that.realyFixFee - couponebill)
      }
    },
    jian (counter, price) {
      let that = this
      counter = Number(counter)
      let couponebill = 0
      if (that.coupone) {
        couponebill = that.coupone.bill || 0
      }
      if (counter <= that.minBuyNum || counter === 0) {
        this.warn.show = true
        this.warn.texts = '不能再减了'
      } else {
        counter -= 1
        that.quantity = counter
        that.alltotalPrices = Number((counter * price).toFixed(2) + that.realyFixFee - couponebill)
      }
    },
    setPostion () {
      let that = this
      let position = that.position
      // var position2 =JSON.parse(localStorage.getItem('position2'));
      if (position.name) {
        that.addr = position.city + position.area + position.name
      } else {
        that.addr = position.addr
      }
      if (that.canChooseTechnician) {
        let selectedTechnical = JSON.parse(sessionStorage.getItem('tech'))
        if (selectedTechnical) {
          that.selectedTechnical = selectedTechnical
        } else {
          that.getTechnicalInfo()
        }
      }
      let useradd = JSON.parse(localStorage.getItem('useradd'))
      if (useradd) {
        that.phone = useradd.phone
        that.contactPerson = useradd.contactPerson
        that.addr = useradd.addr
        that.doorNum = useradd.doorNum
        return
      }
      if (position.communityId || position.id) {
        if (position.doorNum) {
          that.doorNum = position.doorNum
        }
        if (position.contactPerson) {
          that.contactPerson = position.contactPerson
        }
        if (position.phone) {
          that.phone = position.phone
        }
      }
    },
    getTechnicalInfo () {
      let that = this
      let position = that.position
      let serviceId = that.param.serviceId || that.serviceId
      let time = base.timeformat(that.appointTime, 'yyyy-MM-dd HH:mm:ss')
      let url = 'https://www.daoway.cn/daoway/rest/service/' + serviceId + '/avalible_technician?manualCity=' + encodeURIComponent(position.city || that.city) + '&lot=' + (position.lng || position.lot || that.lot) + '&lat=' + (position.lat || that.lat) + '&street=' + encodeURIComponent(position.addr || that.street) + '&includeBusyFlag=true&priceId=' + (that.param.priceId || that.priceId) + '&quantity=' + that.quantity + '&serviceTime=' + encodeURIComponent(time) + '&channel=' + that.channel
      if (position.doorNum) {
        url += '&house=' + encodeURIComponent(position.doorNum)
      }
      fetch(url, {
        method: 'get'
      }).then(function (res) {
        return res.json()
      }).then(function (text) {
        if (text.status === 'ok') {
          let data = text.data
          if (data.technicianList) {
            that.selectedTechnical = data.technicianList[0]
            localStorage.setItem('technician', JSON.stringify(data))
          }
        } else {
          localStorage.setItem('technician', null)
          that.warn.show = true
          that.warn.texts = text.msg
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    sessuseradd () {
      let that = this
      let useradd = {}
      useradd.addr = that.addr
      useradd.doorNum = that.doorNum
      useradd.contactPerson = that.contactPerson
      useradd.phone = that.phone
      useradd.id = that.position.id || that.position.communityId
      localStorage.setItem('useradd', JSON.stringify(useradd))
    },
    totechnical (id) {
      this.sessuseradd()
      console.log(id)
      MIP.viewer.open(base.htmlhref.technician + '?technicianId=' + id, { isMipLink: true })
    },
    toposition () {
      MIP.viewer.open(base.htmlhref.position + '?reservation=true', { isMipLink: true })
    },
    tovouchers () {
      let that = this
      that.sessuseradd()
      let serviceId = that.serviceId
      let requestUrl = {
        serviceId: serviceId,
        priceIds: that.param.priceId,
        bill: that.totalPrice
      }
      requestUrl = JSON.stringify(requestUrl)
      let url = base.htmlhref.vouchers + '?requestUrl=' + encodeURIComponent(requestUrl)
      MIP.viewer.open(url, { isMipLink: true })
    },
    totime () {
      let that = this
      that.sessuseradd()
      let parm = {
        serviceId: that.param.serviceId || that.serviceId,
        priceId: that.param.priceId || that.priceId
      }
      parm = JSON.stringify(parm)
      MIP.viewer.open(base.htmlhref.time + '?parm=' + encodeURIComponent(parm), { isMipLink: true })
    },
    buyAgain (orderId) {
      let that = this
      let url = 'https://www.daoway.cn/daoway/rest/order/' + orderId + '/again?userId=' + that.userId + '&channel=' + that.channel
      fetch(url, {
        method: 'get'
      }).then(function (res) {
        return res.json()
      }).then(function (text) {
        if (text.status === 'ok') {
          let resultData = text.data
          // console.log(resultData);
          let prices = resultData.prices
          for (let i = 0; i < prices.length; i++) {
            prices[i].quantity = prices[i].minBuyNum || 1
            prices[i].pic_url = prices[i].picUrl
          }
          let totalPrice = (prices[0].price * prices[0].quantity)
          let communityId = resultData.communityId
          let addr = communityId ? resultData.city + ' ' + resultData.communityArea + resultData.communityName : resultData.street
          let appointTime = resultData.nextAppointTime
          let canChooseTechnician = resultData.canChooseTechnician
          that.prices = prices
          that.totalPrice = totalPrice.toFixed(2)
          that.formatTime = base.timeformat(appointTime, 'yyyy-MM-dd HH:mm')
          that.nextAppointTime = appointTime
          that.appointTime = appointTime
          that.noFixFeePrice = resultData.noFixFeePrice
          that.fixFee = resultData.fixFee
          that.minBuyPrice = resultData.minBuyPrice
          that.quantity = prices[0].quantity
          that.canChooseTechnician = canChooseTechnician
          that.doorNum = resultData.house
          that.contactPerson = resultData.contactPerson
          that.phone = resultData.phone
          that.serviceId = prices[0].serviceId
          that.addr = addr
          that.communityId = communityId
          that.lot = resultData.lot
          that.lat = resultData.lat
          that.city = resultData.city
          that.alltotalPrices = parseFloat(totalPrice + resultData.fixFee)
          that.priceId = prices[0].id
          that.setFixFee(resultData)
          that.getTechnicalInfo()
        } else {
          that.warn.show = true
          that.warn.texts = text.msg
          setTimeout(() => {
            that.closeLayer()
            MIP.viewer.page.back()
          }, 1000)
        };
      }).catch(function (error) {
        console.log(error)
      })
    },
    userAddress () {
      let that = this
      let useradd = sessionStorage.getItem('useradd')
      let userAddressId = ''
      let opData = 'userId=' + that.userId + '&name=' + that.contactPerson + '&phone=' + that.phone + '&doorNum=' + that.doorNum + '&isConfirm=0' + '&communityId=' + (that.position.id || that.position.communityId) + '&id=' + userAddressId
      let url
      if (userAddressId) {
        url = 'https://www.daoway.cn/daoway/rest/user/' + that.userId + '/modifyUserAddress'
      } else {
        url = 'https://www.daoway.cn/daoway/rest/user/' + that.userId + '/addUserAddress'
      }
      fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        body: opData
      }).then(function (res) {
        return res.json()
      }).then(function (text) {
        if (text.status === 'ok') {
          that.position.contactPerson = useradd.contactPerson
          that.position.doorNum = useradd.doorNum
          that.position.phone = useradd.phone
          if (!userAddressId) {
            base.userAddressId = text.data
          }
          localStorage.setItem({'position': JSON.stringify(that.position)})
        } else {
          /* that.warn.show = true
          that.warn.texts = text.msg */
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    tobuy () {
      let that = this
      let addr = that.addr
      let doorNum = that.doorNum
      let contactPerson = that.contactPerson
      let phone = that.phone
      let reg1 = /^1[3,4,5,8,7][0-9]{9}$/
      if (!addr) {
        that.warn.show = true
        that.warn.texts = '请选择地址'
      } if (!doorNum) {
        that.warn.show = true
        that.warn.texts = '请填写楼层，门牌号'
      } else if (!contactPerson) {
        that.warn.show = true
        that.warn.texts = '请填写联系人姓名'
      } else if (!phone) {
        that.warn.show = true
        that.warn.texts = '请填写手机号'
      } else if (!reg1.test(phone)) {
        that.warn.show = true
        that.warn.texts = '请填写正确的手机号'
      } else if (that.hasDstAddr && !that.dst_addr) {
        that.warn.show = true
        that.warn.texts = '目的地址不能为空'
      } else if (that.minBuyPrice > that.totalPrice) {
        let temp = (that.minBuyPrice - that.totalPrice).toFixed(2)
        that.warn.show = true
        that.warn.texts = '该店铺需满' + that.minBuyPrice + '元起购，还差' + temp + '元即可下单哦~'
      } else {
        let position = that.position
        let ary = []
        for (let i = 0; i < that.prices.length; i++) {
          let items = {}
          let pr = that.prices[i]
          items.priceId = pr.id
          items.quantity = that.quantity
          ary.push(items)
        }
        let token = localStorage.getItem('mipToken') || base.getCookie('mipToken')
        // console.log(position,that.doorNum || position.doorNum)
        let anydata = {
          'userId': that.userId,
          'serviceId': that.serviceId,
          'note': that.note || null,
          'address': that.addr + ' ' + that.doorNum || position.doorNum,
          'appointTime': base.timeformat(that.appointTime, 'yyyy-MM-dd HH:mm:ss'),
          'contactPerson': contactPerson,
          'items': ary,
          'addrLot': (position.lot || position.lng || that.lot),
          'addrLat': position.lat,
          'city': position.city,
          'communityId': position.communityId || position.id,
          'street': position.addr || that.addr,
          'house': position.doorNum || that.doorNum,
          'fixFee': that.realyFixFee,
          'phone': that.phone,
          'technicianId': that.selectedTechnical ? that.selectedTechnical.technicianId : '',
          'couponId': that.coupone ? that.coupone.id : null,
          'extraFee': that.feebill,
          'extraInfo': '',
          'dst_address': that.dst_addr || '',
          'dst_communityId': that.dst_communityId || '',
          'dst_city': that.dst_city || '',
          'dst_lot': that.dst_lot || '',
          'dst_lat': that.dst_lat || '',
          'dst_phone': that.dst_phone || '',
          'dst_contactPerson': that.dst_contactPerson || '',
          'dst_house': that.dst_house || '',
          'dst_street': that.dst_street || ''
        }
        anydata = JSON.stringify(anydata)
        let url = 'https://www.daoway.cn/daoway/rest/orders/v2?h5=true&channel=' + that.channel
        fetch(url, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: anydata
        }).then(function (res) {
          return res.json()
        }).then(function (text) {
          if (text.status === 'ok') {
            that.userAddress()
            let tobaiduorder = text.data.orderId
            let redirectUrl = that.returnurl + '?orderId=' + tobaiduorder
            MIP.setData({'payConfig': {
              'fee': that.alltotalPrices,
              'sessionId': token,
              'redirectUrl': redirectUrl,
              'postData': {
                'orderId': tobaiduorder,
                'token': token,
                bill: that.alltotalPrices,
                userId: that.userId,
                wallet: 0,
                couponId: that.coupone ? that.coupone.id : '',
                'appendOrderId': '',
                'returnUrl': redirectUrl,
                'oauthCode': that.oauthCode,
                'tradeType': that.tradeType
              }
            }})
            that.$emit('actionpay')
          } else {
            console.log(text.msg)
            that.warn.show = true
            that.warn.texts = text.msg
          }
        }).catch(function (error) {
          console.log(error)
        })
      }
    },
    extrafee: function () {
      let that = this
      let position = base.getposition()
      let ary = []
      for (let i = 0; i < that.prices.length; i++) {
        let items = {}
        let pr = that.prices[i]
        items.priceId = pr.id
        items.quantity = that.quantity
        ary.push(items)
      }
      let datas = {
        addr: position.addr,
        city: position.city,
        house: position.house,
        lat: position.lat,
        lot: position.lot || position.lng,
        street: position.street,
        contactPerson: position.contactPerson,
        phone: that.phone,
        appointTime: base.timeformat(that.appointTime, 'yyyy-MM-dd HH:mm:ss'),
        canChooseTechnician: that.canChooseTechnician,
        communityId: position.communityId || position.id,
        couponeInfo: that.couponeInfo,
        doorNum: that.doorNum,
        dst_addr: that.dst_addr,
        dst_city: that.dst_city,
        dst_communityId: that.dst_communityId,
        dst_contactPerson: that.dst_contactPerson,
        dst_house: that.dst_house,
        dst_lat: that.dst_lat,
        dst_lot: that.dst_lot,
        dst_phone: that.dst_phone,
        dst_street: that.dst_street,
        dynamicPricing: that.dynamicPricing,
        fixFee: that.fixFee,
        formatTime: that.formatTime,
        hasDstAddr: that.hasDstAddr,
        minBuyPrice: that.minBuyPrice,
        miniUserId: that.miniUserId,
        nextAppointTime: that.nextAppointTime,
        noFixFeePrice: that.noFixFeePrice,
        realyFixFee: that.realyFixFee,
        realyTotalPrices: that.realyTotalPrices,
        selectedTechnical: that.selectedTechnical,
        serviceId: that.serviceId,
        token: that.token,
        totalPrices: that.totalPrices,
        technicianId: that.selectedTechnical.technicianId || null,
        address: position.addr || null,
        addrcity: position.city || null,
        addrLot: position.lot || position.lng || null,
        addrLat: position.lat || null,
        items: ary
      }
      if (datas.dynamicPricing) {
        let url = 'https://www.daoway.cn/daoway/rest/orders/dynamic_extra_fee'
        fetch(url, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(datas)
        }).then(function (res) {
          return res.json()
        }).then(function (text) {
          if (text.status === 'ok') {
            let datas = text.data
            let bill = datas.bill
            let totalPrices = that.totalPrice
            if (bill > 0) {
              if (that.coupone) {
                totalPrices = (Number(totalPrices) + Number(bill) + Number(that.fixFee) - Number(that.coupone.bill))
              } else {
                totalPrices = (Number(totalPrices) + Number(bill) + Number(that.fixFee))
              }
              that.feebill = bill
              that.feename = datas.name
              that.alltotalPrices = totalPrices
            } else {
              that.feebill = 0
              if (that.coupone) {
                that.alltotalPrices = (Number(totalPrices) + Number(that.fixFee) - Number(that.coupone.bill))
              } else {
                that.alltotalPrices = (Number(totalPrices) + Number(that.fixFee))
              }
            }
          } else {
            that.warn.show = true
            that.warn.texts = text.msg
          }
        }).catch(function (error) {
          console.log(error)
        })
      }
    },
    tohasDstAddr () {
      MIP.viewer.open(base.htmlhref.position + '?hasDstAddr=' + this.hasDstAddr, {isMipLink: true})
      this.dst_addr = ''
      this.feebill = 0
      localStorage.removeItem('position2')
    }
  }
}
</script>

<style scoped>

    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }

    input{
        border: none;
    }
    @media (min-device-width:1078px){
      input:focus{
        font-size: 14px ;
      }
    }
    @media (min-device-width : 320px) and (max-device-width : 1077px){
      input:focus{
        font-size: 14px ;
      }
    }

    i {
        font-style: normal
    }

    li, ol {
        list-style: none
    }
    .wrapper{
      height: 100%;
    }

    .fbotom{
        background: #fff;
    }
    .re-form {
        margin-left: 3%;
    }
    .imgp{
      display: inline-block;
      width: 13px;
    }

    .re-form li {
        line-height: 43px;
      height: 43px;
      overflow: hidden;
      width: 99.5%;
      font-size: 14px;
      color: #303030;
    }

    .re-form li img {
        width: 13px;
        height: auto
    }

    .re-form2 li img {
        margin-right: 10px;
        position: relative;
        top: 2px
    }

    .re-input {
        background: #fff;
        font-size: 0
    }
    .quan div.novouchers{
      color: #898989;
    }

    .re-form input {
        width: 84.2%;
        margin-left: 3%;
        display: inline-block;
        height: 40px;
        line-height: 40px;
        border-bottom: 1px solid #ececec;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        background: #fff;
        color: #303030;
        font: 14px Arial;
    }
      input:focus{
        font-size: 14px ;
      }
    .re-form li:last-child input {
        border: none
    }

    .re-form li img.re-more, .re-more {
        width: 8px;
        height: auto;
        margin-left: 4%;
    }

    .re-input2 {
        margin-top: 10px;
        font-size: 14px;
        background: #fff;

    }
    .renput{
      margin-bottom:60px
    }

    .re-form2 span {
        display: inline-block;
        width: 26%;
        color: #212121
    }

    .re-form2 div {
        float: right;
        width: 60%;
        text-align: right
    }

    .re-form2 li {
        border-bottom: 1px solid #ececec
    }

    .re-form2 li:last-child {
        border: none
    }

    .re-time {
        color: red;
        margin-right: 5px
    }

    .re-form2 li .re-tech img {
        width: 20px;
        height: 20px;
        border-radius: 100% 100%;
    }

    .re-iconm {
        width: 60px;
        height: 60px;
        border-radius: 3px;
    }

    .jia, .jian {
        width: 25px;
        height: 25px
    }

    .quan .re-more {
        position: relative;
        top: 2px;
        margin-left: 5px
    }

    .goumai {
        margin: 0 auto;
        width: 98%;
        padding: 10px 0 10px 2%;
    }

    .gimg {
        border-bottom: 1px solid #e5e5e5;
        padding-bottom: 10px;
        position: relative;
    }

    .gtitname {
        margin-bottom:20px;
    }

    .gtit {
        margin-left: 6px;
    }

    .gtit, .gadd {
        display: inline-block;
        vertical-align: top;
    }

    .gadd {
        position: absolute;
        width: 25%;
        top: 36px;
        right: 0;

    }

    .noquan {
        color: #d1d1d1;
        margin-left: 16px;

    }

    .quan div {
        display: inline-block;
    }

    .quan {
        border-bottom: 1px solid #e5e5e5;
        padding: 15px 0;
    }

    .note {
        width: 80%;
        display: inline-block;
        margin-left: 29px;
        vertical-align: middle;
        padding: 6px 0;
       font-size: 14px;
    }

    .project {
        width: 94%;
        margin-left: 3%;
    }

    .project-tit {
        height: 36px;
        line-height: 26px;
        width: 100%;
    }

    .project-tit div {
        float: right;
        padding: 0 8px;
    }

    .footer {
        height: 50px;
        width: 100%;
        background: #fff;
        text-align: inherit;
        border-top: 1px solid #e5e5e5
    }

    .guize {
        float: right;
        margin-right: 12px;
    }

    .footxt img {
        margin-right: 10px;
    }

    .pricenum {
        display: inline-block;
        font-size: 20px;
    }

    .gomai {
        height: 50px;
        line-height: 50px;
        padding: 0 3%;
        font-size: 14px;
      border-top: 1px solid #e5e5e5;
    }

    .btn2 {
        width: 40%;
        text-align: center;
        height: 36px;
        line-height: 36px;
        margin-top: 6px;
        float: right;
        font-size: 14px;
        background: #e63020;
        color: #fff;
        outline: none;
        border-radius: 4px;
        border: 0;
    }

    .pricenum {
        color: #e63020;
    }

    .nub {
        margin: 0 5px;
        display: inline-block;
        vertical-align: top;
        margin-top: 5px;
    }

    .guize1 {
        color: #e63020;
        margin-right: 2%;
    }

    .act {
        color: #212121;
    }
    .layer-content{
      top: 45%;
    }

</style>
