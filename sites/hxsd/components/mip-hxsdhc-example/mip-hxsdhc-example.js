function hcGo(){
	var hcClintWidth = 640; 
	var hcWidth = document.body.offsetWidth;
	var htmlFont = document.querySelectorAll('html')[0]
	function getFontSize(){
		var width = document.documentElement.clientWidth || document.body.clientWidth;
		var fontSize = (100 / hcClintWidth) * width;
		return fontSize;
	};
	htmlFont.style.fontSize = getFontSize() + "px";
	window.onresize = function () {
		setTimeout(function () {
			htmlFont.style.fontSize = getFontSize() + "px";
		},100)
	};
}hcGo()
