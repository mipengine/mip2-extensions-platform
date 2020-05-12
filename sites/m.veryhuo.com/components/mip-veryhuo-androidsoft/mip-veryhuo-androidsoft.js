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
      if (document.documentElement.scrollTop > 80) {
        css(fixNav, {display: 'block'})
        css(zxNav, {display: 'none'})
      } else if (document.documentElement.scrollTop < 30) {
        css(fixNav, {display: 'none'})
        css(zxNav, {display: 'block'})
      }
      if (document.documentElement.scrollTop > 300) {
        css(cbacktop, {display: 'block'})
      } else {
        css(cbacktop, {display: 'none'})
      }
    })
    cbacktop.onclick = function () {
      document.documentElement.scrollTop = 0
    }
    if (ztheader.length === 0) {
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
    let moreBtn = this.element.querySelector('#androidsoft-more')
    let asmUl = this.element.querySelector('#asm')
    let asm = 18
    moreBtn.onclick = function () {
      let req = new Request('https://admin.veryhuo.com/mobile/open/more_soft?p=' + asm + '&type=2' + '&isgame=0', {
        method: 'GET',
        cache: 'reload'
      })
      fetch(req).then(function (response) {
        return response.json()
      }).then(function (data) {
        if (data === '') {
          moreBtn.innerText = '加载完毕啦,么么哒~'
          return false
        } else {
          moreBtn.innerText = '加载中...'
          let khtml = ''
          let len = data.length
          for (let i = 0; i < len; i++) {
            let dt = data[i]
            dt.pubdate = toDate(dt.pubdate)
            khtml = document.createElement('li')
            khtml.innerHTML = '<a class=\'img\' href=\'/s/' + dt.id + '.html\'><mip-img src=\'' + dt.litpic + '\'></a><p><a href=\'/s/' + dt.id + '.html\'></mip-img>' + dt.title + '</a><span><u>' + dt.typename + '</u>' + dt.softsize + '</span><span><u class=\'vis\'>' + dt.os + '</u><u class=\'time\'>' + dt.pubdate + '</u></span></p><a href=\'/s/' + dt.id + '.html\' class=\'btn\'><em></em>下载</a>'
            asmUl.appendChild(khtml)
          }
          if (len < 20) {
            moreBtn.innerText = '加载完毕啦,么么哒~'
          } else {
            moreBtn.innerText = '点击有惊喜,萌萌哒~'
          }
          asm = asm + 20
        }
        function toDate (phpstr) {
          let str = parseInt(phpstr) * 1000
          let newDate = new Date(str)
          let yy = newDate.getUTCFullYear()
          let mm = newDate.getUTCMonth() + 1
          let dd = newDate.getUTCDate()
          return yy + '-' + mm + '-' + dd
        }
      })
    }
    let gameBtn = this.element.querySelector('#androidgame-more')
    let agmUl = this.element.querySelector('#agm')
    let agm = 18
    gameBtn.onclick = function () {
      let req = new Request('https://admin.veryhuo.com/mobile/open/more_soft?p=' + agm + '&type=2' + '&isgame=1', {
        method: 'GET',
        cache: 'reload'
      })
      fetch(req).then(function (response) {
        return response.json()
      }).then(function (data) {
        if (data === '') {
          gameBtn.innerText = '加载完毕啦,么么哒~'
          return false
        } else {
          gameBtn.innerText = '加载中...'
          let ghtml = ''
          let len = data.length
          for (let i = 0; i < len; i++) {
            let dt = data[i]
            dt.pubdate = toDate(dt.pubdate)
            ghtml = document.createElement('li')
            ghtml.innerHTML = '<a class=\'img\' href=\'/s/' + dt.id + '.html\'><mip-img src=\'' + dt.litpic + '\'></mip-img></a><p><a href=\'/s/' + dt.id + '.html\'>' + dt.title + '</a><span><u>' + dt.typename + '</u>' + dt.softsize + '</span><span><u class=\'vis\'>' + dt.os + '</u><u class=\'time\'>' + dt.pubdate + '</u></span></p><a href=\'/s/' + dt.id + '.html\' class=\'btn\'><em></em>下载</a>'
            agmUl.appendChild(ghtml)
          }
          if (len < 20) {
            gameBtn.innerText = '加载完毕啦,么么哒~'
          } else {
            gameBtn.innerText = '点击有惊喜,萌萌哒~'
          }
          agm = agm + 20
        }
        function toDate (phpstr) {
          let str = parseInt(phpstr) * 1000
          let newDate = new Date(str)
          let yy = newDate.getUTCFullYear()
          let mm = newDate.getUTCMonth() + 1
          let dd = newDate.getUTCDate()
          return yy + '-' + mm + '-' + dd
        }
      })
    }
  }
}
