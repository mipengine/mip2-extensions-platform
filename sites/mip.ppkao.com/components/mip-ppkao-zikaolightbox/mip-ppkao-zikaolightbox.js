/**
 * @file mip-ppkao-zikaolightbox 组件
 * @author
 */
import './index.less'
export default class MIPPpkaoZikaolightbox extends MIP.CustomElement {
  build () {
    let $ = require('zepto')
    let customElement = require('customElement').create()

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
      // 点击选中状态
      let ele = $(this.element)
      let xlIcon = ele.find('.xia_icon')
      let adText = ele.find('.ad_text_s')
      let zikaoLis = ele.find('.ad_tkBox ul li')
      let zikaoBox = ele.find('.ad_tkBox')
      // 地区选中
      xlIcon.on('click', function () {
        zikaoBox.toggle(200)
      })
      zikaoLis.on('click', function () {
        $(this).addClass('lis_on').siblings().removeClass('lis_on')
        adText.text($(this).text())
        zikaoBox.hide()
      })
    }

    return customElement
  }
}
