<template type="mip-mustache">
  <div class="wrapper">
    <div class="wage">
      <label>
        <slot></slot>
      </label>
      <input type="number" placeholder="0-10000 ,000 最多两位小数" v-on:blur="checkNum" v-model="amount" @keyup="numberAmount(amount)">
    </div>
    <div class="arrow" @click="openAddressSelect()">
      <label for="">缴纳城市</label>
      <input type="text" placeholder="" :value="provinceName" class="ip-disable">
    </div>
    <div class="arrow" @click="openScrollSelect()">
      <label for="">起征点</label>
      <input type="text" class="ip-disable" id="threshold" :value="threshold">
    </div>
    <mip-address-select :showaddress="showaddress" @getcitydata="getcitydata" @closecityselect="closeCitySelect"></mip-address-select>
    <mip-scroll-select :scrollshow="scrollshow" :values="values" @showselect="showselect" @colsescrollselect="colseScrollSelect"></mip-scroll-select>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showaddress: false,
      provinceName: "广东",
      cityName: "广州市",
      threshold: 3500,
      values: [
        "3500",
        "4800(外籍人士，包括港澳台)"
      ],
      scrollshow: false,
      amount: "",
    }
  },
  mounted: function() {
    this.provinceName = this.provinceName + " " + this.cityName;
  },

  methods: {
    numberAmount(obj) {
      let sNum = obj.toString(); //先转换成字符串类型
      if (sNum > 10000000) {
        sNum = sNum.slice(0, 7)
        console.log("yes");
      }
      this.amount = sNum.replace(/[^\d.]/g, ""); //清除“数字”和“.”以外的字符    
      this.amount = this.amount.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的   
      this.amount = this.amount.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
      this.amount = this.amount.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); //只能输入两个小数
      if (this.amount > 10000000) {
        return false;
      }
      //以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额 
      if (this.amount.indexOf(".") < 0 && this.amount != "") {
        this.amount = parseFloat(sNum);

      }
      MIP.setData({ "wage": this.amount });
      this.$emit("getinputwage", this.amount)
    },
    inputWageBefore: function(e) {
      MIP.setData({ "wage": e.target.value });
      this.$emit("getinputwage", e.target.value)
    },
    openAddressSelect: function() {
      console.log(11, this.showaddress)
      this.showaddress = true;
    },
    getcitydata: function(obj) {
      let cityData = obj.detail[0];
      this.showaddress = false;
      this.provinceName = cityData.provinceName + ' ' + cityData.cityName; //显示地址选择器所选省份城市/*
      this.$emit("getcitybasemoney", cityData.socialSecurity)
      console.log(cityData.socialSecurity.aged.baseMoney);
    },
    //打开起征点
    openScrollSelect: function() {
      this.scrollshow = true;
    },
    //显示选择值
    showselect: function(obj) {
      let selectValue = obj.detail[0];
      selectValue == "3500" ? this.threshold = 3500 : this.threshold = 4800;
      this.colseScrollSelect();
      this.$emit("getthreshold", this.threshold);
    },
    colseScrollSelect: function() {
      this.scrollshow = false;
    },
    closeCitySelect: function() {
      this.showaddress = false;
    },

  },
}

</script>
