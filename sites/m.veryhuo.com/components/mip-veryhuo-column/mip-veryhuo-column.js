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
    // let PageType = ''
    let mclassifyCont = this.element.querySelectorAll('#mclassifyCont')[0]
    let ztheader = this.element.querySelectorAll('.ztheader')
    let cSOHUCS = this.element.querySelectorAll('#SOHUCS')
    if (cSOHUCS.length > 0) {
      if (cSOHUCS[0].attributes['PageType'].value !== undefined) {
        PageType = cSOHUCS[0].attributes['PageType'].value
      }
    }
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
        css(alert, { display: 'block'})
      } else {
        css(alert, { display: 'block'})
      }
    }
    window.addEventListener('scroll', function () {
      // 页面滚动一定高度时，显示吸顶导航盒子
      if (document.documentElement.scrollTop > 80) {
        css(fixNav, { display: 'block'})
        css(zxNav, { display: 'none'})
      } else if (document.documentElement.scrollTop < 30) {
        css(fixNav, { display: 'none'})
        css(zxNav, { display: 'block'})
      }
      // 页面滚动一定高度时，显示回到顶部按钮
      if (document.documentElement.scrollTop > 300) {
        css(cbacktop, { display: 'block'})
      } else {
        css(cbacktop, { display: 'none'})
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
          css(mclassifyCont, { display: 'none'})
          css(csearchDiv, { display: 'block'})
          if (sear.length > 0) {
            sear[0].focus()
          }
          bnum = 1
          nnum = 0
        } else {
          if (nnum === 1) {
            css(mclassifyCont, { display: 'none'})
            nnum = 0
          } else {
            css(cnav, {height: 40})
            css(csearchDiv, { display: 'none'})
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
          css(mclassifyCont, { display: 'block'})
          if (pullNav.length > 0) {
            pullNav[0].classList.remove('open')
          }
          if (moreNav.length > 0) {
            css(moreNav[0], { display: 'none'})
          }
          nnum = 1
        } else {
          css(mclassifyCont, { display: 'none'})
          nnum = 0
        }
      }
    }
    // 如果不是手机打开，则跳转到pc页面
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
      let pcurl = location.href.replace('m.', 'www.')
      if (location.href.indexOf('/androidsoft.html') > -1) {
        location.href = pcurl
      }
      if (location.href.indexOf('/down/class/') > -1) {
        location.href = pcurl
      }
    }
    // 机型判断
    let u = navigator.userAgent
    let isIphone= !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
    let typeid = document.getElementById('typeid').getAttribute('value')
    let classweb = document.getElementById('classweb').getAttribute('value')
    var typename = document.getElementById('typename').getAttribute('value')
    let isios = document.getElementById('isios').getAttribute('value')
    let classid = document.getElementById('classid').getAttribute('value')
    let type = isios === '0' ? '2' : '3'
    if (isIphone) {
      if (classweb === '2') {
        let azurl = window.location.href
        let azurlarr = azurl.split('/')
        let azurlid = azurlarr[5].replace('.html', '')
        if(isios === '0'){
          azurl = azurl.replace(azurlid, classid)
          window.location.href = azurl
        }
      }
      let lm = 2
    }
    else {
      if (classweb === '2') {
        let azurl = window.location.href
        let azurlarr = azurl.split('/')
        let azurlid = azurlarr[5].replace('.html', '')
        if (isios === '1') {
          azurl = azurl.replace(azurlid, classid)
          window.location.href = azurl
        }
      }
      let lm = 1
    }
    let btn1 = this.element.querySelector('#btn1')
    let btn2 = this.element.querySelector('#btn2')
    let btn3 = this.element.querySelector('#btn3')
    let lists1 = this.element.querySelector('.lists1')
    let lists2 = this.element.querySelector('.lists2')
    let lists3 = this.element.querySelector('.lists3')
    let p = 10
    btn1.onclick = function () {
      if (btn1.innerText === '加载完毕啦') return false
      // 创建一个Request对象
      let req = new Request('https://admin.veryhuo.com/mobile/open/list_more_zuixin?type='+ type + '&p='+ p + '&type_id=' + typeid, {
        method: 'GET',
        cache: 'reload'
      });
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
            if (dt.litpic === '') {
              dt.litpic ='/images/nologo.png'
            }
            if (dt.version === 0) {
              dt.version = dt.os
            } else {
              dt.softrank = 5
            }
            khtml = document.createElement('li')
            khtml.innerHTML = "<div><a href='/s/" + dt.id + ".html'><mip-img src='" + dt.litpic + "'></mip-img></a><p><a href='/s/" + dt.id + ".html'>"+ dt.title + "</a><span class='star'><span class='star" + dt.softrank + "'></span></span><span class='size'>" + typename + "<i>|</i>" + dt.version + "<i>|</i>" + dt.softsize + "</span></p></div><a href='/s/" + dt.id + ".html' class='aDown'>下载</a>"
            zz += 1
            lists1.appendChild(khtml)
          }
          if (len < 10) {
            btn1.innerText = '加载完毕啦,么么哒~'
          } else {
            btn1.innerText = '点击有惊喜,萌萌哒~'
          }
          p = p + 30
        }
      })
    }
    let hqp = 10
    btn2.onclick = function () {
      if(btn2.innerText === "加载完毕啦") return false
      let req = new Request('https://admin.veryhuo.com/mobile/open/list_more_zuire?type='+ type +'&p='+ hqp +'&type_id=' + typeNum, {
        method: 'GET',
        cache: 'reload'
      });
      fetch(req).then(function (response) {
        return response.json()
      }).then(function (data) {
        if (data === '') {
          btn2.innerText = '加载完毕啦,么么哒~'
          return false
        } else {
          btn2.innerText = '加载中...'
          let rhtml = ''
          let len = data.length
          for (let i = 0; i < len; i++) {
            let dt = data[i]
            console.log(dt)
            if (dt.litpic === '') {
              dt.litpic = '/images/nologo.png'
            } else {
              dt.litpic = 'https://www.veryhuo.com'+ dt.litpic
            }
            if (dt.version === 0) {
              dt.version = dt.os
            } else {
              dt.softrank = 5
            }
            rhtml = document.createElement("li")
            rhtml.innerHTML = "<div><a href='/s/"+dt.id+".html'><mip-img src='"+dt.litpic+"'></mip-img></a><p><a href='/s/"+dt.id+".html'>"+dt.title+"</a><span class='star'><span class='star"+dt.softrank+"'></span></span><span class='size'>"+value+"<i>|</i>"+dt.version+"<i>|</i>"+dt.softsize+"</span></p></div><a href='/s/"+dt.id+".html' class='aDown'>下载</a>"
            zz += 1;
            lists2.appendChild(rhtml)
          }
          if (len < 20) {
            btn2.innerText = '加载完毕啦,么么哒~'
          }
          else {
            btn2.innerText = '点击有惊喜,萌萌哒~'
          }
          hqp = hqp + 30
        }
      });
    };
    let zxp = 10
    btn3.onclick = function () {
      if(btn3.innerText === "加载完毕啦") return false;
      // 创建一个Request对象
      let req = new Request('https://admin.veryhuo.com/mobile/open/list_more_paihang?type='+type+'&p='+zxp+'&type_id='+typeNum,{
        method: 'GET',
        cache: 'reload'
      });
      fetch(req).then(function (response) {
        return response.json()
      }).then(function (data) {
        if (data === '') {
          btn3.innerText = '加载完毕啦,么么哒~'
          return false
        }else{
          btn3.innerText = '加载中...'
          let phtml = ''
          let len = data.length
          for (let i = 0;i < len; i++) {
            let dt = data[i]
            console.log(dt)
            if (dt.litpic === '') {
              dt.litpic='/images/nologo.png'
            } else {
              dt.litpic = 'https://www.veryhuo.com' + dt.litpic
            }
            if (dt.version === 0) {
              dt.version = dt.os
            } else {
              dt.softrank = 5
            }
            phtml = document.createElement('li')
            phtml.innerHTML = "<div><a href='/s/" + dt.id + ".html'><mip-img src='" + dt.litpic + "'></mip-img></a><p><a href='/s/"+dt.id+".html'>" + dt.title + "</a><span class='star'><span class='star" + dt.softrank + "'></span></span><span class='size'>" + value + "<i>|</i>" + dt.version + "<i>|</i>" + dt.softsize + "</span></p></div><a href='/s/" + dt.id + ".html' class='aDown'>下载</a>"
            zz += 1;
            lists3.appendChild(phtml)
          }
          if (len < 20) {
            btn3.innerText = '加载完毕啦,么么哒~'
          }
          else {
            btn3.innerText = '点击有惊喜,萌萌哒~'
          }
          zxp = zxp + 30
        }
      })
    }
  }
}
