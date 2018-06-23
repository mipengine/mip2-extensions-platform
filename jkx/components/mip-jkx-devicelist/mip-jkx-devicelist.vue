<template>
  <div v-show="show" class="mask" ref="mask">
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
</template>
<script>
import {fetch} from '@/common/js/fetch'
import apiUrl from "@/common/js/config.api"
export default {
  mounted () {
    this.$refs.mask.style.height = document.documentElement.clientHeight+"px"
  }
}
</script>
