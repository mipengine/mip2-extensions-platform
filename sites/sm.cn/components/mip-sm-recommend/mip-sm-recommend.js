/**
 * @file mip-sm-recommend 组件
 * @author html5david
 * @time 2019.03.17
 */
import './mip-sm-recommend.less'
const {
  CustomElement
} = MIP

export default class MipSmRecommend extends CustomElement {
  connectedCallback () {
    let element = this.element
    let title = element.getAttribute('title') || (document.querySelector('title') && document.querySelector('title').textContent)
    let query = location.hash ? location.hash.split('#')[1] : encodeURIComponent(title)
    let recommendAPI = 'https://mip.m.sm.cn/rec/recword?wd=' + query + '&from=mip'

    if (!query) {
      console.warn('query error')
      return false
    }
    fetch(recommendAPI)
      .then(res => res.json())
      .then(data => {
        let wordsJson = data.items.words
        let listHtml = '<div><p>大家还在搜</p><ul>'
        Object.keys(wordsJson).map((key) => {
          let item = wordsJson[key]
          let queryUrl = 'https://mip.m.sm.cn/rec/redirect/?src=http://m.sa.sm.cn/s?q=' + encodeURIComponent(item.show_word) + '&from=wh30010'
          listHtml += '<li><a href="' + queryUrl + '">' + item.show_word + '</a></li>'
        })
        listHtml += '</ul></div>'
        let createElement = MIP.util.dom.create(listHtml)
        MIP.util.dom.insert(element, createElement)
      })
      .catch(error => {
        console.warn('error ', error.message)
      })
  }
}
