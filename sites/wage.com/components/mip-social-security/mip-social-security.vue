<template>
  <div class="wrapper">
    <div class="">
      <label for="">
        <slot></slot>
      </label>
      <div class="onOff" v-bind:class={open:isOpen} v-on:click="closeOrShow"><span class="onOff_off" v-bind:class={active:isOpen}></span></div>
    </div>
    <div class="arrow" v-show="isOpen" :scrollshow="scrollshow" @click="openScrollSelect()" :class="{'ip-disable':isAfter}">
      <label for="">缴纳标准</label>
      <input type="text" class="ip-disable" :value="selectValue">
    </div>
    <div class="wage" v-show="isOpen">
      <label for="">缴纳基数</label>
      <input type="number" placeholder="0-1000,000 最多两位小数" :class="{'ip-disable':ok,'c-disable':ok}" :value="getBase" @input="inputBaseMoney">
    </div>
    <!-- <span>{{tag}}</span> -->
    <!--  <div v-show="isshow"> -->
    <div class="wage wage2" v-show="isOpen && isshow">
      <label for="">缴纳比例</label>
      <input type="number" placeholder="请输入5-12" @input="inputProportion">
    </div>
    <mip-scroll-select :scrollshow="scrollshow" @showselect="showSelect" @colsescrollselect="colseScrollSelect" :values="showValues"></mip-scroll-select>
  </div>
</template>
<style scoped>


</style>
<script>
export default {
  props: {
    isshow: {
      type: Boolean,
      default: false,
    },
    fromwage: {
      type: Number,
      default: 0,
    },
    tag: {
      type: Number,
      default: 1,
    },
    socialsecurity: {
      type: Object,
      default: () => {
        return {
          aged: {
            baseMoney: 2682,
            proportion: 8
          },
          noWork: {
            baseMoney: 2682,
            proportion: 0.2
          },
          medical: {
            baseMoney: 2682,
            proportion: 2
          },
          disease: {
            baseMoney: 0,
            proportion: 2
          },
          values: [
            "按照工资",
            "按照最低标准",
            "自定义",
          ],
        }
      },
    }
  },
  data() {
    return {
      isOpen: true,
      security: {},
      baseMoneys: {},
      scrollshow: false,
      selectValue: "按照工资",
      ok: true,
      baseMoney: "",
      fromWage: true,
      fromBase: "",
      isLowst: {
        socialLowst: 2,
        accumulationLowst: 2,
      },
      amount: "",
      numberAmount: "",
      isAfter: false,

    }
  },
  mounted: function() {

  },
  computed: {
    getBase: function() {
      var agedBaseMoney = this.socialsecurity;
      if (this.fromWage) {
        return this.fromwage;
      } else {
        if (this.isLowst.socialLowst == 1) {
          this.fromBase = this.socialsecurity.noWork.baseMoney;
        }
        return this.fromBase;
      }
    },
    showValues: function() {
      if (this.isshow) { //公积金
        if (this.tag == 1) { //税前
          this.selectValue = "按照工资";
          this.fromWage = true;
          this.ok = true;
          this.isAfter = false;
          return this.values = ["按照工资", "自定义"];
        } else { //税后
          this.selectValue = "自定义";
          this.fromWage = false;
          this.ok = false;
          this.fromBase = "";
          this.isAfter = true;
          return this.values = ["自定义"];
        }

      } else { //社保
        this.isAfter = false;
        if (this.tag == 1) { //税前
          this.selectValue = "按照工资";
          this.fromWage = true;
          this.ok = true;
          return this.values = [
            "按照工资",
            "按照最低标准",
            "自定义",
          ]
        } else { //税后
          this.selectValue = "自定义";
          this.fromWage = false;
          this.ok = false;
          this.fromBase = "";
          this.baseMoney = "";
          return this.values = [
            "自定义",
            "按照最低标准"
          ]
        }
      }
    }
  },
  methods: {
    closeOrShow: function() {
      this.isOpen = !this.isOpen;
      if (this.isshow) { //公积金
        // this.accumulationSelect = this.isOpen;
        this.security.accumulationSelect = this.isOpen;
      } else { //社保
        this.security.socialSelect = this.isOpen;
      }
      this.$emit("securityselect", this.security);
    },
    openScrollSelect: function() {
      this.scrollshow = true;
    },
    showSelect: function(obj) {
      this.fromWage = false;
      this.$emit("getselectvalue", 2)
      if (obj.detail[0] != "" && obj.detail[0] != '0') {
        this.selectValue = obj.detail[0];
      }
      if (this.selectValue == "自定义") {
        //基数可编辑
        this.ok = false;
        this.baseMoney = "";
        this.fromBase = "";
        isshow ? this.isLowst.accumulationLowst = 3 : this.isLowst.socialLowst = 3;
        this.$emit("islowst", this.isLowst);
        this.fromWage = false;
      } else {
        if (this.selectValue == "按照工资") {
          this.$emit("getselectvalue", 1);
          this.fromWage = true;
          this.baseMoney = this.fromwage;
          isshow ? this.isLowst.accumulationLowst = 2 : this.isLowst.socialLowst = 2;
          this.$emit("islowst", this.isLowst)
        } else { //最低标准
          this.fromWage = false;
          if (!this.isshow) { //社保
            this.fromBase = this.socialsecurity.noWork.baseMoney;
            this.baseMoney = this.socialsecurity.noWork.baseMoney;
            this.isLowst.socialLowst = 1;
            this.$emit("islowst", this.isLowst);
          }
          /*  else {
             this.fromBase = this.accumulationSelect.aged.baseMoney
             this.baseMoney = this.accumulationSelect.aged.baseMoney;
           }*/
        }
        this.ok = true;
      }
      this.scrollshow = false;
      this.sendBaseMoney();
    },
    colseScrollSelect() {
      this.scrollshow = false;
    },
    //公积金比例
    inputProportion: function(e) {
      let sNum = e.target.value.toString(); //先转换成字符串类型
      if(sNum>12){
        sNum = "12";
      }else if(sNum<5&& sNum != 0){
        sNum = "5";
      }
      if(sNum.indexOf(".")>0){
        let index = sNum.indexOf(".");
        sNum = sNum.slice(0, index);
      }
      e.target.value = sNum;
      this.$emit("getproportion", e.target.value)
    },
    inputBaseMoney: function(e) {
      let sNum = e.target.value.toString(); //先转换成字符串类型
      if (sNum > 10000000) {
        sNum = sNum.slice(0, 7)
      }
      this.baseMoney = sNum.replace(/[^\d.]/g, ""); //清除“数字”和“.”以外的字符    
      this.baseMoney = this.baseMoney.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的   
      this.baseMoney = this.baseMoney.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
      this.baseMoney = this.baseMoney.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); //只能输入两个小数
      //以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额 
      if (this.baseMoney.indexOf(".") < 0 && this.baseMoney != "") {
        this.baseMoney = parseFloat(sNum);
      }
      e.target.value = this.baseMoney
      this.fromBase = this.baseMoney;
      this.sendBaseMoney();
    },
    sendBaseMoney: function() {
      let baseMoneys = {};
      this.isshow ? (baseMoneys.accumulationMoney = this.baseMoney) : (baseMoneys.socialMoney = this.baseMoney);
      this.$emit("getsecuritybase", baseMoneys)
    },
  }
}

</script>
