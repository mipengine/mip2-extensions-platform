/**
 * @file mip-ppkao-slidetoggle 组件
 * @author
 */
export default class MIPSlidetoggle extends MIP.CustomElement {
  build () {
    let $ = require('zepto')
    let customElement = require('customElement').create()

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
      let ele = this.element
      let showmore = $(ele)
      let button = showmore.parents('.kaoshi-fenlei').find('.title')
      button.on('click', function () {
        showmore.toggle(400)
      })
      let questionsContainer = showmore.parents('.kaoshi-fenlei').find('.questions-container')
      let xscs = true
      let url = '//api.ppkao.com/Interface/PageAPI.ashx?action=GetSpecialsTJZD'
      showmore.find('.kemulist li').on('click', function () {
        button.find('b').text($(this).text())
        let CategoryID = $(this).data('categoryid')
        let ChannelID = $(this).data('channelid')
        getInfoClick(CategoryID, ChannelID)
        function getInfoClick (CategoryID, ChannelID) {
          if (xscs) {
            questionsContainer.html(
              '<div class=\'loading\'>' +
              '<mip-img src=\'http://static.ppkao.com/phone/new/image/sx.gif\'></mip-img>正在加载...' +
              '</div>'
            )
            viewMore(CategoryID, ChannelID)
          }
        }
        function viewMore (CategoryID, ChannelID) {
          xscs = false
          $.ajax({
            url: url + '&CategoryID=' + CategoryID + '&ChannelID=' + ChannelID,
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
