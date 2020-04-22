import './index.less'

export default class MIPCompany extends MIP.CustomElement {
  build () {
    let wrapper = document.createElement('div')
    let url = this.element.getAttribute('url')
    wrapper.classList.add('wrapper')
    let dataList = sessionStorage.getItem('dataList')
    dataList = JSON.parse(dataList)
    let arr = []
    dataList.newsList.forEach((item) => {
      if (item.group === 4) {
        arr.push(item)
      }
    })
    for (let i = 0; i < arr.length; i++) {
      wrapper.innerHTML += `
     <div class="ox">
        <mip-img src="` + arr[i].imageUrl + `" width="100" height="100"></mip-img>
        <div class="right-box">
         <span class="bar-title">` + arr[i].title + `</span>
         <span class="creat-time">发布时间` + arr[i].createTime + `</span>
        <div class="see-div">
         <a href="companyDetail.html?index=` + i + `" mip-link>【查看详情】</a>
         <div class="see-num">
          <mip-img src="` + url + `/bandeng/查看@2x.png" width="17" height="16"></mip-img>
          <span class="see">9654</span>
         </div>
        </div>
       </div>
     </div>    
    `
    }

    this.element.appendChild(wrapper)
  }
}
