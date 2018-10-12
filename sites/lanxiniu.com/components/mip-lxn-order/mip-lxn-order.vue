<template>
  <div class="wrapper">

    <div class="banner-content">
      <div
        on="tap:sidebar.open"
        class="head actives">
        <mip-img
          class="user"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAApVBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASEhIAAAAAAAAAAAAAAAAAAADLy8srKyv5+flkZGQ+Pj7m5ube3t6/v7/+/v78/Pz09PTx8fHHx8fExMS3t7eurq4AAAD6+vrw8PDR0dGpqamlpaWIiIiCgoJ4eHhRUVH29vbt7e3p6enh4eHV1dXJycmcnJyYmJiPj49ycnLX19fLy8v///80YWSfAAAANnRSTlNNAEclHAVMQCsRUUQ+PDIKq1fvaVzOw6H7+ObhqKWZkzbz3rOOjHp2cWLq2dTHt6uFg31vuq2EvXj9AAACEElEQVRYw6TP6U7CQBSG4Y/Zx24pZRNMAEkQFwiJce7/0sRUQpmeU9v4/D9vvoMRQyuZp4kwRiRpLpUeMeiAdxYR63zfgJYWJCt1j4CWAiwRJYiAEugkVGegyPCnrOADXqAH4bmAMujFKDrg0JujAhsMsGkHHAZxcUBhIHUf8AYDGd8MFAKUl6/jx2xegSSKRiAjz99DbfYKSnYLKBDWi3A1PoCirgFNPXAODWNyg9C/AYm2chuapqDIOkAOeAr39twE0AOwjAInbsIlYNE2CZEVKPYn4EH4DJEtSP4ScP8JuEvAos8Lz2B+gAZpFQV2oGkokOZR4ACaggSpHIemIxgSOWj7Rbh5m4CRIwXj/BiulhU4KRJwqml9vtiVYCUQ4FXz02y3nqCDgAHvoYYOhguU36WXzQrCMBCEIa0HQdH+WfuTCKVRUaFUZN//0TwIHpJJIMx3b0M2u7Mz9tT/i1A+dRX8gYJHm1IcArqmYBGLRny6FRdxB74fBGLRM6JGagTT3VEjZb4cS4gJtXLuFfAhQWYwTN44rxLmBcbZE5SPRKhdQQGSNkmEtytpQFRLgeAibIGsnyWCcW6AFsuQcIUMrbaqkRD9Baw2sFyLmzWtHsfl+GMZtW7NfK29LgLrPQW1AQYjhRxYnBT2wGSloA6szWONJmt1abPN230+cPCRhw9dfOzjgycfffnwTcf/L1foiQI8KsLLAAAAAElFTkSuQmCC"/>
      </div>
      <mip-img src="https://www.lanxiniu.com/Public/baidumip/newbanners.png"/>
    </div>
    <div class="order-data">
      <div>
        <div class="address-data">
          <div class="title">
            <div>搬家地址</div>
            <div/>
            <div/>
          </div>
          <div class="address-detail">
            <div>
              <span class="move-icon out"/>
            </div>
            <div class="actives">
              <a
                :href="htmlhref.mapout"
                data-type="mip"
                class="inputfix">
                <input
                  v-model="moveOut"
                  type="text"
                  placeholder="您要从哪里搬出">
              </a>
            </div>
          </div>
          <div class="address-detail">
            <div>
              <span class="move-icon in"/>
            </div>
            <div style="border-bottom:unset">
              <a
                :href="htmlhref.mapin"
                data-type="mip"
                class=" actives inputfix">
                <input
                  v-model="moveIn"
                  type="text"
                  placeholder="想要搬到哪里去">
              </a>
            </div>
          </div>
        </div>
        <div class="line"/>
        <div class="carType-data">
          <div class="title">
            <div>选择车型</div>
            <div>(根据物品数量)</div>
            <div
              data-stats-baidu-obj="%7B%22type%22%3A%22click%22%2C%22data%22%3A%5B%22_trackEvent%22%2C%22checkcartype%22%2C%22click%22%5D%7D"
              class="actives"
              @click="hrefToCostdes">查看车型详情</div>
          </div>
          <div class="card-car-content">
            <div
              v-for="item in tabData"
              :key="item.name"
              class="car-item">
              <div class="par-des">
                <div
                  :class="{checked:item.checked}"
                  class="des"
                  @click="checkCurrentCar(item)">
                  <div>{{ item.name }}</div>
                  <div>{{ item.price }}</div>
                  <mip-img
                    :src="item.srcs"
                    class="car-img"/>
                    <!-- <div class="cardes">{{ item.des }}</div> -->
                </div>

              </div>
            </div>
          </div>
          <div class="parent-sure-order">
            <div
              class="sure-order"
              @click="guJia">{{ btnName }}</div>
          </div>
        </div>
      </div>

    </div>

    <div class="service">
      <div class="div-kefu">
        <label class="kefu">
          <div>
            <mip-img
              class="safe-img"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAY1BMVEUAAABxx2Byx2F3zm9yx19xx2Bxx2BzyGFyx19xx19xx2Bxx19xx19yx2ByyGBzymR9zmJyxmBxx2Bxx19xx19yx19xx2ByyGByyGBzyGF0yGJ1y2KI3mZxx19xx2B1x2Fxxl8FL1ThAAAAIHRSTlMA+V4K9bLIPtzN6uW5qVYbD/LhvqObkG1kQCkTB6mFMlLCCsgAAACrSURBVCjPrdLJDgIhDIDhAsMMzL7vat//KU2kKY7gSf9b86UHSOHSw9gd4jUTIoq5iVA2CnSVUoFvW+46x7eErSZJ2GGkjhBjiT9jMtsA2TbYQyTLANYQq55MYoAjtClZiKaFdmDz6D41VQDeMCE0bhzOl1GGUNOsmwU5TVhjJEl4FqHlCr6vSuCqT9PgUyly/CzusBc74JLS3m68x8ncUVFDJLWWRU93+WNPmLcwoQe88x0AAAAASUVORK5CYII=" />
          </div>
          <div>客服全程监管, 免费5000元搬家保障</div>
        </label>
      </div>
      <div class="option">
        <div
          data-stats-baidu-obj="%7B%22type%22%3A%22click%22%2C%22data%22%3A%5B%22_trackEvent%22%2C%22costdes%22%2C%22click%22%5D%7D"
          @click="hrefToCostdes">
          <mip-img
            class="option-img"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAAYFBMVEUAAADq6uri4uJt0P9rw/+i6f9rxP9rwv9qw/9rw/9sxP9rxf9txf9rw/9qw/9rxP9rw/9qwv9qw/9qw/9rw/9rxP9rw/9sxP9sw/9uxv9uxf9vyP9rwv9sw/9qwv/h4eFNxbdYAAAAHnRSTlMADMMLrgN/7N7UV0wj9el5+fDkwo2FcmNANSwXm5ozd0SEAAABjklEQVRIx+2XSZLDIAxFnWDjAcdzPIfc/5Zd7UYJg4nd9bf5Owq9QhICRLCvaOofbRJXVZy0j36KgtOKRFhLQ3UozvGsjOWO4pIdrzo00qNmOFhdpPKDUvGJvcsD3f3RhvJQoSfyPJUnlOa7bGEYJV025ozlY9YlxkSxQ7NUN+CzPjfzQl/b9VyL98adacZvWtwf8hwuwY6W0Jtz8Z7hgUf8bSOMukpfLmeBV9ntFbZea4MkKdZDS9KgpaOxfD70vHmntPTl8XLx7Un5ijimgBeLvV4teqGw48hONbfZ51PRruPC8qVgDuvQrDAjjGqKw2WJdpeu//yepNLssi49k/W0DXs6Rza7T9MZ67fRqkadxXroTpmv26il4jJZk3bLrDX8GA3WS49GlFQiuc766ZzKZBtVasR01k8zZV5BMOQ2lDBoq5AieUDlCR0M80jy/x1J5DKAriHoAkSuXujSR54b6KFDnljkcUfaCqihQVoppIlD20e8ccVbZrxZx78J+AeFvkYrfY3W36/RV0o/ajqlHYCl+8UAAAAASUVORK5CYII=" />
          <div>费用标准</div>
        </div>
        <div>
          <a
            :href="customeServerUrl"
            data-stats-baidu-obj="%7B%22type%22%3A%22click%22%2C%22data%22%3A%5B%22_trackEvent%22%2C%22serveronline%22%2C%22click%22%5D%7D">
            <mip-img
              class="option-img"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAApVBMVEUAAABrw//h4eFqw//k5OTi4uJsxP90yf/Q///j4+Pn5+fi4uLi4uJrw//i4uJrw/9qwv9rw/9rw/9qw/9rxP9rw/9sxP9rw//j4+Nswv/k5ORs0//i4uLi4uLi4uLi4uLi4uLi4uLj4+Pl5eXm5uZrw//i4uJqwv/h4eHj4+Pi4uLq6ur///9qw//h4eHi4uLi4uLi4uLj4+Ph4eHi4uJqwv/h4eEzkvEiAAAANXRSTlMAvef7HKYkEANjCu3d8+HZxa6qkHVdWlFOOzkM/MfAsoWAdCMQovbWmmtUGAah18uolUkzLOXvEtIAAAIPSURBVEjH7ZbZdoIwEIYDVUBErQuKKILivm/w/o/W02QSIRDCOell/7uY+TKZhYlIoPiwDwNnu3WCcH+IUX1Zx303zam7P1q1UPsAJMcfbDm6bKcCtZcS3HfSCjl+BXqO5mml5tFZxJ5uGbMg8vzYtmPfi4LMkbeTgL0yk+CYC88+BmzrWko3WLhhSWh+yAJvVLC6h0rl6ULaWsDWfY0EWt/BZME3zBI2IlShCIyWXEiQ0BWq1ApK4efS2aVHSgQX7NrFE0Np91th4Ya2TtK4RlKtHVISm3fsoRryONdn4niBamlBXNMmf5LDXvXgF7F+wvJRdCx3/YAVqVMrb2K6F63X6fS0i2vmd1qkWmTxxottLtUT7Sth+tImuYRvMfAmg7L1q2yqp98Jp+9pNuEYiMsbYZiUaFhrfJpaUirNrMHuEoF2UtrSEqE02c2HSYWGxfnT1PVmg+Y5U6DB2JjNjPEgU7QpxzTa+DUA+lOjvoFARv9TMWAp00yxmqQ3mNsRymjEnJNuYYwOMxP/yrIFLKNZzvCSMSkIl4l66CNOfXojXC7K5GCXmhg8bNBjXSG8AYsBKmgAWxsRzEIeF+ExDVoI98DCKMIGbPWEcAcsZkV4BlsdJVjp2koJUynV5c+aRKk9lT4MpU9SaRiojCGFAag0etWHvvpzo/7QyZ9YsaSPe32Z7ob8rdi4JvoX0w8ouxLoG0Sx1gAAAABJRU5ErkJggg==" />
            <div>在线咨询</div>
          </a>

        </div>
        <div>
          <a
            data-stats-baidu-obj="%7B%22type%22%3A%22click%22%2C%22data%22%3A%5B%22_trackEvent%22%2C%22call400%22%2C%22click%22%5D%7D"
            href="tel:4006785966">
            <mip-img
              class="option-img"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAA51BMVEUAAABtxv9rw//d//9sw//j4+NsxP9rw/9rw/9sxP+A2/9qw//k5OTi4uJqw//i4uJrw//i4uJrw/9rxP/j4+Pj4+NsxP9xy//s7Ox7yv9rw//i4uLi4uLi4uJrw/9qwv9rwv/i4uJqw/9rw/9qw/9qw//i4uJqwv9qxP/i4uLj4+Pn5+fh4eHi4uLi4uLh4eHi4uLl5eXl5eV2xP9q1f/i4uJrwv/j4+Pi4uJsxP9sw/9sxv9tw/9sw/9txv9wx//o6Oj////i4uLi4uLh4eHi4uLi4uLi4uLi4uLi4uLm5uZqwv/h4eGTplBAAAAAS3RSTlMAGdkCfywn7d9PB/Yl9fPq4sSKglFCNBUNCernn3/5zsG2rqmclZJxYVY1H9e+inhzOhwNDMd6a2VaVUdEQC4gFQfs697QqaWGhRR8xdNsAAACMElEQVRIx+2V2XqiMBSAD4IIgtZ9wbUu1VGnVWu3aTvt7Mvh/Z9nEBNDhAOtc9Xv639liD9JzhLgnTeKrvyH66SOthUDMWSr9qy6mn9JcrM9xAPb7hRzrs/V71msPEY8sNctN0CxQrsmYshOn7hBPtqE2ywg5x4oO0csXt67UwDSdpdRbt3i7jVI2FW7Ma/eFLl9C2E07g4gmnSb2dVwmjLMtZ6A4sMua60GGeoy0KR3mTuDA4bMLTSlxw17/VcVw5XrM5ddNc/kUvBh58rf5tlq7y99+VyWa8ioSYd0GafPwFhsh19VSZ7w4gKItFs8xDf+UC7zkdi1hD1/nl1835ZWmgXBj/gFBOmL4gqj/vH+v2AJ8ovllzRvMPkBIrkVCWr7DSLN8hLRwyJXcrv7oLOVF9Jkl8mXhLz2jIqQfxAywanrtsW2i8S2Cc69ZLO3ePyMDNgjJS95lNInZKruYlYuwt6uEkVCUPFzxexvyeV5WKkV4HaHaIzPpF1piN9ES2pwBEMmO5sjZBOPX1pcgPk6JENfverr5br1mo3Tn5tPEMO9Ev+hs2LsKaYUIuAcjTr3NSJhj4U9iIz50wCRsrM9Yee1TehcZQuRthUDBY4m1XmtxGJC2rqDQVKlu0d9c6k/TEspacLRIco28AUYwpVQesluTyGLfJzkjrNAYxbi1IJJeSInBFa5mdwlWiZKzWj1l/W3OczLZn5ohg5Lo9Ymo76R6XYzRn80qanwjsc/TQbv4fcQpE8AAAAASUVORK5CYII=" />
            <div>客服热线</div>
          </a>
        </div>
        <div
          data-stats-baidu-obj="%7B%22type%22%3A%22click%22%2C%22data%22%3A%5B%22_trackEvent%22%2C%22userguide%22%2C%22click%22%5D%7D"
          @click="hrefToUserguide">
          <mip-img
            class="option-img"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAAYFBMVEUAAADq6uri4uJt0P9rw/+i6f9rxP9rwv9qw/9rw/9sxP9rxf9txf9rw/9qw/9rxP9rw/9qwv9qw/9qw/9rw/9rxP9rw/9sxP9sw/9uxv9uxf9vyP9rwv9sw/9qwv/h4eFNxbdYAAAAHnRSTlMADMMLrgN/7N7UV0wj9el5+fDkwo2FcmNANSwXm5ozd0SEAAABjklEQVRIx+2XSZLDIAxFnWDjAcdzPIfc/5Zd7UYJg4nd9bf5Owq9QhICRLCvaOofbRJXVZy0j36KgtOKRFhLQ3UozvGsjOWO4pIdrzo00qNmOFhdpPKDUvGJvcsD3f3RhvJQoSfyPJUnlOa7bGEYJV025ozlY9YlxkSxQ7NUN+CzPjfzQl/b9VyL98adacZvWtwf8hwuwY6W0Jtz8Z7hgUf8bSOMukpfLmeBV9ntFbZea4MkKdZDS9KgpaOxfD70vHmntPTl8XLx7Un5ijimgBeLvV4teqGw48hONbfZ51PRruPC8qVgDuvQrDAjjGqKw2WJdpeu//yepNLssi49k/W0DXs6Rza7T9MZ67fRqkadxXroTpmv26il4jJZk3bLrDX8GA3WS49GlFQiuc766ZzKZBtVasR01k8zZV5BMOQ2lDBoq5AieUDlCR0M80jy/x1J5DKAriHoAkSuXujSR54b6KFDnljkcUfaCqihQVoppIlD20e8ccVbZrxZx78J+AeFvkYrfY3W36/RV0o/ajqlHYCl+8UAAAAASUVORK5CYII=" />
          <div>用户指南</div>
        </div>
      </div>

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
export default {
  props: {
    globaldata: {
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
      customeServerUrl: '',
      htmlhref: {},
      fetchShow: false, // fetch请求loading
      moveOut: '',
      moveIn: '',
      currentCarItem: '', // 当前车型---数据用
      //   车辆数据
      tabData: [],
      couponsId: 0, // 优惠券id
      btnName: '获取报价',
      warn: {
        // 弹窗
        show: false,
        texts: ''
      }
    }
  },
  watch: {
    globaldata (val, oldval) {
      console.log(
        '查看之前的城市:' +
          oldval.ordercity +
          '=============现在的城市:' +
          val.ordercity
      )
      if (val.ordercity !== oldval.ordercity) {
        this.getCurrentCityCarTypes(val.ordercity)
      }
    }
  },
  created () {
    base.setHtmlRem()
  },
  mounted () {
    //   页面显示的时候
    window.addEventListener('show-page', e => {
      console.log('页面显示')
      let lxndata = base.getSession()
      if (lxndata !== null) {
        console.log(JSON.stringify(lxndata, null, 2))
        this.moveOut = lxndata.moveOutAddress.localtion.name
        this.moveIn = lxndata.moveInAddress.localtion.name
      }
      this.calPrice()
    })
    // 基本数据初始化
    this.initData()

    // 添加MIP组件监听
    this.addMipWatch()
  },

  methods: {
    // 基本数据初始化
    initData () {
      // 配置链接信息
      this.htmlhref = base.htmlhref
      this.customeServerUrl = base.customeServerUrl
      this.reduction()
      // 获取当前城市的车型信息
      //   this.getCurrentCityCarTypes(this.globaldata.ordercity)
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

      //   点击(用户)登录
      this.$element.customElement.addEventAction('userlogin', (event, str) => {
        let isLogin = this.userlogin.isLogin
        console.log('点击用户登录')
        if (!isLogin) {
          let config = {
            redirectUri: ''
          }
          MIP.setData({ config: config })
          this.$nextTick(() => {
            console.log('点击头像登录')
            this.$emit('actionName')
          })
        }
      })

      //   订单列表跳转
      this.$element.customElement.addEventAction(
        'goorderlist',
        (event, str) => {
          let isLogin = this.userlogin.isLogin
          console.log('订单列表跳转')
          if (isLogin) {
            MIP.viewer.open(base.htmlhref.orderlist, { isMipLink: true })
          } else {
            console.log('未登录')
            let config = {
              redirectUri: base.htmlhref.orderlist
            }
            MIP.setData({ config: config })
            this.$nextTick(() => {
              console.log('点击订单列表录')
              this.$emit('actionOrderList')
            })
          }
        }
      )

      //   资费说明跳转
      this.$element.customElement.addEventAction('gocostdes', (event, str) => {
        MIP.viewer.open(base.htmlhref.costdes, { isMipLink: true })
      })

      //   用户指南跳转
      this.$element.customElement.addEventAction(
        'gouserguide',
        (event, str) => {
          MIP.viewer.open(base.htmlhref.userguide, { isMipLink: true })
        }
      )
    },

    // 选择车型
    checkCurrentCar (item) {
      this.tabData.forEach(ele => {
        ele.checked = false
        if (ele.type === item.type) {
          ele.checked = true
        }
      })
      this.currentCarItem = item
      let obj = {
        currentCarItem: this.currentCarItem
      }
      this.setGlobalData(obj)
      //   console.log(JSON.stringify(item, null, 2))
      this.calPrice()
    },
    // 去估价
    guJia () {
      this.checkData()
    },
    // 提交订单前检查数据
    checkData (sessionId) {
      console.log('------------------')
      //   let warn = this.warn
      let moveOut = this.moveOut
      let moveIn = this.moveIn
      console.log('查看搬出地址数据')
      if (moveOut) {
        if (moveIn) {
        //   this.upOrder()
          MIP.viewer.open(base.htmlhref.payorder, { isMipLink: true })
        } else {
          this.openLayer('请填写搬入地址')
        }
      } else {
        this.openLayer('请填写搬出地址')
      }
    },
    closeLayer () {
      this.warn.show = false
    },
    // 还原数据
    reduction () {
      //   let lxnData = base.getSession()
      //   if (lxnData) {
      //     let moveOutAddress = lxnData.moveOutAddress
      //     let moveInAddress = lxnData.moveInAddress
      //     this.moveOut = moveOutAddress.localtion.name
      //     this.moveIn = moveInAddress.localtion.name
      //   }
      this.getOpenCity()
    },
    // 获取开通城市列表
    getOpenCity () {
      let city = encodeURIComponent('北京')
      let urls = base.url + '/Setting/getCityData?city=' + city
      window
        .fetchJsonp(urls)
        .then(response => response.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
          //   console.log('查看开通城市:' + JSON.stringify(response.data.open_citys, null, 2))
          let cityList = response.data.open_citys

          if (cityList) {
            let obj = {
              cityList: response.data.open_citys
            }
            this.setGlobalData(obj)
            // let lxnData = base.getSession()
            // if (lxnData) {
            //   lxnData.cityList = cityList
            //   this.setGlobalData(lxnData)
            // } else {

            // }
          }
          this.ipLocaltion()
        })
    },
    // 请求当前城市的车型列表
    getCurrentCityCarTypes (city) {
      //   let focusCity = city
      let urls = base.url + '/Setting/getCityData?city=' + city
      window
        .fetchJsonp(urls, {
          method: 'get'
        })
        .then(response => response.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
          let service = response.data.setting.service

          this.setCityCarTypes(service)
        })
    },
    setCityCarTypes (service) {
      for (let i = 0; i < service.length; i++) {
        if (service[i].type === 5) {
          //   console.log(JSON.stringify(service[i].car, null, 2))
          let carType = service[i].car
          this.tabData = []
          let priceUnit = '元('
          let distanceUnit = '公里)'
          carType.forEach(item => {
            let arr = item.stairs_fee.map((item, index) => {
              let arr = {
                id: index,
                name: item
              }
              return arr
            })
            // item.stairsFee = arr
            let itemType = +item.type
            let car = {
              type: 0,
              checked: false,
              name: item.name,
              stairsFee: arr,
              //   des: '适合2人物品',
              price:
                item.start_price + priceUnit + item.start_km + distanceUnit,
              srcs: 'https://www.lanxiniu.com/Public/baidumip/jinbei.png'
            }
            // 小面
            if (itemType === 3) {
            //   car.des = '适合1人物品'
              car.carType = 3
              car.srcs =
                'https://www.lanxiniu.com/Public/baidumip/xiaomian.png'
            }
            // 金杯或大面包
            if (itemType === 2) {
              car.carType = 2
              car.type = 1
            }
            if (itemType === 23) {
              car.carType = 23
              car.type = 1
            }

            // 厢货
            if (itemType === 20) {
            //   car.des = '适合家庭搬家'
              car.carType = 20
              car.type = 2
              car.srcs =
                'https://www.lanxiniu.com/Public/baidumip/xianghuo.png'
            }
            this.tabData.push(car)
          })
          this.tabData[0].checked = true
          this.currentCarItem = this.tabData[0]
          // console.log(JSON.stringify(this.currentCarItem, null, 2))
          let obj = {
            currentCarItem: this.currentCarItem
          }
          this.setGlobalData(obj)
          this.calPrice()
          break
        }
      }
    },
    // 使用百度地图 webapi --ip定位
    ipLocaltion () {
      window
        .fetchJsonp('https://api.map.baidu.com/location/ip?ak=' + base.ak)
        .then(response => response.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
          console.log(response)
          if (response.content) {
            if (response.content.address) {
              let privite = {
                ordercity: '北京'
              }
              let city = response.content.address
              let currentCity = city.substring(0, city.length - 1)
              let nowCityList = base.getSession().cityList
              if (nowCityList.indexOf(currentCity) > -1) {
                privite.ordercity = currentCity
              }
              //   let lxnData = base.getSession()
              //   if (lxnData) {
              //     lxnData.ordercity = privite.ordercity
              //     this.setGlobalData(lxnData)
              //   } else {

              //   }
              this.setGlobalData(privite)

              this.getCurrentCityCarTypes(privite.ordercity)
            }
          }
        })
    },
    // 跳转资费说明
    hrefToCostdes () {
      let lxnData = base.getSession()
      let ordercity = '北京'
      let carType = 3
      if (lxnData.ordercity) {
        ordercity = lxnData.ordercity
      }
      if (lxnData.currentCarItem) {
        carType = lxnData.currentCarItem.carType
      }
      MIP.viewer.open(
        base.htmlhref.costdes +
          '?carType=' +
          carType +
          '&ordercity=' +
          encodeURIComponent(ordercity),
        { isMipLink: true }
      )
    },
    // 跳转用户指南
    hrefToUserguide () {
      MIP.viewer.open(base.htmlhref.userguide, { isMipLink: true })
    },

    setGlobalData (obj) {
      //   console.log('调用设置数据')
      let data = base.mipExtendData(this.globaldata, obj)
      base.mipSetGlobalData(obj)
      base.setSession(data)
    },
    // 打开弹窗
    openLayer (str) {
      let warn = this.warn
      warn.show = true
      warn.texts = str
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
          let price = data.showPay
          this.couponsId = data.couponsId
          console.log('查看价格:' + price)
          this.btnName = '获取报价 (预估' + price + '元)'
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
  height: 2.2rem;
  max-height: 2.2rem;
  overflow: hidden;
  position: relative;
  background: #008ff1;
}

.head {
  position: absolute;
  left: 0.32rem;
  top: 0.18rem;
  z-index: 20;
  .user {
    width: 0.72rem;
    height: 0.72rem;
  }
}

.order-data {
  position: relative;
  top: -0.6rem;
  padding: 0 0.2rem;
  > div {
    box-shadow: 0 0 6px 0 rgba(163, 163, 163, 0.5);
    border-radius: 0.08rem;
    background: #ffffff;
  }
  .line {
    background: #f1f1f1;
    height: 0.04rem;
  }
  .address-data {
    padding-bottom: 0.05rem;
  }
  .title {
    font-size: 0.28rem;
    color: #444444;
    letter-spacing: 0.06px;
    display: flex;
    align-items: center;
    padding: 0 0.24rem;
    padding-top: 0.4rem;
    > div {
      font-weight: 600;
    }
  }
  .address-detail {
    display: flex;
    align-items: center;
    padding-left: 0.4rem;
    padding-right: 0.8rem;
    > div {
      height: 100%;
      display: flex;
      align-items: center;
      a {
        display: inline-block;
        width: 100%;
      }
    }
    > div:last-child {
      flex: 1;
      margin-left: 0.24rem;
      border-bottom: 0.02rem solid rgba(68, 68, 68, 0.1);
    }
    input {
      font-size: 0.28rem;
      height: 0.9rem;
      width: 100%;
      line-height: normal;
    }
    .move-icon {
      display: inline-block;
      width: 0.32rem;
      height: 0.33rem;
    }
    .out {
      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAhCAMAAACP+FljAAAAclBMVEUAAABqwUxrwUt401pqwEtswUxtxE5sxE6Z5mZrwUtrwUxrwEtrwUtqwUxrwUtrwUxrwkxrwkxrwk13yVJrwUxrwExrwUxrwExrwUtrwUtqwUtrwUtrwUxrwUtrw01sw0tqw01uxE5wwlJtwlVrwE1qwEuxRKQzAAAAJXRSTlMA9ukI+zkpJAPTgvTHraVxZVVPDs3v4dvZyrqbkXldQz0gGRV+Lyg0EAAAAPJJREFUOMutktlywyAMRQUYg/etWZq1Scr//2JnpFomwn7LefLV8UgDAj6K606HqjqcOreq8yYwTZ76LgsRWSf9OQjO774MCb+x/5mrqq7V/G1h4YtKx7sH8Pcjpe+kQWMomka2uGDeT3Oe9li4iAk3YG5ihsb8BOaJBc1ZYTbAGDqSGOGAcVgoOLeYr8BcsdByHqhjznujmQP/4DW1zP99gVH7ZBWqtMbYUlEqYWHSvGfeup4gog8JPcT4Wvrai/dYvfvKgaCXAxLa2LeQYorFFwZWeGg+4QNWsYq8srDBmOFdjbDJuAthR36D1zC84MP8Aa29M46ZA4zMAAAAAElFTkSuQmCC);
      background-size: 0.32rem 0.33rem;
    }
    .in {
      background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAhCAMAAACP+FljAAAAb1BMVEUAAAD/mQL/mAL/mAL/mQP/mQT/mgb/nAf/mxf/mQL/mQP/mQP/mAP/mgL/mgP/mwP/mwr/tiT/oED/mQL/mQL/mQL/mQL/mQL/mQL/mQP/mQP/mQP/mgP/mgL/mgP/mQT/mQT/nQj/mRH/mQL/mAJSU60jAAAAJHRSTlMA9en4gjkpJAvTx62lZVVPFwcEzXPv4dvZyrqbkXldQz0gD27b1oouAAAA6klEQVQ4y62SVxLDIAxEBRgb9xKn94T7nzEzKFaw5Pz5fbG7GglGwKpk42mv1P40ZotxWnqiTGU+Gh9h3jw/e8Z5nidekMT5Y3JVUajpbOHHBq3DfQAY7gdUR9Gg7FH2JW9xCXr3mvRrF4wLm3AD4sZm6KA7ILpgaNJ48R6IHp/ERmTRVoKRk66CvgJxDUZFusGOKe0NZzZUMGhsmX7zHO84iFWYxDpnEyOX4bQXaAcRtSyoYUbB84L/RzXPlfiXNR8gqOK8AonLf3nuYIGnphc+YRFrMDcW/tBiQQt/abfeb6Nc0jVNByvzAVdgMoCPYveVAAAAAElFTkSuQmCC);
      background-size: 0.32rem 0.33rem;
    }
    .actives:active {
      transform: translate(0.02rem, 0.02rem);
      background: rgba(0, 0, 0, 0.02);
    }
  }
  .address-detail:last-child {
    margin-top: 0.02rem;
  }
  .carType-data {
    .title {
      padding-top: 0;
      > div {
        padding-top: 0.4rem;
        padding-bottom: 0.36rem;
      }
      > div:last-child {
        flex: 1;
        text-align: right;
        color: #36a0e9;
      }
      > div:nth-child(2) {
        font-size: 0.2rem;
        color: #444444;
        letter-spacing: 0.04px;
        padding-left: 0.05rem;
      }
    }
    .card-car-content {
      display: flex;
      padding: 0 0.1rem;
    }

    .card-car-content > div {
      flex: 1;
      justify-content: center;
      padding: 0 .05rem;
      overflow: hidden;
      box-sizing: border-box;
    }

    .car-item:nth-child(1) {
      padding-left: 0;
    }

    .car-item:nth-child(3) {
      padding-right: 0;
    }
    .par-des {
      text-align: center;
      //   background: red;
    }
    .par-des > div {
      box-sizing: border-box;
      max-width: 2.2rem;
    }
    .car-item > div > div {
      border: 0.02rem solid #e1e1e1;
      border-radius: 0.12rem;
      padding: 0.15rem 0.1rem;
      padding-right: 0;
      padding-bottom: .3rem;
    }
    .car-item > div > div.checked {
      border: 0.04rem solid #40b1ff;
    }
    .car-item > div > div.checked .cardes {
      background: #40b1ff;
    }

    .des {
      font-size: 0.28rem;
      color: #555;
      letter-spacing: 0.06px;
      text-align: right;
      overflow: hidden;
      display: inline-block;
      position: relative;
    }
    .des > div {
      text-align: left;
    }
    .des > div:nth-child(1) {
      font-weight: 700;
    }

    .des > div:nth-child(2) {
      font-size: 0.24rem;
      color: #666;
      margin-top: 0.06rem;
    }
    .des .car-img {
      width: 2.3rem;
      height: 0.96rem;
      position: relative;
      top: 0.2rem;
      right: -0.4rem;
    }
    // .des .cardes {
    //   display: flex;
    //   align-items: center;
    //   position: absolute;
    //   bottom: 0;
    //   left: 0;
    //   font-size: 0.2rem;
    //   padding: 0.05rem 0.15rem;
    //   border-top-right-radius: 0.15rem;
    //   color: #ffffff;
    //   background: #d1d1d1;
    //   letter-spacing: 0.32px;
    // }
  }
}

.parent-sure-order {
  padding: 0 0.28rem;
  padding-bottom: 0.2rem;
}
.sure-order {
  margin: 0.28rem 0;
  margin-bottom: 0.1rem;
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
.service {
  padding: 0 0.54rem;
  .div-kefu {
    height: 0.1rem;
    border-top: 0.02rem solid #e1e1e1;

    padding: 0 0.8rem;
  }
  .option {
    margin-top: 0.3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    > div {
      flex: 1;
      font-size: 0.24rem;
      color: #666666;
      letter-spacing: 0.05px;
      text-align: center;
    }
    > div:active {
      background: rgba(0, 0, 0, 0.02);
    }
    .option-img {
      width: 0.6rem;
      height: 0.6rem;
      margin: 0 auto;
      margin-bottom: 0.1rem;
    }
  }
}
.kefu {
  position: relative;
  top: -0.15rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.24rem;
  color: #333333;
  background: #ffffff;
  letter-spacing: 0.05px;
  .safe-img {
    width: 0.28rem;
    height: 0.28rem;
    margin-right: 0.1rem;
  }
}
</style>
