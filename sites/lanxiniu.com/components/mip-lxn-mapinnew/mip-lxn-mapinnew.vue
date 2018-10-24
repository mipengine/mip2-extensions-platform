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
      </div>
      <div class="msg">
        <span class="img menpaihao"/>
        <input
          v-model="moveIn.address"
          type="text"
          placeholder="具体街道  门牌号">
      </div>
      <div
        class="msg actives inputfix"
        @click="picker">
        <span class="floor"/>
        <input
          v-model="moveInFloor"
          type="text"
          placeholder="请选择楼层(必填)"
        >
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

    <mip-fixed
      v-show="warn.show"
      class="layerfixed">
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
    </mip-fixed>

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
    }
  },
  data () {
    return {
      init: true, // 数据初始化话完成   只执行一次
      interval: '', // 轮询查询全局数据是否合并完成
      searchVal: '',
      searchHandler: '',
      searchData: [],
      focusState: false, // 获取焦点
      moveIn: {
        localtion: {
          name: ''
        },
        address: '',
        floor: ''
      },
      moveInFloor: '',
      warn: {
        show: false,
        texts: ''
      },
      loading: true,
      maps: '',
      BMap: null,
      debounceTimeout: '' // 延时定时器
    }
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
          name: ''
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
    mapInit () {
      let BMap = this.BMap
      let lxndata = base.getSession()
      if (lxndata !== null) {
        let address = lxndata.moveInAddress
        if (address.localtion.name !== '') {
          this.moveIn = address
          this.searchVal = address.localtion.name
        }
        if (address.floor !== '') {
          this.moveInFloor = lxndata.currentCarItem.stairsFee[address.floor].name
        }
      }
      let divs = this.$element.querySelector('#l-map')
      if (BMap.Map) {
        this.maps = new BMap.Map(divs)
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
      this.inputBlur()
      this.searchData = []
      this.searchVal = item.name
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
      if (this.searchVal === '' || moveIn.localtion.name === '') {
        warn.show = true
        warn.texts = '没有找到对应地址，请重新搜索'
      } else if (this.moveInFloor === '') {
        warn.show = true
        warn.texts = '楼层不能为空'
      } else {
        console.log('可以提交')

        let obj = {
          moveInAddress: this.moveIn
        }
        this.setGlobalData(obj)

        // 计算距离
        let moveout = {
          'lat': '',
          'lng': ''
        }
        let movein = {
          'lat': '',
          'lng': ''
        }
        let lxnData = base.getSession()
        if (lxnData && lxnData.moveOutAddress.localtion.location) {
          moveout = lxnData.moveOutAddress.localtion.location
        }

        if (this.moveIn.localtion.location) {
          movein = this.moveIn.localtion.location
        }
        console.log(JSON.stringify(moveout, null, 2))
        console.log(JSON.stringify(movein, null, 2))
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
                that.setGlobalData(obj)
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

    goOrder () {
      setTimeout(() => {
        MIP.viewer.page.back()
      }, 100)
    },

    // 跳转到城市选择页面
    goCity () {
      this.inputBlur()
      MIP.viewer.open(base.htmlhref.city, { isMipLink: true })
    },

    closeLayer () {
      this.warn.show = false
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
          this.moveIn = {
            localtion: {
              name: ''
            },
            address: ''
          }
        } else {
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
                  if (results[i].hasOwnProperty('address')) {
                    searchData.push(results[i])
                  }
                }
              }
            }
          }
          console.log(JSON.stringify(searchData, null, 2))
          this.searchResult(searchData)
        })
    },
    setGlobalData (obj) {
      let data = base.mipExtendData(this.globaldata, obj)
      base.mipSetGlobalData(obj)
      base.setSession(data)
    },
    // 输入框 失去焦点
    inputBlur () {
      let inputs = this.$element.querySelectorAll('input:focus')
      Array.prototype.slice.call(inputs).forEach(ele => {
        ele.blur()
      })
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
      console.log('============')
      let that = this
      let Picker = picker.Picker()
      let lxnData = base.getSession()
      let params = {
        title: '',
        pickerType: 'city',
        type: 1,
        keys: {
          id: 'id',
          value: 'name'
        },
        data: lxnData.currentCarItem.stairsFee,
        successCallback: function (val) {
          console.log(JSON.stringify(val, null, 2))
          let value = val.value
          console.log('查看数值:' + value)
          that.moveInFloor = value
          that.moveIn.floor = +val.code

          that.setGlobalData(lxnData)

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
    height: 10rem;
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
//   max-height: 260%;
 max-height: 500%;
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

.floor{
    position: absolute;
    top: 50% !important;
    transform: translateY(-50%);
    display: inline-block;
    height: 0.44rem;
    width: 0.44rem;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAMAAAApWqozAAAAk1BMVEUAAABZs/82oek7p+42oeo2oeo3oeo3ouw7pu42oOo2oepApfI2oeo2oek3oes4o+s2oeo3oeo3oeo3oes3o+s2oOo4ouw4oeo3ouxFs/82oOo3oeo2oek3oOo2oek3oOo2oeo3ouo3oeo3oeo3ouo3o+k5ous4pew6oOpEqu42oOo2oeo3oeo6pOs7oO03oek2oOk9AHN+AAAAMHRSTlMABPce+8SPRRjZmBP07Ig54tCCYku+W1dOCfHb1M3IuKeik3luUj8oJA/nrJ0yK2q+1yXXAAABPUlEQVQ4y+3UyXKCQBAGYJEd2QREUAQUDBqXzPs/XXqgqwzVM8ohF6v8LyJ8SNNOz+yT98giskPDmkQt32WQ+UF9TY05w8yd51x1BorRricpPV01VA++F/Nu31PC647alknTEuzJsUewI8cOwUpqi6mdKgQDXxeUFmukNMflmC6PYhfUhwA+st2D7jI4cXcEf2QIV1cmHCTlQMsEvtwu/PcJ3vZC58LU4YDf91UxnpDgu47P5mWqKn8Envk2ZzQmXixShbcG3zX8yUeK8G0c29jkWNi5c2rmUOVq1DlospJk1OtQXDPiZQbVxPDitXghec0ZOl4xbGPehuKFFA8zsokWwA0jgMIaXImRfPpc3+pH3N8MtAokw+oyHGwV72SX26ttgGkaTmD3fIMBPnEr+FOsa1hTty8bmvLJP+YXEKtRLNPEed8AAAAASUVORK5CYII=);
    background-size:.44rem .44rem;
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
</style>
