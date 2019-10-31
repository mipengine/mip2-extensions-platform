import './index.less'

export default class MIPJtStockCalendar extends MIP.CustomElement {
  build () {
    document.getElementById('time_box').onclick = function (e) {
      let target = e.target || e.srcElement
      let id = ''
      if (target.nodeName.toLowerCase() === 'li') {
        id = target.getAttribute('id')
        loadCalendar(id, id)
      } else if (target.parentNode.nodeName.toLowerCase() === 'li') {
        id = target.parentNode.getAttribute('id')
        loadCalendar(id, id)
      }
    }

    // 加载选中日期的数据
    function loadCalendar (dateStr) {
      try {
        fetch('https://m.cngold.org/stock/m_info_xg_rl_' + dateStr + '.html').then(function (res) {
          return res.text()
        }).then(function (text) {
          let data = JSON.parse(text)
          if (data.flag) {
            if (data.data !== null || data.data !== undefined) {
              // 选中类名处理
              let liArr = document.getElementById('time_box').getElementsByTagName('li')
              for (let i = 0; i < liArr.length; i++) {
                liArr[i].classList.remove('on')
              }
              document.getElementById(dateStr).classList.add('on')
              console.log(11)
              // 申购数
              document.getElementById('sg').innerHTML = data.data.sg ? data.data.sg : 0
              // 上市数
              document.getElementById('ss').innerHTML = data.data.ss ? data.data.ss : 0

              // 申购列表
              if (data.data.subscribeCalendarsList !== null && data.data.subscribeCalendarsList.length > 0) {
                let html = ''
                let listArr = data.data.subscribeCalendarsList
                for (let i = 0; i < listArr.length; i++) {
                  html += '<p><a href="https://m.cngold.org/stock/m_info_xg_sg_' +
                    (listArr[i].stockCode === null || listArr[i].stockCode === '' ? 0 : listArr[i].stockCode) +
                    '.html" title="' +
                    (listArr[i].shortName === null || listArr[i].shortName === '' ? '' : listArr[i].shortName) +
                    '" class="blue">' +
                    (listArr[i].shortName === null || listArr[i].shortName === '' ? '' : listArr[i].shortName) +
                    '(' + (listArr[i].stockCode === null || listArr[i].stockCode === '' ? 0 : listArr[i].stockCode) +
                    ')</a></p>' +
                    '<p><span class="gray">申购代码</span>  <span class="shuju_sp2 black">' +
                    (listArr[i].subscribeCode === null || listArr[i].subscribeCode === '' ? '' : listArr[i].subscribeCode) +
                    '</span>   <span class="shuju_sp1 gray">发行价</span><span class="shuju_sp3 red">' +
                    (listArr[i].issuePrice === null || listArr[i].issuePrice === '' ? '' : listArr[i].issuePrice) +
                    '</span></p>'
                }
                document.getElementById('sg_list').innerHTML = html
              } else {
                document.getElementById('sg_list').innerHTML = '<p>无</p>'
              }

              // 上市列表
              if (data.data.auditmarketCalendarsList !== null && data.data.auditmarketCalendarsList.length > 0) {
                let htmlSs = ''
                let calArr = data.data.auditmarketCalendarsList
                for (let i = 0; i < calArr.length; i++) {
                  htmlSs += '<p><a href="https://m.cngold.org/stock/m_info_xg_sg_' +
                    (calArr[i].stockCode === null || calArr[i].stockCode === '' ? 0 : calArr[i].stockCode) +
                    '.html" title="' +
                    (calArr[i].shortName === null || calArr[i].shortName === '' ? '' : calArr[i].shortName) +
                    '" class="blue">' +
                    (calArr[i].shortName === null || calArr[i].shortName === '' ? '' : calArr[i].shortName) +
                    '(' + (calArr[i].stockCode === null || calArr[i].stockCode === '' ? 0 : calArr[i].stockCode) +
                    ')</a></p>'
                }
                document.getElementById('ss_list').innerHTML = htmlSs
              } else {
                document.getElementById('ss_list').innerHTML = '<p>无</p>'
              }

              // 中签号列表
              if (data.data.successNumberCalendarsList !== null && data.data.successNumberCalendarsList.length > 0) {
                let htmlZqh = ''
                let numArr = data.data.successNumberCalendarsList
                for (let i = 0; i < numArr.length; i++) {
                  htmlZqh += '<p><a href="https://m.cngold.org/stock/m_info_xg_sg_' +
                    (numArr[i].stockCode === null || numArr[i].stockCode === '' ? 0 : numArr[i].stockCode) +
                    '.html" title="' +
                    (numArr[i].shortName === null || numArr[i].shortName === '' ? '' : numArr[i].shortName) +
                    '" class="blue">' + (numArr[i].shortName === null || numArr[i].shortName === '' ? '' : numArr[i].shortName) +
                    '(' + (numArr[i].stockCode === null || numArr[i].stockCode === '' ? 0 : numArr[i].stockCode) +
                    ')</a></p>' + '<p><span class="gray">中签号</span>'

                  if (numArr[i].luckyNumber4 !== null) {
                    htmlZqh += '<span class="shuju_sp1 black">末"四"位数</span> <span class="red">' +
                      (numArr[i].luckyNumber4 === null ? '' : numArr[i].luckyNumber4) + ' </span>'
                  } else {
                    htmlZqh += '<span class="shuju_sp1 black">' +
                      (numArr[i].luckyNumber === null ? '' : numArr[i].luckyNumber) + '</span>'
                  }
                  htmlZqh += '<span class="fr shuju_sp4">' +
                    '<a href="https://m.cngold.org/stock/m_info_xg_sg_' +
                    (numArr[i].stockCode === null ? 0 : numArr[i].stockCode) +
                    ' .html" title="">更多</a></span></p>'
                }
                document.getElementById('zqh_list').innerHTML = htmlZqh
              } else {
                document.getElementById('zqh_list').innerHTML = '<p>无</p>'
              }

              // 中签率列表
              if (data.data.successRateCalendarsList !== null && data.data.successRateCalendarsList.length > 0) {
                let htmlZql = ''
                let rateArr = data.data.successRateCalendarsList
                for (let i = 0; i < rateArr.length; i++) {
                  htmlZql += '<p><a href="https://m.cngold.org/stock/m_info_xg_sg_' +
                    (rateArr[i].stockCode === null ? 0 : rateArr[i].stockCode) +
                    '.html" title="' +
                    (rateArr[i].shortName === null ? '' : rateArr[i].shortName) +
                    '" class="blue"><span class="fr">详情</span>' +
                    (rateArr[i].shortName === null ? '' : rateArr[i].shortName) + '(' +
                    (rateArr[i].stockCode === null ? 0 : rateArr[i].stockCode) + ')</a></p>'
                }
                document.getElementById('zql_list').innerHTML = htmlZql
              } else {
                document.getElementById('zql_list').innerHTML = '<p>无</p>'
              }
            }
          }
        })
      } catch (e) {
        console.error('获取数据错误异常' + e)
      }
    }
  }
}
