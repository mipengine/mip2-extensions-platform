export default class MIPXz6Down extends MIP.CustomElement {
  build () {
    let tzz = this.element.querySelector('.tzz')
    let bookCata = this.element.querySelector('#bookCata')
    let readAdd = this.element.querySelector('.freeBook').getAttribute('data-read')
    let btns = this.element.querySelector('.btns')
    let goRead = btns.querySelector('.goRead')
    let moerChapter = this.element.querySelector('#moer-chapter')
    if (tzz.querySelectorAll('li').length === 0) {
      this.element.querySelector('#mip-toggle').removeChild(tzz)
    }
    if (bookCata.querySelectorAll('#chapter-list li').length === 0 && readAdd !== '') {
      goRead.setAttribute('href', readAdd)
    } else if (bookCata.querySelectorAll('#chapter-list li').length === 0 && readAdd === '') {
      btns.removeChild(goRead)
    } else if (bookCata.querySelectorAll('#chapter-list li').length === 1) {
      moerChapter.style.display = 'none'
    }    
  }
}
