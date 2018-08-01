<template>
  <div class="ldf-accordion">
    <div
      v-for="(item, index) in acc"
      :key="item">

      <mt-cell
        :title="item.title"
        @click.native="contentShow(index)">
        <span>
          <i
            v-if="item.state"
            class="icon iconfont icon-upforward"/>
          <i
            v-else
            class="icon iconfont icon-downforward"/>
        </span>
      </mt-cell>

      <transition-group
        name="height"
        mode="out-in">
        <div
          v-show="item.state"
          :key="index"
          class="content">
          <div>
            <p v-html="item.content"/>
          </div>
        </div>
      </transition-group>
    </div>
  </div>

</template>

<script>
import mtCell from './mip-cell'

export default {
  components: {
    mtCell
  },
  props: {
    accordion: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      acc: this.accordion
    }
  },
  mounted () {
  },
  methods: {
    contentShow (index) {
      let self = this
      // 显示到具体标签的项 的内容

      let len = self.acc.length
      for (let i = 0; i < len; i++) {
        if (index === i) {
          continue
        }
        self.acc[i].state = false
      }

      setTimeout(function () {
        self.acc[index].state = !self.acc[index].state
      }, 500)
    }
  }
}
</script>

<style lang="less">
@import '../less/const';

.ldf-accordion {
  .height-enter-active {
    max-height: 10rem;
    /*opacity: 1;*/
    /*-webkit-transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);*/
    /*transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);*/
    /*-webkit-transition: all 2s linear 0.6s;*/
    transition: all 0.5s;
  }

  .height-enter {
    max-height: 0;
    /*opacity: 0;*/
    /*-webkit-transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);*/
    /*transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);*/
    /*-webkit-transition: all 0.5s linear;*/
    /*transition: all .5s;*/
  }
  .height-leave-active {
    max-height: 0;
    /*opacity: 0;*/
    /*-webkit-transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);*/
    /*transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);*/
    /*-webkit-transition: all 0.5s linear;*/
    transition: all 0.5s;
  }
  .height-leave {
    max-height: 10rem;
    /*opacity: 1;*/
    /*-webkit-transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);*/
    /*transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);*/
    /*-webkit-transition: all 2s linear 0.6s;*/
    /*transition:all .5s;*/
  }

  background-color: white;
  position: relative;
  top: -1px;
  // margin: 0 12px;
  .mt-cell:first-child {
    background: initial;
    .mint-cell-wrapper {
      background: initial;
    }
  }
  .mint-cell {
    background-color: initial;
    background-origin: content-box;
    .mint-cell-wrapper {
      padding: 0 15px;
      background-size: 100% 1px;
      .mint-cell-title {
        text-align: left;
      }
    }
  }
  .mint-cell:first-child .mint-cell-wrapper {
    background-origin: content-box;
  }
  .content {
    overflow: hidden;
    background-color: @color-background;
    & > div {
      padding: 15px 15px;
      line-height: 18px; //dx添加
      p {
        font-size: @font-small;
        color: @color-text;
        text-align: justify;
        text-justify: inter-ideograph;
      }
    }
  }
}
</style>
