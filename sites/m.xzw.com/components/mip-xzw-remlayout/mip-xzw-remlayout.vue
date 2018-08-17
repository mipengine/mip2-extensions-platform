<script>
export default {
  data: function () {
    return {
      timer: false,
      screenWidth: MIP.viewport.getWidth()
    }
  },
  watch: {
    screenWidth: function () {
      let that = this
      if (!that.timer) {
        that.timer = true
        setTimeout(function () {
          that.remChange(that.screenWidth)
          that.timer = false
        }, 200)
      }
    }
  },
  mounted () {
    const that = this
    const isAndroid = MIP.util.platform.isAndroid()
    const version = isAndroid === true ? MIP.util.platform.getOsVersion() : 0
    if (version && MIP.sandbox.String(version).substr(0, 1) < 5) {
      that.remChange(that.screenWidth)
      MIP.viewport.on('resize', function () {
        that.screenWidth = MIP.viewport.getWidth()
      })
    }
  },
  methods: {
    remChange: function (vw) {
      const width = vw
      let $width = width
      if (width > 640) {
        $width = 640
      } else if (width < 320) {
        $width = 320
      }
      const $fontSize = $width * 100 / 1080
      const html = document.querySelectorAll('html')
      html[0].style.fontSize = $fontSize + `px`
      const $height = MIP.viewport.getHeight()
      const _h = $height - 44
      const fullpage = document.querySelectorAll('.fullpage')
      if (fullpage.length > 0) {
        fullpage[0].style.minHeight = _h + `px`
      }
      const fixedpage = document.querySelectorAll('.fixedpage')
      if (fixedpage.length > 0) {
        fixedpage[0].style.height = _h + `px`
        if (fixedpage.length > 1) {
          fixedpage[1].style.height = _h + `px`
        }
      }
      const toolbox = document.querySelectorAll('.toolbox')
      if (toolbox.length > 0) {
        toolbox[0].style.height = (_h - 3.4 * $fontSize) + `px`
      }
      const gridtwelve = document.querySelectorAll('.gridtwelve')
      if (gridtwelve.length > 0) {
        gridtwelve[0].style.minHeight = (_h - $fontSize) + `px`
      }
    }
  }
}
</script>
