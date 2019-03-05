<template>
  <div
    :class="config + '_div'"
    @click="recordVisitLinkads"
    v-html="rendAd"/>
</template>

<script>
import Visitor from '../../common/utils/visitorLog'
import pageLog from '../../common/utils/pageLog'
import jsonp from 'jsonp'
const { getData } = MIP

export default {
  props: {
    config: {
      type: String,
      default: 'no'
    }
  },
  data () {
    return {
      rendAd: '',
      position: '',
      custom_id: '',
      weizhi: '',
      pageRef: pageLog.ref,
      pageUrl: pageLog.url,
      gg_clientID: pageLog.clientId,
      clientId: pageLog.clientId,
      pageWord: pageLog.keyword,
      department: getData('ks')
    }
  },
  mounted () {
    this.tongji()
    this.adRender()
  },
  methods: {
    tongji () {
      // 设置放着标识cookie
      Visitor.setClientId()
      let ks = getData('ks')
      let pid = getData('pid')
      // 发送网站统计
      pageLog.sendPv(ks, pid)
    },
    adRender () {
      const {config} = this
      if (config === 'no' || config === '') {
        return false
      }
      jsonp(
        `//display-sp.5ikang.com/index.php?r=index/index&a=${config}&department=${this.department}&keyword=${this.pageWord}&url=${this.pageUrl}&mark=&extension=&charset=gbk`, null, (err, json) => {
          if (err) {
            console.error(err.message)
          } else {
            if (json.result === 1) {
              let content = json.content
              for (let word in content) {
                let result = content[word]
                // 截取广告中的点击事件
                const reMounseStr = /recordVisitLinkads\((\S*)\)/g
                let string = result.match(reMounseStr)
                let clickConfig = []
                if (string) {
                  string.forEach((item, idx) => {
                    let params = item.match(/\((\S*)\)/)
                    let pArr = []
                    if (params) {
                      try {
                        pArr = params[1].split(',')
                        clickConfig.push(pArr)
                      } catch (err) {
                        console.log(err)
                      }
                    }
                  })
                }
                // 截取广告位的主题内容 _mip字符串中
                const reStyle = /<style[^>]*>.*<\/style\s*>/g
                let style = result.match(reStyle) || ''
                const reLbCon = new RegExp(config + "_mip\\s*=\\s*\\'(.*)\\|\\|\\|")
                let lbCon = result.match(reLbCon)
                if (lbCon) {
                  try {
                    let conArr = lbCon[1].split('|||')
                    let childLen = conArr.length
                    let minute = new Date().getMinutes()
                    let num = minute % childLen
                    this.position = clickConfig[num][0] || ''
                    this.custom_id = clickConfig[num][1] || ''
                    this.weizhi = clickConfig[num][2] || ''
                    this.rendAd = style + conArr[num]
                  } catch (err) {
                    console.log(err)
                  }
                }
              };
            }
          }
        })
    },
    recordVisitLinkads () {
      try {
        new Image().src = `https://stat-c.5ikang.com/c.png?clickname=click${this.position}&p=${this.weizhi}&custom_id=${this.custom_id}&ref=${this.pageRef}&fromurl=${this.pageUrl}&clientID=${this.gg_clientID}&time=${new Date().getTime()}time`
      } catch (err) {}
    }
  }
}

</script>
