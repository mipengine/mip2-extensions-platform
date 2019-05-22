<template>
  <div class="wrapper">
    <div
      ref="topFilter"
      class="top-filter">
      <div class="top-filter-container">
        <div
          class="filter-box"
          @click="handleFilter(industrydata)">
          行业分类
          <span class="san">▼</span>
        </div>
        <div
          class="filter-box"
          @click="handleFilter(regiondata)">
          地区分类
          <span class="san">▼</span>
        </div>
      </div>
      <div
        v-if="visible"
        :style="{visibility: visible ? 'visible' : 'hidden', height: clientHeight}"
        class="filter-container"
      >
        <div class="box box-first">
          <ul>
            <li
              v-for="(item, i) in filterdata"
              :key="item.label"
              :class="{'select-item': index === i}"
              @click="itemClick(i)"
            >{{ item.label }}</li>
          </ul>
        </div>
        <div class="box box-second">
          <ul v-if="filterdata[index]">
            <p class="tip">{{ filterdata[index]['label'] }}</p>
            <a
              v-for="item2 in filterdata[index].children"
              :key="item2.label"
              :title="item2.label + '展会'"
              :href="newRrl(url, item2.pid, item2.id, urlType)"
            >
              <li>{{ item2.label }}</li>
            </a>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
@scale: 375/10;
/*筛选*/
.top-filter {
  width: 100%;
  background: #f5f5f9;

  .top-filter-container {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: center;
    background: #fff;
    box-shadow: 0 3px 10px #999;
    position: relative;
    z-index: 9999;

    .filter-box {
      display: flex;
      flex: 1;
      justify-content: center;
      align-items: center;
      font-size: 14rem / @scale;
      height: 35rem / @scale;
      color: #333;

      &:first-child {
        border-right: solid 1px #ddd;
      }

      .san {
        color: #666;
        margin-left: 10px;
      }
    }
  }
}
.filter-container {
  background: #f6f6f6;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: stretch;
  .box {
    display: flex;
    background: #fff;
    &:first-child {
      background: transparent;
    }
    ul {
      width: 100%;
      padding-top: 10rem / @scale;
      padding-bottom: 10rem / @scale;
      overflow-y: auto;
      &::-webkit-scrollbar {
        display: none;
      }
      li {
        float: unset;
        width: 100%;
        padding: 8rem / @scale 0;
        text-align: center;
        margin-bottom: unset;
        font-size: 13rem / @scale;
        color: #333;
      }
      .select-item {
        background: #fff;
        color: #f83536;
      }
    }
  }
  .box-first {
    flex: 0.7;
  }
  .box-second {
    box-sizing: border-box;
    padding: 0 12rem / @scale 0 12rem / @scale;
    flex-direction: column;
    flex: 1;
    img {
      width: 100%;
      height: 145rem / @scale;
    }
    ul {
      overflow-y: auto;
      .tip {
        text-align: center;
        font-family: AdobeHeitiStd-Regular;
        font-size: 14rem / @scale;
        color: #333;
        margin-top: 8rem / @scale;
        margin-bottom: 20rem / @scale;
        position: relative;
        &:after {
          content: "";
          display: block;
          height: 2px;
          width: 100rem / @scale;
          background: #c2a222;
          position: absolute;
          top: 25rem / @scale;
          left: 50%;
          margin-left: -50rem / @scale;
          border-radius: 1px;
        }
      }
      a {
        li {
          width: 95rem / @scale;
          float: left;
          margin-right: 15rem / @scale;
          margin-bottom: 12rem / @scale;
          box-sizing: border-box;
          border: solid 1px #e6e6e6;
          border-radius: 8px;
          list-style: none;
        }
        &:nth-child(2n + 1) {
          li {
            margin-right: 0;
          }
        }
      }
    }
  }
}
</style>

<script>
export default {
  props: {
    url: {
      type: String,
      default: '/exhibition'
    },
    visible: {
      type: Boolean,
      default: false
    },
    regiondata: {
      type: Array,
      default () {
        return []
      }
    },
    industrydata: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      clientHeight: '300px',
      filterdata: this.industrydata,
      index: 0,
      type: 'industry',
      urlType: 'secondIndustryName'
    }
  },
  mounted () {
    this.clientHeight =
      window.screen.height - (0.93333333 * window.screen.width) / 10 + 'px'
  },
  methods: {
    newRrl (url, pid, id, type) {
      url = url.replace(/\//g, '')
      let temp = url.split('?')[0].split('-')
      if (temp.length < 7) {
        for (let i = 1; i <= 7; i++) {
          temp[i] = 0
        }
      }

      // 切換條件的時候，讓頁面置為1
      temp[7] = 1
      switch (type) {
        case 'firstIndustryName':
          temp[1] = id
          temp[2] = 0
          break
        case 'continentName':
          temp[3] = id
          temp[4] = 0
          temp[5] = 0
          break
        case 'countryName':
          temp[3] = pid
          temp[4] = id
          temp[5] = 0
          break
        case 'cityName':
          temp[5] = id
          break
        case 'startTime':
          temp[6] = id
          break
        case 'page':
          temp[7] = id
          break
      }
      return '/' + temp.join('-') + '/'
    },
    itemClick (i) {
      this.index = i
    },
    handleFilter (data) {
      this.filterdata = data
      this.index = 0
      this.urlType = 'secondIndustryName'
      if (this.type === 'region') {
        this.visible = true
        this.type = 'industry'
      } else if (this.type === 'industry') {
        this.visible = !this.visible
      }
    }
  }
}
</script>
