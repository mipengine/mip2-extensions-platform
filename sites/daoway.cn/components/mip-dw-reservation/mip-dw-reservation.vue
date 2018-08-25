<template>
  <div class="wrapper">
    <div class="re-input">
      <div class="line"><img src="https://www.daoway.cn/h5/image/line.jpg"></div>
      <mip-form>
        <ul class="re-form">
          <li><img src="https://www.daoway.cn/images/icon2.jpg"><input
            v-model="addr"
            type="text"
            placeholder="请填写您的住址"
            @touchend="toposition"><img
              class="re-more"
              src="https://www.daoway.cn/h5/image/go_06.png"></li>
          <li><img src="https://www.daoway.cn/images/icon3.jpg"><input
            v-model="doorNum"
            type="text"
            placeholder="请输入具体楼号、门牌号">
          </li>
          <li><img src="https://www.daoway.cn/images/icon4.jpg"><input
            v-model="contactPerson"
            type="text"
            placeholder="联系人"></li>
          <li><img src="https://www.daoway.cn/images/icon5.jpg"><input
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
        <li><span><img src="https://www.daoway.cn/images/icon2.jpg">服务时间</span>
          <div @click ="totime"><i class="re-time">{{ formatTime }}</i><img
            class="re-more"
            src="https://www.daoway.cn/h5/image/go_06.png">
          </div>
        </li>
        <li
          v-if="canChooseTechnician && selectedTechnical"
          :id="selectedTechnical.technicianId"
          @click="totechnical(selectedTechnical.technicianId)"><span><img src="https://www.daoway.cn/images/icon3.jpg">服务人员</span>
          <div><i class="re-tech">{{ selectedTechnical.name }} {{ selectedTechnical.sex }} <img :src="selectedTechnical.photoURL"></i><img
            class="re-more"
            src="https://www.daoway.cn/h5/image/go_06.png"></div>
        </li>
      </ul>
    </div>

    <div class="re-input2">
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
            {{ p.price }}{{ p.price_unit }}
          </div>
          <div class="gadd">
            <img
              class="jia"
              src="http://www.daoway.cn/images/jian.jpg"
              @click="jian(quantity,p.price)">
            <div class="nub">{{ quantity }}</div>
            <img
              class="jian"
              src="http://www.daoway.cn/images/jia.jpg"
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
            class="guize guize1">暂无适用代金券</div>
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
          <div class="price">{{ totalPrice }}</div>
        </div>
        <div
          v-if="realyFixFee>0"
          class="project-tit">上门费
          <div class="price">{{ realyFixFee }}元</div>
        </div>
        <div
          v-if="coupone"
          class="project-tit">优惠金额
          <div class="price">-{{ coupone.bill }}元</div>
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
          @touchend="closeLayer">知道了</p>
      </div>
    </div>

  </div>
</template>

<script>
import base from '../../common/utils/base'
import '../../common/utils/base.less'
export default {
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
      userId: localStorage.getItem('mipUserId'),
      channel: 'baidu',
      oauthCode: '',
      tradeType: '',
      returnurl: base.htmlhref.orderdetail,
      useradd: {}
    }
  },
  mounted () {
    let that = this
    that.position = base.getposition()
    if (that.orderId) {
      that.buyAgain(that.orderId)
    } else {
      that.gethtml()
      that.setPostion()
    }
    if (MIP.util.platform.isWechatApp()) { // 在微信里
      let wxcode = base.getRequest(location.href).code
      that.oauthCode = wxcode
      that.tradeType = 'JSAPI'
    } else {
      that.oauthCode = ''
      that.tradeType = 'MWEB'
    }

    window.addEventListener('show-page', () => {
      let technician = JSON.parse(sessionStorage.getItem('tech'))
      let useradd = JSON.parse(sessionStorage.getItem('useradd'))
      that.selectedTechnical = technician
      if (that.canChooseTechnician) {
        if (technician) {
          that.selectedTechnical = technician
        }
      }
      let coupone = JSON.parse(sessionStorage.getItem('coupone'))
      that.coupone = coupone
      if (coupone && coupone.bill > 0) {
        that.alltotalPrices = parseFloat((that.totalPrice + that.realyFixFee - coupone.bill).toFixed(2))
      }
      let apptime = Number(sessionStorage.getItem('apptime'))
      if (apptime) {
        that.formatTime = base.timeformat(apptime, 'MM月dd日(day) HH:mm')
      }
      if (useradd) {
        that.phone = useradd.phone
        that.contactPerson = useradd.contactPerson
        that.addr = useradd.addr
        that.doorNum = useradd.doorNum
      } else {
        that.position = base.getposition()
        if (that.position) {
          that.gethtml()
          that.setPostion()
        }
      }
    })
  },
  methods: {
    gethtml () {
      let that = this
      let position = that.position
      // that.prices = that.param.prices || '';
      that.appointTime = that.param.appointTime || ''
      that.quantity = that.param.quantity || that.quantity
      let serviceId = that.param.serviceId || that.serviceId
      let url = '/daoway/rest/service/' + serviceId + '?manualCity=' + encodeURIComponent(position.city) + '&lot=' + position.lot + '&lat=' + position.lat + '&channel=' + that.channel
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
            if (!prices) {
              that.warn.show = true
              that.warn.texts = '该项目已下线'
            }
          } else {
            that.warn.show = true
            that.warn.texts = '该项目已下线'
          }
          let apptime = Number(sessionStorage.getItem('apptime'))
          that.serviceId = data.id
          that.noFixFeePrice = data.noFixFeePrice
          that.fixFee = data.fixFee
          that.nextAppointTime = data.nextAppointTime
          that.appointTime = apptime || that.param.appointTime || data.nextAppointTime
          that.formatTime = base.timeformat(that.appointTime, 'MM月dd日(day) HH:mm')
          that.prices = prices
          that.minBuyNum = prices[0].minBuyNum || 1
          that.quantity = that.param.quantity || that.quantity
          that.totalPrice = (prices[0].price * that.quantity).toFixed(2)
          that.alltotalPrices = Number(that.totalPrice + data.fixFee).toFixed(2)
          that.canChooseTechnician = data.canChooseTechnician
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
      let url = '/daoway/rest/coupon/user/' + that.userId + '?serviceId=' + that.serviceId + '&bill=' + that.totalPrice + '&ignoreMinBill=false&priceIds=' + (that.param.priceIds || that.priceId) + '&channel=' + that.channel
      console.log(url)
      fetch(url, {
        method: 'get',
        credentials: 'include'
      }).then(function (res) {
        return res.json()
      }).then(function (text) {
        if (text.status === 'ok') {
          if (text.data[0] && text.data[0].bill > 0) {
            that.coupone = text.data[0]
            that.alltotalPrices = parseFloat((that.totalPrice + that.realyFixFee - that.coupone.bill).toFixed(2))
          }
        } else {
          console.log(text.msg)
          that.warn.show = true
          that.warn.texts = text.msg
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
      if (data.noFixFeePrice && that.totalPrices < data.noFixFeePrice) {
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
      if (that.position.name) {
        that.addr = that.position.city + that.position.area + that.position.name
      } else {
        that.addr = that.position.addr
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
      if (that.canChooseTechnician) {
        let selectedTechnical = JSON.parse(sessionStorage.getItem('tech'))
        if (selectedTechnical) {
          that.selectedTechnical = selectedTechnical
        } else {
          that.getTechnicalInfo()
        }
      }
    },
    getTechnicalInfo () {
      let that = this
      let position = that.position
      let serviceId = that.param.serviceId || that.serviceId
      let time = base.timeformat(that.appointTime, 'yyyy-MM-dd HH:mm:ss')
      let url = '/daoway/rest/service/' + serviceId + '/avalible_technician?manualCity=' + encodeURIComponent(position.city || that.city) + '&lot=' + (position.lot || that.lot) + '&lat=' + (position.lat || that.lat) + '&street=' + encodeURIComponent(position.addr || that.street) + '&includeBusyFlag=true&priceId=' + (that.param.priceId || that.priceId) + '&quantity=' + that.quantity + '&serviceTime=' + encodeURIComponent(time) + '&channel=' + that.channel
      if (that.doorNum) {
        url += '&house=' + encodeURIComponent(that.doorNum)
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
      sessionStorage.setItem('useradd', JSON.stringify(useradd))
    },
    totechnical (id) {
      this.sessuseradd()
      MIP.viewer.open(base.htmlhref.technician + '?technicianId=' + id, { isMipLink: true })
    },
    toposition () {
      MIP.viewer.open(base.htmlhref.position + '?reservation=true', { isMipLink: false })
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
        priceId: that.param.priceId
      }
      parm = JSON.stringify(parm)
      MIP.viewer.open(base.htmlhref.time + '?parm=' + encodeURIComponent(parm), { isMipLink: true })
    },
    buyAgain (orderId) {
      let that = this
      let url = '/daoway/rest/order/' + orderId + '/again?userId=' + that.userId + '&channel=' + that.channel
      fetch(url, {
        method: 'get'
      }).then(function (res) {
        return res.json()
      }).then(function (text) {
        if (text.status === 'ok') {
          let resultData = text.data
          let prices = resultData.prices
          for (let i = 0; i < prices.length; i++) {
            prices[i].quantity = prices[i].minBuyNum || 1
            prices[i].pic_url = prices[i].picUrl
          }
          let totalPrice = prices[0].price * prices[0].quantity
          let communityId = resultData.communityId
          let addr = communityId ? resultData.city + ' ' + resultData.communityArea + resultData.communityName : resultData.street
          let appointTime = resultData.nextAppointTime
          let canChooseTechnician = resultData.canChooseTechnician
          that.prices = prices
          that.totalPrice = totalPrice
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
          that.lot = resultData.lng
          that.lat = resultData.lat
          that.city = resultData.city
          that.alltotalPrices = totalPrice + resultData.fixFee
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
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    /* userAddress() {
      var that = this;
      var data = that.data;
      var userAddressId = position.userAddressId;
      var url;
      var opData = {
        userId: data.miniUserId,
        name: data.contactPerson,
        phone: data.phone,
        doorNum: data.doorNum,
        isConfirm: 0,
        communityId: data.communityId
      };

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

      if (userAddressId) {
        url = app.baseUrl + "/user/" + data.miniUserId + "/modifyUserAddress";
        opData.id = userAddressId;
      } else {
        url = app.baseUrl + "/user/" + data.miniUserId + "/addUserAddress";
      }
      wx.request({
        url: url,
        method: 'POST',
        data: opData,
        header: {
          'content-type': 'application/x-www-form-urlencoded',
          'cookie': data.token
        },
        success: function (res) {
          var result = res.data;
          if (result.status != undefined && result.status == 'ok') {
            app.position.contactPerson = data.contactPerson;
            app.position.doorNum = data.doorNum;
            app.position.phone = data.phone;
            if (!userAddressId) {
              app.userAddressId = result.data;
            }
            wx.setStorage({
              key: "position",
              data: app.position
            });
          } else {
            wx.showModal({
              title: '提示',
              content: result.msg,
              showCancel: false,
              confirmColor: "#2979ff",
              success: function (res) {
              }
            })
          }
        },
        fail: function () {
          console.log("失败");
        }
      })
    }, */
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
        let token = localStorage.getItem('mipToken')
        let anydata = {
          'userId': that.userId,
          'serviceId': that.serviceId,
          'note': that.note || null,
          'address': that.addr + ' ' + that.doorNum,
          'appointTime': base.timeformat(that.appointTime, 'yyyy-MM-dd HH:mm:ss'),
          'contactPerson': contactPerson,
          'items': ary,
          'addrLot': position.lot,
          'addrLat': position.lat,
          'city': position.city,
          'communityId': position.communityId || position.id,
          'street': position.addr,
          'house': position.doorNum,
          'fixFee': that.realyFixFee,
          'phone': that.phone,
          'technicianId': that.selectedTechnical ? that.selectedTechnical.technicianId : '',
          'extraFee': 0,
          'extraInfo': '',
          'couponId': that.coupone ? that.coupone.id : null
        }
        anydata = JSON.stringify(anydata)
        let url = '/daoway/rest/orders/v2?h5=true&channel=' + that.channel
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
            let tobaiduorder = text.data.orderId
            // let redirectUrl = 'https://xiongzhang.baidu.com/opensc/wps/payment?id=1581486019780982&redirect=' + encodeURIComponent(that.returnurl + '?orderId=' + tobaiduorder)
            let redirectUrl = that.returnurl + '?orderId=' + tobaiduorder
            console.log(redirectUrl)
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
            that.warn.show = true
            that.warn.texts = text.msg
          }
        }).catch(function (error) {
          console.log(error)
        })
      }
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
    i {
        font-style: normal
    }

    li, ol {
        list-style: none
    }

    .fbotom{
        background: #fff;
    }
    .re-form {
        margin-left: 3%
    }

    .re-form li {
        line-height: 42px;
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

    .re-form input {
        width: 86%;
        margin-left: 3%;
        display: inline-block;
        height: 40px;
        line-height: 40px;
        border-bottom: 1px solid #ececec;
        font-size: 14px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }

    .re-form li:last-child input {
        border: none
    }

    .re-form li img.re-more, .re-more {
        width: 8px;
        height: auto
    }

    .re-input2 {
        margin-top: 10px;
        font-size: 14px;
        background: #fff
    }

    .re-form2 span {
        display: inline-block;
        width: 30%;
        color: #212121
    }

    .re-form2 div {
        float: right;
        width: 60%;
        border-bottom: 1px solid #ececec;
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
    }

    .gtitname {
        margin-bottom:20px;
    }

    .gtit {
        margin-left: 16px;
    }

    .gtit, .gadd {
        display: inline-block;
        vertical-align: top;
    }

    .gadd {
        float: right;
        width: 25%;
        margin-top: 36px;
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
        margin-left: 40px;
        vertical-align: middle;
        padding: 6px 0;
      font-size: 13px;
    }

    .project {
        width: 94%;
        margin-bottom: 100px;
        margin-left: 3%;
    }

    .project-tit {
        height: 30px;
        line-height: 30px;
        width: 100%;
        color: #4c4c4c;
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
        margin-right: 12px;
    }

    .act {
        color: #212121;
    }

</style>
