<template>
  <div class="wrapper">
    <div class="tab_header">
      <div
        id="area"
        class="area active"
        @click="area">
        <span class="title">地区：</span>
        <span class="text">{{ city }}</span>
        <img src="../../static/image/splist_seljt.png">
      </div>
    </div>
    <div
      v-show="flag"
      id="masks"
      class="mask">
      <div class="dialog">
        <div class="lightbox">
          <p> 请选择城市</p>
          <div class="list">
            <ul id="change-province">
              <li
                v-for="(pval,pid) in productdetailinfo.servicearealist.provincelist"
                :key="pid"
                :class="{dis: pval.isprodutopen == 1}"
                @click="selectedPro(searchdata.id,pval.id,'\'' + pval.title + '\'',1,searchdata.packageid,0)">{{ pval.title }}</li>
            </ul>
            <ul id="change-city">
              <li
                v-for="(cval,cid) in productdetailinfo.servicearealist.citylist"
                v-if="cval.parentid == provinceid"
                :key="cid"
                :parentid="cval.parentid"
                :class="{dis: cval.isprodutopen == 1}"
                type="mip-mustache"
                @click="selectedCity(searchdata.id,cval.id,'\'' + cval.title + '\'',2,searchdata.packageid,cval.parentid,searchdata.ar,searchdata.ct)">{{ cval.title }}</li>
            </ul>
            <ul
              id="change-area"
              style="display:none">
              <li
                v-for="(aval,aid) in productdetailinfo.servicearealist.arealist"
                v-if="aval.parentid == cityid"
                :key="aid"
                :parentid="aval.parentid"
                :class="{dis: aval.isprodutopen == 1}"
                @click="selectedArea(searchdata.id,aval.id,'\'' + aval.title + '\'',3,searchdata.packageid,aval.parentid)">{{ aval.title }}</li>
            </ul>
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
    .tab_header .active img{width:15px;margin-left:2px;display: inline-block;vertical-align: middle;}
    .mask {background:rgba(0,0,0,0.6);width:100%;height:100%;position:fixed;left:0;top:0.95rem;z-index:99;}
    .mask .dialog{background:#fff;width:100%;border-top:1px solid #eee;height: auto;overflow-y: scroll;}
    .mask .dialog ul li{line-height:0.5rem;border-bottom:1px solid #eee;}
    .mask .dialog .list {padding:0 0.1rem;}
    .mask .dialog .list ul{list-style: none;overflow: hidden;display: flex;flex-wrap: wrap;justify-content: space-between;}
    .mask .dialog .list li{float: left;text-align: center;margin-bottom: 0.1rem;width: 109px;line-height:34px;height: 34px;background-color: white;border: 0.01467rem solid #d9d9d9;}
    .dis{color:#999999}
    #change-city li {margin: 0.05rem 0.03rem;}
    #change-area li {margin:0.05rem 0.03rem;}
    /*选择地区light-box*/
    .mask .dialog .lightbox{background: #f3f6f6;height:300px;overflow-y:scroll;}
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
      city: '',
      provinceid: '',
      cityid: '',
      areaid: '',
      providerid: ''
    }
  },
  mounted () {
    const self = this
    let pcid = getRequest().pcid
    pcid = pcid || 1
    window.fetchJsonp('https://api.kuaifawu.com/mip/product/info/id/' + pcid, {
      jsonpCallback: 'callback'
    }).then(function (res) {
      return res.json()
    }).then(function (data) {
      self.id = data.data.items.searchData.id
      self.ct = data.data.items.searchData.ct
      self.ar = data.data.items.searchData.ar
      self.providerid = data.data.items.searchData.providerid
      self.packageid = data.data.items.searchData.packageid
      self.searchdata = data.data.items.searchData
      self.paramstr = data.data.items.paramStr
      self.pagesubtitle = data.data.items.pageSubTitle
      self.productdetailinfo = data.data.items.productDetailInfo
      self.providerdetailinfo = data.data.items.providerDetailInfo
      self.city = data.data.items.searchData.cttitle + '-' + data.data.items.searchData.artitle
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
    selectedArea (productsalesattrid, areaid, title, type, packageid, cityid) {
      this.area1 = title
      let providerid = this.providerid || 0
      if (this.area1 !== '') {
        this.flag = !this.flag
        this.city = this.city1 + '-' + this.area1
        this.city = (this.city).replace(/'|'/g, '')
      }
      // window.location.href = "/product/info.html?id=" + productsalesattrid + "_" + cityid + "_" + areaid + '_' + providerid + '_' + packageid
      // window.MIP.viewer.open("/product/info.html?id=" + productsalesattrid + "_" + cityid + "_" + areaid + '_' + providerid + '_' + packageid, {isMipLink: true});
      window.MIP.viewer.open(MIP.util.makeCacheUrl(config.data().burl + '/product/info.html?id=' + productsalesattrid + '_' + cityid + '_' + areaid + '_' + providerid + '_' + packageid), {isMipLink: true})
    }
  }
}
</script>
