/**
 * @file mip-ppkao-table 组件
 * @author
 */
import './index.less'
export default class MIPPpkaoTable extends MIP.CustomElement {
  build () {
    let $ = require('zepto')
    let customElement = require('customElement').create()

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
      // 表格
      let ele = $(this.element)
      let tableCon = ele.find('.cd-table-container')
      let fixed = ele.find('.cd-table-column').width()
      let showBox = ele.find('#showmore02')
      tableCon.on('scroll', function () {
        if (tableCon.scrollLeft() >= fixed) {
          showBox.removeClass('linear-gradient')
        } else {
          showBox.addClass('linear-gradient')
        }
      })
    }

    return customElement
  }
}
