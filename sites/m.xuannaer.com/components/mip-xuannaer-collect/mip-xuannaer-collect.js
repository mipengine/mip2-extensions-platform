import './index.less'
const {
  fetchJsonp
} = window
const {
  util
} = MIP
export default class MIPXuannaerCollect extends MIP.CustomElement {
  build () {
    let thisButton = this.element
    let dataArr = this.getData()
    let linkUrl = `${dataArr['hostUrl']}Mipplugin/collectionId?type=${dataArr['type']}&cate=${dataArr['cate']}&item_id=${dataArr['item_id']}`
    let delUrl = `${dataArr['hostUrl']}Mipplugin/collectionDel?type=${dataArr['type']}&cate=${dataArr['cate']}&item_id=${dataArr['item_id']}`
    let addUrl = `${dataArr['hostUrl']}Mipplugin/collection?type=${dataArr['type']}&cate=${dataArr['cate']}&item_id=${dataArr['item_id']}`
    fetchJsonp(linkUrl).then(res => {
      return res.json()
    }).then(data => {
      if (data['code'] === 200) {
        if (data['data']) {
          this.element.querySelector('.collect-text').innerHTML = '已收藏'
          this.element.querySelector('.collect-img').setAttribute('src', `${dataArr['imgUrl']}/static/mobile/images/heartyes.png`)
        } else {
          this.element.querySelector('.collect-text').innerHTML = '收藏'
          this.element.querySelector('.collect-img').setAttribute('src', `${dataArr['imgUrl']}/static/mobile/images/heart.png`)
        }
      } else {
        this.element.querySelector('.collect-text').innerHTML = '收藏'
        this.element.querySelector('.collect-img').setAttribute('src', `${dataArr['imgUrl']}/static/mobile/images/heart.png`)
      }
    })
    thisButton.addEventListener('click', () => {
      if (this.element.querySelector('.collect-text').textContent === '收藏') {
        fetchJsonp(addUrl).then(res => {
          return res.json()
        }).then(data => {
          if (data['code'] === 200) {
            this.element.querySelector('.collect-text').innerHTML = '已收藏'
            this.element.querySelector('.collect-img').setAttribute('src', `${dataArr['imgUrl']}/static/mobile/images/heartyes.png`)
          } else {
            if (data.rsg === '请先登录') {
              MIP.viewer.open(`${dataArr['imsUrl']}user/login/login_tab`, {
                isMipLink: false,
                replace: false
              })
            }
          }
        })
      } else {
        fetchJsonp(delUrl).then(res => {
          return res.json()
        }).then(data => {
          if (data.code === 200) {
            this.element.querySelector('.collect-text').innerHTML = '收藏'
            this.element.querySelector('.collect-img').setAttribute('src', `${dataArr['imgUrl']}/static/mobile/images/heart.png`)
          } else {
            if (data.rsg === '请先登录') {
              MIP.viewer.open(`${dataArr['imsUrl']}user/login/login_tab`, {
                isMipLink: false,
                replace: false
              })
            }
          }
        })
      }
    })
  }
  getData () {
    let params = {
      'type': '',
      'item_id': '',
      'cate': '',
      'imsUrl': '',
      'imgUrl': '',
      'hostUrl': ''
    }
    let script = this.element.querySelector('script[type="application/json"]')
    if (script) {
      return Object.assign(params, util.jsonParse(script.textContent.toString()))
    }
    return params
  }
}
