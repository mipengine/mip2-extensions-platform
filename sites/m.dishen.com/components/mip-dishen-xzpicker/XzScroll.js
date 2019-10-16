// 星座选择滚动scroll
export default class XzScroll {
  constructor (options) {
    let defaults = {
      index: 5,
      startX: 0, // 记录起始位置
      startY: 0, // 记录起始位置
      scrollY: 0,
      offsetY: 0, // 当前滑动偏移量
      recordY: 0, // 记录滑动后conBox偏移量
      timestamp: 0,
      speed: 400
    }
    this.params = defaults
  }
  init (el) {
    let _self = this
    _self.dom = el
    _self.params.list = el.querySelector('ul')
    _self.params.items = el.querySelectorAll('li')
    _self.params.itemHeight = _self.params.items[0].offsetHeight
    _self.params.scrollHeight = _self.params.list.offsetHeight - el.offsetHeight // 可滚动的高度
    if (_self.params.index) {
      _self.params.offsetY = -_self.params.index * _self.params.itemHeight
      _self.params.recordY = _self.params.offsetY
      _self.translateY(_self.params.list, _self.params.offsetY)
      el.setAttribute('data-index', _self.params.index)
    }
    this.bindEvents()
  }
  bindEvents () {
    let _self = this

    function correctOffsetY (_offsetY) {
      // 超出容器左边界
      if (-_offsetY <= 0) {
        _offsetY = Math.pow(_offsetY, 0.8)
      } else if (-_offsetY >= _self.params.scrollHeight) { // 超出容器右边界
        _offsetY = -_self.params.scrollHeight - Math.pow(-_offsetY - _self.params.scrollHeight, 0.8)
      }
      return _offsetY
    }
    _self.params.list.addEventListener('touchstart', function (e) {
      _self.params.startX = e.touches[0].pageX
      _self.params.startY = e.touches[0].pageY
      _self.params.scrollY = undefined
      _self.params.timestamp = new Date().getTime()
    }, false)
    _self.params.list.addEventListener('touchmove', function (e) {
      let distX = e.touches[0].pageX - _self.params.startX
      let distY = e.touches[0].pageY - _self.params.startY
      if (typeof _self.params.scrollY === 'undefined') {
        _self.params.scrollY = Math.abs(distX) < Math.abs(distY)
      }
      if (_self.params.scrollY) {
        e.preventDefault()
        // 当前滑动偏移
        _self.params.offsetY = distY + _self.params.recordY
        // 偏移限定纠正
        _self.params.offsetY = correctOffsetY(_self.params.offsetY)
        _self.translateY(_self.params.list, _self.params.offsetY)
      }
    }, false)
    // 释放触摸，回滚
    _self.params.list.addEventListener('touchend', function (e) {
      let s = e.changedTouches[0].pageY - _self.params.startY
      let t = new Date().getTime() - _self.params.timestamp
      let v = Math.abs(s) / t
      if (v > 0.3) {
        if (s > 0) {
          _self.params.offsetY -= v * _self.params.offsetY * 1.2
        } else {
          _self.params.offsetY += v * _self.params.offsetY * 1.2
        }
      }
      if (_self.params.offsetY > 0) {
        _self.params.index = 0
        _self.params.recordY = 0
        _self.params.offsetY = 0
        doAnimation()
      } else if (-_self.params.offsetY > _self.params.scrollHeight) {
        _self.params.index = _self.params.items.length - 1
        _self.params.recordY = -_self.params.scrollHeight
        _self.params.offsetY = -_self.params.scrollHeight
        doAnimation()
      } else {
        let count = parseInt((_self.params.offsetY - _self.params.itemHeight / 2) / _self.params.itemHeight)
        _self.params.index = Math.abs(count)
        _self.params.offsetY = count * _self.params.itemHeight
        _self.params.recordY = _self.params.offsetY
        doAnimation()
      }
      _self.dom.setAttribute('data-index', _self.params.index)
    }, false)
    // 缓动动画
    function doAnimation () {
      let curY = parseInt(MIP.util.css(_self.params.list, 'transform').split(',')[1].replace('px)', ''))
      runAnimation(curY, _self.params.offsetY, 300, function (value) {
        _self.translateY(_self.params.list, value)
      })
    }
    // 对运动方法进行封装
    function runAnimation (from, to, duration, callback) {
      let options = {
        duration: duration || 300,
        callback: callback || null
      }
      // requestAnimationFrame的兼容处理
      if (!window.requestAnimationFrame) {
        window.requestAnimationFrame2 = function (fn) {
          setTimeout(fn, 17)
        }
      } else {
        window.requestAnimationFrame2 = window.requestAnimationFrame
      }
      // 算法需要的几个变量
      let start = 0
      // during根据设置的总时间计算
      let during = Math.ceil(options.duration / 17)
      /*
        * t: current time（当前时间）；
        * b: beginning value（初始值）；
        * c: change in value（变化量）；
        * d: duration（持续时间）。
        * you can visit 'http://easings.net/zh-cn' to get effect
        */
      let fnGetValue = function (t, b, c, d) {
        return c * ((t = t / d - 1) * t * t + 1) + b
      }
      // 运动
      let step = function () {
        // 当前的运动位置
        let value = fnGetValue(start, from, to - from, during)
        // 时间递增
        start++
        // 如果还没有运动到位，继续
        if (start <= during) {
          options.callback(value)
          requestAnimationFrame(step)
        } else {
          // 动画结束，这里可以插入回调...
          options.callback(to, true)
        }
      }
      // 开始执行动画
      step()
    }
  }
  // 修改translateY的值
  translateY (element, top) {
    MIP.util.css(element, 'transform', 'translate(0,' + top + 'px)')
  }
}
