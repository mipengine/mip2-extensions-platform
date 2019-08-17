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
    let searBtn = this.element.querySelectorAll('.SBBtn button')[0]
    let alert = this.element.querySelectorAll('#confirm')[0]
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
    searBtn.onclick = function () {
      if (oDiv.length === 0) {
        css(alert, {display: 'block'})
      } else {
        css(alert, {display: 'none'})
      }
    }
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
    let browser1 = {
      versions: (function () {
        let u = navigator.userAgent
        return {
          trident: u.indexOf('Trident') > -1,
          presto: u.indexOf('Presto') > -1,
          webKit: u.indexOf('AppleWebKit') > -1,
          gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1,
          mobile: !!u.match(/AppleWebKit.*Mobile/i) || !!u.match(/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/),
          ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
          android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
          iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1,
          iPad: u.indexOf('iPad') > -1,
          webApp: u.indexOf('Safari') === -1
        }
      })(),
      language: (navigator.browserLanguage || navigator.language).toLowerCase()
    }
    if (location.href.indexOf('m.veryhuo.com') > -1 && browser1.versions.mobile === false && browser1.versions.ios === false && browser1.versions.android === false && browser1.versions.iPhone === false && browser1.versions.iPad === false) {
      window.location = 'http://www.veryhuo.com'
    }
    let u = navigator.userAgent
    let isIphone = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
    let iosweb = document.getElementById('iosweb').getAttribute('value')
    let classweb = document.getElementById('classweb').getAttribute('value')
    let isyouxi = document.getElementById('isyouxi').getAttribute('value')
    if (isIphone) {
      if (classweb === '1') {
        if (iosweb === '0') {
          let url = window.location.href
          if (isyouxi === '1') {
            if (url.indexOf('611') !== -1) {
              window.location.href = '/list/987.html'
            }
          } else {
            if (url.indexOf('363') !== -1) {
              window.location.href = '/list/986.html'
            }
          }
        }
      }
    } else {
      if (classweb === '1') {
        let url = window.location.href
        if (isyouxi === '1') {
          if (url.indexOf('987') !== -1) {
            window.location.href = '/list/611.html'
          }
        } else {
          if (url.indexOf('986') !== -1) {
            window.location.href = '/list/363.html'
          }
        }
      }
    }
  }
}
