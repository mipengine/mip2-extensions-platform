<template>
  <div class="tab">
    <div class="tab_header">
      <div
        id="type ="
        class="type active"
        @click="type">
        <span class="title">类型：</span>
        <span class="text">{{ mess }}</span>
        <mip-img
          src="https://b.kuaifawu.com/static/image/splist_seljt.png"
          class="img" />
      </div>
      <provider-city @flag="flag"/>
    </div>
    <div
      v-show="flag"
      id="mask"
      class="mask">
      <div
        id="dialog"
        class="dialog">
        <ul>
          <li
            v-for="(key,ind) in productsalesattrinfo.productsalesattrlist"
            :key="ind"
            @click="check(key,key.id)">{{ key.title }}</li>
        </ul>
      </div>
      <div
        class="blank"
        @click="cancel"/>
    </div>
  </div>
</template>

<style scoped>
li {
    list-style: none;
}
.tab .tab_header {
    width: 100%;
    line-height: 0.5rem;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    display: flex;
    z-index: 9;
    background: #fff;
}
.tab_header .type {
    border-right: 1px solid #eee;
    width: 50%;
    height: 50px;
}
.tab_header .type .title {
    padding-left: 0.2rem;
}
.tab_header .type .text {
    width: 50%;
    display: inline-block;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    vertical-align: middle;
}
.tab_header .type .img {
    width: 15px;
    display: inline-block;
    vertical-align: middle;
}
.mask .dialog {
    background: #fff;
    width: 100%;
    border-top: 1px solid #eee;
    height: 300px;
    overflow-y: scroll;
}
.mask .blank {
    width: 100%;
    height: 55%;
    position: absolute;
    bottom: 0;
    left: 0;
}
.mask .dialog ul li {
    line-height: 0.5rem;
    border-bottom: 1px solid #eee;
    padding-left: 0.15rem;
}
</style>
<script>
import config from '../../utils/config'
import providerCity from '../mip-provider-city/mip-provider-city'
export default {
  components: {
    providerCity
  },
  data () {
    return {
      flag: false,
      searchdata: [],
      providerList: [],
      productsalesattrinfo: [],
      mess: '',
      city: '',
      id: ''
    }
  },
  mounted () {
    const self = this
    let pid = getRequest().pid
    window
      .fetchJsonp(
        'https://api.kuaifawu.com/mip/provider/plist/pid/' + pid,
        {
          jsonpCallback: 'callback'
        }
      )
      .then(function (res) {
        return res.json()
      })
      .then(function (data) {
        self.searchdata = data.data.items.searchData
        self.providerList = data.data.items.providerList
        self.productsalesattrinfo =
                    data.data.items.productSalesAttrInfo
        self.productsalesattrlist =
                    data.data.items.productSalesAttrInfo.productsalesattrlist
        self.mess = data.data.items.productSalesAttrInfo.title
      })

    function getRequest () {
      let url = location.search // 获取url中"?"符后的字串
      let theRequest = {}
      let strs = ''
      if (url.indexOf('?') !== -1) {
        let str = url.substr(1)
        strs = str.split('&')
        for (let i = 0; i < strs.length; i++) {
          theRequest[strs[i].split('=')[0]] = unescape(
            strs[i].split('=')[1]
          )
        }
      }
      return theRequest
    }
  },
  methods: {
    type (flag) {
      this.flag = flag
      let mask = document.getElementById('mask')
      let masks = document.getElementById('masks')
      if (this.flag) {
        masks.style.zIndex = 9
        mask.style.zIndex = 8
      } else {
        masks.style.zIndex = 8
        mask.style.zIndex = 9
      }
    },
    cancel () {
      let mask = document.getElementById('mask')
      mask.style.display = 'none'
    },
    check (obj, id) {
      this.mess = obj.title
      let mask = document.getElementById('mask')
      mask.style.display = 'none'
      // window.location.href = "/provider/list.html?pid=" + id
      // window.MIP.viewer.open("/provider/list.html?pid=" + id, {isMipLink: true});
      window.MIP.viewer.open(
        MIP.util.makeCacheUrl(
          config.data().burl + '/provider/list.html?pid=' + id
        ),
        { isMipLink: true }
      )
    }
  }
}
</script>
