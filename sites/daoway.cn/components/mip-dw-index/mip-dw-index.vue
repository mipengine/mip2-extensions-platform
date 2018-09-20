<template>
  <div
    id="test"
    class="wrapper">
    <mip-map
      id="map"
      on="getPositionComplete:test.success  getPositionFailed:test.fail"><!-- getLocal:test.search-->
      <script type="application/json">
        {
        "ak": "epGAmM09OL7Lwy7cIu47pxzK",
        "hide-map": true,
        "get-position": true
        }
      </script>
    </mip-map>
    <mip-fixed
      type="top"
      class="indexed">
      <img
        src="https://www.daoway.cn/images/position1.png"
        class="i-p-img">
      <span
        class="spn"
        @click="toposition">{{ position.name ? position.name :position.addr }}</span>
      <img
        class="down1"
        src="https://www.daoway.cn/mip/common/images/down1.png">
      <span
        class="home-inputxt"
        @click="tosearch">
        <img src="https://www.daoway.cn/mip/common/images/search.png">
        <i class="inputButton">搜索商家、上门服务</i>
      </span>
    </mip-fixed>

    <!--<div class="banner">
      <div class="imgban"><img
        :src="banners.imgUrl"
        @click="link(banners.target)"></div>
    </div>-->
    <div class="service-item">
      <ul class="swiper-slide">
        <li
          v-for="t in fenleiary"
          :key="t"
          :id="t.id"
          @click="toserviceclass(t.id)"><img :src="t.iconUrl2"><i>{{ t.name }}</i></li>
      </ul>
    </div>
    <!--<div @click="clearposition" style="width: 100%; line-height: 50px; background: green; text-align: center; color: #fff" >清 除</div>-->
    <div class="project">
      <div
        id="h2noline"
        class="h2">即刻达<span>最快30分钟上门</span></div>
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
            <i class="price"><strong>{{ t.price }}</strong><span class="i-unit">{{ t.price_unit }}</span>
              <span
                v-if="t.promotion.first_reduce"
                class="youhui">首减{{ t.promotion.first_reduce }}</span>
              <span
                v-else-if="t.promotion.total_reduce"
                class="youhui">满减{{ t.promotion.total_reduce[0].reduce }}</span>

            </i>
            <i class="home"><img src="https://www.daoway.cn/h5/image/home1.png">{{ t.serviceTitle }}</i>
          </li>
        </ul>
      </div>
      <div class="lastimg"><img src="https://www.daoway.cn/images/bottom.png"></div>
    </div>
    <mip-fixed type="bottom">
      <div class="bottomnav">
        <a
          class="regclolr"
          data-type="mip"
          data-title="到位上门服务"
          @click="toindex"
        ><img src="https://www.daoway.cn/mip/common/images/home.png">首页</a>
        <a
          data-type="mip"
          data-title="订单"
          @click="toorder"><img src="https://www.daoway.cn/mip/common/images/order2.png">订单</a>
        <a
          data-type="mip"
          data-title="我的"
          @click="tomy"><img src="https://www.daoway.cn/mip/common/images/my2.png">我的</a>
      </div>
    </mip-fixed>
    <div
      v-show="warn.show"
      class="layer">
      <div class="layer-content zoomIn">
        <p
          class="layer-text"
          v-text="warn.texts"/>
        <p
          class="layer-sure active-layer"
          @click="closeLayer">知道了</p>
      </div>
    </div>
  </div>
</template>
<script>

import base from '../../common/utils/base.js'
import '../../common/utils/base.less'
export default {
  prerenderAllowed () {
    return true
  },
  data () {
    return {
      channel: 'mip',
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
      // scroll: false,
      client_id: 'vnQZ7pPB0gsWHZZF4n6h0WDOl8KOr7Lq',
      ClientSecret: 'kM6rbBN43zhAEOFxeQ9Wnj2MzVzkROA0',
      code: base.getRequest(location.href).code,
      redirectUri: base.htmlhref.index,
      point: {
        lat: '',
        lng: ''
      }

    }
  },
  /* created () {
        let that = this;
        let position = localStorage.getItem('position');
        if (position) {
            that.position = base.getposition();
            that.callBack()
        } else {
            that.handler()
        }
    }, */
  mounted () {
    let that = this
    let position = localStorage.getItem('position')
    if (position) {
      that.position = base.getposition()
      that.callBack()
    }
    that.$on('success', (e) => {
      /* that.warn.show = true;
          that.warn.texts = JSON.stringify(e);
          console.log(JSON.stringify(e)); */
      let position = localStorage.getItem('position')
      let city = e.address.city.replace(/市$/g, '') || '北京'
      if (position) {
        that.position = base.getposition()
        that.callBack()
      } else {
        that.city = city
        that.getCommunity(e.point.lat, e.point.lng)
      }
      that.point.lat = e.point.lat
      that.point.lng = e.point.lng
      let point = {
        lat: e.point.lat,
        lng: e.point.lng,
        city: city
      }
      localStorage.setItem('point', JSON.stringify(point))
    })
    that.$on('fail', (e) => {
      /* that.warn.show = true;
          that.warn.texts = JSON.stringify(e); */
      localStorage.removeItem('point')
      let position = localStorage.getItem('position')
      if (position) {
        that.position = base.getposition()
        that.callBack()
      } else {
        that.toposition()
      }
    })
    window.addEventListener('show-page', (e) => {
      // console.log(e)
      this.position = base.getposition()
      that.callBack()
      // MIP.viewer.open(base.htmlhref.index, {isMipLink: false})
    })
  },
  methods: {
    /* handler(){
      let that = this;
      let url = '/daoway/rest/user/city';
      fetch(url, {
        method: 'get'
      }).then(function (res) {
        return res.json()
      }).then(function (text) {
        if (text.status === 'ok') {
          let data = text.data;
          let tempLot = data.lot;
          let tempLat = data.lat;
          that.city = data.city.replace(/市$/g, '') || '北京';
          that.getCommunity(tempLat, tempLot)
        }else {
            that.warn.show = true;
            that.warn.texts = text.msg
        }
      }).catch(function (error) {
        console.log(error)
      })
    }, */
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
          base.position(text.data[0])
        } else {
          that.warn.show = true
          that.warn.texts = text.msg
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    callBack () {
      let that = this
      // that.banner();
      that.fenlei()
      that.servicelist()
    },
    /* banner () {
      let that = this;
      let position = that.position;
      let url = '/daoway/rest/config/banners?city=' + encodeURIComponent(position.city) + '&community_id=' + position.id;
      fetch(url, {
        method: 'get'
      }).then(function (res) {
        return res.json()
      }).then(function (text) {
        let ary = [];
        for (let i = 0; i < text.data.length; i++) {
          let ban = {};
          ban.imgUrl = text.data[i].imgUrl;
          ban.target = text.data[i].target;
          ary.push(ban)
        }
        that.banners = ary[0]
      }).catch(function (error) {
        console.log(error)
      })
    }, */
    /* link (target) {
      if (/openSuper/g.test(target)) {
        let code = (/(\d+)/g).exec(target)[1];
        MIP.viewer.open(base.htmlhref.detail + '?detailid=' + code, {isMipLink: true})
      } else if (/entrance/g.test(target)) {
        let temp = target.split('?tag=');
        let tagName = temp[1] || '全部';
        let catId = temp[0].split('app://entrance/openService/')[1];
        MIP.viewer.open(base.htmlhref.serviceclass + '?category=' + catId + '&tag=' + tagName, {isMipLink: true})
      } else {
        MIP.viewer.open(target)
      }
    }, */
    fenlei () { // 分类
      let that = this
      let position = that.position
      let url = '/daoway/rest/category/for_filter?manualCity=' + encodeURIComponent(position.city) + '&weidian=true&recommendOnly=true&includeChaoshi=false&includeSecondPage=true&hasChaoshi=false&includeExtCategory=true&channel=' + that.channel
      fetch(url, {
        method: 'get'
      }).then(function (res) {
        return res.json()
      }).then(function (text) {
        if (text.status === 'ok') {
          let data = text.data
          let filterArr = []
          let arr1 = data.splice(0, 10)
          filterArr.push(arr1, data)
          let ext = text.ext
          that.fenleiary = filterArr[0]
          that.ext = ext
        } else {
          that.warn.show = true
          that.warn.texts = text.msg
        }
      }).catch(function (error) {
        console.log('1111' + error)
      })
    },
    servicelist () { // 分类
      let that = this
      let position = that.position
      let lng = position.lng ? position.lng : position.lot
      let url = '/daoway/rest/service_items/recommend_top?start=0&size=3&lot=' + lng + '&lat=' + position.lat + '&manualCity=' + encodeURIComponent(position.city) + '&includeNotInScope=true&channel=' + that.channel
      fetch(url, {
        method: 'get'
      }).then(function (res) {
        return res.json()
      }).then(function (text) {
        if (text.status === 'ok') {
          that.list = text.data
        } else {
          that.warn.show = true
          that.warn.texts = text.msg
        }
      }).catch(function (error) {
        console.log('22222' + error)
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
    },
    toindex () {
      MIP.viewer.open(base.htmlhref.index, {isMipLink: true})
    },
    toorder () {
      MIP.viewer.open(base.htmlhref.order, {isMipLink: true})
    },
    tomy () {
      MIP.viewer.open(base.htmlhref.my, {isMipLink: true})
    },
    tosearch () {
      MIP.viewer.open(base.htmlhref.search, {isMipLink: true})
    },
    closeLayer () {
      this.warn.show = false
      this.warn.texts = ''
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
    .mip-page-loading-wrapper:after, body:after{
        background: none;
    }

    i {
        font-style: normal
    }

    li, ol {
        list-style: none
    }
    .youhui{
        font-size: 10px;
        border: 1px solid #e94840;
        border-radius: 2px;
        display: inline-block;
        height: 16px;
        line-height: 16px;
        padding: 0 2px;
    }

    #h2noline{
        border: none;
        padding-left: 1%;
    }
    .mip-shell-header .mip-shell-header-logo-title .mip-shell-header-logo{
        width: 28px;
        height: auto;
        margin-top: 7px;
    }
    body {
        background: #f5f5f5;
    }
    .lastimg{
        width: 100%;
        text-align: center;
        background: #f5f5f5;

    }
    .lastimg img{
        width: 250px;
        height: auto;
        margin: 5px auto;
    }
    .bottomnav{
        width: 100%;
        background: #fff;
        border-top: 1px solid #ededed;
        padding:5px 0 1px;
        text-align: center;
    }
    .bottomnav a{
        line-height: 20px;
        display: inline-block;
        width: 32%;
        text-align: center;
        font-size: 12px;
        margin-top: 1px;
    }
    .bottomnav a img{
        width: 20px;
        height: auto;
        display: block;
        text-align: center;
        margin: 0 auto;
    }
    .regclolr{
        color:#f64e4e ;
    }
    .banner{
        width: 100%;
    }
    .banner img{
        height: auto;
    }

    .indexed{
        height: 45px;
        line-height: 45px;
        margin-top: 44px;
        background: -webkit-linear-gradient(left, #fc352a, #fc5c43); /* Safari 5.1 - 6.0 */
        background: -o-linear-gradient(right,#fc352a, #fc5c43); /* Opera 11.1 - 12.0 */
        background: -moz-linear-gradient(right, #fc352a, #fc5c43); /* Firefox 3.6 - 15 */
        background: linear-gradient(to right,#fc352a, #fc5c43); /* 标准的语法 */
    }
    .down1{
        width: 8px;
        height: auto;
    }
    .fiscroll .spn{
        color: #303030;
    }

    .swiper-slide img{
        height: 155px;
        width: auto;
    }
    /*.swiper-pagination-bullets .swiper-pagination-bullet-active{
        background: #fb461c;
    }*/
    .i-p-img {
        width: 10px;
        height: auto;
        vertical-align: middle;
        margin-left: 10px;
    }

    .boxlist{
        border-bottom: 10px solid #f5f5f5;
        padding-bottom: 5px;
        background: #fff;
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

    .home-inputxt {
        border-radius: 20px;
        padding: 5px 0 4px 8px;
        width:50%;
        display: inline-block;
        background: #fff;
        line-height: 18px;
        float: right;
        margin-right: 3%;
        margin-top: 8px;
        color: #898989;
    }
    .home-inputxt img{
        width: 12px;
        height: auto;
    }

    input::-webkit-input-placeholder {
        color: #fff;
    }

    .spn {
        display: inline-block;
        max-width: 34%;
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
        height: 18px;
        line-height: 18px;
        padding: 0 2%;
        background: #fff;
        width: 96%;
        color: #303030;
    }

    .h2 span {
        float: right;
        color: #898989;
        font-size: 12px;
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
        background: #fff;
    }

    .service-item {
        width: 100%;
        padding: 15px 1%;
        height: 190px;
        background: #fff;
        overflow: hidden;
        margin-top: 45px;
    }

    .service-item ul li {
        width: 20%;
        float: left;
        text-align: center;
        height: 90px
    }

    .service-item ul li i {
        display: block;
        margin-top: 3px;
        color: #303030;
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
        color: #303030;
    }

    .down ul li:last-child {
        border: none
    }

    .h2 span img {
        width: 7px;
        height: auto;
        vertical-align: middle;
        margin-bottom: 2px;
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
        margin-top: 2px;
        color: #303030;
    }

    .name {
        margin-top: 2px
    }

    .item-name li i.price {
        color: #e94840;
    }

    .price strong {
        font-size: 16px;
        font-weight: normal
    }

    .item-name li i.home {
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
        margin-right: 1px;
        vertical-align: middle;
        margin-bottom: 4px;
    }
    .i-unit{
        font-size: 10px;
    }

</style>
