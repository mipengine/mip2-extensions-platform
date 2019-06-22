const {
  fetchJsonp
} = window

// 时间处理，到具体某天或某月之前
function timeParse (time) {
  let timeStamp = Date.parse(new Date()) - time
  let timeStr = ''
  if (1000 * 60 * 1 < timeStamp && timeStamp <= 1000 * 60 * 60) {
    timeStr = Math.round(timeStamp / (1000 * 60)) + '分钟前'
  } else if (1000 * 60 * 60 * 1 < timeStamp && timeStamp <= 1000 * 60 * 60 * 24) {
    timeStr = Math.round(timeStamp / (1000 * 60 * 60)) + '小时前'
  } else if (1000 * 60 * 60 * 24 < timeStamp && timeStamp <= 1000 * 60 * 60 * 24 * 30) {
    timeStr = Math.round(timeStamp / (1000 * 60 * 60 * 24)) + '天前'
  } else if (1000 * 60 * 60 * 24 * 30 < timeStamp && timeStamp <= 1000 * 60 * 60 * 24 * 30 * 12) {
    timeStr = Math.round(timeStamp / (1000 * 60 * 60 * 24 * 30)) + '个月前'
  } else {
    timeStr = Math.round(timeStamp / (1000 * 60 * 60 * 24 * 30 * 12)) + '年前'
  }
  return timeStr
}

export default class MIPJtExpertSaydetail extends MIP.CustomElement {
  build () {
    let sayId = this.element.getAttribute('say-id')
    let memberId = this.element.getAttribute('member-id')
    let fetchUrl = `https://quanzi.cngold.org/say/detail/${sayId}/${memberId}/`
    fetchJsonp(fetchUrl).then((res) => {
      return res.json()
    }).then((data) => {
      if (data && data.data) {
        let res = data.data
        let say = res.say
        let approvers = res.agreeRelations
        let notes = res.comments
        this.topSay(say)
        this.starHead(approvers, say)
        this.notesList(notes, 0)
      }
    })
  }
  // 加载顶部说说
  topSay (say) {
    if (say !== '' && say !== undefined && say !== null) {
      let html = ''
      let content = say.content
      let time = timeParse(say.sendTime)
      html += `<li class="expert_id cz">
        <div class="user_headImg clearfix fl">
        <mip-img layout="responsive" width="75" height="75" src="https://res.cngoldres.com${say.senderPhoto}" alt="${content}"></mip-img>
        <i class="gold"></i>
        </div>
        <div class="user_mid">
        <span>${say.senderNickName}</span>
        <div>${content}</div>
        <div class="time">${time}</div>
        <div class="new-hy-bot">
        <span class="comment_num"><em>${say.countOfAgree}</em>点赞</span>
        <span class="zan_num"><em>${say.countOfComment}</em>评论</span>
        </div>
        </div>
        </li>`
      this.element.querySelector('#member-say').innerHTML = html
    }
  }
  // 加载点赞者头像
  starHead (approvers, say) {
    let html = '<i class="num_icon fl"></i>'
    let content = ''
    if (say !== undefined && say !== null && say !== '') {
      content = say.content
    }
    html += '<div class="zan_himg fl">'
    if (approvers !== undefined && approvers !== null && approvers !== '' && approvers.length > 0) {
      for (let i = 0; i < approvers.length; i++) {
        if (i > 4) {
          html += ''
          continue
        }
        html += `<div class="user_headImg">
          <mip-img layout="responsive" width="50" height="50" src="https://res.cngoldres.com${approvers[i].userHeadPhoto}" alt="${content}"></mip-img>
          <i class="gold"></i>
          </div>`
      }
      html += `</div><span class="fr">共<em>${approvers.length}</em>人点赞`
    } else {
      html += '</div><span class="fr">共<em>0</em>人点赞</span>'
    }
    this.element.querySelector('#agree').innerHTML = html
  }
  // 加载评论
  notesList (notes, page) {
    let html = ''
    if ((notes === '' || notes === undefined || notes === null) && page === 0) {
      this.element.querySelector('#comment').innerHTML = `
        <li class="con_none" >
        <div class="img">
        <mip-img layout="responsive" width="137" height="134" src="https://res.cngoldres.com/mobile/mingjia/img/none.png" alt="暂时还没有评论哦"></mip-img>
        </div>
        <p>暂时还没有评论哦</p>
        </li>`
      return
    }
    if (notes !== '' && notes !== undefined && notes !== null && notes.length > 0) {
      for (let i = notes.length - 1; i >= 0; i--) {
        if (i < (notes.length - page * 15) && i >= (notes.length - (page + 1) * 15)) {
          let time = timeParse(notes[i].commentTime)
          html += `<li class="expert_id">
            <div class="user_headImg clearfix fl">
            <mip-img layout="responsive" width="75" height="75" src="https://res.cngoldres.com${notes[i].photo}" alt="${notes[i].content}"></mip-img>
            <i class="gold"></i>
            </div>
            <div class="user_mid">
            <span>${notes[i].nickName}</span>
            <div>${notes[i].content}</div>
            <div class="time">${time}</div>
            </div>
            </li>`
        }
      }
      this.element.querySelector('#comment').innerHTML = html
    } else {
      this.element.querySelector('#comment').innerHTML = `
        <li class="con_none" >
        <div class="img">
        <mip-img layout="responsive" width="137" height="134" src="https://res.cngoldres.com/mobile/mingjia/img/none.png" alt="暂时还没有评论哦"></mip-img>
        </div>
        <p>暂时还没有评论哦</p>
        </li>`
    }
  }
}
