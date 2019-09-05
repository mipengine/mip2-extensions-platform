export default class MIPExample extends MIP.CustomElement {
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
    console.log(userAgent)
    if (userAgent) {
      let huaweibrowser = userAgent.indexOf('huaweibrowser')
      // let android = userAgent.indexOf('android')
      let huawei = userAgent.indexOf('build/huawei')
      if (huaweibrowser >= 0) return 1
      if (huawei >= 0) return 1
      // if (0 > huawei && (huawei = userAgent.indexOf("build/honor")), android >= 0 && huawei >= 0) {
      //     if (userAgent.slice(android + 8, android + 9) >= 8) return 0
      // }
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
    let M_DOM = this.element

    let approuter = M_DOM.getAttribute('approuter') === 'false' ? 0 : 1

    console.log(typeof M_DOM.getAttribute('approuter'))
    if (approuter) {
      let packagename = M_DOM.getAttribute('packagename')
      let protocal = M_DOM.getAttribute('protocal') ? M_DOM.getAttribute('protocal') : 'https'
      let page = M_DOM.getAttribute('page')
      let params = this.convertToHash(M_DOM.getAttribute('params'))
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
        iframeSrc = 'hap://app/' + packagename
        if (page) {
          iframeSrc += '/' + page
        }

        if (query) {
          iframeSrc += '?' + query
        }
      } else {
        iframeSrc = protocal + '://thefatherofsalmon.com?i=' + packagename
        if (page) {
          iframeSrc += '&p=' + page
        }

        if (query) {
          iframeSrc += '&a=' + encodeURIComponent(query)
        }
      }

      iframeWrapper.src = iframeSrc
      iframeWrapper.style.cssText = 'visibility:hidden;height:0;border: 0;'
      M_DOM.appendChild(iframeWrapper)
    }
  }
}
