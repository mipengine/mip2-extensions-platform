<template>
  <div
    v-if="data"
    class="fate_tab_info">
    <div
      v-for="(dat, key) in data"
      v-if="key == selected"
      :key="key"
      class="fate_info_box info_box" >
      <div class="clear">
        <dl class="ft_info fl">
          <dt class="head">
            <mip-img :src="img"/>
          </dt>
        <dd class="name">{{ name }}</dd></dl>
        <dl class="ft_info2 fr">
          <dd class="item1">{{ tabs[ind] }}运势
          <span class="date">({{ dat.vdate }})</span></dd>
          <dd
            :data="dat.index[0].s"
            class="item2 starbox">
            <span class="star"/>
          </dd>
          <dd class="item3">{{ dat.desc }}</dd>
        </dl>
      </div>
      <ul class="aspect clear">
        <li
          v-for="(item, key) in dat.index"
          v-if="key > 0"
          :key="key">
          <span>{{ item.t }}</span>
          <div
            v-if="item.s"
            :data="item.s"
            class="starbox">
            <span class="star"/>
          </div>
          <span
            v-if="item.v"
            class="text">
            {{ item.v }}
          </span>
        </li>
      </ul>
      <p class="line curr2"/>
      <div class="desc">
        <dl
          v-for="(item2, key) in dat.content"
          :key="key">
          <dt>{{ item2.t }}</dt>
          <dd> {{ item2.v }}</dd>
        </dl>
      </div>
    </div>
    <mip-fixed
      type="bottom"
      class="changeDay">
      <span
        v-for="(tab,i) in tabs"
        :class="{curr:selected==i}"
        :key="i"
        @click="tabChange(i)">{{ tab }}</span>
    </mip-fixed>
  </div>
</template>
<style scoped>
.changeDay{z-index: 999 !important;}
.changeDay span.curr{color:#7f7ff3;background:#f4f4fe;}
</style>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    img: {
      type: String,
      required: true
    }
  },
  data: function () {
    return {
      tabs: [`今日`, `明日`, `本周`, `本月`, `今年`, `爱情`],
      selected: '0',
      data: {}
    }
  },
  created () {
    const _this = this
    const url = `../apidat/fortune.js?id=` + _this.id + `&ld=-1`
    fetch(url).then(function (response) {
      return response.json()
    }).then(function (myJson) {
      _this.data = myJson.data
    })
  },
  mounted: function () {
    const width = MIP.viewport.getWidth()
    const $width = width > 640 ? 640 : width
    const $fontSize = $width * 100 / 1080
    const html = document.querySelectorAll('html')
    html[0].style.fontSize = $fontSize + `px`
    const $height = MIP.viewport.getHeight()
    const _h = $height - 44
    const fullpage = document.querySelectorAll('.fullpage')
    fullpage[0].style.height = _h + `px`
    const contain = document.querySelectorAll('.contain')
    contain[0].style.height = _h + `px`
  },
  methods: {
    tabChange: function (i) {
      this.selected = i
    }
  }
}
</script>
