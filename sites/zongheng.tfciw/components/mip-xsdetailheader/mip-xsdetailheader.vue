<template>
  <div class="wrapper">
    <p class="title">{{ title }}</p>
    <div class="info_wrapper">
      <mip-img
        :src="imgsrc"
        class="cover"
        width="122"
        height="162"/>
      <p class="author">作者：<span>{{ author }}</span></p>
      <p class="cal">分类：<span class="xsdetailcal">{{ cal }}</span></p>
      <p class="status">状态：<span class="xsdetailstatus">{{ status }}</span></p>
      <div class="rank_list">榜单：<span class="rank xsdetailrank">玄幻榜 NO.20</span></div>
    </div>
    <div class="btn_wrapper">
      <a
        :href="calhref"
        class="show_cal">查看目录</a>
      <a
        :href="readhref"
        class="go_read">全书免费阅读</a>
    </div>
    <div
      class="brief_wrapper"
      @click="showMore">
      <!-- <mip-showmore maxheight='72' animatetime='.3' id="showmore">
        <div>悠悠万古千万帝, 唯我独凌于众帝之上的神帝、仙王、仙帝、天帝被我如蝼蚁般捏死的不知几何。曾经有一个自诩无敌的神王，最后被我踩死了。</div>
      </mip-showmore>
      <div on="tap:showmore.toggle" data-closeclass="mip-showmore-open" data-closetext="收起内容" class="mip-showmore-btn">></div> -->
      <div class="content_wrapper">
        {{ content }}
      </div>
      <span
        href="javascript:;"
        class="show_more"><mip-img
          :src="arrow"
          width="14"
          height="14"/></span>
    </div>
  </div>
</template>

<script>
import arrowimg from '@/static/arrow_down.png'
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    imgsrc: {
      type: String,
      default: ''
    },
    author: {
      type: String,
      default: ''
    },
    cal: {
      type: String,
      default: ''
    },
    status: {
      type: String,
      default: ''
    },
    content: {
      type: String,
      default: ''
    },
    calhref: {
      type: String,
      default: ''
    },
    readhref: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      oSwitch: true,
      arrow: arrowimg
    }
  },
  mounted () {
    let oContent = this.$element.querySelector('.content_wrapper')
    let oShowMoreImg = this.$element.querySelector('.show_more')
    if (oContent.clientHeight > 72) {
      MIP.util.css(oContent, {
        '-webkit-line-clamp': '3'
      })
    } else {
      MIP.util.css(oShowMoreImg, {
        'display': 'none'
      })
    }
  },
  methods: {
    showMore () {
      let oContent = this.$element.querySelector('.content_wrapper')
      let oShowMoreImg = this.$element.querySelector('.show_more')
      if (this.oSwitch) {
        MIP.util.css(oContent, {
          '-webkit-line-clamp': '99'
        })
        MIP.util.css(oShowMoreImg, {
          'transform': 'rotate(180deg)'
        })
        this.oSwitch = false
      } else {
        MIP.util.css(oContent, {
          '-webkit-line-clamp': '3'
        })
        MIP.util.css(oShowMoreImg, {
          'transform': 'rotate(0deg)'
        })
        this.oSwitch = true
      }
    }
  }
}
</script>

<style lang="less" scoped>
.wrapper {
  background: #fff;
  padding: 30px 17px 0;
  .title {
    font-size: 19px;
    color: #000;
    line-height: 19px;
    text-align: center;
    margin: 0 0 30px 0;
  }
  .info_wrapper {
    height: 162px;
    position: relative;
    padding-left: 130px;
    margin-bottom: 15px;
    .cover {
      position: absolute;
      top: 0;
      left: 0;
    }
    p {
      font-size: 14px;
      color: #555;
      line-height: 14px;
      margin-bottom: 15px;
    }
    .rank_list {
      height: 28px;
      line-height: 28px;
      font-size: 14px;
      color: #555;
      .rank {
        display: inline-block;
        padding: 0 10px;
        background: #f5f5f5;
        color: #000;
        border-radius: 3px;
      }
    }
  }
  .btn_wrapper {
    display: flex;
    margin-bottom: 10px;
    a {
      display: inline-block;
      flex: 1;
      text-align: center;
      height: 38px;
      line-height: 38px;
      border-radius: 3px;
      box-sizing: border-box;
      &.show_cal {
        border: 1px solid #707379;
        color: #000;
      }
      &.go_read {
        margin-left: 7px;
        background: #EE6420;
        color: #fff;
      }
    }
  }
  .brief_wrapper {
    position: relative;
    font-size: 14px;
    line-height: 24px;
    color: #555;
    .content_wrapper {
      padding-right: 6px;
      overflow: hidden;
      display: -webkit-box;
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
      box-sizing: content-box;
      transition: all .3s linear;
      text-align: justify;
    }
    .show_more {
      position: absolute;
      background: #fff;
      right: -5px;
      bottom: 0;
      border: none;
      padding: 0;
      width: 14px;
      height: 14px;
      line-height: 14px;
      text-align: center;
      transition: .3s ease-in-out;
    }
  }
}
</style>
