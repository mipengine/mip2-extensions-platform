/**
 * @file 广告扩展组件
 * @author lilangbo@baidu.com
 * @version 1.0
 * @copyright 2016 Baidu.com, Inc. All Rights Reserved
 */
export default class MIPExample extends MIP.CustomElement {
  build () {
    let render = function (that, me) {
      let self = that
      let domain = self.getAttribute('domain')
      let token = self.getAttribute('token')
      let exps = '112002'
      let MIP = window.MIP || {}
      let sample = MIP.hash.get('sample')
      if (sample === 'mip_wm_sample') {
        exps = '113006'
      }

      if (domain && token) {
        // 判断 preload 逻辑
        let scripts = document.querySelector('script[mip-preload="mip-script-wm"]')
        if (scripts && sample === 'mip_wm_sample') {
          let apiStr = 'containerapi'
          (window[apiStr] = window[apiStr] || []).push({
            containerId: token,
            exps: exps,
            token: token
          })
        } else {
          window['_' + token] = {
            exps: exps
          }
          let script = document.createElement('script')
          script.src = document.location.protocol + '//' + domain + '/' + token + '.js'
          document.body.appendChild(script)

          let fixedElement = require('fixed-element')
          let layer = fixedElement._fixedLayer
          let child = document.getElementById(token)
          child.addEventListener('DOMSubtreeModified', function (e) {
            let elem = window.getComputedStyle(child, null)
            let pos = elem && elem.getPropertyValue('position')
              ? elem.getPropertyValue('position') : ''
            if (layer && layer.querySelector('#' + token)) {
              return
            }
            if (pos === 'fixed' && layer) {
              let idx = document.querySelectorAll('mip-fixed').length
              let data = {
                element: child.parentElement,
                id: 'Fixed' + idx
              }
              fixedElement.moveToFixedLayer(data, parseInt(idx, 10))
            }
          }, false)
        }
      } else {
        console.error('请输入正确的 domain 或者 token')
      }
    }

    return {
      render: render
    }
  }
}
