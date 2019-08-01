/**
 * @file mip-ppkao-lightbox 组件
 * @author
 */
export default class MIPLightbox extends MIP.CustomElement {
  build () {
    let $ = require('zepto')
    let customElement = require('customElement').create()

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
      // 点击选中状态
      let ele = $(this.element)
      let tkBox = ele.find('.ad_tkBox_y')
      let tkBox0 = ele.find('.ad_tkBox_s0')
      let adLi = ele.find('.ad_tkBox_y ul li')
      let allLi = ele.find('.all_li')
      let country = ele.find('.ad_tkBox_s0 ul li')
      let kindIcon = ele.find('#all_icons0')
      let kindIcon0 = ele.find('#all_icons')
      let fls = ele.find('.fls_s')
      let frs = ele.find('.frs_s')
      kindIcon.on('click', function () {
        tkBox.toggle(200)
      })
      kindIcon0.on('click', function () {
        tkBox0.toggle(200)
      })
      // 全部按钮
      allLi.on('click', function () {
        fls.addClass('flOn')
        fls.text($(this).text())
        tkBox.hide()
      })
      // 地区选中
      country.on('click', function () {
        $(this).addClass('lis_on0').siblings().removeClass('lis_on0')
        frs.addClass('flOn')
        frs.text($(this).text())
        tkBox0.hide()
      })
      adLi.on('click', function () {
        fls.addClass('flOn')
        fls.text($(this).text())
        tkBox.hide()
        $(this).addClass('lis_on').siblings().removeClass('lis_on')
        $(this).find('i').addClass('gou_icon').parent().siblings().find('i').removeClass('gou_icon')
      })
      allLi.on('click', function () {
        $(this).toggleClass('active_all')
        if ($(this).hasClass('active_all')) {
          adLi.addClass('lis_on')
          adLi.find('i').addClass('gou_icon')
        } else {
          adLi.removeClass('lis_on')
          adLi.find('i').removeClass('gou_icon')
        }
      })
    }

    return customElement
  }
}
