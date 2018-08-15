<template>
  <div class="wrapper">
    <div class="page">
      <div
        v-for="(val,index) in providerList"
        :key="index"
        class="item-list"
        type="mip-mustache">
        <div class="item">
          <a
            :href="geturl('/product/info.html?id=' + pid + '_' + ct + '_' + ar + '_' + val.id +'_' + packageid)"
            data-type="mip">
            <div class="left">
              <mip-img :src="val.avatar"/>
            </div>
            <div class="right">
              <p class="name">{{ val.realname }}</p>
              <p class="r-info">{{ val.areatitle }}
                <span class="line"/>{{ val.workyearnum }}年工作经验
              <span class="line"/>{{ val.company }}</p>
              <p class="rate">最近三个月接咨询量：
                <span>{{ val.recentordersnum }}</span>
              </p>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
    margin: 0 auto;
}
.page {
    position: relative;
    overflow: hidden;
    padding-top: 50px;
}
.page .item {
    border-bottom: 0.014rem solid #d9d9d9;
}
.page .item a {
    padding: 0.2rem 0.1rem;
    display: flex;
    justify-content: center;
    align-items: center;
}
.page .item a .left {
    width: 2rem;
    margin-right: 0.2rem;
}
.page .item a .left mip-img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
}
.page .item a .left mip-img img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
}
.page .item a .right {
    font-size: 0.16rem;
    color: #666;
    width: 9rem;
    word-wrap: break-word;
}
.page .item a .right .name {
    color: #333;
    font-size: 0.18rem;
    font-weight: bold;
    line-height: 0.4rem;
}
.page .item a .right .r-info {
    font-size: 0.14rem;
    line-height: 0.2rem;
}
.page .item a .right .rate {
    font-size: 0.14rem;
    line-height: 0.4rem;
}
.page .item a .right .rate span {
    display: inline-block;
    color: #e85555;
}
.line {
    width: 0.01rem;
    height: 0.14rem;
    margin: 0 0.1rem;
    background: #d9d9d9;
    display: inline-block;
    vertical-align: middle;
}
</style>

<script>
import config from '../../utils/config'
export default {
  data () {
    return {
      searchdata: [],
      packageInfo: [],
      providerList: []
    }
  },
  prerenderAllowed () {
    return true
  },
  mounted () {
    console.log('This is 服务商列表页 !')
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
        self.pid = data.data.items.searchData.pid
        self.ct = data.data.items.searchData.ct
        self.ar = data.data.items.searchData.ar
        self.packageid = data.data.items.searchData.packageid
        self.providerList = data.data.items.providerList
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
    geturl (url) {
      return MIP.util.makeCacheUrl(config.data().burl + url)
    }
  }
}
</script>
