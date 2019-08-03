import './mip-jxwl-cliptext.less'

const { util } = MIP

export default class MIPJxwlClipText extends MIP.CustomElement {
  build () {
    let el = this.element
    let copybox = el.querySelector('.copy')
    let copybtn = copybox.querySelector('em')
    let copytext = copybox.querySelector('p')
    //移动端实际并没有mouseover和mouseout组件，实际效果就是点击出现和消失
    //点击黑框显示复制按钮
    copybox.addEventListener('mouseover', e => {
      util.css(copybtn, 'display', 'inline')
      copybtn.innerHTML = '复制'
    })
    //点击黑框外隐藏复制按钮
    copybox.addEventListener('mouseout', e => {
      util.css(copybtn, 'display', 'none')
    })
    //复制按钮点击事件
    copybtn.addEventListener('click', e => {
      let oInput = document.createElement('input')
      oInput.value = copytext.innerHTML
      document.body.appendChild(oInput)
      oInput.select()
      oInput.setSelectionRange(0, oInput.value.length) //这句是兼容ios的重点
      let success = document.execCommand('copy')
      document.body.removeChild(oInput)
      if (success) {
        copybtn.innerHTML = '复制成功'
      }
    })
  }
}
