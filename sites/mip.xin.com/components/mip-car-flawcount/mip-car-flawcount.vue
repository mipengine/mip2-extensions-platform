<template>
  <div class="wrapper">
        <div class="flawDescWrap" v-if="currentIndex == index || (item.flawIndex != 0 && !item.flawIndex)"   v-for="(item,index) in imgArr" :key="index">
                <div class="flawDesc">
                    <span class="flawIndex">{{ item.flawIndex==0 || item.flawIndex ? item.flawIndex +1:index+1}}</span>
                    <span class="flawDescContent" v-if="item.u2_name"> {{item.u2_name}} : </span>
                    <span class="flawDescContent"> {{item.flaw_desc}}</span>
                </div>
                <div class="imgNum" v-if="imgArr.length > 1 && item.flawIndex==0 || item.flawIndex">{{index+1}} / {{imgArr.length}}</div>
        </div>
    </div>
</template>

<style scoped>
.flawDescWrap {
  display: flex;
  justify-content: space-between;
  padding: 0 0.4rem;
  margin-top: 0.32rem;
  margin-bottom: 0.32rem;
}

.flawIndex {
  display: inline-block;
  width: 0.32rem;
  height: 0.32rem;
  background-color: #f3d334;
  line-height: 0.32rem;
  color: #fff;
  border-radius: 50%;
  margin-right: 0.12rem;
  text-align: center;
}

.flawDescContent {
  font-size: 0.24rem;
  font-family: PingFangSC-Regular;
  color: rgba(88, 88, 88, 1);
}

.imgNum {
  font-size: 0.24rem;
  font-family: PingFangSC-Regular;
  color: rgba(88, 88, 88, 1);
}
</style>

<script>
export default {
  props: {
    imgArr: {
      type: Array,
      required: true
    },
    currentIndex: {
      type: Number,
      required: true
    }
  },
  mounted() {
    let vm = this;
    this.$on("handle", function(event) {
      vm.handle(event);
    });
  },
  method: {
    handle: function(event) {
      console.log(event);
    }
  },
  watch: {
    currentIndex() {
      this.currentIndex = this.currentIndex;
    }
  }
};
</script>