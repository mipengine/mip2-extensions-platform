<template>
  <mip-fixed
    type="top"
    class="mip-fix-top">
    <div class="list-type-nav-container">
      <div
        v-if="showNav"
        class="list-type-nav">
        <div class="type-nav-container">
          <div
            v-for="(showType,index) in showTypeData"
            :key="index"
            :class="{'active': showType.type === activeType}"
            class="type-nav"
            @click="switchType(showType.type)">
            <div class="type-name">{{ showType.title }}</div>
          </div>
        </div>
      </div>
      <div
        v-if="!showNav"
        class="list-type-nav">
        <div class="type-nav-container">
          <div class="type-nav">
            <div class="type-name">“{{ keyword }}”相关的演出</div>
          </div>
          <div
            class="type-nav"
            @click="resetKeyword">
            <div
              class="type-name"
              style="color:rgb(241, 14, 112);">清空搜索</div>
          </div>
        </div>
      </div>
    </div>
  </mip-fixed>
</template>

<style scoped lang="less">
.mip-fix-top{
    top: 88px !important;
}
@main-color: #ff1d41;
@boder-color:#eaeaeb;
.box-flex(@flex){
    -moz-box-flex: @flex;
    -webkit-box-flex: @flex;
    box-flex: @flex;
    flex: @flex;
    display: block;
}
.list-type-nav-container{
        display: flex;
        align-items: center;
        border-bottom: 1px solid @boder-color;
        position: relative;
        overflow: visible;
        background: #fff;
    }
    .list-type-nav{
        .box-flex(1);
        overflow-x: auto;
        overflow-y: hidden;
        line-height: 5rem;
        .type-nav-container{
            min-width: 100%;
            width: 58.5rem;
            display: flex;
            height: 5rem;
            .type-nav{
                padding: 0 1.3rem;
                height: 100%;
                text-align: center;
                font-size: 1.4rem;
                white-space: nowrap;
                &.active{
                    .type-name{
                         border-bottom: 3px solid @main-color;
                    }
                    color: @main-color;
                }
            }
        }
    }
</style>

<script>
export default {
  props: {
    'prefixUrl': {
      type: String,
      default: ''
    },
    'showTypeData': {
      type: Array,
      default: () => []
    },
    'activeType': {
      type: String,
      default: '1'
    },
    'keyword': {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      showNav: true
    }
  },
  mounted () {
    let me = this
    console.log('列表导航加载ok!')
    MIP.watch('keyword', newValue => {
      me.showNav = newValue === ''
      me.keyword = newValue
    })
  },
  methods: {
    resetKeyword () {
      MIP.setData({
        keyword: ''
      })
    },
    switchType (type) {
      MIP.setData({
        activeType: type,
        loading: true
      })
      setTimeout(function () {
        if (MIP.getData('loading')) {
          MIP.setData({
            loading: false
          })
        }
      }, 2000)
    }
  }
}
</script>
