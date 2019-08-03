export default class MIPExample extends MIP.CustomElement {
	 build () {
	    var swtBox = document.getElementById("swtBox");
	    
		var timer_1 = setTimeout(function(){
				swtBox.style.display = "block";
			},3000);
		
		function showSwtBox(){
			clearTimeout(timer_2);
			var timer_2 = setTimeout(function(){
				swtBox.style.display = "block";
			},3000);
		};
		
		swtBox.firstElementChild.addEventListener("click",function(){
			swtBox.style.display = "none";
			showSwtBox();
		});
		
		swtBox.lastElementChild.addEventListener("click",function(){
			swtBox.style.display = "none";
			showSwtBox();
		});
	};
}