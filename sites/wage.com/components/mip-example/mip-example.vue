<template>
  <div id="Container">
    <div 
      v-show="resultShow"
      class="pt55">
      <mip-fixed 
        still
        type = "top"
        class="tag-nav-top">
        <div 
          v-show="resultShow"
          class="tag-nav">
          <div class="flex-item">
            <span
              :class="{active:active}"
              @click="selectTag(1,active)">计算税后工资</span>
            <span :class="{active_select:active}"/>
          </div>
          <div class="flex-item"><span
            :class="{active:!active}"
            @click="selectTag(2,!active)">推算税前工资</span><span :class="{active_select:!active}"/></div>
        </div>
      </mip-fixed>
      <!--计算税前工资-->
      <div :class="{box:isOk}">
        <mip-wage-city-threshold
          @getcitybasemoney="getCitybaseMoney"
          @getthreshold="getThreshold"
          @getinputwage="getInputWage">{{ title }}</mip-wage-city-threshold>
        <mip-social-security
          :fromwage="wage"
          :tag="tag"
          :isclick = "isClick"
          :socialsecurity="socialSecurity"
          @securityselect="securitySelect"
          @getsecuritybase="getSecurityBase"
          @getselectvalue="getSelectValue"
          @islowst="isLowst">是否缴纳社保</mip-social-security>
        <mip-social-security
          :isshow="show"
          :fromwage="wage"
          :tag="tag"
          :isclick = "isClick"
          @securityselect="securitySelect"
          @getsecuritybase="getSecurityBase"
          @getproportion="getProportion"
          @getselectvalue="getSelectValue"
          @islowst="isLowst">是否缴纳公积金</mip-social-security>
      </div>
      <div
        id="calculateBtn"
        class="calculateBtn"
        @click="calculate">开始计算</div>
      <!--提示框-->
      <mip-fixed
        :class="{none:tipShow}"
        type="top"
        class="container">
        <div
          id="tips"
          :class="{none:tipShow}"
          class="tipsMes">{{ tipsmes }}</div>
      </mip-fixed>
    </div>
    <mip-result
      v-show="!resultShow"
      :resultdata="resultData"/>
    <div
      id="tips"
      :class="getPositionValue"
      class="tips">企微云提供技术支持</div>
  </div>
</template>
<style scoped>
.pt55{
	padding-top: 55px;
}
.tag-nav-top{
	margin-top: 44px !important;
}
.container{
  height: 50px;
  top:88px;
	z-index: 1000;
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
  font-weight: 400;
  color: #333;
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
.open {
  background: #FF8D1D;
}

.none {
  display: none;
}
.calculateBtn {
  width: 50%;
  height: 45px;
  line-height: 45px;
  margin: 20px auto;
  font-size: 17px;
  color: #fff;
  font-weight: 400;
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
	-webkit-tap-highlight-color: transparent; 
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

.tag-nav {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  width: 100%;
  height: 45px;
  line-height: 45px;
  margin-bottom: 10px;
  color: #888685;
  background: #fff;
}

.flex-item {
  position: relative;
  width: 50%;
  text-align: center;
  font-size: 17px;
  font-family: PingFang-SC-Medium;
  font-weight: 400;
	-webkit-tap-highlight-color: transparent; 
}

.active_select {
  display: inline-block;
  width: 32px;
  height: 3px;
  background: #FF8D1D;
  position: absolute;
  left: 50%;
  margin-left: -16px;
  bottom: 0;
}

.active {
  color: #FF8D1D;
}

.wrapper {
  height: 90px;
  margin: 0 auto;
  padding: 0 10pt;
  text-align: center;
  border-radius: 10pt;
  background: #fff;
}
.z0{
  z-index: -1 !important;
}
.foonter {
  position: absolute;
}

</style>
<script>
export default {
	props: {
		wage: {
			type: Number,
			default: 0
		},
		tipsmes: {
			type: String,
			default: ''
		}
	},
	data () {
		return {
			getAllData: {
				threshold: 3500, // 起征点，
				lowst: {
					socialLowst: 2,
					accumulationLowst: 2
				}
			},
			isOk: false,
			show: true,
			tipShow: true,
			active: true,
			title: '税前工资',
			tag: 1, // 1-税前，2-税后
			security: { // 五险一金
				socialSelect: {
					isHave: true,
					baseMoney: 0
				},
				accumulationSelect: {
					isHave: true,
					proportion: 0,
					baseMoney: 0
				}
			},
			// 默认北京-社保公积金基数
			socialSecurity: {
				aged: {
					baseMoney: 3384,
					maxMoney: 25401,
					proportion: 8
				},
				noWork: {
					baseMoney: 3387,
					maxMoney: 25401,
					proportion: 0.2
				},
				medical: {
					baseMoney: 5080,
					maxMoney: 25401,
					proportion: 2
				},
				disease: {
					baseMoney: 0,
					proportion: 0
				},
				accumulation: {
					baseMoney: 2273,
					maxMoney: 25401
				}
			},
			selectValue: 1,
			resultShow: true,
			resultData: {
				realIncome: 5000,
			},
			small: false,
			isClick:0,
		};
	},
	mounted: function () {
		this.security.socialSelect.baseMoney = this.wage;
		this.security.accumulationSelect.baseMoney = this.wage;
	},
	methods: {
		// 切换税前/税后工资
		selectTag: function (index,flag) {
			this.isClick++;
			!flag?this.active = !this.active:'';
			this.tag = index;
			if (index == 1) {
				this.title = '税前工资';
				this.getAllData.lowst.socialLowst = 2;
				this.getAllData.lowst.accumulationLowst = 2;
			} else {
				this.title = '税后工资';
				this.getAllData.lowst.socialLowst = 3;
				this.getAllData.lowst.accumulationLowst = 3;
				this.isOk = true;
			}
			/* this.reload(); */
		},
		// 是否购买五险一金
		securitySelect: function (obj) {
			let data = obj.detail[0];
			data.socialSelect != null ? this.security.socialSelect.isHave = data.socialSelect : '';
			data.accumulationSelect != null ? this.security.accumulationSelect.isHave = data.accumulationSelect : '';
		},
		// 获取自定义五险一金基数
		getSecurityBase: function (obj) {
			let data = obj.detail[0];
			data.socialMoney != null ? this.security.socialSelect.baseMoney = data.socialMoney : '';
			data.accumulationMoney != null ? this.security.accumulationSelect.baseMoney = data.accumulationMoney : '';
		},
		// 获取不同区域社保基数
		getCitybaseMoney: function (obj) {
			let socialSecurity = obj.detail[0];
			this.socialSecurity = socialSecurity;
		},
		// 获取公积金基数
		getProportion: function (obj) {
			let proportion = obj.detail[0];
			this.security.accumulationSelect.proportion = proportion;
		},
		// 获取起征点
		getThreshold: function (obj) {
			let threshold = obj.detail[0];
			this.getAllData.threshold = threshold;
		},

		// 计算
		calculate: function () {
			// 税前/税后工资
			let reg = /^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/;
			if (this.wage == '') {
				if (this.tag == 1) {
					this.showTipShow('请输入税前工资');
					return false;
				} else {
					this.showTipShow('请输入税后工资');
					return false;
				}
			} else {
				if (!reg.test(this.wage)) {
					this.showTipShow('工资输入不符合规则');
					return false;
				}
			}
			if (this.security.socialSelect.isHave) {
				if (this.getAllData.lowst.socialLowst == 2) {
					this.security.socialSelect.baseMoney = this.wage;
				}
				if (this.security.socialSelect.baseMoney == '0' || this.security.socialSelect.baseMoney == '') {
					this.showTipShow('请输入社保基数');
					return false;
				} else {
					if (!reg.test(this.security.socialSelect.baseMoney)) {
						this.showTipShow('社保输入不符合规则');
						return false;
					}
				}
			}
			if (this.security.accumulationSelect.isHave) {
				if (this.getAllData.lowst.accumulationLowst == 2) {
					this.security.accumulationSelect.baseMoney = this.wage;
				}
				if (this.security.accumulationSelect.baseMoney == 0 || this.security.accumulationSelect.baseMoney == '') {
					this.showTipShow('请输入公积金基数');
					return false;
				} else {
					if (!reg.test(this.security.accumulationSelect.baseMoney)) {
						this.showTipShow('公积金输入不符合规则');
						return false;
					}
				}
				if (this.security.accumulationSelect.proportion == 0 || this.security.accumulationSelect.proportion == '') {
					this.showTipShow('请输入公积金比例');
					return false;
				}
			}
			this.getAllData.security = this.security;
			this.getAllData.tag = this.tag;
			this.getAllData.wage = this.wage;
			this.getAllData.socialSecurity = this.socialSecurity;
			this.getResult(this.getAllData);
			this.resultShow = false;
		},
		showTipShow (mes) {
			this.tipsmes = mes;
			this.tipShow = false;
			setTimeout(() => {
				this.tipShow = true;
			}, 2000);
		},
		getInputWage: function (obj) {
			let wage = obj.detail[0];
			this.wage = wage;
		},
		isLowst: function (obj) {
			let isLowst = obj.detail[0];
			isLowst.accumulationLowst ? this.getAllData.lowst.accumulationLowst = isLowst.accumulationLowst : '';
			isLowst.socialLowst ? this.getAllData.lowst.socialLowst = isLowst.socialLowst : '';
		},
		getSelectValue: function (str) {
			this.selectValue = str.detail[0];
		},
		getResult: function (data) {
			let $data = {};
			let sociall = 0;
			let accumulation = 0;
			$data = JSON.parse(JSON.stringify(data));
			if (!$data.security.accumulationSelect.isHave) {
				$data.security.accumulationSelect.baseMoney = 0;
			}
			if (!$data.security.socialSelect.isHave) {
				$data.security.socialSelect.baseMoney = 0;
			}
			if ($data.lowst.socialLowst == 1) { // 最低标准
				if ($data.security.socialSelect.isHave) {
					let $social_1 = $data.socialSecurity.aged.baseMoney * $data.socialSecurity.aged.proportion / 100;
					let $social_2 = $data.socialSecurity.noWork.baseMoney * $data.socialSecurity.noWork.proportion / 100;
					let $social_3 = $data.socialSecurity.medical.baseMoney * $data.socialSecurity.medical.proportion / 100;
					/* var $social_4 = $data.socialSecurity.disease.baseMoney * $data.socialSecurity.disease.proportion / 100; */
					sociall = $social_1 + $social_2 + $social_3;
				} else {
					sociall = 0;
				}
			} else {
				if ($data.security.socialSelect.isHave) {
					let socialMoney = 0;
					if ($data.lowst.socialLowst == 2) {
						socialMoney = $data.wage;
					} else {
						socialMoney = $data.security.socialSelect.baseMoney;
					}
					let $social_5 = 0; // 计算养老基数
					let $social_6 = 0; // 计算失业保险
					let $social_7 = 0;
					if (socialMoney > $data.socialSecurity.aged.baseMoney && socialMoney < $data.socialSecurity.aged.maxMoney) {
						$social_5 = socialMoney * $data.socialSecurity.aged.proportion / 100;
					} else if (socialMoney > $data.socialSecurity.aged.maxMoney) {
						$social_5 = $data.socialSecurity.aged.maxMoney * $data.socialSecurity.aged.proportion / 100;
					} else {
						$social_5 = $data.socialSecurity.aged.baseMoney * $data.socialSecurity.aged.proportion / 100;
					}

					if (socialMoney > $data.socialSecurity.noWork.baseMoney && socialMoney < $data.socialSecurity.noWork.maxMoney) {
						$social_6 = socialMoney * $data.socialSecurity.noWork.proportion / 100;
					} else if (socialMoney > $data.socialSecurity.noWork.maxMoney) {
						$social_6 = $data.socialSecurity.noWork.maxMoney * $data.socialSecurity.noWork.proportion / 100;
					} else {
						$social_6 = $data.socialSecurity.noWork.baseMoney * $data.socialSecurity.noWork.proportion / 100;
					}
					if (socialMoney > $data.socialSecurity.medical.baseMoney && socialMoney < $data.socialSecurity.medical.maxMoney) {
						$social_7 = socialMoney * $data.socialSecurity.medical.proportion / 100;
					} else if (socialMoney > $data.socialSecurity.medical.maxMoney) {
						$social_7 = $data.socialSecurity.medical.maxMoney * $data.socialSecurity.medical.proportion / 100;
					} else {
						$social_7 = $data.socialSecurity.medical.baseMoney * $data.socialSecurity.medical.proportion / 100;
					}
					sociall = $social_5 + $social_6 + $social_7 + $data.socialSecurity.disease.baseMoney;
				} else {
					sociall = 0;
				}
			}
			if ($data.security.accumulationSelect.isHave) {
				if ($data.lowst.accumulationLowst == 2) {
					$data.security.accumulationSelect.baseMoney = $data.wage;
				}
				let accumulationBase = 0;
				if ($data.security.accumulationSelect.baseMoney > $data.socialSecurity.accumulation.maxMoney) {
					accumulationBase = $data.socialSecurity.accumulation.maxMoney;
				} else if ($data.security.accumulationSelect.baseMoney < $data.socialSecurity.accumulation.baseMoney) {
					accumulationBase = $data.socialSecurity.accumulation.baseMoney;
				} else {
					accumulationBase = $data.security.accumulationSelect.baseMoney;
				}
				accumulation = accumulationBase * $data.security.accumulationSelect.proportion / 100;
			} else {
				accumulation = 0;
			}

			// 计算税后收入
			if ($data.tag == 1) {
				// 计算个人缴纳社保
				this.resultData = this.getTax($data.wage, sociall + accumulation, $data.threshold);
				this.resultData.tag = $data.tag;
			} else {
				this.resultData = this.after2wage($data.wage, sociall + accumulation, $data.threshold);
				this.resultData.tag = $data.tag;
			}
			this.resultData.threshold = $data.threshold.toFixed(2);
			this.resultData.sociAll = sociall.toFixed(2);
			this.resultData.accumulation = accumulation.toFixed(2);
			this.resultData.wage = $data.wage.toFixed(2);
		},
		// 计算税后工资
		getTax: function (XSum, insure, threshold) {
			let R, Q;
			let taxableIncome = XSum - insure - threshold;
			let A = taxableIncome;
			A = A.toFixed(2);
			if (A <= 1500) {
				R = 0.03;
				Q = 0;
			} else if (A > 1500 && A <= 4500) {
				R = 0.1;
				Q = 105;
			} else if (A > 4500 && A <= 9000) {
				R = 0.2;
				Q = 555;
			} else if (A > 9000 && A <= 35000) {
				R = 0.25;
				Q = 1005;
			} else if (A > 35000 && A <= 55000) {
				R = 0.3;
				Q = 2755;
			} else if (A > 55000 && A <= 80000) {
				R = 0.35;
				Q = 5505;
			} else {
				R = 0.45;
				Q = 13505;
			}
			let tax = taxableIncome * R - Q;
			tax < 0 ? tax = 0 : '';
			let realIncome = XSum - insure - tax;
			taxableIncome < 0 ? taxableIncome = 0 : '';
			return {
				realIncome: realIncome.toFixed(2),
				tax: tax.toFixed(2),
				taxableIncome: taxableIncome.toFixed(2),
				taxR: R * 100,
				taxQ: Q
			};
		},
		// 计算税前工资
		after2wage: function (taxwage, insure, threshold) {
			let hold = threshold;
			let wage = taxwage;
			let zero = 0;
			// 第一段
			if (wage < hold) { 
				return {
					realIncome: (wage + insure).toFixed(2),
					tax: zero.toFixed(2),
					taxableIncome: zero.toFixed(2),
					taxR:0,
					taxQ:0,
				}; 
			}
			// 第二段
			wage = (taxwage - 3500 * 0.03) / (1 - 0.03);
			if (wage > hold && wage <= hold + 1500) {
				return {
					realIncome: (wage + insure).toFixed(2),
					tax: (wage - taxwage).toFixed(2),
					taxableIncome: (wage + insure - hold).toFixed(2),
					taxR:3,
					taxQ:0,
				};
			}
			// 第三段
			wage = (taxwage - 105 - 3500 * 0.1) / (1 - 0.1);
			if (wage > hold + 1500 && wage <= hold + 4500) {
				return {
					realIncome: (wage + insure).toFixed(2),
					tax: (wage - taxwage).toFixed(2),
					taxableIncome: (wage + insure - hold).toFixed(2),
					taxR:10,
					taxQ:105
				};
			}
			// 第四段
			wage = (taxwage - 555 - 3500 * 0.2) / (1 - 0.2);
			if (wage > hold + 4500 && wage <= hold + 9000) {
				return {
					realIncome: (wage + insure).toFixed(2),
					tax: (wage - taxwage).toFixed(2),
					taxableIncome: (wage + insure - hold).toFixed(2),
					taxR:20,
					taxQ:555,
				};
			}
			// 第五段
			wage = (taxwage - 1005 - 3500 * 0.25) / (1 - 0.25);
			if (wage > hold + 9000 && wage <= hold + 35000) {
				return {
					realIncome: (wage + insure).toFixed(2),
					tax: (wage - taxwage).toFixed(2),
					taxableIncome: (wage + insure - hold).toFixed(2),
					taxR:25,
					taxQ:1005,
				};
			}
			// 第六段
			wage = (taxwage - 2755 - 3500 * 0.3) / (1 - 0.3);
			if (wage > hold + 35000 && wage <= hold + 55000) {
				return {
					realIncome: (wage + insure).toFixed(2),
					tax: (wage - taxwage).toFixed(2),
					taxableIncome: (wage + insure - hold).toFixed(2),
					taxR:30,
					taxQ:2755,
				};
			}
			// 第七段
			wage = (taxwage - 5505 - 3500 * 0.35) / (1 - 0.35);
			if (wage > hold + 55000 && wage <= hold + 80000) {
				return {
					realIncome: (wage + insure).toFixed(2),
					tax: (wage - taxwage).toFixed(2),
					taxableIncome: (wage + insure - hold).toFixed(2),
					taxR:35,
					taxQ:5505
				};
			}
			// 第八段
			wage = (taxwage - 13505 - 3500 * 0.45) / (1 - 0.1);
			if (wage > hold + 80000) {
				return {
					realIncome: (wage + insure).toFixed(2),
					tax: (wage - taxwage).toFixed(2),
					taxableIncome: (wage + insure - hold).toFixed(2),
					taxR:45,
					taxQ:13505
				};
			}
		},
		reSet: function () {
			this.resultShow = true;
		}
	}
};

</script>
