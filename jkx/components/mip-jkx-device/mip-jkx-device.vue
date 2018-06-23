<template>
<div id="wrapper" ref="wrapper">
  <div class="wra">
    <div class="wrapper" @click="open(index)" v-for="(item,index) in headMsg" :key="index" :class="{wrapper1:index>0}">
    <p class="title">{{item}}</p>
    <p class="name">{{index==0?name:name1}}</p>
    <p class="arrow"></p>
  </div>
  </div>
</div>
</template>

<script>
import {fetch} from '@/common/js/fetch'
import apiUrl from "@/common/js/config.api"
export default {
  props:{
    devicedata:{
      default(){
        return{}
      },
      type:Object
    }
  },
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
  watch:{
    devicedata(val){
      this.name  = val.name
      this.name1 = val.name1
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
      MIP.setData({
        deviceData:{
          show:true,
          changeColor:2,
          last:true,
          categoryId:this.categoryId,
          brandId:this.brandId,
          tab:['类型','品牌','型号']
        }
      })
    }else if(href.indexOf('modelName')>0){
      let NAME = decodeURI(href.split('?')[1].split('&')[0].split('=')[1])
      this.name = NAME.split(',')[0]
      this.name1 = NAME.split(',')[2]
      this.price = NAME.split(',')[3]
      this.malfunctionId = NAME.split(',')[4]
      this.deviceId = NAME.split(',')[5]
       MIP.setData({
        deviceData:{
          show:false,
          name:this.name,
          name1:this.name1,
          price:this.price
        },
        orderData:{
          price:this.price,
          device:this.name,
          solution:this.name1,
          malfunctionId:this.malfunctionId,
          attributeId:this.attr,
          attrValue:this.attrValue,
          deviceId:this.deviceId
        }
      })
    }
  },
  methods:{
    open(index){
      if(index==0){
         MIP.setData({
          deviceData:{
            show:true,
            changeColor:0,
            last:true
          }
        })
      }else if(index==1){
        if(this.name){
           MIP.setData({
            deviceData:{
              show:true,
              changeColor:0,
              last:false
            }
          })
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
      
    }
  }
  }

</script>
<style scoped lang="less">
#wrapper{
  margin-top: -30px;
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
</style>