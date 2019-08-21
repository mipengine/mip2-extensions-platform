
const { fetchJsonp } = window

export default class MIPGeolocation extends MIP.CustomElement {
	constructor (element){
		super(element)
		this.src = '';
		this.timeout =50000;
	}
	
			
	build () {
	 let attributes = this.element.attributes;
	 if(attributes && attributes.length>0)
	 {
		for(var i=0;i<attributes.length;i++)
		{
			var name=attributes[i].name;
			if(name=='src')
			{
				this.src=attributes[i].value;
			}
			else if(name=='timeout')
			{
				this.timeout=attributes[i].value;
			}
		}
	 }
	 
	 if(this.src && this.src.length>0)
	 {
		let cookieValue = this.getCookie('acoks');
		if(!cookieValue || cookieValue!='1')
		{
			/**
			 * GPS H5定位
			 */ 
			navigator.geolocation.getCurrentPosition(function(position){
				let lat = position.coords.latitude;
				let lng = position.coords.longitude;
				var url=this.src;
				if(url.indexOf('?'))
				{
					url=url+"&lat="+lat+"&lon="+lng;
				}
				else
				{
					url=url+"?lat="+lat+"&lon="+lng;
				}
				fetchJsonp(url, { timeout: timeout });
			},function(error){
				switch(error.code){
					case error.TIMEOUT :
						console.log('连接超时，请重试');
						break;
					case error.PERMISSION_DENIED :
						console.log('您拒绝了使用位置共享服务，查询已取消');
						break;
					case error.POSITION_UNAVAILABLE : 
						console.log('亲爱的火星网友，非常抱歉，我们暂时无法为您所在的星球提供位置服务');
						break;
				}	
			});
		}
	 }
	 
    }
	
	/*获取Cookie*/
	getCookie(name)
	{
		let reg = new RegExp("(^| )"+name+"=([^;]*)(;|$)");
		let arr=document.cookie.match(reg);
		if(arr)
		{
			return unescape(arr[2]); 
		}
		else
		{
			return null;
		}
	}
}
