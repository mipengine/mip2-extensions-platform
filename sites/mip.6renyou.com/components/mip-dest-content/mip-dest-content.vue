<style scoped>

</style>

<template>
  <div class="dest-content">
    <div class="dest-box">
      <ul class="dest-list clearfix">
        <li
          v-for="(item, index) in destination"
          :key="index"
          class="list">
          <a
            :href="host + '/dest/' + item.name"
            mip-link>
            <div class="dest-img">
              <mip-img :src="item.img" />
            </div>
            <span class="dest-name">{{ item.name }}</span>
          </a>
        </li>
      </ul>
    </div>
  </div>

</template>

<script>
import imgNa from '@/static/img/index/dest-na.jpg'
import imgSa from '@/static/img/index/dest-sa.jpg'
import imgEurope from '@/static/img/index/dest-europe.jpg'
import imgAustralia from '@/static/img/index/dest-australia.jpg'
import imgThailand from '@/static/img/index/dest-thailand.jpg'
import imgSingapore from '@/static/img/index/dest-singapore.jpg'
import imgJapan from '@/static/img/index/dest-japan.jpg'
import imgTaiwan from '@/static/img/index/dest-taiwan.jpg'

export default {
  props: {
    'host': {
      type: String,
      required: true
    }
  },
  data () {
    return {
      destination: [{
        name: '北美',
        img: imgNa
      }, {
        name: '南美',
        img: imgSa
      }, {
        name: '欧洲',
        img: imgEurope
      }, {
        name: '澳洲',
        img: imgAustralia
      }, {
        name: '泰国',
        img: imgThailand
      }, {
        name: '新加坡',
        img: imgSingapore
      }, {
        name: '日本',
        img: imgJapan
      }, {
        name: '台湾',
        img: imgTaiwan
      }]
    }
  },
  methods: {
  }
}
</script>
