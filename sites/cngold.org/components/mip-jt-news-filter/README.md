# mip-jt-news-filter

标题|内容
----|----
类型|
支持布局|
所需脚本| [https://c.mipcdn.com/extensions/platform/v2/cngold.org/mip-jt-news-filter/mip-jt-news-filter.js](https://c.mipcdn.com/extensions/platform/v2/cngold.org/mip-jt-news-filter/mip-jt-news-filter.js)

## 说明

热点频道根据筛选条件跳转页面的实现，包括电影、电视剧、笔记本、手机、景点的筛选

## 示例

示例说明

```
<mip-jt-news-filter type="dianying">
  <section class="search tv_select clearfix">
    <mip-accordion sessions-key="mip_1" animatetime='0.24' expaned-limit>
      <section class="search_sec fl">
        <div class="list_box fl">默认排序<i class="icon"></i></div>
        <ul class="list_ul">
          <li class="on">
            <a href="https://m.cngold.org/news/m_dianying_0_0_0.html">默认排序<i></i></a>
          </li>
          <li>
            <a href="https://m.cngold.org/news/m_dianying_0_0_0.html?sortType=score">按评分排序<i></i></a>
          </li>
          <li>
            <a href="https://m.cngold.org/news/m_dianying_0_0_0.html?sortType=new">按时间排序<i></i></a>
          </li>
        </ul>
      </section>
      <section class="search_box">
        <div class="clearfix">
          <div class="select_box">电影</div>
          <i class="icon"></i>
        </div>
        <ul class="list_ul">
          <li>
            <a href="https://m.cngold.org/news/m_dianying_0_0_0.html">电影<i></i></a>
          </li>
          <li>
            <a href="https://m.cngold.org/news/m_dianshi_0_0_0.html">电视剧<i></i></a>
          </li>
        </ul>
      </section>
    </mip-accordion>
    <div class="select_btn_div" id="show-chose"><i class="icon4"></i>筛选</div>
    <!--筛选框-->
    <div class="clearfix selBox" id="chose-box">
      <div class="clearfix selCon" id="chosecon-box">
        <dl id="year_li" class="clearfix">
          <dt>年代<i class="show-all"></i></dt>
          <dd class="on" data-value="0">全部</dd>
          <dd  data-value="1">2017</dd>
          <dd  data-value="2">2016</dd>
          <dd  data-value="7">2015</dd>
          <dd  data-value="8">2014</dd>
          <dd  data-value="17">2013</dd>
          <dd  data-value="18">2012</dd>
          <dd  data-value="19">2011</dd>
          <dd  data-value="20">2010</dd>
          <dd  data-value="21">00年代</dd>
          <dd  data-value="22">90年代</dd>
          <dd  data-value="23">80年代</dd>
          <dd  data-value="24">70年代</dd>
          <dd  data-value="25">其他</dd>
        </dl>  
        <dl id="area_li" class="clearfix">
          <dt>地区<i class="show-all"></i></dt>
          <dd class="on" data-value="0">全部</dd>
          <dd  data-value="1">日本</dd>
          <dd  data-value="2">美国</dd>
          <dd  data-value="3">英国</dd>
          <dd  data-value="4">韩国</dd>
          <dd  data-value="5">中国大陆</dd>
          <dd  data-value="6">加拿大</dd>
          <dd  data-value="7">西班牙</dd>
          <dd  data-value="8">德国</dd>
          <dd  data-value="9">荷兰</dd>
          <dd  data-value="10">法国</dd>
          <dd  data-value="11">比利时</dd>
          <dd  data-value="12">瑞典</dd>
          <dd  data-value="13">爱尔兰</dd>
          <dd  data-value="14">古巴</dd>
          <dd  data-value="15">印度</dd>
          <dd  data-value="16">墨西哥</dd>
          <dd  data-value="17">印度尼西亚</dd>
          <dd  data-value="18">意大利</dd>
          <dd  data-value="19">台湾</dd>
          <dd  data-value="20">阿根廷</dd>
          <dd  data-value="21">瑞士</dd>
          <dd  data-value="22">巴拿马</dd>
          <dd  data-value="23">香港</dd>
          <dd  data-value="24">伊朗</dd>
          <dd  data-value="25">巴西</dd>
          <dd  data-value="26">俄罗斯</dd>
          <dd  data-value="27">泰国</dd>
          <dd  data-value="28">南非</dd>
          <dd  data-value="29">亚美尼亚</dd>
          <dd  data-value="30">挪威</dd>
        </dl>
        <dl id="style_li" class="clearfix">
          <dt>类型<i class="show-all"></i></dt>
          <dd class="on" data-value="0">全部</dd>
          <dd  data-value="1">动作</dd>
          <dd  data-value="2">奇幻</dd>
          <dd  data-value="3">悬疑</dd>
          <dd  data-value="4">剧情</dd>
          <dd  data-value="5">传记</dd>
          <dd  data-value="6">同性</dd>
          <dd  data-value="7">科幻</dd>
          <dd  data-value="8">惊悚</dd>
          <dd  data-value="9">历史</dd>
          <dd  data-value="10">恐怖</dd>
          <dd  data-value="11">爱情</dd>
          <dd  data-value="12">犯罪</dd>
          <dd  data-value="13">西部</dd>
          <dd  data-value="14">动画</dd>
          <dd  data-value="15">冒险</dd>
          <dd  data-value="16">家庭</dd>
          <dd  data-value="17">情色</dd>
          <dd  data-value="18">战争</dd>
          <dd  data-value="19">运动</dd>
          <dd  data-value="20">灾难</dd>
          <dd  data-value="21">古装</dd>
          <dd  data-value="22">儿童</dd>
          <dd  data-value="23">歌舞</dd>
          <dd  data-value="24">音乐</dd>
          <dd  data-value="43">喜剧</dd>
          <dd  data-value="45">真人秀</dd>
          <dd  data-value="49">脱口秀</dd>
          <dd  data-value="50">其他</dd>
        </dl>
        <div class="btns">
          <a href="https://m.cngold.org/news/m_dianying_0_0_0.html" class="cz">重置</a>
          <span class="sure wc" id="sure">确认</span>
        </div>
      </div>
    </div>
  </section>
  <section>
    <ul class="clearfix tv_sort mglr30" id="more_data">
      <li class="clearfix first">
          <a href="https://m.cngold.org/news/m_dianshi_dsj297.html" title="奇葩说第三季">
            <dl class="clearfix">
              <dd class="pic">
                <mip-img layout="responsive" width="110" height="110"
                  src="http://res.cngoldres.com/upload/news/2017/0420/a9dd1fee5ec56a09fe54d8f1ba2ec0e3.jpg"
                  alt="奇葩说第三季">
              </dd>
              <dt>
                <span>奇葩说第三季</span>
                <b>
                  <i>8</i>.6分

                </b>
              </dt>
              <dd class="other">
                <p>
                  导演:
                  <span>安迪·戈达德</span>/</p>
                <p>
                  主演:
                  <span>蔡康永</span>/
                  <span>梅丽莎·里奥</span>/</p>
              </dd>
            </dl>
          </a>
        </li>
        <li class="clearfix first">
          <a href="https://m.cngold.org/news/m_dianshi_dsj150.html" title="欢乐颂">
            <dl class="clearfix">
              <dd class="pic">
                <mip-img layout="responsive" width="110" height="110"
                  src="http://res.cngoldres.com/upload/news/2017/0420/cd836bef81732678fe445c5a4bee6fdf.jpg"
                  alt="欢乐颂">
              </dd>
              <dt>
                <span>欢乐颂</span>
                <b>
                  <i>7</i>.3分

                </b>
              </dt>
              <dd class="other">
                <p>
                  导演:
                  <span>孔笙</span>/
                  <span>简川訸</span>/</p>
                <p>
                  主演:
                  <span>刘涛</span>/
                  <span>蒋欣</span>/
                  <span>王子文</span>/
                  <span>杨紫</span>/
                  <span>乔欣</span>/
                  <span>祖峰</span>/
                  <span>王凯</span>/
                  <span>张陆</span>/
                  <span>靳东</span>/
                  <span>杨烁</span>/
                  <span>张晓谦</span>/
              </dd>
            </dl>
          </a>
        </li>
    </ul>
  </section>
</mip-jt-news-filter>

```

## 属性

### type

**说明**：筛选类型

**必选项**：是

**类型**：字符串

**取值范围**：dianying（电影）、 mobile （手机）、notebook（笔记本）、 jingdian（景点）、 dianshi（电视）