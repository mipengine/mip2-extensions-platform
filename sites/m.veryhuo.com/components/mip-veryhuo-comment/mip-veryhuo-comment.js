/**
 * @file 评论模块
 * @author fl
 */

const { CustomElement, util } = MIP
const { css } = util

export default class MIPMpc6Comment extends CustomElement {
  build () {
    let bnum = 0
    let nnum = 0
    let PageType = 'asp'
    let mclassifyCont = this.element.querySelectorAll('#mclassifyCont')[0]
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
    let ztheader = this.element.querySelectorAll('.ztheader')
    let hClass = this.element.querySelectorAll('.ztheader .hClass')
    let hKeyList = this.element.querySelectorAll('.ztheader .hKeyList')[0]
    let cKeyList = this.element.querySelectorAll('.hKeyList')[0]
    let cp = this.element.querySelectorAll('.hKeyList p')[0]
    let cimg = this.element.querySelectorAll('.ztheader img')[0]
    let ctent = this.element.querySelectorAll('.ztheader .hContent')[0]
    let dContNavTab = this.element.querySelectorAll('.DContNavTab li')
    let cwrapper = this.element.querySelector('#wrapper')
    let lDSContent = this.element.querySelector('.DSContent')
    let cDSContent = this.element.querySelector('#DSContent')
    let cdescript = this.element.querySelector('#descript')
    let lhqCTitle = this.element.querySelectorAll('.hqCTitle')
    let ljptjApp = this.element.querySelectorAll('.jptjApp')
    let loryverbox = this.element.querySelectorAll('.oryverbox')
    let cJPContent = this.element.querySelector('#JPContent')
    if (lDSContent !== null) {
      if (lDSContent.offsetHeight > 310) {
        css(lDSContent, {height: 310})
        css(cDSContent, {display: 'block'})
      } else {
        css(cDSContent, {display: 'none'})
      }
    }
    let coryverlist = this.element.querySelectorAll('.oryverlist')[0]
    let cBContent = this.element.querySelectorAll('#BBContent')[0]
    if (loryverbox.length > 0) {
      let dbp = this.element.querySelectorAll('.oryverlist p').length
      if (dbp > 3 && dbp !== 0) {
        css(coryverlist, {height: 152})
        css(cBContent, {display: 'block'})
      } else {
        css(cBContent, {display: 'none'})
      }
    }
    let xgtjheight = this.element.querySelectorAll('.xgtj .xgtjlist li')
    let cxgtj = this.element.querySelectorAll('.xgtj .xgtjlist')[0]
    let cxgtjlist = this.element.querySelectorAll('#xgtjlist')[0]
    if (xgtjheight.length > 10) {
      css(cxgtj, {height: 810})
      css(cxgtjlist, {display: 'block'})
    } else {
      css(cxgtj, {height: 'auto'})
    }
    let cmation = this.element.querySelectorAll('.mation .xgwzlist li')
    let cxgwzlist = this.element.querySelectorAll('.mation .xgwzlist')
    let cxgwzgd = this.element.querySelectorAll('#xgwzlist')
    let lxgtj = this.element.querySelectorAll('.xgtjlist')[0]
    let lxgwzlist = this.element.querySelectorAll('.xgwzlist')
    if (cmation.length > 10) {
      css(cxgwzlist[0], {height: 400})
      css(cxgwzgd[0], {display: 'block'})
    } else {
      css(cxgwzlist[0], {height: 'auto'})
    }
    function trim (s) {
      return s.replace(/(^\s*)|(\s*$)/g, '')
    }
    let lookmore = this.element.querySelectorAll('.lookmore')
    let li = this.element.querySelectorAll('.CRCSTitleC li.tab-item')
    let cguessCont = this.element.querySelectorAll('.guessCont')
    let cplbutton = this.element.querySelectorAll('.plbutton')
    let cpltext = this.element.querySelectorAll('#pltext')[0]
    let cancel = this.element.querySelectorAll('.cancel')[0]
    css(cplbutton[0], {display: 'none'})
    css(cplbutton[1], {display: 'none'})
    let tjbutton = this.element.querySelectorAll('.tjbutton')[0]
    let calertmes = this.element.querySelectorAll('#alertmes')[0]
    let yzm = this.element.querySelectorAll('.yzm')[0]
    let hContent = this.element.querySelectorAll('.ztheader .hContent')
    let cContent = this.element.querySelectorAll('.hClassCont,.hClassContDiv')
    let sBBtn = this.element.querySelectorAll('.SBBtn')
    let cinput = this.element.querySelectorAll('.SBInp input')
    window.addEventListener('scroll', function () {
      if (document.documentElement.scrollTop > 80) {
        css(fixNav, {display: 'block'})
      } else {
        css(fixNav, {display: 'none'})
      }
      if (document.documentElement.scrollTop > 300) {
        css(cbacktop, {display: 'block'})
      } else {
        css(cbacktop, {display: 'none'})
      }
      if (ztheader.length > 0) {
        if (document.documentElement.scrollTop > 150) {
          css(hClass, {top: 10, position: 'fixed'})
          css(hKeyList, {top: 45, position: 'fixed'})
        } else {
          css(hClass, {top: 120, position: 'absolute'})
          css(hKeyList, {top: 195, position: 'absolute'})
        }
        if (document.documentElement.scrollTop > 180) {
          css(cKeyList, {position: 'fixed', height: 90, top: 0, 'border-bottom': '1px dashed #ccc'})
          css(cp, {position: 'relative', top: 48})
          css(cimg, {display: 'none'})
          css(ctent, {display: 'none'})
        } else {
          css(cKeyList, {position: 'relative', top: 195, height: 45, 'border-bottom': '0px dashed #ccc'})
          css(cp, {position: 'relative', top: 0})
          css(cimg, {display: 'block'})
          css(ctent, {display: 'block'})
        }
      }
    })
    cbacktop.onclick = function () {
      document.documentElement.scrollTop = 0
    }
    if (hContent.length > 0) {
      for (let i = 0; i < hContent.length; i++) {
        hContent[i].onclick = function () {
          css(cContent[0], {display: 'block'})
          css(cContent[1], {display: 'block'})
        }
      }
    }
    cContent[1].onclick = function () {
      css(cContent[0], {display: 'none'})
      css(cContent[1], {display: 'none'})
    }
    if (hClass.length > 0) {
      hClass[0].onclick = function () {
        css(cContent[0], {display: 'block'})
        css(cContent[1], {display: 'block'})
      }
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
      for (let i = 0; i < dContNavTab.length; i++) {
        dContNavTab[i].onclick = function () {
          dContNavTab[i].index = i
          if (this.index === 0) {
            dContNavTab[0].className = 'm-hover'
            css(cwrapper, {display: 'block'})
            css(lDSContent, {display: 'block'})
            css(cDSContent, {display: 'block'})
            css(cdescript, {display: 'block'})
            if (lhqCTitle.length > 0) {
              css(lhqCTitle[0], {display: 'block'})
            }
            css(ljptjApp[0], {display: 'block'})
            css(ljptjApp[1], {display: 'block'})
            if (loryverbox.length > 0) {
              css(loryverbox, {display: 'block'})
            }
            css(cJPContent, {display: 'block'})
          } else {
            dContNavTab[0].className = ''
          }
          if (this.index === 1) {
            dContNavTab[1].className = 'm-hover'
            css(cwrapper, {display: 'none'})
            css(lDSContent, {display: 'none'})
            css(cDSContent, {display: 'none'})
            css(cdescript, {display: 'block'})
            if (lhqCTitle.length > 0) {
              css(lhqCTitle[0], {display: 'block'})
            }
            css(ljptjApp[0], {display: 'block'})
            css(ljptjApp[1], {display: 'block'})
            if (loryverbox.length > 0) {
              css(loryverbox, {display: 'block'})
            }
            css(cJPContent, {display: 'block'})
          } else {
            dContNavTab[1].className = ''
          }
          if (this.index === 2) {
            dContNavTab[2].className = 'm-hover'
            css(cwrapper, {display: 'none'})
            css(lDSContent, {display: 'none'})
            css(cDSContent, {display: 'none'})
            css(cdescript, {display: 'none'})
            if (lhqCTitle.length > 0) {
              css(lhqCTitle[0], {display: 'none'})
            }
            css(ljptjApp[0], {display: 'none'})
            css(ljptjApp[1], {display: 'none'})
            if (loryverbox.length > 0) {
              css(loryverbox, {display: 'none'})
            }
            css(cJPContent, {display: 'none'})
          } else {
            dContNavTab[2].className = ''
          }
        }
      }
      for (let i = 0; i < lookmore.length; i++) {
        lookmore[i].onclick = function () {
          let btnText = trim(lookmore[i].innerText)
          if (btnText === '展开全部内容') {
            css(lDSContent, {height: '100%'})
            cDSContent.innerHTML = '<span>收起内容</span><i class=\'cur\'></i>'
          }
          if (btnText === '收起内容') {
            css(lDSContent, {height: 315})
            cDSContent.innerHTML = '<span>展开全部内容</span><i></i>'
          }
          if (btnText === '更多其它版本') {
            css(coryverlist, {height: 'auto'})
            cBContent.innerHTML = '<span>收起其它版本</span><i class=\'cur\'></i>'
          }
          if (btnText === '收起其它版本') {
            css(coryverlist, {height: 152})
            cBContent.innerHTML = '<span>更多其它版本</span><i></i>'
          }
          if (btnText === '点击查看更多') {
            css(lxgtj, {height: 'auto'})
            cxgtjlist.innerHTML = '<span>收起相关软件</span><i class=\'cur\'></i>'
          }
          if (btnText === '收起相关软件') {
            css(lxgtj, {height: 810})
            cxgtjlist.innerHTML = '<span>点击查看更多</span><i></i>'
          }
          if (lxgwzlist.length > 0) {
            if (btnText === '查看更多资讯') {
              css(lxgwzlist[0], {height: 'auto'})
              cxgwzgd[0].innerHTML = '<span>收起相关资讯</span><i class=\'cur\'></i>'
            }
            if (btnText === '收起相关资讯') {
              css(lxgwzlist[0], {height: 400})
              cxgwzgd[0].innerHTML = '<span>查看更多资讯</span><i></i>'
            }
          }
        }
      }
      for (let i = 0; i < li.length; i++) {
        li[i].onclick = function () {
          let numm = li[i].attributes['did'].value
          if (Number(numm) === 0) {
            li[0].className = ''
            css(cguessCont[0], {display: 'block'})
          } else {
            li[0].className = 'tab-item cur'
            css(cguessCont[0], {display: 'none'})
          }
          if (Number(numm) === 1) {
            li[1].className = ''
            css(cguessCont[1], {display: 'block'})
          } else {
            li[1].className = 'tab-item cur'
            css(cguessCont[1], {display: 'none'})
          }
        }
      }
      cpltext.onclick = function () {
        css(cplbutton[0], { display: 'block' })
        css(cplbutton[1], { display: '' })
      }
      cancel.onclick = function () {
        css(cplbutton[0], { display: 'none' })
        css(cplbutton[1], { display: 'none' })
      }
      tjbutton.onclick = function () {
        let msg = cpltext.value
        let temsoftid = cSOHUCS[0].attributes['sid'].value
        if (msg.length < 3 || msg.lenght > 200) {
          calertmes.innerHTML = '评论的内容不能小于3或大于200个字符！'
          css(cContent[0], {display: 'block'})
          css(cContent[1], {display: 'block'})
          cpltext.focus()
          return false
        }
        let imgcode = yzm.value
        if (imgcode === '') {
          calertmes.innerHTML = '请输入验证码！'
          css(cContent[0], {display: 'block'})
          css(cContent[1], {display: 'block'})
          yzm.focus()
          return false
        }
        fetch('/postfrm_ajax.' + PageType + '?comment=' + msg + '&softid=' + temsoftid + '&pImgCode=' + imgcode).then(function (res) {
          return res.text()
        }).then(function (text) {
          cpltext.focus()
          cpltext.attributes['placeholder'].value = ''
          calertmes.innerHTML = '你的评论发表成功，需要审核才能显示！'
          css(cContent[0], {display: 'block'})
          css(cContent[1], {display: 'block'})
        })
      }
      sBBtn[0].onclick = function () {
        let sV = cinput[0].value
        if (sV.length < 2) {
          calertmes.innerHTML = '请输入搜索词！'
          css(cContent[0], {display: 'block'})
          css(cContent[1], {display: 'block'})
          return false
        }
        let forpath = '/search.' + PageType + '?wd=' + encodeURI(sV)
        MIP.viewer.open(forpath)
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
  }
}
