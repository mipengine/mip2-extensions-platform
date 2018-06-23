<template>
<div id="wrapper" ref="wrapper">
  <div class="wra">
    <div class="wrapper" @click="open(index)" v-for="(item,index) in headMsg" :key="index" :class="{wrapper1:index>0}">
    <p class="title">{{item}}</p>
    <p class="name">{{index==0?name:name1}}</p>
    <p class="arrow"></p>
  </div>
  </div>
    <div v-show="show" class="mask">
      <div class="mask-wrapper"  @click.self="close">
          <div class="mask-content">
            <div class="head">
              <span class="close" @click.self="close"></span>
              <p v-for="(item,index) in tab" :key="index" :class="{active:(last?changeColor:changeColor1) == index}" @click="changeTab(index)">{{item}}</p>
            </div>
            <div class="content-wrapper">
              <div v-show="last">
                <div class="content" v-show="changeColor==0">
                <div v-for="(item,index) in data1" :key="index" class="brandsList" :class="{act:brandsIndex1==index}" @click="choosetype(item,index)">{{item.name||item.model}}</div>
              </div>
              <div class="content" v-show="changeColor==1">
                <div v-for="(item,index) in data2" :key="index" class="brandsList" :class="{act:brandsIndex2==index}" @click="chooseBrands(item,index)">{{item.name||item.model}}</div>
              </div>
              <div class="content" v-show="changeColor==2">
                <div v-for="(item,index) in data3" :key="index" class="brandsList" :class="{act:brandsIndex3==index}" @click="chooseModel(item,index)">{{item.name||item.model}}</div>
              </div>
              </div>
              <div v-show="!last">
                <div class="content" v-show="changeColor1==0">
                  <div v-for="(item,index) in data4" :key="index" class="brandsList" :class="{act:brandsIndex1==index}" @click="choosetype(item,index)">{{item.name||item.model}}</div>
                </div>
                <div class="content" v-show="changeColor1==1">
                  <div v-for="(item,index) in data5" :key="index" class="brandsList" :class="{act:brandsIndex2==index}" @click="chooseBrands(item,index)">{{item.name||item.model}}
                    <p>￥{{item.price}}</p>
                  </div>
                  
                </div>
              </div>
            </div>
            
          </div>
      </div>
    </div>
</div>
</template>

<script>
import {fetch} from '@/common/js/fetch'
import apiUrl from "@/common/js/config.api"
export default {
  data(){
    return{
      last:true,  //玄设备还是故障
      index:0,
      index1:0,
      title:'',
      name:'',
      name1:'',
      show:false,
      headMsg:["设备型号","设备故障"],
      tab:[],
      changeColor:0,  //tab选择,
      changeColor1:0,  //tab选择,
      data:[], //  
      data1:[],  //品牌
      data2:[],// 类型
      data3:[],  //型号
      data4:[],  //型号
      data5:[],  //型号
      brandsIndex:0,
      brandsIndex1:0,
      brandsIndex2:0,
      brandsIndex3:0,
      categoryId:12, //型号
      brandId:8 , //品牌
      deviceId:'',  //设备id
      name:'',  //显示内容
      color:117,
      attr:1,
      attrValue:2162,
      price:0,
      malfunctionId:'',//故障id，

      //判断验证码是否为空,判断form组件的内容，清空
      isForm:{
      }
    }
  },
  created(){
    let href = window.location.href
    if(href.indexOf('categoryId')>0){
      this.categoryId = href.split('?')[1].split('&')[0].split('=')[1].split('-')[0]
      this.brandId = href.split('?')[1].split('&')[0].split('=')[1].split('-')[1]
      this.show = true
      this.last = true
      this.tab = ['类型','品牌','型号']
      this.changeColor=2
    }else if(href.indexOf('modelName')>0){
      let NAME = decodeURI(href.split('?')[1].split('&')[0].split('=')[1])
      this.name = NAME.split(',')[0]
      this.name1 = NAME.split(',')[2]
      this.price = NAME.split(',')[3]
    }
    this.queryBrand()
  },
  methods:{
    open(index){
      if(index==0){
        this.show = true;
        this.index = 0
        this.last = true
        this.tab = ['类型','品牌','型号']
      }else if(index==1){
        if(this.name){
          this.show = true;
          this.last = false
          this.index1 = 0
          this.tab = ['分类','故障']
        }else{
         MIP.setData({
            alertMsg:{
              errorTitle: "请选择手机型号",
              isError: true
            }
          })
        }
      }
      this.changeColor=0
      this.changeColor1=0
      this.queryBrand()
    },
    changeTab(index){
      if(this.last){
        this.changeColor = index
      }else{
        this.changeColor1 = index
      }
      this.queryBrand()
    },
    //获取分类：
    getSort(){
      fetch(apiUrl.categoryList).then(res=>{
        this.data1 = res.data.list
        if(this.changeColor==1&&this.data1.length>0){
            this.data2 = this.data1[0].brandList
          }else{
            this.data2 = this.data1[0].brandList
          }
      })
    },
    //获取设备列表
    getDevice(){
      fetch(apiUrl.deviceList,{categoryId:this.categoryId,brandId:this.brandId}).then(res=>{
        this.data3 = res.data.list
      })
    },
    //获取设备故障
    getMalfunction(){
      fetch(apiUrl.getMalfunction,{deviceId:this.color,attributeIds:this.attr,attributeValues:this.attrValue}).then(res=>{
        this.data4 = res.data.list
      })
    },
    queryBrand(){
      if(this.last){
        if(this.changeColor==0){
            this.getSort()
          }
          if(this.changeColor==1&&this.data1.length>0){
            this.data2 = this.data1[0].brandList
          }else{
            this.getSort()
          }
          if(this.changeColor==2){
            this.getDevice()
          }
      }else{
       
        if(this.changeColor1==0){
          this.getMalfunction()
          }
          if(this.changeColor1==1){
            this.data5 = this.data4[0].children
          }
      }
    },
    //选择
    choosetype(item,index){
        this.brandsIndex1 = index
        this.changeColor=1
        this.changeColor1=1
        this.categoryId = item.id
        if(this.last){
          this.data2 = this.data1[index].brandList
        }else{
          this.data5 = this.data4[index].children
        }
    },
    chooseBrands(item,index){
        this.brandsIndex2 = index
        this.changeColor=2
        this.brandId = item.id
        this.queryBrand()
        if(!this.last){
          this.name1 = item.name
          this.show = false
          this.price = item.price
          this.malfunctionId = this.data4[this.brandsIndex1].children[index].id
          MIP.setData({orderData:{
            "solution":this.name1,
            "malfunctionId":this.malfunctionId,
            "price":this.price
          }})
        }
    },
    chooseModel(item,index){
        this.brandsIndex3 = index
        
        if(this.last){
          this.name = item.model
          MIP.setData({orderData:{
            "device":this.name
          }})
          this.show = false
          this.queryColor(item.id)
        }
       
    },
    //获取颜色
    queryColor(id){
      this.deviceId = id
      fetch(apiUrl.getUserOrderList,{deviceId:id}).then(res=>{
        this.color = res.data.list[0].deviceId
        this.attr = res.data.list[0].attributeId
        this.attrValue = res.data.list[0].id
        MIP.setData({orderData:{
            "deviceId":this.color,
            "attributeId":this.attr,
            "attrValue":this.attrValue
          }})
      })
    },
    close(){
      this.show = false
    }
  }
  }

</script>
<style scoped lang="less">
#wrapper{
  margin-top: -40px;
  background: #f2f2f2;
  .wra{
    padding: 0 10px;
    background: #fff;
  }
}
.wrapper {
  display: -webkit-flex;
  display: flex;
  flex-direction: row;
  margin: 40px auto 0;
  padding:5px 0;
  text-align: center;
  justify-content:space-between;
  border-bottom: 1px solid #eee;
  background: #fff;
  
  .title,.name{
    height: 30px; 
    line-height: 30px;
    color: #333;
    font-size: 15px;
  }
  .title{
    color: #999;
  }
  .name{
    margin-left: -40px;
  }
  .arrow{
    content: '';
    width: 8px;
    height: 14px;
    margin-top: 8px;
    background: url('//rs.jikexiu.com/appresources/images/arrow_gray.png') no-repeat;
    background-size: 100% 100%;
  }
}
.wrapper1{
  margin-top: 0px;
}
.mask{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
}
.mask-wrapper{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,.5);
  .mask-content{
    position: absolute;
    top: 40%;
    width: 100%;
    height: 60%;
    .head{
      position: relative;
      display: -webkit-flex;
      display: flex;
      flex-direction: row;
      background: #ccc;
      padding: 10px 10px;
      .close{
        position: absolute;
        top: 10px;
        right: 10px;
        display: block;
        width: 20px;
        height: 20px;
        background: url('../../common/icon/close.png') no-repeat center center;
        background-size: 100% 100%;
      }
      p{
        width: 20%;
        text-align: center;
      }
      .active{
        position: relative;
        color: #e94609;
      }
      .active:after{
        content: '';
        position: absolute;
        bottom: -10px;
        left: 0;
        width: 100%;
        height: 1px;
        background: #e94609;
      }
    }
    .content-wrapper{
      height: 100%;
      overflow: auto;
      background: #fff;
      .content{
      height: 90%;
      overflow-y: scroll;
      background:#fff;
      -webkit-overflow-scrolling : touch;
      .brandsList{
        position: relative;
        padding: 10px;
        font-size: 15px;
        color: #666;
        // text-indent: 20px;
        border-bottom: 1px solid #eee;
        p{
          position: absolute;
          top: 0;
          right: 10px;
          height: 20px;
          padding:10px 0;
          background: #fff;
          z-index: 99;
        }
      }
      .act{
        position: relative;
      }
      .act:after{
        content: '';
        position: absolute;
        top: 50%;
        right: 20px;
        width: 20px;
        height: 20px;
        margin-top: -10px;
        // background: url('../../common/icon/right-arrow.png')no-repeat center center;
        background-size: 100% 100%;

      }
    }
    }
    
  }
}


 .bot{
    // position: absolute;
    // bottom: 0;
    // left: 0;
    width: 100%;
    height: 52px;
    background: #fff;
    z-index: 100;
    .bot-left{
      float: left;
      width: 60%;
      .flex{
        span{
          display: inline-block;
          padding-top: 10px;
        }
        span:nth-child(1){
          padding-left: 10px;
        }
        span:nth-child(2){
          color: #fa5e24;
        }
      }
      p{
        padding-left: 10px;
        color: #999;
      }
    }
    .bot-right{
      float: right;
      height: 50px;
      width:40%;
      line-height: 50px;
      text-align: center;
      color: #fff;
      border-top: 1px solid #ddd;
      border-bottom: 1px solid #ddd;
      background-color: #fa5e24;
    }
  }

</style>