import './index.less'
const {
  util
} = MIP
export default class MIPXuannaerAddmeet extends MIP.CustomElement {
  build () {
    let appoint = this.element.querySelector('.to_entrust')
    let dataId = appoint.getAttribute('data-id')
    let inDate = this.getData()
    appoint.addEventListener('click', () => {
      fetchJsonp(`${inDate['checkUrl']}/Mipplugin/sitNum`).then(res => {
        return res.json()
      }).then(data => {
        if (data['code'] == 404) {
          MIP.viewer.open(`inDate[${inDate['imsUrl']}/user/login/login_tab`, {
            isMipLink: false,
            replace: false
          })
        } else if (data['data'] == 0) {
          this.popupModal()
        } else {
          MIP.viewer.open(`${inDate['checkUrl']}/Entrust/book/${dataId}`, {
            isMipLink: false,
            replace: false
          })
        }
      })
    })
    this.element.querySelector('.fixed-wrapper').addEventListener('click', () => {
      this.popupModal()
    }, false)
    this.element.querySelector('.popup-title-quxiao').addEventListener('click', () => {
      this.popupModal()
    }, false)
    this.element.querySelector('.popup-submit-button-cancle').addEventListener('click', () => {
      this.popupModal()
    }, false)
    this.element.querySelector('.popup-submit-button-determine').addEventListener('click', () => {
      this.popupModal()
      MIP.viewer.open(`${inDate['hostUrl']}/xuanzhi?router=noplan&item_id=${dataId}`, {
        isMipLink: false,
        replace: false
      })
    }, false)
  }
  popupModal () {
    let btn = document.querySelector('.popup').classList.contains('popup-show')
    console.log(btn)
    if (btn) {
      document.querySelector('.popup').classList.remove('popup-show')
      document.querySelector('.popup-wrapper').classList.remove('popup-wrapper-show')
    } else {
      document.querySelector('.popup-wrapper').classList.add('popup-wrapper-show')
      document.querySelector('.popup').classList.add('popup-show')
    }
  }
  getData () {
    let params = {
      "hostUrl": "https://ims.xuannaer.com",
      "imgUrl": "http://img.ims.com",
      "checkUrl": "http://m.ims.com/",
      "imsUrl": "http:ims.xuannaer.com"
    }
    let script = this.element.querySelector('script[type="application/json"]')
    if (script) {
      return Object.assign(params, util.jsonParse(script.textContent.toString()))
    }
    return params
  }
}
