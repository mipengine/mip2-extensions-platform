import './index.less'
const {
  util
} = MIP
const { fetchJsonp } = window
export default class MIPToastVerify extends MIP.CustomElement {
  build () {
    let button = this.element.querySelector('.team-sevice-btn')
    this.dataurl = this.element.getAttribute('data-url')
    button.addEventListener('click', () => {
      let phone = this.element.querySelector('#telphone').value
      let myreg = new RegExp(this.element.getAttribute('meg'))
      if (!myreg.test(phone)) {
        this.tipModal('请输入有效的手机号码')
      } else {
        this.popupModal()
      }
    }, false)
    this.verify = this.element.querySelector('.verify')
    this.verify.addEventListener('click', () => {
      this.verifyClick()
    }, false)

    let submitbutton = this.element.querySelector('.popup-submit-button-determine')
    submitbutton.addEventListener('click', () => {
      let telphone = this.element.querySelector('#telphone').value
      let yzm = this.element.querySelector('#yzm').value
      let fechurl = this.dataurl + '?phone=' + telphone + '&verify=' + yzm
      if (!yzm) {
        this.tipModal('请输入验证码')
        return false
      }
      fetchJsonp(fechurl, {})
        .then(res => res.json())
        .then(data => {
          if (data === 1) {
            this.tipModal('委托成功')
            this.popupModal()
          } else {
            this.verifyClick()
            this.tipModal('验证码输入有误，请重新输入')
          }
        })
    }, false)
    this.element.querySelector('.popup-title-quxiao').addEventListener('click', () => {
      this.popupModal()
    }, false)
    this.element.querySelector('.popup-submit-button-cancle').addEventListener('click', () => {
      this.popupModal()
    }, false)
  }
  verifyClick () {
    this.verify.setAttribute('src', this.verify.getAttribute('src') + `?g=${Math.random()}`)
  }
  popupModal () {
    let popup = this.element.querySelector('.popup')
    let btn = popup.classList.contains('popup-show')
    if (btn) {
      popup.classList.remove('popup-show')
      this.element.querySelector('.popup-wrapper').classList.remove('popup-wrapper-show')
      util.css(popup, 'opacity', '0')
    } else {
      this.element.querySelector('.popup-wrapper').classList.add('popup-wrapper-show')
      popup.classList.add('popup-show')
      util.css(popup, 'opacity', '1')
    }
  }
  tipModal (word) {
    let tipwrap = this.element.querySelector('.tip-wrapper')
    let tip = this.element.querySelector('.tip')
    tipwrap.innerHTML = word
    util.css(tipwrap, 'opacity', '0')
    tip.classList.add('tip-show')

    util.css(tipwrap, {
      opacity: 1,
      display: 'block'
    })

    setTimeout(function () {
      tip.classList.remove('tip-show')
      util.css(tipwrap, {
        opacity: 0,
        display: 'none'
      })
    }, 1000)
  }
}
