<template>
  <div class="lists news">
    <div class="nl am-padding-sm">
      <a
        v-for="noitem in nosort_item_data"
        :key="noitem.sortProd"
        class="clearfix sort-title">
        <div
          v-for="noitemli in noitem.sortData"
          :key="noitemli.newsId"
          class="news-list am-cf am-padding-vertical clearfix">
          <div class="am-fl n-img">
            <a
              :href="noitemli.thePageUrl"
              data-type="mip"
              class="am-text-center am-text-sm am-link-muted">
              <mip-img
                :src="noitemli.newsImage"
                height="100"
                width="100"
                layout="responsive" />
            </a>
          </div>
          <div class="am-text-left am-fr n-text">
            <div class="topic">
              <h3>
                <a
                  :href="noitemli.thePageUrl
                  "
                  data-type="mip"
                  class="am-text-truncate" >{{ noitemli.newsTopic }}</a>
              </h3>
            </div>
            <div class="line-clamp">
              <a
                :href="noitemli.thePageUrl
                "
                data-type="mip"
                class="am-text-left am-text-sm am-link-muted"
                v-html="noitemli.newsInfos"/>
            </div>
          </div>
        </div>
      </a>
      <a
        v-for="item in sort_item_data"
        :key="item.sortProd"
        class="clearfix sort-title">
        <div class="ili-title">
          <i class="am-header-icon am-icon-chevron-right"/>{{ item.sortName }}
        </div>
        <div
          v-for="itemli in item.sortData"
          :key="itemli.newsId"
          class="news-list am-cf am-padding-vertical clearfix">
          <div class="am-fl n-img">
            <a
              :href="itemli.thePageUrl
              "
              data-type="mip"
              class="am-text-center am-text-sm am-link-muted" >
              <mip-img
                :src="itemli.newsImage"
                height="100"
                width="100"
                layout="responsive" />
            </a>
          </div>
          <div class="am-text-left am-fr n-text">
            <div class="topic">
              <h3>
                <a
                  :href="itemli.thePageUrl
                  "
                  data-type="mip"
                  class="am-text-truncate" >{{ itemli.newsTopic }}</a>
              </h3>
            </div>
            <div class="line-clamp">
              <a
                :href="itemli.thePageUrl
                "
                data-type="mip"
                class="am-text-left am-text-sm am-link-muted"
                v-html="itemli.newsInfos"/>
            </div>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>
<style scoped>
.sort-title {
  display:block;
}
.ili-title {
  line-height: 44px;
  padding-left: 10px;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  color: #727272;
  font-size: 18px;
  height: 44px;
  margin-top: 10px;
  margin-bottom: 5px;
}
.ili-title i {
  padding-right: 6px;
  font-size: 15px;
}
.nl .news-list {
  border-bottom: 1px dashed #ededed;
  padding: 1rem;
}
.am-padding-vertical {
  padding-top: 1.6rem;
  padding-bottom: 1.6rem;
}

.n-img {
  max-width: 100px;
  max-height: 100px;
  width: 100%;
}
.am-fl {
  float: left;
}
.n-text {
  width: calc(100% - 110px);
  float:right;
}
.n-text h3 a {
  font-size: 14px;
  color: #555555;
  font-weight: 400;
  line-height: 28px;
  display: block;
}
.n-text div {
  font-size: 12px;
  color: #888;
  line-height: 25px;
  height: 45px;
}
.clearfix:after{
  content:"\200B";
  display:block;
  height:0;
  clear:both;
}
.clearfix{
  *zoom:1;
}
</style>
<script>
export default {
  props: {
    sortsrc: {
      type: String,
      default () {
        return ''
      }
    },
    src: {
      type: String,
      default () {
        return ''
      }
    }
  },
  data () {
    return {
      sort_list: [],
      item_list: [],
      sort_item_data: [],
      nosort_item_data: []
    }
  },
  mounted () {
    fetch(this.sortsrc).then(response => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error('news sort info went wrong!')
      }
    }).then(sortinfo => {
      let self = this
      this.sort_list = sortinfo.data.items
      // 有分类根据分类输出推荐新闻
      for (let index = 0; index < this.sort_list.length; index++) {
        (function (i) {
          let that = self
          fetch(that.src + '0_' + that.sort_list[i].mnSortId).then(response => {
            if (response.ok) {
              return response.json()
            } else {
              throw new Error('news sort list went wrong!')
            }
          }).then(iteminfo => {
            let sobj = {}
            that.item_list = iteminfo.data.items
            sobj.sortName = that.sort_list[i].sortName
            sobj.sortProd = '0_' + that.sort_list[i].mnSortId
            // 显示推荐的新闻
            sobj.sortData = iteminfo.data.items.filter((istopitem) => {
              return istopitem.newsIsTop === 1
            })
            if (that.item_list.length > 0) {
              that.item_list.forEach(element => {
                if (element.thePageUrl === '' || element.thePageUrl === null) {
                  element.thePageUrl = '/mip/templates/default/news_view.html?id=' + element.newsId + '&menuIndexVar=' + element.menuIndexVar + '&editionId=' + element.editionId + '&sortId=&selType='
                }
              })
            }
            if (sobj.sortData.length > 0) {
              that.sort_item_data.push(sobj)
            }
          })
        })(index)
      }
      // 无分类的输出推荐新闻
      fetch(this.src + '0').then(response => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error('no sort news list went wrong!')
        }
      }).then(noprosort => {
        let nosobj = {}
        this.item_list = noprosort.data.items
        nosobj.sortProd = '0'
        nosobj.sortName = '未选择所属分类'
        // 显示推荐的新闻
        nosobj.sortData = noprosort.data.items.filter((istopnosortitem) => {
          return istopnosortitem.newsIsTop === 1
        })
        if (this.item_list.length > 0) {
          this.item_list.forEach(element => {
            if (element.thePageUrl === '' || element.thePageUrl === null) {
              element.thePageUrl = '/mip/templates/default/news_view.html?id=' + element.newsId + '&menuIndexVar=' + element.menuIndexVar + '&editionId=' + element.editionId + '&sortId=&selType='
            }
          })
        }
        this.nosort_item_data.push(nosobj)
      })
    })
  }
}
</script>
