import './index.less'

export default class MIPZhmsaskv2 extends MIP.CustomElement {
  constructor ( element ) {
    super(element)
    this.IsSubmit = false
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
    this.InitPage()
    this.BindQuickBtn()
    this.BindSubmit()
  }

  InitPage () {
    this.zhmsask = document.getElementsByClassName('mip-zhmsask')[0]
      let MaleRadios = this.zhmsask.getElementsByTagName('lable')
      MIP.viewer.eventAction.execute('tap', MaleRadios[0])
  }
  BindQuickBtn () {
      let quickbtns = this.zhmsask.getElementsByClassName('quickquestion')
      let $this = this
      for (let i = 0; i < quickbtns.length; i++) {
        $this.tap(quickbtns[i], function (e) {
          let questionArea = document.getElementById('Question')
          let question = questionArea.value
          if (question.indexOf(e.target.innerText) > -1) {
            questionArea.value = question.replace(e.target.innerText, '')
            quickbtns[i].classList.remove('ct')
          } else {
            questionArea.value = question + e.target.innerText
            quickbtns[i].classList.add('ct')
          }
        })
      }
  }    
  BindSubmit () {
    let $this = this
    $this.tap($this.zhmsask.getElementsByClassName('mip-zhmsask-submit-btn')[0], function () {
      if (!$this.IsSubmit) {
        $this.IsSubmit = true
        let data = {}
        data.NickName = document.getElementById('NickName').value
        if (!data.NickName || data.NickName.length <= 0) {
          $this.Toast('请填写您的姓名')
          $this.IsSubmit = false
          return false
        }
        data.Sex = $this.GetRadioValue('sex-lable')
        data.Tel = document.getElementById('Tel').value
        if (!data.Tel || data.Tel.length <= 0) {
          $this.Toast('请填写您的联系电话')
          $this.IsSubmit = false
          return false
        }
        data.Question = document.getElementById('Question').value
        data.MerchantId = $this.element.getAttribute('MerchantId')
        data.BrandId = $this.element.getAttribute('BrandId')
        data.CategoryId = $this.element.getAttribute('CategoryId')
        data.SourceUrl = $this.element.getAttribute('Source')
        let a = {
          method: 'POST',
          body: JSON.stringify(data)
        }
        fetch('http://mip.zhms.cn/brand/addconsultation/', a).then(function (response) {
          $this.IsSubmit = false
          return response.json()
        }).then(function (json) {
          $this.IsSubmit = false
          // handleRes(json) 
          if (json.state !== 0) $this.Toast(json.msg || '咨询失败，请稍候重试！')
          else {
            if (json.state === 0) {
              document.getElementById('NickName').value = ''
              document.getElementById('Tel').value = ''
              document.getElementById('Question').value = ''
              let quickbtns = $this.zhmsask.getElementsByClassName('quickquestion')
              for (let i = 0; i < quickbtns.length; i++) {
                quickbtns[i].classList.remove('ct')
              }
              $this.Toast('咨询成功')
            } 
			else 
			  $this.Toast(json.msg || '咨询失败，请稍候重试！')       
          }
        })
      }
    })
  }

  Toast ( info ) {
    this.handleShow(null, info)
  }
  // tap事件封装
  tap ( obj, callBack ) {
    if (typeof obj !== 'object') return
    // 变量
    let startTime = 0 // 记录触摸开始时间
    let isMove = false // 记录是否产生移动
    obj.addEventListener('touchstart', function () {
      startTime = Date.now()
    })
    obj.addEventListener('touchmove', function () {
      isMove = true
    })
    obj.addEventListener('touchend', function (e) {
      if (Date.now() - startTime < 300 && !isMove) {
        // 触碰时间在300ms以内,不产生移动
        callBack && callBack(e)
      }
      // 清零
      startTime = 0
      isMove = false
    })
  }
  GetRadioValue ( radioName ) {
    let radios = document.getElementsByClassName(radioName)
    for (let i = 0; i < radios.length; i++) {
      let radio = radios.item(i).firstChild
      if (radio.checked) {
        if (!radio.value || radio.value.length <= 0) return undefined
        return radio.value
      }
    }
    return undefined
  }
  // 
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
  handleShow ( event, info ) {
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
MIPZhmsaskv2.props = {
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
