import './mip-gzpd-alert.less'

export default class MipGzpdAlert extends MIP.CustomElement {
  build () {
    let CustomStorage = MIP.util.customStorage
    this.storage = new CustomStorage(0)
    this.timerNum = '000'
    let Tim = window.setTimeout(() => {
      this.timerNum = '111'
      clearTimeout(Tim)
    }, 60000)
    this.getJsonDone()
  }
  hashCode (str) {
    let hash = 0
    let len = str.length
    let i = 0
    if (len > 0) {
      while (i < len) {
        hash = (hash << 5) - hash + str.charCodeAt(i++) | 0
      }
    }
    return hash
  }
  marksHtml (config) {
    let payUrl = `${config.payUrl}?mip&id=${config.id}&rd=${encodeURI(window.location.href.split('?')[0])}`
    let freeboxDetail = config.alertFree.detail.map(function (item) {
      return `<p>${item}</p>`
    }).join('')
    return `<div class="mip-gzpd-alert-marks">
      <div class="alert-box mip-gzpd-alert-bounceIn">
      <div class="claos"></div>
      <div class="paybox" ${!config.showBox[0] ? ' style="display:none"' : ''}>
          <div class="paybox-title">${config.alert.title}</div>
          <div class="paybox-img">
              <a href="${payUrl}">
                  <mip-img class="qrimg" src="//static.yjbys.com/qrcode/pay.jpg"></mip-img></a></div>
          <div class="paybox-money">
              <span>${config.alert.detail[0]}</span>
              <span>${config.alert.detail[1]}</span></div>
          <a class="paybox-bottom-a" href="${payUrl}">
              <div class="paybox-bottom">${config.alert.btn}</div></a>
      </div>
      <div class="freebox" ${!config.showBox[1] ? ' style="display:none"' : ''}>
          <div class="freebox-title">${config.alertFree.title}</div>
          <div class="freebox-description">${freeboxDetail}</div>
          <div class="freebox-code">
              <input type="text" placeholder="${config.alertFree.placeholder}" class="freebox-input">
              <input type="button" value="${config.alertFree.btn}" class="freebox-btn">
          </div>
          <div class="error-tip">验证码不正确！</div>
      </div>
      <div class="paybox-cservice">${config.alert.service}</div>
      </div></div>`
  }
  payAlertHtml (config) {
    return `<div class="mip-gzpd-alert-marks-wxpay">
      <div class="wx_pic_img mip-gzpd-alert-bounceIn">
          <div class="wx_top"><span>${config.alertWx.title}</span></div>
          <div class="cg"><mip-img class="cg-img" src="https://static.yjbys.com/img/company/pay/zhifu_cg.png"></mip-img></div>
          <div class="payqr_box">
            <div class="hc" style="display: block;">
            <mip-img class="hc-img" src="https://static.yjbys.com/img/my/company/wxzhifu_load.gif"></mip-img></div>
            <div class="zhifu">
              <div class="sm">${config.alertWx.detail[0]}
              <span>${config.alertWx.detail[1]}</span></div>
            </div>
          </div>
          <div class="payqr_success_box">
            <div class="payqr_success_text">
              <svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1629">
                <path d="M511.993344 0.002048C229.260838 0.002048 0 229.261862 0 511.998464c0 282.732506 229.259814
                     511.990272 511.993344 511.990272C794.73097 1023.987712 1023.988736 794.73097 1023.988736
                     511.998464c0-282.736602-229.257766-511.996416-511.995392-511.996416zM788.582942 397.083376L475.699087
                     709.96723C464.321548 721.341697 449.189043 727.145665 434.1702 727.145665c-15.018843
                     0-30.036662-5.687233-41.527863-17.177411l-157.23859-157.241662c-22.982403-22.865668-22.982403-60.072299
                     0-83.054702 22.982403-22.982403 60.074347-22.86874 83.05675 0l115.823366 115.710727
                     271.352919-271.357015c22.871812-22.86874 60.074347-22.86874 83.05675 0 22.871812 22.983427 22.871812
                     60.189034-0.11059 83.057774z" fill="" p-id="1630"></path></svg>
              <span class="text">${config.alertOk.title}</span>
              <span class="text small">${config.alertOk.detail[0]}</span>
              <button class="btn">确定</button>
            </div>      
          </div>
          </div>
        </div>`
  }
  copySuccessHtml (config) {
    return `<div class="mip-gzpd-alert-success mip-gzpd-alert-bounceIn">
      <svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1271">
      <path d="M512 1024C229.248 1024 0 794.752 0 512S229.248 0 512 0s512 229.248 512 512-229.248
       512-512 512z m0-938.666667C276.352 85.333333 85.333333 276.352 85.333333 512s191.018667
       426.666667 426.666667 426.666667 426.666667-191.018667 426.666667-426.666667S747.648 85.333333
       512 85.333333z m-10.368 625.365334a42.624 42.624 0 0 1-60.330667 0 41.130667 41.130667 0 0
       1-7.381333-11.136L275.413333 536.32a42.666667 42.666667 0 1 1 61.056-59.605333l137.216 141.269333
       262.016-262.016a42.666667 42.666667 0 0 1 60.330667 60.330667l-294.4 294.4z" p-id="1272"></path></svg>
      <span>${config.alertCopy.title}</span></div>`
  }
  customerServiceHtml (config) {
    return `<div class="mip-gzpd-alert-cservice-marks">
      <div class="mip-gzpd-alert-cservice mip-gzpd-alert-bounceIn">
          <div class="claos"></div>
          <div class="phone-pic">
              <h1 class="kefu-name">${config.kefu}</h1>
              <span class="copy-txt-btn">${config.kefubt}</span>
          </div>
          <div class="phone-art">
              <span style="color:#ff6600;">付费成功后，若无法使用请联系客服</span>
              <span>在线时间：周一至周五</span>
              <span>9:00~12:30 14:00~18:00</span>
              <input type="text" value="${config.kefu}" id="kefu-name-input">
          </div>
      </div>
      </div>`
  }
  getJsonDone () {
    let copyTimeout = null
    let buyInterval = null
    fetch('//my.pincai.com/wx_app/miniapp/config/mip.copy.2.json').then(function (res) {
      return res.json()
    }).then((config) => {
      let ele = this.element
      if (config.code !== 200) {
        return
      }
      if (!config.cookieKey) {
        let pathname = window.location.pathname
        config.cookieKey = this.hashCode(pathname.substr(pathname.lastIndexOf('/') + 1)).toString()
      }
      let marks = this.marksHtml(config)
      let payAlert = this.payAlertHtml(config)
      let copySuccess = this.copySuccessHtml(config)
      let customerService = this.customerServiceHtml(config)
      ele.innerHTML += marks + payAlert + copySuccess + customerService
      let cserviceMarks = ele.querySelectorAll('.mip-gzpd-alert-cservice-marks')[0]
      let cserviceMarksCloseBtn = cserviceMarks.querySelectorAll('.claos')[0]
      let alertMarks = ele.querySelectorAll('.mip-gzpd-alert-marks')[0]
      let alertMarksCloseBtn = alertMarks.querySelectorAll('.claos')[0]
      let alertMarksPayBox = alertMarks.querySelectorAll('.paybox-cservice')[0]
      let alertWxpay = ele.querySelectorAll('.mip-gzpd-alert-marks-wxpay')[0]
      let alertWxpaySuccessBtn = alertWxpay.querySelectorAll('.payqr_success_text .btn')[0]
      let freeboxBtn = ele.querySelectorAll('.freebox-btn')[0]
      let freeboxInput = ele.querySelectorAll('.freebox-input')[0]
      let errTip = ele.querySelectorAll('.error-tip')[0]
      document.querySelectorAll('.content')[0].oncopy = e => {
        console.log(this.timerNum)
        if (!this.storage.get(config.cookieKey) && this.timerNum === '111') {
          if (getComputedStyle(alertMarks, false)['display'] !== 'block') {
            e.clipboardData.setData('text/plain', '')
            e.preventDefault()
          }
          alertMarks.style.display = 'block'
        } else {
          window.clearTimeout(copyTimeout)
          let alertSuccess = ele.querySelectorAll('.mip-gzpd-alert-success')[0]
          alertSuccess.style.display = 'block'
          copyTimeout = window.setTimeout(function () {
            alertSuccess.style.display = 'none'
          }, 1000)
        }
      }
      if (window.location.search && window.location.search.indexOf('order=') > -1) {
        let payBox = ele.querySelectorAll('.payqr_box')[0]
        let payBoxSuccess = ele.querySelectorAll('.payqr_success_box')[0]
        let wxTopSpan = ele.querySelectorAll('.wx_top span')[0]
        alertWxpay.style.display = 'block'
        payBox.style.display = 'block'
        payBoxSuccess.style.display = 'none'
        buyInterval = window.setInterval(() => {
          fetch(`//my.pincai.com/wx_app/wxpay/trade_copy.php${window.location.search}`).then(function (res) {
            return res.json()
          }).then((data) => {
            if (data.state === 'OK') {
              alertMarksCloseBtn.style.display = 'none'
              payBox.style.display = 'none'
              payBoxSuccess.style.display = 'block'
              wxTopSpan.style.display = 'block'
              wxTopSpan.innerText = '支付成功'
              this.storage.set(config.cookieKey, 1, config.cookieTtl * 1000)
              window.clearInterval(buyInterval)
            }
          })
        }, 1500)
      }
      cserviceMarksCloseBtn.onclick = () => {
        cserviceMarks.style.display = 'none'
      }
      alertMarksCloseBtn.onclick = () => {
        alertMarks.style.display = 'none'
        errTip.style.visibility = 'hidden'
      }
      alertMarksPayBox.onclick = () => {
        cserviceMarks.style.display = 'none'
      }
      freeboxBtn.onclick = () => {
        let userInput = parseInt(freeboxInput.value, 10)
        if (userInput < 1000) {
          return
        }

        if (userInput > 8000 && userInput < 9999) {
          this.storage.set(config.cookieKey, 1, config.cookieTtl * 1000)
          alertMarks.style.display = 'none'
          errTip.style.visibility = 'hidden'
        } else {
          errTip.style.visibility = 'visible'
        }
      }
      alertWxpaySuccessBtn.onclick = () => {
        location.href = location.href.split('?')[0]
      }
    })
  }
}
