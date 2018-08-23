<template>
  <div>
    <mip-fixed
      type="top"
      class="header_tab">
      <div class="header">
        <table class="sousuo_table">
          <tbody>
            <tr>
              <td class="ss_city_td">

                <span
                  v-if="filter.city=='' || !filter.city"
                  id="btn-open"
                  on="tap:my-lightbox2.toggle"
                  class="city_btn"
                  role="button"
                  tabindex="0">北京</span>
                <span
                  v-else
                  id="btn-open"
                  on="tap:my-lightbox2.toggle"
                  class="city_btn"
                  role="button"
                  tabindex="0">{{ filter.city }}</span>

              </td>
              <td class="sousuo_td">
                <form
                  id="searchform"
                  @submit.prevent="submit">
                  <input
                    v-model="filter.kw"
                    type="search"
                    name="kw"
                    class="kw"
                    validatetarget="kw"
                    placeholder="输入月嫂的姓名搜索"
                    @keyup.enter.prevent="search"></form>
                <mip-img
                  width="14px"
                  height="14px"
                  class="sousuo_icon mip-element mip-layout-container mip-img-loaded"
                  src="https://mip.putibaby.com/i/sousuo.png" />

                <a
                  class="person"
                  @click="handleOrderList">
                  <slot name="me"/>
                </a>
              </td>
            </tr>
          </tbody>
        </table>

        <table
          id="sortbar"
          class="sort_by"
          data-sort_by="">
          <tbody>
            <tr>
              <td
                id="sortZH"
                class="sort_td checked"
                @click="sortClick('zh')">
                <mip-img
                  v-if="filter.sort_by == '' || !filter.sort_by"
                  src="https://mip.putibaby.com/i/zh_g.png" />
                <mip-img
                  v-else
                  src="https://mip.putibaby.com/i/zh.png" />
              </td>
              <td
                id="sortPrice"
                class="sort_td"
                @click="sortClick('jg')">
                <mip-img
                  v-if="filter.sort_by == 'price_asc'"
                  src="https://mip.putibaby.com/i/jgs_g.png" />
                <mip-img
                  v-else-if="filter.sort_by == 'price_desc'"
                  src="https://mip.putibaby.com/i/jgx_g.png" />
                <mip-img
                  v-else
                  src="https://mip.putibaby.com/i/jgx.png" />
              </td>
              <td
                id="sortJY"
                class="sort_td"
                @click="sortClick('jy')">
                <mip-img
                  v-if="filter.sort_by == 'jy_asc'"
                  src="https://mip.putibaby.com/i/jys_g.png" />
                <mip-img
                  v-else-if="filter.sort_by == 'jy_desc'"
                  src="https://mip.putibaby.com/i/jyx_g.png" />
                <mip-img
                  v-else
                  src="https://mip.putibaby.com/i/jyx.png" />
              </td>
              <td
                id="sortAge"
                class="sort_td"
                @click="sortClick('age')">
                <mip-img
                  v-if="filter.sort_by == 'age_desc'"
                  src="https://mip.putibaby.com/i/nlx_g.png" />
                <mip-img
                  v-else-if="filter.sort_by == 'age_asc'"
                  src="https://mip.putibaby.com/i/nls_g.png" />
                <mip-img
                  v-else
                  src="https://mip.putibaby.com/i/nls.png" />
              </td>
              <td
                class="shaixuan_btn"
                on="tap:right-sidebar.open">
                <mip-img src="https://mip.putibaby.com/i/sx.png" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </mip-fixed>
    <mip-lightbox
      id="my-lightbox2"
      type="top"
      still
      layout="nodisplay"
      content-scroll>

      <div class="mip-fill-content">
        <div class="lightbox">
          <table class="city_title">
            <tbody>
              <tr>
                <td>已开通服务的城市：</td>
              </tr>
            </tbody>
          </table>
          <table
            id="citybar"
            class="citybar"
            data-city=""
            @click="setCity">

            <tbody>
              <tr>
                <td
                  class="citytd"
                >北京</td>
                <td
                  class="citytd"
                >天津</td>
                <td
                  class="citytd"
                >哈尔滨</td>
                <td
                  class="citytd"
                >武汉</td>
              </tr>
              <tr>
                <td
                  class="citytd"
                >上海</td>
                <td
                  class="citytd"
                >长春</td>
                <td
                  class="citytd"
                >济南</td>
                <td
                  class="citytd"
                >长沙</td>
              </tr>
              <tr>
                <td
                  class="citytd"
                >广州</td>
                <td
                  class="citytd"
                >杭州</td>
                <td
                  class="citytd"
                >洛阳</td>
                <td
                  class="citytd"
                >南阳</td>
              </tr>
              <tr>
                <td
                  class="citytd"
                >深圳</td>
                <td
                  class="citytd"
                >沈阳</td>
                <td
                  class="citytd"
                >石家庄</td>
                <td
                  class="citytd"
                >西安</td>
              </tr>
              <tr>
                <td
                  class="citytd"
                >湘潭</td>
                <td
                  class="citytd"
                >徐州</td>
                <td
                  class="citytd"
                >成都</td>
                <td
                  class="citytd"
                >南京</td>
              </tr>
              <tr>
                <td
                  class="citytd"
                >黄石</td>
                <td
                  class="citytd"
                >郑州</td>
                <td
                  class="citytd"
                >青岛</td>
                <td
                  class="citytd"
                >大连</td>
              </tr>
              <tr>
                <td
                  class="citytd"
                >常州</td>
                <td
                  class="citytd"
                >唐山</td>
                <td
                  class="citytd"
                >保定</td>
                <td
                  class="citytd"
                >秦皇岛</td>
              </tr>
              <tr>
                <td
                  class="citytd"
                >呼和浩特</td>
                <td
                  class="citytd"
                >乌鲁木齐</td>
                <td
                  class="citytd"
                >合肥</td>
                <td
                  class="citytd"
                >南昌</td>
              </tr>
              <tr>
                <td
                  class="citytd"
                >福州</td>
                <td
                  class="citytd"
                >厦门</td>
                <td
                  class="citytd"
                >香港</td>
                <td
                  class="citytd"
                >南宁</td>
              </tr>
            </tbody>
          </table>
          <span
            id="lightbox-close"
            class="lightbox-close_qx"
            on="tap:my-lightbox2.toggle">取消</span>

          <span
            id="lightbox-close"
            class="lightbox-close"
            on="tap:my-lightbox2.toggle tap:selectmaster.do_cityok">确认</span>
        </div>
      </div>
    </mip-lightbox>
    <div class="root">

      <mip-sidebar
        id="right-sidebar"
        layout="nodisplay"
        side="right"
        class="mip-hidden">
        <table class="yssxtj_table">
          <tbody>
            <tr>
              <td class="yssxtj">月嫂筛选条件</td>
            </tr>
          </tbody>
        </table>
        <table class="hidden-table hidden-table_top">

          <tbody>
            <tr>
              <td>上户类型：</td>

              <td class="qt_td"><span
                id="qtbtn"
                class="radio_btn radio_check"
                @click="clickQuantian">全天</span></td>
              <td class="bb_td"><span
                id="bbbtn"
                class="radio_btn"
                @click="clickBaiban">白班</span></td>

            </tr>
          </tbody>
        </table>
        <table class="hidden-table">
          <tbody>
            <tr>
              <td class="ycq_td">预产期：</td>
              <td><input
                v-model="filter2.ycq"
                type="date"
                class="ycq"
                name="ycq"></td>
            </tr>
            <tr>
              <td>上户城市：</td>
              <td>
                <select
                  v-model="filter2.city"
                  name="city"
                  class="city">
                  <option value="">不限</option>
                  <option value="北京">北京</option>
                  <option value="天津">天津</option>
                  <option value="哈尔滨">哈尔滨</option>
                  <option value="武汉">武汉</option>
                  <option value="上海">上海</option>
                  <option value="长春">长春</option>
                  <option value="济南">济南</option>
                  <option value="长沙">长沙</option>
                  <option value="广州">广州</option>
                  <option value="杭州">杭州</option>
                  <option value="洛阳">洛阳</option>
                  <option value="南阳">南阳</option>
                  <option value="深圳">深圳</option>
                  <option value="沈阳">沈阳</option>
                  <option value="石家庄">石家庄</option>
                  <option value="西安">西安</option>
                  <option value="湘潭">湘潭</option>
                  <option value="徐州">徐州</option>
                  <option value="成都">成都</option>
                  <option value="南京">南京</option>
                  <option value="黄石">黄石</option>
                  <option value="郑州">郑州</option>
                  <option value="青岛">青岛</option>
                  <option value="大连">大连</option>
                  <option value="常州">常州</option>
                  <option value="唐山">唐山</option>
                  <option value="保定">保定</option>
                  <option value="秦皇岛">秦皇岛</option>
                  <option value="襄阳">襄阳</option>
                  <option value="太原">太原</option>
                  <option value="昆明">昆明</option>
                  <option value="兰州">兰州</option>
                  <option value="呼和浩特">呼和浩特</option>
                  <option value="乌鲁木齐">乌鲁木齐</option>
                  <option value="合肥">合肥</option>
                  <option value="南昌">南昌</option>
                  <option value="福州">福州</option>
                  <option value="厦门">厦门</option>
                  <option value="香港">香港</option>
                  <option value="南宁">南宁</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>月嫂籍贯：</td>
              <td>
                <select
                  v-model="filter2.jiguan"
                  name="jiguan"
                  class="jiguan">

                  <option value="">不限</option>

                  <option value="北京">北京</option>
                  <option value="天津">天津</option>
                  <option value="上海">上海</option>
                  <option value="重庆">重庆</option>
                  <option value="新疆">新疆</option>
                  <option value="内蒙古">内蒙古</option>
                  <option value="黑龙江">黑龙江</option>
                  <option value="西藏">西藏</option>
                  <option value="青海">青海</option>
                  <option value="甘肃">甘肃</option>
                  <option value="宁夏">宁夏</option>
                  <option value="山西">山西</option>
                  <option value="陕西">陕西</option>
                  <option value="河北">河北</option>
                  <option value="辽宁">辽宁</option>
                  <option value="吉林">吉林</option>
                  <option value="山东">山东</option>
                  <option value="河南">河南</option>
                  <option value="湖北">湖北</option>
                  <option value="四川">四川</option>
                  <option value="贵州">贵州</option>
                  <option value="云南">云南</option>
                  <option value="广西">广西</option>
                  <option value="广东">广东</option>
                  <option value="福建">福建</option>
                  <option value="湖南">湖南</option>
                  <option value="江西">江西</option>
                  <option value="浙江">浙江</option>
                  <option value="江苏">江苏</option>
                  <option value="海南">海南</option>
                  <option value="安徽">安徽</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>

        <table class="hidden-table">
          <tbody>
            <tr>
              <td>期望价格：</td>
              <td>
                <select
                  v-model="filter2.priceFromSel"
                  name="priceFromSel"
                  class="priceFromSel">
                  <option
                    selected=""
                    value="0">0元</option>

                  <option
                    selected="true"
                    value="0">
                    0元
                  </option>

                  <option value="1000">
                    1000元
                  </option>

                  <option value="2000">
                    2000元
                  </option>

                  <option value="3000">
                    3000元
                  </option>

                  <option value="4000">
                    4000元
                  </option>

                  <option value="5000">
                    5000元
                  </option>

                  <option value="6000">
                    6000元
                  </option>

                  <option value="7000">
                    7000元
                  </option>

                  <option value="8000">
                    8000元
                  </option>

                  <option value="9000">
                    9000元
                  </option>

                  <option value="10000">
                    10000元
                  </option>

                  <option value="11000">
                    11000元
                  </option>

                  <option value="12000">
                    12000元
                  </option>

                  <option value="13000">
                    13000元
                  </option>

                  <option value="14000">
                    14000元
                  </option>

                  <option value="15000">
                    15000元
                  </option>

                  <option value="16000">
                    16000元
                  </option>

                  <option value="17000">
                    17000元
                  </option>

                  <option value="18000">
                    18000元
                  </option>

                  <option value="19000">
                    19000元
                  </option>

                  <option value="20000">
                    20000元
                  </option>

                  <option value="21000">
                    21000元
                  </option>

                  <option value="22000">
                    22000元
                  </option>

                  <option value="23000">
                    23000元
                  </option>

                  <option value="24000">
                    24000元
                  </option>

                  <option value="25000">
                    25000元
                  </option>

                  <option value="26000">
                    26000元
                  </option>

                  <option value="27000">
                    27000元
                  </option>

                  <option value="28000">
                    28000元
                  </option>

                  <option value="29000">
                    29000元
                  </option>

                  <option value="30000">
                    30000元
                  </option>

                  <option value="31000">
                    31000元
                  </option>

                  <option value="32000">
                    32000元
                  </option>

                  <option value="33000">
                    33000元
                  </option>

                  <option value="34000">
                    34000元
                  </option>

                  <option value="35000">
                    35000元
                  </option>

                  <option value="36000">
                    36000元
                  </option>

                  <option value="37000">
                    37000元
                  </option>

                  <option value="38000">
                    38000元
                  </option>

                  <option value="39000">
                    39000元
                  </option>

                  <option value="40000">
                    40000元
                  </option>

                  <option value="41000">
                    41000元
                  </option>

                  <option value="42000">
                    42000元
                  </option>

                  <option value="43000">
                    43000元
                  </option>

                  <option value="44000">
                    44000元
                  </option>

                  <option value="45000">
                    45000元
                  </option>

                  <option value="46000">
                    46000元
                  </option>

                  <option value="47000">
                    47000元
                  </option>

                  <option value="48000">
                    48000元
                  </option>

                  <option value="49000">
                    49000元
                  </option>

                  <option value="50000">
                    50000元
                  </option>

                </select>
              </td>
              <td><span class="from_to">到</span></td>
              <td>
                <select
                  v-model="filter2.priceToSel"
                  name="priceToSel"
                  class="priceToSel">
                  <option
                    selected=""
                    value="50000">50000元</option>

                  <option value="0">
                    0元
                  </option>

                  <option value="1000">
                    1000元
                  </option>

                  <option value="2000">
                    2000元
                  </option>

                  <option value="3000">
                    3000元
                  </option>

                  <option value="4000">
                    4000元
                  </option>

                  <option value="5000">
                    5000元
                  </option>

                  <option value="6000">
                    6000元
                  </option>

                  <option value="7000">
                    7000元
                  </option>

                  <option value="8000">
                    8000元
                  </option>

                  <option value="9000">
                    9000元
                  </option>

                  <option value="10000">
                    10000元
                  </option>

                  <option value="11000">
                    11000元
                  </option>

                  <option value="12000">
                    12000元
                  </option>

                  <option value="13000">
                    13000元
                  </option>

                  <option value="14000">
                    14000元
                  </option>

                  <option value="15000">
                    15000元
                  </option>

                  <option value="16000">
                    16000元
                  </option>

                  <option value="17000">
                    17000元
                  </option>

                  <option value="18000">
                    18000元
                  </option>

                  <option value="19000">
                    19000元
                  </option>

                  <option value="20000">
                    20000元
                  </option>

                  <option value="21000">
                    21000元
                  </option>

                  <option value="22000">
                    22000元
                  </option>

                  <option value="23000">
                    23000元
                  </option>

                  <option value="24000">
                    24000元
                  </option>

                  <option value="25000">
                    25000元
                  </option>

                  <option value="26000">
                    26000元
                  </option>

                  <option value="27000">
                    27000元
                  </option>

                  <option value="28000">
                    28000元
                  </option>

                  <option value="29000">
                    29000元
                  </option>

                  <option value="30000">
                    30000元
                  </option>

                  <option value="31000">
                    31000元
                  </option>

                  <option value="32000">
                    32000元
                  </option>

                  <option value="33000">
                    33000元
                  </option>

                  <option value="34000">
                    34000元
                  </option>

                  <option value="35000">
                    35000元
                  </option>

                  <option value="36000">
                    36000元
                  </option>

                  <option value="37000">
                    37000元
                  </option>

                  <option value="38000">
                    38000元
                  </option>

                  <option value="39000">
                    39000元
                  </option>

                  <option value="40000">
                    40000元
                  </option>

                  <option value="41000">
                    41000元
                  </option>

                  <option value="42000">
                    42000元
                  </option>

                  <option value="43000">
                    43000元
                  </option>

                  <option value="44000">
                    44000元
                  </option>

                  <option value="45000">
                    45000元
                  </option>

                  <option value="46000">
                    46000元
                  </option>

                  <option value="47000">
                    47000元
                  </option>

                  <option value="48000">
                    48000元
                  </option>

                  <option value="49000">
                    49000元
                  </option>

                  <option value="50000">
                    50000元
                  </option>

                </select>
              </td>
            </tr>

            <tr>
              <td>年龄要求:</td>
              <td>
                <select
                  v-model="filter2.ageFromSel"
                  name="ageFromSel"
                  class="ageFromSel">
                  <option
                    selected=""
                    value="20">20岁</option>

                  <option
                    selected="true"
                    value="20">
                    20岁
                  </option>

                  <option value="25">
                    25岁
                  </option>

                  <option value="30">
                    30岁
                  </option>

                  <option value="35">
                    35岁
                  </option>

                  <option value="40">
                    40岁
                  </option>

                  <option value="45">
                    45岁
                  </option>

                  <option value="50">
                    50岁
                  </option>

                  <option value="55">
                    55岁
                  </option>

                </select>
              </td>
              <td><span class="from_to">到</span></td>
              <td>
                <select
                  v-model="filter2.ageToSel"
                  name="ageToSel"
                  class="ageToSel">
                  <option
                    selected=""
                    value="55">55岁</option>

                  <option value="20">
                    20岁
                  </option>

                  <option value="25">
                    25岁
                  </option>

                  <option value="30">
                    30岁
                  </option>

                  <option value="35">
                    35岁
                  </option>

                  <option value="40">
                    40岁
                  </option>

                  <option value="45">
                    45岁
                  </option>

                  <option value="50">
                    50岁
                  </option>

                  <option value="55">
                    55岁
                  </option>

                </select>
              </td>
            </tr>

            <tr>
              <td>从业年限:</td>
              <td>
                <select
                  v-model="filter2.workYearFromSel"
                  name="workYearFromSel"
                  class="workYearFromSel">
                  <option
                    selected=""
                    value="1">1年</option>

                  <option
                    selected="true"
                    value="1">
                    1年
                  </option>

                  <option value="2">
                    2年
                  </option>

                  <option value="3">
                    3年
                  </option>

                  <option value="4">
                    4年
                  </option>

                  <option value="5">
                    5年
                  </option>

                  <option value="6">
                    6年
                  </option>

                  <option value="7">
                    7年
                  </option>

                  <option value="8">
                    8年
                  </option>

                  <option value="9">
                    9年
                  </option>

                  <option value="10">
                    10年
                  </option>

                </select>
              </td>
              <td><span class="from_to">到</span></td>
              <td>
                <select
                  v-model="filter2.workYearToSel"
                  name="workYearToSel"
                  class="workYearToSel">

                  <option
                    selected=""
                    value="">不限</option>

                  <option value="1">
                    1年
                  </option>

                  <option value="2">
                    2年
                  </option>

                  <option value="3">
                    3年
                  </option>

                  <option value="4">
                    4年
                  </option>

                  <option value="5">
                    5年
                  </option>

                  <option value="6">
                    6年
                  </option>

                  <option value="7">
                    7年
                  </option>

                  <option value="8">
                    8年
                  </option>

                  <option value="9">
                    9年
                  </option>

                  <option value="10">
                    10年
                  </option>

                </select>
              </td>
            </tr>
          </tbody>
        </table>
        <span
          class="quxiao"
          on="tap:right-sidebar.close  tap:selectmaster.docancel">取消</span>
        <span
          class="queding"
          on="tap:right-sidebar.close tap:selectmaster.dook">确定</span>
      </mip-sidebar>
      <mip-fixed
        v-if="state.isGif"
        still
        type="top"
        top="250px">
        <div
          class="gif">
          <mip-img
            layout="fixed"
            width="110"
            height="110"
            src="https://mip.putibaby.com/i/jiazai.gif"/>
        </div>
      </mip-fixed>
      <div
        v-if="list.length > 0"
        id="cardList"
        class="cardList">
        <div
          v-for="m in list"
          :key="m.id">
          <div class="masterCard">
            <a
              :href="'master_card?mcode='+m.id"
              mip-link>
              <div class="div-padding">
                <mip-img
                  :src="m.header.small"
                  layout="responsive"
                  width="70"
                  height="70"
                  class="mC_header" />
                <div class="mC_info">
                  <p class="mC_masterName">{{ m.name }}</p>
                  <p class="starBox">
                    <span
                      v-for="idx in [1,2,3,4,5]"
                      :key="idx">
                      <mip-img
                        v-if="idx <= m.star"
                        layout="responisve"
                        width="12px"
                        height="12px"
                        class="star"
                        src="https://mip.putibaby.com/i/select_master_star.png"/>
                      <mip-img
                        v-else
                        layout="responisve"
                        width="12px"
                        height="12px"
                        class="star"
                        src="https://mip.putibaby.com/i/select_master_unstar.png"/>
                    </span>

                  </p>
                  <div class="mC_Des">
                    <span>
                      <mip-img
                        layout="responsive"
                        width="11"
                        height="11"
                        class="icon"
                        src="https://mip.putibaby.com/i/age.png"/>
                      {{ m.desc_list_0 }}</span>
                    <span><mip-img
                      layout="responsive"
                      width="11"
                      height="11"
                      class="icon"
                      src="https://mip.putibaby.com/i/work_year.png"/>
                      {{ m.desc_list_2 }}</span>
                    <span><mip-img
                      layout="responsive"
                      width="11"
                      height="11"
                      class="icon"
                      src="https://mip.putibaby.com/i/jiguan.png"/>
                      {{ m.desc_list_1 }}</span>
                  </div>
                  <span class="ptgPrice"><b>￥{{ m.ptg_price }}</b></span>
                </div>
              </div>
            </a>
          </div>
        </div>
        <div class="mip-infinitescroll-results" />
        <div class="bg">
          <div
            v-if="!state.isGif"
            class="mip-infinitescroll-loading"
            @click="loadMoreClick">
            <p>{{ state.loadMessage }}</p>
          </div>
        </div>

      </div>

    </div>

    <mip-fixed
      type="right"
      bottom="50px"
      class="rec_a">
      <a @click="handleCustom">
        <slot name="bwtj"/>
      </a>
    </mip-fixed>

  </div>
</template>

<style scoped>
  .gif{
    width: 100%;
    text-align: center;
    margin-top: 200px;
  }
  .gif mip-img{
    width: 130px;
    height: 130px;
    margin: 0 auto;
  }
  .wrapper {
    margin: 0 auto;
    text-align: center;
  }

  .no {
    display: none;
  }

  .has {
    display: inline-block;
  }

  mip-img.head_image {
    height: 50px;
    width: 50px;
    position: absolute;
    left: 10px;
    top: 20px;
    border-radius: 5px;
    border: 0;
  }

  .root {
    padding: 0% 2.5%;
    margin-top: 90px;
  }

  .cardList{

  }
  .cardList .masterCard {
    width: 100%;
    height: 70px;
    margin: 10px 0;
    border-radius: 3px;
    background-color: white;
    position: relative;
    box-shadow:0px 5px 10px rgba(175,208,59,0.1);

  }

  .cardList .masterCard .mC_header {
    width: 70px;
    height: 70px;
    border-top-left-radius:2px;
    border-bottom-left-radius:2px;
  }

  .cardList .masterCard .mC_info {
    display: inline-block;
    vertical-align: top;
    padding-left: 8px;
    width: 80%;
    margin-top: -55px;
  }

  .cardList .masterCard .mC_info .mC_masterName {
    font-size: 16px;
    color: #333;
    display: inline-block;
    margin: -5px 69px;
  }

  .cardList .masterCard .mC_info .starBox {
    width: 90px;
    height: 16px;
    position: absolute;
    left: 135px;
    margin-top: -18px;
  }

  .cardList .masterCard .mC_info .starBox mip-img {
    width: 10px;
    height: 10px;
    display: inline-block;
    margin-left: 2px;
  }

  .cardList .masterCard .mC_info .mC_Des {
    width: 100%;
    margin-top: 5px;
    margin-left: 70px;
  }

  .cardList .masterCard .mC_info .mC_Des mip-img {
    display: inline-block;
  }

  .cardList .masterCard .mC_info .mC_Des span {
    color: #999;
    display: inline-block;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    font-size: 13px;
  }

  .cardList .masterCard .mC_info .mC_Des span:nth-of-type(1) {
    /*width: 30px;*/
  }

  .cardList .masterCard .mC_info .mC_Des span:nth-of-type(2) {
    /*width: 60px;*/
    /*margin-left:10%;*/
  }

  .cardList .masterCard .mC_info .mC_Des span:nth-of-type(3) {
    width: 70px;
    /*float: right;*/
    /*margin-right: 10px;*/
  }

  .cardList .masterCard .mC_info .mC_Des .icon {
    width: 11px;
    height: 11px;
    margin-top: -4px;
  }

  .ptgPrice {
    font-size: 16px;
    color: red;
    position: absolute;
    right: 8px;
    top: 10px;
  }

  .cardList .masterCard .mC_price .priceRight {
    float: right;
    margin-right: 10px;
    line-height: 32px;
  }

  .line {
    /* background: url('/i/show_master_card_footer_hb.png'); */
    width: 100%;
    height: 2px;
    background-size: contain;
    margin-top: 3px;
  }

  .shlxRow {
    min-height: 90px;
  }

  .kw {
    width: 85%;
    /*margin-left:1%;*/
    height: 28px;
    border: 0px solid white;
    font-size: 14px !important;
    background-color: #F1F1F2;
    padding-right: 0px !important;
    padding-left: 30px;
    float: left;
    color: #b2b2b2;
    border-radius: 5px;
  }

  .sousuo {
    height: 28px;
    background-color: #fff !important;
    font-size: 13px !important;
    border: none !important;
    display: inline-block !important;
    text-align: center;
    color: #afd03b !important;
    line-height: 28px;
    margin-left: 5px;
  }

  .sousuo_td {
    position: relative;
  }

  .ss_city_td {
    width: 75px;
    text-align: center;
  }

  .sousuo_icon {
    /* width: 14px; */
    /* height: 14px; */
    position: absolute;
    left: 10px;
    top: 7px;
  }

  .hidden-table select {
    -webkit-appearance: none;
    color: #666;
    width: 75px;
    border-radius: 3px;
    font-size: 14px;
    height: 30px;
    /* background-image: url('/i/sel_back.png'); */
    background-size: 8px 14px;
    background-repeat: no-repeat;
    background-position: 60px;
    background-color: #fff;
    line-height: 17px;
    border: solid 1px #ddd;
    padding-left: 5px;
  }

  .hidden-table_top {
    /*margin-top: 50px;*/
  }

  .hidden-table tr td {
    height: 50px;
    font-size: 14px;
  }

  .shaixuan {
    width: 40px;
    height: 30px;
    display: inline-block;
    line-height: 32px;
    text-align: center;
    border: solid 1px #ddd;
    border-radius: 5px;
    margin-left: 5px;
    font-size: 14px;
  }

  .priceFromSel {
    width: 70px;
  }

  .priceToSel {
    width: 83px;
  }

  #right-sidebar {
    width: 300px;
    padding-left: 10px;
    background-color: #fff;
    color: #999;
  }

  .quxiao {
    background-color: #fff !important;
    color: #afd03b !important;
    margin-left: 5%;
    width: 108px;
    display: inline-block;
    text-align: center;
    line-height: 36px;
    height: 36px;
    border-radius: 3px;
    border: 1px solid #afd03b;
    margin-top: 40px;
  }

  .queding {
    background-color: #afd03b !important;
    color: #fff !important;
    display: inline-block;
    margin-left: 5%;
    width: 108px;
    height: 36px;
    font-size: 14px;
    margin-top: 39px;
    border-radius: 3px;
    border: none;
    text-align: center;
    line-height: 36px;
  }

  .sort_by {
    width: 100%;
    text-align: center;
    margin-top: 7px;
    background-color: #fff;
    border-collapse: collapse;
  }

  .sort_by td {
    border-right: solid 1px #f4f4f4;
    padding-left: 0px;
    font-size: 13px;
    width: 20%;
   text-align:center;
  }

  .sort_td .checked {
    background-color: #AFD03B;
    color: #fff;
    border-right: solid 1px #f4f4f4;
  }

  .sort_by td mip-img {
    width: 100%;
    margin: 0 auto;
  }

  .lightbox {
    display: block;
    background-color: #fff;
    width: 90%;
    margin-left: 5%;
    padding: 0;
    /*height: 300px;*/
    margin-top: 100px;
    border-radius: 5px;
    padding-top: 30px;
    padding-bottom: 50px;
    text-align: center;
  }

  .city_btn {
    color: #C2E64E;
    display: inline-block;
  }

  .lightbox table {
    /*width: 270px;*/
    /*padding:0;*/
    margin: 0 auto;
  }

  .lightbox table tr {
    padding-left: 10px;
  }

  .city_title {
    color: #666;
  }

  .citybar {
    display: inline-block;
    padding-left: 14px;
  }

  .citybar td {
    width: 53px;
    font-size: 12px;
    text-align: center;
    height: 30px;
    line-height: 30px;
    border: solid 1px #ddd;
    display: inline-block;
    margin-top: 10px;
    margin-right: 11px;
    color: #999;
    border-radius: 3px;
  }

  .citybar td.checked {
    width: 53px;
    font-size: 12px;
    text-align: center;
    height: 30px;
    line-height: 30px;
    border: solid 1px #afd03b;
    display: inline-block;
    margin-top: 10px;
    margin-right: 11px;
    color: #afd03b;
    border-radius: 3px;
  }
  .lightbox-close_qx {
    width: 35%;
    font-size: 14px;
    text-align: center;
    height: 40px;
    line-height: 40px;
    display: inline-block;
    margin-top: 30px;
    border-radius: 3px;
    border:solid 1px #C2E64E;
    color: #c2e64e;
    margin-right:8%;
  }

  .lightbox-close {
    width: 35%;
    font-size: 14px;
    text-align: center;
    height: 40px;
    line-height: 40px;
    display: inline-block;
    margin-top: 30px;
    border-radius: 3px;
    border:solid 1px #c2e64e;
    background-color: #C2E64E;
    color: #fff;
  }

  .person {
    display: inline-block;
    position: absolute;
    right: 10px;
    padding-top: 3px;
  }

  .mip-infinitescroll-results {
    max-width: 100% !important;
  }

  .header {
    background-color: #fff;
    margin-top: 44px;
    overflow: hidden;
    margin-bottom:10px;
  }

  .span_qt {
    display: inline-block;
    width: 75px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    border-radius: 3px;
    border: solid 1px #ddd;
    margin-right: 10px;
  }

  .span_qt_check {
    display: inline-block;
    width: 75px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    border-radius: 3px;
    border: solid 1px #afd03b;
    color: #afd03b;
  }

  .ycq {
    -webkit-appearance:none;
    width: 170px;
    height: 30px;
    line-height: 15px;
    font-size: 14px;
    color: #666;
    /* background-image: url('/i/date_back.png'); */
    background-size: 17px 18px;
    background-repeat: no-repeat;
    background-position: 135px;
    background-color: #fff;
    border-radius: 3px;
    border: solid 1px #ddd;
    padding-left: 5px;
  }

  .ycq_td {
    text-align: right;
  }

  .sousuo_form {
    width: 100%;
  }

  .sousuo_table {
    width: 100%;
  }

  .yssxtj {
    color: #333;
    font-size: 15px;
    width: 100%;
    text-align: center;
  }

  .yssxtj_table {
    margin-top: 65px;
    text-align: center;
    width: 100%;
  }

  .qt_td {
    margin-right: 20px;
    display: inline-block;
    line-height: 52px;
  }

  .bb_td {
    display: inline-block;
    line-height: 52px;
  }

  .mip-infinitescroll-loading {
    width: 100%;
    background-color: #fff;
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: #666;
    font-size: 14px;
    border-radius: 5px;
    margin-top: 10px;
    margin-bottom:50px;
  }

  .from_to {
    display: inline-block;
    margin-left: 5px;
    margin-right: 5px;
  }

  .header_tab {
    z-index: 9 !important;
  }

  .radio_btn {
    display: inline-block;
    width: 75px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border-radius: 3px;
    border: solid 1px #ddd;
  }

  .radio_check {
    display: inline-block;
    width: 75px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border-radius: 3px;
    border: solid 1px #afd03b;
    color: #afd03b;
  }

  .rec_a {
    display: block;
    right: 0px;
    /*bottom: 60px;*/
    width: 80px;
    height: 50px;
    z-index: 999 !important;
  }

  .rec_a .rec_icon {
    display: inline-block;
    width: 80px;
    height: 50px;
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
      // console.log(ret)
      if (ret.success) fn(true, ret.data)
      else fn(false, ret.error)
    })
    .catch(e => {
      console.error(e.message)
      fn(false, e.message)
    })
}

API.getSelectMaster = function (filter, fn) {
  API.wrapRet_(
    'https://mip.putibaby.com/api/get_select_master', {
      'filter': filter
    },
    fn)
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

function addClass (element, newName) {
  if (!element || !newName) return false
  if (element.className) {
    var oldClassName = element.className
    element.className = oldClassName + ' ' + newName
  } else {
    element.className = newName
  }
  return true
}

function removeClass (element, className) {
  if (!element || !className) return false
  // if (!element.className) return false;
  for (var n = 0; n < element.length; n++) {
    var allNames = element[n].className.split(' ')
    for (var i = 0; i < allNames.length; i++) {
      if (allNames[i] === className) {
        allNames.splice(i, 1)
        element[n].className = ''
        for (var j = 0; j < allNames.length; j++) {
          element[n].className += ' '
          element[n].className += allNames[j]
        }
        return true
      }
    }
  }
}

export default {
  props: {
    src: {
      type: String,
      default: null
    },
    dataJsonstr: {
      type: String,
      default: null

    }
  },
  data () {
    console.log(this)
    var pdata = JSON.parse(this.dataJsonstr)
    var city = pdata.city || '北京'
    console.log(city)
    return {
      isLogin: false,
      isUnion: false,
      list: null,
      state: {
        isLoadingMore: false,
        loadMessage: '',
        hasMoreData: false,
        isGif: true
      },
      filter: {
        city: city,
        pn: 0,
        kw: ''
      },
      filter2: {
        shlxRow: '全天',
        ycq: '',
        city: city,
        jiguan: '',
        priceFromSel: 0,
        priceToSel: 50000,
        ageFromSel: 20,
        ageToSel: 55,
        workYearFromSel: 1,
        workYearToSel: ''
      }

    }
  },
  computed: {

  },
  beforeMount () {
    this.init()
    var self = this
    window.addEventListener('scroll', function (e) {
      // console.log(document.documentElement.scrollTop);
      // console.log(document.body.scrollTop);
      var scrollTop = document.documentElement.scrollTop
      if (scrollTop === 0) {
        scrollTop = document.body.scrollTop
      }

      if (scrollTop + window.innerHeight >= document.body.clientHeight - 200) {
        // 触发加载数据
        console.log('加载数据')
        self.loadMoreAuto()
      };
    })
  },
  prerenderAllowed () {
    return true
  },
  mounted () {
    window.MIP.viewer.fixedElement.init()

    console.log('This is pty order list component !')
    // 所有的图片（要是网络太好，自己加图片吧）
    const imgs = [
      'https://mip.putibaby.com/i/jiazai.gif'

    ]
    let len = imgs.length

    /**
     * 遍历imgs数组，将所有图片加载出来
     * 可以通过控制台查看网络请求，会发现所有图片均已加载
     */
    for (let i = 0; i < len; i++) {
      let imgObj = new Image() // 创建图片对象
      imgObj.src = imgs[i]

      imgObj.addEventListener('load', function () { // 这里没有考虑error，实际上要考虑
        console.log('imgs' + i + '加载完毕')
      }, false)
    }

    var self = this
    this.$element.customElement.addEventAction('echo', function (event, str) {
      console.log(event)
    })
    this.$element.customElement.addEventAction('dook', function (event, str) {
      self.sure()
    })
    this.$element.customElement.addEventAction('do_cityok', function (event, str) {
      self.load_data()
    })
    this.$element.customElement.addEventAction('docancel', function (event, str) {
      console.log(event)
      console.log(str)
    })

    window.addEventListener('show-page', () => {
      console.log('show-page')
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
      // self.$set(self, 'isLogin', true)
      // self.$set(self, 'isUnion', event.userInfo.isUnion)
      self.isLogin = true
      self.isUnion = event.userInfo.isUnion
      // MIP.setData({'#isLogin': true})
      // MIP.setData({'#isUnion': event.userInfo.isUnion})

      var origin = API.next_cmd || event.origin
      // origin = origin || sessionStorage.next_cmd || localStorage.getItem('origin')

      console.log(origin)
      API.next_cmd = ''
      // sessionStorage.next_cmd = ''
      // localStorage.clear()

      if (event.userInfo.isUnion && origin === 'order_list') {
        console.log('logindone to order_list')
        window.MIP.viewer.open(MIP.util.makeCacheUrl('https://mip.putibaby.com/order_list'), {})
      } else if (event.userInfo.isUnion && origin === 'coupon') {
        console.log('logindone to coupon')
        window.MIP.viewer.open(MIP.util.makeCacheUrl('https://mip.putibaby.com/coupon'), {})
      } else if (event.userInfo.isUnion && origin === 'update_ycq') {
        console.log('logindone to update_ycq')
        window.MIP.viewer.open(MIP.util.makeCacheUrl('https://mip.putibaby.com/update_ycq'), {})
      } else if (!event.userInfo.isUnion && origin) {
        console.log('logindone to submit_ph')
        var to = 'https://mip.putibaby.com/' + origin
        window.MIP.viewer.open(MIP.util.makeCacheUrl('https://mip.putibaby.com/submit_ph?to=' + encodeURIComponent(to)), {})
      }
    })
  },
  methods: {

    init () {
      var self = this
      console.log('should loading')
      console.log(this.dataJson)

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
        this.filter.city = qcity
        console.log(qcity)
      }

      var city = this.filter.city || ''
      API.reportVisit(1, city, function (isOk, res) {
        if (isOk) {
          console.log(res)
        } else {
          console.log(res)
        }
      })

      this.filter.city = this.filter.city || '北京'
      API.getSelectMaster(self.filter, function (isOk, res) {
        if (isOk) {
          console.log(res)
          self.list = res.list
          self.state.isGif = false
          if (res.list.length < 10) {
            self.state.loadMessage = '没有更多数据了!'
          } else {
            self.state.loadMessage = '点击加载数据'
          }
        }
      })
    },
    clickQuantian (e) {
      // console.log(e.srcElement)
      // console.log(this.lastCityElem)
      if (this.lastRadioElem) {
        // console.log(this)
        this.lastRadioElem.className = 'radio_btn'
      } else {
        document.querySelector('#qtbtn').className = 'radio_btn'
      }
      addClass(e.srcElement, 'radio_check')
      this.lastRadioElem = e.srcElement
      this.filter2.shlxRow = '全天'
    },
    clickBaiban (e) {
      // console.log(e.srcElement)
      // console.log(this.lastRadioElem)
      if (this.lastRadioElem) {
        // console.log(this)
        this.lastRadioElem.className = 'radio_btn'
      } else {
        document.querySelector('#qtbtn').className = 'radio_btn'
      }
      addClass(e.srcElement, 'radio_check')
      this.lastRadioElem = e.srcElement
      this.filter2.shlxRow = '白班'
    },

    checkLogin_ (cmd) {
      if (!this.isLogin) {
        API.next_cmd = cmd
        // sessionStorage.next_cmd = cmd
        // localStorage.setItem('origin', cmd)
        // console.log(cmd)
        if (cmd === 'coupon') {
          this.$emit('login1')
        } else if (cmd === 'order_list') {
          this.$emit('login2')
        } else if (cmd === 'update_ycq') {
          this.$emit('login3')
        }
        return false
      }
      if (!this.isUnion) {
        var to = 'https://mip.putibaby.com/' + cmd
        window.MIP.viewer.open(MIP.util.makeCacheUrl('https://mip.putibaby.com/submit_ph?to=' + encodeURIComponent(to)), {})

        return false
      }

      return true
    },
    handleUpdateYcq () {
      console.log('handleUpdateYcq')
      if (!this.checkLogin_('update_ycq')) {
        return
      }
      window.MIP.viewer.open(MIP.util.makeCacheUrl('https://mip.putibaby.com/update_ycq '), {})
    },
    handleCustom () {
      console.log('handleCustom')
      window.MIP.viewer.open(MIP.util.makeCacheUrl('https://mip.putibaby.com/custom'), {})
    },
    handleOrderList () {
      console.log('handleOrderList')
      if (!this.checkLogin_('order_list')) { return }
      window.MIP.viewer.open(MIP.util.makeCacheUrl('https://mip.putibaby.com/order_list '), {})
    },
    load_data () {
      console.log('should set data')
      // document.documentElement.scrollTop = 0
      // document.body.scrollTop = 0
      this.state.loadMessage = ''
      this.list = []
      // this.$set(this, 'list', [])
      var self = this
      this.state.isGif = true
      // this.$set(this.state, 'isGif', true)
      this.filter.pn = 0
      setTimeout(function () {
        API.getSelectMaster(self.filter, function (isOk, res) {
          if (isOk) {
          // console.log(res)
            self.state.isGif = false
            self.list = res.list
            if (res.list.length < 10) {
              self.state.loadMessage = '没有更多数据了!'
            } else {
              self.state.loadMessage = '点击加载数据'
            }
          } else {
            console.log(res)
            self.state.loadMessage = '加载数据出错'
          }
        })
      }, 50)
    },
    load_more () {
      console.log('should set data')
      var self = this
      this.filter.pn += 1
      API.getSelectMaster(this.filter, function (isOk, res) {
        if (isOk) {
          // console.log(res);
          self.state.isGif = false
          self.list = self.list.concat(res.list)
          if (res.list.length >= 10) {
            self.state.loadMessage = '点击加载数据'
          } else {
            self.state.loadMessage = '没有更多数据了!'
          }
        } else {
          console.log(res)
          self.state.loadMessage = '加载数据出错'
        }
      })
    },
    loadMoreAuto () {
      if (this.state.loadMessage === '点击加载数据') {
        this.state.loadMessage = '数据正在加载中...'
        this.load_more()
      }
    },
    loadMoreClick () {
      if (this.state.loadMessage === '点击加载数据') {
        this.state.loadMessage = '数据正在加载中...'
        this.load_more()
      }
    },

    sure () {
      var self = this
      this.filter.sort_by = ''
      console.log(this.filter.shlxRow)

      this.filter.ycq = this.filter2.ycq
      this.filter.city = this.filter2.city
      this.filter.jiguan = this.filter2.jiguan
      this.filter.ageFromSel = this.filter2.ageFromSel
      this.filter.ageToSel = this.filter2.ageToSel
      this.filter.priceFromSel = this.filter2.priceFromSel
      this.filter.priceToSel = this.filter2.priceToSel
      this.filter.workYearFromSel = this.filter2.workYearFromSel
      this.filter.workYearToSel = this.filter2.workYearToSel

      var sortZH = document.querySelector('#sortZH')
      var sorttd = document.querySelectorAll('.sort_td')

      API.getSelectMaster(this.filter, function (isOk, res) {
        if (isOk) {
          console.log(res)
          removeClass(sorttd, 'checked')
          addClass(sortZH, 'checked')
          self.list = res.list
        }
      })
    },

    search (e) {
      console.log(e)
      e.target.blur()
      this.load_data()
    },
    submit () {

    },
    reload_ () {
      window.location.reload()
    },
    setCity (e) {
      // console.log(e.srcElement)
      // console.log(this.lastCityElem)
      if (this.lastCityElem) {
        // console.log(this)
        this.lastCityElem.className = 'citytd'
      }
      addClass(e.srcElement, 'checked')
      this.lastCityElem = e.srcElement
      this.filter.city = e.srcElement.innerHTML
    },
    sortClick (e) {
      var self = this
      if (e === 'zh') {
        self.$set(self.filter, 'sort_by', '')
      } else if (e === 'jg') {
        if (self.filter.sort_by === 'price_desc') {
          self.$set(self.filter, 'sort_by', 'price_asc')
        } else {
          self.$set(self.filter, 'sort_by', 'price_desc')
        }
      } else if (e === 'jy') {
        if (self.filter.sort_by === 'jy_desc') {
          self.$set(self.filter, 'sort_by', 'jy_asc')
        } else {
          self.$set(self.filter, 'sort_by', 'jy_desc')
        }
      } else if (e === 'age') {
        if (self.filter.sort_by === 'age_asc') {
          self.$set(self.filter, 'sort_by', 'age_desc')
        } else {
          self.$set(self.filter, 'sort_by', 'age_asc')
        }
      }
      setTimeout(function () {
        self.load_data()
      }, 5)
    }

  }

}
</script>
