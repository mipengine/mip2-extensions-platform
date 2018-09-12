<template>
  <div>
    <mip-fixed
      :class="['changeLayer layerBox', !show ? '' : 'show', type]"
      type="bottom">
      <input
        :value="boyId"
        type="hidden"
        name="boy">
      <input
        :value="girlId"
        type="hidden"
        name="girl">
      <h3 class="title"/>
      <div class="layerBody">
        <div
          id="sure"
          class="control clear">
          <a
            class="cancel close item fl"
            href="javascript:;"
            @click="hiderLayer"
          >取消</a>
          <a
            class="yes item fr"
            href="javascript:;"
            @click="sureResult">确定</a>
        </div>
        <div class="listItem gridbox flexsaw">
          <div class="sexType">男生</div>
          <div
            id="swiperboy"
            class="swiper-container swiperboy">
            <div class="swiper-wrapper">
              <div
                v-for="(dat, key) in data"
                :key="key"
                class="swiper-slide item">
                <a href="javascript:;">
                  <dt class="head">
                    <span :class="imgsrc(key)"/>
                  </dt>
                  <dd class="name">{{ dat }}</dd>
                </a>
              </div>
            </div>
          </div>
          <div class="electric1"/>
          <div
            id="swipergirl"
            class="swiper-container swipergirl">
            <div class="swiper-wrapper">
              <div
                v-for="(dat, key) in data"
                :key="key"
                class="swiper-slide item">
                <a href="javascript:;">
                  <dt class="head">
                    <span :class="imgsrc(key)"/>
                  </dt>
                  <dd class="name">{{ dat }}</dd>
                </a>
              </div>
            </div>
          </div>
          <div class="sexType">女生</div>
        </div>
      </div>
    </mip-fixed>
    <mip-fixed
      :class="['changeLayer layerbg', !show ? '' : 'show']"
      type="top"
      @click="hiderLayer"/>
  </div>
</template>

<script>
import Swiper from '../../common/swiper.js'
export default {
  props: {
    type: {
      type: String,
      required: true
    },
    position: {
      type: Array,
      required: true
    },
    data: {
      type: Array,
      required: true
    }
  },
  data: function () {
    return {
      show: false,
      pairbox: '',
      swiperboy: '',
      swipergirl: '',
      boyId: this.position[0],
      girlId: this.position[1]
    }
  },
  mounted () {
    const _this = this
    _this.swiperboy = _this.initSwiper('#swiperboy', _this.boyId)
    _this.swipergirl = _this.initSwiper('#swipergirl', _this.girlId)
    _this.pairbox = document.getElementById('pairbox')
    _this.pairbox.addEventListener('click', function () {
      _this.showLayer()
    })
    const pairbtn = document.getElementById('pairbtn')
    if (_this.boyId && _this.girlId) {
      _this.submitForm(pairbtn)
    }
    pairbtn.addEventListener('click', function () {
      _this.submitForm(pairbtn)
    })
  },
  methods: {
    imgsrc: function (key) {
      return 'img img_' + (key + 1)
    },
    initSwiper: function (obj, i) {
      const object = new Swiper(obj, {
        slidesPerView: 3,
        loop: true,
        direction: 'vertical',
        centeredSlides: true,
        initialSlide: i - 1,
        slideToClickedSlide: true
      })
      return object
    },
    hiderLayer: function () {
      this.show = false
    },
    showLayer: function () {
      this.show = true
    },
    sureResult: function () {
      const _this = this
      _this.show = false
      const boyIndex = _this.swiperboy.realIndex
      const girlIndex = _this.swipergirl.realIndex
      _this.boyId = boyIndex + 1
      _this.girlId = girlIndex + 1

      const pairbox = _this.pairbox
      const img = pairbox.querySelectorAll('.img')
      const name = pairbox.querySelectorAll('.name')
      img[0].setAttribute('class', 'img img_' + _this.boyId)
      img[1].setAttribute('class', 'img img_' + _this.girlId)
      name[0].innerHTML = _this.data[boyIndex]
      name[1].innerHTML = _this.data[girlIndex]
    },
    submitForm: function (pairbtn) {
      const _this = this
      const href = pairbtn.getAttribute('url')
      const url = href + '?boy=' + _this.boyId + '&girl=' + _this.girlId
      pairbtn.setAttribute('href', url)
    }
  }
}
</script>
