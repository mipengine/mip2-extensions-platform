function signData(data, path) {
    let array = [];
    let key;
    let seed = "99754106633f94d350db34d548d6091a";
    for (key in data) {
      if (data[key] !== undefined && key !== "md5") {
        array.push(data[key] ? key + "=" + data[key] : key + "=");
      }
    }
    array.sort();
    let param = "";
    for (var item of array) {
      if (param != "") {
        param += "&";
      }
      param += item;
    }
    param += seed;
    param += "/" + path;
    console.log(param, data);
    let md5 = require("blueimp-md5");
    return md5(param);
  }
export default {
  // 弱提示
  toast(msg = '', time = 2500) {
      let toast = document.createElement('div')
      toast.className = 's4s-toast'
      toast.innerHTML = msg
      document.body.appendChild(toast)
      let timer = setTimeout(() => {
          clearTimeout(timer)
          let timer2 = setTimeout(() => {
              document.body.removeChild(toast)
              clearTimeout(timer2)
          }, 200)
      }, time)
  },
  // 时间格式化
  formatDateTime(timeStamp) {
      var date = timeStamp ? new Date(timeStamp) : new Date();
      // date.setTime(timeStamp * 1000);
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? ('0' + m) : m;
      var d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      var h = date.getHours();
      h = h < 10 ? ('0' + h) : h;
      var minute = date.getMinutes();
      var second = date.getSeconds();
      minute = minute < 10 ? ('0' + minute) : minute;
      second = second < 10 ? ('0' + second) : second;
      return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
  },
  signData,
  fetchData( path , param ){
      let params = {
          ...param
      }
      params.access_token = "";
      params.md5 = signData(params, path);
   return  fetch("https://mys4s.cn/grey/"+ path, {
    method: "POST",
    body: JSON.stringify(params),
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "same-origin"
  })
    .then(data => {
      return data.json();
    })
  }
}
