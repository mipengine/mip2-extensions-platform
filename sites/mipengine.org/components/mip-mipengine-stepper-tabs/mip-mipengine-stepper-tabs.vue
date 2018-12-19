<template>
  <div
    v-if="stepList && stepList.length"
    class="step-menu-wrapper"
  >
    <ul>
      <li
        v-for="(item, index) in stepList"
        :key="index"
        :class="{'item-step': true, 'active': item.url === codelabStepSelected}"
      >
        <a
          :href="item.url"
          data-type="mip"
        >
          <div :class="{'step-num': true, 'step-done': index <= selected}">
            <span class="num">{{ index + 1 }}</span>
            <span class="icon-pass"><i class="iconfont icon-info"/></span>
          </div>
          <span class="step-name">{{ item.name }}</span>
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
    stepList () {
      if (!this.menuSteps) return
      if (this.menuSteps instanceof Array) {
        return this.menuSteps
      }
      if (this.menuSteps.children) {
        return this.menuSteps.children
      }
    },
    selected () {
      let activeIndex = this.stepList && this.stepList.findIndex(item => {
        return item.url === location.pathname
      })
      return activeIndex >= 0 ? activeIndex : 0
    }
  }
}
</script>
