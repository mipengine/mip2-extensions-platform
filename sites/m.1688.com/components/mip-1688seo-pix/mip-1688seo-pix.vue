<template>
  <div/>
</template>

<style scoped>
</style>
<script>
export default {
  props: {
    src: {
      type: String,
      required: true
    },
    canonical: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },
  mounted () {
    let getScript = (url) => {
      let scriptNode = window.document.createElement('script')
      let head =
        document.getElementsByTagName('head')[0] || document.documentElement
      scriptNode.src = url
      scriptNode.charset = 'GBK'
      scriptNode.async = true
      head.insertBefore(scriptNode, head.firstChild)
    }
    getScript('//g.alicdn.com/alilog/mlog/aplus_v2.js')
    // let element = this.$element
    // let img = new Image()
    // img.style.display = 'none'
    // let canonical = encodeURIComponent(this.canonical) || ''
    // let title = this.title || ''
    // let url =
    //   'https://log.mmstat.com/m.gif?spm-cnt=a262wv.11860230&aplus&canonical=' +
    //   canonical +
    //   '&title=' +
    //   title
    // img.src = url
    // element.appendChild(img)
  }
}
</script>
