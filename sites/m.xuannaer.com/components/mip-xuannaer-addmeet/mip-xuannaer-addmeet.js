import './index.less'
const {
  util
} = MIP
const {
  fetchJsonp
} = window
export default class MIPXuannaerAddmeet extends MIP.CustomElement {
  build () {
    this.appoint = this.element.querySelector('.to_entrust')
    let dataId = this.appoint.getAttribute('data-id')
    this.inDate = this.getData()
    this.initButton()
    this.appoint.addEventListener('click', () => {
      fetchJsonp(`${this.inDate['hostUrl']}Mipplugin/sitNum`).then(res => {
        return res.json()
      }).then(data => {
        if (data['code'] === 404) {
          MIP.viewer.open(`${this.inDate['imsUrl']}user/login/login_tab`, {
            isMipLink: false,
            replace: false
          })
        } else if (data['data'] === 0) {
          this.popupModal()
        } else {
          MIP.viewer.open(`${this.inDate['hostUrl']}Entrust/book/${dataId}`, {
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
      MIP.viewer.open(`${this.inDate['hostUrl']}xuanzhi?router=noplan&item_id=${dataId}`, {
        isMipLink: false,
        replace: false
      })
    }, false)
  }
  popupModal () {
    let btn = document.querySelector('.popup').classList.contains('popup-show')
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
      'hostUrl': '',
      'imgUrl': '',
      'imsUrl': '',
      'footprintType': '',
      'footprintId': ''
    }
    let script = this.element.querySelector('script[type="application/json"]')
    if (script) {
      return Object.assign(params, util.jsonParse(script.textContent.toString()))
    }
    return params
  }
  initButton () {
    fetchJsonp(`${this.inDate['hostUrl']}Mipplugin/footprint?type=${this.inDate['footprintType']}&id=${this.inDate['footprintId']}`).then(res => {
      return res.json()
    }).then(data => {
    })
    fetchJsonp(`${this.inDate['hostUrl']}Mipplugin/isEntrust?type=${this.inDate['footprintType']}&id=${this.inDate['footprintId']}`).then(res => {
      return res.json()
    }).then(data => {
      if (data === 1) {
        this.appoint.innerHTML='已预约'
        this.appoint.classList.add('unentrust')
        this.appoint.classList.remove('test')
      }
    })
  }
}
