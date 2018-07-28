<template>
  <div>
    <div v-if="banner_list.length<=1">
      <mip-img
        :src="img"
        class="banner"/>
    </div>
    <div v-else>
      <mip-carousel
        layout="responsive"
        width="375"
        height="158"
      >
        <mip-img
          v-for="item in banner_list"
          :key="item.id"
          :src="item.pic"
          class="banner"/>
      </mip-carousel>
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
      banner_list: [],
      img: ''
    }
  },
  created () {
    fetch(apiUrl.bannerList, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'scene_key=m_index'
    }).then(data => {
      return data.json()
    }).then(res => {
      if (res.code === 200) {
        if (res.data.bannerList.length === 1) this.img = res.data.bannerList[0].pic
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
  }
}
</script>
