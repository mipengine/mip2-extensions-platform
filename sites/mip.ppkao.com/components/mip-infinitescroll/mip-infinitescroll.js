/**
 * @file mip-infinitescroll 组件
 * @author wangpei07
 */
export default class MIPExample extends MIP.CustomElement {
  build () {
    let $ = require('zepto')
    let util = require('util')
    let templates = require('templates')
    let fetchJsonp = require('fetch-jsonp')
    let customElement = require('customElement').create()
    let InfiniteScroll = require('./infinitescroll')
    let infiniteScroll = null

    /**
     * [getUrl url 拼接函数]
     *
     * @param  {string} src 获取的最初url
     * @returns {string}     拼接后的url
     */
    function getUrl (src) {
      let self = this
      let url = src
      if (src.indexOf('?') > 0) {
        url += src[src.length - 1] === '?' ? '' : '&'
        url += self.params.pnName + '=' + self.params.pn
      } else {
        url += '?' + self.params.pnName + '=' + self.params.pn
      }
      return url
    }

    /**
     * 构造元素，只会运行一次
     */
    customElement.prototype.firstInviewCallback = function () {
      let self = this
      let element = self.element
      let src = element.getAttribute('data-src') || ''

      // 如果没有写data-src, 则报错提示
      if (!src) {
        console.error('未填写src字段，不能获取数据')
        element.remove()
        return
      }

      // 默认参数设置
      self.params = {
        rn: 20,
        prn: 6,
        pn: 1,
        pnName: 'pn',
        bufferHeightPx: 10,
        loadingHtml: '加载中...',
        loadFailHtml: '加载失败',
        loadOverHtml: '加载完毕!'
      }

      // 获取用户设置参数
      try {
        let script = element.querySelector('script[type="application/json"]')
        if (script) {
          self.params = util.fn.extend(self.params, JSON.parse(script.textContent.toString()))
        }
      } catch (e) {
        console.warn('json is illegal') // eslint-disable-line
        console.warn(e) // eslint-disable-line
        return
      }

      self.url = getUrl.call(self, src)

      self.pushResult = function (rn, status) {
        // 异步获取数据示例
        let defer = $.Deferred()

        if (rn > self.rn) {
          defer.resolve('NULL')
        } else {
          fetchJsonp(self.url, {
            jsonpCallback: 'callback'
          }).then(function (res) {
            return res.json()
          }).then(function (data) {
            if (data && parseInt(data.status, 10) === 0 && data.data) {
              if (rn > self.params.rn || !data.data.items) {
                defer.resolve('NULL')
              }
              templates.render(self.element, data.data.items).then(function (htmls) {
                defer.resolve(htmls)
              })
              self.params.pn++
              self.url = getUrl.call(self, src)
            } else {
              defer.resolve('NULL')
            }
          })
        }
        return defer.promise()
      }

      infiniteScroll = new InfiniteScroll({
        $result: element.querySelector('.mip-infinitescroll-results'),
        $loading: element.querySelector('.mip-infinitescroll-loading'),
        loadingHtml: self.params.loadingHtml,
        loadFailHtml: self.params.loadFailHtml,
        loadOverHtml: self.params.loadOverHtml,
        bufferHeightPx: self.params.bufferHeightPx,
        pageResultNum: self.params.prn,
        limitShowPn: 0,
        preLoadPn: 2,
        firstResult: [],
        pushResult: self.pushResult
      })
    }

    customElement.prototype.detachedCallback = function () {
      infiniteScroll = null
    }

    return customElement
  }
}
