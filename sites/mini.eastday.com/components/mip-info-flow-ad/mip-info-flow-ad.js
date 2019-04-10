// import './index.less'

export default class MIPInformationFlow extends MIP.CustomElement {
  build () {
    let M_DOM = this.element
    let type = M_DOM.getAttribute('type')

    switch (type) {
      case 'top':
        MIP.watch('GLOBAL.gg.top', function (count) {
          if (count.type === 'dsp') {
            DSPAD(M_DOM, count.data)
          } else if (count.type === 'baidu') {
            unionAD(M_DOM, count)
            unionShowLog({
              type: count.type,
              id: count.id,
              pgnum: M_DOM.dataset.pgnum,
              idx: M_DOM.dataset.tjidx
            })
          }
        })
        break

      case 'articledown':
        MIP.setData({contentStyle: {height: (document.querySelector('.detail-content').offsetHeight / 2) + 'px'}})
        MIP.watch('GLOBAL.gg.articledown', function (count) {
          if (count.type === 'dsp') {
            DSPAD(M_DOM, count.data)
          } else if (count.type === 'baidu') {
            unionAD(M_DOM, count)
            unionShowLog({
              type: count.type,
              id: count.id,
              pgnum: M_DOM.dataset.pgnum,
              idx: M_DOM.dataset.tjidx
            })
          }
        })
        break

      case 'six':
        MIP.watch('GLOBAL.gg.six', function (count) {
          if (count.type === 'dsp') {
            DSPAD(M_DOM, count.data)
          } else if (count.type === 'baidu') {
            unionAD(M_DOM, count)
            unionShowLog({
              type: count.type,
              id: count.id,
              pgnum: M_DOM.dataset.pgnum,
              idx: M_DOM.dataset.tjidx
            })
          }
        })
        break

      case 'three':
        MIP.watch('GLOBAL.gg.three', function (count) {
          if (count.type === 'dsp') {
            DSPAD(M_DOM, count.data)
          } else if (count.type === 'baidu') {
            unionAD(M_DOM, count)
            unionShowLog({
              type: count.type,
              id: count.id,
              pgnum: M_DOM.dataset.pgnum,
              idx: M_DOM.dataset.tjidx
            })
          }
        })
        break

      case 'information':
        MIP.watch('GLOBAL.gg', function (count) {
          getHotNewsData(M_DOM)

          // 滚动事件
          MIP.viewport.on('scroll', function () {
            // 获取当前页面实际高度
            let scrollHeight = MIP.viewport.getScrollHeight()
            // 获取当前滚动距离
            let scrollTop = MIP.viewport.getScrollTop()
            // 当前视口高度
            let VH = MIP.viewport.getHeight()

            // 信息流滚动标记，防多次加载
            let flag = MIP.getData('GLOBAL.informationFlag')
            // 信息流屏数
            let maxPage = 10
            let nowPage = MIP.getData('GLOBAL.informationPageNum')

            // 信息流滚动设置
            if (VH + scrollTop + 200 >= scrollHeight && flag && nowPage < maxPage) {
              getHotNewsData(M_DOM)
              MIP.setData({GLOBAL: {informationFlag: false}})
            }

            // 正文下方广告位
            let contentADDom = document.querySelector('.content-down-ad')
            let contentDom = document.querySelector('.detail-content')
            let H1 = contentDom.offsetHeight // 正文盒子自身高度
            let H2 = bodyOffsetTop(contentDom).top // 正文盒子距离body的高度
            let H3 = contentADDom.offsetHeight // 广告盒子距离body的高度

            if (scrollTop + VH < H1 + H2 + H3 && contentDom.style.height === 'auto') {
              MIP.setData({fixedADStyle: {position: 'fixed'}})
            } else {
              MIP.setData({fixedADStyle: {position: 'relative'}})
            }
          })
        })
        break

      default:
        break
    }
  }
}

// DSP广告
function DSPAD (dom, gg) {
  let OBJ = {
    timestamp: +new Date(),
    randomID: Math.random().toString(36).slice(2, 9)
  }
  let wrapper = 'dsp_' + OBJ.timestamp + '_' + OBJ.randomID

  let tempDom = DSPDOM(gg)

  OBJ[wrapper] = document.createElement('div')
  OBJ[wrapper].classList.add(wrapper)
  OBJ[wrapper].innerHTML = tempDom
  dom.appendChild(OBJ[wrapper])
}

// DSP广告DOM
function DSPDOM (gg) {
  let tempDom = ''
  if (gg.adStyle === 'group') { // 三图
    tempDom = `
      <a class="dsp-ad-box" href="${gg.url}" data-clickbackurl="${gg.clickbackurl}" data-inviewbackurl="${gg.inviewbackurl}" data-showbackurl="${gg.showbackurl}">
        <h3 class="ad-title">${gg.topic}</h3>
        <div class="ad-img-wrap">
          <img class="ad-img" src="${gg.miniimg[0].src}" alt="">
          <img class="ad-img" src="${gg.miniimg[1].src}" alt="">
          <img class="ad-img" src="${gg.miniimg[2].src}" alt="">
        </div>
        <p class="ad-info"><span class="summary">${gg.summary}</span><span class="ad-info-right"><span class="source">${gg.source}</span><span class="text">提供的广告</span></span></p>
      </a>`
  } else if (gg.adStyle === 'big') { // 大图
    tempDom = `
      <a class="dsp-ad-box" href="${gg.url}" data-clickbackurl="${gg.clickbackurl}" data-inviewbackurl="${gg.inviewbackurl}" data-showbackurl="${gg.showbackurl}">
        <h3 class="ad-title">${gg.topic}</h3>
        <div class="ad-img-wrap">
          <img class="ad-img ad-img-big" src="${gg.miniimg[0].src}" alt="">
        </div>
        <p class="ad-info"><span class="summary">${gg.summary}</span><span class="ad-info-right"><span class="source">${gg.source}</span><span class="text">提供的广告</span></span></p>
      </a>`
  } else if (gg.adStyle === 'one') { // 单图
    tempDom = `
      <a class="dsp-ad-box" href="${gg.url}" data-clickbackurl="${gg.clickbackurl}" data-inviewbackurl="${gg.inviewbackurl}" data-showbackurl="${gg.showbackurl}">
        <div class="ad-one-wrap">
          <div class="ad-left">
            <h3 class="ad-title">${gg.topic}</h3>
          </div>
          <div class="ad-img-wrap ad-right">
            <img class="ad-img ad-img-one" src="${gg.miniimg[0].src}" alt="">
          </div>
        </div>
        <p class="ad-info"><span class="summary">${gg.summary}</span><span class="ad-info-right"><span class="source">${gg.source}</span><span class="text">提供的广告</span></span></p>
      </a>`
  }
  return tempDom
}

// 联盟广告
function unionAD (dom, gg) {
  let OBJ = {
    timestamp: +new Date(),
    randomID: Math.random().toString(36).slice(2, 9)
  }
  let wrapper = 'union_' + OBJ.timestamp + '_' + OBJ.randomID

  OBJ[wrapper] = document.createElement('div')
  OBJ[wrapper].classList.add(wrapper)
  OBJ[wrapper].innerHTML = `<mip-ad type="baidu-wm-ext" domain="sh996.dftoutiao.com" token="${gg.id}"><div id="${gg.id}"></div></mip-ad>`
  dom.appendChild(OBJ[wrapper])
}

// 信息流新闻加广告
function informationFlowDOM (dom) {
  let informationNews = MIP.getData('GLOBAL.informationNews')
  let informationAD = MIP.getData('GLOBAL.informationAD')
  let gg = MIP.getData('GLOBAL.gg')
  let idx = MIP.getData('GLOBAL.informationPageNum')
  let arr = informationNews[idx]
  let tempDom = ''
  let ADCount = 1

  let ttaccid = MIP.getData('GLOBAL.UrlInfo.ttaccid') || MIP.getData('GLOBAL.UrlInfo.ac') || MIP.getData('GLOBAL.UrlInfo.ca')
  let apptypeid = MIP.getData('GLOBAL.UrlInfo.apptypeid') || null
  let softtype = MIP.getData('GLOBAL.UrlInfo.softtype')
  let softname = MIP.getData('GLOBAL.UrlInfo.softname')
  let ver = MIP.getData('GLOBAL.UrlInfo.ver')
  let appqid = MIP.getData('GLOBAL.UrlInfo.appqid')
  let ttloginid = MIP.getData('GLOBAL.UrlInfo.ttloginid')
  let appver = MIP.getData('GLOBAL.UrlInfo.appver')
  let issdkqid = MIP.getData('GLOBAL.UrlInfo.issdkqid') === '1' || false

  for (let index = 0; index < arr.length; index++) {
    arr[index].url += `?qid=${MIP.getData('GLOBAL.qid')}&idx=${(idx * 10) + index + 1}&fr=${window.location.origin + window.location.pathname}&recommendtype=${arr[index].recommendtype ? arr[index].recommendtype : '-1'}&deviceid=${MIP.getData('GLOBAL.UrlInfo.deviceid') || null}&pgnum=${idx + 1}&appnewpage=1`

    if (ttaccid) {
      arr[index].url += '&ttaccid=' + ttaccid
    }
    if (MIP.getData('GLOBAL.UrlInfo.ime')) {
      arr[index].url += '&ime=' + MIP.getData('GLOBAL.UrlInfo.ime')
    }
    if (apptypeid !== null) {
      arr[index].url += '&apptypeid=' + apptypeid
    }
    if (Number(arr[index].hotnews) || '') {
      arr[index].url += '&ishot=1'
    }
    if (softtype) {
      arr[index].url += '&softtype=' + softtype
    }
    if (softname) {
      arr[index].url += '&softname=' + softname
    }
    if (ver) {
      arr[index].url += '&ver=' + ver
    }
    if (appqid) {
      arr[index].url += '&appqid=' + appqid
    }
    if (ttloginid) {
      arr[index].url += '&ttloginid=' + ttloginid
    }
    if (appver) {
      arr[index].url += '&appver=' + appver
    }
    if (issdkqid) {
      arr[index].url += '&issdkqid=1'
    }

    if (idx === 0 && /^0$|^2$|^4$|^7$/gi.test(index)) {
      switch (index) {
        case 0:
          if (gg.threefirst.type === 'baidu') {
            tempDom += `<div class="info-flow-ad info-flow-ad-${idx + 1}-${ADCount} detail-ad-box" data-pgnum="1" data-tjidx="1" data-adid="${gg.threefirst.id}" data-adtype="baidu">
                <mip-ad type="baidu-wm-ext" domain="sh996.dftoutiao.com" token="${gg.threefirst.id}"><div id="${gg.threefirst.id}"></div></mip-ad>
              </div>`
          } else if (gg.threefirst.type === 'dsp') {
            tempDom += `<div class="info-flow-ad info-flow-ad-${idx + 1}-${ADCount} detail-ad-box" data-pgnum="1" data-tjidx="1" data-adtype="dsp">
                ${DSPDOM(gg.threefirst.data)}
              </div>`
          }
          break
        case 2:
          if (gg.threeup.type === 'baidu') {
            tempDom += `<div class="info-flow-ad info-flow-ad-${idx + 1}-${ADCount} detail-ad-box" data-pgnum="2" data-tjidx="1" data-adid="${gg.threefirst.id}" data-adtype="baidu">
                <mip-ad type="baidu-wm-ext" domain="sh996.dftoutiao.com" token="${gg.threeup.id}"><div id="${gg.threeup.id}"></div></mip-ad>
              </div>`
          } else if (gg.threeup.type === 'dsp') {
            tempDom += `<div class="info-flow-ad info-flow-ad-${idx + 1}-${ADCount} detail-ad-box" data-pgnum="2" data-tjidx="1" data-adtype="dsp">
                ${DSPDOM(gg.threeup.data)}
              </div>`
          }
          break
        case 4:
          if (gg.threemiddle.type === 'baidu') {
            tempDom += `<div class="info-flow-ad info-flow-ad-${idx + 1}-${ADCount} detail-ad-box" data-pgnum="3" data-tjidx="1" data-adid="${gg.threefirst.id}" data-adtype="baidu">
                <mip-ad type="baidu-wm-ext" domain="sh996.dftoutiao.com" token="${gg.threemiddle.id}"><div id="${gg.threemiddle.id}"></div></mip-ad>
              </div>`
          } else if (gg.threemiddle.type === 'dsp') {
            tempDom += `<div class="info-flow-ad info-flow-ad-${idx + 1}-${ADCount} detail-ad-box" data-pgnum="3" data-tjidx="1" data-adtype="dsp">
                ${DSPDOM(gg.threemiddle.data)}
              </div>`
          }
          break
        case 7:
          if (gg.threedown.type === 'baidu') {
            tempDom += `<div class="info-flow-ad info-flow-ad-${idx + 1}-${ADCount} detail-ad-box" data-pgnum="4" data-tjidx="1" data-adid="${gg.threefirst.id}" data-adtype="baidu">
                <mip-ad type="baidu-wm-ext" domain="sh996.dftoutiao.com" token="${gg.threedown.id}"><div id="${gg.threedown.id}"></div></mip-ad>
              </div>`
          } else if (gg.threedown.type === 'dsp') {
            tempDom += `<div class="info-flow-ad info-flow-ad-${idx + 1}-${ADCount} detail-ad-box" data-pgnum="4" data-tjidx="1" data-adtype="dsp">
                ${DSPDOM(gg.threedown.data)}
              </div>`
          }
          break

        default:
          break
      }
      ADCount++
    } else if (idx > 0 && /^2$|^4$|^7$/gi.test(index)) {
      tempDom += `<div class="info-flow-ad info-flow-ad-${idx + 1}-${ADCount} detail-ad-box" data-pgnum="${idx + 1}" data-tjidx="${ADCount}" data-adid="${gg.threefirst.id}" data-adtype="baidu">
          <mip-ad type="baidu-wm-ext" domain="sh996.dftoutiao.com" token="${informationAD[(idx * 3) + ADCount - 1]}"><div id="${informationAD[(idx * 3) + ADCount - 1]}"></div></mip-ad>
        </div>`
      ADCount++
    }
    if (arr[index].miniimg.length === 1) {
      tempDom += `
        <div class="additional-module-item">
          <a class="item-link" data-title="${arr[index].topic}" href="${arr[index].url}">
            <div class="item-link-left">
              <h3 class="item-link-title">${arr[index].topic}</h3>
              <p class="item-link-source">
                <span class="time">${arr[index].date}</span>
                <span class="source">${arr[index].source}</span>
              </p>
            </div>
            <div class="item-link-img item-link-right">
              <div class="img-warp">
                <mip-img src="${arr[index].miniimg[0].src}"></mip-img>
              </div>
            </div>
          </a>
        </div>`
    } else if (arr[index].miniimg.length === 3) {
      tempDom += `
        <div class="additional-module-item">
          <a class="item-link" data-title="${arr[index].topic}" href="${arr[index].url}">
            <h3 class="item-link-title">${arr[index].topic}</h3>
            <div class="item-link-img">
              <div class="img-warp">
                <mip-img src="${arr[index].miniimg[0].src}"></mip-img>
              </div>
              <div class="img-warp">
                <mip-img src="${arr[index].miniimg[1].src}"></mip-img>
              </div>
              <div class="img-warp">
                <mip-img src="${arr[index].miniimg[2].src}"></mip-img>
              </div>
            </div>
            <p class="item-link-source">
              <span class="time">${arr[index].date}</span>
              <span class="source">${arr[index].source}</span>
            </p>
          </a>
        </div>`
    }
  }

  if (idx < 1) {
    tempDom += `<div class="info-flow-bottom-text-ad ad-bottom-text-1 detail-ad-box" data-ggpos="bottom" data-pgnum="1"><mip-ad type="baidu-wm-ext" domain="sh996.dftoutiao.com" token="${gg.bottomtext1.id}"><div id="${gg.bottomtext1.id}"></div></mip-ad></div>`
    tempDom += `<div class="info-flow-bottom-text-ad ad-bottom-text-2 detail-ad-box" data-ggpos="bottom" data-pgnum="1"><mip-ad type="baidu-wm-ext" domain="sh996.dftoutiao.com" token="${gg.bottomtext2.id}"><div id="${gg.bottomtext2.id}"></div></mip-ad></div>`
    tempDom += `<div class="info-flow-bottom-text-ad ad-bottom-text-3 detail-ad-box" data-ggpos="bottom" data-pgnum="1"><mip-ad type="baidu-wm-ext" domain="sh996.dftoutiao.com" token="${gg.bottomtext3.id}"><div id="${gg.bottomtext3.id}"></div></mip-ad></div>`
    tempDom += `<div class="info-flow-bottom-text-ad ad-bottom-text-4 detail-ad-box" data-ggpos="bottom" data-pgnum="1"><mip-ad type="baidu-wm-ext" domain="sh996.dftoutiao.com" token="${gg.bottomtext4.id}"><div id="${gg.bottomtext4.id}"></div></mip-ad></div>`
  }

  let OBJ = {
    timestamp: +new Date(),
    randomID: Math.random().toString(36).slice(2, 9)
  }
  let wrapper = 'information_' + OBJ.timestamp + '_' + OBJ.randomID

  OBJ[wrapper] = document.createElement('div')
  OBJ[wrapper].classList.add(wrapper)
  OBJ[wrapper].innerHTML = tempDom
  dom.appendChild(OBJ[wrapper])

  // 广告上报事件
  let infoFlowAD = document.querySelectorAll(`.${wrapper} .info-flow-ad`)

  for (let index = 0; index < infoFlowAD.length; index++) {
    if (infoFlowAD[index].dataset.adtype === 'baidu') {
      unionShowLog({
        type: infoFlowAD[index].dataset.adtype,
        id: infoFlowAD[index].dataset.adid,
        pgnum: infoFlowAD[index].dataset.pgnum,
        idx: infoFlowAD[index].dataset.tjidx
      })
    }
  }

  if (idx < 1) {
    // 只有第一屏才处理DSP上报相关方法
    DSPLogFN()
  }

  MIP.setData({GLOBAL: {informationPageNum: idx + 1}}) // 当前屏数加1
  MIP.setData({GLOBAL: {informationFlag: true}}) // 滚动时只加载一屏信息流
}

// 请求信息流新闻数据
function getHotNewsData (dom) {
  let GLOBAL = MIP.getData('GLOBAL')
  let url = 'https://dfttdetail.dftoutiao.com/newsmore_h5detail/newspool'

  let data = {
    htps: window.location.protocol.indexOf('https') >= 0 ? '1' : '0',
    type: MIP.getData('newsType'), // 新闻类别
    qid: GLOBAL.qid, // 渠道
    uid: GLOBAL.uid, // 用户ID
    newsnum: 10, // 新闻数量 默认10条
    ishot: GLOBAL.UrlInfo.ishot || 'null', // 是否是热点新闻
    recommendtype: GLOBAL.UrlInfo.recommendtype || 'null', // 推荐新闻的类别
    url: window.location.origin + window.location.pathname, // 当前新闻的url（纯净的url）
    os: GLOBAL.OSInfo.OS + ' ' + GLOBAL.OSInfo.version, // 操作系统
    pgnum: GLOBAL.informationPageNum + 1, // 当前请求第几页数据
    pos_pro: GLOBAL.REGION.curProvname || 'null',
    pos_city: GLOBAL.REGION.curCityname || 'null'
  }

  let param = '?'

  for (const key in data) {
    param += `${key}=${data[key]}&`
  }

  url += param
  url = url.slice(0, url.length - 1)

  fetchJsonp(url, { // eslint-disable-line
    jsonpCallback: 'jsonpcallback'
  }).then(function (res) {
    // 处理响应数据
    return res.json()
  }).then(function (data) {
    // 处理parse 后的data数据
    let arr = MIP.getData('GLOBAL.informationNews')
    arr.push(data.data)
    MIP.setData({GLOBAL: {informationNews: arr}})
    informationFlowDOM(dom)
  }).catch(function (ex) {
    // 捕获 parse的异常
    console.log('parsing failed', ex)
  })
}

// 联盟打底广告日志
function unionShowLog (options) {
  let GLOBAL = MIP.getData('GLOBAL')

  let url = 'https://pcunionreportlog.shaqm.com/dspdatalog/unionshow'
  let data = {
    unionname: options.type, // 联盟名称 如："sougou"
    uid: GLOBAL.uid, // 用户id
    ttaccid: GLOBAL.UrlInfo.ttaccid || 'null', // App用户的注册id（100000077）没有就传 "null"
    qid: GLOBAL.qid, // 渠道号
    softtype: 'news',
    softname: 'eastday_wapnews',
    fr_url: window.location.origin + window.location.pathname, // 列表页传栏目类别(如:yule)，详情页传详情页的url
    gg_url: 'null', // 广告落地页url
    gg_id: options.id, // 广告的id，没有则传"null"
    ime: GLOBAL.UrlInfo.ime || 'null', // 客户端ime（如：866550025328367）
    appqid: GLOBAL.UrlInfo.appqid || 'null', // App渠道号（appstore151203）
    apptypeid: GLOBAL.UrlInfo.apptypeid || 'null', // App应用的软件类别id（DFTT）
    ver: GLOBAL.UrlInfo.ver || 'null', // App的版本号（如：1.1.4）
    appver: GLOBAL.UrlInfo.appver || 'null', // 版本号（如：010104）
    deviceid: GLOBAL.UrlInfo.deviceid || 'null', // 安卓传安卓唯一id，ios传idfa
    os: GLOBAL.OSInfo.OS + ' ' + GLOBAL.OSInfo.version,
    accurateurl: 'null',
    pgtype: 'detail', // list（信息流）、detail（内页）、videodetail(视频内页) 、video（视频暂停）、videplay（视频信息流）、videoend（视频结束）、photoend（图集最后一页）、home(APP主页)
    adpgnum: options.pgnum, // 第几页
    adidx: options.idx, // 广告位置idx
    newstype: MIP.getData('newsType') // 当前页面的类别（shehui、guonei、guoji等）
  }

  let param = '?'

  for (const key in data) {
    param += `${key}=${data[key]}&`
  }

  url += param
  url = url.slice(0, url.length - 1)

  let img = new Image()
  img.src = url
}

// DSP 广告上报方法，只有第一屏会有DSP广告，所以逻辑是按照第一屏展现之后开始上报逻辑，之后的信息流没有DSP广告，不做上报处理
function DSPLogFN () {
  let DSPADDOM = document.querySelectorAll('.dsp-ad-box')
  console.log(DSPADDOM)

  for (let index = 0; index < DSPADDOM.length; index++) {
    showFN(DSPADDOM[index])
    clickFN(DSPADDOM[index])
  }

  // 滚动事件
  MIP.viewport.on('scroll', function () {
    // 获取当前滚动距离
    let scrollTop = MIP.viewport.getScrollTop()
    // 当前视口高度
    let VH = MIP.viewport.getHeight()

    inviewFN(DSPADDOM, scrollTop, VH)
  })

  // 展现上报方法
  function showFN (dom) {
    let url = dom.dataset.showbackurl
    dom.dataset.isShow = '1'
    let img = new Image()
    img.src = url
  }

  // 进屏上报方法
  function inviewFN (domArr, st, vh) {
    for (let index = 0; index < domArr.length; index++) {
      let _dom = domArr[index]

      // 当前DSP广告距离body的距离
      let dt = bodyOffsetTop(_dom).top
      // 当前DSP广告的高度
      let dh = _dom.offsetHeight

      // 展现标记
      let definedShow = _dom.dataset.isShow === '1'
      // 进屏标记
      let definedInview = _dom.dataset.isInview !== '1'

      if (definedShow && definedInview && st + vh > dt && st - vh < dt + dh) {
      // 广告已经展现，还没有进屏上报
        let url = _dom.dataset.inviewbackurl
        _dom.dataset.isInview = '1'
        let img = new Image()
        img.src = url
      }
    }
  }

  // 点击上报
  function clickFN (dom) {
    dom.onclick = function (e) {
      let url = dom.dataset.clickbackurl
      let img = new Image()
      img.src = url
    }
  }
}

// 获取元素距离body的距离
function bodyOffsetTop (e) {
  let obj = {
    left: 0,
    top: 0
  }
  while (e !== document.body && e !== null) {
    obj.left += e.offsetLeft
    obj.top += e.offsetTop
    e = e.offsetParent
  }
  return obj
}
