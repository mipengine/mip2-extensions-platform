<template>
  <div class="wrapper">
    <div
      v-if="positionpage"
      id="position">
      <div class="fids">
        <div class="position">{{ city }}</div>
        <div class="inputxt">
          <div
            class="inputButton"
            @click="searchcommunity()"><img
              class="icon-small"
              src="http://www.daoway.cn/images/serch.png">搜索您所在的小区</div>
        </div>
      </div>
      <div class="box">
        <div>
          <div
            v-if="useraddr.length >0"
            class="usedadd">我的常用地址</div>
          <div
            v-if="useraddr.length >0"
            class="noborder">
            <div
              v-for="i in useraddr"
              :key="i"
              :position="i"
              class="listadd"
              @click="tapback(i)">
              <img
                class="p-icon"
                src="https://www.daoway.cn/h5/image/position.png">
              <div class="addname">
                <div class="addcur">{{ i.contactPerson }} {{ i.phone }}
                </div>
                <div class="lin">
                  <div class="lin">{{ i.city }}{{ i.area }}{{ i.name }}{{ i.doorNum }}</div>
                </div>
              </div>
            </div>
            <div
              v-if="tapshow"
              class="bottomarrow"
              @click="taptoggle">展开全部地址 ∨</div>
            <div
              v-else
              class="bottomarrow"
              @click="taptoggle" >收起部分地址 ∧</div>
          </div>
        </div>
        <div
          class="usedadd"
          style="margin-top:0">附近小区</div>
        <div
          v-for="p in community"
          :key="p"
          :position="p"
          class="listadd"
          @click="tapback(p)">
          <img
            class="p-icon"
            src="https://www.daoway.cn/h5/image/position.png">
          <div class="addname">
            <div class="addcur">{{ p.name }}
            </div>
            <div class="lin">{{ p.addr }}</div>
          </div>
        </div>
      </div>

    </div>
    <div
      v-if="communitypage"
      id="community">
      <div class="fids">
        <div class="selectCity">
          <div
            class="c-position"
            @click="tocity()">{{ city }}</div><i>▼</i>
        </div>
        <div class="c-inputxt">
          <img
            class="c-icon-small"
            src="http://www.daoway.cn/images/serch.png" >
          <input
            v-model="searchval"
            class="com-input"
            placeholder="搜索您所在的小区"
            type="text"
            @input="getlist">
        </div>
        <div
          class="clear"
          @click="clear">取消</div>
      </div>
      <div class="listbox">
        <div
          v-for="c in cityList"
          :key="c"
          :position="c"
          class="list"
          @click="tapback(c)">
          <div class="listLeft">
            <div class="listadd">{{ c.name }}</div>
            <div class="liststreet">{{ c.addr?c.addr:"" }}</div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="citypage"
      id="city">
      <div
        id="all"
        class="scroll-div-right">
        <div
          id="cityLocation"
          class="pos">定位</div>
        <div class="position-city">北京</div>
        <div
          id="cityHot"
          class="pos">热门</div>
        <div class="positon-item">
          <div
            v-for="h in hot"
            :key="h"
            class="item"
            @click="tocommunity(h.name)">{{ h.name }}</div>
        </div>
        <div
          v-for="i in cityLists"
          :key="i"
          class="citydiv" >
          <div
            :id="i.title"
            class="pos">{{ i.title }}</div>
          <div class="city">
            <div
              v-for="v in i.value"
              :key="v"
              @click="tocommunity(v.name)">{{ v.name }}</div>
          </div>
        </div>
      </div>
      <div class="right">
        <mip-fixed type="right">
          <div><a href="#all">*</a></div>
          <div
            v-for="m in cityLists"
            :key="m"><a :href="'#'+ m.title">{{ m.title }}</a></div>
        </mip-fixed>
      </div>
    </div>
  </div>
</template>

<script>
import base from '../../common/utils/base'
import '../../common/utils/base.less'
export default {
  data () {
    return {
      channel: 'baidu',
      zoom: 3,
      city: '',
      warn: {
        // 弹窗
        show: false,
        texts: ''
      },
      community: [],
      useraddr: [],
      useraddr2: [],
      useraddr3: [],
      cityList: {},
      searchval: '',
      cityLists: [],
      ak: true,
      positionpage: true,
      communitypage: false,
      citypage: false,
      tapshow: false,
      taphide: false,
      userId: '',
      token: ''
    }
  },
  mounted () {
    let userId = localStorage.getItem('mipUserId')
    let token = localStorage.getItem('mipToken')
    if (userId && token) {
      this.userAddress(userId)
    }
    this.handler()
  },
  methods: {
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
          that.getCommunity(tempLot, tempLat)
        } else {
          this.warn.show = true
          this.warn.texts = text.msg
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    getCommunity (lot, lat) {
      let that = this
      let url = '/daoway/rest/community/autoPositionMerge?lot=' + lot + '&lat=' + lat
      fetch(url, {
        method: 'get'
      }).then(function (res) {
        return res.json()
      }).then(function (text) {
        let data = text.data
        that.community = data.communities
      }).catch(function (error) {
        console.log(error)
      })
    },
    userAddress (userId) {
      let that = this
      let url = '/daoway/rest/user/' + userId + '/getUserAddress' + '?channel=' + that.channel
      fetch(url, {
        method: 'get',
        credentials: 'include'
      }).then(function (res) {
        return res.json()
      }).then(function (text) {
        if (text.status === 'ok') {
          that.useraddr2 = text.data
          if (text.data.length > 2) {
            that.tapshow = true
            that.useraddr = text.data.slice(0, 2)
          }
          that.useraddr3 = text.data.slice(0, 2)
        } else {
          that.warn.show = true
          that.warn.texts = text.msg
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    taptoggle () {
      if (this.tapshow) {
        this.tapshow = false
        this.useraddr = this.useraddr2
      } else {
        this.tapshow = true
        this.useraddr = this.useraddr3
      }
    },
    tapback (i) {
      base.position(i)
      MIP.setData({'#position': i})
      MIP.viewer.page.back()
    },
    searchcommunity: function () {
      this.positionpage = false
      this.communitypage = true
    },
    clear () {
      this.searchval = ''
      this.cityList = []
    },
    getlist () { // community
      let that = this
      let url = '/daoway/rest/community/searchMerge?manualCity=' + encodeURIComponent(this.city) + '&search=' + this.searchval + '&channel=' + that.channel
      fetch(url, {
        method: 'get'
      }).then(function (res) {
        return res.json()
      }).then(function (text) {
        if (text.status === 'ok') {
          that.cityList = text.data
        } else {
          that.warn.show = true
          that.warn.texts = text.msg
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    tocity () {
      this.positionpage = false
      this.communitypage = false
      this.citypage = true
      this.citylist()
    },
    citylist () {
      let that = this
      let url = '/daoway/rest/community/city_list?channel=' + that.channel
      fetch(url, {
        method: 'get'
      }).then(function (res) {
        return res.json()
      }).then(function (text) {
        let datas = text.data
        that.hot = datas.hot
        let items = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
        let ary = []
        for (let i = 0; i < items.length; i++) {
          let item = items[i]
          let data = datas[item]
          if (data.length > 0) {
            ary.push({
              'title': item.toUpperCase(),
              'value': data
            })
          }
        }
        that.cityLists = ary
      }).catch(function (error) {
        console.log(error)
      })
    },
    tocommunity (city) {
      this.city = city
      this.positionpage = false
      this.communitypage = true
      this.citypage = false
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
    .position{display: inline-block; width: 80px}
    .fids{background: #fff; padding: 10px 3%}
    .inputxt{width: 76%; display: inline-block}

    .fids .inputButton {
        width:94%;
        height: 25px;
        line-height: 25px;
        text-align: center;
        font-size: 14px;
        color: #898989;
        margin: 0;
        background: #ddd;
        border-radius: 14px;
    }

    .usedadd {
        padding-left: 3%;
        width: 97%;
        height:30px;
        line-height: 30px;

        font-size: 14px;
    }

    .listadd {
        width: 100%;
        padding: 12px 2% 0;
        background: #fff;
    }

    .listadd img {
        width: 12px;
        height: 12px;
        display: inline-block;
        vertical-align: top;
        margin: 0 3%;
    }

    .addname {
        display: inline-block;
        width: 88%;
        line-height: 20px;
        border-bottom: 1px solid #e5e5e5;
        padding-bottom: 7px;
    }

    .addname div {
        display: inline-block;
    }

    .lin {
        font-size: 14px;
        color: #898989;
        margin-top: 2px
    }

    .lin div {
        display: inline-block;
        margin-right: 5px;
    }

    .listadd:last-child .addname {
        border: none;
    }
    .noborder{background: #fff}

    .noborder .listadd:last-child .addname {
        border: none;
    }

    .addcur {
        width: 100%;
    }

    .bottomarrow {
        text-align: center;
        width: 100%;
        height: 40px;
        line-height: 40px;
        font-size: 14px;
    }

    .botrow {
        position: relative;
        display: inline-block;
        bottom: 9px;
        left: 5px;
    }

    .top-arrow1, .top-arrow2 {
        width: 0;
        height: 0;
        display: block;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 5; /*兼容ie8-*/
        border-top: 6px transparent dashed;
        border-left: 6px transparent dashed;
        border-right: 6px transparent dashed;
        border-bottom: 6px white solid;
        overflow: hidden;
    }

    .top-arrow1 {
        border-bottom: 6px #4c4c4c solid;
    }

    .top-arrow2 {
        top: 1px; /*重要*/
        border-bottom: 6px white solid;
    }
    .p-icon{
        width: 12px;
        height: auto;
        position: relative;
        top:3px
    }
    .icon-small{
        width: 15px;
        height: auto;
        position: relative;
        top:3px;
        margin-right: 5px;
    }

    .com-input{
        padding-left:16%;height:25px;
    }

    .list {
        border-bottom: 1px solid #e5e5e5;
        padding: 10px 3%;
    }

    .listLeft {
        display: inline-block;
        height: 20px;
        width: 96%;
    }

    .liststreet {
        color: #898989;
        font-size: 14px;
    }

    .listbox {
        width: 100%;
        background: #fff;
    }

    .fids .selectCity {
        height: 40px;
        line-height: 40px;
        margin: 0 3px;
        display: inline-block;
    }
    .c-position{
        display: inline-block;
    }
    .fids .c-inputxt{
        display: inline-block;
        background: #ddd;
        height: 30px;
        line-height: 30px;
        border-radius: 16px;
        width: 70%;
    }
    .c-inputxt input{
        width: 66%;
        display: inline-block;
        background: none;

    }
    .c-icon-small{
        width: 15px;
        height: auto;
        position: relative;
        top:4px;
        left: 5%;
    }
    .clear{display: inline-block}
    .city div {
        width: 100%;
    }

    .pos {
        padding: 0 2%;
        width: 96%;
        background: #ebebeb;
        height: 30px;
        line-height: 30px;
    }

    .position-city {
        padding-left: 5%;
        line-height: 30px;
        width: 100%;
    }

    .positon-item {
        margin: 10px 0;
        width: 96%;
    }

    .item {
        width: 21%;
        margin: 5px 1.2% 0;
        border: 1px solid #e5e5e5;
        height: 27px;
        line-height: 27px;
        text-align: center;
        display: inline-block;
        border-radius: 3px;
        background: #f5f5f5;
        font-size: 14px;
    }

    .city {
        width: 94%;
        margin: 0 auto;
    }

    .city div {
        line-height: 33px;
        width: 100%;
        border-bottom: 1px solid #e5e5e5;
    }

    .city div:last-child {
        border: none;
    }

    .right {
        width: 30px;
        text-align: center;
        line-height: 17px;
        font-size: 14px;
    }
    .right div{
        margin-top: 5px;
    }

    .positonimg {
        float: right;
        margin: 5px 10% 5px 0;
    }

</style>
