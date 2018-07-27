<template>
  <div>
    <div v-if="banner_list.length==1">
      <a
        :href="banner_list[0].url"
        target="_blank">
        <img
          :src="banner_list[0].pic"
          alt="banner_list[0].title"
          style="width:100%">
      </a>
    </div>
    <div
      v-else
      class="swiper swiper-container">
      <div class="swiper-wrapper">
        <div
          v-for="(item, index) in banner_list"
          :key="index"
          class="swiper-slide">
          <a :href="item.url">
            <img
              :src="item.pic"
              :title="item.title"
              style="width:100%">
          </a>
        </div>
      </div>
      <div class="swiper-pagination"/>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  margin: 0 auto;
  text-align: center;
}
</style>
<script>
import apiUrl from '../../common/js/config.api'
export default {
  data () {
    return {
      banner_list: []
    }
  },
  created () {
    fetch(apiUrl.bannerList, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'scene_key=m_index'
    }).then(res => {
      if (res.code === 200) {
        this.banner_list = res.data.bannerList
        if (this.banner_list.length > 1) {
          this.banner_list.forEach(element => {
            if (element.url === '') {
              element.url = 'javascript:void(0)'
            }
          })
        } else {
          this.banner_list[0].url = this.banner_list[0].url === '' ? 'javascript:void(0)' : this.banner_list[0].url
        }
      }
    })
  },
  methods: {
  }
}
</script>
