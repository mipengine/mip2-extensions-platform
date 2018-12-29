/**
    @file 移动站点模板shell
 * @author 1450052652@qq.com
*/
import './mip-testnewmoudle-shell.less'
import Header from './feature/header'
import Footer from './feature/footer'
import Sidebar from './feature/sidebar'
export default class MIPTestnewmoudleShell extends window.MIP.builtinComponents.MIPShell {
  processShellConfig (shellConfig) {
    // 强制修改 HTML 中的按钮配置
    shellConfig.routes.forEach(route => {
      route.buttonGroup = [{
        name: 'setting',
        text: '设置'
      },
      {
        name: 'cancel',
        text: '取消'
      }
      ]
    })
  }
  renderOtherParts () {
    // 底部菜单
    this.$footerWrapper = document.createElement('mip-fixed')
    this.$footerWrapper.setAttribute('type', 'bottom')
    this.$footerWrapper.classList.add('mip-shell-footer-wrapper')

    this.$footer = document.createElement('div')
    this.$footer.classList.add('mip-shell-footer', 'mip-border', 'mip-border-top')
    this.$footer.innerHTML = this.renderFooter()

    this.$footerWrapper.appendChild(this.$footer)
    this.$sidebarWrapper = document.createElement('mip-sidebar') // 左侧菜单
    this.$sidebarWrapper.setAttribute('id', 'sidebar')
    this.$sidebarWrapper.setAttribute('display', 'nodisplay')
    this.$sidebarWrapper.classList.add('mip-shell-sidebar-wrapper')
    this.$sidebar = document.createElement('div')
    this.$sidebar.classList.add('mip-shell-sidebar', 'mip-border', 'mip-border-top')
    this.$sidebar.innerHTML = this.renderSidebar()
    this.$sidebarWrapper.appendChild(this.$sidebar)
    super.renderOtherParts()
    document.getElementsByTagName('mip-testnewmoudle-shell')[0].appendChild(this.$footerWrapper)
    document.getElementsByTagName('mip-testnewmoudle-shell')[0].appendChild(this.$sidebarWrapper)
    this._initAllObjects()
  }
  _initAllObjects () {
    let configMeta = this.currentPageMeta
    const isIndex = this.currentPageMeta.view.isIndex

    this.header = new Header(this.$el);
    (!isIndex) && this.header.setCustomHeader(configMeta.header.homeUrl, configMeta.header.nmsorttitleUrl)
    // 底部菜单
    this.footer = new Footer(this.$el)
    this.footer.setCustomFooter(configMeta.header.footermenuUrl, configMeta.header.nmlinkUrl)
    // 左侧菜单
    this.sidebar = new Sidebar(this.$el)
    this.sidebar.setCustomSidebar(configMeta.header.sidebarmenuUrl,
      configMeta.header.nmlinkUrl, configMeta.header.lanUrl)
  }
  renderFooter () {
    //   let pageMeta = this.currentPageMeta;
    return ''
  }
  // 左侧菜单
  renderSidebar () {
    // let pageMeta = this.currentPageMeta;
    return ''
  }
  updateOtherParts () {
    this.$footer.innerHTML = this.renderFooter()
    this.$sidebar.innerHTML = this.renderSidebar()
    let configMeta = this.currentPageMeta
    const isIndex = this.currentPageMeta.view.isIndex;
    (!isIndex) && this.header.setCustomHeader(configMeta.header.homeUrl, configMeta.header.nmsorttitleUrl)
    this.footer.setCustomFooter(configMeta.header.footermenuUrl, configMeta.header.nmlinkUrl)
    this.sidebar.setCustomSidebar(configMeta.header.sidebarmenuUrl, configMeta.header.nmlinkUrl,
      configMeta.header.lanUrl)
  }
  handleShellCustomButton (buttonName) {
    if (buttonName === 'setting') {
      this.$footerWrapper.style.display = 'block'
    }
  }
  bindRootEvents () {
    // 很重要！很重要！很重要！
    super.bindRootEvents()

    // this.$footer.addEventListener('click', () => {
    //   // 点击隐藏底部栏
    //   this.$footerWrapper.style.display = 'none'
    // })
  }
}
