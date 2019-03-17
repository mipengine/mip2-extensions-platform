/**
 * @file mip-sm-recommend 组件
 * @author html5david
 * @time 2019.03.17
 */
import './mip-sm-recommend.less'
let {
  CustomElement,
  util
} = MIP

function json2urlParams(jsonObj) {
  if (!util.fn.isPlainObject(jsonObj)) {
    return false
  }
  return Object.keys(jsonObj).map(function (key) {
    return encodeURIComponent(key) + "=" + encodeURIComponent(jsonObj[key])
  }).join("&")
}

export default class MipSmRecommend extends CustomElement {
  connectedCallback () {
    const element = this.element
    const recommendParams = element.getAttribute('params')
    const paramsJson = util.jsonParse(recommendParams)
    const keys = Object.keys(paramsJson)
    if (!util.fn.isPlainObject(paramsJson) || keys.length === 0) {
      console.error('require params is json')
      return false
    }

    var xhr = new XMLHttpRequest()
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 304 || (xhr.status >= 200 && xhr.status < 300)) {
          if (xhr.responseText) {
            let wordList = util.jsonParse(xhr.responseText)
            let wordsJson = wordList.items.words
            let listHtml = "<div><p>大家还在搜</p><ul>"
            Object.keys(wordsJson).map((key) => {
              let item = wordsJson[key]
              let queryUrl = paramsJson.zm_path + encodeURIComponent(item.show_word)
              let searchParams = json2urlParams(paramsJson.zm_search)
              let linkUrl = searchParams ? queryUrl + '&' + searchParams : queryUrl
              listHtml += "<li><a href='" + linkUrl + "'>" + item.show_word + "</a></li>"
            })
            listHtml += "</ul></div>"
            let createElement = MIP.util.dom.create(listHtml)
            MIP.util.dom.insert(element, createElement)
          }else {
            console.log('responseText error', xhr.responseText)
          }
        } else {
          console.log('xhr error ', xhr.status)
        }
      }
    }
    xhr.open('get', paramsJson.recommend_api)
    xhr.send(null)
  }
}
