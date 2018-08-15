<template>
  <div
    v-show="show"
    id="addressSelect"
    ref="wrapper"
  >
    <div class="jkx_item">
      <div class="item_right pl_20">
        <div class="jkx_form delete">
          <i class="search" />
          <input
            v-model="inputVal"
            type="text"
            placeholder="请输入具体位置"
            @keyup="searchVal()">
          <em
            v-if="inputVal!=''"
            class="jkx_m_icon deleteIcon"
            @click="empty()"/>
        </div>
      </div>
    </div>
    <section class="jkx_container jkx_bl">
      <h3 class="jkx_title">当前位置</h3>
    </section>
    <section class="jkx_content">
      <div class="jkx_cell position">
        <span
          class="cell_title gray1 currentLocation"
          @click="ChooseLocation(choosedetail.nowPosition)">{{ choosedetail.nowPosition }}</span>
        <span class="cell_info">
          <i class="jkx_m_icon"/>
          <span class="orange fs_24">重新定位</span>
        </span>
      </div>
    </section>
    <div v-if="html.length>0">
      <section class="jkx_container">
        <h3
          id="panel"
          class="jkx_title nearAddress">附近地址</h3>
      </section>
      <section
        ref="addressList"
        class="jkx_content nearAddressList">
        <div>
          <div
            ref="addressContent"
            class="addressContent">
            <div
              v-for="(item,index) in html"
              :key="index">

              <div
                class="jkx_panel"
                @click="Choose(item)">
                <p class="panel_title">{{ item.title||item.name }}</p>
                <p class="panel_body">{{ item.address?item.address:item.province+" "+ item.city+" "+ item.district }}</p>
              </div>
            </div>
          </div>
        </div>
        <span class="jkx_loading"/>
      </section>
    </div>
  </div>
</template>

<script>
const viewport = MIP.viewport
export default {
  directives: {
    focus: {
      inserted: function (el) {
        el.focus()
      }
    }
  },
  props: {
    choosedetail: {
      default () {
        return {}
      },
      type: Object
    }
  },
  data () {
    return {
      choose: '',
      choose1: '',
      choose2: '',
      choose3: '',
      curLocation: '',
      html: [],
      inputVal: '',
      cacheAddress: [],
      province: '',
      show: false,
      address: '',
      cHeight: 0
    }
  },
  watch: {
    choosedetail (val) {
      this.html = val.around
      if (!val.show) this.inputVal = ''
      this.show = val.show
      // window.addEventListener('touchmove', function (e) {
      //   if (val.show) {
      //     e.preventDefault()
      //   }
      // }, { passive: false })
      this.choosedetail.nowPosition = val.nowPosition
    }
  },
  mounted () {
    this.$refs.wrapper.style.height = viewport.getHeight() + 'px'
    this.$refs.wrapper.style.overflowY = 'scroll'
    if (this.html.length > 0) this.$refs.addressList.style.height = viewport.getHeight() - 146 + 'px'
  },
  methods: {
    // 搜索地区
    searchVal () {
      let val = this.inputVal
      if (val) {
        let that = this
        that.province = this.choosedetail.city
        /* global fetchJsonp */
        fetchJsonp(`//api.map.baidu.com/place/v2/suggestion?query=${val}&region=${that.province}&output=json&ak=QUy5EZSQz9LtjPCqbBwl8RDoQXSZIhcG&callback`).then(data => {
          return data.json()
        }).then(data => {
          that.html = data.result
          that.$refs.addressContent.style.height = data.result.length * 50 + 'px'
          that.$refs.addressContent.style.marginBottom = viewport.getHeight() - 196 > data.result.length * 50 ? 0 : 100 + 'px'
        })
      } else {
        this.html = this.choosedetail.around
      }
    },
    empty () {
      this.inputVal = ''
      this.html = this.choosedetail.around
    },
    Choose (val) {
      // 选择地区
      if (this.inputVal) {
        MIP.setData({
          chooseDetail: {
            show: false
          },
          orderData: {
            detail: val.name,
            lat: val.location.lat,
            lng: val.location.lng,
            showFixed: false
          },
          areaData: {
            address: val.province + ' ' + val.city + ' ' + val.district,
            detail: val.name
          }
        })
      } else {
        MIP.setData({
          chooseDetail: {
            show: false
          },
          orderData: {
            detail: val.title,
            lat: val.point.lat,
            lng: val.point.lng,
            showFixed: false
          },
          areaData: {
            detail: val.title
          }
        })
      }
    },
    ChooseLocation (val) {
      MIP.setData({
        chooseDetail: {
          show: false
        },
        orderData: {
          detail: val,
          showFixed: false
        },
        areaData: {
          detail: val,
          show1: true
        }
      })
    }
  }
}
</script>

<style scoped lang="css">
  input{
    border: none;
    outline: none;
  }
  /*选择地区*/
  #addressSelect{
    position: relative;
    top: 44px;
    background: #e2e2e2;
  }
  .jkx_item {
    display: flex;
    background: #fff;
  }
  .jkx_item .item_left {
    position: relative;
    width: 50px;
  }
  .jkx_item .item_left .jkx_m_icon {
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto 0;
  }
  .jkx_rl {
    border-right: 1px solid #e4e4e4;
  }
  .jkx_item .item_right {
      flex-grow: 1;
  }
  .pl_20 {
      padding-left: 15px;
  }
  /*输入具体位置*/
  .jkx_form {
    align-items: center;
    width: 100%;
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    display: flex;
    color: #666;
    position: relative;
  }
  .jkx_form i {
    height: 30px;
    display: inline-block;
    /* flex-basis: 30px; */
    margin-right: 10px;
  }
  .jkx_form input[type=text] {
    font-size: 13px;
    height: 100%;
    color: #333;
    display: block;
    flex-grow: 1;
    width: 70px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .jkx_form.delete input {
    padding-right: 30px;
  }
  .back {
    width: 30px;
    height: 30px;
    background-size: 100% 100%;
  }
  .jkx_item .jkx_form .search {
    background-image: url(data:image/png;base64,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);
    width: 20px;
    height: 20px;
    background-size: 100% 100%;
  }
  .jkx_form.delete .deleteIcon {
    position: absolute;
    right: 10px;
    margin-right: 0;
    width: 30px;
    height: 30px;
    background-size: 100% 100%;
    display: inline-block;
  }
  /*当前位置*/
  .jkx_bl {
    border-bottom: 1px solid #e4e4e4;
  }
  .jkx_container {
    font-size: 14px;
    background-color: #fff;
    margin-top: 10px;
    padding:10px 20px 0;
  }
  .jkx_title {
    color: #333;
    line-height: 25px;
    height: 25px;
    font-size: 13px;
    display: flex;
    align-items: center;
    font-weight: normal;
    background-color: #fff;
  }
  .jkx_content {
    margin-bottom: 10px;
    background-color: #fff;
    padding-left: 20px;
    padding-right: 20px;
    font-size: 15px;
  }
  .jkx_cell {
    height: 60px;
    line-height: 60px;
    color: #666;
    position: relative;
    display: flex;
    align-items: center;
    font-size: 15px;
  }
  .jkx_cell .cell_info .jkx_m_icon {
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto 0;
  }
  .jkx_cell i {
    display: inline-block;
    width: 30px;
    height: 30px;
    margin-right: 10px;
  }
  .position {
    height: 40px;
    line-height: 40px;
  }
  .jkx_cell .cell_info .jkx_m_icon {
    background-image: url(data:image/png;base64,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);
    width: 15px;
    height: 15px;
    background-size: 100% 100%;
    left: -20px;
  }
  .jkx_cell .cell_title {
    color: #333;
    font-size: 12px;
    display: flex;
  }
  .gray1 {
    color: #666!important;
  }
  .jkx_cell .cell_info {
    margin-left: auto;
    color: #333;
    position: relative;
    height: 100%;
  }
  .fs_24 {
    font-size: 12px !important;
  }
  .orange {
    color: #fe5e22!important;
  }
  .nearAddressList {
    width: 100%;
    height: 65%;
    margin-bottom: 0;
    border-top: 1px solid #e4e4e4;
    background-color: #f4f4f4;
    padding: 0;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
  }
  /*详细地址选择*/
  .nearAddressList .jkx_panel {
    background-color: #fff;
    padding-right: 0;
    padding-bottom: 0;
    padding-top: 10px;
    text-indent: 20px;
  }
  .nearAddressList .jkx_panel:first-child {
    border-top: 0!important;
  }
  .nearAddressList .jkx_panel .panel_title {
    color: #666;
    font-size: 12px;
    margin-bottom: 5px;
    line-height: 12px;
  }
  .nearAddressList .jkx_panel .panel_body {
    font-size: 12px;
    line-height: 12px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    color: #999;
    padding-bottom: 10px;
    border-bottom: 1px solid #e4e4e4;
  }
</style>
