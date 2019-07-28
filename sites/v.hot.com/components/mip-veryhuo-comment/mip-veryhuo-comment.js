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
    let PageType = 'asp'
    let mclassifyCont = this.element.querySelectorAll('#mclassifyCont')[0]   // 隐藏的分类盒子
    let cSOHUCS = this.element.querySelectorAll('#SOHUCS')
    if (cSOHUCS.length > 0) {
      if (cSOHUCS[0].attributes['PageType'].value !== undefined) {
        PageType = cSOHUCS[0].attributes['PageType'].value
      }
    }
    let oDiv = this.element.querySelectorAll('.SearchBox')[0]   // 搜索按钮
    let csearchDiv = this.element.querySelectorAll('.searchDiv')[0]   // 隐藏的搜索框盒子
    let sear = this.element.querySelectorAll('.searchDiv input')    // 隐藏的搜索框
    let cnav = this.element.querySelectorAll('nav')[0]   // 导航盒子
    let mclassify = this.element.querySelectorAll('#mclassify')[0]   // 顶部分类按钮
    let pullNav = this.element.querySelectorAll('#nav .pullNav')    
    let moreNav = this.element.querySelectorAll('#nav .moreNav')
    let cmslass = this.element.querySelectorAll('#mclassifyCont p span')   // 分类tab标题
    let cul = this.element.querySelectorAll('#mclassifyCont ul')    // 顶部分类盒子
    let fixNav = this.element.querySelector('.fixNav')      // 吸顶盒子
    let cbacktop = this.element.querySelectorAll('#Cbacktop')[0]   // 回到顶部按钮

    let ztheader = this.element.querySelectorAll('.ztheader')   // 专题详情页 顶部的图片以及标签的大盒子
    let hClass = this.element.querySelectorAll('.ztheader .hClass')   // 专题详情页 密室逃脱游戏标题盒子
    let hKeyList = this.element.querySelectorAll('.ztheader .hKeyList')[0]   // 专题详情页 标签盒子
    // let cKeyList = this.element.querySelectorAll('.hKeyList')[0]   
    let cp = this.element.querySelectorAll('.hKeyList p')[0]  // 专题详情页 标签盒子
    let cimg = this.element.querySelectorAll('.ztheader img')[0]   // 专题详情页 顶部的图片
    let ctent = this.element.querySelectorAll('.ztheader .hContent')[0]   // 专题详情页 中间滑动文字的盒子 

    let dContNavTab = this.element.querySelectorAll('.DContNavTab li')   // 下载详情页 tab切换的三个标题
    let cwrapper = this.element.querySelector('#wrapper')
    let lDSContent = this.element.querySelector('.DSContent')    // 下载详情页 滑动图片下文字介绍的盒子
    let cDSContent = this.element.querySelector('#DSContent')   // 下载详情页 滑动图片下文字介绍的 展开全部按钮
    let cdescript = this.element.querySelector('#descript')    // 下载详情页  相关软件盒子
    let lhqCTitle = this.element.querySelectorAll('.hqCTitle')  // 下载详情页  同类合集title盒子
    let ljptjApp = this.element.querySelectorAll('.jptjApp')    // // 下载详情页  同类合集软件内容盒子
    let loryverbox = this.element.querySelectorAll('.oryverbox')  // 下载详情页 下载版本部分
    let cJPContent = this.element.querySelector('#JPContent')   // 下载详情页 精品推荐title盒子
    // 下载详情页 判断滑动图片下 文字的高度>310时，显示更多数据且显示按钮
    if (lDSContent !== null) {
      if (lDSContent.offsetHeight > 310) {
        css(lDSContent, {height: 310})
        css(cDSContent, {display: 'block'})
      } else {
        css(cDSContent, {display: 'none'})
      }
    }
    let coryverlist = this.element.querySelectorAll('.oryverlist')[0]  // 下载详情页 下载版本列表盒子
    let cBContent = this.element.querySelectorAll('#BBContent')[0]  // 下载详情页 下载版本列表盒子下 更多版本按钮
    // 判断如果下载版本列表的每条数据>3时，显示更多数据且显示按钮
    if (loryverbox.length > 0) {
      let dbp = this.element.querySelectorAll('.oryverlist p').length
      if (dbp > 3 && dbp !== 0) {
        css(coryverlist, {height: 152})
        css(cBContent, {display: 'block'})
      } else {
        css(cBContent, {display: 'none'})
      }
    }
    let xgtjheight = this.element.querySelectorAll('.xgtj .xgtjlist li')  // 下载详情页 相关软件的li数据
    let cxgtj = this.element.querySelectorAll('.xgtj .xgtjlist')[0]  //  下载详情页 相关软件的ul列表盒子
    let cxgtjlist = this.element.querySelectorAll('#xgtjlist')[0]   // 下载详情页 相关软件查看更多按钮
    // 判断如果 相关软件的li数据>10，显示更多数据且显示按钮
    if (xgtjheight.length > 10) {
      css(cxgtj, {height: 810})
      css(cxgtjlist, {display: 'block'})
    } else {
      css(cxgtj, {height: 'auto'})
    }
    
    let cmation = this.element.querySelectorAll('.mation .xgwzlist li')   // 资讯详情页 相关文章li数据
    let cxgwzlist = this.element.querySelectorAll('.mation .xgwzlist')    // 资讯详情页 相关文章ul列表盒子
    let cxgwzgd = this.element.querySelectorAll('#xgwzlist')     // 资讯详情页 相关文章查看更多按钮
    // let lxgtj = this.element.querySelectorAll('.xgtjlist')[0]
    // let lxgwzlist = this.element.querySelectorAll('.xgwzlist')
    // 判断如果 相关文章li数据>10，显示更多数据及更多按钮
    if (cmation.length > 10) {
      css(cxgwzlist[0], {height: 400})
      css(cxgwzgd[0], {display: 'block'})
    } else {
      css(cxgwzlist[0], {height: 'auto'})
    }
    function trim (s) {
      return s.replace(/(^\s*)|(\s*$)/g, '')
    }

    let lookmore = this.element.querySelectorAll('.lookmore')    // 查看更多按钮
    let li = this.element.querySelectorAll('.CRCSTitleC li.tab-item')
    let cguessCont = this.element.querySelectorAll('.guessCont')   // 下载详情页 同类合集的内容盒子
    let cplbutton = this.element.querySelectorAll('.plbutton')   // 资讯详情页 评论的提交和取消按钮的盒子
    let cpltext = this.element.querySelectorAll('#pltext')[0]    // 资讯详情页 评论的input输入框
    let cancel = this.element.querySelectorAll('.cancel')[0]   // 资讯详情页 评论的取消按钮
    css(cplbutton[0], {display: 'none'})   // 隐藏验证码盒子
    css(cplbutton[1], {display: 'none'})   // 隐藏提交和取消按钮的盒子
    let tjbutton = this.element.querySelectorAll('.tjbutton')[0]   // 资讯详情页 评论的提交按钮
    let calertmes = this.element.querySelectorAll('#alertmes')[0]
    let yzm = this.element.querySelectorAll('.yzm')[0]   // 资讯详情页 验证码input
    let hContent = this.element.querySelectorAll('.ztheader .hContent')   // 专题详情页 中间滑动文字的盒子 
    let cContent = this.element.querySelectorAll('.hClassCont, .hClassContDiv')  //  专题详情页 hClassCont->蒙层 hClassContDiv->弹出框说明文字
    let sBBtn = this.element.querySelectorAll('.SBBtn')   // 资讯详情页 隐藏的搜索按钮
    let cinput = this.element.querySelectorAll('.SBInp input')   // 资讯详情页 隐藏的输入框
    
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
      // 页面滚动一定高度时，专题详情页的吸顶效果
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
    // 点击回到顶部按钮
    cbacktop.onclick = function () {
      document.documentElement.scrollTop = 0
    };

    if (hContent.length > 0) {
      for (let i = 0; i < hContent.length; i++) {
        hContent[i].onclick = function () {
          // 专题详情页 显示蒙层和说明文字盒子
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
      // 点击下载详情页的 tab 标题
      for (let i = 0; i < dContNavTab.length; i++) {
        dContNavTab[i].onclick = function () {
          dContNavTab[i].index = i
          // 如果是第一个标题，添加类样式，且显示所有内容
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
      // 点击更多按钮，根据文字不同做不同处理
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
      // 下载详情页 同类合集tab样式和切换显示
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
      // 点击评论的 input 显示提交、取消按钮
      cpltext.onclick = function () {
        css(cplbutton[0], { display: 'block' })
        css(cplbutton[1], { display: '' })
      }
      // 点击取消按钮隐藏提交、取消按钮
      cancel.onclick = function () {
        css(cplbutton[0], { display: 'none' })   // 隐藏验证码盒子
        css(cplbutton[1], { display: 'none' })
      }
      // 点击提交按钮
      tjbutton.onclick = function () {
        let msg = cpltext.value   // 评论的input框
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
      // 点击顶部 隐藏的搜索按钮
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

    // 首页底部点击加载更多
    // let indexMore = this.element.querySelector('#moreApp');  // 点击有惊喜按钮
    // console.log(indexMore)
    // indexMore.onclick = function () {
    //   console.log(111)
    // };
  }
}
