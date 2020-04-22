import './index.less'
export default class MIPNews extends MIP.CustomElement {
  build () {
    let wrapper = document.createElement('div')
    let dataList = sessionStorage.getItem('dataList')
    dataList = JSON.parse(dataList)
    let url = this.element.getAttribute('url')
    let arr = []
    dataList.newsList.forEach((item) => {
      if (item.group !== 4) {
        arr.push(item)
      }
    })
    for (let i = 0; i < arr.length; i++) {
      wrapper.innerHTML += `   
      <div class="news-box">
         <div class="img">
         <mip-img class="img" src="` + arr[i].imageUrl + `" width="690" height="280" layout="responsive"></mip-img>
       </div>
       <div class="article-title"><a href="newsDetail.html?index=` + i + `" mip-link>` + arr[i].title + `</a></div>
         <div class="time">
          <span>发布时间：<span>` + arr[i].createTime + `</span></span>
            <div class="watch">
              <mip-img src="` + url + `/bandeng/查看@2x.png" class="left-2" width="17" height="16"></mip-img>
              <span>9888</span>
              <mip-img src="` + url + `/bandeng/点赞数@2x.png" class="left-1" width="17" height="16"></mip-img>
              <span>88676</span>
            </div>
         </div>
      </div>      
    `
    }
    this.element.appendChild(wrapper)
  }
}
