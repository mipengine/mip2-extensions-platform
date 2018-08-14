<template>
  <div class="wrapper">
    <div v-if="videoUrl">
      <mip-video
        id="test"
        :poster="videoImg"
        width="640"
        height="360"
        layout="responsive"
        controls>
        <source
          :src="videoUrl"
          type="video/mp4">
      </mip-video>
    </div>
  </div>
</template>
<style scoped>
.wrapper {
  margin: 0 auto;
  text-align: center;
}
.video{
  width: 7.5rem;
  height: 4.2rem;
}
</style>

<script>
import base from '../../common/utils/base.js'
import '../../common/css/base.css'
export default {
  props: {
    videoImg: {
      type: String,
      default: ''
    },
    videoUrl: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      isPlay: false
    }
  },
  created () {
    base.setMediaBase()
  },
  mounted () {
    this.$nextTick(() => {
      this.isPlay = true
    })
  }
}
</script>
