<template>
  <div class="sidenav-wrapper">
    <sidenav-menu
      :menu="menu"
      :url="url"
      :level="level">
      <sidenav-chapter
        :chapters="chapters"
        :level="level"
        :active="activeChapter"
        @select="chapterSelected"/>
    </sidenav-menu>
  </div>
</template>

<style scoped lang="stylus">
    .sidenav-wrapper
        width 280px
</style>

<script>
import SidenavChapter from './sidenav-chapter'
import SidenavMenu from './sidenav-menu'

export default {
  name: 'MipSidenav',
  components: {
    SidenavChapter,
    SidenavMenu
  },
  props: {
    menu: {
      type: Array,
      default: null
    },
    chapters: {
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
    }
  },
  data () {
    return {
      activeChapter: ''
    }
  },
  methods: {
    chapterSelected (key) {
      this.activeChapter = key
    }
  }
}
</script>
