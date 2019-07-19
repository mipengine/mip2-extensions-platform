/**
 * @file mip-form 组件
 *
 * @author fengchuantao
 * @time 2016.7.28
 * @modify wangpei07 2016.11.21, liangjiaying 2017.01
 */
export default class MIPExample extends MIP.CustomElement {
  build () {
    let customElement = require('customElement').create()
    let util = require('util')
    let form = require('./mip-form-fn')
    function clear(e) {
      e.stopPropagation()
      e.preventDefault()
      let name = e.target.getAttribute('name')
      let inputSelect = cross.parentNode.querySelector('input[name="' + name + '"]')
      inputSelect.focus()
      inputSelect.value = ''
      util.css(cross, { display: 'none' })
    }
    /**
     * [build build函数]
     */
    customElement.prototype.build = function () {
      let element = this.element
      let addClearBtn = element.hasAttribute('clear')
      form.createDom(element)

      if (addClearBtn) {
        let clearArr = ['text', 'input', 'datetime', 'email', 'number', 'search', 'tel', 'url']
        let clearList = ''
        for (let i in clearArr) {
          clearList += ',input[type=' + clearArr[i] + ']'
        }
        clearList = clearList.slice(1)
        // clearItems为类数组对象
        let clearItems = element.querySelectorAll(clearList)

        if (!clearItems.length) {
          return
        }

        let cross = document.createElement('div')
        cross.id = 'mip-form-cross'
        this.cross = cross

        for (let index = 0; index < clearItems.length; index++) {
          let height = clearItems[index].offsetHeight
          clearItems[index].addEventListener('focus', function () {
            let self = this
            cross.setAttribute('name', self.getAttribute('name'))
            util.css(cross, {
              top: self.offsetTop + (height - 16) / 2 - 8 + 'px',
              left: self.offsetWidth - 32 + 'px'
            })
            self.parentNode.appendChild(cross)
            if (self.value !== '') {
              util.css(cross, { display: 'block' })
            } else {
              util.css(cross, { display: 'none' })
              self.addEventListener('input', function () {
                if (util && util.platform && util.platform.isAndroid() && self.type === 'search') {
                  // andriod type=search自带清空按钮, 不显示清空
                  return
                }
                util.css(cross, { display: (self.value !== '' ? 'block' : 'none') })
              })
            }
          }, false)
          // 点击提交时，如果报错信息展示，则隐藏清空按钮
          clearItems[index].addEventListener('blur', function () {
            util.css(cross, { display: 'none' })
          }, false)
        }
        cross.addEventListener('touchstart', clear, false)
        cross.addEventListener('mousedown', clear, false)
        cross.addEventListener('click', clear, false)

      }
      form.initMessageEvents(element)
    }
    return customElement
  }
}
