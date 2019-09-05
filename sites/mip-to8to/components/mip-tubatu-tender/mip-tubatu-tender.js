import './index.less'

import provinceSelect from './../../common/provinceSelect/provinceSelect'
import bottomNode from './bottomNode'
import FooterLayer from './footerLayer'

// 兼容部分不支持 NodeList.forEach 方法的机型，使用 Array.prototype.forEach.call
// import util from './../../common/util'

export default class MIPTubatuTender extends MIP.CustomElement {
  build () {
    // 添加底部节点
    const mipBottom = document.createElement('mip-bottom-footerlayer')
    mipBottom.className = 'mip-layout-container'
    mipBottom.innerHTML = bottomNode
    document.body.appendChild(mipBottom)

    // 获取ptag
    if (location.href.includes('ask')) {
      this.addPtag('.btn-mfsj', '#btn-mfsj-pg')
      this.addPtag('.btn-zxbj', '#btn-mfbj-pg')
      this.addPtag('.btn-lhb', '#btn-lhb-pg')
      this.addPtag('.btn-zxgs', '#btn-zxgs-pg')
      this.addPtag('.btn-zxfq', '#btn-zxfq-pg')
      this.addVal('#mfsj_pg', '#crm-mfsj-pg')
      this.addVal('#zxbj_pg', '#crm-mfbj-pg')
      this.addVal('#lhb_pg', '#crm-lhb-pg')
      this.addVal('#zxgs_pg', '#crm-zxgs-pg')
      this.addVal('#zxfq_pg', '#crm-zxfq-pg')
    }

    const wapTownid = this.getCookie('to8to_wap_townid') || 1130

    // 获取城市接口 jsonp
    /**
     *
        const fetchJsonp = require('fetch-jsonp')
        fetchJsonp('', {
          jsonpCallback: ''
        })
     */
    const fetchJsonp = require('fetch-jsonp')
    fetchJsonp(`//secure.to8to.com/api/getindexdata.php?type=towninfo&townid=${wapTownid}`)
      .then((response) => response.json())
      .then((res) => {
        Array.prototype.forEach.call(document.querySelectorAll('.common-city'), (item) => {
          item.value = `${res.prov} ${res.city}`
        })
      })
    setTimeout(() => {
      // 初始化城市选
      provinceSelect.initialize({
        targetDom: '.common-city',
        forDom: '.common-form'
      })
      const footerlayer = new FooterLayer()
      footerlayer.init()
    }, 2e3)
  }

  addPtag (originNode, pgNode) {
    document.querySelectorAll(originNode)[0].setAttribute(('data-pg'), document.querySelector(pgNode).getAttribute('data-ptagg'))
  }

  addVal (originNode, pgNode) {
    document.querySelector(originNode).value = document.querySelector(pgNode).getAttribute('data-ptagg')
  }

  getCookie (cName) {
    let vClaue = document.cookie
    let vStart = vClaue.indexOf(' ' + cName + '=')
    if (vStart === -1) {
      vStart = vClaue.indexOf(cName + '=')
      vClaue = null
    } else {
      vStart = vClaue.indexOf('=', vStart) + 1
      let cEnd = vClaue.indexOf(';', vStart)
      if (cEnd === -1) {
        cEnd = vClaue.length
      }
      vClaue = this.catchCodeComponent(vClaue.substring(vStart, cEnd))
    }
    return vClaue
  }

  catchCodeComponent (str) {
    let result = ''
    try {
      result = decodeURIComponent(str)
    } catch (e) {
      result = str
    }
    return result
  }
}
