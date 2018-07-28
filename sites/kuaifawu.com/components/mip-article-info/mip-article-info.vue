<style scoped>
  *{padding:0;margin:0;box-sizing:border-box}li,ol{list-style:none}
  .wrapper {
    margin: 0 auto;
    text-align: center;
  }
  h2{padding:0 0.6rem;margin: 0 0 0.2rem 0;}
  .content{padding:0 0.1rem;text-align: left;font-size: 0.16rem;}
  p{margin-top: 16px;color: #333;line-height: 26px;}
</style>

<script>
import config from '../../utils/config'
export default {
  data () {
    return {
      data: []
    }
  },
  mounted () {
    console.log('This is 文章详情页的js !')

    let CustomStorage = MIP.util.customStorage
    let storage = new CustomStorage(0)
    let name = storage.get('mi')
    console.log(name)

    const self = this
    const id = getRequest().id
    console.log(getRequest().id)
    window.fetchJsonp(config.data().apiurl + '/article/info?id=' + id, {
      jsonpCallback: 'callback'
    }).then(function (res) {
      return res.json()
    }).then(function (data) {
      self.data = data
    })

    function getRequest () {
      let url = location.search // 获取url中"?"符后的字串
      let theRequest = Object.create(null)
      if (url.indexOf('?') !== -1) {
        let str = url.substr(1)
        let strs = str.split('&')
        for (let i = 0; i < strs.length; i++) {
          theRequest[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1])
        }
      }
      return theRequest
    }
  }

}
</script>

<template>
  <div class="wrapper">
    <template type="mip-mustache">
      <h2>{{ data.title }}</h2>
      <div
        class="content"
        v-html="data.content"/>
    </template>
  </div>
</template>
