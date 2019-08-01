/**
 * @file mip-ppkao-fontsizechange 组件
 * @author
 */
export default class MIPFontsizechang extends MIP.CustomElement {
  build () {
    'use strict'
    let $ = require('zepto')
    let customElement = require('customElement').create()

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
      let ele = $(this.element)
      let fontSize = parseInt(ele.css('font-size'), 10)
      this.addEventAction('bigfont', function (event) {
        event.preventDefault()
        $(event.target).addClass('current').siblings('.changefont').removeClass('current')
        if (fontSize <= 28) {
          fontSize++
          ele.css('font-size', fontSize)
        }
      })
      this.addEventAction('smallfont', function (event) {
        event.preventDefault()
        $(event.target).addClass('current').siblings('.changefont').removeClass('current')
        if (fontSize >= 12) {
          fontSize--
          ele.css('font-size', fontSize)
        }
      })
    }

    return customElement
  }
}
