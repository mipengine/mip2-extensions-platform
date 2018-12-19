<template>
  <div class="wrapper">

    <mip-fixed
      class="mipnav"
      type="top">
      <div
        v-for="(h,index) in commentTab"
        :key="h.id"
        :class="{atv:index == indx }"
        :id="h.id"
        class="item"
        @touchend="commentnav(index)">
        <div class="datanum">{{ h.count }}</div>{{ h.name }}
      </div>
    </mip-fixed>
    <div class="cm-box">
      <div class="class">
        <div
          v-for="com in commentTab[index]['comment']"
          :key="com"
          class="list">
          <img
            :src="com.iconUrl"
            class="icon">
          <div class="comright">
            <div
              class="comname"
              v-html="com.nick"/>
            <div class="star">
              <img
                v-for="(i,index) in [1, 2, 3, 4, 5]"
                :key="i"
                :src="com.star< index ? 'https://www.daoway.cn/mip/common/images/star.png' : 'https://www.daoway.cn/mip/common/images/red_star.png'">
              <div
                class="data"
                v-html="com.createtime"/>
            </div>
            <div
              class="comtxt"
              v-html="com.comment"/>
            <div
              v-if="com.imgPath"
              class="picture">
              <div>
                <img
                  v-for="i in com.imgPath"
                  :key="i"
                  :src="i"
                  class="tapimg">
              </div>
            </div>
            <div class="addre">{{ com.city }}
              <div
                class="area"
                v-html="com.area"/>
              <div
                class="area"
                v-html="com.firstPriceName"/>
              {{ com.name }}
            </div>
            <div
              v-if="com.replyComment"
              class="reply">
            <div class="reptit">商家回复:</div>{{ com.replyComment }}</div>
          </div>
          <img
            src="https://www.daoway.cn/mip/common/images/maijia_03.png"
            class="chengjiao" >
        </div>
        <div
          v-if="nocomments"
          class="list2">
          <img
            src="https://www.daoway.cn/mip/common/images/pingjia.png"
            style="width:100px; height:100px; display:block; margin:0 auto;" >
          <div class="jianyi">您的评价是最好的建议</div>
        </div>
        <div
          v-if="loding"
          class="zhexie loding">加载中...</div>
        <div
          v-if="over"
          class="zhexie">~暂时只有这些了~</div>
      </div>
    </div>
  </div>
</template>
<script>
import base from '../../common/utils/base'
export default {
  prerenderAllowed () {
    return true
  },
  data () {
    return {
      serviceId: base.getRequest(location.href).serviceId,
      priceId: base.getRequest(location.href).priceId,
      filter: 'all',
      index: 0,
      indx: 0,
      loding: false,
      startY: '',
      endY: '',
      commentTab: [
        {
          id: 'all',
          name: '全部',
          count: 0,
          comment: []
        }, {
          id: 'good',
          name: '好评',
          count: 0,
          comment: []
        }, {
          id: 'average',
          name: '中评',
          count: 0,
          comment: []
        }, {
          id: 'bad',
          name: '差评',
          count: 0,
          comment: []
        }, {
          id: 'hasImg',
          name: '有图',
          count: 0,
          comment: []
        }
      ],
      img: [],
      nocomments: false,
      over: false,
      channel: 'mip'
    }
  },
  mounted () {
    let that = this
    that.commentlist(that.serviceId, that.priceId, 0, 0)
    // window.addEventListener('scroll', this.morelist)
    let body = this.$element.querySelector('.wrapper')
    body.addEventListener('touchstart', (e, str) => {
      let touch = e.touches[0]
      this.startY = touch.pageY
    })
    body.addEventListener('touchmove', (e, str) => {
      let touch = e.touches[0]
      this.endY = touch.pageY
      // if(this.endY >= this.startY){
      this.morelist()
      // }
    })
  },
  methods: {
    commentlist (serviceId, priceId, index, start) {
      let that = this
      let commentTab = that.commentTab
      let tager = commentTab[index]
      let filter = tager.id // 评论类别 all/good/average/bad/hasImg
      // console.log(serviceId,start,filter,index)
      let url = 'https://www.daoway.cn/daoway/rest/service/' + serviceId + '/comments?start=' + start + '&size=30&filter=' + filter + '&channel=' + that.channel
      if (that.priceId) {
        url += '&priceId=' + that.priceId
      }
      fetch(url, {
        method: 'get'
      }).then(function (res) {
        return res.json()
      }).then(function (text) {
        let data = text.data
        if (that.filter === 'all') {
          for (let c = 0; c < 5; c++) {
            let ct = that.commentTab[c]
            let id = ct.id
            switch (id) {
              case 'all':
                ct.count = data.totalCount
                break
              case 'good':
                ct.count = data.goodCount
                break
              case 'average':
                ct.count = data.averageCount
                break
              case 'bad':
                ct.count = data.badCount
                break
              case 'hasImg':
                ct.count = data.hasImgCount
                break
            }
          }
        }
        if (data.comments.length > 0) {
          for (let i = 0; i < data.comments.length; i++) {
            let comment = data.comments[i]
            comment.imgThumbPath = comment.imgThumbPath ? comment.imgThumbPath.split(',') : []
            comment.imgPath = comment.imgPath ? comment.imgPath.split(',') : []
            comment.createtime = base.timeformat(comment.createtime, 'yyyy-MM-dd')
            comment.name = comment.name || ''
            comment.firstPriceName = comment.firstPriceName || ''
            comment.replyComment = comment.replyComment || ''
            comment.area = comment.area || ''
            if (!comment.iconUrl) {
              comment.iconUrl = 'https://www.daoway.cn/mip/common/images/iconimg.png'
            }
            that.commentTab[index].comment.push(comment)
          }
          that.sw = true
        } else {
          that.loding = false
        }
      }).catch(function (error) {
        console.error('Error:', error)
      })
    },
    commentnav (index) {
      let that = this
      that.commentTab[index].comment = []
      let commentTab = that.commentTab
      let tager = commentTab[index]
      that.filter = tager.id
      that.index = index
      that.indx = index
      if (tager.count === 0) {
        that.nocomments = true
      }
      that.loding = false
      that.commentlist(that.serviceId, that.priceId, index, 0)
      window.scrollTo(0, 0)
    },
    morelist () {
      let that = this
      if (document.body.scrollTop || document.documentElement.scrollTop + window.innerHeight >= document.body.offsetHeight) {
        if (that.sw === true) {
          that.sw = false
          let comm = that.commentTab[that.index]
          let start = that.commentTab[that.index].comment.length
          if (start === comm.count) {
            that.loding = false
            that.over = true
            that.nocomments = false
          } else {
            setTimeout(() => {
              that.loding = true
            }, 500)
            that.commentlist(that.serviceId, that.priceId, that.index, start)
          };
        }
      } else {
        that.loding = false
      }
    }
  }
}
</script>
<style scoped>
.wrapper {
  margin: 0 auto;
  text-align: center;
}

.mipnav[type=top]{
  height: 42px;
  border-bottom: 1px solid #e5e5e5;
  border-top: 1px solid #f5f5f5;
  padding: 10px 0;
  background: #fff;
  margin-top: 44px;
}
.cm-box{
  margin-top: 60px;
}

.item {
  width: 16%;
  margin: 0 2%;
  text-align: center;
  height: 40px;
  line-height: 20px;
  float: left;
}
.zhexie{
  padding: 15px 0;
}

.picture img.tapimg:hover{
  width: 100%;
  height: auto;
}
.picture img.tapimg:active{
  width: 68px;
  height: 68px;
}

.atv, .atv .datanum {
  color: #f34e55;
}

.datanum {
  font-size: 14px;
}

.list {
  padding: 10px 3%;
  border-bottom: 1px solid #e5e5e5;
  position: relative;
}

.icon {
  width: 35px;
  height: 35px;
  vertical-align: top;
  border-radius: 100%;
}

.star img {
  width: 12px;
  height: 12px;
  margin-right: 3px;
}

.comright, .icon {
  display: inline-block;
}

.comright {
  margin-left: 10px;
  line-height: 20px;
  width: 85%;
  text-align: left;
}

.data {
  display: inline-block;
  font-size: 14px;
  margin-left: 10px;
  color: #777;
}

.addre {
  color: #a5a5a5;
  font-size: 12px;
  margin-top: 10px;
}

.comtxt {
  margin: 5px auto;
  color: #303030;
}

.addre div {
  display: inline-block;
  color: #a5a5a5;
}

.area {
  margin: 0 8px;
}

.chengjiao {
  position: absolute;
  right: 3%;
  top: 10px;
  width: 31px;
  height:31px;
}

.picture {
  width: 100%;
  overflow: hidden;
}

.picture img {
  margin-right: 9px;
  width: 67px;
  height: 68px;
  float: left;
}

.reply {
  border-top: 1px solid #e5e5e5;
  font-size: 14px;
  line-height: 20px;
  margin-top: 5px;
  padding-top: 10px;
  color: #4c4c4c;
}

.reptit {
  color: #4bbece;
  display: inline-block;
}

.list2 {
  text-align: center;
  color: #4c4c4c;
  margin-top: 30%;
}

.jianyi {
  position: relative;
  bottom: 30px;
}

</style>
