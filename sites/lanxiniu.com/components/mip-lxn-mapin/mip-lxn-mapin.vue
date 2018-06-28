<template>
  <div class="wrapper">
    <div id="l-mapin"/>
    <div
      v-show="init"
      class="search-content">
      <div class="head">
        <a
          :href="cityhref"
          data-type="mip">
          <div class="currentcity">
            <span v-text="globaldata.ordercity"/>
            <span class="arrow-down"/>
          </div>
        </a>

        <div class="s-input">
          <span class="img search search-icon"/>
          <input
            v-focus="focusState"
            v-model="searchVal"
            type="text"
            placeholder="请输入地址"
            @input ="searchAddress"
            @blur="focusState = false">
        </div>
      </div>
      <div class="content">
        <ul>
          <li
            v-for="item in searchData"
            :key="item.title"
            @click="setAddress(item)">
            <div>
              <span class="img weizhi"/>
              <p v-text="item.title"/>
              <p v-text="item.address"/>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div
      v-show="init"
      class="search-result content">
      <ul>
        <li
          class="result-input-first"
          @click="inputGetFocus">
          <div>
            <span class="img address"/>
            <p v-text="moveIn.localtion.title"/>
            <p v-text="moveIn.localtion.address"/>
          </div>
        </li>
        <li class="result-input">
          <div>
            <span class="img menpaihao"/>
            <input
              v-model="moveIn.address"
              type="text"
              placeholder="具体街道  门牌号">
          </div>
        </li>
        <li class="result-input">
          <div>
            <span class="img lianxiren"/>
            <input
              v-model="moveIn.phone"
              type="number"
              placeholder="联系方式(选填)">
            <p
              class="btn-sure btn"
              @click="moveoutSure">确定</p>
          </div>
        </li>

      </ul>
    </div>
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

    <div
      v-if="loading"
      class="mip-loading-box">

      <div class="point-span">
        <span class="point-first"/><span class="point-second"/><span class="point-last"/>
      </div>
    </div>
  </div>
</template>

<script>
import base from '../../common/utils/base'
import map from '../../common/utils/map'
import '../../common/utils/base.css'
base.setHtmlRem()
export default {
  directives: {
    focus: {
      update: function (el, { value }) {
        if (value) {
          el.focus()
        }
      }
    }
  },
  props: {
    globaldata: {
      type: Object,
      default: function () { return {} }
    }
  },
  data () {
    return {
      maps: '',
      init: true, // 加载完成后 显示
      searchVal: '',
      searchHandler: '',
      searchData: [],
      cityhref: '',
      focusState: false, // 获取焦点
      moveIn: {
        localtion: {
          title: '定位中...',
          address: '请等待'
        },
        address: '',
        phone: ''
      },
      warn: {
        show: false,
        texts: ''
      },
      loading: true,
      BMap: null

    }
  },
  created () {
    this.cityhref = base.htmlhref.city
  },
  mounted () {
    // 初始化
    this.initData()

    // 数据监控
    this.lxnDataWatch()

    this.$element.customElement.addEventAction('init', () => {
      this.BMap = MIP.sandbox.BMap
      this.mapInit()
      console.log(this.BMap)
    })
  },
  methods: {
    // 基本数据初始化
    initData () {
      if (Object.keys(this.globaldata).length === 0) {
        console.log('无值')
        MIP.viewer.open(base.htmlhref.order, { isMipLink: false })
      } else {
        console.log('有值')

        // 配置全局数据标志当前是  搬出地址选择页面
        let obj = { currentmap: 'in' }
        base.mipSetGlobalData(obj)

        // 添加波纹
        this.clickRipple()
      }
    },
    // 地图初始化
    mapInit (city) {
      let BMap = this.BMap
      let that = this
      let citys = city || this.globaldata.ordercity
      let BaiduMap = map.mapInit()

      let lxndata = base.getSession()
      let address = ''
      if (lxndata === null) {
        address = this.globaldata.moveInAddress
      } else {
        address = lxndata.moveInAddress
        // 还原上次填写的数据
        let movein = that.moveIn

        let moveOutAddress = lxndata.moveOutAddress
        let moveInAddress = address
        console.log(JSON.stringify(moveInAddress, null, 2))
        console.log(JSON.stringify(moveOutAddress, null, 2))
        if (moveInAddress.localtion.title !== '') {
          movein.localtion = moveInAddress.localtion
          movein.address = moveInAddress.address
          movein.phone = moveInAddress.phone
        } else {
          movein.phone = moveOutAddress.phone
        }
      }

      let divs = this.$element.querySelector('#l-mapin')
      let maps = new BaiduMap(this.$element, divs, address, function (
        data
      ) {
        console.log(JSON.stringify(data, null, 2))
        // 还原上次填写的数据
        let movein = that.moveIn
        movein.localtion = data.localtion
        movein.address = data.address
        movein.phone = data.phone
        that.loading = false
      })

      if (BMap.Map) {
        console.log('存在')
        this.searchHandler = maps.handleResult(citys, that.searchResult)
        this.maps = maps.map
      }
    },
    // 搜索地址
    searchAddress () {
      let value = this.searchVal
      this.searchHandler.search(value)
      console.log(value)
      if (value === '') {
        this.searchData = []
      }
    },
    // 搜索结果
    searchResult (item) {
      console.log(this.search)
      console.log(item)
      this.searchData = item.data
    },
    // 选择搜索结果
    setAddress (item) {
      let BMap = this.BMap
      this.focusState = false
      // 将选择的地址在地图上标志出来
      let longitudeP = item.lng
      let latitudeP = item.lat
      let point = new BMap.Point(longitudeP, latitudeP) // 创建点坐标
      let myIcon = new BMap.Icon(
        'https://www.lanxiniu.com/Public/baidumip/mapicon.png',
        new BMap.Size(26, 32)
      )
      let marker2 = new BMap.Marker(point, { icon: myIcon }) // 创建标注
      this.maps.clearOverlays()
      this.maps.addOverlay(marker2)
      this.maps.centerAndZoom(point, 16)

      // 清空搜索数据,在地址框填入数据
      this.searchData = []
      this.moveIn.localtion = item
    },
    // 确认搬出信息
    moveoutSure () {
      let that = this
      let BMap = this.BMap
      let warn = this.warn
      let moveIn = this.moveIn
      let title = moveIn.localtion.title

      if (title === '') {
        warn.show = true
        warn.texts = '地址不能为空'
      } else {
        console.log('可以提交')

        let objdata = this.deepClone(this.moveIn)
        console.log(JSON.stringify(objdata, null, 2))
        let obj = { moveInAddress: objdata }
        let datas = base.mipExtendData(this.globaldata, obj)
        console.log('配置搬入数据' + JSON.stringify(datas, null, 2))
        base.mipSetGlobalData(obj)
        base.setSession(datas)

        // 计算距离
        let moveout = this.globaldata.moveOutAddress.localtion
        let movein = objdata.localtion

        if (moveout.lat !== '' && movein.lat !== '') {
          let pointOut = new BMap.Point(moveout.lng, moveout.lat)
          let pointIn = new BMap.Point(movein.lng, movein.lat)
          let kilometer =
            this.maps.getDistance(pointOut, pointIn).toFixed(2) / 1000
          console.log('查看距离:' + kilometer)
          let obj = { kilometer: kilometer }

          console.log(JSON.stringify(obj, null, 2))
          console.log('保存数据-----')
          let datass = base.mipExtendData(datas, obj)
          console.log('查看数据:')
          console.log(JSON.stringify(datass))
          base.mipSetGlobalData(obj)
          base.setSession(datass)
          setTimeout(function () {
            that.goOrder()
          }, 500)
        } else {
          console.log('没计算距离')
          this.goOrder()
        }
      }
    },

    // 全局数据监听
    lxnDataWatch () {
      let that = this
      MIP.watch('lxndata.ordercity', function (newval, oldval) {
        console.log('=====..............===wacth监控=============城市改变了')
        console.log(newval)
        that.searchVal = ''
        that.moveOut = {
          localtion: {
            title: ''
          },
          address: '',
          phone: ''
        }

        that.globaldata.ordercity = newval

        setTimeout(function () {
          that.mapInit(newval)
        }, 100)

        console.log(newval)
      })

      MIP.watch('lxndata', function () {
        console.log('MIP=============wacth监控=============城市改变了')
      })
    },
    inputGetFocus () {
      this.focusState = true
    },
    goOrder () {
      MIP.viewer.page.router.back()
      //   MIP.viewer.page.router.push(base.htmlhref.order);
      //   MIP.viewer.open(base.htmlhref.order, { isMipLink: true });
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
    deepClone (obj) {
      if (obj == null || typeof obj !== 'object') {
        return obj
      }
      switch (Object.prototype.toString.call(obj)) {
        case '[object Array]': {
          let result = new Array(obj.length)
          for (let i = 0; i < result.length; ++i) {
            result[i] = this.deepClone(obj[i])
          }
          return result
        }

        case '[object Error]': {
          let result = new obj.constructor(obj.message)
          result.stack = obj.stack // hack...
          return result
        }

        case '[object Date]':
        case '[object RegExp]':
        case '[object Int8Array]':
        case '[object Uint8Array]':
        case '[object Uint8ClampedArray]':
        case '[object Int16Array]':
        case '[object Uint16Array]':
        case '[object Int32Array]':
        case '[object Uint32Array]':
        case '[object Float32Array]':
        case '[object Float64Array]':
        case '[object Map]':
        case '[object Set]':
          return new obj.constructor(obj)

        case '[object Object]': {
          let keys = Object.keys(obj)
          let result = {}
          for (let i = 0; i < keys.length; ++i) {
            let key = keys[i]
            result[key] = this.deepClone(obj[key])
          }
          return result
        }

        default: {
          throw new Error("Unable to copy obj! Its type isn't supported.")
        }
      }
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
          console.log(target)
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
    }
  }
}
</script>

<style scoped>
#l-mapin {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(243, 241, 236, 1);
}

.search-content {
  position: absolute;
  top: 44px;
  left: 0;
  right: 0;
  /* background: red; */
  z-index: 99999;
  /* margin-top: 45px; */
  /* padding: 0.2rem; */
}
.head {
  display: flex;
  align-items: center;
  position: relative;
  height: 0.88rem;
  background: #ffffff;
  border-radius: 0.04rem;
  position: relative;
}
.head a {
  display: inline-block;
  position: absolute;
  left: 0.32rem;
  font-size: 0.3rem;
  color: #333333;
  letter-spacing: 0.07px;
  display: flex;
  width: 0.9rem;
  z-index: 99999;
}
.currentcity {
}

.arrow-down {
  position: absolute;
  top: 0.19rem;
  right: 0;
  width: 0;
  height: 0;
  border-left: 0.1rem solid transparent;
  border-right: 0.1rem solid transparent;
  border-top: 0.1rem solid #333333;
}

.s-input {
  padding: 0.14rem;
  padding-top: 0.15rem;
  padding-left: 1.5rem;
  padding-right: 0.3rem;
  width: 100%;
  height: 100%;
  position: relative;
  line-height: 1;
}
.search-icon {
  position: absolute;
  left: 1.64rem;
  top: 0.29rem;
}
.s-input input {
  padding-left: 0.46rem;
  width: 100%;
  height: 100%;
  background: #eff9ff;
  border-radius: 1.2rem;
  font-size: 0.28rem;
  line-height: 1;
}
.content {
  background: #ffffff;
  padding-left: 0.4rem;
  padding-right: 0.4rem;
  max-height: 5.3rem;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
.content li {
  padding: 0.2rem 0;
  border-bottom: 1px solid #f1f1f1;
  display: flex;
}
.content li div {
  width: 100%;
  position: relative;
  padding-left: 0.6255rem;
}
.content li div p:first-child {
  font-size: 0.28rem;
  color: #333333;
}
.content li div p:last-child {
  margin-top: 0.05rem;
  font-size: 0.24rem;
  color: #999999;
}
.content li div .img {
  position: absolute;
  left: 0;
  top: 0.23rem;
}
/* 搜索结果*/
.search-result {
  background: #ffffff;
  position: absolute;
  bottom: 0;
  left: 0.2rem;
  right: 0.2rem;
  max-height: unset;
  overflow: unset;
}
.result-input {
  height: 1rem;
}
.result-input-first {
  height: 1.1rem;
  overflow: hidden;
}
.result-input-first p:last-child {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.result-input input {
  font-size: 0.28rem;
}
.result-input .img {
  top: 0.05rem !important;
}
.btn-sure {
  position: absolute;
  right: 0;
  bottom: 0;
  background: #36a0e9;
  box-shadow: 0 1px 1px 0 #cccccc;
  border-radius: 0.04rem;
  width: 1.44rem;
  height: 0.62rem;
  font-size: 0.34rem !important;
  color: #ffffff !important;
  text-align: center;
  /* line-height: 0.62rem; */
  letter-spacing: 0.08px;
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>
