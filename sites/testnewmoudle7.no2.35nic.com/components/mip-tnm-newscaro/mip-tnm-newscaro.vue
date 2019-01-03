<template>
  <div class="index_news_box">
    <div v-if="banner_list.length<=1">
      <mip-img
        :src="img"
        class="banner"/>
    </div>
    <div v-else>
      <mip-carousel
        autoplay
        defer="5000"
        layout="responsive"
        width="300"
        height="350"
        indicator-id="mip-carousel-example">
        <a
          v-for="item in banner_list"
          :key="item.newsId"
          :href="item.thePageUrl"
          target="_blank">
          <mip-img
            :src="item.newsImage"
            class="banner"/>
          <div class="i_n_text">
            <div
              class="desc"
              v-html="item.newsInfos"/>
            <div class="topic">{{ item.newsTopic }}</div>
            <a
              :href="newstopurl"
              :data-title="newstoptit"
              class="link">{{ newstoptit }}</a>
          </div>
        </a>
      </mip-carousel>
    </div>
  </div>
</template>

<style scoped>
.index_news_box {
  padding: 40px 10px 0px 10px;
  position: relative;
}
.i_n_text {
  position: absolute;
  top: 50%;
  left: 50%;
  color: #e1eaec;
  transform: translate(-50%, -50%);
  width: 100%;
  text-align: center;
}
.topic {
  font-size: 24px;
  line-height: 30px;
  color: inherit;
  margin: 0;
  font-weight: 300;
  margin-bottom: 15px;
}
.desc {
  background: rgba(0,0,0,0.4);
  color: inherit;
  font-size: 14px;
  display: inline-block;
  white-space: nowrap;
}
.link {
  display: inline-block;
  color: #4b5052;
  background: #e7ebec;
  line-height: 30px;
  min-height: 30px;
  border: none;
  margin: 0;
  text-align: center;
  vertical-align: middle;
  font-size: 14px;
  padding: 0 12px;
}
</style>
<script>
import apiUrl from '../../common/js/config.api'
export default {
  props: {
    newstoptit: {
      type: String,
      default: ''
    },
    newstopurl: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      banner_list: [],
      img: ''
    }
  },
  mounted () {
    fetch(apiUrl.bannerList).then(response => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error('banner went wrong!')
      }
    }).then(newsinfos => {
      if (newsinfos.data.items.length === 1) this.img = newsinfos.data.items[0].newsImage
      this.banner_list = newsinfos.data.items
      if (this.banner_list.length > 1) {
        this.banner_list.forEach(element => {
          if (element.thePageUrl === '' || element.thePageUrl == null) {
            element.thePageUrl = 'javascript:void(0)'
          }
        })
      } else {
        this.banner_list[0].thePageUrl = this.banner_list[0].thePageUrl === '' ? 'javascript:void(0)' : this.banner_list[0].thePageUrl
      }
    })
    fetch(apiUrl.newsmoduleUrl).then(response => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error('newsmoduleUrl went wrong!')
      }
    }).then(newsmo => {
      this.newstoptit = newsmo.data.items[0].moduleTitle
      this.newstopurl = newsmo.data.items[0].moduleLink
    })
  }
}
</script>
