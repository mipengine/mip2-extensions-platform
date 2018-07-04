<template>
  <div class="wrapper">
    <div id="l-map"/>
    <div
      class="search-content">
      <div class="head">
        <a
          :href="cityhref"
          data-type="mip" >
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
      class="search-result content">
      <ul>
        <li
          class="result-input-first"
          @click="inputGetFocus">
          <div>
            <span class="img address"/>
            <p v-text="moveOut.localtion.title"/>
            <p v-text="moveOut.localtion.address"/>
          </div>
          <input
            :readonly="true"
            type="text"
            class="fixsafari-click">
        </li>
        <li class="result-input">
          <div>
            <span class="img menpaihao"/>
            <input
              v-model="moveOut.address"
              type="text"
              placeholder="具体街道  门牌号">
          </div>
        </li>
        <li
          @
          class="result-input">
          <div>
            <span class="img lianxiren"/>
            <input
              v-model="moveOut.phone"
              type="number"
              placeholder="联系方式(必填)">

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
          @touchend="closeLayer">知道了</p>
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
import '../../common/utils/base.less'

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
      init: true, // 数据初始化话完成   只执行一次,
      interval: '', // 轮询查询全局数据是否合并完成
      searchVal: '',
      searchHandler: '',
      searchData: [],
      cityhref: '',
      focusState: false, // 获取焦点
      moveOut: {
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
    console.log('这里是搬出地址选择页面 !')
    window.addEventListener('hide-page', (e) => {
      this.interval && clearInterval(this.interval)
    })
    this.initData()
  },

  methods: {
    // 基本数据初始化
    initData () {
      if (!MIP.viewer.page.isRootPage) {
        console.log('不是手动刷新页面')

        if (MIP.sandbox.BMap && this.init) {
          this.chatGlobaldata()
        } else {
          console.log('初始化====不存在地图环境')
        }

        // 初始化
        this.$element.customElement.addEventAction('init', () => {
          console.log('地图回调加载当前页面的地图')
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
          console.log(Object.keys(this.globaldata).length)
          clearInterval(this.interval)
          this.BMap = MIP.sandbox.BMap
          console.log('=======')
          this.mapInit()
        }
      }, 300)
    },

    mapInit (city) {
      let BMap = this.BMap
      console.log(BMap)
      let citys = city || this.globaldata.ordercity
      console.log('查看当前城市' + citys)

      let BaiduMap = map.mapInit()

      let lxndata = base.getSession()
      let address = ''
      if (lxndata === null) {
        console.log('无缓存')
        console.log(JSON.stringify(this.globaldata, null, 2))
        address = this.globaldata.moveOutAddress
        console.log(JSON.stringify(address, null, 2))
      } else {
        console.log('有缓存')
        address = lxndata.moveOutAddress
        let moveout = this.moveOut
        moveout.localtion = address.localtion
        moveout.address = address.address
        moveout.phone = address.phone
      }
      let divs = this.$element.querySelector('#l-map')
      let maps = new BaiduMap(this.$element, divs, address, (data) => {
        // 还原上次填写的数据
        console.log(JSON.stringify(data, null, 2))
        let moveout = this.moveOut
        console.log(JSON.stringify(moveout, null, 2))
        console.log(JSON.stringify(data, null, 2))
        moveout.localtion = data.localtion
        moveout.address = data.address
        moveout.phone = data.phone
        this.loading = false
      })
      if (BMap.Map) {
        console.log(BMap)
        console.log('存在')
        this.searchHandler = maps.handleResult(BMap, citys, this.searchResult)
        this.maps = maps.map
      }
    },
    // 搜索地址
    searchAddress () {
      let value = this.searchVal
      this.searchHandler.search(value)
      if (value === '') {
        this.searchData = []
      }
    },
    // 搜索结果
    searchResult (item) {
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
      this.moveOut.localtion = item
      console.log(JSON.stringify(item, null, 2))
    },
    // 确认搬出信息
    moveoutSure () {
      let inputs = this.$element.querySelectorAll('input:focus')
      Array.prototype.slice.call(inputs).forEach(ele => {
        ele.blur()
      })
      console.log('查看点击')

      let BMap = this.BMap
      let warn = this.warn
      let moveOut = this.moveOut
      let title = moveOut.localtion.title
      let phone = moveOut.phone

      if (title === '') {
        warn.show = true
        warn.texts = '地址不能为空'
      } else if (phone === '') {
        warn.show = true
        warn.texts = '联系方式不能为空'
      } else if (!this.checkPhone(phone)) {
        warn.show = true
        warn.texts = '号码不符合规范'
      } else {
        console.log('可以提交')

        let moveInAddress = this.globaldata.moveInAddress
        let objdata = this.deepClone(this.moveOut)
        let obj = ''
        // 如果 搬入地址电话未填写 默认 填写 搬出地址的电话
        if (moveInAddress.phone === '') {
          moveInAddress.phone = objdata.phone
          obj = {
            moveOutAddress: objdata,
            moveInAddress: moveInAddress
          }
        } else {
          obj = { moveOutAddress: objdata }
        }
        let datas = base.mipExtendData(this.globaldata, obj)
        base.mipSetGlobalData(obj)
        base.setSession(datas)

        // 计算距离
        let movein = this.globaldata.moveInAddress.localtion
        let moveout = objdata.localtion
        console.log(JSON.stringify(moveout, null, 2))
        console.log(JSON.stringify(movein, null, 2))
        if (moveout.lat !== '' && movein.lat !== '') {
          let pointOut = new BMap.Point(moveout.lng, moveout.lat)
          let pointIn = new BMap.Point(movein.lng, movein.lat)
          let kilometer =
            this.maps.getDistance(pointOut, pointIn).toFixed(2) / 1000
          console.log('查看距离:' + kilometer)
          let obj = { kilometer: kilometer }
          let datass = base.mipExtendData(datas, obj)
          base.mipSetGlobalData(obj)
          base.setSession(datass)

          setTimeout(() => {
            this.goOrder()
          }, 100)
        } else {
          console.log('没计算距离')
          this.goOrder()
        }
      }
    },
    // 全局数据监听
    lxnDataWatch () {
      //   监控 城市 改变
      MIP.watch('lxndata.ordercity', (newval, oldval) => {
        console.log(
          '=====..............===搬出地址数据=============城市改变了'
        )
        console.log(newval)
        this.searchVal = ''
        this.moveOut = {
          localtion: {
            title: ''
          },
          address: '',
          phone: ''
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
    goOrder () {
      console.log('跳转====')
      setTimeout(() => {
        console.log('跳转====')
        MIP.viewer.page.router.back()
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

#l-map {
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
  position: absolute;
  left: 0.32rem;
  font-size: 0.3rem;
  color: #333333;
  letter-spacing: 0.07px;
  display: flex;
  width: 0.9rem;
  z-index: 99999;
  height: 100%;
  align-items: center;
}

.arrow-down {
  position: absolute;
  top: 50%;
  right: 0;
  width: 0;
  height: 0;
  border-left: 0.1rem solid transparent;
  border-right: 0.1rem solid transparent;
  border-top: 0.1rem solid #333333;
  transform: translateY(-50%);
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
  top: 50%;
  transform: translateY(-50%);
}
.s-input input {
  padding-left: 0.5rem;
  width: 100%;
  height: 100%;
  background: #eff9ff;
  border-radius: 1.2rem;
  font-size: 0.28rem;
  margin-top: -.01rem;
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
.content li.result-input{
    padding: 0;
}
.content li.result-input div{
    height: 100%;
}
.content li.result-input .img{
    top: 50% !important;
    transform: translateY(-50%);
}
.content li.result-input:last-child{
    border-bottom: none;
}

.result-input {
  height: 1rem;
}
.result-input-first {
  height: 1.1rem;
  overflow: hidden;
  position: relative;
}
.result-input-first p:last-child {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.result-input input {
  font-size: 0.28rem;
}

.btn-sure {
  margin-top: 0!important;
  top: 50%;
  transform: translateY(-50%);
  position: absolute;
  right: 0;
  background: #36a0e9;
  box-shadow: 0 1px 1px 0 #cccccc;
  border-radius: 0.04rem;
  width: 1.44rem;
  height: 0.62rem;
  font-size: 0.34rem !important;
  color: #ffffff !important;
  text-align: center;
  letter-spacing: 0.08px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.fixsafari-click{
   width: 100%;
   background: transparent;
   position: absolute;
   left: 0;
   right: 0;
   top: 0;
}
</style>
