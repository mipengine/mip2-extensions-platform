<template type="mip-mustache">
  <div class="mip-search">
    <!-- 占位符 -->
    <div style="height:44px;"/>
    <mip-fixed
      class="fixbox"
      type="top"
      left="0px">
      <div class="header">
        <div class="search">
          <i class="iconfont">&#xe6a8;</i>
          <div class="inpout"><input
            v-model="hotelname"
            type="text"
            placeholder="找餐厅"
            @focus="search"></div>
        </div>
        <span>搜索</span>
      </div>
      <!-- 没有搜索到相关内容 -->
      <div class="none">没有找到相关内容</div>
    </mip-fixed>
    <!-- 没有搜索到相关内容的占位符 -->
    <div style="height: 56px;"/>
    <div style="margin-top: 10px;">
      <!-- 没有搜索到相关内容时的平台推荐 -->
      <mip-fixed
        type="top"
        left="0px"
        class="recommend"><h3>平台推荐</h3></mip-fixed>
      <div style="height: 41px;"/>
      <!-- 餐厅列表 -->
      <ul class="hotellist">
        <li
          v-for="hotel in hotels"
          :key="hotel.id">
          <mip-img
            class="hotelimg"
            width="115"
            height="76"
            src="http://fs.kebide.com/2016/11/18/858eca3a7ab44df88ac2c12312a18de9.jpg"
          />
          <div class="hotelmes">
            <p>{{ hotel.name }}</p>
            <p><i>人均{{ hotel.price }}元</i>|<i>{{ hotel.type }}</i></p>
            <div class="address"><a href="details.html">预定</a><p><i class="iconfont">&#xe628;</i>{{ hotel.address }}</p></div>
          </div>
        </li>
      </ul>
      <p class="bot"><i/><span>我是有底线的</span></p>
    </div>
  </div>
</template>

<style scoped>
li{
    list-style: none;
}
i{
    font-style: normal;
}
/* 搜索框 */
.fixbox{
    width: 100%;
    background: #F0F0F8;
    top: 44px;
    z-index: 5;
}
.header{
    background: #FFFFFF;
    height: 38px;
    padding-top: 6px;
    font-size: 15px;
    color: #000000;
}
.header span{
    display: inline-block;
    width: 12%;
    text-align: center;
}
.header .search{
    display: inline-block;
    width: 78%;
    margin-left: 5%;
    height: 30px;
    border: 1px solid #DCDCE2;
    border-radius: 4px;
    line-height: 30px;
}
.header .search i{
    color: #BEBEBE;
    margin-left: 5px;
    float: left;
}
.header .search .inpout{
    margin-left: 30px;
}
.header .search .inpout input{
    height: 28px;
    outline: none;
    border: none;
    width: 100%;
}
/* 没有搜索信息 */
.none{
    height: 56px;
    line-height: 56px;
    background: #FFFFFF;
    color: #999999;
    font-size: 13px;
    text-align: center;
}
/* 没有搜索到相关内容时的平台推荐 */
.recommend{
    background: #F0F0F8;
    padding-top: 10px;
    top: 144px;
}
.recommend h3{
    font-weight: normal;
    font-size: 16px;
    height: 40px;
    line-height: 40px;
    color: #00C093;
    background: #FFFFFF;
    padding-left: 15px;
    border-bottom: 1px solid #DCDCDC;
}
/* 餐厅列表 */
.hotellist{
    padding: 0 15px;
    background: #FFFFFF;
}
.hotellist li{
    padding: 19px 0;
    border-bottom: 1px solid #F0F0F8;
    overflow: hidden;
}
.hotellist li .hotelimg{
    float: left;
}
.hotellist li .hotelmes{
    margin-left: 120px;
    height: 80px;
}
.hotellist li .hotelmes p:nth-of-type(1){
    color: #333333;
    font-size: 16px;
}
.hotellist li .hotelmes p:nth-of-type(2){
    color: #DCDCDC;
    height: 24px;
    line-height: 24px;
    font-size: 13px;
}
.hotellist li .hotelmes p:nth-of-type(2) i:nth-of-type(1){
    color: #FD8F14;
    padding-right: 5px;
}
.hotellist li .hotelmes p:nth-of-type(2) i:nth-of-type(2){
    color: #666666;
    padding-left: 5px;
}
.hotellist li .hotelmes .address a{
    width: 70px;
    height: 26px;
    line-height: 26px;
    color: #FFFFFF;
    text-align: center;
    float: right;
    background: #00C093;
    border-radius: 2px;
    border: none;
}
.hotellist li .hotelmes .address p{
    margin-right: 80px;
    color: #999999;
    font-size: 13px;
}
.hotellist li:last-child{
    border-bottom: none;
}
/* 底部样式 */
.bot{
    position: relative;
    width: 90%;
    margin: 10px 5%;
    padding-bottom: 20px;
}
.bot i{
    height: 1px;
    background: #DCDCE2;
    width: 100%;
    position: absolute;
    top: 7px;
    left: 0;
}
.bot span{
    color: #DCDCE2;
    background: #F0F0F8;
    position: absolute;
    font-size: 10px;
    padding: 0 10px;
    top: 0px;
    left: 50%;
    transform: translateX(-50%);
}
</style>

<script>
export default{
  data () {
    return {
      hotels: [
        {id: 1, name: '万龙洲海鲜大酒店(望京店)', price: '43', type: '粤菜', address: '朝阳区新源南路12号三层2号新店'},
        {id: 2, name: '金源酒店(望京店)', price: '43', type: '粤菜', address: '朝阳区新源南路12号'},
        {id: 3, name: '金源酒店(丽泽店)', price: '43', type: '粤菜', address: '朝阳区新源南路12号'}
      ]
    }
  }
}
</script>
