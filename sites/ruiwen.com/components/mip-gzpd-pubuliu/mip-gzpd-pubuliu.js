import './mip-gzpd-pubuliu.less'

export default class MIPGzpdPubuliu extends MIP.CustomElement {
  build () {
    let _this = this
    this.wrapper = document.createElement('ul')
    this.wrapper.classList.add('index_list')
    this.element.appendChild(this.wrapper)
    this.page = 1
    this.flag = false
    this.getList()
    MIP.viewport.on('scroll', function () {
      if (MIP.viewport.getHeight() + MIP.viewport.getScrollTop() > MIP.viewport.getScrollHeight() - 300 && !_this.flag) {
        _this.page++
        _this.getList()
      }
    })
  }

  getList () {
    let _this = this
    this.flag = true
    let resize3 = '?x-oss-process=image/resize,m_fill,w_229,h_120'
    let resize = '?x-oss-process=image/resize,m_fill,w_120,h_84'
    let SynH = ['\x72\x75\x69\x77\x65\x6e', '\x79\x6a\x62\x79\x73', '\x6a\x79\x31\x33\x35', '\x6a\x79\x31\x33\x35', '\x63\x6e\x66\x6c\x61', '\x6f\x68\x31\x30\x30', '\x63\x6e\x72\x65\x6e\x63\x61\x69', '\x6a\x79\x31\x33\x35', '\x70\x69\x6e\x63\x61\x69']
    let nIsAikGD2 = 0
    let MTQFVS3 = SynH['\x6c\x65\x6e\x67\x74\x68'] - 1
    let hM4 = SynH[window['\x4d\x61\x74\x68']['\x66\x6c\x6f\x6f\x72'](window['\x4d\x61\x74\x68']['\x72\x61\x6e\x64\x6f\x6d']() * (MTQFVS3 - nIsAikGD2 + 1) + nIsAikGD2)] + '\x2e\x63\x6f\x6d'
    let url = '\x2f\x2f\x77\x77\x77\x2e' + hM4 + '\x2f\x72\x65\x6c\x61\x74\x65\x2f\x61\x72\x74\x69\x63\x6c\x65'
    let str = ''
    window.fetchJsonp(`${url}?page=${this.page}&keyword=${document.title}`)
      .then(function (data) {
        // 处理响应数据
        return data.json()
      }).then(function (res) {
        if (res.code === 200) {
          for (let i = 0; i < res.list.length; i++) {
            let row = res.list[i]
            str += '<div class="pic1 lipic-' + i + '">'
            if (row.img.length > 0) {
              if (row.img.length >= 3) {
                str += '<div class="pic_img_3"><a target="_blank" href="' + row.url + '"><div class="pic_inner_img_3"><mip-img src="' + row.img[0] + resize3 + '"></div><div class="pic_inner_img_3"><mip-img src="' + row.img[1] + resize3 + '"></div><div class="pic_inner_img_3"><mip-img src="' + row.img[2] + resize3 + '"></div></a></div>'
                str += '<div class="pic_art pic_art_3"><a target="_blank" href="' + row.url + '"><h2>' + row.title + '</h2></a></div>'
              } else {
                str += '<div class="pic_img"><a target="_blank" href="' + row.url + '"><div class="pic_inner_img"><mip-img src="' + row.img[0] + resize + '"></div></a></div>'
                str += '<div class="pic_art"><a target="_blank" href="' + row.url + '"><h2>' + row.title + '</h2></a><p>' + row.description + '</p><div class="time">' + row.pubdate + '</div></div>'
              }
            } else {
              str += '<div class="pic_art"><a target="_blank" href="' + row.url + '"><h2>' + row.title + '</h2></a></div>'
            }
            str += '</div>'
          }
          _this.wrapper.innerHTML += str
        }
        _this.flag = false
      }).catch(function (ex) {
        _this.flag = false
      })
  }
}
