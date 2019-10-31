/* eslint-disable */
/**
 * 根据传入参数个数自动判别是读还是写
 * @param {*} key
 * @param {*} value
 * @param {*} attributes
 */
function Converter (key, value,method) {
  let result;
  if (typeof window === 'undefined' && typeof localStorage === 'undefined') {
    return;
  };
  // Write
  if (arguments.length > 1) {
    try {
      result = JSON.stringify(value);
      if (/^[{[]/.test(result)) {
        value = result;
      }
    } catch (e) {}

    value = encodeURIComponent(String(value))
      .replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);

    key = encodeURIComponent(String(key))
      .replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent)
      .replace(/[()]/g, escape);
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      console.log('当前模式不支持localStorage的API');
    }
    return;
  }

  // Read

  result = window.localStorage.getItem(key);
  var decode = function (s) {
    return s.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);
  };
  try {
    result = decode(result);
    result = JSON.parse(result);
  } catch (e) {}

  return key ? result : undefined;
}

/**
 * 让某个localStorage项失效
 * @param {*} key
 * @param {*} attributes
 */
function remove(key) {
   return localStorage && localStorage.removeItem(key);
}
/**
 * 写入一个localStorage项
 * @param {*} key
 * @param {*} value
 * @param {*} attributes
 */
function set(key,value){
  if(value == undefined || value == null){
    console.log('(%s:%s) is invalid',key,value);
    return;
  }
  return Converter(key, value);
}

/**
 * 读取一个localStorage项目
 * @param {*} key
 */
function get(key){
  return Converter(key);
}
/**
 * 试着获取JSON对象
 */
function getJSON(){
    return Converter.apply({json:true},arguments);
}
/**
 * 测试是否支持LocalStorage
 */
function test(){
  var result = true;
  try {
    localStorage.setItem('supportLocalStorage', 'ok');
    localStorage.removeItem('supportLocalStorage');
  } catch (error) {
    result = false;
  }
  return result;
}
export {
  test,
  remove,
  set,
  get
};