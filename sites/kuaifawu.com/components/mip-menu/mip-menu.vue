<template>
  <div class="wrapper">
    <mip-fixed
      class="footer"
      type="bottom"
      bottom="0">
      <a
        :href="geturl('/index/index.html')"
        data-type="mip">
        <div
          class="icon icon1"
          @click="aaa($event)"/>
      </a>
      <a
        :href="geturl('/product/category.html')"
        data-type="mip">
        <div
          class="icon icon2"
          @click="aaa($event)"/>
      </a>
      <a
        :href="geturl('/article/index.html')"
        data-type="mip">
        <div
          class="icon icon3"
          @click="aaa($event)"/>
      </a>
      <a
        :href="geturl('/user/index.html')"
        data-type="mip">
        <div
          class="icon icon4"
          @click="aaa($event)"/>
      </a>
    </mip-fixed>
  </div>
</template>

<style scoped>
    .wrapper {
        margin: 0 auto;
        text-align: center;
    }

    .footer {
        width: 100%;
        height: 0.6rem;
        border-top: 0.01rem solid #d9d9d9;
        background: #fff;
        z-index: 999;
        display: flex;
        justify-content: space-between;
    }

    .footer a {
        text-align: center;
        display: flex;
        align-items: center;
        width: 25%;
        height: 0.55rem;
        line-height: 0.55rem;
    }

    .footer a .icon {
        width: 0.25rem;
        height: 0.43rem;
        margin: 0 auto;
    }

    .footer a .icon.icon1 {
        background: url(../../static/image/home_bar1_no.png) no-repeat;
        background-size: contain;
    }

    .footer a .icon.icon1.active {
        background: url(../../static/image/home_bar1_sel.png) no-repeat;
        background-size: contain;
    }

    .footer a .icon.icon2 {
        background: url(../../static/image/home_bar2_no.png) no-repeat;
        background-size: contain;
    }

    .footer a .icon.icon2.active {
        background: url(../../static/image/home_bar2_sel.png) no-repeat;
        background-size: contain;
    }

    .footer a .icon.icon3 {
        background: url(../../static/image/home_bar3_no.png) no-repeat;
        background-size: contain;
    }

    .footer a .icon.icon3.active {
        background: url(../../static/image/home_bar3_sel.png) no-repeat;
        background-size: contain;
    }

    .footer a .icon.icon4 {
        background: url(../../static/image/home_bar4_no.png) no-repeat;
        background-size: contain;
    }

    .footer a .icon.icon4.active {
        background: url(../../static/image/home_bar4_sel.png) no-repeat;
        background-size: contain;
    }
</style>

<script>
import config from '../../utils/config'
export default {
  mounted () {
    MIP.viewer.fixedElement.init()
    console.log('This is 底部固定菜单栏 !')
  },
  prerenderAllowed () {
    return true
  },
  methods: {
    aaa: function () {
      let a = document.querySelectorAll('a')
      a.forEach(function (el, index) {
        el.onclick = function (e) {
          let sib = sibilings(this)
          this.children[0].classList.add('active')
          sib.forEach(function (el, index) {
            el.children[0].classList.remove('active')
          })
          return this
        }
      })

      function sibilings (el) {
        let a = []
        let p = el.previousSibling
        while (p) {
          if (p.nodeType === 1) {
            a.push(p)
          }
          p = p.previousSibling
        }
        a.reverse()
        let n = el.nextSibling
        while (n) {
          if (n.nodeType === 1) {
            a.push(n)
          }
          n = n.nextSibling
        }
        return a
      }
    },
    geturl (url) {
      return MIP.util.makeCacheUrl(config.data().burl + url)
    }
  }

}

</script>
