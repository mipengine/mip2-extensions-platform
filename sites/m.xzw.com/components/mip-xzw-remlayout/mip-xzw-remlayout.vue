<script>
export default {
  mounted () {
    const width = MIP.viewport.getWidth()
    const $width = width > 640 ? 640 : width
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
      toolbox[0].style.height = (_h - 3.24 * $fontSize) + `px`
    }
    const gridtwelve = document.querySelectorAll('.gridtwelve')
    if (gridtwelve.length > 0) {
      gridtwelve[0].style.minHeight = (_h - $fontSize) + `px`
    }
  }
}
</script>
