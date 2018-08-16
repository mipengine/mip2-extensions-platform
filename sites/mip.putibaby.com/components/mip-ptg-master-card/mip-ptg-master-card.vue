
<template>
  <div class="root">
    <div class="master_div">
      <div class="masterShow">
        <div style="padding: 10px 10px 0px 10px;">
          <div class="mS_headerBorder">
            <mip-img
              :src="data.info.header.small"
              class="mS_header"/>
          </div>
          <div class="mS_info">
            <p class="mS_masterName">{{ data.info.name }}</p>
            <p class="mC_Des">
              <span>
                {{ data.info.description[0] }}
              </span>
              <span>
                {{ data.info.description[1] }}
              </span>
              <span>
                {{ data.info.description[2] }}
              </span>
            </p>
            <p class="expectCity">
              上户城市：{{ data.info.expect_city }}
            </p>
          </div>
          <div class="renZheng">
            <a
              href="service_intro"
              mip-link>
              <span v-if="data.info.certificated">
                <mip-img
                  src="i/master_card_certificated.png"
                  width="12px"
                  height="12px" />
                <span>身份认证</span>
              </span>
            </a>
            <a
              href="service_intro"
              mip-link>
              <span v-if="data.info.market_certificated">
                <mip-img
                  src="i/market_certificated.png"
                  width="12px"
                  height="12px"/>
                <span>推荐护理师</span>
              </span>
            </a>
            <a
              :href="'master_intro_detail?u='+data.info.username"
              mip-link>
              <div class="details">基本资料详情</div>
            </a>
            <a
              v-if="data.info.is_credited"
              class="yinzhang_a"
              href="service_intro"
              mip-link/>
            <mip-img
              v-if="data.info.is_credited"
              src="i/yinzhang.png"
              width="60px"
              height="60px"
              class="yinzhang"/>
          </div>
        </div>
        <div class="line"/>
        <div class="mS_other">
          <table>
            <tbody>
              <tr>
                <td v-if="data.shanghu_data.feedback_cc === 0">客户评分：0</td>
                <td v-if="data.shanghu_data.feedback_cc != 0">客户评分：{{ data.shanghu_data.feedback_total_star / data.shanghu_data.feedback_cc }}</td>
                <td>收藏：{{ data.info.fan_cc }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="jieshao">
        <div class="pJC_head">
          <mip-img
            layout="responisve"
            width="12px"
            height="12px"
            src="i/card_circle_1.png" />
          <span>自我介绍</span>
        </div>
        <mip-showmore
          id="showmore01"
          maxheight="40"
          animatetime=".3">
          <div class="jieshao_content">{{ data.info.my_intro }}</div>
        </mip-showmore>
        <div
          on="tap:showmore01.toggle"
          data-closetext="收起"
          class="mip-showmore-btn">展开</div>
      </div>

      <div
        v-if="data.info.offer_service"
        class="serverCard">
        <a
          :href="'skill_details?u=' + data.info.username"
          mip-link>
          <div class="sC_head">
            <mip-img
              layout="responisve"
              width="12px"
              height="12px"
              src="i/card_circle_1.png" />
            <span>月嫂服务项目</span>
            <span>查看更多&nbsp;<mip-img
              layout="responisve"
              width="8px"
              height="14px"
              src="i/right_white.png" /></span>
          </div>
        </a>
        <table>
          <tbody>
            <tr>
              <td>{{ data.skill_list[0].title }}<br >{{ data.skill_list[0].ok_cc }}</td>
              <td>{{ data.skill_list[1].title }}<br >{{ data.skill_list[1].ok_cc }}</td>
              <td>{{ data.skill_list[2].title }}<br >{{ data.skill_list[2].ok_cc }}</td>
              <td>{{ data.skill_list[3].title }}<br >{{ data.skill_list[3].ok_cc }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div
        v-if="data.info.price_yuer.market_price > 0 || data.info.price_yuer.market_halfday_price > 0"
        class="serverCard">
        <a
          :href="'skill_details?is_yuer=1&u=' + data.info.username"
          mip-link>
          <div class="sC_head">
            <mip-img
              layout="responisve"
              width="12px"
              height="12px"
              src="i/card_circle_1.png" />
            <span>育儿嫂服务项目</span>
            <span>查看更多&nbsp;<mip-img
              layout="responisve"
              width="8px"
              height="14px"
              src="i/right_white.png" /></span>
          </div>
        </a>
        <table>
          <tbody>
            <tr>
              <td>{{ data.skill_list_yuer[0].title }}<br >{{ data.skill_list_yuer[0].ok_cc }}</td>
              <td>{{ data.skill_list_yuer[1].title }}<br >{{ data.skill_list_yuer[1].ok_cc }}</td>
              <td>{{ data.skill_list_yuer[2].title }}<br >{{ data.skill_list_yuer[2].ok_cc }}</td>
              <td>{{ data.skill_list_yuer[3].title }}<br >{{ data.skill_list_yuer[3].ok_cc }}</td>
            </tr>
          </tbody>
        </table>

      </div>

      <div class="albumCard">
        <!-- <a href="https://h5.putibaby.com/999.999/master/dgxc?u=<%= m.info.username %>"> -->
        <div class="aC_head">
          <mip-img
            layout="responisve"
            width="12px"
            height="12px"
            src="i/card_circle_1.png" />
          <span>相册</span>
        <!-- <span>查看相册&nbsp;<mip-img layout="responisve" width="8px" height="14px" src="i/right_white.png" ></mip-img></span> -->
        </div>
        <!-- </a> -->
        <div class="picList">
          <p v-if="data.xc_list.length === 0">没有照片</p>
          <div
            v-if="data.xc_list.length > 0"
            class="allpic">
            <!-- <mip-img
              v-for="pic in data.xc_list"
              :key="pic.big"
              :src="pic.big"
              layout="responsive"
              popup
              width="70px"
              height="70px" /> -->
            <div
              v-for="pic in data.xc_list"
              :key="pic.big"
              :src="pic.big"
              :style="{backgroundImage: 'url(' + pic.big + ')', backgroundSize:'contain'}"
              class="onepic"
              @click.prevent="show(pic.big)"/>

          </div>

        </div>
      </div>

      <div class="pingJiaCard">
        <a
          :href="'master_shanghu_detail?u=' + data.info.username"
          mip-link>
          <div class="pJC_head">
            <mip-img
              layout="responisve"
              width="12px"
              height="12px"
              src="i/card_circle_1.png" />
            <span>客户评价</span>
            <span>共{{ data.shanghu_data.cc }}条评价&nbsp;<mip-img
              layout="responisve"
              width="8px"
              height="14px"
              src="i/right_white.png" /></span>
          </div>
        </a>
        <div class="pingJia">

          <p
            v-if="data.shanghu_data.cc === 0"
            class="no_pj" ><mip-img
              src="i/no_pj.png"
              width="131px"
              height="12.5px"/></p>
          <div v-else>
            <table>
              <tbody>
                <tr>
                  <td>
                    综合评价
                    <div class="starBox">

                      <mip-img
                        v-for="(item,index) in data.shanghu_data.star_1_list"
                        :key="index"
                        layout="responisve"
                        width="12px"
                        height="12px"
                        class="iconStar"
                        src="https://mip.putibaby.com/i/select_master_star.png" />

                      <mip-img
                        v-for="(item,index) in data.shanghu_data.star_0_list"
                        :key="index"
                        layout="responisve"
                        width="12px"
                        height="12px"
                        class="iconStar"
                        src="https://mip.putibaby.com/i/select_master_unstar.png" />

                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span>{{ data.last_feedback.shanghu_at }}</span>
                    <span>至</span>
                    <span>{{ data.last_feedback.end_at }}</span>
                    <span class="left">{{ data.last_feedback.days }}天</span>
                  </td>
                </tr>
                <tr>
                  <td class="customer">
                    <mip-img
                      :src="data.last_feedback.mama_info.header.small"
                      layout="responisve"
                      width="50px"
                      height="50px" />
                    <div class="customerInfo">
                      <p>
                        <span>{{ data.last_feedback.mama_info.name }} &nbsp; {{ data.last_feedback.mama_info.role }}({{ data.last_feedback.mama_info.type==='history' ? '历史客户' : '菩提果签约' }}
                          {{ data.last_feedback.mama_info.master_type === 'yuer' ? '育儿单' : '月嫂单' }}
                          )
                        </span>
                      </p>
                      <p>手机：{{ data.last_feedback.mama_info.phone_number }}</p>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span>拍照:{{ data.last_feedback.record_cc }}张</span>
                    <span class="left">护理记录:{{ data.last_feedback.care_cc }}</span>
                  </td>
                </tr>
                <tr>
                  <td class="customerEvaluate">
                    <!-- <p class="cE_title">客户评价</p> -->
                    <p class="cE_article">
                      {{ data.last_feedback.feedback.comment }}
                    </p>
                    <div v-if="data.last_feedback.feedback && data.last_feedback.feedback.pics && data.last_feedback.feedback.pics.length > 0" >
                      <mip-img
                        v-for="p in data.last_feedback.feedback.pics"
                        :key="p.big"
                        :src="p.big"
                        layout="responisve"
                        width="50px"
                        height="50px" />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>

          </div>
        </div>
      </div>
    </div>
    <mip-fixed type="bottom">
      <table
        class="tbl"
        cellspacing="0">
        <tbody>
          <tr>
            <td class="td1">
              <a
                class="a"
                href="tel:400-618-8835">
                <mip-img
                  layout="responisve"
                  width="38px"
                  height="36px"
                  src="i/card_ph.png" />
              </a>
            </td>
            <td
              class="td-fav"
              @click="handleFav">
              <a class="a">
                <mip-img
                  v-if="data.info.isfav"
                  layout="responisve"
                  width="29px"
                  height="35px"
                  src="i/has_fav.png" />
                <mip-img
                  v-else-if="!data.info.isfav"
                  layout="responisve"
                  width="29px"
                  height="35px"
                  src="i/un_fav.png" />
                <mip-img
                  v-else
                  layout="responisve"
                  width="21px"
                  height="35px"
                  src="i/un_fav.png" />
              </a>
            </td>

            <td
              v-if="data.info.can_online_interview"
              class="td2"
              @click="handleUpdateTime">
              <a>预约视频面试</a>
            </td>

            <td
              v-else
              class="td2"
              @click="handleOrderList">
              <a>{{ data.info.order_desc_str }}-查看预约</a>
            </td>

          </tr>
        </tbody>
      </table>
    </mip-fixed>
    <mip-fixed
      v-if="showImg"
      class="img_back"
      type="top"
      still
      @click="hideImg">
      <div
        v-if="showImg"
        class="img_div"
        @touchmove.prevent="noop">
        <mip-img
          :src="imgUrl"
        />
      </div>
    </mip-fixed>

  </div>

</template>

<style scoped>
.no_pj{
  text-align:center;
  padding-top:10px;
  padding-bottom:15px;
}
.wrapper {
  margin: 0 auto;
  text-align: center;
}

*{
    padding: 0px;
    margin: 0px;
    /* font-size: 14px;
    line-height: 14px; */
    font-family: Arial, 'Hiragino Sans GB', 'Microsoft Yahei', Tahoma, Helvetica, STHeiti;
}
a{
    color: black!important;
    text-decoration: none!important;
}
a:checked{
    text-decoration: none!important;
}
a:visited{
    text-decoration: none!important;
}
a:hover{
    text-decoration: none!important;
}
body{
    background-color: #F3F3F3;
}
.root{
  background-color:#F1F5E2;
}
.master_div{
  padding:10px;
}
.masterShow{
    width: 100%;
    border-radius: 5px;
    color: white;
    box-shadow: 0px 1px 1px 1px #e7ebd0;
    /* background-image: url(http://h5.putibaby.com/assets/i/blur_14.jpg); */
    background-size: cover;
}
.masterShow .mS_header{
    width: 50px;
    height: 50px;
    border-radius: 2px;
}
.masterShow .mS_info{
    display: inline-block;
    padding-left: 10px;
  position:relative;
  z-index:99;
}
.masterShow .mS_info p{
    margin: 0px;
}
.masterShow .mS_info .mC_Des span{
    display: inline-block;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}
.masterShow .mS_info .mC_Des span:nth-of-type(1){
    margin-right:5px;
}
.masterShow .mS_info .mC_Des span:nth-of-type(2){
    margin-right:5px;
}
.masterShow .mS_info .mC_Des span:nth-of-type(3){

}
.mS_headerBorder{
    border: 1px solid white;
    display: inline-block;
    vertical-align: top;
    border-radius: 2px;
    padding: 1px;
  float:left;
}
.mS_info .mS_masterName{

}
.renZheng span{
    line-height: 2.5;
}
.renZheng span:nth-of-type(1){
 margin-right:10px;
 color:#fff;
}
.renZheng img{
    width: 12px;
    margin-top: -3px;
}
.renZheng img:nth-of-type(2){
    margin-left: 12px;
}
.renZheng .details{
    position: absolute;
    right: 20px;
    margin-top: -30px;
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 5px;
    height: 22px;
    text-align: center;
    line-height: 22px;
    background-color: rgba(255,255,255,0.2);
    color: #fff;
    font-size: 12px;
  padding-left:5px;
  padding-right:5px;
  z-index:99;
}
.line{
    /* background: url(/i/show_master_card_footer_hb.png); */
    width: 100%;
    height: 2px;
    background-size: contain;
    margin-top: 3px;
}
.mS_other{
    width: 100%;
    background: rgba(193,230,78,0.2);
    border-radius: 0 0 5px 5px;
    padding-top: 5px;
  padding-bottom:5px;

}

.mS_other table{
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    vertical-align: middle;
}
.mS_other tbody{
    display: table-row-group;
    vertical-align: middle;
}
.mS_other td{
    text-align: center;
    vertical-align: middle;
    height: 25px;
    width: 50%;
}
.mS_other td:first-of-type{
    border-right: 1px solid rgba(255,255,255,0.25);
}

.yinzhang{
  position: absolute;
  top:15px;
  right: 30px;
  z-index:1;
}
.yinzhang_a{
  position: absolute;
  top:15px;
  right: 30px;
  width:60px;
  height:60px;
  z-index:100;
}

.albumCard{
    width: 100%;
    border-radius: 5px;
    margin-top: 10px;
}
.albumCard .aC_head{
    background: #A2D016;
    color: white;
    padding: 0px 10px;
    font-size: 14px;
    border-radius: 5px 5px 0px 0px;
}
.albumCard .aC_head mip-img{
    width: 12px;
    height: 12px;
  vertical-align:-1px;
}
.albumCard .aC_head span mip-img{
    width: 8px;
    height: 14px;
    margin-top: -3px;
}
.albumCard .aC_head span{
    line-height: 30px;
}
.albumCard .aC_head span:nth-of-type(2){
    position: absolute;
    right: 15px;
}
.albumCard .picList{
    overflow: auto;
    white-space: nowrap;
    padding: 10px;
    background-color: white;
    border-radius: 0 0 5px 5px;
}
.albumCard .picList p:first-child{
  margin: 0;
}
.albumCard .picList mip-img{
    height: 70px;
    width: 70px;
    cursor: pointer;
    display: inline-block;
    margin-right: 10px;
    border-radius: 5px;
}
.allpic{

    display: inline-block;

}
.onepic{
    height: 70px;
    width: 70px;
    cursor: pointer;
    display: inline-block;
    margin-right: 10px;
    border-radius: 5px;
}
.serverCard{
    width: 100%;
    border-radius: 5px;
    margin-top: 10px;
}
.serverCard tbody tr{
  border-bottom: 1px solid #eee;
}
.serverCard tbody tr td{
  line-height:17px;
}
.serverCard tbody tr td:nth-of-type(1){
  height:49px;
}
.serverCard tbody tr td:nth-of-type(2){
  border-left: 1px solid #eee;
  border-right: 1px solid #eee;
}
.serverCard .sC_head{
    height: 30px;
    color: #fff;
    line-height: 30px;
    font-size: 14px;
    cursor: pointer;
    background: #F16B57;
    background-color:#33CC99;
    padding: 0px 10px;
    border-radius: 5px 5px 0px 0px;
}
.serverCard .sC_head mip-img{
    width: 12px;
    height: 12px;
  vertical-align:-1px;
}
.serverCard .sC_head span mip-img{
    width: 8px;
    height: 14px;
    margin-top: -3px;
}
.serverCard .sC_head span{
    line-height: 30px;
}
.serverCard .sC_head span:nth-of-type(2){
    position: absolute;
    right: 15px;
}
.serverCard table{
    width: 100%;
    background-color: white;
    text-align: center;
  border-radius: 0px 0px 5px 5px;
}
.serverCard .price{
    width: 100%;
    background-color: white;
    border-radius: 0 0 5px 5px;
}
.serverCard .price p{
    line-height: 40px;
    text-align: center;
    margin: 0px;
}
.serverCard .price p span:nth-of-type(1){
    text-decoration:line-through;
    color: #C32218;
}
.serverCard .price p span:nth-of-type(2){
    padding-left:10%;
}
.serverCard .price p span:nth-of-type(3){
    color: #C32218;
}

.pingJiaCard{
    width: 100%;
    border-radius: 5px;
    margin-top: 10px;
    background-color: #fff;
    margin-bottom: 50px;
}
.pingJiaCard .pJC_head{
    height: 30px;
    color: #fff;
    line-height: 30px;
    font-size: 14px;
    cursor: pointer;
    background: #6BD4FA;
    padding: 0px 10px;
    border-radius: 5px 5px 0px 0px;

}
.pingJiaCard .pJC_head mip-img{
    width: 12px;
    height: 12px;
  vertical-align:-1px;
}
.pingJiaCard .pJC_head span mip-img{
    width: 8px;
    height: 14px;
    margin-top: -3px;
}
.pingJiaCard .pJC_head span{
    line-height: 30px;
}
.pingJiaCard .pJC_head span:nth-of-type(2){
    position: absolute;
    right: 20px;
}
.pingJiaCard .pingJia{
    background-color: white;
    border-radius: 0 0 5px 5px;
  margin-top:7px;
}
.pingjiacard .pingjia p:first-child{
  padding:10px 0px 10px 10px;
}
.pingjiacard .pingjia tbody tr:first-child{
  padding:10px 0px 10px 10px;
}
.pingjiacard .pingjia tbody tr:nth-of-type(1) td,
.pingjiacard .pingjia tbody tr:nth-of-type(2) td,
{
  line-height:30px;
  border-bottom: 1px solid #eee;
}
.pingjiacard .pingjia tbody tr:nth-of-type(3) .customerInfo p:nth-of-type(1){
  font-size:15px;line-height: 16px;
}
.pingjiacard .pingjia tbody tr:nth-of-type(3) .customerInfo p:nth-of-type(2){
  color: #999;
}
.pingjiacard .pingjia tbody tr:nth-of-type(4) td{
  line-height:30px;border-bottom: 1px solid #eee;
}
.pingJiaCard table{
    width: 100%;
    border-radius: 0 0 5px 5px;
}
.pingJiaCard table td{
    padding: 3px 10px;
}
.pingJiaCard .starBox{
    width: 90px;
    height: 16px;
    display: inline-block;
    position: absolute;
    right:20px;
  text-align:right;
}
.pingJiaCard .starBox mip-img{
    width: 12px;
    height: 12px;
  margin-left:5px;
}
.pingJiaCard .left{
    float: right;
}
.pingJiaCard .customer{
    padding: 10px;
    border-bottom: 1px solid #eee;
  border-top:1px solid #eee;
}
.pingJiaCard .customer mip-img{
    height: 50px;
    width: 50px;
    display: inline-block;
    margin-right: 10px;
    border-radius: 5px;
}
.pingJiaCard .customer .customerInfo{
    display: inline-block;
    vertical-align: top;
    width: 75%;
}
.pingJiaCard .customer .customerInfo p:last-child{
    margin-top: 0px;
}
.pingJiaCard .customerEvaluate{
    padding: 10px;
    border-radius: 0 0 5px 5px;
}
.pingJiaCard .cE_title{
    font-size: 16px;
    margin: 0px;
}
.pingJiaCard .cE_article{
    line-height: 1.3;
}
.pingJiaCard .customerEvaluate mip-img{
    height: 50px;
    width: 50px;
    display: inline-block;
    margin-right: 10px;
    border-radius: 5px;
  margin-top:10px;
}

.jieshao{
    background-color: white;
    /*padding: 10px;*/
    padding-bottom: 1px;
    margin-top: 10px;
  border-radius:5px;
}

.jieshao .pJC_head{
    height: 30px;
    color: #fff;
    line-height: 30px;
    font-size: 14px;
    cursor: pointer;
    background: #6BD4FA;
    padding: 0px 10px;
    margin-bottom: 10px;
    border-radius: 5px 5px 0px 0px;
}
.jieshao .pJC_head mip-img{
  width:12px;
  height:12px;
  vertical-align:-1px;
}

td.firstCol {
    width:80px;
    text-align:right;
    vertical-align:top;
    padding-top:28px;
    padding-right:10px;
}

td.secondCol {
    vertical-align:top;
    padding-top:25px;
    text-align:left;
}

.tbl{
    width:100%;
    text-align: center;
    height: 50px;
    border-top: 1px solid #ddd;
    background-color: #fff;
}
.tbl td{
    border-right:1px solid #ddd;
}
.td1{
    cursor: pointer;
    background-color: #fff;
    width: 25%;
}
.td-fav{
  width: 25%;
}
.td2{
    cursor: pointer;
    background-color: #adcd41;
    font-size: 15px;
    width: 50%;
}
.td2 a{
    color:white !important;
}
.td1 .a{
    display:block;
    /*width:25px;*/
    /*height:25px;*/
    margin:0 auto;
}

.fav_p{
    font-size: 10px;
    margin:0;
    margin-top: 4px;
    line-height:10px;
}
.fav{
    display:block;
    width:20px;
    margin:0 auto;
    vertical-align: middle;
}

.fuwu{
    /*width: 95%;*/
    height: 70px;
    background-color: #fff;
    margin-top: 10px;
    padding-left: 10px;
    padding-top: 1px;
}

.expectCity{
    margin-top: 10px;
  width:210px;
  text-overflow: ellipsis;
    overflow: hidden;
  white-space: nowrap;
}

.red{
    color: red;
}

.more_less{
    text-align: center;
}

.mip-showmore-btn{
    text-align: center;
    display: inline-block;
    width: 100%;
    padding: 0px;
    border:none;
    background-color: white !important;
    margin-top: 5px;
  color:#afd03b;
  height:23px;
}

.jieshao_content{
    margin-left: 10px;
    margin-right: 10px;
}

.img_back{
  width: 100%;
  height: 100%;
  background-color: #000;
  top: 0;
  left: 0;
  bottom:0;
  z-index: 99996 !important;
}
.img_div{
  width: 100%;
  position: absolute;
  z-index:99999;
  top: 100px;
  left: 0;
}
.img_div mip-img{
  width: 100%;
}
</style>

<script>

var API = {}
function checkStatus (response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

function parseJSON (response) {
  return response.json()
}

API.wrapRet_ = function (api, opts, fn) {
  console.log('posting to ' + api)
  opts.mip_sid = API.sessionId || ''
  fetch(api, {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(opts)
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(ret => {
      // console.log(ret);
      if (ret.success) fn(true, ret.data)
      else fn(false, ret.error)
    })
    .catch(e => {
      console.error(e.message)
      fn(false, e.message)
    })
}

API.getMasterInfo = function (masterId, fn) {
  API.wrapRet_(
    'https://mip.putibaby.com/api/get_master_info_for_me',
    {
      'master_id': masterId
    },
    fn)
}

API.favMaster = function (masterId, fn) {
  API.wrapRet_(
    'https://mip.putibaby.com/api/fav_master',
    {
      'master_id': masterId
    },
    fn)
}

API.unfavMaster = function (masterId, fn) {
  API.wrapRet_(
    'https://mip.putibaby.com/api/unfav_master',
    {
      'master_id': masterId
    }, fn)
}

API.checkUnionAgain = function (opt, fn) {
  API.wrapRet_(
    'https://mip.putibaby.com/api/check_union_again', {
      'opt': opt
    },
    fn)
}
API.reportVisit = function (zw, city, fn) {
  API.wrapRet_(
    'https://mip.putibaby.com/api/ajax_report_visit', {
      'zw_id': zw,
      'city': city
    },
    fn)
}
export default {

  props: {
    dataJsonstr: {
      type: String,
      default: null
    }
  },
  data () {
    console.log(this)
    var pdata = JSON.parse(this.dataJsonstr)
    pdata.data.info = pdata.data.info || {}
    pdata.data.info.isfav = false
    pdata.data.info.can_online_interview = true
    pdata.data.info.order_desc_str = ''
    return {
      data: pdata.data,
      isLogin: false,
      isUnion: false,
      showImg: false,
      imgUrl: ''
    }
  },
  computed: {

  },
  beforeMount () {
    function getParameterByName (name, url) {
      if (!url) url = window.location.href
      name = name.replace(/[[\]]/g, '\\$&')
      var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)')
      var results = regex.exec(url)
      if (!results) return null
      if (!results[2]) return ''
      return decodeURIComponent(results[2].replace(/\+/g, ' '))
    }
    var qcity = getParameterByName('city') || ''
    qcity = qcity.replace('市', '')
    var cities = ['北京', '天津', '哈尔滨', '武汉', '上海', '长春', '济南', '长沙', '广州', '杭州', '洛阳', '南阳', '深圳', '沈阳', '石家庄', '西安', '湘潭', '徐州', '成都', '南京', '黄石', '郑州', '青岛', '大连', '常州', '唐山', '保定', '秦皇岛', '襄阳', '太原', '昆明', '兰州', '呼和浩特', '乌鲁木齐', '合肥', '南昌', '福州', '厦门', '南宁']
    if (cities.lastIndexOf(qcity) >= 0) {
      this.city = qcity
      console.log(qcity)
    }

    var city = this.city || ''
    API.reportVisit(3, city, function (isOk, res) {
      if (isOk) {
        console.log(res)
      } else {
        console.log(res)
      }
    })
  },
  mounted () {
    console.log('This is master card component !')
    window.MIP.viewer.fixedElement.init()
    var self = this

    window.addEventListener('show-page', () => {
      console.log('show-page')
      if (self.isLogin) {
        API.getMasterInfo(self.data.info.id, function (isOk, data) {
          console.log(data)
          if (isOk) {
            self.$set(self.data.info, 'isfav', data.fav)
            self.$set(self.data.info, 'can_online_interview', data.can_online_interview)
            self.$set(self.data.info, 'order_desc_str', data.order_desc_str)
          // console.log(self);
          } else {
            console.warn(data)
          }
        })
      }
      if (self.isUnion || !self.isLogin) {
        return
      }

      API.checkUnionAgain('', function (isOk, res) {
        if (isOk) {
          console.log(res)
          self.isLogin = res.isLogin
          self.isUnion = res.isUnion
          // MIP.setData({'#isLogin': true})
          // MIP.setData({'#isUnion': event.userInfo.isUnion})
        } else {
          console.log(res)
        }
      })
    })
    window.addEventListener('hide-page', () => {

    })

    this.$element.customElement.addEventAction('logindone', event => {
      // 这里可以输出登录之后的数据

      // 获取用户信息
      console.log(event)
      API.sessionId = event.sessionId

      self.$set(self, 'isLogin', true)
      self.$set(self, 'isUnion', event.userInfo.isUnion)

      var origin = API.next_cmd || event.origin
      console.log(origin)
      API.next_cmd = ''

      if (event.userInfo.isUnion && origin === 'fav') {
        console.log('logindone to fav')
        API.favMaster(self.data.info.id, function (isOk, res) {
          if (isOk) { self.$set(self.data.info, 'isfav', true) }
        })
      } else if (event.userInfo.isUnion && origin === 'update_time') {
        console.log('logindone to update_time')
        window.MIP.viewer.open(MIP.util.makeCacheUrl('https://mip.putibaby.com/update_time_mip?mcode=' + self.data.codeid), {})
      } else if (event.userInfo.isUnion && origin === 'order_list') {
        console.log('logindone to order_list')
        window.MIP.viewer.open(MIP.util.makeCacheUrl('https://mip.putibaby.com/order_list'), {})
      } else if (origin === 'fav' && !event.userInfo.isUnion) {
        console.log('go to submit_ph')
        window.MIP.viewer.open(MIP.util.makeCacheUrl('https://mip.putibaby.com/submit_ph?to=' + encodeURIComponent(window.location.href)), {})
      } else if (origin && !event.userInfo.isUnion) {
        console.log('go to submit_ph')
        if (origin === 'update_time') {
          console.log('submit_ph to update_time')
          var to = 'https://mip.putibaby.com/update_time_mip?mcode=' + self.data.codeid
          window.MIP.viewer.open(MIP.util.makeCacheUrl(
            'https://mip.putibaby.com/submit_ph?to=' + encodeURIComponent(to)), {})

          window.MIP.viewer.open(MIP.util.makeCacheUrl(), {})
        } else {
          console.log('submit_ph to' + origin)
          var to2 = 'https://mip.putibaby.com/' + origin
          window.MIP.viewer.open(MIP.util.makeCacheUrl(
            'https://mip.putibaby.com/submit_ph?to=' + encodeURIComponent(to2)), {})
        }
      } else {
        console.log('no op while logindone')
      }

      API.getMasterInfo(self.data.info.id, function (isOk, data) {
        if (isOk) {
          self.$set(self.data.info, 'isfav', data.fav)
          self.$set(self.data.info, 'can_online_interview', data.can_online_interview)
          self.$set(self.data.info, 'order_desc_str', data.order_desc_str)
          // console.log(self);
        } else {
          console.warn(data)
        }
      })
    })
  },
  methods: {
    init () {
      console.log('should loading')
      console.log(this.dataJson)
      this.reload_()
    },
    created () {
      this.reload_()
    },

    checkLogin_ (cmd) {
      if (!this.isLogin) {
        // API.next_cmd = cmd
        // sessionStorage.next_cmd = cmd
        // this.$emit('login')
        if (cmd === 'fav') {
          this.$emit('login1')
        } else if (cmd === 'order_list') {
          this.$emit('login2')
        } else if (cmd === 'update_time') {
          this.$emit('login3')
        }
        return false
      }
      if (!this.isUnion) {
        var to = '/' + cmd
        console.log(to)
        if (cmd === 'fav') {
          window.MIP.viewer.open(MIP.util.makeCacheUrl('https://mip.putibaby.com/submit_ph?to=' + encodeURIComponent(window.location.href)), {})
        } else if (cmd === 'order_list') {
          window.MIP.viewer.open(MIP.util.makeCacheUrl('https://mip.putibaby.com/submit_ph?to=' + encodeURIComponent(to)), {})
        } else if (cmd === 'update_time') {
          to = 'https://mip.putibaby.com/update_time_mip?mcode=' + this.data.codeid
          window.MIP.viewer.open(MIP.util.makeCacheUrl('https://mip.putibaby.com/submit_ph?to=' + encodeURIComponent(to)), {})
        }

        return false
      }

      return true
    },

    reload_ () {
      console.log('reloading')
    },
    handleUpdateTime () {
      console.log('handleUpdateTime')

      if (!this.checkLogin_('update_time')) { return }

      window.MIP.viewer.open(MIP.util.makeCacheUrl('https://mip.putibaby.com/update_time_mip?mcode=' + this.data.codeid), {})
    },
    handleOrderList () {
      console.log('handleOrderList')
      if (!this.checkLogin_('order_list')) { return }
      window.MIP.viewer.open(MIP.util.makeCacheUrl('https://mip.putibaby.com/order_list'), {})
    },
    handleFav () {
      console.log('handleFav')

      if (this.data.info.isfav) {
        if (!this.checkLogin_('unfav')) return
        this.$set(this.data.info, 'isfav', false)
        console.log(this.data.info)
        console.log('unFav')
        API.unfavMaster(this.data.info.id, this.reload_)
      } else {
        if (!this.checkLogin_('fav')) return

        this.$set(this.data.info, 'isfav', true)
        console.log(this.data.info)
        console.log('Fav')
        API.favMaster(this.data.info.id, this.reload_)
      }
    },
    load_data () {
      console.log('should set data')
    },
    show (e) {
      this.showImg = true
      this.imgUrl = e
    },
    hideImg () {
      this.showImg = false
    },
    noop () {
    }
  }

}
</script>
