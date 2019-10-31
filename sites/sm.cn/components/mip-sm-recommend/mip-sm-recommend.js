/**
 * @file mip-sm-recommend 组件
 * @author html5david
 * @time 2019.03.17
 */
import './mip-sm-recommend.less'
const {
  CustomElement,
  util
} = MIP

export default class MipSmRecommend extends CustomElement {
  connectedCallback () {
    let element = this.element
    let title = (element.getAttribute('title') || (document.querySelector('title') && document.querySelector('title').textContent)) || ''
    let query = MIP.hash.get('q') || ''
    let originUrl = encodeURIComponent(util.getOriginalUrl(location.href)) || ''
    let from = 'wh30010'
    let count = 8
    let recommendAPI = 'https://rec.m.sm.cn/?app=related_query&type=json&query=' + query + '&url=' + originUrl + '&title=' + title + '&src=sm_rec&from=' + from + '&count=' + count + '&athena_allow_origin=rec.uc.cn'
    if (!query && !title && !originUrl) {
      console.warn('recommend param empty')
      return false
    }
    fetch(recommendAPI)
      .then(res => res.json())
      .then(data => {
        if (data && data.error && data.error[0] === 'succ') {
          let wordsJson = data.hits
          let listHtml = '<div class="title"><p>大家还在搜</p><ul>'
          Object.keys(wordsJson).map((key) => {
            let item = wordsJson[key]
            let queryUrl = 'https://mip.m.sm.cn/rec/redirect/?src=http://m.sa.sm.cn/s?q=' + encodeURIComponent(item.word) + '&from=' + from
            listHtml += '<li><div class="item"><a href="' + queryUrl + '">' + item.word + '</a></div></li>'
          })
          listHtml += '</ul></div>'
          let createElement = MIP.util.dom.create(listHtml)
          MIP.util.dom.insert(element, createElement)
        } else {
          console.warn('error ', 'data error')
        }
      })
      .catch(error => {
        console.warn('error ', error.message)
      })
  }
}
