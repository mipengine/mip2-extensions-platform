/**
 * 通用广告
 * @author wangpei07@baidu.com
 * @version 1.0
 * @copyright 2016 Baidu.com, Inc. All Rights Reserved
 */
import './index.less'

export default class MIPAdComm extends MIP.CustomElement {
  build () {
    let $ = require('zepto')
    /**
     * @param render
     *
     */
    let render = function (_this, me) {
      let tpl = _this.getAttribute('tpl')
      switch (tpl) {
        case 'onlyImg':
          renderOnlyImg(_this, me)
          break
        case 'noneImg':
          renderNoneImg(_this, me)
          break
        case 'oneImg':
          renderOneImg(_this, me)
          break
        case 'moreImg':
          renderMoreImg(_this, me)
          break
      }
    }

    /**
     * [renderOnlyImg banner样式渲染函数]
     *
     * @returns
     */
    function renderOnlyImg (_this, me) {
      let $this = $(_this)
      let url = _this.getAttribute('href')
      let src = _this.getAttribute('src')
      let size = $this.data('size').trim().split(' ')
      let ratio = (size[1] / size[0] * 100).toFixed(2)

      let html = [
        '<div class="mip-ad-bannerbox" style="padding-bottom:' + ratio + '%">',
        '    <img src="' + src + '">',
        '</div>'
      ].join('')

      let node = document.createElement('a')
      node.setAttribute('href', url)
      node.classList.add('c-urljump')
      node.innerHTML = html

      $this.append(node)

      me.applyFillContent(node, true)
    }

    /**
     *
     * [renderNoneImg 无图样式渲染函数]
     * @returns
     */
    function renderNoneImg (_this, me) {
      let $this = $(_this)
      let url = _this.getAttribute('href')
      let title = $this.data('title')

      let html = [
        '<div class="mip-ad-row">',
        '    <div class="c-span12 c-line-clamp2">',
        '        ' + title,
        '    </div>',
        '</div>'
      ].join('')

      let node = document.createElement('a')
      node.setAttribute('href', url)
      node.className += 'c-blocka c-urljump mip-ad-box'
      node.innerHTML = html

      $this.append(node)

      me.applyFillContent(node, true)
    }

    /**
     *
     * [renderOneImg 单图样式渲染函数]
     * @returns
     */
    function renderOneImg (_this, me) {
      let $this = $(_this)
      let url = _this.getAttribute('href')
      let src = _this.getAttribute('src')
      let title = $this.data('title')
      let size = $this.data('size').trim().split(' ')
      let ratio = (size[1] / size[0] * 100).toFixed(2)

      let html = [
        '<div class="mip-ad-row">',
        '    <div class="c-span4">',
        '        <div class="c-img c-img-x" style="padding-bottom:' + ratio + '%">',
        '            <img src="' + src + '">',
        '        </div>',
        '    </div>',
        '    <div class="c-span8 c-line-clamp2">',
        '        ' + title,
        '    </div>',
        '</div>'
      ].join('')

      let node = document.createElement('a')
      node.setAttribute('href', url)
      node.className += 'c-blocka c-urljump mip-ad-box'
      node.innerHTML = html

      $this.append(node)

      me.applyFillContent(node, true)
    }

    /**
     * [renderMoreImg 多图样式渲染函数]
     * @returns
     */
    function renderMoreImg (_this, me) {
      let $this = $(_this)
      let url = _this.getAttribute('href')
      let src = _this.getAttribute('src').split('')
      let txt = $this.data('txt') ? $this.data('txt').split('') : []
      let abs = $this.data('ads') ? $this.data('ads').split('') : []
      let title = $this.data('title') || ''
      let size = $this.data('size').trim().split(' ')
      let ratio = (size[1] / size[0] * 100).toFixed(2)

      let len = src.length < 3 ? src.length : 3

      let imgHtml = ''

      if (len >= 3) {
        for (let index = 0; index < len; index++) {
          imgHtml += [
            '<div class="c-span4">',
            '    <div class="mip-ad-imgbox">',
            '        <div class="c-img c-img-x" style="padding-bottom:' + ratio + '%">',
            '            <img src="' + src[index] + '">',
            '        </div>',
            '        ' + getLineHtml(abs[index], ' mip-ad-abs'),
            '    </div>',
            '' + getLineHtml(txt[index], ''),
            '</div>'
          ].join('')
        }

        let html = [
          '<div class="mip-ad-row c-gap-bottom-small">',
          '    <div class="c-span12 c-title">' + title + '</div>',
          '</div>',
          '<div class="mip-ad-row">',
          '    ' + imgHtml,
          '</div>'
        ].join('')

        let node = document.createElement('a')
        node.setAttribute('href', url)
        node.className += 'c-blocka c-urljump mip-ad-box'
        node.innerHTML = html

        $this.append(node)

        me.applyFillContent(node, true)
      }
    }

    function getLineHtml (txt, clsname) {
      if (txt) {
        return [
          '<div class="c-line-clamp1' + clsname + '">',
          '    ' + txt,
          '</div>'
        ].join('')
      }
      return ''
    }

    return {
      render: render
    }
  }
}
