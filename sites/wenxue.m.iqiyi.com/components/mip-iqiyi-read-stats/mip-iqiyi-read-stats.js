import {
  configPingback,
  sendClick,
  sendBlock
} from '../../common/pingback'
import { isInViewport } from '../../common/viewport'
import {
  RSEAT_ATTR,
  BLOCK_ATTR,
  THROTTLE_DELAY,
  OPTION_ERROR
} from './const'

export default class MIPIqiyiReadStats extends MIP.CustomElement {
  constructor (props) {
    super(props)
    this.log = MIP.util.log('iQiyi Read Stats')
    this.scrollElements = {}
    this.scrollHandler = MIP.util.fn.throttle(() => {
      this.checkBlock()
    }, THROTTLE_DELAY)
  }

  checkBlock () {
    for (const selector in this.scrollElements) {
      if (this.scrollElements.hasOwnProperty(selector)) {
        const block = this.scrollElements[selector]
        const element = document.querySelector(selector)
        if (element && isInViewport(element)) {
          sendBlock(block)
          MIP.util.fn.del(this.scrollElements, selector)
        }
      }
    }
  }

  bindEvents ({ click }) {
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
    if (click) {
      for (const selector in click) {
        if (click.hasOwnProperty(selector)) {
          MIP.util.event.delegate(
            document.body,
            selector,
            'click',
            () => {
              sendClick(click[selector])
            },
            true
          )
        }
      }
    }
    this.checkBlock()
    if (Object.keys(this.scrollElements).length) {
      MIP.viewport.on('scroll', this.scrollHandler)
    }
  }

  build () {
    let option
    try {
      option = JSON.parse(this.element.children[0].innerText)
      configPingback(option.config)
    } catch (e) {
      this.log.error(OPTION_ERROR)
    }
    MIP.util.dom.waitDocumentReady(() => {
      document.querySelectorAll(`[${BLOCK_ATTR}]`).forEach(el => {
        const block = el.getAttribute(BLOCK_ATTR)
        this.scrollElements[`[${BLOCK_ATTR}='${block}']`] = block
      })
      if (option.scroll) Object.assign(this.scrollElements, option.scroll)
      this.bindEvents(option)
    })
  }
}
