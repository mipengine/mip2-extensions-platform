<template>
  <div class="lists downs">
    <div class="dl">
      <a
        v-for="noitem in nosort_item_data"
        :key="noitem.sortProd"
        class="clearfix sort-title">

        <div
          v-for="noitemli in noitem.sortData"
          :key="noitemli.downId"
          class="down-con">
          <small class=""/>
          <a
            :href="noitemli.thePageUrl"
            data-type="mip">{{ noitemli.downTopic }}</a>
          <a
            :href="noitemli.downFile"
            data-type="mip"
            class="am-fr donw_a am-margin-right-sm">
            立即下载
          </a>
        </div>
      </a>
      <a
        v-for="item in sort_item_data"
        :key="item.sortProd"
        class="clearfix sort-title">
        <div class="ili-title"><i class="am-header-icon am-icon-chevron-right"/>{{ item.sortName }}</div>

        <div
          v-for="itemli in item.sortData"
          :key="itemli.downId"
          class="down-con">
          <small class=""/>
          <a
            :href="itemli.thePageUrl"
            data-type="mip" >{{ itemli.downTopic }}</a>
          <a
            :href="itemli.downFile"
            data-type="mip"
            class="am-fr donw_a am-margin-right-sm">
            立即下载
          </a>
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
}
.ili-title i {
  padding-right: 6px;
  font-size: 15px;
}
.lists.downs .dl .down-con {
  display: block;
  border-bottom: 1px dashed #ededed;
  overflow: hidden;
  background: #fff;
  color: #555555;
  line-height: 50px;
  height: 50px;
}

.lists.downs .dl .down-con>small {
  display: block;
  float: left;
  width: 50px;
  height: 100%;
  background-image: url(/mip/templates/default/images//icon-32x26-downs.png);
  background-position: center;
  background-repeat: no-repeat;
  color: #ffffff;
  line-height: 50px;
  text-align: center;
}

.lists.downs .dl .down-con a:nth-of-type(1) {
  display: block;
  width: calc(100% - 150px);
  white-space: nowrap;
  overflow: hidden;
  float: left;
  text-overflow: ellipsis;
  color: #8c8c8c;
}

.lists.downs .dl .down-con>a:nth-of-type(2) {
  font-size: 16px;
}

.lists.downs .dl .down-con>a:only-of-type {
  line-height: 52px;
}

.lists.downs .dl .down-con>small.docx {
  background-image: url(/mip/templates/default/images/docx.png);
}

.lists.downs .dl .down-con>small.rar {
  background-image: url(/mip/templates/default/images/rar.png);
}

.lists.downs .dl .down-con>small.ppt {
  background-image: url(/mip/templates/default/images/ppt.png);
}

.lists.downs .dl .down-con>small.pdf {
  background-image: url(/mip/templates/default/images/pdf.png);
}

.lists.downs .dl .down-con>small.apk {
  background-image: url(/mip/templates/default/images/apk.png);
}

.lists.downs .dl .down-con>small.xls {
  background-image: url(/mip/templates/default/images/xlsx.png);
}

.lists.downs .dl .down-con>small.jpg {
  background-image: url(/mip/templates/default/images/jpg.png);
}

.lists.downs .dl .down-con>small.txt {
  background-image: url(/mip/templates/default/images/txt.png);
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
        throw new Error('down sort info went wrong!')
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
              throw new Error('down sort list went wrong!')
            }
          }).then(iteminfo => {
            let sobj = {}
            that.item_list = iteminfo.data.items
            sobj.sortName = that.sort_list[i].sortName
            sobj.sortProd = '0_' + that.sort_list[i].mnSortId
            // 显示推荐的产品
            sobj.sortData = iteminfo.data.items.filter((istopitem) => {
              return istopitem.downIsOpen === 1
            })
            if (that.item_list.length > 0) {
              that.item_list.forEach(element => {
                if (element.thePageUrl === '' || element.thePageUrl === null) {
                  element.thePageUrl = '/mip/templates/default/downs_view.html?id=' + element.downId + '&menuIndexVar=' + element.menuIndexVar + '&editionId=' + element.editionId + '&sortId=&selType='
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
          throw new Error('no down sort list went wrong!')
        }
      }).then(noprosort => {
        let nosobj = {}
        this.item_list = noprosort.data.items
        nosobj.sortProd = '0'
        nosobj.sortName = '未选择所属分类'
        // 显示推荐的产品
        nosobj.sortData = noprosort.data.items.filter((istopnosortitem) => {
          return istopnosortitem.downIsOpen === 1
        })
        if (this.item_list.length > 0) {
          this.item_list.forEach(element => {
            if (element.thePageUrl === '' || element.thePageUrl === null) {
              element.thePageUrl = '/mip/templates/default/downs_view.html?id=' + element.downId + '&menuIndexVar=' + element.menuIndexVar + '&editionId=' + element.editionId + '&sortId=&selType='
            }
          })
        }
        this.nosort_item_data.push(nosobj)
      })
    })
  }
}
</script>
