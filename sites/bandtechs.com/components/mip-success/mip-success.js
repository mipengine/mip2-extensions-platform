import './index.less'

export default class MIPSuccess extends MIP.CustomElement {
  build () {
    let wrapper = document.createElement('div')
    wrapper.classList.add('wrapper')
    let dataList = sessionStorage.getItem('dataList')
    dataList = JSON.parse(dataList)
    let arr = []
    for (let i = 0; i < dataList.newsList.length; i++) {
      if (dataList.newsList[i].group === 4) {
        arr.push(dataList.newsList[i])
      }
    }
    for (let i = 0; i < 4; i++) {
      wrapper.innerHTML += `    
      <div class="exam-img-box">
       <a href="companyDetail.html?index=` + i + `">
            <mip-img src="` + arr[i].imageUrl + `" width="auto" height="108" layout="fixed-height"></mip-img>
            <span>` + arr[i].title + `</span>
        </a>
      </div>     
    `
    }
    this.element.appendChild(wrapper)
  }
}
