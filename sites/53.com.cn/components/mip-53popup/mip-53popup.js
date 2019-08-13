import './index.less'
export default class MIP53popup extends MIP.CustomElement {
  constructor (...args) {
    super(...args)
    this.id = this.element.getAttribute('id')
    this.selct = this.element.getAttribute('selct')
    this.input = this.element.getAttribute('input')
  }
  build () {
    // 在这里注册 say 事件的监听
    this.addEventAction('open', (event, str) => {
      let box = document.getElementById(this.id)
      let back = document.getElementById('mip-popup-back')
      box.style.display = 'block'
      box.style.position = 'fixed'
      box.style.zIndex = '10002'
      box.style.top = '10%'
      box.style.left = '10%'
      box.style.width = '80%'
      back.style.display = 'block'
      document.querySelector('html').classList.add('mip-no-scroll')
    })
    this.addEventAction('close', (event, str) => {
      let box = document.getElementById(this.id)
      let back = document.getElementById('mip-popup-back')
      box.style.display = 'none'
      back.style.display = 'none'
      document.querySelector('html').classList.remove('mip-no-scroll')
    })
    // 提交
    this.addEventAction('subme', (event, str) => {
      let sel = document.getElementById(this.selct)
      let index = sel.selectedIndex
      let selval = sel.options[index].value
      let inputval = document.getElementById(this.input).value
      let isphone = /^0?1[3|4|5|7|8|9][0-9]\d{8}$/
      if (selval === '') {
        document.getElementById('mip-popup-tishi').innerHTML = '请选择加盟品牌'
        return
      }
      if (inputval === '') {
        document.getElementById('mip-popup-tishi').innerHTML = '请输入联系方式'
        return
      }
      if (!isphone.test(inputval)) {
        document.getElementById('mip-popup-tishi').innerHTML = '请输入正确的联系方式'
        return
      }
      let url = ''
      if (localStorage.getItem('IsTuiguang')) {
        url = 'https://www.53.com.cn/newapi/api/v1/Projects/AddTuiGuangMsg'
      } else {
        url = 'https://www.53.com.cn/newapi/api/v1/Projects/AddQuickMsg'
      }
      // 提交
      this.submitMessage(url, selval, inputval)
    })
  }
  submitMessage (url, type, phone) {
    let AJAXurl = `${url}?content=${type}&phone=${phone}`
    // let AJAXurl = 'https://www.53.com.cn/newapi/api/v1/home/AddMipSeo/?devicePixelRatio='+1+'&ScreenWidth='+300+'&ScreenHeight='+600
    fetch(AJAXurl, {
      method: 'GET'
    }).then(function (response) {
      return response.json()
    }).then(function (res) {
      if (res.result) {
        document.getElementById(this.input).value = ''
        document.getElementById('mip-popup-tishi').innerHTML = res.title
      }
    })
  }
}
