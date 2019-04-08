/**
 * @file 获取页面中一些内容
 */

import Visitor from './visitorLog.js'

let pageInfo = type => {
  let value = ''
  if (type === 'url') {
    try {
      value = top.window.location.href
    } catch (err) {
      value = window.location.href
    }
    value = encodeURIComponent(value)
  } else if (type === 'ref') {
    try {
      value = encodeURIComponent(top.document.referrer)
    } catch (err) {
      value = encodeURIComponent(document.referrer)
    }
  } else if (type === 'title') {
    try {
      value = encodeURIComponent(top.document.title)
    } catch (err) {
      value = encodeURIComponent(document.title)
    }
  }
  return value
}

const getKeyword = () => {
  let descElement = document.getElementById('desc-detail')
  let thekeyword = ''
  let descContent = ''
  let wdsArr = ''
  let de = decodeURIComponent
  let c = 'gbk'
  let host = ''
  let r = /http[s]{0,1}:\/\/([^/]+)\//i
  let r2 = /(?:baidu.+?wd=|baidu.+?word=|5ikang.+?keyword=|sogou.+?keyword=|google.+?q=|so.+?q=|bing.+?q=|soso.+?w=|yahoo.+?q=|yahoo.+?[?|&]p=|360.+?q=)([^&]*)/

  if (r2.test(ref)) {
    if (ref.indexOf('ie=utf-8') > -1) {
      c = 'utf'
    } else if (ref.indexOf('ie=gbk') > -1) {
      c = 'gbk'
    } else {
      host = ref.match(r)
      if (typeof (host) !== 'undefined' && typeof (host[1]) !== 'undefined') {
        if (host[1] === 'www.sogou.com' || host[1] === 'www.soso.com' || host[1] === 'so.5ikang.com' || host[1] === 'www.baidu.com') {
          if (ref.indexOf('ie=utf-8') > -1) {
            c = 'utf'
          }
        } else if (host[1] === 'so.360.cn' || host[1] === 'www.so.com') {
          if (ref.indexOf('ie=gbk') > -1) {
            c = 'gbk'
          } else {
            c = 'utf'
          }
        } else {
          c = 'utf'
        }
      }
    }
    wdsArr = ref.match(r2)
    if (typeof (wdsArr) !== 'undefined' && typeof (wdsArr[1]) !== 'undefined') {
      thekeyword = wdsArr[1]
      if (/(iPhone)/i.test(navigator.userAgent)) {
        thekeyword = ''
      }
      if (c === 'utf') {
        thekeyword = de(thekeyword)
      }
      if (thekeyword.indexOf('%') > -1) {
        thekeyword = urlDe(thekeyword)
      }
    }
  }

  if (descElement) {
    descContent = descElement.innerHTML
    if (descContent) {
      descContent = descContent.replace(/<script.*?>.*?<\/script>/ig, '')
      descContent = descContent.replace(/<\/?[^>]*>/g, '')
      descContent = descContent.replace(/&nbsp/g, '')
      descContent = descContent.replace(/\s/g, '')
      descContent = descContent.replace(/\r\n/g, '')
    }
  }
  let title = pageInfo('title')
  if (title) {
    title = decodeURIComponent(title)
  }
  let titleArr = []
  if (title.indexOf('-') > -1) {
    titleArr = title.split('-')
    title = titleArr[0]
  }
  if (title.indexOf('_') > -1) {
    titleArr = title.split('_')
    title = titleArr[0]
  }
  title = thekeyword + '|' + title + descContent
  title = title.substr(0, 110)
  title = encodeURIComponent(title)
  return title
}

const urlDe = thekeyword => {
  let ret = ''
  try {
    ret = decodeURIComponent(thekeyword)
  } catch (ex) {
    ret = ''
  }
  return ret
}

let clientId = Visitor.setClientId()
let ref = pageInfo('ref')
let url = pageInfo('url')
let keyword = getKeyword()

const sendPv = (ks, ksPid) => {
  try {
    new Image().src = `https://stat-vs.5ikang.com/e.png?ref=${ref}&ks=${ks}&kspid=${ksPid}&t=${keyword}&f=${url}&clientID=${clientId}&time=${new Date().getTime()}time`
  } catch (err) {}
}
export default {
  pageInfo,
  getKeyword,
  sendPv,
  ref,
  keyword,
  url,
  clientId
}
