import * as cookieUtil from './cookieUtil'
import * as localStorageUtil from './localStorageUtil'
/* eslint-disable */
/**
 * 适配器Set 方法
 * @param {*} key
 * @param {*} value
 * @param {*} attributes
 */
function set(key, value, attributes){
  if(value == undefined || value == null){
    console.log('(%s:%s) is invalid',key,value);
    return;
  }
  if (localStorageUtil.test()){ // 如果支持本地存储，现代浏览器支持，但是safari的无痕模式不支持
    localStorageUtil.set(key, value);
  } else if (cookieUtil.test()){ // 如果支持cookie，所有浏览器支持，除非禁用
    cookieUtil.set(key, value, attributes);
  } else {
    console.log('浏览器禁用cookie,为了正常的浏览,请开启。');
  }
}
/**
 * 适配器Get方法
 * @param {*} key
 */
function get(key){
  // 如果支持本地存储，现代浏览器支持，但是safari的无痕模式不支持
  if (localStorageUtil.test()) {
    return localStorageUtil.get(key);
  // 如果支持cookie，所有浏览器支持，除非禁用
  } else if (cookieUtil.test()) {
    return cookieUtil.get(key);
  } else {
    console.log('浏览器禁用cookie,为了正常的浏览,请开启。');
  }
}
/**
 * 适配器Remove方法
 * @param {*} key 
 */
function remove(key,attributes){
  // 如果支持本地存储，现代浏览器支持，但是safari的无痕模式不支持
  if (localStorageUtil.test()){
    localStorageUtil.remove(key);
  }
  if (cookieUtil.test()) { // 如果支持cookie，所有浏览器支持，除非禁用
    cookieUtil.remove(key, attributes);
  } else{
    console.log('浏览器禁用cookie,为了正常的浏览,请开启。');
  }
}
//适配器存储
export {
  remove,
  set,
  get,
};
