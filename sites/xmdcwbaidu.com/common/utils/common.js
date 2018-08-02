// import gConst from '../js/config'

export const resetRem = function () {
  let b = document
  let a = {}
  a.Html = b.getElementsByTagName('html')[0]
  let htmls = b.getElementsByTagName('html')

  a.widthProportion = function () {
    console.log('宽度:' + b.body.clientWidth)
    return (b.body.clientWidth || a.Html.offsetWidth) / 750
  }
  a.changePage = function () {
    let length = htmls.length
    let remValue = a.widthProportion() * 100
    if (remValue !== null && !MIP.viewer.page.isRootPage) {
      for (let i = 0; i < length; i += 1) {
        htmls[i].setAttribute(
          'style',
          'font-size:' + remValue + 'px!important;height:100% !important'
        )
      }
    } else {
      for (let j = 0; j < length; j += 1) {
        htmls[j].setAttribute(
          'style',
          'font-size:' + remValue + 'px!important;height:100% !important'
        )
      }
    }
  }
  a.changePage()
  window.addEventListener('DOMContentLoaded', a.changePage)
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) {
      a.changePage()
    }
  })
  window.addEventListener('resize', a.changePage)
}
export const setUrlParam = function (obj) {
  const params = []

  Object.keys(obj).forEach(key => {
    let value = obj[key]
    // 如果值为undefined我们将其置空
    if (typeof value === 'undefined') {
      value = ''
    }
    // 对于需要编码的文本（比如说中文）我们要进行编码
    params.push([key, encodeURIComponent(value)].join('='))
  })

  return params.join('&')
}
export const Storage = {
  set: function (key, data) {
    return window.localStorage.setItem(key, JSON.stringify(data))
  },
  get: function (key) {
    return JSON.parse(window.localStorage.getItem(key))
  },
  remove: function (key) {
    return window.localStorage.removeItem(key)
  },
  setSession: function (key, data) {
    return window.sessionStorage.setItem(key, JSON.stringify(data))
  },
  getSession: function (key) {
    return JSON.parse(window.sessionStorage.getItem(key))
  },
  removeSession: function (key) {
    return window.sessionStorage.removeItem(key)
  },
  sClear: function () {
    return sessionStorage.clear()
  },
  lClear: function () {
    return localStorage.clear()
  },
  clear: function () {
    return sessionStorage.clear() || localStorage.clear()
  }
}
export const Url = {
  go: function (url) {
    MIP.viewer.open(url, {
      isMipLink: true
    })
  },
  goWithData: function (url, oUrlData) {
    let data = ''
    for (const k in oUrlData) {
      let value = oUrlData[k] !== undefined ? oUrlData[k] : ''
      data += `&${k}=${encodeURIComponent(value)}`
    }
    data = data ? data.substring(1) : ''
    let urlData = url + '?' + data
    MIP.viewer.open(urlData, {
      isMipLink: true
    })
  },
  getUrlData: function () {
    let searchStr = location.search.slice(1) // 提取location.search中'?'后面的部分

    if (!searchStr) {
      return null
    }
    let searchHash = searchStr.split('&')

    let ret = {}
    for (let i = 0, len = searchHash.length; i < len; i++) {
      // 这里可以调用each方法
      let pair = searchHash[i]
      if ((pair = pair.split('='))[0]) {
        let key = decodeURIComponent(pair.shift())
        let value = pair.length > 1 ? pair.join('=') : pair[0]
        if (value !== undefined) {
          value = value === 'null' ? null : decodeURIComponent(value)
        }
        if (key in ret) {
          if (ret[key].constructor !== Array) {
            ret[key] = [ret[key]]
          }
          ret[key].push(value)
        } else {
          ret[key] = value
        }
      }
    }
    return ret
  }
}
export const Cookie = {
  set: function (key, value, day) {
    let nowDate = new Date()
    nowDate.setDate(nowDate.getDate() + day)
    document.cookie = key + '=' + value + ';expires=' + nowDate
  },
  get: function () {
    // 读取cookie值
    let str = document.cookie
    let arr = str.split('; ')
    let arr2 = []
    let arrjson = {}
    for (let i = 0; i < arr.length; i++) {
      arr2 = arr[i].split('=')
      arrjson[arr2[0]] = arr2[1]
    }
    return arrjson
  },
  remove: function (key) {
    if (this.get()[key]) {
      this.set(key, '', -1) // -1 值得是前一天的cookie值
    }
  }
}
export const resetUrl = function () {
  const setUrl = function () {
    console.log('setUrl')
    const urlParams = Url.getUrlData()
    console.log('urlParams', !urlParams)
    if (!urlParams || !urlParams.hasOwnProperty('code')) {
      return
    }
    let url = window.location.origin + window.location.pathname
    if (
      urlParams.hasOwnProperty('PLATENUMBER') ||
      urlParams.hasOwnProperty('FDJH') ||
      urlParams.hasOwnProperty('PLATETYPE')
    ) {
      let oParams = {
        PLATENUMBER: urlParams.hasOwnProperty('PLATENUMBER')
          ? urlParams.PLATENUMBER
          : '',
        FDJH: urlParams.hasOwnProperty('FDJH') ? urlParams.FDJH : '',
        PLATETYPE: urlParams.hasOwnProperty('PLATETYPE')
          ? urlParams.PLATETYPE
          : '02'
      }
      url = `${url}?${setUrlParam(oParams)}`
    }
    window.location.replace(url)
  }
  window.addEventListener('pageshow', setUrl)
}
