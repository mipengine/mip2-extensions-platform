<template>
  <div>
    <slot/>
  </div>
</template>

<script>

export default {
  mounted () {
    // 套餐
    const workElements = this.$element.querySelectorAll('.workStyle')
    for (let i = 0; i < workElements.length; i++) {
      workElements[i].onclick = (e) => {
        const className = workElements[i].className
        let id = ''
        if (workElements[i].querySelector('.dtImg')) {
          id = parseInt(workElements[i].querySelector('.dtImg').className.substring(6))
        }
        if (className.indexOf(' work') > -1) {
          MIP.viewer.open('//m.hunliji.com/package/detail_' + id)
        } else if (className.indexOf('case') > -1) {
          MIP.viewer.open('//m.hunliji.com/example/detail_' + id)
        } else if (className.indexOf('merchant') > -1) {
          MIP.viewer.open('//m.hunliji.com/merchant/detail_' + id)
        } else if (className.indexOf('hotel') > -1) {
          id = workElements[i].querySelector('.hotelTit mip-img').className
          MIP.viewer.open('//m.hunliji.com/merchant/detail_' + parseInt(id))
        } else if (className.indexOf('weddingBig') > -1) {
          MIP.viewer.open('//www.hunliji.com/hunpin/detail_' + id)
        }
      }
    }
  }
}
</script>
