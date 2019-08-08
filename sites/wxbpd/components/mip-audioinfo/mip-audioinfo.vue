<template>
  <div class="mainContent">
    <div
    v-show="sectionInfo.courseHandoutsType == 1"
    class="playPart">
      <div
      class="picView">
        <mip-img :src="courseInfo.courseImgH5" class="courseImg" />
        <mip-img src="/images/CD2.png" class="cdImg" />
        <mip-img src="/images/cd_point2.png" class="cdPoint" />
        <!-- <p class="playView">
          <mip-img src="/images/audio_play.png" id="audioPlayer" class="playImg"></mip-img>
        </p> -->
      </div>
    </div>
    <div
    v-show="sectionInfo.courseHandoutsType == 2"
    class="vedioView">
      <mip-video poster="https://www.mipengine.org/static/img/sample_04.jpg" controls
        layout="responsive" width="750" height="360" 
        :src="sectionInfo.courseHandoutsHref">
      </mip-video>
    </div>
    <p class="courseTitle">{{ sectionInfo.courseHandoutsName }}</p>
    <div
    v-show=" sectionInfo.courseHandoutsType == 1 "
    class="audioView">
      <div class="audio-wrapper">
        <mip-audio
          :src="sectionInfo.courseHandoutsHref"
          class="myAudio">
        </mip-audio>
        <!-- <div class="audio-right">
          <div class="progress-bar-bg" id="progressBarBg">
            <div class="audioTime_start">
              <mip-img src="/images/icon_point.png" class="pointImg"></mip-img>
              <span id="audioCurTime">00:00</span>
            </div>
            <div id="progressDot" class="progressPoint">
              <mip-img src="/images/progress.png" class="pointImg"></mip-img>
            </div>
            <div class="progress-bar" id="progressBar"></div>
            <div class="audioTime">
              <mip-img src="/images/icon_point.png" class="pointImg"></mip-img>
              <span id="totalTime">{{sectionInfo.showDuration}}</span>
            </div>
          </div>
        </div> -->
      </div>
    </div>
    <div class="bottomBtn changBtn">
      <p>打开APP收藏下载</p>
    </div>
    <div
    v-html=" sectionInfo.courseHandoutsContent "
    class="courseContent"></div>
    <div class="catalogue">
      <div class="headPart">
        <div class="leftContent">
          <mip-img :src="courseInfo.courseImgH5" class="courseImg" />
          <mip-img src="/images/CD2.png" class="cdImg" />
        </div>
        <div class="centerContent">
          <p>{{ sectionInfo.courseHandoutsName.length > 7?sectionInfo.courseHandoutsName.substring(0,7) + '...' : sectionInfo.courseHandoutsName }}</p>
          <p>
            <span>{{ courseInfo.courseAuthor.length > 3 ? courseInfo.courseAuthor.substring(0,3) + '...' : courseInfo.courseAuthor }}</span>
            <span>{{ courseInfo.courseAuthorIntro.length > 7 ? courseInfo.courseAuthorIntro.substring(0,7) + '...' : courseInfo.courseAuthorIntro }}</span>
          </p>
        </div>
        <div class="rightContent">
          <span>订阅</span>
        </div>
      </div>
      <ul class="sectionList">
        <li v-for="(item,index) in sectionList" :key="index" @click="goSecitonDetail(item)">
          <p>
            <mip-img
            v-show="item.courseHandoutsType == 1"
            src="/images/icon_audio.png" />
            <mip-img src="/images/icon_vedio.png" v-show="item.courseHandoutsType == 2" />
          </p>
          <p>
            <span>{{item.courseHandoutsCode}}</span>
            <span>{{item.courseHandoutsName}}</span>
            <span v-show="item.showDuration != null">({{item.showDuration}})</span>
          </p>
          <p>
            <mip-img src="/images/upload.png" />
          </p>
        </li>
      </ul>
    </div>
    <div class="adList">
      <mip-carousel autoplay defer="2000" layout="responsive" width="750" height="360" indicatorId="mip-carousel-example">
        <mip-img :src="adList[0].adImg" />
        <mip-img
          :src="item.adImg"
          :alt="item.adAlt"
          v-for="(item,index) in adList.slice(1,adList.length)"
          @click="goAdPage(item.adHref)"
          :key="index"
          class="adImg"
        />
      </mip-carousel>
    </div>
    <div class="course_read">
      <p class="title">大家也在听</p>
      <ul class="course">
        <li v-for="(item,index) in courseList" :key="index"  @click="goCourseDetail(item.courseId)">
          <div class="pic">
            <mip-img :src="item.courseImgH5" class="courseImg" layout="fill" />
          </div>
          <div class="info">
            <p>{{item.courseName.length > 6?item.courseName.substring(0,6) + '...' : item.courseName}}</p>
            <p>{{item.courseAuthor.length > 5?item.courseAuthor.substring(0,5) + '...' : item.courseAuthor}}</p>
            <p>￥{{item.showCoursePrice}}</p>
          </div>
          <div class="btn">
            <span>打开APP</span>
          </div>
        </li>
      </ul>
      <div class="bottomBtn">
        <p>打开APP收听更多</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mainContent {
  background: #f4f4f4;
}
.mainContent .adSwiper {
  margin-top: 0.5rem;
  padding: 1rem;
  background: #fff;
}
.mainContent .bottomBtn {
  background: #fff;
  padding: 1.5rem 4rem;
}

.mainContent .bottomBtn p {
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
  text-align: center;
}

.mainContent .courseContent {
  margin-top: 0.5rem;
  background: #fff;
  padding:1rem;
}

.mainContent .catalogue {
  background: #fff;
  padding-left: 1rem;
  margin-top: 0.5rem;
}
.vedioView{
  padding-bottom:30px;
  background:#fff;
}
.mainContent .catalogue .headPart {
  padding: 1.5rem 1rem 1.5rem 0;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eeeeee;
  justify-content: space-between;
}
.mainContent .catalogue .headPart .leftContent {
  width: 7rem;
  text-align: left;
  position: relative;
}
.mainContent .catalogue .headPart .leftContent .courseImg {
  width: 5rem;
  height: 5rem;
  display: block;
  position: relative;
  z-index: 10;
}
.mainContent .catalogue .headPart .leftContent .cdImg {
  width: 4rem;
  height: 4rem;
  position: absolute;
  top: 0.55rem;
  left: 2.85rem;
}
.mainContent .catalogue .headPart .centerContent {
  text-align: left;
}
.mainContent .catalogue .headPart .centerContent p:nth-child(1) {
  font-size: 1.2rem;
  color: #333;
  font-family: SourceHanSansCN-Medium;
  font-weight: bold;
}
.mainContent .catalogue .headPart .centerContent p:nth-child(2) {
  padding-top: 1rem;
}
.mainContent .catalogue .headPart .centerContent p:nth-child(2) span {
  color: #999;
  font-family: SourceHanSansCN-Regular;
  font-size: 0.8rem;
}
.mainContent
  .catalogue
  .headPart
  .centerContent
  p:nth-child(2)
  span:nth-child(1) {
  margin-right: 0.6rem;
}
.mainContent .catalogue .headPart .rightContent span {
  color: #fff;
  font-size: 16px;
  line-height: 1;
  width: 5rem;
  padding: 0.7rem 0;
  background: linear-gradient(-13deg, rgba(0, 98, 199, 1), rgba(3, 86, 238, 1));
  box-shadow: 0px 5px 8px 0px rgba(2, 88, 232, 0.32);
  border-radius: 6px;
  text-align: center;
}
.mainContent .catalogue .catalogueList {
  padding: 1rem 1rem 1rem 0;
}
.mainContent .catalogue .catalogueList .sectionLi {
  text-align: left;
}
.mainContent .catalogue .catalogueList .sectionLi .sectionName {
  font-size: 1.3rem;
  font-family: SourceHanSansCN-Regular;
  color: #333;
}
.mainContent .catalogue .sectionList{
  padding:.5rem 0;
}
.mainContent .catalogue .sectionList li {
  display: flex;
  justify-content: space-between;
  padding:.5rem 1rem .5rem 0;
  align-items: center;
}
.mainContent
  .catalogue
  .sectionList
  li
  p:nth-child(1){
    margin-right:1rem;
    width:15px;
    height:15px;
  }
.mainContent
  .catalogue
  .sectionList
  li
  p:nth-child(2){
    flex-grow: 1;
  }
.mainContent
  .catalogue
  .sectionList
  li
  p:nth-child(2)
  span {
  font-size: 1.1rem;
  font-family: SourceHanSansCN-Normal;
  color: #333;
}
.mainContent
  .catalogue
  .sectionList
  li
  p:nth-child(2)
  span:nth-child(1) {
  padding-right: .5rem;
  margin-right: .5rem;
  position: relative;
}
.mainContent
  .catalogue
  .sectionList
  li
  p:nth-child(2)
  span:nth-child(1):after {
  content: "";
  position: absolute;
  top: 50%;
  left: 100%;
  width: 1px;
  height: 0.9rem;
  transform: translateY(-50%);
  background: #1d1d1d;
}
.mainContent
  .catalogue
  .sectionList
  li
  span:nth-child(3) {
  color: #999;
  font-size: 0.9rem;
}
.mainContent
  .catalogue
  .sectionList
  li
  p:nth-child(3) {
  display: flex;
  align-items: center;
}
.mainContent
  .catalogue
  .sectionList
  li
  p:nth-child(3)
  img:nth-child(1) {
  width: 1rem;
  margin-right: 1rem;
}
.mainContent
  .catalogue
  .sectionList
  li
  p:nth-child(3)
  img:nth-child(2) {
  width: 1.1rem;
}
.mainContent .courseTitle {
  background: #fff;
  font-family: PingFang-SC-Bold;
  font-weight: bold;
  color: #333;
  font-size: 1.5rem;
  padding-bottom: 2.5rem;
  text-align: center;
}

.mainContent .audioView {
  padding: 0 1rem;
  background: #fff;
}
.myAudio{
  width:100% !important;
}
mip-audio.mip-audio-default-style [controller]{
  background:#fff;
}
.mainContent .audio-wrapper {
  background-color: #f9fbfe;
  padding: 20px 15px;
  border-radius: 10px;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  align-items: center;
  -webkit-align-items: center;
  box-align: center;
  -moz-box-align: center;
  -webkit-box-align: center;
}

.mainContent .audio-wrapper .audio-left {
  width: 66px;
  height: 66px;
  margin-right: 30px;
}

.mainContent .audio-wrapper .audio-left img {
  width: 66px;
  height: 66px;
  display: initial;
  /* 解除与app的样式冲突 */
  cursor: pointer;
}

.mainContent .audio-wrapper .audio-right {
  flex-grow: 1;
  padding: 0 50px;
}

.mainContent .audio-wrapper .audio-right .audioInfo {
  margin-top: 25px;
  text-align: left;
}

.mainContent .audio-wrapper .audio-right .audioInfo .name {
  color: #999;
  font-size: 12px;
  margin-right: 30px;
}

.mainContent .audio-wrapper .audio-right .audioInfo .size {
  display: inline-block;
  color: #999;
  font-size: 12px;
}

.mainContent .audio-wrapper .audio-right .audioInfo .size img {
  width: 11px;
  height: 12px;
  margin-left: 10px;
}

.mainContent .audio-wrapper .audio-right .progress-bar-bg {
  background-color: #dae8ff;
  position: relative;
  height: 1px;
  cursor: pointer;
  margin-top: 8px;
}

.mainContent .audio-wrapper .audio-right .progress-bar-bg .progress-bar {
  background-color: #649fec;
  width: 0;
  height: 1px;
}

.mainContent .audio-wrapper .audio-right .progress-bar-bg .progressPoint {
  position: absolute;
  width: 16px;
  height: 16px;
  top: -8px;
  z-index: 10;
}

.mainContent .audio-wrapper .audio-right .progress-bar-bg .pointImg {
  width: 16px;
  height: 16px;
}

.mainContent .audio-wrapper .audio-right .progress-bar-bg .point {
  position: absolute;
  width: 8px;
  height: 8px;
  top: -4px;
  left: 0;
}

.mainContent .audio-wrapper .audio-right .progress-bar-bg .audioTime_start {
  width: 8px;
  height: 8px;
  position: absolute;
  top: -4px;
  left: 0;
}

.mainContent
  .audio-wrapper
  .audio-right
  .progress-bar-bg
  .audioTime_start
  .pointImg {
  width: 100%;
  height: 100%;
  display: block;
}

.mainContent
  .audio-wrapper
  .audio-right
  .progress-bar-bg
  .audioTime_start
  span {
  position: absolute;
  top: -4px;
  left: -40px;
  font-size: 12px;
  color: #0a63ff;
}

.mainContent .audio-wrapper .audio-right .progress-bar-bg .audioTime {
  width: 8px;
  height: 8px;
  position: absolute;
  top: -4px;
  left: 100%;
}

.mainContent .audio-wrapper .audio-right .progress-bar-bg .audioTime .pointImg {
  width: 100%;
  height: 100%;
  display: block;
}

.mainContent .audio-wrapper .audio-right .progress-bar-bg .audioTime span {
  position: absolute;
  top: -4px;
  left: calc(100% + 10px);
  font-size: 12px;
  color: #999;
}

.course_read {
  margin-top: 0.5rem;
  padding: 0 1rem;
  background: #fff;
}

.course_read .bottomBtn {
  padding: 1rem 0;
}

.course_read .title {
  padding: 1.5rem 0;
  text-align: left;
  font-size: 1.5rem;
  color: #333;
  font-family: PingFang-SC-Medium;
}

.course_read .course {
  padding-bottom: 2rem;
}
.course_read .course li {
  display: flex;
  margin-top:1rem;
}
.course_read .course .pic {
  width: 125px;
  height: 90px;
  background: #ddd;
  border-radius: 5px;
  flex-shrink: 0;
  position: relative;
}

.course_read .course .courseImg {
  width: 100%;
  height: 100%;
  border-radius: 5px;
}

.course_read .course .info {
  text-align: left;
  flex-grow: 1;
  padding-left: 15px;
}

.course_read .course .info p:nth-child(1) {
  font-size: 17px;
  color: #333;
  font-family: PingFang-SC-Bold;
  font-weight: bold;
}

.course_read .course .info p:nth-child(2) {
  padding: 6px 0;
  color: #999;
  font-size: 12px;
  font-family: PingFang-SC-Medium;
}

.course_read .course .info p:nth-child(3) {
  margin-top: 20px;
  font-size: 15px;
  font-family: PingFang-SC-Medium;
  font-weight: bold;
  color: #b4a065;
}

.course_read .course .btn {
  position: relative;
  width: 70px;
  text-align: center;
}

.course_read .course .btn span {
  position: absolute;
  bottom: 0;
  left: 0;
  font-size: 12px;
  color: #b4a065;
  font-family: SourceHanSansCN-Medium;
  font-weight: 500;
  line-height: 24px;
  border: 1px solid #b4a065;
  width: 100%;
  border-radius: 24px;
}

.mainContent .playPart {
  background: #fff;
  padding: 2rem 0;
  display: flex;
  justify-content: center;
}

.mainContent .playPart .picView {
  width: 19rem;
  text-align: left;
  position: relative;
}

.mainContent .playPart .picView .courseImg {
  width: 16rem;
  height: 16rem;
  position: relative;
  z-index: 10;
  display: block;
}

.mainContent .playPart .picView .cdImg {
  width: 14rem;
  height: 14rem;
  position: absolute;
  top: 50%;
  left: 63%;
  transform: translate(-50%, -50%);
  z-index: 0;
}
.mainContent .playPart .picView .cdPoint{
  width:5rem;
  height:5rem;
  position: absolute;
  z-index: 10;
  top: 36%;
  left: 70%;
}
.mainContent .playPart .picView .playView{
  width: 5rem;
  height: 5rem;
  position: absolute;
  top: 50%;
  left: calc(50% - 1.5rem);
  transform: translate(-50%, -50%);
  z-index: 50;
}
.mainContent .playPart .picView .playImg,
.stopImg {
  width:5rem;
}
.adList{
  padding:1rem;
  background:#fff;
  margin-top:.5rem;
}
.changBtn p{
    -webkit-animation: free_download 1s linear alternate infinite;
    animation: free_download 1s linear alternate infinite;
}
@-webkit-keyframes free_download{
    0%{-webkit-transform:scale(0.9);}
    100%{-webkit-transform:scale(1);}
}
@keyframes free_download{
    0%{transform:scale(0.9);}
    100%{transform:scale(1);}
}
</style>

<script>
export default {
  props: {
    serverurl:String,
    pageurl:String,
    articleid:String
  },
  data () {
    return {
      courseInfo:'', //课程信息
      sectionInfo:'', //章节信息
      sectionList:'', //章节列表
      courseList:'', //看过的人还看了列表
      adList:'', //广告列表
    };
  },
  mounted() {
    this.getAudioInfo()
  },
  methods: {
    getAudioInfo () {
      const that = this;
      this.postData(this.serverurl + "/api/h5/audioDetail", {
        courseHandoutsId: this.section
      })
      .then(function(data) {
        that.courseInfo = data.result.course
        that.sectionInfo = data.result.courseHandouts
        that.sectionList = data.result.courseHandoutsList
        that.courseList = data.result.courseList
        that.adList = data.result.hotList
      })
      .catch(error => console.error(error))
    },
    postData (url, data) {
      return fetch(url, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json"
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer", // no-referrer, *client
        body: JSON.stringify(data) // body data type must match "Content-Type" header
      }).then(response => response.json()); // parses JSON response into native JavaScript objects
    },
    goCourseDetail (courseId){
      window.location.href = this.pageurl + "/course_detail.html?courseId=" + courseId
    },
    goSecitonDetail (item){ //跳转章节详情
      if(item.tryType == 0){
        return false
      }
      if(item.courseHandoutsType == 1){
        window.location.href = this.pageurl + "/audio_detail.html?section=" + item.courseHandoutsId
      }
      if(item.courseHandoutsType == 2){
        window.location.href = this.pageurl + "/audio_detail.html?section=" + item.courseHandoutsId
      }
      if(item.courseHandoutsType == 3){
        window.location.href = this.pageurl + "/course_detail.html?courseId=" + item.courseId
      }
      this.$router.go(0);
    }
  }
};
</script>
