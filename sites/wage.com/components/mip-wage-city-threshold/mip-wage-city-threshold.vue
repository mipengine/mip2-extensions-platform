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
    <mip-fixed type="bottom" v-show="scrollshow">
      <mip-scroll-select :scrollshow="scrollshow" :values="values" @showselect="showselect" @colsescrollselect="colseScrollSelect"></mip-scroll-select>
    </mip-fixed>
    <mip-fixed type="bottom" v-show="showaddress">
      <mip-address-select :showaddress="showaddress" @getcitydata="getcitydata" @closecityselect="closeCitySelect"></mip-address-select>
    </mip-fixed>
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
<style scoped>
mip-fixed[type=bottom],
mip-fixed[type=top] {
  height: 100%;
}

.mip-layout-container {
  height: 100%;
}
.wrapper {
  position: relative;
  margin: 0 15px 10px 15px;
  text-align: center;
  border-radius: 5px;
  background: #fff;
  border: 1px solid #E6E4E1;
}

.wrapper>div {
  height: 45px;
  line-height: 45px;
  margin: 0 16px;
  font-size: 16px;
  text-align: left;
  color: #999;
  border-bottom: 1px solid #F5F5F5;
}

.wrapper label {
  width: 10em;
  font-family: PingFang-SC-Medium;
  font-size: 13px;
  font-weight: 500;
  color: #000;
}

label {
  position: absolute;
  width: 7em;
  font-size: 16px;
}

input {
  width: 100%;
  padding-left: 7em;
  text-align: right;
  box-sizing: border-box;
  border: none;
  outline: none;
}

input::placeholder {
  text-align: right;
  color: #ccc;
}

.arrow {
  padding-right: 15px;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAB+klEQVRIS62Wv4sTQRTHv28DdoJ98ldok8ybNHdcd4o22vnjCkUOEeWw9AeKIocgHlYqFuIV8UepnRbZmVVBG0mllZWiRVJ4guB+5UmuS7KzZ6Yadt9+Pvv2vZlZwZQRQrhKcst7f2NaTMp1mRTU7/f3ZVn2FkADwFlVvZMCmxQzUWCBMcYVkvdtTvKk9/7fvO6YKjBQCOEMAHv7PyJy1Dm3OVfBWHIBwE2TkDzsvX9eRzIzg21QjPEKyYsAfpM86L1/mSpJEowzuQXgPIAtksve+9cpkmQBSYkx3gVwWkR+klxS1aJKkiwYd5MURfGQ5DEAoyzLFjqdzodZkloCA/V6vUar1dq0ggP4LiKLzrmP0yS1BQYaDAa7RqPRU5L7SX7NsqzrnPtca6FVfds8z3eLyBcAewC8UdXO3ASWwXA4fALgAIBvjUaj2263P81FYDVoNpuPARwB8ENEFuZWg3GrPgBwwrqoLMvFbrf7fi5dZPAQwoaIrNpiE5El51ysqlVyF+V5vi4iawB+AVhW1VdVcLufJAghXAZwabwXHfLev0iBJwlijGsk1203tcKq6rNUeKUgxrhKcsPOHADHVfVRHfhMQQjBOsU6xsYpVb1XFz5VUBTF3rIs39mZLCLnnHO3dwKfmUGM8br9VajqtZ3CK2vwP+DtZ/8CVbfLGdhcLzIAAAAASUVORK5CYII=) no-repeat 100% 56%;
  background-size: 10px;
}

.ip-disable {
  pointer-events: none;
}

.onOff {
  position: absolute;
  right: 19px;
  top: 15px;
  height: 20px;
  width: 38px;
  background: #bbb;
  border-radius: 10px;
  cursor: pointer;
  display: block;
}

.onOff_off {
  position: absolute;
  top: 1px;
  left: 1px;
  width: 18px;
  height: 18px;
  background: #fff;
  border-radius: 50%;
}

.open {
  background: #FF8D1D;
}

.none {
  display: none;
}

.onOff_off.active {
  left: 50%;
}

.calculateBtn {
  width: 50%;
  height: 45px;
  line-height: 45px;
  margin: 20px auto;
  font-size: 17px;
  color: #fff;
  font-weight: 500;
  text-align: center;
  border-radius: 45px;
  background: -webkit-linear-gradient(left, #FF731F, #FFA53A);
  /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(right, #FF731F, #FFA53A);
  /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(right, #FF731F, #FFA53A);
  /* Firefox 3.6 - 15 */
  background: linear-gradient(to right, #FF731F, #FFA53A);
  /* 标准的语法 */
}

.tips {
  position: relative;
  bottom: 0;
  width: 100%;
  height: 40px;
  line-height: 40px;
  font-size: 12px;
  color: #ACA9A7;
  text-align: center;
}

.mb21 {
  margin-bottom: 21px;
}

.right {
  float: right;
}

li {
  list-style: none;
}

.mt20 {
  margin-top: 20px;
}

.left {
  float: left;
}

.cfont {
  color: #FF8D1D;
}

.c-disable {
  color: #ACA9A7;
}

</style>
