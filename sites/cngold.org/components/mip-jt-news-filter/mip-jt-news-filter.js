export default class MIPJtNewsFilter extends MIP.CustomElement {
  build () {
    let type = this.element.getAttribute('type')

    // 显示筛选弹窗
    this.element.querySelector('#show-chose').onclick = () => {
      this.element.querySelector('#chose-box').style.display = 'block'
    }
    // 隐藏筛选弹窗
    this.element.querySelector('#chose-box').onclick = () => {
      this.element.querySelector('#chose-box').style.display = 'none'
    }
    // 阻止冒泡
    let choseCon = this.element.querySelector('#chosecon-box')
    choseCon.onclick = (e) => {
      e.stopPropagation()
    }
    // 每种条件选择显示7个，选择时切换类名
    let dls = choseCon.querySelectorAll('dl')
    for (let i = 0; i < dls.length; i++) {
      let eles = dls[i].querySelectorAll('dd')
      this.showLimit(eles)
      this.changeClass(eles)
    }
    // 展开与收起选择条件
    let showAlls = choseCon.querySelectorAll('.show-all')
    for (let i = 0; i < showAlls.length; i++) {
      showAlls[i].onclick = () => {
        let par = showAlls[i].parentNode.parentNode
        let dds = par.querySelectorAll('dd')
        if (dds[dds.length - 1].style.display === 'none') {
          this.showAll(dds)
        } else {
          this.showLimit(dds)
        }
      }
    }
    // 点击确认
    this.element.querySelector('#sure').onclick = () => {
      let params = this.element.querySelectorAll('dl dd.on')
      let temp = ''
      for (let i = 0; i < params.length; i++) {
        temp += '_' + params[i].getAttribute('data-value')
      }
      let url = `https://m.cngold.org/news/m_${type}${temp}.html`
      MIP.viewer.open(url, { isMipLink: false, replace: false })
    }
    // 点击重置
    if (this.element.querySelector('#reset')) {
      this.element.querySelector('#reset').onclick = () => {
        for (let i = 0; i < dls.length; i++) {
          let eles = dls[i].querySelectorAll('dd')
          this.resetClass(eles)
        }
      }
    }
  }
  // 控制子元素显示个数--超出7个隐藏
  showLimit (eles) {
    for (let i = 0; i < eles.length; i++) {
      if (i > 6) {
        eles[i].style.display = 'none'
      }
    }
  }
  // 显示所有子元素
  showAll (eles) {
    for (let i = 0; i < eles.length; i++) {
      eles[i].style.display = 'block'
    }
  }
  // 移除所有子元素的选中类名
  removeClass (eles) {
    for (let i = 0; i < eles.length; i++) {
      eles[i].classList.remove('on')
    }
  }
  // 控制选中状态
  changeClass (eles) {
    for (let i = 0; i < eles.length; i++) {
      eles[i].addEventListener('click', () => {
        this.removeClass(eles)
        eles[i].classList.add('on')
      })
    }
  }
  // 重置时类名修改
  resetClass (eles) {
    this.removeClass(eles)
    eles[0].classList.add('on')
  }
}
