/*!
 * mobileSelect.js
 * (c) 2017-present onlyhom
 * Released under the MIT License.
 */

function getClass (dom, string) {
  return dom.getElementsByClassName(string)
}
// 构造器
function MobileSelect (config) {
  this.mobileSelect = ''
  this.wheelsData = config.wheels
  this.jsonType = false
  this.cascadeJsonData = []
  this.displayJson = []
  this.curValue = null
  this.curIndexArr = []
  this.cascade = false
  this.startY = ''
  this.moveEndY = ''
  this.moveY = ''
  this.oldMoveY = ''
  this.offset = 0
  this.offsetSum = 0
  this.oversizeBorder = ''
  this.curDistance = []
  this.clickStatus = false
  this.isPC = true
  this.init(config)
}
MobileSelect.prototype = {
  constructor: MobileSelect,
  init: function (config) {
    let _this = this
    _this.keyMap = config.keyMap ? config.keyMap : {id: 'id', value: 'value', childs: 'childs'}
    _this.checkDataType()
    _this.renderWheels(_this.wheelsData, config.cancelBtnText, config.ensureBtnText)
    _this.trigger = document.querySelector(config.trigger)
    if (!_this.trigger) {
      console.error('mobileSelect has been successfully installed, but no trigger found on your page.')
      return false
    }
    _this.wheel = getClass(_this.mobileSelect, 'wheel')
    _this.slider = getClass(_this.mobileSelect, 'selectContainer')
    _this.wheels = _this.mobileSelect.querySelector('.wheels')
    _this.liHeight = _this.mobileSelect.querySelector('li').offsetHeight
    _this.ensureBtn = _this.mobileSelect.querySelector('.ensure')
    _this.cancelBtn = _this.mobileSelect.querySelector('.cancel')
    _this.grayLayer = _this.mobileSelect.querySelector('.grayLayer')
    _this.popUp = _this.mobileSelect.querySelector('.content')
    _this.callback = config.callback || function () {}
    _this.transitionEnd = config.transitionEnd || function () {}
    _this.onShow = config.onShow || function () {}
    _this.onHide = config.onHide || function () {}
    _this.initPosition = config.position || []
    _this.titleText = config.title || ''
    _this.connector = config.connector || ' '
    _this.triggerDisplayData = !(typeof (config.triggerDisplayData) === 'undefined') ? config.triggerDisplayData : true
    _this.trigger.style.cursor = 'pointer'
    _this.setStyle(config)
    _this.setTitle(_this.titleText)
    _this.checkIsPC()
    _this.checkCascade()
    _this.addListenerAll()

    if (_this.cascade) {
      _this.initCascade()
    }
    // 定位 初始位置
    if (_this.initPosition.length < _this.slider.length) {
      let diff = _this.slider.length - _this.initPosition.length
      for (let i = 0; i < diff; i++) {
        _this.initPosition.push(0)
      }
    }

    _this.setCurDistance(_this.initPosition)

    // 按钮监听
    _this.cancelBtn.addEventListener('click', function () {
      _this.hide()
    })

    _this.ensureBtn.addEventListener('click', function () {
      _this.hide()
      if (!_this.liHeight) {
        _this.liHeight = _this.mobileSelect.querySelector('li').offsetHeight
      }
      let tempValue = ''
      for (let i = 0; i < _this.wheel.length; i++) {
        i === _this.wheel.length - 1 ? tempValue += _this.getInnerHtml(i) : tempValue += _this.getInnerHtml(i) + _this.connector
      }
      if (_this.triggerDisplayData) {
        _this.trigger.innerHTML = tempValue
      }
      _this.curIndexArr = _this.getIndexArr()
      _this.curValue = _this.getCurValue()
      _this.callback(_this.curIndexArr, _this.curValue)
    })

    _this.trigger.addEventListener('click', function () {
      _this.show()
    })
    _this.grayLayer.addEventListener('click', function () {
      _this.hide()
    })
    _this.popUp.addEventListener('click', function () {})

    _this.fixRowStyle() // 修正列数
  },

  setTitle: function (string) {
    let _this = this
    _this.titleText = string
    _this.mobileSelect.querySelector('.title').innerHTML = _this.titleText
  },

  setStyle: function (config) {
    let _this = this
    if (config.ensureBtnColor) {
      _this.ensureBtn.style.color = config.ensureBtnColor
    }
    if (config.cancelBtnColor) {
      _this.cancelBtn.style.color = config.cancelBtnColor
    }
    if (config.titleColor) {
      _this.title = _this.mobileSelect.querySelector('.title')
      _this.title.style.color = config.titleColor
    }
    if (config.textColor) {
      _this.panel = _this.mobileSelect.querySelector('.panel')
      _this.panel.style.color = config.textColor
    }
    if (config.titleBgColor) {
      _this.btnBar = _this.mobileSelect.querySelector('.btnBar')
      _this.btnBar.style.backgroundColor = config.titleBgColor
    }
    if (config.bgColor) {
      _this.panel = _this.mobileSelect.querySelector('.panel')
      _this.shadowMask = _this.mobileSelect.querySelector('.shadowMask')
      _this.panel.style.backgroundColor = config.bgColor
      _this.shadowMask.style.background = 'linear-gradient(to bottom, ' + config.bgColor + ', rgba(255, 255, 255, 0), ' + config.bgColor + ')'
    }
    if (!isNaN(config.maskOpacity)) {
      _this.grayMask = _this.mobileSelect.querySelector('.grayLayer')
      _this.grayMask.style.background = 'rgba(0, 0, 0, ' + config.maskOpacity + ')'
    }
  },

  checkIsPC: function () {
    let _this = this
    let sUserAgent = navigator.userAgent.toLowerCase()
    let bIsIpad = sUserAgent.match(/ipad/i) === 'ipad'
    let bIsIphoneOs = sUserAgent.match(/iphone os/i) === 'iphone os'
    let bIsMidp = sUserAgent.match(/midp/i) === 'midp'
    let bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) === 'rv:1.2.3.4'
    let bIsUc = sUserAgent.match(/ucweb/i) === 'ucweb'
    let bIsAndroid = sUserAgent.match(/android/i) === 'android'
    let bIsCE = sUserAgent.match(/windows ce/i) === 'windows ce'
    let bIsWM = sUserAgent.match(/windows mobile/i) === 'windows mobile'
    if ((bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM)) {
      _this.isPC = false
    }
  },

  show: function () {
    this.mobileSelect.classList.add('mobileSelect-show')
    if (typeof this.onShow === 'function') {
      this.onShow(this)
    }
  },

  hide: function () {
    this.mobileSelect.classList.remove('mobileSelect-show')
    if (typeof this.onHide === 'function') {
      this.onHide(this)
    }
  },

  renderWheels: function (wheelsData, cancelBtnText, ensureBtnText) {
    let _this = this
    let cancelText = cancelBtnText || '取消'
    let ensureText = ensureBtnText || '确认'
    _this.mobileSelect = document.createElement('div')
    _this.mobileSelect.className = 'mobileSelect'
    _this.mobileSelect.innerHTML =
    '<div class="grayLayer"></div>' +
      '<div class="content">' +
        '<div class="btnBar">' +
          '<div class="fixWidth">' +
            '<div class="cancel">' + cancelText + '</div>' +
            '<div class="title"></div>' +
            '<div class="ensure">' + ensureText + '</div>' +
          '</div>' +
        '</div>' +
        '<div class="panel">' +
        '<div class="fixWidth">' +
          '<div class="wheels">' +
          '</div>' +
          '<div class="selectLine"></div>' +
          '<div class="shadowMask"></div>' +
        '</div>' +
      '</div>' +
    '</div>'
    document.body.appendChild(_this.mobileSelect)

    // 根据数据长度来渲染

    let tempHTML = ''
    for (let i = 0; i < wheelsData.length; i++) {
    // 列
      tempHTML += '<div class="wheel"><ul class="selectContainer">'
      if (_this.jsonType) {
        for (let j = 0; j < wheelsData[i].data.length; j++) {
        // 行
          tempHTML += '<li data-id="' + wheelsData[i].data[j][_this.keyMap.id] + '">' + wheelsData[i].data[j][_this.keyMap.value] + '</li>'
        }
      } else {
        for (let j = 0; j < wheelsData[i].data.length; j++) {
          // 行
          tempHTML += '<li>' + wheelsData[i].data[j] + '</li>'
        }
      }
      tempHTML += '</ul></div>'
    }
    _this.mobileSelect.querySelector('.wheels').innerHTML = tempHTML
  },

  addListenerAll: function () {
    let _this = this
    for (let i = 0; i < _this.slider.length; i++) {
      // 手势监听
      (function (i) {
        _this.addListenerWheel(_this.wheel[i], i)
      })(i)
    }
  },
  addListenerWheel: function (theWheel, index) {
    let _this = this
    theWheel.addEventListener('touchstart', function (event) {
      _this.touch(event, this.firstChild, index)
    }, false)
    theWheel.addEventListener('touchend', function (event) {
      _this.touch(event, this.firstChild, index)
    }, false)
    theWheel.addEventListener('touchmove', function (event) {
      _this.touch(event, this.firstChild, index)
    }, false)

    if (_this.isPC) {
      // 如果是PC端则再增加拖拽监听 方便调试
      theWheel.addEventListener('mousedown', function (event) {
        _this.dragClick(event, this.firstChild, index)
      }, false)
      theWheel.addEventListener('mousemove', function (event) {
        _this.dragClick(event, this.firstChild, index)
      }, false)
      theWheel.addEventListener('mouseup', function (event) {
        _this.dragClick(event, this.firstChild, index)
      }, true)
    }
  },

  checkDataType: function () {
    let _this = this
    if (typeof (_this.wheelsData[0].data[0]) === 'object') {
      _this.jsonType = true
    }
  },

  checkCascade: function () {
    let _this = this
    if (_this.jsonType) {
      let node = _this.wheelsData[0].data
      for (let i = 0; i < node.length; i++) {
        if (_this.keyMap.childs in node[i] && node[i][_this.keyMap.childs].length > 0) {
          _this.cascade = true
          _this.cascadeJsonData = _this.wheelsData[0].data
          break
        }
      }
    } else {
      _this.cascade = false
    }
  },

  generateArrData: function (targetArr) {
    let tempArr = []
    let keymapid = this.keyMap.id
    let keymapvalue = this.keyMap.value
    for (let i = 0; i < targetArr.length; i++) {
      let tempObj = {}
      tempObj[keymapid] = targetArr[i][this.keyMap.id]
      tempObj[keymapvalue] = targetArr[i][this.keyMap.value]
      tempArr.push(tempObj)
    }
    return tempArr
  },

  initCascade: function () {
    let _this = this
    _this.displayJson.push(_this.generateArrData(_this.cascadeJsonData))
    if (_this.initPosition.length > 0) {
      _this.initDeepCount = 0
      _this.initCheckArrDeep(_this.cascadeJsonData[_this.initPosition[0]])
    } else {
      _this.checkArrDeep(_this.cascadeJsonData[0])
    }
    _this.reRenderWheels()
  },

  initCheckArrDeep: function (parent) {
    let _this = this
    if (parent) {
      if (_this.keyMap.childs in parent && parent[_this.keyMap.childs].length > 0) {
        _this.displayJson.push(_this.generateArrData(parent[_this.keyMap.childs]))
        _this.initDeepCount++
        let nextNode = parent[_this.keyMap.childs][_this.initPosition[_this.initDeepCount]]
        if (nextNode) {
          _this.initCheckArrDeep(nextNode)
        } else {
          _this.checkArrDeep(parent[_this.keyMap.childs][0])
        }
      }
    }
  },

  checkArrDeep: function (parent) {
    // 检测子节点深度  修改 displayJson
    let _this = this
    if (parent) {
      if (_this.keyMap.childs in parent && parent[_this.keyMap.childs].length > 0) {
        _this.displayJson.push(_this.generateArrData(parent[_this.keyMap.childs])) // 生成子节点数组
        _this.checkArrDeep(parent[_this.keyMap.childs][0])// 检测下一个子节点
      }
    }
  },

  checkRange: function (index, posIndexArr) {
    let _this = this
    let deleteNum = _this.displayJson.length - 1 - index
    for (let i = 0; i < deleteNum; i++) {
      _this.displayJson.pop() // 修改 displayJson
    }
    let resultNode
    for (let i = 0; i <= index; i++) {
      if (i === 0) { resultNode = _this.cascadeJsonData[posIndexArr[0]] } else {
        resultNode = resultNode[_this.keyMap.childs][posIndexArr[i]]
      }
    }
    _this.checkArrDeep(resultNode)
    // console.log(_this.displayJson)
    _this.reRenderWheels()
    _this.fixRowStyle()
    if (index === 1 && ('childs' in resultNode) && (resultNode.childs.length <= posIndexArr[index + 1] + 1)) {
      _this.setCurDistance(_this.resetPosition(index, posIndexArr, resultNode))
    }
  },

  resetPosition: function (index, posIndexArr, resultNode) {
    let _this = this
    let tempPosArr = posIndexArr
    let tempCount
    if (_this.slider.length > posIndexArr.length) {
      tempCount = _this.slider.length - posIndexArr.length
      for (let i = 0; i < tempCount; i++) {
        tempPosArr.push(0)
      }
    } else if (_this.slider.length < posIndexArr.length) {
      tempCount = posIndexArr.length - _this.slider.length
      for (let i = 0; i < tempCount; i++) {
        tempPosArr.pop()
      }
    }
    for (let i = index + 1; i < tempPosArr.length; i++) {
      tempPosArr[i] = 0
    }
    if (index === 1 && ('childs' in resultNode) && (resultNode.childs.length <= posIndexArr[index + 1] + 1)) {
      for (let i = index + 1; i < tempPosArr.length; i++) {
        tempPosArr[i] = 0
      }
    } else {
      for (let i = index + 1; i < tempPosArr.length; i++) {
        tempPosArr[i] = resultNode.childs.length - 1
      }
    }
    return tempPosArr
  },

  reRenderWheels: function () {
    let _this = this
    // 删除多余的wheel
    if (_this.wheel.length > _this.displayJson.length) {
      let count = _this.wheel.length - _this.displayJson.length
      for (let i = 0; i < count; i++) {
        _this.wheels.removeChild(_this.wheel[_this.wheel.length - 1])
      }
    }
    for (let i = 0; i < _this.displayJson.length; i++) {
      // 列
      (function (i) {
        let tempHTML = ''
        if (_this.wheel[i]) {
          // console.log('插入Li')
          for (let j = 0; j < _this.displayJson[i].length; j++) {
            // 行
            tempHTML += '<li data-id="' + _this.displayJson[i][j][_this.keyMap.id] + '">' + _this.displayJson[i][j][_this.keyMap.value] + '</li>'
          }
          _this.slider[i].innerHTML = tempHTML
        } else {
          let tempWheel = document.createElement('div')
          tempWheel.className = 'wheel'
          tempHTML = '<ul class="selectContainer">'
          for (let j = 0; j < _this.displayJson[i].length; j++) {
            // 行
            tempHTML += '<li data-id="' + _this.displayJson[i][j][_this.keyMap.id] + '">' + _this.displayJson[i][j][_this.keyMap.value] + '</li>'
          }
          tempHTML += '</ul>'
          tempWheel.innerHTML = tempHTML

          _this.addListenerWheel(tempWheel, i)
          _this.wheels.appendChild(tempWheel)
        }
        // _this.·(i)
      })(i)
    }
  },

  updateWheels: function (data) {
    let _this = this
    if (_this.cascade) {
      _this.cascadeJsonData = data
      _this.displayJson = []
      _this.initCascade()
      if (_this.initPosition.length < _this.slider.length) {
        let diff = _this.slider.length - _this.initPosition.length
        for (let i = 0; i < diff; i++) {
          _this.initPosition.push(0)
        }
      }
      _this.setCurDistance(_this.initPosition)
      _this.fixRowStyle()
    }
  },

  updateWheel: function (sliderIndex, data) {
    let _this = this
    let tempHTML = ''
    if (_this.cascade) {
      console.error('级联格式不支持updateWheel(),请使用updateWheels()更新整个数据源')
      return false
    } else if (_this.jsonType) {
      for (let j = 0; j < data.length; j++) {
        tempHTML += '<li data-id="' + data[j][_this.keyMap.id] + '">' + data[j][_this.keyMap.value] + '</li>'
      }
      _this.wheelsData[sliderIndex] = {data: data}
    } else {
      for (let j = 0; j < data.length; j++) {
        tempHTML += '<li>' + data[j] + '</li>'
      }
      _this.wheelsData[sliderIndex] = data
    }
    _this.slider[sliderIndex].innerHTML = tempHTML
  },

  fixRowStyle: function () {
    let _this = this
    let width = (100 / _this.wheel.length).toFixed(2)
    for (let i = 0; i < _this.wheel.length; i++) {
      _this.wheel[i].style.width = width + '%'
    }
  },

  getIndex: function (distance) {
    return Math.round((2 * this.liHeight - distance) / this.liHeight)
  },

  getIndexArr: function () {
    let _this = this
    let temp = []
    for (let i = 0; i < _this.curDistance.length; i++) {
      temp.push(_this.getIndex(_this.curDistance[i]))
    }
    return temp
  },

  getCurValue: function () {
    let _this = this
    let temp = []
    let positionArr = _this.getIndexArr()
    if (_this.cascade) {
      for (let i = 0; i < _this.wheel.length; i++) {
        temp.push(_this.displayJson[i][positionArr[i]])
      }
    } else if (_this.jsonType) {
      for (let i = 0; i < _this.curDistance.length; i++) {
        temp.push(_this.wheelsData[i].data[_this.getIndex(_this.curDistance[i])])
      }
    } else {
      for (let i = 0; i < _this.curDistance.length; i++) {
        temp.push(_this.getInnerHtml(i))
      }
    }
    return temp
  },

  getValue: function () {
    return this.curValue
  },

  calcDistance: function (index) {
    return 2 * this.liHeight - index * this.liHeight
  },

  setCurDistance: function (indexArr) {
    let _this = this
    let temp = []
    for (let i = 0; i < _this.slider.length; i++) {
      temp.push(_this.calcDistance(indexArr[i]))
      _this.movePosition(_this.slider[i], temp[i])
    }
    _this.curDistance = temp
  },

  fixPosition: function (distance) {
    return -(this.getIndex(distance) - 2) * this.liHeight
  },

  movePosition: function (theSlider, distance) {
    theSlider.style.webkitTransform = 'translate3d(0,' + distance + 'px, 0)'
    theSlider.style.transform = 'translate3d(0,' + distance + 'px, 0)'
  },

  locatePosition: function (index, posIndex) {
    let _this = this
    this.curDistance[index] = this.calcDistance(posIndex)
    this.movePosition(this.slider[index], this.curDistance[index])
    if (_this.cascade) {
      _this.checkRange(index, _this.getIndexArr())
    }
  },

  updateCurDistance: function (theSlider, index) {
    if (theSlider.style.transform) {
      this.curDistance[index] = parseInt(theSlider.style.transform.split(',')[1])
    } else {
      this.curDistance[index] = parseInt(theSlider.style.webkitTransform.split(',')[1])
    }
  },

  getDistance: function (theSlider) {
    if (theSlider.style.transform) {
      return parseInt(theSlider.style.transform.split(',')[1])
    } else {
      return parseInt(theSlider.style.webkitTransform.split(',')[1])
    }
  },

  getInnerHtml: function (sliderIndex) {
    let _this = this
    let index = _this.getIndex(_this.curDistance[sliderIndex])
    let li = _this.slider[sliderIndex].getElementsByTagName('li')
    if (_this.slider[sliderIndex + 1]) {
      if (!_this.slider[sliderIndex + 1].getElementsByTagName('li')[index]) {
        index = _this.slider[sliderIndex + 1].getElementsByTagName('li').length - 1
      }
    }
    return li[index].innerHTML
  },

  touch: function (event, theSlider, index) {
    let _this = this
    event = event || arguments[0]
    switch (event.type) {
      case 'touchstart':
        _this.startY = event.touches[0].clientY
        _this.startY = parseInt(_this.startY)
        _this.oldMoveY = _this.startY
        break
      case 'touchend':
        _this.moveEndY = parseInt(event.changedTouches[0].clientY)
        _this.offsetSum = _this.moveEndY - _this.startY
        _this.oversizeBorder = -(theSlider.getElementsByTagName('li').length - 3) * _this.liHeight

        if (_this.offsetSum === 0) {
          // offsetSum为0,相当于点击事件
          // 0 1 [2] 3 4
          let clickOffetNum = parseInt((document.documentElement.clientHeight - _this.moveEndY) / 40)
          if (clickOffetNum !== 2) {
            let offset = clickOffetNum - 2
            let newDistance = _this.curDistance[index] + (offset * _this.liHeight)
            if ((newDistance <= 2 * _this.liHeight) && (newDistance >= _this.oversizeBorder)) {
              _this.curDistance[index] = newDistance
              _this.movePosition(theSlider, _this.curDistance[index])
              _this.transitionEnd(_this.getIndexArr(), _this.getCurValue())
            }
          }
        } else {
          // 修正位置
          _this.updateCurDistance(theSlider, index)
          _this.curDistance[index] = _this.fixPosition(_this.curDistance[index])
          _this.movePosition(theSlider, _this.curDistance[index])

          // 反弹
          if (_this.curDistance[index] + _this.offsetSum > 2 * _this.liHeight) {
            _this.curDistance[index] = 2 * _this.liHeight
            setTimeout(function () {
              _this.movePosition(theSlider, _this.curDistance[index])
            }, 100)
          } else if (_this.curDistance[index] + _this.offsetSum < _this.oversizeBorder) {
            _this.curDistance[index] = _this.oversizeBorder
            setTimeout(function () {
              _this.movePosition(theSlider, _this.curDistance[index])
            }, 100)
          }
          _this.transitionEnd(_this.getIndexArr(), _this.getCurValue())
        }
        if (_this.cascade) {
          _this.checkRange(index, _this.getIndexArr())
        }
        break

      case 'touchmove':
        event.preventDefault()
        _this.moveY = event.touches[0].clientY
        _this.offset = _this.moveY - _this.oldMoveY

        _this.updateCurDistance(theSlider, index)
        _this.curDistance[index] = _this.curDistance[index] + _this.offset
        _this.movePosition(theSlider, _this.curDistance[index])
        _this.oldMoveY = _this.moveY
        break
    }
  },

  dragClick: function (event, theSlider, index) {
    let _this = this
    event = event || window.event
    switch (event.type) {
      case 'mousedown':
        _this.startY = event.clientY
        _this.oldMoveY = _this.startY
        _this.clickStatus = true
        break

      case 'mouseup':

        _this.moveEndY = event.clientY
        _this.offsetSum = _this.moveEndY - _this.startY
        _this.oversizeBorder = -(theSlider.getElementsByTagName('li').length - 3) * _this.liHeight

        if (_this.offsetSum === 0) {
          let clickOffetNum = parseInt((document.documentElement.clientHeight - _this.moveEndY) / 40)
          if (clickOffetNum !== 2) {
            let offset = clickOffetNum - 2
            let newDistance = _this.curDistance[index] + (offset * _this.liHeight)
            if ((newDistance <= 2 * _this.liHeight) && (newDistance >= _this.oversizeBorder)) {
              _this.curDistance[index] = newDistance
              _this.movePosition(theSlider, _this.curDistance[index])
              _this.transitionEnd(_this.getIndexArr(), _this.getCurValue())
            }
          }
        } else {
          // 修正位置
          _this.updateCurDistance(theSlider, index)
          _this.curDistance[index] = _this.fixPosition(_this.curDistance[index])
          _this.movePosition(theSlider, _this.curDistance[index])

          // 反弹
          if (_this.curDistance[index] + _this.offsetSum > 2 * _this.liHeight) {
            _this.curDistance[index] = 2 * _this.liHeight
            setTimeout(function () {
              _this.movePosition(theSlider, _this.curDistance[index])
            }, 100)
          } else if (_this.curDistance[index] + _this.offsetSum < _this.oversizeBorder) {
            _this.curDistance[index] = _this.oversizeBorder
            setTimeout(function () {
              _this.movePosition(theSlider, _this.curDistance[index])
            }, 100)
          }
          _this.transitionEnd(_this.getIndexArr(), _this.getCurValue())
        }

        _this.clickStatus = false
        if (_this.cascade) {
          _this.checkRange(index, _this.getIndexArr())
        }
        break

      case 'mousemove':
        event.preventDefault()
        if (_this.clickStatus) {
          _this.moveY = event.clientY
          _this.offset = _this.moveY - _this.oldMoveY
          _this.updateCurDistance(theSlider, index)
          _this.curDistance[index] = _this.curDistance[index] + _this.offset
          _this.movePosition(theSlider, _this.curDistance[index])
          _this.oldMoveY = _this.moveY
        }
        break
    }
  }
}

export default MobileSelect
