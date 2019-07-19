/**
 * @file mip-ppkao-jiyancode 组件
 * @author
 */
export default class MIPExample extends MIP.CustomElement {
  build () {
    let $ = require('zepto')
    let customElement = require('customElement').create()

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    // 由于用到了第三方【极验】的功能，现在并没有这个服务的组件，所以添加了外链js
    customElement.prototype.firstInviewCallback = function () {
      let ele = this.element
      ele.addEventListener('click', function () {
        let url = ele.dataset.url
        jiYanCode(url)
      })

      function jiYanCode (openUrl) {
        $.ajax({
          type: 'POST',
          async: false,
          cache: false,
          url: '//newapi.ppkao.com/api/UserPowerApi/GetUserIP?Source=3g',
          dataType: 'jsonp',
          crossDomain: true,
          contentType: 'application/x-www-form-urlencodedcharset=utf-8',
          jsonp: 'callback',
          jsonpCallback: 'callback',
          success: function (data) {
            if (data.name === '1' || data.name === '4') {
              window.top.location.href = openUrl
              return false
            } else {
              window.top.location.href = 'https://api.ppkao.com/user/login/index_upvip.html'
              return false
            }
          },
          error: function (XMLHttpRequest, textStatus, errorThrown) {
            let result = openUrl.replace('//user.ppkao.com/', '//api.ppkao.com/')
            window.top.location.href = result
            return false
          }
        })
        /* let num = window.sessionStorage.getItem('JR_NUM')
         if (num === null || num === '') {
             num = 1
         }
         if (num === null || num === '' || num < 20) {
             window.sessionStorage.setItem('JR_NUM', ++num / 1)
             window.top.location.href = openUrl
         } else {
             let handlerEmbed = function (captchaObj) {
                 captchaObj.getValidate()
                 captchaObj.appendTo('#embed-captcha')
                 captchaObj.onReady(function () {
                     captchaObj.verify()
                 })
                 captchaObj.onSuccess(function () {
                     window.sessionStorage.setItem('JR_NUM', 1)
                     window.top.location = openUrl
                 })
             }
             $.ajax({
                 url: '//data.api.ppkao.com/Interface/GeetestSDK/GeetestSDK.ashx?action=getCaptcha&t='
                 + (new Date()).getTime(),
                 type: 'get',
                 dataType: 'json',
                 success: function (data) {
                     window.initGeetest({
                         gt: data.gt,
                         challenge: data.challenge,
                         product: 'bind',
                         offline: !data.success,
                         newCaptcha: data.new_captcha
                     }, handlerEmbed)
                 }
             })
         } */
      }

      (function (global, factory) {
        if (typeof module === 'object' && typeof module.exports === 'object') {
          // CommonJS
          module.exports = global.document ? factory(global, true)
            : function (w) {
              if (!w.document) {
                throw new Error('Geetest requires a window with a document')
              }
              return factory(w)
            }
        } else {
          factory(global)
        }
      }(typeof window !== 'undefined' ? window : this, function (window, noGlobal) {
        if (typeof window === 'undefined') {
          throw new Error('Geetest requires browser environment')
        }
        let document = window.document
        let Math = window.Math
        let head = document.getElementsByTagName('head')[0]
        function Jobject (obj) {
          this.jObj = obj
        }
        Jobject.prototype = {
          oEach: function (process) {
            let jObj = this.jObj
            for (let k in jObj) {
              if (jObj.hasOwnProperty(k)) {
                process(k, jObj[k])
              }
            }
            return this
          }
        }
        function Config (config) {
          let self = this
          new Jobject(config).oEach(function (key, value) {
            self[key] = value
          })
        }
        let isString = function (value) {
          return (typeof value === 'string')
        }
        Config.prototype = {
          apiServer: 'api.geetest.com',
          protocol: 'http://',
          typePath: '/gettype.php',
          // 由于用到了第三方【极验】的功能，现在并没有这个服务的组件，所以添加了外链js
          fallbackConfig: {
            slide: {
              staticServers: ['static.geetest.com', 'dn-staticdown.qbox.me'],
              type: 'slide',
              slide: '/static/js/geetest.0.0.0.js'
            },
            fullpage: {
              staticServers: ['static.geetest.com', 'dn-staticdown.qbox.me'],
              type: 'fullpage',
              fullpage: '/static/js/fullpage.0.0.0.js'
            }
          },
          getFallbackConfig: function () {
            let self = this
            if (isString(self.type)) {
              return self.fallbackConfig[self.type]
            } else if (self.newCaptcha) {
              return self.fallbackConfig.fullpage
            } else {
              return self.fallbackConfig.slide
            }
          },
          extend: function (obj) {
            let self = this
            new Jobject(obj).oEach(function (key, value) {
              self[key] = value
            })
          }
        }
        let isNumber = function (value) {
          return (typeof value === 'number')
        }
        let isBoolean = function (value) {
          return (typeof value === 'boolean')
        }
        let isObject = function (value) {
          return (typeof value === 'object' && value !== null)
        }
        let isFunction = function (value) {
          return (typeof value === 'function')
        }
        let callbacks = {}
        let status = {}
        let random = function () {
          return parseInt(Math.random() * 10000, 0) + (new Date()).valueOf()
        }
        let loadScript = function (url, cb) {
          let script = document.createElement('script')
          script.charset = 'UTF-8'
          script.async = true
          script.onerror = function () {
            cb(true)
          }
          let loaded = false
          script.onload = script.onreadystatechange = function () {
            if (!loaded && (!script.readyState ||
              script.readyState === 'loaded' ||
              script.readyState === 'complete')) {
              loaded = true
              setTimeout(function () {
                cb(false)
              }, 0)
            }
          }
          script.src = url
          head.appendChild(script)
        }
        let normalizeDomain = function (domain) {
          return domain.replace(/^https?:\/\/|\/$/g, '')
        }
        let normalizePath = function (path) {
          path = path.replace(/\/+/g, '/')
          if (path.indexOf('/') !== 0) {
            path = '/' + path
          }
          return path
        }
        let normalizeQuery = function (query) {
          if (!query) {
            return ''
          }
          let q = '?'
          new Jobject(query).oEach(function (key, value) {
            if (isString(value) || isNumber(value) || isBoolean(value)) {
              q = q + encodeURIComponent(key) + '=' + encodeURIComponent(value) + '&'
            }
          })
          if (q === '?') {
            q = ''
          }
          return q.replace(/&$/, '')
        }
        let makeURL = function (protocol, domain, path, query) {
          domain = normalizeDomain(domain)
          let url = normalizePath(path) + normalizeQuery(query)
          if (domain) {
            url = protocol + domain + url
          }
          return url
        }
        let load = function (protocol, domains, path, query, cb) {
          let tryRequest = function (at) {
            let url = makeURL(protocol, domains[at], path, query)
            loadScript(url, function (err) {
              if (err) {
                if (at >= domains.length - 1) {
                  cb(true)
                } else {
                  tryRequest(at + 1)
                }
              } else {
                cb(false)
              }
            })
          }
          tryRequest(0)
        }
        let jsonp = function (domains, path, config, callback) {
          if (isObject(config.getLib)) {
            config.extend(config.getLib)
            callback(config)
            return
          }
          if (config.offline) {
            callback(config.getFallbackConfig())
            return
          }
          let cb = 'geetest_' + random()
          window[cb] = function (data) {
            if (data.status === 'success') {
              callback(data.data)
            } else if (!data.status) {
              callback(data)
            } else {
              callback(config.getFallbackConfig())
            }
            window[cb] = undefined
            try {
              delete window[cb]
            } catch (e) {
            }
          }
          load(config.protocol, domains, path, {
            gt: config.gt,
            callback: cb
          }, function (err) {
            if (err) {
              callback(config.getFallbackConfig())
            }
          })
        }
        let throwError = function (errorType, config) {
          let errors = {
            networkError: '缃戠粶閿欒'
          }
          if (typeof config.onError === 'function') {
            config.onError(errors[errorType])
          } else {
            throw new Error(errors[errorType])
          }
        }
        let detect = function () {
          return !!window.Geetest
        }
        if (detect()) {
          status.slide = 'loaded'
        }
        let initGeetest = function (userConfig, callback) {
          let config = new Config(userConfig)
          if (userConfig.https) {
            config.protocol = 'https://'
          } else if (!userConfig.protocol) {
            config.protocol = window.top.location.protocol + '//'
          }
          jsonp([config.apiServer || config.apiserver], config.typePath, config, function (newConfig) {
            let type = newConfig.type
            let init = function () {
              config.extend(newConfig)
              callback(new window.Geetest(config))
            }
            callbacks[type] = callbacks[type] || []
            let s = status[type] || 'init'
            if (s === 'init') {
              status[type] = 'loading'
              callbacks[type].push(init)
              load(config.protocol, newConfig.static_servers || newConfig.domains, newConfig[type] ||
                newConfig.path, null,
              function (err) {
                if (err) {
                  status[type] = 'fail'
                  throwError('networkError', config)
                } else {
                  status[type] = 'loaded'
                  let cbs = callbacks[type]
                  for (let i = 0, len = cbs.length; i < len; i = i + 1) {
                    let cb = cbs[i]
                    if (isFunction(cb)) {
                      cb()
                    }
                  }
                  callbacks[type] = []
                }
              }
              )
            } else if (s === 'loaded') {
              init()
            } else if (s === 'fail') {
              throwError('networkError', config)
            } else if (s === 'loading') {
              callbacks[type].push(init)
            }
          })
        }
        window.initGeetest = initGeetest
        return initGeetest
      }))
    }
    return customElement
  }
}
