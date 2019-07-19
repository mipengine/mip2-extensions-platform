/**
 * @file mip-ppkao-tikuqiehuan 组件
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
      let tkLi = ele.find('.tk_kinds li')
      let tkLiall = ele.find('.all_lis')
      let tkLizj = ele.find('.zj_lis')
      let tkLimr = ele.find('.mr_lis')
      let zjBox = ele.find('#zhangjielianxi')
      let mrBox = ele.find('#meiriyilian')
      tkLi.on('click', function () {
        $(this).addClass('tk_ons').siblings().removeClass('tk_ons')
      })
      tkLiall.on('click', function () {
        zjBox.show()
        mrBox.show()
      })
      tkLizj.on('click', function () {
        zjBox.show()
        mrBox.hide()
      })
      tkLimr.on('click', function () {
        mrBox.show()
        zjBox.hide()
      })
    }

    return customElement
  }
}
