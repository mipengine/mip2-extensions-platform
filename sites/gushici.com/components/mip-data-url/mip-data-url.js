import './index.less'
import ajax from '../../common/ajax.js'
import poem from '../../common/poem.js'
export default class MIPDataUrl extends MIP.CustomElement {
  constructor (...args) {
    super(...args)
    this.key = this.element.getAttribute('key')
    this.url = this.element.getAttribute('url')
  }

  static get observedAttributes () {
    return ['page']
  }

  attributeChangedCallback (page, old, cur) {
    let key = this.key
    let t = this
    if (key === 'so') {
      let url = this.url
      let q = location.search.replace('?', '').split('&')
      let query = {page: cur}
      for (let i = 0; i < q.length; i++) {
        let o = q[i].split('=')
        query[o[0]] = decodeURI(o[1])
      }
      if (typeof query.value !== 'undefined') {
        MIP.setData({value: query.value})
      }
      MIP.setData({poem: [], auth: {}, pagesize: 0})
      MIP.viewport.setScrollTop(0)
      ajax.get(url, query, function (res) {
        t._so(res, query.value)
      })
    }
  }

  build () {
    let url = this.url
    let path = location.pathname.replace('.html', '').split('_')
    let id = path[1]
    let key = this.key
    let t = this
    if (key !== 'so') {
      ajax.get(url, {id}, function (res) {
        if (key === 'poem') {
          t._poem(res)
        } else if (key === 'auth') {
          t._auth(res)
        }
      })
    }
  }

  _so (res, value) {
    let poems = []
    let auth = {}
    let haspoem = false
    let hasauth = false
    let has = false

    for (let i = 0; i < res.poetry.length; i++) {
      let info = res.poetry[i]
      let o = poem.poem(info.body, info.translation, info.explanation, info.appreciation)
      for (let j in o.line) {
        o.line[j].def = poem.hlg(o.line[j].def, value)
      }
      let item = {
        key: 'refresh',
        id: info.id,
        title: poem.hlg(info.title, value),
        auth_id: info.auth_id,
        auth: poem.hlg(info.auth, value),
        dynasty_id: info.dynasty_id,
        dynasty: poem.hlg(info.dynasty, value),
        tag_arr: info.tag_arr,
        has_y: info.translation !== '',
        has_z: info.explanation !== '',
        has_s: info.appreciation !== '',
        line: o.line,
        s: o.s,
        t: o.t,
        is_y: false,
        is_z: false,
        is_s: false,
        hasmore: false
      }
      poems.push(item)
    }
    if (res.author !== null) {
      auth = {
        id: res.author.id,
        name: res.author.name,
        intro: res.author.intro.replace(new RegExp(res.author.name, 'i'), `<em>${res.author.name}</em>`),
        img: res.author.img ? res.author.img : '',
        ishide: false
      }
      hasauth = true
    } else {
      auth = {
        ishide: true
      }
    }
    if (poems.length > 0) {
      haspoem = true
    }
    if (haspoem && hasauth) {
      has = true
    }
    MIP.setData({poem: poems, auth, pagesize: res.pag_max, has})
  }

  _auth (res) {
    let info = res.detail
    let tags = info.poe_list
    let tagscount = info.num
    let tabs = [
      {'iscur': true, 'htm': ''},
      {'iscur': false, 'htm': {title: '轶事典故'}},
      {'iscur': false, 'htm': {title: '主要成就'}},
      {'iscur': false, 'htm': {title: '人物生平'}},
      {'iscur': false, 'htm': {title: '评价'}}
    ]
    let head = [{iscur: true, title: '作品'}]
    let o1 = poem.doc(info.allusion)
    tabs[1].htm.arr = o1.arr
    tabs[1].htm.tip = o1.tip
    tabs[1].htm.hasmore = o1.hasmore
    if (o1.arr.length !== 0) {
      head.push({iscur: false, title: tabs[1].htm.title, id: 2})
    }
    let o2 = poem.doc(info.achievement)
    tabs[2].htm.arr = o2.arr
    tabs[2].htm.tip = o2.tip
    tabs[2].htm.hasmore = o2.hasmore
    if (o2.arr.length !== 0) {
      head.push({iscur: false, title: tabs[2].htm.title, id: 3})
    }
    let o3 = poem.doc(info.life)
    tabs[3].htm.arr = o3.arr
    tabs[3].htm.tip = o3.tip
    tabs[3].htm.hasmore = o3.hasmore
    if (o3.arr.length !== 0) {
      head.push({iscur: false, title: tabs[3].htm.title, id: 4})
    }
    let o4 = poem.doc(info.evaluation)
    tabs[4].htm.arr = o4.arr
    tabs[4].htm.tip = o4.tip
    tabs[4].htm.hasmore = o4.hasmore
    if (o4.arr.length !== 0) {
      head.push({iscur: false, title: tabs[4].htm.title, id: 5})
    }
    let auth = {
      id: info.id,
      name: info.name,
      intro: info.intro.replace(new RegExp(info.name, 'i'), `<em>${info.name}</em>`),
      img: info.img,
      ishide: false
    }

    MIP.setData({auth, head, tabs, tags, tags_count: tagscount})
  }

  _poem (res) {
    let info = res.detail
    let likes = []
    let o = poem.poem(info.body, info.translation, info.explanation, info.appreciation)
    let item = {
      key: 'refresh',
      id: info.id,
      title: info.title,
      auth_id: info.auth_id,
      auth: info.auth,
      dynasty_id: info.dynasty_id,
      dynasty: info.dynasty,
      tag_arr: info.tag_arr,
      has_y: info.translation !== '',
      has_z: info.explanation !== '',
      has_s: info.appreciation !== '',
      line: o.line,
      s: o.s,
      t: o.t,
      is_y: false,
      is_z: false,
      is_s: false,
      hasmore: false
    }
    let docs = []
    if (info.yi_zhu !== '') {
      let doc = {
        title: '译文及注释',
        arr: [],
        tip: ''
      }
      let o = poem.doc(info.yi_zhu)
      doc.arr = o.arr
      doc.tip = o.tip
      doc.hasmore = o.hasmore
      docs.push(doc)
    }
    if (info.historical !== '') {
      let doc = {
        title: '创作背景',
        arr: [],
        tip: ''
      }
      let o = poem.doc(info.historical)
      doc.arr = o.arr
      doc.tip = o.tip
      doc.hasmore = o.hasmore
      docs.push(doc)
    }
    if (info.appreciation !== '') {
      let doc = {
        title: '鉴赏',
        arr: [],
        tip: ''
      }
      let o = poem.doc(info.appreciation)
      doc.arr = o.arr
      doc.tip = o.tip
      doc.hasmore = o.hasmore
      docs.push(doc)
    }
    let auth = {
      id: info.auth_id,
      title: info.title,
      name: info.auth,
      intro: info.intro.replace(new RegExp(info.auth, 'g'), `<em>${info.auth}</em>`),
      img: info.img,
      ishide: false
    }
    for (let i = 0; i < res.like.length; i++) {
      let lo = poem.poem(res.like[i].body, res.like[i].translation, res.like[i].explanation, res.like[i].appreciation)
      let lk = {
        key: 'refresh',
        id: res.like[i].id,
        title: res.like[i].title,
        auth_id: res.like[i].auth_id,
        auth: res.like[i].auth,
        dynasty_id: res.like[i].dynasty_id,
        dynasty: res.like[i].dynasty,
        tag_arr: res.like[i].tag_arr,
        has_y: res.like[i].translation !== '',
        has_z: res.like[i].explanation !== '',
        has_s: res.like[i].appreciation !== '',
        line: lo.line,
        s: o.s,
        t: o.t,
        is_y: false,
        is_z: false,
        is_s: false,
        hasmore: lo.line_count > 7
      }
      likes.push(lk)
    }

    MIP.setData({item, docs, auth, likes})
  }
}
