<template>
  <div class="title">
    <span class="title-con">{{ title }}</span>
  </div>
</template>

<style scoped>
.title {
  height: 1.1rem;
  line-height: 1.1rem;
  border-left: 0.04rem solid #f85d00;
  border-bottom: 0.01rem solid #f1f1f1;
  font-size: 0.34rem;
  font-weight: bold;
  color: #333;
}
.title .title-con {
  margin-left: 0.4rem;
}
</style>
<script>
import base from '../../common/utils/base'
export default {
  props: {
    title: {
      type: String,
      required: true
    }
  },
  created () {
    base.setMediaBase()
  }
}
</script>
