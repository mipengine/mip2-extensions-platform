<template>
  <div class="wrapper">
    <div class="jkx_evaluation_container">
      <div class="evaluate swiper-container">
        <div class="swiper-wrapper">
          <div
            v-for="(item,index) in data"
            :key="index"
            class="swiper-slide">
            <div class="header">
              <div class="header-left">
                <span>{{ item.user.userName | getName }}</span>
                <span>{{ item.user.cityName.split(' ')[1] }}</span>
              </div>
              <div class="header-right">
                <span>{{ item.appraise.appraiseTime | getTime }}</span>
              </div>
            </div>
            <div class="nav">
              <p>{{ item.appraise.content }}</p>
            </div>
            <div class="footer">
              <div class="footer_left">
                <span class="model">{{ item.title }}</span>
                <span class="problem">{{ item.items[0].solution }}</span>
              </div>
              <div class="footer_right">
                <a
                  :id="item.engineer.id"
                  @click="toMainpage(item.engineer.id)">
                  <img
                    :src="'https://rs.jikexiu.com/'+item.engineer.pic"
                    alt="">
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="more"><span @click="toEva">查看更多<i></i></span></div> -->
    </div>
  </div>
</template>
<script>
import {fetch} from '@/common/js/fetch'
import apiUrl from '@/common/js/config.api'
import Swipers from 'swiper'
import 'swiper/dist/css/swiper.min.css'
export default {
  filters: {
    getTime (time) {
      var d = new Date(time)
      var year = d.getFullYear()
      var month = d.getMonth() + 1
      month = month < 10 ? '0' + month : '' + month
      var day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate()
      return year + '-' + month + '-' + day
    },
    getName (name) {
      var len = name.length - 1
      var finalName = name[0].concat(nano(len))

      function nano (len) {
        var _str = ''
        for (var i = 0; i < len; i++) {
          _str += '*'
        }
        return _str
      }
      return finalName
    }
  },
  data () {
    return {
      data: []
    }
  },
  mounted () {

  },
  created () {
    fetch(apiUrl.appraiseList).then(res => {
      this.data = res.data.detail
      this.$nextTick(function () {
        /* eslint-disable no-unused-vars */
        var swiper = new Swipers('.evaluate', {
          slidesPerView: 1,
          loop: true,
          nextButton: '.swiper-button-next',
          prevButton: '.swiper-button-prev'
        })
      })
    })
  }
}
</script>

<style scoped>
/*客户评价*/

    .jkx_evaluation_container {
        /* margin: 10px auto; */
        position: relative;
        /* padding: 0 10px; */

    }

    .jkx_evaluation_container .evaluate {
        width: 100%;
        height: 180px;
        border: 1px solid #eee;
        /* box-shadow: 0 0 20px 2px #ddd; */
        position: static;
        background: #fff;
    }
    .swiper-wrapper{
      width: 100%;
    }
    .jkx_evaluation_container .swiper-slide {
        height: 180px;
        overflow: hidden;
        text-align: center;
    }

    .jkx_evaluation_container .header {
        height: 20px;
        border-bottom: 1px solid #e4e4e4;
        line-height: 20px;
        display: flex;
        align-items: center;
        font-size: 15px;
        color: rgb(153, 153, 153);
        background-color: transparent;
        padding-left: 10px;
        padding-right: 10px;
    }

    .jkx_evaluation_container .header-left {
        display: flex;
        padding: 5px 0;
    }

    .jkx_evaluation_container .header-left span:last-child {
        margin-left: 5px;
    }

    .jkx_evaluation_container .header-right {
        margin-left: auto;
    }

    .jkx_evaluation_container .nav {
        margin-top: 15px;
        margin-bottom: 10px;
        text-align: left;
        height: 70px;
        padding: 0;
        color: rgb(51, 51, 51);
        font-size: 15px;
        line-height: 1.5em;
        padding: 0 10px;
    }

    .jkx_evaluation_container .nav p {
        overflow: hidden;
        /* height: 100%; */
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        word-wrap: break-word;
        word-break: normal;
    }

    .jkx_evaluation_container .footer {
        display: flex;
        align-items: center;
        line-height: 100%;
        height: auto;
        font-size: 15px;
        position: relative;
        padding: 0 10px;
        justify-content: space-around
    }

    .jkx_evaluation_container .footer_left {
        display: flex;
        width: 80%;
        line-height: 25px;
        justify-content: space-around
    }

    .jkx_evaluation_container .footer span {
        color: rgb(153, 153, 153);
    }

    .jkx_evaluation_container .model {
        margin-right: 8px;
        width: 160px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: left;
    }

    .jkx_evaluation_container .problem {
        width: 110px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-left: 15px;
    }

    .jkx_evaluation_container .footer_right {
        width: 20%;
        margin-left: auto;
    }
    .jkx_evaluation_container .footer_right a{
      width: 100%;
      display: block;
      text-align: right;
    }
    .jkx_evaluation_container .footer_right a img {

        width: 30px;
        height: 30px;
        border-radius: 50%;
        display: inline-block;
        /* margin-right: 14px; */
        padding: 0;
        background-size: 100%;
        border: none;
    }

    .jkx_evaluation_container .footer_right :after {
        /* background: url(../../assets/images/icon_right_small.png) no-repeat; */
        width: 5px;
        height: 10px;
        content: "";
        position: absolute;
        right: 0;
        display: block;
        bottom: 0;
        top: 0;
        margin: auto 0;
        background-size: 100%;
    }
</style>
