<template>
  <div class="wrapper">
    <mip-video
      id="test"
      class="video"
      width="1000"
      height="750"
      layout="responsive"
      autoplay
      controls
      poster="//img.alicdn.com/tfs/TB1I3qqqrGYBuNjy0FoXXciBFXa-1125-807.jpg_970x970Q90s50.jpg_.webp">
      <source
        src="https://gss0.bdstatic.com/-b1Caiqa0d9Bmcmop9aC2jh9h2w8e4_h7sED0YQ_t9iCPK/mda-gjkt21pkrsd8ae5y/mda-gjkt21pkrsd8ae5y.mp4"
        type="video/ogg">
    </mip-video>
    <p on="click:test.seekTo(10)">跳转至第10秒播放</p>
    <p on="click:test.seekTo(15)">跳转至第15秒播放</p>
  </div>
</template>

<style scoped>
.wrapper {
  margin: 0 auto;
  text-align: center;
}
.video{
  margin-bottom: 50px;
}
</style>

<script>
export default {
  mounted () {
    console.log('This is my first custom component !')
  }
}
</script>
