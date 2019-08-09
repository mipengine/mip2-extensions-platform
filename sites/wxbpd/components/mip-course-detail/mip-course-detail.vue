<template>
  <div
    id="scroll"
    :style="dialogShow == true ? 'overflow:hidden' : ''"
    class="mainContent"
    >
    <div class="headPart">
      <mip-img
        src="http://haya-cloud.oss-cn-shanghai.aliyuncs.com/haya-cloud/1565178872154course_bg.png"
        class="bg_img"
      />
      <div class="courseInfo">
        <div class="intorduce">
          <div class="leftContent">
            <p>
              <mip-img
                :src="courseInfo.courseImgH5"
                class="courseImg"
                layout="fixed-height"
                height="112px"
              />
            </p>
            <mip-img
              src="http://haya-cloud.oss-cn-shanghai.aliyuncs.com/haya-cloud/1565178930241CD2.png"
              class="cdImg"
            />
            <mip-img src="/images/cd_point.png" class="cdPoint" />
          </div>
          <div class="rightContent">
            <p>{{ courseInfo.courseName.length > 8 ? courseInfo.courseName.substring(0,8) + '...' : courseInfo.courseName}}</p>
            <p>{{ courseInfo.courseIntro.length > 12 ? courseInfo.courseIntro.substring(0,12) + '...' : courseInfo.courseIntro}}</p>
            <p>讲师：{{ courseInfo.courseAuthor }}</p>
          </div>
        </div>
        <div class="time">
          <p>{{ courseInfo.learnNums }}人已学习 · {{ courseInfo.courseUpdate }}</p>
          <p>共{{ courseInfo.handouts }}讲</p>
        </div>
      </div>
    </div>
    <div class="bodyPart">
      <p class="typeChoose">
        <span
          :class="type == 1?'active' : ''"
          @click="typeChoose(1)">课程介绍</span>
        <span
          :class="type == 2?'active' : ''"
          @click="typeChoose(2)">课程目录</span>
      </p>
      <div
        v-show="type == 1"
        class="introduce">
        <div class="author">
          <p class="pic">
            <mip-img
              :src="courseInfo.courseImgH5"
              layout="fill"
              class="leftImg" />
          </p>
          <div class="rightContent">
            <p>{{ courseInfo.courseAuthor.length > 8 ? courseInfo.courseAuthor.substring(0,8) + '...' : courseInfo.courseAuthor }}</p>
            <p>{{ courseInfo.courseAuthorIntro.length > 15 ? courseInfo.courseAuthorIntro.substring(0,15) + '...' : courseInfo.courseAuthorIntro }}</p>
          </div>
        </div>
        <div
          class="courseContent"
          v-html="courseInfo.courseContent"
          />
        <div class="bottomBtn">
          <p>
            <mip-img
              src="http://haya-cloud.oss-cn-shanghai.aliyuncs.com/haya-cloud/1565179205620btn_bg3.png"
              class="btnBg"
            />
            <span>免费试听</span>
          </p>
          <p>
            <mip-img
              src="http://haya-cloud.oss-cn-shanghai.aliyuncs.com/haya-cloud/1565178054305btn_bg2.png"
              class="btnBg"
            />
            <span>立即购买</span>
          </p>
        </div>
      </div>
      <div
        v-show="type == 2"
        class="catalogue">
        <ul
          v-show="!isEmpty"
          class="big_section">
          <li
            v-for="(item,index) in sectionList"
            :key="index"
            :style="showSection == index?'border-bottom:0' : ''"
            class="big_item"
          >
            <p
              class="big_title"
              @click="chooseSection(index)">
              <span>{{ item.courseHandoutsName }}</span>
              <span>
                <mip-img
                  src="http://haya-cloud.oss-cn-shanghai.aliyuncs.com/haya-cloud/1565179654483down_arrow_gray.png"
                  class="arrow"
                  v-show="showSection != index"
                />
                <mip-img
                  src="http://haya-cloud.oss-cn-shanghai.aliyuncs.com/haya-cloud/1565179680740top_arrow_gray.png"
                  class="arrow"
                  v-show="showSection == index"
                />
              </span>
            </p>
            <ul
              v-show="showSection == index"
              class="small_section">
              <li
                class="small_item"
                v-for="(item,index) in item.courseHandoutsList"
                :key="index">
                <p
                  :style="item.tryType == 0 ? 'color:#999' : ''"
                  @click="goSecitonDetail(item)">
                  <span>{{ item.courseHandoutsName }}</span>
                  <span>{{ item.courseHandoursContent }}</span>
                </p>
                <p v-show="item.tryType == 1">
                  <span>试听</span>
                </p>
              </li>
            </ul>
          </li>
        </ul>
        <div
          v-show="isEmpty"
          class="emptyContent">
          <p>
            <mip-img
            src="/images/empty.png"
            class="emptyImg"
            layout="fill" />
          </p>
          <p>亲~目前还没有内容,去别的地方看看吧</p>
        </div>
        <div class="bottomBtn">
          <p>打开APP领取专属福利</p>
        </div>
      </div>
    </div>
    <div
      v-show="dialogShow"
      class="adDialog">
      <div class="modalView">
        <div class="headImg">
          <mip-img
            :src="courseInfo.courseImgH5"
            class="pic"
            layout="responsive"
            width="600"
            height="348"
          />
        </div>
        <div class="content">
          <p>2亿人都在用的财富学识APP赶快体验吧！</p>
          <p>
            <mip-img
              src="/images/btn_bg2.png"
              class="btnBg" />
            <span>立即打开</span>
          </p>
        </div>
        <mip-img
          src="/images/close_white.png"
          class="btn"
          @click="closeDialog" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.mainContent {
  height: 100%;
}
.mainContent .headPart {
  position: relative;
}

.mainContent .headPart .bg_img {
  width: 100%;
  display: block;
  min-height: 230px;
}

.mainContent .headPart .courseInfo {
  width: 100%;
  padding: 1.5rem;
  position: absolute;
  top: 0;
  left: 0;
}

.mainContent .headPart .courseInfo .intorduce {
  display: flex;
}

.mainContent .headPart .courseInfo .intorduce .leftContent {
  width: 11rem;
  height: 8rem;
  min-width: 140px;
  position: relative;
}
.mainContent .headPart .courseInfo .intorduce .leftContent p {
  width: 8rem;
  height: 8rem;
  overflow: hidden;
  position: relative;
  border-radius: 5px;
}
.mainContent .headPart .courseInfo .intorduce .leftContent .courseImg {
  display: block;
  position: absolute;
  border-radius: 5px;
  z-index: 10;
  width: 154px;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
}

.mainContent .headPart .courseInfo .intorduce .leftContent .cdImg {
  width: 7rem;
  height: 7rem;
  position: absolute;
  top: 0.6rem;
  z-index: 0;
  left: 2.6rem;
}
.mainContent .headPart .courseInfo .intorduce .leftContent .cdPoint {
  position: absolute;
  width: 2rem;
  height: 2rem;
  top: 37%;
  left: 63%;
  z-index: 60;
}
.mainContent .headPart .courseInfo .intorduce .rightContent {
  position: relative;
  flex-grow: 1;
}

.mainContent .headPart .courseInfo .intorduce .rightContent p {
  color: #fff;
  text-align: left;
}

.mainContent .headPart .courseInfo .intorduce .rightContent p:nth-child(1) {
  font-size: 1.3rem;
  font-family: PingFang-SC-Bold;
  font-weight: bold;
}

.mainContent .headPart .courseInfo .intorduce .rightContent p:nth-child(2) {
  padding: 0.6rem 0;
  font-size: 0.9rem;
  font-family: PingFang-SC-Medium;
}

.mainContent .headPart .courseInfo .intorduce .rightContent p:nth-child(3) {
  position: absolute;
  bottom: 0;
  left: 0;
}

.mainContent .headPart .courseInfo .time {
  padding-top: 1.5rem;
  display: flex;
  justify-content: space-between;
}

.mainContent .headPart .courseInfo .time p {
  color: #fff;
  line-height: 25px;
  font-size: 0.9rem;
}

.mainContent .headPart .courseInfo .time p:nth-child(2) {
  background: #4361cc;
  padding: 0 0.8rem;
  border-radius: 20px;
}

.mainContent .bodyPart {
  background: #fff;
}

.mainContent .bodyPart .typeChoose {
  position: relative;
  top: -1.5rem;
  border-radius: 30px 30px 0px 0px;
  background: #fff;
  border-bottom: 1px solid #eeeeee;
  display: flex;
  justify-content: space-around;
}

.mainContent .bodyPart .typeChoose span {
  color: #999;
  font-size: 1.4rem;
  padding: 1rem 0;
  font-family: PingFang-SC-Bold;
  font-weight: bold;
}

.mainContent .bodyPart .typeChoose .active {
  color: #0259e5;
  position: relative;
}

.mainContent .bodyPart .typeChoose .active:after {
  content: "";
  position: absolute;
  width: 3rem;
  height: 4px;
  top: calc(100% - 2px);
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(
    -13deg,
    rgba(94, 172, 252, 1),
    rgba(0, 90, 255, 1)
  );
  border-radius: 2px;
}

.mainContent .bodyPart .introduce {
  background: #f6f6f7;
}

.mainContent .bodyPart .introduce .author {
  background: #fff;
  padding: 0 1.5rem 1.5rem 1.5rem;
  border-bottom: 1px solid #eeeeee;
  display: flex;
  align-items: center;
}
.mainContent .bodyPart .introduce .author .pic {
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  margin-right: 1rem;
  position: relative;
}
.mainContent .bodyPart .introduce .author .leftImg {
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  margin-right: 1rem;
}

.mainContent .bodyPart .introduce .author .rightContent {
  text-align: left;
}

.mainContent .bodyPart .introduce .author .rightContent p:nth-child(1) {
  color: #333;
  font-size: 1.3rem;
  font-family: PingFang-SC-Bold;
  font-weight: bold;
  text-align: left;
}

.mainContent .bodyPart .introduce .author .rightContent p:nth-child(2) {
  margin-top: 0.5rem;
  color: #666;
  font-size: 0.9rem;
  font-family: PingFang-SC-Medium;
  line-height: 1.8rem;
  text-align: left;
}
.mainContent .bodyPart .introduce .courseContent {
  background: #fff;
  padding: 20px 1.5rem;
}
.mainContent .bodyPart .introduce .bottomBtn {
  background: #fff;
  margin-top: 0.5rem;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.mainContent .bodyPart .introduce .bottomBtn p {
  position: relative;
}

.mainContent .bodyPart .introduce .bottomBtn p .btnBg {
  width: 9.5rem;
  display: block;
}

.mainContent .bodyPart .introduce .bottomBtn p span {
  font-size: 1.2rem;
  position: absolute;
  top: 45%;
  width: 9.5rem;
  left: 0;
  transform: translateY(-50%);
  text-align: center;
}

.mainContent .bodyPart .introduce .bottomBtn p:nth-child(1) {
  color: #2170ff;
}

.mainContent .bodyPart .introduce .bottomBtn p:nth-child(2) {
  color: #fff;
}

.mainContent .bodyPart .catalogue .big_section {
  padding: 1.5rem 0 1.5rem 1.5rem;
}

.mainContent .bodyPart .catalogue .big_section .big_item {
  padding-right: 1.5rem;
  border-bottom: 1px solid #eeeeee;
  margin-bottom: 1rem;
}

.mainContent .bodyPart .catalogue .big_section .big_item .big_title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1rem;
}

.mainContent
  .bodyPart
  .catalogue
  .big_section
  .big_item
  .big_title
  span:nth-child(1) {
  color: #333;
  font-size: 1.3rem;
  font-family: PingFang-SC-Bold;
  font-weight: bold;
}

.mainContent
  .bodyPart
  .catalogue
  .big_section
  .big_item
  .big_title
  span:nth-child(2)
  .arrow {
  width: 16px;
  height: 8px;
}
.mainContent
  .bodyPart
  .catalogue
  .big_section
  .big_item
  .small_section
  .small_item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0 0.5rem 0;
}

.mainContent
  .bodyPart
  .catalogue
  .big_section
  .big_item
  .small_section
  .small_item
  p:nth-child(1) {
  text-align: left;
  display: flex;
  width: 82%;
  position: relative;
  min-height: 28px;
}

.mainContent
  .bodyPart
  .catalogue
  .big_section
  .big_item
  .small_section
  .small_item
  p:nth-child(1)
  span {
  color: #333;
  font-size: 1.1rem;
  line-height: 2rem;
  font-family: PingFang-SC-Medium;
}

.mainContent
  .bodyPart
  .catalogue
  .big_section
  .big_item
  .small_section
  .small_item
  p:nth-child(1)
  span:nth-child(1) {
  position: absolute;
  top: 0;
  left: 0;
}

.mainContent
  .bodyPart
  .catalogue
  .big_section
  .big_item
  .small_section
  .small_item
  p:nth-child(1)
  span:nth-child(1):after {
  content: "";
  position: absolute;
  top: 0.5rem;
  left: calc(100% + 0.55rem);
  height: 1rem;
  width: 1px;
  background: #000;
}

.mainContent
  .bodyPart
  .catalogue
  .big_section
  .big_item
  .small_section
  .small_item
  p:nth-child(1)
  span:nth-child(2) {
  text-indent: 4em;
  text-align: left;
}

.mainContent
  .bodyPart
  .catalogue
  .big_section
  .big_item
  .small_section
  .small_item
  p:nth-child(2) {
  border: 1px solid #b4a065;
  font-size: 1rem;
  line-height: 1rem;
  color: #b4a065;
  font-family: SourceHanSansCN-Medium;
  padding: 0.3rem 0.5rem;
}

.mainContent .bodyPart .catalogue .bottomBtn {
  padding: 1.5rem;
  text-align: center;
}

.mainContent .bodyPart .catalogue .bottomBtn p {
  background: linear-gradient(
    -13deg,
    rgba(134, 194, 255, 1),
    rgba(71, 136, 255, 1)
  );
  box-shadow: 0px 2px 10px 0px rgba(13, 94, 234, 0.36);
  border-radius: 40px;
  color: #fff;
  font-size: 1.3rem;
  line-height: 3.2rem;
  font-family: PingFang-SC-Medium;
}

.mainContent .adDialog {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100;
}

.mainContent .adDialog .modalView {
  position: absolute;
  background: #fff;
  border-radius: 20px;
  width: 70%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.mainContent .adDialog .modalView .headImg {
  padding: 2rem 3rem;
  position: relative;
  text-align: center;
}
.mainContent .adDialog .modalView .headImg p {
  position: relative;
  display: inline-block;
}

.mainContent .adDialog .modalView .headImg .pic {
  display: inline-block;
  border-radius: 5px;
}
.mainContent .adDialog .modalView .content {
  padding-bottom: 15px;
}
.mainContent .adDialog .modalView .content p:nth-child(1) {
  color: #333;
  font-size: 1rem;
  line-height: 2rem;
  padding: 10px 20% 0 20%;
  border-top: 1px solid #eeeeee;
  text-align: center;
}

.mainContent .adDialog .modalView .content p:nth-child(2) {
  margin: 0 auto;
  width: 130px;
  position: relative;
  text-align: center;
}

.mainContent .adDialog .modalView .content p:nth-child(2) .btnBg {
  width: 130px;
}

.mainContent .adDialog .modalView .content p:nth-child(2) span {
  position: absolute;
  color: #fff;
  font-size: 14px;
  width: 130px;
  left: 0;
  top: 45%;
  transform: translateY(-50%);
  font-family: PingFang-SC-Medium;
}
.mainContent .adDialog .modalView .btn {
  position: absolute;
  left: 50%;
  top: 105%;
  transform: translateX(-50%);
  width: 40px;
  height: 40px;
}
.emptyContent {
  text-align: center;
  padding-top: 15px;
}
.emptyContent p:nth-child(1) {
  display: inline-block;
  width: 76px;
  height: 114px;
  position: relative;
}
.emptyContent .emptyImg {
  width: 76px;
  height: 114px;
}
.emptyContent p:nth-child(2) {
  color: #bbbbbb;
  font-size: 1.1rem;
  padding: 0.5rem 0;
}
</style>

<script>
import { setTimeout } from "timers";
export default {
  props: {
    serverurl: {
      type: String,
      default: ''
    },
    pageurl: {
      type: String,
      default: ''
    },
    courseid: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      isEmpty: false,
      isEnd: true,
      courseInfo: '',
      type: 1,
      pageNo: 1,
      pageSize: 10,
      sectionList: [],
      pageCount: 0,
      showSection: 0,
      dialogShow: false
    };
  },
  mounted () {
    const that = this
    setTimeout(function() {
      that.dialogShow = true
    }, 5000)
    window.addEventListener('scroll', this.onScroll)
    this.getAudioInfo()
  },
  methods: {
    onScroll () {
      // 可滚动容器的高度
      let innerHeight = document.querySelector('#scroll').clientHeight
      // 屏幕尺寸高度
      let outerHeight = document.documentElement.clientHeight
      // 可滚动容器超出当前窗口显示范围的高度
      let scrollTop =
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        window.pageYOffset;
      // scrollTop在页面为滚动时为0，开始滚动后，慢慢增加，滚动到页面底部时，出现innerHeight < (outerHeight + scrollTop)的情况，严格来讲，是接近底部。
      if (innerHeight <= outerHeight + scrollTop + 5) {
        // 加载更多操作
        if (this.pageNo <= this.pageCount && this.isEnd == true) {
          this.isEnd = false
          const that = this
          that.getSectionList()
        }
      }
    },
    getAudioInfo () {
      const that = this
      this.postData(this.serverurl + '/api/pc/courseDetail', {
        courseId: this.courseid
      })
        .then(function(data) {
          that.courseInfo = data.result.course
        })
        .catch(error => console.error(error))
    },
    getSectionList () {
      var that = this;
      this.postData(this.serverurl + '/api/pc/courseHandoutsDetail', {
        courseId: this.courseid,
        pageNo: this.pageNo,
        pageSize: this.pageSize
      })
        .then(function(data) {
          that.pageNo += 1
          if (data.resultCode == 10000) {
            if (data.result.courseHandoutsList != null) {
              that.isEmpty = false;
              that.sectionList = that.sectionList.concat(
                data.result.courseHandoutsList
              );
              that.pageCount = data.result.page.pageCount
            } else {
              that.isEmpty = true
              that.sectionList = []
              that.pageCount = 0
            }
          }
          if (data.resultCode == 1015) {
            that.isEmpty = true
            that.sectionList = []
            that.pageCount = 0
          }
        })
        .catch(error => console.error(error))
    },
    postData (url, data) {
      return fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrer: 'no-referrer', // no-referrer, *client
        body: JSON.stringify(data) // body data type must match "Content-Type" header
      }).then(response => response.json()) // parses JSON response into native JavaScript objects
    },
    typeChoose (tag) {
      // 介绍、目录选择
      this.type = tag
      if (tag == 2) {
        this.getSectionList()
      }
    },
    chooseSection (index) {
      this.showSection = index
    },
    closeDialog () {
      this.dialogShow = false
    },
    goSecitonDetail (item) {
      //跳转章节详情
      if (item.tryType === 0) {
        return false
      }
      if (item.courseHandoutsType === 1) {
        window.location.href =
          this.pageurl + '/audio_detail.html?section=' + item.courseHandoutsId
      }
      if (item.courseHandoutsType === 2) {
        window.location.href =
          this.pageurl + '/audio_detail.html?section=' + item.courseHandoutsId
      }
      if (item.courseHandoutsType === 3) {
        window.location.href =
          this.pageurl + '/course_detail.html?courseId=' + item.courseId
      }
      this.$router.go(0)
    }
  }
};
</script>
