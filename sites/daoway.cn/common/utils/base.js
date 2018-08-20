
// const lxnhttp = 'https://www.lanxiniu.com/BdMipDev/'
 //const lxnhttp = 'http://127.0.0.1:8111/example/';

const lxnhttp = '/components/';
//const lxnhttp = 'http://test.daoway.cn/baiduapp/components/';//测试urL

const tranObjUrlToCache = urls => {
  let result = {}
  Object.keys(urls).map(key => {
    result[key] = MIP.util.makeCacheUrl(urls[key])
  })
  return result
}
export default ({
  //url: '//www.lanxiniu.com',
  // 线上
  /*htmlhref: tranObjUrlToCache({
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
  }),*/

  // 测试

       htmlhref: tranObjUrlToCache({
       index: lxnhttp + 'mip-dw-index/example/mip-dw-index.html',
       serviceclass: lxnhttp + 'mip-dw-serviceclass/example/mip-dw-serviceclass.html',
       order: lxnhttp + 'mip-dw-order/example/mip-dw-order.html',
       my: lxnhttp + 'mip-dw-my/example/mip-dw-my.html',
       detail: lxnhttp + 'mip-dw-detail/example/mip-dw-detail.html',
       comments: lxnhttp + 'mip-dw-comments/example/mip-dw-comments.html',
       reservation: lxnhttp + 'mip-dw-reservation/example/mip-dw-reservation.html',
       time: lxnhttp + 'mip-dw-time/example/mip-dw-time.html',
       xuzhi: lxnhttp + 'mip-dw-xuzhi/example/mip-dw-xuzhi.html',
       technician: lxnhttp + 'mip-dw-technician/example/mip-dw-technician.html',
       position: lxnhttp + 'mip-dw-position/example/mip-dw-position.html',
       vouchers: lxnhttp + 'mip-dw-vouchers/example/mip-dw-vouchers.html',
       about: lxnhttp + 'mip-dw-about/example/mip-dw-about.html',


       //community:lxnhttp + 'mip-dw-community/example/mip-dw-community.html',
       //city: lxnhttp + 'city.html',
       //orderlist: lxnhttp + 'myorder.html',
       //listdetail: lxnhttp + 'listdetail.html',
       //costdetail: lxnhttp + 'costdetail.html',
       //costdes: lxnhttp + 'costdes.html',
       //userguide: lxnhttp + 'userguide.html'
     }),
   channel:'baidu',
   userId:localStorage.getItem('userId'),
   token: document.cookie,
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
  position: function (data) {
    localStorage.setItem('position', JSON.stringify(data))
  },
  getposition: function () {
    let data =  JSON.parse(localStorage.getItem('position'));
    return data
  },
  apptime:function(apptime){
     this.apptime = apptime;
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
    var t = new Date(time);
    var tf = function (i) {
      return (i < 10 ? '0' : '') + i
    };
    var dayStr = ['周日','周一','周二','周三','周四','周五','周六'];
    return format.replace(/appDate|day|yyyy|MM|dd|HH|mm|ss/g, function (a) {
      switch (a) {
        case 'yyyy':
          return tf(t.getFullYear());
          break;
        case 'MM':
          return tf(t.getMonth() + 1);
          break;
        case 'mm':
          return tf(t.getMinutes());
          break;
        case 'dd':
          return tf(t.getDate());
          break;
        case 'HH':
          return tf(t.getHours());
          break;
        case 'ss':
          return tf(t.getSeconds());
          break;
        case 'day':
          var today = new Date();
          if (today.getMonth() + 1 == t.getMonth() + 1){
            if (today.getDate() == t.getDate()){
              return "今天";
            } else if (today.getDate()+1 == t.getDate()){
              return "明天";
            } else {
              return dayStr[t.getDay()];
            }
          } else {
            return dayStr[t.getDay()];
          }
          break;
        case 'appDate':
          var today = new Date();
          if (today.getMonth() + 1 == t.getMonth() + 1){
            if (today.getDate() == t.getDate()){
              return "今天";
            } else if (today.getDate()+1 == t.getDate()){
              return "明天";
            } else {
              return tf(t.getMonth() + 1)+"-"+tf(t.getDate());
            }
          } else {
            return tf(t.getMonth() + 1)+"-"+tf(t.getDate());
          }
      }
    });
  },
  getbaiduLogMsg: function () {
    let keys = 'mip-login-xzh:sessionId://test.daoway.com/Baidu/back'
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
 /* mipExtendData: function (oldVal, newVal) {
    let data = MIP.util.fn.extend({}, oldVal, newVal)
    return data
  },*/
  // 获取url中"?"符后的字串
  getRequest: function (url) {
    url = url || window.location.href;
    var obj = {}, reg = /([^?=&#]+)=([^?=&#]+)/g;
    url.replace(reg, function () {
      obj[arguments[1]] = arguments[2];
    });
    return obj;
  }
})
