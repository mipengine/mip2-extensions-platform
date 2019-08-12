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
    let PageType = ''
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
    let cnav = this.element.querySelectorAll('nav')[0]   // 导航盒子
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
    };
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
    let lis = this.element.querySelectorAll('.hqnav i');
    let uls = this.element.querySelectorAll('.speContent');
    for (let i = 0; i < lis.length; i++) {
      lis[i].id = i;
      lis[i].onclick = function () {
        for (let j = 0; j < lis.length; j++) {
          lis[j].className = '';
          uls[j].style.display = 'none'
        }
        this.className = 'cur'
        uls[this.id].style.display = 'block'
      }
    }
    // 点击更多按钮
    let btn1 = this.element.querySelector('#btn1');
    let btn2 = this.element.querySelector('#btn2');
    let specG = this.element.querySelector('#spec-game');
    let specS = this.element.querySelector('#spec-soft');
    let sp1 = 20
    let zz = 13
    btn1.onclick = function () {
      if (btn1.innerText === '加载完毕啦，么么哒~') return false;
      // 创建一个Request对象
      let req = new Request('https://admin.veryhuo.com/mobile/open/spec_more?type=1&p='+sp1, {
        method: 'GET',
        cache: 'reload'
      });
      fetch(req).then(function (response) {
        return response.json()
      }).then(function(data) {
        if (data === '') {
          btn1.innerText = '加载完毕啦,么么哒~'
          return false
        }else{
          btn1.innerText = '加载中...'
          let khtml = '';
          let len = data.length;
          for (let i = 0;i < len; i++) {
            let dt = data[i];
            console.log(dt)
            if (dt.litpic === '') {
              dt.litpic = '/images/nologo.png'
            } else {
              dt.litpic='https://admin.veryhuo.com/upload/'+dt.litpic
            }
            khtml = document.createElement("li")
            khtml.innerHTML = "<a href='/z/"+dt.filename+"/'><span><mip-img src='"+dt.litpic+"'></mip-img></span><p>"+dt.title+"</p></a>"
            zz += 1;
            specG.appendChild(khtml)
          }
          if (len < 20) {
            btn1.innerText = '加载完毕啦,么么哒~'
          }
          else {
            btn1.innerText = '点击有惊喜,萌萌哒~'
          }
          sp1 = sp1 + 20
        }
      });
    }
    let sp2 = 20;
    btn2.onclick = function () {
      if (btn2.innerText === '加载完毕啦，么么哒~') return false
      // 创建一个Request对象
      let req = new Request('https://admin.veryhuo.com/mobile/open/spec_more?type=2&p='+sp2, {
        method: 'GET',
        cache: 'reload'
      });
      fetch(req).then(function (response) {
        return response.json()
      }).then(function(data) {
        if (data === '') {
          btn2.innerText = '加载完毕啦,么么哒~';
          return false
        }else{
          btn2.innerText = '加载中...'
          let shtml = '';
          let len = data.length
          for (let i = 0;i < len; i++) {
            let dt = data[i]
            console.log(dt)
            if (dt.litpic === '') {
              dt.litpic = '/images/nologo.png'
            } else {
              dt.litpic='https://admin.veryhuo.com/upload/'+dt.litpic
            }
            shtml = document.createElement("li")
            shtml.innerHTML = "<a href='/z/"+dt.filename+"/'><span><mip-img src='"+dt.litpic+"'></mip-img></span><p>"+dt.title+"</p></a>";
            zz += 1
            specS.appendChild(shtml)
          }
          if (len < 20) {
            btn2.innerText = '加载完毕啦,么么哒~'
          }
          else {
            btn2.innerText = '点击有惊喜,萌萌哒~'
          }
          sp2 = sp2 + 20
        }
      })
    }
  }
}
