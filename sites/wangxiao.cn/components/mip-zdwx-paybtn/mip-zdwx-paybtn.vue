<template>
  <mip-fixed
    type="bottom"
    class="pay-btn"
    on="tap:payDialog.toggle">
    确定支付
  </mip-fixed>
</template>

<style scoped>
.pay-btn {
  height: 5rem;
  line-height: 5rem;
  font-size: 1.6rem;
  color: #fff;
  text-align: center;
  background: linear-gradient(to right, #FF8F53, #FF5E59);
}
</style>

<script>
export default {
  mounted () {
    MIP.viewer.fixedElement.init()
  },
  prerenderAllowed () {
    return true
  }
}
</script>
