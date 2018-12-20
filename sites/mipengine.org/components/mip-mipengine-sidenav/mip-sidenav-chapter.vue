<template>
  <div class="wd-infinity-chapters">
    <template v-for="(item, index) in chapters">
      <a
        v-if="level !== 0"
        :key="item.text"
        :class="{selected: active ? active === item.hash : (index === 0 && level === 1)}"
        :href="item.hash"
        class="chapter-title"
        @click="select(item.hash)"
      >
        <div v-html="item.text"/>
      </a>
      <div
        v-if="item.children"
        :class="'children-' + level"
        :key="item.text">
        <mip-sidenav-chapter
          :chapters="item.children"
          :level="level + 1"
          :active="active"
          @select="select"/>
      </div>
    </template>
  </div>
</template>

<style scoped lang="less">
.wd-infinity-chapters {
  position: relative;
  div[class^="children-"] {
    .chapter-title {
      font-size: 14px;
      line-height: 24px;
      color: #555;
      padding: 10px 10px 10px 0;
      display: block;
      cursor: pointer;
      margin-left: 10px;
      &:active {
        background: #f5f5f5;
      }
      @media (min-width: 768px) {
        &:hover {
          background: #f5f5f5;
        }
      }
      &.selected {
        >div {
          color: #000;
          font-weight: bold;
          border-left: 2px solid #000;
          transition: border .2s linear;
        }
      }

      >div {
        border-left: 2px solid transparent;
        padding-left: 30px;
        margin-left: -12px;
        position: relative;
        &::before {
          content: '·';
          color: #000;
          display: inline-block;
          padding-right: 5px;
          position: absolute;
          left: 20px;
        }
      }
    }
  }
  .children-0 {
    margin-left: 10px;
    border-left: 2px solid #f1f1f1;
    &>.wd-infinity-chapters {
      margin-bottom: 16px;
      &>.chapter-title {
        >div {
          padding-left: 20px;
          &::before {
            display: none;
          }
        }
      }
      // 隐藏多余的 border
      &>:first-child {
        &:before {
          content: '';
          height: 12px;
          border-left: 6px solid #fff;
          position: absolute;
          top: 0;
          left: -4px;
        }
      }
      &>:last-child {
        &:after {
          content: '';
          height: 12px;
          border-left: 6px solid #fff;
          position: absolute;
          bottom: 0;
          left: -4px;
        }
      }
    }
  }

  // 特殊第4、5层
  .children-2 {
    &>.wd-infinity-chapters {
      padding-left: 10px;
      &>.chapter-title {
        >div {
          padding-left: 40px;
          margin-left: -22px;
          &::before {
            left: 30px;
          }
        }
      }
    }
  }

  .children-3 {
    &>.wd-infinity-chapters {
      padding-left: 10px;
      &>.chapter-title {
        >div {
          padding-left: 50px;
          margin-left: -32px;
          &::before {
            left: 40px;
          }
        }
      }
    }
  }
}
</style>

<script>
export default {
  name: 'MipSidenavChapter',
  props: {
    chapters: {
      type: Array,
      default: null
    },
    level: {
      type: Number,
      default: 0
    },
    active: {
      type: String,
      default: ''
    }
  },
  mounted () {
  },
  methods: {
    select (key) {
      this.$emit('select', key)
    }
  }
}
</script>
