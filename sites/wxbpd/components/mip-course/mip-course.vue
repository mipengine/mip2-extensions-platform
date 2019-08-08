<template>
  <div class="mianContent" id="scroll">
    <p class="title">课程</p>
    <ul v-show="!isEmpty">
      <li v-for="(item,index) in courseList" :key="index" @click="goCourseDetail(item.courseId)">
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
    <div class="emptyContent" v-show="isEmpty">
      <p>
        <mip-img src="/images/empty.png" class="emptyImg" layout="fill"></mip-img>
      </p>
      <p>亲~目前还没有课程,去别的地方看看吧</p>
    </div>
  </div>
</template>

<style scoped>
.mianContent .title {
  font-size: 1.8rem;
  color: #333;
  font-family: PingFang-SC-Medium;
  border-bottom: 1px solid #eeeeee;
  padding: 1rem 0;
  text-align: center;
}

.mianContent ul {
  padding: 0 1rem 2rem 1rem;
}

.mianContent ul li {
  display: flex;
  margin-top: 2rem;
}

.mianContent ul li .pic {
  width: 125px;
  height: 90px;
  background: #ddd;
  border-radius: 5px;
  flex-shrink: 0;
  position: relative;
}

.mianContent ul li .pic .courseImg {
  width: 100%;
  height: 100%;
  border-radius: 5px;
}

.mianContent ul li .info {
  text-align: left;
  flex-grow: 1;
  padding-left: 15px;
}

.mianContent ul li .info p:nth-child(1) {
  font-size: 17px;
  color: #333;
  font-family: PingFang-SC-Bold;
  font-weight: bold;
}

.mianContent ul li .info p:nth-child(2) {
  padding: 2px 0;
}

.mianContent ul li .info p:nth-child(2) span {
  color: #999;
  font-size: 12px;
  font-family: PingFang-SC-Medium;
}

.mianContent ul li .info p:nth-child(2) span:nth-child(1) {
  margin-right: 8px;
}

.mianContent ul li .info p:nth-child(3) {
  color: #999;
  font-size: 10px;
  font-family: PingFang-SC-Medium;
  background: #fffcf2;
  border-radius: 5px;
  line-height: 20px;
  display: inline-block;
  padding: 0 5px;
}

.mianContent ul li .info p:nth-child(4) {
  margin-top: 5px;
  font-size: 15px;
  font-family: PingFang-SC-Medium;
  font-weight: bold;
  color: #b4a065;
}

.mianContent ul li .btn {
  position: relative;
  width: 50px;
  text-align: center;
  flex-shrink: 0;
}
.mianContent ul li .btn span {
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
.emptyContent{
  text-align: center;
  padding-top:15px;
}
.emptyContent p:nth-child(1){
  display: inline-block;
  width:76px;
  height:114px;
  position: relative;
}
.emptyContent .emptyImg{
  width:76px;
  height:114px;
}
.emptyContent p:nth-child(2){
  color:#BBBBBB;
  font-size:1.1rem;
  padding:.5rem 0;
}
</style>

<script>
export default {
  data() {
    return {
      isEmpty:false,
      isEnd:true,
      firstCategoryId:0,
      categoryId:0,
      pageNo:1,
      pageSize:5,
      courseList:[]
    };
  },
  props:['serverurl','pageurl','categoryid'],
  mounted() {
    this.firstCategoryId = this.categoryid;
    window.addEventListener('scroll', this.onScroll);
    this.getCourseList();
  },
  methods: {
    getCourseList(){
      var that = this;
      this.postData(this.serverurl + "/api/pc/courseList", {
        firstCategoryId:this.firstCategoryId,
        categoryId:this.categoryId,
        coursePriceType:0,
        newsType:0,
        pageNo:this.pageNo,
        pageSize:this.pageSize
      })
      .then(function(data) {
        that.pageNo += 1;
        if (data.resultCode == 10000) {
          if(data.result.courseList != null){
            that.courseList = that.courseList.concat(data.result.courseList);
            that.pageCount = data.result.page.pageCount;
            that.isEmpty = false;
          }else{
            that.isEmpty = true;
            that.courseList = [];
            that.pageCount = 0;
          }
        }
        if(data.resultCode == 1015){
          that.isEmpty = true;
          that.courseList = [];
          that.pageCount = 0;
        }
      })
      .catch(error => console.error(error));
    },
    onScroll() {
      //可滚动容器的高度
      let innerHeight = document.querySelector('#scroll').clientHeight;
      //屏幕尺寸高度
      let outerHeight = document.documentElement.clientHeight;
      //可滚动容器超出当前窗口显示范围的高度
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset;
      //scrollTop在页面为滚动时为0，开始滚动后，慢慢增加，滚动到页面底部时，出现innerHeight < (outerHeight + scrollTop)的情况，严格来讲，是接近底部。
      if (innerHeight <= (outerHeight + scrollTop + 5)) {
        //加载更多操作
        if(this.pageNo <= this.pageCount && this.isEnd == true){
          this.isEnd = false;
          var that = this;
          that.getCourseList();
        }
      }
    },
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
    goCourseDetail(courseId){
      window.location.href = this.pageurl + "/course_detail.html?courseId=" + courseId;
    }
  }
};
</script>
