<template>
  <div class="sidenav-wrapper">
    <sidenav-menu
      :menu="menu"
      :url="url"
      :level="level"
      :activeindex="activeIndex">
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
  computed: {
    activeIndex: function () {
      return this.menu.findIndex(m => {
        return m.children && m.children.find(c => {
          return c.url === this.url
        })
      })
    }
  },
  mounted () {
    let activeTop = document.querySelectorAll('.activemenu')[0].offsetTop || 0
    let scrollDom = document.querySelectorAll('.layout-sidebar')[0]
    if (scrollDom) {
      scrollDom.scrollTop = activeTop + 60
    }
  },
  methods: {
    chapterSelected (key) {
      this.activeChapter = key
    }
  }
}
</script>
