/**
 * @file 用户行为收集
 * @author yeyongqin@mail.39.net
 */

/**
 * 工具类
 */
let _utils = {
  trim: function (str) {
    return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '')
  },
  includes: function (arr, str) {
    return arr.indexOf
      ? arr.indexOf(str) !== -1
      : arr.join('').indexOf(str) !== -1
  },
  isUndefined: function (str) {
    return str === void 0
  },
  extend: (function () {
    let isObjFunc = function (name) {
      let toString = Object.prototype.toString
      return function () {
        return toString.call(arguments[0]) === '[object ' + name + ']'
      }
    }
    let isObject = isObjFunc('Object')
    let isArray = isObjFunc('Array')
    let isBoolean = isObjFunc('Boolean')
    return function extend () {
      let index = 0
      let isDeep = false
      let obj
      let copy
      let destination
      let source
      let i
      if (isBoolean(arguments[0])) {
        index = 1
        isDeep = arguments[0]
      }
      for (i = arguments.length - 1; i > index; i--) {
        destination = arguments[i - 1]
        source = arguments[i]
        if (isObject(source) || isArray(source)) {
          for (let property in source) {
            obj = source[property]
            if (isDeep && (isObject(obj) || isArray(obj))) {
              copy = isObject(obj) ? {} : []
              let extended = extend(isDeep, copy, obj)
              destination[property] = extended
            } else {
              destination[property] = source[property]
            }
          }
        } else {
          destination = source
        }
      }
      return destination
    }
  })(),
  getObjectValue: function (value, valuePath, defalutValue) {
    let temp = value
    let arr = valuePath.split('.')
    let tempPath = arr.shift()
    defalutValue = !_utils.isUndefined(defalutValue) ? defalutValue : null
    try {
      while (temp && tempPath) {
        temp = temp[tempPath]
        tempPath = arr.shift()
      }
    } catch (e) {
      console.log('arr: ', arr)
      console.log(e)
    }
    temp = temp || defalutValue
    return temp
  },
  getCookie: function (name) {
    let arr = ''
    let reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
    if ((arr = document.cookie.match(reg))) {
      return unescape(arr[2])
    } else {
      return null
    }
  }
}

let TRACK_CLASSNAME = 'mp-include'
let NO_TRACK_CLASSNAME = 'no-track'

/**
   * 获取类名
   *
   * @param {*} el 节点
   * @returns {string} 返回值
   */
function _getClassName (el) {
  switch (typeof el.className) {
    case 'string':
      return el.className
    case 'object': // handle cases where className might be SVGAnimatedString or some other type
      return el.className.baseVal || el.getAttribute('class') || ''
    default:
      return ''
  }
}

/**
   * 根据标签获取元素
   *
   * @param {*} tag 标签
   * @param {*} context 作用域， 默认document
   */
function getElByTag (tag, context) {
  let doc = document.documentElement
    ? document.documentElement.parentNode
    : document
  context = context || doc
  if (context.querySelector) {
    return context.querySelectorAll(tag)
  } else if (tag.charAt(0) === '#') {
    return [context.getElementById(tag.slice(1))]
  } else if (tag.charAt(0) === '.') {
    if (context.getElementsByClassName) {
      return context.getElementsByClassName(tag.slice(1))
    } else {
      let _result = []
      let className = tag.slice(1)
      let _tags = context.getElementsByTagName('*')
      for (let i = 0, len = _tags.length; i < len; i++) {
        let _classNames = _getClassName(_tags[i])
        for (let j = 0, l = _classNames.length; j < l; j++) {
          if (_classNames[j] === className) {
            _result.push(_tags[i])
            break
          }
        }
      }
      return _result
    }
  } else {
    return context.getElementsByTagName(tag)
  }
}

/**
   * 类型检测
   * @prop <String> type 类型
   * 带type则检测是否为该类型，没有则返回值的类型
   * @return <Boolean, String>
   */

function typeTest (obj, type) {
  if (type) {
    type = type.replace(/\w/, function ($1) {
      return $1.toUpperCase()
    })
    return Object.prototype.toString.call(obj).slice(8, -1) === type
  } else {
    let typeStr = Object.prototype.toString.call(obj)
    return typeStr.slice(8, -1).toLowerCase()
  }
}

/**
   * 获取同层次的前一个节点
   *
   * @param {*} el 节点
   */
// function _previousElementSibling (el) {
//   try {
//     if (el.previousElementSibling) {
//       return el.previousElementSibling
//     } else {
//       do {
//         el = el.previousSibling
//       } while (el && !_typeofNode(el, 'element'))
//       return el
//     }
//   } catch (e) {
//     console.log(e)
//     return null
//   }
// }

/**
   * 判断节点的类型
   *
   * @param {*} el 节点
   * @param {*} type 类型
   * @returns {boolean|number} 返回值
   */
function _typeofNode (el, type) {
  if (!el) {
    throw Error('el no exist')
  }
  if (type) {
    let map = {
      text: 3,
      element: 1
    }
    return map[type] === el.nodeType
  } else {
    return el.nodeType
  }
}

/**
 * 监听函数兼容写法
 *
 * @param {*} ele 元素
 * @param {*} type 类型
 * @param {*} callback 回调
 */
function addEventListeners (ele, type, callback) {
  if (ele.addEventListener) {
    ele.addEventListener(type, callback, false)
  } else if (ele.attachEvent) {
    ele.attachEvent('on' + type, callback)
  } else {
    let fn = ele['on' + type]
    if (fn) {
      ele['on' + type] = function (val) {
        callback(val)
        fn(val)
      }
    } else {
      ele['on' + type] = callback
    }
  }
}

/**
   * 判断元素的tag
   *
   * @param {*} el 节点
   * @param {*} tag 节点的tag
   * @returns {boolean} 返回值
   */
function _isTag (el, tag) {
  return el && el.tagName && el.tagName.toLowerCase() === tag.toLowerCase()
}

/**
   * 是否为标记元素
   *
   * @param {*} el 元素
   * @param {*} tags 标记
   */
function isFlagEl (el, tags) {
  let isFlag = null
  if (!tags || tags.length === 0) {
    return true
  }
  let flag = false
  tags.forEach(function (tag) {
    if (/^#/.test(tag)) {
      isFlag = function (el) {
        return el.id === tag
      }
    } else if (/^\./.test(tag)) {
      isFlag = function (el) {
        return _utils.includes(
          _getClassName(el).split(' '),
          tag.replace(/^\./, '')
        )
      }
    } else {
      isFlag = function (el) {
        return _isTag(el, tag)
      }
    }
    let temp = isFlag(el, tag)
    if (temp) {
      flag = temp
    }
  })
  return flag
}

/**
   * 判断是否追踪元素
   *
   * @param {*} el 节点
   * @returns {boolean} 返回值
   * @param {Array} onlyTrackTags 仅追踪标签数组的内容
   */
function _shouldTrackElement (el, onlyTrackTags) {
  let classes = []
  if (!isFlagEl(el, onlyTrackTags)) {
    return false
  }
  for (
    let curEl = el;
    curEl.parentNode && !_isTag(curEl, 'body');
    curEl = curEl.parentNode
  ) {
    classes = _getClassName(curEl).split(' ')
    if (_utils.includes(classes, TRACK_CLASSNAME)) {
      return true
    }
    if (_utils.includes(classes, NO_TRACK_CLASSNAME)) {
      return false
    }
  }

  // don't include hidden or password fields
  let type = el.type || ''
  if (typeof type === 'string') {
    // it's possible for el.type to be a DOM element if el is a form with a child input[name="type"]
    switch (type.toLowerCase()) {
      case 'hidden':
        return false
      case 'password':
        return false
    }
  }

  // filter out data from fields that look like sensitive fields
  let name = el.name || el.id || ''
  if (typeof name === 'string') {
    // it's possible for el.name or el.id to be a DOM element if el is a form with a child input[name="name"]
    let sensitiveNameRegex = /^cc|cardnum|ccnum|creditcard|csc|cvc|cvv|exp|pass|pwd|routing|seccode|securitycode|securitynum|socialsec|socsec|ssn/i
    if (sensitiveNameRegex.test(name.replace(/[^a-zA-Z0-9]/g, ''))) {
      return false
    }
  }

  return true
}

/**
   * 是否为追踪的事件
   *
   * @param {*} el 节点
   * @param {*} event 事件
   * @returns {boolean} 返回值
   */
function _shouldTrackDomEvent (el, event) {
  if (
    !el ||
      _isTag(el, 'html') ||
      _isTag(el, 'body') ||
      !_typeofNode(el, 'element')
  ) {
    return false
  }
  let tag = el.tagName.toLowerCase()
  switch (tag) {
    case 'form':
      return event.type === 'submit'
    case 'input':
      if (!_utils.includes(['button', 'submit'], el.getAttribute('type'))) {
        return event.type === 'change'
      } else {
        return event.type === 'click'
      }
    case 'select':
      return event.type === 'change'
    case 'textarea':
      return event.type === 'change'
    default:
      return event.type === 'click'
  }
}

/**
   * 是否追踪input的值
   *
   * @param {*} value 值
   * @returns {boolean} 返回值
   */
function _shouldTrackValue (value) {
  if (value === null || _utils.isUndefined(value)) {
    return false
  }
  if (typeof value === 'string') {
    value = _utils.trim(value)
    // check to see if input value looks like a credit card number
    // see: https://www.safaribooksonline.com/library/view/regular-expressions-cookbook/9781449327453/ch04s20.html
    let ccRegex = /^(?:(4[0-9]{12}(?:[0-9]{3})?)|(5[1-5][0-9]{14})|(6(?:011|5[0-9]{2})[0-9]{12})|(3[47][0-9]{13})|(3(?:0[0-5]|[68][0-9])[0-9]{11})|((?:2131|1800|35[0-9]{3})[0-9]{11}))$/
    // eslint-disable-next-line no-useless-escape
    if (ccRegex.test((value || '').replace(/[\- ]/g, ''))) {
      return false
    }
    // check to see if input value looks like a social security number
    let ssnRegex = /(^\d{3}-?\d{2}-?\d{4}$)/
    if (ssnRegex.test(value)) {
      return false
    }
  }
  return true
}

/**
   * 获取非敏感的文本
   *
   * @param {*} el 节点
   * @returns {string} 返回值
   */
function _getSafeText (el) {
  let elText = ''
  if (_isTag(el, 'input')) {
    elText = el.value
  } else if (el.textContent || el.innerText) {
    elText = _utils
      .trim(el.textContent || el.innerText)
      .split(/(\s+)/)
      .join('')
      .replace(/[\r\n]/g, ' ')
      .replace(/[ ]+/g, ' ')
      .substring(0, 255)
  }
  return _utils.trim(elText)
}

/**
   * 获取事件的对象，兼容IE
   * 向上递归截至得节点, 如果不存在则以当前点击的节点作为对象
   * 优先级： stopFlag > no-track > mpnclude
   *
   * @param {*} e 节点
   * @param {Array} clickAreas 捕获的节点
   */
function _getCollectTarget (e, clickAreas) {
  let el = typeof e.target === 'undefined' ? e.srcElement : e.target
  if (e.type !== 'click') {
    return el
  }
  let curEl = el
  if (clickAreas) {
    while (
      !_isTag(el, 'body') &&
        !_isTag(el, 'html') &&
        !isFlagEl(el, clickAreas)
    ) {
      el = el.parentNode
    }
  }
  if (_isTag(el, 'body')) {
    el = curEl
  }
  return el
}

/**
   * 获取元素的属性的数据
   *
   * @param {*} elem 节点
   */
function _getPropertiesFromElement (elem) {
  let props = {}
  let whiteList = ['action', 'href']
  for (let i = 0; i < elem.attributes.length; i++) {
    let attr = elem.attributes[i]
    if (
      _shouldTrackValue(attr.value) &&
        _utils.includes(whiteList, attr.name)
    ) {
      props[attr.name] = attr.value
    }
  }
  return props
}

/**
   * 追踪事件的函数
   *
   * @param {*} event 事件
   * @param {*} instance 实例
   */
function _trackEvent (event, instance) {
  // 获取对象元素,可能为非点击元素
  let trueEl = _getCollectTarget(event, instance.config.clickAreas)
  if (!_shouldTrackElement(trueEl, instance.config.onlyTrackTags)) {
    return false
  }
  if (!_shouldTrackDomEvent(trueEl, event)) {
    return false
  }
  // 生成生成数据
  let data = instance.setData(trueEl, event)
  instance.track(instance.config.eventName, data)
  return true
}

/**
   * 获取终端信息
   */
function getTerminalData () {
  try {
    let params = {}
    let doc = document.documentElement
      ? document.documentElement.parentNode
      : document
      // Document对象数据
    if (doc) {
      params.title = doc.title || ''
      params.referrer = doc.referrer || ''
    }
    // navigator对象数据
    if (navigator) {
      params.lang = navigator.language || ''
      params.userLanguage = navigator.userLanguage || ''
      params.browserLanguage = navigator.browserLanguage || ''
    }
    // Window对象数据
    if (window && window.location) {
      params.url = window.location.href || ''
      params.sh = window.screen.height || 0
      params.sw = window.screen.width || 0
      params.cd = window.screen.colorDepth || 0
    }
    // 性能
    if (window.performance) {
      let time = window.performance.timing
      params.load = time.loadEventEnd
        ? time.loadEventEnd - time.navigationStart
        : 0
      params.domready = time.domContentLoadedEventEnd
        ? time.domContentLoadedEventEnd - time.navigationStart
        : 0
      params.blank = time.domLoading - time.navigationStart
    }
    for (let i in params) {
      if (!params[i]) {
        delete params[i]
      }
    }
    return params
  } catch (e) {
    console.log(e)
    return {}
  }
}

/**
   * 发送数据
   *
   * @param {*} src 后台地址
   * @param {*} params 发送的数据
   */
function send (src, params) {
  let args = ''
  for (let i in params) {
    if (args !== '') {
      args += '&'
    }
    args += i + '=' + encodeURIComponent(params[i])
  }
  let img = new Image(1, 1)
  console.log(args)
  img.src = src + '/1.gif?' + args
}

/**
   * 用户行为追踪类
   *
   * @param {Object} config 配置
   */
function AutoTrack (config) {
  this.config = _utils.extend(
    {},
    {
      src: 'http://wt.39.net', // 上报地址
      clickAreas: ['a'], // 点击上报的区域
      onlyTrackTags: ['a'], // 仅追踪元素的tag
      listenerEvents: ['click'], // 监听的事件
      eventName: 'web_event', // 默认发的事件名称
      cancel_view: false, // 是否取消发送view事件
      cancel_close: false, // 是否取消发送close事件
      additionData: {
        source: 'web'
      } // 附加的数据
    },
    config
  )
  this.init()
}

AutoTrack.prototype.init = function init () {
  let _this = this
  let doc = document.documentElement
    ? document.documentElement.parentNode
    : document
    // 如果都获取不到进入时间，则已初始化函数时间为准
  let tempEnterTimer = new Date().getTime()
  if (!doc) {
    console.log('document not ready yet, trying again in 500 milliseconds...')
    setTimeout(function () {
      _this.init()
    }, 500)
    return
  }
  // 发送view事件
  if (!_this.config.cancel_view) {
    let viewData = getTerminalData()
    _this.track('web_view', viewData)
  }
  // 发送close事件
  if (!_this.config.cancel_close) {
    addEventListeners(window, 'beforeunload', function () {
      timeOnPage.lt = new Date().getTime()
      timeOnPage.et =
          _utils.getObjectValue(window, 'performance.timing.domLoading', 0) ||
          (tempEnterTimer - timeOnPage.dt > 0 ? timeOnPage.dt : tempEnterTimer)
      timeOnPage.st = timeOnPage.lt - timeOnPage.et
      timeOnPage.at = timeOnPage.st - timeOnPage.pt
      let data = _utils.extend(timeOnPage, getTerminalData())
      _this.track('web_close', data)
    })
  }
  typeTest(_this.config.listenerEvents, 'array') &&
      _this.config.listenerEvents.forEach(function (event) {
        addEventListeners(doc, event, function (e) {
          _trackEvent(e, _this)
        })
      })
}

/**
   * 手动埋点
   *
   * @param {string} eventType 事件的类型,可自定义
   * @param {Object} params 传输的数据
   * @param {boolean} widthBaseData 默认携带的数据
   */
AutoTrack.prototype.track = function track (eventType, params, widthBaseData) {
  let baseData = _utils.extend(getTerminalData(), this.config.additionData)
  baseData = widthBaseData || widthBaseData === void 0 ? baseData : {}
  let data = _utils.extend(
    { type: eventType },
    _utils.extend({}, params, baseData)
  )
  send(this.config.src, data)
}

/**
   * @param {string} tag 监听的标志，可为类名，id，html标签
   * @param {event} type 监听的事件
   * @param {Function} callback 回调
   * @param {boolean} widthBaseData 默认携带的数据
   */
AutoTrack.prototype.listener = function (tag, type, callback, widthBaseData) {
  let arr = getElByTag(tag)
  let _this = this
  for (let i = 0; i < arr.length; i++) {
    let node = arr[i];
    (function (node) {
      addEventListeners(node, type, function () {
        let data = callback(node)
        let sendData = widthBaseData || widthBaseData === void 0 ? _utils.extend(_getPropertiesFromElement(node), getTerminalData(), _this.config.additionData, data) : data
        send(
          _this.config.src,
          sendData
        )
      })
    })(node)
  }
}

/**
   * 获取元素集合
   */
AutoTrack.prototype.getEl = getElByTag

/**
   * 提供对外的数据生成方法
   *
   * @param {Element} el 根据规则找到的元素对象
   * @param {Event} event 点击事件
   */
AutoTrack.prototype.setData = function generateData (el, event) {
  let data = _utils.extend(
    {
      t: new Date().getTime(),
      event: event.type,
      text: _getSafeText(el)
    },
    _getPropertiesFromElement(el),
    getTerminalData()
  )
  return data
}

let timeOnPage = {
  et: 0,
  lt: 0,
  at: 0,
  st: 0,
  pt: 0,
  dt: 0
}
function collectTime () {
  let doc = document.documentElement
    ? document.documentElement.parentNode
    : document
  if (!doc) {
    console.log('document not ready yet, trying again in 500 milliseconds...')
    setTimeout(function () {
      collectTime()
    }, 500)
    return
  }
  addEventListeners(window, 'load', function () {
    // 触发获取loadEventEnd
    !timeOnPage.dt && (timeOnPage.dt = new Date().getTime())
  })
  if (!document.addEventListener) {
    addEventListeners(doc, 'readystatechange', function () {
      timeOnPage.dt = new Date().getTime()
    })
  } else {
    addEventListeners(doc, 'DOMContentLoaded', function () {
      timeOnPage.dt = new Date().getTime()
    })
  }
  let peddingTime = 0
  addEventListeners(doc, 'visibilitychange', function () {
    if (doc.hidden) {
      peddingTime = new Date()
    } else {
      peddingTime && (timeOnPage.pt += new Date() - peddingTime)
    }
  })
}

// 开始收集时间
collectTime()

export default class MIPChinacnGetvideourl extends MIP.CustomElement {
  build () {
    let children = this.element.children
    let userSetting = {}
    if (children && children.length > 0) {
      try {
        userSetting = JSON.parse(children[0].textContent)
      } catch (e) {
        console.log(e)
        userSetting = {}
      }
    }
    let instance = new AutoTrack(userSetting)
    // 暴露实例
    this.element.instance = instance
  }
}
