<template>
  <div class="wrapper">
    <div class="head">
      <div
        on="tap:sidebar.open"
        class="head-logo actives">
        <span class="img user_img"/>
      </div>
      <ul class="head-ul">
        <li>普通搬家<span/></li>
        <li
          class="actives"
          @touchend="rishiMove">
          <span>
            日式搬家
            <img
              src="https://www.lanxiniu.com/Public/baidumip/upline.png"
              class="upline">
          </span>

        </li>
      </ul>
    </div>
    <!-- <div class="banner-content">
      <mip-img src="https://www.lanxiniu.com/Public/baidumip/banners.png"/>
    </div> -->
    <div class="tab">
      <div class="tab-div">
        <ul class="lxn-tab-title">
          <li
            v-for="item in tabData"
            :key="item.index"
            :class="{active:item.isActive,'lxn-hide':item.hide}"
            class="car-actives"
            @touchend="changeTab(item)">
            <span >{{ item.name }}</span>
          </li>
        </ul>
        <div class="swiper-div">
          <div class="swiper-container">
            <div class="swiper-wrapper">
              <div class="swiper-slide">
                <div class="car-img-div">
                  <div class="car xiaomian"/>
                </div>
              </div>
              <div class="swiper-slide">
                <div class="car-img-div">
                  <div class="car jinbei"/>
                </div>
              </div>
              <div
                :class="{'lxn-hide':hide}"
                class="swiper-slide">
                <div class="car-img-div">
                  <div class="car xianghuo"/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="car-deccription">
          <div>
            <div class="des-div">
              <p>{{ currentCar.weight }}</p>
              <p>载重</p>
            </div>
            <div class="des-div">
              <p>{{ currentCar.ckg }}</p>
              <p>长宽高</p>
            </div>
            <div class="des-div">
              <p>{{ currentCar.volume }}</p>
              <p>体积</p>
            </div>
          </div>
        </div>
        <div class="main-conten">
          <mip-form
            method="get"
            url="https://www.lanxiniu.com//Order/calPrice">
            <div class="address">
              <div class="address-div move-out">
                <div class="point move-out-point"/>
                <div class="address-div-flex">
                  <div class="left">
                    <a
                      :href="htmlhref.mapout"
                      data-type="mip"

                      class="actives inputfix">
                      <input
                        v-model="globaldata.moveOutAddress.localtion.title"
                        :readonly="isRead"
                        type="text"
                        placeholder="您要从哪里搬出"
                      >
                    </a>

                  </div>
                  <div
                    class="right actives inputfix"
                    @click="picker({'type':'floor','status':'out'})">
                    <input
                      v-model="floorAndTime.move.moveOut"
                      :readonly="isRead"

                      type="text"
                      placeholder="搬出楼层"
                    >
                  </div>
                </div>

              </div>
              <div class="address-div move-in">
                <div class="point move-in-point"/>
                <div class="address-div-flex address-div-flex2 ">
                  <div class="left">
                    <a
                      :href="htmlhref.mapin"
                      class=" actives inputfix"
                      data-type="mip">
                      <input
                        v-model="globaldata.moveInAddress.localtion.title"
                        :readonly="isRead"
                        type="text"
                        placeholder="想要搬到哪里去"
                      >
                    </a>
                  </div>
                  <div
                    class="right actives inputfix"
                    @click="picker({'type':'floor','status':'in'})">
                    <input
                      v-model="floorAndTime.move.moveIn"
                      :readonly="isRead"
                      type="text"
                      placeholder="搬入楼层"
                    >
                  </div>
                </div>
              </div>

              <div class="address-div move-second">
                <span class="img movetime"/>
                <div class="address-div-flex address-div-time ">
                  <div
                    class="left noafter actives"
                    @click="picker({'type':'time'})">
                    <span>搬家时间</span>
                  </div>
                  <div
                    class="right actives inputfix"
                    @click="picker({'type':'time'})">
                    <input
                      v-model="floorAndTime.time"
                      :readonly="isRead"
                      class="btn "
                      type="text"
                      placeholder="选择时间"
                    >
                  </div>
                </div>
              </div>
              <div class="address-div ">
                <span class="img beizhu"/>
                <input
                  v-model="floorAndTime.remark"
                  type="text"
                  placeholder="备注"
                  @input="saveMask">
              </div>
            </div>
          </mip-form>
        </div>
      </div>

      <div class="price">
        <span
          class="price-num"
          v-text="floorAndTime.price"/>
        <span class="price-unit">
          元
        </span>
        <a
          :href="htmlhref.costdes"
          data-type="mip"> <span class="zifei">
            资费说明</span></a>

      </div>
      <!-- <p
        on="tap:user.login"
        class="sure-order btn"
        @touchend="sureOrder">
        确认下单
      </p> -->
      <p
        id="sureorer"
        data-stats-baidu-obj="%7B%22type%22%3A%22click%22%2C%22data%22%3A%5B%22_trackEvent%22%2C%22order%22%2C%22click%22%5D%7D"
        class="sure-order btn"
        @touchend="sureOrder">
        确认下单
      </p>
    </div>

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
    <div
      v-if="fetchShow"
      class="mip-loading-box">
      <div class="point-span">
        <span class="point-first"/><span class="point-second"/><span class="point-last"/>
      </div>
    </div>
  </div>

</template>

<script>
import base from '../../common/utils/base.js'
import '../../common/utils/base.less'
import picker from '../../common/utils/picker.js'
export default {
  props: {
    globaldata: {
      type: Object,
      default: function () { return {} }
    },
    userlogin: {
      type: Object,
      default: function () { return {} }
    },
    mipClickToken: {
      type: String,
      default: function () { return '' }
    }
  },
  data () {
    return {
      fetchShow: false, // fetch请求loading
      hide: false, // 显示车型用数据
      isRead: true,
      htmlhref: {},
      mySwiper: '', // 滑动轮播图

      swiperWidth: 0,
      currentIndex: 0,
      maxIndex: 2,
      transform: 0,
      startX: 0,
      endX: 0,

      cityPicker: '', // 选择器
      outIsFill: false,
      inIsFill: false,
      floorAndTime: {
        move: {
          data: '',
          moveOut: '',
          moveIn: ''
        },
        time: '',
        remark: '', // 备注
        price: 96 // 价格
      },
      carTypes: [
        {
          stairsFee: [
            {
              id: 0,
              name: '有电梯,无楼梯费'
            },
            {
              id: 1,
              name: '无电梯1层,楼层费0元'
            },
            {
              id: 2,
              name: '无电梯2层,楼层费10元'
            },
            {
              id: 3,
              name: '无电梯3层,楼层费20元'
            },
            {
              id: 4,
              name: '无电梯4层,楼层费40元'
            },
            {
              id: 5,
              name: '无电梯5层,楼层费60元'
            },
            {
              id: 6,
              name: '无电梯6层,楼层费80元'
            },
            {
              id: 7,
              name: '无电梯7层,楼层费110元'
            },
            {
              id: 8,
              name: '无电梯8层,楼层费140元'
            }
          ]
        },
        {
          stairsFee: [
            {
              id: 0,
              name: '有电梯,无楼梯费'
            },
            {
              id: 1,
              name: '无电梯1层,楼层费0元'
            },
            {
              id: 2,
              name: '无电梯2层,楼层费12元'
            },
            {
              id: 3,
              name: '无电梯3层,楼层费24元'
            },
            {
              id: 4,
              name: '无电梯4层,楼层费48元'
            },
            {
              id: 5,
              name: '无电梯5层,楼层费72元'
            },
            {
              id: 6,
              name: '无电梯6层,楼层费96元'
            },
            {
              id: 7,
              name: '无电梯7层,楼层费132元'
            },
            {
              id: 8,
              name: '无电梯8层,楼层费168元'
            }
          ]
        },
        {
          stairsFee: [
            {
              id: 0,
              name: '有电梯,无楼梯费'
            },
            {
              id: 1,
              name: '无电梯1层,楼层费0元'
            },
            {
              id: 2,
              name: '无电梯2层,楼层费15元'
            },
            {
              id: 3,
              name: '无电梯3层,楼层费30元'
            },
            {
              id: 4,
              name: '无电梯4层,楼层费60元'
            },
            {
              id: 5,
              name: '无电梯5层,楼层费90元'
            },
            {
              id: 6,
              name: '无电梯6层,楼层费120元'
            },
            {
              id: 7,
              name: '无电梯7层,楼层费165元'
            },
            {
              id: 8,
              name: '无电梯8层,楼层费210元'
            }
          ]
        }
      ], // 车型数据
      currentCar: {
        // 当前车型---效果用数据
        name: '小面',
        index: 0,
        weight: '600KG', // 载重
        ckg: '1.7m×1.2m×1.1m', // 长宽高
        volume: '2.2立方', // 体积
        hide: false, // 是否隐藏
        isActive: true // 被选中状态
      },
      currentCarItem: '', // 当前车型---数据用
      tabData: [
        // 自定义车型数据
        {
          name: '小面',
          index: 0,
          weight: '600KG', // 载重
          ckg: '1.7m×1.2m×1.1m', // 长宽高
          volume: '2.2立方', // 体积
          hide: false, // 是否隐藏
          isActive: true // 被选中状态
        },
        {
          name: '金杯',
          index: 1,
          weight: '1500KG', // 载重
          ckg: '2.7m×1.4m×1.2m', // 长宽高
          volume: '4.5立方', // 体积
          hide: false, // 是否隐藏
          isActive: false // 被选中状态
        },
        {
          name: '4.2米厢货',
          index: 2,
          weight: '3000KG', // 载重
          ckg: '4.2m×1.8m×1.8m', // 长宽高
          volume: '13立方', // 体积
          hide: false, // 是否显示
          isActive: false // 被选中状态
        }
      ],
      warn: {
        // 弹窗
        show: false,
        texts: ''
      },
      debounce: ''
    }
  },
  watch: {
    globaldata (val, oldval) {
      console.log('查看之前的城市:' + oldval.ordercity + '=============现在的城市:' + val.ordercity)
      if (val.ordercity !== oldval.ordercity) {
        this.getCurrentCityCarTypes(val.ordercity)
      }
      this.calPrice()
    }
  },
  created () {
    base.setHtmlRem()
  },
  mounted () {
    window.addEventListener('show-page', (e) => {
      console.log('页面显示')
      let data = base.getSession()
      if (data !== null) {
        console.log(JSON.stringify(data, null, 2))
        let obj = {
          moveOutAddress: data.moveOutAddress,
          moveInAddress: data.moveInAddress

        }
        base.mipSetGlobalData(obj)
      }
    })
    // 基本数据初始化
    this.initData()

    // 添加MIP组件监听
    this.addMipWatch()

    // 滑动初始化
    // this.swiperInit();

    // 获取当前城市的车型信息
    this.getCurrentCityCarTypes(this.globaldata.ordercity)

    // 全局数据监听
    this.lxnDataWatch()

    // 设置波纹效果
    this.clickRipple()
  },

  methods: {
    // 基本数据初始化
    initData () {
      // 配置链接信息
      this.htmlhref = base.htmlhref
      // 配置 车辆信息
      this.floorAndTime.move.data = this.carTypes[0].stairsFee

      this.getwidth()
      this.swiperTouch()
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
            MIP.viewer.open('https://www.lanxiniu.com/Weixin/auth?token=' + event.sessionId + '&redirect_url=' + location.href + '&isdev=1', { isMipLink: false })
          }
        } else {
          console.log('不是微信内')
        }
      })

      //   点击(用户)登录
      this.$element.customElement.addEventAction('userlogin', (event, str) => {
        let isLogin = this.userlogin.isLogin
        console.log('点击用户登录')
        if (!isLogin) {
          let config = {
            redirectUri: ''
          }
          MIP.setData({'config': config})
          this.$nextTick(() => {
            console.log('点击头像登录')
            this.$emit('actionName')
          })
        }
      })

      //   订单列表跳转
      this.$element.customElement.addEventAction('goorderlist', (event, str) => {
        let isLogin = this.userlogin.isLogin
        console.log('订单列表跳转')
        if (isLogin) {
          MIP.viewer.open(base.htmlhref.orderlist, { isMipLink: true })
        } else {
          console.log('未登录')
          let config = {
            redirectUri: base.htmlhref.orderlist
          }
          MIP.setData({'config': config})
          this.$nextTick(() => {
            console.log('点击订单列表录')
            this.$emit('actionOrderList')
          })
        }
      })

      //   资费说明跳转
      this.$element.customElement.addEventAction('gocostdes', (event, str) => {
        MIP.viewer.open(base.htmlhref.costdes, { isMipLink: true })
      })

      //   用户指南跳转
      this.$element.customElement.addEventAction('gouserguide', (event, str) => {
        MIP.viewer.open(base.htmlhref.userguide, { isMipLink: true })
      })
    },
    // 请求当前城市的车型列表
    getCurrentCityCarTypes  (city) {
      let focusCity = city
      let urls = base.url + '/Setting/getCityData?city=' + focusCity
      fetch(urls, {
        method: 'get'
      })
        .then(response => response.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
          let service = response.data.setting.service
          for (let i = 0; i < service.length; i++) {
            if (service[i].type === 5) {
              //   car = service[i].car;
              this.carTypes = service[i].car
              break
            }
          }
          // 如果当前城市车型小于3个  隐藏最后一个

          if (this.carTypes.length < 3) {
            this.hide = true
            this.tabData[2].hide = true
            this.maxIndex = 1
          } else {
            this.hide = false
            this.tabData[2].hide = false
            this.maxIndex = 2
          }
          // 设置默认楼层数据
          this.carTypes.forEach((item) => {
            let arr = item.stairs_fee.map((item, index) => {
              let arr = {
                id: index,
                name: item
              }
              return arr
            })

            item.stairsFee = arr
            if (item.type === 3) {
              this.floorAndTime.move.data = item.stairsFee
            }
          })
          this.RestoreData()
        })
    },
    // 计算订单价格
    calPrice () {
      let globaldata = this.globaldata

      let focusCity = globaldata.ordercity
      let carType = globaldata.carType
      let kilometer = globaldata.kilometer
      let orderTime = globaldata.orderTime
      let moveOutNum = globaldata.moveOutNum
      let moveInNum = globaldata.moveInNum
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
        cityCode: 12 // 城市code
      }
      let urls = base.url + '//Order/calPrice?' + base.setUrlParam(data)

      fetch(urls, {
        method: 'get'
      })
        .then(response => response.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
          let price = response.data.showPay
          this.floorAndTime.price = price
        })
    },
    // 确认下单
    sureOrder () {
      let islogin = this.userlogin.isLogin
      let sessionId = this.userlogin.sessionId
      if (islogin) {
        this.checkData(sessionId)
      } else {
        let config = {
          redirectUri: ''
        }
        MIP.setData({'config': config})
        this.$nextTick(() => {
          this.$emit('actionOrder')
        })
      }
    },

    // 全局数据监听
    lxnDataWatch () {
      //   监控城市
      MIP.watch('lxndata.ordercity', (newval, oldval) => {
        console.log('监控到全局数据改变')
        this.getCurrentCityCarTypes(newval)
      })
    },

    // 提交订单前检查数据
    checkData (sessionId) {
      let warn = this.warn
      let globaldata = this.globaldata
      // 搬出 地址
      let moveoutAddress = globaldata.moveOutAddress.localtion.title
      // 搬出楼层
      let moveout = globaldata.moveOutNum
      // 搬入地址
      let moveinAddress = globaldata.moveInAddress.localtion.title
      // 搬入楼层
      let moveIn = globaldata.moveInNum
      // 搬家时间
      let time = globaldata.orderTime

      if (moveoutAddress !== '') {
        if (moveout !== '') {
          if (moveinAddress !== '') {
            if (moveIn !== '') {
              if (time !== '') {
                console.log('可以提交订单')
                let sessionid = base.getbaiduLogMsg()
                console.log('本地取id:' + sessionid)
                this.upOrder(sessionid)
              } else {
                warn.show = true
                warn.texts = '搬家时间不能为空'
              }
            } else {
              warn.show = true
              warn.texts = '搬入楼层不能为空'
            }
          } else {
            warn.show = true
            warn.texts = '搬入地址不能为空'
          }
        } else {
          warn.show = true
          warn.texts = '搬出楼层不能为空'
        }
      } else {
        warn.show = true
        warn.texts = '搬出地址不能为空'
      }
    },
    // 提交订单
    upOrder (sessionid) {
      console.log('查看ID:' + sessionid)
      let globaldata = this.globaldata

      let moveout = globaldata.moveOutAddress
      let movein = globaldata.moveInAddress
      let kilometer = globaldata.kilometer
      let orderCity = globaldata.ordercity
      let orderTime = globaldata.orderTime
      let carType = globaldata.carType
      let startSairsNum = globaldata.moveOutNum
      let endStairsNum = globaldata.moveInNum
      let remark = this.floorAndTime.remark

      let poiList = [
        {
          deliver: '',
          deliverAddress: moveout.localtion.title,
          deliverCity: moveout.localtion.city,
          deliverLat: moveout.localtion.lat,
          deliverLng: moveout.localtion.lng,
          deliverPhone: moveout.phone,
          deliverRemark: moveout.localtion.address,
          deliverType: 1
        },
        {
          deliver: '',
          deliverAddress: movein.localtion.title,
          deliverCity: movein.localtion.city,
          deliverLat: movein.localtion.lat,
          deliverLng: movein.localtion.lng,
          deliverPhone: movein.phone,
          deliverRemark: movein.localtion.address,
          deliverType: 2
        }
      ]
      let data = {
        Kilometer: kilometer, // 公里数
        TransTime: orderTime, // 服务时间
        orderCity: orderCity, // 下单城市
        CarType: carType, // 车型
        start_stairs_num: startSairsNum, // 搬出楼层
        end_stairs_num: endStairsNum, // 搬入楼层
        OrderNum: '', // 订单号,（空为新建订单）
        Remark: remark, // 订单备注信息
        SafePrice: '', // 保价金额
        couponsId: '', // 订单所用的优惠券id
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
        remark: 'lxntest'
      }
      console.log(JSON.stringify(data, null, 2))
      console.log(this.mipClickToken)
      let updata = {
        from_detail: 'baidu',
        fr: 'xiongzhanghao',
        click_token: this.mipClickToken,
        token: sessionid,
        couponsId: 0, // 所用的优惠券id(默认0)
        OrderNum: '', // 订单号(空为新建订单)这里默认新建订单
        assignCarType: 0, // 默认个人选择
        poiList: JSON.stringify(poiList), // 配送地点信息
        data: JSON.stringify(data) // 订单信息
      }
      let urls = base.url + '//Order/update?' + base.setUrlParam(updata)
      //   this.fetchShow = true
      fetch(urls, {
        method: 'get'
      })
        .then(response => response.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
          console.log(JSON.stringify(response, null, 2))
          //   this.fetchShow = false
          let data = response.data
          if (data.warning) {
            data.warning = ''
          }
          let obj = {
            order: data
          }
          let datas = base.mipExtendData(this.globaldata, obj)

          console.log(JSON.stringify(datas, null, 2))

          base.mipSetGlobalData(obj)
          base.setSession(datas)

          setTimeout(function () {
            // 添加版本号
            console.log(JSON.stringify(datas, null, 2))
            if (base.getbaiduLogMsg !== null) {
              MIP.viewer.open(base.htmlhref.payorder + '?OrderNum=' + data.OrderNum, { isMipLink: true })
            }
            // MIP.viewer.page.router.push(base.htmlhref.payorder);
          }, 500)
        })
    },
    // 切换车型效果
    changeTab (item, isRestoreData) {
      let isRestor = isRestoreData || false
      let index = item.index
      this.currentCar = item
      this.tabData.forEach(element => {
        element.isActive = false
        if (element.index === index) {
          element.isActive = true
        }
      })
      let num = -this.swiperWidth * item.index
      this.moveSBack(num, isRestor)
    //   this.changeTabData(index, isRestor)
    },
    // 切换车型数据
    changeTabData (index, isRestoreData) {
      console.log('查看当前数据:' + index)
      console.log('查看当前数据:' + isRestoreData)
      let move = this.floorAndTime.move
      let data = this.carTypes[index]
      //   更新当前楼层价格数据
      move.data = data.stairsFee
      let floorData = move.data
      let str1 = ',楼层费'
      let str2 = '...'
      let moveOutNum = this.globaldata.moveOutNum
      let moveInNum = this.globaldata.moveInNum
      if (moveOutNum !== '') {
        move.moveOut = floorData[moveOutNum].name.replace(str1, str2)
      }
      if (moveInNum !== '') {
        move.moveIn = floorData[moveInNum].name.replace(str1, str2)
      }

      let flag = isRestoreData || false
      if (!flag) {
        console.log('手动操作进行保存')
        //   切换车型时 重置搬出搬入数据
        let obj = {
          carType: data.type
        //   moveOutNum: '',
        //   moveInNum: ''
        }
        console.log(JSON.stringify(obj, null, 2))
        let datas = base.mipExtendData(this.globaldata, obj)
        base.mipSetGlobalData(obj)
        base.setSession(datas)
      } else {
      }
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
      }, 200)
    },
    picker (item) {
      let that = this
      let Picker = picker.Picker()
      let params = ''
      if (item.type === 'floor') {
        params = {
          title: '',
          pickerType: 'city',
          type: 1,
          keys: {
            id: 'id',
            value: 'name'
          },
          data: that.floorAndTime.move.data,
          successCallback: function (val) {
            let move = that.floorAndTime.move

            let str1 = ',楼层费'
            let str2 = '...'
            let value = val.value.replace(str1, str2)
            let obj = ''
            if (item.status === 'out') {
              move.moveOut = value
              obj = { moveOutNum: Number(val.code) }
              base.mipSetGlobalData(obj)
            } else {
              obj = { moveInNum: Number(val.code) }

              base.mipSetGlobalData(obj)
              move.moveIn = value
            }
            let datas = base.mipExtendData(that.globaldata, obj)
            base.setSession(datas)

            that.pickerMaskClose()
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
      } else {
        params = {
          title: ' ',
          pickerType: 'time',
          type: 5,
          defaultValue: '',
          separator: '',
          successCallback: function (val) {
            let values = val.value.replace(/-/g, '/')
            let date = Date.parse(new Date(values)) / 1000
            let floorTime = that.floorAndTime
            floorTime.time = val.value
            let obj = { orderTime: date }
            let datas = base.mipExtendData(that.globaldata, obj)
            base.mipSetGlobalData(obj)
            base.setSession(datas)
            that.pickerMaskClose()
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
      }
    },
    // 保存 备注(后期加入)
    saveMask () {
      let obj = { remark: this.floorAndTime.remark }
      let datas = base.mipExtendData(this.globaldata, obj)
      base.mipSetGlobalData(obj)
      base.setSession(datas)
    },
    closeLayer () {
      this.warn.show = false
    },

    RestoreData () {
      let promas = base.getRequest()
      if (promas.hasOwnProperty('cardnum')) {
        //   有从卡片进入的标志
        this.homePageInto()
      } else {
        //  无从卡片进入的标志
        this.reduction()
      }
    },
    // 还原数据-----级别与homePageInto相同
    reduction () {
      let floorAndTime = this.floorAndTime
      let data = base.getSession()
      console.log(data)
      if (data !== null) {
        console.log('存在缓存数据')

        base.mipSetGlobalData(data)

        // 还原车型
        let carTypeItem = {
          index: 0
        }
        switch (data.carType) {
          case 3:
            break
          case 2:
            carTypeItem.index = 1
            break
          case 20:
            carTypeItem.index = 2
            break
        }
        if (this.hide && carTypeItem.index === 2) {
          carTypeItem.index = 0
          let obj = {
            carType: 3
          }
          console.log(JSON.stringify(obj, null, 2))
          let datas = base.mipExtendData(this.globaldata, obj)
          base.mipSetGlobalData(obj)
          base.setSession(datas)
        }
        this.changeTab(carTypeItem, true)

        let str1 = ',楼层费'
        let str2 = '...'

        if (data.moveOutNum !== '') {
          let num = data.moveOutNum
          let value = floorAndTime.move.data[num].name.replace(str1, str2)
          floorAndTime.move.moveOut = value
        }
        if (data.moveInNum !== '') {
          let nums = data.moveInNum
          let values = floorAndTime.move.data[nums].name.replace(str1, str2)
          floorAndTime.move.moveIn = values
        }
        // 时间
        if (data.orderTime !== '') {
          let time = base.timeformat(new Date(data.orderTime * 1000), 'yyyy-MM-dd hh:mm')
          floorAndTime.time = time
        }
        // 配置地址
        // 配置备注
        if (data.remark !== '') {
          floorAndTime.remark = data.remark
        }

        setTimeout(() => {
          this.calPrice()
        }, 300)
      }
    },

    // 从卡片进入页面根据url参数进行车型选择
    homePageInto () {
      console.log('========从卡片进入页面根据url参数进行车型选择==============')
      let promas = base.getRequest()
      //   if (promas.hasOwnProperty('cardnum')) {
      let index = promas.cardnum
      //   let carTypeItem = {
      //     index: index
      //   }

      //   sessionStorage.setItem('bdcardfrom', index)

      //   this.changeTab(carTypeItem, true)
      let data = ''
      if (this.carTypes.length < 3) {
        data = this.carTypes[0]
      } else {
        data = this.carTypes[index]
      }
      let obj = {
        carType: data.type
      }
      console.log(JSON.stringify(obj, null, 2))
      let datas = base.mipExtendData(this.globaldata, obj)
      base.mipSetGlobalData(obj)
      base.setSession(datas)

      this.reduction()
      // setTimeout(() => {
      //   this.calPrice()
      // }, 200)
    //   }
    },

    // 点击波纹效果
    clickRipple () {
      let util = MIP.util
      util.event.delegate(
        this.$element,
        '.btn',
        'click',
        function (e) {
          let target = e.target
          if (target.className.indexOf('btn') > -1) {
            let rect = target.getBoundingClientRect()
            let ripple = target.querySelector('.ripple')
            if (!ripple) {
              ripple = document.createElement('span')
              ripple.className = 'ripple'
              ripple.style.height = ripple.style.width =
                Math.max(rect.width, rect.height) + 'px'
              target.appendChild(ripple)
            }
            ripple.classList.remove('show')
            let top =
              e.pageY -
              rect.top -
              ripple.offsetHeight / 2 -
              document.body.scrollTop
            let left =
              e.pageX -
              rect.left -
              ripple.offsetWidth / 2 -
              document.body.scrollLeft
            ripple.style.top = top + 'px'
            ripple.style.left = left + 'px'
            ripple.classList.add('show')
            return false
          }
        }
      )
    },

    // 日式搬家提示
    rishiMove () {
      let warn = this.warn
      warn.show = true
      warn.texts = '暂未上线,敬请期待!'
    },
    // 自定义滑动效果
    getwidth () {
      let swiper = this.$element.querySelector('.swiper-wrapper')
      let width = MIP.util.css(swiper, 'width')
      width = Number(width.substring(0, width.length - 2))
      this.swiperWidth = width
    },
    moves (num) {
      let swiper = this.$element.querySelector('.swiper-wrapper')
      num = -num
      let currentIndex = this.currentIndex
      num = -currentIndex * this.swiperWidth + num
      this.transform = num
      let t = 'translateX(' + num + 'px)'
      MIP.util.css(swiper, {
        transform: t,
        'transition-duration': '0ms'
      })
    },
    // 不足距离 返回
    moveSBack (num, isRestoreData) {
      let swiper = this.$element.querySelector('.swiper-wrapper')
      this.transform = num
      let t = 'translateX(' + num + 'px)'
      MIP.util.css(swiper, {
        transform: t,
        'transition-duration': '300ms'
      })

      let transformNum = Math.abs(num)
      this.currentIndex = parseInt(transformNum / this.swiperWidth)
      let index = this.currentIndex
      this.currentCar = this.tabData[index]
      this.tabData.forEach(element => {
        element.isActive = false
        if (element.index === index) {
          element.isActive = true
        }
      })
      let flag = isRestoreData || false
      this.changeTabData(index, flag)

      setTimeout(function () {
        MIP.util.css(swiper, {
          'transition-duration': '0ms'
        })
      }, 100)
    },
    swiperTouch () {
    //   let that = this
      let swiper = this.$element.querySelector('.swiper-wrapper')
      swiper.addEventListener('touchstart', (event, str) => {
        event.preventDefault()
        let touch = event.touches[0]
        this.startX = touch.pageX
      })
      swiper.addEventListener('touchmove', (event, str) => {
        event.preventDefault()
        let touch = event.touches[0]
        this.endX = touch.pageX
        let num = this.startX - touch.pageX
        this.moves(num)
      })
      swiper.addEventListener('touchend', (event, str) => {
        let num = this.startX - this.endX
        if (this.transform > 0) {
          this.moveSBack(0)
        } else {
          let temp = num
          if (num < 0) {
            temp = -num
          }

          if (num < 0) {
            if (temp > this.swiperWidth / 5) {
              let curentIndex = this.currentIndex
              if (curentIndex !== 0) {
                this.moveSBack(-this.swiperWidth * (curentIndex - 1))
              }
            } else {
              let num = -this.currentIndex * this.swiperWidth
              this.moveSBack(num)
            }
          } else {
            if (temp > this.swiperWidth / 5) {
              let curentIndexs = this.currentIndex
              if (curentIndexs !== this.maxIndex) {
                this.moveSBack(-this.swiperWidth * (curentIndexs + 1))
              } else {
                this.moveSBack(-this.swiperWidth * this.maxIndex)
              }
            } else {
              let nums = -this.currentIndex * this.swiperWidth
              this.moveSBack(nums)
            }
          }
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.lxn-hide {
  display: none;
}
.wrapper {
  margin: 0 auto;
  text-align: center;
  height: 100%;
}

.banner-content {
  max-height: 1.6rem;
  overflow: hidden;
}

.head {
  height: 0.9rem;
  display: flex;
  align-items: center;
}
.head-logo {
  width: 0.92rem;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.head-logo::after {
  content: "";
  display: inline-block;
  position: absolute;
  border-radius: 5px;
  width: 0.02rem;
  height: 0.42rem;
  right: 0;
  background: #ecebeb;
  top: 50%;
    transform: translateY(-50%);
}
.head-ul {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
}

.head-ul li {
  flex: 1;
  display: flex;
  align-items: center;

  height: 100%;
  list-style: none;
  font-size: 0.3rem;
  color: #666666;
  letter-spacing: 0.0008rem;
  text-align: center;
  position: relative;
}
.head-ul li::after {
  content: "";
  display: inline-block;
  position: absolute;
}

.head-ul li:nth-child(1) {
  justify-content: center;
  color: #333333;
}

.head-ul li:nth-child(1)::after {
  width: 1.2rem;
  height: 0.06rem;
  background: #39a1e8;
  bottom: .01rem;
  left: 50%;
  transform: translateX(-50%);
}
.head-ul li:last-child {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 !important;
}
.head-ul li img.upline {
  position: relative;
  top: -0.09rem;
  width: 1rem;
  height: 0.26rem;
}

.tab {
  padding: 0 0.2rem;
  margin-top: 0.3rem;
}
.tab-div {
  background: #ffffff;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  padding: 0 0.3975rem;
  /* padding-top: 0.28rem; */
  padding-bottom: 0.4rem;
}
.lxn-tab-title {
  display: flex;
}
.lxn-tab-title li {
  flex: 1;
  color: #666666;
  font-size: 0.28rem;
  letter-spacing: 0.7px;
  padding-top: 0.28rem;
  padding-bottom: 0.3rem;
}
.active {
  color: #39a1e8 !important;
  position: relative;
}
.active::after {
  content: "";
  display: inline-block;
  position: absolute;
  width: 0.46rem;
  height: 0.06rem;
  background: #39a1e8;
  bottom: 0.2rem;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 1.44rem;
}

.swiper-div {
  margin-bottom: 0.2rem;
}
.swiper-container {
  width: 100%;
  height: 1.08rem;
}
.car-img-div {
  width: 2.24rem;
  height: 1.06rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.car-img-div .car {
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
}
.car-img-div .xiaomian {
  background-image: url(https://www.lanxiniu.com/Public/baidumip/xiaomian.png);
}
.car-img-div .jinbei {
  background-image: url(https://www.lanxiniu.com/Public/baidumip/jinbei.png);
}
.car-img-div .xianghuo {
  background-image: url(https://www.lanxiniu.com/Public/baidumip/xianghuo.png);
}

.car-deccription > div {
  display: flex;
  height: 0.75rem;
  align-items: center;
  background: #f1f1f1;
  box-shadow: 0 2px 4px 0 rgba(234, 234, 234, 0.5);
  border-radius: 0.04rem;
  font-size: 0.2rem;
  color: #666666;
  position: relative;
  padding-top: 0.02rem;
}
.car-deccription > div::before {
  display: block;
  content: "";
  position: absolute;
  left: 50%;
  top: -0.24rem;
  transform: translateX(-50%);

  border-width: 0.16rem 0.16rem 0.1rem 0.16rem;
  border-style: solid;
  border-color: transparent transparent #f1f1f1 transparent;
}
.des-div {
  flex: 1;
  position: relative;
}
.des-div:not(:last-child)::after {
  content: "";
  display: inline-block;
  position: absolute;
  width: 0.02rem;
  height: 0.28rem;
  background: #ffffff;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 1.44rem;
}
.des-div p:last-child {
  /* margin-top: 0.05rem; */
}

.swiper-container {
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  z-index: 1;
}

/*主体数据*/
.main-conten {
  margin-top: 0.24rem;
  height: 2.75rem;
}
.address {
  width: 100%;
  height: unset!important;
  /* background: blue; */
}
.point {
  width: 0.16rem;
  height: 0.16rem;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
}
.move-out-point {
  background: #feb02a;
}
.move-in-point {
  background: #a1d48f;
}

.address-div {
  padding-left: 0.6rem;
  position: relative;
  font-size: 0.28rem;
}
.address-div input {
  font-size: 0.28rem;
  color: #666666 !important;
//   background: red;
  line-height: .745rem;
}
.gomap{
 height: 100%;
 display: flex;
 align-items: center;
 color: #999999;
}
.gomap.hastext{
    color: #666666;
}

.address-div-flex {
  display: flex;
  height: 100%;
  border-bottom: 0.02rem solid rgba(68, 68, 68, 0.1);
  padding-bottom: .04rem;
}
.address-div-flex2 {
  border: none;
}
.address-div div.left {
  position: relative;
  flex: 3;
//   height: .75rem;
}
.address-div div.left::after {
  content: "";
  display: inline-block;
  position: absolute;
  width: 0.02rem;
  height: 0.3rem;
  background: #e1e1e1;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 1.44rem;
}
.noafter::after {
  width: 0 !important;
}
.address-div div.right {
  flex: 2;
//   height: .75rem;
}
.address-div div.right input {
  text-align: right;
}
.address-div input{
    height: .745rem;
}
.move-second {
  border-top: 0.02rem solid rgba(68, 68, 68, 0.1);
  border-bottom: 0.02rem solid rgba(68, 68, 68, 0.1);
}
.move-second .address-div-time {
  border: none;
}
.move-second .left {
  text-align: left;
  position: relative;
}
.move-second .left span {
  font-size: 0.28rem;
  color: #666666;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
.address-div:last-child{
    height: .75rem;
    // background: red
}
.movetime,
.beizhu {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
}
/*价格*/
.price {
  margin-top: 0.57rem;
}
.price-num {
  font-size: 0.56rem;
  color: #f37272;
  position: relative;
  top: 0.06rem;
}
.price-unit {
  position: relative;
  color: #f37272;
  margin-right: 0.2rem;
}
.price-unit::after {
  content: "";
  display: inline-block;
  position: absolute;
  width: 0.02rem;
  height: 0.35rem;
  background: #f37272;
  right: -0.07rem;
  bottom: -0.01rem;
  border-radius: 1.44rem;
}
.zifei {
  font-size: 0.24rem;
  color: #4dabeb;
}
.sure-order {
  margin: 0.28rem 0;
  height: 0.76rem;
  line-height: 0.76rem;
  font-size: 0.34rem;
  color: #ffffff;
  background: #36a0e9;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.3);
  border-radius: 2px;
}

/*swiper*/
.swiper-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 1;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-transition-property: -webkit-transform;
  -moz-transition-property: -moz-transform;
  -o-transition-property: -o-transform;
  -ms-transition-property: -ms-transform;
  transition-property: transform;
  -webkit-box-sizing: content-box;
  -moz-box-sizing: content-box;
  box-sizing: content-box;
}

.swiper-container-android .swiper-slide,
.swiper-wrapper {
  -webkit-transform: translate3d(0, 0, 0);
  -moz-transform: translate3d(0, 0, 0);
  -o-transform: translate(0, 0);
  -ms-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}
.swiper-slide {
  -webkit-flex-shrink: 0;
  -ms-flex: 0 0 auto;
  flex-shrink: 0;
  width: 100%;
  height: 100%;
  position: relative;
}

.inputfix{
    position: relative;
    // display: inline-block;
    display: block;
    height: 100%;
    width: 100%;
    &::before{
        position: absolute;
        top: 0; left: 0; right: 0; bottom: 0;
        content: "";
        background-color: rgba(0, 0, 0, 0)
    }

}
</style>
