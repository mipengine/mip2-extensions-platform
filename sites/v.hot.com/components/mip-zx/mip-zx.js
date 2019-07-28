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
        let ztheader = this.element.querySelectorAll('.ztheader')
        let cSOHUCS = this.element.querySelectorAll('#SOHUCS')
        if (cSOHUCS.length > 0) {
            if (cSOHUCS[0].attributes['PageType'].value !== undefined) {
                PageType = cSOHUCS[0].attributes['PageType'].value
            }
        }
        let oDiv = this.element.querySelectorAll('.SearchBox')[0]   // 搜索按钮盒子
        let searBtn = this.element.querySelectorAll('.SBBtn button')[0]    // 搜索按钮
        let searInp = this.element.querySelectorAll('.SBInp input')[0]    // 搜索框
        // let alert = this.element.querySelectorAll('#confirm')[0]   //input 提示框
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
        let lookmore = this.element.querySelectorAll('.lookmore')    // 查看更多按钮
        let li = this.element.querySelectorAll('.CRCSTitleC li.tab-item')
        let zxNav = this.element.querySelector('#zxNav');

        window.addEventListener('scroll', function () {
            // 页面滚动一定高度时，显示吸顶导航盒子
            if (document.documentElement.scrollTop > 80) {
                css(fixNav, {display: 'block'})
                css(zxNav, {display: 'none'})
            } else if(document.documentElement.scrollTop < 30) {
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

        let zxAs = this.element.querySelectorAll('#zxnav-tit a');    // 获取资讯标题
        let open = this.element.querySelector('.open');   // 展开按钮
        let close = this.element.querySelector('.close')  // 关闭按钮
        open.onclick = function () {
            css(zxAs, {display: 'block'});
            css(open, {display: 'none'});
        }
        close.onclick = function () {
            for (let i = 0; i < zxAs.length; i++) {
                if (zxAs[i] > 5) {
                    css(zxAs[i], {display: 'none'});
                }
            }
            css(close, {display: 'none'});
            css(open, {display: 'block'});
        }
    }
}
