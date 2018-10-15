<template>
  <div class="wrapper">
    <div class="city-content">
      <div class="title">服务城市</div>
      <div>
        <div
          v-for="item in cityList"
          :key="item"
          class="city-list"
          @click="checkCity(item)">
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import base from '../../common/utils/base'
export default {
  props: {
    globaldata: {
      type: Object,
      default: function () { return {} }
    }
  },
  data () {
    return {
      cityList: null
    }
  },
  created () {
    base.setHtmlRem()
    console.log(this.globaldata)
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      let lxnData = base.getSession()
      if (lxnData !== null && lxnData.cityList && lxnData.cityList.length > 0) {
        this.cityList = lxnData.cityList
      } else {
        this.getOpenCity()
      }
    },
    //  选择城市
    checkCity (item) {
      let obj = {
        ordercity: item,
        kilometer: 0,
        moveInAddress: {
          localtion: {
            name: ''
          },
          address: ''
        },
        moveOutAddress: {
          localtion: {
            name: ''
          },
          address: ''
        }
      }
      let lxnData = base.getSession()
      let datas = null
      if (lxnData !== null) {
        datas = base.mipExtendData(lxnData, obj)
      } else {
        datas = base.mipExtendData(this.globaldata, obj)
      }
      base.mipSetGlobalData(obj)

      base.setSession(datas)

      setTimeout(() => {
        MIP.viewer.page.back()
      }, 100)
    },
    // 获取开通城市列表
    getOpenCity () {
      let city = encodeURIComponent('北京')
      let urls = base.url + '/Setting/getCityData?city=' + city
      window
        .fetchJsonp(urls)
        .then(response => response.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
          if (response.data.open_citys) {
            this.cityList = response.data.open_citys
          }
        })
    }
  }
}
</script>

<style scoped>

.city-content {
  padding: 0 .16rem;
  padding-top: .16rem;
  color: #333;
  font-size: .3rem;
}

.title {
  font-weight: bold;
  color: #38f;
  padding: 0 10px;
}

.city-list {
  height: .8rem;
  border-bottom: .02rem solid #eee;
  line-height: .8rem;
  padding: 0 .2rem;
  display: block;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0.2);
}
</style>
