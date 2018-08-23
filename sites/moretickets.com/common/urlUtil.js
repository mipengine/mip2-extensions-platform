
function searchValueByKey (key) {
  let location = window.location
  let search = location.search
  let result = Object.assign({})
  if (search.length > 1) {
    let keyValuePair = search.substr(1)
    let searchKeyValuePairList = keyValuePair.split('&')
    searchKeyValuePairList.forEach(item => {
      let key = item.substring(item.indexOf('='), -1)
      let value = item.substr(item.indexOf('=') + 1)
      result[key] = value
    })
    return result[key]
  }
  console.log('location.search is not contain ' + key)
}
function templateCompile (str, data) {
  let _regVar = /\$\{(.*?)\}/
  // 变量渲染
  while (_regVar.test(str)) {
    try {
      let v = _regVar.exec(str)[1]
      v = v.replace(/\s/g, '')
      str = str.replace(_regVar, data[v])
    } catch (err) {
      console.error(err)
    }
  }
  return str
}
export {
  searchValueByKey,
  templateCompile
}
