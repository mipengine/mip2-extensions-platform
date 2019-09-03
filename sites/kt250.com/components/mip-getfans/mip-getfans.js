import './mip-getfans.less'

export default class MIPExample extends MIP.CustomElement {
  build () {
    this.down()
  }
  down () {
    let str = ''
    for (let i = 0; i < 5; i++) {
      str += '<mip-img src="https://static.yjbys.com/cpt/img/icon/icon_star.png" alt=""></mip-img>\n'
    }
    fetch('//static.yjbys.com/cpt/json/getfans.json')
      .then(res => {
        return res.json()
      })
      .then(res => {
        let tc = `<div class="fans-mask" id="mask" hidden>
                <div class="fans-box">
                  <div class="fans-title">${res.tcName}免费下载</div>
                  <div class="step">步骤如下</div>
                  <div class="step-one">1、搜索公众号：<span>${res.gzh}</span></div>
                  <div class="step-two">2、关注后获得下载链接</div>
                  <div class="close" on="tap:mask.hide"></div>
                </div>
              </div>`
        let d = `<div class="download-card" on="tap:mask.show">
               <div class='download-card-msg'>
                 <div class='download-card-title'> ${res.title} </div>
                 <div class='download-card-tip'>${res.desc}</div>
                 <div class='download-card-tj'><span>推荐度：</span>${str}</div>
               </div>
               <div class='download-card-btn'>
                 <mip-img src='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNTU2MjU5MTk0MTg2IiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjY0MDciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMzIiIGhlaWdodD0iMzIiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+PC9zdHlsZT48L2RlZnM+PHBhdGggZD0iTTQzMiAwaDE2MGMyNi42IDAgNDggMjEuNCA0OCA0OHYzMzZoMTc1LjRjMzUuNiAwIDUzLjQgNDMgMjguMiA2OC4yTDUzOS40IDc1Ni42Yy0xNSAxNS0zOS42IDE1LTU0LjYgMEwxODAuMiA0NTIuMmMtMjUuMi0yNS4yLTcuNC02OC4yIDI4LjItNjguMkgzODRWNDhjMC0yNi42IDIxLjQtNDggNDgtNDh6IG01OTIgNzUydjIyNGMwIDI2LjYtMjEuNCA0OC00OCA0OEg0OGMtMjYuNiAwLTQ4LTIxLjQtNDgtNDhWNzUyYzAtMjYuNiAyMS40LTQ4IDQ4LTQ4aDI5My40bDk4IDk4YzQwLjIgNDAuMiAxMDUgNDAuMiAxNDUuMiAwbDk4LTk4SDk3NmMyNi42IDAgNDggMjEuNCA0OCA0OHogbS0yNDggMTc2YzAtMjItMTgtNDAtNDAtNDBzLTQwIDE4LTQwIDQwIDE4IDQwIDQwIDQwIDQwLTE4IDQwLTQweiBtMTI4IDBjMC0yMi0xOC00MC00MC00MHMtNDAgMTgtNDAgNDAgMTggNDAgNDAgNDAgNDAtMTggNDAtNDB6IiBmaWxsPSIjZmZmZmZmIiBwLWlkPSI2NDA4Ij48L3BhdGg+PC9zdmc+' alt='' ></mip-img>
                 <div class='downlod-btn-right'>下载文档</div>
               </div>
             </div>${tc}`
        if (document.title.indexOf(`${res.keywords}`) > -1) {
          this.element.innerHTML = d
        }
      })
  }
}
