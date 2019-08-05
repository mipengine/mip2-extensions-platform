// 检测数据
function checkData (data) {
  if (data === null || data === undefined) {
    return '--'
  }
  return data
}

export default class MIPJtFundCompare extends MIP.CustomElement {
  build () {
    let codesArr = this.element.getAttribute('codes').split(',')
    codesArr.forEach((v) => {
      this.getData(v)
    })
  }
  // 获取数据
  getData (code) {
    let fetchUrl = `https://m.cngold.org/fund/m_getFundIndustryConf.html?code=${code}`
    fetch(fetchUrl).then((res) => {
      return res.json()
    }).then((data) => {
      if (data.flag && data.data) {
        for (let i = 0; i < data.data.industryName.length; i++) {
          let name = data.data.industryName[i]
          let val = data.data.industryValue[i]
          this.writeData(name, val, code)
        }
      }
    })
  }
  // 写入数据
  writeData (name, val, code) {
    let dataObj = {
      '制造': 'made',
      '金融': 'finance',
      '房地产': 'estate',
      '信息': 'info',
      '农': 'farm',
      '批发': 'sale',
      '交通': 'traffic',
      '建筑': 'build'
    }
    if (name !== null || name !== undefined) {
      for (let i in dataObj) {
        if (name.indexOf(i) >= 0) {
          this.element.querySelector('#' + dataObj[i] + '-' + code).innerHTML = checkData(val)
        }
      }
    }
  }
}
