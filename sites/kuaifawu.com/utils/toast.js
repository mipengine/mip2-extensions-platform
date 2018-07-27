export default {
  // 弱提示
  toast (msg = '', time = 2500) {
    console.log(213)
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
  formatDateTime (timeStamp) {
    let date = timeStamp ? new Date(timeStamp) : new Date()
    // date.setTime(timeStamp * 1000);
    let y = date.getFullYear()
    let m = date.getMonth() + 1
    m = m < 10 ? ('0' + m) : m
    let d = date.getDate()
    d = d < 10 ? ('0' + d) : d
    let h = date.getHours()
    h = h < 10 ? ('0' + h) : h
    let minute = date.getMinutes()
    let second = date.getSeconds()
    minute = minute < 10 ? ('0' + minute) : minute
    second = second < 10 ? ('0' + second) : second
    return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second
  }
}
