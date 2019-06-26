import {
  configPingback,
  sendClick,
  sendBlock
} from '../../common/pingback'
import { isInViewport } from '../../common/viewport'
import { RSEAT_ATTR, BLOCK_ATTR } from './const'

export default class MIPIqiyiReadStats extends MIP.CustomElement {
  constructor (props) {
    super(props)
    this.log = MIP.util.log('iQiyi Read Stats')
  }

  checkBlock () {
    if (!this.blockElements.length) return false
    this.blockElements.forEach(element => {
      if (isInViewport(element)) {
        sendBlock(element.getAttribute(BLOCK_ATTR))
        element.removeAttribute(BLOCK_ATTR)
      }
    })
    this.updateBlockElements()
  }

  updateBlockElements () {
    this.blockElements = document.querySelectorAll(
      `[${BLOCK_ATTR}]`
    )
  }

  build () {
    try {
      const option = JSON.parse(this.element.children[0].innerText)
      configPingback(option)
    } catch (e) {
      this.log.error('组件内必须传入 stats 配置选项')
    }
    MIP.util.dom.waitDocumentReady(() => {
      MIP.util.event.delegate(
        document.body,
        `[${RSEAT_ATTR}]`,
        'click',
        ({ target }) => {
          const element = MIP.util.dom.closest(
            target,
            `[${RSEAT_ATTR}]`
          )
          sendClick(element.getAttribute(RSEAT_ATTR))
        }
      )
      this.updateBlockElements()
      this.checkBlock()
      if (this.blockElements.length) {
        MIP.viewport.on('scroll', () => {
          this.checkBlock()
        })
      }
    })
  }
}
