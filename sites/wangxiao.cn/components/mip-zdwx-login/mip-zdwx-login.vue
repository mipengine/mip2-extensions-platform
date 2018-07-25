<template>
  <div/>
</template>
<script>
export default {
  props: {
    url: {
      type: String,
      default: function () {
        return ''
      }
    }
  },
  mounted () {
    let _this = this
    this.$element.customElement.addEventAction('error', event => {
      if (event.userInfo.userStatus === 1) {
        if (_this.url) {
          MIP.view.open(_this.url + '&token=' + event.sessionId)
        }
      }
    })
  }
}
</script>
