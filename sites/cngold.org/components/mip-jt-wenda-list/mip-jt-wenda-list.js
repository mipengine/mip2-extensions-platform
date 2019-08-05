export default class MIPJtWendaList extends MIP.CustomElement {
  build () {
    let type = this.element.getAttribute('type')
    let hobbyId = this.element.getAttribute('hobby-id') || ''

    if (type === 'top') {
      this.getTopList(hobbyId, 1, type)
    } else if (type === 'new' || type === 'price') {
      this.getQuesList(type, 1)
    }
  }
  // 获取问答首页的回答列表
  getTopList (categorys, page, type) {
    let fetchUrl = `https://m.cngold.org/wenda/m_getTopQuestion.html?categorys=${categorys}&page=${page}`
    fetch(fetchUrl).then((res) => {
      return res.json()
    }).then((data) => {
      if (data.data && data.data.result && data.data.result.length > 0) {
        let html = ''
        data.data.result.forEach((val, i) => {
          let user = val.wendaUser
          let photo = '/wenda/img/tx-pt.png'
          let nickName = '匿名'
          if (user) {
            if (user.photo) {
              photo = user.photo
            }
            if (user.nickname) {
              nickName = user.nickname
            }
          }
          html += '<dl class="first clearfix">' +
            ' <a href="https://m.cngold.org/wenda/question' + ((val.id) || 0) + '.html">' +
            '<dt class="tit">' + ((val.title) || '') + '</dt>' +
            '<dd class="con">'
          if (val.content) {
            let content = val.content
            content = content.replace(/<[^>]+>/g, '')
            if (content.length > 35) {
              content = content.sunstring(0, 34) + '...<span>全文</span>'
            }
            html += '<div class="des">' + content + '</div>'
          }
          if (val.image) {
            html += '<mip-img src="https://res.cngoldres.com' + val.image +
              '" alt="' + ((val.title) || '') + '"></mip-img>'
          }
          html += '</dd>' +
            '<dd class="bot">' + '<span class="fl">' +
            '<div class="img"><mip-img layout="responsive" width="35" height="35" src="https://res.cngoldres.com' + photo + '"></mip-img></div>' +
            nickName + '</span>' +
            '<span class="num"><em>' + ((val.answerCount) || 0) + '</em>回答</span>' +
            '</dd></a></dl>'
        })
        this.element.querySelector(`#${type}-list`).innerHTML = html
      }
    })
  }
  // 获取问答列表
  getQuesList (type, page) {
    let quesType = '1'
    let cateId = '0'
    if (!type) {
      return
    }
    if (type === 'recommend') {
      quesType = '6'
    } else if (type === 'new') {
      quesType = '1'
    } else if (type === 'price') {
      quesType = '5'
    } else {
      cateId = type
    }
    let fetchUrl = `https://m.cngold.org/wenda/m_get_question_list_c${cateId}_q${quesType}_p${page}.html?r=` + new Date().getTime()
    fetch(fetchUrl).then((res) => {
      return res.json()
    }).then((data) => {
      if (data.flag) {
        let list = data.data
        if (list && list.result && list.result.length > 0) {
          let html = ''
          list.result.forEach((val, i) => {
            let user = val.wendaUser
            let photo = '/wenda/img/tx-pt.png'
            let nickName = '匿名'
            if (user) {
              if (user.photo) {
                photo = user.photo
              }
              if (user.nickname) {
                nickName = user.nickname
              }
            }
            let goldHtml = ''
            if (val.gold && val.gold > 0) {
              goldHtml = '<i class="icon1"></i><em>' + ((val.gold) || 0) + '</em> '
            }
            html += '<dl class="clearfix" questionId=' + (val.id || 0) + '">' +
              '<a href="https://m.cngold.org/wenda/question' + (val.id || 0) + '.html">' +
              '<dt class="tit">' + goldHtml + (val.title || '') + '</dt>' +
              '</a>' +
              '<dd class="bot">' +
              '<span class="fl">' +
              '<div class="img"><mip-img layout="responsive" width="35" height="35" src="https://res.cngoldres.com' +
              photo + '" alt="' + nickName + '"></mip-img></div>' + nickName +
              '</span>' +
              '<span class="num">' + (val.answerCount || 0) + '回答</span>' +
              '<a class="to_answer fr cblue" href="https://passport2.cngold.org/?service=https://m.cngold.org/wenda/list.html">回答</a>' +
              '</dd></dl>'
          })
          this.element.querySelector(`#${type}-list`).innerHTML = html
        }
      }
    })
  }
}
