export const Tracker = function (){
//-- Urchin On Demand Settings ONLY
    var _myuacct="UA-430199-5";			// set up the Urchin Account
    var _myuserv=1;			// service mode (0=local,1=remote,2=both)
    //-- category
    var _mych="";
    var _mycate="";

    //-- UTM User Settings
    var _myufsc=1;			// set client info flag (1=on|0=off)
    var _myudn="auto";		// (auto|none|domain) set the domain name for cookies
    var _myuhash="on";		// (on|off) unique domain hash for cookies
    var _myutimeout="1800";   	// set the inactive session timeout in seconds
    var _myugifpath="//log.babytree.com/rd/log.php";	// set the web path to the __myutm.gif file
    var _myutsp="|";			// transaction field separator
    var _myuflash=1;			// set flash version detect option (1=on|0=off)
    var _myutitle=1;			// set the document title detect option (1=on|0=off)
    var _myulink=0;			// enable linker functionality (1=on|0=off)
    var _myuanchor=0;			// enable use of anchors for campaign (1=on|0=off)

    //-- UTM Campaign Tracking Settings
    var _myuctm=1;			// set campaign tracking module (1=on|0=off)
    var _myucto="15768000";		// set timeout in seconds (6 month default)
    var _myuccn="utm_campaign";	// name
    var _myucmd="utm_medium";		// medium (cpc|cpm|link|email|organic)
    var _myucsr="utm_source";		// source
    var _myuctr="utm_term";		// term/keyword
    var _myucct="utm_content";	// content
    var _myucid="utm_id";		// id number
    var _myucno="utm_nooverride";	// don't override

    //-- Auto/Organic Sources and Keywords
    // - Add 22-28, George, 2007-4-29
    var _myuOsr=new Array();
    var _myuOkw=new Array();
    _myuOsr[0]="google";	    _myuOkw[0]="q";
    _myuOsr[1]="yahoo";	    _myuOkw[1]="p";
    _myuOsr[2]="msn";		    _myuOkw[2]="q";
    _myuOsr[3]="aol";		    _myuOkw[3]="query";
    _myuOsr[4]="lycos";	    _myuOkw[4]="query";
    _myuOsr[5]="ask";		    _myuOkw[5]="q";
    _myuOsr[6]="altavista";	_myuOkw[6]="q";
    _myuOsr[7]="search";	    _myuOkw[7]="q";
    _myuOsr[8]="netscape";	_myuOkw[8]="query";
    _myuOsr[9]="earthlink";	_myuOkw[9]="q";
    _myuOsr[10]="cnn";	    _myuOkw[10]="query";
    _myuOsr[11]="looksmart";	_myuOkw[11]="key";
    _myuOsr[12]="about";	    _myuOkw[12]="terms";
    _myuOsr[13]="excite";	    _myuOkw[13]="qkw";
    _myuOsr[14]="mamma";	    _myuOkw[14]="query";
    _myuOsr[15]="alltheweb";	_myuOkw[15]="q";
    _myuOsr[16]="gigablast";	_myuOkw[16]="q";
    _myuOsr[17]="voila";	    _myuOkw[17]="kw";
    _myuOsr[18]="virgilio";	_myuOkw[18]="qs";
    _myuOsr[19]="teoma";  	_myuOkw[19]="q";
    _myuOsr[20]="baidu";      _myuOkw[20]="wd";
    _myuOsr[21]="3721";       _myuOkw[21]="name";
    _myuOsr[22]="baidu";      _myuOkw[22]="word";
    _myuOsr[23]="qq";         _myuOkw[23]="w";
    _myuOsr[24]="sogou";      _myuOkw[24]="query";
    _myuOsr[25]="iask";       _myuOkw[25]="k";
    _myuOsr[26]="zhongsou";   _myuOkw[26]="word";
    _myuOsr[27]="alexa";      _myuOkw[27]="q";
    _myuOsr[28]="163";        _myuOkw[28]="q";
    _myuOsr[29]="360";        _myuOkw[29]="q";
    _myuOsr[30]="soso";       _myuOkw[30]="w";
    _myuOsr[31]="so";         _myuOkw[31]="q";
    _myuOsr[32]="bing";       _myuOkw[32]="q";
    _myuOsr[33]="youdao";     _myuOkw[33]="q";
    _myuOsr[34]="sm.cn";     _myuOkw[34]="q";


    //-- Auto/Organic Keywords to Ignore
    var _myuOno=new Array();
    //_myuOno[0]="urchin";
    //_myuOno[1]="urchin.com";
    //_myuOno[2]="www.urchin.com";

    //-- Referral domains to Ignore
    var _myuRno=new Array();
    //_myuRno[0]=".urchin.com";


    //-- **** Don't modify below this point ***
    var _myuff,_myudh,_myudt,_myubl=0,_myudo="";
    var _myuu,_myufns=0,_myuns=0,_myur="-",_myufno=0,_myust=0,_myubd=window.document;
    var _myudl=window.location,_myudlh="",_myutcp="/",_myuwv="1",_mych="",_mycate="";

    var _myugifpath2="//log.babytree.com/rd/log.php";

    //  - document location
    if (_myudl.hash) 
        _myudlh=_myudl.href.substring(_myudl.href.indexOf('#'));
    if (_myudl.protocol=="https:") 
        _myugifpath2="//log.babytree.com/rd/log.php";
    if (!_myutcp || _myutcp=="") 
        _myutcp="/";


    function myurchinTracker(page) {
        if (_myudl.protocol=="file:") return;
        if (_myuff && (!page || page=="")) return;
    
        var a,b,c,v,z,k,x="",s="",f=0;
        var nx=" expires=Sun, 18 Jan 2038 00:00:00 GMT;";
        var dc=_myubd.cookie;

        _myudh=_myuDomain();

        _rand = Math.random();
        _myuu=Math.round(_rand*2147483647);
        _myudt=new Date();
        _myust=Math.round(_myudt.getTime()/1000);
        a=dc.indexOf("__myutma="+_myudh);
        b=dc.indexOf("__myutmb="+_myudh);
        c=dc.indexOf("__myutmc="+_myudh);

        if (_myudn && _myudn!="") { 
            _myudo=" domain="+_myudn+";"; 
        }
        if (_myutimeout && _myutimeout!="") {
            x=new Date(_myudt.getTime()+(_myutimeout*1000));
            x=" expires="+x.toGMTString()+";";
        }

        //not enabled yet. 
        if (_myulink) {
            if (_myuanchor && _myudlh && _myudlh!="") s=_myudlh+"&";
            s+=_myudl.search;
            if(s && s!="" && s.indexOf("__myutma=")>=0) {
                if (!(_myuIN(a=_myuGC(s,"__myutma=","&")))) a="-";
                if (!(_myuIN(b=_myuGC(s,"__myutmb=","&")))) b="-";
                if (!(_myuIN(c=_myuGC(s,"__myutmc=","&")))) c="-";
                v=_myuGC(s,"__myutmv=","&");
                z=_myuGC(s,"__myutmz=","&");
                k=_myuGC(s,"__myutmk=","&");
                if ((k*1) != ((_myuHash(a+b+c+z+v)*1)+(_myudh*1))) {_myubl=1;a="-";b="-";c="-";z="-";v="-";}

                if (a!="-" && b!="-" && c!="-") 
                    f=1;
                else if(a!="-") 
                    f=2;
            }
        }
        if(f==1) { 
            _myubd.cookie="__myutma="+a+"; path="+_myutcp+";"+nx+_myudo;
            _myubd.cookie="__myutmb="+b+"; path="+_myutcp+";"+x+_myudo;
            _myubd.cookie="__myutmc="+c+"; path="+_myutcp+";"+_myudo;
        } else if (f==2) {
            a=_myuFixA(s,"&",_myust);
            _myubd.cookie="__myutma="+a+"; path="+_myutcp+";"+nx+_myudo;
            _myubd.cookie="__myutmb="+_myudh+"; path="+_myutcp+";"+x+_myudo;
            _myubd.cookie="__myutmc="+_myudh+"; path="+_myutcp+";"+_myudo;
            _myufns=1;
        } else if (a>=0 && b>=0 && c>=0) {
            _myubd.cookie="__myutmb="+_myudh+"; path="+_myutcp+";"+x+_myudo;
        } else {
            if (a>=0) 
                a=_myuFixA(_myubd.cookie,";",_myust);
            else 
                a=_myudh+"."+_myuu+"."+_myust+"."+_myust+"."+_myust+".1";
            _myubd.cookie="__myutma="+a+"; path="+_myutcp+";"+nx+_myudo;
            _myubd.cookie="__myutmb="+_myudh+"; path="+_myutcp+";"+x+_myudo;
            _myubd.cookie="__myutmc="+_myudh+"; path="+_myutcp+";"+_myudo;
            _myufns=1;
        }

        if (_myulink && v && v!="" && v!="-") {
            v=_myuUES(v);
            if (v.indexOf(";")==-1) 
                _myubd.cookie="__myutmv="+v+"; path="+_myutcp+";"+nx+_myudo;
        }  
        _myuInfo(page);
        _myufns=0;
        _myufno=0;
        _myuff=1;
    }
    //改造By Wumingli
    var newImgLogVar = "baby_log_" + (new Date()).getTime(),
        baby_new_global_img = window[newImgLogVar] =  new Image(1, 1);
    function _myuInfo(page) {
        var p,s="",pg=_myudl.pathname+_myudl.search;
        if (page && page!="") pg=_myuES(page,1);
        
        _myur=_myubd.referrer;
        if (!_myur || _myur=="") { 
            _myur="-"; 
        } else {
            p=_myur.indexOf(_myubd.domain);
            if ((p>=0) && (p<=8)) { _myur="0"; }
            if (_myur.indexOf("[")==0 && _myur.lastIndexOf("]")==(_myur.length-1)) { _myur="-"; }
        }
    
        s+="&utmn="+_myuu;
        if (_myufsc) s+=_myuBInfo();
        if (_myuctm) s+=_myuCInfo();
        if (_myutitle && _myubd.title && _myubd.title!="") s+="&utmref="+_myuES(_myubd.referrer);
        if (_myudl.hostname && _myudl.hostname!="") s+="&utmhn="+_myuES(_myudl.hostname);
        s+="&utmr="+_myur;
        s+="&utmp="+_myuES(pg);
        s+="&channel="+_mych;
        s+="&cate="+_mycate;
        
        baby_new_global_img.onload = baby_new_global_img.onerror = function () {
            window[newImgLogVar] =
                baby_new_global_img.onload =
                baby_new_global_img.onerror = null;
            try {
                delete window[newImgLogVar];
            } catch (ex) {
                window[newImgLogVar] = undefined;
            }
        }
        baby_new_global_img.src = _myugifpath2 + "?"+"utmwv=" + _myuwv + s + "&utmac=" + _myuacct + "&utmcc=" + _myuGCS();
        
        return;
    }



    function _myuVoid() { return; }

    function _myuCInfo() {
        if (!_myucto || _myucto=="") { _myucto="15768000"; }

        var c="",t="-",t2="-",t3="-",o=0,cs=0,cn=0,i=0,z="-",s="";
        if (_myuanchor && _myudlh && _myudlh!="") s=_myudlh+"&";
        
        s+=_myudl.search;
        var x=new Date(_myudt.getTime()+(_myucto*1000));
        var dc=_myubd.cookie;
        x=" expires="+x.toGMTString()+";";
        if (_myulink && !_myubl) {
            z=_myuUES(_myuGC(s,"__myutmz=","&"));
            if (z!="-" && z.indexOf(";")==-1) { _myubd.cookie="__myutmz="+z+"; path="+_myutcp+";"+x+_myudo; return ""; }
        }
        z=dc.indexOf("__myutmz="+_myudh);
        if (z>-1) { z=_myuGC(dc,"__myutmz="+_myudh,";"); }
        else { z="-"; }
        t=_myuGC(s,_myucid+"=","&");
        t2=_myuGC(s,_myucsr+"=","&");
        t3=_myuGC(s,"gclid=","&");
        if ((t!="-" && t!="") || (t2!="-" && t2!="") || (t3!="-" && t3!="")) {
        if (t!="-" && t!="") c+="utmcid="+_myuEC(t);
        if (t2!="-" && t2!="") { if (c != "") c+="|"; c+="utmcsr="+_myuEC(t2); }
        if (t3!="-" && t3!="") { if (c != "") c+="|"; c+="utmgclid="+_myuEC(t3); }
        t=_myuGC(s,_myuccn+"=","&");
        if (t!="-" && t!="") c+="|utmccn="+_myuEC(t);
        else c+="|utmccn=(not+set)";
        t=_myuGC(s,_myucmd+"=","&");
        if (t!="-" && t!="") c+="|utmcmd="+_myuEC(t);
        else  c+="|utmcmd=(not+set)";
        t=_myuGC(s,_myuctr+"=","&");
        if (t!="-" && t!="") c+="|utmctr="+_myuEC(t);
        else { t=_myuOrg(1); if (t!="-" && t!="") c+="|utmctr="+_myuEC(t); }
        t=_myuGC(s,_myucct+"=","&");
        if (t!="-" && t!="") c+="|utmcct="+_myuEC(t);
        t=_myuGC(s,_myucno+"=","&");
        if (t=="1") o=1;
        if (z!="-" && o==1) return "";
        }
        if (c=="-" || c=="") { c=_myuOrg(); if (z!="-" && _myufno==1)  return ""; }
        if (c=="-" || c=="") { if (_myufns==1)  c=_myuRef(); if (z!="-" && _myufno==1)  return ""; }
        if (c=="-" || c=="") {
            if (z=="-" && _myufns==1) { c="utmccn=(direct)|utmcsr=(direct)|utmcmd=(none)"; }
            if (c=="-" || c=="") return "";
        }  
        if (z!="-") {
            i=z.indexOf(".");
            if (i>-1) i=z.indexOf(".",i+1);
            if (i>-1) i=z.indexOf(".",i+1);
            if (i>-1) i=z.indexOf(".",i+1);
            t=z.substring(i+1,z.length);
            if (t.toLowerCase()==c.toLowerCase()) cs=1;
            t=z.substring(0,i);
            if ((i=t.lastIndexOf(".")) > -1) {
                t=t.substring(i+1,t.length);
                cn=(t*1);
            }
        }
        if (cs==0 || _myufns==1) {
            t=_myuGC(dc,"__myutma="+_myudh,";");
            if ((i=t.lastIndexOf(".")) > 9) {
                _myuns=t.substring(i+1,t.length);
                _myuns=(_myuns*1);
            }
        cn++;
        if (_myuns==0) _myuns=1;
            _myubd.cookie="__myutmz="+_myudh+"."+_myust+"."+_myuns+"."+cn+"."+c+"; path="+_myutcp+"; "+x+_myudo;
        }
        if (cs==0 || _myufns==1) return "&utmcn=1";
        else return "&utmcr=1";

    }


    function _myuRef() {
        if (_myur=="0" || _myur=="" || _myur=="-") return "";
        var i=0,h,k,n;
        if ((i=_myur.indexOf("://"))<0) return "";
        h=_myur.substring(i+3,_myur.length);
        if (h.indexOf("/") > -1) {
            k=h.substring(h.indexOf("/"),h.length);
            if (k.indexOf("?") > -1) k=k.substring(0,k.indexOf("?"));
            h=h.substring(0,h.indexOf("/"));
        }  
        h=h.toLowerCase();
        n=h;
        if ((i=n.indexOf(":")) > -1) n=n.substring(0,i);
        for (var ii=0;ii<_myuRno.length;ii++) {
            if ((i=n.indexOf(_myuRno[ii].toLowerCase())) > -1 && n.length==(i+_myuRno[ii].length)) { _myufno=1; break; }
        }  
        if (h.indexOf("www.")==0) h=h.substring(4,h.length);
        return "utmccn=(referral)|utmcsr="+_myuEC(h)+"|"+"utmcct="+_myuEC(k)+"|utmcmd=referral";
    }



    function _myuOrg(t) {
        if (_myur=="0" || _myur=="" || _myur=="-") return "";
        var i=0,h,k,csr;
        if ((i=_myur.indexOf("://")) < 0) return "";
        h=_myur.substring(i+3,_myur.length);
        if (h.indexOf("/") > -1) {
            h=h.substring(0,h.indexOf("/"));
        }
        for (var ii=0;ii<_myuOsr.length;ii++) {
            if (h.toLowerCase().indexOf(_myuOsr[ii].toLowerCase()) > -1) {
            csr = _myuOsr[ii];
            if ((i=_myur.indexOf("?"+_myuOkw[ii]+"=")) > -1 || (i=_myur.indexOf("&"+_myuOkw[ii]+"=")) > -1) {
                k=_myur.substring(i+_myuOkw[ii].length+2,_myur.length);
                if ((i=k.indexOf("&")) > -1) k=k.substring(0,i);
                for (var yy=0;yy<_myuOno.length;yy++) {
                    if (_myuOno[yy].toLowerCase()==k.toLowerCase()) { _myufno=1; break; }
                }
                if (t){
                    return _myuEC(k);
                } else {
                    if((i=csr.indexOf(".")) > -1){
                        csr = csr.substring(0,i);
                    }
                    return "utmccn=(organic)|utmcsr="+_myuEC(csr)+"|"+"utmctr="+_myuEC(k)+"|utmcmd=organic";
                }
            }
            }
        }
        return "";
    }


    function _myuBInfo() {
        var sr="-",sc="-",ul="-",fl="-",je=1;
        var n=navigator;
        if (window.screen) {
            sr=screen.width+"x"+screen.height;
            sc=screen.colorDepth+"-bit";
        } else if (window.java) {
            var j=java.awt.Toolkit.getDefaultToolkit();
            var s=j.getScreenSize();
            sr=s.width+"x"+s.height;
        }
        if (n.language) { ul=n.language.toLowerCase(); }
        else if (n.browserLanguage) { ul=n.browserLanguage.toLowerCase(); }

        je=n.javaEnabled()?1:0;

        if (_myuflash) 
            fl=_myuFlash();

        return "&utmsr="+sr+"&utmsc="+sc+"&utmul="+ul+"&utmje="+je+"&utmfl="+fl;
    }

    function _myuFlash() {
        var f="-",n=navigator;
        if (n.plugins && n.plugins.length) {
            for (var ii=0;ii<n.plugins.length;ii++) {
                if (n.plugins[ii].name.indexOf('Shockwave Flash')!=-1) {
                    f=n.plugins[ii].description.split('Shockwave Flash ')[1];
                    break;
                }
            }
        } else if (window.ActiveXObject) {
            for (var ii=10;ii>=2;ii--) {
                try {
                    var fl=eval("new ActiveXObject('ShockwaveFlash.ShockwaveFlash."+ii+"');");
                    if (fl) { f=ii + '.0'; break; }
                }
                catch(e) {}
            }
        }
    return f;
    }


    function _myuGCS() {
        var t,c="",dc=_myubd.cookie;
        if ((t=_myuGC(dc,"__myutma="+_myudh,";"))!="-") c+=_myuES("__myutma="+t+";+");
        if ((t=_myuGC(dc,"__myutmb="+_myudh,";"))!="-") c+=_myuES("__myutmb="+t+";+");
        if ((t=_myuGC(dc,"__myutmc="+_myudh,";"))!="-") c+=_myuES("__myutmc="+t+";+");
        if ((t=_myuGC(dc,"__myutmz="+_myudh,";"))!="-") c+=_myuES("__myutmz="+t+";+");
        if ((t=_myuGC(dc,"__myutmv="+_myudh,";"))!="-") c+=_myuES("__myutmv="+t+";");
        if (c.charAt(c.length-1)=="+") c=c.substring(0,c.length-1);
        return c;
    }



    function _myuGC(l,n,s) {
        if (!l || l=="" || !n || n=="" || !s || s=="") return "-";
        var i,i2,i3,c="-";
        i=l.indexOf(n);
        i3=n.indexOf("=")+1;
        if (i > -1) {
            i2=l.indexOf(s,i); if (i2 < 0) { i2=l.length; }
            c=l.substring((i+i3),i2);
        }
        return c;
    }



    function _myuDomain() {
        if (!_myudn || _myudn=="" || _myudn=="none") { _myudn=""; return 1; }
        if (_myudn=="auto") {
            var d=_myubd.domain;
            if (d.substring(0,4)=="www.") {
                d=d.substring(4,d.length);
            }
            _myudn=d;
        }
        if (_myuhash=="off") return 1;
        return _myuHash(_myudn);
    }


    function _myuHash(d) {
        if (!d || d=="") return 1;
        var h=0,g=0;
        for (var i=d.length-1;i>=0;i--) {
            var c=parseInt(d.charCodeAt(i));
            h=((h << 6) & 0xfffffff) + c + (c << 14);
            if ((g=h & 0xfe00000)!=0) h=(h ^ (g >> 21));
        }
        return h;
    }


    // - Calculate a for _myutma
    function _myuFixA(c,s,t) {
        if (!c || c=="" || !s || s=="" || !t || t=="") return "-";
        var a=_myuGC(c,"__myutma="+_myudh,s);
        var lt=0,i=0;
        if ((i=a.lastIndexOf(".")) > 9) {
            _myuns=a.substring(i+1,a.length);
            _myuns=(_myuns*1)+1;
            a=a.substring(0,i);
            if ((i=a.lastIndexOf(".")) > 7) {
                lt=a.substring(i+1,a.length);
                a=a.substring(0,i);
            }
            if ((i=a.lastIndexOf(".")) > 5) {
                a=a.substring(0,i);
            }
            a+="."+lt+"."+t+"."+_myuns;
        }
        return a;
    }

    function _myuTrim(s) {
        if (!s || s=="") return "";
        while ((s.charAt(0)==' ') || (s.charAt(0)=='\n') || (s.charAt(0,1)=='\r')) s=s.substring(1,s.length);
        while ((s.charAt(s.length-1)==' ') || (s.charAt(s.length-1)=='\n') || (s.charAt(s.length-1)=='\r')) s=s.substring(0,s.length-1);
        return s;
    }


    function _myuEC(s) {
        var n="";
        if (!s || s=="") return "";
        for (var i=0;i<s.length;i++) {if (s.charAt(i)==" ") n+="+"; else n+=s.charAt(i);}
        return n;
    }

    function _myuIN(n) {
        if (!n) return false;
        for (var i=0;i<n.length;i++) {
            var c=n.charAt(i);
            if ((c<"0" || c>"9") && (c!=".")) return false;
        }
        return true;
    }


    function _myuES(s,u) {
        if (typeof(encodeURIComponent) == 'function') {
            if (u) return encodeURI(s);
            else return encodeURIComponent(s);
        } else {
            return escape(s);
        }
    }

    function _myuUES(s) {
        if (typeof(decodeURIComponent) == 'function') {
            return decodeURIComponent(s);
        } else {
            return unescape(s);
        }
    }
    myurchinTracker();
}