<template>
  <div
    ref="quotListWrapper"
    class="mip-jufair-quotlist-wrapper">
    <div
      v-for="item in quotlist"
      :key="item.name"
      class="quot-item">
      <div class="quot-left">
        <mip-img
          :alt="item.name"
          :src="item.src"
          layout="responsive"
          width="83"
          height="49"
          class="mip-quot-img"/>
        <p>{{ item.name }}<br>{{ item.code }}</p>
      </div>
      <div class="quot-right">
        <p>
          <span class="label">中间价：</span>
          <span class="value">{{ item.zhesuan }}</span>
        </p>
        <p class="time">{{ item.day + ' ' + item.time }}</p>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
@scale: 375/ 10;
  /*外汇牌价*/
  .mip-jufair-quotlist-wrapper {
    height: 75rem/@scale;
    padding: 0 12rem/@scale;
    margin-top: 10rem/@scale;
    overflow: hidden;

    .quot-item {
      height: 75rem/@scale;
      overflow: hidden;
      background: #fff;
    }

    .quot-left {
      float: left;
      height: 100%;
      padding-left: 8rem/@scale;
      display: flex;
      flex-direction: row;
      align-items: center;

      .mip-quot-img {
        width: 81rem/@scale;
        height: 47rem/@scale;
        margin-right: 5rem/@scale;
        border: solid 1px #d6d7de;
      }

      p {
        font-family: AdobeHeitiStd-Regular;
        font-size: 14rem/@scale;
        color: #333333;
      }
    }

    .quot-right {
      height: 100%;
      padding-right: 8rem/@scale;
      float: right;
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: left;

      p {
        font-family: AdobeHeitiStd-Regular;
        color: #333333;
      }

      .label {
        font-size: 12rem/@scale;
        box-sizing: border-box;
        padding-top: 2px;
      }

      .value {
        font-size: 16rem/@scale;
      }

      .time {
        font-size: 12rem/@scale;
        color: #666;
      }
    }
  }

</style>

<script>
import * as $ from 'jquery'

export default {
  props: {
    quotlist: {
      type: Array,
      default: function () { return [] }
    }
  },
  data () {
    return {
    }
  },
  mounted () {
    setInterval(() => {
      let firstNode = $(this.$refs.quotListWrapper)[0].firstChild
      $(this.$refs.quotListWrapper)
        .stop(true)
        .animate({ marginTop: '-2rem' }, 500, () => {
          $(this.$refs.quotListWrapper).css({ marginTop: '0px' })
          $(this.$refs.quotListWrapper).append(firstNode)
        })
    }, 3000)
  },
  methods: {
  }
}
</script>
