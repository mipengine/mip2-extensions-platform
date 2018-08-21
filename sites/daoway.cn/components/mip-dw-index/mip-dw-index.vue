
<template>
  <div class="wrapper">
    <mip-fixed
      :class="{fiscroll:scroll}"
      type="top"
      class="indexed">
      <img
        :src="scroll?'/common/images/position.png':'http://www.daoway.cn/images/position1.png'"
        class="i-p-img">
      <span
        class="spn"
        @touchend="toposition">{{ position.name ? position.name : position.addr }}∨</span>
        <!--<input class="search" :class="{searchscroll:scroll}" @click="search" type="text" name="search" placeholder="快速搜索商家、服务">-->
    </mip-fixed>
    <div class="banner">
      <div class="imgban"><img
        :src="banners.imgUrl"
        @click="link(banners.target)"></div>
    </div>
    <div class="service-item">
      <ul class="swiper-slide">
        <li
          v-for="t in fenleiary"
          :key="t"
          :id="t.id"
          @click="toserviceclass(t.id)"><img :src="t.iconUrl2"><i>{{ t.name }}</i></li>
      </ul>
    </div>
    <div class="project">
      <div class="h2">即刻达<span>最快30分钟上门</span></div>
      <div class="down">
        <ul>
          <li
            v-for="e in ext"
            :key="e"
            :id="e.id"
            @click="toserviceclass(e.id,e.name)"><img :src="e.iconUrl2"><i>{{ e.name }}</i></li>
        </ul>
      </div>
    </div>
    <div class="box">
      <div
        v-for="k in list"
        :key="k">
        <div
          :categoryId="k.categoryId"
          class="h2">{{ k.categoryName }}<span @click="toserviceclass(k.categoryId)" >更多<img src="https://www.daoway.cn/h5/image/go_06.png"></span></div>
        <ul class="item-name" >
          <li
            v-for="t in k.items"
            :key="t"
            :id="t.id"
            class="detailItem"
            @click="toservicedetail(t.id)">
            <img
              :src="t.pic_url"
              class="liimg">
            <i class="name">{{ t.name }}</i>
            <i class="price"><strong>{{ t.price }}</strong><span class="i-unit">{{ t.price_unit }}</span></i>
            <i class="home"><img src="https://www.daoway.cn/h5/image/home1.png">{{ t.serviceTitle }}</i>
          </li>
        </ul>
      </div>
    </div>
    <mip-fixed type="bottom">
      <div class="bottomnav">
        <a
          class="regclolr"
          data-type="mip"
          data-title="首页"
          href="/components/mip-dw-index/example/mip-dw-index"
          @click="toindex"><img src="/common/images/home.png">首页</a>
        <a
          data-type="mip"
          data-title="订单"
          href="/components/mip-dw-order/example/mip-dw-order"><img src="/common/images/order2.png">订单</a>
        <a
          data-type="mip"
          data-title="我的"
          href="/components/mip-dw-my/example/mip-dw-my"><img src="/common/images/my2.png">我的</a>
      </div>
    </mip-fixed>
  </div>
</template>
<script>

import base from '../../common/utils/base.js'
export default {
  data () {
    return {
      channel: 'baidu',
      zoom: 3,
      city: '',
      position: '',
      banners: [],
      fenleiary: [],
      list: [],
      warn: {
        // 弹窗
        show: false,
        texts: ''
      },
      scroll: false
    }
  },
  mounted () {
    let that = this
    window.addEventListener('scroll', that.handleScroll)
    let position = localStorage.getItem('position')
    if (position) {
      that.position = base.getposition()
      that.callBack()
    } else {
      this.handler()
    }
    window.addEventListener('show-page', (e) => {
      that.position = base.getposition()
      that.callBack()
    })
  },
  methods: {
    handler () {
      let that = this
      let url = '/daoway/rest/user/city'
      fetch(url, {
        method: 'get'
      }).then(function (res) {
        if (res && res.status === 200) {
          return res.json()
        }
      }).then(function (text) {
        if (text.status === 'ok') {
          let data = text.data
          let tempLot = data.lot
          let tempLat = data.lat
          that.city = data.city.replace(/市$/g, '') || '北京'
          that.getCommunity(tempLat, tempLot)
        } else {
          this.warn.show = true
          this.warn.texts = text.msg
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    getCommunity (lat, lng) {
      let that = this
      let url = '/daoway/rest/community/autoPosition?lot=' + lng + '&lat=' + lat
      fetch(url, {
        method: 'get'
      }).then(function (res) {
        if (res && res.status === 200) {
          return res.json()
        }
      }).then(function (text) {
        if (text.status === 'ok') {
          that.position = text.data[0]
          that.callBack()
          that.position = base.position(that.position)
        } else {
          that.warn.show = true
          that.warn.texts = text.msg
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    handleScroll () {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      if (scrollTop > 200) {
        this.scroll = true
      } else {
        this.scroll = false
      }
    },
    callBack () {
      let that = this
      that.banner()
      that.fenlei()
      that.servicelist()
    },
    banner () {
      let that = this
      let position = that.position
      let url = '/daoway/rest/config/banners?city=' + encodeURIComponent(position.city) + '&community_id=' + position.id
      fetch(url, {
        method: 'get'
      }).then(function (res) {
        if (res && res.status === 200) {
          return res.json()
        }
      }).then(function (text) {
        let ary = []
        for (let i = 0; i < text.data.length; i++) {
          let ban = {}
          ban.imgUrl = text.data[i].imgUrl
          ban.target = text.data[i].target
          ary.push(ban)
        }
        that.banners = ary[0]
      }).catch(function (error) {
        console.log(error)
      })
    },
    link (target) {
      if (/openSuper/g.test(target)) {
        let code = (/(\d+)/g).exec(target)[1]
        MIP.viewer.open(base.htmlhref.detail + '?detailid=' + code, {isMipLink: true})
      } else if (/entrance/g.test(target)) {
        let temp = target.split('?tag=')
        let tagName = temp[1] || '全部'
        let catId = temp[0].split('app://entrance/openService/')[1]
        MIP.viewer.open(base.htmlhref.serviceclass + '?category=' + catId + '&tag=' + tagName, {isMipLink: true})
      } else {
        MIP.viewer.open(target)
      }
    },
    fenlei () { // 分类
      let that = this
      let position = that.position
      let url = '/daoway/rest/category/for_filter?manualCity=' + encodeURIComponent(position.city) + '&weidian=true&recommendOnly=true&includeChaoshi=false&includeSecondPage=true&hasChaoshi=false&includeExtCategory=true&channel=' + that.channel
      fetch(url, {
        method: 'get'
      }).then(function (res) {
        if (res && res.status === 200) {
          return res.json()
        }
      }).then(function (text) {
        let data = text.data
        let filterArr = []
        let arr1 = data.splice(0, 10)
        filterArr.push(arr1, data)
        let ext = text.ext
        that.fenleiary = filterArr[0]
        that.ext = ext
      }).catch(function (error) {
        console.log(error)
      })
    },
    servicelist () { // 分类
      let that = this
      let position = that.position
      let url = '/daoway/rest/service_items/recommend_top?start=0&size=3&lot=' + position.lot + '&lat=' + position.lat + '&manualCity=' + encodeURIComponent(position.city) + '&includeNotInScope=true&channel=' + that.channel
      fetch(url, {
        method: 'get'
      }).then(function (res) {
        if (res && res.status === 200) {
          return res.json()
        }
      }).then(function (text) {
        that.list = text.data
      }).catch(function (error) {
        console.log(error)
      })
    },
    toservicedetail (id) { // 跳转到服务列表页
      MIP.viewer.open(base.htmlhref.detail + '?detailid=' + id, {isMipLink: true})
    },
    toserviceclass (id, name) {
      if (!name) {
        name = '全部'
      }
      MIP.viewer.open(base.htmlhref.serviceclass + '?category=' + id + '&tag=' + name, {isMipLink: true})
    },
    toposition () {
      MIP.viewer.open(base.htmlhref.position, {isMipLink: true})
    }
  }

}
</script>

<style scoped>
    * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }

    i {
        font-style: normal
    }

    li, ol {
        list-style: none
    }

    body {
        background: #f5f5f5;
    }
    .regclolr{
        color:#f64e4e ;
    }
    .banner{
        width: 100%;
        height: 160px;
    }
    .banner img{
        height: 160px;
    }
    .bottomnav{
        width: 100%;
        background: #fff;
        border-top: 1px solid #ededed;
    }
    .bottomnav a{
        line-height: 23px;
        display: inline-block;
        width: 32%;
        text-align: center;
        font-size: 12px;
        margin-top: 5px;
    }
    .bottomnav a img{
        width: 25px;
        height: auto;
        display: block;
        text-align: center;
        margin: 0 auto;
    }
    .indexed{
        height: 40px;
    }
    .fiscroll{
        background: #fff;
    }
    .fiscroll .spn{
        color: #898989;
    }

    .swiper-slide img{
        height: 155px;
        width: auto;
    }
    .swiper-pagination-bullets .swiper-pagination-bullet-active{
        background: #fb461c;
    }
    .i-p-img {
        width: 14px;
        height: auto;
        margin-top: 8px;
        margin-left: 10px;
    }

    .servicePro [role=list] {
        display: -webkit-flex;
        display: flex;
        width: 98%;
        padding: 0 1%;
        flex-direction: row;
        background: #fff;
    }

    .servicePro [role=listitem] {
        width: 20%;
        padding: 0 0 10px
    }

    .servicePro [role=listitem] > li {
        width: 100%
    }

    .servicePro1 [role=list] {
        display: inline-block;
        padding: 10px 0;
    }

    .servicePro [role=listitem] {
        display: inline-block;
    }

    .servicePro [role=listitem] li > p {
        text-align: center
    }

    .search {
        border-radius: 20px;
        padding: 10px 10px;
        width: 50%;
        position: absolute;
        right: 4%;
        top: 6px;
        border: none;
        outline: none;
        color: #fff;
        background: rgba(255,255,255,0.4);
    }
    .searchscroll{
        background: rgba(0,0,0,0.2);
    }
    input::-webkit-input-placeholder {
        color: #fff;
    }

    .spn {
        display: inline-block;
        max-width: 42%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #fff;
    }

    .price {
        color: #fb461c
    }
    .iconimg{
        position: relative;
        bottom: 20px;
    }

    .h2 {
        border-left: 3px solid #fb461c;
        margin: 10px 3%;
        height: 20px;
        line-height: 20px;
        padding: 0 2%;
        background: #fff;
        width: 94%
    }

    .h2 span {
        float: right;
        color: #898989
    }

    .project, .box {
        border-top: 10px solid #f5f5f5;
        width: 100%;
    }
    .box{
        margin-bottom: 50px;
    }

    .service-item {
        width: 98%;
        padding: 10px 1%;
        height: 190px;
        background: #fff;
        overflow: hidden
    }

    .service-item ul li {
        width: 20%;
        float: left;
        text-align: center;
        height: 90px
    }

    .service-item ul li i {
        display: block;
        margin-top: 1px;
        color: #000
    }

    .service-item ul li img {
        width: 46px;
        height: 46px;
        margin: 0 auto
    }

    .service-item:last-child {
        border-bottom: 1px solid #e5e5e5
    }

    .service-item ul li i {
        margin-top: 0;
    }

    .down {
        width: 100%;
        margin-top: 10px;
        height: 80px
    }

    .down ul li {
        width: 19%;
        display: inline-block;
        text-align: center;
        border-right: 1px solid #f5f5f5
    }

    .down ul li img {
        width: 27px;
        height: 27px
    }

    .down ul li i {
        display: block;
        position: relative;
        top: 15px
    }

    .down ul li:last-child {
        border: none
    }

    .h2 span img {
        width: 7px;
        height: auto
    }

    .item-name {
        padding-left: 3%;
    }

    .item-name li {
        display: inline-block;
        width: 31%;
        margin-top: 3px;
        margin-left: 1%;
    }

    .item-name li:nth-child(1) {
        margin-left: 0
    }

    .item-name li i {
        display: block;
        text-align: left;
        line-height: 20px;
        height: 20px;
        width: 100%;
        overflow: hidden;
        margin-top: 2px
    }

    .name {
        margin-top: 2px
    }

    .price {
        color: #e94840;
    }

    .price strong {
        font-size: 16px;
        font-weight: normal
    }

    .home {
        color: #b1b1b1;
        margin-top: 3px;
        font-size: 12px;
    }

    .liimg {
        border-radius: 4px
    }

    .home img {
        width: 12px;
        height: auto;
        margin-right: 2px
    }
    .i-unit{
        font-size: 10px;
    }

</style>
