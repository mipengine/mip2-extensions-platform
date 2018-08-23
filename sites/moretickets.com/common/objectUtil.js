/**
 * 合并对象属性，根据对象传参顺序，后传入的会覆盖之前属性,暂不支持深拷贝
 * 示例 extend({a:1},{a:2})
 */
/* eslint-disable */
export function extend() {
  var i = 0;
  var result = {};
  for (; i < arguments.length; i++) {
    var attributes = arguments[ i ];
    for (let key in attributes) {
      result[key] = attributes[key];
    }
  }
  return result;
}
export function isEmpty(obj){
  return obj === null || obj === 'null' || obj === undefined || obj === 'undefined' || obj === '';
}
export function obj2query(obj){
  let queryPair = [];
  if(obj){
    for (const key in obj) {
      if (obj.hasOwnProperty(key) ) {
        queryPair.push(key+"="+obj[key]);
      }
    }
  }
  return queryPair.join("&");
}

