<template>
  <div class="wrapper">
    <div id="l-map"/>
    <div class="content">
      <div class="msg">
        <span class="img address"/>
        <input
          v-model="searchVal"
          type="text"
          placeholder="请输入地址"
          @input ="searchAddress">
        <div
          class="city-div actives"
          @touchend="goCity()">
          <span
            class="city"
            v-text="globaldata.ordercity">北京</span>
          <span class="arrow"/>

        </div>
      </div>
      <div class="msg">
        <span class="img menpaihao"/>
        <input
          v-model="moveIn.address"
          type="text"
          placeholder="具体街道  门牌号">
      </div>
      <div class="msg">
        <span class="img lianxiren"/>
        <input
          v-model="moveIn.phone"
          type="number"
          placeholder="联系方式(选填)">
      </div>
      <div class="searh-result">
        <ul>
          <li
            v-for="item in searchData"
            :key="item.address+item.name"
            class="car-actives"
            @click="setAddress(item)">
            <div>
              <span class="img weizhi"/>
              <p v-text="item.name"/>
              <p v-text="item.address"/>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <p
      class="btn-sure btn"
      @click="moveoutSure">确定</p>
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
import map from '../../common/utils/map'
import '../../common/utils/base.less'

base.setHtmlRem()
export default {
  props: {
    globaldata: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data () {
    return {
      maps: '',
      init: true, // 数据初始化话完成   只执行一次
      interval: '', // 轮询查询全局数据是否合并完成
      searchVal: '',
      searchHandler: '',
      searchData: [],
      cityhref: '',
      focusState: false, // 获取焦点
      moveIn: {
        localtion: {
          address: '',
          city: '',
          province: '',
          lat: '',
          lng: '',
          title: ''
        },
        address: '',
        phone: ''
      },
      warn: {
        show: false,
        texts: ''
      },
      loading: true,
      BMap: null,
      debounceTimeout: '' // 延时定时器
    }
  },
  created () {
    this.cityhref = base.htmlhref.city
  },
  mounted () {
    console.log('这里是搬入地址选择页面 !')

    window.addEventListener('show-page', e => {
      console.log('版入地址页面显示')
      //   this.globaldata.ordercity = newval
      this.searchVal = ''
      this.searchData = []
      this.moveIn = {
        localtion: {
          address: '',
          city: '',
          province: '',
          lat: '',
          lng: '',
          title: ''
        },
        address: ''
      }

      setTimeout(() => {
        this.mapInit()
      }, 100)
    })
    window.addEventListener('hide-page', e => {
      this.interval && clearInterval(this.interval)
    })
    // 初始化
    this.initData()
  },
  methods: {
    // 基本数据初始化
    initData () {
      if (!MIP.viewer.page.isRootPage) {
        console.log('不是手动刷新页面')
        console.log('111111111111111111111111')

        if (MIP.sandbox.BMap && this.init) {
          this.chatGlobaldata()
        } else {
          console.log('初始化====不存在地图环境')
        }

        // 初始化
        this.$element.customElement.addEventAction('init', () => {
          if (this.init) {
            this.chatGlobaldata()
          }
        })

        // 数据监控
        this.lxnDataWatch()

        // 添加波纹
        this.clickRipple()
      } else {
        MIP.viewer.open(base.htmlhref.order, { isMipLink: false })
        console.log('是手动刷新,跳转回去')
      }
    },
    chatGlobaldata () {
      this.init = false
      this.interval = setInterval(() => {
        if (Object.keys(this.globaldata).length > 0) {
          clearInterval(this.interval)
          this.BMap = MIP.sandbox.BMap
          console.log('111111111111111111111111')
          this.mapInit()
        }
      }, 300)
    },
    // 地图初始化
    mapInit (city) {
      console.log('111111111111111111111111')
      let BMap = this.BMap
      let citys = city || this.globaldata.ordercity
      let lxndata = base.getSession()
      console.log('查看lxndata:' + JSON.stringify(lxndata, null, 2))

      let BaiduMap = map.mapInit()

      let address = ''
      console.log('查看lxndata:' + JSON.stringify(lxndata, null, 2))
      if (lxndata === null) {
        address = this.globaldata.moveInAddress
      } else {
        address = lxndata.moveInAddress
        // 还原上次填写的数据
        let movein = this.moveIn

        let moveOutAddress = lxndata.moveOutAddress
        let moveInAddress = address
        console.log(JSON.stringify(moveInAddress, null, 2))
        console.log(JSON.stringify(moveOutAddress, null, 2))
        if (moveInAddress.localtion.name !== '') {
          movein.localtion = moveInAddress.localtion
          movein.address = moveInAddress.address
          movein.phone = moveInAddress.phone
        } else {
          movein.localtion = moveInAddress.localtion
          movein.phone = moveOutAddress.phone
        }
      }

      let divs = this.$element.querySelector('#l-mapin')
      let maps = new BaiduMap(this.$element, divs, address, data => {
        // 还原上次填写的数据
        let movein = this.moveIn
        movein.localtion = data.localtion
        if (data.localtion.name) {
          this.searchVal = data.localtion.name
        }

        movein.address = data.address
        movein.phone = data.phone
        this.loading = false
      })

      if (BMap.Map) {
        this.searchHandler = maps.handleResult(BMap, citys, this.searchResult)
        this.maps = maps.map
      }
    },
    // 搜索地址
    searchAddress () {
      this.debounce()
    },
    // 搜索结果
    searchResult (item) {
      if (item) {
        this.searchData = item
      }
    },
    // 选择搜索结果
    setAddress (item) {
      // 清空搜索数据,在地址框填入数据
      let inputs = this.$element.querySelectorAll('input:focus')
      Array.prototype.slice.call(inputs).forEach(ele => {
        ele.blur()
      })
      this.searchVal = item.name
      this.searchData = []
      this.moveIn.localtion = item
    },
    // 确认搬出信息
    moveoutSure () {
      let that = this
      let inputs = this.$element.querySelectorAll('input:focus')
      Array.prototype.slice.call(inputs).forEach(ele => {
        ele.blur()
      })
      let BMap = this.BMap
      let warn = this.warn
      let moveIn = this.moveIn
      console.log(JSON.stringify(moveIn, null, 2))
      if (this.searchVal === '' || moveIn.localtion.lat === '') {
        warn.show = true
        warn.texts = '没有找到对应地址，请重新搜索'
      } else {
        console.log('可以提交')

        let objdata = JSON.parse(JSON.stringify(this.moveIn))
        console.log(JSON.stringify(objdata, null, 2))
        let obj = { moveInAddress: objdata }
        let datas = base.mipExtendData(this.globaldata, obj)
        console.log('配置搬入数据' + JSON.stringify(datas, null, 2))
        base.mipSetGlobalData(obj)
        base.setSession(datas)

        // 计算距离
        let moveout = {
          'lat': '',
          'lng': ''
        }
        let movein = {
          'lat': '',
          'lng': ''
        }
        if (this.globaldata.moveOutAddress.localtion.location) {
          moveout = this.globaldata.moveOutAddress.localtion.location
        }

        if (objdata.localtion.location) {
          movein = objdata.localtion.location
        }

        if (moveout.lat !== '' && movein.lat !== '') {
          let pointOut = new BMap.Point(moveout.lng, moveout.lat)
          let pointIn = new BMap.Point(movein.lng, movein.lat)
          let kilometer = ''
          let city = this.globaldata.ordercity
          let transit = new BMap.DrivingRoute(city, {
            onSearchComplete: function (drivingRouteResult) {
              let numPlans = drivingRouteResult.getNumPlans()
              if (numPlans) {
                let firstPlanDistanceM = drivingRouteResult
                  .getPlan(0)
                  .getDistance(false)
                kilometer = Math.max(1, Math.ceil(firstPlanDistanceM / 1000))

                console.log('查看距离:' + kilometer)
                let obj = { kilometer: kilometer }

                console.log(JSON.stringify(obj, null, 2))
                let datass = base.mipExtendData(datas, obj)
                console.log(JSON.stringify(datass))
                base.mipSetGlobalData(obj)
                base.setSession(datass)
                setTimeout(() => {
                  that.goOrder()
                }, 100)
              }
            }
          })
          transit.search(pointOut, pointIn)
        } else {
          console.log('没计算距离')
          this.goOrder()
        }
      }
    },

    // 全局数据监听
    lxnDataWatch () {
      MIP.watch('lxndata.ordercity', (newval, oldval) => {
        console.log('=====..............===wacth监控=============城市改变了')
        console.log(newval)
        this.searchVal = ''
        this.searchData = []
        this.moveIn = {
          localtion: {
            address: '',
            city: '',
            province: '',
            lat: '',
            lng: '',
            title: ''
          },
          address: ''
        }

        this.globaldata.ordercity = newval

        setTimeout(() => {
          this.mapInit(newval)
        }, 100)

        console.log(newval)
      })
    },
    inputGetFocus () {
      this.focusState = true
    },

    // 跳转到城市选择页面
    goCity () {
      let inputs = this.$element.querySelectorAll('input:focus')
      Array.prototype.slice.call(inputs).forEach(ele => {
        ele.blur()
      })
      MIP.viewer.open(base.htmlhref.city, { isMipLink: true })
    },
    goOrder () {
      setTimeout(() => {
        MIP.viewer.page.back()
      }, 100)
    },
    closeLayer () {
      this.warn.show = false
    },
    // 校验电话号码
    checkPhone (phone) {
      if (!/^1(3|4|5|7|8)\d{9}$/.test(phone)) {
        return false
      }
      return true
    },

    // 点击波纹效果
    clickRipple () {
      let util = MIP.util
      util.event.delegate(this.$element, '.btn', 'click', function (e) {
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
      })
    },
    // 延时搜索
    debounce () {
      if (this.debounceTimeout) {
        clearTimeout(this.debounceTimeout)
      }
      this.debounceTimeout = setTimeout(() => {
        let value = this.searchVal
        if (value === '') {
          this.searchData = []
        } else {
        //   this.searchHandler.search(value)
          this.baiduWebApiSearch(value)
        }
      }, 200)
    },
    // 线上搜索城市
    baiduWebApiSearch: function (value) {
      let data = {
        region: this.globaldata.ordercity,
        query: value,
        output: 'json',
        page_size: 20,
        ak: 'yqnitg5uvNmj1DkrhStCdM98hFYYbUVc'

      }
      let urls =
      'https://api.map.baidu.com/place/v2/search?' + base.setUrlParam(data)
      window.fetchJsonp(urls)
        .then(response => response.json())
        .catch(error => console.log(error))
        .then(response => {
          console.log('查看数据:' + JSON.stringify(response, null, 2))
          let data = response
          let searchData = []
          if (data.hasOwnProperty('status') && +data.status === 0) {
            if (data.results) {
              let results = data.results
              console.log(JSON.stringify(results, null, 2))
              for (let i in results) {
                if (results[i].hasOwnProperty('detail')) {
                  searchData.push(results[i])
                }
              }
            }
          }
          console.log(JSON.stringify(searchData, null, 2))
          this.searchResult(searchData)
        })
    }
  }
}
</script>

<style scoped lang="less">
#l-map {
  height: 1px;
  position: absolute;
  display: none;
}
.wrapper {
  padding: 0.42rem 0.2rem;
  .content {
    background: #ffffff;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
    border-radius: 4px 4px 0 0;
    padding: 0 0.4rem;
    position: relative;
    div.msg {
      height: 1rem;
      border-bottom: 1px solid #f1f1f1;
      position: relative;
      input {
        // height: 1rem;
        height: 100%;
        font-size: 0.28rem;
        color: #666666;
        padding-left: 0.6rem;
        line-height: 120%;
      }
      .img {
        position: absolute;
        top: 50% !important;
        transform: translateY(-50%);
      }
      div.city-div {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 0;
        width: 1.46rem;
        text-align: center;
        color: #666666;
        height: 100%;
        line-height: 1rem;
      }
      div.city-div::before {
        content: "";
        display: inline-block;
        position: absolute;
        border-radius: 5px;
        width: 0.02rem;
        height: 0.4rem;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        background: #ecebeb;
      }
      div.city-div a {
        display: inline-block;
        height: 100%;
      }
      .city {
        color: #333333;
      }
      .arrow {
        position: relative;
        display: inline-block;
        width: 0.15rem;
        height: 0.15rem;
        border: 0.02rem solid #666666;
        border-right: none;
        border-bottom: none;
        transform: rotate(135deg);
      }
    }
    div.msg:first-child input {
      padding-right: 1.46rem;
    }
    div.msg:last-child {
      border: none;
    }
  }
  .btn-sure {
    margin-top: 0.4rem;
    background: #36a0e9;
    box-shadow: 0 1px 1px 0 #cccccc;
    border-radius: 0.04rem;
    height: 0.76rem;
    font-size: 0.34rem;
    color: #ffffff;
    text-align: center;
    letter-spacing: 0.08px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.searh-result {
  position: absolute;
  z-index: 10;
  left: 0;
  right: 0;
  top: 1rem;
  background: #ffffff;
  padding-left: 0.4rem;
  padding-right: 0.4rem;
  // max-height: 7rem;
  max-height: 260%;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  // background: red;
}
.searh-result li {
  padding: 0.2rem 0;
  border-bottom: 1px solid #f1f1f1;
  display: flex;
}
.searh-result li div {
  width: 100%;
  position: relative;
  padding-left: 0.6255rem;
}
.searh-result li div p:first-child {
  font-size: 0.28rem;
  color: #333333;
}
.searh-result li div p:last-child {
  margin-top: 0.05rem;
  font-size: 0.24rem;
  color: #999999;
}
.searh-result li div .img {
  position: absolute;
  left: 0;
  top: 0.23rem;
}
.searh-result li:last-child {
  border-bottom: none;
}
</style>
