/*
* @Author: shl
* @title:  html代码渲染 PC&M共用
* @Date:   2019-01-05 13:31:54
* @Last Modified by:   shl
* @Last Modified time: 2019-05-28 16:39:18
*/

// 诗篇处理
const poem = function (def, y, z, s) {
  let obj = {t: '', s: '', line: {}, line_count: 0}
  let arr = []
  let _def = null
  let _y = null
  let _z = null
  let ya = []
  let za = []
  let max = 0
  _def = _getdef(def)
  arr = _def
  if (y !== '') {
    _y = _getY(y)
    ya = _y.arr
    obj.t = _y.t
  }
  if (z !== '') {
    _z = _getZ(z)
    za = _z.arr
  }

  max = arr.length
  for (let i = 0; i < max; i++) {
    let o = {
      line_num: arr[i].line_num,
      def: arr[i].txt,
      y: '',
      z: ''
    }
    if (ya.length !== 0 && typeof ya[i] !== 'undefined') {
      o.y = ya[i].y
    }
    if (za.length !== 0 && typeof za[i] !== 'undefined') {
      o.z = za[i].z
    }
    obj.line[o.def] = o
    obj.line_count += 1
  }

  // 获取赏析
  if (s !== '') {
    obj.s = s
  }
  return obj
}

const doc = function (str) {
  let arr = []
  let part = ''
  let tip = ''
  let f = false
  let ele = document.createElement('div')
  if (str == null) {
    return {arr, tip, hasmore: f}
  }
  ele.innerHTML = str
  f = str.length > 500
  if (str.indexOf('<p style=" color:#919090;margin:0px; font-size:12px;line-height:160%;">') > -1) {
    if (part === '') {
      part = str.split('<p style=" color:#919090;margin:0px; font-size:12px;line-height:160%;"')[0]
    } else if (ele.children.length <= 2) {
      part = ele.innerHTML.substring(0, ele.innerHTML.indexOf('<'))
    }
  } else if (str.indexOf('<p style=" color:#999999;margin:0px; font-size:12px;line-height:160%;">') > -1) {
    if (part === '') {
      part = ele.innerHTML.split('<p style=" color:#999999;margin:0px; font-size:12px;line-height:160%;">')[0]
    } else if (ele.children.length <= 2) {
      part = ele.innerHTML.substring(0, ele.innerHTML.indexOf('<'))
    }
  } else {
    if (ele.children.length <= 1) {
      part = ele.innerHTML.substring(0, ele.innerHTML.indexOf('<'))
    }
  }
  for (let i = 0; i < ele.children.length; i++) {
    let pt = {}
    let e = ele.children[i]
    if (e.nodeName !== '#text') {
      let a = e.innerHTML
      if (a === '参考资料：') {
        tip = `<p>${a}</p>`
      } else if (a.indexOf('译赏内容整理自网络') > -1 || a.indexOf('本节内容整理自网络') > -1) {

      } else if (tip !== '') {
        a = a.replace(/<[^<]*>/g, '').replace(/\n/g, '')
        tip += `<p>${a}</p>`
      } else if (a === '') {

      } else {
        let sub = /<strong>(.*)<\/strong>/.exec(a)
        let info = a
        if (sub !== null) {
          pt = {sub: sub[1].replace('<br>', '')}
          info = a.replace(sub[0], '')
        }
        let infoArr = info.replace(/\n/g, '').split('<br>')
        pt.arr = []
        for (let j = 0; j < infoArr.length; j++) {
          if (infoArr[j] !== '') {
            infoArr[j] = infoArr[j].replace('▲', '')
            pt.arr.push(infoArr[j])
          }
        }
        arr.push(pt)
      }
    }
  }
  if (part !== '' && part.indexOf('<') === -1) {
    arr.push({
      arr: [part]
    })
  }

  return {arr, tip, hasmore: f}
}

const _getdef = function (def) {
  let arr = []
  let ele = document.createElement('div')
  ele.innerHTML = def
  for (let j = 0; j < ele.children.length; j++) {
    let e = ele.children[j]
    let txt = e.innerHTML.replace(/<span>/g, '<span class="z">')
    arr.push({line_num: j, txt})
  };
  return arr
}

// 从译文内获取默认诗文的格式
const _getY = function (y) {
  let arr = []
  let t = ''
  let close = false
  let ele = document.createElement('div')
  ele.innerHTML = y
  for (let j = 0; j < ele.children.length; j++) {
    let e = ele.children[j]
    let y = e.innerHTML
    let o = {
      line_num: j,
      y
    }
    if (e.nodeName === 'DIV') {
      close = true
    } else if (!close) {
      arr.push(o)
    }
    if (close) {
      t += y.replace(/<p>/g, '<p class="z">')
    }
  }

  return {arr, t}
}

// 获取注释
const _getZ = function (z) {
  let arr = []
  let ele = document.createElement('div')
  ele.innerHTML = z
  for (let j = 0; j < ele.children.length; j++) {
    let e = ele.children[j]
    let z = e.innerHTML
    let o = {
      line_num: j,
      z
    }
    arr.push(o)
  }
  return {arr}
}

// 获取文字匹配情况
// 每个字具体的匹配定位
const _note = function (htm, str) {
  let obj = {isall: false, info: []}
  let reg = new RegExp(/[，|。|！|：|（|）]/, 'i')
  let d = []
  let start = htm.indexOf(str)
  let realtxt = '</div>'
  if (start === -1) {
    // 全句无法匹配
    // 先尝试是否可以全句大致匹配
    let all = _same(start, htm, str)
    if (all !== null) {
      realtxt = htm.substring(all.start, all.end)
    }
    if (realtxt.indexOf('</div>') === -1) {
      // 全句可以匹配
      obj.info.push(all)
    } else {
      // 按符号拆分单句再匹配
      let ds = 0
      let dc = 0
      for (let i in str) {
        if (reg.test(str[i])) {
          let o = {
            isc: false, // 是纯文本匹配
            c_v: str.substring(ds, Number(i)), // 纯文本不带标点符号
            v: str.substring(ds, Number(i) + 1)// 带标点符号
          }
          o.start = htm.indexOf(o.v)
          if (o.start === -1) {
            o.start = htm.indexOf(o.c_v)
            if (o.start !== -1) {
              o.isc = true
            }
          }
          d.push(o)
          ds = str.substring(0, Number(i) + 1).length
          // 是否全部单句都匹配
          if (o.start !== -1) {
            dc++
            if (Number(i) === str.length - 1) {
              if (dc === d.length) {
                obj.isall = true
              }
            }
          }
        }
      }
      if (obj.isall) {
        // 全部单句匹配
        for (let i = 0; i < d.length; i++) {
          obj.info.push({
            isd: true,
            isc: d[i].isc,
            start: d[i].start,
            end: d[i].start + d[i].v.length + 1,
            v: d[i].v,
            c_v: d[i].c_v
          })
        }
      } else {
        for (let i = 0; i < d.length; i++) {
          if (d[i].start === -1) {
            let o = _same(d[i].start, htm, d[i].v)
            if (o !== null) {
              obj.info.push(o)
            }
          } else {
            obj.info.push({
              isd: true,
              isc: d[i].isc,
              start: d[i].start,
              end: d[i].start + d[i].v.length + 1,
              v: d[i].v,
              c_v: d[i].c_v
            })
          }
        }
      }
    }
  } else {
    obj.isall = true
    obj.info.push({
      isd: false,
      isc: false,
      start,
      end: start + str.length,
      v: str
    })
  }
  return obj
}

function _same (start, htm, str) {
  let obj = {}
  let s = 0
  let e = str.length
  let reg = new RegExp(/[，|。|！|：|（|）]/, 'i')
  let pc = 0// 匹配的字数量
  for (let i in str) {
    if (htm.indexOf(str[i]) > -1) {
      if (!reg.test(str[i])) {
        pc++
      }
    }
    if (reg.test(str[i])) {
      pc++
    }
  }
  if (pc < str.length) {
    obj = null
  } else {
    while (start === -1 && e > 0) {
      e--
      start = htm.indexOf(str.substring(s, e))
    }
    if (start !== -1) {
      obj.isd = false
      obj.isc = false
      obj.v = str
      obj.c_v = str.substring(0, str.length - 1)
      obj.start = start
      let end = str.substring(str.length - 1, str.length)
      // 获取剩余没匹配的内容再进行一次匹配
      let after = str.substring(e, str.length - 1)
      obj.end = htm.indexOf(after)
      if (obj.end !== -1) {
        obj.end = obj.end + after.length
      } else {
        s = 0
        while (obj.end === -1 && s < after.length) {
          s++
          let v = after.substring(s, after.length)
          obj.end = htm.indexOf(v)
        }
        if (obj.end === -1) {
          obj = null
        } else {
          obj.end = obj.end + after.length - s
        }
        // 获取最后一个文字到最后一个标点符合的字符长度
        let afterend = htm.substring(obj.end, htm.length)
        let close = false
        for (let i in afterend) {
          if (!close) {
            obj.end++
            if (afterend[i] === end) {
              close = true
            }
          }
        }
      }
    }
  }
  return obj
}

/**
 * 根据传入需要高亮的文本对文本执行高亮操作
 *
 * @param  {string} body 文本
 * @param  {string} str  需高亮内容
 * @return {string}
 */
const hlg = function (body, str) {
  let obj = _note(body, str)
  let txt = ''
  let needend = []
  function changeatend (v) {
    if (txt === '') {
      txt = body
    }
    txt = txt.replace(v, `<span class="hlt">${v}</span>`)
  }
  if (obj.isall) {
    for (let i = 0; i < obj.info.length; i++) {
      if (obj.info[i].isd) {
        let v = obj.info[i].v
        if (obj.info[i].isc) {
          v = obj.info[i].c_v
        }
        needend.push(v)
      } else {
        if (txt === '') {
          txt = body.replace(obj.info[i].v, `<span class="hlt">${obj.info[i].v}</span>`)
        } else {
          txt = txt.replace(obj.info[i].v, `<span class="hlt">${obj.info[i].v}</span>`)
        }
      }
    }
  } else {
    for (let i = 0; i < obj.info.length; i++) {
      if (obj.info[i].isd) {
        let v = obj.info[i].v
        if (obj.info[i].isc) {
          v = obj.info[i].c_v
        }
        needend.push(v)
        if (i === obj.info.length - 1) {
          txt += body.substring(obj.info[i].end, body.length)
        }
      } else {
        if (txt === '') {
          txt = body.substring(0, obj.info[i].start) + '<span class="hlt">'
          txt += body.substring(obj.info[i].start, obj.info[i].end) + '</span>'
        } else {
          body += body.substring(txt.length, obj.info[i].start) + '<span class="hlt">'
          body += body.substring(obj.info[i].start, obj.info[i].end) + '</span>'
        }
        if (i === obj.info.length - 1) {
          txt += body.substring(obj.info[i].end, body.length)
        }
      }
    }
  }
  for (let i = 0; i < needend.length; i++) {
    changeatend(needend[i])
  }
  if (obj.info.length === 0) {
    txt = body
  }
  return txt
}


export {
  poem,
  doc,
  hlg
}
