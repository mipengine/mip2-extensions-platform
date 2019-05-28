import './mip-gzpd-pbl.less'

export default class MipGzpdPbl extends MIP.CustomElement {
  build () {
    this.wrapper = document.createElement('ul')
    this.wrapper.classList.add('index-list')
    this.element.appendChild(this.wrapper)
    this.page = 1
    this.more = false
    this.getList()
    this.str = ''
    MIP.viewport.on('scroll', () => {
      if (MIP.viewport.getHeight() + MIP.viewport.getScrollTop() > MIP.viewport.getScrollHeight() - 300 && !this.more) {
        this.page++
        this.getList()
      }
    })
  }
  getList () {
    this.more = true
    let resize3 = '?x-oss-process=image/resize,m_fill,w_229,h_120'
    let resize = '?x-oss-process=image/resize,m_fill,w_120,h_84'
    let url = ''
    fetch('//app.unjs.com/app_phpv2/mip/json/mip_str.json')
      .then(res => {
        return res.json()
      })
      .then(data => {
        let hList = data.host
        let host = hList[Math.floor(Math.random() * hList.length)]
        url = `//www.${host}.com/relate/article`
      })
      .then(() => {
        window.fetchJsonp(`${url}?page=${this.page}&keyword=${document.title || '孩子'}`)
          .then(data => {
            // 处理响应数据
            return data.json()
          })
          .then(res => {
            if (res.code === 200) {
              for (let i = 0; i < res.list.length; i++) {
                let row = res.list[i]
                this.str += `<div class='pic-one lipic${row.id}'>`
                if (row.img.length > 0) {
                  if (row.img.length >= 3) {
                    this.str += `<div><a target="_blank" href="${row.url}"><div class="pic-inner-imgthree"><mip-img src="${row.img[0]}${resize3}"></mip-img></div><div class="pic-inner-imgthree"><mip-img src="${row.img[1]}${resize3}"></mip-img></div><div class="pic-inner-imgthree"><mip-img src="${row.img[2]}${resize3}"></mip-img></div></a></div><div class="pic-art pic-art-three"><a target="_blank" href="${row.url}"><h2>${row.title}</h2></a></div>`
                  } else {
                    this.str += `<div class="pic-img"><a target="_blank" href="${row.url}"><div class="pic-inner-img"><mip-img src="${row.img[0]}${resize}"></mip-img></div></a></div><div class="pic-art"><a target="_blank" href="${row.url}"><h2>${row.title}</h2></a><p>${row.description}</p><div class="time">${row.pubdate}</div></div>`
                  }
                } else {
                  this.str += `<div class="pic-art"><a target="_blank" href="${row.url}"><h2>${row.title}</h2></a></div>`
                }
                this.str += `</div>`
              }
              this.wrapper.innerHTML = this.str
            }
            this.more = false
          }).catch(function (ex) {
            this.more = false
          })
      })
  }
}
