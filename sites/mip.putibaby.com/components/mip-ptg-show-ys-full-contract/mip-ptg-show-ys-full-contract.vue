
<template>
  <div class="paidan body">

    <!--<h2>菩提果母婴护理服务合同</h2>-->

    <div class="line"/>

    <div
      v-if="data.is_admin"
      class="order_number">
      <p>
        合同编号: ( {{ order.order_number }})
      </p>
    </div>

    <p>
      甲方（客户）：<i> {{ order.contract_mama_name }} </i><br>
    </p>
    <div v-if="!/^(interview|contract)/.test(order.state)">
      联系方式：<i>{{ order.contract_mama_phone_number }}</i>
      <br>
    </div>
    <p>
      身份证号：<i class="id_card"> {{ order.contract_mama_id_card }} </i><br>
    </p>

    <p>
      乙方（母婴护理师）：<i> {{ master.name }} </i><br>
    </p>
    <div v-if="!/^(interview|contract)/.test(order.state)">
      联系方式：<i> {{ master.phone_number }} </i><br>
    </div>
    <p>
      身份证号：<i class="id_card"> {{ master.id_card }} </i><br>
    </p>

    <p>
      丙方：<i>天津菩提果科技有限公司</i> （以下简称本公司）<br> 联系方式：
      <i>400-618-8835</i><br> 丙方地址：
      <i>北京市朝阳区红军营南路天朗园傲城融富中心B座2903室</i>
    </p>
    <br>
    <p>
      经丙方推荐，就甲方雇用乙方为其提供母婴护理服务，经三方共同协商达成以下协议：
    </p>
    <p class="title">一、合同内容：</p>
    <p>
      1. 丙方负责根据甲方的需求，推荐适合的护理师人选给甲方。
    </p>
    <p>
      2. 甲乙双方经过沟通确认后，甲方同意选择并认可乙方为其提供服务，明确具体内容如下：
    </p>
    <p>
      （1）工作范围：母婴护理师上门服务，即<i>月嫂</i>服务。
    </p>
    <p>
      （2）服务时间：<i>{{ data.order.contract_is_offer_allday_service?"全天24小时工作制":"白班工作制" }}</i>，工作时间另行商定。
    </p>
    <p>
      （3）签约服务时长：共&nbsp;<i>{{ order.contract_shanghu_length }}</i>&nbsp;天，按照连续自然日计算，预计乙方上户时间自
      <i>{{ Helper_fix_date(order.contract_shanghu_at).getFullYear() }}</i>年
      <i>{{ Helper_fix_date(order.contract_shanghu_at).getMonth() + 1 }}</i>月
      <i>{{ Helper_fix_date(order.contract_shanghu_at).getDate() }}</i>日至
      <i>{{ new Date(+Helper_fix_date(order.contract_shanghu_at) + order.contract_shanghu_length*86400*1000).getFullYear() }}</i>年
      <i>{{ new Date(+Helper_fix_date(order.contract_shanghu_at) + order.contract_shanghu_length*86400*1000).getMonth()+1 }}</i>月
      <i>{{ new Date(+Helper_fix_date(order.contract_shanghu_at) + order.contract_shanghu_length*86400*1000).getDate() }}</i>日止。
    </p>
    <p>
      （备注：实际上户履行服务时间，以甲方客户生产后护理师上门服务时间为准。带薪休假具体时间和日期由甲方和乙方协商确定）
    </p>
    <p>
      （4）服务地址为（客户地址）：<i>{{ order.contract_location }}</i>
    </p>
    <p>
      （5）服务费用：月服务费为 <i>{{ (order.contract_price/order.contract_shanghu_length*26).toFixed(0) }}</i>元（按26个连续自然日计算）（人民币大写金额 {{ Helper_number_to_chinese(parseInt(order.contract_price/order.contract_shanghu_length*26)) }}元整) 。总服务费为 <i>{{ order.contract_price.toFixed(2) }}</i>    元（人民币大写金额 <i>{{ Helper_number_to_chinese(order.contract_price) }}</i> 元整 ）。

    </p>
    <p>
      （备注：总服务费金额=月服务费÷26×总服务天数+特殊情况。特殊情况需加收一定服务费用，包括但不限于双胞胎、早产儿，需双方协商费用并填写在补充条款中。）
    </p>
    <p>
      （6）遇国家法定节假日若因甲方需要乙方继续工作无法休息的，甲方需支付乙方加班费三倍工资（或双方协商决定，可在补充条款中约定）。法定节假日加班费含元旦（1天）、清明（1天 ）、五一（1天）、端午（1天）、十一（3天）、中秋（1天）、春节（3天）。
    </p>
    <p>
      3. 同时甲乙双方需支付定金和保证金给丙方，作为双方的承诺保障。定金/保证金为签订合同&nbsp;{{ order.contract_is_pay_monthly?"第一个月服务费":"总金额" }}&nbsp;的
      <i>{{ (order.contract_deposit_min * 100).toFixed(0) }}</i>%&nbsp;。
    </p>
    <p>
      甲方（客户）需交付<i>{{ ((order.contract_is_pay_monthly?(order.contract_price/order.contract_shanghu_length*26):order.contract_price)*order.contract_deposit_min).toFixed(2) }}</i>&nbsp;元给丙方作为服务定金，待甲乙双方履行合同时，定金直接转为合同款项的一部分。 乙方（母婴护理师）需交付<i>&nbsp;{{ ((order.contract_is_pay_monthly?(order.contract_price/order.contract_shanghu_length*26):order.contract_price)*order.master_deposit_min).toFixed(2) }}</i>元作为保证金。如合同正常履行，合同结束时返还乙方保证金。
    </p>
    <p>
      4. 乙方上户时间根据甲方具体生产时间确定，甲方有义务提前至少24小时通知乙方按指定时间到岗服务。甲方指定的上户地点与护理师注册服务地不相同时，甲乙双方协商往返交通费用的支付。入户时间自乙方到达甲方指定服务地点时起算。
    </p>
    <p>
      5. 乙方带薪试工期为3天，3天后如甲乙双方均愿意继续此合同内容，则：
    </p>

    <div v-if="order.contract_is_pay_monthly">
      <p>甲方需立即支付第一个月服务费余款（等于月服务费-定金金额）<i>{{ (order.contract_price/order.contract_shanghu_length*26*(1-order.contract_deposit_min)).toFixed(2) }}</i>元给丙方。如有菩提果提供的优惠券，将在本次付款过程中扣除。
      </p>
      <p>后续服务费需在上一个周期结束前，提前3个自然日支付给丙方。
      </p>
    </div>

    <p v-if="!order.contract_is_pay_monthly">
      甲方需立即支付余款（等于全款金额-定金金额）<i>{{ (order.contract_price*(1-order.contract_deposit_min)).toFixed(2) }}</i>元给丙方。如有菩提果提供的优惠券，将在本次支付过程中扣除。
    </p>

    <p>
      如甲方未及时支付或者拒绝支付余款的，丙方有权要求乙方立即终止服务。待甲方完成支付后可继续进行约定服务。
    </p>
    <p>
      6. 合同签定后任何一方不得单方面违约，否则承担相应的违约责任：
    </p>
    <p>
      （1）如甲方在乙方上户前，无正当理由单方违约导致合同无法履行的，则甲方缴纳的定金不退还，作为违约金赔偿给乙方和丙方。如甲方因为不可预测的特殊情况（例如流产、死胎等）造成的乙方无法正常上户，则不作为违约情况，甲方缴纳的定金全额退还，但甲方必须提供相应的医疗检查证明。因此对乙方造成的损失，丙方以优先安排订单为补偿。
    </p>
    <p>
      （2）如乙方上户后，甲方无任何正当理由单方违约让乙方提前下户的，甲方除必须结清乙方的服务费以外，还需支付合同总款项的10%作为违约金赔偿给乙方和丙方。
    </p>
    <p>
      （3）乙方如无正当理由不能按时到岗，必须在预定上户日期前至少7天通知丙方，丙方应及时通知甲方，并为甲方调换同等价位或更高价位的母婴护理师，护理师之间的差价无需甲方负担。如丙方给甲方调换的护理师甲方不满意放弃选择，但不构成违约，甲方的定金全额返还。乙方的保证金扣除不退还，作为违约金赔偿给甲方和丙方。
    </p>
    <p>
      （4）如乙方不能按时到岗的原因为不可预测或不可抗力的原因（例如突发疾病、受伤导致无法正常工作、以及其他重要事件等），乙方则不作为违约，所缴纳的保证金可全额退还，但乙方必须提供相应的证明，丙方确认后有效。丙方应及时通知甲方，并为甲方调换同等价位或更高价位的母婴护理师，护理师之间的差价无需甲方负担。如丙方给甲方调换的护理师甲方不满意放弃选择，但不构成违约，甲方的定金全额返还。乙方和丙方不需再额外对甲方进行赔偿。
    </p>
    <p>
      （5）如乙方上户后，甲方用人不满意，丙方负责免费调换三次。调换三次后仍不满意，协议自动终止，甲方除必须结清乙方的服务费以外，剩余款项退回甲方。
    </p>
    <p>
      7. 调换中乙方工资按实际工作天数计算（结算工资=月服务费÷26×实际服务天数）。甲方需先将结算的服务款项支付给丙方，则由丙方向乙方按服务天数结算工资。
    </p>
    <p>
      8. 在乙方为甲方提供完毕服务后，丙方需在5个工作日内向乙方支付扣除服务费之后的全部费用。如服务时间为多月份，则需按月结算。
    </p>
    <p>
      9. 合同期满，如甲方需要续约的，需在合同期满前7天告知丙方，丙方会根据乙方的档期情况进行安排。如不续约的，合同期满当日乙方即可下户，至此完成本次订单服务。
    </p>

    <p class="title">
      二、 甲方的权利义务：
    </p>
    <p>
      1. 乙方进入甲方服务地时为避免误会，甲方务必将贵重物品锁好保管，否则发生问题甲方自行负责。
    </p>
    <p>
      2. 甲方应尊重乙方人格，若对乙方工作不满意时，甲方应及时向乙方提出或丙方代为转告，使乙方尽其所能干好工作。
    </p>
    <p>
      3. 甲方如有在家中安装监控设备等，处于个人隐私保护的问题，甲方需提前告知乙方和丙方，乙方有权知道监控设备安装的范围；并且甲方不得在卫生间和浴室等涉及个人私密行为的地方安装监控设备。同时，监控设备所录制的影像，需在乙方完成服务后的一个月内删除，并不得向任何第三方平台或视频网站上传，否则乙方和丙方有权追究甲方关于侵犯个人隐私的责任。
    </p>
    <p>
      4.乙方在甲方家食宿者，应为乙方提供足够的食物及寝具并保证应有的睡眠（8小时）以确保其能够正常工作。
    </p>
    <p>
      5. 甲方对乙方在服务期间和服务场所的安全负责，不得随意辱骂殴打乙方；不得指使乙方从事危险工作；如遇乙方突发疾病或其他伤害时，甲方应采取必要的救治措施；乙方离开服务地点外出，未按时返回或发生意外，甲方应在24小时内通知丙方。
    </p>
    <p>
      6. 甲方被护理人员有下列疾病者，乙方有权不提供家庭服务，请甲方如实告知：
    </p>
    <p>
      ☆ 各类较严重妊娠合并症的孕产妇，如心脏病、肝炎、甲亢、流行性传染疾病。
    </p>
    <p>
      ☆ 有较严重的妊娠并发症：如重度妊高症、前置胎盘、胎盘早剥等。
    </p>
    ☆ 有较严重的分娩期并发症：如子宫破裂、产后出血、羊水栓塞、重度新生儿窒息、 新生儿产伤、新生儿严重病理性黄疸等。
    <p>
      ☆ 女性生殖系统炎症未愈者，如淋病、梅毒、沙眼衣原体、尖锐湿疣、产褥感染、艾滋病毒感染等。
    </p>
    <p>
      ☆ 患有流感及不明高热者。
    </p>
    <p>
      ☆ 患有各种癌症产妇。
    </p>
    <p>
      ☆ 吸毒产妇，或精神病患者产妇。
    </p>
    <p>
      ☆ 婴儿患有先天性心脏病，新生儿肺炎，先天性疾病：如唇裂，腭裂，先天性造瘘，先天性髋关节脱位等问题。
    </p>
    <p>
      如甲方刻意隐瞒以上疾病，造成护理过程中出现问题，乙方、丙方均不承担任何责任。
    </p>

    <p class="title">
      三、 乙方的权利义务：
    </p>
    <p>
      1. 乙方了解甲方情况后，乙方自愿为甲方提供护理服务，并自觉遵守合同各项内容。
    </p>
    <p>
      2. 乙方在客户家要自尊、自爱、自信，不得有失礼、偷盗行为。
    </p>
    <p>
      3. 如服务期间发现宝宝有任何异常，应马上告知甲方，并建议送医院就诊；如甲方不采纳乙方合理建议，后果由甲方自行负责。
    </p>
    <p>
      4. 乙方在合同服务期间不得随意离开客户家，有事请假，按时返回；休息日由双方协商一致；工作中要积极主动、自觉，多听客户意见，家电、煤气等设备按规程操作，做到省水、省电；若有违反操作规程发生意外事故自负其责。
    </p>
    <p>
      5. 乙方入户后不得将客户家的地址、电话、家庭情况等个人隐私告知他人（包括家人），有事由公司代为转告。不得擅自带家人或朋友去客户家。
    </p>
    <p>
      6. 乙方在母婴护理工作中（除甲方特别排斥使用外）需要认真使用菩提果护理师工具进行日常护理记录。
    </p>
    <p>
      7. 乙方的《母婴护理师工作范围》与《母婴护理师工作服务内容》（见下），服务结束时母婴护理师应提示甲方在菩提果育儿版软件中，对于母婴护理师的服务进行评价，提交反馈意见，甲方的反馈将直接影响乙方在丙方的考核评定情况。
    </p>
    <p>
      【乙方工作范围】：
    </p>
    <p>
      1)产妇护理：
      <i>{{ cfhl }}</i>
    </p>
    <p>
      2)新生儿护理：
      <i>{{ xsrhl }}</i>
    </p>
    <p>
      3)婴儿护理（2-3个月）：
      <i>{{ yrhl }}</i>
    </p>
    <p>
      4)其他服务：
    <i>{{ qtfw }}</i></p>

    <p class="title">
      四、丙方的权利义务：
    </p>
    <p>
      1. 丙方有权查验母婴护理师的合法身份证件并对其规范管理。如丙方查验母婴护理师身份有异常或者不合法，则有权解除本合同，并为甲方重新安排护理师。
    </p>
    <p>
      2. 丙方有权查验客户的身份信息是否合法。如丙方查验客户身份有异常或者不合法，则有权解除本合同，拒绝为甲方提供服务。
    </p>
    <p>
      3. 丙方有监督甲方、乙方遵守本合同的权利和义务。
    </p>
    <p>
      4. 丙方有责任对乙方进行服务督导，及时检查并指导工作。
    </p>
    <p>
      5. 丙方有责任对乙方进行管理、培训，并设奖惩制度。
    </p>
    <p>
      6. 合同期内如甲方客户与乙方母婴护理师发生矛盾不能友好协商解决时，丙方可出面调解并负责调换母婴护理师。
    </p>
    <p>
      7. 丙方为每位上户服务的母婴护理师购买家政服务险（中国家政协会与保险公司合作专门为月嫂及家政人员做的保险项目）。在上户过程中，因任何原因产生的所有安全事故，保险部分由保险公司理赔。其余的或者未购买保险的部分，由甲乙丙三方协商解决。
    </p>
    <p class="title">
      五、其他条款：
    </p>
    <p>
      1. 合同自三方完成签字盖章或者系统确认之后，完成支付定金/保证金即为生效。当乙方为甲方提供的服务结束后，丙方完成对乙方的工资结算，则该协议完成并自动失效。
    </p>
    <p>
      2. 本合同在履行过程中如发生争议，三方应先协商解决；如协商不成，可就争议事项向甲、乙、丙三方任何一方所在地的仲裁委员会申请仲裁。
    </p>
    <p>
      3. 本合同未尽事宜，可另行书面约定补充协议，补充协议与本合同具有同等法律效力。
    </p>
    <p>
      4. 本合同一式三份，甲乙丙三方各执一份，具有同等法律效力。菩提果目前采用线上电子合同，与纸质合同具有同等法律效力。如需获取纸质合同，可在签约后，向客服老师申请。
    </p>
    <p>
      5. 如因不可抗力原因（自然灾害、政府行为、社会异常事件及不能预见的突发事件等）导致合同无法履行或中途无法继续履行，则合同自动终止。如未发生服务，则丙方应全额退还甲方支付的定金。如已发生服务，则丙方按照服务天数扣除相应服务费用后，将剩余款项退还给甲方；丙方按约定向乙方支付工资。
    </p>
    <p class="title">
      六、补充条款
    </p>
    <div
      v-for="(item,index) in bctk"
      :key="index">
      <p><i>{{ item }}</i></p>
    </div>
    <p/>
    <p class="footer">
      温馨提示：请务必在预产期或有生产迹象时与菩提果客服联系400-618-8835
    </p>
    <br>

    <div
      v-if="data.is_admin"
      class="sign_table">

      <table>
        <tr>
          <td>
            甲方 (客户签字):<br> 签约日期:
            <br>
            <br>
            <br>

          </td>
          <td>
            乙方 (护理师签字):<br> 签约日期:
            <br>
            <br>
            <br>
          </td>
        </tr>

        <tr>
          <td>
            丙方: 菩提果 (盖章)<br> 签约日期:
            <br>
            <br>
            <br>

          </td>
          <td/>
        </tr>
      </table>

    </div>
  </div>
</template>

<style scoped>

.body h2 {
  color: #000;
  text-align: center;
  line-height: 1.5;
  font-size: 16px;
}

.body .line {
  height: 1px;
  background: rgba(255, 51, 0, 1);
  width: 100%;
  margin: 10px auto;
}

.body p {
  margin-bottom: 8px;
  margin-top: 8px;
}

.body p i {
  font-style: normal;
  display: inline;
  padding-left: 20px;
  padding-right: 20px;
  border-bottom: 1px solid #999;
  color: #00a0ff;
}
.body div i{
    font-style: normal;
    display: inline;
    padding-left: 20px;
    padding-right: 20px;
    border-bottom: 1px solid #999;
    color: #00a0ff;
}

.body p.title {
  font-weight: bold;
}

.body {
  font-size: 13px;
  padding: 1px 20px;
  line-height: 1.5;
  background: #fff;
  color: #333;
  font-family: "sans-serif", "Microsoft YaHei", "黑体";
}

.body .order_number {
  position: absolute;
  top: 50px;
  right: 30px;
}

.sign_table {
  padding: 20px;
}

.sign_table table {
  width: 100%;
}

.body .footer {
  color: red;
}
.body .id_card{
      font-style: normal;
    display: inline;
    padding-left: 20px;
    padding-right: 20px;
    border-bottom: 1px solid #999;
    color: #00a0ff;
}
</style>

<script>
var API = {}

function checkStatus (response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

function parseJSON (response) {
  return response.json()
}

API.wrapRet_ = function (api, opts, fn) {
  console.log('posting to ' + api)
  opts.mip_sid = API.sessionId || ''
  fetch(api, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(opts)
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(ret => {
      if (ret.success) fn(true, ret.data)
      else fn(false, ret.error)
    })
    .catch(e => {
      console.error(e.message)
      fn(false, e.message)
    })
}

API.submit_ = function (content, mcode, fn) {
  API.wrapRet_(
    'https://mip.putibaby.com/api/video_interview_master', {
      'info': content,
      'mcode': mcode
    },
    fn)
}

export default {
  props: {

    src: {
      type: String,
      default: null
    },
    dataJsonstr: {
      type: String,
      default: null

    }
  },
  data () {
    console.log(this)
    var pdata = JSON.parse(this.dataJsonstr)
    var data = pdata.data || {}
    var order = pdata.data.order || {}
    var master = pdata.data.master || {}
    var ysSkills = pdata.data.ys_skills || []
    var helper = pdata.data.helper || []
    order.contract_shanghu_at = new Date(order.contract_shanghu_at)
    var cfhl = ysSkills.filter(function (x) {
      return x.title === '产妇护理'
    })[0].list.map(function (x) {
      return x.title
    }).join('，')

    var xsrhl = ysSkills.filter(function (x) {
      return x.title === '新生儿护理'
    })[0].list.map(function (x) {
      return x.title
    }).join('，')

    var yrhl = ysSkills.filter(function (x) {
      return x.title === '婴儿护理'
    })[0].list.map(function (x) {
      return x.title
    }).join('，')

    var qtfw = ysSkills.filter(function (x) {
      return x.title === '其他服务'
    })[0].list.map(function (x) {
      return x.title
    }).join('，')

    var bctk = (order.contract_extra || '无附加条款').split(/\n/)

    return {
      content: '',
      isLogin: false,
      isUnion: false,
      data: data,
      order: order,
      master: master,
      ys_skills: ysSkills,
      helper: helper,
      cfhl: cfhl,
      xsrhl: xsrhl,
      yrhl: yrhl,
      qtfw: qtfw,
      bctk: bctk

    }
  },
  computed: {

  },
  prerenderAllowed () {
    return true
  },
  mounted () {
    var self = this
    this.$element.customElement.addEventAction('logindone', event => {
      // 这里可以输出登录之后的数据

      // 获取用户信息
      console.log(event)
      API.sessionId = event.sessionId

      self.$set(self, 'isLogin', true)
      self.$set(self, 'isUnion', event.userInfo.isUnion)
    })
  },
  firstInviewCallback () {
    this.init()
  },
  methods: {
    init () {
      console.log('should loading')
      console.log(this.dataJson)
    },
    load_data () {
      console.log('should set data')
    },
    getChineseNumber (v) {
      if (v > 10) {
        return 'X'
      }
      return '零壹贰叁肆伍陆柒捌玖'.substr(v, 1) || 'X'
    },

    // 必须是Date类型，并且不能是invalid date(要求年份 >= 1900)
    Helper_fix_date (v) {
      if (!(v instanceof Date && v.getFullYear() >= 1900)) {
        return new Date('2009-01-01 00:00:00')
      }
      return v
    },
    // 把数字 1 转换成 大写的 壹
    Helper_digit_to_chinese (v) {
      v = Math.floor(+v) % 10
      if (isNaN(v) || v < 0) return '*'
      return this.getChineseNumber(v)
    },

    // 把数 11 转换为 大写的 壹拾壹
    Helper_number_to_chinese (v) {
      v = Math.floor(+v)
      if (isNaN(v) || v < 0) return '*'

      var ret = ''
      if (v >= 10000) {
        ret += this.Helper_number_to_chinese(Math.floor(v / 10000)) + '万'
        v %= 10000
      }
      if (v >= 1000) {
        ret += this.Helper_digit_to_chinese(Math.floor(v / 1000)) + '仟'
        v %= 1000
      }
      if (v >= 100) {
        ret += this.Helper_digit_to_chinese(Math.floor(v / 100)) + '佰'
        v %= 100
      }
      if (v >= 10) {
        ret += this.Helper_digit_to_chinese(Math.floor(v / 10)) + '拾'
        v %= 10
      }
      if (v > 0) {
        ret += this.Helper_digit_to_chinese(v)
      }
      if (!ret) {
        ret = '零'
      }
      return ret
    }

  }
}
</script>
