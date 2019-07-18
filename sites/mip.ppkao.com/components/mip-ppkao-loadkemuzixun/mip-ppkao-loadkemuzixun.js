/**
 * @file mip-ppkao-loadkemuzixun 组件
 * @author
 */
export default class MIPExample extends MIP.CustomElement {
  build () {
    'use strict'
    let $ = require('zepto')
    let customElement = require('customElement').create()

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
      let ele = $(this.element)
      let questionsContainer = ele.find('.questions-container')
      let xscs = true
      let url = '//data.api.ppkao.com/Interface/PageAPI.ashx?action=GetSpecialsTJZD'
      this.addEventAction('loadkemuevent', function (event, str) {
        getInfoClick()
        function getInfoClick () {
          if (xscs) {
            questionsContainer.html(
              '<div class=\'loading\'>' +
              '<mip-img src=\'http://static.ppkao.com/phone/new/image/sx.gif\'></mip-img>正在加载...' +
              '</div>'
            )
            viewMore()
          }
        }
        function viewMore () {
          xscs = false
          $.ajax({
            url: url + str,
            type: 'POST',
            dataType: 'json',
            cache: false,
            success: function (data) {
              xscs = true
              let list = data
              if (list.List === '') {
                return
              }
              questionsContainer.html(list.List)
            }
          })
        }
      })
    }

    return customElement
  }
}
