<template>
  <div class="wrapper">
    <mip-fixed
      class="fixtop"
      type="top">
      <div class="fix">
        <div class="inputxt">
              <img src="https://www.daoway.cn/mip/common/images/search2.png">
              <input
                v-model="searchText"
                :placeholder="searchText ? searchText:'搜索本地商家、上门服务'"
                class="searchinput"
                type="search"
                @input="autosearch(searchText)"
                @keyup.13="completeWords(searchText)">
        </div>
        <div
          class="clear"
          @click="completeWords(searchText)">搜索</div>
      </div>
    </mip-fixed>
    <div class="sc-box">
      <div v-if="changeSearchView">
        <div
          v-for="i in searchList"
          :key="i"
          :id="i.id"
          class="sc-box-list"
          @click="todetail(i.id,i.inDistanceScope)">
          <div class="scbl-left">
            <img :src="i.pic_url">
            <div
              v-if="!i.inDistanceScope"
              class="posimg"><img src="https://www.daoway.cn/mip/common/images/position2.png"><div>地址超出服务范围</div></div>
          </div>
          <div class="scbl-right">
            <ul>
              <li
                class="sc-r-tit"
                v-html="i.name"/>
              <li
                class="sc-r-text"
                v-html="i.description"/>
              <li class="sc-r-price">{{ i.price }}<i>{{ i.price_unit }}</i><span v-if="i.promotion.first_reduction">首单立减{{ i.promotion.first_reduction[0].reduce }}</span><span
                v-if="i.promotion.total_reduce">满{{ i.promotion.total_reduce[0].total }}减{{ i.promotion.total_reduce[0].reduce }}</span>
              </li>
              <li class="sc-r-home"><img
                class="sc-home"
                src="https://www.daoway.cn/h5/image/home1.png">{{ i.serviceTitle }}
                <div class="sc-home-yishou"><span v-if="i.salesNum >0">已售{{ i.salesNum }}</span><span v-if="i.positiveCommentRate==='--'">暂无评价</span><span v-else>好评{{ i.positiveCommentRate }}</span>
                </div>
              </li>
              <li class="scbl-right-fixd scbl-aciy">
                <span>最快上门</span>
                <span>{{ i.fastestDay?i.fastestDay:i.aheadHours +'小时' }}</span>
              </li>
            </ul>
          </div>
        </div>
        <p
          v-if="loding"
          class="loding">加载中...</p>
      </div>
      <div v-if="!changeSearchView">
        <div class="searchdiv">
          <div
            v-for="m in autoCompleteWords"
            :key="m"
            class="searchValue"
            @click="completeWords(m)">{{ m }}</div>
        </div>
      </div>
      <div
        v-if="noitems && searchList <= 0"
        class="noitems">
        <img src="https://www.daoway.cn/mip/common/images/noservices.png">
        <p>没有找到相关的服务</p>
      </div>
    </div>
      <div
              v-show="warn.show"
              class="layer">
          <div class="layer-content zoomIn">
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
      ary: [],
      warn: {
        show: false,
        texts: ''
      },
      loding: false,
      channel: 'mip',
      nomore: false,
      searchText: localStorage.getItem('searchText') ||decodeURIComponent(base.getRequest(location.href).searchText),
      changeSearchView: true,
      autoCompleteWords: [],
      searchList: [],
      totalNum: 0, // 项目总条数
      noitems: false,
      sw: true
    }
  },

  mounted () {
      if(!this.searchText || this.searchText === 'undefined'){
          this.searchText = ''
      }
    this.getsearch()
    let body = this.$element.querySelector('.wrapper')
    body.addEventListener('touchstart', (e, str) => {
      let touch = e.touches[0]
      this.startY = touch.pageY
    })
    body.addEventListener('touchmove', (e, str) => {
      let touch = e.touches[0]
      this.endY = touch.pageY
      this.morelist()
    })
    // window.addEventListener('scroll', this.morelist)
  },
  methods: {
    getsearch () {
      let that = this;
      let start = that.searchList.length
      let position = that.position
      let url = 'https://www.daoway.cn/daoway/rest/service_items/search?start=' + start + '&size=30&manualCity=' + encodeURIComponent(position.city) + '&lot=' + (position.lot || position.lng) + '&lat=' + position.lat + '&text=' + (that.searchText? encodeURIComponent(that.searchText):'' )+ '&sort_by=auto&sort=desc&channel=' + that.channel
      fetch(url, {
        method: 'get'
      }).then(function (res) {
        return res.json()
      }).then(function (text) {
        if (text.status === 'ok') {
          let items = text.data.items
          if (items.length > 0) {
            that.searchList = that.searchList.concat(items)
            that.totalNum = text.data.totalNum
            that.sw = true
            that.loding = false
          } else {
            that.sw = false
            that.noitems = true
            that.loding = false
          }
        } else {
          that.warn.show = true
          that.warn.texts = text.msg
        }
      }).catch(function (error) {
        console.error(error)
      })
    },
    autosearch (searchText) {
      let that = this
      let url = 'https://www.daoway.cn/daoway/rest/services/auto_complete_words?word=' + encodeURIComponent(searchText) + '&channel=' + that.channel
      fetch(url, {
        method: 'get'
      }).then(function (res) {
        return res.json()
      }).then(function (text) {
        if (text.status === 'ok') {
          let data = text.data
          if (data.length > 0) {
            // that.searchText = searchText;
            that.autoCompleteWords = data
            that.changeSearchView = false
          } else {
            that.autoCompleteWords = []
            that.changeSearchView = true
            that.noitems = true
          }
        } else {
          that.warn.show = true
          that.warn.texts = text.msg
        }
      }).catch(function (error) {
        console.error(error)
      })
    },
    completeWords: function (m) {
      let that = this
      that.searchText = m
      that.changeSearchView = true
      that.searchList = []
      window.scrollTo(0, 0)
      that.getsearch()
    },
    clear () {
      this.searchText = ''
      this.changeSearchView = true
    },
    morelist () {
      let that = this
      if ((document.body.scrollTop || document.documentElement.scrollTop) + window.innerHeight >= document.body.offsetHeight) {
        if (that.sw === true) {
          that.sw = false
          setTimeout(() => {
            that.loding = true
          }, 500)
          that.getsearch()
        };
      } else {
        that.loding = false
      }
    },
    todetail (id, inDistanceScope) {
      MIP.viewer.open(base.htmlhref.detail + '?detailid=' + id + '&inDistanceScope=' + inDistanceScope, { isMipLink: true })
    },
      closeLayer(){
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

    .fixtop {
        margin-top: 44px;
        border-top: 1px solid #f5f5f5;
        border-bottom: 1px solid #f5f5f5;
        padding-left: 4%;
        background: #fff;
    }
    .searchdiv{
        background: #fff;
    }
    .searchinput {
        padding-left: 4%;
        border-radius: 4px;
        font-size: 14px;
        width: 90%;
        height: 32px;
    }

    .inputxt {
        width: 80%;
        position: relative;
        display: inline-block;
        border: 1px solid #898989;
        height: 34px;
        padding-left: 2%;
        border-radius: 4px;
    }

    .searchValue {
        line-height: 36px;
        border-bottom: 1px solid #f5f5f5;
        padding-left: 6%;
        text-align: left;
        color: #303030;
    }
    .fix{
        height: 46px;
    }

    .fix .clear {
        margin-top: 0;
        font-size: 14px;
        display: inline-block;
        width: 15%;
        text-align: center;
    }

    .loding {
        text-align: center;
        height: 30px;
    }

    .noitems {
        padding-top: 40%;
        text-align: center;
        width: 100%;
    }

    .noitems img {
        width: 190px;
        height: auto;
    }
    .noitems p{
        margin-top: 20px;
        color: #898989;
    }

    mip-scrollbox [data-inner] {
        margin-top: -37px;
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
        margin-top: 54px;
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
        width: 28%;
        position: relative;
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

    .sc-r-price span {
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

    .sc-r-home, .sc-r-home div, .sc-r-home span {
        font-size: 12px;
        color: #898989;
    }
    .posimg{
        position: absolute;
        top:0 ;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        color: #fff;
        text-align: center;
        padding-top: 34%;
    }
    .posimg img{
        width: 12px;
        height: auto;
        vertical-align: middle;
    }

    .posimg div{
        width: 52px;
        margin-left: 3px;
        font-size: 12px;
        display: inline-block;
        vertical-align: middle;
    }
    .inputxt img{
        width: 14px;
        height: auto;
        vertical-align: middle;
    }

</style>
