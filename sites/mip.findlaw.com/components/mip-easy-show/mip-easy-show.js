import './index.less'

export default class MIPEasyShow extends MIP.CustomElement {
  build () {
    fetch('https://mip.findlaw.cn/?c=Ajax&a=areaVipLawyerHeight&requestmode=async').then(res => {
      console.log(res)
    })
    let btn = document.getElementById('more_answer')
    let item = document.querySelectorAll('#consult_list .item')
    btn.addEventListener('click', () => {
      console.log(this.element)
      this.element.style.display = 'none'
      for (let i = 0; i < item.length; i++) {
        removeClass(item[i], 'hide')
      }
    })
    function removeClass (elem, str) {
      let cName = elem.className
      let arrClassName = cName.split(' ')
      let newArr = []
      for (let i = 0; i < arrClassName.length; i++) {
        if (arrClassName[i] !== str) {
          newArr.push(arrClassName[i])
        }
      }
      let str1 = newArr.join('')
      elem.className = str1
    }
  }
}
