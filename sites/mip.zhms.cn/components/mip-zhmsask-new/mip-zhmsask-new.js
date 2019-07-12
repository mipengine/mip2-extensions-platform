import './index.less'

export default class MIPZhmsasknew extends MIP.CustomElement {
  constructor (element) {
    super(element)
    this.isSubmit = false
    this.show = true
    this.close = false
    this.isBlock = false
    this.hasPic = false
    this.showToastText = ''
    this.showTime = 2500
    this.handleShow = this.handleShow.bind(this)
    this.handleHide = this.handleHide.bind(this)
    this.zhmsask = null
  }
  build () {
    this.render()
    this.addEventAction('show', this.handleShow)
    this.addEventAction('hidden', this.handleHide)
    this.initPage()
    this.bindQuickBtn()
    this.bindSubmit()
  }

  initPage () {
    this.zhmsask = document.getElementsByClassName('mip-zhmsask-from')[0]
    let maleRadios = this.zhmsask.getElementsByTagName('lable')
    MIP.viewer.eventAction.execute('tap', maleRadios[0])
  }
  bindQuickBtn () {
    let quickBtns = this.zhmsask.getElementsByClassName('quick-question')
    let that = this
    for (let i = 0; i < quickBtns.length; i++) {
      that.tap(quickBtns[i],  e => {
        let questionArea = document.getElementById('data-question')
        let question = questionArea.value
        if (question.indexOf(e.target.innerText) > -1) {
          questionArea.value = question.replace(e.target.innerText, '')
          quickBtns[i].classList.remove('ct')
        } else {
          questionArea.value = question + e.target.innerText
          quickBtns[i].classList.add('ct')
        }
      })
    }
  }
  bindSubmit () {
    let that = this
    that.tap(that.zhmsask.getElementsByClassName('mip-zhmsask-submit-btn')[0],  () => {
      if (!that.isSubmit) {
        that.isSubmit = true
        let data = {}
        data.NickName = document.getElementById('data-nickname').value
        if (!data.NickName || data.NickName.length <= 0) {
          that.toast('请填写您的姓名')
          that.isSubmit = false
          return false
        }
        data.Sex = that.getRadioValue('lable-sex')
        data.Tel = document.getElementById('data-tel').value
        if (!data.Tel || data.Tel.length <= 0) {
          that.toast('请填写您的联系电话')
          that.isSubmit = false
          return false
        }
        data.Question = document.getElementById('data-question').value
        data.MerchantId = that.element.getAttribute('data-merchantId')
        data.BrandId = that.element.getAttribute('data-brandId')
        data.CategoryId = that.element.getAttribute('data-categoryId')
        data.SourceUrl = that.element.getAttribute('data-source')
        let config = {
          method: 'POST',
          body: JSON.stringify(data)
        }
        fetch(that.zhmsask.getAttribute("url"), config).then(response => {
          that.isSubmit = false
          return response.json()
        }).then(json => {
          that.isSubmit = false
          // handleRes(json)
          if (json.state !== 0) that.toast(json.msg || '咨询失败，请稍候重试！')
          else {
            if (json.state === 0) {
              document.getElementById('data-nickname').value = ''
              document.getElementById('data-tel').value = ''
              document.getElementById('data-question').value = ''
              let quickBtns = that.zhmsask.getElementsByClassName('quick-question')
              for (let i = 0; i < quickBtns.length; i++) {
                quickBtns[i].classList.remove('ct')
              }
              that.toast('咨询成功')
            } else {
              that.toast(json.msg || '咨询失败，请稍候重试！')
            }
          }
        }).catch(err=>{
            that.isSubmit = false
            that.toast('咨询失败，请稍候重试！' + err.message)
        })
      }
    })
  }

  toast (info) {
    this.handleShow(null, info)
  }
  // tap事件封装
  tap (obj, callBack) {
    if (typeof obj !== 'object') return
    // 变量
    let startTime = 0 // 记录触摸开始时间
    let isMove = false // 记录是否产生移动
    obj.addEventListener('touchstart',  () => {
      startTime = Date.now()
    })
    obj.addEventListener('touchmove',  () => {
      isMove = true
    })
    obj.addEventListener('touchend', e => {
      if (Date.now() - startTime < 300 && !isMove) {
        // 触碰时间在300ms以内,不产生移动
        callBack && callBack(e)
      }
      // 清零
      startTime = 0
      isMove = false
    })
  }
  getRadioValue (radioName) {
    let radios = document.getElementsByClassName(radioName)
    for (let i = 0; i < radios.length; i++) {
      let radio = radios.item(i).firstChild
      if (radio.checked) {
        if (!radio.value || radio.value.length <= 0) return
        return radio.value
      }
    }
    return
  }
  // update
  update () {
    const { closeTime, infoIconSrc } = this.props
    this.showTime = closeTime * 1000
    if (!infoIconSrc) {
      this.show = false
    } else {
      this.isBlock = true
      this.hasPic = true
    }
    setTimeout(() => {
      this.close = false
      this.render()
    }, this.showTime)
    this.render()
  }
  handleShow (event, info) {
    const { infoText } = this.props
    this.close = true
    if (typeof info === 'string') {
      this.showToastText = info
    } else {
      this.showToastText = infoText
    }
    this.update()
  }

  handleHide () {
    this.close = false
    this.render()
  }
  render () {
    const { station, infoIconSrc } = this.props
    const wrapper = document.createElement('div')
    const fixed = document.createElement('mip-fixed')
    const toastWrapper = document.createElement('div')
    const toast = document.createElement('div')
    const toastImg = document.createElement('img')
    const toastText = document.createElement('p')
    wrapper.classList.add('wrapper')
    wrapper.appendChild(fixed)
    fixed.setAttribute('type', 'top')
    fixed.setAttribute('still', true)
    fixed.classList.add(station)
    if (!this.close) {
      fixed.style.display = 'none'
    }
    fixed.appendChild(toastWrapper)
    if (this.hasPic) {
      toastWrapper.classList.add('limit-width')
    }
    toastWrapper.appendChild(toast)
    toast.classList.add('toast')
    if (this.show) {
      toastImg.setAttribute('src', infoIconSrc)
      toastImg.classList.add('icon')
      toast.appendChild(toastImg)
    }
    toastText.innerText = this.showToastText
    if (this.isBlock) {
      toastText.classList.add('block')
    }
    toast.appendChild(toastText)
    document.getElementById('toast-bar').innerHTML = ''
    document.getElementById('toast-bar').appendChild(wrapper)
  }
}
MIPZhmsasknew.props = {
  infoIconSrc: {
    type: String,
    default: ''
  },
  infoText: {
    type: String,
    default: ''
  },
  closeTime: {
    type: Number,
    default: 3
  },
  station: {
    type: String,
    default: 'bottom'
  }
}
