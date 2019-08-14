import './provinceSelect.less'
import util from './../util'
import { GP_EN, GC1 } from './city-info.js'

class Select {
  constructor (GP_EN = [], GC1 = [], option) {
    // 配置默认参数
    this.config = Object.assign({
      targetDom: '#area', // 绑定的目标表单
      data: [{'province': GP_EN}, {'city': GC1}], // 下拉里面的所需要的参数,以key-value形式传入,key可作为对应value的class
      forDom: '#froms', // 当前表单form
      markClass: 'on', // 控制选择到的下拉选项
      dataHandle: null, // 自定义组装数据
      hideBox: null, // 自定义隐藏动画或逻辑
      callback: function () {
      }
    }, option)

    this.moveMark = false // 判断是点击还是触摸移动
    this.animate = false
    this.areaMove = false
    this.$dom = null
    this.inputParent = []
    this.clickIndex = 0 // 当一个页面中初始化多个城市节点时
    // this.inputParent = inputParent.length > 0 ? inputParent[0].parentElement : null
    this.startY = -1
    this.originY = -1
    this.stopTime = 0
    this.time = 0
  }

  dataHandle () {
    let areaSelect = '' // 组件的select
    // [{'province': GP_EN}, {'city': GC1}]
    let proLen = this.config.data.length
    // let data = 0
    let key = ''
    let li = ''
    let arr = []
    let select = ''
    for (let i = 0; i < proLen; i++) {
      li = ''
      // data = this.config.data[i] // 'province'
      // this.config.data[i] // {'province': GP_EN}
      if (i === 0) {
        // province
        key = 'province'
        arr = this.config.data[i][key]
      } else if (i === 1) {
        // city
        key = 'city'
        arr = this.config.data[i][key]['A 安徽']
      }
      select = `<div class="mip-select mip-${key}">
                    <ul class="mip-select-${key}">` // 将key加上mip-select前缀class
      for (let k = 0; k < arr.length; k++) {
        let str = ''
        if (key === 'city') {
          str = arr[k]
        } else {
          str = `<span>${arr[k].substring(2, -1)}</span>${arr[k].substring(2)}`
        }
        li += `<li data-handle="${arr[k]}" class="${(key === 'city' ? '' : (k === 0 ? this.config.markClass : ''))}">
                     <div class="mip-select-option">${str}</div>
                 </li>`
      }
      li += '</ul></div>'
      select += li
      areaSelect += select
    }
    return areaSelect
  }

  createBox () {
    // 如果有自定义组装函数就执行自定义组装函数
    const areaSelect = typeof this.config.dataHandle === 'function' ? this.config.dataHandle() : this.dataHandle()
    // const areaSelectBox = document.querySelectorAll('.mip-select-obj')
    const str = `<div class="mip-select-background"></div>
                 <div class="mip-select-obj mip-mark">
                    ${areaSelect}
                 </div>`
    const areaSelectDiv = document.createElement('div')
    areaSelectDiv.className = 'mip-select-box'
    areaSelectDiv.innerHTML = str
    this.config.$dom = areaSelectDiv
    if (document.querySelectorAll('.mip-select-box').length < 1) {
      document.body.appendChild(this.config.$dom)
    }
  }

  // 填充第二行数据
  fillCity (dataFont, city, cityText) {
    dataFont = dataFont || 'A 安徽'
    const areaSelectCity = document.createElement('ul')
    areaSelectCity.className = 'mip-select-city'
    const dataFontLen = this.config.data[1]['city'][dataFont].length
    let cityInfo = city

    for (let key = 0; key < dataFontLen; key++) {
      cityInfo += `<li class="${(this.config.data[1]['city'][dataFont][key] === cityText ? this.config.markClass : '')}">
            <div class="mip-select-option">${this.config.data[1]['city'][dataFont][key]}</div>
        </li>`
    }

    areaSelectCity.innerHTML = cityInfo
    document.querySelectorAll('.mip-city')[0].innerHTML = ''
    document.querySelectorAll('.mip-city')[0].append(areaSelectCity)
  };

  setUlTop (height) {
    const ulDom = document.querySelector('.mip-select-province')
    if (ulDom) {
      // ul.className += ' transition-select'
      ulDom.style.transform = `translateY(${height}px)`
      ulDom.dataset.top = height
    }
  }

  // 如果输入框里面有值,则展示出来 并且省滑块自动定位到选中省
  selectFill (index) {
    const cityArr = document.querySelectorAll(this.config.targetDom)[index].value.split(' ') || []
    const ul = this.config.$dom.querySelector('.mip-select-province')
    let onHandle = ''
    if (cityArr && cityArr.length > 0) {
      const liDom = ul.querySelectorAll('li')
      let height = 0
      for (let i = 0; i < liDom.length; i++) {
        let handle = liDom[i].dataset.handle || ''
        util.removeClass(liDom[i], 'on')
        if (cityArr[0] === handle.substring(2)) {
          // util.removeClass(ul.querySelectorAll('.on')[0], 'on')
          util.addClass(liDom[i], 'on')
          onHandle = handle

          // 定位
          height = -liDom[i].offsetTop
          this.setUlTop(height)
        }
      }
      if (ul.querySelectorAll('.on').length < 1) {
        util.addClass(liDom[0], 'on')
        height = -liDom[0].offsetTop
        this.setUlTop(height)
      }
      this.fillCity(onHandle, '', cityArr[1])
    }
  }

  /* 关闭select */
  hideBox () {
    // 如果存在自定义关闭函数则执行自定义函数
    if (typeof this.config.hideBox === 'function') {
      this.config.hideBox()
      return
    }

    // 接触事件绑定
    // this.config.$dom.removeEventListener('touchstart')

    // 点击灰色背景关闭select
    // this.config.$dom.querySelectorAll('.mip-select-background')[0].removeEventListener('touchstart', this.ePreventDefault)

    // 点击获取触摸点
    // this.config.$dom.querySelectorAll('.mip-select')[0].removeEventListener('touchstart', this.selectTouchStart)

    // 下拉选项里面如果是上下滑动不触发点击
    // this.config.$dom.querySelectorAll('.mip-select')[0].removeEventListener('touchmove', this.selectTouchMove)

    // 触摸离开
    // this.config.$dom.querySelectorAll('.mip-select')[0].removeEventListener('touchend', this.selectTouchEnd)

    // $(document.body).removeAttr('style');
    util.addClass(this.config.$dom.querySelectorAll('.mip-select-obj')[0], 'mip-mark')

    let clearT = setTimeout(() => {
      clearTimeout(clearT)
      // 隐藏节点
      this.config.$dom.style.display = 'block'
      document.querySelector('.mip-select-box').style.display = 'none'
    }, 400)
  }

  initialize () {
    const inputParent = document.querySelectorAll(this.config.targetDom) || []

    Array.prototype.forEach.call(inputParent, (item, index) => {
      item.dataset.index = index
      this.inputParent.push(item)
    })

    if (this.inputParent && this.inputParent.length > 0) {
      Array.prototype.forEach.call(this.inputParent, (item) => {
        item.addEventListener('touchstart', () => {
          this.areaMove = false
        })

        item.addEventListener('touchmove', () => {
          this.areaMove = true
        })

        item.addEventListener('touchend', () => {
          const index = item.dataset.index
          this.clickIndex = index
          // this.areaMove = true
          // const id = e.target.id
          if (!this.areaMove) {
            if (document.querySelectorAll('.mip-select-box').length < 1) {
              this.createBox()
              // 绑定事件
              this.event() // 给节点绑定事件
            } else {
              this.config.$dom.style.display = 'block'
            }
            this.areaMove = false

            this.animate = true

            document.querySelectorAll(this.config.forDom)[0].querySelectorAll('input,select')[0].blur()
            this.selectFill(index)

            this.config.$dom.style.display = 'block' // 样式表中的block不能使用 ''覆盖
            setTimeout(() => {
              util.removeClass(this.config.$dom.querySelectorAll('.mip-select-obj')[0], 'mip-mark')
            }, 0)// 节点显示完毕后才移除class确保css动画执行
            setTimeout(() => {
              this.animate = false
            }, 400)
          }
        })
      })
    }
  }
  event () {
    // const self = this
    if (document.querySelectorAll(this.config.targetDom).length > 0) {
      Array.prototype.forEach.call(document.querySelectorAll(this.config.targetDom), (item) => {
        item.setAttribute('readonly', true)
      })
    }

    this.config.$dom.addEventListener('touchstart', this.ePreventDefault)
    // 点击灰色背景关闭select
    this.config.$dom.querySelectorAll('.mip-select-background')[0].addEventListener('touchstart', (e) => {
      e.preventDefault()
      if (!this.animate) {
        this.animate = true
        this.hideBox()
      }
    })
    Array.prototype.forEach.call(this.config.$dom.querySelectorAll('.mip-select'), (item) => {
      item.addEventListener('touchstart', (e) => {
        e.preventDefault()
        const targetDom = e.target
        if (e.changedTouches) {
          this.startY = e.changedTouches[0].pageY
        }
        if (e.changedTouches) {
          this.originY = e.changedTouches[0].pageY
        }
        let li
        // 如果点到的是li下的div
        if (targetDom.className.includes('mip-select-option')) {
          li = targetDom.parentElement
        } else if (targetDom.parentElement.className.includes('mip-select-option')) {
          li = targetDom.parentElement.parentElement
        } else {
          li = targetDom
        }
        this.stopTime = setInterval(() => {
          this.time++
          if (this.time > 20 && !li.className.includes('mip-background-tab')) {
            util.addClass(li, 'mip-background-tab')
          }
        }, 10)
      })
    })

    // 下拉选项里面如果是上下滑动不触发点击
    Array.prototype.forEach.call(this.config.$dom.querySelectorAll('.mip-select'), (item) => {
      item.addEventListener('touchmove', (e) => {
        const select = e.currentTarget // 当前触发事件的元素
        const ul = e.currentTarget.querySelectorAll('ul')[0] // 触发元素下的ul
        let moveY = 0 // 移动后的Y坐标
        if (e.changedTouches) {
          moveY = e.changedTouches[0].pageY
        }
        const move = this.startY - moveY // 移动的位置 ++↑  --↓
        const heightSelect = select.offsetHeight // 当前作为窗口的高度
        const heightUl = ul.offsetHeight // 窗口里面内容的高度
        let height = heightSelect - heightUl // 两个容器高度差就是ul最大移动距离
        const top = parseInt(ul.dataset.top || 0, 10) // 获取当前元素的top 之前没有移动则为undefined
        if (moveY !== this.startY) {
          this.moveMark = true
          this.startY = moveY // 将当前移动的坐标覆盖开始值
        }
        if (Math.abs(this.startY - this.originY) >= 4) {
          clearInterval(this.stopTime)
          Array.prototype.forEach.call(ul.querySelectorAll('.mip-background-tab'), (item) => {
            util.removeClass(item, 'mip-background-tab')
          })
        }
        if (height < 0) { // 高度差大于0则说明窗口里面内容不用移动
          if (e.changedTouches && e.changedTouches[0].clientY <= -1 && top <= height) {
            util.addClass(ul, 'transition-select')
            ul.style.transform = `translateY(${height}px)`
            ul.dataset.top = height
            setTimeout(() => {
              util.removeClass(ul, 'transition-select')
            }, 500)
            return
          }
          // 如果移动后top大于0则为0   移动后top小于高度差说明移动到最大距离
          const m = (top - move) >= 86 ? 86 : (top - move) <= (height - 86) ? (height - 86) : (top - move)
          ul.dataset.top = m
          ul.style.transform = `translateY(${m}px)`
        }
      })
    })

    // 触摸离开
    Array.prototype.forEach.call(this.config.$dom.querySelectorAll('.mip-select'), (item) => {
      item.addEventListener('touchend', (e) => {
        // 如果是上下滑动不执行后续动作
        this.time = 0
        clearInterval(this.stopTime)
        const ul = e.currentTarget.querySelectorAll('ul')[0]
        const height = e.currentTarget.offsetHeight - ul.offsetHeight
        ul.className += ' transition-select'
        if (ul.dataset.top >= 0) {
          ul.style.transform = 'translateY(0px)'
          ul.dataset.top = 0
        } else if (ul.dataset.top <= height) {
          ul.style.transform = `translateY(${height}px)`
          ul.dataset.top = height
        }
        setTimeout(() => {
          util.removeClass(ul, 'transition-select')
        }, 500)
        util.removeClass(e.currentTarget.querySelectorAll('.mip-background-tab')[0], 'mip-background-tab')
        if (this.moveMark && Math.abs(this.startY - this.originY) >= 4) {
          this.moveMark = false
          return
        }
        const targetDom = e.target // 当前点击的元素
        let dataFont = '' // mip-select-province里面text
        let city = '' // mip-select-city里面的text
        let li = '' // 当前点击的li

        // 如果点到的是li下的div
        if (targetDom.className.includes('mip-select-option')) {
          li = targetDom.parentElement
        } else if (targetDom.parentElement.className.includes('mip-select-option')) {
          li = targetDom.parentElement.parentElement
        } else {
          li = targetDom
        }
        // 如果点击的是第一行选项 给第二行填充对应数据
        if (li.parentElement.className.includes('mip-select-province')) {
          dataFont = li.dataset.handle
          this.fillCity(dataFont, city)
        }
        if (li.className.includes('mip-select')) {
          return
        }
        Array.prototype.forEach.call(li.parentElement.querySelectorAll(`.${this.config.markClass}`), (item) => {
          util.removeClass(item, this.config.markClass)
        })
        // util.removeClass(li.parentElement.querySelectorAll(`.${this.config.markClass}`), this.config.markClass)
        util.addClass(li, this.config.markClass)

        // 如果点击的是第二行，选择城市
        if (targetDom.className.includes('mip-select-option')) {
          li = targetDom.parentElement
        } else if (targetDom.parentElement.className.includes('mip-select-option')) {
          li = targetDom.parentElement.parentElement
        } else {
          li = targetDom
        }

        Array.prototype.forEach.call(li.parentElement.querySelectorAll(`.${this.config.markClass}`), (item) => {
          util.removeClass(item, this.config.markClass)
        })
        // util.removeClass(li.parentElement.querySelectorAll(`.${this.config.markClass}`), this.config.markClass)
        util.addClass(li, this.config.markClass)

        // 如果点击的是第二行 则关闭select
        // if (li.parentElement.className.includes('mip-select-city')) {
        // 将之前的选择标记干掉 给点击的li加上标记
        // 拿到两个选择的text 填充到目标表单 然后执行关闭动画
        if (util.hasClass(li.parentElement, 'mip-select-city')) {
          const province = this.config.$dom.querySelectorAll('.mip-select-province')[0].querySelectorAll(`.${this.config.markClass} .mip-select-option`)[0].textContent
          city = this.config.$dom.querySelectorAll('.mip-select-city')[0].querySelectorAll(`.${this.config.markClass} .mip-select-option`)[0].textContent

          document.querySelectorAll(this.config.targetDom)[this.clickIndex].value = `${province.substring(2)} ${city}`
          this.animate = true
          this.config.callback()
          this.hideBox()
        }
      })
    })
  }

  ePreventDefault (e) {
    e.preventDefault()
  }
}

// 声明城市初始化
class ProvincesSelect {
  initialize (option) {
    new Select(GP_EN, GC1, option).initialize()
  }
}
const provinceSelect = new ProvincesSelect()

export default provinceSelect
