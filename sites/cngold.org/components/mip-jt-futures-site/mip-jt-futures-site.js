export default class MIPJtFuturesSite extends MIP.CustomElement {
  build () {
    let type = this.element.getAttribute('type')
    let numParams = this.element.getAttribute('num-params')
    let num1 = numParams.split(',')[0]
    let num2 = numParams.split(',')[1]
    let containerId = this.element.getAttribute('container-id')
    if (type === 'getList') {
      let cityName = this.element.getAttribute('city-name')
      getList(num1, num2, cityName, containerId)
    } else if (type === 'search') {
      let inputId = this.element.getAttribute('input-id')
      document.getElementById(inputId).addEventListener('input', function () {
        search(num1, num2, this.value, containerId)
      })
    }
    // 根据参数获取期货网点列表
    function getList (lng, lat, cityName, listId) {
      let fetchUrl = 'https://m.cngold.org/futures/m_getDistance.html?Longitude=' + lng + '&Latitude=' + lat + '&cityName=' + cityName
      fetch(fetchUrl).then(function (res) {
        return res.json()
      }).then(function (data) {
        if (data.flag && data.data) {
          let str = ''
          let dataList = data.data
          let provinceIds = '0'
          let cityIds = '0'

          if (data.msg.indexOf(';') !== '-1') {
            provinceIds = data.msg.split(';')[0]
            cityIds = data.msg.split(';')[1]
          }
          if (dataList.length > 0) {
            for (let i = 0; i < dataList.length; i++) {
              let index = i + 1
              str += '<dl class="wd_content_dl"><dt class="clearfix mgLR30">' +
                '<a href="https://m.cngold.org/futures/m_wangdian' + dataList[i].id +
                '.html" title="' + dataList[i].name + '">' + index + '. ' + dataList[i].name +
                '</a></dt><dd class="con mgLR30"><a href="https://m.cngold.org/futures/m_wangdian' + dataList[i].id +
                '.html" title="' + dataList[i].name + '">' + dataList[i].address +
                '</a></dd><dd class="lianxi mgLR30">' +
                '<a href="tel:' + (dataList[i].telephone ? dataList[i].telephone : '暂无号码') + '" title="' + dataList[i].name +
                '" class="dianhua"><i></i>电话</a>' +
                '<em></em><a href="https://m.cngold.org/futures/m_wangdian' + dataList[i].id +
                '.html" title="' + dataList[i].name + '" class="xiangqing">' +
                '<i></i>详情</a></dd></dl>'
            }
          }
          str += '<div class="view_more"><a href="https://m.cngold.org/futures/m_wangdian_0_' + provinceIds + '_' + cityIds +
            '.html" title="查看列表结果" class="chakan">查看列表结果<i class="icon"></i></a></div>'
          document.getElementById(listId).innerHTML = str
        }
      })
    }
    // 搜索期货公司
    function search (provinceId, cityId, val, resid) {
      let len = val.length
      if (len > 0) {
        let fetchUrl = 'https://m.cngold.org/futures/m_getCompany.html?companyVal=' + val
        fetch(fetchUrl).then(function (res) {
          return res.json()
        }).then(function (data) {
          document.getElementById(resid).innerHTML = ''
          if (data.flag) {
            let dataList = data.data
            let str = '<ul>'
            for (let i = 0; i < dataList.length; i++) {
              str += '<li><a href="https://m.cngold.org/futures/m_wangdian_' +
                dataList[i].id + '_' + provinceId + '_' + cityId + '.html" title="' +
                dataList[i].shortName + '">' + dataList[i].shortName + '</a></li>'
            }
            str += '</ul>'
            document.getElementById(resid).innerHTML = str
            document.getElementById(resid).style.display = 'block'
          } else {
            document.getElementById(resid).style.display = 'none'
          }
        })
      } else {
        document.getElementById(resid).style.display = 'none'
      }
    }
  }
}
