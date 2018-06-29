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
// import axios from "axios"
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
      require: true
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
      loading: true
    }
  },
  watch: {},
  beforeCreate () {
    console.log('before')
  },
  created () {
    this.cityhref = base.htmlhref.city
    console.log('创建数据')
  },
  mounted () {
    console.log('这里是搬入地址选择页面 !')

    // 初始化
    this.initData()

    // 数据监控
    this.lxnDataWatch()
  },
  methods: {
    // 基本数据初始化
    initData () {
      if (!this.globaldata) {
        console.log('无值')
        MIP.viewer.open(base.htmlhref.order, { isMipLink: false })
      } else {
        console.log('有值')

        var that = this

        // 配置全局数据标志当前是  搬出地址选择页面
        var obj = { currentmap: 'in' }
        base.mipSetGlobalData(obj)

        // 地图
        this.mapInit()

        // 添加波纹
        this.clickRipple()
      }
    },
    // 地图初始化
    mapInit (city) {
      var that = this
      var city = city || this.globaldata.ordercity
      var BaiduMap = map.mapInit()
      var cfg = {
        ak: '1c738e7908b5e8ec79742527c9796514',
        location: {
          city: city
        }
      }
      var lxndata = base.getSession()
      var address = ''
      if (lxndata === null) {
        address = this.globaldata.moveInAddress
      } else {
        address = lxndata.moveInAddress
        // 还原上次填写的数据
        var movein = that.moveIn

        var moveOutAddress = lxndata.moveOutAddress
        var moveInAddress = address
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

      var divs = this.$element.querySelector('#l-mapin')
      var maps = new BaiduMap(this.$element, cfg, divs, address, function (
        data
      ) {
        console.log(JSON.stringify(data, null, 2))
        // 还原上次填写的数据
        var movein = that.moveIn
        movein.localtion = data.localtion
        movein.address = data.address
        movein.phone = data.phone
        that.loading = false
      })

      maps.show()
      var intval = setInterval(function () {
        if (BMap.Map) {
          console.log('存在')
          that.searchHandler = maps.handleResult(city, that.searchResult)
          that.maps = maps.map
          clearInterval(intval)
        }
      }, 300)
    },
    // 搜索地址
    searchAddress () {
      var value = this.searchVal
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
      var that = this
      this.focusState = false
      // 将选择的地址在地图上标志出来
      var longitudeP = item.lng
      var latitudeP = item.lat
      var point = new BMap.Point(longitudeP, latitudeP) // 创建点坐标
      var myIcon = new BMap.Icon(
        'https://www.lanxiniu.com/Public/baidumip/mapicon.png',
        new BMap.Size(26, 32)
      )
      var marker2 = new BMap.Marker(point, { icon: myIcon }) // 创建标注
      this.maps.clearOverlays()
      this.maps.addOverlay(marker2)
      this.maps.centerAndZoom(point, 16)

      // 清空搜索数据,在地址框填入数据
      this.searchData = []
      this.moveIn.localtion = item
    },
    // 确认搬出信息
    moveoutSure () {
      var that = this
      var warn = this.warn
      var moveIn = this.moveIn
      var title = moveIn.localtion.title
      var address = moveIn.address
      var phone = moveIn.phone

      if (title === '') {
        warn.show = true
        warn.texts = '地址不能为空'
      } else {
        console.log('可以提交')

        var objdata = this.deepClone(this.moveIn)
        console.log(JSON.stringify(objdata, null, 2))
        var obj = { moveInAddress: objdata }
        // var datas = MIP.util.fn.extend({}, this.globaldata, obj);
        var datas = base.mipExtendData(this.globaldata, obj)
        console.log('配置搬入数据' + JSON.stringify(datas, null, 2))
        base.mipSetGlobalData(obj)
        base.setSession(datas)

        // 计算距离
        var moveout = this.globaldata.moveOutAddress.localtion
        var movein = objdata.localtion

        //   console.log(JSON.stringify(movein, null, 2));

        if (moveout.lat !== '' && movein.lat !== '') {
          var pointOut = new BMap.Point(moveout.lng, moveout.lat)
          var pointIn = new BMap.Point(movein.lng, movein.lat)
          var kilometer =
            this.maps.getDistance(pointOut, pointIn).toFixed(2) / 1000
          console.log('查看距离:' + kilometer)
          var obj = { kilometer: kilometer }

          console.log(JSON.stringify(obj, null, 2))
          console.log('保存数据-----')
          var datas = base.mipExtendData(datas, obj)
          console.log('查看数据:')
          console.log(JSON.stringify(datas))
          base.mipSetGlobalData(obj)
          base.setSession(datas)
          setTimeout(function () {
            that.goOrder()
          }, 500)
          //   }, 500);
        } else {
          console.log('没计算距离')
          this.goOrder()
        }
      }
    },

    // 全局数据监听
    lxnDataWatch () {
      var that = this
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
          var result = new Array(obj.length)
          for (var i = 0; i < result.length; ++i) {
            result[i] = this.deepClone(obj[i])
          }
          return result
        }

        case '[object Error]': {
          var result = new obj.constructor(obj.message)
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
          var keys = Object.keys(obj)
          var result = {}
          for (var i = 0; i < keys.length; ++i) {
            var key = keys[i]
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
      var util = MIP.util
      var undelegate = util.event.delegate(
        this.$element,
        '.btn',
        'click',
        function (e) {
          var target = e.target
          console.log(target)
          if (target.className.indexOf('btn') > -1) {
            var rect = target.getBoundingClientRect()
            var ripple = target.querySelector('.ripple')
            if (!ripple) {
              ripple = document.createElement('span')
              ripple.className = 'ripple'
              ripple.style.height = ripple.style.width =
                Math.max(rect.width, rect.height) + 'px'
              target.appendChild(ripple)
            }
            ripple.classList.remove('show')
            var top =
              e.pageY -
              rect.top -
              ripple.offsetHeight / 2 -
              document.body.scrollTop
            var left =
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
  top: 0;
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
