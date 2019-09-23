import './index.less'

export default class MIPMbbsCehome extends MIP.CustomElement {
  build () {
    let _this = this

    let clientWidth = document.body.clientWidth
    document.documentElement.style.fontSize = (100 * (clientWidth / 750)) + 'px'

    const env_pro = location.href.indexOf('m.cehome.com') !== -1
    const bbsUrl = env_pro ? 'https://bbs.cehome.com/' : 'http://wbs.cehome.com/'
    const webRoot = env_pro ? 'https://m.cehome.com/bbs/' : 'https://mtest.cehome.com/bbs/'
    const staticPath = env_pro ? 'https://upbbsimg.cehome.com/mbbs-node-static/' : 'https://mtest.cehome.com/bbs/mbbs-node-static/'

    console.log('staticPath', staticPath)
    //返回顶部
    _this.element.querySelector('.goTop').addEventListener('click', function () {
      window.scrollTo(0, 0)
    })
    // 发帖按钮
    _this.element.querySelector('.postBtn').addEventListener('click', function () {
      let uid = getCookie('bbs_uid')
      console.log('uid', uid)
      if (!uid) {
        location.href = bbsUrl + 'mLogin/login.html?gotoUrl=' + decodeURIComponent(location.href)
        return
      }
      location.href = webRoot + 'thread/post'
    }, false)
    // 点击头部搜索
    _this.element.querySelector('.searchBox').addEventListener('click', function () {
      location.href = webRoot + 'search'
    }, false);
    // 点击表情
    _this.element.querySelector('.smile').addEventListener('click', function () {
      let ele = _this.element.querySelector('.smileList')
      if (ele.querySelector('li').length) {
        let smDis = _this.element.querySelector('#smiles').style.display
        if(smDis == 'none') {
          smDis = 'block'
        } else {
          smDis = 'none'
        }
      } else {
        fetch(webRoot + 'thread/smiley', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(function (res) {
          return res.json()
        }).then(function (data) {
          if (data.ret != 0) {
            showTip(data.msg)
            return
          }
          let shtml = ''
          let smiley = data.items
          for (let i = 0; i < smiley.length; i++) {
            if (smiley[i].img.indexOf('new') !== -1) {
              shtml += '<li data-code="' + smiley[i].code + '"><img src="' + staticPath + smiley[i].img + '" /></li>'
            }
          }
          _this.element.querySelector('.smileList').innerHTML = shtml
          _this.element.querySelector('#smiles').style.display = 'block'
          _this.element.querySelector('.smileList').querySelector('li').onclick=function () {
            let val = _this.element.querySelector('#message').val() + this.dataset['code']
            _this.element.querySelector('#message').value = val
          }
        })
      }
    })
    // 点击回复
    _this.element.querySelector('.replyBtn').addEventListener('click', function () {
      let bbs_uid = getCookie('bbs_uid')
      if (bbs_uid) {
        _this.element.querySelector('.replyMask').style.display = 'block'
      } else {
        location.href = bbsUrl + 'mLogin/login.html?gotoUrl=' + decodeURIComponent(location.href)
      }
    })
    // 点击回复框空白处
    _this.element.querySelector('.maskView').addEventListener('click', function () {
      _this.element.querySelector('.replyMask').style.display = 'none'
    })

    // 发布回帖
    _this.element.querySelector('#postReply').addEventListener('click', function () {
      if (this.classList.contains('disabled')) {
        return
      }
      this.classList.add('disabled')
      let tid = this.dataset['tid']

      let message = _this.element.querySelector('#message').value
      let tuid = _this.element.querySelector('.thread .username').dataset['tuid']
      fetch(webRoot + 'thread/reply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: {tid: tid, message: message, tuid: tuid}
      }).then(function (res) {
        return res.json()
      }).then(function (data) {
        _this.element.querySelector('#postReply').classList.remove('disabled')
        if (data.ret != 0) {
          showTip(data.msg)
          return
        }
        showTip('发表成功，即将为您刷新页面')
        setTimeout(function () {
          location.href = location.href
        }, 2000)
      })
    })
    // 根据标签获取推荐内容
    let tags = ''
    let tagEle = _this.element.querySelectorAll('.tagSingle')
    if (tagEle.length) {
      let tagArr = []
      for (let i = 0; i < tagEle.length; i++) {
        tagArr.push(tagEle[i].dataset['tagid'])
      }
      tags = tagArr.join(',')
    }

    // 获取主贴相关及回帖
    let tid = getTidByUrl()
    fetch(webRoot+'thread/info/'+tid, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: {tags: tags}
    }).then(function (res) {
      return res.json()
    }).then(function (datas) {
      if (datas.ret != 0) {
        return
      }
      let data = datas.items
      if (data && data.topicCount) {
        _this.element.querySelector('#viewCount').innerHTML = data.topicCount.views
        if (data.topicCount.viewsList && data.topicCount.viewsList.length) {
          let viewsList = data.topicCount.viewsList.slice(0, 12)
          let vlHtml = avatar_func(viewsList)
          _this.element.querySelector('.viewsList').innerHTML = vlHtml
        }
      }
      if (data && data.praiseList) {
        let prHtml = '', praiseList = data.praiseList
        if (praiseList.length == 0) {
          prHtml = '壮士且慢，赞完再走！'
        } else if (praiseList.length < 10) {
          prHtml = avatar_func(praiseList)
        } else {
          praiseList = praiseList.slice(0, 7)
          prHtml = avatar_func(praiseList)
          prHtml += '<p class="praiseMore"></p>'
        }
        _this.element.querySelector('.praiseAvatars').innerHTML = prHtml
      }
      if (data.isPraise && data.isPraise[0] && data.isPraise[0].isPraise != '0') {
        _this.element.querySelector('.praiseIcon').classList.add('act').innerHTML = data.topicCount.praise
      }
      _this.element.querySelector('.userImg mip-i-space').style.display = 'none'
    })

    // 获取热帖推荐
    fetch(webRoot+'thread/recommend/'+tags, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function (res) {
      return res.json()
    }).then(function (data) {
      if (data.ret != 0) {
        return
      }
      let html = ''
      let recommend = data.data && data.data.hot
      if (recommend.length) {
        for (let i = 0; i < recommend.length; i++) {
          let imgUrl = recommend[i].images.length ? recommend[i].images[0].img : ''
          let imgHtml

          imgHtml = '<mip-img class="img contentImg" src="' + imgUrl + '"></mip-img>'
          let tmpTagHtml = ''
          let tags = recommend[i].tag
          if (tags && tags.length) {
            tmpTagHtml += '<ol class="tagBox clearfix">'
            for (let j = 0; j < tags.length; j++) {
              tmpTagHtml += '<li class="tagSingle">' +
                '<a href="' + webRoot + 'tags/recommend/' + tags[j].id + '/1" title="' + tags[j].name + '">' + tags[j].name + '</a>' +
                '</li>'
            }
            tmpTagHtml += '</ol>'
          }

          html += '<li><a href="' + webRoot + 'thread/info/' + recommend[i].tid + '" title="' + recommend[i].title + '">' +
            imgHtml +
            '</a><div class="infoBox">' +
            '<div class="title"><a href="' + webRoot + 'thread/info/' + recommend[i].tid + '" title="' + recommend[i].title + '">' + recommend[i].title + '</a></div>' +
            '<div class="param">' +
            tmpTagHtml +
            '<span class="views">' + recommend[i].views + '</span>' +
            '<span class="replies">' + recommend[i].replies + '</span>' +
            '<em class="time">' + recommend[i].datelineStr + '</em>' +
            '</div>' +
            '</div>' +
            '</li>'
        }
        _this.element.querySelector('.recm .recommendList').innerHTML = html
        _this.element.querySelector('.recommendBox.recm').style.display = 'block'
      }
    })
    // 获取近期的帖子作为可能感兴趣的帖子
    fetch(webRoot + 'mip/thread/recent', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(function (res) {
      return res.json()
    }).then(function (data) {
      if (data.ret != 0) {
        return
      }
      var html = ''
      var recommend = data.data
      if (recommend.length) {
        for (var i = 0; i < recommend.length; i++) {
          var imgUrl = recommend[i].img.length ? recommend[i].img[0].img : ''
          var imgHtml
          imgHtml = '<mip-img class="img contentImg" src="' + imgUrl + '"></mip-img>'
          var tmpTagHtml = '<ol class="tagBox clearfix">'
          var tags = recommend[i].tag
          if (tags && tags.length) {
            for (var j = 0; j < tags.length; j++) {
              tmpTagHtml += '<li class="tagSingle">' +
                '<a href="' + webRoot + 'tags/recommend/' + tags[j].id + '/1" title="' + tags[j].name + '">' + tags[j].name + '</a>' +
                '</li>'
            }
          }
          tmpTagHtml += '</ol>'

          html += '<li><a href="' + webRoot + 'thread/info/' + recommend[i].tid + '" title="' + recommend[i].subject + '">' +
            imgHtml +
            '</a><div class="infoBox">' +
            '<div class="title"><a href="' + webRoot + 'thread/info/' + recommend[i].tid + '" title="' + recommend[i].subject + '">' + recommend[i].subject + '</a></div>' +
            '<div class="param">' +
            tmpTagHtml +
            '<span class="views">' + recommend[i].views + '</span>' +
            '<span class="replies">' + recommend[i].replies + '</span>' +
            '<em class="time">' + recommend[i].datelineStr + '</em>' +
            '</div>' +
            '</div>' +
            '</li>'
        }
        _this.element.querySelector('.like .recommendList').innerHTML = html
        _this.element.querySelector('.recommendBox.like').style.display = 'block'
      }
    })
    // 文章末尾点赞
    _this.element.querySelector('.praiseIcon').addEventListener('click', function () {
      if (this.classList.contains('disabled')) {
        return
      }
      this.classList.add('disabled')
      let bbs_uid = getCookie('bbs_uid')
      if (!bbs_uid) {
        location.href = bbsUrl + 'mLogin/login.html?gotoUrl=' + decodeURIComponent(location.href)
        this.classList.remove('disabled')
        return
      }
      let tid = getTidByUrl()
      if (!tid) {
        showTip('点赞失败，请重试')
        this.classList.remove('disabled')
        return
      }
      let data = {tid: tid}
      if (this.classList.contains('act')) {
        data.cancel = 1
      }
      praiseFn(this, data, praiseListFn)
    })
    // 点赞
    _this.element.querySelector('.postLists .pbtn.zan').addEventListener('click', function () {
      let bbs_uid = getCookie('bbs_uid')
      if (!bbs_uid) {
        location.href = bbsUrl + 'mLogin/login.html?gotoUrl=' + decodeURIComponent(location.href)
      } else {
        let tid = this.dataset['tid']
        let pid = this.dataset['pid']
        let cancel
        if (this.classList.contains('act')) {
          cancel = 1
        } else {
          cancel = 0
        }
        if (!tid || !pid) {
          showTip('点赞失败，请重试')
          return
        }
        let data = {
          tid: tid,
          pid: pid,
          cancel: cancel
        }
        praiseFn(_this, data)
      }
    })
    // 滚动翻页
    let allowAjax = true
    let page = 2
    // 点击排序
    _this.element.querySelector('.post .sort>span').addEventListener('click', function () {
      page = 1
      allowAjax = true
      let order = this.dataset['order']
      if (this.classList.contains('act')) {
        if (order == 'praise') {
          return
        }
        if(this.classList.contains('asc')) {
          this.classList.remove('asc')
        } else {
          this.classList.add('asc')
        }
      } else {
        _this.element.querySelector('.post .sort>span').classList.remove('act');
        this.classList.add('act')
      }
      let sort = this.classList.contains('asc') ? 'asc' : 'desc'
      getData(order, true, sort)
    })
    // 点击加载更多
    _this.element.querySelector('.loadMore').addEventListener('click', function () {
      let order = _this.element.querySelector('.post .sort .act').dataset['order']
      getData(order)
    })
    _this.element.querySelector('.postBtn').addEventListener('click', function () {
      let uid = getCookie('bbs_uid')
      if (!uid) {
        location.href = bbsUrl + 'mLogin/login.html?gotoUrl=' + decodeURIComponent(location.href)
        return
      }
      location.href = webRoot + 'thread/post'
    })
    // 获取感兴趣的人
    let now = new Date().getTime()
    let locCookie = JSON.parse(getCookie('bbsUserLocations'))
    if (locCookie && locCookie.lat && locCookie.lng) {
      fetch(webRoot + 'thread/nearby?lng='+locCookie.lng+'&lat='+locCookie.lat, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(function (res) {
        return res.json()
      }).then(function (data) {
        if (data.ret == 0) {
          if (data.data.length > 2) {
            renderNearby(data.data)
            _this.element.querySelector('.mayLikeList li .close').addEventListener('click', function () {
              let liP = this.parentNode.parentNode
              let idx = getIndex(liP)
              let ele = _this.element.querySelectorAll('.mayLikeList li')
              let allId = []
              for (let i = 0; i < ele.length; i++) {
                allId.push(ele[i].dataset['uid'])
              }
              let closeUid = liP.dataset['uid']
              let index = allId.indexOf(closeUid)
              if (index > -1) {
                allId.splice(index, 1)
              }
              let listUid = allId.join(',')
              fetch(webRoot + 'thread/nearby?lng='+locCookie.lng+'&lat='+locCookie.lat+'&closeUid='+closeUid+'&listUid='+listUid, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json'
                }
              }).then(function (res) {
                return res.json()
              }).then(function (data) {
                if (data && data.ret == 0) {
                  let data = data.data[0]
                  let html = ''
                  if (data) {
                    let distance = formatDistance(data.distance)
                    html = '<li data-uid="' + data.uid + '">' +
                      '<div class="mayLikeSingle">' +
                      '<em class="close"></em>' +
                      '<div class="avatar">' +
                      '<img class="userImg ' + (data.davName ? 'dav' : '') + '" src="' + data.avatar + '" onerror="this.src=\'' + staticPath + 'img/defaultUser.png\'"/>' +
                      (data.davName ? '<img class="davIcon" src="' + staticPath + 'img/v38.png"/>' : '') +
                      '</div>' +
                      '<p class="username">' + data.username + '</p>' +
                      '<p class="desc">附近甲友（' + distance + '）</p>' +
                      '<div class="favor" data-uid="' + data.uid + '"><span>关注</span></div>' +
                      '</div>' +
                      '</li>'
                  }
                  if (ele.length > 1) {
                    liP.outerHTML = html
                  } else {
                    _this.element.querySelector('.mayLike').style.display = 'none';
                  }
                }
              })
            })
          }
        }
      })
      _this.element.querySelector('.mayLikeList li .favor').addEventListener('click', function () {
        let _th = this
        let mask = _this.element.querySelector('.favorMask')
        mask.style.display = 'block'
        let uid = this.dataset['uid']
        let bbs_uid = getCookie('bbs_uid')
        if (!bbs_uid) {
          location.href = bbsUrl + 'mLogin/login.html?gotoUrl=' + decodeURIComponent(location.href)
          return
        }
        let type = this.classList.contains('attented') ? 'del' : 'add'
        fetch(webRoot + 'thread/userFollow?bUid='+uid+'&type='+type, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(function (res) {
          return res.json()
        }).then(function (data) {
          if (data.ret != 0) {
            showTip(data.msg)
            mask.style.display = 'none'
            return
          }
          if (type == 'add') {
            _th.classList.add('attented').textNode = '已关注'
          } else {
            _th.classList.remove('attented').innerHTML = '<span>关注</span>'
          }
          showTip('操作成功')
          mask.style.display = 'none'
        })
      })
    }
    _this.element.querySelector('.weixinMask').addEventListener('click', function () {
      _this.element.querySelector('.weixinMask').style.display = 'none'
    })

    // 展示提示框
    let sto
    function showTip (msg) {
      let ele = _this.element.querySelector('#tip')
      if (ele.style.display == 'none') {
        ele.innerHTML = msg
        ele.style.display = 'blcok'
        sto = setTimeout(function () {
          ele.style.display = 'none'
        }, 2000)
      } else {
        clearTimeout(sto)
        sto = setTimeout(function () {
          ele.style.display = 'none'
        }, 2000)
      }
    }
    // 获取cookie
    function getCookie (name) {
      let arr
      let reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
      return (arr = document.cookie.match(reg)) ? unescape(arr[2]) : null
    }
    // 获取tid
    function getTidByUrl () {
      let url = location.href
      let lastIndex = location.href.lastIndexOf('/')
      let tid = url.substring(lastIndex + 1)
      return tid
    }
    // 处理头像
    function avatar_func (data) {
      let html = ''
      for (let i = 0; i < data.length; i++) {
        html += '<mip-img class="userImg" src="' + data[i].avatar + '"></mip-img>'
      }
      return html
    }
    // 点赞逻辑
    function praiseFn (_this, data, cb) {
      fetch(webRoot + 'thread/praise?fresh=' + Math.random(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: data
      }).then(function (res) {
        return res.json()
      }).then(function (dd) {
        if (dd.ret != 0) {
          showTip(dd.msg)
          _this.removeClass('disabled')
          return
        }
        let toastMsg
        if (data.cancel > 0) {
          let znum = parseInt(_this.textContent) - 1
          _this.classList.remove('act').textContent = znum
          toastMsg = '取消点赞成功'
        } else {
          let znum = parseInt(_this.textContent || 0) + 1
          _this.classList.add('act').textContent = znum
          toastMsg = '点赞成功'
        }
        showTip(toastMsg)
        cb && cb(_this, {tid: data.tid})
      })
    }
    // 点赞列表
    function praiseListFn (_this, data) {
      fetch(webRoot + 'thread/praiseList?r=' + new Date().getTime(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: data
      }).then(function (res) {
        return res.json()
      }).then(function (dd) {
        let html = ''
        if (!dd.length) {
          html = '壮士且慢，赞完再走！'
        } else {
          for (let i = 0; i < dd.length; i++) {
            html += '<mip-img class="userImg" src="' + dd[i].avatar + '"></mip-img>'
          }
        }
        _this.element.querySelector('.praiseAvators').innerHTML = html
        _this.classList.remove('disabled')
      })
    }
    // 获取回帖列表
    function getData (order, empty, sort) {
      if (!allowAjax) {
        return
      }
      allowAjax = false
      let url
      if (order) {
        url = location.href + '/' + page + '?order=' + order
      } else {
        url = location.href + '/' + page
      }
      sort = sort == 'asc' ? 'asc' : 'desc'
      if (sort == 'asc') {
        url += (url.indexOf('?') === -1 ? '?' : '&') + 'sort=' + sort
      }
      fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(function (res) {
        return res.json()
      }).then(function (data) {
        if (data.ret != 0) {
          allowAjax = true
          return
        }
        let html = ''
        for (let i = 0; i < data.data.length; i++) {
          let imgHtml = ''
          let imgs = data.data[i].img
          for (let j = 0; j < imgs.length; j++) {
            imgHtml += '<div class="img"><mip-img popup src="' + imgs[j].img.replace(/img3.cehome.com/, 'upbbsimg.cehome.com') + '"></mip-img></div>'
          }
          let videoHtml = ''
          let videos = data.data[i].video
          for (let j = 0; j < videos.length; j++) {
            videoHtml += '<div class="img"><mip-video src="' + videos[j].url + '" poster="' + videos[j].img + '" controls playsinline webkit-playsinline  x5-playsinline x-webkit-airplay="allow"></mip-video></div>'
          }
          let cHtml = ''
          let clist = data.data[i].commentList
          if (clist.length) {
            cHtml += '<div class="commentList">'
            for (let j = 0; j < clist.length; j++) {
              cHtml += '<div class="commentSingle">' +
                '<span class="cname">' + clist[j].username + '</span>' +
                (clist[j].toUsername ? ' 回复 <span class="cname">' + clist[j].toUsername + '</span>' : '') +
                '：' + clist[j].content +
                '</div>'
            }
            cHtml += '</div>'
          }

          let avatarHtml = '<mip-img class="userImg" src="' + data.data[i].avatar + '"></mip-img>'

          html += '<div class="postSingle">' +
            '<a href="' + webRoot + 'user/other/' + data.data[i].aesUid + '"><div class="user">' +
            // '<div class="user">' +
            '<div class="avatar">' +
            avatarHtml +
            '</div>' +
            '<div class="username">' + data.data[i].username + '</div>' +
            '</div></a>' +
            '<div class="postContent">' +
            '<p class="msg">' + data.data[i].message + '</p>' +
            imgHtml +
            videoHtml +
            cHtml +
            '<div class="extra">' +
            '<p class="ptime">' + data.data[i].datelineStr + '</p>' +
            '<div class="btns">' +
            '<p class="pbtn zan ' + (data.data[i].isPraise == '0' ? '' : 'act') + '" data-tid="' + data.data[i].tid + '" data-pid="' + data.data[i].pid + '">' + data.data[i].praise + '</p>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>'
        }
        if (empty) {
          _this.element.querySelector('.postLists').innerHTML = html
        } else {
          _this.element.querySelector('.postLists').appendChild(html)
        }

        if (data.data.length) {
          page++
          allowAjax = true
        } else {
          _this.element.querySelector('.loadMore').style.display = 'none'
          _this.element.querySelector('.loadedAll').style.display = 'block'
        }
      })
    }
    // 附近的人
    function renderNearby (list) {
      let html = ''
      for (let i = 0; i < list.length; i++) {
        let distance = formatDistance(list[i].distance)
        let avatarHtml = '<mip-img class="userImg ' + (list[i].davName ? 'dav' : '') + '" src="' + list[i].avatar + '"></mip-img>'
        html += '<li data-uid="' + list[i].uid + '">' +
          '<div class="mayLikeSingle">' +
          '<em class="close"></em>' +
          '<div class="avatar">' +
          avatarHtml +
          (list[i].davName ? '<img class="davIcon" src="' + staticPath + 'img/v38.png"/>' : '') +
          '</div>' +
          '<p class="username">' + list[i].username + '</p>' +
          '<p class="desc">附近甲友（' + distance + '）</p>' +
          '<div class="favor" data-uid="' + list[i].uid + '"><span>关注</span></div>' +
          '</div>' +
          '</li>'
      }
      _this.element.querySelector('.mayLikeList').innerHTML = html
      _this.element.querySelector('.mayLike').style.display = 'block'
    }
    // 格式化距离
    function formatDistance (length) {
      if (length > 100000) {
        return parseInt(length / 1000000) + 'km'
      } else if (length > 1000) {
        return parseFloat(length / 1000).toFixed(2) + 'km'
      } else {
        return length + 'm'
      }
    }
    function getIndex(ele) {
      let index = [].indexOf.call(ele.parentNode.querySelectorAll(ele.tagName), ele)
      return index
    }
    function isWeiXin () {
      var ua = window.navigator.userAgent.toLowerCase()
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true
      } else {
        return false
      }
    }
    //
    // Array.prototype.remove = function (val) {
    //   var index = this.indexOf(val)
    //   if (index > -1) {
    //     this.splice(index, 1)
    //   }
    // }
    //
    // var locCookie

    //
    // var linkUrl = ''

    // if (isWeiXin()) {
    //   // $('.shareBtn').css({'display': 'inline-block'});
    //   // 微信分享
    //   var fetchJsonp = require('fetch-jsonp');
    //   fetchJsonp('https://bbs.cehome.com/apiM.php?mod=mGetSignature&url=' + encodeURIComponent(location.href), {
    //     jsonpCallback: 'cb'
    //   }).then(function (res) {
    //     return res.json();
    //   }).then(function (data) {
    //     console.log(data);
    //   });
    //   $.ajax({
    //     type: 'get',
    //     dataType: 'jsonp',
    //     url: 'https://bbs.cehome.com/apiM.php?mod=mGetSignature&url=' + encodeURIComponent(location.href),
    //     async: true,
    //     success: function (res) {
    //       if (res.ret == 0) {
    //         var appId = res.items.appId
    //         var timestamp = res.items.timestamp
    //         var nonceStr = res.items.nonceStr
    //         var signature = res.items.signature
    //         wx.config({
    //           appId: appId,
    //           timestamp: timestamp,
    //           nonceStr: nonceStr,
    //           signature: signature,
    //           jsApiList: [
    //             'onMenuShareTimeline',
    //             'onMenuShareAppMessage',
    //             'hideMenuItems'
    //           ]
    //         })
    //         wx.ready(function () {
    //           wx.hideMenuItems({'menuList': [
    //               'menuItem:share:email',
    //               'menuItem:share:qq',
    //               'menuItem:share:weiboApp',
    //               'menuItem:share:QZone',
    //               'menuItem:favorite'
    //             ]})
    //
    //           // 分享给朋友
    //           var shareData = {
    //             title: shareConfig.title,
    //             desc: shareConfig.desc,
    //             link: shareConfig.url,
    //             imgUrl: shareConfig.image,
    //             success: function () {
    //               // var bbs_uid = getCookie('bbs_uid');
    //               // if(bbs_uid) {
    //               //     $.ajax({
    //               //
    //               //     });
    //               // }
    //             }
    //           }
    //           wx.onMenuShareTimeline(shareData)
    //           wx.onMenuShareAppMessage(shareData)
    //         })
    //       }
    //     }
    //   })
    // }

    //
    // $('.userImg img').bind('error', function () {
    //   $(this).attr('src', staticPath + 'img/defaultUser.png')
    //   $(this).siblings('mip-i-space').remove()
    // })
    // $('.contentImg img').bind('error', function () {
    //   $(this).attr('src', staticPath + 'img/defaultImg.png')
    //   $(this).siblings('mip-i-space').remove()
    // })
    //
    //
    // // 引导app打开
    // linkedme.init('37f2f6067e34f5b8759497bb13b586da', null, null)
    // var tid = location.href.match(/info\/(\d+)/)[1]
    // if (tid) {
    //   var data = {}
    //   data.params = '{"linkType":"thread","tid":"' + tid + '"}'
    //   linkedme.link(data, function (err, response) {
    //     if (err) {
    //       console.log('error', err)
    //     } else {
    //       linkUrl = response.url
    //       $('.appDown').on('click', function () {
    //         if (isWeiXin()) {
    //           $('.weixinMask').show()
    //           $('.shareWord').show()
    //         } else {
    //           location.href = linkUrl
    //         }
    //       })
    //       $('.postLists').on('click', '.downApp', function () {
    //         if (isWeiXin()) {
    //           $('.weixinMask').show()
    //           $('.shareWord').show()
    //         } else {
    //           location.href = linkUrl
    //         }
    //       })
    //       $('.appBtn').on('click', function () {
    //         if (isWeiXin()) {
    //           $('.weixinMask').show()
    //           $('.shareWord').show()
    //         } else {
    //           location.href = linkUrl
    //         }
    //       })
    //     }
    //   }, false)
    // }
  }
}
