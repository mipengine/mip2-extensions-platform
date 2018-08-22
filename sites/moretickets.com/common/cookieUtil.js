/* eslint-disable */
import { extend } from './objectUtil';

/**
 * 根据传入参数个数自动判别是读还是写,其中remove也是写的一种
 * @param {*} key
 * @param {*} value
 * @param {*} attributes
 */
function Converter (key, value, attributes) {
  let result;
  if (typeof document === 'undefined') {
    return;
  };
    // Write
  if (arguments.length > 1) {
    attributes = extend({
      path: '/'
    }, attributes);

    if (typeof attributes.expires === 'number') {
        attributes.expires = new Date(new Date() * 1 + attributes.expires * (864e+5));
    }

    // We're using "expires" because "max-age" is not supported by IE
    attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';

    try {
      result = JSON.stringify(value);
      if (/^[\{\[]/.test(result)) {
      value = result;
      } 
    } catch (e) {}

    value = encodeURIComponent(String(value))
      .replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);

    key = encodeURIComponent(String(key))
      .replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent)
      .replace(/[\(\)]/g, escape);

    var stringifiedAttributes = '';
    for (var attributeName in attributes) {
      if (!attributes[attributeName]) {
				continue;
      }
      stringifiedAttributes += '; ' + attributeName;
      if (attributes[attributeName] === true) {
        continue;
      }

      // Considers RFC 6265 section 5.2:
      // ...
      // 3.  If the remaining unparsed-attributes contains a %x3B (";")
      //     character:
      // Consume the characters of the unparsed-attributes up to,
      // not including, the first %x3B (";") character.
      // ...
      stringifiedAttributes += '=' + attributes[attributeName].split(';')[0];
    }
    return (document.cookie = key + '=' + value + stringifiedAttributes);
  }

  // Read

  let jar = {};
  const decode = function (s) {
    return s.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);
  };
  // To prevent the for loop in the first place assign an empty array
  // in case there are no cookies at all.
  let cookies = document.cookie ? document.cookie.split('; ') : [];
  let i = 0;

  for (; i < cookies.length; i++) {
    let parts = cookies[i].split('=');
    let cookie = parts.slice(1).join('=');

    if (!this.json && cookie.charAt(0) === '"') {
      cookie = cookie.slice(1, -1);
    }

    try {
      var name = decode(parts[0]);
      cookie = decode(cookie);

      if (this.json) {
        try {
          cookie = JSON.parse(cookie);
        } catch (e) {}
      }

      jar[name] = cookie;

      if (key === name) {
        break;
      }
    } catch (e) {}
  }

  return key ? jar[key] : jar;
}

/**
 * 让某个cookie项失效
 * @param {*} key
 * @param {*} attributes
 */
function remove(key, attributes){
  Converter(key, '', extend(attributes, {
      expires: -1,
    }));
}
/**
 * 写入一个cookie项
 * @param {*} key
 * @param {*} value
 * @param {*} attributes
 */
function set(key, value, attributes) {
  return Converter(key, value, attributes);
}

/**
 * 读取一个cookie项目
 * @param {*} key
 */
function get(key){
  return Converter(key);
}
/**
 * 试着获取JSON对象
 */
function getJSON(){
  return Converter.apply({ json:true },arguments);
}
/**
 * 测试是否启用Cookie
 */
function test(){
  return navigator.cookieEnabled;
}
export {
  test,
  remove,
  set,
  get,
  getJSON
};
