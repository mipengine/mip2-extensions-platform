export default class MIPJtEnergySitelist extends MIP.CustomElement {
  build () {
    let lng = this.element.getAttribute('lng')
    let lat = this.element.getAttribute('lat')
    let city = this.element.getAttribute('city')

    this.getList(lng, lat, city)
    this.getOilPrice(lng, lat, city)
  }
  // 根据经纬度获取加油站网点列表
  getList (lng, lat, city) {
    let fetchUrl = `https://m.cngold.org/energy/m_getDistance.html?Longitude=${lng}&Latitude=${lat}&cityName=${city}`
    fetch(fetchUrl).then((res) => {
      return res.json()
    }).then((data) => {
      let str = ''
      let dataList = data.data
      let provinceIds = '0'
      let cityIds = '0'
      if (data.msg !== null && data.msg !== '' && data.msg !== undefined) {
        provinceIds = data.msg.split(';')[0]
        cityIds = data.msg.split(';')[1]
      }
      if (data.flag && dataList.length > 0) {
        provinceIds = dataList[0].companyId
        cityIds = dataList[0].cityId

        for (let i = 0; i < dataList.length; i++) {
          let index = i + 1
          if (index < 5) {
            str += `<dl class="jyz_content_dl mglr30">
                <dt class="clearfix">
                  <a href="https://m.cngold.org/energy/m_jyzwd${dataList[i].id}.html" title="${dataList[i].name}">${index}.${dataList[i].name}</a>
                </dt>
                <dd class="con">
                  <a href="https://m.cngold.org/energy/m_jyzwd${dataList[i].id}.html" title="${dataList[i].name}">${dataList[i].adress}</a>
                </dd>
                <dd class="lianxi">
                  <a href="tel:${dataList[i].telephone ? dataList[i].telephone : '暂无号码'}" title="${dataList[i].name}" class="dianhua"><i class="icon5"></i>电话</a>
                  <em class="icon"></em>
                  <a href="https://m.cngold.org/energy/m_jyzwd${dataList[i].id}.html" title="${dataList[i].name}" class="xiangqing"><i class="icon5"></i>详情</a>
                </dd>
              </dl>`
          }
        }
        str += `<div class="view_more"><a href="https://m.cngold.org/energy/m_jyzwd_${provinceIds}_${cityIds}.html" title="查看列表结果">查看列表结果<i class="icon"></i></a></div>`
        this.element.querySelector('#site-list').innerHTML = str
      }
    })
  }
  // 获取今日油价
  getOilPrice (lng, lat, city) {
    if (lng !== '' && lat !== '') {
      let fetchUrl = `https://m.cngold.org/energy/m_getoilPrice.html?Longitude=${lng}&Latitude=${lat}&cityName=${city}`
      fetch(fetchUrl).then((res) => {
        return res.json()
      }).then((data) => {
        let str = '<p class="jryj"><i class="icon5"></i>今日油价:'
        let dataMap = data.data
        for (let key in dataMap) {
          if (key === 'ocpch90') {
            str += `90#<span>${dataMap[key].price}元</span>`
          } else if (key === 'ocpch93') {
            str += `93#<span>${dataMap[key].price}元</span>`
          } else if (key === 'ocpch97') {
            str += `97#<span>${dataMap[key].price}元</span>`
          } else if (key === 'ocpch0') {
            str += `0#<span>${dataMap[key].price}元</span>`
          }
        }
        str += '</p>'
        this.element.querySelector('#oil-data').innerHTML = str
      })
    }
  }
}
