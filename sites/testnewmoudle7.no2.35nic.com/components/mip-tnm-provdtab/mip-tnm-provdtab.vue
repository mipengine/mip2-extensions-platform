<template>
  <div>
    <div :is="currentView"/>
    <div class="tab-tit">
      <a
        href="javascript:void(0)"
        class="tit-link current"
        @click="tabChange(protabitem1,$event)">
        {{ pro_list[0] }}
      </a>
      <a
        href="javascript:void(0)"
        class="tit-link"
        @click="tabChange(protabitem2,$event)">
        {{ pro_list[1] }}
      </a>
      <a
        href="javascript:void(0)"
        class="tit-link"
        @click="tabChange(protabitem3,$event)">
        {{ pro_list[2] }}
      </a>
    </div>
  </div>
</template>
<style scoped>
.tab-tit a {
  float: left;
  margin: 0;
  width: 33.3%;
  text-align: center;
}
.tab-tit .tit-link {
  padding: 20px 0;
  text-decoration: none;
  color: #4b5052;
  font-size: 14px;
  background: #e4e8e9;
}
.tab-tit .current {
  outline: 0;
  background: #f6f8f9;
  z-index: 4;
  position: relative;
  padding: 20px 0;
  text-decoration: none;
  color: #4b5052;
  font-size: 14px;
  display: block;
}
</style>
<script>
import apiUrl from '../../common/js/config.api'
import protabitem1 from './mip-tnm-protabitem1'
import protabitem2 from './mip-tnm-protabitem2'
import protabitem3 from './mip-tnm-protabitem3'
export default {
  components: {
    protabitem1,
    protabitem2,
    protabitem3
  },
  data () {
    return {
      protabitem1: 'protabitem1',
      protabitem2: 'protabitem2',
      protabitem3: 'protabitem3',
      currentView: 'protabitem1', // 默认选中第一项
      pro_list: []
    }
  },
  mounted () {
    fetch(apiUrl.provdtabUrl).then(response => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error('provdtab went wrong!')
      }
    }).then(proinfos => {
      this.pro_list.push(proinfos.data.items[0].productName)
      this.pro_list.push(proinfos.data.items[1].productName)
      this.pro_list.push(proinfos.data.items[2].productName)
    })
  },
  methods: {
    tabChange (tabItem, event) {
      this.currentView = tabItem
      const sibling = event.currentTarget.parentElement.children
      for (let i = 0; i < sibling.length; i++) {
        sibling[i].className = 'tit-link'
      }
      event.currentTarget.className = 'current'
    }
  }
}
</script>
