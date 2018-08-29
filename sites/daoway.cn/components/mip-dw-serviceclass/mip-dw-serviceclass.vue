<template>
  <div class="wrapper">
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
            <li class="sc-r-price">{{ i.price }}<i>{{ i.price_unit }}</i>
              <span v-if="i.firstReduce">首单立减{{ i.firstReduce }}</span>
              <span v-if="i.totalReduce">满{{ i.totalReduce.total }}减{{ i.totalReduce.reduce }}</span>
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
    </div>
  </div>
</template>
<script>
import base from '../../common/utils/base'
import '../../common/utils/base.less'
export default {
  data () {
    return {
      position: JSON.parse(localStorage.getItem('position')),
      category: base.getRequest(location.href).category,
      filterAry: [],
      tag: decodeURI(base.getRequest(location.href).tag),
      item: [],
      indx: 0,
      tags: '',
      sw: true,
      ary: [],
      loding: false,
      channel: 'baidu'
    }
  },
  created () {
    window.addEventListener('scroll', this.morelist)
  },
  mounted () {
    document.title = this.tag
    let category = this.category
    let tag = this.tag
    this.nav()
    this.getServicelist(0, category, tag)
    window.addEventListener('scroll', this.morelist)
  },
  methods: {
    nav () {
      let that = this
      let category = that.category
      let url = '/daoway/rest/category/for_filter?manualCity=' + encodeURIComponent(that.position.city) + '&category=' + category + '&weidian=false&recommendOnly=true&includeChaoshi=false&includeSecondPage=false&hasChaoshi=false&hasTagImg=true&channel=' + that.channel
      fetch(url, {
        method: 'get'
      }).then(function (res) {
        return res.json()
      }).then(function (text) {
        let data = text.data[0]
        let filterAry = data.tagsInfo
        let filter = {
          name: '全部',
          url: 'http://www.daoway.cn/mip/common/images/all.png'
        }
        filterAry.unshift(filter)
        that.filterAry = filterAry
      }).catch(function (error) {
        console.error(error)
      })
    },
    getServicelist (index, category, tag) {
      let that = this
      let position = that.position
      let url = '/daoway/rest/service_items/filter?start=' + index + '&size=30&manualCity=' + encodeURIComponent(position.city) + '&lot=' + position.lot + '&lat=' + position.lat + '&category=' + category + '&channel=' + that.channel + tag
      fetch(url, {
        method: 'get'
      }).then(function (res) {
        return res.json()
      }).then(function (text) {
        let datas = text.data.items
        let ary = that.ary
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
          if (ary.length === 0) {
            this.loding = false
          }
        }
        that.item = ary
        that.sw = true
      }).catch(function (error) {
        console.error(error)
      })
    },
    tapnav (index) {
      let that = this
      that.ary = []
      let category = that.category
      that.tag = that.filterAry[index].name
      if (that.tag === '全部') {
        that.tags = ''
      } else {
        that.tags = '&tag=' + encodeURIComponent(that.tag)
      }
      that.getServicelist(0, category, that.tags)
    },
    morelist () {
      let that = this
      let category = that.category
      let index = that.ary.length
      if (document.body.scrollTop || document.documentElement.scrollTop + window.innerHeight >= document.body.offsetHeight) {
        if (that.sw === true) {
          that.sw = false
          setTimeout(() => {
            that.loding = true
          }, 500)
          that.getServicelist(index, category, that.tags)
        }
      }
    },
    todetail (id) {
      MIP.viewer.open(base.htmlhref.detail + '?detailid=' + id, { isMipLink: false })
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
        height: 80px;
        padding: 5px 0;
        background: #fff;
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
        display: block
    }

    .sc-nav mip-scrollbox[data-type="row"] [data-inner] {
        padding-left: 5px;
        padding-right: 5px
    }

    .sc-box {
        margin-top: 88px;
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
        padding: 6px 2% 4px;
    }

    .scbl-left img {
        width: 105px;
        height: 105px;
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
        border-bottom: 1px solid red;
        background: #ff7871;
        color: #fff;
    }

    .scbl-right ul li.scbl-right ul li.scbl-aciy span:first-child {
        border-bottom: 1px solid red
    }

    .scbl-right ul li.scbl-aciy {
        border: 1px solid red;
    }

    .sc-home {
        width: 16px;
        height: auto;
        position: relative;
        top: 4px;
        margin-right: 2px
    }

    .sc-r-tit {
        font-size: 15px;
        font-weight: bold;
        width: 80%;
        height: 30px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
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
        border: 1px solid red;
        font-size: 10px;
        padding: 0 2px;
        border-radius: 2px;

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
