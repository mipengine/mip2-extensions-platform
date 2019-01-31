<template>
  <div>
    <div class="imgitem">
      <mip-img
        :src="pro_list.productImage"
        class="proimg"/>
    </div>
    <div class="item">
      <div class="tit">
        {{ pro_title }}
      </div>
      <div
        class="info"
        v-html="pro_list.productInfos"/>
    </div>
  </div>
</template>
<style scoped>
.imgitem {
  height: 260px;
  position: relative;
  padding-top: 0;
  padding-bottom: 0;
  overflow: hidden;
}
.item {
  background: #f6f8f9;
  height: 260px;
  position: relative;
  padding: 50px 50px 0;
}
.item .tit {
  color: #4b5052;
  margin-bottom: 15px;
  font-size: 19px;
  line-height: 25px;
  font-weight: 300;
  text-transform: none;
  text-align: center;
}
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
    modulesrc: {
      type: String,
      default () {
        return ''
      }
    }
  },
  data () {
    return {
      pro_list: [],
      pro_title: ''
    }
  },
  mounted () {
    fetch(this.src).then(response => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error('provdtab went wrong!')
      }
    }).then(proinfos => {
      this.pro_list = proinfos.data.items[0]
    })
    fetch(this.modulesrc).then(response => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error('product module title went wrong!')
      }
    }).then(protopic => {
      this.pro_title = protopic.data.items[0].moduleTitle
    })
  }
}
</script>
