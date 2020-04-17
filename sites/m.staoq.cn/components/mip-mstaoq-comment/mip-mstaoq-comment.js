/**
 * @file 评论模块
 * @author fl
 */
import './index.less'
import '../../common/mip-common.less'
import MIPCommon from '../../common/mip-common'
const { CustomElement, util } = MIP
const { jsonParse, dom, css } = util
let defaultData = {}
export default class MIPMstaoqComment extends CustomElement {
  data(options = {}) {
    let defaults = {
      //请求地址
      Url: this.element.getAttribute('url') + '/ajax.asp',
      //请求方法
      Action: {
        'write': 1000,
        'ding': 1002,
        'read': 1003
      },
      //上级ID
      ParentId: 0,
      //当前资源ID
      ResourceId: this.element.getAttribute('cid'),
      //评论类型：配置文件 COMMENTTYPEIDS 常量(1软件2文章3视频4K页面5专题6产品库7厂商)
      CommentType: this.element.getAttribute('type'),
      //网友名称
      UserName: document.getElementById('new-userName').value,
      //评论内容
      Content: document.getElementById('new-cmtMsg'),
      //内容最小字符数
      ContentMinLength: 6,
      //内容最大字符数
      ContentMaxLength: 500,
      //网名最大字符数
      UserNameMaxLength: 10,
      //每页显示数量
      PageSize: 10,
      //当前页数
      Page: 1
    }
    defaultData = util.fn.extend(defaults, options)
  }
  build() {
    let wrapper = dom.create(
      `<section id="new-comment-wrap">
                <div class="new-mhd"><h2>网友评论</h2><span>共<i>0</i>条评论</span><s id="gocomment">说两句</s></div>
                    <div class="new-main-bd">
                        <div id="new-comment">
                            <div id="new-comment-list"></div>
                            <div id="new-comment-form">
                                <span class="fb">我要跟贴</span>
                                <form id="new-cmtForm">
                                    <fieldset>
                                        <input type="hidden" id="ResourceId" name="ResourceId" value="${this.element.getAttribute('cid')}" />
                                        <p><textarea id="new-cmtMsg" name="cmtMsg"></textarea></p>
                                        <p id="new-usercmt" class="new-user-info">
                                            <span id="new-userName-wrap">
                                                网友<input type="text" id="new-userName" name="UserName" maxLength="10" value="速推网友" />
                                            </span>
                                            <span>
                                                <button type="button" id="new-subCmt">提交评论</button>
                                                <i class='cancelBtn'>取消</i>
                                            </span>
                                        </p>
                                    </fieldset>
                                </form>
                            </div>          
                        </div>
                    </div>
      </section>`
    )
    this.element.appendChild(wrapper)
    this.data()
    // 显示
    this.showComment()
    // 读取评论
    this.readComment()
  }
  /*
   *显示评论
   */
  showComment() {
    let cform = document.getElementById('new-cmtForm').getElementsByTagName('fieldset')[0]
    let cfb = document.getElementsByClassName('fb')[0]
    let gocomment = document.getElementById('gocomment')
    let subCmt = document.getElementById('new-subCmt')
    let cancelBtn = document.getElementById('new-cmtForm').getElementsByClassName('cancelBtn')[0]

    function clickEvent() {
      css(cform, 'display', 'block')
      css(cfb, 'display', 'none')
    }
    cfb.onclick = () => {
      clickEvent()
    }
    gocomment.onclick = () => {
      clickEvent()
    }
    subCmt.onclick = () => {
      defaultData.ParentId = 0
      defaultData.UserName = document.getElementById('new-userName').value
      defaultData.Content = document.getElementById('new-cmtMsg')
      this.writeComment();
    }
    cancelBtn.onclick = () => {
      //隐藏底部评论框
      css(document.getElementById('new-cmtForm').getElementsByTagName('fieldset')[0], {
        display: 'none'
      })
      css(document.getElementById('new-comment-form').getElementsByClassName('fb')[0], {
        display: 'block'
      })
    }
  }
  /*
   *读取评论
   */
  readComment() {
    fetch(defaultData.Url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      body: "Action=" + defaultData.Action.read + "&ResourceId=" + defaultData.ResourceId + "&CommentType=" +
        defaultData.CommentType +
        "&PageSize=" + defaultData.PageSize + "&Page=" + defaultData.Page
    }).then((responseText) => {
      return responseText.text()
    }).then((responseRes) => {
      let data = jsonParse(responseRes)
      this.listComment(data)
    })
  }
  /*
   *显示评论
   */
  listComment(data) {
    let that = this
    if (data.status != 1) {
      return false
    }
    let commentHtml = ''
    let list = data.list
    //一级
    for (let i = 0; i < list.length; i++) {
      let parentHtml = this.getCommenHtml(list[i], true)
      //二级
      let childList = list[i].ChildList
      let childHtmlRs = ''
      if (Array.isArray(childList) && typeof(childList) != "undefined" && childList.length > 0) {
        childHtmlRs = '<div class="new-reComment-con">'
        for (let j = 0; j < childList.length; j++) {
          let childHtml = this.getCommenHtml(childList[j], false)
          childHtmlRs = childHtmlRs + childHtml
        }
        childHtmlRs += '</div>'
      }
      //处理结果
      commentList = '   <dd>'
      commentList += parentHtml + childHtmlRs
      commentList += '  </dd>'
      commentHtml += commentList
    }
    //资源评论总数
    document.getElementById('new-comment-wrap').getElementsByClassName('new-mhd')[0].getElementsByTagName('i')[0].innerText =
      data.Resource_CommentNum
    if (commentList.length > 0) {
      resultHtml = '<dl id="new-comcmt">'
      resultHtml += commentHtml
      resultHtml += '</dl>'
      //分页模版
      let showPageHtml = this.showCommentPage(data.page, data.totalPage)
      let list = document.getElementById('new-comment-list')
      list.innerHTML = resultHtml + showPageHtml
      let zan = list.getElementsByClassName('new-zanBtn')
      let reply = list.getElementsByClassName('new-glBtn')
      let prev = list.getElementsByClassName('previousPage')[0]
      let number = list.getElementsByClassName('numberPage')
      let next = list.getElementsByClassName('nextPage')[0]
      //赞 点击事件
      if (zan.length) {
        let _this = this
        for (let i = 0; i < zan.length; i++) {
          zan[i].onclick = function() {
            _this.submitDing(this.getAttribute('data-id'))
          }
        }
      }
      //回复 点击事件
      if (reply.length) {
        let _this = this
        for (let i = 0; i < reply.length; i++) {
          reply[i].onclick = function() {
            _this.replyHtml(this.getAttribute('data-id'))
          }
        }
      }
      //上一页
      if (prev) {
        prev.onclick = () => {
          defaultData.Page = parseInt(defaultData.Page) - 1
          this.readComment()
        }
      }
      //数字页数
      if (number.length) {
        let _this = this
        for (let i = 0; i < number.length; i++) {
          number[i].onclick = function() {
            defaultData.Page = parseInt(this.innerText)
            _this.readComment()
          }
        }
      }
      //下一页
      if (next) {
        next.onclick = () => {
          defaultData.Page = parseInt(defaultData.Page) + 1
          this.readComment()
        }
      }
    }
  }
  /**
   * 评论html
   */
  getCommenHtml(rsData, isParent) {
    let dataHtml = ''
    let ID = rsData.ID
    let ParentId = rsData.ParentId
    let CommentType = defaultData.CommentType
    let ResourceId = rsData.ResourceId
    let FromUser = rsData.FromUser
    let UserName = rsData.UserName
    let IPFrom = rsData.IPFrom
    let Content = rsData.Content
    Content = Content.replace(/\+/g, '%20')
    Content = decodeURIComponent(Content)
    let Favour = rsData.Favour
    let CreatedTime = rsData.CreatedTime
    let tempi = (Number(ID) + Number(String(CreatedTime).split(' ')[0].split('/')[2])) % 2 === 0 ? 1 : 2
    if (isParent) {
      dataHtml += '<div class="new-comment-con" id="new-comment_' + ID + '">'
      dataHtml += '   <img src="/public/images/cmthead' + tempi + '.png" width="45px" height="45px" />'
      dataHtml += '   <p class="new-uname"><span>' + UserName + '</span></p>'
      dataHtml += '   <div class="new-con">' + Content + '</div>'
      dataHtml += '   <p class="new-info">'
      dataHtml += '       <i>' + String(CreatedTime).split(' ')[0] + '</i>'
      dataHtml += '       <span class="fr">'
      dataHtml += '           <a href="javascript:void(0);" class="new-zanBtn" data-id="' + ID + '">' + Favour + '</a>'
      dataHtml += '           <a href="javascript:void(0);" class="new-glBtn" data-id="' + ID + '">回复</a>'
      dataHtml += '       </span>'
      dataHtml += '   </p>'
      dataHtml += '</div>'
    } else { //子分类
      dataHtml += '<div class="new-lit" id="new-comment_' + ID + '">'
      dataHtml += '   <img src="/public/images/cmthead' + tempi + '.png" width="45px" height="45px" />'
      dataHtml += '   <p class="new-uname"><span>' + UserName + '</span></p>'
      dataHtml += '   <div class="new-con">' + Content + '</div>'
      dataHtml += '   <p class="new-info">'
      dataHtml += '       <i>' + String(CreatedTime).split(' ')[0] + '</i>'
      dataHtml += '       <span class="fr">'
      if (parseInt(Favour, 10) === 0) {
        dataHtml += '           <a href="javascript:void(0);" class="new-zanBtn nc" data-id="' + ID + '">赞</a>'
      } else {
        dataHtml += '           <a href="javascript:void(0);" class="new-zanBtn" data-id="' + ID + '">' + Favour + '</a>'
      }
      dataHtml += '           <a href="javascript:void(0);" class="new-glBtn" data-id="' + ID + '">回复</a>'
      dataHtml += '       </span>'
      dataHtml += '   </p>'
      dataHtml += '</div>'
    }
    return dataHtml;
  }
  /* 评论分页 */
  showCommentPage(currentPage, totalPage) {
    let pageHtml = ''
    if (totalPage <= 1) {
      return pageHtml
    }
    //处理显示的数字页数
    let start_page = 0
    let end_page = 0
    start_page = currentPage - 2
    end_page = currentPage + 2
    if (start_page < 2) {
      start_page = 1
      end_page = 5
    } else if (end_page > totalPage) {
      start_page = totalPage - 4
      end_page = totalPage
    }
    //判断总页数
    if (end_page > totalPage) {
      end_page = totalPage
    }
    if (start_page <= 0) {
      start_page = 1
    }
    pageHtml += '<div class="page">'
    if (currentPage > 1 && currentPage <= totalPage) {
      pageHtml += '<span class="previous_link previousPage">上一页</span>'
    } else {
      pageHtml += '<span class="previous_link">上一页</span>'
    }
    for (let i = start_page; i <= end_page; i++) {
      if (currentPage === i) {
        pageHtml += '<span class="page_link active_page">' + i + '</span>'
      } else {
        pageHtml += '<a href="javascript:void(0);" class="page_link numberPage">' + i + '</a>'
      }
    }
    if (currentPage < totalPage) {
      pageHtml += '<span class="previous_link nextPage">下一页</span>'
    } else {
      pageHtml += '<span class="previous_link">下一页</span>'
    }
    pageHtml += '</div>'

    return pageHtml
  }
  /*评论顶(赞)*/
  submitDing(ID) {
    fetch(defaultData.Url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      body: "Action=" + defaultData.Action.ding + "&id=" + ID + "&ResourceId=" + defaultData.ResourceId +
        "&CommentType=" + defaultData.CommentType
    }).then((responseText) => {
      return responseText.text()
    }).then((responseRes) => {
      let dataObj = jsonParse(responseRes)
      let idArr = dataObj.ID
      let dingArr = dataObj.Ding
      for (let i = 0; i < idArr.length; i++) {
        if (idArr[i] === ID) {
          let obj = document.getElementById('new-comment_' + idArr[i]).getElementsByClassName('new-zanBtn')[0]
          obj.classList.remove('nc')
          obj.innerHTML = dingArr[i]
        }
      }
    })
  }
  /*评论回复*/
  replyHtml(ID) {
    let objTarget = document.getElementById('new-comment_' + ID)
    let ParentId = ID;
    let ParentUserName = objTarget.getElementsByClassName('new-uname')[0].getElementsByTagName('span')[0].innerHTML
    let html = ''
    html += '   <form method="post">'
    html += '   <textarea class="new-glMsg" id="new-replyContent" name="replyContent" placeholder="回复 ' + ParentUserName +
      '："></textarea>'
    html += '   <p class="new-user-info">'
    html +=
      '       <span class="new-glName-wrap">网友<input type="text" id="new-userName" name="UserName" class="new-glName" maxlength="10" value="速推网友"></span>'
    html += '       <span class="fr"><i><em id="new-wordCount_' + ID + '">0</em>/' + defaultData.ContentMaxLength +
      '</i><input type="button" class="new-glRep-btn" value="提交评论"></span>'
    html += '   </p>'
    html += '   </form>'
    //插入元素
    let nowGlbox = objTarget.getElementsByClassName('new-glbox')
    let glbox = document.getElementsByClassName('new-glbox')
    if (nowGlbox.length > 0) {
      for (let i = 0; i < glbox.length; i++) {
        glbox[i].parentNode.removeChild(glbox[i])
      }
    } else {
      for (let i = 0; i < glbox.length; i++) {
        glbox[i].parentNode.removeChild(glbox[i])
      }
      let box = document.createElement('div')
      box.classList.add('new-glbox')
      box.setAttribute('id', 'new-replyDiv_' + ID)
      box.innerHTML = html
      objTarget.appendChild(box)
    }
    //隐藏底部评论框
    css(document.getElementById('new-cmtForm').getElementsByTagName('fieldset')[0], {
      display: 'none'
    })
    css(document.getElementById('new-comment-form').getElementsByClassName('fb')[0], {
      display: 'block'
    })
    //回复 点击事件
    let replyBtn = document.getElementsByClassName('new-glRep-btn')
    for (let i = 0; i < replyBtn.length; i++) {
      replyBtn[i].onclick = () => {
        let objData = {
          ParentId: ParentId,
          UserName: document.getElementById('new-userName').value,
          Content: document.getElementById('new-replyContent'),
        }
        this.replyComment(objData)
      }
    }
  }
  /*回复评论*/
  replyComment(options) {
    defaultData.ParentId = options.ParentId;
    defaultData.UserName = options.UserName;
    defaultData.Content = options.Content;
    this.writeComment();
  }
  /* 写入评论 */
  writeComment() {
    var that = this
    if (defaultData.Content.value === '' || defaultData.Content.value === '我来说两句...') {
      MIPCommon.cAlert('请输入评论内容！');
      defaultData.Content.focus();
      return false;
    } else if (defaultData.Content.value.length < defaultData.ContentMinLength) {
      MIPCommon.cAlert('您输入的评论太短：少于' + defaultData.ContentMinLength + '个字，请重新输入');
      defaultData.Content.focus();
      return false;
    } else if (defaultData.Content.value.length > defaultData.ContentMaxLength) {
      MIPCommon.cAlert('您输入的评论过长：最多' + defaultData.ContentMaxLength + '个字，请重新输入');
      defaultData.Content.focus();
      return false;
    } else if (defaultData.UserName.length > defaultData.UserNameMaxLength) {
      MIPCommon.cAlert('您输入的网友名过长：最多' + defaultData.UserNameMaxLength + '个字，请重新输入');
      defaultData.Content.focus();
      return false;
    }
    fetch(defaultData.Url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      body: "Action=" + defaultData.Action.write + "&ParentId=" + ParentId + "&ResourceId=" + defaultData.ResourceId +
        "&CommentType=" + defaultData.CommentType + "&UserName=" + defaultData.UserName + "&Content=" + defaultData.Content
    }).then((responseText) => {
      return responseText.text()
    }).then((responseRes) => {
      let dataObj = jsonParse(responseRes)
      if (parseInt(dataObj.status, 10) === 1) {
        MIPCommon.cAlert('评论成功提交，需要经过审核才能显示！');
        document.getElementById('new-cmtMsg').value = ''
        //隐藏底部评论框
        css(document.getElementById('new-cmtForm').getElementsByTagName('fieldset')[0], {
          display: 'none'
        })
        css(document.getElementById('new-comment-form').getElementsByClassName('fb')[0], {
          display: 'block'
        })
      } else {
        MIPCommon.cAlert(dataObj.msg);
      }
      if ((dataObj.status < 0 || parseInt(dataObj.status, 10) === 1) && defaultData.ParentId > 0) {
        let node = document.getElementById('new-replyDiv_' + defaultData.ParentId)
        node.parentNode.removeChild(node)
      }
    })
  }
}
