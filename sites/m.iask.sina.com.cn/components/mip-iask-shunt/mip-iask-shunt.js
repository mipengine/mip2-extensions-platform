import './index.less'

export default class MIPIaskShunt extends MIP.CustomElement {
  build () {
    var urla = this.element.getAttribute('groupa');
	var urlb = this.element.getAttribute('groupb');
	
	var c = {
            group: [urla, urlb]
        };
	var thresholdValue = 10000;

	var refer = document.referrer.split('?', 1)[0];

	var groups = c.group;

	if (groups.indexOf(refer) === -1) {
		if (c && c.group && c.group.length) {
			c.sample = 0.9;
			var s = '' + t(JSON.stringify(c)) % 1e8;
			var u = r('IASK_SHUNT_ID');
			u && u.split('_')[0] === s || (u = s + '_' + i(),
					n('IASK_SHUNT_ID', u + ';expires=Tue, 29 Dec 2099 16:00:00 GMT; path=/'));
			var h = t(u, u.length);
			if (!(h % thresholdValue > thresholdValue * c.sample)) {
				var l = h % c.group.length;
				var p = c.group[l];
				var d = o(document.referrer);
				var f = o(p);
				var g = {};
				d.lid && /^https?:\/\/m\.baidu.com\/.*tc\?/.test(document.referrer)
				&& (g.lid = d.lid), f.query.bdabtest = JSON.stringify(g);
				var m = new Date;
				m.setTime(m.getTime() + 1e4), document.cookie = 'IASK_SHUNT=true;expires=' + m.toGMTString();
				location.replace(a(f));
			}
		}
	}
  }
}

function t(e, t) {
        var r;
        var n;
        var o;
        var a;
        var i;
        var c;
        var s;
        var u;
        for (r = 3 & e.length, n = e.length - r, o = t, i = 3432918353, c = 461845907, u = 0; n > u;) {
            s = 255 & e.charCodeAt(u) | (255 & e.charCodeAt(++u)) << 8
            | (255 & e.charCodeAt(++u)) << 16 | (255 & e.charCodeAt(++u))
            << 24, ++u, s = (65535 & s) * i + (((s >>> 16) * i & 65535) << 16)
            & 4294967295, s = s << 15 | s >>> 17, s = (65535 & s) * c + (((s >>> 16) * c & 65535) << 16)
            & 4294967295, o ^= s, o = o << 13 | o >>> 19, a = 5 * (65535 & o) + ((5 * (o >>> 16) & 65535) << 16)
            & 4294967295, o = (65535 & a) + 27492 + (((a >>> 16) + 58964 & 65535) << 16);
        }

        switch (s = 0, r) {
            case 3:
                s ^= (255 & e.charCodeAt(u + 2)) << 16;
            case 2:
                s ^= (255 & e.charCodeAt(u + 1)) << 8;
            case 1:
                s ^= 255 & e.charCodeAt(u), s = (65535 & s) * i + (((s >>> 16) * i & 65535) << 16)
                & 4294967295, s = s << 15 | s >>> 17, s = (65535 & s) * c + (((s >>> 16) * c & 65535) << 16)
                & 4294967295, o ^= s;
        }
        return o ^= e.length, o ^= o >>> 16, o = 2246822507 * (65535 & o) + ((2246822507 * (o >>> 16) & 65535) << 16)
        & 4294967295, o ^= o >>> 13, o = 3266489909 * (65535 & o) + ((3266489909 * (o >>> 16) & 65535) << 16)
        & 4294967295, o ^= o >>> 16, o >>> 0;
    }

function r(e) {
	var t = '; ' + document.cookie;
	var r = t.split('; ' + e + '=');
	return 2 === r.length ? r.pop().split(';').shift() : void 0;
}

function n(e, t) {
	document.cookie = e + '=' + t;
}

function o(e) {
	var t = document.createElement('a');
	t.href = e, t.query = {};
	var r;
	var n;
	var o = t.search.substr(1);
	if (o.length) {
		for (var r = o.split('&'), a = 0, i = r.length; i > a; a++) {
			n = r[a].split('='), t.query[n[0]] = decodeURIComponent(n[1]);
		}
	}
	return t;
}

function a(e) {
	var t = [];
	var r = e.query;
	for (var n in r) {
		r.hasOwnProperty(n) && t.push(n + '=' + encodeURIComponent(r[n]));
	}
	var o = t.join('&');
	return e.search = o ? '?' + o : '', e.href;
}

function i() {
	function e() {
		return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1);
	}
	return e() + e() + e() + e() + e() + e() + e() + e();
}