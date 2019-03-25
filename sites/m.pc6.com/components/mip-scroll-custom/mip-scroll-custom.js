/**
 * @file 滑动自定义
 * @author fl
 */
import './index.less'
const { CustomElement, util } = MIP
const { dom, css } = util

export default class MIPScrollCustom extends CustomElement {
  build () {
  	let num = this.element.getAttribute('sNum') ? parseInt(this.element.getAttribute('sNum')) : 8
  	let width = this.element.getAttribute('sWidth') ? this.element.getAttribute('sWidth') : 750
  	let height = this.element.getAttribute('sHeight') ? this.element.getAttribute('sHeight') : 290
  	let indicatorId = this.element.getAttribute('sIndicatorId')
  	let layout = this.element.getAttribute('sLayout') ? this.element.getAttribute('sLayout') : 'fixed-height'
    let ParentId = document.getElementById(this.element.getAttribute('sParentId'))
    let content = this.element.getElementsByClassName('mip-hide')[0]
    if (!indicatorId) {
    	console.error('请增加indicatorId属性——滚动ID')
    	return false
    }
    if (!ParentId) {
    	console.error('请增加sParentId属性——外围父级ID')
    	return false
    }
    if( content.getElementsByTagName('li').length) {
    	let carousel = dom.create(`<mip-carousel defer="1000" layout="${layout}" width="${width}" height="${height}" indicatorId="${indicatorId}">
            </mip-carousel>`)
        let objLi = content.getElementsByTagName('li')
        let objHtml = '<div class="tags-box-ul cfix">'
        for (let i = 0; i < objLi.length; i++) {
          if (objLi[i].getElementsByTagName('img').length) {
            objLi[i].getElementsByTagName('mip-img')[0].removeChild(objLi[i].getElementsByTagName('img')[0])
          }
          objHtml += objLi[i].outerHTML
          if ((i + 1) % num === 0) {
            objHtml += '</div>'
          }
          if ((i + 1) % num === 0 && i + 1 < objLi.length) {
            objHtml += '<div class="tags-box-ul cfix">'
          }
        }
        carousel.innerHTML = objHtml
        this.element.appendChild(carousel)
        // 增加点
        let dot = dom.create(`<div class="mip-carousel-indicator-wrapper"></div>`)
        let dotHtml = ''
        for (let i = 0; i < Math.ceil(objLi.length / num); i++) {
          if (i === 0) {
            dotHtml += '<div class="mip-carousel-activeitem mip-carousel-indecator-item"></div>'
          } else {
            dotHtml += '<div class="mip-carousel-indecator-item"></div>'
          }
        }
        dot.innerHTML = `<div class="mip-carousel-indicatorDot" id="${indicatorId}">${dotHtml}</div>`
        this.element.appendChild(dot)
        this.element.removeChild(this.element.getElementsByClassName('mip-hide')[0])
    } else {
    	ParentId.parentNode.removeChild(ParentId)
    }
  }
}
