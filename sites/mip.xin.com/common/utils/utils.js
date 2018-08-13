let util = MIP.util
let CustomStorage = util.customStorage
let storage = new CustomStorage(0)
// 存储
export const setLocalStorage = function (key, value) {
  if (value) {
    storage.set(key, value)
  }
}
//获取
export const getLocalStorage = function (key) {
  let value = ''
  if (key) {
    value = storage.get(key) === null ? '' : storage.get(key)
  }
  return value
}
// 删除缓存
export const removeLocalStorage = function (key) {
  storage.rm(key)
}
// 获取车辆图片信息
export const getCarImgInfo = function () {
  let carImgInfo = JSON.parse(getLocalStorage('carImgInfo'))
  return carImgInfo
}
// 获取carid
export const getCarId = function () {
  let carid = MIP.getData('query').carId || MIP.getData('query').carid
  return carid
}

// 获取cityid
export const getCityId = function () {
  let cityid = JSON.parse(getLocalStorage('currentCity')).cityid
  return cityid
}

// 简单对象序列化
export const serialize = (params) => {

  if (typeof params === 'string') {
    return params
  }
  let query = ''
  for (let key in params) {
    // 浏览器会丢失部分值所以做一下转化
    query += `${key}=${encodeURIComponent(params[key])}&`
  }
  // 去掉最后一个 &
  query = query.slice(0, query.length - 1)
  return query
}
// 获取query
export const getQuery = function () {
  let query = MIP.getData('query')
  return query
}
