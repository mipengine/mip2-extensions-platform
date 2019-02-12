<template>
  <div @click="downloadApp">
    <mip-img :src="url" />
  </div>
</template>
<script>
let platform = MIP.util.platform
export default {
  data: () => {
    return {
      url: ''
    }
  },
  created () {
    let url = this.$element.getAttribute('src')
    this.url = url
  },
  methods: {
    downloadApp () {
      let element = this.$element
      let downloadUrl
      if (platform.isIos()) {
        downloadUrl = element.getAttribute('data-ios') ? element.getAttribute('data-ios') : ''
      }
      if (platform.isAndroid()) {
        downloadUrl = element.getAttribute('data-android') ? element.getAttribute('data-android') : ''
      }
      window.location.href = downloadUrl
    }
  }
}
</script>
