/**
 * @file 评论模块
 * @author fl
 */
import api from '../../common/config.api'
const { CustomElement, util } = MIP
const { css } = util
export default class MIP56Comment extends CustomElement {
  build () {
    let open = this.element.querySelectorAll('#open')[0]
    let close = this.element.querySelectorAll('#close')[0]
    let menu = this.element.querySelectorAll('#menu')[0]
    let shadow = this.element.querySelectorAll('#shadow')[0]
    open.onclick = function () {
      css(menu, {left: '0px'})
      css(shadow, {display: 'block'})
    }
    close.onclick = function () {
      menu.style.left = '-270px'
      css(shadow, {display: 'none'})
    }
    shadow.onclick = function () {
      menu.style.left = '-270px'
      css(shadow, {display: 'none'})
    }
    // 获取url?后index参数
    let url = window.location.search
    let theRequest = {}
    if (url.indexOf('?') != -1) {
      let str = url.substr(1)
      let strs = str.split('&')
      for (let i = 0; i < strs.length; i++) {
        theRequest[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1])
      }
    }
    // tab样式
    let a = this.element.querySelectorAll('.type a')
    a[theRequest.index].className = 'cur'
    for (let i = 0; i < a.length; i++) {
      a[i].onclick = function () {
        let siblings = this.parentNode.childNodes
        for (let i = 0; i < siblings.length; i++) {
          if (siblings[i].nodeType === 1) {
            siblings[i].className = ''
            this.className = 'cur'
          }
        }
      }
    }
    // 选择类型并传入接口str
    let labels = this.element.querySelectorAll('.tag-screen label')
    for (let i = 0; i < labels.length; i++) {
      labels[i].onclick = function (e) {
        if (e.target.tagName.toLocaleLowerCase() === 'input') {
          let name = this.getAttribute('data-name')
          if (this.children[0].value === '') {
            this.children[0].value = name
          } else {
            this.children[0].value = ''
          }
          if (str.indexOf(name) > -1) {
            str = str.replace(name + ' ', '')
          } else {
            str += name + ' '
          }
        }
        if (isClickLabel === 1) {
          let lebal = this.parentNode.children
          let ipts
          for (let i = 0; i < lebal.length; i++) {
            ipts = lebal[i].children[0]
            if (ipts.value !== '') {
              ipts.value = ''
              ipts.checked = false
              str = ''
            }
          }
          isClickLabel = 0
        }
        css(zyxBtn, {display: 'block'})
      }
    }
    // 点击找游戏按钮进行筛选并渲染数据
    let zyxBtn = this.element.querySelectorAll('#shaixuan')[0]
    let pagedata2 = this.element.querySelectorAll('#pagedata2')[0]
    let type = this.element.querySelectorAll('#type')[0].value
    let isClickLabel = 0
    let order = 'new'
    let str = ''
    let that = this
    zyxBtn.onclick = function () {
      isClickLabel = 1
      let tempStr = str.substr(0, str.length - 1)
      pagedata2.innerHTML = ''
      if (type === '游戏') {
        order = 'new'
      } else {
        order = 'down'
      }
      that.request(tempStr, order)
    }
    let newSx = this.element.querySelectorAll('#new-sx')[0]
    let downSx = this.element.querySelectorAll('#down-sx')[0]
    newSx.onclick = function () {
      downSx.classList.remove('selected')
      newSx.classList.add('selected')
      order = 'new'
      let p = 24
      let tempStr = str.substr(0, str.length - 1)
      pagedata2.innerHTML = ''
      that.request(tempStr, order)
    }
    downSx.onclick = function () {
      newSx.classList.remove('selected')
      downSx.classList.add('selected')
      order = 'down'
      let p = 24
      let tempStr = str.substr(0, str.length - 1)
      pagedata2.innerHTML = ''
      that.request(tempStr, order)
    }
    let softlistP = 24
    // 加载更多
    let softListMore = this.element.querySelectorAll('#softListMore')[0]
    let pagedata = this.element.querySelectorAll('#pagedata')[0]
    softListMore.onclick = function () {
      let cut = softListMore.getAttribute('data-cut')
      let typeid = softListMore.getAttribute('data-typeid')
      let req = new Request(api.baseUrl + 'softListMore', {
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
          css(softListMore, {pointerEvents: 'none'})
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
            css(softListMore, {pointerEvents: 'none'})
          } else {
            softListMore.innerText = '点击有惊喜,萌萌哒~'
          }
          softlistP = softlistP + 24
        }
      })
    }
  }
  // 筛选推荐，查询下载量前3
  sxtj () {
    let tags = this.element.querySelectorAll('.tag')
    let boxAdd = this.element.querySelectorAll('#box-add')[0]
    let sxTypeid = this.element.querySelectorAll('#typeid')[0].value
    let type = this.element.querySelectorAll('#type')[0].value
    // 删除之前的添加记录
    let sxtj = this.element.querySelectorAll('.sxtj')[0]
    if (sxtj !== undefined) {
      boxAdd.innerHTML = ''
    }
    for (let i = 0; i < tags.length; i++) {
      let value = ''
      if (tags[i].value !== '') {
        value = tags[i].value
        let req = new Request(api.baseUrl + 'tagCondition', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            tag: value,
            typeid: sxTypeid,
            order: 'down',
            count: 3
          })
        })
        fetch(req).then(function (response) {
          return response.json()
        }).then(function (data) {
          let khtml = ''
          khtml = document.createElement('div')
          khtml.className = 'box sxtj'
          let len = data.length
          let tempHtml = '<div class=\'category-sorting\'><a href=\'javascript:;\'>推荐' + value + type + '</a></div><ul class=\'box-wrap\'>'
          for (let i = 0; i < len; i++) {
            let dt = data[i]
            tempHtml += '<li><a title=' + '\'' + dt.title + '\'' + 'href=' + dt.url + '><mip-img alt=' + '\'' + dt.title + '\'' + 'class=\'lazy\' src=' + dt.litpic + '></mip-img><p class=\'d1\'>' + dt.title + '</p><p class=\'stars d3\'><span class=\'score\' title=' + '\'' + dt.title + ' 评级 ' + dt.score + '\' style=\'width:' + dt.star + '%\'></span><span class=\'star\'>' + dt.score + '</span></p></a></li>'
          }
          if (len < 3) { return false }
          tempHtml += '</ul><div class=\'cl\'></div></div>'
          khtml.innerHTML = tempHtml
          boxAdd.appendChild(khtml)
        })
      }
    }
  }
  // 发请求渲染列表
  request (tempStr, order) {
    let pagedata = this.element.querySelectorAll('#pagedata')[0]
    let pagedata2 = this.element.querySelectorAll('#pagedata2')[0]
    let sorting1 = this.element.querySelectorAll('#sorting1')[0]
    let sorting2 = this.element.querySelectorAll('#sorting2')[0]
    let screenMore = this.element.querySelectorAll('#tag-screen-more')[0]
    let softListMore = this.element.querySelectorAll('#softListMore')[0]
    let sxtj = this.element.querySelectorAll('.sxtj')[0]
    let sxTypeid = this.element.querySelectorAll('#typeid')[0].value
    let that = this
    if (tempStr === '') {
      css(pagedata, {display: 'block'})
      css(softListMore, {display: 'block'})
      css(pagedata2, {display: 'none'})
      css(sorting1, {display: 'block'})
      css(sorting2, {display: 'none'})
      css(screenMore, {display: 'none'})
      css(sxtj, {display: 'none'})
      return false
    }
    let req = new Request(api.baseUrl + 'tagCondition', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        tag: tempStr,
        p: 0,
        typeid: sxTypeid,
        order: order,
        count: 24
      })
    })
    fetch(req).then(function (response) {
      return response.json()
    }).then(function (data) {
      if (data === '') {
        softListMore.innerText = '加载完毕啦,么么哒~'
        css(softListMore, {pointerEvents: 'none'})
        return false
      } else {
        softListMore.innerText = '加载中...'
        let khtml = ''
        let len = data.length
        for (let i = 0; i < len; i++) {
          let dt = data[i]
          khtml = document.createElement('li')
          khtml.innerHTML = '<a title=' + '\'' + dt.title + '\'' + 'href=' + dt.url + '><dt><mip-img alt=' + '\'' + dt.title + '\'' + 'class=\'lazy\' data-original=' + dt.litpic + ' src=' + dt.litpic + '></mip-img></dt><dd class=\'d1\'>' + dt.title + '</dd><dd class=\'d3\'><div class=\'stars\'><span class=\'score\' title=' + dt.title + '评级' + dt.score + '></span><span class=\'star\'>' + dt.score + '</span></div></dd></a>'
          pagedata2.appendChild(khtml)
        }
        css(pagedata, {display: 'none'})
        css(pagedata2, {display: 'block'})
        css(softListMore, {display: 'none'})
        css(sorting1, {display: 'none'})
        if (len === 0) {
          pagedata2.innerHTML = '<div class=\'tip\'>抱歉，暂无相关内容</div>'
          css(screenMore, {display: 'none'})
          css(sorting2, {display: 'none'})
          return false
        }
        css(sorting2, {display: 'block'})
        css(sorting1, {display: 'none'})
        if (len < 20) {
          css(screenMore, {display: 'none'})
        } else {
          css(screenMore, {display: 'block'})
          css(screenMore, {pointerEvents: 'inherit'})
          screenMore.innerText = '加载更多'
        }
      }
    })
    that.sxtj()
  }
}
