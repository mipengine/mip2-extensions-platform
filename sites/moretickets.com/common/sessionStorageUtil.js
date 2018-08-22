/**
 * 根据传入参数个数自动判别是读还是写
 *
 * @param {*} key 保存键
 * @param {*} value 保存值
 */
function Converter (key, value) {
  if (typeof window === 'undefined' && typeof sessionStorage === 'undefined') {
    return
  };
  // Write
  if (arguments.length > 1) {
    try {
      let stringifyResult = JSON.stringify(value)
      if (/^[{[]/.test(stringifyResult)) {
        value = stringifyResult
      }
    } catch (e) {}

    value = encodeURIComponent(String(value))
      .replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent)

    key = encodeURIComponent(String(key))
      .replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent)
      .replace(/[()]/g, escape)

    try {
      sessionStorage.setItem(key, value)
    } catch (e) {
      console.log('当前模式不支持sessionStorage的API')
    }
  }

  // Read

  let result = window.sessionStorage.getItem(key)
  let decode = function (s) {
    return s.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent)
  }
  try {
    result = decode(result)
    result = JSON.parse(result)
  } catch (e) {}

  return key ? result : undefined
}

/**
 * 让某个sessionStorage项失效
 *
 * @param {*} key 保存键
 */
function remove (key) {
  return sessionStorage && sessionStorage.removeItem(key)
}
/**
 * 写入一个sessionStorage项
 *
 * @param {*} key 保存键
 * @param {*} value 保存值
 */
function set (key, value) {
  if (value === undefined || value === null) {
    console.log('(%s:%s) is invalid', key, value)
    return
  }
  return Converter(key, value)
}

/**
 * 读取一个sessionStorage项目
 *
 * @param {*} key 保存键
 */
function get (key) {
  return Converter(key)
}

/**
 * 测试是否支持sessionStorage
 */
function test () {
  let result = true
  try {
    sessionStorage.setItem('supportsessionStorage', Date.now())
    sessionStorage.removeItem('supportsessionStorage')
  } catch (error) {
    result = false
  }
  return result
}
// transfers sessionStorage from one tab to another
let sessionStorageTransfer = function (event) {
  if (!event) { event = window.event } // ie suq
  if (!event.newValue) return // do nothing if no value to work with
  if (event.key === 'getSessionStorage') {
    // another tab asked for the sessionStorage -> send it
    localStorage.setItem('sessionStorage', JSON.stringify(sessionStorage))
    // the other tab should now have it, so we're done with it.
    setTimeout(() => {
      localStorage.removeItem('sessionStorage') // <- could do short timeout as well.
    }, 10000)
    // localStorage.removeItem('sessionStorage'); // <- could do short timeout as well.
  } else if (event.key === 'sessionStorage' && !sessionStorage.getItem('sessionOId')) {
    // another tab sent data <- get it
    console.log('过来取数据:' + Date.now())
    let data = JSON.parse(event.newValue)
    for (let key in data) {
      if (key === 'sessionOId') {
        sessionStorage.setItem(key, data[key])
      }
    }
  }
}

/**
 * 因为sessionStorage 不能跨标签共享，页面组件调用这个方法，同步多标签页的sessionStorage 数据
 */
function syncSessionData () {
  console.log('过来取数据前' + sessionStorage.getItem('sessionOId'))
  // listen for changes to localStorage
  if (window.addEventListener) {
    window.addEventListener('storage', sessionStorageTransfer, false)
  } else {
    window.attachEvent('onstorage', sessionStorageTransfer)
  };
  // Ask other tabs for session storage (this is ONLY to trigger event)
  if (!sessionStorage.getItem('sessionOId')) {
    console.log('触发取数据前:' + Date.now())
    localStorage.setItem('getSessionStorage', Date.now())
    // localStorage.removeItem('supportsessionStorage');
  };
}
export {
  test,
  remove,
  set,
  get,
  syncSessionData
}
