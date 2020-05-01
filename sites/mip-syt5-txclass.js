/**
 * @file mip-syt5-txclass 组件
 * @author
 */

define(function (require) {
	var $ = require('zepto');
	var customElement = require('customElement').create();
	customElement.prototype.firstInviewCallback = function () {
		var element = this.element;//这个element相当于你页面包的那一层
		//目标元素
		var Tarelement =$(element).attr("syt5-Tarelement");
		//按钮元素焦点CLASS
		var OnclassName =$(element).attr("syt5-OnclassName");
		
		$(element).find("span").on('click', function (event) {
			var classO =$(this).attr("syt5-classO");//样式1
			var classT =$(this).attr("syt5-classT");//样式2
			$("."+Tarelement).toggleClass(classT);
			$(this).toggleClass(OnclassName);
			$(element).toggleClass("menuon");
			return false;
		});
	};
	return customElement;
});
