/**
 * @file 网盟插件
 * @author fengchuantao@baidu.com
 * @version 1.0
 * @copyright 2016 Baidu.com, Inc. All Rights Reserved
 */
export default class MIPExample extends MIP.CustomElement {
  build () {
    let $ = require('zepto')
    let jsSrc = '//dup.baidustatic.com/js/dm.js'
    let scriptId = 'MIP_DUP_JS'
    let exps = '112002'

    let render = function (that, me) {
      let $this = $(that)
      let MIP = window.MIP || {}
      let sample = MIP.hash.get('sample')
      if (sample === 'mip_wm_sample') {
        exps = '113006'
      }
      let cproID = that.getAttribute('cproid')
      if (!cproID) {
        return
      }
      // 定制化 特殊处理
      let elem = that.querySelector('script') || null

      // 判断 preload 逻辑
      let scripts = document.querySelector('script[mip-preload="mip-script-wm"]')
      if (scripts && !elem && sample === 'mip_wm_sample') {
        let s = '_' + Math.random().toString(36).slice(2)
        let html = '<div style="" id="' + s + '"></div>'
        $this.append(html)
        let apiStr = 'containerapi'
        (window[apiStr] = window[apiStr] || []).push({
          containerId: s,
          exps: exps,
          slotId: cproID
        })
      } else {
        if (elem) {
          if (isJsonScriptTag(elem)) {
            jsSrc = '//cpro.baidustatic.com/cpro/ui/c.js'
            scriptId = 'MIP_DUP_JS_EXT'
            let obj = JSON.parse(elem.textContent.toString())
            (window.cproArray = window.cproArray || []).push({
              id: cproID
            })
            (window.cproStyleApi = window.cproStyleApi || {})[cproID] = obj
          }
        }
        let script = initJs()
        if (!elem) {
          initadbaidu($this, cproID, me, script)
        }
      }
    }

    /**
     * [initJs JS初始化函数]
     *
     * @returns {Object} 返回对象
     */
    function initJs () {
      let MIPDUPJS = document.getElementById(scriptId)
      if (MIPDUPJS) {
        return MIPDUPJS
      }

      let script = document.createElement('script')
      script.src = jsSrc
      script.id = scriptId
      document.body.appendChild(script)

      return script
    }

    /**
     * [initadbaidu 广告组件初始化]
     *
     * @param  {Object} $elemID mip对象
     * @param  {string} cproID  广告id
     * @param  {Object} me dom对象
     * @param  {Object} script  script对象
     *
     */
    function initadbaidu ($elemID, cproID, me, script) {
      let s = '_' + Math.random().toString(36).slice(2)
      let html = '<div style="" id="' + s + '"></div>'
      $elemID.append(html)

      (window.slotbydup = window.slotbydup || []).push({
        id: cproID,
        container: s,
        display: 'inlay-fix',
        exps: exps,
        async: true
      })

      if (script) {
        let fixedElement = require('fixed-element')
        let layer = fixedElement._fixedLayer
        let child = document.getElementById(s)
        child.addEventListener('DOMSubtreeModified', function (e) {
          let elem = window.getComputedStyle(child, null)
          let pos = elem && elem.getPropertyValue('position') ? elem.getPropertyValue('position') : ''
          if (layer && layer.querySelector('#' + s)) {
            return
          }
          if (pos === 'fixed') {
            $elemID.append(document.getElementById(s))
            if (layer) {
              let idx = document.querySelectorAll('mip-fixed').length
              let data = {
                element: child.parentElement,
                id: 'Fixed' + idx
              }
              fixedElement.moveToFixedLayer(data, parseInt(idx, 10))
            }
          }
        }, false)
      }

      me.applyFillContent(document.getElementById(s), true)
    }

    /**
     * [isJsonScriptTag 判断是否是定制化script标签]
     *
     * @param {Object} element 节点对象
     *
     * @returns {boolean}
     */
    function isJsonScriptTag (element) {
      return element.tagName === 'SCRIPT' &&
        element.getAttribute('type') &&
        element.getAttribute('type').toUpperCase() === 'APPLICATION/JSON'
    }

    return {
      render: render
    }
  }
}
