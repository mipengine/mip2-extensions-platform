<template>
  <div
    class="vbox flex-column"
    style="background-color:#f2f2f2;">
    <!-- <div class="header_title header_title_bg" ng-show="!hidetitle" >
      <div class="pull-left">
          <div @click="back()" class="icon-back"> </div>
      </div>
      <div class="title">选择城市</div>
  </div> -->
    <div
      ref="selectCity"
      class="selectCity"
      style="background-color:#f2f2f2;padding:0 15px;padding-right: 40px;position:relative;">

      <div
        id="type1"
        ref="type1"
        class="city-type-title">定位城市</div>
      <div
        :class="{'active':site.siteCityOID===locationCity.locationCityOID}"
        class="city-item"
        ng-if="locationCity.locationCityName"
        @click="switchPositionCity(locationCity,false)">{{ locationCity.locationCityName }}</div>
      <div
        v-if="!locationCity.locationCityName"
        class="fail-location"
        @click="getLocation()">无法获取，点击刷新<div style="display:inline-block;width:12px;"><mip-img
          layout="container"
          src="~@/static/icon/refresh_site.png"
          alt=""
          width="12"
          height="12"/></div></div>
      <div
        id="type2"
        ref="type2"
        class="city-type-title">最近访问的城市</div>
      <div class="city-wrap">
        <div
          v-for="(ct,index) in historyCitys"
          :class="{'active':site.siteCityOID===ct.cityOID}"
          :key="index"
          class="city-item"
          @click="selectedCity(ct,false)">{{ ct.cityName }}</div>
      </div>

      <div
        id="type3"
        ref="type3"
        class="city-type-title">热门城市</div>
      <div class="city-wrap" >
        <div
          v-for="(ct,index) in cities.hotCities"
          :class="{'active':site.siteCityOID===ct.cityOID}"
          :key="index"
          class="city-item"
          @click="selectedCity(ct,true)">{{ ct.cityName }}</div>
      </div>
      <div
        v-for="(type,index) in cities.allCities"
        :key="index">
        <div
          :id="type.title"
          class="city-type-title">{{ type.title }}</div>
        <div class="all-city-wrap">
          <div
            v-for="(ct,index) in type.cities"
            :class="{'active':site.siteCityOID===ct.cityOID}"
            :key="index"
            class="all-city-item"
            @click="selectedCity(ct,true)">{{ ct.cityName }} <i/></div>
        </div>
      </div>

    </div>
    <div class="sitebar-city">
      <ul>
        <li><a
          href="javascript:void(0);"
          @click="scrollByType('type1')">定位</a></li>
        <li><a
          href="javascript:void(0);"
          @click="scrollByType('type2')">历史</a></li>
        <li><a
          href="javascript:void(0);"
          @click="scrollByType('type3')">热门</a></li>
        <li
          v-for="(ct,index) in cities.allCities"
          :key="index"
          :ref="ct.title"><a
            href="javascript:void(0);"
            @click="scrollByType(ct.title)">{{ ct.title }}</a></li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="less">
.selectCity {
  background: #fff;
  margin: 0;
  -ms-flex: 1;
  flex: 1;
  overflow-y: auto;
  background-color: #f2f2f2;
  padding: 0 15px;
  padding-right: 40px;
  position: relative;
}
ul li{
  list-style-type: none;
}
.city-type-title{
  font-size: 14px;
  letter-spacing: -0.2px;
  color: #aaaaaa;
  margin-bottom:12px;
  margin-top:15px;
}
.city-item{
    width: 30%;
    max-height: 40px;
    line-height:40px;
    text-align:center;
    border-radius: 4px;
    background-color: #ffffff;
    font-size: 16px;
    margin-bottom:15px;
    margin-right: 5%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.fail-location{
    font-size: 16px;
    color: #108ee9;
    width: auto;
    text-align: left;
    background-color: transparent;
    line-height: 20px;
}
.city-item:nth-child(3n){
    margin-right: 0;
}
.city-item.active{
    border: solid 1px #fd6857;
    color:#fd6857;
}
.all-city-item.active i{
    height: 7px;
    width: 14px;
    border-left: solid 2px #fd6857;
    border-bottom: solid 2px #fd6857;
    display: inline-block;
    transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
    -o-transform: rotate(-45deg);
    border-radius: 2px;
    margin-top: 18px;
}
.city-wrap{
    display:flex;
    align-items: center;
    justify-content:left;
    flex-flow:row wrap;
}
.all-city-wrap{
    margin: 0 -40px 0 -15px;
    padding: 0 40px 0 15px;
    background:#fff;
}
.all-city-item{
    line-height:45px;
    height:45px;
    background-color:#fff;
    font-size: 16px;
    padding-left:10px;
    color: #494949;
    border-bottom:0.5px solid #e4e4e4;
}
.sitebar-city{
    position:absolute;
    top:94px;
    right:6px;
    color: #108ee9;
    font-size:12px;
    line-height:18px;
    text-align:center;
    ul>li>a{
        color:#108ee9;
    }
}
.all-city-wrap .all-city-item:last-child{
    border-bottom:0;
}
</style>

<script>
import { httpGet, httpPost } from '@/common/httpUtil'
import { templateCompile } from '@/common/urlUtil'
import * as adapterStorageUtil from '@/common/adapterStorageUtil'
import * as sessionStorageUtil from '@/common/sessionStorageUtil.js'
export default {
  props: {
    prefixUrl: {
      type: String,
      default: ''
    },
    cityListUrl: {
      type: String,
      default: ''
    },
    positionUrl: {
      type: String,
      default: ''
    },
    saveCityUrl: {
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
      cities: {
        allCities: [],
        hotCities: []
      },
      locationCity: {},
      historyCitys: [],
      site: {}
    }
  },
  mounted () {
    sessionStorageUtil.syncSessionData()
    this.prefixUrl && sessionStorageUtil.set('prefix', this.prefixUrl)
    console.log('选择城市')
    let me = this
    me.geoLocation()
    httpGet(me.cityListUrl).then(function (data) {
      if (data.statusCode === 200) {
        me.cities = data.result
      }
    })
    me.site = adapterStorageUtil.get('selected_city') ? adapterStorageUtil.get('selected_city') : {}
    me.historyCitys = adapterStorageUtil.get('history-site') ? adapterStorageUtil.get('history-site') : []
  },
  methods: {
    geoLocation (next) {
      let me = this
      let fetchUrl = this.positionUrl
      fetchUrl && httpGet(fetchUrl).then(function (data) {
        if (data && data.result && data.result.data && data.statusCode === 200) {
          me.location = data.result.data
          me.locationCity = data.result.data
          me.locationCity.locationCityName = me.locationCity.locationCityName || me.locationCity.name
          if (me.location && me.location.locationCityOID) {
            MIP.setData({'#locationCityOID': me.location.locationCityOID})
            MIP.setData({'#siteCityOID': me.location.siteCityOID})
            MIP.setData({'#siteOID': me.location.siteOID})
          }
          next && next(me.location)
        }
      }).catch(function (err) {
        console.log(err)
      })
    },
    addHistoryCity (city) {
      // 有就不加 没有如果前面不满足三个 加 如果满足三个 则剔除第一个 末尾加一个
      let hasHis = false
      let me = this
      let historyCitys = me.historyCitys
      if (historyCitys.length > 0) {
        for (let i = 0; i < historyCitys.length; i++) {
          let historyCity = historyCitys[i]
          if (historyCity.cityOID === city.cityOID) {
            hasHis = true
          }
        }
      }
      if (!hasHis) {
        if (historyCitys.length < 3) {
          historyCitys.unshift(city)
          me.historyCitys = historyCitys
          adapterStorageUtil.set('history-site', historyCitys)
        } else {
          historyCitys.splice(historyCitys.length - 1, 1)
          historyCitys.unshift(city)
          me.historyCitys = historyCitys
          adapterStorageUtil.set('history-site', historyCitys)
        }
      }
    },
    selectedCity (city, notHistoryCityClick) {
      let me = this
      let cityOID = city.cityOID
      let fetchUrl = templateCompile(this.saveCityUrl, {cityOID})
      httpPost(fetchUrl).then(function (data) {
        city.siteOID = city.siteOID || city.cityOID// 写个兼容方案 新的cityOID 认为是站点OID,逻辑后台处理
        city.siteCityOID = city.cityOID
        // $rootScope.site =
        me.site = city
        // $rootScope.site.name= me.site.cityName;

        let cityOID = city.cityOID
        let cityName = me.site.cityName
        let cityPinYin = me.site.spelling
        adapterStorageUtil.set('selected_city', JSON.stringify(city))
        adapterStorageUtil.set('site_city', JSON.stringify({cityOID: cityOID, cityName: cityName, cityPinYin: cityPinYin}))
        notHistoryCityClick && me.addHistoryCity(city)
        me.nextUrl && MIP.viewer.open(me.nextUrl)
      })
    },
    switchPositionCity (locationCity, notHistoryCityClick) {
      let city = {cityName: locationCity.locationCityName || locationCity.siteCityName, cityOID: locationCity.locationCityOID || locationCity.siteCityOID, province: locationCity.name, spelling: '', siteOID: locationCity.siteOID}
      this.selectedCity(city, notHistoryCityClick)
    },
    scrollByType (siteEle) {
      console.log(this.$refs[siteEle])
      let offsetTop = this.$refs[siteEle][0].offsetTop
      console.log(offsetTop)
      // this.$refs["selectCity"].scrollTop = offsetTop;
      document.body.scrollTop = offsetTop
      MIP.util.rect.setScrollTop(offsetTop)
      // var positionTop = $('#'+siteEle).position().top;
      // $('.selectCity').scrollTop(positionTop);
    }
  }
}
</script>
