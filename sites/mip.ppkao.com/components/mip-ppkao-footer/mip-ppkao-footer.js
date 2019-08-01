/**
 * @file mip-ppkao-footer 组件
 * @author
 */
import './index.less'
export default class MIPPpkaoFooter extends MIP.CustomElement {
  build () {
    'use strict'
    let $ = require('zepto')
    let customElement = require('customElement').create()

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
      let ele = $(this.element)
      let pcurl = window.location.href
      pcurl = pcurl.replace('m.ppkao.com', 'www.ppkao.com')
      if (!/#m/.test(pcurl)) {
        pcurl = pcurl + '#m'
      }
      ele.find('#pcb').attr('href', pcurl)
    }

    return customElement
  }
}
