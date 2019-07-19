/**
 * @file mip-ppkao-rotate 组件
 * @author
 */
export default class MIPExample extends MIP.CustomElement {
  build () {
    let $ = require('zepto')
    let customElement = require('customElement').create()

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
      let ele = this.element
      let button = $(ele).parents('.title')
      button.on('click', function () {
        let rotateDeg = ele.dataset.rotate ? ele.dataset.rotate : '90deg'
        if (ele.classList.contains('active')) {
          ele.classList.remove('active')
          ele.style.transform = 'rotate(0)'
        } else {
          ele.classList.add('active')
          ele.style.transform = 'rotate(' + rotateDeg + ')'
        }
      })
    }

    return customElement
  }
}
