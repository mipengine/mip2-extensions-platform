# mip-example

标题|内容
----|----
类型|
支持布局|
所需脚本| [https://c.mipcdn.com/extensions/platform/v2/qqtn.com/mip-example/mip-example.js](https://c.mipcdn.com/extensions/platform/v2/qqtn.com/mip-example/mip-example.js)

## 说明

首次点击进入页面的搜索引擎来路地址，判断不为百度和站内点击跳转，就实现点击按钮#address替换自身href连接地址;当前页面还需要判断data-durl、data-ismoney、data-special的值进行排除筛选和js自定义中的noAd数据去排除

## 示例

示例说明

```
<div class="g-box f-yydiv" id="m-down-msg">
<header class="info">
<div class="pic">
<div class="ico-wrap middle f-game-img">
<mip-img class="ico mip-element mip-layout-container mip-img-loaded" src="https://p.qqan.com/up/2020-7/2020714192755977.png!100_100"></mip-img>
</div>
<ul>
<li class="cpname"><h1 class="f-game-h1">王者传奇手游</h1></li><li class="type"><b>大小：238.5M</b><b>语言：中文</b></li><li class="type"><b>类别：角色扮演</b><b class="f-tags-system">系统：Android</b></li>
</ul>
</div>
<div id="downAddress" class="g-downAddress">
<ul class="m-down-ul f-downbtn-url g-nav-full">
<li class="m-down-last m-down-msg"><a href="tj.tcyl77.com" class="span9 m-game-down down f-eject-btn" data-flag="downbtn" id="address">普通下载</a></li>
</ul>
</div></div>
</header>
</div>

<div class="f-information f-hide" data-id="189880" data-path="down" data-categroyId="203" data-rootid="16" data-commendid="0" data-system="Android" data-ppaddress="" data-ismoney="0" data-CommentTpye="0" data-Username="yinpan" data-Type="0" data-DateTime="2017/4/11" data-attr="免费" data-phpurl="2" data-star="5" data-durl="tj.tcyl77.com" data-ismoney="0" data-special="2"></div>

```

## 属性

根据页面 data-durl 字段的值，去判断匹配排除，并获取首次点击进入页面的来路地址，判断不为百度和站内点击跳转，进行 #address href 地址替换

## 开发理由

实现首次进入页面，首次点击的情况给替换链接地址