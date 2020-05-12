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
    if (searBtn !== undefined) {
      searBtn.onclick = function () {
        if (oDiv.length === 0) {
          css(alert, { display: 'block' })
        } else {
          css(alert, { display: 'none' })
        }
      }
    }
    window.addEventListener('scroll', function () {
      // 页面滚动一定高度时，显示吸顶导航盒子
      if (document.documentElement.scrollTop > 80) {
        css(fixNav, { display: 'block' })
        css(zxNav, { display: 'none' })
      } else if (document.documentElement.scrollTop < 30) {
        css(fixNav, { display: 'none' })
        css(zxNav, { display: 'block' })
      }
      // 页面滚动一定高度时，显示回到顶部按钮
      if (document.documentElement.scrollTop > 300) {
        css(cbacktop, { display: 'block' })
      } else {
        css(cbacktop, { display: 'none' })
      }
    })
    // 点击回到顶部按钮
    if (cbacktop !== undefined) {
      cbacktop.onclick = function () {
        document.documentElement.scrollTop = 0
      }
    }
    if (ztheader !== undefined && ztheader.length === 0) {
      // 点击搜索按钮，显示搜索框盒子，隐藏分类盒子
      if (oDiv !== undefined) {
        oDiv.onclick = function () {
          if (bnum === 0) {
            css(mclassifyCont, { display: 'none' })
            css(csearchDiv, { display: 'block' })
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
      if (mclassify !== undefined) {
        mclassify.onclick = function () {
          if (nnum === 0) {
            css(mclassifyCont, { display: 'block' })
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
    // 判断机型
    let u = navigator.userAgent
    let isIphone = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
    let iosweb = document.getElementById('iosweb').getAttribute('value')
    let type = iosweb === '0' ? '2' : '3'
    let lm = ''
    if (type === '2') {
      lm = '1'
    } else if (type === '3') {
      lm = '2'
    }
    if (isIphone) {
      if (iosweb === '0') {
        window.stop ? window.stop() : document.execCommand('Stop')
        window.location.href = '/apple/index.html'
      }
    } else if (iosweb === '1') {
      window.stop ? window.stop() : document.execCommand('Stop')
      window.location.href = '/index.html'
    }
    let moreBtn = this.element.querySelector('#moreApp')
    let iList = this.element.querySelector('.Apply .iList')
    // 发送请求
    let p = 15
    let doing = 0
    if (moreBtn !== undefined) {
      moreBtn.onclick = function () {
        if (doing === 1) return false
        // 创建一个Request对象
        let req = new Request('https://admin.veryhuo.com/mobile/open/more_soft?type=' + type + '&p=' + p, {
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
              khtml.innerHTML = '<a class=\'img\' href=\'/s/' + dt.id + '.html\'><mip-img src=\'' + dt.litpic + '\'></mip-img></a><p><a href=\'/s/' + dt.id + '.html\'>' + dt.title + '</a><span><u>' + dt.typename + '</u>' + dt.softsize + '</span><span><u class=\'vis\'>' + dt.os + '</u><u class=\'time\'>' + dt.pubdate + '</u></span></p><a href=\'/s/' + dt.id + '.html\' class=\'btn\'><em></em>下载</a>'
              iList.appendChild(khtml)
            }
            if (len < 20) {
              doing = 1
              moreBtn.innerText = '加载完毕啦,么么哒~'
            } else {
              moreBtn.innerText = '点击有惊喜,萌萌哒~'
            }
            p = p + 30
          }
          let SBBtn = this.element.querySelector('.SBBtn')
          let SBInp = this.element.querySelectorAll('.SBInp input')
          SBBtn.click(function () {
            search()
          })
          function search () {
            let sV = SBInp.value
            let forpath = '/search.php?wd=' + encodeURI(sV) + '&lm=' + lm
            window.location.href = forpath
          }
          // 将时间戳转换成 yy-mm-dd
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
}
