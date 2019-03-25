/**
 * @file 公用
 * @author fl
 */
const { util } = MIP
const { jsonParse, dom, css } = util

export default class MIPCommon {
  /*
   *设置cookies
   */
  static setCookie(name, value) {
    let d = new Date()
    d.setTime(d.getTime() + 60 * 2000)
    document.cookie = name + '=' + escape(value) + ';expires=' + d.toGMTString()
  }
  /*
   *读取cookies
   */
  static getCookie(name) {
    let reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
    let arr = document.cookie.match(reg)
    if (arr) {
      return parseInt(unescape(arr[2]))
    } else {
      return null
    }
  }
  /*
   *时间函数
   */
  static time(d) {
    let result = ''
    result += [d.getFullYear(), d.getMonth() + 1, d.getDate()].join('/')
    return result.replace(/(-|:)(\d[^\d])/g, '$1' + '0$2')
  }
  /*
   *提示
   */
  static cAlert(msg) {
    if (document.getElementById('alert_tips')) {
      document.getElementById('alert_tips').parentNode.removeChild(document.getElementById('alert_tips'))
    }
    let cTips = dom.create(`<div id="alert_tips" class="animated fadeIn">${msg}</div>`)
    document.body.appendChild(cTips)
    setTimeout(() => {
      if (document.getElementById('alert_tips')) {
        document.getElementById('alert_tips').parentNode.removeChild(document.getElementById('alert_tips'))
      }
    }, 3000)
  }
  /*
   *查找是否在数组中
   */
  static inArray(str, arr) {
    if (str && arr) {
      let aiJson = { num: 0 }
      arr.map((v, i) => {
        if (v.length) {
          v.map((sv) => {
            if (str.indexOf(sv) > -1) {
              aiJson.num++
              aiJson.index = i
            }
          })
        } else {

        }
      })
      return aiJson
    }
  }
  /*
   * 文章动态增加链接 / 动态显示不同内容
   */
  static alterNewUrl (xgwz, id, caNameArr, url) {
    if (id) {
      let ang = [634, 695, 594, 696, 697, 712, 598, 592, 596, 593, 595, 637, 713, 638, 636, 842]
      let anr = [588, 589, 584, 582, 583, 585, 586, 587, 590, 600, 703, 704, 708, 709, 875, 786, 877, 878, 879, 880, 881, 628, 705, 706, 627, 599]
      let ig = [797, 798, 799, 800, 801, 802, 803, 804, 805, 806, 807, 808, 809, 810]
      let ir = [776, 777, 778, 779, 780, 781, 782, 783, 784, 785, 786, 787, 788, 789, 790, 791, 792, 793, 794, 795]
      let aiJson = MIPCommon.inArray(id, [ang, anr, ig, ir])
      let caName = ''
      let newsUrl = ''
      if (aiJson.index === 0 || aiJson.index === 2) {
        caName = caNameArr[0]
        newsUrl = `${url}/article.html`
      } else if (aiJson.index === 1 || aiJson.index === 3) {
        caName = caNameArr[1]
        newsUrl = `${url}/jiaocheng.html`
      }
      if (document.getElementsByClassName('xgwz')[0].getElementsByTagName('li').length) {
        let span = dom.create(`<span><a href="${newsUrl}">更多+</a></span>`)
        xgwz.appendChild(span)
      }
      // 动态增加标题
      let body_ca = document.getElementsByClassName('ca')
      for (let i = 0; i < body_ca.length; i++) {
        body_ca[i].innerHTML = caName
      }
      // 动态显示不同内容
      let bodyDif = document.getElementsByClassName('dif')
      for (let i = 0; i < bodyDif.length; i++) {
        css(bodyDif[i].getElementsByTagName('div')[aiJson.index], { display: 'block' })
      }
    }
  }
   /*
   * 修改头部标题
   */
  static alterTit (id, caNameArr, url) {
    if (id) {
      let wy_arr = [631, 632, 633, 634, 636, 694, 695, 696, 697, 700, 727, 728, 729, 730, 731, 732, 733, 734, 735, 797, 798, 799, 800, 801, 806];
      let dj_arr = [830, 831, 832, 833, 834, 835, 836, 837, 838, 839, 840, 841, 813, 814, 815, 816, 817, 818, 819, 820, 821, 822, 823, 824, 825, 826, 827, 828, 802, 803, 804, 805, 807, 808, 809, 810, 758, 759, 760, 761, 762, 763, 764, 765, 766, 767, 768, 769, 770, 771, 673, 672, 674, 675, 676, 677, 678, 679, 680, 681, 682, 683, 684, 685, 686, 687, 688, 689, 690, 618, 619, 620, 621, 622, 623, 624, 625, 591, 592, 593, 594, 595, 596, 597, 598, 637, 638, 711, 712, 713, 714, 842, 465, 466, 467, 468, 469, 470, 471, 472, 473, 476, 477, 386, 387, 388, 389, 390, 391, 414, 415, 416, 417, 571, 572, 573, 574, 422, 285, 282, 284, 286, 287, 288, 535, 616, 508, 384, 299, 304, 345, 478, 479, 480, 482, 506, 298, 561, 562, 629, 557];
      let aiJson = MIPCommon.inArray(id, [wy_arr, dj_arr])
      let cataName = document.getElementById('cataName')
      if (aiJson.num) {
        cataName.innerHTML = caNameArr[0]
        if (parseInt(aiJson.index) === 0) {
          cataName.setAttribute('href', `${url}/wangyou.html`)
        } else {
          cataName.setAttribute('href', `${url}/youxi.html`)
        }
      } else {
        cataName.innerHTML = caNameArr[1]
        cataName.setAttribute('href', `${url}/ruanj.html`)
      }
    } 
  }
  /*
   * 排行榜
   */
  static rank (id) {
    if (id) {
      let ang = [634, 695, 594, 696, 697, 712, 598, 592, 596, 593, 595, 637, 713, 638, 636, 842]
      let anr = [588, 589, 584, 582, 583, 585, 586, 587, 590, 600, 703, 704, 708, 709, 875, 876,
        877, 878, 879, 880, 881, 628, 705, 706, 627, 599
      ]
      let ig = [797, 798, 799, 800, 801, 802, 803, 804, 805, 806, 807, 808, 809, 810]
      let ir = [776, 777, 778, 779, 780, 781, 782, 783, 784, 785, 786, 787, 788, 789, 790, 791,
        792, 793, 794, 795
      ]
      let aiJson = this.inArray(id, [ang, anr, ig, ir])
      if (aiJson.num === 0) {
        document.body.setAttribute('show', 0)
        this.element.removeChild(document.getElementsByClassName('hot_gamerec')[0])
        this.element.removeChild(document.getElementsByClassName('rank')[0])
      } else {
        if (document.getElementsByClassName('rank').length) {
          let rank = document.getElementsByClassName('rank')[0]
          let list = rank.getElementsByClassName('tab-content')
          let titleLi = rank.getElementsByClassName('tab-panel')[0].getElementsByTagName('li')
          // 默认样式
          for (let i = 0; i < list.length; i++) {
            css(list[i], { display: 'none' })
            let li = list[i].getElementsByClassName('list')[0].getElementsByTagName('div')[aiJson.index].getElementsByTagName('li')
            for (let j = 0; j < li.length; j++) {
              if (j > 3) {
                css(li[j], { display: 'none' })
              }
            }
          }
          css(list[1], { display: 'block' })
          for (let i = 0; i < titleLi.length; i++) {
            let index = i
            titleLi[i].onclick = function () {
              for (let j = 0; j < titleLi.length; j++) {
                titleLi[j].setAttribute('class', '')
                css(list[j], { display: 'none' })
              }
              this.setAttribute('class', 'active')
              css(list[index], { display: 'block' })
            }
            let lookmore = list[i].getElementsByClassName('lookmore')[0]
            let li = list[i].getElementsByClassName('list')[0].getElementsByTagName('div')[aiJson.index].getElementsByTagName('li')
            lookmore.onclick = () => {
              let num = 0
              for (let j = 0; j < li.length; j++) {
                if (css(li[j], 'display') !== 'none') {
                  num++
                }
              }
              num = num + 4
              if (parseInt(num) === li.length) {
                lookmore.parentNode.removeChild(lookmore)
              }
              for (let j = 0; j < li.length; j++) {
                if (j < num) {
                  css(li[j], { display: 'block' })
                }
              }
            }
          }
        }
      }
    }
  }
  /*
   *自定义统计
   */
  static statCustom() {
    let dateTime = document.getElementById('down-href').getAttribute('dateTime')
    let username = document.getElementById('down-href').getAttribute('username')
    let n = document.querySelector('script[type="application/json"]')
    if (n) {
      let a = jsonParse(n.textContent.toString().replace(/[\s\b\t]/g, ''))
      if (dateTime !== void 0 && username !== '' && a) {
        let r = ''
        if (a[0][username]) {
          if (a[0][username].xtime) {
            let o = new Date(a[0][username].xtime)
            let s = new Date(dateTime)
            if (o.getTime() < s.getTime()) {
              r = a[0][username].hmToken
            }
          } else { r = a[0][username].hmToken }
          if (r !== '') {
            let stat = dom.create(`<mip-stats-baidu token="${r}"></mip-stats-baidu>`)
            document.body.appendChild(stat)
          }
        }
      }
    }
  }
}
