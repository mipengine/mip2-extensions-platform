<template>
  <mip-fixed
    type="top"
    class="mip-fix-top">
    <div class="header-search">
      <div
        class="site-dropdown"
        @click="selectCity()">
        <div class="cur-site">{{ city.cityName || city.locationCityName || city.siteCityName }}</div>
        <span class="triangle"/>
      </div>
      <div class="input-wrapper">
        <div class="search-input">
          <input
            v-model="keyword"
            placeholder="7K场折扣演出等着你"
            type="search"
            class="search-box-input">
          <div
            class="btn-search"
            @click="searchKey">搜索</div>
        </div>
      </div>
      <div class="place-holder"/>
    </div>
  </mip-fixed>
</template>

<style scoped lang="less">
/*元素顶部距离*/
.mip-fix-top {
    top: 44px !important;
}
.header-search {
  width: 100%;
  background: #fff;
  @searchHeight: 3.2rem;
  height: 4.4rem;
  align-items: center;
  display: flex;
  .btn-search{
    display:block;
    background-color:#f10e70;
    width:7rem;
    text-align:center;
  }
  .triangle {
    position: absolute;
    top: 45%;
    right: 0.5rem;
    border-top: 0.5rem solid #000;
    border-left: 0.5rem solid transparent;
    border-right: 0.5rem solid transparent;
  }
  .site-dropdown {
    width: 7rem;
    font-size: 1.6rem;
    font-weight: bold;
    position: relative;
    height: 100%;
    .cur-site {
      position: absolute;
      right: 2rem;
      line-height: 4.4rem;
      top: 0;
    }
  }
  .place-holder {
    width: 1.8rem;
  }
  .input-wrapper {
    width: 100%;
    flex: 1;
  }
  .search-input {
    z-index: 100;
    height: @searchHeight;
    line-height: @searchHeight;
    color: #fff;
    border-radius: 2px;
    background-color: #f4f4f5;
    display: flex;
    position: relative;
    width: 100%;
    form {
      width: 100%;
      height: @searchHeight;
      position: absolute;
      left: 0;
      top: 0;
    }
    .search-box-input {
      width: 100%;
      height: @searchHeight;
      border: none;
      color: #333;
      background: transparent;
      padding: 5px;
      padding-left: 3rem;
      font-size: 1.2rem;
    }
    .search-placeholder {
      letter-spacing: 1px;
      height: @searchHeight;
      line-height: @searchHeight;
      font-size: 1.3rem;
      color: #95949d;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .search-icon {
      margin-top: 0.3rem;
      margin-left: 1rem;
    }
  }
  .calendar-icon {
    width: 2.2rem;
    height: 2.2rem;
    text-align: center;
    position: relative;
    img {
      width: 2.2rem;
    }
    .calendar-text{
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translateX(-50%) translateY(-50%);
      width: 18px;
      height: 10px;
      text-align: center;
      line-height: 12px;
      font-size: 10px;
      background-color: #fff;
    }
  }
}

</style>

<script>
import * as adapterStorageUtil from '@/common/adapterStorageUtil'
import * as sessionStorageUtil from '@/common/sessionStorageUtil'
export default {
  props: {
    cityUrl: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      keyword: '',
      city: {}
    }
  },
  mounted () {
    sessionStorageUtil.syncSessionData()
    let me = this
    console.log('搜索bar 加载ok')
    // 取值顺序 选择了>定位到的>没定位到的默认
    this.city = adapterStorageUtil.get('selected_city') || sessionStorageUtil.get('geo_info') || {}
    MIP.watch('initCityName', newVal => {
      me.city = {cityName: newVal}
    })
  },
  methods: {
    searchKey () {
      MIP.setData({
        keyword: this.keyword
      })
    },
    selectCity () {
      this.cityUrl && MIP.viewer.open(this.cityUrl)
    }
  }
}
</script>
