export default class MIPXz6Rank extends MIP.CustomElement {
  build () {
    let rankList = this.element.querySelectorAll('.rank .cbox')
    for (let i = 0; i < rankList.length; i++) {
      if (rankList[i].querySelectorAll('li').length < 3) {
        rankList[i].querySelector('.getMore').style.display = 'none'
      } else {
        for (let n = 0; n < rankList[i].querySelectorAll('li').length; n++) {
          if (n > 2) {
            rankList[i].querySelectorAll('li')[n].classList.add('hide')
          }
        }
        rankList[i].querySelector('.getMore').onclick = function () {
          if (this.parentNode.querySelectorAll('li.hide').length === 0) {
            for (let y = 0; y < this.parentNode.querySelectorAll('li').length; y++) {
              this.parentNode.querySelectorAll('li')[y].classList.add('hide')
            }
            this.querySelector('span').innerHTML = '点击查看更多'
          }
          for (let m = 0; m < 3; m++) {
            if (this.parentNode.querySelectorAll('li.hide').length > 0) {
              this.parentNode.querySelectorAll('li.hide')[0].classList.remove('hide')
              if (this.parentNode.querySelectorAll('li.hide').length === 0) {
                this.querySelector('span').innerHTML = '收起全部'
              }
            }
          }
        }
      }
    }
  }
}
