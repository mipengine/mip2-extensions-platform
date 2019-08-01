/**
* @file CNZZ统计插件
* @exports modulename
* @author chenrui09@baidu.com
* @version 1.0
* @copyright 2016 Baidu.com, Inc. All Rights Reserved
*/
import './index.less'
export default class MIPStatsCnzz extends MIP.CustomElement {
  build () {
    let $ = require('zepto')
    let _czc
    let customElement = require('customElement').create()
    customElement.prototype.build = function () {
      let element = this.element
      let $element = $(element)
      let token = element.getAttribute('token')
      let setConfig = element.getAttribute('setconfig')

      if (token) {
        window._czc = window._czc || []
        _czc.push([
          '_setAccount',
          token
        ])

        // 检测setconfig是否存在
        if (setConfig) {
          let setCustom = buildArry(decodeURIComponent(setConfig))
          _czc.push(setCustom)
        }

        let cnzzScript = document.createElement('script')
        let src = 'https://s11.cnzz.com/z_stat.php?id=' + token +
           '&web_id=' + token
        cnzzScript.setAttribute('language', 'JavaScript')
        cnzzScript.src = src
        $element.append($(cnzzScript))
        bindEle()
      }
    }

    // 绑定事件
    function bindEle () {
      let tagBox = document.querySelectorAll('*[data-stats-cnzz-obj]')

      for (let index = 0; index < tagBox.length; index++) {
        let statusData = tagBox[index].getAttribute('data-stats-cnzz-obj')

        // 检测statusData是否存在
        if (!statusData) {
          return
        }

        try {
          statusData = JSON.parse(decodeURIComponent(statusData))
        } catch (e) {
          console.warn('事件追踪data-stats-cnzz-obj数据不正确')
          return
        }

        let eventtype = statusData.type
        if (!statusData.data) {
          return
        }

        let data = buildArry(statusData.data)

        if (eventtype !== 'click' && eventtype !== 'mouseup' && eventtype !== 'load') {
          // 事件限制到click,mouseup,load(直接触发)
          return
        }

        if ($(tagBox[index]).hasClass('mip-stats-eventload')) {
          return
        }

        $(tagBox[index]).addClass('mip-stats-eventload')

        if (eventtype === 'load') {
          _czc.push(data)
        } else {
          tagBox[index].addEventListener(eventtype, function (event) {
            let tempData = this.getAttribute('data-stats-cnzz-obj')
            if (!tempData) {
              return
            }
            let statusJson
            try {
              statusJson = JSON.parse(decodeURIComponent(tempData))
            } catch (e) {
              console.warn('事件追踪data-stats-cnzz-obj数据不正确')
              return
            }
            if (!statusJson.data) {
              return
            }
            let attrData = buildArry(statusJson.data)
            _czc.push(attrData)
          }, false)
        }
      }
    }

    // 数据换转
    function buildArry (arrayStr) {
      if (!arrayStr) {
        return
      }

      let strArr = arrayStr.slice(1, arrayStr.length - 1).split(',')
      let newArray = []

      for (let index = 0; index < strArr.length; index++) {
        let item = strArr[index].replace(/(^\s*)|(\s*$)/g, '').replace(/'/g, '')
        if (item === 'false' || item === 'true') {
          item = Boolean(item)
        }

        newArray.push(item)
      }
      return newArray
    }

    return customElement
  }
}
