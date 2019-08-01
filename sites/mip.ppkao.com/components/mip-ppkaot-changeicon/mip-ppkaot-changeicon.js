/**
 * @file mip-ppkaot-changeicon 组件
 * @author
 */
export default class MIPChangeicon extends MIP.CustomElement {
  build () {
    let $ = require('zepto')
    let customElement = require('customElement').create()

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
      let ele = $(this.element)
      let textT = ele.find('.toggle_text_in span')
      let zkIcon = ele.find('.toggle_text_in i')
      textT.on('click', function () {
        if (textT.text() === '收起') {
          zkIcon.removeClass('ss_icon')
        } else {
          zkIcon.addClass('ss_icon')
        }
      })
    }

    return customElement
  }
}
