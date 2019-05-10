import './mip-gzpd-pubuliu.less'

export default class MIPGzpdPubuliu extends MIP.CustomElement {
  build () {
    this.name = this.element.getAttribute('name')
    if (this.name === 'dldoc') {
      this.down()
    } else if (this.name === 'pubuliu') {
      this.wrapper = document.createElement('ul')
      this.wrapper.classList.add('index-list')
      this.element.appendChild(this.wrapper)
      this.page = 1
      this.flag = false
      this.getList()
      this.str = ''
      MIP.viewport.on('scroll', () => {
        if (MIP.viewport.getHeight() + MIP.viewport.getScrollTop() > MIP.viewport.getScrollHeight() - 300 && !this.flag) {
          this.page++
          this.getList()
        }
      })
    }
  }
  down () {
    let pathname = location.pathname
    let lala = '//' + location.host
    let star = 0
    for (let i = 0; i < pathname.length; i++) {
      star = parseInt(star) + parseInt(pathname.charCodeAt(i))
    }
    let str = ''
    if (star % 5 < 3) {
      for (let i = 0; i < 4; i++) {
        str += '<mip-img src="https://static.yjbys.com/img/wenku/icon/icon_star.png" alt=""></mip-img>\n'
      }
      str += '<mip-img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABbUlEQVQ4T5XSvUscURQF8HNGFtbexdJSkAVFWLDI6tyHNjaCKDY2aQSxsEthYRfERlKkSJp0ghgCou3uvBciq2CK1UJQ8G+wXQU9YWQVP2Z242umuGd+3HvfIzoc7/0kgJaZHebF2AU4A3BjZpV3A0mSzJL8lf4oacY5t5+FZHYgKfLen5McbAMXZjZE8v41kgmEED5K+vEqvGhm22+AWq3WT3KY5AiAkfQraZBk9Dws6Y7kJYBTAE1JzWKxeELv/RcAq52WmVeTtMX2vAckp9+J7MVxPPuwg0aj0dtqtQ5Jjv4nclwqlSbK5fLt0xK9932S/pIc6IRIuioUCpVqtXqd5l7cQghhXtJuF2DOOffwPt4A3vsVAF+7jLFsZt8ygSRJNkl+6tLBhnNuLa+DHQALj0VJv0n2APjwDN02s8U84AjAGID0RtbjOPZpsF6vuyiKPrdrf8xsPA/4CeC7mdWyxgghTElaMrP5x/o/7luTOvqPkx0AAAAASUVORK5CYII="></mip-img>'
    } else {
      for (let i = 0; i < 5; i++) {
        str += '<mip-img src="https://static.yjbys.com/img/wenku/icon/icon_star.png" alt="" ></mip-img>\n'
      }
    }
    if (location.host.indexOf('yjbys') !== -1) {
      lala = '//m.yjbys.com'
    } else {
      lala = lala.replace('mip.', 'm.')
    }
    let d = `<a href='${lala}/dldoc/index${pathname}' target='_blank' class='download-card'>
               <div class='download-card-msg'>
                 <div class='download-card-title'>《${document.title}.doc》</div>
                 <div class='download-card-tip'>将本文的Word文档下载，方便收藏和打印</div>
                 <div class='download-card-tj'><span>推荐度：</span>${str}</div>
               </div>
               <div class='download-card-btn'>
                 <mip-img src='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTU2MjU5MTk0MTg2IiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjY0MDciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMzIiIGhlaWdodD0iMzIiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTQzMiAwaDE2MGMyNi42IDAgNDggMjEuNCA0OCA0OHYzMzZoMTc1LjRjMzUuNiAwIDUzLjQgNDMgMjguMiA2OC4yTDUzOS40IDc1Ni42Yy0xNSAxNS0zOS42IDE1LTU0LjYgMEwxODAuMiA0NTIuMmMtMjUuMi0yNS4yLTcuNC02OC4yIDI4LjItNjguMkgzODRWNDhjMC0yNi42IDIxLjQtNDggNDgtNDh6IG01OTIgNzUydjIyNGMwIDI2LjYtMjEuNCA0OC00OCA0OEg0OGMtMjYuNiAwLTQ4LTIxLjQtNDgtNDhWNzUyYzAtMjYuNiAyMS40LTQ4IDQ4LTQ4aDI5My40bDk4IDk4YzQwLjIgNDAuMiAxMDUgNDAuMiAxNDUuMiAwbDk4LTk4SDk3NmMyNi42IDAgNDggMjEuNCA0OCA0OHogbS0yNDggMTc2YzAtMjItMTgtNDAtNDAtNDBzLTQwIDE4LTQwIDQwIDE4IDQwIDQwIDQwIDQwLTE4IDQwLTQweiBtMTI4IDBjMC0yMi0xOC00MC00MC00MHMtNDAgMTgtNDAgNDAgMTggNDAgNDAgNDAgNDAtMTggNDAtNDB6IiBmaWxsPSIjZmZmZmZmIiBwLWlkPSI2NDA4Ij48L3BhdGg+PC9zdmc+' alt='' ></mip-img>
                 <div class='downlod-btn-right'>下载文档</div>
               </div>
             </a>`
    let flag = true
    let bmd = ['/jianlixiazai/', '/company/', '/zhaopin/', '/mingqi/', '/gaoxiao/', '/sydwzp/', '/xuanjianghui/', '/zhaopinhui/']
    for (let i = 0; i < bmd.length; i++) {
      if (location.href.indexOf(bmd[i]) !== -1) {
        flag = false
        break
      }
    }
    if (flag) {
      this.element.innerHTML = d
    }
  }
  getList () {
    this.flag = true
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
        window.fetchJsonp(`${url}?page=${this.page}&keyword=${document.title}`)
          .then(data => {
            // 处理响应数据
            return data.json()
          })
          .then(res => {
            if (res.code === 200) {
              for (let i = 0; i < res.list.length; i++) {
                let row = res.list[i]
                this.str += `<div class='pic1 lipic${row.id}'>`
                if (row.img.length > 0) {
                  if (row.img.length >= 3) {
                    this.str += `<div class="pic-img-3"><a target="_blank" href="${row.url}"><div class="pic-inner-img3"><mip-img src="${row.img[0]}${resize3}"></mip-img></div><div class="pic-inner-img3"><mip-img src="${row.img[1]}${resize3}"></mip-img></div><div class="pic-inner-img3"><mip-img src="${row.img[2]}${resize3}"></mip-img></div></a></div><div class="pic-art pic-art3"><a target="_blank" href="${row.url}"><h2>${row.title}</h2></a></div>`
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
            this.flag = false
          }).catch(function (ex) {
            this.flag = false
          })
      })
  }
}
