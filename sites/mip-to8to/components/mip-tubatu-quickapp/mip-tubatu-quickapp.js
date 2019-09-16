// import './index.less'
// https://statres.quickapp.cn/quickapp/js/routerinline.min.js
export default class MIPTubatuQuickapp extends MIP.CustomElement {
  build () {
    let appRouter
    let appRouterHw
    // document.querySelector('#console').textContent = 'start'
    /*
     * Copyright (C) 2017, hapjs.org. All rights reserved.
     */
    function jumpQuick (e, on, t) {
      let i = document.createElement('iframe')
      let o = 'hwfastapp://' + e
      if (on) {
        o = o + '/' + on
      }
      if (t && Object.keys(t).length > 0) {
        (o = o + '?' + (t = Object.keys(t).map(function (e) {
          return e + '=' + encodeURIComponent(t[e])
        }).join('&')))
      }
      i.src = o
      document.body.appendChild(i)
      i.style.display = 'none'
    }
    function mipQuickApp (e) {
      'use strict'
      let t = navigator.userAgent.toLowerCase()
      let i = t.indexOf('android')
      let o = t.indexOf('build/huawei')
      let a = t.indexOf('build/honor')
      if (i >= 0 && (o >= 0 || a >= 0)) {
        appRouter = appRouterHw = function (e, t, i) {
          if (function () {
            let e = navigator.userAgent
            if (e) {
              if ((e = e.toLowerCase()).indexOf('huaweibrowser') >= 0) return !1
              let isAndroid = e.indexOf('android')
              let t = e.indexOf('build/huawei')
              if (t < 0) {
                t = e.indexOf('build/honor')
              }
              if (isAndroid >= 0 && t >= 0 && e.slice(isAndroid + 8, isAndroid + 9) >= 8) return !0
            }
            return !1
          }()) {
            (function (e, n, t) {
              let i = 'http://122.11.38.205/fastapprouter/'
              let o = ''
              i = i + (new Date()).getTime() + '/'
              if (n && n.indexOf('/') === 0) {
                n = n.length === 1 ? ' ' : n.substr(1)
              }
              e && (i = i + '?i=' + e)
              n && (i = i + '&p=' + n)

              if ((function (e) {
                if (!e) return !0
                let n = void 0
                for (n in e) return !1
                return !0
              }(t))) {
                let a = window.location.search
                a.indexOf('?') > -1 && (o = a.substr(1))
              } else {
                o = Object.keys(t).map(function (e) {
                  return e + '=' + encodeURIComponent(t[e])
                }).join('&')
              }
              o !== '' && (i = i + '&a=' + encodeURIComponent(o))
              let r = document.createElement('img')
              r.src = i
              r.style.width = '1px'
              r.style.height = '1px'
              r.style.display = 'none'
              document.body.appendChild(r)
            }(e, t, i = i || {}))

            if ((function () {
              let e = navigator.userAgent
              if (e) {
                let n = (e = e.toLowerCase()).indexOf('android')
                let t = e.indexOf('build/huawei')
                if (t < 0) {
                  (t = e.indexOf('build/honor'))
                }
                if (n >= 0 && t >= 0 && e.slice(n + 8, n + 9) >= 9) return !1
              }
              return !0
            }())) {
              let o = new Date()
              setTimeout(function () {
                new Date() - o <= 830 && jumpQuick(e, t, i)
              }, 800)
            }
          } else jumpQuick(e, t, i)
        }
      } else {
        // eslint-disable-next-line no-unused-expressions
        appRouter = function (e, n, t, i) {
          t = t || {}
          if (i) {
            t.__PROMPT__ = 1
            t.__NAME__ = i
          }
          return r(e, n, t)
        }
      }

      function r (e, n, t) {
        let i = 'http://thefatherofsalmon.com/'
        let o = ''
        e && (i = i + '?i=' + e)
        n && (i = i + '&p=' + n)
        i += '&random=' + Math.random()
        if ((function (e) {
          if (!e) return !0
          let n = void 0
          for (n in e) return !1
          return !0
        }(t))) {
          let a = window.location.search
          a.indexOf('?') > -1 && (o = a.substr(1))
        } else {
          o = Object.keys(t).map(function (e) {
            return e + '=' + encodeURIComponent(t[e])
          }).join('&')
        }
        o !== '' && (i = i + '&a=' + encodeURIComponent(o))
        let r = document.createElement('img')
        r.src = i
        r.style.width = '1px'
        r.style.height = '1px'
        r.style.display = 'none'
        document.body.appendChild(r)
      }

      // 跳转到快应用 id=app_router data-link="/index" data-param="{a: 1}"
      const appRouterNode = document.querySelector('#app_router')
      if (appRouterNode) {
        const url = appRouterNode.getAttribute('data-link')
        const params = JSON.parse(appRouterNode.getAttribute('data-param')) || {}
        // document.querySelector('#console').textContent = (typeof window.appRouter)
        if (typeof appRouter !== 'undefined' && url) {
          appRouter('com.tubatu.demo', url, params)
          // window.appRouter('com.tubatu.demo', 'ask/askList')
        }
      }
    }
    mipQuickApp()
  }
}
