/**
 * @accordion
 * @author fengchuantao, liangjiaying
 * @file mip-accordion
 * @time 2017.07
 */
import './index.less'

let $ = require('zepto')
let localurl = location.href

// 恢复用户上次选择
function userSelect (id) {
  let self = this
  let sessionsKey = 'MIP-' + id + '-' + localurl
  let datajson = getSession(sessionsKey)

  for (let prop in datajson) {
    if (!datajson.hasOwnProperty(prop)) {
      return
    }
    let expand = datajson[prop]
    if (expand) {
      let content = $('#' + prop, self)
      content.attr('aria-expanded', 'open')
      content.parents('section').attr('expanded', 'open')
    }
  }
}

// 绑定事件
function bindEven (element) {
  let $element = $(element)
  let aniTime = $(element).attr('animatetime')

  if (aniTime === undefined || isNaN(aniTime)) {
    // if transition time is not set, set into 0.24s
    aniTime = 0.24
  } else {
    // '0.2s' -> 0.2, 20 -> 1, -0.5 -> 0.5
    aniTime = Math.min(parseFloat(aniTime), 1)
  }

  $element.on('click', '.mip-accordion-header', function () {
    let targetId = $(this).attr('aria-controls')
    let $targetdom = $('#' + targetId)
    let expanded = $targetdom.attr('aria-expanded')
    let $showMore = $(this).parents('section').find('.show-more')
    let $showLess = $(this).parents('section').find('.show-less')

    if (expanded === 'open') {
      // 收起内容区域
      // fold animation
      heightAni({
        ele: $targetdom[0],
        type: 'fold',
        transitionTime: aniTime,
        cbFun: function ($dom) {
          $dom.attr('aria-expanded', 'close')
        }.bind(undefined, $targetdom)
      })

      $(this).parents('section').removeAttr('expanded')
      if (!!$showMore.length && !!$showLess.length) {
        $showMore.css('display', 'block')
        $showLess.css('display', 'none')
      }

      setSession(element, targetId, false)
    } else {
      // 同时只能展开一个节点
      if (element.hasAttribute('expaned-limit')) {
        let sections = element.querySelectorAll('section')
        for (let i = 0; i < sections.length; i++) {
          let cont = sections[i].querySelector('.mip-accordion-content')
          let header = sections[i].querySelector('.mip-accordion-header')
          let id = header.getAttribute('aria-controls')

          sections[i].removeAttribute('expanded')
          cont.removeAttribute('aria-expanded')
          setSession(element, id, false)
          // fold animation
          heightAni({
            ele: cont,
            type: 'fold',
            transitionTime: aniTime
          })
        }
      }

      $targetdom.attr('aria-expanded', 'open')
      $(this).parents('section').attr('expanded', 'open')
      if (!!$showMore.length && !!$showLess.length) {
        $showLess.css('display', 'block')
        $showMore.css('display', 'none')
      }

      // unfold animation
      heightAni({
        ele: $targetdom[0],
        type: 'unfold',
        oriHeight: 0,
        transitionTime: aniTime
      })
      setSession(element, targetId, true)
    }
  })
}

// 设置session storage
function setSession (element, obj, expand) {
  let sessionsKey = 'MIP-' + element.getAttribute('sessions-key') + '-' + localurl

  let objsession = getSession(sessionsKey)
  objsession[obj] = expand
  sessionStorage[sessionsKey] = JSON.stringify(objsession)
}

// 获取sission
function getSession (sessionsKey) {
  let data = sessionStorage[sessionsKey]
  return data ? JSON.parse(data) : {}
}

/**
 * Make height transiton for element that has unknown height.
 * height transiton from 0px/40px to whatever height element will be.
 *
 * author&maintainer liangjiaying<jiaojiaomao220@163.com>
 *
 * @param  {Object} opt options
 * @example
 * {
 *     "ele": document.getElementById('id1'), // target DOM
 *     "type": "fold",                  // "fold" or "unfold"
 *     "transitionTime": "0.3",         // seconds, animation time
 *     "tarHeight": "140px",            // DOM height when animation ends
 *     "oriHeight": "20px",             // DOM height when animation begins
 *     "cbFun": function() {}.bind()    //callback, exec after animation
 * }
 */
function heightAni (opt) {
  let element = opt.ele
  let type = opt.type
  let transitionTime

  if (!type || !element) {
    return
  }

  if (opt.transitionTime === undefined || isNaN(opt.transitionTime)) {
    // if transition time is not set, set into 0.24s
    transitionTime = 0.24
  } else {
    // '0.2s' -> 0.2, 20 -> 1, -0.5 -> 0.5
    transitionTime = Math.min(parseFloat(opt.transitionTime), 1)
  }

  // use ?: to make sure oriHeight won't be rewrite when opt.oriHeight is set to 0
  let oriHeight = (opt.oriHeight !== undefined ? opt.oriHeight : getComputedStyle(element).height)
  let tarHeight
  let cbFun = opt.cbFun || function () { }

  if (type === 'unfold') {
    // make sure tarHeight won't be rewrite when opt.tarHeight is set to 0
    if (opt.tarHeight !== undefined) {
      tarHeight = opt.tarHeight
    } else {
      // before set height to auto, remove animation.
      // or bad animation happens in iphone 4s
      element.style.transition = 'height 0s'
      element.style.height = 'auto'
      tarHeight = getComputedStyle(element).height
    }

    // set height to auto after transition,
    // in case of height change of inside element later.
    setTimeout(function () {
      // before set height to auto, remove animation.
      // or bad animation happens in iphone 4s
      element.style.transition = 'height 0s'
      element.style.height = 'auto'
    }, transitionTime * 1000)
  } else if (type === 'fold') {
    tarHeight = opt.tarHeight || 0
  }

  element.style.height = oriHeight
  // now start the animation
  setTimeout(function () {
    element.style.transition = 'height ' + transitionTime + 's'
    // XXX: in setTimeout, or there won't be any animation
    element.style.height = tarHeight
  }, 10)
  // after transition, exec callback functions
  setTimeout(function () {
    cbFun()
  }, transitionTime * 1000)
}

export default class MIPExample extends MIP.CustomElement {
  build () {
    let self = this
    let element = this.element

    this.type = $(element).attr('type') || 'automatic'
    this.sections = $(element).find('section')
    this.id = $(element).attr('sessions-key')
    this.element.setAttribute('role', 'tablist')
    this.currentState = getSession.call(this)
    this.sections.map(function (index, section) {
      let header = $(section).find('[accordionbtn]')
      let content = $(section).find('[accordionbox]')

      if (!header.length || !content.length) {
        header = $(section.children.item(0))
        content = header.next()
      }

      header.addClass('mip-accordion-header')
      content.addClass('mip-accordion-content')

      // id 初始化
      let id = content.attr('id')
      if (!id) {
        id = 'MIP_' + self.id + '_content_' + index
        content.attr({
          id: id
        })
      }

      // tab 状态[展开|收起]判断
      if (self.currentState[id]) {
        section.attr('expanded', '')
      } else if (self.currentState[id] === false) {
        section.removeAttribute('expanded')
      }

      // 手动控制或者自动根据用户操作控制
      if (self.type === 'manual' && section.hasAttribute('expanded')) {
        content.attr('aria-expanded', 'open')
        setSession(element, $(element).attr('aria-controls'), true)
      } else if (self.type === 'automatic') {
        content.attr('aria-expanded', section.hasAttribute('expanded').toString())
      }

      header.attr('aria-controls', id)
    })

    if (self.type === 'automatic') {
      userSelect.call(element, this.id)
    }
    bindEven(element)
  }
}
