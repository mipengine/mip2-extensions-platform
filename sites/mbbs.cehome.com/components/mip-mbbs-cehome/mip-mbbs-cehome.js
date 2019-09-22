/**
 * @file mip-mbbs-cehome-info 组件
 * @guo_andy
 */

define(function (require) {
  'use strict';

  var $ = require('jquery');
  var customElement = require('customElement').create();

  // TODO
  !function () {
    var docEl = document.documentElement,
      resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
      recalc = function () {
        var clientWidth = document.body.clientWidth;
        if (!clientWidth) return;
        // docEl.style.fontSize = (100*(clientWidth/750)) + 'px';
        docEl.style.fontSize = (100*(clientWidth/750)) + 'px';
      };
    if (!document.addEventListener) return;
    window.addEventListener(resizeEvt, recalc, false);
    document.addEventListener('DOMContentLoaded', recalc, false);
  }();

  (function(para) {
    var p = para.sdk_url, n = para.name, w = window, d = document, s = 'script', x = null, y = null;
    w['sensorsDataAnalytic201505'] = n;
    w[n] = w[n] || function(a) {
      return function() {
        (w[n]._q = w[n]._q || []).push([ a, arguments ]);
      }
    };

    var ifs = ['track','quick','register','registerPage','registerOnce',
      'clearAllRegister','trackSignup', 'trackAbtest', 'setProfile',
      'setOnceProfile','appendProfile', 'incrementProfile',
      'deleteProfile', 'unsetProfile', 'identify','login','logout',
      'trackLink','clearAllRegister','getAppStatus'];
    for (var i = 0; i < ifs.length; i++) {
      w[n][ifs[i]] = w[n].call(null, ifs[i]);
    }
    if (!w[n]._t) {
      x = d.createElement(s), y = d.getElementsByTagName(s)[0];
      x.async = 1;
      x.src = p;
      y.parentNode.insertBefore(x, y);
      w[n].para = para;
    }
  })({
    sdk_url : 'https://static.sensorsdata.cn/sdk/1.8.1.5/sensorsdata.min.js',
    name: 'sa',
    server_url:'https://shenceapi.tiebaobei.com/sa?project=cehome',
    heatmap: {
      clickmap:'default',
      scroll_notice_map:'not_collect'
    }
  });


  if(isWeiXin()){
    sa.registerPage({
      version_number : "1.0",
      client : "微信",
      back_url: document.referrer
    });
    sa.quick('autoTrack');
  }else{
    sa.registerPage({
      version_number : "1.0",
      client : "M站",
      back_url: document.referrer
    });
    sa.quick('autoTrack');
  }

  function saEvent(eid, pageName, btnName) {
    var bbs_uid = getCookie('bbs_uid');
    var saData = JSON.parse(getCookie('sensorsdata2015jssdkcross'));
    var distinctId = bbs_uid ? bbs_uid : saData ? saData['distinct_id'] : sa.store.getDistinctId();

    sa.track(eid, {
      'page_name' : pageName,
      'button_name' : btnName,
      'page_url' : location.href
    });
  }
  function getQueryString(e) {
    var url = location.search;
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
      var str = url.substr(1);
      var strs = str.split("&");
      for (var i = 0; i < strs.length; i++) {
        theRequest[strs[i].split("=")[0]] = strs[i].split("=")[1]
      }
    }
    return theRequest[e] == undefined ? '' : theRequest[e];
  }
  function setCookie(name,value) {
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + Days*24*60*60*1000);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
  }
  function getCookie(name) {
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    return (arr=document.cookie.match(reg))?unescape(arr[2]):null;
  }
  function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    if(cval!=null)
      document.cookie= name + "="+cval+";expires="+exp.toGMTString();
  }
  function forbidScroll(){
    var bodyTop = $(window).scrollTop();
    $('body').css({
      'overflow': 'hidden',
      'position': 'fixed',
      'top': bodyTop * -1
    });
  }
  function canScroll(){
    var bodyTop = Math.abs( parseInt( $("body").css("top") ) );
    $('body').css({
      'overflow': 'auto',
      'position': 'static',
      'top' : 'auto'
    });
    $(window).scrollTop(bodyTop);
  }
  function isWeiXin() {
    var ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      return true;
    } else {
      return false;
    }
  }
  function nofind(type){
    var img=event.srcElement;
    if(type=='avatar') {
      img.src = "https://upbbsimg.cehome.com/mbbs-node-static/img/defaultUser.png";
    } else if(type=='img') {
      img.src = "https://upbbsimg.cehome.com/mbbs-node-static/img/defaultImg.png";
    }
    img.onerror=null; //控制不要一直跳动
  }
  var sto;
  function showTip(msg) {
    if($('#tip').css('display') == 'none') {
      $('#tip').text(msg).show();
      sto = setTimeout(function () {
        $('#tip').hide()
      }, 2000);
    } else {
      clearTimeout(sto);
      sto = setTimeout(function () {
        $('#tip').hide()
      }, 2000);
    }
  }
  // 全站统一的百度统计代码
  var _hmt = _hmt || [];
  (function() {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?66bbebbce89a2e2e3f366f111541506a";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
  })();

  Array.prototype.remove = function(val) {
    var index = this.indexOf(val);
    if (index > -1) {
      this.splice(index, 1);
    }
  };

  // 记录访问历史，便于页面回退
  var historyLinks = JSON.parse(localStorage.getItem('mbbsHistroyLinks')) ? JSON.parse(localStorage.getItem('mbbsHistroyLinks')) : [];
  var blackLinks = ['tags/dealer', 'tags/param', 'tags/picture', 'tags/price'];

  if(historyLinks.length) {
    for(var j=0; j<blackLinks.length; j++) {
      if(historyLinks[historyLinks.length-1].indexOf(blackLinks[j]) !== -1) {
        // 去除不记入历史的页面
        historyLinks.splice(-1, 1);
      }
    }
  }

  if(location.pathname == '/' || location.pathname == '/bbs' || location.pathname == '/bbs/index/') {
    historyLinks = [];
  }
  if(historyLinks.indexOf(location.href) === -1) {
    historyLinks.push(location.href);
  }
  localStorage.setItem('mbbsHistroyLinks', JSON.stringify(historyLinks));

  var locCookie;
  var bbsUrl = location.href.indexOf('m.cehome.com') !== -1 ? 'https://bbs.cehome.com/' : 'http://wbs.cehome.com/';
  $(function () {
    console.log(13321);
    $('.goTop').on('click', function () {
      $(window).scrollTop(0);
    });
    $('.postBtn').on('click', function () {
      var uid = getCookie('bbs_uid');
      if(!uid) {
        location.href = bbsUrl+'mLogin/login.html?gotoUrl='+decodeURIComponent(location.href);
        return;
      }
      location.href = webRoot + 'thread/post';
    });
    var t0=0, t1=0;
    $(window).on('scroll', function () {
      t1 = $(this).scrollTop();
      if(t1>t0 && t1>=0) {
        $('#postBtn').hide();
      } else {
        $('#postBtn').show();
      }
      t0 = t1;
      if(t0 == 0) {
        $('#postBtn').show();
      }
    });

    var linkUrl = '';
    window.addEventListener('message', function(event) {
      if(event.origin == 'http://m.test.tiebaobei.com' || event.origin == 'https://m.tiebaobei.com') {
        var href = event.data.url;
        if(event.data && event.data.action == 'jump') {
          // console.log('href', href);
          saEvent('mbbs_click', 'mbbs详情页', href);
          location.href = href;
        }
      }
    });

    if(isWeiXin()) {
      // $('.shareBtn').css({'display': 'inline-block'});
      //微信分享
      $.ajax({
        type: 'get',
        dataType: 'jsonp',
        url: "https://bbs.cehome.com/apiM.php?mod=mGetSignature&url="+encodeURIComponent(location.href),
        async:true,
        success: function(res) {
          if(res.ret == 0) {
            var appId = res.items.appId;
            var timestamp = res.items.timestamp;
            var nonceStr = res.items.nonceStr;
            var signature = res.items.signature;
            wx.config({
              appId: appId,
              timestamp: timestamp,
              nonceStr: nonceStr,
              signature: signature,
              jsApiList: [
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'hideMenuItems'
              ]
            });
            wx.ready(function () {
              wx.hideMenuItems({"menuList":[
                  "menuItem:share:email",
                  "menuItem:share:qq",
                  "menuItem:share:weiboApp",
                  "menuItem:share:QZone",
                  "menuItem:favorite"
                ]});

              //分享给朋友
              var shareData = {
                title: shareConfig.title,
                desc: shareConfig.desc,
                link: shareConfig.url,
                imgUrl: shareConfig.image,
                success: function() {
                  // var bbs_uid = getCookie('bbs_uid');
                  // if(bbs_uid) {
                  //     $.ajax({
                  //
                  //     });
                  // }
                }
              };
              wx.onMenuShareTimeline(shareData);
              wx.onMenuShareAppMessage(shareData);
            });
          }
        }
      });
    }

    // 点击头部搜索
    $('.searchBox').on('click', function () {
      location.href = webRoot+'search'
    });

    // 点击表情
    $('.replyForm').on('click', '.smile', function () {
      if($('.smileList li').length) {
        $('#smiles').toggle();
      } else {
        $.ajax({
          url: webRoot+'thread/smiley',
          type: 'get',
          data: {},
          dataType: 'json',
          success: function (res) {
            if(res.ret != 0) {
              showTip(res.msg);
              return;
            }
            var shtml = '', smiley = res.items;
            for(var i=0; i<smiley.length; i++) {
              if(smiley[i].img.indexOf('new') !== -1) {
                shtml += '<li data-code="'+smiley[i].code+'"><img src="'+staticPath+smiley[i].img+'" /></li>';
              }
            }
            $('.smileList').append(shtml);
            $('#smiles').show();
          }
        });
      }
    });
    $('.smileList').on('click', 'li', function () {
      var val = $('#message').val() + $(this).data('code');
      $('#message').val(val);
    });
    $(".replyBtn").click(function () {
      saEvent('mbbs_click', 'mbbs详情页', '点击发布评论');
      var bbs_uid = getCookie('bbs_uid');
      if(bbs_uid) {
        $('.replyMask').show();
      } else {
        location.href = bbsUrl+'mLogin/login.html?gotoUrl='+decodeURIComponent(location.href);
      }
    });
    $('.maskView').on('click', function () {
      $('.replyMask').hide();
    });
    // 发布回帖
    $('.replyForm').on('click', '#postReply', function () {
      if($(this).hasClass('disabled')) {
        return;
      }
      $(this).addClass('disabled');
      var tid = $(this).data('tid');
      var message = $('#message').val().trim();
      var tuid = $('.thread .info .username').data('tuid');
      $.ajax({
        url: webRoot+'thread/reply',
        type: 'post',
        data: {tid: tid, message: message, tuid: tuid},
        dataType: 'json',
        success: function (res) {
          $(this).removeClass('disabled')
          if(res.ret != 0) {
            showTip(res.msg);
            return;
          }
          saEvent('mbbs_click', 'mbbs详情页', '发布评论成功');
          showTip('发表成功，即将为您刷新页面');
          setTimeout(function () {
            location.href = location.href;
          }, 2000);
        }
      })
    });
    // 根据标签获取推荐内容
    var tags = '';
    var tagEle = $('.tagSingle');
    if(tagEle.length) {
      var tagArr = [];
      for(var i=0; i<tagEle.length; i++) {
        tagArr.push($(tagEle[i]).data('tagid'));
      }
      tags = tagArr.join(',');
    }
    // 获取主贴相关及回帖
    var tid = getTidByUrl();
    $.ajax({
      url : webRoot+'thread/info/'+tid,
      type : 'post',
      data : {tags : tags},
      success: function (res) {
        console.log(res);
        if(res.ret != 0) {
          return;
        }
        var data = res.items;
        if(data && data.topicCount) {
          $('#viewCount').text(data.topicCount.views);
          if(data.topicCount.viewsList && data.topicCount.viewsList.length) {
            var viewsList = data.topicCount.viewsList.slice(0, 12);
            var vlHtml = avatar_func(viewsList);
            $('.viewsList').html(vlHtml);
          }
        }
        if(data && data.praiseList) {
          var prHtml = '', praiseList = data.praiseList;
          if(praiseList.length == 0) {
            prHtml = '壮士且慢，赞完再走！'
          } else if(praiseList.length < 10) {
            prHtml = avatar_func(praiseList);
          } else {
            praiseList = praiseList.slice(0, 7);
            prHtml = avatar_func(praiseList);
            prHtml += '<p class="praiseMore"></p>';
          }
          $('.praiseAvatars').html(prHtml);
        }
        if(data.isPraise && data.isPraise[0] && data.isPraise[0].isPraise != '0') {
          $('.praiseIcon').addClass('act').text(data.topicCount.praise);
        }
        $('.userImg mip-i-space').remove();
      }
    });


    // 获取热帖推荐
    $.ajax({
      url : webRoot+'thread/recommend/'+tags,
      type : 'get',
      data : {tags : tags},
      success: function (res) {
        if(res.ret != 0) {
          return;
        }
        var html = '';
        var recommend = res.data && res.data.hot;
        if(recommend.length) {
          for(var i=0; i<recommend.length; i++) {
            var imgUrl = recommend[i].images.length ? recommend[i].images[0].img : '';
            var imgHtml;

            imgHtml = '<mip-img class="img contentImg" src="'+imgUrl+'"></mip-img>'
            var tmpTagHtml = '';
            var tags = recommend[i].tag;
            if(tags && tags.length) {
              tmpTagHtml += '<ol class="tagBox clearfix">';
              for(var j=0; j<tags.length; j++) {
                tmpTagHtml += '<li class="tagSingle">' +
                  '<a href="'+webRoot+'tags/recommend/'+tags[j].id+'/1" title="'+tags[j].name+'">'+tags[j].name+'</a>' +
                  '</li>';
              }
              tmpTagHtml += '</ol>';
            }

            html += '<li><a href="'+webRoot+'thread/info/'+recommend[i].tid+'" title="'+recommend[i].title+'">' +
              imgHtml +
              '</a><div class="infoBox">' +
              '<div class="title"><a href="'+webRoot+'thread/info/'+recommend[i].tid+'" title="'+recommend[i].title+'">'+recommend[i].title+'</a></div>' +
              '<div class="param">' +
              tmpTagHtml +
              '<span class="views">'+recommend[i].views+'</span>' +
              '<span class="replies">'+recommend[i].replies+'</span>' +
              '<em class="time">'+recommend[i].datelineStr+'</em>' +
              '</div>' +
              '</div>' +
              '</li>';
          }
          $('.recm .recommendList').html($(html));
          $('.recommendBox.recm').show();
        }
      }
    });

    $.ajax({
      url : webRoot+'mip/thread/recent',
      type : 'get',
      dataType: 'json',
      data : {},
      success: function (res) {
        if(res.ret != 0) {
          return;
        }
        var html = '';
        var recommend = res.data;
        if(recommend.length) {
          for(var i=0; i<recommend.length; i++) {
            var imgUrl = recommend[i].img.length ? recommend[i].img[0].img : '';
            var imgHtml;
            imgHtml = '<mip-img class="img contentImg" src="'+imgUrl+'"></mip-img>'
            var tmpTagHtml = '<ol class="tagBox clearfix">';
            var tags = recommend[i].tag;
            if(tags && tags.length) {
              for(var j=0; j<tags.length; j++) {
                tmpTagHtml += '<li class="tagSingle">' +
                  '<a href="'+webRoot+'tags/recommend/'+tags[j].id+'/1" title="'+tags[j].name+'">'+tags[j].name+'</a>' +
                  '</li>';
              }
            }
            tmpTagHtml += '</ol>';

            html += '<li><a href="'+webRoot+'thread/info/'+recommend[i].tid+'" title="'+recommend[i].subject+'">' +
              imgHtml +
              '</a><div class="infoBox">' +
              '<div class="title"><a href="'+webRoot+'thread/info/'+recommend[i].tid+'" title="'+recommend[i].subject+'">'+recommend[i].subject+'</a></div>' +
              '<div class="param">' +
              tmpTagHtml +
              '<span class="views">'+recommend[i].views+'</span>' +
              '<span class="replies">'+recommend[i].replies+'</span>' +
              '<em class="time">'+recommend[i].datelineStr+'</em>' +
              '</div>' +
              '</div>' +
              '</li>';
          }
          $('.like .recommendList').html($(html));
          $('.recommendBox.like').show();
        }
      }
    });

    // 点击热帖推荐埋点
    $('.recommendList').click("li", function () {
      saEvent('mbbs_click', 'mbbs详情页', '点击热帖推荐');
    })
    // 文章末尾点赞
    $(".praiseList").on("click", ".praiseIcon", function () {
      var _this = $(this);
      if(_this.hasClass("disabled")){
        return;
      }
      _this.addClass("disabled");
      var bbs_uid = getCookie('bbs_uid');
      if(!bbs_uid) {
        location.href = bbsUrl+'mLogin/login.html?gotoUrl='+decodeURIComponent(location.href);
        _this.removeClasses("disabled");
        return;
      }
      var tid = getTidByUrl();
      if(!tid) {
        showTip('点赞失败，请重试');
        _this.removeClasses("disabled");
        return;
      }
      var data = {tid : tid};
      if(_this.hasClass("act")){
        data.cancel = 1;
      }
      praiseFn(_this, data, praiseListFn);
    })

    // 点赞
    $('.postLists').on('click', '.pbtn.zan', function () {
      var _this = $(this);
      var bbs_uid = getCookie('bbs_uid');
      if(!bbs_uid) {
        location.href = bbsUrl+'mLogin/login.html?gotoUrl='+decodeURIComponent(location.href);
        return;
      } else {
        var tid = $(this).data('tid');
        var pid = $(this).data('pid');
        if(_this.hasClass("act")){
          var cancel = 1;
        }else {
          var cancel = 0;
        }
        if(!tid || !pid) {
          showTip('点赞失败，请重试');
          return;
        }
        var data = {
          tid : tid,
          pid : pid,
          cancel : cancel
        }
        praiseFn(_this, data);
      }
    });
    // 滚动翻页
    var allowAjax = true;
    var page = 2;
    // 点击排序
    $('.post').on('click', '.sort>span', function () {
      page = 1;
      allowAjax = true;
      var order = $(this).data('order');
      if($(this).hasClass('act')) {
        if(order == 'praise') {
          saEvent('mbbs_click', 'mbbs详情页', '按热度排序');
          return;
        }
        saEvent('mbbs_click', 'mbbs详情页', '按时间排序');
        $(this).toggleClass('asc');
      } else {
        saEvent('mbbs_click', 'mbbs详情页', '查看全部');
        $(this).addClass('act').siblings().removeClass('act');
      }
      var sort = $(this).hasClass('asc') ? 'asc' : 'desc';
      getData(order, true, sort);
    });

    $(".userImg img").bind('error', function(){
      $(this).attr("src", staticPath+"img/defaultUser.png");
      $(this).siblings('mip-i-space').remove();
    });
    $(".contentImg img").bind('error', function(){
      $(this).attr("src", staticPath+"img/defaultImg.png");
      $(this).siblings('mip-i-space').remove();
    });

    $('.loadMore').on('click', function () {
      var order = $('.post .sort>span.act').data('order');
      getData(order);
    });

    var t0=0, t1=0;
    $(window).on('scroll', function () {
      $('.userImg mip-i-space').remove();
      $('.contentImg mip-i-space').remove();
      // 去app看看滑动消失隐藏
      t1 = $(this).scrollTop();
      if(t1>t0 && t1>=0) {
        $('#appBtn').hide();
      } else {
        $('#appBtn').show();
      }
      t0 = t1;
      if(t0 == 0) {
        $('#appBtn').show();
      }


      var postBtm = $('.postLists').length ? parseInt($('.postLists').offset().top + $('.postLists').height()) : 0;
      var winHeight = $(window).height();
      var scrollTop = $(window).scrollTop();
      var order = $('.post .sort>span.act').data('order');
      if(scrollTop > winHeight*2) {
        $('.goTop').show();
      } else {
        $('.goTop').hide();
      }
    });
    $('.postBtn').on('click', function () {
      var uid = getCookie('bbs_uid');
      if(!uid) {
        location.href = bbsUrl+'mLogin/login.html?gotoUrl='+decodeURIComponent(location.href);
        return;
      }
      location.href = webRoot + 'thread/post';
    });

    // 获取感兴趣的人
    var now = new Date().getTime();
    var locCookie = JSON.parse(getCookie('bbsUserLocations'));
    // alert(JSON.stringify(locCookie))
    if(locCookie && locCookie.lat && locCookie.lng) {
      $.ajax({
        url: webRoot + 'thread/nearby',
        type: 'get',
        data: {lng: locCookie.lng, lat: locCookie.lat},
        dataType: 'json',
        success: function (data) {
          // console.log('nearby', data);
          if(data.ret == 0) {
            if(data.data.length>2) {
              renderNearby(data.data);
            }
          }
        }
      });
      $(document).on('click', '.mayLikeList li .close', function () {
        saEvent('mbbs_click', 'mbbs详情页', '推荐关注--关闭');
        var idx = $(this).parents('li').index();
        var ele = $('.mayLikeList li');
        var allId = [];
        for(var i=0; i<ele.length; i++) {
          allId.push($(ele[i]).data('uid'));
        }
        var closeUid = $(this).parents('li').data('uid');
        allId.remove(closeUid);
        var listUid = allId.join(',');
        $.ajax({
          url: webRoot + 'thread/nearby',
          type: 'get',
          data: {lng: locCookie.lng, lat: locCookie.lat, closeUid: closeUid, listUid: listUid},
          dataType: 'json',
          success: function (res) {
            // console.log('nearby', res);
            if(res && res.ret == 0) {
              var data = res.data[0];
              var html = '';
              if(data) {
                var distance = formatDistance(data.distance);
                var html = '<li data-uid="'+data.uid+'">' +
                  '<div class="mayLikeSingle">' +
                  '<em class="close"></em>' +
                  // '<a class="avatar" href="'+ (webRoot + "user/other/" + list[i].aesUid) +'">' +
                  '<div class="avatar">' +
                  '<img class="userImg '+ (data.davName ? 'dav' : '') +'" src="'+data.avatar+'" onerror="this.src=\''+staticPath+'img/defaultUser.png\'"/>' +
                  (data.davName ? '<img class="davIcon" src="'+staticPath+'img/v38.png"/>' : '') +
                  '</div>' +
                  '<p class="username">'+data.username+'</p>' +
                  '<p class="desc">附近甲友（'+distance+'）</p>' +
                  '<div class="favor" data-uid="'+data.uid+'"><span>关注</span></div>' +
                  '</div>' +
                  '</li>';
              }

              if(ele.length > 1) {
                $('.mayLikeList li').eq(idx).replaceWith(html);
              } else {
                $('.mayLike').remove();
              }

            }
          }
        });
      });
      $('.mayLikeList').on('click', 'li .favor', function () {
        var _this = $(this);
        var mask = _this.closest(".mayLikeBox").find(".favorMask");
        mask.show();
        saEvent('mbbs_click', 'mbbs详情页', '推荐关注--关注');
        var uid = $(this).data('uid');
        var bbs_uid = getCookie('bbs_uid');
        if(!bbs_uid) {
          location.href = bbsUrl+'mLogin/login.html?gotoUrl='+decodeURIComponent(location.href);
          return;
        }
        var type = _this.hasClass("attented") ? "del" : "add";

        $.ajax({
          url: webRoot + 'thread/userFollow',
          type: 'get',
          data: {bUid: uid, type: type},
          dataType: 'json',
          success: function (data) {
            if(data.ret != 0) {
              showTip(data.msg);
              mask.hide();
              return;
            }
            if(type == "add"){
              _this.addClass('attented').text('已关注');
            }else{
              _this.removeClass('attented').html('<span>关注</span>');
            }
            showTip('操作成功');
            mask.hide();
          }
        });
      });
    }
    function renderNearby(list) {
      var html = '';
      for(var i=0; i<list.length; i++) {
        var distance = formatDistance(list[i].distance);
        var avatarHtml;
        avatarHtml = '<mip-img class="userImg '+(list[i].davName ? 'dav' : '')+'" src="'+list[i].avatar+'"></mip-img>'
        html+= '<li data-uid="'+list[i].uid+'">' +
          '<div class="mayLikeSingle">' +
          '<em class="close"></em>' +
          // '<a class="avatar" href="'+ (webRoot + "user/other/" + list[i].aesUid) +'">' +
          '<div class="avatar">' +
          avatarHtml +
          (list[i].davName ? '<img class="davIcon" src="'+staticPath+'img/v38.png"/>' : '') +
          '</div>' +
          '<p class="username">'+list[i].username+'</p>' +
          '<p class="desc">附近甲友（'+distance+'）</p>' +
          '<div class="favor" data-uid="'+list[i].uid+'"><span>关注</span></div>' +
          '</div>' +
          '</li>'
      }
      $('.mayLikeList').html(html);
      $('.mayLike').show();
    }

    // 引导app打开
    linkedme.init("37f2f6067e34f5b8759497bb13b586da", null, null);
    var tid = location.href.match(/info\/(\d+)/)[1];
    if(tid) {
      var data = {};
      data.params = '{"linkType":"thread","tid":"'+ tid +'"}';
      linkedme.link(data, function(err, response){
        if(err){
          console.log('error', err);
        } else {
          linkUrl = response.url;
          $('.appDown').on('click', function () {
            if(isWeiXin()) {
              $('.weixinMask').show();
              $('.shareWord').show();
            } else {
              location.href = linkUrl;
            }
          });
          $('.postLists').on('click', '.downApp', function () {
            if(isWeiXin()) {
              $('.weixinMask').show();
              $('.shareWord').show();
            } else {
              location.href = linkUrl;
            }
          });
          $('.appBtn').on('click', function () {
            saEvent('mbbs_click', 'mbbs详情页', 'APP打开');
            if(isWeiXin()) {
              $('.weixinMask').show();
              $('.shareWord').show();
            } else {
              location.href = linkUrl;
            }
          });
        }
      },false);
    }
    $('.weixinMask').on('click', function () {
      $('.weixinMask').hide();
    })

    // 点赞逻辑
    function praiseFn(_this, data, cb) {
      $.ajax({
        url: webRoot+'thread/praise?fresh=' + Math.random(),
        data: data,
        dataType: 'json',
        success: function (res) {
          if(res.ret != 0) {
            showTip(res.msg);
            _this.removeClass("disabled");
            return;
          }
          if(data.cancel > 0){
            var znum = parseInt(_this.text()) - 1;
            _this.removeClass('act').text(znum);
            var toastMsg = "取消点赞成功";
          }else{
            var znum = parseInt(_this.text() || 0) + 1;
            _this.text(znum).addClass('act');
            var toastMsg = "点赞成功";
          }
          showTip(toastMsg);
          cb && cb(_this,{tid : data.tid});
        }
      })
    }
    // 点赞列表
    function praiseListFn(_this, data) {
      $.ajax({
        url: webRoot+'thread/praiseList?r=' + new Date().getTime(),
        data: data,
        dataType: 'json',
        success: function (res) {
          var html = '';
          if(!res.length){
            html = '壮士且慢，赞完再走！';
          }else{
            for(var i=0; i < res.length; i++){
              html += '<mip-img class="userImg" src="'+res[i].avatar+'"></mip-img>'
            }
          }
          $(".praiseAvators").html(html);
          _this.removeClass("disabled");
        }
      })
    }
    function getData(order, empty, sort) {
      if(!allowAjax) {
        return;
      }
      allowAjax = false;

      if(order) {
        var url = location.href + '/'+page+'?order='+order
      } else {
        var url = location.href + '/'+page;
      }
      var sort = sort == 'asc' ? 'asc' : 'desc';
      if(sort == 'asc') {
        url += (url.indexOf('?') === -1 ? '?' : '&') + 'sort='+sort;
      }
      $.ajax({
        url : url,
        type : 'get',
        data : {},
        success : function (res) {
          if(res.ret != 0) {
            // alert(res.msg);
            allowAjax = true;
            return;
          }
          var html = '';
          for(var i=0; i<res.data.length; i++) {
            var imgHtml = '';
            var imgs = res.data[i].img;
            for(var j=0; j<imgs.length; j++) {
              imgHtml += '<div class="img"><mip-img popup src="'+imgs[j].img.replace(/img3.cehome.com/, 'upbbsimg.cehome.com')+'"></mip-img></div>'
            }
            var videoHtml = '';
            var videos = res.data[i].video;
            for(var j=0; j<videos.length; j++) {
              videoHtml += '<div class="img"><mip-video src="'+videos[j].url+'" poster="'+videos[j].img+'" controls playsinline webkit-playsinline  x5-playsinline x-webkit-airplay="allow"></mip-video></div>'
            }
            var cHtml = '';
            var clist = res.data[i].commentList;
            if(clist.length) {
              cHtml += '<div class="commentList">';
              for(var j=0; j<clist.length; j++) {
                cHtml += '<div class="commentSingle">' +
                  '<span class="cname">'+clist[j].username+'</span>' +
                  (clist[j].toUsername ? ' 回复 <span class="cname">'+clist[j].toUsername+'</span>' : '') +
                  '：'+ clist[j].content +
                  '</div>';
              }
              cHtml += '</div>';
            }

            var avatarHtml = '';
            avatarHtml += '<mip-img class="userImg" src="'+res.data[i].avatar+'"></mip-img>'

            html += '<div class="postSingle">' +
              '<a href="'+webRoot+'user/other/'+res.data[i].aesUid+'"><div class="user">' +
              // '<div class="user">' +
              '<div class="avatar">' +
              avatarHtml +
              '</div>' +
              '<div class="username">'+res.data[i].username+'</div>' +
              '</div></a>' +
              '<div class="postContent">' +
              '<p class="msg">'+res.data[i].message+'</p>' +
              imgHtml +
              videoHtml +
              cHtml +
              '<div class="extra">' +
              '<p class="ptime">'+res.data[i].datelineStr+'</p>' +
              '<div class="btns">' +
              '<p class="pbtn zan '+(res.data[i].isPraise == '0' ? '' : 'act')+'" data-tid="'+res.data[i].tid+'" data-pid="'+res.data[i].pid+'">'+res.data[i].praise+'</p>' +
              '</div>' +
              '</div>' +
              '</div>' +
              '</div>';
          }
          if(empty) {
            $('.postLists').html($(html));
          } else {
            $('.postLists').append($(html));
          }

          if(res.data.length) {
            page++;
            allowAjax = true;
          } else {
            $('.loadMore').hide();
            $('.loadedAll').show();
          }

        }
      })
    }
    function isWeiXin() {
      var ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
      } else {
        return false;
      }
    }
    function formatDistance(length) {
      if(length > 100000) {
        return parseInt(length/1000000) + 'km';
      } else if(length > 1000) {
        return parseFloat(length/1000).toFixed(2) + 'km';
      } else {
        return length + 'm';
      }
    }

    function getTidByUrl() {
      var url = location.href;
      var lastIndex = location.href.lastIndexOf("/");
      var tid = url.substring( lastIndex + 1)
      return tid;
    }

    function avatar_func(data) {
      var html = '';
      console.log(data.length);
      for(var i=0; i<data.length; i++) {
        html += '<mip-img class="userImg" src="'+data[i].avatar+'"></mip-img>';
      }
      return html;
    }
  });

  /**
   * 第一次进入可视区回调，只会执行一次
   */
  customElement.prototype.firstInviewCallback = function () {

  };

  return customElement;
});
