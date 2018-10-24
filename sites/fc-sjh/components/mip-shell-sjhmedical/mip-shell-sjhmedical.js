/**
 * @file 极速服务 商家号医疗shell
 * @author lijia19@baidu.com
 */

import './mip-shell-sjhmedical.less'

import Header from './feature/header' // shell导航头部

export default class MipShellSjhmedical extends MIP.builtinComponents.MipShell {
  // 继承基类 shell, 扩展商家号医疗shell
  constructor (...args) {
    super(...args)
    this.alwaysUseTitleInShellConfig = true
    this.transitionContainsHeader = false
  }

  // 基类方法：绑定页面可被外界调用的事件。
  bindAllEvents () {
    super.bindAllEvents()
  }

  // 基类root方法：绑定页面可被外界调用的事件。
  // 如从跳转后的iframe内部emitEvent, 调用根页面的shell bar弹出效果
  bindRootEvents () {
    super.bindRootEvents()
  }

  // 基类root方法：初始化。用于除头部bar之外的元素
  renderOtherParts () {
    super.renderOtherParts()
    // 初始化所有内置对象，包括底部控制栏，侧边栏，字体调整按钮，背景颜色模式切换
    this._initAllObjects()
  }

  // 自有方法 仅root：初始化所有内置对象，包括底部控制栏，侧边栏，字体调整按钮，背景颜色模式切换
  _initAllObjects () {
    let configMeta = this.currentPageMeta
    const isIndex = this.currentPageMeta.view.isIndex
    this.header = new Header(this.$el)
    !isIndex && this.header.setCustomHeader(configMeta.header.homeUrl)
  }

  // 基类方法：页面跳转时，解绑当前页事件，防止重复绑定
  unbindHeaderEvents () {
    super.unbindHeaderEvents()
  }

  // 基类方法 每个页面执行：绑定头部弹层事件。
  bindHeaderEvents () {
    super.bindHeaderEvents()
  }

  // 基类方法，设置默认的shellConfig
  processShellConfig (shellConfig) {
    MIP.mipshellXiaoshuo = this
    this.shellConfig = shellConfig
    shellConfig.routes.forEach(routerConfig => {
      routerConfig.meta.header.bouncy = false
    })
  }

  // update you want
  updateOtherParts () {
    const configMeta = this.currentPageMeta
    const isIndex = this.currentPageMeta.view.isIndex
    !isIndex && this.header.setCustomHeader(configMeta.header.homeUrl)
  }

  // 基类方法，在页面翻页时页面由于alwaysReadOnLoad为true重新刷新，因此shell的config需要重新配置
  // matchIndex是用来标识它符合了哪个路由，根据不同的路由修改不同的配置
  processShellConfigInLeaf (shellConfig, matchIndex) {
    shellConfig.routes[matchIndex].meta.header.bouncy = false
  }

  /**
   * 获取上级可scroll的元素
   *
   * @param {Object} element 目标元素
   */
  getClosestScrollElement (element) {
    while (element && !element.getAttribute('mip-shell-scrollboundary')) {
      if (MIP.util.css(element, 'overflow-y') === 'auto' && element.clientHeight < element.scrollHeight) {
        return element
      }
      element = element.parentNode
    }
    return null
  }
}
