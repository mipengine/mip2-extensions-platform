/* eslint-disable */
import './index.less'

export default class MIPIaskShunt extends MIP.CustomElement {
  build () {
    let urla = this.element.getAttribute('groupa')
    let urlb = this.element.getAttribute('groupb')
    let c = {
      group: [urla, urlb]
    }
    let thresholdValue = 10000

    let refer = document.referrer.split('?', 1)[0]

    let groups = c.group

    if (groups.indexOf(refer) === -1) {
      if (c && c.group && c.group.length) {
        c.sample = 0.9
        let s = '' + t(JSON.stringify(c)) % 1e8
        let u = r('IASK_SHUNT_ID')
        if (!u) {
          u = s + '_' + i()
          n('IASK_SHUNT_ID', u + ';expires=Tue, 29 Dec 2099 16:00:00 GMT; path=/')
        } else if (u.split('_')[0] === s) {
          n('IASK_SHUNT_ID', u + ';expires=Tue, 29 Dec 2099 16:00:00 GMT; path=/')
        }
        let h = t(u, u.length)
        if (!(h % thresholdValue > thresholdValue * c.sample)) {
          let l = h % c.group.length
          let p = c.group[l]
          let d = o(document.referrer)
          let f = o(p)
          let g = {}
		  if (d.lid && /^https?:\/\/m\.baidu.com\/.*tc\?/.test(document.referrer)) {
			  g.lid = d.lid
			  f.query.bdabtest = JSON.stringify(g)
		  }
		  let m = new Date()
          m.setTime(m.getTime() + 1e4), document.cookie = 'IASK_SHUNT=true;expires=' + m.toGMTString()
          location.replace(a(f))
        }
      }
    }
  }
}

function t (e, t) {
  let r
  let n
  let o
  let a
  let i
  let c
  let s
  let u
  for (r = 3 & e.length, n = e.length - r, o = t, i = 3432918353, c = 461845907, u = 0; n > u;) {
    s = 255 & e.charCodeAt(u) | (255 & e.charCodeAt(++u)) << 8 |
            (255 & e.charCodeAt(++u)) << 16 | (255 & e.charCodeAt(++u)) <<
            24, ++u, s = (65535 & s) * i + (((s >>> 16) * i & 65535) << 16) &
            4294967295, s = s << 15 | s >>> 17, s = (65535 & s) * c + (((s >>> 16) * c & 65535) << 16) &
            4294967295, o ^= s, o = o << 13 | o >>> 19, a = 5 * (65535 & o) + ((5 * (o >>> 16) & 65535) << 16) &
            4294967295, o = (65535 & a) + 27492 + (((a >>> 16) + 58964 & 65535) << 16)
  }

  switch (s = 0, r) {
    case 3:
      s ^= (255 & e.charCodeAt(u + 2)) << 16
      break
    case 2:
      s ^= (255 & e.charCodeAt(u + 1)) << 8
      break
    case 1:
      s ^= 255 & e.charCodeAt(u), s = (65535 & s) * i + (((s >>> 16) * i & 65535) << 16) &
                4294967295, s = s << 15 | s >>> 17, s = (65535 & s) * c + (((s >>> 16) * c & 65535) << 16) &
                4294967295, o ^= s
      break
  }
  return o ^= e.length, o ^= o >>> 16, o = 2246822507 * (65535 & o) + ((2246822507 * (o >>> 16) & 65535) << 16) & 4294967295, o ^= o >>> 13, o = 3266489909 * (65535 & o) + ((3266489909 * (o >>> 16) & 65535) << 16) & 4294967295, o ^= o >>> 16, o >>> 0
}

function r (e) {
  let t = '; ' + document.cookie
  let r = t.split('; ' + e + '=')
  let v = r.length === 2 ? r.pop().split(';').shift() : void 0
  return v
}

function n (e, t) {
  document.cookie = e + '=' + t
}

function o (e) {
  let t = document.createElement('a')
  t.href = e, t.query = {}
  let r
  let n
  let o = t.search.substr(1)
  if (o.length) {
    for (let r = o.split('&'), a = 0, i = r.length; i > a; a++) {
      n = r[a].split('='), t.query[n[0]] = decodeURIComponent(n[1])
    }
  }
  return t
}

function a (e) {
  let t = []
  let r = e.query
  for (let n in r) {
    r.hasOwnProperty(n) && t.push(n + '=' + encodeURIComponent(r[n]))
  }
  let o = t.join('&')
  return e.search = o ? '?' + o : '', e.href
}

function i () {
  function e () {
    return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1)
  }
  return e() + e() + e() + e() + e() + e() + e() + e()
}
