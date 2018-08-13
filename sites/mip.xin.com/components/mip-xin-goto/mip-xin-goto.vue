<template>
  <div class="look-params">查看详细参数配置
    <span class="params-arrow"></span>
  </div>
</template>

<style scoped>
.look-params {
  border-top: 0.5px solid #eee;
  height: 1rem;
  line-height: 1rem;
  font-size: 0.26rem;
  color: #585858;
  text-align: center;
}
.params-arrow {
  display: inline-block;
  width: 0.14rem;
	height: 0.14rem;
	-webkit-transform: rotate(-315deg);
	transform: rotate(-315deg);
	border: solid #dbdada;
  border-width: 2px 2px 0 0;
}
</style>
<script>
import base from '../../common/utils/base';
import {requestFun} from  '../../common/utils/reqUtils';

export default {
   data(){
      return{
       
      }
    },
    created () {
      base.setMediaBase()
    },
    mounted(){
     
    },
    methods:{
      
    }
}
</script>
