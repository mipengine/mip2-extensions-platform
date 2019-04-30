# mip-jt-credit-chose

标题|内容
----|----
类型|
支持布局|
所需脚本| [https://c.mipcdn.com/extensions/platform/v2/cngold.org/mip-jt-credit-chose/mip-jt-credit-chose.js](https://c.mipcdn.com/extensions/platform/v2/cngold.org/mip-jt-credit-chose/mip-jt-credit-chose.js)

## 说明

信用卡帮你选卡页面类名切换

## 示例

示例说明

```
// 代码示例
<mip-jt-credit-chose tab-class="chose_dl"></mip-jt-credit-chose>
<mip-form url="https://m.cngold.org/credit/m_result.html" method="POST" target="_blank" class="credit_form">
<main class="lst_cont5 swiper-container">
	<div class="swiper-wrapper">
		<mip-carousel layout="responsive" buttonController class="clearfix mip-carousel-lst" >
			<section class="lst_cont51 swiper-slide">
				<div class="top1 clearfix">
					<div class="bg_rand1"></div>
					<div class="txt lst_icon2"></div>
					<div class="pic lst_icon2"></div>
					<div class="bot_pic lst_icon2"></div>
				</div>
				<div class="cont">
					<dl class="chose_dl" id="userType">
						<dt class='tit clearfix'><span>1</span>我是属于哪种类型的用户？</dt>
						<dd class="on" data-value='1'><input class="hide_input" checked type="radio" name="userType" value="1" id="radio1"><label for="radio1">小白一族</label></dd>
						<dd data-value='2'><input class="hide_input" type="radio" name="userType" value="2" id="radio2"><label for="radio2">白领精英</label></dd>
						<dd data-value='3'><input class="hide_input" type="radio" name="userType" value="3" id="radio3"><label for="radio3">高端用户</label></dd>
					</dl>
				</div>
			</section>
			<section class="lst_cont52 swiper-slide">
				<div class="top">
					<div class="tit"><span>2</span>我的学历层次是什么</div>
					<div class="pic2 lst_icon2"></div>
					<div class="bot_pic lst_icon2"></div>
				</div>
				<div class="cont">
					<dl class="chose_dl" id="user_education">
						<dd class="on">高端用户</dd>
						<dd>本科</dd>
						<dd>专科</dd>
						<dd>高中及以下</dd>
					</dl>
				</div>
			</section>
			<section class="lst_cont53 swiper-slide">
				<div class="top">
					<div class="tit"><span>3</span>主要用途</div>
					<div class="pic2 lst_icon2"></div>
					<div class="bot_pic lst_icon2"></div>
				</div>
				<div class="cont short clearfix">
					<dl class="chose_dl" id="useType">
						<dd class="on" data-value="1"><input class="hide_input" checked type="radio" name="useType" value="1" id="radio_1"><label for="radio_1">航空酒店</label></dd>
						<dd data-value="4"><input class="hide_input" type="radio" name="useType" value="4" id="radio_2"><label for="radio_2">汽车周边</label></dd>
						<dd data-value="2"><input class="hide_input" type="radio" name="useType" value="2" id="radio_3"><label for="radio_3">电商网购</label></dd>
						<dd data-value="5"><input class="hide_input" type="radio" name="useType" value="5" id="radio_4"><label for="radio_4">海淘境外</label></dd>
						<dd data-value="3"><input class="hide_input" type="radio" name="useType" value="3" id="radio_5"><label for="radio_5">生活娱乐</label></dd>
						<dd data-value="6"><input class="hide_input" type="radio" name="useType" value="6" id="radio_6"><label for="radio_6">旅游专享</label></dd>
					</dl>
				</div>
			</section>
			<section class="lst_cont54 swiper-slide">
				<div class="top">
					<div class="tit"><span>4</span>月收入</div>
					<div class="pic2 lst_icon2"></div>
					<div class="bot_pic lst_icon2"></div>
				</div>
				<div class="cont">
					<dl class="chose_dl" id="income">
						<dd class="on">3K以下</dd>
						<dd>3K-5K</dd>
						<dd>5K-10K</dd>
						<dd>10K以上</dd>
					</dl>
				</div>
				
				<div class="submit">
						<input type="submit" value="提交" class="submit_input"/>
				</div>
			</section>
		</mip-carousel>
	</div>
</main>
</mip-form>
```

## 属性

### tab-class

**说明**：需要切换的dl类名

**必选项**：是

**类型**：字符串

**默认值**：无

## 注意事项

该组件适用于信用卡帮你选卡页面的类名切换，不适用其他页面
