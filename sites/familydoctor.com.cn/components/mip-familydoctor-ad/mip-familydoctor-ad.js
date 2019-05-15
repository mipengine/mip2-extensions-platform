class fdad extends MIP.CustomElement {
  build() {
    let me = this;
    let $ele = this.element;
    let customer = this.factory();
    let id = parseInt($ele.getAttribute('data-id'), 10);
    let $div = document.createElement('div');
    let url = customer.getPlaceUrl(id);
    window.CUSTOMER = customer;

    window.fetchJsonp(url, {
      jsonpCallbackFunction: 'mipgg'
    }).then(function (res) {
      return res.json();
    }).then(function () {
      let mipad = customer.mipGet(id);

      // 百度联盟广告
      if (mipad) {
        try {
          $div.id = mipad.token;
          $ele.appendChild($div);
          $ele.classList.add('mip-adbd');
          customer.render($ele, me, mipad.domain, mipad.token);
        } catch (e) { }
      }
    });
  }

  factory() {
    let storage = MIP.util.customStorage(0);

    let domain = 'https://static.tj.familydoctor.com.cn';
    let domainIP = 'https://ggtj.tj.familydoctor.com.cn';
    let customer = {
      ids: [], // 所有广告id
      baseUrl: domain + '/c/e/',
      placeUrl: domain + '/c/a/',
      area: null, // 缓存的地区数据{pid, id}
      areaStorageName: '__customer_area', // storage名称
      statis: {
        url: 'https://click.tj.familydoctor.com.cn/',
        ap: 'ap',
        apd: 'apd',
        record: recordPv
      },
      place: {
        items: [], // 广告位数据
        ids: [], // 广告位id数组
        className: '__customer_place',
        sectionName: '__customer_section',
        sectionWrapName: '__customer_sec_wrap',
        getSections: getPlaceSections,
        append: appendAd,
        mutiple: {} // 轮播或叠楼
      },
      isUrl: isUrl, // 按URL
      isDis: isDisease, // 按疾病
      isDep: isDepartment, // 按科室
      isBro: isBrowser, // 浏览器
      isCus: isCustom, // 自定义
      isMob: isMobile, // 按平台
      isArea: isArea, // 按地区
      doctors: matchDoctors, // 按医生
      setDis: setDisease, // 设置疾病
      setAskDis: setAskDisease, // 设置ask疾病
      setDep: setDepartment, // 设置科室
      setDoc: setDoctor, // 设置医生
      setCus: setCustom, // 设置自定义标签
      loadArea: loadArea, // 异步加载地区
      data: {
        disease: null,
        askDisease: null,
        department: [],
        customs: [],
        doctors: [],
        mips: []
      },
      setId: setCustomerId, // 设置广告id
      mutiple: mutiple, // 轮播 或 列表
      handle: handle, // 处理并插入广告
      slider: slider,
      ajax: ajax,
      ready: ready,
      delay: delay,
      getElements: getElements,
      getQueryString: getQueryString,
      getPlaceUrl: getPlaceUrl,
      mipAdd: mipAdd,
      mipGet: mipGet,
      getScript: getScript,
      support: {
        flex: supportFlex
      },
      topbar: {
        show: function () { },
        hide: function () { }
      },
      render: render
    };

    // 匹配url
    function isUrl(urls) {
      if (!urls) {
        return false;
      }

      if (typeof urls === 'string') {
        urls = [urls];
      }

      let i = urls.length;
      let url = window.location.href.toLowerCase();

      while (i--) {
        if (url.indexOf(urls[i].toLowerCase()) !== -1) {
          return true;
        }
      }

      return false;
    }

    // 匹配疾病
    function isDisease(ids, askIds) {
      if (!(ids instanceof Array)) {
        return false;
      }

      if (!(askIds instanceof Array)) {
        askIds = [];
      }

      return contains(ids, customer.data.disease) || contains(askIds, customer.data.askDisease);
    }

    // 匹配科室
    function isDepartment(ids) {
      let departments = customer.data.department;

      if (!departments.length) {
        return false;
      }

      if (departments.length === 1) {
        return contains(ids, departments[0]);
      }

      if (departments.length === 2) {
        return contains(ids, departments[0]) || contains(ids, departments[1]);
      }
    }

    // 获取所有匹配到的医生id
    function matchDoctors(ids) {
      let doctors = [];

      if (!ids) {
        return false;
      }

      if (typeof ids === 'number') {
        ids = [ids];
      }

      for (let i = 0, len = ids.length; i < len; i++) {
        if (contains(customer.data.doctors, ids[i])) {
          doctors.push(ids[i]);
        }
      }

      return doctors;
    }

    // 匹配自定义标签
    function isCustom(tags) {
      if (!tags) {
        return false;
      }

      if (typeof tags === 'string') {
        tags = [tags];
      }

      let customs = customer.data.customs;
      let sort = function (arr) {
        let newArr = [];

        for (let i = 0, len = arr.length; i < len; i++) {
          let a = arr[i].split(':');
          let name = a[0];
          let list = a[1] ? a[1].split(',').sort() : [];

          newArr.push({ name: name.toLowerCase(), list: list });
        }

        return newArr;
      };

      customs.sort();
      tags.sort();
      customs = sort(customs);
      tags = sort(tags);

      let arrc = [];
      let arrt = [];
      let total = 0;
      let filter = function () {
        for (let i = 0, len = tags.length; i < len; i++) {
          for (let j = 0, count = customs.length; j < count; j++) {
            if (tags[i].name === customs[j].name) {
              arrc.push(customs[j].list);
              arrt.push(tags[i].list);
            }
          }
        }
      };

      filter();

      for (let i = 0, len = arrc.length; i < len; i++) {
        for (let j = 0, count = arrt[i].length; j < count; j++) {
          if (contains(arrc[i], arrt[i][j])) {
            total++;
            break;
          }
        }
      }

      if (!arrc.length) {
        return false;
      }

      if (arrc.length === total) {
        return true;
      }

      return false;
    }

    // 匹配浏览器
    function isBrowser(key) {
      let userAgent = window.navigator.userAgent.toLowerCase();
      let arr = [];
      let i = 0;
      let flag = false;

      switch (key) {
        case 'uc':
          arr.push('UCBrowser');
          break;
        case 'baidu':
          arr.push('baidu');
          break;
        case 'qq':
          arr.push('QQBrowser');
          break;
        case '360':
          arr.push('QIHU');
          break;
        case 'chrome':
          arr.push('chrome');
          break;
        case 'ie':
          arr.push('msie');
          break;
        case 'firefox':
          arr.push('firefox');
          break;
        case 'sougou':
          arr.push('MetaSr');
          break;
        case 'weixin':
          arr.push('micromessenger');
          break;
      }

      i = arr.length;

      while (i--) {
        flag = userAgent.indexOf(arr[i].toLowerCase()) !== -1;
      }

      return flag;
    }

    // 获取地区(从storage获取)
    function getArea() {
      if (customer.area) {
        return customer.area;
      }

      let area = storage.get(customer.areaStorageName);

      if (!area) {
        return null;
      }

      area = decodeURIComponent(area);
      area = window.JSON.parse(area);

      customer.area = area;
      return area;
    }

    // 设置地区(写入storage，缓存12小时)
    function setArea(area) {
      storage.set(customer.areaStorageName, encodeURIComponent(area), 12 * 60 * 60 * 1000);
    }

    // 异步加载地区
    function loadArea(callback) {
      let url = domainIP;
      let ip = getQueryString(window.location.href, 'ip');// 用于测试ip
      callback = typeof callback === 'function' ? callback : function () { };

      if (ip) {
        url += '?ip=' + ip;
      } else if (getArea()) {
        callback();
        return;
      }

      ajax({
        url: url,
        success: function (res) {
          if (!res) {
            callback();
            return;
          }

          res = window.JSON.parse(res);

          if (res && res.pid > 0) {
            setArea('{"id": ' + res.id + ', "pid": ' + res.pid + '}');// id市, pid省
            customer.area = { id: res.id, pid: res.pid };
          }

          callback();
        },
        error: function () {
          callback();
        }
      });
    }

    // 匹配地区(根据IP匹配)
    function isArea(ids) {
      let area = getArea();

      if (!area) {
        return false;
      }

      if (!area.pid) {
        return false;
      }

      if (contains(ids, area.pid) || contains(ids, area.id)) {
        return true;
      }

      return false;
    }

    // 设置疾病id
    function setDisease(id) {
      id = parseInt(id, 10) || null;
      customer.data.disease = id;
    }

    // 设置ask疾病id
    function setAskDisease(id) {
      id = parseInt(id, 10) || null;
      customer.data.askDisease = id;
    }

    // 设置科室id
    function setDepartment(id1, id2) {
      id1 = parseInt(id1, 10) || null;
      id2 = parseInt(id2, 10) || null;

      id1 && customer.data.department.push(id1);
      id2 && customer.data.department.push(id2);
    }

    // 设置医生id
    function setDoctor(ids) {
      if (!ids) {
        return;
      }

      let doctors = customer.data.doctors;

      if (typeof ids === 'string') {
        parseInt(ids, 10) && doctors.push(parseInt(ids, 10));
        return;
      }

      if (typeof ids === 'number') {
        doctors.push(ids);
        return;
      }

      if (ids instanceof Array) {
        for (let i = 0, len = ids.length; i < len; i++) {
          if (!contains(doctors, ids[i])) {
            doctors.push(ids[i]);
          }
        }
      }
    }

    // 设置自定义标签
    function setCustom(tags) {
      if (!tags) {
        return;
      }

      let customs = customer.data.customs;

      if (typeof tags === 'string') {
        customs.push(tags);
        return;
      }

      if (tags instanceof Array) {
        for (let i = 0, len = tags.length; i < len; i++) {
          if (!contains(customs, tags[i])) {
            customs.push(tags[i]);
          }
        }
      }
    }

    // 处理旧的广告配置数据
    function oldDataInit() {
      // ask 疾病 id
      if (!customer.data.askDisease) {
        setAskDisease(window.haomeitjyDiseaseId);
      }

      if (!customer.data.department.length) {
        let c1 = window.haomeitjyCategoryL1 && parseInt(window.haomeitjyCategoryL1, 10);
        let c2 = window.haomeitjyCategoryL2 && parseInt(window.haomeitjyCategoryL2, 10);

        setDepartment(c1 || null, c2 || null);
      }

      if (!customer.data.doctors.length && window.LiangChuangDoctorIds) {
        let ids = window.LiangChuangDoctorIds.split(',');
        let i = ids.length;
        let arr = [];

        while (i--) {
          arr.push(parseInt(ids[i], 10));
        }
        setDoctor(arr);
      }
    }

    function ready(callback) {
      oldDataInit();
      (typeof callback === 'function') && callback(customer);
    }

    // 处理广告(非联盟广告)
    function handle(options) {
      appendAd(getElements(customer.place.className), options.pid, options.cid);
      setCustomerId(options.cid);

      let box = getPlaceBox(options.pid);
      let customerUrl = getCustomerUrl(options.cid);
      let wrap = document.createElement('div');
      let mtp = null;

      if (!customer.place.mutiple[options.pid]) {
        customer.place.mutiple[options.pid] = {};
      }

      mtp = customer.place.mutiple[options.pid];
      mtp.total = mtp.total || options.total;// 广告总数(轮播或叠楼)
      mtp.arr = mtp.arr || [];// 广告数组(轮播或叠楼)
      mtp.cur = mtp.cur || 0;// 当前处理的广告(轮播或叠楼)

      if (!box) {
        // console.error('place not found.');
      }

      // 先排序后渲染轮播或叠楼广告
      let handleMutiple = function () {
        let list = mtp.arr.sort(function (a, b) {
          return a.order - b.order;
        });

        for (let i = 0, len = list.length; i < len; i++) {
          let item = list[i];

          item.wrap.appendChild(item.section);
          execStyle(item.res, item.box);
        }
      };

      let success = function (res) {
        let section = document.createElement('div');

        wrap.className = options.sectionWrapName || customer.place.sectionWrapName;
        section.className = options.className || customer.place.sectionName;
        section.innerHTML = res;

        options.displayType && setStyles(box, getDisplayStyles(options.displayType));
        options.styles && setStyles(box, options.styles);
        options.wrapStyles && setStyles(wrap, options.wrapStyles);
        options.sectionStyles && setStyles(wrap, options.sectionStyles);

        setTimeout(function () {
          renderCloseButton(box, options.styles);
        }, 500);

        let $wrap = getElements(wrap.className, box);

        if (!$wrap.length) {
          box.innerHTML = '';
          box.appendChild(wrap);
          renderPlaceDiyStyles(box, options.styles);
        } else {
          wrap = $wrap[0];
        }

        if (options.order != null) {
          mtp.arr.push({ order: options.order, section: section, res: res, box: box, wrap: wrap });
          mtp.cur++;

          if (mtp.cur === mtp.total) {
            handleMutiple();
          }
        } else {
          wrap.appendChild(section);
          execStyle(res, box);
        }
      };

      ajax({
        url: customerUrl,
        success: success,
        error: function () {
          // console.error('ajax error')
        }
      });

      return { box: box };
    }

    function getPlaceDiyStyles(styles) {
      if (!styles) {
        return null;
      }

      let parseStyles = function (str) {
        let options = str.split(';');
        let data = {};
        let i = options.length;

        try {
          while (i--) {
            let arr = options[i].split(':');
            data[trim(arr[0])] = trim(arr[1]).replace(/'/g, '');
          }
        } catch (e) {
          // console.error('diy styles error:' + e);
        }

        return data;
      };

      let getDiyStyles = function () {
        let arr = [];

        for (let key in styles) {
          if (key.substring(0, 1) === '_') {
            arr.push({ name: key, styles: parseStyles(styles[key]) });
          }
        }

        return arr;
      };

      return getDiyStyles();
    }

    function getPlaceDiySettings(styles) {
      if (!styles || !styles.diy) {
        return null;
      }

      let options = styles.diy.split(',');
      let data = {};
      let i = options.length;

      try {
        while (i--) {
          let arr = options[i].split(':');
          data[trim(arr[0])] = trim(arr[1]);
        }
      } catch (e) {
        // console.error('diy styles settings error:' + e);
      }

      return data;
    }

    function renderPlaceDiyStyles(box, styles) {
      if (!box || !styles) {
        return;
      }

      let data = getPlaceDiyStyles(styles);

      let render = function (obj) {
        let ele = document.createElement('div');

        ele.className = obj.name;
        setStyles(ele, obj.styles);
        obj.styles._html && (ele.innerHTML = obj.styles._html);
        box.appendChild(ele);
      };

      for (let i = 0, len = data.length; i < len; i++) {
        render(data[i]);
      }
    }

    // 添加“广告”标识和关闭按钮
    function renderCloseButton(box, styles) {
      if (!box || !styles) {
        return;
      }

      let isClose;
      let isName;
      let isOut;
      let pos;
      let close;
      let radius;
      let obj = getPlaceDiySettings(styles);
      let height = 18;

      if (!obj) {
        return;
      }

      if (obj.isClose === 'true') {
        isClose = true;
      } else {
        isClose = false;
      }

      if (obj.isName === 'true') {
        isName = true;
      } else {
        isName = false;
      }

      if (obj.isOut === 'true') {
        isOut = true;
      } else {
        isOut = false;
      }

      pos = obj.position ? obj.position : 'right|bottom';

      close = document.createElement('a');
      close.innerHTML = (isClose ? 'X' : '') + ((isClose && isName) ? ' ' : '') + (isName ? '&#24191;&#21578;' : '');
      close.style.position = 'absolute';
      close.style.height = isMobile() ? '14px' : '18px';
      close.style.lineHeight = isMobile() ? '14px' : '18px';
      close.style.padding = isMobile() ? '1px 2px' : '0 5px';
      close.style.color = '#ccc';
      close.style.fontSize = isMobile() ? '10px' : '12px';
      close.style.cursor = 'pointer';
      close.style.background = '#bbb';

      switch (pos) {
        case 'left|top':
          radius = '0 0 4px 0';
          break;
        case 'left|bottom':
          radius = '0 4px 0 0';
          break;
        case 'right|top':
          radius = '0 0 0 4px';
          break;
        default:
          radius = '4px 0 0 0';
      }

      pos = pos.split('|');

      if (pos.length < 2) {
        pos[0] = 'right';
        pos[1] = 'bottom';
      }

      if (isOut) {
        close.style[pos[1]] = -height + 'px';
      } else {
        close.style[pos[1]] = 0;
      }

      close.style[pos[0]] = 0;
      box.appendChild(close);

      if (window.addEventListener) {
        !isOut && (close.style.borderRadius = radius);
        close.style.background = 'rgba(0,0,0,.5)';
      }

      if (isClose) {
        close.onclick = function () {
          box.style.display = 'none';
        };
      }

      if (box.style.position !== 'fixed' && box.style.position !== 'absolute') {
        box.style.position = 'relative';
      }
    }

    // 获取广告位div
    function getPlaceBox(placeId) {
      let pos = -1;
      let items = customer.place.items;
      let len = items.length;

      for (let i = 0; i < len; i++) {
        if (items[i].id === placeId) {
          pos = i;
          break;
        }
      }

      if (pos !== -1) {
        return customer.place.items[pos].box;
      }

      return null;
    }

    // 获取广告位里面的所有项
    function getPlaceSections(box, className) {
      className = className || customer.place.sectionName;

      return getElements(className, box);
    }

    // 添加广告到广告位
    function appendAd(list, pid, cid) {
      let ids = customer.place.ids;
      let items = customer.place.items;

      for (let i = 0, len = list.length; i < len; i++) {
        let item = list[i];
        let id = parseInt(item.getAttribute('data-id'), 10);

        if (!contains(ids, id)) {
          let arr = [];

          (id === pid) && arr.push(cid);
          items.push({ box: item, id: id, cids: arr });
          ids.push(id);
        } else {
          if (id === pid) {
            let n = items.length;
            let cur = null;

            while (n--) {
              if (items[n].id === pid) {
                cur = items[n];
                break;
              }
            }

            cur && cur.cids.push(cid);
          }
        }
      }
    }

    // 获取广告素材url
    function getCustomerUrl(id) {
      let str = id.toString();
      let fileName = 'customer' + id + '.html';
      let dir = '';
      let count = 9;

      if (str.length < count) {
        str = '000000000' + str;
      }

      str = substr(str, -count);
      dir = str.substring(0, 3) + '/' + str.substring(3, 6) + '/';

      return customer.baseUrl + dir + fileName;
    }

    // 获取广告位url
    function getPlaceUrl(id) {
      let str = id.toString();
      let fileName = 'ggw_' + id + '.js';
      let dir = '';
      let count = 9;

      if (str.length < count) {
        str = '000000000' + str;
      }

      str = substr(str, -count);
      dir = str.substring(3, 6) + '/';

      return customer.placeUrl + dir + fileName;
    }

    // 设置广告id
    function setCustomerId(cid) {
      if (!contains(customer.ids, cid)) {
        customer.ids.push(cid);
      }
    }

    // 记录广告展示数量
    function recordPv(callback) {
      let aps = customer.ids.join(',');// 广告id
      let pps = customer.place.ids.join(',');// 广告位id
      let params = customer.statis.ap + '=' + aps + '&' + customer.statis.apd + '=' + pps;
      let url = customer.statis.url + '?' + params;
      let $img = document.createElement('img');
      $img.src = url;

      callback = callback || function () { };

      $img.onload = function () {
        callback();
      };

      $img.onerror = function () {
        callback();
      };
    }

    // 加载js
    // 这个只是加载外链js的执行函数，具体调用不在这里，在调用的地方有说明。
    function getScript(url, options) {
      window.fetchJsonp(url, {
        jsonpCallbackFunction: 'mipgg'
      }).then(function (res) {
        return res.json();
      }).then(function () {
        options = options || {};
        options.success = options.success || function () { };
        options.success();
      });
    }

    function ajax(options) {
      let defaults = {
        url: '',
        params: '',
        success: function () { },
        error: function () { },
        complete: function () { }
      };

      extend(defaults, options);

      if (defaults.params) {
        defaults.url = defaults.url.indexOf('?') !== -1 ? (defaults.url + '&') : (defaults.url + '?');
      }

      let fet = window.fetch(defaults.url + defaults.params).then(function (res) {
        return res.text();
      }).then(function (text) {
        defaults.success(text, 200, fet);
        defaults.complete(text);
      });

      return fet;
    }

    // 执行css代码
    function execStyle(str, context) {
      let style = document.createElement('style');
      let exp = /<style\b[^>]*>([\s\S]*?)<\/style>/gm;
      let match = exp.exec(str);
      let styleText = '';

      if (!match) {
        return;
      }

      while (match) {
        styleText += match[1];
        match = exp.exec(str);
      }

      style.type = 'text/css';

      try {
        style.appendChild(document.createTextNode(styleText));
      } catch (ex) {
        style.styleSheet.cssText = styleText;
      }

      context = context || document.body;
      context.appendChild(style);
    }

    // 获取节点集合
    function getElements(className, context) {
      context = context || document;
      return context.querySelectorAll('.' + className);
    }

    function extend(a, b, deep) {
      for (let i in b) {
        if (deep && typeof b[i] === 'object' && b[i] !== null) {
          a[i] = a[i] || {};
          extend(a[i], b[i]);
        } else {
          if (b.hasOwnProperty(i)) {
            a[i] = b[i];
          }
        }
      }
      return a;
    }

    // 判断元素是否存在
    function contains(arr, val) {
      let i = arr.length;

      while (i--) {
        if (arr[i] === val) {
          return true;
        }
      }

      return false;
    }

    // 设置样式
    function setStyles(elem, styles) {
      for (let key in styles) {
        if (key.substring(0, 1) !== '_' || key !== 'diy') {
          elem.style[key] = styles[key];
        }
      }
    }

    // 轮播插件
    function slider(options) {
      let defaults = {
        box: null,
        items: null,
        auto: true,
        slider: true,
        duration: 3,
        width: 'auto',
        height: 'auto',
        styles: {}
      };
      let timer = null;
      let current = 0;
      let $current = null;
      let total = 0;

      extend(defaults, options);
      defaults.box.style.width = defaults.width;
      defaults.box.style.height = defaults.height;

      if (!defaults.items) {
        defaults.items = getPlaceSections(defaults.box);
      }

      if (defaults.items.length < 2) {
        return;
      }

      total = defaults.items.length;
      $current = defaults.items[current];

      if (defaults.slider) {
        for (let i = 0; i < total; i++) {
          if (i > 0) {
            defaults.items[i].style.display = 'none';
          }
        }
      }

      if (defaults.slider && defaults.auto) {
        setTimeout(scroll, defaults.duration * 1000);

        defaults.box.onmouseover = function () {
          clearInterval(timer);
        };

        defaults.box.onmouseout = scroll;
      }

      function scroll() {
        clearInterval(timer);

        timer = setInterval(function () {
          if (current >= total - 1) {
            current = -1;
          }

          current++;
          defaults.items[current].style.display = 'block';
          $current.style.display = 'none';
          $current = defaults.items[current];
        }, defaults.duration * 1000);
      }
    }

    // 启动轮播 或 列表广告
    function mutiple(options) {
      let list = options.list;
      let box = null;
      let ids = [];// 要显示的广告id数组(权重最高)

      if (!list.length) {
        return;
      }

      let getMaxLevelIndex = function () {
        let index = -1;
        let max = null;
        let i = list.length;

        while (i--) {
          if (!max || list[i].level > max) {
            if (list[i].ids.length) {
              max = list[i].level;
              index = i;
            }
          }
        }

        return index;
      };

      // 渲染水平排列的广告
      let renderHorizontal = function () {
        let sections = getElements(customer.place.sectionName, box);
        let len = sections.length;
        let wrap = sections[0].parentNode;
        let width = Math.floor(box.scrollWidth / len) + 'px';

        wrap.style.overflow = 'hidden';

        if (customer.support.flex()) {
          wrap.style.display = '-webkit-flex';
          wrap.style.display = 'flex';
          wrap.style.alignItems = 'stretch';
          wrap.style.textAlign = 'center';
        }

        for (let i = 0; i < len; i++) {
          sections[i].style.width = width;

          if (customer.support.flex()) {
            sections[i].style.flex = 1;
            sections[i].style.webkitFlex = 1;
          } else {
            sections[i].style.float = 'left';
          }
        }
      };

      let initNormal = function (callback) {
        let index = getMaxLevelIndex();// 获取最高权重的广告

        if (index === -1) {
          return;
        }

        ids = list[index].ids;

        for (let i = 0, len = ids.length; i < len; i++) {
          let obj = handle({ pid: options.pid, cid: ids[i], order: i, total: len });
          box = obj.box;
        }

        options.box = box;

        delay(callback, 500);
      };

      initNormal(function () {
        if (ids.length) {
          if (options.type && options.type === 'slider') {
            options.slider = true;
          }

          if (options.slider) {
            slider(options);
          }

          if (ids.length > 1 && options.type && options.type === 'horizontal') {
            renderHorizontal();
          }
        }

        setStyles(box, options.styles);
        renderPlaceDiyStyles(box, options.styles);
        renderCloseButton(box, options.styles);
      });
    }

    // 延迟函数
    function delay(fn, milliscond) {
      if (!fn) {
        return;
      }

      milliscond = milliscond || 0;

      setTimeout(function () {
        (typeof fn === 'function') && fn();
      }, milliscond);
    }

    // 获取要显示的样式
    function getDisplayStyles(type) {
      let style = { position: 'fixed', zIndex: 200, background: 'white' };

      switch (type) {
        case 'top':
          style.top = 0;
          style.left = 0;
          style.right = 0;
          style.width = '100%';
          break;
        case 'bottom':
          style.bottom = 0;
          style.left = 0;
          style.right = 0;
          style.width = '100%';
          break;
        case 'leftTop':
          style.top = '30px';
          style.left = '30px';
          break;
        case 'rightTop':
          style.top = '30px';
          style.right = '30px';
          break;
        case 'leftBottom':
          style.bottom = '30px';
          style.left = '30px';
          break;
        case 'rightBottom':
          style.bottom = '30px';
          style.right = '30px';
          break;
        default:
          style = {};
      }

      return style;
    }

    // 判断是否移动端
    function isMobile() {
      let isMob = /android|iphone|ipad|ipod|windows phone/i.test(window.navigator.userAgent);
      return isMob;
    }

    // 字符串截取
    function substr(str, start, len) {
      if (start < 0) {
        start = str.length + start;
      }

      return str.substr(start, len);
    }

    function trim(str) {
      if (!str) {
        return '';
      }

      if (String.prototype.trim) {
        return str.trim();
      }

      return str.replace(/(^\s*)|(\s*$)/g, '');
    }

    function getQueryString(url, name) {
      let reg = new RegExp('(^|\\?|&)' + name + '=([^&]*)(\\s|&|$)', 'i');

      if (reg.test(url)) {
        return decodeURIComponent(RegExp.$2.replace(/\+/g, ' '));
      }

      return '';
    }

    function supportFlex() {
      let div = document.createElement('div');
      let support = ('-webkit-flex' in div.style || 'flex' in div.style);

      customer.support.flex = function () {
        return support;
      };

      return support;
    }

    function mipAdd(str, pid, cid) {
      let arr1 = str.split('//');
      let str1 = arr1.length > 1 ? arr1[1] : '';
      let str2 = str1.split('.js')[0];
      let arr2 = str2.split('/');

      setCustomerId(cid);

      if (arr2.length < 2) {
        // console.warn('baidu union string error');
        return;
      }

      customer.data.mips.push({ pid: pid, domain: arr2[0], token: arr2[1] });

      if (!contains(customer.place.ids, pid)) {
        customer.place.items.push({ box: null, id: pid, cids: [cid] });
        customer.place.ids.push(pid);
      }
    }

    function mipGet(pid) {
      if (!customer.data.mips.length) {
        return null;
      }

      let mips = customer.data.mips;

      for (let i = 0, len = mips.length; i < len; i++) {
        if (pid === mips[i].pid) {
          return mips[i];
        }
      }

      return null;
    }

    function main() {
      let timer = null;
      let total = 6;
      let getCidCount = function () {
        let items = customer.place.items;
        let i = items.length;
        let count = 0;

        while (i--) {
          count += items[i].cids.length;
        }

        return count;
      };

      let record = function () {
        let count = getElements(customer.place.className).length;

        if (!count) {
          return;
        }

        total--;

        if (!total || (count === customer.place.items.length && customer.ids.length === getCidCount())) {
          clearTimeout(timer);
          recordPv();
          return;
        }

        timer = setTimeout(record, 500);
      };

      record();
    }

    function render(that, me, domain, token) {
      if (domain && token) {
        window.fetchJsonp('//' + domain + '/' + token + '.js', {
          jsonpCallbackFunction: 'mipgg'
        }).then(function (res) {
          return res.json();
        }).then(function () {});

        let close = document.createElement('a');
        close.innerHTML = 'X';
        close.style.position = 'absolute';
        close.style.right = '26px';
        close.style.bottom = '3px';
        close.style.height = '14px';
        close.style.lineHeight = '14px';
        close.style.padding = '0 3px';
        close.style.fontSize = '11px';
        close.style.color = 'white';
        close.style.background = 'rgba(0,0,0,.45)';
        close.addEventListener('click', function () {
          that.parentNode.removeChild(that);
        });

        that.appendChild(close);
      } else {
        // console.error('请输入正确的 domain 或者 token');
      }
    }

    window.addEventListener('DOMContentLoaded', function () {
      main();
    });

    return customer;
  }
}

export default fdad;
