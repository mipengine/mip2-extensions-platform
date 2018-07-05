/**
 * @file 日期和城市选择依赖
 */
export default ({
  Picker: function () {
    /**
       * 滚动类
       *
       * @class
       * @param {string} id 选择器
       * @param {Object} params 配置参数
       */
    function Scroll (id, params) {
      this.scroller = document.querySelector(id)
      this.childNode = this.scroller.childNodes[0]
      this.options = {
        step: true, // 是否开启步长模式
        defaultPlace: 0, // 默认列表位置
        callback: null
      }

      this.startPageY = 0
      this.startTime = 0
      this.endTime = 0
      this.offsetTop = 0 // 上一次滚动位置

      this.scrollerHeight = this.scroller.clientHeight // scroller高度
      this.childNodeHeight = this.childNode.clientHeight // scroller子元素的高度
      this.scrollHeight = this.childNodeHeight - this.scrollerHeight // 滚动高度

      let childNodes = this.childNode.childNodes
      this.stepLen = childNodes.length > 0 ? childNodes[0].clientHeight : 0 // 步长

      // 设置参数
      for (let i in params) {
        if (params.hasOwnProperty(i)) {
          this.options[i] = params[i]
        }
      }

      // 默认列表位置
      let defaultPlace = this.options.defaultPlace ? this.options.defaultPlace : 0
      this.scrollTo(0, defaultPlace)

      this.start()
      this.move()
      this.end()
    }

    Scroll.prototype = {
      constructor: Scroll,
      start: function () {
        let self = this
        self.scroller.addEventListener('touchstart', function (e) {
          e.stopPropagation()
          e.preventDefault()

          self.startTime = self.getTime()
          let touches = e.touches ? e.touches[0] : e
          self.startPageY = touches.pageY // 起始触摸点

          self.browserVendor('transition', 'none')
        }, false)
      },

      move: function () {
        let self = this
        self.scroller.addEventListener('touchmove', function (e) {
          e.stopPropagation()
          e.preventDefault()

          let timestamp = self.getTime()
          let touches = e.touches ? e.touches[0] : e

          // 滚动高度
          let diffPageY = touches.pageY - self.startPageY
          let movePageY = diffPageY + self.offsetTop

          // 最少移动10px
          if (timestamp - self.endTime > 300 && Math.abs(diffPageY) < 10) {
            return
          }

          // 超过边缘滚动有阻力
          if (movePageY > 0) {
            movePageY /= 3
          } else if (Math.abs(movePageY) > Math.abs(self.scrollHeight)) {
            movePageY = Math.abs(self.scrollHeight) - Math.abs(movePageY)
            movePageY = movePageY / 3 - self.scrollHeight
          }

          self.browserVendor('transform', 'translate(0, ' + movePageY + 'px)')
        }, false)
      },

      end: function () {
        let self = this
        self.scroller.addEventListener('touchend', function (e) {
          e.stopPropagation()
          e.preventDefault()

          self.endTime = self.getTime()
          let duration = self.endTime - self.startTime

          let touches = e.changedTouches ? e.changedTouches[0] : e
          let offsetHeight = touches.pageY - self.startPageY // 本次滚动偏移位置
          self.offsetTop += offsetHeight // 记录总偏移位置
          if ((self.offsetTop > 0) || (Math.abs(self.offsetTop) > Math.abs(self.scrollHeight))) {
            // 上边缘&下边缘
            self.browserVendor('transition', 'all 500ms')
          } else if (duration < 300) { // 惯性滚动
            let speed = Math.abs(offsetHeight) / duration // 惯性移动速度
            let moveTime = duration * speed * 20 // 惯性滚动时间(动画)
            moveTime = moveTime > 2000 ? 2000 : moveTime
            self.offsetTop += offsetHeight * speed * 10 // 惯性移动距离

            self.browserVendor('transitionProperty', 'all')
            self.browserVendor('transitionDuration', moveTime + 'ms')
            self.browserVendor('transitionTimingFunction', 'cubic-bezier(0.1, 0.57, 0.1, 1)')
          } else {
            self.browserVendor('transition', 'all 500ms')
          }

          if (self.offsetTop > 0) {
            self.offsetTop = 0
          } else if (Math.abs(self.offsetTop) > Math.abs(self.scrollHeight)) {
            self.offsetTop = -self.scrollHeight
          }

          // 步长模式
          if (self.options.step && self.stepLen > 0) {
            let nowEndY = self.offsetTop
            let h = Math.abs(nowEndY % self.stepLen) // 滚动多余不足step的高度
            let halfHeight = self.stepLen / 2 // step一半的高度

            // 超过行一半的高度，则滚动一行
            let moveY = (h >= halfHeight) ? (nowEndY - self.stepLen + h) : (nowEndY + h)

            let index = parseInt(Math.abs(moveY) / self.stepLen, 10)
            self.options.callback({
              index: index,
              node: self.childNode.childNodes
            })
            self.offsetTop = moveY
          }

          self.browserVendor('transform', 'translate(0, ' + self.offsetTop + 'px)')
        }, false)
      },

      // 滚动到指定位置
      scrollTo: function (x, y, time) {
        let self = this

        if (time && time > 0) {
          self.browserVendor('transitionProperty', 'all')
          self.browserVendor('transitionDuration', time + 'ms')
          self.browserVendor('transitionTimingFunction', 'cubic-bezier(0.1, 0.57, 0.1, 1)')
        } else {
          self.browserVendor('transition', 'none')
        }

        y = -y
        self.offsetTop = y
        self.browserVendor('transform', 'translate(0, ' + y + 'px)')
      },

      // 刷新
      refresh: function () {
        this.childNode = this.scroller.childNodes[0]
        this.startPageY = 0
        this.startTime = 0
        this.endTime = 0
        this.offsetTop = 0

        this.scrollerHeight = this.scroller.clientHeight // scroller高度
        this.childNodeHeight = this.childNode.clientHeight // scroller子元素的高度
        this.scrollHeight = this.childNodeHeight - this.scrollerHeight // 滚动高度

        let childNodes = this.childNode.childNodes
        this.stepLen = childNodes.length > 0 ? childNodes[0].clientHeight : 0 // 步长

        this.scrollTo(0, 0, 500)
      },

      // 浏览器兼容
      browserVendor: function (styleStr, value) {
        let self = this
        let vendors = ['t', 'WebkitT', 'MozT', 'msT', 'OT']
        let styleObj
        let len = vendors.length
        let elementStyle = self.childNode.style

        for (let i = 0; i < len; i++) {
          styleObj = vendors[i] + styleStr.substr(1)
          if (styleObj in elementStyle) {
            elementStyle[styleObj] = value
          }
        }
      },

      // 获取当前时间
      getTime: function () {
        return parseInt(new Date().getTime(), 10)
      }
    }

    /**
       * 日期和城市筛选
       *
       * @class
       * @param {Object} params 选择器
       * @param {Object} mipElement 上下文
       */
    function Picker (params, mipElement) {
      this.scrollArray = [] // iscroll变量
      this.textArray = [] // 选中的值
      this.isScrollTo = false // 是否是scrollTo 滚动
      this.mipElement = mipElement

      if (params.pickerType === 'city') {
        this.cityInit(params)
        this.cityFill()
      } else if (params.pickerType === 'time') {
        this.dateInit(params)
        this.dateFill()
      }

      // 添加click事件
      this.eventClick()
    }

    Picker.prototype = {

      constructor: Picker,

      dateInit: function (params) {
        // 当前选择日期 月有多少天
        this.monthLen = 30

        // 参数
        this.options = {
          title: '请选择搬家时间', // 标题(可选)
          type: 2, // 0:年, 1:年月, 2:月日, 3:年月日4 日时分
          maxYear: '', // 最大年份（可选）
          minYear: '', // 最小年份（可选）
          separator: '', // 分割符(可选)
          defaultValue: '', // 默认值（可选）
          successCallback: null,
          cancelCallback: null,
          createCallback: null
        }

        params = this.setDefaultOptions(params)

        // 参数赋值
        for (let i in params) {
          if (params.hasOwnProperty(i)) {
            this.options[i] = params[i]
          }
        }

        // 是否有默认日期
        this.defaultArray = ['', '', '']
        if (this.options.defaultValue) {
          let defaultValue = this.options.defaultValue + ''
          let separator = this.options.separator
          let dvArray = defaultValue.split(separator)
          if (dvArray.length > 0) {
            for (let num = 0; num < dvArray.length; num++) {
              this.defaultArray[num] = dvArray[num]
            }
          }
        }
      },

      cityInit: function (params) {
        // 二级数据
        this.dataListTwo = null
        // 数组深度
        this.arrayDepth = 1

        // 参数
        this.options = {
          title: '', // 标题(可选)
          defaultValue: '', // 默认值-多个以空格分开（可选）
          type: '', // 几级联动（1、2、3）
          data: [], // 数组数据(必传)
          keys: null, // 数组内的键名称(必传，id、text、data)
          successCallback: null,
          cancelCallback: null,
          createCallback: null
        }

        // 参数赋值
        for (let i in params) {
          if (params.hasOwnProperty(i)) {
            this.options[i] = params[i]
          }
        }

        // 键名称不能为空, 数组数据不能为空
        if (!this.options.keys && this.options.data.length <= 0) {
          return
        }

        // 几级联动
        if (!this.options.type || this.options.type > 3 || this.options.type < 1) {
          // 获取数组深度（几级联动）
          this.getArrayDepth(params.data)
        } else {
          this.arrayDepth = this.options.type
        }

        // 键值
        let keys = this.options.keys
        this.keyId = keys.id
        this.keyValue = keys.value
        this.keyData = keys.childData

        // 是否有默认值
        this.defaultArray = ['', '', '']
        if (this.options.defaultValue) {
          let defaultValue = this.options.defaultValue
          let dvArray = defaultValue.split(' ')
          if (dvArray.length > 0) {
            for (let num = 0; num < dvArray.length; num++) {
              this.defaultArray[num] = dvArray[num]
            }
          }
        }
      },

      dateFill: function () {
        // 所有输入失去焦点
        this.enterNodesBlur()

        let mipPicker = this.mipElement
        let pickerHtml = this.createTpl()
        mipPicker.insertAdjacentHTML('beforeEnd', pickerHtml)
        let pickerElm = mipPicker.querySelector('.picker')

        // 设置宽度
        let listWidth = parseFloat(100 / this.options.type).toFixed(3) + '%'
        let pickerColArr = mipPicker.querySelectorAll('.picker-col')
        for (let i = 0; i < pickerColArr.length; i++) {
          pickerColArr[i].style.minWidth = listWidth
          pickerColArr[i].style.maxWidth = listWidth
        }

        switch (this.options.type) {
          case 1:
            pickerElm.querySelector('#wrapper-parent').style.padding = '0 15%'
            this.getYearList(0, this.defaultArray[0])
            this.getMonthList(1, this.defaultArray[1])
            break
          case 2:
            pickerElm.querySelector('#wrapper-parent').style.padding = '0 15%'
            this.getMonthList(0, this.defaultArray[0])
            this.getDayList(1, this.defaultArray[1])
            break
          case 3:
            this.getYearList(0, this.defaultArray[0])
            this.getMonthList(1, this.defaultArray[1])
            this.getDayList(2, this.defaultArray[2])
            break
            // lxn自定义时间
          case 5:
            this.getNewDayList(0, this.defaultArray[0])
            this.getHourList(1, this.defaultArray[1])
            this.getMinuteList(2, this.defaultArray[2])
            break
          case 4:
          default:
            this.getYearList(0, this.defaultArray[0])
            break
        }

        let createCallback = this.options.createCallback
        setTimeout(function () {
          pickerElm.classList.add('open')
          if (typeof createCallback === 'function') {
            createCallback()
          }
        }, 10)
      },

      cityFill: function () {
        // 所有输入失去焦点
        this.enterNodesBlur()

        // 组件中是否存在picker
        let mipPicker = this.mipElement
        let pickerHtml = this.createTpl()
        mipPicker.insertAdjacentHTML('beforeEnd', pickerHtml)
        let pickerElm = mipPicker.querySelector('.picker')

        // 设置宽度
        let listWidth = parseFloat(100 / this.arrayDepth).toFixed(3) + '%'
        let pickerColArr = mipPicker.querySelectorAll('.picker-col')
        for (let i = 0; i < pickerColArr.length; i++) {
          pickerColArr[i].style.minWidth = listWidth
          pickerColArr[i].style.maxWidth = listWidth
        }

        if (this.arrayDepth >= 1) {
          this.showScrollList(this.options.data, 0, true)
        }

        let createCallback = this.options.createCallback
        setTimeout(function () {
          pickerElm.classList.add('open')
          if (typeof createCallback === 'function') {
            createCallback()
          }
        }, 10)
      },

      createTpl: function (type) {
        // 组件中是否存在picker
        let mipPicker = this.mipElement
        let picker = mipPicker.querySelector('.picker')
        if (picker) {
          mipPicker.removeChild(picker)
        }
        let title = this.options.title ? this.options.title : ' '

        let pickerCol = '<div class="picker-col" id="picker-wrapper0"><ul></ul></div>'

        if (this.options.pickerType === 'time') {
          // 2级选择
          if (this.options.type > 0) {
            pickerCol += '<div class="picker-col" id="picker-wrapper1"><ul></ul></div>'
          }

          // 3级选择
          if (this.options.type > 2) {
            pickerCol += '<div class="picker-col" id="picker-wrapper2"><ul></ul></div>'
          }
        }

        if (this.options.pickerType === 'city') {
          // 2级选择
          if (this.arrayDepth >= 2) {
            pickerCol += '<div class="picker-col" id="picker-wrapper1"><ul></ul></div>'
          }

          // 3级选择
          if (this.arrayDepth >= 3) {
            pickerCol += '<div class="picker-col" id="picker-wrapper2"><ul></ul></div>'
          }
        }

        let pickerHtml = [
          '<div class="picker">',
          '<header><button class="picker-cancel">取消</button>',
          '<h3>' + title + '</h3>',
          '<button class="picker-ok">确定</button></header>',
          '<div class="picker-body" id="wrapper-parent">' + pickerCol,
          '<div class="picker-mask-top"></div>',
          '<div class="picker-mask-middle"></div>',
          '<div class="picker-mask-bottom"></div>',
          '</div></div><div class="picker-mask"></div>'
        ].join('')

        return pickerHtml
      },

      // iscroll初始化
      scrollInit: function (index, num) {
        let self = this
        if (index === 1) {
          let date = new Date()
          let hour = date.getHours() + 1
          if (hour > 22) {
            num = 0
          } else {
            num = hour
          }

        //   let hourItem = document.getElementById('picker-wrapper1').getElementsByClassName('sethours')
        //   let hourItemSet = Array.prototype.slice.call(hourItem)
        //   for (let i = 0; i < hour; i++) {
        //     hourItemSet[i].style.display = 'none'
        //   }
        }

        // 每个选项对的高度
        let wrapperList = document.querySelector('#picker-wrapper0').childNodes[0]
        let itemHeight = wrapperList.childNodes[0].clientHeight
        let id = '#picker-wrapper' + index
        self.scrollArray[index] = new Scroll(id, {
          // 步长（每次滚动固定距离）
          step: itemHeight,

          // 列表默认位置(默认为0)
          defaultPlace: itemHeight * num,

          // 滚动结束回调函数
          callback: function (params) {
            let num = params.index + 2
            let node = params.node[num]
            self.setItemList(node, index)

            if (self.options.pickerType === 'time') {
              // 当前天数选择大于 当前年月的天数
              let days = self.textArray[0].value
              let hours = self.textArray[1].value
              let now = new Date()
              let year = new Date(now.getTime()).getFullYear()
              let month = (new Date(now.getTime()).getMonth()) + 1
              let date = new Date(now.getTime()).getDate()
              let hour = new Date(now.getTime()).getHours() + 1
              let value = year + '-' + month + '-' + date
              if (self.options.type === 5 && params.node.length === 12) {
                if (value === days) {
                  let moveLen = hour * itemHeight
                  setTimeout(function () {
                    self.textArray[1].value = ' ' + hour
                    self.scrollArray[1].scrollTo(0, moveLen, 500)
                  }, 0)
                } else {
                  let moveLen = 0
                  setTimeout(function () {
                    self.textArray[1].value = ' 0'
                    self.scrollArray[1].scrollTo(0, moveLen, 500)
                  }, 0)
                }
              } else if (self.options.type === 5 && params.node.length === 28) {
                if (value === days && hours < hour) {
                  let moveLen = hour * itemHeight
                  setTimeout(function () {
                    self.textArray[1].value = ' ' + hour
                    self.scrollArray[1].scrollTo(0, moveLen, 500)
                  }, 0)
                }
              }
            }
          }
        })

        // 禁止move事件
        self.addEventListen()
      },

      // 设置列表、存储选中数据
      setItemList: function (nowScroll, index) {
        // nowScroll, 当前选择项的节点
        // index, 当前选择的是第几级列表 0，1，2
        let self = this
        let nowItem = {}
        if (nowScroll) {
          if (self.options.pickerType === 'time') {
            // 当前选择项的值
            nowItem.value = nowScroll.attributes[0].value
            self.textArray[index] = nowItem
            self.getMonthLength()
          } else if (self.options.pickerType === 'city') {
            // 键值
            let keyId = self.keyId
            let keyValue = self.keyValue

            // 当前选择项的值
            nowItem[keyValue] = nowScroll.textContent
            nowItem[keyId] = nowScroll.attributes[0].value

            // 默认值重置
            self.defaultArray = ['', '', '']
            if (index === 0) {
              // 滚动一级列表
              self.defaultArray[index] = nowItem[keyValue]
              self.showScrollList(self.options.data, 0)
            } else if (index === 1) {
              // 滚动二级列表
              self.defaultArray[index] = nowItem[keyValue]
              self.showScrollList(self.dataListTwo, 1)
            }
            self.textArray[index] = nowItem
          }
        } else {
          nowItem = ''
        }

        self.textArray[index] = nowItem
      },

      // 显示数据列表
      showScrollList: function (dataList, index, isInit) {
        // dataList, 数据(例如：省、市、区)
        // index, 当前wrapper列数(0、1、2)
        // hasDefaultValue, 需要判断默认值(true/false)
        // isInit, 需要判断是否为初始化(true/false)
        let self = this
        let keyId = self.keyId
        let keyValue = self.keyValue
        let keyData = self.keyData

        let list = '<li></li><li></li>'
        let defaultNum // 默认值
        let childData = []

        if (self.defaultArray[index]) {
          // 判断默认值
          let isMatch = false // 默认值是否能匹配
          for (let i = 0; i < dataList.length; i++) {
            if (self.defaultArray[index] && self.defaultArray[index] === dataList[i][keyValue]) {
              isMatch = true
              defaultNum = i // 默认选中的值
              if (keyData && dataList[i][keyData]) {
                childData = dataList[i][keyData] // 子集
              }
              self.setDefaultItem(index, dataList[i][keyValue], dataList[i][keyId])
            }

            list += '<li data-id="' + dataList[i][keyId] + '">' + dataList[i][keyValue] + '</li>'
          }

          if (!isMatch) {
            if (keyData && dataList[0][keyData]) {
              childData = dataList[0][keyData] // 子集
            }
            self.setDefaultItem(index, dataList[0][keyValue], dataList[0][keyId])
          }
        } else {
          // 无默认值
          for (let j = 0; j < dataList.length; j++) {
            list += '<li data-id="' + dataList[j][keyId] + '">' + dataList[j][keyValue] + '</li>'
          }

          if (keyData && dataList[0][keyData]) {
            childData = dataList[0][keyData] // 子集
          }
          self.setDefaultItem(index, dataList[0][keyValue], dataList[0][keyId])
        }

        list += '<li></li><li></li>'
        document.querySelector('#picker-wrapper' + index).childNodes[0].innerHTML = list

        // 初始化&滚动选择
        let num = index + 1
        if (isInit) {
          self.scrollInit(index, defaultNum) // iscroll init
          if (num < self.arrayDepth && childData.length > 0) {
            self.showScrollList(childData, num, true)
          }
        } else {
          if (num < self.arrayDepth) {
            if (childData.length > 0) {
              self.showScrollList(childData, num)
            }

            setTimeout(function () {
              self.scrollArray[num].refresh()
            }, 0)
          }
        }

        // 保存一级数据（只滚动二级时使用）
        if (index === 0) {
          self.dataListTwo = childData
        }
      },

      // 默认选中的值
      setDefaultItem: function (index, value, id) {
        let self = this
        let newItem = {}
        if (self.options.pickerType === 'time') {
          newItem.value = value
        } else if (self.options.pickerType === 'city') {
          // 键值
          let keyId = self.keyId
          let keyValue = self.keyValue
          newItem[keyValue] = value
          newItem[keyId] = id
        }

        self.textArray[index] = newItem
      },

      // 点击事件
      eventClick: function () {
        let self = this
        // 取消按钮
        let cancelButton = self.mipElement.querySelector('.picker-cancel')
        cancelButton.addEventListener('click', function (e) {
          e.stopPropagation()
          e.preventDefault()
          // 回调函数
          if (self.options.cancelCallback) {
            self.options.cancelCallback()
          }
          self.hidePicker() // 隐藏picker
        })

        // 确定按钮
        let okButton = self.mipElement.querySelector('.picker-ok')
        okButton.addEventListener('click', function (e) {
          e.stopPropagation()
          e.preventDefault()
          let dataCode = ''
          let inputValue = ''
          if (self.options.pickerType === 'time') {
            for (let i = 0; i < self.textArray.length; i++) {
              if (i === 0) {
                inputValue += self.textArray[i].value
              } else {
                inputValue += self.options.separator + self.textArray[i].value
              }
            }
          } else if (self.options.pickerType === 'city') {
            let keys = self.options.keys
            for (let j = 0; j < self.textArray.length; j++) {
              let id = keys.id
              let value = keys.value
              if (j === 0) {
                inputValue += self.textArray[j][value]
                dataCode += self.textArray[j][id]
              } else {
                inputValue += ' ' + self.textArray[j][value]
                dataCode += ',' + self.textArray[j][id]
              }
            }
          }

          // 回调函数
          if (self.options.successCallback) {
            self.options.successCallback({
              value: inputValue,
              code: dataCode
            })
          }

          // 隐藏picker
          self.hidePicker()
        })
      },

      // 隐藏picker
      hidePicker: function () {
        let self = this
        self.removeEventListen()
        let mipElement = self.mipElement
        let picker = mipElement.querySelector('.picker')
        let pickerMask = mipElement.querySelector('.picker-mask')
        console.log('测试')
        setTimeout(function () {
          mipElement.removeChild(picker)
          mipElement.removeChild(pickerMask)
          self.destroy() // 销毁变量
        }, 200)
      },

      // 打开picker
      openPicker: function () {
        let self = this
        self.addEventListen()
        let mipElement = self.mipElement
        let picker = mipElement.querySelector('.picker')
        setTimeout(function () {
          picker.classList.add('open')
        }, 10)
      },

      // 获取数组深度
      getArrayDepth: function (data) {
        let self = this
        let dataArray = data[0]
        let index = ''

        for (let i in dataArray) {
          if (Array.isArray(dataArray[i]) && dataArray[i].length !== 0) {
            index = i
            self.arrayDepth++
            break
          }
        }

        if (index) {
          self.getArrayDepth(dataArray[index])
        }
      },

      // 所有输入失去焦点(隐藏键盘)
      enterNodesBlur: function () {
        let inputArr = document.querySelectorAll('input')
        for (let m = 0; m < inputArr.length; m++) {
          inputArr[m].blur()
        }

        let textareaArr = document.querySelectorAll('textarea')
        for (let n = 0; n < textareaArr.length; n++) {
          textareaArr[n].blur()
        }
      },

      // 禁止默认事件
      touchDefault: function (e) {
        e.preventDefault()
      },

      // 阻止冒泡&默认事件
      touchStop: function (e) {
        e.stopPropagation()
        e.preventDefault()
      },

      // 添加监听事件
      addEventListen: function () {
        // document.addEventListener('touchmove', this.touchDefault, false);
      },

      // 移除监听事件
      removeEventListen: function () {
        // document.removeEventListener('touchmove', this.touchDefault, false);
      },

      // picker销毁
      destroy: function () {
        let self = this
        self.dataListTwo = null // 二级地址数据
        self.options = null // 参数
        self.arrayDepth = 1 // 数组深度
        self.scrollArray = [] // iscroll变量
        self.textArray = [] // 选中的值
        self.isScrollTo = false // 是否是scrollTo 滚动

        this.keyId = ''
        this.keyValue = ''
        this.keyData = ''

        this.defaultArray = ['', '', ''] // 默认值
      },

      // 设置默认参数值(日期)
      setDefaultOptions: function (params) {
        // 当前时间
        let date = new Date()
        let nowYear = date.getFullYear()
        let nowMonth = date.getMonth() + 1
        let nowDay = date.getDate()

        // let type = parseInt(params.type, 10);

        // 默认分隔符
        params.separator = params.separator ? params.separator : ''

        nowMonth = nowMonth < 10 ? '0' + nowMonth : nowMonth
        nowDay = nowDay < 10 ? '0' + nowDay : nowDay
        if (!params.defaultValue || params.defaultValue === '') {
          if (params.type === 0) {
            params.defaultValue = nowYear
          } else if (params.type === 1) {
            params.defaultValue = nowYear + params.separator + nowMonth
          } else if (params.type === 2) {
            params.defaultValue = nowMonth + params.separator + nowDay
          } else if (params.type === 3) {
            params.defaultValue = nowYear + params.separator + nowMonth + params.separator + nowDay
          }
        }

        // 默认最大最小年份
        params.maxYear = params.maxYear ? parseInt(params.maxYear, 10) : nowYear + 100
        params.minYear = params.minYear ? parseInt(params.minYear, 10) : nowYear - 100

        // 参数
        return params
      },

      // 获取年列表
      getYearList: function (index, defaultValue) {
        let self = this
        let list = '<li></li><li></li>'
        let defaultNum = ''
        let maxYear = self.options.maxYear
        let minYear = self.options.minYear
        defaultValue = parseInt(defaultValue, 10)
        if (defaultValue) {
          let num = 0
          let isMatch = false
          for (let i = maxYear; i > minYear; i--) {
            if (defaultValue === i) {
              isMatch = true
              defaultNum = num // 默认选中的值
              self.setDefaultItem(index, i)
            }

            list += '<li data-value="' + i + '">' + i + '年</li>'
            num++
          }

          if (!isMatch) {
            self.setDefaultItem(index, maxYear)
          }
        } else {
          for (let j = maxYear; j > minYear; j--) {
            list += '<li data-value="' + j + '">' + j + '年</li>'
          }
          self.setDefaultItem(index, maxYear)
        }

        list += '<li></li><li></li>'
        document.querySelector(
          '#picker-wrapper' + index
        ).childNodes[0].innerHTML = list

        setTimeout(function () {
          self.scrollInit(index, defaultNum)
        }, 0)
      },

      // 获取月列表
      getMonthList: function (index, defaultValue) {
        let self = this
        let list = '<li></li><li></li>'
        let defaultNum = ''
        let count = ''

        let unit = '月'
        let prefix = '0'
        if (self.options.type === 2) {
          unit = ''
          prefix = ''
        }
        defaultValue = parseInt(defaultValue, 10)
        if (defaultValue) {
          let num = 0
          let isMatch = false
          for (let i = 1; i <= 12; i++) {
            count = i < 10 ? prefix + i : i
            if (defaultValue === i) {
              isMatch = true
              defaultNum = num // 默认选中的值
              self.setDefaultItem(index, count)
            }

            list += '<li data-value="' + count + '">' + count + unit + '</li>'
            num++
          }

          if (!isMatch) {
            self.setDefaultItem(index, '01')
          }
        } else {
          for (let j = 1; j <= 12; j++) {
            count = j < 10 ? prefix + j : j
            list += '<li data-value="' + count + '">' + count + unit + '</li>'
          }
          self.setDefaultItem(index, prefix + 1)
        }

        list += '<li></li><li></li>'
        document.querySelector(
          '#picker-wrapper' + index
        ).childNodes[0].innerHTML = list
        setTimeout(function () {
          self.scrollInit(index, defaultNum)
        }, 0)
      },

      // 获取日列表
      getDayList: function (index, defaultValue) {
        let self = this
        let list = '<li></li><li></li>'
        let defaultNum = ''
        let count = ''

        let unit = '日'
        let prefix = '0'
        if (self.options.type === 2) {
          unit = ''
          prefix = ''
        }
        defaultValue = parseInt(defaultValue, 10)
        if (defaultValue) {
          let num = 0
          let isMatch = false
          for (let i = 1; i <= 31; i++) {
            count = i < 10 ? prefix + i : i
            if (defaultValue === count) {
              isMatch = true
              defaultNum = num // 默认选中的值
              self.setDefaultItem(index, count)
            }

            list += '<li data-value="' + count + '">' + count + unit + '</li>'
            num++
          }

          if (!isMatch) {
            self.setDefaultItem(index, '01')
          }
        } else {
          for (let j = 1; j <= 31; j++) {
            count = j < 10 ? prefix + j : j
            list += '<li data-value="' + count + '">' + count + unit + '</li>'
          }
          self.setDefaultItem(index, prefix + 1)
        }

        list += '<li></li><li></li>'
        document.querySelector(
          '#picker-wrapper' + index
        ).childNodes[0].innerHTML = list
        setTimeout(function () {
          self.scrollInit(index, defaultNum)
        }, 0)
      },

      // 计算当前月有多少天
      getMonthLength: function () {
        let self = this
        let monthIs31Day = ['01', '03', '05', '07', '08', '10', '12']
        if (self.options.type === 3) {
          let nowYear = self.textArray[0].value
          let nowMonth = self.textArray[1].value
          let leap = self.isLeap(nowYear)

          if (nowMonth === '02') {
            self.monthLen = 28 + leap
          } else if (monthIs31Day.indexOf(nowMonth) > -1) {
            self.monthLen = 31
          } else {
            self.monthLen = 30
          }
        }
      },

      // 判断是否为闰年:(1)年份能被4整除，但不能被100整除；(2)年份能被400整除。
      isLeap: function (year) {
        if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
          return 1
        }
        return 0
      },
      // 获取新的日期列表  几月几日 从今天开始 往后数8天
      getNewDayList: function (index, defaultValue) {
        let self = this
        let list = '<li></li><li></li>'
        let defaultNum = ''
        let oneDay = 86400000
        let now = new Date()
        let dayMap = ['日', '一', '二', '三', '四', '五', '六']
        for (let j = 0; j <= 7; j++) {
          let year = new Date(now.getTime() + oneDay * j).getFullYear()
          let month = (new Date(now.getTime() + oneDay * j).getMonth()) + 1
          let date = new Date(now.getTime() + oneDay * j).getDate()
          let day = new Date(now.getTime() + oneDay * j).getDay()
          //   let hours = new Date().getHours()
          //   if(hours > 22){

          //   }
          let value = year + '-' + month + '-' + date
          let show = month + '月' + date + '日'
          if (j === 0) {
            show = '今天' + show
            self.setDefaultItem(index, value)
          } else if (j === 1) {
            show = '明天' + show
          } else if (j === 2) {
            show = '后天' + show
          } else {
            show = '周' + dayMap[day] + '<span class="spaces"></span>' + show
          }

          list += '<li data-value="' + value + '">' + show + '</li>'
        }
        list += '<li></li><li></li>'
        document.querySelector(
          '#picker-wrapper' + index
        ).childNodes[0].innerHTML = list
        setTimeout(function () {
          self.scrollInit(index, defaultNum)
        }, 0)
      },
      getHourList: function (index, defaultValue) {
        let self = this
        let list = '<li></li><li></li>'
        let defaultNum = ''
        let count = ''

        let unit = '时'
        let prefix = '0'
        if (self.options.type === 5) {
          unit = ''
          prefix = ''
        }
        defaultValue = parseInt(defaultValue, 10)
        if (defaultValue) {
          let num = 0
          let isMatch = false
          for (let i = 0; i <= 23; i++) {
            count = i < 10 ? prefix + i : i
            if (defaultValue === i) {
              isMatch = true
              defaultNum = num // 默认选中的值
              self.setDefaultItem(index, count)
            }
            list += '<li  data-value="' + count + '">' + count + unit + '</li>'
            num++
          }

          if (!isMatch) {
            self.setDefaultItem(index, ' 01')
          }
        } else {
          for (let j = 0; j <= 23; j++) {
            count = j < 10 ? prefix + j : j
            list += '<li  data-value=" ' + count + '"  class="sethours">' + count + unit + '</li>'
          }
          let date = new Date()
          let hour = ' ' + (date.getHours() + 1)
          self.setDefaultItem(index, hour)
        }

        list += '<li></li><li></li>'
        document.querySelector(
          '#picker-wrapper' + index
        ).childNodes[0].innerHTML = list
        setTimeout(function () {
          self.scrollInit(index, defaultNum)
        }, 0)
      },
      getMinuteList: function (index, defaultValue) {
        let self = this
        let list = '<li></li><li></li>'
        list += '<li data-value=":00">00</li>'
        list += '<li data-value=":30">30</li>'

        list += '<li></li><li></li>'
        self.setDefaultItem(index, ':00')
        document.querySelector(
          '#picker-wrapper' + index
        ).childNodes[0].innerHTML = list
        setTimeout(function () {
          self.scrollInit(index, 0)
        }, 0)
      }

    }

    return Picker
  }
})
