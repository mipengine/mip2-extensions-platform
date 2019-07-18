/**
 * @file mip-ppkao-kaotilightbox 组件
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
      let showBtn = ele.find('.m_q_btn p')
      let showBox = ele.find('.analysis_box')
      let anserIcon = ele.find('.m_q_btn p i')
      // 显示
      showBtn.on('click', function () {
        showBox.show()
        let dBox = ele.find('.analysis_box').css('display')
        if (dBox === 'block') {
          $(this).addClass('answer_btn')
          anserIcon.addClass('answer_icon')
        } else if (dBox === 'none') {
          $(this).removeClass('answer_btn')
          anserIcon.removeClass('answer_icon')
        }
      })
    }

    return customElement
  }
}
