<template>
  <div
    v-show="devicedata.show">
    <div
      ref="mask"
      class="mask">
      <div
        class="mask-wrapper"
        @click.self="close">
        <div class="mask-content">
          <div class="head">
            <span
              class="close"
              @click.self="close"/>
            <p
              v-for="(item,index) in tab"
              :key="index"
              :class="{active:(last?changeColor:changeColor1) == index}"
              @click="changeTab(index)">{{ item }}</p>
          </div>
          <div class="content-wrapper">
            <div v-show="last">
              <div
                v-show="changeColor==0"
                class="content">
                <div
                  v-for="(item,index) in data1"
                  :key="index"
                  :class="{act:brandsIndex1==index}"
                  class="brandsList"
                  @click="choosetype(item,index)">{{ item.name||item.model }}</div>
              </div>
              <div
                v-show="changeColor==1"
                class="content">
                <div
                  v-for="(item,index) in data2"
                  :key="index"
                  :class="{act:brandsIndex2==index}"
                  class="brandsList"
                  @click="chooseBrands(item,index)">{{ item.name||item.model }}</div>
              </div>
              <div
                v-show="changeColor==2"
                class="content">
                <div
                  v-for="(item,index) in data3"
                  :key="index"
                  :class="{act:brandsIndex3==index}"
                  class="brandsList"
                  @click="chooseModel(item,index)">{{ item.name||item.model }}</div>
              </div>
            </div>
            <div v-show="!last">
              <div
                v-show="changeColor1==0"
                class="content">
                <div
                  v-for="(item,index) in data4"
                  :key="index"
                  :class="{act:brandsIndex1==index}"
                  class="brandsList"
                  @click="choosetype(item,index)">{{ item.name||item.model }}</div>
              </div>
              <div
                v-show="changeColor1==1"
                class="content">
                <div
                  v-for="(item,index) in data5"
                  :key="index"
                  :class="{act:brandsIndex2==index}"
                  class="brandsList"
                  @click="chooseBrands(item,index)">{{ item.name||item.model }}
                  <p>{{ item.price>=0?`￥${item.price}`:'待检测' }}</p>
                </div>
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
import apiUrl from '@/common/js/config.api'
const viewport = MIP.viewport
export default {
  props: {
    devicedata: {
      default () {
        return {}
      },
      type: Object
    }
  },
  data () {
    return {
      last: true,
      tab: [],
      changeColor: 0, // tab选择,
      changeColor1: 0, // tab选择,
      data: [], //
      data1: [], // 品牌
      data2: [], // 类型
      data3: [], // 型号
      data4: [], // 型号
      data5: [], // 型号
      brandsIndex: 0,
      brandsIndex1: 0,
      brandsIndex2: 0,
      brandsIndex3: 0,
      categoryId: 12, // 型号
      brandId: 8, // 品牌
      deviceId: '', // 设备id
      name: '', // 显示内容
      color: 117,
      attr: 1,
      attrValue: 2162,
      price: 0,
      malfunctionId: '', // 故障id，
      // 判断验证码是否为空,判断form组件的内容，清空
      isForm: {
      }
    }
  },
  watch: {
    devicedata (val) {
      document.body.style.overflow = val.show ? 'hidden' : 'scroll'
      // window.addEventListener('touchmove', function (e) {
      //   if (val.show) {
      //     e.preventDefault()
      //   }
      // }, { passive: false })
      if (val.last) {
        this.last = val.last
        this.tab = ['类型', '品牌', '型号']
        this.changeColor = 0
        this.queryBrand()
      } else {
        this.last = val.last
        this.tab = ['分类', '故障']
        this.changeColor1 = 0
        this.queryBrand()
      }
    }
  },
  mounted () {
    this.$refs.mask.style.height = viewport.getHeight() + 'px'
  },
  created () {
    document.body.style.overflow = this.devicedata.show ? 'hidden' : 'scroll'
    // if (this.devicedata.show) {
    //   window.addEventListener('touchmove', function (e) {
    //     e.preventDefault()
    //   }, { passive: false })
    // }
    if ((this.devicedata.tab || []).length > 2) {
      this.tab = this.devicedata.tab
      this.last = this.devicedata.last
      this.changeColor = this.devicedata.changeColor
      this.changeColor1 = this.devicedata.changeColor1
      this.categoryId = this.devicedata.categoryId
      this.brandId = this.devicedata.brandId
    } else if (this.devicedata.price > 0) {

    }
    this.queryBrand()
  },
  methods: {
    changeTab (index) {
      if (this.last) {
        if (index === 0) this.tab = ['类型', '品牌', '型号']
        this.changeColor = index
      } else {
        if (index === 0) this.tab = ['分类', '故障']
        this.changeColor1 = index
      }
      this.queryBrand()
    },
    // 获取分类：
    getSort () {
      request(apiUrl.categoryList).then(res => {
        if (res.code === 200) {
          this.data1 = res.data.list
          if (this.changeColor === 1 && this.data1.length > 0) {
            this.data2 = this.data1[0].brandList
          } else {
            this.data2 = this.data1[0].brandList
          }
        }
      })
    },
    // 获取设备列表
    getDevice () {
      MIP.setData({
        loading: true
      })
      request(`${apiUrl.deviceList}?categoryId=${this.categoryId}&brandId=${this.brandId}`).then(res => {
        if (res.code === 200) {
          this.data3 = res.data.list
          MIP.setData({
            loading: false
          })
        }
      })
    },
    // 获取设备故障
    getMalfunction () {
      // let options = {deviceId: this.color, attributeIds: this.attr, attributeValues: this.attrValue}
      request(`${apiUrl.getMalfunction}?deviceId=${this.color}&attributeIds=${this.attr}&attributeValues=${this.attrValue}`)
        .then(res => {
          if (res.code === 200) this.data4 = res.data.list
        })
    },
    queryBrand () {
      if (this.last) {
        if (this.changeColor === 0) {
          this.getSort()
        }
        if (this.changeColor === 1) {
          if (this.data1.length > 0) {
            this.data2 = this.data1[0].brandList
          } else {
            this.getSort()
          }
        }
        if (this.changeColor === 2) {
          this.getDevice()
        }
      } else {
        if (this.changeColor1 === 0) {
          this.getMalfunction()
        }
        if (this.changeColor1 === 1) {
          this.data5 = this.data4[0].children
        }
      }
    },
    // 选择
    choosetype (item, index) {
      this.brandsIndex1 = index
      this.changeColor = 1
      this.changeColor1 = 1
      this.categoryId = item.id
      if (this.last) {
        this.tab[0] = item.name
        this.data2 = this.data1[index].brandList
      } else {
        this.tab[0] = item.name
        this.data5 = this.data4[index].children
      }
    },
    chooseBrands (item, index) {
      this.brandsIndex2 = index
      this.changeColor = 2
      this.brandId = item.id
      this.queryBrand()
      if (!this.last) {
        this.tab[1] = item.title
        this.name1 = item.name
        this.show = false
        this.price = item.price
        this.malfunctionId = this.data4[this.brandsIndex1].children[index].id
        let per = ''
        if (item.smInfo.warrantyPeriod > 0) {
          per = `质保${item.smInfo.warrantyPeriod}天`
        } else if (item.smInfo.warrantyPeriod === 0) {
          per = '不保修'
        } else {
          per = '终身质保'
        }
        MIP.setData({
          orderData: {
            'solution': this.name1,
            'malfunctionId': this.malfunctionId,
            'price': this.price > 0 ? `￥${this.price}` : '待检测',
            'fault': item.name,
            'brandId': item.id,
            'period': `(${per})`
          },
          deviceData: {
            name1: this.name1,
            show: false,
            showTxt2: true,
            changeColor: this.changeColor,
            changeColor1: this.changeColor1
          }
        })
      } else {
        this.tab[1] = item.name
      }
    },
    chooseModel (item, index) {
      this.brandsIndex3 = index
      this.changeColor = 2
      if (this.last) {
        this.name = item.model
        MIP.setData({orderData: {
          'device': this.name
        },
        deviceData: {
          name: this.name,
          show: false,
          showTxt1: true,
          changeColor: this.changeColor,
          changeColor1: this.changeColor1
        }
        })
        // this.show = false
        this.queryColor(item.id)
      }
    },
    // 获取颜色
    queryColor (id) {
      this.deviceId = id
      request(apiUrl.getUserOrderList, 'post', {deviceId: id}).then(res => {
        if (res.code === 200) {
          this.color = res.data.list[0].deviceId
          this.attr = res.data.list[0].attributeId
          this.attrValue = res.data.list[0].id
          MIP.setData({orderData: {
            'deviceId': this.color,
            'attributeId': this.attr,
            'attrValue': this.attrValue,
            changeColor: this.changeColor,
            changeColor1: this.changeColor1
          }})
        }
      })
    },
    close () {
      MIP.setData({
        deviceData: {
          show: false,
          changeColor: this.changeColor,
          changeColor1: this.changeColor1
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
  .mask{
    position: relative;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10000;
  }
  .mask-wrapper{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.5);
    z-index: 100001;
    .mask-content{
      position: absolute;
      top: 40%;
      width: 100%;
      height: 60%;
      z-index: 100001;
      .head{
        position: relative;
        display: -webkit-flex;
        display: flex;
        flex-direction: row;
        background: #f8f9fa;
        padding: 10px 10px;
        .close{
          position: absolute;
          top: 10px;
          right: 10px;
          display: block;
          width: 20px;
          height: 20px;
          background: url('../../common/icon/close.png') no-repeat center center;
          background-size: 100% 100%;
        }
        p{
          width: 20%;
          text-align: center;
          word-break:keep-all;
          white-space:nowrap;
          overflow:hidden;/* 内容超出宽度时隐藏超出部分的内容 */
          text-overflow:ellipsis;/* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
        }
        .active{
          position: relative;
          color: #e94609;
        }
        .active:after{
          content: '';
          position: absolute;
          bottom: -10px;
          left: 0;
          width: 100%;
          height: 1px;
          background: #e94609;
        }
      }
      .content-wrapper{
        height: 100%;
        overflow-y: auto;
        background: #fff;
        -webkit-overflow-scrolling : touch;
        .content{
          height: 90%;
          padding-bottom: 90px;
          overflow-y: scroll;
          background:#fff;
          -webkit-overflow-scrolling : touch;
        .brandsList{
          position: relative;
          padding: 10px;
          font-size: 15px;
          color: #666;
          // text-indent: 20px;
          border-bottom: 1px solid #eee;
          p{
            position: absolute;
            top: 0;
            right: 10px;
            height: 20px;
            padding:10px 0;
            background: #fff;
            z-index: 99;
          }
        }
        .act{
          position: relative;
        }
        .act:after{
          content: '';
          position: absolute;
          top: 50%;
          right: 20px;
          width: 20px;
          height: 20px;
          margin-top: -10px;
          background-size: 100% 100%;
        }
      }
      }
    }
  }
 .bot{
    width: 100%;
    height: 52px;
    background: #fff;
    z-index: 100;
    .bot-left{
      float: left;
      width: 60%;
      .flex{
        span{
          display: inline-block;
          padding-top: 10px;
        }
        span:nth-child(1){
          padding-left: 10px;
        }
        span:nth-child(2){
          color: #fa5e24;
        }
      }
      p{
        padding-left: 10px;
        color: #999;
      }
    }
    .bot-right{
      float: right;
      height: 50px;
      width:40%;
      line-height: 50px;
      text-align: center;
      color: #fff;
      border-top: 1px solid #ddd;
      border-bottom: 1px solid #ddd;
      background-color: #fa5e24;
    }
  }
</style>
