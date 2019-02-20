/**
    @file 移动站点模板shell
 * @author 1450052652@qq.com
*/
import './mip-tnm-shell.less'
import Header from './feature/header'
import Footer from './feature/footer'
import Sidebar from './feature/sidebar'
export default class MIPTestnewmoudleShell extends window.MIP.builtinComponents.MIPShell {
  processShellConfig (shellConfig) {
  }
  renderOtherParts () {
    // 底部菜单
    this.$footerWrapper = document.createElement('mip-fixed')
    this.$footerWrapper.setAttribute('type', 'bottom')
    this.$footerWrapper.classList.add('mip-shell-footer-wrapper')

    this.$footer = document.createElement('div')
    this.$footer.classList.add('mip-shell-footer', 'mip-border')
    this.$footer.innerHTML = this.renderFooter()

    this.$footerWrapper.appendChild(this.$footer)
    this.$sidebarWrapper = document.createElement('mip-sidebar')
    this.$sidebarWrapper.setAttribute('id', 'sidebar')
    this.$sidebarWrapper.className = 'left-sidebar'
    this.$sidebarWrapper.setAttribute('display', 'nodisplay')
    this.$sidebarWrapper.classList.add('mip-shell-sidebar-wrapper')
    this.$sidebar = document.createElement('div')
    this.$sidebar.classList.add('mip-shell-sidebar', 'mip-border')
    this.$sidebar.innerHTML = this.renderSidebar()
    this.$sidebarWrapper.appendChild(this.$sidebar)
    super.renderOtherParts()
    document.getElementsByTagName('mip-tnm-shell')[0].appendChild(this.$footerWrapper)
    document.getElementsByTagName('mip-tnm-shell')[0].appendChild(this.$sidebarWrapper)
    this._initAllObjects()
  }
  _initAllObjects () {
    let configMeta = this.currentPageMeta
    const isIndex = this.currentPageMeta.view.isIndex
    this.header = new Header(this.$el);
    (!isIndex) && this.header.setCustomHeader(configMeta.header.homeUrl, configMeta.header.nmsorttitleUrl)
    this.footer = new Footer(this.$el)
    this.footer.setCustomFooter(configMeta.header.footermenuUrl, configMeta.header.nmsorttitleUrl, configMeta.header.allnmsortUrl)
    this.sidebar = new Sidebar(this.$el)
    this.sidebar.setCustomSidebar(configMeta.header.sidebarmenuUrl, configMeta.header.lanUrl, configMeta.header.nmsorttitleUrl, configMeta.header.allnmsortUrl)
  }
  renderFooter () {
    return ''
  }
  renderSidebar () {
    return ''
  }
  updateOtherParts () {
    let configMeta = this.currentPageMeta
    this.$footer.innerHTML = this.renderFooter()
    this.$sidebar.innerHTML = this.renderSidebar()
    const isIndex = this.currentPageMeta.view.isIndex;
    (!isIndex) && this.header.setCustomHeader(configMeta.header.homeUrl, configMeta.header.nmsorttitleUrl)
    this.footer.setCustomFooter(configMeta.header.footermenuUrl, configMeta.header.nmsorttitleUrl, configMeta.header.allnmsortUrl)
    this.sidebar.setCustomSidebar(configMeta.header.sidebarmenuUrl, configMeta.header.lanUrl, configMeta.header.nmsorttitleUrl, configMeta.header.allnmsortUrl)
  }
  handleShellCustomButton (buttonName) {

  }
  bindRootEvents () {
    super.bindRootEvents()
  }

  beforeSwitchPage (options) {
    document.querySelector('#sidebar').removeAttribute('open')
    document.querySelector('#sidebar').style.display = 'none'
    document.querySelector('#sidebar').setAttribute('aria-hidden', 'true')
    document.querySelector('#MIP-SIDEBAR-MASK').style.display = 'none'
  }
  afterSwitchPage (options) {
    document.querySelector('#sidebar').removeAttribute('open')
    document.querySelector('#sidebar').style.display = 'none'
    document.querySelector('#sidebar').setAttribute('aria-hidden', 'true')
    document.querySelector('#MIP-SIDEBAR-MASK').style.display = 'none'
  }
}
