<template>
  <mip-data>
    <script type="application/json">
      {{ jsonobj }}
    </script>
  </mip-data>
</template>

<style scoped>
</style>

<script>
import Req from '../../common/request'
let arr
let tmpcookie
let url
export default {
  data () {
    return {
      url: '',
      jsonstr: '',
      jsonobj: {}
    }
  },
  beforeMount: function () {
    const that = this
    function getTotelNumber () {
      let newArray = {}
      let hashstr = location.hash.replace('#', '')
      let jsonid = location.href
      let params = hashstr.split('&')
      let type = params[1].replace('type=', '')
      let reg = new RegExp('(^| )' + type + 'ck' + '=([^;]*)(;|$)')
      url = 'https://m.hulian.top/help/' + params[1].replace('type=', '') + '/m/' + params[0].replace('id=', '') + '.html'
      newArray.url = url
      arr = document.cookie.match(reg)
      if (arr) {
        tmpcookie = JSON.parse(arr[2])
        newArray.json = '{"@context": \'https://ziyuan.baidu.com/contexts/cambrian.jsonld\',"@id": \'' + jsonid + '\',"title": \'' + tmpcookie.title + '\',"description": \'' + tmpcookie.des + '\',"images": [\'' + tmpcookie.img + '\'],"pubDate": \'' + tmpcookie.time + '\'}'
        that.jsonobj = newArray
      } else {
        let aaaa = Req(url, '')
        aaaa.then(function (text) {
          let titleregex = /<title>([\s\S]*?)<\/title>/ig
          let rep = /<([\s\S]*)/
          let desregex = /<META\sname="description"\scontent="([\s\S]*?)"/ig
          let imgregex = /<img[^>]*src\s*=\s*['""]?([\w/\-:.]*)['""]?[^>]*>/ig
          let timeregex = /<h6>([\s\S]*?)<\/h6>/ig
          tmpcookie = {}
          tmpcookie.title = titleregex.exec(text)[1].replace(rep, '').replace(/(^\s*)|(\s*$)/g, '')
          tmpcookie.des = desregex.exec(text)[1].replace(rep, '').replace(/(^\s*)|(\s*$)/g, '')
          tmpcookie.img = imgregex.exec(text) ? imgregex.exec(text)[1].replace(/(^\s*)|(\s*$)/g, '') : ''
          tmpcookie.time = timeregex.exec(text)[1].replace(/\//g, '-').replace(' ', 'T').replace(/(^\s*)|(\s*$)/g, '')
          newArray.json = '{"@context": \'https://ziyuan.baidu.com/contexts/cambrian.jsonld\',"@id": \'' + jsonid + '\',"title": \'' + tmpcookie.title + '\',"description": \'' + tmpcookie.des + '\',"images": [\'' + tmpcookie.img + '\'],"pubDate": \'' + tmpcookie.time + '\'}'
          let date = new Date()
          date.setTime(date.getTime() + 1 * 1000)
          tmpcookie.expires = date.toGMTString()
          document.cookie = type + 'ck=' + JSON.stringify(tmpcookie)
          that.jsonobj = newArray
          window.history.go(0)
        })
      }
    }
    getTotelNumber()
  }
}
</script>
