<template>
<div  v-if="stepList && stepList.length" class="step-menu-wrapper">
    <ul>
        <li v-for="(item, index) in stepList"
            :class="['item-step', {'active': item.url === codelabStepSelected}]">
            <a :href="item.url" data-type="mip">
              <div :class="['step-num', {'step-done': index <= selected}]">
                <span class="num">{{ index + 1}}</span>
                <span class="icon-pass"><i class="iconfont icon-info"></i></span>
              </div>
              <span class="step-name">{{ item.name}}</span>
            </a>
        </li>
    </ul>
</div>
</template>

<style lang="less" scoped>

.step-menu-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  li {
    list-style: none;
    width: 300px;
    box-sizing: border-box;
    padding: 30px 20px 10px;;
    color: #666;
    cursor: pointer;

    .step-num {
      display: inline-block;
      margin-right: 10px;
      .num {
        display: inline-block;
        width: 16px;
        height: 16px;
        text-align: center;
      }
      .icon-pass {
        display: none;
      }
      &.step-done {
        width: 16px;
        height: 16px;
        .num {
          display: none;
        }
        .icon-pass {
          display: inline-block;
          width: 16px;
          height: 16px;  
        }
          
      }
    }

    &.active {
      color: #333;
      .step-name {
        font-weight: bold;
      } 
    } 
  }
}

.step-content-wrapper {
  margin: 0 20px 40px 300px;
  .step-content-list {
    .content-item {
      display: none;
      line-height: 30px;

      &.show {
        display: block;
      }
    }
  }
}

@media screen and (max-width: 767px) {
  .step-content-wrapper {
    margin: 0 20px 40px;
  }

}

// @font-face {font-family: "iconfont";
//   src: url('//gss0.baidu.com/9rkZbzqaKgQUohGko9WTAnF6hhy/assets/mip/site/iconfont-bfcb4c69?t=1534744468782'); /* IE9*/
//   src: url('//gss0.baidu.com/9rkZbzqaKgQUohGko9WTAnF6hhy/assets/mip/site/iconfont-bfcb4c69?t=1534744468782#iefix') format('embedded-opentype'), /* IE6-IE8 */
//   url('data:application/x-font-woff;charset=utf-8;base64,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') format('woff'),
//   url('//gss0.baidu.com/9rkZbzqaKgQUohGko9WTAnF6hhy/assets/mip/site/iconfont-1896ca09?t=1534744468782') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
//   url('//gss0.baidu.com/9rkZbzqaKgQUohGko9WTAnF6hhy/assets/mip/site/iconfont-ddefe57a?t=1534744468782#iconfont') format('svg'); /* iOS 4.1- */
// }

// .iconfont {
//   font-family:"iconfont" !important;
//   font-size:16px;
//   font-style:normal;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
// }

// .icon-info:before { content: "\e603"; }

</style>

<script>

export default {
  name: 'MipStepperTabs',
  props: {
    codelabStepSelected: {
      type: String,
      default: '/codelab/index.html'
    },
    menuSteps: {
      type: [Object, Array],
      default: null
    }
  },
  computed: {
    stepList() {
      if (!this.menuSteps) return
      if (this.menuSteps instanceof Array) {
        return this.menuSteps
      }
      if (this.menuSteps.children) {
        return this.menuSteps.children
      }

    },
    selected() {

      let activeIndex = this.stepList && this.stepList.findIndex(item => {
        return item.url === location.pathname
      })
      return activeIndex >= 0 ? activeIndex : 0
    }
  },
  methods: {},
  mounted () {
  }
}
</script>


