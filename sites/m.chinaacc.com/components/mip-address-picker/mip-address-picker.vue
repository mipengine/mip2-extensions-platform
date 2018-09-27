<template>
  <div
    v-if="show"
    class="distpicker-address-wrapper">
    <div
      v-if="show"
      class="adressMaker"/>
    <div class="aressWrapper">
      <div class="address-header">
        <ul class="clearfix">
          <li
            :class="{'active' : tab === 1}"
            class="fl"
            @click="resetProvince">
            <span>{{ currentProvince.name ? currentProvince.name : placeholders.province }}</span>
          </li>
          <li
            v-if="showCityTab"
            :class="{'active' : tab === 2}"
            class="fl"
            @click="resetCity">
            <span>{{ currentCity.name ? currentCity.name : placeholders.city }}</span>
          </li>
          <li
            v-if="showAreaTab"
            :class="{'active' : tab === 3}"
            class="fl">
            <span>{{ currentArea.name ? currentArea.name : placeholders.area }}</span>
          </li>
        </ul>
      </div>
      <div class="address-container">
        <ul v-if="tab === 1">
          <li
            v-for="(item, index) in provinces"
            :key="index"
            @click="chooseProvince(item.areaID,item.areaName)">{{ item.areaName }}</li>
        </ul>
        <ul v-if="tab === 2">
          <li
            v-for="(item, index) in citys"
            :key="index"
            @click="chooseCity(item.areaID,item.areaName)">{{ item.areaName }}</li>
        </ul>
        <ul v-if="tab === 3">
          <li
            v-for="(item, index) in areas"
            :key="index"
            @click="chooseArea(item.areaID,item.areaName)">{{ item.areaName }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { getAreaCode } from '../../common/api'
export default {
  data () {
    return {
      show: false,
      placeholders: {
        province: '省',
        city: '市',
        area: '区'
      },
      tab: 1,
      showCityTab: false,
      showAreaTab: false,
      provinces: [],
      citys: [],
      areas: [],
      currentProvince: {},
      currentCity: {},
      currentArea: {}
    }
  },
  mounted () {
    const that = this
    this.$on('initPicker', function () {
      that.initPicker()
    })
  },
  methods: {
    initPicker () {
      this.show = !this.show
      if (this.show) {
        this.getData('', 'province')
      }
    },
    getData (id, type) {
      const that = this
      if (id + '' === '' || id == null) {
        id = '9000'
      }
      id = typeof id + '' === 'number' ? id.toString() : id
      let setting = {
        parentId: id
      }
      getAreaCode(setting).then(res => {
        let arr = []
        if (res !== undefined || res != null || res + '' !== '') {
          res.forEach(item => {
            arr.push({
              areaID: item.locId,
              areaName: item.locName
            })
          })
        }
        switch (type) {
          case 'province':
            that.provinces = arr
            break
          case 'city':
            that.citys = arr
            break
          case 'area':
            that.areas = arr
            break
        }
      })
    },
    chooseProvince (id, name) {
      this.currentProvince = { id: id, name: name }
      this.tab = 2
      this.showCityTab = true
      this.showAreaTab = false
      this.getData(id, 'city')
    },
    chooseCity (id, name) {
      this.currentCity = { id: id, name: name }
      this.tab = 3
      this.showCityTab = true
      this.showAreaTab = true
      this.getData(id, 'area')
    },
    chooseArea (id, name) {
      this.currentArea = { id: id, name: name }
      this.show = false
      let areaData = {
        province: this.currentProvince,
        city: this.currentCity,
        area: this.currentArea
      }
      this.$emit('areaChange', areaData)
    },
    resetProvince () {
      this.tab = 1
      this.showCityTab = false
      this.showAreaTab = false
      this.currentProvince = {}
      this.currentCity = {}
      this.currentArea = {}
      this.getData('', 'province')
    },
    resetCity () {
      this.tab = 2
      this.showCityTab = true
      this.showAreaTab = false
      this.currentCity = {}
      this.currentArea = {}
      this.getData(this.currentProvince.id, 'city')
    }
  }
}
</script>
