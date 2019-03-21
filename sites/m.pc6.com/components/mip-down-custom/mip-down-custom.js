/**
 * @file 下载自定义 pc6
 * @author fl
 */
import './index.less'
import '../mip-common/index.less'
const { CustomElement, util } = MIP
const { platform, dom, css } = util
import MIPCommon from '../mip-common/mip-common'

export default class MIPDownCustom extends CustomElement {
  data = {
    url: this.element.getAttribute('url'),
    webInfoId: document.getElementById('down-href').getAttribute('downid'),
    webInfoCid: document.getElementById('down-href').getAttribute('cid'),
    webInfoRid: document.getElementById('down-href').getAttribute('rid'),
    is_ordered: document.getElementById('down-href').getAttribute('is_ordered'),
    ordered_num: document.getElementById('down-href').getAttribute('ordered_num'),
    assid: parseInt(document.getElementById('Associate').innerHTML, 10)
  }
  build() {
    let plat_Android = document.getElementById('plat_Android')
    let plat_iPhone = document.getElementById('plat_iPhone')
    if (plat_Android) {
      this.data.platAndroidId = plat_Android.getAttribute('platid')
      this.data.platAndroidAddress = plat_Android.getAttribute('Address')
      this.data.platAndroidResSystem = plat_Android.getAttribute('ResSystem')
      this.data.platAndroidResName = plat_Android.getAttribute('ResName')
      this.data.platAndroidResVer = plat_Android.getAttribute('ResVer')
      this.data.platAndroidCid = plat_Android.getAttribute('cid')
      this.data.platAndroidRid = plat_Android.getAttribute('rid')
    }
    if (plat_iPhone) {
      this.data.platIPhoneId = plat_iPhone.getAttribute('platid')
      this.data.platIPhoneAddress = plat_iPhone.getAttribute('Address')
      this.data.platIPhoneResSystem = plat_iPhone.getAttribute('ResSystem')
      this.data.platIPhoneResName = plat_iPhone.getAttribute('ResName')
      this.data.platIPhoneResVer = plat_iPhone.getAttribute('ResVer')
      this.data.platIPhoneCid = plat_iPhone.getAttribute('cid')
      this.data.platIPhoneRid = plat_iPhone.getAttribute('rid')
    }
    // 猜你喜欢
    if (document.getElementById('guess_carousel').getElementsByTagName('li').length) {
      let guess_li = document.getElementById('guess_carousel').getElementsByTagName('li')[0]
      guess_li.classList.add('mip-carousel-activeitem')
    } else {
      this.element.removeChild(document.getElementsByClassName('guess')[0])
    }
    // 移除空内容
    this.emptyRemove()
    // 相同厂商
    this.sliceLi('tcsyy',8)
    // H5在线玩
    this.sliceLi('h5online',8)
    // 相关下载
    this.sliceLi('rela_down',8)
    // 区分cid
    this.difDo()
    // 修改下载链接
    this.downHref()
    // 获取精品推荐
    this.bestRec()
    // 下载
    this.downAlert()
    // 预约
    this.yuyue()
  }
  /*
   * li分组
   * @param {object} [obj] [id对象]
   * @param {number} [pageNum] [一页显示个数]
   */
  sliceLi(obj,pageNum) {
    if (document.getElementById(obj)) {
      let obj_li = document.getElementById(obj).getElementsByClassName('hide')[0].getElementsByTagName('li')
      if (obj_li.length) {
        // 增加点
        let dot = document.getElementById(obj).getElementsByClassName('mip-carousel-indicatorDot')[0]
        let dotHtml = ''
        for(var i = 0; i < Math.ceil(obj_li.length / pageNum); i++){
          if(i == 0){
            dotHtml += '<div class="mip-carousel-activeitem mip-carousel-indecator-item"></div>'
          }
          else{
            dotHtml += '<div class="mip-carousel-indecator-item"></div>'
          }
        }
        dot.innerHTML = dotHtml
        let obj_carousel = document.getElementById(obj).getElementsByTagName('mip-carousel')[0]
        let obj_html = '<div class="tags-box-ul cfix">';
        for (let i = 0; i < obj_li.length; i++) {
          if (obj_li[i].getElementsByTagName('img').length) {
            obj_li[i].getElementsByTagName('mip-img')[0].removeChild(obj_li[i].getElementsByTagName('img')[0])
          }
          obj_html += obj_li[i].outerHTML;
          if ((i + 1) % 8 == 0) {
            obj_html += '</div>'
          }
          if ((i + 1) % 8 == 0 && i + 1 < obj_li.length) {
            obj_html += '<div class="tags-box-ul cfix">'
          }
        }
        obj_carousel.innerHTML = obj_html
        document.getElementById(obj).removeChild(document.getElementById(obj).getElementsByClassName('hide')[0])
      } else {
        this.element.removeChild(document.getElementById(obj))
      }
    }
  }
  /*
   * 区分cid
   */
  difDo() {
    let id = this.element.getAttribute('cid')
    let ang = [634, 695, 594, 696, 697, 712, 598, 592, 596, 593, 595, 637, 713, 638, 636, 842]
    let anr = [588, 589, 584, 582, 583, 585, 586, 587, 590, 600, 703, 704, 708, 709, 875, 876,
      877, 878, 879, 880, 881, 628, 705, 706, 627, 599
    ]
    let ig = [797, 798, 799, 800, 801, 802, 803, 804, 805, 806, 807, 808, 809, 810]
    let ir = [776, 777, 778, 779, 780, 781, 782, 783, 784, 785, 786, 787, 788, 789, 790, 791,
      792, 793, 794, 795
    ]
    let a = [631, 632, 633, 634, 636, 694, 695, 696, 697, 700, 727, 728, 729, 730, 731, 732, 733, 734, 735, 797, 798, 799, 800, 801, 806]
    let i = [830, 831, 832, 833, 834, 835, 836, 837, 838, 839, 840, 841, 813, 814, 815, 816, 817, 818, 819, 820, 821, 822, 823, 824, 825, 826, 827, 828, 802, 803, 804, 805, 807, 808, 809, 810, 758, 759, 760, 761, 762, 763, 764, 765, 766, 767, 768, 769, 770, 771, 673, 672, 674, 675, 676, 677, 678, 679, 680, 681, 682, 683, 684, 685, 686, 687, 688, 689, 690, 618, 619, 620, 621, 622, 623, 624, 625, 591, 592, 593, 594, 595, 596, 597, 598, 637, 638, 711, 712, 713, 714, 842, 465, 466, 467, 468, 469, 470, 471, 472, 473, 476, 477, 386, 387, 388, 389, 390, 391, 414, 415, 416, 417, 571, 572, 573, 574, 422, 285, 282, 284, 286, 287, 288, 535, 616, 508, 384, 299, 304, 345, 478, 479, 480, 482, 506, 298, 561, 562, 629, 557]
    if (id) {
      let num = 0
      let caIndex;
      let caName = ''
      let idArr = [ang, anr, ig, ir]
      let aiArr = [a, i]
      let aiJson = { num: 0 }
      let newsUrl = `${this.data.url}/pc.html`;
      let body_ca = document.getElementsByClassName('ca')
      let body_dif = document.getElementsByClassName('dif')
      let xgwz = document.getElementsByClassName('xgwz')[0].getElementsByClassName('d_title')[0]
      let cataName = document.getElementById('cataName')
      idArr.map((v, i) => {
        v.map((sv) => {
          if (id.indexOf(sv) > -1) {
            caIndex = i
            num++
          }
        })
      })
      aiArr.map((v, i) => {
        v.map((sv) => {
          if (id.indexOf(sv) > -1) {
            aiJson.num++
            aiJson.index = i
          }
        })
      })
      if (caIndex === 0 || caIndex === 2) {
        caName = '手游'
        newsUrl = `${this.data.url}/article.html`
      } else if (caIndex === 1 || caIndex === 3) {
        caName = '软件'
        newsUrl = `${this.data.url}/jiaocheng.html`
      }
      // 动态修改导头部标题
      if (aiJson.num) {
        cataName.innerHTML = '手游'
        if (aiJson.index == 0) {
          cataName.setAttribute('href', `${this.data.url}/wangyou.html`)
        } else {
          cataName.setAttribute('href', `${this.data.url}/youxi.html`)
        }
      } else {
        cataName.innerHTML = '软件'
        cataName.setAttribute('href', `${this.data.url}/ruanj.html`)
      }
      // 动态增加标题
      for (let i = 0; i < body_ca.length; i++) {
        body_ca[i].innerHTML = caName
      }
      // 文章动态增加链接
      if (document.getElementsByClassName('xgwz')[0].getElementsByTagName('li').length) {
        let span = dom.create(`<span><a href="${newsUrl}">更多+</a></span>`)
        xgwz.appendChild(span)
      }
      // 动态显示不同内容
      for (let i = 0; i < body_dif.length; i++) {
        css(body_dif[i].getElementsByTagName('div')[caIndex], { display: 'block' })
      }
      if (num === 0) {
        document.body.setAttribute('show', 0)
        this.element.removeChild(document.getElementsByClassName('hot_gamerec')[0])
        this.element.removeChild(document.getElementsByClassName('rank')[0])
      }else{
        this.rank(caIndex)
      }
    }
  }
  /*
   * 移除空内容
   */
  emptyRemove() {
    // 历史版本
    if (document.getElementsByClassName('historyver')[0].getElementsByTagName('p').length == 0) {
      this.element.removeChild(document.getElementsByClassName('historyver')[0])
    }
    // 相关文章
    if (document.getElementsByClassName('xgwz')[0].getElementsByTagName('li').length == 0) {
      this.element.removeChild(document.getElementsByClassName('xgwz')[0])
    }
    // 相关视频
    if (document.getElementsByClassName('xgsp')[0].getElementsByTagName('li').length == 0) {
      this.element.removeChild(document.getElementsByClassName('xgsp')[0])
    }
  }
  /*
   * 修改下载链接
   */
  downHref() {
    if (document.getElementById('btns').getElementsByTagName('a').length) {
      let btns_a = document.getElementById('btns').getElementsByTagName('a')[0]
      let ResSystem = document.getElementById('ResSystem')
      let dnb = document.getElementsByClassName('dnb')
      let name = document.getElementById('info').getElementsByClassName('name')[0]
      if (this.data.assid > 0) {
        btns_a.setAttribute('href', `${this.data.url}/down.asp?id=${this.data.assid}`)
      }
      let platAddress, platId, platResName, platResVer, platResSystem
      if (platform.isAndroid() && void 0 !== this.data.platAndroidAddress) {
        platAddress = this.data.platAndroidAddress
        platId = this.data.platAndroidId
        platResName = this.data.platAndroidResName
        platResVer = this.data.platAndroidResVer
        platResSystem = this.data.platAndroidResSystem
      } else if (platform.isIos() && void 0 !== this.data.platIPhoneAddress) {
        platAddress = this.data.platIPhoneAddress
        platId = this.data.platIPhoneId
        platResName = this.data.platIPhoneResName
        platResVer = this.data.platIPhoneResVer
        platResSystem = this.data.platIPhoneResSystem
      }
      if (platAddress) {
        let http = platAddress.indexOf('http:')
        let ftp = platAddress.indexOf('ftp:')
        let https = platAddress.indexOf('https:')
        if (http >= 0 || ftp >= 0 || https >= 0) {
          btns_a.setAttribute('href', platAddress)
        } else {
          btns_a.setAttribute('href', 'http://download.pc6.com/down/' + platId + '/')
        }
        let k = ',110974,110451,121665,115094,55819,49251,62433,140386,'.indexOf(',' + this.data.webInfoId + ',')
        ResSystem.innerHTML = platResSystem
        if (k < 0) {
          if (dnb.length < 1) {
            name.innerHTML = '<h1>' + platResName + '</h1>' + platResVer
          }
        }
      }
    }
  }
  /*
   * 精品推荐
   */
  bestRec() {
    let k_keys = [], // K关键词
      cur_platform = 2, // 平台类型
      pid = 0, // 关联平台资源ID
      r_cid = 0, // 关联资源的分类ID
      r_rid = 0; // 关联资源的根分类ID
    // 平台类型
    if (platform.isAndroid()) {
      cur_platform = 0;
      if (void 0 !== this.data.platAndroidAddress) {
        r_cid = this.data.platAndroidCid;
        r_rid = this.data.platAndroidRid;
        pid = this.data.platAndroidId;
      }
    } else if (platform.isIos()) {
      cur_platform = 1;
      if (void 0 !== this.data.platIPhoneAddress) {
        r_cid = this.data.platIPhoneCid;
        r_rid = this.data.platIPhoneRid;
        pid = this.data.platIPhoneId;
      }
    }
    // 只处理android和iphone
    if (cur_platform !== 2) {
      // K关键字获取
      let xgk_a = document.getElementById('xgk').getElementsByTagName('a')
      for (let i = 0; i < xgk_a.length; i++) {
        k_keys.push(xgk_a[i].innerText);
      }
      if (k_keys.length === 0) {
        k_keys = "";
      } else {
        k_keys = k_keys.join(",");
      }
      fetch(this.data.url + '/ajax.asp?action=998&k_keys=' + k_keys + '&id=' + this.data.webInfoId + '&platform=' + cur_platform + '&pid=' + pid + '&cid=' + ((typeof(this.data.webInfoCid) !== "undefined") ? this.data.webInfoCid : 0) + '&rid=' + ((typeof(this.data.webInfoRid) !== "undefined") ? this.data.webInfoRid : 0) + '&rcid=' + r_cid + '&rrid=' + r_rid, {
        'method': 'GET'
      }).then((responseText) => {
        return responseText.json()
      }).then((responseRes) => {
        if (responseRes.list.length == 0) {
          this.element.removeChild(document.getElementsByClassName('tjyxph')[0])
          return false
        }
        if (void 0 !== responseRes.list) {
          let n = responseRes.list
          let r = ''
          if (0 === cur_platform) {
            for (let k = 0; k < n.length; ++k) {
              r += '<li><a href="' + this.data.url + '/down.asp?id=' + n[k].ID + '"><mip-img src="' + n[k].SmallImg + '" data-stats-cnzz-obj="{\'type\':\'click\',\'data\':[\'_trackEvent\',\'tuijian\',\'tuijian' + (k + 1) + '\',\'' + n[k].ResName + '\']}"></mip-img><p>' + n[k].ResName + '</p></a></li>'
            }
          } else if (1 === cur_platform) {
            for (let b = 0; b < n.length; ++b) {
              r += '<li><a href="' + this.data.url + '/mipd/' + n[b].ID + '.html" target="_blank"><mip-img src="' + n[b].SmallImg + '" data-stats-cnzz-obj="{\'type\':\'click\',\'data\':[\'_trackEvent\',\'tuijian\',\'tuijian' + (b + 1) + '\',\'' + n[b].ResName + '\']}"></mip-img><p>' + n[b].ResName + '</p></a></li>'
            }
          }
          document.getElementsByClassName('tjyxph')[0].getElementsByTagName('ul')[0].innerHTML = r
        }
      })
    }
  }
  /*
   * 排行榜
   */
  rank(caIndex) {
    if (document.getElementsByClassName('rank').length) {
      let rank = document.getElementsByClassName('rank')[0]
      let list = rank.getElementsByClassName('tab-content')
      let titleLi = rank.getElementsByClassName('tab-panel')[0].getElementsByTagName('li')
      // 默认样式
      for (let i = 0; i < list.length; i++) {
        css(list[i], { display: 'none' })
        let li = list[i].getElementsByClassName('list')[0].getElementsByTagName('div')[caIndex].getElementsByTagName('li')
        for (let j = 0; j < li.length; j++) {
          if (j > 3) {
            css(li[j], { display: 'none' })
          }
        }
      }
      css(list[1], { display: 'block' })
      // 点击效果
      for (let i = 0; i < titleLi.length; i++) {
        let index = i
        titleLi[i].onclick = function() {
          for (let j = 0; j < titleLi.length; j++) {
            titleLi[j].setAttribute('class', '')
            css(list[j], { display: 'none' })
          }
          this.setAttribute('class', 'active')
          css(list[index], { display: 'block' })
        }
        // 列表展示
        let lookmore = list[i].getElementsByClassName('lookmore')[0]
        let li = list[i].getElementsByClassName('list')[0].getElementsByTagName('div')[caIndex].getElementsByTagName('li')
        lookmore.onclick = () => {
          let num = 0
          for (let j = 0; j < li.length; j++) {
            if (css(li[j], 'display') != 'none') {
              num++
            }
          }
          num = num + 4
          if (num == li.length) {
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
  /*
   *下载后弹框
   */
  downAlert() {
    if (document.getElementById('btns').getElementsByTagName('a').length) {
      let btns_a = document.getElementById('btns').getElementsByTagName('a')[0]
      //是否有下载地址
      let isDown = document.getElementById("btns").getElementsByTagName('a')[0].getAttribute("isDown")
      if ((platform.isIos() && void 0 === this.data.platAndroidAddress && isDown == 0) || (platform.isAndroid() && void 0 === this.data.platIPhoneAddress && isDown == 0)) {
        btns_a.classList.add('noDown')
        btns_a.innerHTML = '暂无下载'
        btns_a.setAttribute('href', 'javascript:void(0)')
      } else if (!platform.isAndroid() && !platform.isIos() && isDown == 0) {
        btns_a.classList.add('noDown')
        btns_a.innerHTML = '暂无下载'
        btns_a.setAttribute('href', 'javascript:void(0)')
      }
      // 增加群
      let qqqun;
      if (platform.isAndroid()) {
        qqqun = '<p id="qqqun"><a target="_blank" href="//shang.qq.com/wpa/qunwpa?idkey=815031e2cac7b656293f5a7f5e8728c136af7de2a6ffc9ca95c5038852fef2ca"><mip-img border="0" src="https://thumb.jfcdns.com/up/2017-1/201713916104315314.png" alt="王者荣耀交流群②" title="王者荣耀交流群②"></mip-img></a></p>';
      } else if (platform.isIos()) {
        qqqun = '<p id="qqqun"><a target="_blank" href="mqqapi://card/show_pslcard?src_type=internal&version=1&uin=429173108&card_type=group&source=qrcode"><mip-img border="0" src="https://thumb.jfcdns.com/up/2017-1/201713916104315314.png" alt="王者荣耀交流群②" title="王者荣耀交流群②"></mip-img></a></p>';
      }
      if (this.data.webInfoId == 180382 || this.data.webInfoId == 189245 || this.data.webInfoId == 180065) {
        document.getElementById('qun').innerHTML = qqqun
      } else {
        qqqun = ''
      }
      if (platform.isAndroid()) {
        let downBtn = document.getElementById('btns').getElementsByTagName('a')[0]
        let html
        downBtn.onclick = () => {
          html = '<div class="m-click-show"><div class="m-show-cont"><strong class="g-show-title">下载此 APP 的<span>还下载了</span>这些</strong><b class="m-close-btn">+</b>';
          if (qqqun != '') {
            html += qqqun + '<ul class="m-show-ul">';
          } else {
            html += '<ul class="m-show-ul">';
          }
          html += document.getElementsByClassName('tjyxph')[0].getElementsByTagName('ul')[0].innerHTML.replace(/\)">(.+?)<\/a>/g, ')">$1<span class="down">下载</span></a>');
          html = html.replace(/'tuijian'/g, "'tuijian_tc'");
          html = html.replace(/<img\b[^>]*>/g, '');
          html += '</ul></div><b class="m-black-bg"></b></div>';
          let clickShow = document.getElementsByClassName('m-click-show')
          if (clickShow.length <= 0) {
            setTimeout(() => {
              let htmlnode = dom.create(html)
              this.element.appendChild(htmlnode)
              let li = document.getElementsByClassName('m-show-ul')[0].getElementsByTagName('li')
              if (li.length > 8) {
                for (var i = 9; i < 11; i++) {
                  document.getElementsByClassName('m-show-ul')[0].removeChild(document.getElementsByClassName('m-show-ul')[0].getElementsByTagName('li')[i])
                }
              }
              for (var i = 0; i < li.length; i++) {
                let li_a = li[i].getElementsByTagName('a')[0]
                if (li_a.getElementsByTagName('span').length == 0) {
                  let li_span = dom.create(`<span class="down">下载</span>`)
                  li_a.appendChild(li_span)
                }
              }
              let closeBtn = document.getElementsByClassName('m-close-btn')
              let blackBg = document.getElementsByClassName('m-black-bg')
              let clickShow = document.getElementsByClassName('m-click-show')[0]
              if (closeBtn.length) {
                closeBtn[0].onclick = () => {
                  css(clickShow, { display: 'none' })
                }
              }
              if (blackBg.length) {
                blackBg[0].onclick = () => {
                  css(clickShow, { display: 'none' })
                }
              }
            }, 1500);
          } else {
            css(clickShow[0], { display: 'block' })
          }
        }
      }
    }
  }
  /*
   *预约
   */
  yuyue() {
    if(document.getElementById('nobtn')) {return false;}//关闭时无预约
    let is_ordered = this.data.is_ordered;
    if (typeof(is_ordered) != 'undefined') {
      if (is_ordered == 1) {
        this.addyuyue(this.data.ordered_num);
      }
    } else {
      fetch(`${this.data.url}/ajax.asp?action=989&id=${this.data.webInfoId}`, {
        'method': 'GET'
      }).then((responseText) => {
        return responseText.json()
      }).then((responseRes) => {
        var res = responseRes.content;
        var flag = res[0].is_ordered;
        var oNum = res[0].ordered_num;
        if (flag == 1) {
          this.addyuyue(oNum);
        }
      })
    }
  }
  /*
   *预约增加
   */
  addyuyue(oNum) {
    let btns = document.getElementById('btns')
    let noDown = document.getElementsByClassName('noDown')
    let info = document.getElementById('info')
    let fixed = document.getElementById('semi-fixed1').getElementsByTagName('div')[0]
    if (btns) {
      btns.parentNode.removeChild(btns)
    }
    if (noDown.length) {
      noDown[0].parentNode.removeChild(noDown[0])
    }
    fixed.innerHTML = '<div id="yuyue"><span class="dbtn">立即预约</span></div>'
    //修改预约情况下的简介
    info.getElementsByTagName('p')[0].getElementsByTagName('span')[1].innerText = document.getElementById('ResSystem').innerText
    info.getElementsByTagName('p')[1].getElementsByTagName('span')[1].setAttribute('id', '')
    info.getElementsByTagName('p')[1].getElementsByTagName('span')[1].innerText = oNum + '人已预约'
    //点击预约效果
    let isyuyue = true;
    let yuyueBtn = document.getElementById('yuyue')
    yuyueBtn.onclick = () => {
      if (isyuyue) {
        if (document.getElementsByClassName('yAlert')[0]) {
          document.getElementsByClassName('yAlert')[0].parentNode.removeChild(document.getElementsByClassName('yAlert')[0])
        }
        if (document.getElementsByClassName('yAlert_bg')[0]) {
          document.getElementsByClassName('yAlert_bg')[0].parentNode.removeChild(document.getElementsByClassName('yAlert_bg')[0])
        }
        let yAlertHtml = '<div class="yAlert_t cfix"><span class="yAlert_c">&times;</span>请输入预约的手机号码</div>';
        yAlertHtml += '<input type="text" id="yPhone" placeholder="输入手机号码">';
        yAlertHtml += '<div class="yAlert_b">';
        yAlertHtml += '<div class="yAlert_bs">确定</div>';
        yAlertHtml += '<div class="yAlert_br">取消</div>';
        yAlertHtml += '</div>';
        let hyAlert_bg = dom.create(`<div class="yAlert_bg"></div>`)
        let hyAlert = dom.create(`<div class="yAlert">${yAlertHtml}</div>`)
        this.element.appendChild(hyAlert_bg)
        this.element.appendChild(hyAlert)
        let yAlert_c = document.getElementsByClassName('yAlert_c')[0]
        let yAlert_bg = document.getElementsByClassName('yAlert_bg')[0]
        let yAlert_br = document.getElementsByClassName('yAlert_br')[0]
        //点击关闭
        yAlert_c.onclick = () => {
          document.getElementsByClassName('yAlert')[0].parentNode.removeChild(document.getElementsByClassName('yAlert')[0])
          document.getElementsByClassName('yAlert_bg')[0].parentNode.removeChild(document.getElementsByClassName('yAlert_bg')[0])
        }
        yAlert_bg.onclick = () => {
          document.getElementsByClassName('yAlert')[0].parentNode.removeChild(document.getElementsByClassName('yAlert')[0])
          document.getElementsByClassName('yAlert_bg')[0].parentNode.removeChild(document.getElementsByClassName('yAlert_bg')[0])
        }
        yAlert_br.onclick = () => {
          document.getElementsByClassName('yAlert')[0].parentNode.removeChild(document.getElementsByClassName('yAlert')[0])
          document.getElementsByClassName('yAlert_bg')[0].parentNode.removeChild(document.getElementsByClassName('yAlert_bg')[0])
        }
        //点击确定
        let yAlert_bs = document.getElementsByClassName('yAlert_bs')[0]
        yAlert_bs.onclick = () => {
          var phone = document.getElementById('yPhone')
          var pVal = phone.value;
          var reg = (/^1[3|4|5|8][0-9]\d{4,8}$/).test(pVal);
          if (!pVal) {
            MIPCommon.cAlert('手机号码不能为空~！');
          } else if (!reg) {
            MIPCommon.cAlert('请输入正确的手机号码~!');
            phone.value = ''
          } else {
            let catalog_name = document.getElementById('info').getElementsByClassName('cata')[0].innerText
            let resource_name = document.getElementById('info').getElementsByClassName('name')[0].getElementsByTagName('h1')[0].innerText
            fetch(this.data.url + '/ajax.asp?action=988&resource_name=' + resource_name + '&phone=' + pVal + '&resource_id=' + this.data.webInfoId + '&catalog_id=' + this.data.webInfoCid + '&catalog_name=' + catalog_name + '&url=' + window.location.href, {
              'method': 'GET'
            }).then((responseText) => {
              return responseText.json()
            }).then((responseRes) => {
              if (responseRes.code == 0) {
                MIPCommon.cAlert('预约成功！');
                document.getElementById('yuyue').getElementsByTagName('span')[0].innerText = '预约成功'
                document.getElementById('yuyue').getElementsByTagName('span')[0].classList.add('suBtn')
                yAlert_c.click()
                isyuyue = false;
              }
            })
          }
        }
      } else {
        MIPCommon.cAlert('您已经预约过了！')
      }
    }
  }
}
