<template>
  <div @click="hanldeHideMackClick" class="mack">
    <div class="big-img-content">
      <div style="color:#fff;margin-left:46%;">{{this.currentIndex}}/20</div>
      <mip-carousel
        defer="1000"
        layout="responsive"
        width="750"
        height="620"
        buttonController
        on="switchCompleted:position.change"
        @click="handle">
        <block v-for="item in this.imageitems">
          <mip-img style="height:5rem" :src="item.pic"></mip-img>
          <span class="describe">{{item.desc}}</span>
        </block>
      </mip-carousel>
      </div>

      <div class="bottom-content">
        <span class="reference-price">参考价：39.4万</span>
        <div class="ask-tel">
          <a id="float_tel" class="ask_btn" href="tel:4008917616" rel="external">电话咨询</a>
        </div>
      </div>
  </div>
  
</template>
<style scoped>
.mack{
  position:fixed;
  top:0;
  left:0;
  z-index:999;
  width:100%;
  height:100%;
  background:#000;
  overflow:hidden
}
.big-img-content{
  position:absolute;
  top: 25%; 
  left: 0; 
  width:100%;
}
.mip-lightbox{
  background:#000;
  height:100%;
  overflow: hidden;
}
.lightbox{
  width:100%;
}
.describe{
  position: absolute;
  bottom:0;
  z-index: 999;
  color:#fff;
  font-size:0.3rem;
  line-height:0.3rem;
  margin-left:0.3rem;
}
.bottom-content{
  position: absolute;
  left:0.3rem;
  bottom:0.4rem;
  z-index: 999999;
  display: flex;
  justify-content: space-between;
  width: 6.9rem;
  height: 0.7rem;
  line-height: 0.7rem;
}
.reference-price{
  font-size:0.3rem;
  color:#fff;
}
.ask-tel{
  width:2.6rem;
  height:0.7rem;
  line-height: 0.7rem;
  text-align: center;
  border-radius: 3px;
  background:linear-gradient(90deg,rgba(252,150,0,1),rgba(248,93,0,1));
}
.ask-tel a{
  color: #fff;
  font-size: 0.3rem;
  font-weight: Medium;
}

</style>
<script src="/mip-example/mip-example.js"></script>
<script>
import base from '../../common/utils/base';
import {requestFun} from  '../../common/utils/reqUtils';

export default {
   props:['bigImage','currentIndex'],
   data(){
      return{
      }
    },
    created () {
      base.setMediaBase()
      var that = this;
      this.imageitems = JSON.parse(this.bigImage)
    },
    mounted(){
    },
    methods:{
       handle(ev){  //阻止冒泡
         var oEvent = ev || event;
         oEvent.cancelBubble = true; 
       },
       hanldeHideMackClick(){
         console.log('关闭遮罩')
         this.$emit('changeMask',false)
       }
    },
    watch: {
      currentIndex(value) {
       
      }
  }
}
</script>
