/**
 * @file mip-ppkao-tiku 组件
 * @author
 */
import './index.less'
export default class MIPPpkaoKaozs extends MIP.CustomElement {
  build () {
    'use strict'
    let $ = require('zepto')
    // let viewport = require('viewport')
    let customElement = require('customElement').create()

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
      let ele = $(this.element)
      let headT = ele.find('.infor_header')
      let contentB = ele.find('.home_con_b')
      let contentC = ele.find('.infor_bottom')
      let iHeight = headT.height()
      let homeLis = ele.find('.home_con_box ul li')
      contentB.css('margin-top', iHeight + 'px')
      contentC.css('margin-top', iHeight + 'px')
      homeLis.on('click', function () {
        let index = $(this).index()
        $(this).addClass('home_lis').siblings().removeClass('home_lis')
        $(this).parent().next().find('.home_hyk').hide().eq(index).show()
      })
    }
    return customElement
  }
}
