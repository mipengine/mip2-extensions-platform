<template>
  <div class="section">
    <h3 class="section-hd">
      <span
        :title-head="titleHead">{{ titleHead }}</span>
      <a
        v-if="isMore"
        :href="'https://m.5ikang.com/ask/list_' + ks + '.html'"
        :ks="ks">更多&gt;</a>
    </h3>
    <ul class="mip-reletive-list">
      <li
        v-for="(item, key) in model.data"
        :key="key"
        :search="search">
        <a :href="'https://m.5ikang.com/ask/' + item.id + '.html'">{{ item.title }}</a>
      </li>
    </ul>
  </div>
</template>

<style lang="less" scoped>
  .section {
    padding: 0 10px 10px;
    margin-top: 10px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 2px 3px rgba(212, 223, 249, 0.6);

    .section-hd {
      height: 36px;
      font-weight: normal;
      display: -webkit-box;
      display: -moz-box;
      display: box;
      display: -webkit-flex;
      display: -moz-flex;
      display: flex;
      -moz-box-align: center;
      -webkit-box-align: center;
      box-align: center;
      -webkit-align-items: center;
      -moz-align-items: center;
      align-items: center;
      -moz-box-pack: justify;
      -webkit-box-pack: justify;
      box-pack: justify;
      -webkit-justify-content: space-between;
      -moz-justify-content: space-between;
      justify-content: space-between;

      span {
        display: block;
        line-height: 18px;
        padding: 0 8px;
        border: 1px solid #659de3;
        color: #659de3;
        text-align: center;
        border-radius: 3px;
        font-size: 14px;
      }

      a {
        display: block;
        height: 36px;
        line-height: 36px;
        padding: 0 10px;
        font-size: 16px;
        color: #666;
      }
    }

    .mip-reletive-list {
      a {
        display: block;
        width: 100%;
        height: 40px;
        line-height: 40px;
        border-bottom: 1px solid #e2e2e2;
        font-size: 16px;
        color: #666;
        overflow: hidden;
        white-space: nowrap;
        word-break: break-word;
        text-overflow: ellipsis;
      }
    }
  }

</style>

<script>
export default {
  props: {
    titleHead: {
      type: String,
      default: '相关问答'
    },
    search: {
      type: String,
      default: ''
    },
    ks: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      model: {},
      isMore: false
    }
  },
  mounted () {
    let self = this
    this.getList(self.search)
  },
  methods: {
    getList (search) {
      let url = 'https://m.5ikang.com/ask/aboutAsk?search=' + search

      fetch(url, {
        method: 'get'
      }).then(res => {
        return res.text()
      }).then(res => {
        this.model = JSON.parse(res)

        if (this.model.data && this.model.data.length > 5) {
          this.isMore = true
        }
      })
    }
  }
}
</script>
