const {
  fetchJsonp
} = window

export default class MIPJtExpertData extends MIP.CustomElement {
  build () {
    let type = this.element.getAttribute('type')
    let id = this.element.getAttribute('id')
    if (type === 'article') { // 获取文章数、粉丝数、热度
      let website = this.element.getAttribute('website')
      this.articleData(website, id)
    } else if (type === 'sayList') { // 获取说说列表
      this.sayList(id, 1)
    } else if (type === 'qaList') { // 获取问答列表
      this.qaList(id, 1)
    }
  }
  // 截取指定长度字符
  cutStr (wenzi, length) {
    let sub = wenzi.substring(0, length)
    if (wenzi.length > length) {
      sub += '...'
    }
    return sub
  }
  // 获取文章数、粉丝数、热度
  articleData (website, id) {
    let fetchUrl = ''
    if (website === 'expert') {
      fetchUrl = `https://m.cngold.org/mingjia/m_${website}${id}/ajax_data.html?v=` + new Date().getTime()
    } else if (website === 'company') {
      fetchUrl = `https://m.cngold.org/jigou/m_${website}${id}/ajax_data.html?v=` + new Date().getTime()
    }
    fetch(fetchUrl, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then((res) => {
      return res.json()
    }).then((data) => {
      if (data.flag) {
        if (data.data) {
          this.element.querySelector('#blog-count').innerHTML = data.data.blogCount
          this.element.querySelector('#fans-count').innerHTML = data.data.fansCount
          this.element.querySelector('#visit-count').innerHTML = data.data.visitCount
        }
      }
    })
  }
  // 获取说说列表
  sayList (id, page) {
    let fetchUrl = `https://quanzi.cngold.org/say/userLine/${id}/${page}/15/`
    fetchJsonp(fetchUrl).then((res) => {
      return res.json()
    }).then((data) => {
      if (data && data.data) {
        let result = data.data
        let html = ''
        for (let i = 0; i < result.length; i++) {
          let data = result[i]
          let con = this.cutStr(data.say.content, 98)

          let time = data.say.sendTime
          let month = (new Date(time).getMonth() + 1)
          let day = new Date(time).getDate()
          if (month > 0 && month < 10) {
            month = '0' + month
          }
          if (day > 0 && day < 10) {
            day = '0' + day
          }
          let year = month + '-' + day
          let imageString = data.say.pictures
          let images = imageString.split(',')

          if (!data.say.countOfAgree) {
            data.say.countOfAgree = 0
          }
          if (!data.say.countOfComment) {
            data.say.countOfComment = 0
          }
          html += '<li>' +
            '<a class="per-box clearfix" href="https://m.cngold.org/mingjia/m_expert' +
            id + '_c' + data.say.id + '.html" title="' + data.say.content + '">' +
            '<p>' + con + '</p>'

          if (imageString && images.length > 0) {
            html += '<p class="clearfix">'
            for (let j = 0; j < images.length; j++) {
              html += '<mip-img src="https://res.cngoldres.com' + images[j] + '"></mip-img>'
            }
            html += '</p>'
          }
          html += '<div class="new-hy-bot">' +
            '<span class="comment_num"><em>' + data.say.countOfComment + '</em>评论</span>' +
            '<span class="zan_num"><em>' + data.say.countOfAgree + '</em>赞</span>' +
            '<span class="time">' + year + '</span>' +
            '</div>' + '</a></li>'
        }
        this.element.querySelector('#say-list').innerHTML = html
      } else if (!data && page === 1) {
        let html = '<li class="con_none">' +
          '<div class="img"><mip-img layout="responsive" width="137" height="134" src="https//res.cngoldres.com/mobile/mingjia/img/none.png" alt="暂时还没有说说哦"></mip-img></div>' +
          '<p>暂时还没有说说哦</p>' +
          '</li>'
        this.element.querySelector('#say-list').innerHTML = html
      }
    })
  }
  // 问答列表
  qaList (id, page) {
    let fetchUrl = `https://wenda.cngold.org/expert/answer/${id}/ajax_s15_p${page}.htm`
    fetchJsonp(fetchUrl).then((res) => {
      return res.json()
    }).then((data) => {
      if (data && data.data) {
        let html = ''
        let result = data.data
        if (result.length > 0) {
          for (let i = 0; i < result.length; i++) {
            let dateStr = ''
            let con = this.cutStr(result[i].content, 98)
            if (!result[i].createdAt) {
              result[i].createdAt = ''
            } else {
              let date = new Date(result[i].createdAt)
              let month = date.getMonth() + 1
              if (month > 0 && month < 10) {
                month = '0' + month
              }
              let day = date.getDate()
              if (day > 0 && day < 10) {
                day = '0' + day
              }
              dateStr = date.getFullYear() + '-' + month + '-' + day
            }

            html += '<li class="wenda_con">' +
              '<a href="https://m.cngold.org/wenda/question' + result[i].questionId + '.html" title="' +
              result[i].questionTitle + '">' + '<h3>' + result[i].questionTitle + '</h3>' +
              '<p>' + con + '</p>' +
              '<div class="new-hy-bot">' +
              '<span class="zan_num"><em>' + result[i].praiseCount + '</em>赞</span>' +
              '<span class="time">' + dateStr + '</span>' +
              '</div>' + '</a></li>'
          }
          this.element.querySelector('#qa-list').innerHTML = html
        } else if ((!result || result.length === 0) && page === 1) {
          let html = '<li class="con_none">' +
            '<div class="img"><mip-img layout="responsive" width="137" height="134" src="https://res.cngoldres.com/mobile/mingjia/img/none.png" alt="暂时还没有问答哦"></mip-img></div>' +
            '<p>暂时还没有问答哦</p>' + '</li>'
          this.element.querySelector('#qa-list').innerHTML = html
        }
      }
    })
  }
}
