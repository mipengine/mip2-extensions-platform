<template>
  <div class="wrapper">
    <!-- 顶部介绍图 -->
    <mip-carousel
      layout="responsive"
      width="750"
      height="400">

      <mip-img
        v-for="(val,index) in productdetailinfo.productheadpiclist"
        :key="index"
        :src="val.h5path"
        type="mip-mustache"
        layout="responsive"/>

    </mip-carousel>
    <!-- 顶部介绍图 -->
    <div class="info">
      <h2>{{ productdetailinfo.productinfo.title }}</h2>
      <div class="item">
        <span>价格：</span><span class="price">{{ providerdetailinfo.saleprice }}</span>
      </div>
      <div class="item type">
        <span class="title">类型：</span>
        <div class="list-box">
          <div
            v-for="(val,index) in productdetailinfo.productsalesattrlist"
            :key="index"
            class="list"
            type="mip-mustache">
            <a
              :href="geturl('/product/info.html?id=' + val.id + '_' + searchdata.ct + '_' + searchdata.ar)"
              :class="{active: val.id == searchdata.id && 0 == searchdata.packageid}"
              data-type="mip">{{ val.title }}</a>
          </div>
        </div>
      </div>
      <div
        v-if="packagelist == []"
        class="item type">
        <span class="title">套餐：</span>
        <div
          v-for="(val,index) in productdetailinfo.packagelist"
          :key="index"
          class="list"
          type="mip-mustache">
          <a
            :href="geturl('/product/info.html?id=' + val.mainproductsalesattr + '_' + searchdata.ct + '_' + searchdata.ar + '_' + searchdata.providerid + '_' + val.id)"
            :class="{active: val.id == searchdata.packageid}"
            data-type="mip">{{ val.title }}</a>
        </div>
      </div>
      <div
        v-if="2 === isneedarea"
        class="item between">
        <span class="title">地区：</span>
        <span class="text">{{ city }}</span>
        <a
          class="change"
          @click="show">
          <span>更换 &gt;</span>
        </a>
      </div>
      <div
        v-if="providerdetailinfo.providerinfo"
        class="item between">
        <span class="title">服务者：</span>
        <div
          id="recommend-provider1"
          class="text">
          <mip-img :src="providerdetailinfo.providerinfo.avatar"/><span>{{ providerdetailinfo.providerinfo.realname }}</span>
        </div>
        <a
          :href="geturl('/provider/list.html?pid=' + id + '_' + ct + '_' + ar + '_0_0_0_0_0')"
          data-type="mip"
          class="change">
          <span>查看全部 &gt;</span>
        </a>
      </div>
      <div
        v-if="providerdetailinfo.saleprice === '暂无价格'"
        class="item">
        <p class="dis">该服务暂不支持此地区</p>
      </div>
      <!-- <div class="item" v-if="evaluate.evaluationList">
        <div class="title">
          <span class="head">用户评价</span>
          <div class="good">
            <span class="name">好评率:</span>
            <span class="rate js-evaluationrate">{{evaluate.rate}}%</span>
          </div>
          <a class="" @click="getComment(productdetailinfo.productinfo.id)">{{evaluate.list.count}}条评价</a>
          <div class="list" v-for="(val,index) in evaluate.list.data" :key="index" type="mip-mustache">
            <div class="item">
              <p class="content">
                {{val.assess}}
              </p>
              <div class="infos">
                <ul class="stars"  v-for="n in 5">
                  <li><span></span></li>
                </ul>
                <span class="name">{{val.title}}({{val.areatitle}})</span>
                <span class="date">{{val.createtime}}</span>
              </div>
              <div class="tips" v-for="(v,ind) in val.labelslist" :key="ind" type="mip-mustache">
                <span>{{v}}}</span>
              </div>
            </div>
          </div>
        </div>
      </div> -->
      <div class="item">
        <span v-html="productdetailinfo.productinfo.producth5desc"/>
      </div>
    </div>
    <div
      v-if="flag"
      id="choice-area">
      <div
        id="lightbox"
        class="lightbox">
        <p> 请选择城市</p>
        <div class="list">
          <div id="change-province">
            <ul>
              <li
                v-for="(pval,pid) in productdetailinfo.servicearealist.provincelist"
                :key="pid"
                :class="{dis: pval.isprodutopen == 1}"
                @click="selectedPro(searchdata.id,pval.id,'\'' + pval.title + '\'',1,searchdata.packageid,0)">{{ pval.title }}
              </li>
            </ul>
          </div>
          <div
            id="change-city"
            style="display:none">
            <ul>
              <li
                v-for="(cval,cid) in productdetailinfo.servicearealist.citylist"
                v-if="cval.parentid == provinceid"
                :key="cid"
                :provinceid="cval.parentid"
                :class="{dis: cval.isprodutopen == 1}"
                @click="selectedCity(searchdata.id,cval.id,'\'' + cval.title + '\'',2,searchdata.packageid,cval.parentid)">{{ cval.title }}
              </li>
            </ul>
          </div>
          <div
            id="change-area"
            style="display:none">
            <ul>
              <li
                v-for="(aval,aid) in productdetailinfo.servicearealist.arealist"
                v-if="aval.parentid == cityid"
                :key="aid"
                :parentid="aval.parentid"
                :class="{dis: aval.isprodutopen == 1}"
                @click="selectedArea(searchdata.id,aval.id,'\'' + aval.title + '\'',3,searchdata.packageid,aval.parentid)">{{ aval.title }}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div
        class="blank"
        @click="cancel"/>
    </div>
  </div>
<!--  <footer class="{disabled: !providerdetailinfo.providerinfo}">
    <?php $sales = providerdetailinfo.saleprice ?: 0;
            if(PRODUCT_ID_ASKLAWYER != providerdetailinfo.providerinfo.productid){
            $calls = (2 == providerdetailinfo.providerinfo.kfwzxstate && 2 == $providerDetailInfo.providerinfo.zxstate && 2 == providerdetailinfo.providerinfo.providerskuinfo.isopenzx); ?>
      <?php if($calls && $sales){ ?>
      <a class="freecall realcall">免费电话咨询</a>
      <a :href="'/product/provider/plist/pid=' + searchdata.id + '_' + searchdata.ct + '_' + searchdata.ar + '_0_0_0_0_' + searchdata.packageid + '&type=buy&productskuid=' + searchdata.productskuid" class="buys">购买服务</a>
      <?php } elseif (!$calls && $sales) { ?>
      <a :href="'/product/provider/plist/pid=' + searchdata.id + '_' + searchdata.ct + '_' + searchdata.ar + '_0_0_0_0_' + searchdata.packageid + '&type=buy&productskuid=' + searchdata.productskuid" class="buys">购买服务</a>
      <?php } elseif (!$sales && $calls) { ?>
      <a class="freecall realcall">免费电话咨询</a>
      <?php } else { ?>
      <a class="buys freecall now">购买服务</a>
      <?php } ?>
    <?php } else { ?>
      <?php if($sales){ ?>
      <a :href="'/product/provider/plist/pid=' + searchdata.id + '_' + searchdata.ct + '_' + searchdata.ar + '&type=buy&productskuid=' + searchdata.productskuid" class="buys">购买服务</a>
      <?php }else{ ?>
      <a class="buys freecall now">购买服务</a>
      <?php } ?>
    <?php } ?>
  </footer>-->

</template>

<style scoped>
  .wrapper {margin: 0 auto;padding:0;padding-bottom:0.6rem;}
  .info {padding:0.1rem 0.1rem 0 0.1rem;border-bottom: 0.01rem solid #d9d9d9;}
  .info h2 {font-size: 0.2rem;font-weight: normal;margin-bottom: 0.14rem;}
  .info .item {color: #666;font-size: 0.14rem;display: flex;margin-bottom: 0.1rem;align-items: center;}
  .info .item .dis{width:100%;color:red;padding:0.1rem 0;display:inline-block;border-top:1px solid #d9d9d9;}
  .info .item span.price{color: #fa444e;font-size: 0.2rem;vertical-align: middle;}
  .info .item.type .title{display: inline-block;vertical-align: top;flex-shrink: 0;}
  .info .item.type .list-box {display: flex;flex-wrap: wrap;}
  .info .item.type .list a{display: inline-block;height: 0.3rem;line-height:0.3rem;padding:0 0.1rem;margin:0.03rem;border:0.01rem solid #d9d9d9;color: #999;}
  .info .item.type .list a.active{color: #fa444e;border:0.01rem solid #fa444e;}
  .info .item.between {justify-content: space-between;border-top: 0.01rem solid #d9d9d9;margin:0;height: 0.4rem;line-height: 0.4rem;}
  .text {display: flex;align-items: center;}
  .change {color: #00baf8;}
  #recommend-provider1>mip-img{width:0.3rem;height:0.3rem;margin-right: 0.1rem;}
  #choice-area{background: rgba(0, 0, 0, .6);height:100%;width: 100%;}
  #choice-area .blank{width:100%;height:46%;position: absolute;bottom:0;left:0;}
  #choice-area .list ul{list-style: none;overflow: hidden;padding:0 0.1rem;display:flex;flex-wrap: wrap;justify-content: space-between;}
  #choice-area .list ul:after {content: "";flex: auto;}
  #choice-area .list li{float: left;text-align: center;margin-bottom: 0.1rem;width: 1rem;line-height:0.3rem;height: 0.3rem;background-color: white;border: 0.01467rem solid #d9d9d9;font-size:0.125rem;overflow: hidden;margin: 0.05rem 0.01rem 0.05rem 0.03rem;}
  .dis{color:#999999}
  #change-city {height:auto;}
  #change-province li{padding: 0 0.05rem;}
  #change-city li {margin:0 0.04rem;padding: 0 0.03rem;}
  #change-area li{margin:0 0.06rem;padding: 0 0.01rem;}
  /*选择地区light-box*/
  #choice-area .lightbox{padding-top: 60px;background: #f3f6f6;overflow-y:scroll;height:300px;}
  #choice-area .lightbox p{padding-left: 0.15rem;color: #999;margin-bottom: 0.1rem;}
  /*选择地区light-box*/
</style>

<script>
import config from '../../utils/config'
export default {
  filters: {
    formatDate: function (time) {
      let d = new Date(time * 1000)
      let o = {
        'M+': d.getMonth() + 1, // month
        'd+': d.getDate(), // day
        'h+': d.getHours(), // hour
        'm+': d.getMinutes(), // minute
        's+': d.getSeconds() // second
      }
      let format = 'yyyy-MM-dd hh:mm:ss'
      if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (d.getFullYear() + '').substr(4 - RegExp.$1.length))
      }
      for (let k in o) {
        if (new RegExp('(' + k + ')').test(format)) {
          format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
        }
      }
      return format
    }
  },
  data () {
    return {
      searchdata: [],
      pagesubtitle: '',
      paramstr: '',
      productdetailinfo: [],
      providerdetailinfo: [],
      evaluate: [],
      flag: false,
      province1: [],
      city1: [],
      area1: [],
      city: '',
      provinceid: '',
      cityid: '',
      areaid: '',
      isneedarea: '',
      packagelist: '',
      providerid: ''
    }
  },
  mounted () {
    MIP.viewer.fixedElement.init()
    console.log('This is 订单详情 !')
    const self = this
    let id = getRequest().id
    window.fetchJsonp('https://api.kuaifawu.com/mip/product/info/id/' + id, {
      jsonpCallback: 'callback'
    }).then(function (res) {
      return res.json()
    }).then(function (data) {
      self.id = data.data.items.searchData.id
      self.ar = data.data.items.searchData.ar
      self.ct = data.data.items.searchData.ct
      self.searchdata = data.data.items.searchData
      self.paramstr = data.data.items.paramStr
      self.pagesubtitle = data.data.items.pageSubTitle
      self.productdetailinfo = data.data.items.productDetailInfo
      self.isneedarea = data.data.items.productDetailInfo.productinfo.isneedarea
      self.packagelist = data.data.items.productDetailInfo.packagelist
      self.providerdetailinfo = data.data.items.providerDetailInfo
      self.city = data.data.items.searchData.ptitle + '-' + data.data.items.searchData.cttitle + '-' + data.data.items.searchData.artitle
      self.providerinfo = data.data.items.providerDetailInfo.providerinfo
      // 获取产品详情页的头图
      self.productheadpiclist = data.data.items.providerDetailInfo.productheadpiclist
      // 存储 providerid 和 productskuid
      let CustomStorage = MIP.util.customStorage
      let storage = new CustomStorage(0)
      storage.set('saleprice', self.providerdetailinfo.saleprice)
      storage.set('provideridProductskuid', self.searchdata.productskuid + '_' + String(self.providerinfo.id))
      storage.set('providerskuid', self.providerinfo.providerskuid)
      console.log(self.providerinfo.providerskuid, 'providerskuid')

      console.log(self.searchdata.productskuid + '_' + String(self.providerinfo.id))
    })
    // console.log(this.$searchdata);
    // 获取评价信息
    // window.fetchJsonp('https://api.kuaifawu.com/mip/mip/product/evaluationlist/productid/' + data.data.items.searchData.id + '/providerid/' + data.data.items.searchData.providerid, {
    //     jsonpCallback: 'callback'
    // }).then(function (res2) {
    //     return res2.json()
    // }).then(function (data2) {
    //     self.evaluate = data2.data.items
    // })
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
  prerenderAllowed () {
    return true
  },
  methods: {
    show () {
      this.flag = !this.flag
    },
    cancel () {
      let choice = document.getElementById('choice-area')
      let lightbox = document.getElementById('lightbox')
      choice.style.display = 'none'
      lightbox.style.display = 'none'
    },
    geturl (url) {
      return MIP.util.makeCacheUrl(config.data().burl + url)
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
    selectedCity (productsalesattrid, id, title, type, packageid, parentid) {
      this.cityid = id
      this.id = id
      this.city1 = title
      if (this.city1 !== '') {
        let uls = document.getElementById('change-city')
        let area = document.getElementById('change-area')
        uls.style.display = 'none'
        area.style.display = 'block'
      }
    },
    selectedArea (productsalesattrid, areaid, title, type, packageid, cityid) {
      let providerid = this.providerid || 0
      this.area1 = title
      if (this.area1 !== '') {
        // let area = document.getElementById('change-area')
        this.flag = !this.flag
        this.city = this.province1 + '-' + this.city1 + '-' + this.area1
        this.city = (this.city).replace(/'|'/g, '')
      }
      // window.location.href = "/product/info.html?id=" + productsalesattrid + "_" + cityid + "_" + areaid + '_' + providerid + '_' + packageid
      // window.MIP.viewer.open("/product/info.html?id=" + productsalesattrid + "_" + cityid + "_" + areaid + '_' + providerid + '_' + packageid, {isMipLink: true});
      window.MIP.viewer.open(MIP.util.makeCacheUrl(config.data().burl + '/product/info.html?id=' + productsalesattrid + '_' + cityid + '_' + areaid + '_' + providerid + '_' + packageid), {isMipLink: true})
    }
  }
}
</script>
