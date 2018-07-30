<template>
  <div class="wrapper layout">
    <mip-fixed
      class="k-nav"
      type="left"
      top="44px">
      <div>
        <ul
          v-for="(val,index) in product"
          :key="index"
          type="mip-mustache">
          <li>
            <a @click="changelist(val.id)">{{ val.title }}</a>
          </li>
        </ul>
      </div>
    </mip-fixed>
    <div class="k-content swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <div>
            <ul
              v-for="(value,index) in productsalesattr"
              :key="index"
              type="mip-mustache">
              <li class="title">
                <span class="line"/>
                <span class="text">{{ value.title }}</span>
              </li>
              <div>
                <li
                  v-for="(vv,index) in value.productlist"
                  :key="index"
                  class="item"
                  type="mip-mustache">
                  <a
                    :href="geturl('/product/info.html?id=' + vv.id)"
                    data-type="mip">
                    <p class="i-title">{{ vv.title }}</p>
                    <p class="i-text">{{ vv.sketch }}</p>
                  </a>
                  <span class="arrow"/>
                </li>
              </div>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
    *{padding:0;margin:0;box-sizing:border-box}ul,li,ol{list-style:none}
    .wrapper {
        margin: 0 auto;
        display: flex;
        padding-bottom: 0.6rem;
    }
    .k-nav {
        width:1rem;
        height: 100vh;
        background-color: #f3f6f6;
    }
    .k-content {
        width:5rem;
        height: 100%;
        margin-left: 1rem;
    }
    .k-nav li {
        font-size: 0.15rem;
        background-color: #f3f6f6;
        color: #666;
        border-bottom: 0.014rem solid #e1e2df;
        text-align: center;
        height: 0.6rem;
        line-height: 0.6rem;
        cursor: pointer;
    }
    .k-nav li a {
        display: block;
    }
    .k-nav li.active {
        background-color: #fff;
        color: #333;
    }
    .k-content li {
        border-bottom: 0.01rem solid #e1e1e1;
        padding:0.1rem 0;
        /*height: 0.6rem;*/
        /*line-height: 0.6rem;*/
    }
    .k-content li.title {
        color: #333;
        font-size: 0.15rem;
        vertical-align: middle;
        font-weight: bold;
        /*line-height: 0.6rem;*/
    }
    .k-content li.title .line {
        display: inline-block;
        background:#00baf8;
        width: 0.02rem;
        height: 0.2rem;
        vertical-align: middle;
        margin-left: 0.1rem;
    }
    .k-content li.item {
        margin-left: 0.2rem;
        position: relative;
    }
    .k-content li.item a {
        display: inline-block;
        margin:0.1rem 0 0.1rem;
        vertical-align: middle;
        padding-right: 0.2rem;
    }
    .k-content li.item a .i-title{
        color:#666;
        font-size: 0.15rem;
        padding-bottom:0.04rem;
    }
    .k-content li.item a .i-text {
        color: #999;
        font-size: 0.1rem;
    }
    .k-content li.item .arrow {
        width: 0.05rem;
        height: 0.1rem;
        display: inline-block;
        background-image: url('../../static/image/right_arrow.png');
        background-size: contain;
        position: absolute;
        right: 0.1rem;top: 40%;
    }
</style>

<script>
import config from '../../utils/config'
export default {
  data () {
    return {
      product: [],
      productsalesattr: []
    }
  },
  mounted () {
    // MIP.viewer.fixedElement.init()
    // console.log('This is 产品分类 !')
    const self = this
    let pcid = getRequest().pcid
    pcid = pcid || 1

    window.fetchJsonp(config.data().apiurl + '/product/categoryinfo/pcid/' + pcid, {
      jsonpCallback: 'callback'
    }).then(function (res) {
      return res.json()
    }).then(function (data) {
      self.product = data.data.items.product
      self.productsalesattr = data.data.items.productsalesattr
    })

    function getRequest () {
      let url = location.search // 获取url中"?"符后的字串
      //  let theRequest = {}
      let theRequest = {}
      let strs = ''
      if (url.indexOf('?') !== -1) {
        let str = url.substr(1)
        strs = str.split('&')
        for (let i = 0; i < strs.length; i++) {
          theRequest[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1])
        }
      }
      return theRequest
    }
  },
  methods: {
    reset () {
      this.product = []
      this.productsalesattr = []
    },
    geturl (url) {
      return MIP.util.makeCacheUrl(config.data().burl + url)
    },
    changelist: function (pcid) {
      pcid = pcid || 1
      const self = this
      window.fetchJsonp(config.data().apiurl + '/product/categoryinfo/pcid/' + pcid, {
        jsonpCallback: 'callback'
      }).then(function (res) {
        return res.json()
      }).then(function (data) {
        self.product = data.data.items.product
        self.productsalesattr = data.data.items.productsalesattr
      })
    }
  }
}

</script>
