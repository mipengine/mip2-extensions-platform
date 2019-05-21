import './index.less'

export default class MIPIdongdongAddress extends MIP.CustomElement {
  build () {
    let platform = MIP.util.platform
    let obj = this.element.querySelector('#btns a')
    let isDown = obj.getAttribute('isdown')
    let xgIphone = this.element.querySelector('#plat_iPhone') !== null
    let xgAndroid = this.element.querySelector('#plat_Android') !== null
    if (platform.isIos() && !xgIphone && isDown === '0') {
      obj.classList.add('noDown')
      obj.setAttribute('href', 'javascript:void(0)')
      obj.innerHTML = `
        暂无苹果版
      `
    } else if (platform.isAndroid() && !xgAndroid && isDown === '0') {
      obj.classList.add('noDown')
      obj.setAttribute('href', 'javascript:void(0)')
      obj.innerHTML = `
        暂无安卓版
      `
    } else if (!platform.isAndroid() && !platform.isIos() && isDown === '0') {
      obj.classList.add('noDown')
      obj.setAttribute('href', 'javascript:void(0)')
      obj.innerHTML = `
        暂无下载
      `
    }
  }
}
