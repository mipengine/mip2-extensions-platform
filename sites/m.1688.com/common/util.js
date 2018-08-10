const Util = {

  getScript(url) {
    // 创建 script 标签并加入到页面中
    let oHead = document.getElementsByTagName('head')[0];
    let oS = document.createElement('script');
    oS.src = url;
    oHead.appendChild(oS);
  },
  getUrlParam: (name, href) => {
    let _href = href ? href : window.location.search;
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    let r = _href.substr(1).match(reg);  //匹配目标参数
    if (r != null) return decodeURIComponent(r[2]); return null; //返回参数值
  },
  getSkelectonData: () => {
    let arr = []
    for (let i = 0; i < 10; i++) {
      arr.push({
        skelecton: true
      })
    }
    return arr;
  },
  getUrlParms: () => {
    var args = new Object();
    var query = location.search.substring(1);//获取查询串
    var pairs = query.split("&");//在逗号处断开
    for (var i = 0; i < pairs.length; i++) {
      var pos = pairs[i].indexOf('=');//查找name=value
      if (pos == -1) continue;//如果没有找到就跳过
      var argname = pairs[i].substring(0, pos);//提取name
      var value = pairs[i].substring(pos + 1);//提取value
      args[argname] = decodeURIComponent(value);//存为属性
    }
    return args;
  },
  getHashParam: (hash) => {
    var args = new Object();
    var pairs = hash.split("&");//在逗号处断开
    for (var i = 0; i < pairs.length; i++) {
      var pos = pairs[i].indexOf('=');//查找name=value
      if (pos == -1) continue;//如果没有找到就跳过
      var argname = pairs[i].substring(0, pos);//提取name
      var value = pairs[i].substring(pos + 1);//提取value
      args[argname] = decodeURIComponent(value);//存为属性
    }
    return args;
  },
  getJsonToParam: function (obj) {
    var str = Object.keys(obj).map(function (key) {
      return encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]);
    }).join('&');
    return str;
  },
  jsonp: function (options) {
    options = options || {};
    if (!options.url || !options.callback) {
      throw new Error("参数不合法");
    }

    //创建 script 标签并加入到页面中
    var callbackName = ('jsonp_' + Math.random()).replace(".", "");
    var oHead = document.getElementsByTagName('head')[0];
    options.data[options.callback] = callbackName;
    var params = Util.getJsonToParam(options.data);
    var oS = document.createElement('script');
    oHead.appendChild(oS);
    //创建jsonp回调函数
    window[callbackName] = function (json) {
      oHead.removeChild(oS);
      clearTimeout(oS.timer);
      window[callbackName] = null;
      options.success && options.success(json);
    };

    //发送请求
    if (options.url.indexOf("?") != -1) {
      oS.src = options.url + '&' + params;
    } else {
      oS.src = options.url + '?' + params;
    }

    //超时处理
    if (options.time) {
      oS.timer = setTimeout(function () {
        window[callbackName] = null;
        oHead.removeChild(oS);
        options.fail && options.fail({ message: "超时" });
      }, time);
    }
  },
  htmlEncode: (html) => {
    var div = document.createElement('div');
    div.innerHTML = html;
    return JSON.parse(div.innerText);
  },
  getLocationOrigin: () => {
    //兼容ie浏览器
    if (window["context"] == undefined) {
      if (!window.location.origin) {
        window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
      }
      window["context"] = location.origin + "/V6.0";
    }
    return window.location.origin;
  }


}
export default Util;
