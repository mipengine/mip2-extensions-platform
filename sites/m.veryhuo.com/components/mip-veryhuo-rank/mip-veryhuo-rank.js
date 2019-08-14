const { CustomElement, util } = MIP
const { css } = util

export default class MIPMhotComment extends CustomElement {
  build () {
    let bnum = 0
    let nnum = 0
    // let PageType = '';
    let mclassifyCont = this.element.querySelectorAll('#mclassifyCont')[0]
    let ztheader = this.element.querySelectorAll('.ztheader')
    let cSOHUCS = this.element.querySelectorAll('#SOHUCS')
    if (cSOHUCS.length > 0) {
      if (cSOHUCS[0].attributes['PageType'].value !== undefined) {
        PageType = cSOHUCS[0].attributes['PageType'].value
      }
    }
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
    window.addEventListener('scroll', function () {
      // 页面滚动一定高度时，显示吸顶导航盒子
      if (document.documentElement.scrollTop > 80) {
        css(fixNav, {display: 'block'})
      } else {
        css(fixNav, {display: 'none'})
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
    // 分类内容
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
    // 点击排行页的 箭头，实现显示隐藏功能
    let zk = this.element.querySelector('.zk')
    let sq = this.element.querySelector('.sq')
    let rankA = this.element.querySelectorAll('.topnav a')
    let hides = this.element.querySelectorAll('.isHide')
    zk.onclick = function () {
      css(rankA, {display: 'block'})
      css(zk, {display: 'none'})
    };
    sq.onclick = function () {
      css(hides, {display: 'none'})
      css(sq, {display: 'none'})
      css(zk, {display: 'block'})
    };
    //如果不是手机打开，则跳转到pc页面
    let browser1 = {
      versions: function () {
        let u = navigator.userAgent
        return {
          trident: u.indexOf('Trident') > -1, 
          presto: u.indexOf('Presto') > -1,
          webKit: u.indexOf('AppleWebKit') > -1,
          gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1,
          mobile: !!u.match(/AppleWebKit.*Mobile/i) || !!u.match(/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/), //是否为移动终端
          ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
          android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
          iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, 
          iPad: u.indexOf('iPad') > -1,
          webApp: u.indexOf('Safari') === -1
        }
      }(),
      language: (navigator.browserLanguage || navigator.language).toLowerCase()
    }
    if (location.href.indexOf('m.veryhuo.com') > -1 && browser1.versions.mobile === false && browser1.versions.ios === false && browser1.versions.android === false && browser1.versions.iPhone === false && browser1.versions.iPad === false) {
      window.location = 'http://www.veryhuo.com'
    }
    // 机型判断
    let u = navigator.userAgent
    let isIphone = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
    let iosweb = document.getElementById('iosweb').getAttribute('value')
    let classweb = document.getElementById('classweb').getAttribute('value')
    let isyouxi = document.getElementById('isyouxi').getAttribute('value')
    let typeid = document.getElementById('typeid').getAttribute('value')
    let type = iosweb === '0' ? '2' : '3'
    if (isIphone) {
      if (classweb === '0') {
        if (iosweb === '0') {
          window.stop ? window.stop() : document.execCommand('Stop')
          if (isyouxi === '1') {
            window.location.href = '/mip_ddooo_m.rar/apple/rank.html'
          } else if (isyouxi === '2') {
            window.location.href = '/mip_ddooo_m.rar/apple/game.html'
          } else {
            window.location.href = '/mip_ddooo_m.rar/apple/soft.html'
          }
        }
      }
      let lm = 2
    }
    else if (iosweb === '1') {
      if (isyouxi === '1') {
        window.location.href = '/mip_ddooo_m.rar/rank.html'
      } else if (isyouxi === '2') {
        window.location.href = '/mip_ddooo_m.rar/game.html'
      } else {
        window.location.href = '/mip_ddooo_m.rar/soft.html'
      }
      let lm = 1
    }
    // 点击加载更多
    let btn1 = this.element.querySelector('#btn1')
    let more = this.element.querySelector('#more')
    let pp = 12
    let zz = 13
    btn1.onclick = function () {
      if (btn1.innerText === '加载完毕啦,么么哒~') return false
      // 创建一个Request对象
      let req = new Request('https://admin.veryhuo.com/mobile/open/phb_more?os=' + type + '&type=' + isyouxi + '&p=' + pp + '&typeid=' + typeid, {
        method: 'GET',
        cache: 'reload'
      })
      fetch(req).then(function (response) {
        return response.json()
      }).then(function (data) {
        if (data === '') {
          btn1.innerText = '加载完毕啦,么么哒~'
          return false
        } else {
          btn1.innerText = '加载中...'
          let khtml = ''
          let len = data.length
          for (let i = 0; i < len; i++) {
            let dt = data[i]
            if (dt.version === 0) {
              dt.version = dt.os
            } else {
              dt.softrank = 5
            }
            khtml = document.createElement("li")
            khtml.innerHTML = "<a href='/s/" + dt.id + ".html' class='img'><mip-img src='" + dt.litpic + "'></mip-img></a><p><a href='/s/" + dt.id + ".html'><i>" + zz + "</i>" + dt.title + "</a><em class='lstar" + dt.softrank + "'></em><span>" + dt.typename + "<u>" + dt.softsize + "</u>" + dt.version + "</span></p><a href='/s/" + dt.id + ".html' class='btn'><em class='bg'></em>下载</a>"
            zz += 1
            more.appendChild(khtml)
          }
          if (len < 10) {
            btn1.innerText = '加载完毕啦,么么哒~'
          } else {
            btn1.innerText = '点击有惊喜,萌萌哒~'
          }
          pp = pp + 30
        }
      })
    }
  }
}
