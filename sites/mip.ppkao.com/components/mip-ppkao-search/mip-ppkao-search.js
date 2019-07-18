/**
 * @file mip-ppkao-search 组件
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
      let lengThi = ele.find('.sub_list ul')
      let nowCho = ele.find('.nowchoice p')
      let subLi = ele.find('.sub_list ul li a')
      let searchInput = ele.find('.searchText')
      let searchButton = ele.find('.searchBtn')
      searchButton.click(function () {
        nowCho.siblings().hide()
        nowCho.show()
        let value = $('.searchText').val()
        if (value !== '') {
          let abc = $('.sub_list ul li a[name*=' + value + ']')
          nowCho.text('您搜索的关键字是：' + value)
          lengThi.find('a').removeClass('flagcolor')
          abc.addClass('flagcolor')
          for (let j = 0; j < abc.length; j++) {
            let aText = abc[j].innerHTML
            let aHref = abc[j].href
            nowCho.after('<a id="' + j + '"></a>')
            $('#' + j).text(aText)
            $('#' + j).attr('href', aHref)
          }
          if ($('.sub_list ul li a[name*=' + value + ']').hasClass('flagcolor') === false) {
            nowCho.text('没有找到与' + value + '相关的科目')
          } else { }
        } else {
          nowCho.text('您没有填写关键字')
        }
      })
      searchInput.click(function () {
        nowCho.siblings().hide()
        subLi.removeClass('flagcolor')
        nowCho.hide()
        $('.searchText').val('')
      })
    }

    return customElement
  }
}
