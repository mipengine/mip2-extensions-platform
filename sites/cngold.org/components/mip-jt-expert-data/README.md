# mip-jt-expert-data

标题|内容
----|----
类型|
支持布局|
所需脚本| [https://c.mipcdn.com/extensions/platform/v2/cngold.org/mip-jt-expert-data/mip-jt-expert-data.js](https://c.mipcdn.com/extensions/platform/v2/cngold.org/mip-jt-expert-data/mip-jt-expert-data.js)

## 说明

适用于金投专家和金投机构
1，专家机构频道获取文章数、粉丝数、热度
2，专家频道获取说说列表和问答列表

## 示例

示例说明

```
<!--用法1：获取文章数、粉丝数、热度-->
<mip-jt-expert-data 
  type="article"
  website="expert"
  id="1851358"
>
<section class="person-introduce">
  <div class="person-top clearfix">
    <a class="per-img" href="https://m.cngold.org/mingjia/m_expert1851358.html" title="百味财富">
      <div class="img"><mip-img layout="responsive" width="110" height="110" src="https://res.cngoldres.com/upload/usercenter/2019/0326/1e461fbb02f81b781f99d7b47e66156d.png" class="tou_pic" alt="百味财富"></mip-img></div>
      <i class="gold"></i>
    </a>
    <div class="per-info fl">
      <span>百味财富</span><span>外汇专家</span>
      <p>
        <a href="https://m.cngold.org/mingjia/m_expert1851358/introduce.html" title="introduce">百味财富成立于2012年，团队中</a>
      </p>
    </div>
  </div>
  <ul class="per-detail clearfix">
    <li>
      <span id="blog-count">116</span>
      <p>发布文章</p>
    </li>
    <li>
      <span id="fans-count">1</span>
      <p>粉丝数</p>
    </li>
    <li>
      <span id="visit-count">217</span>
      <p>专栏热度</p>
    </li>
  </ul>
</section>
</mip-jt-expert-data>

<!--用法2：获取说说列表/问答列表-->
<mip-jt-expert-data 
  type="sayList"
  id="1759747"
>
<section>
  <div class="index_tit clearfix">
    <i class="icon"></i>
    <h2>说说列表</h2>
  </div>
  <div class="per-li swiper-slide">
    <ul class="new-hy" id="say-list">
      
    </ul>
  </div>
</section>
</mip-jt-expert-data>

```

## 属性

### type

**说明**：指明使用哪种功能

**必选项**：是

**类型**：字符串

**取值范围**：article(用于获取文章数、粉丝数、热度)、sayList(用于获取说说列表)、qaList(用于获取问答列表)

### id

**说明**：指明需要获取信息的专家id或机构id

**必选项**：是

**类型**：字符串

**默认值**：无

### website

**说明**：当type='article'时用于指明页面类型

**必选项**：type='article'时必填

**类型**：字符串

**取值范围**：expert(专家)、company(机构)
