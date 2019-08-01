/*
 * @file mip-ppkao-zixun 组件
 * @author
 */
export default class MIPZixun extends MIP.CustomElement {
  build () {
    let $ = require('zepto')
    let customElement = require('customElement').create()

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
      // let ele = this.element
      $(document).ready(function () {
        let jsonstr = document.getElementById('tongjidata').text
        if (jsonstr !== null && jsonstr !== '' && jsonstr !== 'undefined') {
          let json = JSON.parse(jsonstr)
          let Id = json.Id
          let CategoryID = json.CategoryID
          $.ajax({
            type: 'get',
            async: false,
            url: '//newapi.ppkao.com/api/ArticlePraiseApi/GetAddClicksCount?id=' + Id + '&cid=' + CategoryID,
            dataType: 'jsonp',
            cache: true,
            contentType: 'application/x-www-form-urlencodedcharset=utf-8',
            jsonp: 'callbackClicksCount',
            jsonpCallback: 'callbackClicksCount',
            success: function (data) {
            }
          })
        }
      })
    }

    return customElement
  }
}
