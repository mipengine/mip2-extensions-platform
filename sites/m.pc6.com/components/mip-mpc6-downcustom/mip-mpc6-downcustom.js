/**
 * @file 下载自定义 pc6
 * @author fl
 */
import MIPCommon from '../../common/mip-common'
import './index.less'
import '../../common/mip-common.less'
const { CustomElement, util } = MIP
const { platform, dom, css } = util

export default class MIPMpc6DownCustom extends CustomElement {
  data () {
    let platAndroid = document.getElementById('plat_Android')
    let platiPhone = document.getElementById('plat_iPhone')
    let dataJson = {
      id: this.element.getAttribute('cid'),
      url: this.element.getAttribute('url'),
      webInfoId: document.getElementById('down-href').getAttribute('downid'),
      webInfoCid: document.getElementById('down-href').getAttribute('cid'),
      webInfoRid: document.getElementById('down-href').getAttribute('rid'),
      is_ordered: document.getElementById('down-href').getAttribute('is_ordered'),
      ordered_num: document.getElementById('down-href').getAttribute('ordered_num'),
      assid: parseInt(document.getElementById('Associate').innerHTML, 10)
    }
    if (platAndroid) {
      dataJson.platAndroidId = platAndroid.getAttribute('platid')
      dataJson.platAndroidAddress = platAndroid.getAttribute('Address')
      dataJson.platAndroidResSystem = platAndroid.getAttribute('ResSystem')
      dataJson.platAndroidResName = platAndroid.getAttribute('ResName')
      dataJson.platAndroidResVer = platAndroid.getAttribute('ResVer')
      dataJson.platAndroidCid = platAndroid.getAttribute('cid')
      dataJson.platAndroidRid = platAndroid.getAttribute('rid')
    }
    if (platiPhone) {
      dataJson.platIPhoneId = platiPhone.getAttribute('platid')
      dataJson.platIPhoneAddress = platiPhone.getAttribute('Address')
      dataJson.platIPhoneResSystem = platiPhone.getAttribute('ResSystem')
      dataJson.platIPhoneResName = platiPhone.getAttribute('ResName')
      dataJson.platIPhoneResVer = platiPhone.getAttribute('ResVer')
      dataJson.platIPhoneCid = platiPhone.getAttribute('cid')
      dataJson.platIPhoneRid = platiPhone.getAttribute('rid')
    }
    return dataJson
  }
  build () {
    // 猜你喜欢
    if (document.getElementById('guess_carousel')) {
      if (document.getElementById('guess_carousel').getElementsByTagName('li').length) {
        let guessLi = document.getElementById('guess_carousel').getElementsByTagName('li')[0]
        guessLi.classList.add('mip-carousel-activeitem')
      } else {
        this.element.removeChild(document.getElementsByClassName('guess')[0])
      }
    }
    // 文章动态增加链接
    if (document.getElementsByClassName('xgwz').length) {
      MIPCommon.alterNewUrl(document.getElementsByClassName('xgwz')[0].getElementsByClassName('d_title')[0], this.data().id, ['手游', '软件'], this.data().url)
    }
    // 修改头部标题
    MIPCommon.alterTit(this.data().id, ['手游', '软件'], this.data().url)
    // 修改下载链接
    this.downHref()
    // 获取精品推荐
    this.bestRec()
    // 下载弹窗
    this.downAlert()
    // 预约
    this.yuyue()
    // 自定义统计
    MIPCommon.statCustom()
    // 排行榜
    MIPCommon.rank(this.data().id)
    // 移除空内容
    this.emptyRemove()
  }
  /*
   * 移除空内容
   */
  emptyRemove () {
    // 历史版本
    if (document.getElementsByClassName('historyver').length && document.getElementsByClassName('historyver')[0].getElementsByTagName('p').length === 0) {
      this.element.removeChild(document.getElementsByClassName('historyver')[0])
    }
    // 相关文章
    if (document.getElementsByClassName('xgwz').length && document.getElementsByClassName('xgwz')[0].getElementsByTagName('li').length === 0) {
      this.element.removeChild(document.getElementsByClassName('xgwz')[0])
    }
    // 相关视频
    if (document.getElementsByClassName('xgsp').length && document.getElementsByClassName('xgsp')[0].getElementsByTagName('li').length === 0) {
      this.element.removeChild(document.getElementsByClassName('xgsp')[0])
    }
    // 更多标签
    if (!document.getElementById('dcatetory')) {
      this.element.removeChild(document.getElementsByClassName('tips_more')[0])
    }
    if (document.body.getAttribute('show')) {
      if (document.getElementsByClassName('hot_gamerec').length) {
        this.element.removeChild(document.getElementsByClassName('hot_gamerec')[0])
      }
      if (document.getElementsByClassName('rank').length) {
        this.element.removeChild(document.getElementsByClassName('rank')[0])
      }
      if (document.getElementsByClassName('tips_more').length) {
        this.element.removeChild(document.getElementsByClassName('tips_more')[0])
      }
    }
  }
  /*
   * 修改下载链接
   */
  downHref () {
    if (document.getElementById('btns').getElementsByTagName('a').length) {
      let btnsA = document.getElementById('btns').getElementsByTagName('a')[0]
      let ResSystem = document.getElementById('ResSystem')
      let dnb = document.getElementsByClassName('dnb')
      let name = document.getElementById('info').getElementsByClassName('name')[0]
      if (this.data().assid > 0) {
        btnsA.setAttribute('href', `${this.data().url}/down.asp?id=${this.data().assid}`)
      }
      let platAddress, platId, platResName, platResVer, platResSystem
      if (platform.isAndroid() && void 0 !== this.data().platAndroidAddress) {
        platAddress = this.data().platAndroidAddress
        platId = this.data().platAndroidId
        platResName = this.data().platAndroidResName
        platResVer = this.data().platAndroidResVer
        platResSystem = this.data().platAndroidResSystem
      } else if (platform.isIos() && void 0 !== this.data().platIPhoneAddress) {
        platAddress = this.data().platIPhoneAddress
        platId = this.data().platIPhoneId
        platResName = this.data().platIPhoneResName
        platResVer = this.data().platIPhoneResVer
        platResSystem = this.data().platIPhoneResSystem
      }
      if (platAddress) {
        let http = platAddress.indexOf('http:')
        let ftp = platAddress.indexOf('ftp:')
        let https = platAddress.indexOf('https:')
        if (http >= 0 || ftp >= 0 || https >= 0) {
          btnsA.setAttribute('href', platAddress)
        } else {
          btnsA.setAttribute('href', 'http://download.pc6.com/down/' + platId + '/')
        }
        let k = ',110974,110451,121665,115094,55819,49251,62433,140386,'.indexOf(',' + this.data().webInfoId + ',')
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
  bestRec () {
    let kKeys = [] // K关键词
    let curPlatform = 2 // 平台类型
    let pid = 0 // 关联平台资源ID
    let rCid = 0 // 关联资源的分类ID
    let rRid = 0 // 关联资源的根分类ID
    // 平台类型
    if (platform.isAndroid()) {
      curPlatform = 0
      if (void 0 !== this.data().platAndroidAddress) {
        rCid = this.data().platAndroidCid
        rRid = this.data().platAndroidRid
        pid = this.data().platAndroidId
      }
    } else if (platform.isIos()) {
      curPlatform = 1
      if (void 0 !== this.data().platIPhoneAddress) {
        rCid = this.data().platIPhoneCid
        rRid = this.data().platIPhoneRid
        pid = this.data().platIPhoneId
      }
    }
    // 只处理android和iphone
    if (curPlatform !== 2) {
      // K关键字获取
      let xgkA = document.getElementById('xgk').getElementsByTagName('a')
      for (let i = 0; i < xgkA.length; i++) {
        kKeys.push(xgkA[i].innerText)
      }
      if (kKeys.length === 0) {
        kKeys = ''
      } else {
        kKeys = kKeys.join(',')
      }
      fetch(this.data().url + '/ajax.asp?action=998&k_keys=' + kKeys + '&id=' + this.data().webInfoId + '&platform=' + curPlatform + '&pid=' + pid + '&cid=' + ((typeof (this.data().webInfoCid) !== 'undefined') ? this.data().webInfoCid : 0) + '&rid=' + ((typeof (this.data().webInfoRid) !== 'undefined') ? this.data().webInfoRid : 0) + '&rcid=' + rCid + '&rrid=' + rRid, {
        'method': 'GET'
      }).then((responseText) => {
        return responseText.json()
      }).then((responseRes) => {
        if (responseRes.list.length === 0) {
          this.element.removeChild(document.getElementsByClassName('tjyxph')[0])
          return false
        }
        if (void 0 !== responseRes.list) {
          let n = responseRes.list
          let r = ''
          if (curPlatform === 0) {
            for (let k = 0; k < n.length; ++k) {
              r += '<li><a href="' + this.data().url + '/down.asp?id=' + n[k].ID + '"><mip-img src="' + n[k].SmallImg + '" data-stats-cnzz-obj="{\'type\':\'click\',\'data\':[\'_trackEvent\',\'tuijian\',\'tuijian' + (k + 1) + '\',\'' + n[k].ResName + '\']}"></mip-img><p>' + n[k].ResName + '</p></a></li>'
            }
          } else if (curPlatform === 1) {
            for (let b = 0; b < n.length; ++b) {
              r += '<li><a href="' + this.data().url + '/mipd/' + n[b].ID + '.html" target="_blank"><mip-img src="' + n[b].SmallImg + '" data-stats-cnzz-obj="{\'type\':\'click\',\'data\':[\'_trackEvent\',\'tuijian\',\'tuijian' + (b + 1) + '\',\'' + n[b].ResName + '\']}"></mip-img><p>' + n[b].ResName + '</p></a></li>'
            }
          }
          document.getElementsByClassName('tjyxph')[0].getElementsByTagName('ul')[0].innerHTML = r
        }
      })
    }
  }
  /*
   *下载后弹框
   */
  downAlert () {
    if (document.getElementById('btns').getElementsByTagName('a').length) {
      let btnsA = document.getElementById('btns').getElementsByTagName('a')[0]
      let isDown = parseInt(document.getElementById('btns').getElementsByTagName('a')[0].getAttribute('isDown'))
      if ((platform.isIos() && void 0 === this.data().platAndroidAddress && isDown === 0) || (platform.isAndroid() && void 0 === this.data().platIPhoneAddress && isDown === 0)) {
        btnsA.classList.add('noDown')
        btnsA.innerHTML = '暂无下载'
        btnsA.setAttribute('href', 'javascript:void(0)')
      } else if (!platform.isAndroid() && !platform.isIos() && isDown === 0) {
        btnsA.classList.add('noDown')
        btnsA.innerHTML = '暂无下载'
        btnsA.setAttribute('href', 'javascript:void(0)')
      }
      let qqqun = ''
      if (platform.isAndroid()) {
        qqqun = '<p id="qqqun"><a target="_blank" href="//shang.qq.com/wpa/qunwpa?idkey=815031e2cac7b656293f5a7f5e8728c136af7de2a6ffc9ca95c5038852fef2ca"><mip-img border="0" src="https://thumb.jfcdns.com/up/2017-1/201713916104315314.png" alt="王者荣耀交流群②" title="王者荣耀交流群②"></mip-img></a></p>'
      } else if (platform.isIos()) {
        qqqun = '<p id="qqqun"><a target="_blank" href="mqqapi://card/show_pslcard?src_type=internal&version=1&uin=429173108&card_type=group&source=qrcode"><mip-img border="0" src="https://thumb.jfcdns.com/up/2017-1/201713916104315314.png" alt="王者荣耀交流群②" title="王者荣耀交流群②"></mip-img></a></p>'
      }
      if (parseInt(this.data().webInfoId) === 180382 || parseInt(this.data().webInfoId) === 189245 || parseInt(this.data().webInfoId) === 180065) {
        document.getElementById('qun').innerHTML = qqqun
      } else {
        qqqun = ''
      }
      if (platform.isAndroid()) {
        let downBtn = document.getElementById('btns').getElementsByTagName('a')[0]
        let html
        downBtn.onclick = () => {
          html = '<div class="m-click-show"><div class="m-show-cont"><strong class="g-show-title">下载此 APP 的<span>还下载了</span>这些</strong><b class="m-close-btn">+</b>'
          if (qqqun !== '') {
            html += qqqun + '<ul class="m-show-ul">'
          } else {
            html += '<ul class="m-show-ul">'
          }
          html += document.getElementsByClassName('tjyxph')[0].getElementsByTagName('ul')[0].innerHTML.replace(/\)">(.+?)<\/a>/g, ')">$1<span class="down">下载</span></a>')
          html = html.replace(/'tuijian'/g, "'tuijian_tc'")
          html = html.replace(/<img\b[^>]*>/g, '')
          html += '</ul></div><b class="m-black-bg"></b></div>'
          let clickShow = document.getElementsByClassName('m-click-show')
          if (clickShow.length <= 0) {
            setTimeout(() => {
              let htmlnode = dom.create(html)
              this.element.appendChild(htmlnode)
              let li = document.getElementsByClassName('m-show-ul')[0].getElementsByTagName('li')
              if (li.length > 8) {
                for (let i = 9; i < 11; i++) {
                  document.getElementsByClassName('m-show-ul')[0].removeChild(document.getElementsByClassName('m-show-ul')[0].getElementsByTagName('li')[i])
                }
              }
              for (let i = 0; i < li.length; i++) {
                let liA = li[i].getElementsByTagName('a')[0]
                if (liA.getElementsByTagName('span').length === 0) {
                  let liSpan = dom.create(`<span class="down">下载</span>`)
                  liA.appendChild(liSpan)
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
            }, 1500)
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
  yuyue () {
    if (document.getElementById('nobtn')) { return false }
    let isOrdered = this.data().is_ordered
    if (typeof (isOrdered) !== 'undefined') {
      if (parseInt(isOrdered) === 1) {
        this.addyuyue(this.data().ordered_num)
      }
    } else {
      fetch(`${this.data().url}/ajax.asp?action=989&id=${this.data().webInfoId}`, {
        'method': 'GET'
      }).then((responseText) => {
        return responseText.json()
      }).then((responseRes) => {
        let res = responseRes.content
        let flag = res[0].is_ordered
        let oNum = res[0].ordered_num
        if (parseInt(flag) === 1) {
          this.addyuyue(oNum)
        }
      })
    }
  }
  /*
   *预约增加
   */
  addyuyue (oNum) {
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
    info.getElementsByTagName('p')[0].getElementsByTagName('span')[1].innerText = document.getElementById('ResSystem').innerText
    info.getElementsByTagName('p')[1].getElementsByTagName('span')[1].setAttribute('id', '')
    info.getElementsByTagName('p')[1].getElementsByTagName('span')[1].innerText = oNum + '人已预约'
    let isyuyue = true
    let yuyueBtn = document.getElementById('yuyue')
    yuyueBtn.onclick = () => {
      if (isyuyue) {
        if (document.getElementsByClassName('yAlert')[0]) {
          document.getElementsByClassName('yAlert')[0].parentNode.removeChild(document.getElementsByClassName('yAlert')[0])
        }
        if (document.getElementsByClassName('yAlert_bg')[0]) {
          document.getElementsByClassName('yAlert_bg')[0].parentNode.removeChild(document.getElementsByClassName('yAlert_bg')[0])
        }
        let yAlertHtml = '<div class="yAlert_t cfix"><span class="yAlert_c">&times;</span>请输入预约的手机号码</div>'
        yAlertHtml += '<input type="text" id="yPhone" placeholder="输入手机号码">'
        yAlertHtml += '<div class="yAlert_b">'
        yAlertHtml += '<div class="yAlert_bs">确定</div>'
        yAlertHtml += '<div class="yAlert_br">取消</div>'
        yAlertHtml += '</div>'
        let hyAlertBg = dom.create(`<div class="yAlert_bg"></div>`)
        let hyAlert = dom.create(`<div class="yAlert">${yAlertHtml}</div>`)
        this.element.appendChild(hyAlertBg)
        this.element.appendChild(hyAlert)
        let yAlertC = document.getElementsByClassName('yAlert_c')[0]
        let yAlertBg = document.getElementsByClassName('yAlert_bg')[0]
        let yAlertBr = document.getElementsByClassName('yAlert_br')[0]
        yAlertC.onclick = () => {
          document.getElementsByClassName('yAlert')[0].parentNode.removeChild(document.getElementsByClassName('yAlert')[0])
          document.getElementsByClassName('yAlert_bg')[0].parentNode.removeChild(document.getElementsByClassName('yAlert_bg')[0])
        }
        yAlertBg.onclick = () => {
          document.getElementsByClassName('yAlert')[0].parentNode.removeChild(document.getElementsByClassName('yAlert')[0])
          document.getElementsByClassName('yAlert_bg')[0].parentNode.removeChild(document.getElementsByClassName('yAlert_bg')[0])
        }
        yAlertBr.onclick = () => {
          document.getElementsByClassName('yAlert')[0].parentNode.removeChild(document.getElementsByClassName('yAlert')[0])
          document.getElementsByClassName('yAlert_bg')[0].parentNode.removeChild(document.getElementsByClassName('yAlert_bg')[0])
        }
        let yAlertBs = document.getElementsByClassName('yAlert_bs')[0]
        yAlertBs.onclick = () => {
          let phone = document.getElementById('yPhone')
          let pVal = phone.value
          let reg = (/^1[3|4|5|8][0-9]\d{4,8}$/).test(pVal)
          if (!pVal) {
            MIPCommon.cAlert('手机号码不能为空~！')
          } else if (!reg) {
            MIPCommon.cAlert('请输入正确的手机号码~!')
            phone.value = ''
          } else {
            let catalogName = document.getElementById('info').getElementsByClassName('cata')[0].innerText
            let resourceName = document.getElementById('info').getElementsByClassName('name')[0].getElementsByTagName('h1')[0].innerText
            fetch(this.data().url + '/ajax.asp?action=988&resource_name=' + resourceName + '&phone=' + pVal + '&resource_id=' + this.data().webInfoId + '&catalog_id=' + this.data().webInfoCid + '&catalog_name=' + catalogName + '&url=' + window.location.href, {
              'method': 'GET'
            }).then((responseText) => {
              return responseText.json()
            }).then((responseRes) => {
              if (parseInt(responseRes.code) === 0) {
                MIPCommon.cAlert('预约成功！')
                document.getElementById('yuyue').getElementsByTagName('span')[0].innerText = '预约成功'
                document.getElementById('yuyue').getElementsByTagName('span')[0].classList.add('suBtn')
                yAlertC.click()
                isyuyue = false
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
