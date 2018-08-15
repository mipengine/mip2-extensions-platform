<template>
  <div class="wrapper">
    <!--维修好评列表组件-->
    <div class="jkx_evaluation_container">
      <div class="evaluate swiper-container">
        <div
          ref = "swiperWraper"
          class="swiper-wrapper">
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
                  :id="item.engineer.id">
                  <img
                    :src="'https://rs.jikexiu.com/'+item.engineer.pic"
                    alt="">
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="swiper-button-next"
        @click="next">
        <i class="icon_next"/>
      </div>
      <div
        class="swiper-button-prev"
        @click="prev">
        <i class="icon_prev"/>
      </div>
    </div>
  </div>
</template>
<script>
import request from '@/common/js/fetch'
import apiUrl from '@/common/js/config.api'
const viewport = MIP.viewport
export default {
  // 过滤时间同一时间格式
  filters: {
    getTime (time) {
      let d = new Date(time)
      let year = d.getFullYear()
      let month = d.getMonth() + 1
      month = month < 10 ? '0' + month : '' + month
      let day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate()
      return year + '-' + month + '-' + day
    },
    // 名字后两位用**
    getName (name) {
      let len = name.length - 1
      let finalName = name[0].concat(nano(len))

      function nano (len) {
        let _str = ''
        for (let i = 0; i < len; i++) {
          _str += '*'
        }
        return _str
      }
      return finalName
    }
  },
  data () {
    return {
      index: 0,
      x: 0, // 水平移动距离
      data: [] // 好评数据
    }
  },
  created () {
    // 请求好评借口
    request(apiUrl.appraiseList).then(res => {
      if (res.code === 200) {
        this.data = res.data.detail
        this.$refs.swiperWraper.style.width = this.data.length * viewport.getWidth() * 0.8 + 'px'
        this.$refs.swiperWraper.style.webkitTransform = 'translateX(0)'
      }
    })
  },
  methods: {
    next () {
      if (this.index < this.data.length - 1) {
        this.index++
      } else {
        this.index = 0
      }
      this.x = this.index * viewport.getWidth() * 0.8 + 'px'
      this.$refs.swiperWraper.style.webkitTransform = `translateX(-${this.x})`
    },
    prev () {
      if (this.index > 0) {
        this.index--
      } else {
        this.index = this.data.length - 1
      }
      this.x = this.index * viewport.getWidth() * 0.8 + 'px'
      this.$refs.swiperWraper.style.webkitTransform = `translateX(-${this.x})`
    }
  }
}
</script>
<style scoped lang="css">
/*客户评价*/
  .wrapper{
    width:80%;
    height: 145px;
    margin: 0 auto;
    padding-bottom: 10px;
  }
  .jkx_evaluation_container {
      position: relative;
  }
  .jkx_evaluation_container .evaluate {
    overflow: hidden;
    width: 100%;
    border: 1px solid #eee;
    position: static;
    background: #fff;
    border-radius: 5px;
  }
  .swiper-wrapper{
    display: flex;
    transform: translateX(0px);
    transition: all .3s;
    -webkit-transition: all .3s;
  }
  .jkx_evaluation_container .swiper-slide {
    width: 100%;
    overflow: hidden;
    text-align: center;
  }
  /*客户评价头部*/
  .jkx_evaluation_container .header {
    height: 20px;
    line-height: 20px;
    display: flex;
    align-items: center;
    font-size: 12px;
    color: rgb(153, 153, 153);
    background-color: transparent;
    padding-left: 10px;
    padding-right: 10px;
    border-bottom: 1px solid #ddd;
    padding: 0 !important;
    margin: 10px 0 0 !important;
    width: 100% !important;
  }
  .jkx_evaluation_container .header-left {
    display: flex;
    padding: 5px 0;
    margin-left: 10px;
  }
  .jkx_evaluation_container .header-left span:last-child {
    margin-left: 5px;
  }
  .jkx_evaluation_container .header-right {
    margin-left: auto;
    margin-right: 10px;
  }
  /*客户评价内容*/
  .jkx_evaluation_container .nav {
    margin-top: 15px;
    margin-bottom: 10px;
    text-align: left;
    padding: 0;
    color: rgb(51, 51, 51);
    font-size: 13px;
    line-height: 1.5em;
    padding: 0 10px;
    height: 55px;
  }
  .jkx_evaluation_container .nav p {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    word-wrap: break-word;
    word-break: normal;
  }
  /*客户评价底部*/
  .jkx_evaluation_container .footer {
    display: flex;
    align-items: center;
    line-height: 100%;
    height: auto;
    font-size: 15px;
    position: relative;
    padding: 0 10px;
    justify-content: space-around;
  }
  .jkx_evaluation_container .footer_left {
    display: flex;
    width: 80%;
    line-height: 25px;
    justify-content: space-around;
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
    font-size: 12px;
  }
  .jkx_evaluation_container .problem {
    width: 110px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-left: 15px;
    font-size: 12px;
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
    padding: 0;
    background-size: 100%;
    border: none;
  }
  .jkx_evaluation_container .footer_right :after {
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
  /*客户评价左右按钮*/
  .jkx_evaluation_container .swiper-button-next,.jkx_evaluation_container .swiper-button-prev {
    position: absolute;
    width: 30px;
    height: 40px;
    right: -33px;
    top: 50%;
    margin-top: -25px;
    background-color: rgba(0, 0, 0, .08);
    border-radius: 5px;
    background-image: none;
  }
  .jkx_evaluation_container .swiper-button-next .icon_next,.jkx_evaluation_container .swiper-button-prev .icon_prev {
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    left: 0;
    right: 0;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAWCAIAAACZhvE0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTExIDc5LjE1ODMyNSwgMjAxNS8wOS8xMC0wMToxMDoyMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpmNTFjNzcyMS0wZTE1LTlkNDYtYjdiZS0zYmJlOWM0MjgyZTciIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTJBRjM5QkExQzJEMTFFOEE0Q0RGNTI1OEJFMzg1QTIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTJBRjM5QjkxQzJEMTFFOEE0Q0RGNTI1OEJFMzg1QTIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6YjQ3OWUwMTgtZDVjZC1iODQ5LWI4MzMtYWEwNzA2YmNkODdlIiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6ZGNjZjE2ZTQtZTkzNC0xMWU3LWE5ZWUtYjRlZmU3ZjRmMTMzIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+gPU1IwAAAKdJREFUeNqEkkEKwyAQRdMxG5cuxHN4MEE8iLfwQt5CXXgCoT+0tGmi04HEgff4TsLszrkxhvdeKbXNioBLKTHG3vvUECmlnHNrDW9rrZTymoHwEILWGtI0ifDwEr0ORqJPt5LoHDiV6DLXXXqgu/8DAGAgqHPjLNH2r4gPwC3EY0xNPManEY9/5pjir7HCb4PBh8HjY8ewhbXWFUbtQghjDLPJTwEGAI1xtCjhMoyhAAAAAElFTkSuQmCC) no-repeat;
    background-size: 100% 100%;
    width: 8px;
    height: 24px;
    display: inline-block;
  }
  .jkx_evaluation_container .swiper-button-prev {
    left: -31px;
  }
  .jkx_evaluation_container .swiper-button-prev .icon_prev {
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAWCAIAAAB7WupNAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA4RpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTExIDc5LjE1ODMyNSwgMjAxNS8wOS8xMC0wMToxMDoyMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpmNTFjNzcyMS0wZTE1LTlkNDYtYjdiZS0zYmJlOWM0MjgyZTciIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTJBRjM5QjIxQzJEMTFFOEE0Q0RGNTI1OEJFMzg1QTIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTJBRjM5QjExQzJEMTFFOEE0Q0RGNTI1OEJFMzg1QTIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTUgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6YjQ3OWUwMTgtZDVjZC1iODQ5LWI4MzMtYWEwNzA2YmNkODdlIiBzdFJlZjpkb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6ZGNjZjE2ZTQtZTkzNC0xMWU3LWE5ZWUtYjRlZmU3ZjRmMTMzIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+3DQ+NwAAAJVJREFUeNqE08ENhSAQBNDvUgEHQpuEQghtAgcqIHGMRqOfHfZIXhgYZWut/ZTpveecjTFCREqplDLGECIQ4pwLIQgXMUZrrSwFFmUpXkgTDyLiQlwcaCkwBl3VWon43k4bQaHYBnEIRfQcIQJB3B1xS3edibvn4MS9bqe5bwVTN+np323aP35/Lu+92vi5HwQewi7AAIq/tLxGUxbFAAAAAElFTkSuQmCC) no-repeat;
    background-size: 100% 100%;
  }
</style>
