export default class MIPJtCangFilter extends MIP.CustomElement {
  build () {
	  
	  // 根据id获取元素
    function $ (str) {
      return document.getElementById(str)
    }

	  let blw=$("myscrollbox").querySelector('li').clientWidth;
	  //获取单个子元素所需宽度
	  let liArr = $("myscrollbox").getElementsByTagName('li');
	  //获取子元素数量
	  let mysw = $("myscroll").clientWidth;
	  //获取子元素所在区域宽度
	  let mus = parseInt(mysw/blw);
	  //计算出需要显示的子元素的数量
	  let length = liArr.length-mus;
	  //计算子元素可移动次数（被隐藏的子元素数量）
	  let length2 = liArr.length/mus;
	  //计算子多个元素可移动次数（被隐藏的子元素数量）
	  let i=0
	  $('right').onclick = function (){
		 $('myscrollbox').style.height =length +'px'
		  i++
		  //点击i加1
		  if(i<=length){
		     
			   $('myscrollbox').style.left =-(blw*i) +'px'
			  //子元素集合向左移动，距离为子元素的宽度乘以i。
		  }else{
			  i=0;
			  $('myscrollbox').style.left ='0px'
			 
			  //超出可移动范围后点击不再移动。最后几个隐藏的元素显示时i数值固定位已经移走的子元素数量。
	      }
      }
	  $("left").onclick = function (){
		  i--
		  //点击i减1
		  if(i>=0){
		     $('myscrollbox').style.left =-(blw*i) +'px'
			 //子元素集合向右移动，距离为子元素的宽度乘以i。
		  }else{
			 i=length;
			 $('myscrollbox').style.left =-(blw*length) +'px'
			 //超出可移动范围后点击不再移动。最前几个子元素被显示时i为0。
	      }
      }

	  
	  
	  
  }
}	  