import './mip-map-ext.less'

const { CustomElement, util, viewer } = MIP
const log = util.log('mip-map-ext')

/**
 * 工具方法 拼接键值对
 *
 * @param {Object} obj 需要处理的对象
 * @returns {string} 拼接字符串
 */
function traverseAndConcat (obj) {
  return Object.keys(obj).reduce((total, key) => total + obj[key], '')
}

/**
 * 工具方法 转驼峰式字符串为短横线分隔式字符串
 *
 * @param {string} str 驼峰式字符串
 * @returns {string} 短横线分隔式字符串
 */
function hyphenate (str) {
  return str.replace(/[A-Z]/g, s => ('-' + s.toLowerCase())).replace(/^-/, '')
}

export default class MIPMapExt extends CustomElement {
  constructor (...args) {
    super(...args)

    this.map = null
    this.point = {}
    this.marker = null
    this.currentMarker = null
  }

  connectedCallback () {
    let el = this.element
    let config = {}

    try {
      config = util.jsonParse(el.querySelector('script[type="application/json"]').textContent)
    } catch (e) {
      log.warn(e)
    }
    this.config = config

    this.ak = el.getAttribute('ak') || config.ak || ''
    this.location = this.getObjAttribute('location')
    this.controls = this.getObjAttribute('controls')
    this.info = this.getObjAttribute('info')
    this.hideMap = this.getBoolAttribute('hideMap')
    this.getPosition = this.getBoolAttribute('getPosition')
    this.dataOnlyGetSdk = this.getBoolAttribute('dataOnlyGetSdk')
  }

  /**
   * 获取类型为对象的属性值
   *
   * @param {string} str 属性名
   * @returns {Object} 属性值
   */
  getObjAttribute (str) {
    let el = this.element
    let obj = null
    if (el.hasAttribute(str)) {
      try {
        obj = util.jsonParse(el.getAttribute(str))
      } catch (e) {
        log.warn(e)
      }
    } else {
      obj = this.config[str]
    }
    return obj
  }

  /**
   * 获取类型为布尔的属性值
   *
   * @param {string} camelCase 驼峰式属性名
   * @returns {boolean} 属性值
   */
  getBoolAttribute (camelCase) {
    let el = this.element
    let kebabCase = hyphenate(camelCase)
    if (el.hasAttribute(kebabCase)) {
      return el.getAttribute(kebabCase) !== 'false'
    }
    if (el.hasAttribute(camelCase)) {
      log.warn(`标签属性应使用短横线分隔式：${kebabCase}`)
      return el.getAttribute(camelCase) !== 'false'
    }
    if (this.config.hasOwnProperty(camelCase)) {
      return this.config[camelCase] !== false
    }
    if (this.config.hasOwnProperty(kebabCase)) {
      log.warn(`在 <script type="json/application"></script> 中参数应使用驼峰式：${camelCase}`)
      return this.config[kebabCase] !== false
    }
    return false
  }

  /**
   * 仅加载sdk
   *
   */
  loadSdk () {
    // let BMap = window.BMap

    // 派发事件
    viewer.eventAction.execute('loaded', this.element, {})
  }

  /**
   * 自动定位
   *
   */
  getCurrentLocation () {
    let BMap = window.BMap
    let geolocation = new BMap.Geolocation()
    geolocation.getCurrentPosition(res => {
      // 无定位权限
      if (!res.accuracy) {
        return viewer.eventAction.execute('getPositionFailed', this.element, res)
      } else if (geolocation.getStatus() === 0) {
        this.showMyPosition(res.point)

        // 派发事件
        viewer.eventAction.execute('getPositionComplete', this.element, res)
      }
    }, { enableHighAccuracy: true })
  }

  // 加的
  // 1.设置中心点
  setCenter (point, zoom) {
    this.map.centerAndZoom(point, zoom)
  }

  // 2.计算地图中心点
  setZoomCenter (points, minZoom, maxZoom) {
    let view = this.map.getViewport(points)
    let mapZoom = view.zoom
    let centerPoint = view.center
    if (mapZoom > maxZoom) mapZoom = maxZoom
    if (mapZoom < minZoom) mapZoom = minZoom

    this.map.centerAndZoom(centerPoint, mapZoom)
  }

  // 3.清除覆盖物
  clearOverlay () {
    this.map.clearOverlays()
  }

  // 4.加入覆盖物
  addOverlay (pointsInfo) {
    let BMap = window.BMap

    for (let i = 0; i < pointsInfo.length; i++) {
      let tmpPoint = new BMap.Point(pointsInfo[i].lng, pointsInfo[i].lat)
      let tmpMarker = new BMap.Marker(tmpPoint)
      this.map.addOverlay(tmpMarker)
      /*
      let content = '<div style="margin:0;line-height:20px;padding:2px;">' +
        pointsInfo[i].metadata.name + '</b><br/>地址：' + pointsInfo[i].metadata.address +
        '</div>';
      let infoWindow = new BMap.InfoWindow(content);
      tmpMarker.addEventListener('click', function() {
        this.openInfoWindow(infoWindow);
      })
      */

      let searchInfoWindow = null
      let content = '<div style="margin:0;line-height:20px;padding:2px;">' + pointsInfo[i].metadata.address + '<br/>' + '</div>'
      searchInfoWindow = new window.BMapLib.SearchInfoWindow(this.map, content, {
        title: pointsInfo[i].metadata.name,
        width: 260,
        height: 105,
        panel: 'panel',
        enableAutoPan: true,
        // 到这里去1 , 从这里出发2
        searchTypes: [ 1, 2 ]
      })
      tmpMarker.addEventListener('click', () => {
        searchInfoWindow.open(tmpMarker)
      })
    }
  }

  // 5.显示一个点的信息
  openWindow (pointInfo) {
    let BMap = window.BMap

    let tmpPoint = new BMap.Point(pointInfo.lng, pointInfo.lat)
    let content = '<div style="margin:0;line-height:20px;padding:2px;"><b>' +
      pointInfo.metadata.name + '</b><br/>' + '地址：' + pointInfo.metadata.address +
      '</div>'
    let infoWindow = new BMap.InfoWindow(content)
    this.map.openInfoWindow(infoWindow, tmpPoint)
  }

  // 6.显示我的位置
  showMyPosition (point) {
    // console.log (point);
    let BMap = window.BMap

    let myContent =
      '<h4 style="margin:0 0 5px 0;padding:0.2em 0">我的位置</h4>' +
      '<p style="margin:0;line-height:1.5;font-size:13px;text-indent:2em">我所在的位置...</p>' +
      '</div>'
    let myIcon = new BMap.Icon('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAoCAYAAADpE0oSAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQwIDc5LjE2MDQ1MSwgMjAxNy8wNS8wNi0wMTowODoyMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjRCNjAyRTRFNTNDMjExRTlCRkVCQjMzMjMwRkM2Q0I2IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjRCNjAyRTRGNTNDMjExRTlCRkVCQjMzMjMwRkM2Q0I2Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NEI2MDJFNEM1M0MyMTFFOUJGRUJCMzMyMzBGQzZDQjYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NEI2MDJFNEQ1M0MyMTFFOUJGRUJCMzMyMzBGQzZDQjYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7OLMkJAAAKn0lEQVR42pRYeXBd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', new BMap.Size(30, 40))
    let myMarker = new BMap.Marker(point, { icon: myIcon, offset: new BMap.Size(-5, -23) })
    let myInfoWindow = new BMap.InfoWindow(myContent)
    this.map.centerAndZoom(point, 12)
    this.map.addOverlay(myMarker)
    myMarker.addEventListener('click', function () {
      this.openInfoWindow(myInfoWindow, { offset: new BMap.Size(-15, -60) })
    })
  }

  /**
   * 定位至local配置的位置
   *
   */
  searchLocation () {
    let BMap = window.BMap

    // 配置地址
    let address = traverseAndConcat(this.location)

    // 没有定位信息，则使用自动定位
    if (!address || !this.location.city) {
      this.getCurrentLocation()
      viewer.eventAction.execute('searchLocalFailed', this.element, {})
      return
    }
    let options = {
      onSearchComplete: results => {
        if (local.getStatus() !== 0) {
          return
        }
        let firstResult = results.getPoi(0)
        this.point = firstResult.point
        if (!firstResult || !this.point) {
          return
        }
        this.marker = new BMap.Marker(this.point)
        this.map.addOverlay(this.marker)
        this.map.centerAndZoom(this.point, 11)

        // 配置弹层
        this.setInfoWindow()
      }
    }

    // 搜索并定位地址
    let local = new BMap.LocalSearch(this.map, options)
    local.search(address)
  }

  /**
   * 配置弹层信息
   *
   */
  setInfoWindow () {
    let BMap = window.BMap
    if (!this.info) {
      return
    }
    let infoWindow = new BMap.InfoWindow(this.info.content, this.info)
    this.marker.addEventListener('click', () => {
      this.map.openInfoWindow(infoWindow, this.point)
    })
  }

  /**
   * 配置地图控件
   *
   */
  addControls () {
    let BMap = window.BMap
    // 去掉了本来的配置 let controls = this.controls
    // 添加右下角导航
    this.map.addControl(new BMap.NavigationControl({ anchor: 3, type: 1 }))
  }

  /**
   * 根据配置执行相应方法
   *
   */
  resolveOptions () {
    let BMap = window.BMap

    // 仅加载SDK，不初始化地图
    if (this.dataOnlyGetSdk) {
      return this.loadSdk()
    }

    // 初始化地图
    this.map = new BMap.Map('allmap')
    // init

    // 自动定位、或者手动定位
    this.getPosition ? this.getCurrentLocation() : this.searchLocation()

    // 暴露自动定位方法
    this.addEventAction('getLocal', () => {
      // 可能会在未完全初始化的时候调用
      this.getMapJDK().then(this.getCurrentLocation.bind(this))
    })
    // 配置控件
    this.controls && this.addControls()
  }

  /**
   * 异步加载地图jdk
   *
   */
  getMapJDK () {
    if (!window.BMap) {
      window.BMap = {}
      window.BMap._insertScript = new Promise(resolve => {
        window.BMapLib = () => {
          resolve(window.BMap)
          window.document.body.removeChild(script)
          window.BMap._insertScript = null
          window.BMapLib = null

          let script1 = document.createElement('script')
          window.document.body.appendChild(script1)
          script1.src = `https://api.map.baidu.com/library/SearchInfoWindow/1.5/src/SearchInfoWindow_min.js`

          let link1 = document.createElement('link')
          window.document.body.appendChild(link1)
          link1.rel = 'stylesheet'
          link1.href = `http://api.map.baidu.com/library/SearchInfoWindow/1.5/src/SearchInfoWindow_min.css`
        }
      })
      let script = document.createElement('script')
      window.document.body.appendChild(script)
      script.src = `https://api.map.baidu.com/api?v=2.0&ak=${this.ak}&callback=BMapLib`
      return window.BMap._insertScript
    } else if (!window.BMap._insertScript) {
      return Promise.resolve(window.BMap)
    }
    return window.BMap._insertScript
  }

  firstInviewCallback () {
    let wrapper = document.createElement('div')
    wrapper.id = 'allmap'
    this.hideMap && wrapper.classList.add('hideMap')
    this.element.appendChild(wrapper)

    this.getMapJDK().then(this.resolveOptions.bind(this))
  }
  // 插入文档时执行
  build () {
    this.addEventAction('setCenter', this.setCenter.bind(this))
    this.addEventAction('setZoomCenter', this.setZoomCenter.bind(this))
    this.addEventAction('clearOverlay', this.clearOverlay.bind(this))
    this.addEventAction('addOverlay', this.addOverlay.bind(this))
    this.addEventAction('openWindow', this.openWindow.bind(this))
  }
}
