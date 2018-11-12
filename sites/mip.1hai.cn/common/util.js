import { CryptoJS } from "./crypto.min.js";

let key = CryptoJS.enc.Utf8.parse("th!s!s@p@ssw0rd;setoae$12138!@$@"); //十六位十六进制数作为密钥
let iv = CryptoJS.enc.Utf8.parse("-o@g*m,%0!si^fo1"); //十六位十六进制数作为密钥偏移量

export default {
  // MD5 加密
  md5(str) {
    return CryptoJS.MD5(str).toString();
  },

  // AES 加密方法
  encrypt(word) {
    let encrypted = CryptoJS.AES.encrypt(word, key, {
      iv: iv,
      mode: CryptoJS.mode.CFB,
      padding: CryptoJS.pad.Pkcs7
    });

    encrypted = encrypted.toString();
    encrypted = encrypted.replace(/=/g, "*");
    encrypted = encrypted.replace(/\+/g, "$");
    encrypted = encodeURIComponent(encrypted);

    return encrypted;
  },

  // AES 解密方法
  decrypt(word) {
    word = word.replace(/\*/g, "=").replace(/\$/g, "+");

    let decrypted = CryptoJS.AES.decrypt(word, key, {
      iv: iv,
      mode: CryptoJS.mode.CFB,
      padding: CryptoJS.pad.Pkcs7
    });

    return CryptoJS.enc.Utf8.stringify(decrypted);
  },

  // POST 加密
  postParamEncrypt(key, param) {
    let place_param = JSON.stringify(param),
      md5_param = key + place_param;

    return {
      auth: this.md5(md5_param),
      des: this.encrypt(place_param)
    };
  },

  // GET 加密
  getParamEncrypt(key, param) {
    let place_param = param,
      md5_param = key + place_param;

    return {
      auth: this.md5(md5_param),
      des: this.encrypt(place_param)
    };
  },

  // GET & POST 加密
  paramEncrypt(key, query, data) {
    let place_query = query,
      place_data = JSON.stringify(data),
      md5_param = key + place_query + place_data;

    return {
      auth: this.md5(md5_param)
    };
  },

  // Storage
  getStorage(key) {
    return JSON.parse(localStorage.getItem(key));
  },

  setStorage(obj) {
    localStorage.setItem(obj.key, JSON.stringify(obj.data));
  },

  removeStorage(key) {
    localStorage.removeItem(key);
  },

  // CartData
  getCartData() {
    let EhiCart = this.getStorage("EhiCart");

    return EhiCart;
  },

  setCartData(cartInfo) {
    this.setStorage({
      key: "EhiCart",
      data: cartInfo
    });
  },

  removeCartData() {
    this.removeStorage("EhiCart");
  },

  // setCartype
  setCartype(cartype) {
    return {
      BrandId: cartype.BrandId,
      BrandName: cartype.BrandName,
      CarTypeId: cartype.CarTypeId,
      Emission: cartype.Emission,
      EmissionUnit: cartype.EmissionUnit,
      FloorPrice: cartype.FloorPrice,
      GearId: cartype.GearId,
      GearName: cartype.GearName,
      IsChangeStore: cartype.IsChangeStore,
      IsEnjoyCar: cartype.IsEnjoyCar,
      LevelId: cartype.LevelId,
      LevelName: cartype.LevelName,
      LocationId: cartype.LocationId,
      ManagerId: cartype.ManagerId,
      MaxPassenger: cartype.MaxPassenger,
      Name: cartype.Name,
      SmallImagePath: cartype.SmallImagePath,
      SortType: cartype.SortType,
      StructureName: cartype.StructureName,
      UserLevel: cartype.UserLevel,
      GroupId: cartype.GroupId,
      GroupDescription: cartype.GroupDescription
    };
  },

  // 实体门店排序
  physicalStore(data) {
    let physicalStores = [];
    let notPhysicalStores = [];
    let arr = [];

    data.forEach((item, index) => {
      if (item.IsPhysicalStore === "Y") {
        physicalStores.push(item);
      } else {
        notPhysicalStores.push(item);
      }
    });

    arr = physicalStores.concat(notPhysicalStores);

    return arr;
  },

  // 字符串替换 * 号
  strReplace(str, start, end) {
    if (!!str) {
      let star = str.replace(/\s+/g, ""),
        i,
        replaceStar = "",
        replacedStr;

      for (i = 0; i < star.substring(start, star.length - end).length; i++) {
        replaceStar = replaceStar + "*";
      }

      replacedStr =
        star.substring(0, start) +
        replaceStar +
        star.substring(star.length - end, str.length);

      return replacedStr;
    }
  },

  // Helper
  /**
   * 当期日期前后 n 天的日期
   * @param  {number} s 开始时间
   * @param  {number} n 具体天数
   * @return {string}   yyyy-mm-dd
   */
  getSpecificDate(s, n) {
    let d = new Date();

    d.setDate(d.getDate() + s + n);
    d =
      d.getFullYear() +
      "-" +
      this.formatNum(d.getMonth() + 1) +
      "-" +
      this.formatNum(d.getDate());

    return d;
  },
  /**
   * 当期时间后 n 小时时间，不考虑分钟
   * @param  {number} n 具体小时
   * @return {string}   yyyy-mm-ddTHH:mm:00
   */
  getSpecificTime(n) {
    let d = new Date();

    d.setHours(d.getHours() + n);
    d =
      d.getFullYear() +
      "-" +
      this.formatNum(d.getMonth() + 1) +
      "-" +
      this.formatNum(d.getDate()) +
      "T" +
      this.formatNum(d.getHours()) +
      ":" +
      "00" +
      ":" +
      "00";

    return d;
  },
  /**
   * 指定日期的星期
   * @param  {string} strDate 日期字符串 yyyy-mm-dd|yyyy-m-d
   * @return {string}         星期
   */
  getDay(strDate) {
    let f = strDate.replace(/-/g, "/"),
      w = "日一二三四五六";

    f = new Date(f).getDay();

    return "星期" + w.split("")[f];
  },
  /**
   * 格式化数字，不足两位前面补 0
   * @param  {number} num 要格式化的数字
   * @return {string}
   */
  formatNum(num) {
    return num.toString().replace(/^(\d)$/, "0$1");
  },
  /**
   * 将日期对象/日期字会串格式化为指定日期字符串
   * @param {object|string} vArg 日期对象格式 new Date('yyyy-mm|m-dd|d HH:mm')，日期字符串格式 yyyy-mm|n-dd|d HH:mm
   * @function
   * @return {string} yyyy-mm-dd HH:mm
   */
  formatStrDate(vArg) {
    switch (typeof vArg) {
      case "string":
        let date = vArg.split(" ")[0].split(/-|\//g),
          hour = vArg.split(" ")[1].split(/-|\/|:/g);

        return (
          date[0] +
          "-" +
          this.formatNum(date[1]) +
          "-" +
          this.formatNum(date[2]) +
          " " +
          this.formatNum(hour[0]) +
          ":" +
          this.formatNum(hour[1])
        );

        break;
      case "object":
        return (
          vArg.getFullYear() +
          "-" +
          this.formatNum(vArg.getMonth() + 1) +
          "-" +
          this.formatNum(vArg.getDate()) +
          " " +
          this.formatNum(vArg.getHours()) +
          ":" +
          this.formatNum(vArg.getMinutes())
        );

        break;
    }
  },
  /**
   * 将日期格式化为指定字符串，yyyy-mm-dd HH:mm --> yyyy-mm-ddTHH:mm:00
   * @param {string} str
   * @function
   * @return {string}
   */
  formatStrWithT(str) {
    switch (typeof str) {
      case "string":
        let d = str.split(" ");

        return d[0] + "T" + d[1] + ":" + "00";

        break;
    }
  },
  /**
   * 将日期格式化为指定字符串，yyyy-mm-ddTHH:mm:00 --> yyyy-mm-dd HH:mm
   * @param {string} str
   * @function
   * @return {string}
   */
  formatStrWithSpace(str) {
    switch (typeof str) {
      case "string":
        let d = str.split("T"),
          last = d[1].split(":");

        return d[0] + " " + last[0] + ":" + last[1];

        break;
    }
  },
  /**
   * 格式化日期为对象
   * @param  {string} d 要格式的日期字符串，yyyy-mm-dd|yyyy-m-d
   * @return {object} {full: '2016-08-04', simply: '08月04日', week: '星期四'}
   */
  createDate(d) {
    let fullD, simplyD, weekD;

    fullD =
      this.formatNum(d.split("-")[0]) +
      "-" +
      this.formatNum(d.split("-")[1]) +
      "-" +
      this.formatNum(d.split("-")[2]);
    simplyD =
      this.formatNum(d.split("-")[1]) +
      "月" +
      this.formatNum(d.split("-")[2]) +
      "日";
    weekD = this.getDay(d);

    return {
      full: fullD,
      simply: simplyD,
      week: weekD
    };
  },
  /**
   * 生成当前日期后 num 天数组
   * @param  {number} num 天数
   * @return {array}      [{full: '2016-08-04', simply: '08月04日', week: '星期四'}...]
   */
  createDates(num) {
    let fullD,
      simplyD,
      weekD,
      i,
      arr = [];

    for (i = 0; i < num; i += 1) {
      fullD =
        this.formatNum(this.getSpecificDate(0, i).split("-")[0]) +
        "-" +
        this.formatNum(this.getSpecificDate(0, i).split("-")[1]) +
        "-" +
        this.formatNum(this.getSpecificDate(0, i).split("-")[2]);
      simplyD =
        this.formatNum(this.getSpecificDate(0, i).split("-")[1]) +
        "月" +
        this.formatNum(this.getSpecificDate(0, i).split("-")[2]) +
        "日";
      weekD = this.getDay(this.getSpecificDate(0, i));

      arr.push({
        full: fullD,
        simply: simplyD,
        week: weekD
      });
    }

    return arr;
  },
  /**
   * 生成一天小时整点（可指定包含半点）数组
   * @param  {number} specific 是否包含半点，true/1 包含半点
   * @return {array}           ['00:00', '01:00',...]
   */
  createTimes(specific) {
    let i,
      arr = [];

    for (i = 0; i < 24; i += 1) {
      if (specific) {
        arr.push(this.formatNum(i) + ":00");
        arr.push(this.formatNum(i) + ":30");
      } else {
        arr.push(this.formatNum(i) + ":00");
      }
    }

    return arr;
  },
  /**
   * 日期格式 getTime，yyyy-mm|m-dd|d HH:mm
   * @param  {string} d '2017-01-01 00:00'
   * @return {number}   1483200000000
   */
  getTime(d) {
    let time = !d ? new Date() : new Date(d.replace(/-/g, "/"));

    return time.getTime();
  },
  /**
   * 租车时间格式化
   * @param  {string} pickUpTime  取车时间
   * @param  {string} dropOffTime 还车时间
   * @return {string/object}      2天/{d: '2天', h: '11小时'}
   */
  formatRentDays(pickUpTime, dropOffTime) {
    let timeSpan = this.getTime(dropOffTime) - this.getTime(pickUpTime),
      days = Math.floor(timeSpan / (1000 * 60 * 60 * 24)),
      hours = Math.floor((timeSpan % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    return hours ? { d: days + "天", h: hours + "小时" } : days + "天";
  },
  /**
   * 将 yyyy-mm-dd 转换为 yyyy/mm/dd
   * @param  {string} d 要格式的日期字符串
   * @return {string}
   */
  formatDateCompatible(d) {
    return d.replace(/\-/g, "/");
  }
};
