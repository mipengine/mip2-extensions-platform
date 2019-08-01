<template>
  <div class="wd-infinity-menu">
    <template v-for="(menuItem, idx) in menu">
      <div
        v-if="menuItem.children"
        :class="'l-' + level"
        :key="menuItem.path">
        <div
          :class="{'activemenu': idx === activeindex}"
          class="folder show">{{ menuItem.text || menuItem.name }}</div>
        <div :class="'children-' + level">
          <mip-sidenav
            :menu="menuItem.children"
            :level="level + 1"
            :url="url">
            <template slot-scope="slotProps">
              <slot/>
            </template>
          </mip-sidenav>
        </div>
      </div>
      <div
        v-else
        :class="'l-' + level"
        :key="menuItem.path">
        <div v-if="url === menuItem.url">
          <div class="sub-folder">{{ menuItem.text || menuItem.name }}</div>
          <slot/>
        </div>
        <a
          v-else
          :href="menuItem.url"
          data-type="mip">
          {{ menuItem.text || menuItem.name }}
        </a>
      </div>
    </template>
  </div>
</template>

<style scoped lang="less">
.wd-infinity-menu {
  div[class^="l-"] {
    a {
      display: block;
      margin-bottom: 4px;
      padding: 10px 10px;
      color: #6a6b6c;
      font-size: 14px;
      line-height: 20px;
      &:active {
        background: #f5f5f5;
      }
      @media (min-width: 768px) {
        &:hover {
          background: #f5f5f5;
        }
      }
    }
    .sub-folder {
      color: #000;
      font-weight: bold;
      padding: 12px 10px;
      margin-bottom: 3px;
      line-height: 24px;
    }
  }
  .l-0 .folder {
    color: #000;
    font-size: 18px;
    line-height: 24px;
    padding: 30px 0 24px 10px;
    &.activemenu {
      font-weight: bold;
    }
  }
  .l-1 .folder {
    // 只有第一级的 folder 不缩进，后续都缩进
    padding: 10px 0 14px 30px;
  }
}

.children-1 {
  .wd-infinity-menu {
    padding-left: 20px;
  }
}

.wd-infinity-chapters {
  div[class^="children-"] {
    padding-left: 20px;
    .chapter-title {
      margin: 16px 0;
      display: block;
      &::before {
        content: '·';
        display: inline-block;
        padding-right: 5px;
      }
    }
  }

  .children-0 {
    border-left: 2px solid #f1f1f1;
    &>.wd-infinity-chapters>.chapter-title {
      color: #000;
      &::before {
        display: none;
      }
    }
  }
}
</style>

<script>
export default {
  name: 'MipSidenav',
  props: {
    menu: {
      type: Array,
      default: null
    },
    level: {
      type: Number,
      default: 0
    },
    url: {
      type: String,
      default: ''
    },
    activeindex: {
      type: Number,
      default: 0
    }
  }
}
</script>
