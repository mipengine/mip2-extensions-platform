<template>
  <div class="wrapper">
    <mip-login
      id="mipLogin"
      on="isLogin:download.watchLogin"/>
    <section class="dowMod">
      <div class="dow-title">
        <h2>{{ courseEduTypeInfo.courseEduName }}</h2>
        <div class="dow-all">
          <a
            v-if="loginFlag"
            on="tap:log.login">全部下载</a>
          <a
            v-else
            on="tap:dowAllPop.toggle">全部下载</a>
        </div>
      </div>
      <div class="dowList">
        <mip-accordion
          v-if="isloadFlag"
          sessions-key="dowList"
          type="manual">
          <section
            v-for="(downType,index) in downTypeList"
            :key="index"
            class="dow-dl">
            <div class="dow-dl-dt">
              {{ downType.previewName }}
            </div>
            <ul class="dow-dl-dd">
              <li
                v-for="(fileInfo, index) in downType.typeList"
                :key="index">
                <strong>{{ fileInfo.fileName }}</strong>
                <p>{{ fileInfo.fileSize }}</p>
                <div
                  v-if="loginFlag"
                  class="dow-btns">
                  <a
                    target="_blank"
                    on="tap:log.login">预览</a>
                    <!-- <a target="_blank" class="dow-icon" on="tap:log.login"></a> -->
                </div>
                <div
                  v-else
                  class="dow-btns">
                  <a
                    :href="fileInfo.filePath"
                    target="_blank">预览</a>
                    <!-- <a target="_blank" class="dow-icon" :href="fileInfo.filePath"></a> -->
                </div>
              </li>
            </ul>
          </section>
        </mip-accordion>
      </div>
    </section>
    <mip-lightbox
      id="dowAllPop"
      layout="nodisplay"
      class="mip-hidden">
      <div
        v-if="sendFlag"
        class="dowMail lightbox">
        <p class="dowMail-text">我们会在24小时内将资料包<br>发至您的邮箱</p>
        <mip-form>
          <div class="dowMail-form">
            <input
              v-model="email"
              type="email"
              placeholder="请输入邮箱">
          </div>
        </mip-form>
        <div class="dowMail-error">{{ errorMsg }}</div>
        <div class="dowMail-btns"><a @click="sendEmail">提交</a></div>
        <span
          on="tap:dowAllPop.toggle"
          class="lightbox-close"
          @click="resetFlag">关闭弹层</span>
      </div>
      <div
        v-else
        class="dowMail lightbox">
        <div
          v-if="sendedFlag"
          class="dowMailResultMod">
          <div class="dowMailResult">提交成功</div>
          <p>24小时内将到达您的邮箱</p>
        </div>
        <div
          v-else
          class="dowMailResultMod">
          <div class="dowMailResult dowMailResultFail">提交失败</div>
          <p>请联系网校技术人员！</p>
        </div>
        <span
          on="tap:dowAllPop.toggle"
          class="lightbox-close"
          @click="resetFlag">关闭弹层</span>
        <div
          class="dowMail-btns"
          on="tap:dowAllPop.toggle"><a
            @click="resetFlag">确定</a></div>
      </div>
    </mip-lightbox>
  </div>
</template>

<script>
import { getUrlParams } from '../../common/utils'
export default {
  data () {
    return {
      courseEduId: '',
      courseEduName: '',
      downTypeList: [],
      courseEduTypeInfo: '',
      infoId: '',
      errorMsg: '',
      loginFlag: true,
      isloadFlag: false,
      email: '',
      sendFlag: true,
      sendedFlag: true
    }
  },
  created () {
    this.init()
  },
  mounted () {
    const that = this
    that.$on('watchLogin', function () {
      that.loginFlag = false
    })
  },
  methods: {
    init () {
      let that = this
      let params = getUrlParams()
      that.courseEduId = params.courseEduId
      let paramstr = encodeURIComponent('courseEduId=' + that.courseEduId)
      let url =
        '//m.chinaacc.com/m_member/baidu/download/getDownTypeList.shtm?' +
        paramstr
      let result = window.fetchJsonp(url, {
        jsonpCallback: 'jsonpCallback'
      })
      result
        .then(function (response) {
          return response.json()
        })
        .then(function (json) {
          let data = JSON.parse(JSON.stringify(json))
          that.downTypeList = data.downTypeList
          that.courseEduTypeInfo = data.courseEduTypeInfo
          that.infoId = that.courseEduTypeInfo.infoId
          that.courseEduName = that.courseEduTypeInfo.courseEduName
          that.isloadFlag = true
        })
        .catch(ex => {
          console.log('获取下载资料信息失败：' + ex)
        })
    },
    sendEmail () {
      let that = this
      if (that.email === '') {
        that.errorMsg = '请输入邮箱'
        return
      }
      let szReg = /^([a-zA-Z0-9]+[_|\-|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
      if (!szReg.test(that.email)) {
        that.errorMsg = '请输入正确的邮箱'
        return
      }
      let paramstr = encodeURIComponent('infoId=' + that.infoId + '&email=' + that.email)
      let url =
        '//m.chinaacc.com/m_member/baidu/download/freeDown.shtm?' +
        paramstr
      let result = window.fetchJsonp(url, {
        jsonpCallback: 'jsonpCallback'
      })
      result
        .then(function (response) {
          return response.json()
        })
        .then(function (json) {
          let data = JSON.parse(JSON.stringify(json))
          that.sendFlag = false
          if (data.code + '' !== '4') {
            that.sendedFlag = false
          }
        })
        .catch(ex => {
          console.log('发送邮件失败：' + ex)
        })
    },
    resetFlag () {
      let that = this
      that.sendFlag = true
      that.sendedFlag = true
      that.errorMsg = ''
    }
  }
}
</script>
