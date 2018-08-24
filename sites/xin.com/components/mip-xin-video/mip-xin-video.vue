<template>
  <div class="wrapper">
    <!-- <mip-video id="test"  width="640" height="360" class="video" :poster="videoImg" autoplay controls  
      layout="responsive"   
      :src="videoUrl" v-if="videoUrl">
    </mip-video> -->
    <mip-video  id="test" width="640" height="360" layout="responsive" autoplay controls   :poster="videoImg" v-if="videoUrl">
    <source :src="videoUrl" type="video/mp4">
</mip-video>
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
import base from '../../common/utils/base.js';
import '../../common/css/base.css';
export default {
  props:['videoImg','videoUrl'],
  data(){
    return{
      isPlay:false
    }
  },
  created() {
    base.setMediaBase();
  },
  mounted () {
      this.$nextTick(() => {
        this.isPlay = true
      });
  },
  methods:{
    
  }
}
</script>
