<template>
  <div class="brandList">
    <div class="tips">
      <span class="nums">汇桔云为您找到相关结果<a>{{ total }}</a>条</span>
      <span
        class="filterLink"
        on="tap:right-sidebar.open">
        筛选
      </span>
    </div>
    <div ref="brandListContainer">
      <div
        v-for="(item, index) in dataList"
        :key="index"
        class="listItem">
        <p class="itemTitle">
          <mip-img
            :alt="item.brandName"
            :src="item.imgurl"
            popup
            class="brandImg"/>
          <a
            data-type="mip"
            data-title="目标页面标题"
            href="www.baidu.com">
            <span>商标名称：</span>
            <span v-html="item.brandName||'--'"/>
          </a>
        </p>
        <p class="itemInfo">
          <span class="leftText ws3">注 册 号：</span>
          <span class="rightText" >{{ item.regCode||'--' }}</span>
        </p>
        <p class="itemInfo">
          <span class="leftText">申请日期：</span>
          <span class="rightText">{{ item.applyDate||'--' }}</span>
        </p>
        <p class="itemInfo">
          <span class="leftText ws2">类 别：</span>
          <span class="rightText">第{{ item.intCls||'--' }}类 {{ item.className||'--' }}</span>
        </p>
        <p class="itemInfo">
          <span class="leftText ws2">状 态：</span>
          <span class="rightText">{{ item.flowStatus||'' }}</span>
          <!--<span class="brandStatus warm">风险</span>-->
        </p>
        <span
          v-if="item.addStatus"
          class="itemBtn"
          @click="addEntrust(item.id,item.brandName)">加入托管</span>
        <span
          v-else
          class="itemBtn
           entrusted">
          已托管
        </span>
      </div>
      <div
        class="seeMore"
        @click="seeMore">点击加载更多</div>
    </div>
    <mip-sidebar
      id="right-sidebar"
      layout="nodisplay"
      side="right"
      class="mip-hidden">
      <div class="filterBox">
        <div class="filterType">
          <p class="typeTitle"><span>申请类别</span>
            <i class="showUp"/>
          </p>
          <ul class="filterItems">
            <li><span>01.化学原料</span>(232)</li>
            <li><span>01.化学原料</span>(232)</li>
            <li><span>01.化学原料</span>(232)</li>
            <li><span>01.化学原料</span>(232)</li>
          </ul>
        </div>
      </div>
    </mip-sidebar>
  </div>
</template>

<style lang="less" scoped>
.brandList{
    background:#F4F4F4;
    .tips{
    width: 100%;
    height: 35px;
    line-height: 35px;
    background: #F4F4F4;
    .nums{
      color:#333333;
      padding: 0 16px;
      font-size: 14px;
      font-weight: lighter;
      a{
        padding: 0 5px;
        color:#FF9400;
        font-weight: 500;
      }
    }
      .filterLink{
          color:#FF9400;
          font-size: 14px;
          position: absolute;
          right: 15px;
      }
  }
    .listItem{
    background: #fff;
    padding: 18px 16px;
    position: relative;
    margin-bottom: 5px;
    .itemTitle{
      color: #333333;
      font-size: 17px;
      font-weight: 500;
      word-spacing: 1px;
      line-height: 23px;
      margin-bottom: 4px;
       .brandImg{
         border: 1px solid #ddd;
         border-radius: 2px;
         width: 19px;
         height: 19px;
         display: inline-block;
         vertical-align: sub;
         margin-right: 7px;
       }
    }
    .itemInfo{
      font-size: 15px;
      line-height: 25px;
      .leftText{
        width: 76px;
        color: #888888;
        &.ws3{
          word-spacing: 3px;
        }
        &.ws2{
          word-spacing: 26px;
        }
      }
      .rightText{
        color: #333333;
      }
      .brandStatus{
        display: inline-block;
        margin-left: 5px;
        width: 35px;
        height: 18px;
        border-radius: 2px;
        line-height: 18px;
        font-size: 13px;
        text-align: center;
        border: 1px solid #4F89F5;
        color:#4F89F5;
        &.warm{
          border: 1px solid #EF554F;
          color:#EF554F;
        }
      }
    }
    .itemBtn{
       height: 21px;
       width: 65px;
       position: absolute;
       top:64px;
       right: 13px;
       text-align: center;
       line-height: 21px;
       font-size: 13px;
       color:#fff;
       background: #FF9400;
      &.entrusted{
        background: #5AC0C8;
      }
    }
  }
    .seeMore{
        padding: 10px 0;
        background: #ffffff;
        text-align: center;
        cursor: pointer;
        font-size: 16px;
        display: block;
        color: #333;
        line-height: 30px;
    }
    .filterBox{
        width: 300px;
        height: 100%;
        box-sizing: border-box;
        padding: 100px 12px 0;
        overflow-y: scroll;
        overflow-x:hidden ;
        background: #ffffff;
        .filterType{
            overflow: hidden;
            .typeTitle{
                width: 100%;
                font-size: 17px;
                color:#333;
                line-height: 24px;
                font-weight: bold;
            }
            .filterItems{
                margin-top:8px;
                width: 315px;
                li{
                    display: block;
                    float: left;
                    border-radius: 2px;
                    border: 1px solid #DADADA;
                    background: #F8F8F8;
                    font-size: 11px;
                    text-align: center;
                    line-height: 25px;
                    width: 128px;
                    height: 25px;
                    margin-right: 15px;
                    margin-bottom: 10px;
                }
            }
        }

    }
}
</style>

<script>
let util = MIP.util
let CustomStorage = util.customStorage
let storage = new CustomStorage(0)
export default {
  data () {
    return {
      keyword: '',
      pageSize: 10,
      pageNo: 1,
      condition: '',
      dataList: [],
      total: 0
    }
  },
  updated () {
    this.getDefaultImg()
  },
  mounted () {
    this.getDefaultImg()
    this.init()
  },
  methods: {
    /**
             * 初始化组件
             *
             */
    init () {
      this.search()
      this.registerEvent()
    },
    /**
             * 注册
             *
             */
    registerEvent () {
      // 外部触发搜索
      this.$on('search', () => {
        this.pageNo = 1
        this.search()
      })
    },
    // 获取搜索数据
    getFitles () {

    },
    /**
             * 把搜索数据存入缓存，触发搜索方法
             *
             */
    search () {
      let keyword = storage.get('keyword', this.keyword)
      fetch(`https://huijuyun.com/openBrand/findBrandPage?keyword=${keyword}&pageNo=${this.pageNo}`).then((response) => {
        return response.json()
      }).then((data) => {
        if (data.code === 1 && data.object) {
          this.total = data.object.count
          if (data.object.pageNo === 1) {
            this.dataList = data.object.list
          } else {
            this.dataList = [...this.dataList, ...data.object.list]
          }
        }
      }).catch(e => {
        console.log(e)
      })
    },
    getDefaultImg () {
      let items = document.getElementsByTagName('img')
      for (let item of items) {
        if (!item.complete || (typeof item.naturalWidth === 'undefined' && item.naturalWidth === 0) || !item.src) {
          item.src = '/static/image/default.jpg'
        }
      }
    },
    /* 加入托管 */
    addEntrust (id) {

    },
    /* 查看更多 */
    seeMore () {
      this.pageNo++
      this.search()
    }
  }
}
</script>
