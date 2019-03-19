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
const { fetchJsonp } = window

function json2urlParams (jsonObj) {
  if (!util.fn.isPlainObject(jsonObj)) {
    return false
  }
  return Object.keys(jsonObj).map(function (key) {
    return encodeURIComponent(key) + '=' + encodeURIComponent(jsonObj[key])
  }).join('&')
}

/**
 * 从组件中的 type 为 "application/json" 的 script 标签中获取 JSON 数据
 *
 * @param   {HTMLElement}  element  mip-sm-recommend 的 DOM 元素
 * @returns {Object}
 */
function getParams (element) {
  let result = {}
  try {
    let content = element.querySelector('script[type="application/json"]').textContent
    if (content) {
      result = util.jsonParse(content)
    }
  } catch (e) {
    console.warn(element, e.message)
  }
  return result
}

export default class MipSmRecommend extends CustomElement {
  connectedCallback () {
    const element = this.element
    const paramsJson = getParams(element)
    const keys = Object.keys(paramsJson)
    if (!util.fn.isPlainObject(paramsJson) || keys.length === 0) {
      console.warn('require params is json')
      return false
    }
    fetch(paramsJson.recommendAPI)
    .then(res => res.json())
    .then(data => {
      let wordsJson = data.items.words
      let listHtml = '<div><p>大家还在搜</p><ul>'
      Object.keys(wordsJson).map((key) => {
        let item = wordsJson[key]
        let queryUrl = paramsJson.zmPath + encodeURIComponent(item.show_word)
        let searchParams = json2urlParams(paramsJson.zmSearch)
        let linkUrl = searchParams ? queryUrl + '&' + searchParams : queryUrl
        listHtml += '<li><a href="' + linkUrl + '">' + item.show_word + '</a></li>'
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
