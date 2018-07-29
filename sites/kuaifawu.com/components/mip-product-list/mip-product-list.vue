<template id = "content">
  <div class="wrapper">
    <div class="k-nav">
      <div
        v-for="(val,index) in product"
        :key="index"
        type="mip-mustache">
        <ul>
          <li>
            <a @click="changelist(val.id)">{{ val.title }}</a>
          </li>
        </ul>
      </div>
    </div>
    <!--   <div class="k-content swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <template type="mip-mustache" v-for="value in data.items">
                        <ul>
                            <li class="title">
                                <span class="line"></span>
                                <span class="text">{{value.title}}</span>
                            </li>
                            <template type="mip-mustache" v-for="vv in value.productlist">
                            <li class="item">
                                <a data-type="mip" :href="'/product/info.html?id=' + vv.id ">
                                    <p class="i-title">{{vv.title}}</p>
                                    <p class="i-text">{{vv.sketch}}</p>
                                </a>
                                <span class="arrow"></span>
                            </li>
                            </template>
                        </ul>
                    </template>
                </div>
            </div>
        </div> -->
  </div>
</template>
<style scoped>
    .wrapper {
        margin: 0 auto;
    }
</style>

<script>
export default {
  data () {
    return {
      product: []
    }
  },
  mounted () {
    console.log('This is 产品分类 !')
    const self = this
    changelist(1)

    function changelist (pcid) {
      window.fetchJsonp('http://api.kuaifawu.com/mip/product/categoryinfo/pcid/' + pcid, {
        jsonpCallback: 'callback'
      }).then(function (res) {
        return res.json()
      }).then(function (data) {
        self.product = data.data.items.product
      })
    }
  },
  methods: {
    changelist (a) {
      console.log(a)
    }
  }

}

</script>
