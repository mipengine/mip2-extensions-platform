/**
 * @file mip-ppkao-encode 组件
 * @author
 */
export default class MIPEncode extends MIP.CustomElement {
  build () {
    'use strict'
    let $ = require('zepto')
    let customElement = require('customElement').create()

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
      let ele = $(this.element)
      let charset = ele.attr('accept-charset') ? ele.attr('accept-charset') : 'utf-8'
      ele.find('form').attr('accept-charset', charset)
    }

    return customElement
  }
}
