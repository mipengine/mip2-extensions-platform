/**
 * 广告组件
 * @author wangpei07@baidu.com
 * @version 1.1
 * @copyright 2016 Baidu.com, Inc. All Rights Reserved
 */
import './index.less'

export default class MIPAd extends MIP.CustomElement {
  build () {
    let customElement = require('customElement').create()

    // Sync
    require('./mip-ad-comm')
    require('./mip-ad-baidu')
    require('./mip-ad-qwang')
    require('./mip-baidu-wm-ext')
    require('./mip-ad-imageplus')
    require('./mip-ad-ssp')
    require('./mip-ad-baidussp')

    /**
     * render
     *
     */
    function render () {
      let me = this
      let _element = this.element

      let type = _element.getAttribute('type')
      try {
        let mipAd = require('./mip-' + type)
        mipAd.render(_element, me)
      } catch (e) { }
    }

    customElement.prototype.build = render

    // Add alias
    // TODO: another plan
    setTimeout(function () {
      MIP.registerMipElement('mip-embed', customElement)
    }, 0)
    return customElement
  }
}
