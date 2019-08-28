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
    return arr.indexOf(str) !== -1
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
    const isObject = isObjFunc('Object')
    const isArray = isObjFunc('Array')
    const isBoolean = isObjFunc('Boolean')
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
  })()
}

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
 * 类型检测
 * @prop <String> type 类型
 * 带type则检测是否为该类型，没有则返回值的类型
 * @return <Boolean, String>
 */

function typeTest (obj, type) {
  if (type) {
    type = type.replace(/\w/, $1 => $1.toUpperCase())
    return Object.prototype.toString.call(obj) === `[object ${type}]`
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
    const map = {
      text: 3,
      element: 1
    }
    return map[type] === el.nodeType
  } else {
    return el.nodeType
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
 * @param {*} stopFlag 标记
 */
function isFlagEl (el, stopFlag) {
  let isFlag = null
  if (!stopFlag) {
    return true
  }
  if (/^#/.test(stopFlag)) {
    isFlag = el => el.id === stopFlag
  } else if (/^\./.test(stopFlag)) {
    isFlag = el =>
      _utils.includes(
        _getClassName(el).split(' '),
        stopFlag.replace(/^\./, '')
      )
  } else {
    isFlag = el => _isTag(el, stopFlag)
  }
  return isFlag(el, stopFlag)
}

/**
 * 判断是否追踪元素
 *
 * @param {*} el 节点
 * @returns {boolean} 返回值
 */
function _shouldTrackElement (el) {
  let classes = _getClassName(el).split(' ')
  for (
    let curEl = el;
    curEl.parentNode && !_isTag(curEl, 'body');
    curEl = curEl.parentNode
  ) {
    if (_utils.includes(classes, 'no-track')) {
      return false
    }
  }
  if (_utils.includes(classes, 'no-track')) {
    return false
  }

  if (_utils.includes(classes, 'mp-include')) {
    return true
  }

  // don't send data from inputs or similar elements since there will always be
  // a risk of clientside javascript placing sensitive data in attributes
  if (
    _isTag(el, 'input') ||
    _isTag(el, 'select') ||
    _isTag(el, 'textarea') ||
    el.getAttribute('contenteditable') === 'true'
  ) {
    return false
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
      if (['button', 'submit'].indexOf(el.getAttribute('type')) === -1) {
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
  if (_shouldTrackElement(el)) {
    elText = _utils
      .trim(el.textContent)
      .split(/(\s+)/)
      .filter(_shouldTrackValue)
      .join('')
      .replace(/[\r\n]/g, ' ')
      .replace(/[ ]+/g, ' ')
      .substring(0, 255)
  }
  return _utils.trim(elText)
}

/**
 * 获取事件的对象，兼容IE
 *
 * @param {*} e 节点
 * @param {string} stopFlag 向上递归截至得节点, 如果不存在则以当前点击的节点作为对象
 */
function _getCollectTarget (e, stopFlag) {
  // https://developer.mozilla.org/en-US/docs/Web/API/Event/target#Compatibility_notes
  let el = typeof e.target === 'undefined' ? e.srcElement : e.target
  let curEl = el
  if (stopFlag) {
    while (!_isTag(el, 'body') && !_isTag(el, 'html') && !isFlagEl(el, stopFlag)) {
      el = el.parentNode
    }
  }
  if (_isTag(el, 'body')) {
    el = curEl
  }
  return el
}

/**
 * 获取元素在同级中的位置
 *
 * @param {node} el
 */
// function _getNthChildAndNthOfType (el) {
//   let nthChild = 1
//   let nthOfType = 1
//   let currentElem = el
//   while ((currentElem = _previousElementSibling(currentElem))) {
//     nthChild++
//     currentElem.tagName === el.tagName && nthOfType++
//   }
//   return {
//     child: nthChild,
//     type: nthOfType
//   }
// }

/**
 * 自动为目标元素生成唯一样式选择器来作为元素的唯一标识
 *
 * @param {*} el 节点
 * @returns {Object} 返回值
 */
// function _generateSelectorPath (el) {
//   let list = []
//   let curEl = el
//   do {
//     if (curEl.id) {
//       list.unshift(`#${curEl.id}`)
//       break
//     } else {
//       let nths = _getNthChildAndNthOfType(curEl)
//       list.unshift(`${curEl.tagName.toLowerCase()}:nth-child(${nths.child})`)
//       curEl = curEl.parentNode
//     }
//   } while (curEl.parentNode && !_isTag(curEl, 'body'))
//   return list.join(' ')
// }

/**
 * 获取元素的属性的数据
 *
 * @param {*} elem 节点
 */
function _getPropertiesFromElement (elem) {
  let props = {}
  let whiteList = ['action', 'href']
  for (let i in elem.attributes) {
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

function _trackEvent (event, instance) {
  // 获取对象元素,可能为非点击元素
  let el = _getCollectTarget(event, instance.config.stopFlag)
  if (!isFlagEl(el, instance.config.onlyFlag)) {
    return false
  }
  if (!_shouldTrackElement(el)) {
    return false
  }
  if (!_shouldTrackDomEvent(el, event)) {
    return false
  }
  // 生成生成数据
  let data = instance.setData(el, event)
  instance.track('web_event', data)
  return true
}

/**
 * 获取终端设备类型
 */
function getBrowserInfo () {
  let agent = navigator.userAgent.toLowerCase()
  let ie = /msie [\d.]+;/gi
  let ff = /firefox\/[\d.]+/gi
  let chrome = /chrome\/[\d.]+/gi
  let saf = /safari\/[\d.]+/gi
  let device = ''
  // IE
  if (agent.indexOf('msie') > 0) {
    device = agent.match(ie)
  }
  // firefox
  if (agent.indexOf('firefox') > 0) {
    device = agent.match(ff)
  }
  // Safari
  if (agent.indexOf('safari') > 0 && agent.indexOf('chrome') < 0) {
    device = agent.match(saf)
  }
  // Chrome
  if (agent.indexOf('chrome') > 0) {
    device = agent.match(chrome)
  }
  device = device && device.length > 0 ? device[0] : ''
  return device
}

/**
 * 获取终端信息
 */
function getTerminalData () {
  let params = {}
  // Document对象数据
  if (document) {
    params.domain = document.domain || ''
    params.title = document.title || ''
    params.referrer = document.referrer || ''
  }
  // navigator对象数据
  if (navigator) {
    params.lang = navigator.language || ''
    params.userAgent = navigator.userAgent || ''
    params.userLanguage = navigator.userLanguage || ''
    params.browserLanguage = navigator.browserLanguage || ''
    params.device = getBrowserInfo()
  }
  // Window对象数据
  if (window && window.location) {
    params.host = window.location.host || ''
    params.pathname = window.location.pathname || ''
    params.url = window.location.href || ''
    params.origin = window.location.origin || ''
    params.protocol = window.location.protocol || ''
  }
  // 性能
  if (window.performance) {
    let time = window.performance.timing
    params.load = time.loadEventEnd - time.navigationStart
    params.domready = time.domInteractive - time.navigationStart
    params.blank = time.responseEnd - time.navigationStart
    // params.firstscreen = 0
  }
  return params
}

/**
 * 发送数据
 *
 * @param {*} src 后台地址
 * @param {*} params 发送的数据
 */
function send (src, params) {
  console.log(params)
  let args = ''
  for (let i in params) {
    if (args !== '') {
      args += '&'
    }
    args += i + '=' + encodeURIComponent(JSON.stringify(params[i]))
  }
  let img = new Image(1, 1)
  img.src = src + '/1.gif?' + args
}

/**
 * 记录页面活跃时间
 */
let timeOnPage = {
  et: 0,
  lt: 0,
  at: 0,
  st: 0,
  pt: 0
}

function AutoTrack (config) {
  this.config = config
}

AutoTrack.prototype.init = function init () {
  if (!document.body) {
    console.log('document not ready yet, trying again in 500 milliseconds...')
    setTimeout(() => {
      this.init()
    }, 500)
    return
  }
  let doc = document.documentElement.parentNode
  typeTest(this.config.listenerEvents, 'array') && this.config.listenerEvents.forEach(event => {
    doc.addEventListener(
      event,
      e => {
        _trackEvent(e, this)
      },
      false
    )
  })
  doc.addEventListener(
    'DOMContentLoaded',
    e => {
      timeOnPage.et = new Date().getTime()
      let viewData = getTerminalData()
      this.track('web_view', viewData)
    },
    false
  )
  window.addEventListener(
    'beforeunload',
    () => {
      timeOnPage.lt = new Date().getTime()
      timeOnPage.st = timeOnPage.lt - timeOnPage.et
      timeOnPage.at = timeOnPage.st - timeOnPage.pt
      this.track('web_close', timeOnPage)
    },
    false
  )
  let startTime = 0
  doc.addEventListener(
    'visibilitychange',
    () => {
      if (doc.hidden) {
        startTime = new Date()
      } else {
        timeOnPage.pt += new Date() - startTime
      }
    },
    false
  )
}

/**
 * 手动埋点
 *
 * @param {string} eventType 事件的类型,可自定义
 * @param {Object} params 传输的数据
 */
AutoTrack.prototype.track = function track (eventType, params) {
  let data = _utils.extend({ type: eventType }, params)
  send(this.config.src, data)
}

/**
 * 提供对外的数据生成方法
 *
 * @param {Element} el 根据规则找到的元素对象
 * @param {Event} event 点击事件
 */
AutoTrack.prototype.setData = function generateData (el, event) {
  let data = {
    t: new Date().getTime(),
    event: event.type,
    ..._getPropertiesFromElement(el),
    text: _getSafeText(el)
  }
  return data
}

export default class MIPChinacnGetvideourl extends MIP.CustomElement {
  build () {
    let children = this.element.children
    let defaultSetting = {
      src: '',
      stopFlag: 'a',
      onlyFlag: 'a',
      listenerEvents: ['click']
    }
    let userSetting = {}
    if (children && children.length > 0) {
      try {
        userSetting = JSON.parse(children[0].textContent)
      } catch (e) {
        console.log(e)
        userSetting = {}
      }
    }
    let setting = Object.assign({}, defaultSetting, userSetting)
    let instance = new AutoTrack(setting)
    instance.init()
    // 暴露实例
    this.element.instance = instance
  }
}
