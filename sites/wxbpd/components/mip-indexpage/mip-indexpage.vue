<template>
  <div class="mainContent">
    <div class="indexCarousel">
      <!-- <mip-carousel
        autoplay
        defer="2000"
        layout="responsive"
        width="750"
        height="360"
        indicatorId="mip-carousel-example"
      >
        <mip-img
          width="750"
          height="360"
          :src="item.adImg"
          :alt="item.adAlt"
          v-for="(item,index) in adList"
          :key="index"
          @click="goAdPage(item.adHref)"
        ></mip-img>
      </mip-carousel>-->
      <mip-carousel autoplay defer="2000" layout="responsive" width="750" height="360" indicatorId="mip-carousel-example">
        <mip-img :src="adList[0].adImg"></mip-img>
        <mip-img
          :src="item.adImg"
          :alt="item.adAlt"
          v-for="(item,index) in adList.slice(1,adList.length)"
          @click="goAdPage(item.adHref)"
          :key="index"
          class="adImg"
        ></mip-img>
      </mip-carousel>
      <div class="mip-carousel-indicator-wrapper">
        <div class="mip-carousel-indicatorDot" id="mip-carousel-example">
          <div class="mip-carousel-activeitem mip-carousel-indecator-item"></div>
          <div class="mip-carousel-indecator-item"></div>
          <div class="mip-carousel-indecator-item"></div>
        </div>
      </div>
      <!-- <ul class="indicator_point">
        <li v-for="(item,index) in [0,adList.length - 1]" :key="index" class="active"></li>
      </ul>-->
    </div>
    <ul class="typeList">
      <li v-for="(item,index) in typeList" :key="index" @click="typeChoose(item.categoryId)">
        <p>
          <img :src="item.categoryImg" />
        </p>
        <p>{{item.categoryName}}</p>
      </li>
    </ul>
    <div class="choiceness pagePadding">
      <div class="title">
        <p>今日精选</p>
        <p @click="seeMoreArticle">
          <span>查看更多</span>
          <mip-img src="http://haya-cloud.oss-cn-shanghai.aliyuncs.com/haya-cloud/1565175464642right_arrow_gray.png" class="arrow"></mip-img>
        </p>
      </div>
      <ul>
        <li v-for="(item,index) in articlesList" :key="index" @click="goArticleDetail(item.articlesId)">
          <span>
            <mip-img src="http://haya-cloud.oss-cn-shanghai.aliyuncs.com/haya-cloud/1565175571079paper.png" class="articleImg"></mip-img>
          </span>
          <span>{{item.articlesTitle}}</span>
        </li>
      </ul>
    </div>
    <div class="course pagePadding" v-for="(item,index) in courseList" :key="index">
      <div class="title">
        <p>{{item.categoryName}}</p>
        <p @click="seeMoreCourse">
          <span>查看更多</span>
          <mip-img src="http://haya-cloud.oss-cn-shanghai.aliyuncs.com/haya-cloud/1565175464642right_arrow_gray.png" class="arrow"></mip-img>
        </p>
      </div>
      <ul>
        <li v-for="(item,index) in item.courseList" :key="index">
          <div class="pic">
            <mip-img :src="item.courseImgH5" class="courseImg" layout="fill"></mip-img>
          </div>
          <div class="info">
            <p>{{item.courseName.length > 5?item.courseName.substring(0,5) + '...' : item.courseName}}</p>
            <p>
              <span>{{item.courseAuthor.length > 3?item.courseAuthor.substring(0,3) + '...' : item.courseAuthor}}</span>
              <span>{{item.courseAuthorIntro.length > 5?item.courseAuthorIntro.substring(0,5) + '...' : item.courseAuthorIntro}}</span>
            </p>
            <p>{{item.handouts}}讲·{{item.learnNums}}人已学习</p>
            <p>￥{{item.showCoursePrice}}</p>
          </div>
          <div class="btn" v-show="item.tagList.length > 0">
            <span>{{item.tagList.length > 0?item.tagList[0].tagName : ''}}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.indexCarousel {
  position: relative;
}
.indicator_point {
  width: 100%;
  margin: 0 auto;
  position: absolute;
  bottom: 10px;
  text-align: center;
}

.indicator_point li {
  height: 4px;
  width: 28px;
  border-radius: 2px;
  display: inline-block;
  background: #fff;
  margin: 0 3px;
}

.indicator_point li.active {
  background: linear-gradient(
    -13deg,
    rgba(94, 172, 252, 1),
    rgba(0, 90, 255, 1)
  );
}
.mip-carousel-indicator-wrapper {
  width: 100%;
  margin: 0 auto;
  position: absolute;
  bottom: 10px;
}

.mip-carousel-indicatorDot .mip-carousel-indecator-item {
  height: 4px;
  width: 28px;
  border-radius: 2px;
}

.mip-carousel-activeitem {
  background: linear-gradient(
    -13deg,
    rgba(94, 172, 252, 1),
    rgba(0, 90, 255, 1)
  );
}
.mainContent {
  background: #fafafa;
}
.typeList {
  display: flex;
  justify-content: space-between;
  padding: 2.5rem 2rem;
  background: #fff;
}
.typeList li p:nth-child(1) {
  height: 6rem;
  display: flex;
  align-items: center;
}
.typeList li p:nth-child(1) img {
  width: 4rem;
}
.typeList li p:nth-child(2) {
  margin-top: 1rem;
  font-size: 1.2rem;
  color: #333;
  font-family: PingFang-SC-Medium;
  font-weight: bold;
  text-align: center;
}
.pagePadding {
  padding: 0 1rem;
  background: #fff;
  margin-top: 0.5rem;
}

.title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0;
}

.title p:nth-child(1) {
  font-size: 1.7rem;
  font-family: PingFang-SC-Medium;
  font-weight: bold;
  color: #333;
  line-height: 30px;
  position: relative;
  padding-left: 1rem;
}

.title p:nth-child(1):after {
  content: "";
  position: absolute;
  width: 0.45rem;
  height: 2rem;
  background: linear-gradient(
    -13deg,
    rgba(94, 172, 252, 1),
    rgba(0, 90, 255, 1)
  );
  border-radius: 2px;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
}

.title p:nth-child(2) {
  display: flex;
  align-items: center;
  line-height: 30px;
}

.title p:nth-child(2) span {
  font-family: PingFang-SC-Medium;
  font-weight: bold;
  color: rgba(153, 153, 153, 1);
  font-size: 1.3rem;
  line-height: 30px;
  margin-right: 0.5rem;
}

.title p:nth-child(2) .arrow {
  width: 0.9rem;
}

.choiceness ul {
  padding: 1rem 0;
}

.choiceness ul li {
  display: flex;
  align-items: center;
  padding-bottom: 1rem;
  overflow: hidden;
}

.choiceness ul li span:nth-child(1) {
  flex-shrink: 0;
  margin-right: 1rem;
}

.choiceness ul li span:nth-child(1) .articleImg {
  width: 1rem;
  display: block;
}

.choiceness ul li span:nth-child(2) {
  font-size: 1rem;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  line-height: 2rem;
}

.course ul {
  padding-bottom: 1.5rem;
}

.course ul li {
  display: flex;
  margin-top: 2rem;
}

.course ul li .pic {
  width: 125px;
  height: 90px;
  background: #ddd;
  border-radius: 5px;
  flex-shrink: 0;
  position: relative;
}

.course ul li .pic .courseImg {
  width: 125px;
  height: 90px;
  border-radius: 5px;
}

.course ul li .info {
  text-align: left;
  flex-grow: 1;
  padding-left: 15px;
}

.course ul li .info p:nth-child(1) {
  font-size: 17px;
  color: #333;
  font-family: PingFang-SC-Bold;
  font-weight: bold;
}

.course ul li .info p:nth-child(2) {
  padding: 2px 0;
}

.course ul li .info p:nth-child(2) span {
  color: #999;
  font-size: 12px;
  font-family: PingFang-SC-Medium;
}

.course ul li .info p:nth-child(2) span:nth-child(1) {
  margin-right: 8px;
}

.course ul li .info p:nth-child(3) {
  color: #999;
  font-size: 10px;
  font-family: PingFang-SC-Medium;
  background: #fffcf2;
  border-radius: 5px;
  line-height: 20px;
  display: inline-block;
  padding: 0 5px;
}

.course ul li .info p:nth-child(4) {
  margin-top: 5px;
  font-size: 15px;
  font-family: PingFang-SC-Medium;
  font-weight: bold;
  color: #b4a065;
}

.course ul li .btn {
  position: relative;
  width: 50px;
  flex-shrink: 0;
}

.course ul li .btn span {
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
  text-align: center;
}

.bottom_banner .bannerImg {
  width: 100%;
  display: block;
}

.adDialog {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100;
}

.adDialog .modalView {
  position: relative;
  width: 70%;
  margin: 100px auto 0 auto;
}

.adDialog .modalView .bg {
  width: 100%;
}

.adDialog .modalView .content {
  position: absolute;
  left: 50%;
  bottom: 10px;
  transform: translateX(-50%);
  width: 100%;
  text-align: center;
}

.adDialog .modalView .content p:nth-child(1) {
  color: #333;
  font-size: 13px;
  line-height: 30px;
  padding: 0 20%;
}

.adDialog .modalView .content p:nth-child(2) {
  display: inline-block;
  margin: 0 auto;
  width: 130px;
  position: relative;
}

.adDialog .modalView .content p:nth-child(2) .btnImg {
  width: 130px;
}

.adDialog .modalView .content p:nth-child(2) span {
  position: absolute;
  color: #fff;
  font-size: 14px;
  width: 130px;
  left: 0;
  top: 45%;
  transform: translateY(-50%);
  font-family: PingFang-SC-Medium;
}

.adDialog .modalView .btn {
  position: absolute;
  left: 50%;
  top: 105%;
  transform: translateX(-50%);
  width: 40px;
  height: 40px;
}
</style>
<script src="https://c.mipcdn.com/static/v1/mip.js"></script>
<script>
export default {
  data() {
    return {
      categoryId:'',
      typeList: [],
      adList: [],
      articlesList: [],
      courseList: []
    };
  },
  props:['serverurl','pageurl'],
  mounted() {
    var that = this;
    this.postData(this.serverurl + "/api/h5/userIndex", {})
      .then(function(data) {
        that.adList = data.result.adList;
        that.articlesList = data.result.articlesList;
        that.typeList = data.result.firstCategoryList;
        that.categoryId = data.result.firstCategoryList[0].categoryId;
        that.typeChoose(that.categoryId);
      })
      .catch(error => console.error(error));
  },
  methods: {
    postData(url, data) {
      // Default options are marked with *
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
    goAdPage(url) {
      window.location.href = url;
    },
    seeMoreArticle() {
      window.location.href = this.pageurl + "/choiceness.html";
    },
    goArticleDetail(articleId){
      window.location.href = this.pageurl + "/article.html?articleId=" + articleId;
    },
    seeMoreCourse() {
      window.location.href = this.pageurl + "/course.html?categoryId=" + this.categoryId;
    },
    typeChoose(id) {
      this.categoryId = id;
      var that = this;
      this.postData(this.serverurl + "/api/h5/getIndexCourse", {
        firstCategoryId: this.categoryId
      })
      .then(function(data) {
        if (data.resultCode == 10000) {
          that.courseList = data.result.courseList;
        }
        if (data.resultCode == 1015) {
          that.courseList = [];
        }
      })
      .catch(error => console.error(error));
    }
  }
};
</script>
