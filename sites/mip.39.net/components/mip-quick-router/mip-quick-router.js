export default class MIPQuickRouter extends MIP.CustomElement {
  convertToHash (str) {
    let hash = {}
    let list = str.split('&')
    for (let i = 0, len = list.length; i < len; i++) {
      let item = list[i]
      let sideList = item.split('=')
      if (sideList[0].length > 0) {
        hash[sideList[0]] = item.substr(sideList[0].length + 1)
      }
    }
    return hash
  }

  typeofHuawei () {
    let userAgent = navigator.userAgent.toLowerCase()
    if (userAgent) {
      let huaweibrowser = userAgent.indexOf('huaweibrowser')
      let huawei = userAgent.indexOf('build/huawei')
      if (huaweibrowser >= 0) return 1
      if (huawei >= 0) return 1
    }
    return 0
  }

  isEmptyObject (obj) {
    if (!obj) {
      return !0
    }
    let t = void 0
    for (t in obj) {
      if (obj.hasOwnProperty(t)) {
        return !1
      }
    }
    return !0
  }

  build () {
    let mipDom = this.element

    let appRouter = mipDom.getAttribute('approuter') === 'false' ? 0 : 1

    if (appRouter) {
      let packageName = mipDom.getAttribute('packagename')
      let protocol = mipDom.getAttribute('protocol') ? mipDom.getAttribute('protocol') : 'https'
      let page = mipDom.getAttribute('page')
      let params = this.convertToHash(mipDom.getAttribute('params'))
      let iframeWrapper = document.createElement('iframe')
      let iframeSrc = ''
      let query

      if (this.isEmptyObject(params)) {
        let url = window.location.search
        let index = url.indexOf('?')
        if (index > -1) {
          query = url.substr(1)
        }
      } else {
        let items = Object.keys(params).map(function (key) {
          return key + '=' + encodeURIComponent(params[key])
        })
        query = items.join('&')
      }

      if (this.typeofHuawei()) {
        iframeSrc = 'hap://app/' + packageName
        if (page) {
          iframeSrc += '/' + page
        }

        if (query) {
          iframeSrc += '?' + query
        }
      } else {
        iframeSrc = protocol + '://thefatherofsalmon.com?i=' + packageName
        if (page) {
          iframeSrc += '&p=' + page
        }

        if (query) {
          iframeSrc += '&a=' + encodeURIComponent(query)
        }
      }

      iframeWrapper.src = iframeSrc
      iframeWrapper.style.cssText = 'visibility:hidden;height:0;border: 0;'
      mipDom.appendChild(iframeWrapper)
    }
  }
}
