const lxnhttp = 'https://www.lanxiniu.com/BaiduMip/'
// const lxnhttp = 'https://www.lanxiniu.com/BdMipDev/'
// const lxnhttp = 'http://127.0.0.1:8111/example/'

const tranObjUrlToCache = urls => {
  let result = {}
  Object.keys(urls).map(key => {
    result[key] = MIP.util.makeCacheUrl(urls[key])
  })
  return result
}

export default ({
  url: '//www.lanxiniu.com',
  // 线上
  htmlhref: tranObjUrlToCache({
    order: lxnhttp + 'order',
    payorder: lxnhttp + 'payorder',
    mapout: lxnhttp + 'mapout',
    mapin: lxnhttp + 'mapin',
    city: lxnhttp + 'city',
    orderlist: lxnhttp + 'myorder',
    listdetail: lxnhttp + 'listdetail',
    costdetail: lxnhttp + 'costdetail',
    costdes: lxnhttp + 'costdes',
    userguide: lxnhttp + 'userguide'
  }),

  // 测试
  //   htmlhref: tranObjUrlToCache({
  //     order: lxnhttp + 'order.html',
  //     payorder: lxnhttp + 'payorder.html',
  //     mapout: lxnhttp + 'mapout.html',
  //     mapin: lxnhttp + 'mapin.html',
  //     city: lxnhttp + 'city.html',
  //     orderlist: lxnhttp + 'myorder.html',
  //     listdetail: lxnhttp + 'listdetail.html',
  //     costdetail: lxnhttp + 'costdetail.html',
  //     costdes: lxnhttp + 'costdes.html',
  //     userguide: lxnhttp + 'userguide.html'
  //   }),
  setHtmlRem: function () {
    let b = document
    let a = {}
    a.Html = b.getElementsByTagName('html')[0]
    let htmls = b.getElementsByTagName('html')

    a.widthProportion = function () {
      console.log('宽度:' + b.body.clientWidth)
      //   b.body &&
      let c = (b.body.clientWidth || a.Html.offsetWidth) / 750
      return c > 1 ? 1 : c < 0.4 ? 0.4 : c
    }
    a.changePage = function () {
      let length = htmls.length
      let remValue = a.widthProportion() * 100
      let rem = sessionStorage.getItem('rem')
      // MIP.viewer.page.isRootPage  技术服务开始页初始化session
      if (rem !== null && !MIP.viewer.page.isRootPage) {
        for (let i = 0; i < length; i++) {
          htmls[i].setAttribute('style', 'font-size:' + rem + 'px!important;height:100% !important')
        }
      } else {
        for (let j = 0; j < length; j++) {
          htmls[j].setAttribute('style', 'font-size:' + remValue + 'px!important;height:100% !important')
        }
        sessionStorage.setItem('rem', remValue)
      }
    }

    a.changePage()
    // setInterval(a.changePage, 1000);
  },
  // 拼接字符串
  setUrlParam: function (obj) {
    const params = []

    Object.keys(obj).forEach((key) => {
      let value = obj[key]
      // 如果值为undefined我们将其置空
      if (typeof value === 'undefined') {
        value = ''
      }
      // 对于需要编码的文本（比如说中文）我们要进行编码
      params.push([key, encodeURIComponent(value)].join('='))
    })

    return params.join('&')
  },
  setSession: function (datas) {
    sessionStorage.setItem('lxndata', JSON.stringify(datas))
  },
  getSession: function () {
    let data = sessionStorage.getItem('lxndata')
    // console.log(JSON.stringify(JSON.parse(data), null, 2))
    return JSON.parse(data)
  },
  timeformat: function (date, format) {
    // 全局时间格式化输出     new Date().format('yyyy-MM-dd hh:mm:ss')
    let args = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds(),
      'q+': Math.floor((date.getMonth() + 3) / 3), // quarter
      'S': date.getMilliseconds()
    }
    if (/(y+)/.test(format)) { format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length)) }
    for (let i in args) {
      let n = args[i]
      if (new RegExp('(' + i + ')').test(format)) { format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? n : ('00' + n).substr(('' + n).length)) }
    }
    return format
  },
  getbaiduLogMsg: function () {
    let keys = 'mip-login-xzh:sessionId://www.lanxiniu.com/Baidu/back'
    return localStorage.getItem(keys)
  },
  // 使用MIP2同步数据
  mipSetGlobalData: function (newVal) {
    try {
      MIP.setData({'#lxndata': newVal})
    } catch (e) {
      console.error(e, e.stack)
    }
  },
  // 使用MIP2合并数据用于本地存储
  mipExtendData: function (oldVal, newVal) {
    let data = MIP.util.fn.extend({}, oldVal, newVal)
    return data
  },
  // 获取url中"?"符后的字串
  getRequest: function () {
    let url = location.search
    console.log('查看url:' + url)
    let theRequest = {}
    if (url.indexOf('?') !== -1) {
      let str = url.substr(1)
      let strs = str.split('&')
      for (let i = 0; i < strs.length; i++) {
        theRequest[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1])
      }
      return theRequest
    } else {
      return theRequest
    }
  }
})
