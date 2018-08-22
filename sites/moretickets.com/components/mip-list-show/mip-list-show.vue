<template>
  <div class="list-wrapper">
    <div
      v-for="(item,index) in items"
      :key="index"
      class="show-component normal">
      <a
        :data-title="item.showName"
        :href="contentLink(item.showOID)"
        data-type="mip">
        <div class="normal-content">
          <div class="left-column">
            <div class="image-contianer">
              <div
                :style="{backgroundImage: 'url('+item.posterURL+')'}"
                class="img"/>
            </div>
          </div>
          <div class="right-column-wrapper">
            <div class="right-column">
              <div
                v-if="item.discount>0 && item.discount<1 &&!item.sensitive"
                class="discount">
                <div class="number">{{ (item.discount * 10).toFixed(1) }}</div>折起
              </div>
              <div class="show-name">{{ item.showName }}</div>
              <div class="show-time">{{ item.showDate }}</div>
              <div class="show-avenue">{{ item.venueName }}</div>
              <div class="other-detail">
                <div
                  v-if="!item.sensitive"
                  class="left-part">
                  <div
                    v-if="item.showStatus.code===2 && item.minPrice>0"
                    class="tag presell">预售中</div>
                  <div
                    v-if="item.showStatus.code===3 && item.minPrice>0"
                    class="tag sell">售票中</div>
                  <div
                    v-if="item.showStatus.code===1"
                    class="tag book">未开售</div>
                  <div
                    v-if="(item.showStatus.code===2 ||item.showStatus.code===3) && item.minPrice===0"
                    class="tag lackage">暂时缺票</div>
                    <!-- <div class="tag seat-selectable" v-if="item.supportSeatPicking  || item.supportVr">可选座</div> -->
                </div>
                <div class="right-part">
                  <div
                    v-if="item.minPrice>0 && !item.sensitive"
                    class="price">
                    <span class="number">{{ item.minPrice }}</span>
                    元起
                  </div>
                </div>
                <div
                  v-if="item.advertise"
                  class="advertise">
                  <div class="decorate-icon"/>
                  {{ item.advertise }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
    <div
      v-if="items.length===0"
      class="show-component normal"
      style="text-align:center;padding-top:100px;">
      没有查到相关演出
    </div>
    <div
      v-if="unloadedCount>0"
      class="add-more"
      @click="fetchShow(nextPageOffset,activeType,keyword)">点击加载剩余{{ unloadedCount }}场演出</div>
  </div>
</template>

<style scoped lang="less">
@main-color: #ff1d41;
.box-flex(@flex){
    -moz-box-flex: @flex;
    -webkit-box-flex: @flex;
    box-flex: @flex;
    flex: @flex;
    display: block;
}
.add-more {
    position: relative;
    height: 5rem;
    line-height: 5rem;
    font-weight: 700;
    font-size: 1.4rem;
    color: rgb(255, 29, 65);
    text-align: center;
    padding: 0px;
}
.img{
  background-size: 100% 100%;
  width: 100%;
  height: 100%;
  border-radius: 2px;
  background-repeat: no-repeat;
}
.list-wrapper{
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%;
  padding: 0 4%;
  position: relative;
  z-index: 1000;
  .box-flex(1)
}
.show-component{
     font-size: 1.2rem;
    img{
        border-radius: 0.2rem;
    }
    .tag{
        padding:0 0.3rem;
        height: 1.7rem;
        text-align: center;
        border-radius: 1px;
        font-size: 12px;
        float: left;
        margin-right: 0.5rem;
        margin-bottom: 0.9rem;
        line-height: 1.7rem;
        &.seat-selectable{
            color: @main-color;;
            background-color: rgba(255, 29, 65,0.08);
        }
        &.presell{
            color: #ff6900;
            background-color: rgba(255, 105, 0,0.08)
        }
        &.sell{
            display: none;
            color: @main-color;
            border: 1px solid @main-color;
        }
        &.book{
            color: #00ae66;
            background: rgba(0, 174, 102,0.08)
        }
        &.lackage{
            color:#68676c;
            background: rgba(104, 103, 108,0.08)
        }
        &.vr{
            color: #576bff;
            background: rgba(87, 107, 255,0.08);
        }
    }
    .short-content{
        width: 10.7rem;
        .image-contianer{
            height: 15rem;
            width: 100%;
            .img{
              background-position: left top;
            }
            .discount{
                font-size: 0.9rem;
                width: 2.8rem;
                height: 3.6rem;
                color: #fff;
                border-radius: 2px;
                background-image: linear-gradient(322deg, @main-color, #ee0e87);
                text-align: center;
                box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.2);
                .number{
                    font-size: 15px;
                    font-weight: bold;
                    font-style: normal;
                }
            }
        }
        .show-name{
            padding-top: 0.7rem;
            color: #000;
            font-size: 13px;
            font-weight: 500;
            line-height: 2rem;
            max-height: 4.5rem;
            height: 4.5rem;
            overflow:hidden;
            text-overflow:ellipsis;
            display:-webkit-box;
            -webkit-box-orient:vertical;
            -webkit-line-clamp:2;
        }
        .show-time{
            color: #95949d;
            line-height: 2rem;
        }
        .price{
            font-size: 9px;
            color: #95949d;
            line-height: 2rem;
            .number{
                font-size: 14px;
                font-weight: 600;
                color: @main-color;
            }
        }
    }
    .normal-content,.vertical-content{
         width: 100%;
         padding: 1.2rem 0;
         display: inline-block;
         border-bottom: 1px solid #E4E4E4;
         .discount{
            .short-content .image-contianer .discount;
            position: absolute;
            top: 7.8rem;
            left: auto;
            right: 0;
            line-height: 1.2em;
            padding-top: 0.8rem;
            padding-left: 0;
            width: 4.2rem;
            height: 4.2rem;
            transform: none;
            background-image: linear-gradient(315deg, @main-color, #ee0e87);
            box-shadow: 0 2px 8px 0 rgba(250, 24, 88, 0.5);
            border-radius: 100%;
            text-align: center;
            .number{
                .short-content .image-contianer .discount .number;
                font-size: 18px;
                padding-bottom: 0.6rem;
            }
        }
         .left-column{
             width: 9rem;
             float: left;
         }
         .right-column-wrapper{
             float: left;
             width: 100%;
             margin-right: -9rem;
             .right-column{
                 position: relative;
                margin-right: 9rem;
                padding-left: 2.5rem;
             }
         }
        .show-name{
            width: 100%;
            color: #000;
            font-size: 1.6rem;
            line-height: 2.2rem;
            max-height: 4.4rem;
            overflow:hidden;
            text-overflow:ellipsis;
            display:-webkit-box;
            -webkit-box-orient:vertical;
            -webkit-line-clamp:2;
        }
        .show-time,.show-avenue{
            font-size: 1.3rem;
            color: #95949d;
            line-height: 1.8rem;
        }
        .show-time{
            margin-top: 0.9rem;
        }
        .show-avenue{
           line-height: 1.8rem;
           white-space: nowrap;
           text-overflow: ellipsis;
           overflow: hidden;
           margin-bottom: 0.9rem;
           padding-right: 2.5rem;
        }
        .image-contianer{
            height: 12rem;
            width:  9rem;
            float: left;
            position: relative;
            box-shadow: 0 2px 18px 0 rgba(0, 0, 0, 0.2);
            .img{
                width: 100%;
                height: 100%;
            }
        }
        .other-detail{
            width: 100%;
        }
        .common{
          height: 2rem;
          line-height: 2rem;
          width: 4.6rem;
          text-align: center;
          border-radius: 0.4rem;
          margin-right: 1px;
        }
        .seckill-common{
          height: 3rem;
          line-height: 3rem;
          width: 8rem;
          border-radius: 3rem;
          text-align: center;
        }
        .reminder{
          .seckill-common;
          color: #fff;
          background-color: #53db53;
        }
        .start-soon{
          .seckill-common;
          color: #fff;
          background-color: rgba(204, 0, 0, 0.298039215686275);
        }
        .start{
          color: #fff;
          background-color: #ec6b8a;
          .seckill-common;
        }
        .sell-out{
          color: #fff;
          background-color: #999;
          .seckill-common;
        }
        .over{
          color: #fff;
          background-color: #666;
          .seckill-common;
        }
        .right-part{
          clear: both;
        }
        .comparison{
          display: flex;
          align-items: baseline;
        }
        .comparison-price{
          color: #999;
          text-decoration: line-through;
        }
        .price{
          padding-bottom: 1.2rem;
          font-size: 1rem;
          color: #95949d;
          .number{
            color: @main-color;
            font-size: 1.8rem;
            font-weight: 600;
          }
        }
        .advertise{
          .decorate-icon{
            width: 17px;
            height: 17px;
            background-size: 7px 5px;
            display: inline-block;
            vertical-align: top;
          }
          color: #95949d;
          font-size: 13px;
          border-top: solid 1px #eaeaeb;
          padding-top: 0.6rem;
        }
    }
    .vertical-content{
      padding-bottom: 0;
      border-bottom: none;
      .content-detail{
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: flex-end;
      }
      .image-contianer{
        width: 100%;
        height: 9.7rem;
        margin-bottom: 1rem;
        box-shadow: none;
        position: static;
      }
      .price{
        padding-bottom: 0;
      }
      .discount{
        position: static;
      }
    }
}

</style>

<script>
import { httpGet } from '@/common/httpUtil'
import { templateCompile } from '@/common/urlUtil'
import * as sessionStorageUtil from '@/common/sessionStorageUtil'
import * as adapterStorageUtil from '@/common/adapterStorageUtil'
export default {
  props: {
    prefixUrl: {
      type: String,
      default: ''
    },
    showItems: {
      type: Array,
      default: () => []
    },
    activeType: {
      type: String,
      default: '1'
    },
    showListUrl: {
      type: String,
      default: ''
    },
    positionUrl: {
      type: String,
      default: ''
    },
    nextUrl: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      items: [],
      pagination: {length: 10, offset: 0, count: 0}
    }
  },
  computed: {
    unloadedCount () {
      return this.pagination && this.pagination.count > 0 && this.pagination.count - this.items.length > 0 ? this.pagination.count - this.items.length : 0
    },
    nextPageOffset () {
      return this.pagination && this.pagination.length > 0 && this.pagination.offset >= 0 ? this.pagination.offset + this.pagination.length : 0
    }
  },
  mounted () {
    let me = this
    sessionStorageUtil.syncSessionData()
    me.prefixUrl && sessionStorageUtil.set('prefix', me.prefixUrl)
    me.geoLocation(function () {
      me.fetchShow(0, 1)
    })
    MIP.watch('activeType', newValue => {
      me.fetchShow(0, newValue)
    })
    MIP.watch('keyword', newValue => {
      me.fetchShow(0, '', newValue)
    })
  },
  methods: {
    fetchShow (offset, type, keyword) {
      let _self = this
      _self.location = _self.location || sessionStorageUtil.get('geo_info')
      _self.selectedCity = adapterStorageUtil.get('selected_city') || sessionStorageUtil.get('geo_info') || {}
      let locationCityOIDQuery = _self.location.locationCityOID ? `&locationCityOID=${_self.location.locationCityOID}` : ''
      let siteCityOID = _self.selectedCity.cityOID || _self.location.siteCityOID
      let siteOID = _self.location.siteOID
      let keywordQuery = keyword ? `&key_words=${encodeURIComponent(keyword)}` : ''
      let typeQuery = type ? `&type=${type}` : ''
      let size = _self.pagination ? _self.pagination.length : 10
      let fetchUrl = templateCompile(_self.showListUrl, {siteOID, offset, size, typeQuery, locationCityOIDQuery, keywordQuery, siteCityOID})
      httpGet(fetchUrl)
        .then(function (data) {
          if (data && data.result && data.result.data) {
            _self.items = offset === 0 ? data.result.data : _self.items.concat(data.result.data)
            _self.pagination = data.result.pagination
          } else {
            _self.items = []
            _self.pagination = data.result.pagination
          }
          MIP.setData({
            loading: false
          })
        }).catch(function (err) {
          console.log(err)
        })
    },
    contentLink (id) {
      return `${this.nextUrl}#id=${id}`
    },
    geoLocation (next) {
      let me = this
      // 如果会话内定位过，不再定位，执行回调逻辑
      if (sessionStorageUtil.get('geo_ok')) {
        next && next()
        return
      }
      let fetchUrl = templateCompile(this.positionUrl)
      httpGet(fetchUrl)
        .then(function (data) {
          if (data && data.result && data.result.data) {
            me.location = data.result.data
            me.initCityName = me.location.locationCityName || me.location.siteCityName || me.location.name
            if (me.location && me.location.locationCityOID) {
              MIP.setData({'#locationCityOID': me.location.locationCityOID})
              MIP.setData({'#siteCityOID': me.location.siteCityOID})
              MIP.setData({'#siteOID': me.location.siteOID})
            }
            MIP.setData({'initCityName': me.initCityName}) // 初始化城市名称
            sessionStorageUtil.set('geo_ok', true)
            sessionStorageUtil.set('geo_info', me.location)
            next && next(me.location)
          }
        }).catch(function (err) {
          console.log(err)
        })
    }
  }
}
</script>
