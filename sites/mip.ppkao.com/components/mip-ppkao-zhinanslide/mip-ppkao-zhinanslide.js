/**
 * @file mip-ppkao-zhinanslide 组件
 * @author
 */
import './index.less'
export default class MIPPpkaoZhinanslide extends MIP.CustomElement {
  build () {
    let $ = require('zepto')
    let customElement = require('customElement').create()

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
      let ele = this.element
      let showmore = $(ele)
      showmore.hide()
      let button = showmore.parents('.kaoshi-fenlei').find('.title')
      button.on('click', function () {
        showmore.toggle(400)
      })
    }

    return customElement
  }
}
