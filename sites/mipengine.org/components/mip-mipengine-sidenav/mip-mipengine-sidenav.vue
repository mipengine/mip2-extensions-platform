<template>
  <div
    ref="sidenavLeft"
    class="sidenav-wrapper"
    @click="click($event)"
  >
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
import SidenavChapter from './mip-sidenav-chapter'
import SidenavMenu from './mip-sidenav-menu'

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
    let activeDom = this.$refs.sidenavLeft.querySelectorAll('.activemenu')[0]
    let activeTop = activeDom ? activeDom.offsetTop : 0
    let scrollDom = document.querySelectorAll('.layout-sidebar')[0]
    if (scrollDom) {
      scrollDom.scrollTop = activeTop
    }
  },
  methods: {
    chapterSelected (key) {
      this.activeChapter = key
    },
    click (e) {
      this.$nextTick(() => {
        this.$emit('clicked', e)
      })
    }
  }
}
</script>
