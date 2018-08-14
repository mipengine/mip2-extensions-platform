<template>
  <div class="swiper-position">
    <div>
      <!-- <div v-if="showPlay == 1" class="video" :class="current=='video-current' ? 'video-current' : ''" @click="videoDotClick"><span>视频</span></div>
        <div class="current" :class="current=='image-current' ? 'video-current' : ''" @click="imageDotClick"><span>{{currIndex}}/{{showPlay == 1 ? total - 1 : total}}</span></div> -->
      <div
        v-if="showPlay == 1 && status == 1"
        :class="current=='video-current' ? 'video-current' : ''"
        class="video"
        on="click:carousel.go(1)"><span>视频</span></div>
      <div
        v-if="showPlay == 1 && status == 1"
        :class="current=='image-current' ? 'video-current' : ''"
        class="current"
        on="click:carousel.go(2)"><span>{{ currIndex }}/{{ total - 1 }}</span></div>
      <div
        v-if="showPlay == 0 && status == 1"
        :class="current=='image-current' ? 'video-current' : ''"
        class="current"><span>{{ currIndex }}/{{ total }}</span></div>
    </div>
    <div class="code"><span>{{ cityData }}编号:{{ carid }}</span></div>
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
  border-radius: 0.25rem;
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
  border-radius: 0.25rem;
  background: rgba(0, 0, 0, 0.3957);
  text-align: center;
  font-size: 0.24rem;
  color: #fff;
}
.swiper-position .current:before{
    content: "";
    width: .24rem;
    height: .22rem;
    background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MkQ5OTczQzMzQzUxMTFFNkEyNDNFRjhGOUEwNjBBOTgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MkQ5OTczQzQzQzUxMTFFNkEyNDNFRjhGOUEwNjBBOTgiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDoyRDk5NzNDMTNDNTExMUU2QTI0M0VGOEY5QTA2MEE5OCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoyRDk5NzNDMjNDNTExMUU2QTI0M0VGOEY5QTA2MEE5OCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PgOo2g0AAAEsSURBVHjaYvz//z8DLQALELsAcTAQM1HJzH9AvJYR6OJ3QMZTIH5BJYMlgFia4T8ERIGChEoYZNZ/JioEpTKURgGUGCwFxFeB+A4QX4PyqWJwMhCrQdmqQJxKLYPfovFfo4cRuWAOEJsAsRsQ74LyCRosC8QWQLweiP/gUPMLiJNw2YotKMSA+BgQr4JiZnK8g83gRiCWgbIDgXgyEDNiUQcS0wdidyCWx5BFyyAiQPztPyaYDcRsSJnACoiPI8n/BeIM5AyCbnDWf9zgOhA3A/FSqEHo4BMQs8MMRo+8ADzBpgHENXjkeaERjhHGnEBsR2EW58GW3ASBeAKFBt8EYjNkg0FJjAOIZ1Gh2BQDJ5n/NKpCmBhoBEAG/6WBuX+ZoOFKTcNBZs0ECDAA7qsOLOO7hjwAAAAASUVORK5CYII=') no-repeat;
    background-size: contain;
    display: inline-block;
    margin-bottom: -.02rem;
    margin-right: .1rem;
}
.swiper-position .code {
  display: inline-block;
  width: 2.63rem;
  height: 0.5rem;
  line-height: 0.5rem;
  border-radius: 0.25rem;
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
    total: {
      type: Number,
      default: 0
    },
    carid: {
      type: String,
      default: ''
    },
    showPlay: {
      type: Number,
      default: 1
    },
    status: {
      type: Number,
      default: -1
    }
  },
  data () {
    return {
      currIndex: 1,
      current: 'video-current'
    }
  },
  mounted () {
    let vm = this
    this.$on('change', function (event) {
      vm.change(event)
    })
  },
  methods: {
    change (event) {
      // 需要增加一张图片来显示视频
      if (this.showPlay === 1) {
        let current = event.currIndex - 1 === 0 ? 1 : event.currIndex - 1
        this.currIndex = current

        if (event.currIndex === 1) {
          this.current = 'video-current'
        } else {
          this.current = 'image-current'
        }
      } else {
        this.currIndex = event.currIndex
      }
      this.$emit('changeNum', this.currIndex)
    },
    videoDotClick: function () {
      if (this.current === 'video-current') return
      this.current = 'video-current'
      this.currIndex = 1
      this.$emit('changeNum', this.currIndex - 1)
    },
    imageDotClick: function (e) {
      if (this.current === 'image-current') return
      this.current = 'image-current'
      this.currIndex = 1
      this.$emit('changeNum', this.currIndex + 1)
    }
  }
}
</script>
