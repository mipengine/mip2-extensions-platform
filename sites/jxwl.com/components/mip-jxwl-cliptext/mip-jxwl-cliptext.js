import './mip-jxwl-cliptext.less'

const { util } = MIP

export default class MIPJxwlClipText extends MIP.CustomElement {
  build () {
    let el = this.element
    let copybox = el.querySelector('.copy')
    let copybtn = copybox.querySelector('em')
    let copytext = copybox.querySelector('p')
    copybox.addEventListener('mouseover', e => {
      util.css(copybtn, 'display', 'inline')
      copybtn.innerHTML = '复制'
    })
    document.body.addEventListener('mouseout', e => {
      util.css(copybtn, 'display', 'none')
    })
    copybtn.addEventListener('click', e => {
      let oInput = document.createElement('input')
      oInput.value = copytext.innerHTML
      document.body.appendChild(oInput)
      oInput.select()
      oInput.setSelectionRange(0,oInput.value.length)  
      let success = document.execCommand('copy')
      document.body.removeChild(oInput)
      if (success) {
        copybtn.innerHTML = '复制成功'
      }
    })
  }
}
