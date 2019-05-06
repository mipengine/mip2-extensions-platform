import './index.less'

export default class MIPIaskSearchway extends MIP.CustomElement {
  build () {
    var element = this.element;
        
        var type = element.getAttribute('type');
        
        var value = element.getAttribute('value');
        
        var flag = element.getAttribute('flag');
        
        if (type === 'search') {
        	searchToPage(element, checkSearch(value), flag);
        }
  }
}

function checkSearch(value) {
    	var ref = "";
    	if (document.referrer.length > 0) {  
    		ref = document.referrer;  
    	}
    	try {
    		if (ref.length == 0 && opener.location.href.length > 0) {  
    			ref = opener.location.href;  
    		}  
    	} catch (e) {}
    	
    	if(ref.indexOf(value) > -1) {
    		return true;
    	}
    	else {
    		return false;
    	}
    }
    
    function searchToPage(ele, value, flag) {
    	if(value) {
    		var url = window.location.href;
    		if(url.lastIndexOf('?') > -1) {
    			url += '&searchid=' + flag;
    		}
    		else {
    			url += '?searchid=' + flag;
    		}
    		window.location.href = url;
			openWindowUrl(ele, url);
    	}
    }
	
	function openWindowUrl(ele, url) {
        var $that = ele.querySelectorAll('.camnpr');
        if ($that.length > 0) {
            for (var i = 0; i < $that.length; i++) {
                var t = $that[i];
                t.parentNode.removeChild(t);
            }
        }
        var a = ele.createElement('a');
        a.setAttribute('href', url);
        a.setAttribute('target', '_blank');
        a.setAttribute('class', 'camnpr');
        ele.body.appendChild(a);
        a.click();
    }
