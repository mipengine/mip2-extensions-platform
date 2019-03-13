import './index.less'

export default class MIPIdongdongAddress extends MIP.CustomElement {
  build () {
    let obj = this.element.querySelector('#btns a')
    let isDown = obj.getAttribute('isDown')
    let isAndroid = this.element.querySelector('#is_android') !== null
    let isIos = this.element.querySelector('#is_ios') !== null
    let xgIphone = this.element.querySelector('#plat_iPhone') !== null
    let xgAndroid = this.element.querySelector('#plat_Android') !== null
    if (isIos && !xgIphone && isDown === '0') {
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
    } else if (!isAndroid && !isIos && isDown === '0') {
      obj.classList.add('noDown')
      obj.setAttribute('href', 'javascript:void(0)')
      obj.innerHTML = `
        暂无下载
      `
    }
  }
}
