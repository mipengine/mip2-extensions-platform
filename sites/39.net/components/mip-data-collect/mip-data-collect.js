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
  includes: function (str) {
    return str.indexOf(str) !== -1
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
   * 获取同层次的前一个节点
   *
   * @param {*} el 节点
   */
function _previousElementSibling (el) {
  try {
    if (el.previousElementSibling) {
      return el.previousElementSibling
    } else {
      do {
        el = el.previousSibling
      } while (el && !_typeofNode(el, 'element'))
      return el
    }
  } catch (e) {
    console.log(e)
    return null
  }
}

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
   * 判断是否追踪元素
   *
   * @param {*} el 节点
   * @returns {boolean} 返回值
   */
function _shouldTrackElement (el) {
  let classes = _getClassName(el).split(' ')
  if (_utils.includes(classes, 'mp-no-track')) {
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
  if (el.textContent) {
    elText += _utils
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
   */
function _getEventTarget (e) {
  // https://developer.mozilla.org/en-US/docs/Web/API/Event/target#Compatibility_notes
  if (typeof e.target === 'undefined') {
    return e.srcElement
  } else {
    return e.target
  }
}

/**
 * 获取元素在同级中的位置
 *
 * @param {node} el
 */
function _getNthChildAndNthOfType (el) {
  let nthChild = 1
  let nthOfType = 1
  let currentElem = el
  while ((currentElem = _previousElementSibling(currentElem))) {
    nthChild++
    if (currentElem.tagName === el.tagName) {
      nthOfType++
    }
  }
  return {
    child: nthChild,
    type: nthOfType
  }
}

/**
   * 自动为目标元素生成唯一样式选择器来作为元素的唯一标识
   *
   * @param {*} el 节点
   * @returns {Object} 返回值
   */
function _generateSelectorPath (el) {
  let list = []
  let curEl = el
  do {
    if (curEl.id) {
      list.unshift(`#${curEl.id}`)
      break
    } else {
      let nths = _getNthChildAndNthOfType(curEl)
      let classes = _getClassName(curEl)
      let className = classes ? `.${classes.split(' ')}` : ''
      list.unshift(`${curEl.tagName.toLowerCase()}${className}:nth-child(${nths.child})`)
      curEl = curEl.parentNode
    }
  } while (curEl.parentNode && !_isTag(curEl, 'body'))
  return list.join(' ')
}

/**
   * 获取元素的属性的数据
   *
   * @param {*} elem 节点
   */
function _getPropertiesFromElement (elem) {
  let props = {
    tag_name: elem.tagName.toLowerCase(),
    attr: {}
  }

  for (let i in elem.attributes) {
    let attr = elem.attributes[i]

    if (_shouldTrackValue(attr.value)) {
      props['attr'][attr.name] = attr.value
    }
  }
  return props
}

/**
   * 获取基本数据
   */
function _getDefaultProperties () {
  let params = {}
  // Document对象数据
  if (document) {
    params.domain = document.domain || ''
    params.url = document.URL || ''
    params.title = document.title || ''
    params.referrer = document.referrer || ''
  }
  // Window对象数据
  if (window && window.screen) {
    // 屏幕高度
    params.sh = window.screen.height || 0
    // 屏幕宽度
    params.sw = window.screen.width || 0
    // 返回目标设备或缓冲器上的调色板的比特深度。
    params.cd = window.screen.colorDepth || 0
  }
  // navigator对象数据
  if (navigator) {
    params.lang = navigator.language || ''
    params.userAgent = navigator.userAgent || ''
    params.userLanguage = navigator.userLanguage || ''
    params.browserLanguage = navigator.browserLanguage || ''
  }
  // Window对象数据
  if (window && window.location) {
    // 屏幕高度
    params.lochost = window.location.host || ''
    // 屏幕宽度
    params.locpathname = window.location.pathname || ''
    // 返回目标设备或缓冲器上的调色板的比特深度。
  }
  return { terminal: params }
}

function _trackEvent (event, instance) {
  let el = _getEventTarget(event)
  if (_typeofNode(el, 'text')) {
    // defeat Safari bug (see: http://www.quirksmode.org/js/events_properties.html)
    el = el.parentNode
  }
  if (!_shouldTrackElement(el)) {
    return false
  }
  if (!_shouldTrackDomEvent(el, event)) {
    return false
  }
  // 生成生成数据
  let data = {
    el_data: {
      css_selector: _generateSelectorPath(el),
      el_text: _getSafeText(el),
      ..._getPropertiesFromElement(el)
    },
    ..._getDefaultProperties(event.type),
    event_type: event.type
  }
  instance.track('web_event', data)
  return true
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
    args += i + '=' + encodeURIComponent(JSON.stringify(params[i]))
  }
  let img = new Image(1, 1)
  let fuwuqi = src
  img.src = fuwuqi + '/1.gif?' + args
}

/**
   * 记录页面活跃时间
   */
let timeOnPage = {
  enter_time: 0,
  leave_time: 0,
  active_time: 0,
  browse_time: 0,
  pedding_time: 0
}

function AutoTrack (config) {
  this.config = {
    src: '',
    instance: this
  }
  this.config = Object.assign({}, this.config, config)
}

AutoTrack.prototype.init = function init () {
  let config = this.config
  if (!document.body) {
    console.log('document not ready yet, trying again in 500 milliseconds...')
    setTimeout(function () {
      config.instance.init()
    }, 500)
    return
  }
  document.body.onclick = function (e) {
    _trackEvent(e, config.instance)
  }
  document.body.onsubmit = function (e) {
    _trackEvent(e, config.instance)
  }
  document.body.onchange = function (e) {
    _trackEvent(e, config.instance)
  }
  document.body.onload = function () {
    timeOnPage.enter_time = new Date()
  }
  document.body.onbeforeunload = function () {
    timeOnPage.leave_time = new Date()
    timeOnPage.browse_time = timeOnPage.leave_time - timeOnPage.enter_time
    timeOnPage.active_time = timeOnPage.browse_time - timeOnPage.pedding_time
    config.instance.track('web_close', timeOnPage)
  }
  let doc = document.documentElement.parentNode
  let startTime = 0
  doc.onvisibilitychange = function () {
    if (doc.hidden) {
      startTime = new Date()
    } else {
      timeOnPage.pedding_time += new Date() - startTime
    }
  }
}
AutoTrack.prototype.track = function track (eventType, params) {
  let data = _utils.extend({ track_type: eventType }, params)
  send(this.config.src, data)
}
AutoTrack.prototype.setSrc = function setSrc (src) {
  this.config.src = src
}

export default class MIPChinacnGetvideourl extends MIP.CustomElement {
  build () {
    let src = this.element.getAttribute('src')
    let instance = new AutoTrack({
      src
    })
    instance.init()
  }
}
