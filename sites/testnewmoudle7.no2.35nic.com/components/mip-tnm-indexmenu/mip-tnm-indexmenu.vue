<template>
  <div class="menu-box">
    <div v-if="menu_list.length<1"/>
    <div v-else>
      <ul>
        <li
          v-for="item in menu_list"
          :key="item.nmShowTopic"
          class="menu-item">
          <div
            :style="item.wapMenuIcon"
            class="vicon"/>
          <a
            :href="item.thePageUrl"
            class="menu-topic">
            {{ item.nmShowTopic }}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
</style>
<script>
export default {
  props: {
    src: {
      type: String,
      default () {
        return ''
      }
    },
    backimage: {
      type: String,
      default () {
        return ''
      }
    }
  },
  data () {
    return {
      menu_list: [],
      menuStyle: {
        width: '100%',
        backgroundImage: 'url(' + this.backimage + ')'
      }
    }
  },
  mounted () {
    fetch(this.src).then(response => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error('job list went wrong!')
      }
    }).then(jobsinfos => {
      this.menu_list = jobsinfos.data.items
      if (this.menu_list.length > 0) {
        this.menu_list.forEach(element => {
          if (element.thePageUrl === '' || element.thePageUrl == null) {
          }

          const lefticon = element.wapMenuIcon.split('|')
          element.wapMenuIcon = 'background-image:url(' + lefticon[0] + ');'
        })
      }
    })
  }
}
</script>
