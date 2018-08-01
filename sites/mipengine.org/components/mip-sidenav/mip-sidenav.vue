<template>
  <div class="sidenav-wrapper">
    <sidenav-menu
      :menu="menu"
      :url="url"
      :level="level">
      <template slot-scope="slotProps">
        <sidenav-chapter
          :chapters="chapters"
          :level="level"
          :active="activeChapter"
          @select="chapterSelected"/>
      </template>
    </sidenav-menu>
  </div>
</template>

<style scoped lang="less">
.sidenav-wrapper {
}
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
      activeChapter: decodeURIComponent(location.hash) || ''
    }
  },
  methods: {
    chapterSelected (key) {
      this.activeChapter = key
    }
  }
}
</script>
