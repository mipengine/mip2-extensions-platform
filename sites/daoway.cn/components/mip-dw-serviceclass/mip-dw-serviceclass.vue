<template>
  <div class="wrapper"><!-- v-if="!position"-->
    <mip-map
      v-if="!position"
      id="map"
      on="getPositionComplete:test.success  getPositionFailed:test.fail">
      <script type="application/json">
        {
        "ak": "epGAmM09OL7Lwy7cIu47pxzK",
        "hide-map": true,
        "get-position": true
        }
      </script>
    </mip-map>
    <div id="test"/>
    <mip-fixed type="top">
      <div class="sc-nav">
        <mip-scrollbox
          data-type="row"
          layout="fixed-height">
          <div data-wrapper>
            <div data-inner>
              <div data-scroller>
                <div
                  v-for="(f,index) in filterAry"
                  :key="f"
                  :class="{activity:tag == f.name}"
                  data-item
                  class="sc-list"
                  @click="tapnav(index)">
                  <img :src="f.url"><i>{{ f.name }}</i>
                </div>
              </div>
            </div>
          </div>
        </mip-scrollbox>
      </div>
    </mip-fixed>
    <div class="sc-box">
      <div
        v-for="i in item"
        :key="i"
        :id="i.id"
        class="sc-box-list"
        @click="todetail(i.id)">
        <div class="scbl-left">
          <img :src="i.pic_url">
        </div>
        <div class="scbl-right">
          <ul>
            <li
              class="sc-r-tit"
              v-html="i.name"/>
            <li
              class="sc-r-text"
              v-html="i.description"/>
            <li class="sc-r-price">{{ i.price }}<i>{{ i.price_unit }}</i><span v-if="i.firstReduce">首单立减{{ i.firstReduce }}</span><span v-if="i.totalReduce">满{{ i.totalReduce.total }}减{{ i.totalReduce.reduce }}</span>
            </li>
            <li class="sc-r-home"><img
              class="sc-home"
              src="https://www.daoway.cn/h5/image/home1.png" >{{ i.serviceTitle }}
              <div class="sc-home-yishou"><span v-if="i.salesNum >0">已售{{ i.salesNum }}</span><span>{{ i.positiveCommentRate }}</span></div>
            </li>
            <li class="scbl-right-fixd scbl-aciy">
              <span>最快上门</span>
              <span>{{ i.aheadHours }}</span>
            </li>
          </ul>
        </div>
      </div>
      <p
        v-if="loding"
        class="loding">加载中...</p>
      <p
        v-if="nomore"
        class="loding">~暂时只有这些了~</p>
    </div>
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
import base from '../../common/utils/base'
import '../../common/utils/base.less'
export default {
  prerenderAllowed () {
    return true
  },
  data () {
    return {
      position: base.getposition(),
      category: base.getRequest(location.href).category,
      filterAry: [],
      tag: decodeURI(base.getRequest(location.href).tag),
      item: [],
      indx: 0,
      tags: '',
      sw: true,
      ary: [],
      loding: false,
      channel: 'mip',
      nomore: false,
      startY: '',
      endY: '',
      warn: {
        // 弹窗
        show: false,
        texts: ''
      }
    }
  },
  mounted () {
    let that = this
    let category = this.category
    this.nav()
    if (this.tag === '全部') {
      // this.tags = '&tag=';
    } else {
      this.tags = '&tag=' + encodeURIComponent(this.tag)
    }
    this.getServicelist(0, category, this.tags)
    let body = this.$element.querySelector('.wrapper')
    body.addEventListener('touchstart', (e, str) => {
      let touch = e.touches[0]
      this.startY = touch.pageY
    })
    body.addEventListener('touchmove', (e, str) => {
      let touch = e.touches[0]
      this.endY = touch.pageY
      /* if(this.endY >= this.startY){
              this.morelist();
          } */
      this.morelist()
    })
    that.$on('success', (e) => {
      /* that.warn.show = true;
           that.warn.texts = JSON.stringify(e.point); */
      console.log(JSON.stringify(e.point))
      let position = localStorage.getItem('position')
      let city = e.address.city.replace(/市$/g, '') || '北京'
      if (position) {
        that.position = base.getposition()
        this.getServicelist(0, category, this.tags)
      } else {
        that.position.city = city
        that.getCommunity(e.point.lat, e.point.lng)
        this.getServicelist(0, category, this.tags)
      }
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
        this.getServicelist(0, category, this.tags)
      } else {
        if (e.address.city) {
          that.position.city = e.address.city.replace(/市$/g, '') || '北京'
        }
        if (e.point.lat && e.point.lng) {
          that.getCommunity(e.point.lat, e.point.lng)
          that.getServicelist(0, category, this.tags)
          let point = {
            lat: e.point.lat,
            lng: e.point.lng,
            city: that.city
          }
          localStorage.setItem('point', JSON.stringify(point))
        } else {
          that.toposition()
        }
      }
    })
  },
  methods: {
    getCommunity (lat, lng) {
      let that = this
      let url = 'https://www.daoway.cn/daoway/rest/community/autoPosition?lot=' + lng + '&lat=' + lat
      fetch(url, {
        method: 'get'
      }).then(function (res) {
        return res.json()
      }).then(function (text) {
        if (text.status === 'ok') {
          that.position = text.data[0]
          base.position(text.data[0])
        } else {
          that.warn.show = true
          that.warn.texts = text.msg
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    nav () {
      let that = this
      let category = that.category
      let url = 'https://www.daoway.cn/daoway/rest/category/for_filter?category=' + category + '&weidian=false&recommendOnly=true&includeChaoshi=false&includeSecondPage=false&hasChaoshi=false&hasTagImg=true&channel=' + that.channel
      if (that.position) {
        url += '&manualCity=' + encodeURIComponent(that.position.city)
      }
      fetch(url, {
        method: 'get'
      }).then(function (res) {
        return res.json()
      }).then(function (text) {
        if (text.status === 'ok') {
          let data = text.data[0]
          let filterAry = data.tagsInfo
          let filter = {
            name: '全部',
            url: 'https://www.daoway.cn/mip/common/images/all.png'
          }
          filterAry.unshift(filter)
          that.filterAry = filterAry
        } else {
          that.warn.show = true
          that.warn.texts = text.msg
        }
      }).catch(function (error) {
        console.error(error)
      })
    },
    getServicelist (index, category, tag) {
      let that = this
      let position = that.position
      let url = ''
      if (position) {
        url = 'https://www.daoway.cn/daoway/rest/service_items/filter?start=' + index + '&size=30&manualCity=' + encodeURIComponent(position.city) + '&lot=' + (position.lng || position.lot) + '&lat=' + position.lat + '&category=' + category + '&channel=' + that.channel + tag
      } else {
        url = 'https://www.daoway.cn/daoway/rest/service_items/filter?start=' + index + '&size=30' + '&category=' + category + '&channel=' + that.channel + tag
      }
      fetch(url, {
        method: 'get'
      }).then(function (res) {
        return res.json()
      }).then(function (text) {
        if (text.status === 'ok') {
          let datas = text.data.items
          let ary = that.ary
          if (datas.length > 0) {
            for (let i = 0; i < datas.length; i++) {
              let data = datas[i]
              let promotion = data.promotion
              let totalReduce = promotion.total_reduce
              let firstReduce = promotion.first_reduce
              let positiveCommentRate
              if (data.salesNum === 0) {
                positiveCommentRate = '暂无评价'
              } else {
                if (data.positiveCommentRate && data.positiveCommentRate !== '--') {
                  positiveCommentRate = '好评' + data.positiveCommentRate
                } else {
                  positiveCommentRate = '暂无评价'
                }
              }
              let obj = {
                aheadHours: data.fastestDay ? data.fastestDay : data.aheadHours + '小时',
                description: data.description,
                id: data.id,
                name: data.name,
                pic_url: data.pic_url,
                positiveCommentRate: positiveCommentRate,
                price: data.price,
                price_unit: data.price_unit,
                salesNum: data.salesNum,
                serviceTitle: data.serviceTitle,
                totalReduce: totalReduce ? totalReduce[0] : null,
                firstReduce: firstReduce || null
              }
              ary.push(obj)
            }
            that.item = ary
            that.sw = true
          } else {
            that.loding = false
            that.nomore = true
            that.sw = false
          }
        } else {
          that.warn.show = true
          that.warn.texts = text.msg
          that.loding = false
        }
      }).catch(function (error) {
        console.error(error)
      })
    },
    tapnav (index) {
      let that = this
      let category = that.category
      that.tag = that.filterAry[index].name
      if (that.tag === '全部') {
        that.tags = ''
      } else {
        that.tags = '&tag=' + encodeURIComponent(that.tag)
      }
      that.ary = []
      that.getServicelist(0, category, that.tags)
      that.loding = false
      window.scrollTo(0, 0)
    },
    morelist () {
      let that = this
      let category = that.category
      let index = that.ary.length
      if (document.body.scrollTop || document.documentElement.scrollTop + window.innerHeight >= document.body.offsetHeight) {
        if (that.sw === true && that.ary.length >= 5) {
          that.sw = false
          setTimeout(() => {
            that.loding = true
          }, 500)
          that.getServicelist(index, category, that.tags)
        } else {
          that.loding = false
        }
      } else {
        that.loding = false
      }
    },
    todetail (id) {
      MIP.viewer.open(base.htmlhref.detail + '?detailid=' + id, { isMipLink: true })
    },
    toposition () {
      MIP.viewer.open(base.htmlhref.position, {isMipLink: true})
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

    i {
        font-style: normal
    }

    li, ol {
        list-style: none
    }

    .loding{
        text-align: center;
        height: 30px;
    }
    .sc-nav {
        width: 100%;
        height: 70px;
        padding: 5px 0;
        background: #fff;
        margin-top: 44px;
        border-top: 1px solid #f5f5f5;
    }
    mip-scrollbox [data-inner]{
        margin-top: -37px;
    }

    .sc-list {
        margin: 0 10px;
        text-align: center;
        padding: 10px 0;
        font-size: 14px;
        min-width: 46px;
    }
    .activity{
        border-bottom: 2px solid red;
    }

    .sc-list img {
        width: 25px;
        height: 25px
    }

    .sc-list i {
        display: block;
        color: #303030;
    }

    .sc-nav mip-scrollbox[data-type="row"] [data-inner] {
        padding-left: 5px;
        padding-right: 5px
    }

    .sc-box {
        margin-top: 76px;
        box-sizing: border-box;
    }

    .sc-box-list {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-direction: row;
        flex-wrap: wrap;
        background: #fff;
        margin-bottom: 8px;
        padding: 5px 2% 2px;
    }

    .scbl-left img {
        width: 100%;
        height: auto;
        border-radius: 4px
    }

    .scbl-left, .scbl-right {
        display: inline-block
    }

    .scbl-left {
        width: 28%
    }

    .scbl-right {
        width: 68%
    }

    .scbl-right ul {
        position: relative;
        height: 116px
    }

    .scbl-right ul li {
        line-height: 26px
    }

    .scbl-right ul li.scbl-right-fixd {
        position: absolute;
        right: 1%;
        top: 0;
        height: 28px;
        line-height: 13px;
        border: 1px solid #ccc;
        border-radius: 4px;
        overflow: hidden
    }

    .scbl-right ul li.scbl-right-fixd span {
        display: block;
        width: 100%;
        text-align: center;
        font-size: 10px
    }

    .scbl-right ul li.scbl-aciy span {
        color: red
    }

    .scbl-right ul li.scbl-right-fixd span:first-child {
        border-bottom: 1px solid #ccc
    }

    .scbl-right ul li.scbl-aciy span:first-child {
        border-bottom: 0.5px solid red;
        background: #ff7871;
        color: #fff;
    }

    .scbl-right ul li.scbl-right ul li.scbl-aciy span:first-child {
        border-bottom: 1px solid red
    }

    .scbl-right ul li.scbl-aciy {
        border: 0.5px solid red;
    }

    .sc-home {
        width: 16px;
        height: auto;
        position: relative;
        top: 4px;
        margin-right: 1px
    }

    .sc-r-tit {
        font-size: 15px;
        font-weight: bold;
        width: 78%;
        height: 30px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: #4c4c4c;
    }

    .sc-r-text {
        width: 98%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        color: #898989;
    }

    .sc-r-price {
        font-size: 18px;
        color: red;
    }

    .sc-r-price i {
        font-size: 12px;
    }
    .sc-r-price span{
        border: 0.5px solid red;
        font-size: 10px;
        padding: 0 2px;
        border-radius: 2px;
        display: inline-block;
        height: 15px;
        line-height: 15px;
        margin-left: 1px;
        margin-right: 2px;

    }

    .sc-home-yishou {
        float: right;
    }

    .sc-home-yishou span {
        margin-right: 5px;
        font-size: 12px
    }
    .sc-r-home,.sc-r-home div,.sc-r-home span{
        font-size: 12px;
        color: #898989;
    }

</style>
