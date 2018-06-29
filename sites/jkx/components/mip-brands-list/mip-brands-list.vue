<template>
  <div class="wrapper">
    <a title="目标页面标题" v-for="(item,index) in items" :key="index" :href="item.href">
      <li class="navList">
        <mip-img :src="item.src"></mip-img>
        <p>{{item.name}}</p>   
      </li>
    </a>
  </div>
</template>
<script>
export default {
  data(){
    return{
        Redirect_uri1:"https://t.jikexiu.com/resources/mip/order.html?categoryId=12-8",
    }
  },
  mounted () {
    console.log('This is my first custom component !')
  },
  created(){
    this.Redirect_uri1 = encodeURI(this.Redirect_uri1)
    this.items =  [
        {
          "name": "苹果",
          "src": "https://rs.jikexiu.com/appresources/images2016/landing/img1.png",
          "href":"https://openapi.baidu.com/oauth/2.0/authorize?response_type=code&client_id=dsAkhUrPV9EGA2aId4iv8E9ob8cam6bG&redirect_uri="+this.Redirect_uri1+"&scope=snsapi_userinfo&state=STATE"
        },{
          "name": "华为",
          "src": "https://rs.jikexiu.com/appresources/images2016/landing/img2.png",
          "href":"./order.html?categoryId=12&brandId=12"
        },{
          "name": "小米",
          "src": "https://rs.jikexiu.com/appresources/images2016/landing/img3.png",
          "href":"./order.html?categoryId=12&brandId=10"
        },{
          "name": "三星",
          "src": "https://rs.jikexiu.com/appresources/images2016/landing/img4.png",
          "href":"./order.html?categoryId=12&brandId=11"
        },{
          "name": "乐视",
          "src": "https://rs.jikexiu.com/appresources/images2016/landing/ls.png",
          "href":"./order.html?categoryId=12&brandId=19"
        },{
          "name": "金立",
          "src": "https://rs.jikexiu.com/appresources/images2016/landing/jl.png",
          "href":"./order.html?categoryId=12&brandId=20"
        },{
          "name": "魅族",
          "src": "https://rs.jikexiu.com/appresources/images2016/landing/mz.png",
          "href":"./order.html?categoryId=12&brandId=14"
        },{
          "name": "努比亚",
          "src": "https://rs.jikexiu.com/appresources/images2016/landing/nby.png",
          "href":"./order.html?categoryId=12&brandId=13"
        }
      ]
  }
}
</script>

<style scoped>
.mip-fill-content{
        display: -webkit-flex;
        display: flex;
        width: 100%;
        flex-direction:row;
        flex-wrap: wrap;
        padding-bottom: 10px;
        background:#fff;
      }
      
      .mip-fill-content div{
        width: 25%;
      }
      .mip-fill-content div>li{
        width: 100%;
      }
      .mip-fill-content div li .mip-layout-container{
        display: block;
        width: 30px;
        height: 30px;
        margin: 10px auto;
      }
      .mip-fill-content div li>p{
        text-align: center;
        color: #333;
      }
      .mip-fill-content div .navList .mip-layout-container{
        display: block;
        width: 38px;
        height: 38px;
        margin: 10px auto;
      }
</style>
