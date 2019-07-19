/*
 * @file mip-ppkao-zixun 组件
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
      let ele = $(this.element)
      let zxKinds = ele.find('.zx_kinds ul li:nth-child(4n)')
      let zxKul = ele.find('.zx_kinds ul li')
      zxKinds.css({ 'margin-right': '0' })
      zxKul.click(function () {
        $(this).toggleClass('zx_lis')
      })
    }

    return customElement
  }
}
