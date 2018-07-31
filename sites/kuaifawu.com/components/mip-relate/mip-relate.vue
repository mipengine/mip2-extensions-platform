<template>
  <div class="wrapper">
    <!-- <div class="choosed">
      <div class="title">已选服务：</div>
      <div class="name flex">
        <div class="l-name">公司注册(有限责任公司注册)</div>
        <div class="r-money">￥988</div>
      </div>
      <div class="infos">
        <span>地区：北京-朝阳区</span><span>服务者：张静<imp-img src=""></imp-img></span>
      </div>
    </div>
    <div class="other">
      <div class="title">你可能还需要以下服务：</div>
      <div class="item">
        <div class="flex">
          <div class="name">选择注册地址</div>
          <div class="money">￥17000</div>
        </div>
        <div class="infos">一个商用的地址是注册公司的必备条件一个商用的地址是注册公司的必备条件</div>
        <div class="box">
          <span>使用自己的地址</span><span>请为我提供一般人注册地址</span>
          <span>使用自己的地址</span><span>请为我提供一般人注册地址</span>
        </div>
      </div>
    </div> -->
    <div
      class="choosed"
      type="mip-mustache">
      <div class="title">已选服务：</div>
      <div class="name flex">
        <!-- <div class="sku" id="sku">{{main.id}}</div> -->
        <input
          type="hidden"
          value="main.id">
        <div class="l-name">{{ main.producttitle }}（{{ main.productsalesattrtitle }}）</div>
        <div class="r-money">￥{{ main.saleprice }}</div>
      </div>
      <div class="infos">
        <span>地区：{{ main.areatitle }}</span>
        <span>服务者：{{ main.realname }}</span>
        <mip-img :src="main.avatar60" />
      </div>
    </div>
    <div class="other">
      <div class="title">你可能还需要以下服务：</div>
      <div
        v-for="(val,index) in relate"
        :key="index"
        class="item"
        type="mip-mustache">
        <div>
          <div class="flex">
            <div class="name">{{ val.title }}</div>
            <div class="money">{{ relate[index].showmoney }}</div>
          </div>
          <div class="infos">{{ val.desc }}</div>
          <div
            v-for="(vv,i) in val.productrelateskulist"
            :key="i"
            class="box">
            <span
              :class="{active:index==isActive}"
              @click="select(val,vv, index)">{{ vv.relateproductsalesattrtitle }}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 底部固定栏 -->
    <mip-fixed
      type="bottom"
      bottom="0">
      <div class="fix-bottom">
        <div class="left">应付：<span>￥{{ sum }}</span></div>
        <a
          :href="geturl('/orders/confirm.html')"
          data-type="mip"
          class="right">去结算</a>
      </div>
    </mip-fixed>
    <!-- 底部固定栏 -->
  </div>
</template>
<style scoped>
.sku{display:none}.wrapper{margin:0 auto}.flex{display:flex;justify-content:space-between}.choosed{padding:.2rem .1rem 0rem;margin-bottom:.2rem;border-bottom:.014rem solid #d9d9d9;background-color:#fff}.choosed .title{color:#666;margin-bottom:.13rem;font-size:.16rem}.choosed .name .l-name{color:#333;font-size:.18rem;font-weight:bold}.choosed .name .r-money{color:#f85555;font-size:.18rem}.choosed .infos{color:#999;font-size:.10rem;display:flex;align-items:center;height:.5rem}.choosed .infos span{margin-right:.12rem}.choosed .infos mip-img{width:.26rem;display:inline-block;vertical-align:middle}.other{border-top:.014rem solid #d9d9d9;padding:.2rem .1rem;background-color:#fff;padding-bottom:.54rem}.other .title{color:#666;margin-bottom:.13rem;font-size:.16rem}.other .item{border-bottom:.014rem solid #d9d9d9;padding-bottom:.16rem;padding-top:.16rem}.other .item .name{color:#333;font-size:.18rem;font-weight:bold;border-left:.04rem solid #007bc7;padding-left:.1rem}.other .item .money{color:#f85555;font-size:.18rem}.other .item .infos{color:#999;font-size:.10rem;display:flex;align-items:center;height:.5rem}.box{display:flex;flex-wrap:wrap}.box span{border:.014rem solid #999;display:inline-block;padding:0 .14rem;color:#666;margin-right:.04rem;height:.3rem;line-height:.3rem;margin-bottom:.04rem}.box span.active{border:.014rem solid #f85555}.fix-bottom{background-color:#fff;border-top:.014rem solid #d9d9d9;height:.54rem;line-height:.54rem;width:100%;display:flex}.fix-bottom .left{width:70%;color:#999;text-align:right;padding-right:.2rem}.fix-bottom .left span{font-size:.2rem;color:#e85555}.fix-bottom .right{width:30%;background-color:#e85555;color:#fff;text-align:center}

</style>
<script>
import config from '../../utils/config'
export default {
  props: {
    info: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      main: [],
      items: [],
      isrelate: '',
      relate: [],
      money: '',
      sum: 0,
      isActive: -1,
      sku: {},
      isLogin: '',
      title: '',
      providerSkuid: 0,
      summmmm: [],
      providerskuid: '',
      relteMoney: []
    }
  },
  mounted () {
    MIP.viewer.fixedElement.init()
    console.log('This is my 关联推荐页 !')
    // let isreg = getRequest().res ? getRequest().res : 0
    let CustomStorage = MIP.util.customStorage
    let storage = new CustomStorage(0)
    let preid = storage.get('provideridProductskuid')
    console.log(preid)
    let id = preid || getRequest().id
    const self = this
    // this.$element.customElement.addEventAction('login', event => {
    // storage.set('sessionIds',event.sessionId);
    // storage.set('nickname',event.nickname);
    window.fetchJsonp('https://api.kuaifawu.com/mip/product/relate/id/' + id, {
      jsonpCallback: 'callback'
    }).then(function (res) {
      return res.json()
    }).then(function (data) {
      console.log(data)
      // self.items = data.data.items
      // console.log(self.items)
      console.log(data.data.items.isrelate)
      // let isrelate = storage.set('isrelate', data.data.items.isrelate)
      // storage.set('returnurl','/product/relate.html?res=200')
      // 是否注册
      // if (event.sessionId) {
      // if (!isreg && event.userInfo.isreg === 1 ) {
      // window.location.href = "/user/register.html"
      // window.MIP.viewer.open('/user/register.html', {isMipLink: true});
      // window.MIP.viewer.open(MIP.util.makeCacheUrl(config.data().burl + '/user/register.html'), {isMipLink: true});

      // }

      // if (data.data.items.isrelate === 1) {
      //     storage.set('returnurl','/orders/confirm.html')
      //     self.isrelate = 1;
      //     // window.location.href = '/orders/confirm.html'
      //     // window.MIP.viewer.open('/orders/confirm.html', {isMipLink: true});
      //     window.MIP.viewer.open(MIP.util.makeCacheUrl(config.data().burl + '/orders/confirm.html'), {isMipLink: true});

      // }
      self.providerskuid = storage.get('providerskuid')
      self.main = data.data.items.mainrelatetype
      self.relate = data.data.items.relatetype
      self.skulist = data.data.items.relatetype.productrelateskulist
      self.sku[self.main.id] = { 'title': self.main.producttitle, 'id': self.main.id }
      self.title = self.main.id
      self.sum = parseFloat(self.main.saleprice)
      // }
    })
    // 存储数据

    // let isreg = storage.get('isreg');
    // let isLogin = storage.get('isLogin');

    // console.log(isreg,'isreg')
    // console.log(isLogin,'isLogin')
    // console.log(this.info.userInfo.isreg)
    // console.log(this.info.userInfo.sessionId)
    // storage.set('sessionIds',this.info.userInfo.sessionId);
    // console.log(this.info.isLogin)
    // let isreg = getRequest().res ? getRequest().res : 0;
    // if (!isreg && this.info.userInfo.isreg ===1 && this.info.isLogin) {
    //  window.location.href = "/user/register.html"
    // }

    // window.location.href = '/product/relate.html?id=' + preid

    // self.providerskuid = storage.get('providerskuid');

    // self.providerSkuid = storage.get('providerSkuId');
    // let fetchJsonp = require('fetch-jsonp')

    // })

    // 获取url中“？”后面的字符串
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
    select: function (value, obj, idx) {
      // obj - value idex
      this.getmoney(idx, obj.saleprice, obj)
      console.log(this.main.saleprice)
      let sum = parseFloat(this.main.saleprice)
      this.relate.forEach(function (item) {
        sum += item.money ? parseFloat(item.money) : 0
      })
      this.sum = sum

      let flag = this.summmmm[idx] === obj

      this.summmmm[idx] = {}
      if (!flag) {
        this.summmmm[idx] = obj
      }

      let a = [this.providerskuid]
      console.log(this.summmmm)
      let item
      this.summmmm.forEach(item => {
        item.providerskuid && a.push(item.providerskuid)
      })
      console.log(item)
      let b = a.join('_')
      console.log('summmm====>', b)

      let CustomStorage = MIP.util.customStorage
      let storage = new CustomStorage(0)
      storage.set('sku', b)
      //    console.log(val.productrelateskulist)
      //    this.isActive=id;
      //    console.log(this.index)
      //    console.log(this.isActive)
      //    this.getmoney(id,obj.saleprice,obj);

      //    let sum = parseFloat(this.main.saleprice);

      // this.relate.forEach(function(item){
      //  sum += item.money ? parseFloat(item.money) : 0
      // });
      // this.sum = sum;
      // if (obj.saleprice) {
      //  this.sku[val.id] = {'title':val.title,'id':obj.id}
      //  this.title += "_"+ obj.providerskuid
      // }
      // // console.log(this.sku)
      // JSON.stringify(this.sku)
      // let strSku = JSON.stringify(this.sku)
      // // console.log(JSON.stringify(this.sku))

      // // 遍历productrelateskulist
      // const self = this
      // val.productrelateskulist.forEach(function(item,index){

      //    console.log('----------------'+obj.id)
      //    delete(self.sku[item.id])
      //    console.log('----------------'+item.id)
      // })
      // // self.sku[obj.id] = {'title':val.title,'id':val.id};
      // // 遍历productrelateskulist

      // console.log(this.sku)
      // console.log(this.title)
      // // let arrSku=this.title.split("_");
      // let arrSku=this.title;
      // console.log(arr1)
      // let CustomStorage = MIP.util.customStorage
      //       let storage = new CustomStorage(0);
      //       storage.set('sku',arrSku)
    },
    getmoney: function (id, saleprice, obj) {
      // console.log(obj.id && !this.relteMoney[obj.id],'pppppppppp')
      this.relteMoney[obj.id] = 0
      console.log(this.relteMoney, 'rrrrrrrrrrrr')
      if (obj.id && !this.relteMoney[obj.id]) {
        this.relteMoney[obj.id] = 1
      } else {
        this.relteMoney[obj.id] = 0
      }
      // console.log(saleprice,'ssssssss')
      // console.log(this.relteMoney[obj.id],'idididiidi')
      this.relate[id].showmoney = saleprice && this.relteMoney[obj.id] ? '￥' + saleprice : ''
      this.relate[id].money = saleprice * this.relteMoney[obj.id]
    },
    geturl (url) {
      return MIP.util.makeCacheUrl(config.data().burl + url)
    }
  }

}

</script>
