<template>
  <div class="wd-infinity-chapters">
    <template v-for="item in chapters">
      <a
        v-if="level !== 0"
        :key="item.text"
        :class="{selected: active === item.text}"
        :href="item.hash"
        class="chapter-title"
        @click.stop="select(item.text)"
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

<style scoped lang="stylus">
.wd-infinity-chapters
    position relative
    div[class^="children-"]
        .chapter-title
            font-size 14px
            line-height 20px
            color #6a6b6c
            padding 10px 10px 10px 0
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
        margin-left 10px
        border-left 2px solid #f1f1f1
        &>.wd-infinity-chapters
          &>.chapter-title
            color #24292e
            >div
              &::before
                  display none

          // 隐藏多余的 border
          &>:first-child
            &:before
              content ''
              height 12px
              border-left 6px solid #fff
              position absolute
              top 0
              left -4px
          &>:last-child
            &:after
              content ''
              height 12px
              border-left 6px solid #fff
              position absolute
              bottom 0
              left -4px
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
