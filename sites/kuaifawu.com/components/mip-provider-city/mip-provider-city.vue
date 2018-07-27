<template>
  <div class="wrapper">
    <div class="tab_header">
      <div
        id="area"
        class="area active"
        @click="area">
        <span class="title">地区：</span>
        <span class="text">{{ areatitle }}</span>
        <mip-img
          src="../../static/image/splist_seljt.png"
          class="img"/>
      </div>
    </div>
    <div
      v-show="flag"
      id="masks"
      class="mask">
      <div class="dialog">
        <div class="lightbox">
          <p> 请选择城市</p>
          <div
            v-if="areatitle !== '全国'"
            class="list">
            <div id="change-province">
              <ul>
                <li
                  v-for="(pval,pid) in servicearealist.provincelist"
                  :key="pid"
                  :class="{dis: pval.isprodutopen == 1}"
                  @click="selectedPro(searchdata.id,pval.id,'\'' + pval.title + '\'',1,searchdata.packageid,0)">{{ pval.title }}
                </li>
              </ul>
            </div>
            <div id="change-city">
              <ul>
                <li
                  v-for="(cval,cid) in servicearealist.citylist"
                  v-if="cval.parentid == provinceid"
                  :key="cid"
                  :parentid="cval.parentid"
                  :class="{dis: cval.isprodutopen == 1}"
                  type="mip-mustache"
                  @click="selectedCity(searchdata.id,cval.id,'\'' + cval.title + '\'',2,searchdata.packageid,cval.parentid,searchdata.ar,searchdata.ct)">{{ cval.title }}
                </li>
              </ul>
            </div>
            <div
              id="change-area"
              style="display:none">
              <ul>
                <li
                  v-for="(aval,aid) in servicearealist.arealist"
                  v-if="aval.parentid == cityid"
                  :key="aid"
                  :parentid="aval.parentid"
                  :class="{dis: aval.isprodutopen == 1}"
                  @click="selectedArea(searchdata.pid,aval.parentid,aval.id,'\'' + aval.title + '\'',1,searchdata.packageid)">{{ aval.title }}</li>
              </ul>
            </div>
          </div>
          <div
            v-if="areatitle === '全国'"
            class="list">
            <div id="change-area">
              <ul>
                <li
                  v-for="(pval,pid) in providercitylist"
                  :key="pid"
                  :class="{dis: pval.isprodutopen == 1}"
                  @click="selectedArea(searchdata.pid,searchdata.ct,searchdata.ar,'\'' + pval.title + '\'',1,searchdata.packageid)">{{ pval.title }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
    .wrapper{width:50%;}
    .tab_header .active{padding-left:0.2rem;height:50px;}
    .tab_header .active .text{width:50%;display: inline-block;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;vertical-align: middle;}
    .tab_header .active .img{width:15px;margin-left:2px;display: inline-block;vertical-align: middle;}
    .mask .dialog{width:100%;border-top:1px solid #eee;height: auto;overflow-y: scroll;margin-top: -45px;}
    .mask .dialog ul li{line-height:0.5rem;border-bottom:1px solid #eee;}
    .mask .dialog .list {padding:0 0.12rem;}
    .mask .dialog .list ul{list-style: none;overflow: hidden;display:flex;flex-wrap: wrap;justify-content: space-between;}
    .mask .dialog .list li{float: left;text-align: center;margin-bottom: 0.1rem;width: 1rem;line-height:0.3rem;height: 0.3rem;background-color: white;border: 0.01467rem solid #d9d9d9;font-size:0.125rem;overflow: hidden;padding: 0 0.01rem;margin: 0.05rem;}
    .dis{color:#999999}
    /*选择地区light-box*/
    .mask .dialog .lightbox{background: #f3f6f6;}
    .mask .dialog .lightbox p{padding-left: 0.15rem;color: #999;}
  /*选择地区light-box*/
</style>

<script>
import config from '../../utils/config'
export default {
  props: {
    flag: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      city1: [],
      area1: [],
      areatitle: '',
      provinceid: '',
      cityid: '',
      areaid: '',
      servicearealist: []
    }
  },
  mounted () {
    const self = this
    let pcid = getRequest().pid
    pcid = pcid || 1
    window.fetchJsonp('https://api.kuaifawu.com/mip/provider/plist/pid/' + pcid, {
      jsonpCallback: 'callback'
    }).then(function (res) {
      return res.json()
    }).then(function (data) {
      self.searchdata = data.data.items.searchData
      self.pid = data.data.items.searchData.pid
      self.ct = data.data.items.searchData.ct
      self.ar = data.data.items.searchData.ar
      self.id = data.data.items.productSalesAttrInfo.id
      self.packageid = data.data.items.searchData.packageid
      self.servicearealist = data.data.items.serviceAreaList
      self.areatitle = data.data.items.serviceAreaList.areatitle
      self.areatitle = data.data.items.searchData.areatitle
      self.providercitylist = data.data.items.serviceAreaList.providercitylist
      self.servicearealist = data.data.items.serviceAreaList
      console.log(self.servicearealist)
      if (data.data.items.serviceAreaList.areatitle === '全国') {
        self.areatitle = data.data.items.serviceAreaList.areatitle
      } else {
        self.areatitle = data.data.items.searchData.areatitle
      }
    })
    function getRequest () {
      let url = location.search // 获取url中"?"符后的字串
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
    area () {
      this.flag = !this.flag
      this.$emit('flag', this.flag)
    },
    selectedPro (productsalesattrid, id, title, type, packageid, parentid) {
      this.provinceid = id
      this.province1 = title
      if (this.province1 !== '') {
        let province = document.getElementById('change-province')
        let uls = document.getElementById('change-city')
        province.style.display = 'none'
        uls.style.display = 'block'
      }
    },
    selectedCity (productsalesattrid, id, title, type, packageid, pid) {
      this.cityid = id
      this.city1 = title
      if (this.city1 !== '') {
        let uls = document.getElementById('change-city')
        let area = document.getElementById('change-area')
        uls.style.display = 'none'
        area.style.display = 'block'
      }
    },
    selectedArea (productsalesattrid, cityid, areaid, title, type, packageid) {
      this.area1 = title
      let providerid = this.providerid || 0
      if (this.area1 !== '') {
        this.flag = !this.flag
        this.areatitle = this.city1 + '-' + this.area1
        this.areatitle = (this.areatitle).replace(/'|'/g, '')
      }
      window.MIP.viewer.open(MIP.util.makeCacheUrl(config.data().burl + '/product/info.html?id=' + productsalesattrid + '_' + cityid + '_' + areaid + '_' + providerid + '_' + packageid + '_0_0'), {isMipLink: true})
    }
  }
}
</script>
