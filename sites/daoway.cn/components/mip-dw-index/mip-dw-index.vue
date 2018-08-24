
<template>
  <div class="wrapper">
    <mip-fixed
      :class="{fiscroll:scroll}"
      type="top"
      class="indexed">
      <img
        :src="scroll?'http://www.daoway.cn/mip/common/images/position.png':'http://www.daoway.cn/images/position1.png'"
        class="i-p-img">
      <span
        class="spn"
        @click="toposition">{{ position.name ? position.name : position.addr }}<img src="http://www.daoway.cn/mip/common/images/down1.png"></span>
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
        :key="k"
        class="boxlist">
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
          @click="toindex"
        ><img src="http://www.daoway.cn/mip/common/images/home.png">首页</a>
        <a
          data-type="mip"
          data-title="订单"
          @click="toorder"><img src="http://www.daoway.cn/mip/common/images/order2.png">订单</a>
        <a
          data-type="mip"
          data-title="我的"
          @click="tomy"><img src="http://www.daoway.cn/mip/common/images/my2.png">我的</a>
      </div>
    </mip-fixed>
  </div>
</template>
<script>

import base from '../../common/utils/base.js'
import '../../common/utils/base.less'
export default {
  data () {
    return {
      channel: 'baidu',
      zoom: 3,
      city: '',
      position: base.getposition() || '',
      banners: [],
      fenleiary: [],
      list: [],
      warn: {
        // 弹窗
        show: false,
        texts: ''
      },
      scroll: false,
      client_id: 'vnQZ7pPB0gsWHZZF4n6h0WDOl8KOr7Lq',
      ClientSecret: 'kM6rbBN43zhAEOFxeQ9Wnj2MzVzkROA0',
      code: base.getRequest(location.href).code,
      redirectUri: base.htmlhref.index
    }
  },
  mounted () {
    let that = this
    let position = localStorage.getItem('position')
    if (position) {
      that.position = base.getposition()
      that.callBack()
    } else {
      that.handler()
    }
    let userId = localStorage.getItem('mipUserId')
    let token = localStorage.getItem('mipToken')
    if (!userId || !token) {
      if (this.code) {
        that.codelogin(this.code, this.redirectUri)
      } else {
        this.tologin()
      }
    }
    window.addEventListener('scroll', that.handleScroll)
    window.addEventListener('show-page', (e) => {
      this.position = base.getposition()
      that.callBack()
    })
  },
  methods: {
    codelogin: function (code, redirectUri) {
      let url = '/daoway/rest/users/login_mip'
      fetch(url, {
        method: 'POST',
        headers: {'content-type': 'application/x-www-form-urlencoded'}, // "code="+code,
        body: 'code=' + code + '&redirectUri=' + redirectUri
      }).then(function (res) {
        return res.json()
      }).then(function (text) {
        if (text.status === 'ok') {
          window.localStorage.setItem('mipUserId', text.data.userId)
          window.localStorage.setItem('mipToken', text.data.token)
          if (text.data.token) {
            document.cookie = 'token=' + text.data.token + ';path=/daoway'
          }
        } else {
          this.tologin()
          console.log('失败')
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    tologin () {
      let that = this
      let url = 'https://openapi.baidu.com/oauth/2.0/authorize?response_type=code&client_id=' + that.client_id + '&redirect_uri=' + that.redirectUri + '&scope=snsapi_userinfo&state=STATE'
      MIP.viewer.open(url, { isMipLink: true })
    },
    handler () {
      let that = this
      let url = '/daoway/rest/user/city'
      fetch(url, {
        method: 'get'
      }).then(function (res) {
        return res.json()
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
        return res.json()
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
        return res.json()
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
        return res.json()
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
        return res.json()
      }).then(function (text) {
        that.list = text.data
      }).catch(function (error) {
        console.log(error)
      })
    },
    toservicedetail (id) { // 跳转到服务列表页
      MIP.viewer.open(base.htmlhref.detail + '?detailid=' + id, {isMipLink: false})
    },
    toserviceclass (id, name) {
      if (!name) {
        name = '全部'
      }
      MIP.viewer.open(base.htmlhref.serviceclass + '?category=' + id + '&tag=' + name, {isMipLink: false})
    },
    toposition () {
      MIP.viewer.open(base.htmlhref.position, {isMipLink: true})
    },
    toindex () {
      MIP.viewer.open(base.htmlhref.index, {isMipLink: false})
    },
    toorder () {
      MIP.viewer.open(base.htmlhref.order, {isMipLink: false})
    },
    tomy () {
      MIP.viewer.open(base.htmlhref.my, {isMipLink: false})
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

    .indexed{
        height: 40px;
        line-height: 40px;
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
        width: 10px;
        height: auto;
        vertical-align: middle;
        margin-left: 10px;
    }

    .boxlist{
        border-bottom: 10px solid #f5f5f5;
        padding-bottom: 8px;
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
        vertical-align: middle;
        color: #fff;
    }
    .spn img{
        width: 10px;
        height: auto;
        margin-left: 4px;
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
    .project{
        background: #fff;
    }
    .box{
        margin-bottom: 50px;
    }

    .service-item {
        width: 100%;
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
        color: #000;
        font-size: 13px;
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
        margin-top: 15px;
        height: 72px
    }

    .down ul li {
        width: 20%;
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
        top: 8px;
        font-size: 13px;
    }

    .down ul li:last-child {
        border: none
    }

    .h2 span img {
        width: 7px;
        height: auto
    }

    .item-name {
        padding-left: 2%;
    }

    .item-name li {
        display: inline-block;
        width: 31.5%;
        margin-top: 3px;
        margin-left: 1.5%;
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
        width: 16px;
        height: auto;
        margin-right: 2px;
        vertical-align: middle;
    }
    .i-unit{
        font-size: 10px;
    }

</style>
