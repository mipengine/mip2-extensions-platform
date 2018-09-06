<template>
    <div class="wrapper">
        <mip-login id="mipLogin" on="isLogin:download.watchLogin"></mip-login>
        <section class="dowMod">
            <div class="dow-title">
                <h2>{{courseEduTypeInfo.courseEduName}}</h2>
                <div class="dow-all">
                    <a v-if="loginFlag" on="tap:log.login">全部下载</a>
                    <a v-else on="tap:dowAllPop.toggle">全部下载</a>
                </div>
            </div>
            <div class="dowList">
                <mip-accordion sessions-key="dowList" type="manual" v-if="isloadFlag">
                    <section class="dow-dl" v-for="(downType,index) in downTypeList" :key="index">
                        <div class="dow-dl-dt">
                            {{downType.previewName}}
                        </div>
                        <ul class="dow-dl-dd">
                            <li v-for="(fileInfo, index) in downType.typeList" :key="index">
                                <strong>{{fileInfo.fileName}}</strong>
                                <p>{{fileInfo.fileSize}}</p>
                                <div class="dow-btns" v-if="loginFlag">
                                    <a target="_blank" on="tap:log.login">预览</a>
                                    <!-- <a target="_blank" class="dow-icon" on="tap:log.login"></a> -->
                                </div>
                                <div class="dow-btns" v-else>
                                    <a :href="fileInfo.filePath" target="_blank">预览</a>
                                    <!-- <a target="_blank" class="dow-icon" :href="fileInfo.filePath"></a> -->
                                </div>
                            </li>
                        </ul>
                    </section>
                </mip-accordion>
            </div>
        </section>
        <mip-lightbox id="dowAllPop" layout="nodisplay" class="mip-hidden">
            <div class="dowMail lightbox" v-if="sendFlag">
                <p class="dowMail-text">我们会在24小时内将资料包<br>发至您的邮箱</p>
                <mip-form>
                    <div class="dowMail-form">
                        <input type="email" placeholder="请输入邮箱" v-model="email">
                    </div>
                </mip-form>
                <div class="dowMail-error">{{errorMsg}}</div>
                <div class="dowMail-btns"><a @click="sendEmail">提交</a></div>
                <span on="tap:dowAllPop.toggle" class="lightbox-close" @click="resetFlag">关闭弹层</span>
            </div>
            <div class="dowMail lightbox" v-else>
                <div class="dowMailResultMod" v-if="sendedFlag">
                    <div class="dowMailResult">提交成功</div>
                    <p>24小时内将到达您的邮箱</p>
                </div>
                <div class="dowMailResultMod" v-else>
                    <div class="dowMailResult dowMailResultFail">提交失败</div>
                    <p>请联系网校技术人员！</p>
                </div>
                <span on="tap:dowAllPop.toggle" class="lightbox-close" @click="resetFlag">关闭弹层</span>
                <div class="dowMail-btns" on="tap:dowAllPop.toggle"><a href="#" @click="resetFlag">确定</a></div>
            </div>
        </mip-lightbox>
    </div>
</template>

<script>
import { getUrlParams } from "../../common/utils";
import { verifyBDLogin } from "../../common/api";
export default {
  data() {
    return {
      courseEduId: "",
      courseEduName: "",
      downTypeList: [],
      courseEduTypeInfo: "",
      infoId: "",
      errorMsg: "",
      loginFlag: true,
      isloadFlag: false,
      email: "",
      sendFlag: true,
      sendedFlag: true
    };
  },
  created() {
    this.init();
  },
  mounted() {
    const that = this
    that.$on('watchLogin', function(){
      that.loginFlag = false;
    })
  },
  methods: {
    init() {
      let that = this;
      let params = getUrlParams();
      that.courseEduId = params.courseEduId;
      let url =
        "//m.chinaacc.com/m_member/baidu/download/getDownTypeList.shtm?courseEduId=" +
        that.courseEduId;
      let result = fetchJsonp(url, {
        jsonpCallback: "jsonpCallback"
      });
      result
        .then(function(response) {
          return response.json();
        })
        .then(function(json) {
          let data = JSON.parse(JSON.stringify(json));
          that.downTypeList = data.downTypeList;
          that.courseEduTypeInfo = data.courseEduTypeInfo;
          that.infoId = that.courseEduTypeInfo.infoId;
          that.courseEduName = that.courseEduTypeInfo.courseEduName;
          that.isloadFlag = true;
        })
        ["catch"](function(ex) {
          document.body.innerHTML = "获取下载资料信息失败：" + ex;
        });
    },
    sendEmail() {
      let that = this;
      if (that.email == "") {
        that.errorMsg = "请输入邮箱";
        return;
      }
      let url =
        "//m.chinaacc.com/m_member/baidu/download/freeDown.shtm?infoId=" +
        that.infoId +
        "&email=" +
        that.email;
      let result = fetchJsonp(url, {
        jsonpCallback: "jsonpCallback"
      });
      result
        .then(function(response) {
          return response.json();
        })
        .then(function(json) {
          let data = JSON.parse(JSON.stringify(json));
          that.sendFlag = false;
          if (data.code != 4) {
            that.sendedFlag = false;
          }
        })
        ["catch"](function(ex) {
          document.body.innerHTML = "发送邮件失败：" + ex;
        });
    },
    resetFlag() {
      let that = this;
      that.sendFlag = true;
      that.sendedFlag = true;
      that.errorMsg = "";
    }
  }
};
</script>
