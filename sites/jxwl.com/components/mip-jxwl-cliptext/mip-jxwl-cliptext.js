import './mip-jxwl-cliptext.less'

const { util } = MIP

export default class MIPJxwlClipText extends MIP.CustomElement {
  build () {
    let el = this.element
    let copybox = el.querySelector('.copy')
    let copybtn = copybox.querySelector('em')
    let copytext = copybox.querySelector('p')
    copybox.addEventListener('mouseover', function () {
      util.css(copybtn, 'display', 'inline')
      copybtn.innerHTML = '复制'
    })
    copybox.addEventListener('mouseout', function () {
      util.css(copybtn, 'display', 'none')
    })
    copybtn.addEventListener('click', function () {
      let ranges = document.createRange()
      ranges.selectNode(copytext)
      window.getSelection().removeAllRanges()
      window.getSelection().addRange(ranges)
      let success = document.execCommand('copy')
        if (success){
          copybtn.innerHTML = '复制成功'
        }	
    })
  }
}