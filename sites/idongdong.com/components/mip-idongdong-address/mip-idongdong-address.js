import './index.less'

export default class MIPIdongdongAddress extends MIP.CustomElement {
  build () {    
    let u = navigator.userAgent;
    let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1
    let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
    let obj = this.element.querySelector('#btns a')
    let isDown = obj.getAttribute('isDown')
    let xgIphone = this.element.querySelector('#plat_iPhone') !== null
    let xgAndroid = this.element.querySelector('#plat_Android') !== null
    if (isiOS && !xgIphone && isDown === '0') {
      obj.classList.add('noDown')
      obj.setAttribute('href', 'javascript:void(0)')
      obj.innerHTML = `
        暂无苹果版
      `
    } else if (isAndroid && !xgAndroid && isDown === '0') {
      obj.classList.add('noDown')
      obj.setAttribute('href', 'javascript:void(0)')
      obj.innerHTML = `
        暂无安卓版
      `
    } else if (!isAndroid && !isiOS && isDown === '0') {
      obj.classList.add('noDown')
      obj.setAttribute('href', 'javascript:void(0)')
      obj.innerHTML = `
        暂无下载
      `
    }
  }
}
