
// const lxnhttp = 'https://www.lanxiniu.com/BdMipDev/'
// const lxnhttp = 'http://127.0.0.1:8111/example/';

// const lxnhttp = '/components/';
const lxnhttp = 'http://www.daoway.cn/mip/'
const component = 'html/'

// const lxnhttp = 'http://test.daoway.cn/baiduapp/components/';//测试urL

const tranObjUrlToCache = urls => {
  let result = {}
  Object.keys(urls).map(key => {
    result[key] = MIP.util.makeCacheUrl(urls[key])
  })
  return result
}
export default ({
  // url: '//www.lanxiniu.com',
  // 线上
  /* htmlhref: tranObjUrlToCache({
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
  }), */

  // 测试

  htmlhref: tranObjUrlToCache({
    index: lxnhttp + 'index.html',
    serviceclass: lxnhttp + component + 'serviceclass.html',
    order: lxnhttp + component + 'order.html',
    my: lxnhttp + component + 'my.html',
    detail: lxnhttp + component + 'detail.html',
    orderdetail: lxnhttp + component + 'orderdetail.html',
    comments: lxnhttp + component + 'comments.html',
    reservation: lxnhttp + component + 'reservation.html',
    time: lxnhttp + component + 'time.html',
    xuzhi: lxnhttp + component + 'xuzhi.html',
    technician: lxnhttp + component + 'technician.html',
    position: lxnhttp + component + 'position.html',
    vouchers: lxnhttp + component + 'vouchers.html',
    about: lxnhttp + component + 'about.html'

    // community:lxnhttp + 'mip-dw-community/example/mip-dw-community.html',
    // city: lxnhttp + 'city.html',
    // orderlist: lxnhttp + 'myorder.html',
    // listdetail: lxnhttp + 'listdetail.html',
    // costdetail: lxnhttp + 'costdetail.html',
    // costdes: lxnhttp + 'costdes.html',
    // userguide: lxnhttp + 'userguide.html'
  }),
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
  position: function (data) {
    localStorage.setItem('position', JSON.stringify(data))
  },
  getposition: function () {
    let data = JSON.parse(localStorage.getItem('position'))
    return data
  },
  apptime: function (apptime) {
    this.apptime = apptime
  },
  setSession: function (datas) {
    sessionStorage.setItem('dwdata', JSON.stringify(datas))
  },
  getSession: function () {
    let data = sessionStorage.getItem('dwdata')
    // console.log(JSON.stringify(JSON.parse(data), null, 2))
    return JSON.parse(data)
  },
  timeformat: function (time, format) {
    let t = new Date(time)
    let tf = function (i) {
      return (i < 10 ? '0' : '') + i
    }
    let dayStr = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
    return format.replace(/appDate|day|yyyy|MM|dd|HH|mm|ss/g, function (a) {
      switch (a) {
        case 'yyyy':
          return tf(t.getFullYear())
        case 'MM':
          return tf(t.getMonth() + 1)
        case 'mm':
          return tf(t.getMinutes())
        case 'dd':
          return tf(t.getDate())
        case 'HH':
          return tf(t.getHours())
        case 'ss':
          return tf(t.getSeconds())
        case 'day':
          let today = new Date()
          if (today.getMonth() + 1 === t.getMonth() + 1) {
            if (today.getDate() === t.getDate()) {
              return '今天'
            } else if (today.getDate() + 1 === t.getDate()) {
              return '明天'
            } else {
              return dayStr[t.getDay()]
            }
          } else {
            return dayStr[t.getDay()]
          }
        case 'appDate':
          let todays = new Date()
          if (todays.getMonth() + 1 === t.getMonth() + 1) {
            if (todays.getDate() === t.getDate()) {
              return '今天'
            } else if (todays.getDate() + 1 === t.getDate()) {
              return '明天'
            } else {
              return tf(t.getMonth() + 1) + '-' + tf(t.getDate())
            }
          } else {
            return tf(t.getMonth() + 1) + '-' + tf(t.getDate())
          }
      }
    })
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
  /* mipExtendData: function (oldVal, newVal) {
    let data = MIP.util.fn.extend({}, oldVal, newVal)
    return data
  }, */
  // 获取url中"?"符后的字串
  getRequest: function (url) {
    url = url || window.location.href
    let obj = {}; let reg = /([^?=&#]+)=([^?=&#]+)/g
    url.replace(reg, function () {
      obj[arguments[1]] = arguments[2]
    })
    return obj
  }
})
