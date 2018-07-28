<template>
  <div class="bar">共{{ evaluationCount }}条评论</div>
</template>

<style scoped>
    .bar {
        color: #666;
        text-align: center;
        border-bottom: 0.014rem solid #d9d9d9;
        background-color: #eee;
        line-height: 0.36rem;
    }
</style>

<script>
import config from '../../utils/config'
export default {
  data () {
    return {
      evaluationCount: 0
    }
  },
  mounted () {
    console.log('This is my 评价列表页 !')
    const self = this
    let productid = getRequest().productid
    window.fetchJsonp(config.data().apiurl + '/product/productevaluationnum/productid/' + productid, {
      jsonpCallback: 'callback'
    }).then(function (res) {
      return res.json()
    }).then(function (data) {
      self.evaluationCount = data.data.items
    })

    function getRequest () {
      let url = location.search // 获取url中"?"符后的字串
      let theRequest = {}
      let strs = ''
      if (url.indexOf('?') !== -1) {
        let str = url.substr(1)
        strs = str.split('&')
        for (let i = 0; i < strs.length; i++) {
          theRequest[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1])
        }
      }
      return theRequest
    }
  }
}
</script>
