/**
 * @file mip-stats-miaoshou-v2 组件
 * @author
 */
const { CustomElement } = MIP
const { fetch } = window

export default class MIPCollectMiaoshouV2 extends CustomElement {
  build () {
    let e = this.element
    let url = e.getAttribute('url')
    let tid = e.getAttribute('tid')
    let type = e.getAttribute('type')
    let fkname = e.getAttribute('doctor_fkname')
    let skname = e.getAttribute('doctor_skname')
    let title = e.getAttribute('title')
    url = url + '?id=' + tid + '&type=' + type + '&doctor_fkname=' + fkname + '&doctor_skname=' + skname + '&title=' + title
    fetch(url).then(function (res) {

    }).then(function (data) {

    })
  }
}
