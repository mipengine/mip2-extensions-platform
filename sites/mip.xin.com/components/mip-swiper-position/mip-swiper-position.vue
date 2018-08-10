<template>
    <div class="swiper-position">
        <div>
        <!-- <div v-if="showPlay == 1" class="video" :class="current=='video-current' ? 'video-current' : ''" @click="videoDotClick"><span>视频</span></div>
        <div class="current" :class="current=='image-current' ? 'video-current' : ''" @click="imageDotClick"><span>{{currIndex}}/{{showPlay == 1 ? total - 1 : total}}</span></div> -->
        <div v-if="showPlay == 1 && status == 1" class="video" :class="current=='video-current' ? 'video-current' : ''" on="click:carousel.go(1)"><span>视频</span></div>
        <div  v-if="showPlay == 1 && status == 1" class="current" :class="current=='image-current' ? 'video-current' : ''" on="click:carousel.go(2)"><span>{{currIndex}}/{{ total - 1 }}</span></div>
        <div  v-if="showPlay == 0 && status == 1" class="current" :class="current=='image-current' ? 'video-current' : ''"><span>{{currIndex}}/{{total}}</span></div>
        </div>
        <div class="code"><span>{{this.cityData}}编号:{{carid}}</span></div>
    </div>
</template>
<style scoped>
.swiper-position {
  display: flex;
  justify-content: space-between;
  position: absolute;
  bottom: 0.27rem;
  left: 0;
  margin: 0 0.3rem;
  width: 6.9rem;
}

.swiper-position .video {
  display: inline-block;
  width: 1rem;
  height: 0.5rem;
  line-height: 0.5rem;
  border-radius: 25px;
  background: rgba(0, 0, 0, 0.3957);
  text-align: center;
  color: #fff;
  font-size: 0.24rem;
}

.swiper-position .current {
  display: inline-block;
  width: 1.28rem;
  height: 0.5rem;
  line-height: 0.5rem;
  border-radius: 25px;
  background: rgba(0, 0, 0, 0.3957);
  text-align: center;
  font-size: 0.24rem;
  color: #fff;
}

.swiper-position .code {
  display: inline-block;
  width: 2.63rem;
  height: 0.5rem;
  line-height: 0.5rem;
  border-radius: 25px;
  background: rgba(0, 0, 0, 0.3957);
  text-align: center;
  color: #fff;
  font-size: 0.24rem;
}

.swiper-position .video-current {
  background: linear-gradient(to right, #f65e02, #fc981b);
}
</style>

<script>
export default {
  props: {
    total: 0,
    carid: "",
    showPlay: 1,
    status: -1
  },
  data() {
    return {
      currIndex: 1,
      current: "video-current"
    };
  },
  mounted() {
    let vm = this;
    this.$on("change", function(event) {
      vm.change(event);
    });
  },
  methods: {
    change(event) {
      // 需要增加一张图片来显示视频

      if (this.showPlay == 1) {
        let current = event.currIndex - 1 == 0 ? 1 : event.currIndex - 1;
        this.currIndex = current;

        if (event.currIndex == 1) {
          this.current = "video-current";
        } else {
          this.current = "image-current";
        }
      } else {
        this.currIndex = event.currIndex;
      }
      this.$emit("changeNum", this.currIndex);
    },
    videoDotClick: function() {
      if (this.current == "video-current") return;
      this.current = "video-current";
      this.currIndex = 1;
      this.$emit("changeNum", this.currIndex - 1);
    },
    imageDotClick: function(e) {
      if (this.current == "image-current") return;
      this.current = "image-current";
      this.currIndex = 1;
      this.$emit("changeNum", this.currIndex + 1);
    }
  }
};
</script>