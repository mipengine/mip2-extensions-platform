<template>
  <div
    v-show="areadata.show"
    ref="mask"
    class="Mask">
    <div
      :class="{noScroll: isShowPopup}"
      class="over">
      <div
        class="cancel"
        @click="close" />
      <div
        class="select"
        @touchmove.stop>
        <div class="btn">
          <span>请选择地区</span>
          <a @click="close">取消</a>
        </div>
        <div class="area1">
          <div class="province">
            <ul>
              <li
                v-for="(item,index) in proList"
                :class="{on:area.proId==item.id}"
                :key="index"
                class="pro"
                @touchmove.stop
                @click.stop="choosepro(item)">{{ item.name }}</li>
            </ul>
          </div>
          <div class="city">
            <div>
              <div
                v-for="(item,index) in cityList"
                :key="index"
                :class="{cityOn:cityId==item.id}"
                class="city_a"
                @touchmove.stop
                @click.stop="chooseCity(item)">
                {{ item.name }}
                <ul
                  v-if="area.cityId==item.id"
                  class="district">
                  <li
                    v-for="(item,index) in districtList"
                    :key="index"
                    :class="{disOn:area.disId==item.id}"
                    class="city_b"
                    @click.stop="choosedis(item)">{{ item.name }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import request from '@/common/js/fetch'
import apiUrl from '../../common/js/config.api'
const viewport = MIP.viewport
export default {
  props: {
    areadata: {
      default () {
        return {}
      },
      type: Object
    }
  },
  data () {
    return {
      districtList: [],
      proList: [],
      cityList: [],
      area: {
        cityId: 0,
        proId: 1,
        distId: 0,
        province: '',
        city: '',
        distri: '',
        address: ''
      },
      isShow1: true,
      isShowPopup: false,
      detail: '',
      show: false
    }
  },
  watch: {
    areadata (val) {
      window.addEventListener('touchmove', function (e) {
        if (val.show) {
          e.preventDefault()
        }
      }, { passive: false })
    }
  },
  created () {
    request(apiUrl.provinceList).then(res => {
      if (res.code === 200) this.proList = res.data.provinceList
    })
      .catch(error => {
        console.log(error)
      })
    let pro = {
      id: 1,
      name: '北京'
    }
    this.choosepro(pro)
  },
  mounted () {
    this.$refs.mask.style.height = viewport.getHeight() + 'px'
  },
  methods: {
    close () {
      this.show = false
      this.isShowPopup = true
      MIP.setData({
        areaData: {
          show: false
        }
      })
    },
    // 选择区
    choosedis (distri) {
      this.area.distId = distri.id
      this.area.distri = distri.name
      this.area.address = this.area.province + ' ' + this.area.city + ' ' + this.area.distri
      this.close()
      MIP.setData({
        orderData: {
          'cityId': this.area.cityId,
          'distId': this.area.distId,
          'address': this.area.address,
          'detail': ''
        },
        chooseDetail: {
          city: this.area.city
        },
        areaData: {
          address: this.area.address,
          detail: ''
        }
      })
    },
    // 选择市
    chooseCity (city) {
      this.area.cityId = city.id
      this.area.city = city.name
      request(`${apiUrl.distList}?cityId=${city.id}`)
        .then(res => {
          if (res.code === 200) this.districtList = res.data.distList
        })
    },
    choosepro (pro) {
      this.area.proId = pro.id
      this.area.province = pro.name
      request(`${apiUrl.cityList}?provinceId=${pro.id}`).then(res => {
        if (res.code === 200) this.cityList = res.data.cityList
      })
    }
  }
}
</script>
<style lang="less" scoped>
  li{
    list-style: none;
  }
  .Mask {
    position: relative;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    background-color: rgba(0, 0, 0, .4);
    overflow: hidden;
    z-index: 100000;
    }
    .over {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 10000;
      overflow: auto;
    }
    .noScroll {
      overflow-y: hidden;
      -webkit-overflow-scrolling: touch
    }
    .cancel {
      width: 100%;
      // height: calc(100% - 12.8rem);
    }
    .select {
      position: absolute;
      left: 0;
      bottom: 0;
      background: rgb(244, 244, 244);
      z-index: 999;
      width: 100%;
      font-size: 14px;
      height: 60%;
    }
    .btn {
      height: 10%;
      color: #666666;
      border-bottom: 1px solid #e4e4e4;
      line-height: 10%;
      display: flex;
      align-items: center;
      justify-content: center;
      padding-left: 15px;
      padding-right: 15px;
      background: #f8f9fa;
    }
    .btn a {
      color: #999999;
      margin-left: auto;
    }
    .area1 {
      height: 90%;
      overflow-x: hidden;
      overflow-y: hidden;
      -webkit-overflow-scrolling: touch
    }
    .province {
      float: left;
      height: 100%;
      width: 30%;
      text-align: center;
      color: #333333;
      font-size: 12px;
      overflow-x: hidden;
      overflow-y: scroll;
      background: #f8f9fa;
      -webkit-overflow-scrolling: touch;
    }
    .pro {
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #e4e4e4;
    }
    .city {
      height: 100%;
      background: #fff;
      width: 70%;
      float: left;
      color: #333333;
      font-size: 12px;
      overflow-x: hidden;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
    }
    .city_a {
      min-height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #e4e4e4;
      padding: 0 10px
    }
    .district {
      display: flex;
      flex-wrap: wrap;
    }
    .city_b {
      margin-right: 5px;
      padding: 0 10px;
      height: 30px;
      line-height: 30px;
      border: 1px solid #333333;
      border-radius: 5px;
      margin-bottom: 5px;
      color: #333333;
    }
    .on {
      color: #fe5e24;
      border-left: 4px solid #fe5e24;
    }
    .cityOn {
      color: #fe5e24;
    }
    .disOn {
      color: #fe5e24 !important;
      border: 1px solid #fe5e24 !important;
    }
</style>
