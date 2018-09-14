<template>
  <div>
    <mip-img
      src="http://m.chinaacc.com/static/images/download-banner.png"
      layout="responsive"
      width="750"
      height="270"
      alt="学习资料免费下载"/>
    <section class="dowChoiceMod">
      <div class="dow-title">
        <h2>选择辅导</h2>
      </div>
      <mip-showmore
        v-if="loadFlag"
        id="dowListMore"
        bottomshadow="1"
        maxheight="screen:0.5"
        animatetime=".3">
        <ul class="dow-list">
          <li
            v-for="(download, indexId) in downloadList"
            :key="indexId">
            <a
              :href="'http://m.chinaacc.com/mip/download/downList.shtml?courseEduId='+ download.courseEduId"
              data-type="mip">
              <strong>{{ indexId+1 }}、{{ download.courseEduName }}</strong>
              <div class="dow-tag">
                <t
                  v-for="(type,indexId) in download.typeList"
                  :key="indexId">
                  <span
                    v-if="type.isTypeNew"
                    class="tag-new">{{ type.typeName }}</span>
                  <span v-else>{{ type.typeName }}</span>
                </t>
              </div>
              <p class="dow-time">资料包更新于 {{ download.updateDate }}</p>
            </a>
          </li>
        </ul>
      </mip-showmore>
      <div
        on="click:dowListMore.toggle"
        data-closetext=""
        class="mip-showmore-btn">更多辅导</div>
    </section>
  </div>
</template>

<script>
export default {
  data () {
    return {
      downloadList: [],
      loadFlag: false
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      let that = this
      let url =
        '//m.chinaacc.com/m_member/baidu/download/getCourseEduList.shtm'
      let result = window.fetchJsonp(url, {
        jsonpCallback: 'jsonpCallback'
      })
      result
        .then(function (response) {
          return response.json()
        })
        .then(function (json) {
          let data = JSON.parse(JSON.stringify(json))
          that.downloadList = data.downCourseEduTypeList
          that.loadFlag = true
        })
        .catch(ex => {
          console.log('获取下载资料信息失败：' + ex)
        })
    }
  }
}
</script>
