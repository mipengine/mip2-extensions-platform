import './index.less'

const { fetchJsonp } = window

export default class MIPAsyLaw extends MIP.CustomElement {
  build () {
    let ele = this.element
    let url = ele.getAttribute('url')
    fetchJsonp(url).then(res => {
      console.log(res.json())
      res.json().then(data => {
        console.log(data)
        loadData(data.proData)
      })
    })

    function loadData (data) {
      let wrapper = document.createElement('div')
      wrapper.classList.add('swiper-wrapper')
      let html = ''
      for (let i in data) {
        console.log(data[i])
        let item = data[i]
        html += `<div class="swiper-slide">
        <div class="link">
          <span class="img-box"><a href="http://m.findlaw.cn/lawyer/${item.u_uid}"><mip-img src="${item.u_file110135}" alt=""></mip-img></a><a href="https://m.findlaw.cn/lawyer/${item.u_uid}/consult/" class="font">咨询我</a></span>
          <a href="http://m.findlaw.cn/lawyer/${item.u_uid}" class="tl">${item.u_username}·${item.u_honortype}</a>
        </div>
      </div>`
      }
      wrapper.innerHTML = html
      ele.appendChild(wrapper)
    }
  }
}
