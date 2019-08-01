/**
 * @file mip-ppkao-dropdown 组件
 * @author
 */
import './index.less'
export default class MIPPpkaoDropdown extends MIP.CustomElement {
  build () {
    let $ = require('zepto')
    let customElement = require('customElement').create()

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
      $('.select-category ul li').on('click', function () {
        $(this).find('.rotate').toggleClass('active')
        $(this).siblings('li').find('.rotate').removeClass('active')

        let index = $(this).index()

        $('mip-ppkao-dropdown').find('ul li').eq(index).siblings('li').hide()
        $('mip-ppkao-dropdown').find('ul li').eq(index).toggle(200)
      })
    }

    return customElement
  }
}
