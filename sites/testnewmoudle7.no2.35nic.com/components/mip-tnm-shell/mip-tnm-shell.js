/**
    @file 移动站点模板shell
 * @author 1450052652@qq.com
*/
import './mip-tnm-shell.less'
import Header from './feature/header'
import Footer from './feature/footer'
import Sidebar from './feature/sidebar'
import apiUrl from '../../common/js/config.api'
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
    this.$sidebarWrapper = document.createElement('mip-sidebar') // 左侧菜单
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
    const isIndex = this.currentPageMeta.view.isIndex
    this.header = new Header(this.$el);
    (!isIndex) && this.header.setCustomHeader(apiUrl.homeUrl, apiUrl.nmsorttitleUrl)
    this.footer = new Footer(this.$el)
    this.footer.setCustomFooter(apiUrl.footermenuUrl)
    this.sidebar = new Sidebar(this.$el)
    this.sidebar.setCustomSidebar(apiUrl.sidebarmenuUrl, apiUrl.lanUrl)
  }
  renderFooter () {
    return ''
  }
  renderSidebar () {
    return ''
  }
  updateOtherParts () {
    this.$footer.innerHTML = this.renderFooter()
    this.$sidebar.innerHTML = this.renderSidebar()
    const isIndex = this.currentPageMeta.view.isIndex;
    (!isIndex) && this.header.setCustomHeader(apiUrl.homeUrl, apiUrl.nmsorttitleUrl)
    this.footer.setCustomFooter(apiUrl.footermenuUrl)
    this.sidebar.setCustomSidebar(apiUrl.sidebarmenuUrl, apiUrl.lanUrl)
  }
  handleShellCustomButton (buttonName) {
  }
  bindRootEvents () {
    super.bindRootEvents()
  }
}
