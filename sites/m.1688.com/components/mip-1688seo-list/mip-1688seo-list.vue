<template>
  <div class="search-list">
    <div class="list_column">
				<div class="list_group-item" v-for="offer in list" :key="offer.id">
					<a class="item-link" :href="offer.detailUrl">
            <div class="item-image">
                <mip-img class="img_block" width="110" height="110"  :src="offer.picUrl+'_270x270xzq60.jpg'" :alt="offer.pureSubject" />
					  </div>
					  <div class="item-info">
						<div class="item-info_title">
							<span v-html="offer.subject">{{offer.subject}}</span>
						</div>
					</div>
          	<div class="item-info_count">
							<div class="count_price">
								<i>￥</i>{{offer.price}}
							</div>
						</div>
          </a>
				</div>
    </div>
    <nav class="ac t-nav-page">
      <div>
          <a id="nextA" href="javascript:;" class="pagination" rel="nofollow">
              <div id="nextBtn" @click="next" class="btn on">下一页<span>共{{totalPage}}</span>页</div>
          </a>
      </div>
    </nav>
  </div>
</template>

<style scoped lang="less">
</style>
<script>
import "./mip-1688seo-list.less";
import Util from  "@/common/util";


export default {
  props: ["list", "pageIndex", "totalPage", "sortType","canonicalUrl"],
  data() {
    this.list =  this.list || [];
    return {
      list: this.list.map(item => {
        if (item.type == "p4p" || item.type == "bid") {
          item.href = item.eurl;
        } else if (item.wapJvOfferVo && item.wapJvOfferVo.jvFlag) {
          item.href = item.wapJvOfferVo.detailUrl;
        } else {
          item.href = `//m.1688.com/offer/'${item.id}'.html`;
        }
      })
    };
  },
  mounted() {
    // var searchQuery = Util.getUrlParms(location.href);
    // const searchParam = Object.assign({},searchQuery, { appName:'wap', beginPage: 1, pageSize: 20 });
    // lib.mtop
    //   .request({
    //     api: MTOP_URL_OFFERS,
    //     v: "1.0",
    //     data: JSON.stringify(searchParam),
    //     ecode: 0
    //   }).then(res => {
    //     console.log(res);
    //   });
  },
  methods: {
    next() {
      let pageIndex = this.pageIndex + 1;
      let _href = this.canonicalUrl || "";
      if (_href.indexOf("?") != -1) {
        window.location.href = _href + "&beginPage=" + pageIndex;
      } else {
        window.location.href = _href + "?beginPage=" + pageIndex;
      }
    }
  }
};
</script>
