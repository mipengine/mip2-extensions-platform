/**
 * @file 菜单 mip-nav-slidedown
 * @author liangjiaying
 * @time 2016.09
 */
let customElement = require('customElement').create()
let $ = require('zepto')

/**
     * 渲染dom
     *
     * @param  {obj} me this
     */
function render (me) {
  let $this = $(me)
  let id = $this.data('id')
  let showBrand = !($this.data('showbrand') === 0)
  let brandName = $this.data('brandname') || ''
  let brandHref = $this.data('brandhref') || '#'
  let $ulNav = $this.find('#' + id)
  let $container = $('<div></div>')
  let $btnWrap = '<div class="navbar-header">' +
    '<button class="navbar-toggle collapsed" type="button" data-target="#' +
    id + '" aria-controls="' + id + '" aria-expanded="false">' +
    '<span class="sr-only">导航</span>' +
    '<span class="icon-bar"></span>' +
    '<span class="icon-bar"></span>' +
    '<span class="icon-bar"></span>' +
    '</button>' +
    (showBrand ? '<a href=' + brandHref + ' class="navbar-brand">' + brandName + '</a>' : '') +
    '</div>'
  $container.append($btnWrap).append($ulNav).appendTo($this)
  $('.mip-nav-wrapper').addClass('show')
}

/**
 * 绑定事件
 *
 * @param  {obj} me this
 */
function bindEvents (me) {
  let bodyClass = $('body').attr('class')
  $('#bs-navbar').find('.' + bodyClass).addClass('active')

  $(document).on('click', '.navbar-header .navbar-toggle', navClickHandler)

  // 主菜单关闭按钮 touchstart touchend mousedown mouseup变色
  addHoverClass($('#navbar-wise-close-btn'))
  $('#navbar-wise-close-btn').on('touchend', function (e) {
    $('.navbar-header .navbar-toggle').trigger('click')
    e.preventDefault()
    e.stopPropagation()
  }).on('click', function () {
    $('.navbar-header .navbar-toggle').trigger('click')
  })
}

/**
 * 展开关闭菜单效果
 *
 * @param  {event} e click event
 */
function navClickHandler (e) {
  if (window.innerWidth > 767) {
    return
  }

  let $wiseNav = $('#bs-navbar')

  if ($wiseNav.hasClass('in')) {
    // 关闭菜单
    $wiseNav.height('0px')
    $('body').css('overflow', 'scroll')
    $('.navbar-wise-close').css('margin-top', '20px')
    $(window).off('orientationchange')
    $('html').add($('body')).removeClass('noscroll')
    setTimeout(function () {
      $wiseNav.removeClass('in')
    }, 500)
  } else {
    // 打开菜单
    let closeBtnTop = 20
    $wiseNav = $('#bs-navbar')

    $('html').add($('body')).addClass('noscroll')
    setNavHeight('open')

    $(window).on('orientationchange', function () {
      window.setTimeout(function () { // hack: orientationchange 取window高度不及时
        setNavHeight('resize')
      }, 100)
    }).on('resize', function () {
      setNavHeight('resize')
    })
  }

  /**
   * 计算窗口高度
   *
   * @param {string} mode 用于区分模式
   */
  function setNavHeight (mode) {
    if (mode === 'open') {
      $wiseNav.addClass('in')
    }

    if (mode === 'resize' && $wiseNav.hasClass('in') || mode === 'open') {
      let listNum = $('#bs-navbar li').length
      let offsetTop = $('mip-nav-slidedown')[0] ? $('mip-nav-slidedown')[0].getBoundingClientRect().top : 0
      let navHeight = window.innerHeight - $('.navbar-header').height() - offsetTop
      $wiseNav.height(navHeight)
      // 关闭按钮距离底部固定为90px
      closeBtnTop = navHeight - ($('.navbar-right li').height()) * listNum - 90
      if (closeBtnTop > 20) {
        $('.navbar-wise-close').css('margin-top', closeBtnTop + 'px')
      } else {
        $('.navbar-wise-close').css('margin-top', '20px')
      }
    }
  }
}

/**
 * 增加按钮按下class对应颜色
 *
 * @param {obj} $dom dom object
 */
function addHoverClass ($dom) {
  $dom.on('touchstart', function () {
    // 按钮按下时，改变颜色
    $(this).addClass('down')
  }).on('mousedown', function () {
    // 鼠标按下时，改变颜色
    $(this).addClass('down')
  }).on('touchend', function () {
    // 按钮抬起时，改变颜色*2，收起菜单
    $(this).removeClass('down')
  }).on('mouseup', function () {
    // 鼠标抬起时，改变颜色*2，收起菜单
    $(this).removeClass('down')
  })
}

function showNavBar (me) {
  let $this = $(me)
  $this.removeAttr('style')
}
// build 方法，元素插入到文档时执行，仅会执行一次
customElement.prototype.build = build
return customElement

export default class MIPExample extends MIP.CustomElement {
  build () {
    let element = this.element
    render(element)
    bindEvents(element)
    showNavBar(element)
  }
}
