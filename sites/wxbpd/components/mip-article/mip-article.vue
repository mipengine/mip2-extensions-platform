<template>
  <div class="mianContent">
    <div class="article">
      <p class="title">{{ articleInfo.articlesTitle }}</p>
      <div class="articleTab">
        <div class="time">
          <p class="duration">
            <mip-img
              src="http://haya-cloud.oss-cn-shanghai.aliyuncs.com/haya-cloud/1565177135876icon_author.png"
              width="15"
              height="15"
              class="icon"
            />
            <span>作者：{{ articleInfo.articlesAuthor }}</span>
          </p>
          <p>
            <mip-img
              src="http://haya-cloud.oss-cn-shanghai.aliyuncs.com/haya-cloud/1565176807216eye.png"
              width="16"
              height="11"
              class="icon"
            />
            <span>浏览量：{{ articleInfo.articlesReadNums }}</span>
          </p>
        </div>
        <p>
          <mip-img
            src="http://haya-cloud.oss-cn-shanghai.aliyuncs.com/haya-cloud/1565177228558icon_time.png"
            width="15"
            height="15"
            class="icon"
          />
          <span>发布时间：{{ articleInfo.updateTime }}</span>
        </p>
      </div>
      <div class="articleContent">
        <div v-html="showContent" />
        <div
        v-show="moreBtn"
        class="loading">
          <p
          class="loadBtn"
          @click="loadMore">
            <mip-img
              src="http://haya-cloud.oss-cn-shanghai.aliyuncs.com/haya-cloud/1565177488723double_arrow.png"
              class="arrow"
            />
          </p>
        </div>
      </div>
      <p class="openBtn">
        <mip-img
          src="http://haya-cloud.oss-cn-shanghai.aliyuncs.com/haya-cloud/1565177520497long_btn_bg.png"
          class="btnBg"
        />
        <span>打开APP阅读更多好文</span>
      </p>
      <div class="tabList">
        <p class="name">相关标签</p>
        <ul>
          <li
            v-for="(item,index) in articleInfo.tagList"
            v-show="index < 4"
            :key="index"
          >{{ item.tagName }}</li>
        </ul>
      </div>
    </div>
    <div class="openApp">
      <mip-img
        src="http://haya-cloud.oss-cn-shanghai.aliyuncs.com/haya-cloud/1565178011467logo2.png"
        class="logo"
      />
      <p class="btn">
        <mip-img
          src="http://haya-cloud.oss-cn-shanghai.aliyuncs.com/haya-cloud/1565178054305btn_bg2.png"
          class="btnBg"
        />
        <span>打开APP</span>
      </p>
    </div>
    <div class="course_read">
      <p class="title">相关课程</p>
      <ul class="course">
        <li 
        v-for="(item,index) in courseList"
        :key="index"
        @click="goCourseDetail(item.courseId)">
          <div class="pic">
            <mip-img
            :src="item.courseImgH5"
            class="courseImg"
            layout="fill" />
          </div>
          <div class="info">
            <p>{{ item.courseName.length > 5 ? item.courseName.substring(0,5) + '...' : item.courseName }}</p>
            <p>{{ item.courseAuthor.length > 5 ? item.courseAuthor.substring(0,5) + '...' : item.courseAuthor }}</p>
            <p>￥{{ item.showCoursePrice }}</p>
          </div>
          <div
          v-show="item.tagList.length > 0"
          class="btn">
            <span>{{ item.tagList.length > 0 ? item.tagList[0].tagName : '' }}</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="course_read">
      <p class="title">相关阅读</p>
      <ul class="read">
        <li
          v-for="(item,index) in hotArticleList"
          :key="index"
          @click="goArticleDetail(item.articlesId)"
        >
          <span>
            <mip-img
              src="http://haya-cloud.oss-cn-shanghai.aliyuncs.com/haya-cloud/1565175571079paper.png"
              class="paper"
            />
          </span>
          <span>{{ item.articlesTitle }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.mianContent {
  background: #eeeeee;
}

.mianContent .article {
  background: #fff;
}

.mianContent .article .title {
  font-size: 1.8rem;
  color: #333;
  font-family: PingFang-SC-Medium;
  border-bottom: 1px solid #eeeeee;
  padding: 1rem;
  text-align: center;
}

.mianContent .article .articleTab {
  padding: 1rem;
  display: flex;
  justify-content: space-between;
}

.mianContent .article .articleTab .time {
  display: flex;
  justify-content: space-between;
}
.mianContent .article .articleTab .time .duration {
  margin-right: 8px;
}
.mianContent .article .articleTab p {
  display: flex;
  align-items: center;
  color: #999;
  font-size: 0.8rem;
}
.mianContent .article .articleTab p .icon {
  margin-right: 5px;
}

.mianContent .article .articleContent {
  position: relative;
  padding: 0 1rem;
}

.mianContent .article .articleContent .loading {
  width: 100%;
  padding: 0 1rem;
  position: absolute;
  height: 100px;
  bottom: 0;
  left: 0;
  text-align: center;
  background: linear-gradient(
    0,
    rgba(255, 255, 255, 1),
    rgba(255, 255, 255, 0)
  );
}
.mianContent .article .articleContent .loading .loadBtn {
  text-align: center;
  display: inline-block;
}
.mianContent .article .articleContent .loading .loadBtn .arrow {
  width: 2rem;
}

.mianContent .article .openBtn {
  position: relative;
  margin-top: 1rem;
  text-align: center;
}

.mianContent .article .openBtn .btnBg {
  width: 17rem;
  display: inline-block;
}

.mianContent .article .openBtn span {
  position: absolute;
  color: #fff;
  font-size: 16px;
  width: 17rem;
  left: 50%;
  top: 42%;
  transform: translate(-50%, -50%);
}

.mianContent .article .tabList {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  padding: 1rem 1rem 0.5rem 1rem;
}

.mianContent .article .tabList .name {
  font-size: 1.2rem;
  color: #666;
  font-family: PingFang-SC-Medium;
  margin-right: 1rem;
  margin-bottom: 0.5rem;
}

.mianContent .article .tabList ul {
  display: flex;
}

.mianContent .article .tabList ul li {
  margin-bottom: 0.5rem;
  border: 1px solid #bfbfbf;
  font-size: 1.1rem;
  color: #666;
  font-family: PingFang-SC-Medium;
  margin-right: 0.6rem;
  padding: 0.3rem 0.7rem;
  border-radius: 20px;
}

.mianContent .openApp {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  margin-top: 0.5rem;
  padding: 1rem;
  text-align: center;
}

.mianContent .openApp .logo {
  width: 40%;
}

.mianContent .openApp .btn {
  width: 32%;
  position: relative;
}

.mianContent .openApp .btn .btnBg {
  width: 100%;
  display: block;
}

.mianContent .openApp .btn span {
  position: absolute;
  top: 48.5%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  font-size: 1rem;
  line-height: 1;
  width: 100%;
}

.mianContent .course_read {
  margin-top: 0.5rem;
  padding: 0 1rem;
  background: #fff;
}

.mianContent .course_read .title {
  padding: 1.5rem 0;
  text-align: left;
  font-size: 1.5rem;
  color: #333;
  font-family: PingFang-SC-Medium;
}

.mianContent .course_read .course li {
  display: flex;
  padding-bottom: 2rem;
}

.mianContent .course_read .course li .pic {
  width: 125px;
  height: 90px;
  background: #ddd;
  border-radius: 5px;
  flex-shrink: 0;
  position: relative;
}

.mianContent .course_read .course li .pic .courseImg {
  width: 100%;
  height: 100%;
  border-radius: 5px;
}

.mianContent .course_read .course li .info {
  text-align: left;
  flex-grow: 1;
  padding-left: 15px;
}

.mianContent .course_read .course li .info p:nth-child(1) {
  font-size: 17px;
  color: #333;
  font-family: PingFang-SC-Bold;
  font-weight: bold;
}

.mianContent .course_read .course li .info p:nth-child(2) {
  padding: 6px 0;
  color: #999;
  font-size: 12px;
  font-family: PingFang-SC-Medium;
}

.mianContent .course_read .course li .info p:nth-child(3) {
  margin-top: 20px;
  font-size: 15px;
  font-family: PingFang-SC-Medium;
  font-weight: bold;
  color: #b4a065;
}

.mianContent .course_read .course li .btn {
  position: relative;
  width: 50px;
  text-align: center;
  flex-shrink: 0;
}

.mianContent .course_read .course li .btn span {
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
}

.mianContent .course_read .read li {
  display: flex;
  align-items: center;
  padding-bottom: 1rem;
  overflow: hidden;
}

.mianContent .course_read .read li span:nth-child(1) {
  flex-shrink: 0;
  margin-right: 1rem;
}

.mianContent .course_read .read li span:nth-child(1) .paper {
  width: 1rem;
  display: block;
}

.mianContent .course_read .read li span:nth-child(2) {
  font-size: 1rem;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  line-height: 2rem;
}
</style>

<script>
export default {
  props: ['serverurl', 'pageurl', 'articleid'],
  data () {
    return {
      courseList: [],
      articleInfo: '',
      hotArticleList: [],
      moreBtn: false,
      showContent: ''
    }
  },
  mounted () {
    this.getArticleInfo()
  },
  methods: {
    getArticleInfo () {
      const that = this
      this.postData(this.serverurl + '/api/pc/newsDetail', {
        articlesId: this.articleid
      })
        .then(function (data) {
          that.courseList = data.result.specialCourse
          that.articleInfo = data.result.articlesInfo
          that.articleInfo.updateTime = that.getDate(
            that.articleInfo.updateTime
          )
          that.hotArticleList = data.result.interestArticles
          that.hideCourseContent()
        })
        .catch(error => console.error(error))
    },
    getDate (Date) {
      let date = new Date(Date)
      return (
        date.getFullYear() +
        '-' +
        (date.getMonth() + 1 < 10
          ? '0' + (date.getMonth() + 1)
          : date.getMonth() + 1) +
        '-' +
        (date.getDate() < 10 ? '0' + date.getDate() : date.getDate())
      )
    },
    postData (url, data) {
      // Default options are marked with *
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
        body: JSON.stringify(data) // body data type must match 'Content-Type' header
      }).then(response => response.json()) // parses JSON response into native JavaScript objects
    },
    hideCourseContent () {
      // 隐藏课程介绍内容
      const length = this.articleInfo.articlesContent.length
      if (length > 300) {
        let showLength = length / 3
        this.moreBtn = true
        this.showContent = this.articleInfo.articlesContent.slice(
          0,
          showLength
        )
      } else {
        this.showContent = this.articleInfo.articlesContent
      }
    },
    loadMore () {
      // 加载更多
      this.moreBtn = false
      this.showContent = this.articleInfo.articlesContent
    },
    goCourseDetail (courseId) {
      window.location.href =
        this.pageurl + '/course_detail.html?courseId=' + courseId
    },
    goArticleDetail (articleId) {
      window.location.href =
        this.pageurl + '/article.html?articleId=' + articleId
    }
  }
};
</script>
