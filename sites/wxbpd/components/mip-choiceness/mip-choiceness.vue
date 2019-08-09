<template>
  <div class="mianContent" id="scroll">
    <p class="title">今日精选</p>
    <ul v-show="!isEmpty">
      <li
        v-for="(item,index) in articlesList"
        :key="index"
        @click="goArticleDetail(item.articlesId)"
      >
        <div class="leftContent">
          <p>{{ item.articlesTitle.length > 20 ? item.articlesTitle.substring(0,20) + '...' : item.articlesTitle }}</p>
          <p>
            <mip-img
              src="http://haya-cloud.oss-cn-shanghai.aliyuncs.com/haya-cloud/1565176807216eye.png"
              class="eye"
            />
            <span>{{item.articlesReadNums}}</span>
          </p>
        </div>
        <div class="rightContent">
          <mip-img
          :src="item.articlesImg"
          layout="fill"
          class="articleImg" />
        </div>
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
  padding: 0 1.5rem;
}

.mianContent ul li {
  border-bottom: 1px solid #eeeeee;
  padding: 1.5rem 0;
  display: flex;
  justify-content: space-between;
}

.mianContent ul li .leftContent {
  width: 63%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.mianContent ul li .leftContent p:nth-child(1) {
  font-size: 16px;
  color: #333;
  font-family: PingFang-SC-Medium;
  line-height: 30px;
  text-align: left;
}

.mianContent ul li .leftContent p:nth-child(2) {
  display: flex;
  align-items: center;
}

.mianContent ul li .leftContent p:nth-child(2) span {
  color: #999;
  font-size: 14px;
  font-family: ArialMT;
  margin-left: 5px;
}
.mianContent ul li .leftContent p:nth-child(2) .eye {
  width: 16px;
  height: 11px;
}
.mianContent ul li .rightContent {
  width: 32%;
  height: 80px;
  background: #ddd;
  border-radius: 5px;
  position: relative;
}

.mianContent ul li .rightContent .articleImg {
  width: 100%;
  height: 100%;
  border-radius: 5px;
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
export default {
  props: {
    serverurl: {
      type: String,
      default: ''
    },
    pageurl: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      isEmpty: false,
      isEnd: true,
      pageNo: 1,
      pageSize: 5,
      articlesList: [],
      pageCount: 0
    };
  },
  mounted () {
    window.addEventListener("scroll", this.onScroll)
    this.getChoicenessList()
  },
  methods: {
    getChoicenessList () {
      var that = this;
      this.postData(this.serverurl + "/api/pc/specialList", {
        pageNo: that.pageNo,
        pageSize: that.pageSize
      })
        .then(function(data) {
          that.pageNo += 1;
          if (data.resultCode == 10000) {
            if (data.result.articlesList != null) {
              that.articlesList = that.articlesList.concat(
                data.result.articlesList
              );
              that.pageCount = data.result.page.pageCount
              that.isEmpty = false
            } else {
              that.isEmpty = true
              that.articlesList = []
              that.pageCount = 0
            }
          }
          if (data.resultCode == 1015) {
            that.isEmpty = true
            that.articlesList = []
            that.pageCount = 0
          }
        })
        .catch(error => console.error(error))
    },
    onScroll () {
      //可滚动容器的高度
      let innerHeight = document.querySelector("#scroll").clientHeight
      //屏幕尺寸高度
      let outerHeight = document.documentElement.clientHeight
      //可滚动容器超出当前窗口显示范围的高度
      let scrollTop =
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        window.pageYOffset
      //scrollTop在页面为滚动时为0，开始滚动后，慢慢增加，滚动到页面底部时，出现innerHeight < (outerHeight + scrollTop)的情况，严格来讲，是接近底部。
      if (innerHeight <= outerHeight + scrollTop + 5) {
        //加载更多操作
        if (this.pageNo <= this.pageCount && this.isEnd == true) {
          this.isEnd = false
          this.getChoicenessList()
        }
      }
    },
    postData (url, data) {
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
      }).then(response => response.json()) // parses JSON response into native JavaScript objects
    },
    goArticleDetail (articleid) {
      window.location.href =
        this.pageurl + "/article.html?articleid=" + articleid
    }
  }
};
</script>
