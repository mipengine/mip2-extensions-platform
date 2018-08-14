<template>
  <div
    v-if="haveReport"
    class="certification">
    <div class="car-test">
      <div
        id="scroll2"
        style="border-left: 0.04rem solid rgba(248, 93, 0, 1)">
        <span class="title">车辆检测</span>
        <!-- <span class="car-test-ask">咨询车况</span > -->
      </div>
      <div class="car-bottom"/>
      <div class="testerContent">
        <mip-img
          class="testerIcon"
          src="http://c2.xinstatic.com/f3/20180321/1450/5ab200c91cd19349288.png" />
        <div class="testerRight">
          <div>
            <span class="testerName">{{ testMessage.fullname }}</span>
            <span class="testerTag testerDiff">保证真实车况</span>
          </div>
          <div>
            <span class="testerInfo">车辆检测员 {{ testMessage.report_time }} 完成车辆检测 </span>
          </div>
        </div>
      </div>
      <div class="car-test-desc">
        <p>{{ carRepairdesc }}</p>
      </div>
      <div class="car-bottom"/>
      <div
        v-for="(item, index) in carRepairList"
        :key="index"
        class="car-test-content"
        @click="openTester(index + 1)">
        <div class="testList">
          <div>
            <span class="testListLeft">{{ item.cat_name }}</span>
          </div>
          <div class="testListRight">
            <div
              v-if="item.flaw_all_num > 0"
              class="testFlaw">
              <span class="test-list-value" >{{ item.flaw_all_num }}项</span>
              <mip-img
                class="testFlawimg"
                src="http://c2.xinstatic.com/f3/20180416/1840/5ad47da23e611535388.png"/>
            </div>
            <div
              v-if="item.all_num - item.flaw_all_num > 0"
              class="testNormal">
              <span class="test-list-value" >{{ item.all_num - item.flaw_all_num }}项</span>
              <mip-img
                class="testNormalimg"
                src="http://c2.xinstatic.com/f3/20180416/1840/5ad47da23e2e4430972.png"/>
            </div>
            <div class="testArrow"/>
          </div>
        </div>
        <!-- <div class="car-bottom"/> -->
      </div>
    </div>
  </div>
</template>

<script>
import { requestFun } from '../../common/utils/reqUtils'
import { clickPoint } from '../../common/utils/stastic.js'
import { getLocalStorage } from '../../common/utils/utils.js'
const pid = '/pages/detail'
export default {
  // props: ['carid'],
  props: {
    carid: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      carRepairList: [], // 故障列表
      carRepairdesc: '', // 描述信息
      carRepairName: '', // 检测员姓名
      carRepairImg: '', // 检测员头像
      testMessage: {},
      haveReport: false
    }
  },
  mounted () {
    let param = {
      carid: this.carid
    }
    requestFun('/ajax/report/report_main', {
      method: 'POST',
      param: param
    })
      .then(res => {
        this.haveReport = res.is_have_report
        if (res.car_repair_num) {
          this.carRepairList = res.car_repair_num
        }
        if (res.sketch) {
          this.carRepairdesc = res.sketch
        }
        if (res.master_info) {
          this.testMessage = res.master_info
        }
      })
      .catch(err => {
        console.log(err)
      })
  },
  methods: {
    openTester (index) {
      let opurl = getLocalStorage('locationUrl')
        ? getLocalStorage('locationUrl') + '&'
        : '?'

      clickPoint(
        'examine_list_detail',
        {
          carid: this.carid,
          button: index
        },
        () => {
          MIP.viewer.open(
            `/report_${this.carid}.html${opurl}index=${index}`,
            {
              isMipLink: true
            }
          )
        },
        {
          pid: pid
        }
      )
    }
  }
}
</script>
<style scoped>
.ico-position {
  margin-top: 0.44rem;
}

.certification {
  display: flex;
  flex-direction: column;
}

.title {
  font-size: 0.34rem;
  height: 1.1rem;
  line-height: 1.1rem;
  color: #333333;
  font-weight: bold;
  padding-left: 0.36rem;
}
.car-bottom {
  height: 0.01rem;
  width: 100%;
  background-color: #f1f1f1;
}
.certificationContent {
  display: flex;
  flex-direction: column;
}

.car-test {
  display: flex;
  flex-direction: column;
}
#scroll2 {
  display: flex;
  justify-content: space-between;
}
.car-test-ask {
  margin-right: 0.4rem;
}
.testerWrap{
  height: 1.5rem;
  background-color: #bfa;
}
.testerContent {
  position: relative;
  display: flex;
  height: 1.5rem;
}

.testerIcon {
  position: absolute;
  top:0.4rem;
  left:0.4rem;
  width: 0.74rem;
  height: 0.74rem;
  border-radius: 50%;
  resize-mode: contain;
  vertical-align: middle;
}

.testerRight {
  position: absolute;
  top:0.42rem;
  left: 1.39rem;
  height: 0.65rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
}

.testerName {
  font-size: 0.28rem;
  font-family: PingFangSC-Regular;
  color: rgba(51, 51, 51, 1);
}

.testerTag {
  font-size: 0.22rem;
  background-color: #ecf5ff;
  margin-top: 0.04rem;
  margin-left: 0.15rem;
  font-family: PingFangSC-Regular;
  color: rgba(165, 201, 114, 1);
}

.testerDiff {
  background-color: #f6f9f0;
  padding: 0.02rem 0.09rem;
}

.testerInfo {
  font-size: 0.22rem;
  color: #848484;
}
.car-test-desc {
  padding-left: 0.4rem;
  padding-right: 0.4rem;
  font-size: 0.28rem;
  font-family: PingFangSC-Regular;
  color: rgba(88, 88, 88, 1);
  padding-bottom: 0.4rem;
}
.testVideo {
  width: 100%;
  height: 5rem;
}

.car-test-content {
  display: flex;
  flex-direction: column;
  margin-left: 0.4rem;
  margin-right: 0.4rem;
}

.testList {
  width: 100%;
  height: 0.9rem;
  display: flex;
  justify-content: space-between;
  border-bottom: 0.01rem solid #f1f1f1;
}

.testListLeft {
  font-size: 0.3rem;
  color: #585858;
  /* margin-left: 0.4rem; */
  line-height: 0.9rem;
}

.testListRight {
  /* padding-right: 0.3rem; */
  padding-right: 0.03rem;
  color: #c5c5c5;
  display: flex;
  justify-content: center;
  align-items: center;
}
.test-list-value {
  font-size: 0.24rem;
  color: rgba(197, 197, 197, 1);
  margin-right: 0.1rem;
}
.testArrow {
  width: 0.14rem;
  height: 0.14rem;
  transform: rotate(-315deg);
  border: solid #c5c5c5;
  border-width: 0.02rem 0.02rem 0 0;
  margin-left: 0.1rem;
}

.testFlaw {
  margin-right: 0.1rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.testNormal {
  display: flex;
  margin-left: 0.28rem;
}
.testFlawimg,
.testNormalimg {
  width: 0.34rem;
  height: 0.34rem;
}

.certifyText {
  color: #333333;
  font-size: 0.34rem;
}

.look-report {
  margin-top: 0.28rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-color: #eeeeee;
  border-top-width: 0.01rem;
}
.look-report-bottom {
  margin-bottom: 0.8rem;
}
.lookReport {
  text-align: center;
  font-size: 0.26rem;
  margin-bottom: 0.24rem;
  margin-top: 0.24rem;
}
</style>
