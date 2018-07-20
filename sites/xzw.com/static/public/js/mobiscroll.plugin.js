(function($) {
	var abc={lunarInfo:[19416,19168,42352,21717,53856,55632,91476,22176,39632,21970,19168,42422,42192,53840,119381,46400,54944,44450,38320,84343,18800,42160,46261,27216,27968,109396,11104,38256,21234,18800,25958,54432,59984,28309,23248,11104,100067,37600,116951,51536,54432,120998,46416,22176,107956,9680,37584,53938,43344,46423,27808,46416,86869,19872,42416,83315,21168,43432,59728,27296,44710,43856,19296,43748,42352,21088,62051,55632,23383,22176,38608,19925,19152,42192,54484,53840,54616,46400,46752,103846,38320,18864,43380,42160,45690,27216,27968,44870,43872,38256,19189,18800,25776,29859,59984,27480,21952,43872,38613,37600,51552,55636,54432,55888,30034,22176,43959,9680,37584,51893,43344,46240,47780,44368,21977,19360,42416,86390,21168,43312,31060,27296,44368,23378,19296,42726,42208,53856,60005,54576,23200,30371,38608,19415,19152,42192,118966,53840,54560,56645,46496,22224,21938,18864,42359,42160,43600,111189,27936,44448,84835,37744,18936,18800,25776,92326,59984,27424,108228,43744,41696,53987,51552,54615,54432,55888,23893,22176,42704,21972,21200,43448,43344,46240,46758,44368,21920,43940,42416,21168,45683,26928,29495,27296,44368,84821,19296,42352,21732,53600,59752,54560,55968,92838,22224,19168,43476,41680,53584,62034,54560],solarMonth:[31,28,31,30,31,30,31,31,30,31,30,31],Gan:["甲","乙","丙","丁","戊","己","庚","辛","壬","癸"],Zhi:["子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"],Animals:["鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪"],solarTerm:["小寒","大寒","立春","雨水","惊蛰","春分","清明","谷雨","立夏","小满","芒种","夏至","小暑","大暑","立秋","处暑","白露","秋分","寒露","霜降","立冬","小雪","大雪","冬至"],sTermInfo:["9778397bd097c36b0b6fc9274c91aa","97b6b97bd19801ec9210c965cc920e","97bcf97c3598082c95f8c965cc920f","97bd0b06bdb0722c965ce1cfcc920f","b027097bd097c36b0b6fc9274c91aa","97b6b97bd19801ec9210c965cc920e","97bcf97c359801ec95f8c965cc920f","97bd0b06bdb0722c965ce1cfcc920f","b027097bd097c36b0b6fc9274c91aa","97b6b97bd19801ec9210c965cc920e","97bcf97c359801ec95f8c965cc920f","97bd0b06bdb0722c965ce1cfcc920f","b027097bd097c36b0b6fc9274c91aa","9778397bd19801ec9210c965cc920e","97b6b97bd19801ec95f8c965cc920f","97bd09801d98082c95f8e1cfcc920f","97bd097bd097c36b0b6fc9210c8dc2","9778397bd197c36c9210c9274c91aa","97b6b97bd19801ec95f8c965cc920e","97bd09801d98082c95f8e1cfcc920f","97bd097bd097c36b0b6fc9210c8dc2","9778397bd097c36c9210c9274c91aa","97b6b97bd19801ec95f8c965cc920e","97bcf97c3598082c95f8e1cfcc920f","97bd097bd097c36b0b6fc9210c8dc2","9778397bd097c36c9210c9274c91aa","97b6b97bd19801ec9210c965cc920e","97bcf97c3598082c95f8c965cc920f","97bd097bd097c35b0b6fc920fb0722","9778397bd097c36b0b6fc9274c91aa","97b6b97bd19801ec9210c965cc920e","97bcf97c3598082c95f8c965cc920f","97bd097bd097c35b0b6fc920fb0722","9778397bd097c36b0b6fc9274c91aa","97b6b97bd19801ec9210c965cc920e","97bcf97c359801ec95f8c965cc920f","97bd097bd097c35b0b6fc920fb0722","9778397bd097c36b0b6fc9274c91aa","97b6b97bd19801ec9210c965cc920e","97bcf97c359801ec95f8c965cc920f","97bd097bd097c35b0b6fc920fb0722","9778397bd097c36b0b6fc9274c91aa","97b6b97bd19801ec9210c965cc920e","97bcf97c359801ec95f8c965cc920f","97bd097bd07f595b0b6fc920fb0722","9778397bd097c36b0b6fc9210c8dc2","9778397bd19801ec9210c9274c920e","97b6b97bd19801ec95f8c965cc920f","97bd07f5307f595b0b0bc920fb0722","7f0e397bd097c36b0b6fc9210c8dc2","9778397bd097c36c9210c9274c920e","97b6b97bd19801ec95f8c965cc920f","97bd07f5307f595b0b0bc920fb0722","7f0e397bd097c36b0b6fc9210c8dc2","9778397bd097c36c9210c9274c91aa","97b6b97bd19801ec9210c965cc920e","97bd07f1487f595b0b0bc920fb0722","7f0e397bd097c36b0b6fc9210c8dc2","9778397bd097c36b0b6fc9274c91aa","97b6b97bd19801ec9210c965cc920e","97bcf7f1487f595b0b0bb0b6fb0722","7f0e397bd097c35b0b6fc920fb0722","9778397bd097c36b0b6fc9274c91aa","97b6b97bd19801ec9210c965cc920e","97bcf7f1487f595b0b0bb0b6fb0722","7f0e397bd097c35b0b6fc920fb0722","9778397bd097c36b0b6fc9274c91aa","97b6b97bd19801ec9210c965cc920e","97bcf7f1487f531b0b0bb0b6fb0722","7f0e397bd097c35b0b6fc920fb0722","9778397bd097c36b0b6fc9274c91aa","97b6b97bd19801ec9210c965cc920e","97bcf7f1487f531b0b0bb0b6fb0722","7f0e397bd07f595b0b6fc920fb0722","9778397bd097c36b0b6fc9274c91aa","97b6b97bd19801ec9210c9274c920e","97bcf7f0e47f531b0b0bb0b6fb0722","7f0e397bd07f595b0b0bc920fb0722","9778397bd097c36b0b6fc9210c91aa","97b6b97bd197c36c9210c9274c920e","97bcf7f0e47f531b0b0bb0b6fb0722","7f0e397bd07f595b0b0bc920fb0722","9778397bd097c36b0b6fc9210c8dc2","9778397bd097c36c9210c9274c920e","97b6b7f0e47f531b0723b0b6fb0722","7f0e37f5307f595b0b0bc920fb0722","7f0e397bd097c36b0b6fc9210c8dc2","9778397bd097c36b0b70c9274c91aa","97b6b7f0e47f531b0723b0b6fb0721","7f0e37f1487f595b0b0bb0b6fb0722","7f0e397bd097c35b0b6fc9210c8dc2","9778397bd097c36b0b6fc9274c91aa","97b6b7f0e47f531b0723b0b6fb0721","7f0e27f1487f595b0b0bb0b6fb0722","7f0e397bd097c35b0b6fc920fb0722","9778397bd097c36b0b6fc9274c91aa","97b6b7f0e47f531b0723b0b6fb0721","7f0e27f1487f531b0b0bb0b6fb0722","7f0e397bd097c35b0b6fc920fb0722","9778397bd097c36b0b6fc9274c91aa","97b6b7f0e47f531b0723b0b6fb0721","7f0e27f1487f531b0b0bb0b6fb0722","7f0e397bd097c35b0b6fc920fb0722","9778397bd097c36b0b6fc9274c91aa","97b6b7f0e47f531b0723b0b6fb0721","7f0e27f1487f531b0b0bb0b6fb0722","7f0e397bd07f595b0b0bc920fb0722","9778397bd097c36b0b6fc9274c91aa","97b6b7f0e47f531b0723b0787b0721","7f0e27f0e47f531b0b0bb0b6fb0722","7f0e397bd07f595b0b0bc920fb0722","9778397bd097c36b0b6fc9210c91aa","97b6b7f0e47f149b0723b0787b0721","7f0e27f0e47f531b0723b0b6fb0722","7f0e397bd07f595b0b0bc920fb0722","9778397bd097c36b0b6fc9210c8dc2","977837f0e37f149b0723b0787b0721","7f07e7f0e47f531b0723b0b6fb0722","7f0e37f5307f595b0b0bc920fb0722","7f0e397bd097c35b0b6fc9210c8dc2","977837f0e37f14998082b0787b0721","7f07e7f0e47f531b0723b0b6fb0721","7f0e37f1487f595b0b0bb0b6fb0722","7f0e397bd097c35b0b6fc9210c8dc2","977837f0e37f14998082b0787b06bd","7f07e7f0e47f531b0723b0b6fb0721","7f0e27f1487f531b0b0bb0b6fb0722","7f0e397bd097c35b0b6fc920fb0722","977837f0e37f14998082b0787b06bd","7f07e7f0e47f531b0723b0b6fb0721","7f0e27f1487f531b0b0bb0b6fb0722","7f0e397bd097c35b0b6fc920fb0722","977837f0e37f14998082b0787b06bd","7f07e7f0e47f531b0723b0b6fb0721","7f0e27f1487f531b0b0bb0b6fb0722","7f0e397bd07f595b0b0bc920fb0722","977837f0e37f14998082b0787b06bd","7f07e7f0e47f531b0723b0b6fb0721","7f0e27f1487f531b0b0bb0b6fb0722","7f0e397bd07f595b0b0bc920fb0722","977837f0e37f14998082b0787b06bd","7f07e7f0e47f149b0723b0787b0721","7f0e27f0e47f531b0b0bb0b6fb0722","7f0e397bd07f595b0b0bc920fb0722","977837f0e37f14998082b0723b06bd","7f07e7f0e37f149b0723b0787b0721","7f0e27f0e47f531b0723b0b6fb0722","7f0e397bd07f595b0b0bc920fb0722","977837f0e37f14898082b0723b02d5","7ec967f0e37f14998082b0787b0721","7f07e7f0e47f531b0723b0b6fb0722","7f0e37f1487f595b0b0bb0b6fb0722","7f0e37f0e37f14898082b0723b02d5","7ec967f0e37f14998082b0787b0721","7f07e7f0e47f531b0723b0b6fb0722","7f0e37f1487f531b0b0bb0b6fb0722","7f0e37f0e37f14898082b0723b02d5","7ec967f0e37f14998082b0787b06bd","7f07e7f0e47f531b0723b0b6fb0721","7f0e37f1487f531b0b0bb0b6fb0722","7f0e37f0e37f14898082b072297c35","7ec967f0e37f14998082b0787b06bd","7f07e7f0e47f531b0723b0b6fb0721","7f0e27f1487f531b0b0bb0b6fb0722","7f0e37f0e37f14898082b072297c35","7ec967f0e37f14998082b0787b06bd","7f07e7f0e47f531b0723b0b6fb0721","7f0e27f1487f531b0b0bb0b6fb0722","7f0e37f0e366aa89801eb072297c35","7ec967f0e37f14998082b0787b06bd","7f07e7f0e47f149b0723b0787b0721","7f0e27f1487f531b0b0bb0b6fb0722","7f0e37f0e366aa89801eb072297c35","7ec967f0e37f14998082b0723b06bd","7f07e7f0e47f149b0723b0787b0721","7f0e27f0e47f531b0723b0b6fb0722","7f0e37f0e366aa89801eb072297c35","7ec967f0e37f14998082b0723b06bd","7f07e7f0e37f14998083b0787b0721","7f0e27f0e47f531b0723b0b6fb0722","7f0e37f0e366aa89801eb072297c35","7ec967f0e37f14898082b0723b02d5","7f07e7f0e37f14998082b0787b0721","7f07e7f0e47f531b0723b0b6fb0722","7f0e36665b66aa89801e9808297c35","665f67f0e37f14898082b0723b02d5","7ec967f0e37f14998082b0787b0721","7f07e7f0e47f531b0723b0b6fb0722","7f0e36665b66a449801e9808297c35","665f67f0e37f14898082b0723b02d5","7ec967f0e37f14998082b0787b06bd","7f07e7f0e47f531b0723b0b6fb0721","7f0e36665b66a449801e9808297c35","665f67f0e37f14898082b072297c35","7ec967f0e37f14998082b0787b06bd","7f07e7f0e47f531b0723b0b6fb0721","7f0e26665b66a449801e9808297c35","665f67f0e37f1489801eb072297c35","7ec967f0e37f14998082b0787b06bd","7f07e7f0e47f531b0723b0b6fb0721","7f0e27f1487f531b0b0bb0b6fb0722"],nStr1:["日","一","二","三","四","五","六","七","八","九","十"],nStr2:["初","十","廿","卅"],nStr3:["正","二","三","四","五","六","七","八","九","十","冬","腊"],lYearDays:function(f){var c,e=348;for(c=32768;c>8;c>>=1)e+=abc.lunarInfo[f-1900]&c?1:0;return e+abc.leapDays(f)},leapMonth:function(f){return 15&abc.lunarInfo[f-1900]},leapDays:function(f){return abc.leapMonth(f)?65536&abc.lunarInfo[f-1900]?30:29:0},monthDays:function(f,c){return c>12||1>c?-1:abc.lunarInfo[f-1900]&65536>>c?30:29},solarDays:function(f,c){if(c>12||1>c)return-1;var e=c-1;return 1==e?f%4==0&&f%100!=0||f%400==0?29:28:abc.solarMonth[e]},toGanZhi:function(f){return abc.Gan[f%10]+abc.Zhi[f%12]},getTerm:function(f,c){if(1900>f||f>2100)return-1;if(1>c||c>24)return-1;var e=abc.sTermInfo[f-1900],a=[parseInt("0x"+e.substr(0,5)).toString(),parseInt("0x"+e.substr(5,5)).toString(),parseInt("0x"+e.substr(10,5)).toString(),parseInt("0x"+e.substr(15,5)).toString(),parseInt("0x"+e.substr(20,5)).toString(),parseInt("0x"+e.substr(25,5)).toString()],r=[a[0].substr(0,1),a[0].substr(1,2),a[0].substr(3,1),a[0].substr(4,2),a[1].substr(0,1),a[1].substr(1,2),a[1].substr(3,1),a[1].substr(4,2),a[2].substr(0,1),a[2].substr(1,2),a[2].substr(3,1),a[2].substr(4,2),a[3].substr(0,1),a[3].substr(1,2),a[3].substr(3,1),a[3].substr(4,2),a[4].substr(0,1),a[4].substr(1,2),a[4].substr(3,1),a[4].substr(4,2),a[5].substr(0,1),a[5].substr(1,2),a[5].substr(3,1),a[5].substr(4,2)];return parseInt(r[c-1])},toChinaYear:function(b){var f="零一二三四五六七八九";return b.toString().split("").map(function(b){return f.substr(b,1)}).join("")},toChinaMonth:function(f){if(f>12||1>f)return-1;var c=abc.nStr3[f-1];return c+="月"},toChinaDay:function(f){var c;switch(f){case 10:c="初十";break;case 20:c="二十";break;case 30:c="三十";break;default:c=abc.nStr2[Math.floor(f/10)],c+=abc.nStr1[f%10]}return c},getAnimal:function(f){return abc.Animals[(f-4)%12]},solar2lunar:function(f,c,e){if(1900>f||f>2100)return-1;if(1900==f&&1==c&&31>e)return-1;if(f)var a=new Date(f,parseInt(c)-1,e);else var a=new Date;var r,t=0,d=0,f=a.getFullYear(),c=a.getMonth()+1,e=a.getDate(),n=(Date.UTC(a.getFullYear(),a.getMonth(),a.getDate())-Date.UTC(1900,0,31))/864e5;for(r=1900;2101>r&&n>0;r++)d=abc.lYearDays(r),n-=d;0>n&&(n+=d,r--);var s=new Date,u=!1;s.getFullYear()==f&&s.getMonth()+1==c&&s.getDate()==e&&(u=!0);var o=a.getDay(),i=abc.nStr1[o];0==o&&(o=7);var l=r,t=abc.leapMonth(r),h=!1;for(r=1;13>r&&n>0;r++)t>0&&r==t+1&&0==h?(--r,h=!0,d=abc.leapDays(l)):d=abc.monthDays(l,r),1==h&&r==t+1&&(h=!1),n-=d;0==n&&t>0&&r==t+1&&(h?h=!1:(h=!0,--r)),0>n&&(n+=d,--r);var D=r,g=n+1,p=c-1,v=abc.getTerm(l,3),m=abc.toGanZhi(l-4);m=abc.toGanZhi(2>p&&v>e?l-5:l-4);var y=abc.getTerm(f,2*c-1),T=abc.getTerm(f,2*c),I=abc.toGanZhi(12*(f-1900)+c+11);e>=y&&(I=abc.toGanZhi(12*(f-1900)+c+12));var M=!1,C=null;y==e&&(M=!0,C=abc.solarTerm[2*c-2]),T==e&&(M=!0,C=abc.solarTerm[2*c-1]);var S=Date.UTC(f,p,1,0,0,0,0)/864e5+25567+10,Y=abc.toGanZhi(S+e-1);return{lYear:l,IYearCn:abc.toChinaYear(l),lMonth:D,lDay:g,Animal:abc.getAnimal(l),IMonthCn:(h?"闰":"")+abc.toChinaMonth(D),IDayCn:abc.toChinaDay(g),cYear:f,cMonth:c,cDay:e,gzYear:m,gzMonth:I,gzDay:Y,isToday:u,isLeap:h,nWeek:o,ncWeek:"星期"+i,isTerm:M,Term:C}},lunar2solar:function(f,c,e,a){{var r=abc.leapMonth(f);abc.leapDays(f)}if(a&&r!=c)return-1;if(2100==f&&12==c&&e>1||1900==f&&1==c&&31>e)return-1;var t=abc.monthDays(f,c);if(1900>f||f>2100||e>t)return-1;for(var d=0,n=1900;f>n;n++)d+=abc.lYearDays(n);for(var s=0,u=!1,n=1;c>n;n++)s=abc.leapMonth(f),u||n>=s&&s>0&&(d+=abc.leapDays(f),u=!0),d+=abc.monthDays(f,n);a&&(d+=t);var o=Date.UTC(1900,1,30,0,0,0),i=new Date(864e5*(d+e-31)+o),l=i.getUTCFullYear(),h=i.getUTCMonth()+1,D=i.getUTCDate();return abc.solar2lunar(l,h,D)}};
	var e, s = $.mobiscroll,
	t = {
		isSolar: !0,
		startYear: 1900,
		endYear: 2100,
		enableSolarLunar: !0,
		showSolarLunar: !1,
		returnSolar: !1,
		formatValueCallback: null
	};
	s.presets.scroller.solarPicker = function(s) {
		function ai(a) {
			return {
				value: a,
				display: w?a:abc.toGanZhi(a - 4) + "(" + a + ")"
			}
		}
		function ad(a) {
			return a
		}
		function n() {
			var o = [],
			m = [],
			e,
			t,
			n,
			r,
			k,
			i = s.getArrayVal(!0) || [N.getFullYear(), N.getMonth() + 1, N.getDate()];
			m.push({
				cssClass: 'mbsc-dt-whl-y',
				label: d.yearText,
				min: d.startYear,
				max: d.endYear,
				data: ai,
				getIndex: ad
			});
			if (w) {
				for (e = [], n = 1; 12 >= n; n++) {
					e.push({
						value: n,
						display: n+''+d.monthText
					})
				}
				m.push({
					cssClass: 'mbsc-dt-whl-m',
					label: d.monthText,
					data: e
				});
				for (e = [], p = h[i[1] - 1] || 31, r = 1; p >= r; r++) {
					e.push({
						value: r,
						display: r+''+d.dayText
					})
				}
				m.push({
					cssClass: 'mbsc-dt-whl-d',
					label: d.dayText,
					data: e
				})
			} else {
				for (e = [], k = -1 * abc.leapMonth(i[0]), n = 1; 12 >= n; n++) {
					e.push({
						value: n,
						display: abc.toChinaMonth(n)
					}),
					n == -1 * k && (e.push({
						value: k,
						display: "闰" + abc.toChinaMonth(n)
					}))
				}
				m.push({
					cssClass: 'mbsc-dt-whl-m',
					label: d.monthText,
					data: e
				});
				for (e = [], p = k == i[1] ? abc.leapDays(i[0]) : abc.monthDays(i[0], i[1]), r = 1; p >= r; r++) {
					e.push({
						value: r,
						display: abc.toChinaDay(r)
					})
				}
				m.push({
					cssClass: 'mbsc-dt-whl-d',
					label: d.dayText,
					data: e
				})
			}
			o.push(m);
			return o
		}
		var o, i, u, h = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
		c = $.extend({},
		s.settings),
		d = $.extend(s.settings, t, c),
		N = new Date(),
		b = {},
		p = d.enableSolarLunar,
		y = d.showSolarLunar,
		w = d.isSolar,
		C = d.formatValueCallback,
		G = d.returnSolar,
		g = ["set"],
		m = n(),
		k = $(this),
		om = 0,
		oy = 0,
		M = t.minWidth || ['40%', '30%', '20%'],
		D = function(e) {
			if ("string" == typeof e) return e;
			e.forEach(function(a, s) {
				e[s] = 1 * a
			},
			0);
			var s, t, p, hm = '';
			w ? (s = p = e[0] + "年" + (e[1] > 9 ? e[1] : "0" + e[1]) + "月" + (e[2] > 9 ? e[2] : "0" + e[2]) + '日', 
			t = abc.solar2lunar(e[0], e[1], e[2]), 
			p && y && (s += " " + t.gzYear + "年(" + e[0] + ")" + t.IMonthCn + t.IDayCn),(s=[s,e[0]+"-"+e[1]+"-"+e[2]]))
			: 
			
			(t = abc.lunar2solar(e[0], Math.abs(e[1]), e[2], e[1] < 0 ? !0 : !1), 
			s = p? (t.cYear + "年" + t.cMonth + "月" + t.cDay + "日"):(abc.toGanZhi(e[0] - 4) + "年" + (e[1] < 0 ? "闰": "") + abc.toChinaMonth(Math.abs(e[1])) + abc.toChinaDay(e[2])), 
			p && y && (s += "   " + t.cYear + "年" + t.cMonth + "月" + t.cDay + "日"),(s =[s,G?t.cYear+'-'+t.cMonth+'-'+t.cDay:e[0]+'/'+s])),
			s = C && C(e, w, p) || s;			
			return s
		};
		return p && g.push({
			text: "公历",
			cssClass: "dwb-g-b" + (w ? " active": ""),
			parentClass: "dwb-g",
			handler: function(e, s) {
				$(this).hasClass("active") || ($(this).addClass("active"), $(".mbsc-ios .dwb-n-b").removeClass("active"), w = !0, s.settings.isSolar = w, i = s.getArrayVal(!0), u = abc.lunar2solar(i[0], Math.abs(i[1]), i[2], i[1] < 0 ? !0 : !1, i = [u.cYear, u.cMonth, u.cDay]), s.setArrayVal(i, !1, !1, !0, 0)),
				d.wheels = n();
				var B = {},
				B = d.wheels[0];
				s.changeWheel(B)
			}
		},
		{
			text: "农历",
			cssClass: "dwb-n-b" + (w ? "": " active"),
			parentClass: "dwb-n",
			handler: function(e, s) {
				$(this).hasClass("active") || ($(this).addClass("active"), $(".mbsc-ios .dwb-g-b").removeClass("active"), w = !1, s.settings.isSolar = w, i = s.getArrayVal(!0), u = abc.solar2lunar(i[0], i[1], i[2]), i = [u.lYear, u.isLeap ? -1 * u.lMonth: u.lMonth, u.lDay], s.setArrayVal(i, !1, !1, !0, 0)),
				d.wheels = n();
				var B = {};
				B = d.wheels[0];
				s.changeWheel(B)
			}
		}),
		{
			minWidth: M,
			wheels: m,
			isSolar: w,
			compClass: 'mbsc-dt',
			formatValue: D,
			parseValue: function(a) {
				return a
			},
			buttons: g,
			headerText: !1,
			onBeforeShow: function() {
				var m = s.getArrayVal(!0);
				if (!m[0] || !m[1] || !m[2]) s.setArrayVal([N.getFullYear(), N.getMonth() + 1, N.getDate()], !1, !1, !0, 0);
				k.blur()
			},
			onSet: function(a) {
				k && (v = d.txtobj?$(d.txtobj,k):k,v.text(a.valueText[0]).addClass('notempty'),k.attr('data-val',a.valueText[1]),$('input',k).val(a.valueText[1]))
			},
			onShow: function(a) {
				w ? ($(".dwb-n-b", a.target).removeClass("active"), $(".dwb-g-b", a.target).addClass("active")) : ($(".dwb-n-b", a.target).addClass("active"), $(".dwb-g-b", a.target).removeClass("active"))
			},
			validate: function(a, s) {
				cm = s._tempWheelArray;
				if (w) {
					if (om != cm[1]) {
						var B = {},
						_l = n();
						B[2] = _l[0][2];
						s.changeWheel(B)
					}
				} else {
					if (om != cm[1] || oy != cm[0]) {
						var B = {},
						_l = n();
						if (om != cm[1]) B[2] = _l[0][2];
						else B[1] = _l[0][1];
						s.changeWheel(B)
					}
				}
				om = s._tempWheelArray[1];
				oy = s._tempWheelArray[0]
			}
		}
	};
	s.presetShort("solarPicker")
})(jQuery);
(function($) {
	var city=[{"s":"\u5317\u4EAC","c":["\u5E02\u533A","\u5E73\u8C37","\u5BC6\u4E91","\u987A\u4E49","\u901A\u53BF","\u6000\u67D4","\u5927\u5174","\u623F\u5C71","\u5EF6\u5E86","\u660C\u5E73"]},{"s":"\u4E0A\u6D77","c":["\u5E02\u533A","\u5609\u5B9A","\u5B9D\u5C71","\u5DDD\u6C99","\u5357\u6C47","\u5949\u8D24","\u677E\u6C5F","\u91D1\u5C71","\u9752\u6D66","\u5D07\u660E"]},{"s":"\u5929\u6D25","c":["\u5E02\u533A","\u5B81\u6CB3","\u9759\u6D77","\u84DF\u53BF","\u5B9D\u577B","\u6B66\u6E05"]},{"s":"\u91CD\u5E86","c":["\u5E02\u533A","\u7DA6\u6C5F","\u957F\u5BFF","\u5357\u6850","\u5408\u5DDD","\u6F7C\u5357","\u94DC\u6881","\u58C1\u5C71","\u8363\u660C","\u5927\u8DB3","\u6C38\u5DDD","\u4E07\u76DB"]},{"s":"\u6E2F\u6FB3\u53F0","c":["\u9999\u6E2F","\u6FB3\u95E8","\u53F0\u5317","\u9AD8\u96C4","\u57FA\u9686","\u53F0\u4E2D","\u53F0\u5357","\u5B9C\u5170","\u6843\u56ED","\u65B0\u7AF9"]},{"s":"\u5B89\u5FBD","c":["\u5408\u80A5","\u957F\u4E30","\u6DEE\u5357","\u51E4\u53F0","\u6DEE\u5317","\u6FC9\u6EAA","\u829C\u6E56","\u94DC\u9675","\u868C\u57E0","\u9A6C\u978D\u5C71","\u5B89\u5E86","\u5BBF\u5DDE","\u5BBF\u53BF","\u7800\u5C71","\u8427\u53BF","\u5434\u58C1","\u6CD7\u53BF","\u4E94\u6CB3","\u56FA\u9547","\u6000\u8FDC","\u6EC1\u5DDE","\u5609\u5C71","\u5929\u957F","\u6765\u5B89","\u5168\u6912","\u5B9A\u8FDC","\u51E4\u9633","\u5DE2\u6E56","\u5DE2\u53BF","\u80A5\u4E1C","\u542B\u5C71","\u548C\u53BF","\u65E0\u4E3A","\u5362\u6C5F","\u5BA3\u57CE","\u5F53\u6D82","\u90CE\u6EAA","\u5E7F\u5FB7","\u6CFE\u53BF","\u5357\u9675","\u7E41\u660C","\u5B81\u56FD","\u9752\u9633","\u5C6F\u6EAA","\u4F11\u5B81","\u65CC\u5F97","\u7EE9\u6EAA","\u6B59\u53BF","\u7941\u95E8","\u9EDF\u53BF","\u592A\u5E73","\u77F3\u53F0","\u6850\u57CE","\u7EB5\u9633","\u6000\u5B81","\u671B\u6C5F","\u5BBF\u677E","\u592A\u6E56","\u5CB3\u897F","\u6F5C\u5C71","\u4E1C\u81F3","\u8D35\u6C60","\u516D\u5B89","\u970D\u4E18","\u5BFF\u53BF","\u80A5\u897F","\u8212\u57CE","\u970D\u5C71","\u91D1\u5BE8","\u961C\u9633","\u6BEB\u53BF","\u6DA1\u9633","\u8499\u57CE","\u5229\u8F9B","\u9896\u4E0A","\u961C\u5357","\u4E34\u6CC9","\u754C\u9996","\u592A\u548C"]},{"s":"\u798F\u5EFA","c":["\u798F\u5DDE","\u95FD\u4FAF","\u53A6\u95E8","\u540C\u5B89","\u5357\u5E73","\u5357\u5E73","\u5EFA\u74EF","\u6D66\u57CE","\u90B5\u6B66","\u987A\u660C","\u5D07\u5B89","\u5149\u6CFD","\u677E\u6EAA","\u653F\u548C","\u5B81\u5FB7","\u798F\u5B89","\u8FDE\u6C5F","\u798F\u9F0E","\u971E\u6D66","\u5409\u7530","\u7F57\u6E90","\u5BFF\u5B81","\u5468\u5B81","\u5C4F\u5357","\u67D8\u8363","\u8386\u7530","\u4ED9\u6E38","\u798F\u6E05","\u957F\u4E50","\u6C38\u6CF0","\u5E73\u6F6D","\u95FD\u6E05","\u6CC9\u5DDE","\u664B\u6C5F","\u5357\u5B89","\u60E0\u5B89","\u5B89\u6EAA","\u6C38\u6625","\u5FB7\u5316","\u91D1\u95E8","\u6F33\u5DDE","\u9F99\u6D77","\u6F33\u6D66","\u8BCF\u5B89","\u5E73\u548C","\u4E91\u9704","\u5357\u9756","\u957F\u6CF0","\u4E1C\u5C71","\u534E\u5B89","\u9F99\u5CA9","\u4E0A\u676D","\u6C38\u5B9A","\u957F\u6C40","\u6B66\u5E73","\u8FDE\u57CE","\u6F33\u5E73","\u4E09\u660E","\u9F99\u6EAA","\u5B81\u5316","\u5927\u7530","\u6C38\u5B89","\u6C99\u53BF","\u5C06\u4E50","\u6E05\u6D41","\u5EFA\u5B81","\u6CF0\u5B81","\u660E\u6EAA"]},{"s":"\u5E7F\u4E1C","c":["\u5E7F\u5DDE","\u82B1\u53BF","\u65B0\u5341","\u589E\u57CE","\u4ECE\u5316","\u9F99\u95E8","\u756A\u79BA","\u6C55\u5934","\u6E5B\u6C5F","\u8302\u540D","\u4F5B\u5C71","\u6C5F\u95E8","\u6DF1\u5733","\u5B9D\u5B89","\u73E0\u6D77","\u97F6\u5173","\u66F2\u6C5F","\u4E50\u660C","\u4EC1\u5316","\u5357\u96C4","\u59CB\u5174","\u7FC1\u6E90","\u4F5B\u5C97","\u82F1\u5FB7","\u6E05\u8FDC","\u9633\u5C71","\u8FDE\u53BF","\u8FDE\u5C71","\u8FDE\u5357","\u60E0\u5DDE","\u60E0\u9633","\u535A\u7F57","\u6CB3\u6E90","\u8FDE\u5E73","\u548C\u5E73","\u9F99\u5DDD","\u7D2B\u91D1","\u60E0\u4E1C","\u4E1C\u839E","\u6885\u5DDE","\u6885\u53BF","\u5E73\u8FDC","\u8549\u5CAD","\u5927\u57D4","\u4E30\u987A","\u4E94\u534E","\u5174\u5B81","\u6F6E\u5DDE","\u6F84\u6D77","\u6F6E\u5B89","\u9976\u5E73","\u5357\u6FB3","\u6F6E\u9633","\u60E0\u6765","\u9646\u4E30","\u6D77\u4E30","\u666E\u5B81","\u63ED\u897F","\u63ED\u9633","\u5357\u6D77","\u4E09\u6C34","\u987A\u5FB7","\u4E2D\u5C71","\u6597\u95E8","\u65B0\u4F1A","\u9E64\u5C71","\u5F00\u5E73","\u53F0\u5C71","\u6069\u5E73","\u9AD8\u660E","\u5EC9\u6C5F","\u5316\u5DDE","\u9AD8\u5DDE","\u4FE1\u5B9C","\u9633\u6625","\u9633\u6C5F","\u7535\u767D","\u5434\u5DDD","\u5F90\u95FB","\u6D77\u5EB7","\u9042\u6EAA","\u8087\u5E86","\u9AD8\u8981","\u6000\u96C6","\u5E7F\u5B81","\u56DB\u4F1A","\u65B0\u5174","\u4E91\u6D6E","\u7F57\u5B9A","\u90C1\u5357","\u5FB7\u5E86","\u5C01\u5F00"]},{"s":"\u5E7F\u897F","c":["\u5357\u5B81","\u67F3\u5DDE","\u6842\u6797","\u68A7\u5DDE","\u51ED\u7965","\u9095\u5B81","\u6B66\u9E23","\u9A6C\u5C71","\u4E0A\u6797","\u5BBE\u9633","\u6A2A\u53BF","\u6276\u7EE5","\u5D07\u5DE6","\u5B81\u660E","\u9F99\u5DDE","\u5927\u65B0","\u5929\u7B49","\u9686\u5B89","\u6CB3\u6C60","\u73AF\u6C5F","\u7F57\u57CE","\u5B9C\u5C71","\u4E1C\u5170","\u51E4\u5C71","\u5929\u5CE8","\u5357\u4E39","\u90FD\u5B89","\u5DF4\u9A6C","\u5408\u5C71","\u67F3\u57CE","\u878D\u5B89","\u9E7F\u5BE8","\u8C61\u5DDE","\u6B66\u5B9C","\u67F3\u6C5F","\u6765\u5BBE","\u5FFB\u57CE","\u878D\u6C34","\u4E09\u6C5F","\u91D1\u79C0","\u4E34\u6842","\u7075\u5DDD","\u5174\u5B89","\u8D44\u6E90","\u5168\u5DDE","\u704C\u9633","\u606D\u57CE","\u5E73\u4E50","\u8354\u6D66","\u6C38\u798F","\u9F99\u80DC","\u82CD\u609F","\u949F\u5C71","\u5BCC\u5DDD","\u8D3A\u53BF","\u5C91\u6EAA","\u85E4\u53BF","\u8499\u5C71","\u662D\u5E73","\u7389\u6797","\u6842\u5E73","\u5E73\u5357","\u5BB9\u53BF","\u5317\u6D41","\u9646\u5DDD","\u535A\u767D","\u8D35\u53BF","\u5317\u6D77","\u94A6\u5DDE","\u7075\u5C71","\u6D66\u5317","\u5408\u6D66","\u4E0A\u601D","\u9632\u57CE","\u767E\u8272","\u51CC\u4E91","\u4E50\u4E1A","\u7530\u9633","\u7530\u4E1C","\u5E73\u679C","\u5FB7\u4FDD","\u9756\u897F","\u90A3\u5761","\u897F\u6797","\u7530\u6797","\u9686\u6797"]},{"s":"\u8D35\u5DDE","c":["\u8D35\u9633","\u6E05\u9547","\u666E\u5B9A","\u5F00\u9633","\u516D\u76D8\u6C34","\u6C34\u57CE","\u76D8\u53BF","\u516D\u679D","\u9075\u4E49","\u7EE5\u9633","\u9053\u771F","\u51E4\u5188","\u4F59\u5E86","\u8D64\u6C34","\u6850\u6893","\u6B63\u5B89","\u52A1\u5DDD","\u6E44\u6F6D","\u4EC1\u6000","\u4E60\u6C34","\u94DC\u4EC1","\u7389\u5C4F","\u601D\u5357","\u5FB7\u6C5F","\u4E07\u5C71","\u6C5F\u53E3","\u5E08\u9621","\u5370\u6C5F","\u6CBF\u6CB3","\u677E\u6843","\u6BD5\u8282","\u9ED4\u897F","\u7EC7\u91D1","\u8D6B\u7AE0","\u5927\u65B9","\u91D1\u6C99","\u94A0\u96CD","\u5A01\u5B81","\u5B89\u987A","\u606F\u70FD","\u4FEE\u6587","\u5E73\u575D","\u9547\u5B81","\u7D2B\u4E91","\u5173\u5CAD","\u5174\u4E49","\u666E\u5B89","\u8D1E\u4E30","\u671B\u8C1F","\u518C\u4EAD","\u5B89\u9F99","\u5174\u4EC1","\u6674\u9F99","\u51EF\u91CC","\u65BD\u79C9","\u9547\u8FDC","\u5929\u67F1","\u5251\u6CB3","\u9ECE\u5E73","\u4ECE\u6C5F","\u9EBB\u6C5F","\u9EC4\u5E73","\u4E09\u7A57","\u5C91\u5DE9","\u9526\u5C4F","\u53F0\u6C5F","\u6995\u6C5F","\u96F7\u5C71","\u4E39\u5BE8","\u90FD\u5300","\u8D35\u5B9A","\u74EE\u5B89","\u5E73\u5858","\u957F\u987A","\u60E0\u6C34","\u8354\u6CE2","\u798F\u6CC9","\u72EC\u5C71","\u7F57\u7538","\u9F99\u91CC","\u4E09\u90FD"]},{"s":"\u7518\u8083","c":["\u5170\u5DDE","\u6C38\u767B","\u6986\u4E2D","\u6C38\u660C","\u768B\u5170","\u5B9A\u897F","\u4F1A\u5B81","\u9647\u897F","\u4E34\u6D2E","\u9756\u8FDC","\u901A\u6E2D","\u6E2D\u6E90","\u5E73\u51C9","\u7075\u53F0","\u534E\u4EAD","\u9759\u5B81","\u6CFE\u5DDD","\u5D07\u4FE1","\u5E84\u6D6A","\u5E86\u9633","\u534E\u6C60","\u5E84\u5B81","\u9547\u6E90","\u73AF\u53BF","\u5408\u6C34","\u5B81\u53BF","\u5929\u6C34","\u5FBD\u53BF","\u793C\u53BF","\u6B66\u5C71","\u79E6\u5B89","\u6E05\u6C34","\u4E24\u5F53","\u897F\u548C","\u7518\u8C37","\u6F33\u53BF","\u5F20\u5BB6\u5DDD","\u6B66\u90FD","\u5B95\u660C","\u5EB7\u53BF","\u6210\u53BF","\u6587\u53BF","\u4E34\u6F6D","\u821F\u66F2","\u739B\u66F2","\u4E0B\u6CB3","\u5353\u5C3C","\u8FED\u90E8","\u788C\u66F2","\u4E34\u590F","\u6C38\u9756","\u548C\u653F","\u5EB7\u4E50","\u5E7F\u6CB3","\u4E1C\u4E61","\u5CB7\u53BF","\u79EF\u77F3\u5C71","\u6B66\u5A01","\u6C11\u52E4","\u53E4\u6D6A","\u666F\u6CF0","\u5929\u795D","\u5F20\u6396","\u6C11\u4E50","\u4E34\u6CFD","\u5C71\u4E39","\u9AD8\u53F0","\u8083\u5357","\u7389\u95E8","\u9152\u6CC9","\u6566\u714C","\u91D1\u5854","\u5B89\u897F","\u963F\u514B\u585E","\u8083\u5317"]},{"s":"\u9ED1\u9F99\u6C5F","c":["\u54C8\u5C14\u6EE8","\u9F50\u9F50\u54C8\u5C14","\u9E64\u5C97","\u53CC\u9E2D\u5C71","\u9E21\u56DB","\u5927\u5E86","\u4F0A\u6625","\u5609\u836B","\u94C1\u529B","\u7EE5\u5316","\u7EE5\u68F1","\u6D77\u4F26","\u5E86\u5B89","\u5170\u897F","\u8087\u4E1C","\u8087\u5DDE","\u8087\u6E90","\u5B89\u8FBE","\u660E\u6C34","\u9752\u5C97","\u671B\u594E","\u9ED1\u6CB3","\u7231\u8F89","\u5FB7\u90FD","\u901A\u5317","\u5317\u5B89","\u5B59\u5434","\u900A\u514B","\u5AE9\u6C5F","\u4F73\u6728\u65AF","\u6866\u5DDD","\u841D\u5317","\u7EE5\u6EE8","\u5BCC\u9526","\u540C\u6C5F","\u629A\u8FDC","\u9976\u6CB3","\u4E03\u53F0\u6CB3","\u5B9D\u6E05","\u96C6\u8D24","\u52C3\u5229","\u6866\u5357","\u4F9D\u5170","\u6C64\u6E90","\u7261\u4E39\u6C5F","\u6797\u53E3","\u9E21\u4E1C","\u5BC6\u5C71","\u864E\u6797","\u7EE5\u82AC\u6CB3","\u4E1C\u5B81","\u7A46\u68F1","\u5B81\u5B89","\u6D77\u6797","\u963F\u57CE","\u547C\u5170","\u5DF4\u5F66","\u5BBE\u53BF","\u6728\u5170","\u901A\u6CB3","\u65B9\u6B63","\u5EF6\u5BFF","\u5C1A\u5FD7","\u4E94\u5E38","\u53CC\u57CE","\u5BCC\u88D5","\u8BB7\u6CB3","\u514B\u5C71","\u514B\u4E1C","\u62DC\u6CC9","\u4F9D\u5B89","\u6797\u7538","\u6CF0\u6765","\u9F99\u6C5F","\u7518\u5357","\u675C\u5C14\u4F2F\u7279","\u52A0\u683C\u8FBE\u5947","\u547C\u739B","\u5854\u6CB3","\u6F20\u6CB3"]},{"s":"\u6CB3\u5317","c":["\u77F3\u5BB6\u5E84","\u5510\u5C71","\u884C\u5510","\u7075\u5BFF","\u675F\u9E7F","\u664B\u53BF","\u85C1\u57CE","\u9AD8\u9091","\u8D75\u53BF","\u4E95\u9649","\u83B7\u9E7F","\u65B0\u4E50","\u6B63\u5B9A","\u6DF1\u6CFD","\u65E0\u6781","\u8D5E\u7687","\u5143\u6C0F","\u683E\u57CE","\u5E73\u5C71","\u90AF\u90F8","\u6C38\u5E74","\u66F2\u5468","\u9986\u9676","\u9B4F\u53BF","\u6210\u5B89","\u5927\u540D","\u6D89\u53BF","\u9E21\u6CFD","\u4E18\u53BF","\u5E7F\u5E73","\u80A5\u4E61","\u4E34\u6F33","\u78C1\u53BF","\u6B66\u5B89","\u90A2\u53F0","\u67CF\u4E61","\u5B81\u666E","\u9686\u5C27","\u4E34\u897F","\u5357\u5B98","\u5DE8\u9E7F","\u4EFB\u53BF","\u6C99\u6CB3","\u4E34\u57CE","\u5185\u4E18","\u65B0\u6CB3","\u6E05\u6CB3","\u5A01\u53BF","\u5E7F\u5B97","\u5E73\u4E61","\u5357\u548C","\u4FDD\u5B9A","\u6D9E\u6C34","\u6DBF\u53BF","\u5B9A\u5174","\u5BB9\u57CE","\u5B89\u65B0","\u8821\u53BF","\u535A\u91CE","\u5B9A\u53BF","\u961C\u5E73","\u5510\u53BF","\u6D9E\u6E90","\u6613\u53BF","\u65B0\u57CE","\u96C4\u53BF","\u5F90\u6C34","\u9AD8\u9633","\u5B89\u56FD","\u6E05\u82D1","\u671B\u90FD","\u66F2\u9633","\u5B8C\u53BF","\u6EE1\u57CE","\u5F20\u5BB6\u53E3","\u5EB7\u4FDD","\u8D64\u57CE","\u6000\u6765","\u851A\u53BF","\u5BA3\u5316","\u5F20\u5317","\u6CBD\u6E90","\u5D07\u793C","\u6DBF\u9E7F","\u9633\u539F","\u6000\u5B89","\u5C1A\u4E49","\u4E07\u5168","\u627F\u5FB7","\u56F4\u573A","\u5E73\u6CC9","\u5BBD\u57CE","\u5174\u9686","\u6EE6\u5E73","\u9686\u5316","\u9752\u9F99","\u4E30\u5B81","\u79E6\u7687\u5C9B","\u8FC1\u897F","\u8FC1\u5B89","\u660C\u9ECE","\u5362\u9F99","\u6EE6\u5357","\u7389\u7530","\u5510\u6D77","\u9075\u5316","\u629A\u5B81","\u4E50\u4EAD","\u6EE6\u53BF","\u4E30\u5357","\u4E30\u6DA6","\u5ECA\u574A","\u5B89\u6B21","\u4E09\u6CB3","\u9999\u6CB3","\u9738\u53BF","\u56FA\u5B89","\u5927\u57CE","\u6587\u5B89","\u6C38\u6E05","\u5927\u5382","\u6CA7\u5DDE","\u9EC4\u9A85","\u76D0\u5C71","\u5434\u6865","\u4E1C\u5149","\u8083\u5B81","\u6CB3\u95F4","\u6CCA\u5934","\u4EA4\u6CB3","\u9752\u53BF","\u6D77\u5174","\u5357\u76AE","\u4EFB\u4E18","\u732E\u53BF","\u5B5F\u6751","\u8861\u6C34","\u9976\u9633","\u961C\u57CE","\u666F\u53BF","\u67A3\u5F3A","\u6DF1\u53BF","\u5B89\u5E73","\u6B66\u5F3A","\u6B66\u9091","\u6545\u57CE","\u5180\u53BF"]},{"s":"\u6CB3\u5357","c":["\u90D1\u5DDE","\u8365\u9633","\u5F00\u5C01","\u5E73\u9876\u5C71","\u6D1B\u9633","\u7126\u4F5C","\u9E64\u58C1","\u675E\u53BF","\u5C09\u6C0F","\u65B0\u90D1","\u767B\u5C01","\u901A\u8BB8","\u4E2D\u725F","\u5BC6\u53BF","\u5DE9\u53BF","\u5170\u8003","\u65B0\u4E61","\u6C72\u53BF","\u5C01\u4E18","\u83B7\u5609","\u6E29\u8D3A","\u6D4E\u6E90","\u535A\u7231","\u8F89\u53BF","\u5EF6\u6D25","\u539F\u9633","\u6B66\u965F","\u5B5F\u53BF","\u6C81\u9633","\u4FEE\u6B66","\u5B89\u9633","\u5357\u4E50","\u8303\u53BF","\u53F0\u524D","\u6ED1\u53BF","\u6D5A\u53BF","\u6DC7\u53BF","\u5185\u9EC4","\u6E05\u4E30","\u6FEE\u9633","\u957F\u57A3","\u6C64\u9634","\u6797\u53BF","\u5546\u4E18","\u590F\u9091","\u67D8\u57CE","\u7762\u53BF","\u865E\u57CE","\u6C38\u57CE","\u5B81\u9675","\u6C11\u6743","\u5468\u53E3","\u5546\u6C34","\u6276\u6C9F","\u9E7F\u9091","\u6DEE\u9633","\u6C88\u4E18","\u897F\u534E","\u592A\u5EB7","\u90F8\u57CE","\u9879\u57CE","\u8BB8\u660C","\u9122\u53BF","\u90FE\u57CE","\u8944\u57CE","\u9C81\u5C71","\u90CF\u53BF","\u6F2F\u6CB3","\u957F\u845B","\u4E34\u9896","\u821E\u9633","\u53F6\u53BF","\u5B9D\u4E30","\u79B9\u53BF","\u9A7B\u9A6C\u5E97","\u786E\u5C71","\u897F\u5E73","\u6C5D\u5357","\u65B0\u8521","\u6CCC\u9633","\u9042\u5E73","\u4E0A\u8521","\u5E73\u8206","\u6B63\u9633","\u4FE1\u9633","\u606F\u53BF","\u56FA\u59CB","\u6F62\u5DDD","\u65B0\u53BF","\u7F57\u5C71","\u6DEE\u6EE8","\u5546\u57CE","\u5149\u5C71","\u5357\u9633","\u65B9\u57CE","\u5510\u6CB3","\u65B0\u91CE","\u9093\u53BF","\u6DC5\u5DDD","\u5357\u53EC","\u793E\u65D7","\u6850\u67CF","\u9547\u5E73","\u5185\u4E61","\u897F\u5CE1","\u4E09\u95E8\u5CE1","\u5B5F\u6D25","\u4E34\u6C5D","\u6C5D\u9633","\u5D69\u53BF","\u683E\u5DDD","\u7075\u5B9D","\u6E11\u6C60","\u4E49\u9A6C","\u5043\u5E08","\u4F0A\u5DDD","\u5B9C\u9633","\u6D1B\u5B81","\u5362\u6C0F","\u9655\u53BF","\u65B0\u5B89"]},{"s":"\u6E56\u5317","c":["\u6B66\u6C49","\u6B66\u660C","\u6C49\u9633","\u9EC4\u77F3","\u5341\u5830","\u6C99\u5E02","\u5B9C\u660C","\u8944\u6A0A","\u5B5D\u611F","\u9EC4\u9642","\u6C49\u5DDD","\u4E91\u68A6","\u5E94\u5C71","\u5927\u609F","\u5E94\u57CE","\u5B89\u9646","\u9102\u57CE","\u9EC4\u5188","\u65B0\u6D32","\u7EA2\u5B89","\u9EBB\u57CE","\u7F57\u5DDD","\u6D60\u6C34","\u8572\u6625","\u9EC4\u6885","\u5E7F\u6D4E","\u82F1\u5C71","\u54B8\u5B81","\u9633\u65B0","\u901A\u5C71","\u901A\u57CE","\u5609\u9C7C","\u5D07\u9633","\u84B2\u573B","\u8346\u95E8","\u6C5F\u9675","\u949F\u7965","\u4EAC\u5C71","\u76D1\u5229","\u77F3\u9996"]},{"s":"\u6E56\u5357","c":["\u957F\u6C99","\u671B\u57CE","\u682A\u6D32","\u6E58\u6F6D","\u8861\u9633","\u90B5\u9633","\u5CB3\u9633","\u4E34\u6E58","\u5E73\u6C5F","\u6CEA\u7F57","\u6E58\u9634","\u534E\u5BB9","\u6D4F\u9633","\u91B4\u9675","\u6538\u53BF","\u8336\u9675","\u9143\u53BF","\u6E58\u4E61","\u90F4\u5DDE","\u90F4\u53BF","\u5B89\u4EC1","\u6C38\u5174","\u8D44\u5174","\u6842\u4E1C","\u6C5D\u57CE","\u5B9C\u7AE0","\u4E34\u6B66","\u5609\u79BE","\u6842\u9633","\u6765\u9633","\u8861\u5357","\u8861\u5C71","\u8861\u4E1C","\u5E38\u5B81","\u7941\u9633","\u7941\u4E1C","\u8861\u9633","\u6C38\u5DDE","\u96F6\u9675","\u65B0\u7530","\u5B81\u8FDC","\u84DD\u5C71","\u53CC\u724C","\u6C5F\u6C38","\u9053\u53BF","\u4E1C\u5B89","\u6C5F\u534E","\u65B0\u5B81","\u6B66\u5188","\u9686\u56DE","\u7EE5\u5B81","\u6D1E\u53E3","\u57CE\u6B65","\u5A04\u5E95","\u6D9F\u6E90","\u65B0\u90B5","\u53CC\u5CF0","\u51B7\u6C34\u6C5F","\u90B5\u4E1C","\u65B0\u5316","\u6000\u5316","\u9ED4\u9633","\u8FB0\u6EAA","\u6C85\u9675","\u6E86\u6D66","\u4F1A\u540C","\u9756\u53BF","\u6D2A\u6C5F","\u82B7\u6C5F","\u9EBB\u9633","\u901A\u9053","\u65B0\u6643","\u5409\u9996","\u6C38\u987A","\u6851\u690D","\u5927\u5EB8","\u53E4\u4E08","\u6CF8\u6EAA","\u51E4\u51F0","\u82B1\u57A3","\u4FDD\u9756","\u9F99\u5C71","\u5E38\u5FB7","\u4E34\u6FA7","\u6FA7\u53BF","\u5B89\u4E61","\u6D25\u5E02","\u6C49\u5BFF","\u6843\u6E90","\u6148\u5229","\u77F3\u95E8","\u76CA\u9633","\u5357\u53BF","\u6C85\u6C5F","\u5B81\u4E61","\u5B89\u5316","\u6843\u6C5F"]},{"s":"\u6D77\u5357","c":["\u6D77\u53E3","\u743C\u5C71","\u6587\u660C","\u5B9A\u5B89","\u743C\u6D77","\u4E07\u5B81","\u5C6F\u660C","\u6F84\u8FC8","\u510B\u53BF","\u4E34\u9AD8","\u4FDD\u4EAD","\u767D\u6C99","\u743C\u4E2D","\u9675\u6C34","\u5D16\u53BF","\u4E50\u4E1C","\u4E1C\u65B9","\u660C\u6C5F"]},{"s":"\u5409\u6797","c":["\u957F\u6625","\u5409\u6797","\u519C\u5B89","\u5FB7\u60E0","\u6986\u6811","\u4E5D\u53F0","\u53CC\u9633","\u6C38\u5409","\u8212\u5170","\u86DF\u6CB3","\u6866\u7538","\u78D0\u77F3","\u5EF6\u5409","\u6C6A\u6E05","\u73F2\u6625","\u56FE\u4EEC","\u548C\u9F99","\u5B89\u56FE","\u6566\u5316","\u901A\u5316","\u67F3\u6CB3","\u6D77\u9F99","\u8F89\u5357","\u9756\u5B87","\u6D51\u6C5F","\u629A\u677E","\u96C6\u5B89","\u957F\u767D","\u56DB\u5E73","\u68A8\u6811","\u6000\u5FB7","\u4F0A\u901A","\u8FBD\u6E90","\u4E1C\u4E30","\u53CC\u8FBD","\u767D\u57CE","\u5927\u5B89","\u6276\u4F59","\u4E7E\u5B89","\u957F\u5CAD","\u901A\u6986","\u6D2E\u5B89"]},{"s":"\u6C5F\u897F","c":["\u5357\u660C","\u65B0\u5EFA","\u666F\u5FB7\u9547","\u840D\u4E61","\u4E5D\u6C5F","\u5F6D\u6CFD","\u6E56\u53E3","\u90FD\u660C","\u661F\u5B50","\u6C38\u4FEE","\u5FB7\u5B89","\u745E\u660C","\u6B66\u5B81","\u4FEE\u6C38","\u4E0A\u9976","\u5A7A\u6E90","\u5FB7\u5174","\u7389\u5C71","\u5E7F\u4E30","\u94C5\u5C71","\u6A2A\u5CF0","\u9E70\u6F6D","\u8D35\u6EAA","\u4F59\u6C5F","\u4E07\u5E74","\u4E50\u5E73","\u6CE2\u9633","\u4E8E\u5E72","\u5F0B\u9633","\u5B9C\u6625","\u4E07\u8F7D","\u94DC\u9F13","\u5B9C\u4E30","\u4E0A\u9AD8","\u5B89\u4E49","\u5949\u65B0","\u9AD8\u5B89","\u4E30\u57CE","\u6E05\u6C5F","\u65B0\u4F59","\u5206\u5B9C","\u9756\u5B89","\u629A\u5DDE","\u4E34\u5DDD","\u91D1\u6EAA","\u8D44\u6EAA","\u9ECE\u5DDD","\u5357\u4E30","\u5357\u57CE","\u5B9C\u9EC4","\u5D07\u4EC1","\u4E50\u5B89","\u4E1C\u4E61","\u8FDB\u8D24","\u5409\u5B89","\u65B0\u5E72","\u5CE1\u6C5F","\u5409\u6C34","\u6C38\u4E30","\u6CF0\u548C","\u4E07\u5B89","\u9042\u5DDD","\u5B81\u5188","\u6C38\u65B0","\u83B2\u82B1","\u5B89\u798F","\u4E95\u5188\u5C71","\u8D63\u5DDE","\u5E7F\u660C","\u77F3\u57CE","\u5B81\u90FD","\u5174\u56FD","\u4E8E\u90FD","\u745E\u91D1","\u4F1A\u660C","\u5B89\u8FDC","\u5BFB\u4E4C","\u5B9A\u5357","\u9F99\u5357","\u5168\u5357","\u4FE1\u4E30","\u8D63\u53BF","\u5357\u5EB7","\u4E0A\u72B9","\u5D07\u4E49","\u5927\u4F59"]},{"s":"\u8FBD\u5B81","c":["\u6C88\u9633","\u65B0\u6C11","\u8FBD\u4E2D","\u5927\u8FDE","\u91D1\u53BF","\u590D\u53BF","\u65B0\u91D1","\u5E84\u6CB3","\u957F\u6D77","\u978D\u5C71","\u6D77\u57CE","\u53F0\u5B89","\u629A\u987A","\u65B0\u5BBE","\u6E05\u539F","\u672C\u6EAA","\u57A3\u4EC1","\u9526\u5DDE","\u9526\u53BF","\u4E49\u53BF","\u9ED1\u5C71","\u5317\u9547","\u9526\u897F","\u5174\u57CE","\u7EE5\u4E2D","\u4E39\u4E1C","\u4E1C\u6C9F","\u5CAB\u5CA9","\u51E4\u57CE","\u5BBD\u7538","\u961C\u65B0","\u5F70\u6B66","\u8425\u53E3","\u76D6\u53BF","\u76D8\u5C71","\u5927\u6D3C","\u8FBD\u9633","\u706F\u5854","\u94C1\u5CAD","\u5F00\u539F","\u660C\u56FE","\u94C1\u6CD5","\u5EB7\u5E73","\u6CD5\u5E93","\u897F\u4E30","\u671D\u9633","\u5EFA\u660C","\u5317\u7968","\u51CC\u6E90","\u5EFA\u5E73"]},{"s":"\u5185\u8499\u53E4","c":["\u547C\u548C\u6D69\u7279","\u4E0A\u9ED8\u7279\u5DE6\u65D7","\u6258\u514B\u6258","\u5305\u5934","\u4E0A\u9ED8\u7279\u53F3\u65D7","\u56FA\u9633","\u4E4C\u6D77","\u96C6\u5B81","\u5174\u548C","\u6E05\u6C34\u6CB3","\u6B66\u5DDD","\u5353\u8D44","\u5546\u90FD","\u4E30\u9547","\u51C9\u57CE","\u548C\u6797\u683C\u5C14","\u5316\u5FB7","\u5BDF\u54C8\u5C14\u53F3\u7FFC\u540E\u65D7","\u5BDF\u54C8\u5C14\u53F3\u7FFC\u4E2D\u65D7","\u5BDF\u54C8\u5C14\u53F3\u7FFC\u524D\u65D7","\u56DB\u5B50\u738B\u65D7","\u8FBE\u5C14\u7F55\u8302\u660E\u5B89\u8054\u5408\u65D7","\u4E8C\u8FDE\u6D69\u7279","\u963F\u5DF4\u54C8\u7EB3\u5C14\u65D7","\u591A\u4F26","\u963F\u5DF4\u560E\u65D7","\u897F\u4E4C\u73E0\u7A46\u6C81\u65D7","\u4E1C\u4E4C\u73E0\u7A46\u6C81\u65D7","\u82CF\u5C3C\u7279\u5DE6\u65D7","\u82CF\u5C3C\u7279\u53F3\u65D7","\u592A\u4EC6\u5BFA\u65D7","\u6B63\u9576\u767D\u65D7","\u6B63\u84DD\u65D7","\u9576\u9EC4\u65D7","\u6D77\u62C9\u5C14","\u6EE1\u6D32\u91CC","\u9648\u5DF4\u5C14\u864E\u65D7","\u989D\u5C14\u53E4\u7EB3\u53F3\u65D7","\u989D\u5C14\u53E4\u7EB3\u5DE6\u65D7","\u559C\u6842\u56FE\u65D7","\u963F\u8363\u65D7","\u5E03\u7279\u54C8\u65D7","\u65B0\u5DF4\u5C14\u864E\u5DE6\u65D7","\u65B0\u5DF4\u5C14\u864E\u53F3\u65D7","\u9102\u4F26\u6625\u81EA\u6CBB\u65D7","\u83AB\u529B\u8FBE\u74E6\u8FBE\u65A1\u5C14\u65CF\u81EA\u6CBB\u65D7","\u9102\u6E29\u514B\u65CF\u81EA\u6CBB\u65D7","\u901A\u8FBD","\u5F00\u9C81","\u79D1\u5C14\u6C81\u5DE6\u7FFC\u540E\u65D7","\u79D1\u5C14\u6C81\u5DE6\u7FFC\u4E2D\u65D7","\u5E93\u4F26\u65D7","\u5948\u66FC\u65D7","\u624E\u9C81\u7279\u65D7","\u8D64\u5CF0","\u5B81\u57CE","\u6797\u897F","\u5580\u5587\u6C81\u65D7","\u6556\u6C49\u65D7","\u7FC1\u725B\u7279\u65D7","\u5DF4\u6797\u53F3\u65D7","\u5DF4\u6797\u5DE6\u65D7","\u963F\u9C81\u79D1\u5C14\u6C81\u65D7","\u514B\u4EC0\u514B\u817E\u65D7","\u4F0A\u514B\u662D\u76DF","\u4E1C\u80DC\u53BF","\u51C6\u683C\u5C14\u65D7","\u4E4C\u5BA1\u65D7","\u4F0A\u91D1\u970D\u6D1B\u65D7","\u9102\u6258\u514B\u65D7","\u9102\u6258\u514B\u524D\u65D7","\u676D\u9526\u65D7","\u8FBE\u62C9\u7279\u65D7","\u4E34\u6CB3","\u4E94\u539F","\u78F4\u53E3","\u676D\u9526\u540E\u65D7","\u4E4C\u62C9\u7279\u4E2D\u65D7","\u4E4C\u62C9\u7279\u524D\u65D7","\u4E4C\u62C9\u7279\u540E\u65D7","\u963F\u62C9\u5584\u5DE6\u65D7","\u963F\u62C9\u5584\u53F3\u65D7","\u989D\u6D4E\u7EB3\u65D7","\u4E4C\u5170\u6D69\u7279","\u7A81\u6CC9","\u79D1\u5C14\u6C81\u53F3\u7FFC\u524D\u65D7","\u79D1\u5C14\u6C81\u53F3\u7FFC\u4E2D\u65D7"]},{"s":"\u5B81\u590F","c":["\u94F6\u5DDD","\u6C38\u5B81","\u8D3A\u5170","\u77F3\u5634\u5C71","\u5E73\u7F57","\u9676\u4E50","\u5434\u5FE0","\u540C\u5FC3","\u7075\u6B66","\u4E2D\u5B81","\u76D0\u6C60","\u4E2D\u536B","\u9752\u94DC\u5CE1","\u56FA\u539F","\u897F\u5409","\u6CFE\u6E90","\u6D77\u539F","\u9686\u5FB7"]},{"s":"\u9752\u6D77","c":["\u897F\u5B81","\u5927\u901A","\u5E73\u5B89","\u6E5F\u4E2D","\u4E50\u90FD","\u6C11\u548C","\u6E5F\u6E90","\u4E92\u52A9","\u5316\u9686","\u5FAA\u5316","\u95E8\u6E90","\u6D77\u664F","\u521A\u5BDF","\u7941\u8FDE","\u540C\u4EC1","\u5C16\u624E","\u6CFD\u5E93","\u6CB3\u5357","\u5171\u548C","\u8D35\u5FB7","\u8D35\u5357","\u540C\u5FB7","\u5174\u6D77","\u739B\u6C81","\u7518\u5FB7","\u4E45\u6CBB","\u73ED\u739B","\u8FBE\u65E5","\u739B\u591A","\u7389\u6811","\u79F0\u591A","\u56CA\u8C26","\u6742\u591A","\u6CBB\u591A","\u66F2\u9EBB\u83DC","\u683C\u5C14\u6728","\u4E4C\u5170","\u90FD\u5170","\u5929\u5CFB"]},{"s":"\u5C71\u4E1C","c":["\u6D4E\u5357","\u5386\u57CE","\u957F\u6E05","\u7AE0\u4E18","\u9752\u5C9B","\u5D02\u5C71","\u80F6\u5357","\u5373\u58A8","\u80F6\u53BF","\u6DC4\u535A","\u67A3\u5E84","\u6ED5\u53BF","\u4E1C\u8425","\u57A6\u5229","\u5229\u6D25","\u5FB7\u5DDE","\u5B81\u6D25","\u4E50\u9675","\u5546\u6CB3","\u6D4E\u9633","\u79B9\u57CE","\u590F\u6D25","\u9675\u53BF","\u5E86\u4E91","\u4E34\u9091","\u9F50\u6CB3","\u5E73\u539F","\u6B66\u57CE","\u6EE8\u5DDE","\u6EE8\u53BF","\u5E7F\u9976","\u6853\u53F0","\u90B9\u5E73","\u9633\u4FE1","\u6CBE\u5316","\u535A\u5174","\u9AD8\u9752","\u60E0\u6C11","\u65E0\u68E3","\u6F4D\u574A","\u6F4D\u53BF","\u5E73\u5EA6","\u8BF8\u57CE","\u5B89\u4E18","\u4E34\u6710","\u5BFF\u5149","\u660C\u9091","\u9AD8\u5BC6","\u4E94\u83B2","\u660C\u4E50","\u9AD8\u90FD","\u70DF\u53F0","\u725F\u5E73","\u6587\u767B","\u6D77\u9633","\u83B1\u9633","\u6816\u971E","\u6396\u53BF","\u957F\u5C9B","\u5A01\u6D77","\u798F\u5C71","\u8363\u6210","\u4E73\u5C71","\u83B1\u897F","\u62DB\u8FDC","\u9EC4\u53BF","\u84EC\u83B1","\u4E34\u6C82","\u6C82\u6C34","\u65E5\u7167","\u4E34\u6CAD","\u4ED3\u5C71","\u5E73\u9091","\u6C82\u6E90","\u6C82\u5357","\u8425\u53BF","\u8392\u5357","\u90EF\u57CE","\u8D39\u53BF","\u8499\u9634","\u6CF0\u5B89","\u83B1\u829C","\u80A5\u57CE","\u5E73\u9634","\u65B0\u6C76","\u65B0\u6CF0","\u5B81\u9633","\u4E1C\u5E73","\u6D4E\u5B81","\u5156\u5DDE","\u6CD7\u6C34","\u9C7C\u53F0","\u5609\u7965","\u6C76\u4E0A","\u66F2\u961C","\u90B9\u53BF","\u5FAE\u5C71","\u91D1\u4E61","\u8377\u6CFD","\u90D3\u57CE","\u5DE8\u91CE","\u5355\u53BF","\u66F9\u53BF","\u9104\u57CE","\u6881\u5C71","\u6210\u6B66","\u5B9A\u9676","\u4E1C\u660E","\u804A\u57CE","\u9AD8\u5510","\u4E1C\u963F","\u8398\u53BF","\u4E34\u6E05","\u830C\u5E73","\u9633\u8C37","\u51A0\u53BF"]},{"s":"\u56DB\u5DDD","c":["\u6210\u90FD","\u91D1\u5802","\u53CC\u6D41","\u84B2\u6C5F","\u90EB\u53BF","\u65B0\u90FD","\u6765\u6613","\u76D0\u8FB9","\u6E29\u6C5F","\u704C\u53BF","\u5F6D\u53BF","\u4EC0\u90A1","\u5E7F\u6C49","\u65B0\u6D25","\u909B\u5D03","\u5927\u9091","\u5D07\u5E86","\u7EF5\u9633","\u6C5F\u6CB9","\u9752\u5DDD","\u5E73\u6B66","\u5149\u5143","\u65FA\u82CD","\u5251\u9601","\u6893\u6F7C","\u4E09\u53F0","\u76D0\u4EAD","\u5C04\u6D2A","\u9042\u5B81","\u84EC\u6EAA","\u4E2D\u6C5F","\u5FB7\u9633","\u7EF5\u7AF9","\u5B89\u53BF","\u5317\u5DDD","\u5185\u6C5F","\u4E50\u81F3","\u5B89\u5CB3","\u5A01\u8FDC","\u8D44\u4E2D","\u8D44\u9633","\u7B80\u9633","\u9686\u660C","\u5B9C\u5BBE","\u5BCC\u987A","\u5357\u6EAA","\u6C5F\u5B89","\u7EB3\u6EAA","\u6CF8\u53BF","\u5408\u6C5F","\u6CF8\u5DDE","\u53E4\u853A","\u53D9\u6C34","\u957F\u5B81","\u5174\u6587","\u742A\u53BF","\u9AD8\u53BF","\u7B60\u8FDE","\u5C4F\u7531","\u4E50\u7531","\u5939\u6C5F","\u6D2A\u96C5","\u4E39\u68F1","\u9752\u795E","\u7709\u7531","\u5F6D\u7531","\u4E95\u7814","\u4EC1\u5BFF","\u728D\u4E3A","\u6C90\u5DDD","\u5A25\u7709","\u9A6C\u8FB9","\u5CE8\u8FB9","\u91D1\u53E3","\u6DAA\u9675","\u57AB\u6C5F","\u4E30\u90FD","\u77F3\u67F1","\u79C0\u5C71","\u897F\u9633","\u9ED4\u6C5F","\u5F6D\u6C34","\u6B66\u9686","\u5357\u5DDD","\u4E07\u53BF","\u5F00\u53BF","\u57CE\u53E3","\u5DEB\u6EAA","\u5DEB\u5C71","\u5949\u8282","\u4E91\u9633","\u5FE0\u53BF","\u6881\u5E73","\u5357\u5141","\u82CD\u6EAA","\u9606\u4E2D","\u4EEA\u9647","\u5357\u90E8","\u897F\u5141","\u8425\u5C71","\u84EC\u5B89","\u5E7F\u5B89","\u5CB3\u6C60","\u6B66\u80DC","\u534E\u4E91","\u8FBE\u53BF","\u4E07\u6E90","\u5B9C\u6C49","\u5F00\u6C5F","\u90BB\u6C34","\u5927\u7AF9","\u6E20\u53BF","\u5357\u6C5F","\u5DF4\u4E2D","\u5E73\u660C","\u901A\u6C5F","\u767E\u6C99","\u96C5\u5B89","\u82A6\u5C71","\u540D\u5C71","\u8363\u7ECF","\u6C49\u6E90","\u77F3\u68C9","\u5929\u5168","\u5B9D\u5174","\u9A6C\u5C14\u5EB7","\u7EA2\u539F","\u963F\u575D","\u82E5\u5C14\u76D6","\u9ED1\u6C34","\u677E\u6F58","\u5357\u576A","\u6C76\u5DDD","\u7406\u53BF","\u5C0F\u91D1","\u91D1\u5DDD","\u58E4\u5858","\u8302\u6C76","\u5EB7\u5B9A","\u7089\u970D","\u7518\u5B5C","\u65B0\u9F99","\u767D\u7389","\u5FB7\u683C","\u77F3\u6E20","\u8272\u8FBE","\u6CF8\u5B9A","\u4E39\u5DF4","\u4E5D\u9F99","\u96C5\u6C5F","\u9053\u5B5A","\u7406\u5858","\u4E61\u57CE","\u7A3B\u57CE","\u5DF4\u5858","\u5F97\u8363","\u897F\u660C","\u662D\u89C9","\u7518\u6D1B","\u96F7\u6CE2","\u5B81\u5357","\u4F1A\u4E1C","\u4F1A\u7406","\u5FB7\u660C","\u7F8E\u59D1","\u91D1\u9633","\u5E03\u62D6","\u666E\u683C","\u559C\u5FB7","\u8D8A\u897F","\u76D0\u6E90","\u5195\u5B81","\u6728\u91CC"]},{"s":"\u5C71\u897F","c":["\u592A\u539F","\u9633\u66F2","\u5A04\u70E6","\u6E05\u5F90","\u5927\u540C","\u9633\u6CC9","\u957F\u6CBB","\u5929\u9547","\u7075\u4E18","\u6000\u4EC1","\u5C71\u9634","\u5E73\u9C81","\u53F3\u7389","\u9633\u9AD8","\u5E7F\u7075","\u6D51\u6E90","\u5E94\u53BF","\u6714\u53BF","\u5DE6\u4E91","\u5FFB\u53BF","\u4EE3\u53BF","\u4E94\u53F0","\u9759\u4E50","\u4FDD\u5FB7","\u6CB3\u66F2","\u795E\u6C60","\u539F\u5E73","\u7E41\u5CD9","\u5B9A\u8944","\u5CA2\u5C9A","\u4E94\u5BE8","\u504F\u5173","\u5B81\u6B66","\u6986\u6B21","\u5B5F\u53BF","\u6614\u9633","\u5DE6\u6743","\u592A\u8C37","\u5E73\u9065","\u7075\u77F3","\u5BFF\u9633","\u5E73\u5B9A","\u548C\u987A","\u6986\u793E","\u7941\u53BF","\u4ECB\u4F11","\u79BB\u77F3","\u5174\u53BF","\u65B9\u7531","\u5C9A\u53BF","\u4EA4\u57CE","\u6587\u6C34","\u6C7E\u9633","\u5B5D\u4E49","\u4EA4\u53E3","\u77F3\u697C","\u4E2D\u9633","\u4E34\u53BF","\u67F3\u6797","\u8944\u57A3","\u9ECE\u57CE","\u58F6\u5173","\u9AD8\u5E73","\u9633\u57CE","\u957F\u5B50","\u6C81\u6E90","\u6F5E\u57CE","\u6B66\u4E61","\u5E73\u987A","\u9675\u5DDD","\u664B\u57CE","\u6C81\u6C34","\u5C6F\u7559","\u6C81\u53BF","\u4E34\u6C7E","\u6C7E\u897F","\u5B89\u6CFD","\u53E4\u53BF","\u7FFC\u57CE","\u66F2\u6C83","\u5409\u53BF","\u5927\u5B81","\u4FAF\u9A6C","\u6C38\u548C","\u6D2A\u6D1E","\u970D\u53BF","\u6D6E\u5C71","\u8944\u6C7E","\u4E61\u5B81","\u84B2\u53BF","\u8FD0\u57CE","\u95FB\u559C","\u57A3\u66F2","\u82AE\u57CE","\u4E34\u7317","\u65B0\u7EDB","\u6CB3\u6D25","\u590F\u53BF","\u7EDB\u53BF","\u5E73\u9646","\u6C38\u6D4E","\u4E07\u8363","\u7A37\u5C71"]},{"s":"\u897F\u85CF","c":["\u62C9\u8428","\u6797\u5468","\u5F53\u96C4","\u58A8\u7AF9\u5DE5\u5361","\u5C3C\u6728","\u7C73\u6797","\u58A8\u8131","\u8FBE\u5B5C","\u66F2\u6C34","\u5806\u9F99\u5FB7\u5E86","\u6797\u829D","\u5DE5\u5E03\u6C5F\u8FBE","\u90A3\u66F2","\u5DF4\u9752","\u6BD4\u5982","\u73ED\u6208","\u5609\u9ECE","\u8042\u8363","\u7D22\u53BF","\u5B89\u591A","\u7533\u624E","\u5415\u90FD","\u8D21\u89C9","\u5DE6\u8D21","\u5BDF\u9685","\u6D1B\u9686","\u4E01\u9752","\u6CE2\u5BC6","\u6C5F\u8FBE","\u5BDF\u96C5","\u8292\u5EB7","\u516B\u5BBF","\u8FB9\u575D","\u7C7B\u4E4C\u9F50","\u4E43\u4E1C","\u52A0\u67E5","\u66F2\u677E","\u9519\u90A3","\u7A77\u7ED3","\u8D21\u560E","\u6D6A\u5361\u5B50","\u6851\u65E5","\u6717\u53BF","\u9686\u5B50","\u63AA\u7F8E","\u6D1B\u624E","\u624E\u56CA","\u65E5\u5580\u5219","\u5B9A\u7ED3","\u62C9\u5B5C","\u8042\u62C9\u6728","\u8C22\u901A\u95E8","\u4EF2\u5DF4","\u5EB7\u9A6C","\u4E9A\u4E1C","\u5C97\u5DF4","\u5357\u6728\u6797","\u8428\u8FE6","\u5B9A\u65E5","\u5409\u9686","\u6602\u4EC1","\u6C5F\u5B5C","\u4EC1\u5E03","\u767D\u6717","\u8428\u560E","\u5676\u5C14","\u9769\u5409","\u624E\u8FBE","\u63AA\u52E4","\u65E5\u4E0A","\u6539\u5219","\u666E\u5170"]},{"s":"\u9655\u897F","c":["\u897F\u5B89","\u957F\u5B89","\u94DC\u5DDD","\u8000\u53BF","\u5B9D\u9E21","\u51E4\u7FD4","\u5343\u9633","\u9647\u53BF","\u9E9F\u6E38","\u5C90\u5C71","\u6D6E\u98CE","\u6B66\u529F","\u7709\u53BF","\u592A\u767D","\u51E4\u53BF","\u6986\u6797","\u795E\u6728","\u5E9C\u8C37","\u4F73\u53BF","\u7C73\u8102","\u5434\u5821","\u7EE5\u5FB7","\u6E05\u6DA7","\u5B50\u6D32","\u6A2A\u5C71","\u9756\u8FB9","\u5B9A\u8FB9","\u5EF6\u5B89","\u5B89\u5BE8","\u5B50\u957F","\u5EF6\u5DDD","\u5EF6\u957F","\u5B9C\u5DDD","\u9EC4\u9F99","\u6D1B\u5DDD","\u5B9C\u541B","\u9EC4\u9675","\u5BCC\u53BF","\u7518\u6CC9","\u5FD7\u4E39","\u5434\u65D7","\u54B8\u9633","\u793C\u6CC9","\u6C38\u5BFF","\u5F6C\u53BF","\u957F\u6B66","\u65EC\u9091","\u6DF3\u5316","\u6CFE\u9633","\u4E09\u539F","\u9AD8\u9675","\u6237\u53BF","\u5468\u81F3","\u5174\u5E73","\u4E7E\u53BF","\u6E2D\u5357","\u84B2\u57CE","\u767D\u6C34","\u6210\u57CE","\u97E9\u57CE","\u5408\u9633","\u5927\u8354","\u6F7C\u5173","\u534E\u9634","\u534E\u53BF","\u84DD\u7530","\u4E34\u6F7C","\u5BCC\u5E73","\u5546\u53BF","\u6D1B\u5357","\u4E39\u51E4","\u5546\u5357","\u5C71\u9633","\u9547\u5B89","\u67DE\u6C34","\u5B89\u5EB7","\u65EC\u9633","\u767D\u6CB3","\u5E73\u5229","\u9547\u576A","\u5C9A\u768B","\u7D2B\u9633","\u6C49\u9634","\u77F3\u6CC9","\u5B81\u9655","\u6C49\u4E2D","\u7559\u575D","\u57CE\u56FA","\u6D0B\u53BF","\u4F5B\u576A","\u897F\u4E61","\u9547\u5DF4","\u5357\u90D1","\u5B81\u5F3A","\u52C9\u53BF"]},{"s":"\u65B0\u7586","c":["\u4E4C\u9C81\u6728\u9F50","\u514B\u62C9\u739B\u4F9D","\u77F3\u6CB3\u5B50","\u5410\u9C81\u756A","\u6258\u514B\u900A","\u912F\u5584","\u54C8\u5BC6","\u4F0A\u543E","\u5DF4\u91CC\u5764","\u5E93\u5C14\u52D2","\u548C\u9759","\u548C\u7855","\u535A\u6E56","\u5C09\u68A8","\u8F6E\u53F0","\u7109\u8006","\u548C\u7530","\u6C11\u4E30","\u7B56\u52D2","\u4E8E\u7530","\u6D1B\u6D66","\u76AE\u5C71","\u58A8\u7389","\u963F\u514B\u82CF","\u6E29\u5BBF","\u62DC\u57CE","\u5E93\u8F66","\u65B0\u548C","\u6C99\u96C5","\u963F\u74E6\u63D0","\u67EF\u5E73","\u4E4C\u4EC0","\u54AF\u4EC0","\u5DF4\u695A","\u67B7\u5E08","\u4E50\u666E\u6E56","\u9EA6\u76D6\u63D0","\u838E\u8F66","\u6CFD\u666E","\u53F6\u57CE","\u758F\u52D2","\u82F1\u5409\u6C99","\u758F\u9644","\u5854\u4EC0\u5E93\u5C14\u5E72","\u963F\u56FE\u4EC0","\u963F\u5408\u5947","\u963F\u514B\u9676","\u4E4C\u6070","\u660C\u5409","\u961C\u5EB7","\u5947\u53F0","\u5409\u6728\u8428\u5C14","\u7C73\u6CC9","\u739B\u7EB3\u65AF","\u547C\u56FE\u58C1","\u6728\u5792","\u535A\u4E50","\u7CBE\u6CB3","\u6E29\u6CC9","\u4F0A\u5B81","\u5C3C\u52D2\u514B","\u65B0\u6E90","\u5DE9\u7559","\u594E\u5C6F","\u7279\u514B\u65AF","\u662D\u82CF","\u970D\u57CE","\u5BDF\u5E03\u5BDF\u5C14","\u5854\u57CE","\u989D\u654F","\u4E4C\u82CF","\u6258\u91CC","\u88D5\u6C11","\u6C99\u6E7E","\u548C\u5E03\u514B\u8D5B\u5C14","\u963F\u52D2\u6CF0","\u9752\u6CB3","\u5BCC\u8574","\u798F\u6D77","\u5409\u6728\u4E43","\u5E03\u5C14\u6D25","\u54C8\u5DF4\u6CB3"]},{"s":"\u4E91\u5357","c":["\u6606\u660E","\u5BCC\u6C11","\u664B\u5B81","\u5448\u8D21","\u5B89\u5B81","\u662D\u901A","\u6C38\u5584","\u5927\u5173","\u5F5D\u826F","\u9C81\u7538","\u7EE5\u6C5F","\u76D0\u6D25","\u5A01\u4FE1","\u9547\u96C4","\u5DE7\u5BB6","\u6C38\u5BCC","\u66F2\u9756","\u5BA3\u5A01","\u5BCC\u6E90","\u5E08\u5B97","\u5D69\u660E","\u4F1A\u6CFD","\u6CBD\u76CA","\u7F57\u5E73","\u9646\u826F","\u5B9C\u826F","\u9A6C\u9F99","\u8DEF\u5357","\u5BFB\u7538","\u7389\u6EAA","\u534E\u5B81","\u901A\u6D77","\u6F84\u6C5F","\u6C5F\u5DDD","\u6613\u95E8","\u5143\u6C5F","\u65B0\u5E73","\u5CE8\u5C71","\u601D\u8305","\u666E\u6D31","\u9547\u6C85","\u666F\u4E1C","\u666F\u8C37","\u9ED1\u6C5F","\u6F9C\u6CA6","\u897F\u76DF","\u6C5F\u57CE","\u5B5F\u8FDE","\u4E34\u6CA6","\u4E91\u53BF","\u9547\u5EB7","\u6C38\u5FB7","\u51E4\u5E86","\u53CC\u6C5F","\u6CA7\u6E90","\u803F\u9A6C","\u4FDD\u7531","\u65BD\u7538","\u817E\u51B2","\u660C\u5B81","\u9F99\u9675","\u4E3D\u6C5F","\u534E\u576A","\u6C38\u80DC","\u5B81\u8497","\u6587\u5C71","\u5E7F\u5357","\u897F\u7574","\u9EBB\u6817\u5761","\u9A6C\u5173","\u4E18\u5317","\u781A\u5C71","\u5BCC\u5B81","\u4E2A\u65E7","\u5F25\u52D2","\u8499\u81EA","\u5143\u9633","\u7EA2\u6CB3","\u77F3\u5C4F","\u6CF8\u897F","\u91D1\u5E73","\u5F00\u8FDC","\u7EFF\u6625","\u5EFA\u6C34","\u6CB3\u53E3","\u5C4F\u8FB9","\u666F\u6DC7","\u52D0\u6D77","\u52D0\u814A","\u695A\u96C4","\u5143\u8C0B","\u6B66\u5B9A","\u7984\u4E30","\u5357\u534E","\u5927\u59DA","\u6C38\u4EC1","\u7984\u529D","\u725F\u5B9A","\u53CC\u67CF","\u59DA\u5B89","\u4E0B\u5173","\u5251\u5DDD","\u6D31\u6E90","\u5BBE\u5DDD","\u5F25\u6E21","\u6C38\u5E73","\u9E64\u5E86","\u5927\u7406","\u6F3E\u6FDE","\u4E91\u9F99","\u7965\u4E91","\u5DCD\u5C71","\u5357\u6DA7","\u6F5E\u897F","\u9647\u5DDD","\u76C8\u6C5F","\u7579\u753A","\u745E\u4E3D","\u6881\u6CB3","\u6CF8\u6C34","\u78A7\u6C5F","\u798F\u8D21","\u5170\u576A","\u8D21\u5C71","\u4E2D\u7538","\u5FB7\u94A6","\u7EF4\u897F"]},{"s":"\u6D59\u6C5F","c":["\u676D\u5DDE","\u4F59\u676D","\u5BCC\u9633","\u5EFA\u5FB7","\u4E34\u5B89","\u8427\u5C71","\u6850\u5E90","\u6DF3\u5B89","\u5B81\u6CE2","\u9547\u6D77","\u6E29\u5DDE","\u74EF\u6D77","\u6C38\u559C","\u6D1E\u5934","\u5E73\u9633","\u6CF0\u987A","\u4E50\u6E05","\u745E\u5B89","\u6587\u6210","\u82CD\u5357","\u6E56\u5DDE","\u5E73\u6E56","\u6850\u4E61","\u5B89\u5409","\u5609\u5584","\u5609\u5174","\u6D77\u76D0","\u6D77\u5B81","\u5FB7\u6E05","\u957F\u5174","\u5B9A\u6D77","\u5CB1\u5C71","\u5D4A\u56DB","\u666E\u9640","\u911E\u53BF","\u8C61\u5C71","\u5949\u5316","\u6148\u6EAA","\u5B81\u6D77","\u4F59\u59DA","\u7ECD\u5174","\u65B0\u660C","\u8BF8\u66A8","\u4E0A\u865E","\u5D4A\u53BF","\u6912\u6C5F","\u4E34\u6D77","\u4E09\u95E8","\u6E29\u5CAD","\u4ED9\u5C45","\u5929\u53F0","\u9EC4\u5CA9","\u7389\u73AF","\u4E3D\u6C34","\u9752\u7530","\u5E86\u65E0","\u9042\u660C","\u7F19\u4E91","\u4E91\u548C","\u9F99\u6CC9","\u677E\u9633","\u91D1\u534E","\u6D66\u6C5F","\u4E1C\u9633","\u6B66\u4E49","\u6C5F\u5C71","\u5F00\u5316","\u8862\u5DDE","\u5170\u6EAA","\u4E49\u4E4C","\u6C38\u5EB7","\u5E38\u5C71"]},{"s":"\u6C5F\u82CF","c":["\u5357\u4EAC","\u6C5F\u5B81","\u516D\u5408","\u6C5F\u6D66","\u5F90\u5DDE","\u8FDE\u4E91\u6E2F","\u5357\u901A","\u82CF\u5DDE","\u65E0\u9521","\u5E38\u5DDE","\u4E30\u53BF","\u6C9B\u53BF","\u8D63\u6986","\u4E1C\u6D77","\u65B0\u6C82","\u90B3\u53BF","\u7762\u5B81","\u94DC\u5C71","\u6E05\u6C5F","\u704C\u4E91","\u704C\u5357","\u6CAD\u9633","\u5BBF\u8FC1","\u6CD7\u9633","\u76F1\u7719","\u6D9F\u6C34","\u6DEE\u9634","\u6DEE\u5B89","\u6D2A\u6CFD","\u6CD7\u6D2A","\u91D1\u6E56","\u76D0\u57CE","\u6EE8\u6D77","\u961C\u5B81","\u5C04\u9633","\u5EFA\u6E56","\u54CD\u6C34","\u5927\u4E30","\u4E1C\u53F0","\u6D77\u5B89","\u5982\u768B","\u5982\u4E1C","\u542F\u4E1C","\u6D77\u95E8","\u5357\u901A","\u626C\u5DDE","\u5B9D\u5E94","\u5174\u5316","\u9AD8\u90AE","\u6CF0\u5174","\u6CF0\u53BF","\u6CF0\u5DDE","\u9756\u6C5F","\u6C5F\u90FD","\u9097\u6C5F","\u4EEA\u5F81","\u9547\u6C5F","\u4E39\u5F92","\u626C\u4E2D","\u4E39\u9633","\u6B66\u8FDB","\u5B9C\u5174","\u91D1\u575B","\u6EA7\u9633","\u53E5\u5BB9","\u6EA7\u6C34","\u9AD8\u6DF3","\u6C5F\u9634","\u6C99\u6D32","\u5E38\u719F","\u592A\u4ED3","\u6606\u5C71","\u5434\u53BF","\u5434\u6C5F"]}];
	var e, s = $.mobiscroll,
	t = {
		formatValueCallback: null
	};
	s.presets.scroller.place = function(s) {
		function ai(a) {
			return {
				value: a,
				display: p.c[a]
			}
		}
		function ac(a) {
			return {
				value: a,
				display: city[a].s
			}
		}	
		function ad(a) {
			return a
		}		
		function n() {
			var e, t, n, o = [],
			m = [],
			i = s.getArrayVal(!0) || [0, 0];
			m.push({
				//cssClass: 'mbsc-dt-whl-y',
				label: '省',
				min: 0,
				max: city.length-1,
				data: ac,
				getIndex: ad
			});
			p = city[i[0] || 0];
			m.push({
				//cssClass: 'mbsc-dt-whl-y',
				label: d.yearText,
				min: 0,
				max: p.c.length-1,
				data: ai,
				getIndex: ad
			});
			o.push(m);
			return o
		}
		var c = $.extend({},
		s.settings),
		d = $.extend(s.settings, t, c),
		b = {},
		C = d.formatValueCallback,
		g = ["set", 'cancel'],
		m = n(),
		f = 0,
		k = $(this),
		p,
		M = t.minWidth || ['40%', '50%'],
		W = t.maxWidth || ['40%', '50%'],
		D = function(e) {
			if ("string" == typeof e) return e;
			var s, t, k = e[0];
			return s = (e.length ? city[e[0]].s: '') + '、' + (e.length ? city[e[0]].c[e[1]] : ''),
			s = C && C(e, w, f, p) || s;
			return s
		};
		return {
			minWidth: M,
			maxWidth: W,
			wheels: m,
			formatValue: D,
			parseValue: function(a) {
				return a
			},
			buttons: g,
			headerText: !1,
			onBeforeShow: function() {
				var m = s.getArrayVal(!0);
				if (!m[0] || !m[1]) s.setArrayVal([0, 0], !1, !1, !0, 0);
				k.blur()
			},
			onSet: function(a) {
				k && (v = d.txtobj?$(d.txtobj,k):k,v.text(a.valueText).addClass('notempty'),k.attr('data-val',a.valueText),$('input',k).val(a.valueText))
			},
			validate: function(a, s) {
				var c = s._tempWheelArray;
				if (f != c[0]) {
					var B = {},
					_l = n();
					B[1] = _l[0][1];
					s.changeWheel(B)
				}
				f = s._tempWheelArray[0]
			}
		}
	};
	s.presetShort("place")
})(jQuery);
(function($) {
	var e, s = $.mobiscroll,
	t = {
		formatValueCallback: null
	};
	s.presets.scroller.times = function(s) {
		function ai(a) {
			return {
				value: a,
				display: a?'夏令时':'非夏令时'
			}
		}
		function ad(a) {
			return a
		}	
		function n() {
			var e, t, n, o = [],
			m = [],
			i = s.getArrayVal(!0) || [0, 0];
			for (var e = [], x=0; x < 24; x++) {
				e.push({
					value: x,
					display: x+'时'
				})
			}
			m.push({
				cssClass: 'mbsc-dt-whl-d',
				label: '时',
				data: e
			});
			for (var e = [], x=0; x < 60; x++) {
				e.push({
					value: x,
					display: x+'分'
				})
			}
			m.push({
				cssClass: 'mbsc-dt-whl-d',
				label: '时',
				data: e
			});
			m.push({
				//cssClass: 'mbsc-dt-whl-y',
				label: d.yearText,
				min: 0,
				max: 1,
				data: ai,
				getIndex: ad
			});
			o.push(m);
			return o
		}
		var c = $.extend({},
		s.settings),
		d = $.extend(s.settings, t, c),
		b = {},
		C = d.formatValueCallback,
		g = ["set", 'cancel'],
		m = n(),
		f = 0,
		k = $(this),
		p,
		M = t.minWidth || ['20%', '20%', '25%'],
		W = t.maxWidth || ['30%', '30%', '30%'],
		D = function(e) {console.log(e)
			if ("string" == typeof e) return e;
			var s, t, k = e[0];
			return s = [e[0] + '点' + e[1] + '分 '+(e[2]?'夏令时':''),e[0]+':'+e[1]+' '+e[2]],
			s = C && C(e, w, f, p) || s;
			return s
		};
		return {
			minWidth: M,
			maxWidth: W,
			wheels: m,
			formatValue: D,
			parseValue: function(a) {
				return a
			},
			buttons: g,
			headerText: !1,
			onBeforeShow: function() {
				var m = s.getArrayVal(!0);
				if (!m[0] || !m[1]) s.setArrayVal([0, 0], !1, !1, !0, 0);
				k.blur()
			},
			onSet: function(a) {
				k && (v = d.txtobj?$(d.txtobj,k):k,v.text(a.valueText[0]).addClass('notempty'),$('input',k).val(a.valueText[1]))
			}
		}
	};
	s.presetShort("times")
})(jQuery);