<template>
  <div class="lists product">
    <a
      v-for="noitem in nosort_item_data"
      :key="noitem.sortProd"
      class="clearfix sort-title">
      <li
        v-for="noitemli in noitem.sortData"
        :key="noitemli.productId">
        <a
          :href="noitemli.thePageUrl"
          class="itemlink">
          <div class="img">
            <mip-img
              :src="noitemli.productImage"
              layout="responsive"
              width="100"
              height="100"/>
          </div>
          <div class="topic">{{ noitemli.productName }}</div>
        </a>
      </li>
    </a>
    <a
      v-for="item in sort_item_data"
      :key="item.sortProd"
      class="clearfix sort-title">
      <div class="ili-title"><i class="am-header-icon am-icon-chevron-right"/>{{ item.sortName }}</div>
      <li
        v-for="itemli in item.sortData"
        :key="itemli.productId">
        <a
          :href="itemli.thePageUrl"
          class="itemlink">
          <div class="img">
            <mip-img
              :src="itemli.productImage"
              layout="responsive"
              width="100"
              height="100"/>
          </div>
          <div class="topic">{{ itemli.productName }}</div>
        </a>
      </li>
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
.lists li {
  float: left;
  width: 50%;
  box-sizing:border-box;
  -moz-box-sizing:border-box;
  -webkit-box-sizing:border-box;
  padding: .5rem;
  list-style: none;
}
.lists li .img{
  width:100%;
}
.lists li .topic{
  color: #666;
  font-size: 14px;
  text-align:center;
}
.lists li .itemlink{
  display:block;
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
import apiUrl from '../../common/js/config.api'
export default {
  data () {
    return {
      sort_list: [],
      item_list: [],
      sort_item_data: [],
      nosort_item_data: []
    }
  },
  mounted () {
    fetch(apiUrl.prosorttitleUrl).then(response => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error('product sort info went wrong!')
      }
    }).then(sortinfo => {
      let self = this
      this.sort_list = sortinfo.data.items
      // 有分类根据分类输出推荐产品
      for (let index = 0; index < this.sort_list.length; index++) {
        (function (i) {
          let that = self
          fetch(apiUrl.prosortlistUrl + '0_' + that.sort_list[i].mnSortId).then(response => {
            if (response.ok) {
              return response.json()
            } else {
              throw new Error('product sort list went wrong!')
            }
          }).then(iteminfo => {
            let sobj = {}
            that.item_list = iteminfo.data.items
            sobj.sortName = that.sort_list[i].sortName
            sobj.sortProd = '0_' + that.sort_list[i].mnSortId
            // 显示推荐的产品
            sobj.sortData = iteminfo.data.items.filter((istopitem) => {
              return istopitem.productIstop === 1
            })
            if (that.item_list.length > 0) {
              that.item_list.forEach(element => {
                if (element.thePageUrl === '' || element.thePageUrl === null) {
                  element.thePageUrl = '/mip/templates/default/products_view.html?id=' + element.productId + '&menuIndexVar=' + element.menuIndexVar + '&editionId=' + element.editionId + '&sortId=&selType='
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
      fetch(apiUrl.prosortlistUrl + '0').then(response => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error('no sort product list went wrong!')
        }
      }).then(noprosort => {
        let nosobj = {}
        this.item_list = noprosort.data.items
        nosobj.sortProd = '0'
        nosobj.sortName = '未选择所属分类'
        // 显示推荐的产品
        nosobj.sortData = noprosort.data.items.filter((istopnosortitem) => {
          return istopnosortitem.productIstop === 1
        })
        if (this.item_list.length > 0) {
          this.item_list.forEach(element => {
            if (element.thePageUrl === '' || element.thePageUrl === null) {
              element.thePageUrl = '/mip/templates/default/products_view.html?id=' + element.productId + '&menuIndexVar=' + element.menuIndexVar + '&editionId=' + element.editionId + '&sortId=&selType='
            }
          })
        }
        this.nosort_item_data.push(nosobj)
      })
    })
  }
}
</script>
