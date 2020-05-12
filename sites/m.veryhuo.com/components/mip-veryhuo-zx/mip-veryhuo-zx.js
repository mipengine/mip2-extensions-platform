/**
 * @file 评论模块
 * @author fl
 */
const { CustomElement, util } = MIP
const { css } = util

export default class MIPMhotComment extends CustomElement {
  build () {
    let bnum = 0
    let nnum = 0
    let mclassifyCont = this.element.querySelectorAll('#mclassifyCont')[0]
    let ztheader = this.element.querySelectorAll('.ztheader')
    let oDiv = this.element.querySelectorAll('.SearchBox')[0]
    let csearchDiv = this.element.querySelectorAll('.searchDiv')[0]
    let sear = this.element.querySelectorAll('.searchDiv input')
    let cnav = this.element.querySelectorAll('nav')[0]
    let mclassify = this.element.querySelectorAll('#mclassify')[0]
    let pullNav = this.element.querySelectorAll('#nav .pullNav')
    let moreNav = this.element.querySelectorAll('#nav .moreNav')
    let cmslass = this.element.querySelectorAll('#mclassifyCont p span')
    let cul = this.element.querySelectorAll('#mclassifyCont ul')
    let fixNav = this.element.querySelector('.fixNav')
    let cbacktop = this.element.querySelectorAll('#Cbacktop')[0]
    let zxNav = this.element.querySelector('#zxNav')
    window.addEventListener('scroll', function () {
      // 页面滚动一定高度时，显示吸顶导航盒子
      if (document.documentElement.scrollTop > 80) {
        css(fixNav, {display: 'block'})
        css(zxNav, {display: 'none'})
      } else if (document.documentElement.scrollTop < 30) {
        css(fixNav, {display: 'none'})
        css(zxNav, {display: 'block'})
      }
      // 页面滚动一定高度时，显示回到顶部按钮
      if (document.documentElement.scrollTop > 300) {
        css(cbacktop, {display: 'block'})
      } else {
        css(cbacktop, {display: 'none'})
      }
    })
    // 点击回到顶部按钮
    cbacktop.onclick = function () {
      document.documentElement.scrollTop = 0
    }
    if (ztheader.length === 0) {
      // 点击搜索按钮，显示搜索框盒子，隐藏分类盒子
      oDiv.onclick = function () {
        if (bnum === 0) {
          css(mclassifyCont, {display: 'none'})
          css(csearchDiv, {display: 'block'})
          if (sear.length > 0) {
            sear[0].focus()
          }
          bnum = 1
          nnum = 0
        } else {
          if (nnum === 1) {
            css(mclassifyCont, {display: 'none'})
            nnum = 0
          } else {
            css(cnav, {height: 40})
            css(csearchDiv, {display: 'none'})
            bnum = 0
          }
        }
      }
      // 给隐藏的分类 tab 标题添加类样式
      for (let i = 0; i < cmslass.length; i++) {
        cmslass[i].onclick = function () {
          let siblings = this.parentNode.childNodes
          for (let i = 0; i < siblings.length; i++) {
            if (siblings[i].nodeType === 1) {
              siblings[i].className = ''
              this.className = 'cur'
              cmslass[i].index = i
            }
          }
          // 点击隐藏的分类 tab 标题切换ul列表数据
          if (this.index === 0) {
            cul[0].className = 'on'
          } else {
            cul[0].className = ''
          }
          if (this.index === 1) {
            cul[1].className = 'on'
          } else {
            cul[1].className = ''
          }
        }
      }
      // 点击顶部分类按钮
      mclassify.onclick = function () {
        if (nnum === 0) {
          css(mclassifyCont, {display: 'block'})
          if (pullNav.length > 0) {
            pullNav[0].classList.remove('open')
          }
          if (moreNav.length > 0) {
            css(moreNav[0], {display: 'none'})
          }
          nnum = 1
        } else {
          css(mclassifyCont, {display: 'none'})
          nnum = 0
        }
      }
    }
    let zxAs = this.element.querySelectorAll('#zxnav-tit a')
    let open = this.element.querySelector('.open')
    let close = this.element.querySelector('.close')
    let aTit = this.element.querySelectorAll('.aTit')
    open.onclick = function () {
      css(zxAs, {display: 'block'})
      css(open, {display: 'none'})
    }
    close.onclick = function () {
      css(aTit, {display: 'none'})
      css(close, {display: 'none'})
      css(open, {display: 'block'})
    }
    let btnzx = this.element.querySelector('#btnzx')
    let dlist = this.element.querySelector('#dlist')
    let zxTypeid = document.getElementById('zx_typeid').getAttribute('value')
    let zxp1 = 10
    let zz = 13
    btnzx.onclick = function () {
      if (btnzx.innerText === '加载完毕啦,么么哒~') return false
      // 创建一个Request对象
      let req = new Request('https://admin.veryhuo.com/mobile/open/archives_more?p=' + zxp1 + '&typeid=' + zxTypeid, {
        method: 'GET',
        cache: 'reload'
      })
      fetch(req).then(function (response) {
        return response.json()
      }).then(function (data) {
        if (data === '') {
          btnzx.innerText = '加载完毕啦,么么哒~'
          return false
        } else {
          btnzx.innerText = '加载中...'
          let khtml = ''
          let len = data.length
          for (let i = 0; i < len; i++) {
            let dt = data[i]
            if (dt.litpic === '') {
              dt.litpic = '/images/noimg.png'
            }
            khtml = document.createElement('li')
            khtml.innerHTML = '<mip-img src=\'' + dt.litpic + '\'></mip-img><a href=\'/a/' + dt.id + '.html\'>' + dt.title + '</a><p>' + dt.description + '</p>'
            zz = zz + 1
            dlist.appendChild(khtml)
          }
          if (len < 20) {
            btnzx.innerText = '加载完毕啦,么么哒~'
          } else {
            btnzx.innerText = '点击有惊喜,萌萌哒~'
          }
          zxp1 = zxp1 + 20
        }
      })
    }
  }
}
