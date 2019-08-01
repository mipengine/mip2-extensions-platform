/**
 * @file mip-history 组件
 * @author Jenny_L(jiaojiaomao220@163.com)
 */
import './index.less'

export default class MIPHistory extends MIP.CustomElement {
  build () {
    let customElement = require('customElement').create()
    /**
     * trigger when btn is in view. add event listener, when click,
     * make corresponding history move.
     *
     * @param  {Object} ele mip-history element
     */
    function init (ele) {
      let history = ele.getAttribute('history')
      if (history) {
        // histry: go back and forward
        let historyArr = history.split(',')
        let func = historyArr[0]
        // XXX: avoid using eval
        switch (func) {
          case 'go':
            let step = historyArr[1]
            if (step) {
              ele.addEventListener('click', function () {
                window.history.go(step - 0)
              }, false)
            } else {
              console.warn('history.go() 需要填写第二个参数')
            }
            break
          case 'back':
            ele.addEventListener('click', function () {
              window.history.back()
            }, false)
            break
          case 'forward':
            ele.addEventListener('click', function () {
              window.history.forward()
            }, false)
            break
        }
      }
    }

    /**
     * 构造元素，只会运行一次
     */
    customElement.prototype.firstInviewCallback = function () {
      let ele = this.element
      init(ele)
    }
    return customElement
  }
}
