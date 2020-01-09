/**
 * @file 评论模块
 * @author fl
 */

const { CustomElement, util } = MIP
const { css } = util

export default class MIPMsysComment extends CustomElement {
  build () {
    let open = this.element.querySelectorAll('#open')[0]
    let close = this.element.querySelectorAll('#close')[0]
    let menu = this.element.querySelectorAll('#menu')[0]
    let shadow = this.element.querySelectorAll('#shadow')[0]
    let a = this.element.querySelectorAll('#type a')
    let rank = this.element.querySelectorAll('#rank')[0]
    open.onclick = function () {
      css(menu, {left: '0px'})
      css(shadow, {display: 'block'})
    }
    close.onclick = function () {
      menu.style.left = '-270px'
      css(shadow, {display: 'none'})
    }
    for (let i = 0; i < a.length; i++) {
      a[i].onclick = function () {
        css(rank, {display: 'block'})
        let siblings = this.parentNode.childNodes
        for (let i = 0; i < siblings.length; i++) {
          if (siblings[i].nodeType === 1) {
            siblings[i].className = ''
            this.className = 'cur'
          }
        }
      }
    }
    let softListMore = this.element.querySelectorAll('#softListMore')[0]
    let pagedata = this.element.querySelectorAll('#pagedata')[0]
    let softlistP = 24
    if (softListMore !== undefined) {
      softListMore.onclick = function () {
        let cut = softListMore.getAttribute('data-cut')
        let typeid = softListMore.getAttribute('data-typeid')
        let req = new Request('http://s.sys321.com/api/softListMore', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            cut: cut,
            typeid: typeid,
            p: softlistP
          })
        })
        fetch(req).then(function (response) {
          return response.json()
        }).then(function (data) {
          if (data === '') {
            softListMore.innerText = '加载完毕啦,么么哒~'
            return false
          } else {
            softListMore.innerText = '加载中...'
            let khtml = ''
            let len = data.length
            for (let i = 0; i < len; i++) {
              let dt = data[i]
              khtml = document.createElement('li')
              khtml.innerHTML = '<a title=' + '\'' + dt.title + '\'' + 'href=' + dt.url + '><dt><mip-img alt=' + '\'' + dt.title + '\'' + 'class=\'lazy\' data-original=' + dt.litpic + ' src=' + dt.litpic + '></mip-img></dt><dd class=\'d1\'>' + dt.title + '</dd><dd class=\'d3\'><div class=\'stars\'><span class=\'score\' title=' + dt.title + '评级' + dt.score + '></span><span class=\'star\'>' + dt.score + '</span></div></dd></a>'
              pagedata.appendChild(khtml)
            }
            if (len < 20) {
              softListMore.innerText = '加载完毕啦,么么哒~'
            } else {
              softListMore.innerText = '点击有惊喜,萌萌哒~'
            }
            softlistP = softlistP + 24
          }
        })
      }
    }
  }
}
