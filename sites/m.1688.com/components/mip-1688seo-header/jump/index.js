import {
  isWeChat,
  is1688,
  isIOS,
  appInfo,
  iOSVersion
} from './app-detector';

let SCHEMA_PREFIX = isIOS ? 'wireless1688://' : 'wireless1688://ma.m.1688.com/fromwap?tonative=';
let TRY_DOWNLOAD_LINK = isIOS ? 'https://itunes.apple.com/cn/app/a-li-ba-ba/id507097717?spm=a260g.5768073.754876973.2&mt=8' : 'https://m.1688.com/d.html';
let OPEN_SCHEMA_SHALLOW_ELEMENT = null;
let SHALLOW_FRAME = null;

const DEFAULT_APP_URL = 'home.m.1688.com/index.htm';
const appName = appInfo != null ? appInfo.appCode : 'wap';

const visibleEvent = (function() {
  var stateKey,
    eventKey,
    keys = {
      hidden: 'visibilitychange',
      webkitHidden: 'webkitvisibilitychange',
      mozHidden: 'mozvisibilitychange',
      msHidden: 'msvisibilitychange'
    };
  for (stateKey in keys) {
    if (stateKey in document) {
      eventKey = keys[stateKey];
      break;
    }
  }

  return function(c) {
    if (c) {
      document.addEventListener(eventKey, c);
    }

    return !document[stateKey];
  };
})();

function addSpmSource(appUrl) {
  var appUrlArr = appUrl.split('?');
  var host = appUrlArr[0];
  var search = appUrlArr[1] || '';
  search = decodeURIComponent(search);
  var spm;

  // 解析spm
  if (search.indexOf('spm=') > -1) {
    var searchArr = search.split('spm=');
    var suffix = searchArr[1].split('&');
    spm = suffix[0].split('.');
    search = searchArr[0] + (suffix[1] || '');
  } else {
    spm = ['a262eq', '9014029'];

    if (window.goldlog) {
      spm = window.goldlog.spm_ab.slice(0);
    }
  }

  // 解析来源
  var appKey = appName;
  spm[1] += (spm[1].indexOf('/') > -1 ? '' : '/') + '@applink_' + appKey;

  for (var i = spm.length; i < 4; i++) {
    spm.push(0);
  }

  appUrl = host + '?' + search + '&spm=' + spm.join('.');

  return appUrl;
}
const buildSchemaUrl = (url) => {
  let clientUrl = addSpmSource(url || DEFAULT_APP_URL);
  const tracelog = `${clientUrl.indexOf('?') == -1 ? '?' : '&'}tracelog=fromwap`;
  clientUrl = clientUrl + tracelog;

  // 💩 坑！
  if (isIOS) {
    return `${SCHEMA_PREFIX}${clientUrl}`;
  } else {
    clientUrl = 'http://' + clientUrl;
    return `${SCHEMA_PREFIX}${encodeURIComponent(clientUrl)}`;
  }
};

function customClickEvent() {
  var clickEvt;
  if (window.CustomEvent) {
    clickEvt = new window.CustomEvent('click', {
      canBubble: true,
      cancelable: true
    });
  } else {
    clickEvt = document.createEvent('Event');
    clickEvt.initEvent('click', true, true);
  }

  return clickEvt;
}

function failedAndGoDownload() {
  location.href = TRY_DOWNLOAD_LINK;
}

const awakeTimeout = 1000;

export default function appJump(url = '') {
  // 如果是【微信】直接跳转应用宝
  if (isWeChat) {
    location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=com.alibaba.wireless';
    return;
  }

  // 💩 主客跳转需要将协议部分去掉
  url = url.replace(/^https?:\/\//, '');

  if (is1688 && document.URL.indexOf(url) >= 0) {
    // 在主客中被打开，且当前 url 与期望被唤起 url 一致
    return;
  }

  let hasSuccess = false;
  let stl = setTimeout(() => {
    if (!hasSuccess) {
      failedAndGoDownload();
    }
  }, awakeTimeout);

  visibleEvent(() => {
    if (stl == null) return;

    clearTimeout(stl);
    stl = null;

    hasSuccess = true;
  });

  const schemaUrl = buildSchemaUrl(url);

  if (isIOS && iOSVersion >= 9) {
    if (OPEN_SCHEMA_SHALLOW_ELEMENT == null) {
      OPEN_SCHEMA_SHALLOW_ELEMENT = document.createElement('a');
      OPEN_SCHEMA_SHALLOW_ELEMENT.id = 'open_schema_link';
      OPEN_SCHEMA_SHALLOW_ELEMENT.style.display = 'none';
      document.body.appendChild(OPEN_SCHEMA_SHALLOW_ELEMENT);
    }

    OPEN_SCHEMA_SHALLOW_ELEMENT.href = buildSchemaUrl(url);
    // 点击链接
    OPEN_SCHEMA_SHALLOW_ELEMENT.click();

    return;
  }

  if (SHALLOW_FRAME == null) {
    SHALLOW_FRAME = document.createElement('iframe');
    SHALLOW_FRAME.style.display = 'none';
    document.body.appendChild(SHALLOW_FRAME);
  }

  SHALLOW_FRAME.setAttribute('src', schemaUrl);
}
