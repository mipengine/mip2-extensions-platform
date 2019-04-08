<template>
  <div class="wrapper">
    <div class="loop-exhibition">
      <ul ref="otherExh">
        <li
          v-for="item in otherexhibitionlist"
          :key="item.id">
          <a
            :href="'/exhibition/'+item.id+'.html'"
            :title="item.exhibitionName">
            <div class="img-box">
              <mip-img
                :src="item.basicPic"
                :alt="item.exhibitionName"/>
            </div>
            <div class="item-info">
              <p class="item-name">{{ item.exhibitionName }}</p>
            </div>
          </a>
        </li>
      </ul>
      <div class="more-btn">
        <a
          href="/exhibition/"
          title="国际展会">
          <span>查看更多</span>
        </a>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
@scale: 375/10;
  .loop-exhibition {
    width: 10rem;
    box-sizing: border-box;
    padding-left: 12rem/@scale;
    overflow-y: hidden;
    margin-top: 20rem/@scale;

    &::-webkit-scrollbar {
      display: none;
    }

    ul {
      width: 2800rem/@scale;
      touch-action: pan-y;
      &::after,&::before{
        content: "";
        display: block;
      }

      &::after{
        clear: both;
      }

      li {
        float: left;
        width: 130rem/@scale;
        margin-right: 10rem/@scale;
        border-radius: 5px 5px 0 0;
        overflow: hidden;

        .img-box {
          width: 100%;
          height: 80rem/@scale;
          overflow: hidden;
          box-sizing: border-box;
          border: solid 1px #d6d7de;
          border-radius: 5px 5px 0 0;
          display: flex;
          align-items: center;

          img {
            width: 100%;
            height: auto;
            min-height: 100%;
          }
        }

        .item-info {
          background: #fff;
          box-sizing: border-box;
          padding: 8rem/@scale 5rem/@scale;
          color: #333;

          .item-name {
            font-family: AdobeHeitiStd-Regular;
            font-size: 14rem/@scale;
            font-weight: 700;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
          }
        }
      }
    }

    .more-btn {
      text-align: center;
      margin-top: 25px;

      span {
        background: #f83536;
        font-family: AdobeHeitiStd-Regular;
        font-size: 14rem/@scale;
        padding: 3rem/@scale 8rem/@scale;
        color: #fff;
        display: inline-block;
        border-radius: 3px;
        font-weight: 700;
      }
    }
  }
</style>

<script>
import * as $ from 'jquery'

export default {
  props: {
    otherexhibitionlist: {type: Array,
      default: function () { return [] }}
  },
  data () {
    return {
    }
  },
  mounted () {
    /* 底部滚动图 */
    setInterval(() => {
      let firstNode = $(this.$refs.otherExh)[0].firstChild
      $(this.$refs.otherExh).stop(true).animate({marginLeft: '-3.46667rem'}, 500, () => {
        $(this.$refs.otherExh).css({marginLeft: '0px'})
        $(this.$refs.otherExh).append(firstNode)
      })
    }, 3000)
  },
  methods: {
  }
}
</script>
