<template>
  <div class="wd-infinity-chapters">
    <template v-for="item in chapters">
      <a
        :key="item.text"
        :class="{selected: active === item.text}"
        :href="item.hash"
        class="chapter-title"
        @click.prevent.stop="select(item.text)"
      >
        <div>{{ item.text|raw }}</div>
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

<style scoped lang="stylus">
.wd-infinity-chapters
    div[class^="children-"]
        .chapter-title
            color #6a6b6c
            padding 15px 10px 15px 0
            display block
            cursor pointer
            margin-left 10px
            &:active
                background #f5f5f5
            &.selected
                >div
                    color #24292e
                    font-weight bold
                    border-left 2px solid #24292e
                    transition border .2s linear
            >div
                border-left 2px solid transparent
                padding-left 20px
                margin-left -12px
                &::before
                    content '·'
                    color #24292e
                    display inline-block
                    padding-right 5px

    .children-0
        // padding-left 10px
        margin-left 10px
        border-left 2px solid #f1f1f1
        &>.wd-infinity-chapters>.chapter-title
            color #24292e
            // font-weight bold
            >div
              &::before
                  display none
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
