<template>
  <div class="wrapper">
    <iframe
      v-if="iframeSrc"
      :src="iframeSrc"
      class="hidden"
    />
  </div>
</template>

<style scoped>
  .hidden{display:none;}
</style>

<script>
export default {
  props: {
    packagename: {
      type: String,
      default () {
        return ''
      }
    },
    appRouter: {
      type: Boolean,
      default () {
        return true
      }
    },
    page: {
      type: String,
      default () {
        return ''
      }
    },
    params: {
      type: String,
      default () {
        return ''
      }
    },
    protocal: {
      type: String,
      default () {
        return 'http'
      }
    }
  },
  data () {
    return {
      iframeSrc: ''
    }
  },

  created () {
    let packagename = this.packagename
    let protocal = this.protocal
    let page = this.page
    let params = this.convertToHash(this.params)
    let appRouter = !!this.appRouter
    let query

    if (appRouter) {
      let iframeSrc = ''

      if (this.isEmptyObject(params)) {
        let url = window.location.search
        let index = url.indexOf('?')
        if (index > -1) {
          query = url.substr(1)
        }
      } else {
        let items = Object.keys(params).map(function (key) {
          return key + '=' + encodeURIComponent(params[key])
        })
        query = items.join('&')
      }

      if (this.typeofHuawei()) {
        iframeSrc = 'hap://app/' + packagename
        if (page) {
          iframeSrc += '/' + page
        }

        if (query) {
          iframeSrc += '?' + query
        }
      } else {
        iframeSrc = protocal + '://thefatherofsalmon.com?i=' + packagename
        if (page) {
          iframeSrc += '&p=' + page
        }

        if (query) {
          iframeSrc += '&a=' + encodeURIComponent(query)
        }
      }

      this.iframeSrc = iframeSrc
    }
  },

  methods: {
    convertToHash (str) {
      let hash = {}
      let list = str.split('&')
      for (let i = 0, len = list.length; i < len; i++) {
        let item = list[i]
        let sideList = item.split('=')
        if (sideList[0].length > 0) {
          hash[sideList[0]] = item.substr(sideList[0].length + 1)
        }
      }
      return hash
    },
    typeofHuawei () {
      let userAgent = navigator.userAgent.toLowerCase()
      console.log(userAgent)
      if (userAgent) {
        let huaweibrowser = userAgent.indexOf('huaweibrowser')
        // let android = userAgent.indexOf('android')
        let huawei = userAgent.indexOf('build/huawei')
        if (huaweibrowser >= 0) return 1
        if (huawei >= 0) return 1
        // if (0 > huawei && (huawei = userAgent.indexOf("build/honor")), android >= 0 && huawei >= 0) {
        //     if (userAgent.slice(android + 8, android + 9) >= 8) return 0
        // }
      }
      return 0
    },
    isEmptyObject (obj) {
      if (!obj) {
        return !0
      }
      let t = void 0
      for (t in obj) {
        if (obj.hasOwnProperty(t)) {
          return !1
        }
      }
      return !0
    }
  }
}
</script>
