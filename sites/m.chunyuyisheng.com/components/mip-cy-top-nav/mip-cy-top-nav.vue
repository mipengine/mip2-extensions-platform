<template>
  <div class="mip-cy-top-nav">
    <mip-fixed type="top">
      <div class="my-flex">
        <a href="https://author.baidu.com/home/1558933722224921">
          <div class="mip-cy-top-nav-logo">春雨医生</div>
        </a>
        <div class="mip-cy-top-nav-title">{{ navTitle }}</div>
        <div
          class="mip-cy-top-nav-icon"
          @click="myToggle"/>
      </div>
    </mip-fixed>
    <div
      v-if="showList"
      class="mip-cy-top-nav-list">
      <slot>
        <a
          class="item item-quick-ask"
          href="/mip/create_free_problem_page/">快速提问</a>
        <a
          class="item item-find-doctor"
          href="/mip/clinics/">找医生</a>
        <a
          class="item item-home"
          href="https://author.baidu.com/home/1558933722224921">首页</a>
        <a
          class="item item-user-center"
          href="/mip/my_all_services_page/">咨询记录</a>
      </slot>
    </div>
  </div>
</template>

<style lang="less" scoped>
.mip-cy-top-nav {
  line-height: .44rem;

  .my-flex {
    display: flex;
    padding: 0 .15rem;
    align-items: center;
    justify-content: space-between;
    background-color: #FFF;
  }

  &-logo {
    display: flex;
    align-items: center;
    font-family: PingFangSC-Regular;
    font-size: 0.14rem;
    color: #323232;

    &::before {
      content: "";
      display: inline-block;
      margin-right: 0.05rem;
      width: 0.26rem;
      height: 0.26rem;
      background-image: url("./static/image/chunyu@2x.png");
      background-size: cover;
    }
  }

  &-icon {
    position: relative;
    width: 0.14rem;
    height: 0.15rem;
    background: url("./static/image/nav-top-icon@2x.png")
      no-repeat center;
    background-size: 0.14rem 0.15rem;
  }

  &-title {
    position: absolute;
    left: 1.06rem;
    right: 1.06rem;
    text-align: center;
    font-size: 0.18rem;
    font-weight: bold;
    color: #323232;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  &-list {
    position: absolute;
    top: 0.60rem;
    right: .15rem;
    font-family: PingFangSC-Regular;
    background: rgba(0, 0, 0, 0.7);
    border-radius: 2px;

    .item {
      display: block;
      min-width: 5em;
      padding-left: 0.35rem;
      padding-right: 0.15rem;
      text-decoration: none;
      text-align: left;
      font-size: 0.14rem;
      color: #ffffff;
    }
    .item-home {
      background: url("./static/image/home@2x.png")
        no-repeat 0.15rem center;
      background-size: 0.16rem 0.16rem;
    }
    .item-quick-ask {
      background: url("./static/image/quick-ask@2x.png")
        no-repeat 0.15rem center;
      background-size: 0.16rem 0.16rem;
    }
    .item-find-doctor {
      background: url("./static/image/find-doctor@2x.png")
        no-repeat 0.15rem center;
      background-size: 0.16rem 0.16rem;
    }
    .item-user-center {
      background: url("./static/image/user-center@2x.png")
        no-repeat 0.15rem center;
      background-size: 0.16rem 0.16rem;
    }
  }
}
</style>

<script>
export default {
  props: {
    navTitle: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      showList: false
    }
  },
  methods: {
    myToggle () {
      const showList = this.showList
      this.showList = !showList
    }
  }
}
</script>
