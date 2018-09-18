<template>
  <div class="floatConsult"><a
    data-type="mip"
    @click="callIM">咨询</a></div>
</template>

<script>
import xzh from 'xzh-sdk'
let context = null
export default {
  created () {
    this.init()
  },
  methods: {
    init () {
      if (!context) {
        let url = window.location.href
        context = Promise.resolve()
          .then(() => {
            return window.fetchJsonp(
              '//m.chinaacc.com/m_member/baidu/getXZJs.shtm?redirectUrl=' + url,
              {
                jsonpCallback: 'jsonpCallback'
              }
            )
          })
          .then(resp => {
            return resp.json()
          })
          .then(data => {
            return xzh.init({
              data: {
                appid: data.appid,
                nonce_str: data.nonce_str,
                signature: data.signature,
                timestamp: data.timestamp,
                url: data.url
              }
            })
          })
          .catch(err => {
            console.log(err)
          })
      }
      return context
    },
    async callIM () {
      const that = this
      try {
        let { result: context } = await that.init()
        // console.log(xzh);
        await xzh.invokeBcpIM({
          data: {
            onlyWiseIM: true
          },
          context
        })
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>
