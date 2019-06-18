/**
 * @file 评论模块
 * @author fl
 */

const { CustomElement, util } = MIP
const { jsonParse, dom, css } = util

export default class MIPMpc6Comment extends CustomElement {
  build () {
    let b = 0;
    let n = 0;
    let PageType = 'asp';
    let mclassifyCont=document.getElementById('mclassifyCont');
    if (document.querySelectorAll('SOHUCS').length > 0) {
      if (document.getElementById('SOHUCS').attributes['PageType'].value !== undefined) {
        PageType = document.getElementById('SOHUCS').attributes['PageType'].value;
      }
    }
    let oDiv = document.getElementsByClassName('SearchBox')[0];
    oDiv.onclick = function () {
      if (0 === b) {
        css(mclassifyCont, {display: 'none'});
        css(document.getElementsByClassName('searchDiv')[0], {display: 'block'});
        let sear = document.getElementsByClassName('searchDivinput');
        if (sear.length > 0) {sear[0].focus()}
        b = 1;
        n = 0;
      }
      else {
        if (n === 1) {
          css(mclassifyCont, {display: 'none'});
          n = 0;
        }
        else {
          css(document.getElementsByTagName('nav')[0], {height: 40});
          css(document.getElementsByClassName('searchDiv')[0], {display: 'none'});
          b = 0;
        }
      }
    }
    let mclassify = document.getElementById('mclassify');
    mclassify.onclick = function () {
      if (0 === n) {
        css(mclassifyCont, {display: 'block'});
        let pullNav = document.querySelectorAll('#nav .pullNav');
        let moreNav = document.querySelectorAll('#nav .moreNav');
        if (pullNav.length > 0) {pullNav[0].classList.remove('open');}
        if (moreNav.length > 0) {css(moreNav[0], {display: 'none'});}
        n = 1;
      }
      else {
        css(mclassifyCont, {display: 'none'});
        n = 0;
      }
    }
    let cmslass = mclassifyCont.getElementsByTagName('p')[0].getElementsByTagName('span');
    let cul = mclassifyCont.getElementsByTagName('ul')
    for (let i = 0; i < cmslass.length; i++) {
      cmslass[i].onclick = function () {
        let siblings = this.parentNode.childNodes;
        for (let i = 0; i < siblings.length; i++) {
          if (siblings[i].nodeType === 1) {
            siblings[i].className = '';
            this.className = 'cur';
            cmslass[i].index = i;
          }
          
        }
        if (this.index === 0) {
          cul[0].className = 'on';
        }
        else {
          cul[0].className = '';
        }
        if (this.index==1) {
          cul[1].className = 'on';
        }
        else {
          cul[1].className = '';
        }
      }
    }
    window.onscroll = function () {
      if (document.documentElement.scrollTop > 80) {
        css(document.querySelector('.fixNav'), {display: 'block'});
      }
      else {
        css(document.querySelector('.fixNav'), {display: 'none'});
      }
      if (document.documentElement.scrollTop > 300) {
        css(document.getElementById('Cbacktop'), {display: 'block'});
      }
      else {
        css(document.getElementById('Cbacktop'), {display: 'none'});
      }
      if (document.querySelectorAll('.ztheader').length > 0) {
          if (document.documentElement.scrollTop > 150) {
            let hClass = document.getElementsByClassName('ztheader')[0].getElementsByClassName('hClass')[0];
            let hKeyList = document.getElementsByClassName('ztheader')[0].getElementsByClassName('hKeyList')[0];
            css(hClass, {top: 10, position: 'fixed'});
            css(hKeyList, {top: 45, position: 'fixed'});
          }
          else {
            let hClass = document.getElementsByClassName('ztheader')[0].getElementsByClassName('hClass')[0];
            let hKeyList = document.getElementsByClassName('ztheader')[0].getElementsByClassName('hKeyList')[0];
            css(hClass, {top: 120, position: 'absolute'})
            css(hKeyList, {top: 195, position: 'absolute'})
          }
          if (document.documentElement.scrollTop > 180) {
            let hKeyList = document.getElementsByClassName('ztheader')[0];
            let cp = document.getElementsByClassName('ztheader')[0].getElementsByTagName('p')[0];
            css(hKeyList, {position: 'fixed', height: 90, top: 0, 'border-bottom':'1px dashed #ccc'})
            css(cp, {position: 'relative', top: 48})
            css(document.getElementsByClassName('ztheader')[0].getElementsByTagName('img')[0], {display: 'none'});
            css(document.getElementsByClassName('ztheader')[0].getElementsByClassName('hContent')[0], {display: 'none'});
          }
          else {
            let hKeyList = document.getElementsByClassName('ztheader')[0]
            css(hKeyList, {position: 'relative', top: 195, height: 45, 'border-bottom': '0px dashed #ccc'})
            let cp = document.getElementsByClassName('hKeyList')[0].getElementsByTagName('p')[0];
            css(cp, {position: 'relative', top: 0})
            css(document.getElementsByClassName('ztheader')[0].getElementsByTagName('img')[0], {display: 'block'});
            css(document.getElementsByClassName('ztheader')[0].getElementsByClassName('hContent')[0], {display: 'block'});
          }
      }
    }
    let Cbacktop = document.getElementById('Cbacktop');
    Cbacktop.onclick = function () {
      document.documentElement.scrollTop=0;
    }
    let DContNavTab = document.querySelectorAll('.DContNavTab li');
    let cwrapper = document.querySelector('#wrapper');
    let lDSContent = document.querySelector('.DSContent');
    let cDSContent = document.querySelector('#DSContent');
    let cdescript = document.querySelector('#descript');
    let lhqCTitle = document.querySelectorAll('.hqCTitle');
    let ljptjApp = document.querySelectorAll('.jptjApp');
    let loryverbox = document.querySelectorAll('.oryverbox');
    let cJPContent = document.querySelector('#JPContent');
    for (let i = 0; i < DContNavTab.length; i++) {
      DContNavTab[i].onclick = function () {
        DContNavTab[i].index = i;
        if (this.index === 0) {
          DContNavTab[0].className = 'm-hover';
          css(cwrapper, {display: 'block'});
          css(lDSContent, {display: 'block'});
          css(cDSContent, {display: 'block'});
          css(cdescript, {display: 'block'});
          if (lhqCTitle.length>0) {css(lhqCTitle[0], {display: 'block'});}
          css(ljptjApp[0], {display: 'block'});
          css(ljptjApp[1], {display: 'block'});
          if (loryverbox.length>0) {css(loryverbox, {display: 'block'});}
          css(cJPContent, {display: 'block'});
        }
        else {
          DContNavTab[0].className = '';
        }
        if (this.index === 1) {
          DContNavTab[1].className = 'm-hover';
          css(cwrapper, {display: 'none'});
          css(lDSContent, {display: 'none'});
          css(cDSContent, {display: 'none'});
          css(cdescript, {display: 'block'});
          if (lhqCTitle.length > 0) {css(lhqCTitle[0], {display: 'block'});}
          css(ljptjApp[0], {display: 'block'});
          css(ljptjApp[1], {display: 'block'});
          if (loryverbox.length>0) {css(loryverbox, {display: 'block'});}
          css(cJPContent, {display: 'block'});
        }
        else {
          DContNavTab[1].className = '';
        }
        if (this.index === 2) {
          DContNavTab[2].className = 'm-hover';
          css(cwrapper, {display: 'none'});
          css(lDSContent, {display: 'none'});
          css(cDSContent, {display: 'none'});
          css(cdescript, {display: 'none'});
          if (lhqCTitle.length > 0) {css(lhqCTitle[0], {display: 'none'});}
          css(ljptjApp[0], {display: 'none'});
          css(ljptjApp[1], {display: 'none'});
          if (loryverbox.length>0) {css(loryverbox, {display: 'none'});}
          css(cJPContent, {display: 'none'});
        }
        else {
          DContNavTab[2].className = '';
        }
      }
    }
    if (document.getElementsByClassName('DSContent')[0].offsetHeight > 310) {
      css(document.querySelectorAll('.DSContent')[0], {height: 310});
      css(document.querySelector('#DSContent'), {display: 'block'});
    } else {
      css(document.querySelectorAll('#DSContent')[0], {display: 'none'});
    }
    if (loryverbox.length > 0) {
      let dbp = document.getElementsByClassName('oryverlist')[0].getElementsByTagName('p').length;
      if (dbp > 3 && dbp !== 0) {
        css(document.getElementsByClassName('oryverlist')[0], {height: 152});
        css(document.getElementById('BBContent'), {display: 'block'});
      }
      else {
        css(document.getElementById('BBContent'), {display: 'none'});
      }
    }
    let xgtjheight = document.querySelectorAll('.xgtj .xgtjlist li').length;
    if (xgtjheight > 10) {
      css(document.querySelectorAll('.xgtj .xgtjlist')[0], {height: 810});
      css(document.querySelectorAll('#xgtjlist')[0], {display: 'block'});
    }
    else {
      css(document.querySelectorAll('.xgtj .xgtjlist')[0], {height: 'auto'});
    }
    if (document.querySelectorAll('.mation .xgwzlist li').length > 0) {
      let xgwzheight = document.querySelectorAll('.mation .xgwzlist li').length;
      if (xgwzheight > 10) {
        css(document.querySelectorAll('.mation .xgwzlist')[0], {height: 400});
        css(document.querySelectorAll('#xgwzlist')[0], {display: 'block'});
      } else {
        css(document.querySelectorAll('.mation .xgwzlist')[0], {height: 'auto'});
      }
    }
    function trim(s) {
      return s.replace(/(^\s*)|(\s*$)/g, '');
    }
    let lookmore = document.getElementsByClassName('lookmore');
    for (let i = 0; i < lookmore.length; i++) {
      lookmore[i].onclick = function () {
        let btnText = trim(lookmore[i].innerText);
        if (btnText === '展开全部内容') {
          css(document.querySelector('.DSContent'), {height: '100%'});
          document.querySelectorAll('#DSContent')[0].innerHTML = '<span>收起内容</span><i class=\'cur\'></i>';
        }
        if (btnText === '收起内容') {
          css(document.querySelector('.DSContent'), {height: 315});
          document.querySelectorAll('#DSContent')[0].innerHTML = '<span>展开全部内容</span><i></i>';
        }
        if (btnText === '更多其它版本') {
          css(document.querySelector('.oryverlist'), {height: 'auto'});
          document.querySelectorAll('#BBContent')[0].innerHTML = '<span>收起其它版本</span><i class=\'cur\'></i>';
        }
        if (btnText === '收起其它版本') {
          css(document.querySelector('.oryverlist'), {height: 152});
          document.querySelectorAll('#BBContent')[0].innerHTML = '<span>更多其它版本</span><i></i>';
        }
        if (btnText === '点击查看更多') {
          css(document.querySelector('.xgtjlist'), {height: 'auto'});
          document.querySelectorAll('#xgtjlist')[0].innerHTML ='<span>收起相关软件</span><i class=\'cur\'></i>';
        }
        if (btnText === '收起相关软件') {
          css(document.querySelector('.xgtjlist'), {height: 810});
          document.querySelectorAll('#xgtjlist')[0].innerHTML = '<span>点击查看更多</span><i></i>';
        }
        if (document.querySelectorAll('xgwzlist').length > 0) {
          if (btnText === '查看更多资讯') {
            css(document.querySelector('.xgwzlist'), {height: 'auto'});
            document.querySelectorAll('#xgwzlist')[0].innerHTML = '<span>收起相关资讯</span><i class=\'cur\'></i>';
          }
          if (btnText === '收起相关资讯') {
            css(document.querySelector('.xgwzlist'), {height: 400});
            document.querySelectorAll('#xgwzlist')[0].innerHTML = '<span>查看更多资讯</span><i></i>';
          }
        }
      }
    }
    let li = document.querySelectorAll('.CRCSTitleC li.tab-item')
    for (let i = 0; i < li.length; i++) {
      li[i].onclick = function () {
        var numm = li[i].attributes['did'].value;
        if (Number(numm) === 0) {
          li[0].className = '';
          css(document.querySelectorAll('.guessCont')[0], {display: 'block'});
        }
        else {
          li[0].className = 'tab-item cur';
          css(document.querySelectorAll('.guessCont')[0], {display: 'none'});
        }
        if (Number(numm) == 1) {
          li[1].className = '';
          css(document.querySelectorAll('.guessCont')[1], {display: 'block'});
        }
        else {
          li[1].className = 'tab-item cur';
          css(document.querySelectorAll('.guessCont')[1], {display: 'none'});
        }
      }
    }
    css(document.querySelectorAll('.plbutton')[0], {display: 'none'});
    css(document.querySelectorAll('.plbutton')[1], {display: 'none'});
    document.getElementById('pltext').onclick=function () {
      css(document.querySelectorAll('.plbutton')[0], { display: 'block' });
      css(document.querySelectorAll('.plbutton')[1], { display: '' });
    }
    document.getElementsByClassName('cancel')[0].onclick = function () {
      css(document.querySelectorAll('.plbutton')[0], { display: 'none' });
      css(document.querySelectorAll('.plbutton')[1], { display: 'none' });
    }
    document.getElementsByClassName('tjbutton')[0].onclick = function () {
      let msg = document.querySelectorAll('#pltext')[0].value;
      let temsoftid = document.querySelectorAll('#SOHUCS')[0].attributes['sid'].value;
      if (msg.length < 3 || msg.lenght > 200) {
          document.querySelectorAll('#alertmes')[0].innerHTML='评论的内容不能小于3或大于200个字符！';
          css(document.querySelectorAll('.hClassCont')[0],{display: 'block'});
          css(document.querySelectorAll('.hClassContDiv')[0],{display: 'block'});
          document.querySelectorAll('#pltext')[0].focus();
          return false;
      }
      let imgcode = document.querySelectorAll('.yzm')[0].value;
      if (imgcode === '') {
        document.querySelectorAll('#alertmes')[0].innerHTML='请输入验证码！';
        css(document.querySelectorAll('.hClassCont')[0],{display: 'block'});
        css(document.querySelectorAll('.hClassContDiv')[0],{display: 'block'});
        document.querySelectorAll('.yzm')[0].focus();
        return false;
      }
      fetch('/postfrm_ajax.'+PageType+'?comment='+msg+'&softid='+temsoftid+'&pImgCode='+imgcode).then(function (res) { 
        return res.text();
      }).then(function (text) {
        let text1 = text.slice(0,4);
        let text2 = text.slice(0,2);
        if (text1 === 'code') {
          document.querySelectorAll('#alertmes')[0].innerHTML = '验证码错误，请重新输入！';
          css(document.querySelectorAll('.hClassCont')[0],{display: 'block'});
          css(document.querySelectorAll('.hClassContDiv')[0],{display: 'block'});
          document.querySelectorAll('.yzm')[0].focus();
        }else if (text2 === 'OK') {
          document.querySelectorAll('#pltext')[0].focus();
          document.querySelectorAll('#pltext')[0].attributes['placeholder'].value = ''
          document.querySelectorAll('.yzm')[0].value = '';
          document.querySelectorAll('#alertmes')[0].innerHTML = '你的评论发表成功，需要审核才能显示！';
          css(document.querySelectorAll('.hClassCont')[0],{display: 'block'});
          css(document.querySelectorAll('.hClassContDiv')[0],{display: 'block'});
        }
        else {
          document.querySelectorAll('#alertmes')[0].innerHTML = '数据提交出错！';
          css(document.querySelectorAll('.hClassCont')[0],{display: 'block'});
          css(document.querySelectorAll('.hClassContDiv')[0],{display: 'block'});
        }
      })
    }
    let hContent = document.querySelectorAll('.ztheader .hContent');
    if (hContent.length > 0) {
      for (let i = 0; i < hContent.length; i++) {
        hContent[i].onclick = function () { 
          css(document.querySelectorAll('.hClassCont,.hClassContDiv')[i], {display: 'block'});
        }
      }
    }
    let tagSpan = document.querySelectorAll('.hClassContDiv,.hClassContDiv span');
    if (tagSpan.length > 0) {
      for (let i = 0; i < tagSpan.length; i++) {
        tagSpan[i].onclick = function () { 
          css(document.querySelectorAll('.hClassCont')[i], {display: 'none'});
          css(document.querySelectorAll('.hClassContDiv')[i], {display: 'none'});
        }
      }
    }
    document.getElementsByClassName('SBBtn')[0].onclick = function () {
      let sV = document.querySelectorAll('.SBInp input')[0].value;
      if (sV.length < 2) {
        document.getElementById('alertmes').innerHTML = '请输入搜索词！';
        css(document.querySelectorAll('.hClassCont')[0], {display: 'block'});
        css(document.querySelectorAll('.hClassContDiv')[0], {display: 'block'});
        return false;
      }
      var forpath = '/search.' + PageType + '?wd=' + encodeURI(sV);
      window.location.href = forpath;
    }
  }
}