<template>
  <div class="lists jobs">
    <a
      v-for="noitem in nosort_item_data"
      :key="noitem.sortProd"
      class="clearfix sort-title">
      <mip-accordion
        sessions-key="no-sort-job-list"
        animatetime="0.24">
        <section
          v-for="noitemli in noitem.sortData"
          :key="noitemli.jobsId">
          <h4>{{ noitemli.jobsTopic }}<i/></h4>
          <div class="i_n_text mip-accordion-content">
            <span class="j-num" > 招聘人数：{{ noitemli.jobsNum }}</span>
            <span class="j-sexneed "> 性别要求 :{{ noitemli.j_ageNeed }}</span>
            <span class="j-jobsobj "> 招聘对象：{{ noitemli.jobsObj }}</span>
            <span class="j-more">
              <a
                :href="noitemli.thePageUrl"
                class="am-btn am-btn-more am-radius">
                查看详细
              </a>
            </span>
          </div>
        </section>
      </mip-accordion>
    </a>
    <a
      v-for="item in sort_item_data"
      :key="item.sortProd"
      class="clearfix sort-title">
      <div class="ili-title"><i class="am-header-icon am-icon-chevron-right"/>{{ item.sortName }}</div>
      <mip-accordion
        sessions-key="job-list"
        animatetime="0.24">
        <section
          v-for="itemli in item.sortData"
          :key="itemli.jobsId">
          <h4>{{ itemli.jobsTopic }}<i/></h4>
          <div class="i_n_text mip-accordion-content">
            <span class="j-num" > 招聘人数：{{ itemli.jobsNum }}</span>
            <span class="j-sexneed "> 性别要求 :{{ itemli.j_ageNeed }}</span>
            <span class="j-jobsobj "> 招聘对象：{{ itemli.jobsObj }}</span>
            <span class="j-more">
              <a
                :href="itemli.thePageUrl"
                class="am-btn am-btn-more am-radius">
                查看详细
              </a>
            </span>
          </div>
        </section>
      </mip-accordion>
    </a>
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
}
.ili-title i {
  padding-right: 6px;
  font-size: 15px;
}
.lists.jobs section {
  list-style: none;
  position: relative;
  border-bottom: 1px dashed #ededed;
}

.lists.jobs section a {
  display: block;
  width: 100%;
  height: 100%;
}

.lists.jobs section>h4 {
  display: block;
  overflow: hidden;
  height: 49px;
  padding-left: 50px;
  background: url(/mip/templates/default/images/icon-32x32-list-jobs.png) no-repeat 10px center;
  background-size: 23px;
  background-position: 15px center;
  white-space: nowrap;
}

.lists.jobs section>h4 {
  display: block;
  overflow: hidden;
  line-height: 50px;
  text-overflow: ellipsis;
  color: #000000;
  font-size: 17px;
  font-weight: 300;
}

.lists.jobs section h4 i {
  display: block;
  position: absolute;
  top: 0px;
  right: 5px;
  width: 50px;
  height: 50px;
  background-image: url(/mip/templates/default/images/icon-11x11-attributeitems.png);
  background-position: center;
  background-repeat: no-repeat;
  -moz-transition: all 0.4s;
  transition: all 0.4s;
  -webkit-transition: all 0.4s;
  background-size: 10px;
  z-index: -1;
}

.lists.jobs section[expanded="open"] i {
  transform: rotate(90deg);
  -moz-transform: rotate(90deg);
  -webkit-transform: rotate(90deg);
}

.lists.jobs section>div {
  display: none;
  background-color: #f1f0f5;
  color: #000;
  width: 100%;
}

.lists.jobs section>div>span {
  display: block;
  float: left;
  padding: 15px;
  width: 100%;
  font-size: 18px;
  line-height: 100%;
  text-align: left;
  font-weight: 300;
  background-repeat: no-repeat;
  background-position: 20px center;
  background-size: 23px;
  padding-left: 54px;
  border-bottom: 1px dashed #e2dbdb;
  margin-left: 0px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.lists.jobs section>div>span.j-num {
  background-image: url(/mip/templates/default/images/pro_icon.png);
}

.lists.jobs section>div>span.j-sexneed {
  background-image: url(/mip/templates/default/images/sex_icon.png);
}

.lists.jobs section>div>span.j-jobsobj {
  background-image: url(/mip/templates/default/images/boj_icon.png);
}

.lists.jobs section>div>span.j-more {
  padding-left: 15px;
}
.lists.jobs section>div>span.j-more .am-btn-more {
  font-size: 16px;
  background: #56676e;
  color: #e1eaec;
  height: 40px;
  border-radius: 3px;
  font-weight: 300;
  line-height: 40px;
  text-align: center;
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
        throw new Error('job sort info went wrong!')
      }
    }).then(sortinfo => {
      let self = this
      this.sort_list = sortinfo.data.items
      // 有分类根据分类输出推荐产品
      for (let index = 0; index < this.sort_list.length; index++) {
        (function (i) {
          let that = self
          fetch(that.src + '0_' + that.sort_list[i].mnSortId).then(response => {
            if (response.ok) {
              return response.json()
            } else {
              throw new Error('job sort list went wrong!')
            }
          }).then(iteminfo => {
            let sobj = {}
            that.item_list = iteminfo.data.items
            sobj.sortName = that.sort_list[i].sortName
            sobj.sortProd = '0_' + that.sort_list[i].mnSortId
            // 显示推荐的产品
            sobj.sortData = iteminfo.data.items.filter((istopitem) => {
              return istopitem.jobsIsTop === 0
            })
            if (that.item_list.length > 0) {
              that.item_list.forEach(element => {
                if (element.thePageUrl === '' || element.thePageUrl === null) {
                  element.thePageUrl = '/mip/templates/default/jobs_view.html?id=' + element.jobsId + '&editionId=' + element.editionId + '&sortId=&selType='
                }
              })
            }
            if (sobj.sortData.length > 0) {
              that.sort_item_data.push(sobj)
            }
          })
        })(index)
      }
      // 无分类的输出推荐产品
      fetch(this.src + '0').then(response => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error('no sort job list went wrong!')
        }
      }).then(noprosort => {
        let nosobj = {}
        this.item_list = noprosort.data.items
        nosobj.sortProd = '0'
        nosobj.sortName = '未选择所属分类'
        // 显示推荐的产品
        nosobj.sortData = noprosort.data.items.filter((istopnosortitem) => {
          return istopnosortitem.jobsIsTop === 0
        })
        if (this.item_list.length > 0) {
          this.item_list.forEach(element => {
            if (element.thePageUrl === '' || element.thePageUrl === null) {
              element.thePageUrl = '/mip/templates/default/jobs_view.html?id=' + element.jobsId + '&editionId=' + element.editionId + '&sortId=&selType='
            }
          })
        }
        this.nosort_item_data.push(nosobj)
      })
    })
  }
}
</script>
