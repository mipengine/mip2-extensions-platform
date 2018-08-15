<template>
  <div>
    <mip-fixed
      :class="{'show-back' : showMask}"
      type="top"
      style="height: 100%;">
      <mip-fixed
        type="top"
        class="mask-loading">
        加载中...
      </mip-fixed>
    </mip-fixed>
  </div>
</template>

<style scoped>
.wrapper {
  margin: 0 auto;
  text-align: center;
}
.mask-loading {
  width: 1.5rem;
  height: 1rem;
  background-color: rgba(2, 2, 2, 1);
  overflow: hidden;
  border-radius: 0.1rem;
  color: #f7f4f4;
  font-size: rem;
  z-index: 9992;
  text-align: center;
  top: 6rem;
  left: 3rem;
  line-height: 1rem;
}
.show-back {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>

<script>
export default {
  // props: ['showMask'],
  props: {
    showMask: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    console.log('This is my first custom component !')
  }
}
</script>
