<template>
  <div>
    <div class="car-infor car-infor-bottom">
      <div class="car-title">
        <span class="car-desc">{{ carInfo.carname }}</span>
      </div>
      <div class="price-info ">
        <div
          v-if="carInfo.panel_price != 0"
          class="car-price-content">
          <span class="car-price">{{ carInfo.panel_price }}</span>
          <span
            v-if="carInfo.panel_price"
            class="car-price-unit">万</span>
          <!-- <img class="car-price-trend" src="https://s1.xinstatic.com/static/newcar-m/imgs/car-detail/price-trend_c4e8f6d.png" /> -->
          <div
            v-if="beyondUrl"
            class="beyond-value-box"
            @click="beyondCompare">
            <mip-img
              class="car-price-trend"
              src="https://s1.xinstatic.com/static/newcar-m/imgs/car-detail/price-trend_c4e8f6d.png" />
            <span class="beyond-value" >车价超值</span>
            <div class="next-page next-page-overcolor"/>
          </div>
        </div>
      </div>
    </div>
    <div
      :class="{'spokes-person-pricebottom' : showSimilarmodule || showMessage}"
      class="spokes-person-price">
      <div
        v-if="carInfo.show_price && carInfo.monthly_price"
        class="open-fanice">
        <span
          v-if="carInfo.is_direct_rent_car == 1"
          class="pay-detail"> 一成首付{{ carInfo.show_price }} 月供{{ carInfo.monthly_price }} </span>
        <span
          v-if="carInfo.is_direct_rent_car == 0"
          class="pay-detail"> 首付{{ carInfo.show_price }} 月供{{ carInfo.monthly_price }} </span>
        <div
          class="car-fanice-see"
          @click="openFance">
          <span>查看详细金融方案</span>
          <div class="next-page-color next-page "/>
        </div>
      </div>
      <div
        v-if="!showMessage && carInfo.panel_price && showSimilarmodule"
        class="open-car-allmessagebox"
        @click="openMessage">
        <div class="open-car-allmessage">
          <div>展开全部车辆信息</div>
          <div class="show-carmessage-icon">
            <div class="open-message-icon1"/>
            <div
              class="open-message-icon2"
              style="margin-top: -0.02rem;"/>
          </div>
        </div>

      </div>
    </div>

    <div
      v-if="showMessage || !showSimilarmodule"
      class="car-params">
      <div class="bdline">
        <div class="car-params-title">
          <span class="car-file">车辆档案</span>
          <!-- <span class="car-shelf-time">今日上架</span> -->
        </div>
      </div>
      <div class="driveInfo">
        <div class="drive-info-list">
          <div class="driveList drive-width">
            <div>
              <span class="driveKey">{{ regist_date.title }}</span>
            </div>
            <div class="driveValue">
              <span>{{ regist_date.value }}</span>
            </div>
          </div>
          <div class="driveList drive-width">
            <div>
              <span class="driveKey">{{ mileage.title || '表显里程' }}</span>
            </div>
            <div class="driveValue">
              <span>{{ mileage.value }}</span>
            </div>
          </div>
          <div class="driveList get-car">
            <div>
              <span class="driveKey">{{ emission.title || "排放标准" }}</span>
            </div>
            <div class="driveValue">
              <span>{{ emission.value }}</span>
            </div>
          </div>
        </div>
        <div
          :class="{'drive-list-bottom' : needCcid.length > 0}"
          class="drive-info-list">
          <div class="driveList drive-width">
            <!-- <div>
                        <span class="driveKey">上架时间</span >
                    </div>
                    <div class="driveValue">
                        <span>2017.05.16</span >
                    </div> -->
            <div>
              <span class="driveKey">{{ color.title || "颜色" }}</span>
            </div>
            <div class="driveValue">
              <span>{{ color.value }}</span>
            </div>
          </div>
          <div class="driveList drive-width ">
            <div>
              <span class="driveKey">{{ engine_type.title || "涡轮增压" }}</span>
            </div>
            <div class="driveValue">
              <span>{{ engine_type.value }}</span>
            </div>
          </div>
          <!-- <div class="driveList get-car">
            <div>
              <span class="driveKey">所在城市</span>
            </div>
            <div class="driveValue">
              <span>{{北京}}</span>
            </div>
          </div> -->
          <div
            v-if="lift_time.title && lift_time.value"
            class="driveList get-car">
            <div>
              <span class="driveKey">{{ lift_time.title }}</span >
            </div>
            <div class="driveValue">
              <span >{{ lift_time.value }}</span >
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="needCcid.length > 0"
        class="car-set">
        <div
          v-for="(item, index) in needCcid"
          v-if="index < 4"
          :key="index"
          class="car-set-content">
          <div
            class="paramsInfo car-set-config"
            @click="openConfig(item.jump_page)">
            <mip-img
              :src="imageTitle + item.u_icon"
              class="paramsIcon" />
            <div class="car-highlight">
              <span class="paramName">{{ item.ccname }}</span>
            </div>
          </div>
        </div>
      </div>

      <mip-xin-config
        :url="url"
        :carid="carid"
        :im-url="imUrl"
        params="查看详细参数配置"/>
    </div>
  </div>
</template>
<script>
import { requestFun } from '../../common/utils/reqUtils'
import { clickPoint } from '../../common/utils/stastic.js'
import config from '../../common/utils/config'
import {
  setLocalStorage,
  getLocalStorage,
  getCarId,
  getCityId,
  getAgreement
} from '../../common/utils/utils.js'
const pid = '/pages/detail'
export default {
  // props: [
  //   'showMessage',
  //   'carPrice',
  //   'ename',
  //   'showSimilarmodule',
  //   'cityMessage'
  // ],
  props: {
    showMessage: {
      type: Boolean,
      default: false
    },
    carPrice: {
      type: String,
      default: ''
    },
    ename: {
      type: String,
      default: ''
    },
    showSimilarmodule: {
      type: Boolean,
      default: true
    },
    cityMessage: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      carInfo: {}, // 车辆基本信息
      carid: '',
      cityid: '',
      docs: {}, // 车辆档案
      needCcid: [], // 车辆配置
      color: {},
      emission: {},
      engine_type: {},
      lift_time: {},
      mileage: {},
      regist_date: {},
      imageTitle: 'https:', // 图片地址头
      url: '',
      isDirect: 0, // 直购车标志
      beyondUrl: '', // 超值链接
      imUrl: '' // M站的IM客服路径
    }
  },
  watch: {
    carInfo (newval, oldval) {
      if (typeof newval === 'string') {
        this.carInfo = JSON.parse(newval)
      }
    }
  },
  mounted () {
    let param = {
      carid: getCarId(),
      cityid: getCityId()
    }
    requestFun('/ajax/car', {
      method: 'POST',
      param: param
    })
      .then(res => {
        if (res.car_info) {
          this.carInfo = res.car_info
          this.isDirect = res.car_info.is_zg_car
          setLocalStorage('isDirect', JSON.stringify(res.car_info.is_zg_car))
          let url = `/c/config_${getCarId()}.html${getLocalStorage(
            'locationUrl'
          )}`
          this.url = url
          this.beyondUrl = res.car_info.super_url
          this.imUrl = res.im_url
          this.$emit('showPrice', this.carInfo)
          this.$emit('getImurl', res.im_url)
        }
        if (res.docs) {
          this.docs = res.docs
          this.color = this.docs.color
          this.emission = this.docs.emission
          this.engine_type = this.docs.engine_type
          this.lift_time = this.docs.lift_time
          this.mileage = this.docs.mileage
          this.regist_date = this.docs.regist_date
        }
        if (res.need_ccid) {
          this.needCcid = res.need_ccid
        }
      })
      .catch(err => {
        console.log(err)
      })
  },
  created () {},
  methods: {
    openConfig (url) {
      MIP.viewer.open(url + decodeURIComponent(getLocalStorage('locationUrl')), {
        isMipLink: false
      })
    },
    openParmas () {
      clickPoint(
        'collocation_more',
        {
          carid: getCarId()
        },
        () => {
          MIP.viewer.open(this.url, {
            isMipLink: true
          })
        },
        {
          pid: pid
        }
      )
    },
    openFance () {
      let opurl = getLocalStorage('locationUrl')
        ? decodeURIComponent(getLocalStorage('locationUrl')) + '&'
        : '?'
      MIP.viewer.open(
        `${
          config.mHost
        }/halfprice/detail/${getCarId()}/${opurl}cityid=${getCityId()}&ename=${
          JSON.parse(this.cityMessage).ename
        }`,
        {
          isMipLink: false
        }
      )
      clickPoint(
        'halfplan_detail',
        {
          carid: getCarId(),
          icon: this.carInfo.is_direct_rent_car
        },
        null,
        {
          pid: pid
        }
      )
    },
    openMessage () {
      this.$emit('showAllMessage', '{ param: "333" }')
      clickPoint(
        'open_config_detail',
        {
          carid: getCarId(),
          type: this.isDirect
        },
        null,
        {
          pid: pid
        }
      )
    },
    beyondCompare () {
      let url = ''
      if (getLocalStorage('locationUrl')) {
        url = '&' + decodeURIComponent(getLocalStorage('locationUrl')).split('?')[1]
      }
      MIP.viewer.open(getAgreement() + this.beyondUrl + `${url}`, {
        isMipLink: false
      })
    }
  }
}
</script>
<style scoped>
.car-infor {
  display: flex;
  flex-direction: column;
}

.car-infor-bottom {
  margin-bottom: 0.15rem;
}

.car-title {
  /**width: 6.7rem;**/
  margin-left: 0.4rem;
  line-height: 0.3rem;
  padding-top: 0.3rem;
  min-height: 0.36rem;
  padding-right: 0.2rem;
}

.car-desc {
  font-size: 0.36rem;
  font-weight: bold;
  color: #3a4144;
  line-height: 0.5rem;
}

.price-info {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  padding-left: 0.4rem;
  padding-right: 0.4rem;
}

.car-price-desc {
  display: flex;
  flex-direction: column;
}

.car-price-box {
  display: flex;
  flex-direction: column;
}

.car-price-content {
  display: flex;
  align-items: flex-end;
}

.car-price {
  font-size: 0.6rem;
  color: #f85d00;
  font-weight: bold;
  /**margin-top: 0.26rem;**/
  margin-bottom: -0.15rem;
  min-height: 0.6rem;
  /* background-color: #f85d00 */
}

.car-price-unit {
  font-size: 0.26rem;
  color: #f85d00;
}

.car-price-trend {
  width: 0.24rem;
  height: 0.28rem;
  margin-left: 0.12rem;
  margin-right: 0.12rem;
  /* margin-top: -0.05rem; */
}
/* .car-price-trend img {
  margin-top: -0.04rem;
} */
.new-car-tax {
  align-items: flex-end;
  padding-left: 0.4rem;
  padding-top: 0.2rem;
}

.new-car-taxbottom {
  margin-top: 0.1rem;
}

.car-tax-font {
  font-size: 0.26rem;
  font-family: PingFangSC-Regular;
  color: rgba(88, 88, 88, 1);
  margin-top: 0.24rem;
  margin-left: 0.4rem;
}

.beyondValue {
  display: flex;
  justify-content: center;
  align-items: flex-end;
}
.beyond-value-box {
  display: flex;
  align-items: center;
}
.beyond-value {
  text-align: center;
  border-radius: 0.04rem;
  font-size: 0.26rem;
  font-family: PingFangSC-Regular;
  color: rgba(248, 93, 0, 1);
}

.car-price-discount-box {
  display: flex;
  align-items: flex-end;
  margin-right: 0.1rem;
  margin-top: 0.24rem;
}

.car-price-discount {
  border: 0.01rem solid #f85d00;
  border-radius: 0.02rem;
  padding: 0.06rem;
  font-size: 0.28rem;
  color: #f85d00;
  text-align: center;
  width: 1.26rem;
  white-space: nowrap;
  /* background-color: #f85d00; */
}

.car-price-bottom {
  font-size: 0.28rem;
  color: #f85d00;
  text-align: center;
}

.spokes-person-price {
  display: flex;
  margin-top: 0.24rem;
  flex-direction: column;
}
.spokes-person-pricebottom {
  border-bottom: 0.18rem solid rgba(241, 241, 241, 1);
}
.open-fanice {
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* height: 1rem; */
  padding-left: 0.4rem;
  padding-right: 0.4rem;
  padding-bottom: 0.2rem;
}

.car-fanice-see {
  display: flex;
  align-items: center;
  font-size: 0.26rem;
  font-family: PingFangSC-Regular;
  color: rgba(88, 88, 88, 1);
}

.next-page {
  width: 0.14rem;
  height: 0.14rem;
  line-height: 1rem;
  transform: rotate(-315deg);
  margin-top: 0.03rem;
}

.next-page-color {
  border: solid rgba(88, 88, 88, 1);
  border-width: 0.01rem 0.01rem 0 0;
}

.next-page-overcolor {
  border: solid rgb(248, 93, 0);
  border-width: 0.01rem 0.01rem 0 0;
}

.open-car-allmessage {
  text-align: center;
  line-height: 0.7rem;
  width: 6.7rem;
  height: 0.7rem;
  background: rgba(255, 255, 255, 1);
  border-radius: 0.06rem;
  border: 0.04rem solid rgba(248, 93, 0, 1);
  font-size: 0.28rem;
  font-family: PingFangSC-Regular;
  color: rgba(248, 93, 0, 1);
  display: flex;
  justify-content: center;
  align-items: center;
}

.open-car-allmessagebox {
  margin-left: 0.35rem;
  /**margin-right: 0.4rem;*/
  margin-bottom: 0.2rem;
}

.spokes-person {
  width: 1rem;
  height: 1.4rem;
  line-height: 1.45rem;
  margin-top: -0.48rem;
  position: absolute;
  margin-left: 0.4rem;
}

.pay-detail {
  font-size: 0.26rem;
  font-family: PingFangSC-Regular;
  color: rgba(88, 88, 88, 1);
}

.car-file {
  margin-left: 0.4rem;
  font-size: 0.34rem;
  color: #333333;
  font-weight: bold;
}

.car-params {
  display: flex;
  flex-direction: column;
}

.bdline {
  display: flex;
  flex-direction: column;
}

.boundary-box {
  width: 100%;
  height: 0.2rem;
  background-color: #f9f9f9;
}

.car-params-title {
  display: flex;
  justify-content: space-between;
  border-bottom: 0.01rem solid rgba(241, 241, 241, 1);
  align-items: center;
  height: 1.1rem;
  border-left: 0.04rem solid rgba(248, 93, 0, 1);
}

.car-shelf-time {
  color: #848484;
  font-size: 0.26rem;
  margin-right: 0.4rem;
}

.driveInfo {
  display: flex;
  flex-wrap: wrap;
  padding-left: 0.4rem;
  justify-content: space-between;
  margin-top: 0.6rem;
  padding-right: 0.4rem;
}

.driveList {
  display: flex;
  flex-direction: column;
  /* width: 33.3%; */
  /* width: 210px;
        margin-right: 25px; */
}

.drive-list-bottom {
  border-bottom: 0.01rem solid rgba(241, 241, 241, 1);
}

.drive-info-list {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.driveKey {
  font-size: 0.26rem;
  padding-top: 0.5rem;
  padding-bottom: 0.2rem;
  font-family: PingFangSC-Regular;
  color: rgba(153, 153, 153, 1);
}

.drive-width {
  width: 2.2rem;
}

/* .naturally-air{
        margin-left:50px;
    } */

.get-car {
  white-space: nowrap;
}

.driveValue {
  font-size: 0.32rem;
  font-weight: bold;
  margin-top: 0.2rem;
  margin-bottom: 0.5rem;
  font-family: PingFangSC-Medium;
  color: rgba(27, 27, 27, 1);
}

.car-info-bottom {
  height: 0.01rem;
  width: 100%;
  background-color: #f1f1f1;
  margin-top: 0.4rem;
  margin-right: 0.4rem;
  margin-left: 0.4rem;
}

.car-set {
  display: flex;
  padding-top: 0.6rem;
}

.car-set-content {
  display: flex;
  /* justify-content: space-between; */
  margin-left: 0.4rem;
}

.u-certified-content {
  margin-left: 0.4rem;
}

.paramsInfo {
  display: flex;
  flex-direction: column;
}

.params-info {
  display: flex;
  flex-direction: column;
  width: 100%;
  /* margin-right: 60px; */
}

.car-set-config {
  margin-bottom: 0.4rem;
}

.paramsIcon {
  width: 0.56rem;
  height: 0.56rem;
  margin-left: 0.4rem;
}

.paramName {
  text-align: center;
  width: 100%;
  font-size: 0.26rem;
  font-family: PingFangSC-Regular;
  color: rgba(88, 88, 88, 1);
}

.car-set-bottom {
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 0.01rem solid rgba(241, 241, 241, 1);
  padding-bottom: 0.37rem;
  padding-top: 0.37rem;
  border-bottom: 0.18rem solid rgba(241, 241, 241, 1);
}

.car-highlight {
  width: 1.3rem;
  text-align: center;
}

.lookParams {
  font-size: 0.26rem;
  text-align: center;
  margin-left: 0.04rem;
  font-family: PingFangSC-Regular;
  color: rgba(88, 88, 88, 1);
}

.paramsArrow {
  width: 0.14rem;
  height: 0.14rem;
  transform: rotate(-315deg);
  border: solid #dbdada;
  border-width: 0.02rem 0.02rem 0 0;
}

.open-message-icon1 {
  width: 0.12rem;
  height: 0.12rem;
  line-height: 1rem;
  -webkit-transform: rotate(-315deg);
  -ms-transform: rotate(-315deg);
  transform: rotate(-225deg);
  margin-top: 0.03rem;
  border: solid rgb(255, 142, 75);
  border-width: 0.01rem 0.01rem 0 0;
}
.open-message-icon2 {
  width: 0.12rem;
  height: 0.12rem;
  line-height: 1rem;
  -webkit-transform: rotate(-315deg);
  -ms-transform: rotate(-315deg);
  transform: rotate(-225deg);
  margin-top: 0.03rem;
  border: solid rgb(248, 93, 0);
  border-width: 0.01rem 0.01rem 0 0;
}
.show-carmessage-icon {
  margin-top: -0.15rem;
  margin-left: 0.15rem;
}
</style>
