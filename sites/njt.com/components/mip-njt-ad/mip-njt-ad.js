export default class MIPNjtAd extends MIP.CustomElement {
  build () {
    let element = document.querySelectorAll('mip-njt-ad')[0]
    let pagename = element.getAttribute('pagename')
    let ptypeid = element.getAttribute('ptypeid')
    let pcategoryid = element.getAttribute('pcategoryid')
    let adplace = element.getAttribute('adplace').split(',')
    let clFreeSelected = []
    loadXml()
    function loadXml () {
      let formData = new FormData()
      formData.append('action', 'AllAdvertising')
      fetch('/API/pageajax.ashx', { method:'POST', body:formData}).then( function (res) {
        res.json().then( function(data){
          let adlist = data.ExtraJsonReturn
          let isLbs = false
          for (let i in adlist){
            for (let a in adplace){
              if (adlist[i].placeName === adplace[a]){
                  for (let l in adlist[i].list){
                      if ((adlist[i].list[l].pagename.length === 0|| adlist[i].list[l].pagename.indexOf(pagename) !== -1 )&&
                      (adlist[i].list[l].typeid.lengt === 0|| adlist[i].list[l].pagename.indexOf(ptypeid.toString()) !== -1 )&&
                      (adlist[i].list[l].categoryid.length === 0|| adlist[i].list[l].pagename.indexOf(pcategoryid.toString()) !== -1 )&&
                      (adlist[i].list[l].province.length >0 || adlist[i].list[l].city.length >0 )
                      ){
                          isLbs = true
                          return false
                      }
                  }
              }
            }
          }
          if (isLbs) {
            fetch('/API/IP.ashx?action=json', { method:'GET' }).then( function (ipres) {
              ipres.json().then( function(remote_ip_info){
                if(remote_ip_info){
                  if (remote_ip_info.ret === 1) {
                      for (let q in adplace) {
                          loadadm(adlist, remote_ip_info.province, remote_ip_info.city, adplace[q])
                      }
                  } else {
                      for (let w in adplace) {
                          loadadm(adlist, '', '', adplace[w])
                      }
                  }
                } else {
                  for (let e in adplace) {
                      loadadm(adlist, '', '', adplace[e])
                  }
                  let errReportStr = '<img src="https://error-report.danongchang.cn/img.aspx?Appname=njtwap&priority=10&Url=' + window.location.href + '&Errcode=njtwap' + '" />'
                  document.body.appendChild(errReportStr)
                }
              })
            })
            setTimeout( function () { checkAdmIPajax(adlist)}, 3000)
          } else {
            for (let x in adplace) {
              loadadm(adlist, '', '', adplace[x])
            }
          }
        })
      })
    }
    function loadadm(adarray, province, city, placeName){
      let ishaveinadm = 0
      for (let i in adarray){
          if (adarray[i].placeName === placeName){
            if (placeName === 'ad_t3'){
              adarray[i].list = randomad(adarray[i].list)
              let adt3html = ''
              for (let l in adarray[i].list){
                  if((adarray[i].list[l].pagename.length === 0 || adarray[i].list[l].pagename.indexOf(pagename) !== -1 )
                  &&(adarray[i].list[l].typeid.length === 0 || adarray[i].list[l].typeid.indexOf(ptypeid.toString()) !== -1 )
                  &&(adarray[i].list[l].categoryid.length === 0 || adarray[i].list[l].typeid.indexOf(pcategoryid.toString()) !== -1 )
                  &&(adarray[i].list[l].province.length === 0 || adarray[i].list[l].province.indexOf(province) !== -1 || province.indexOf(adarray[i].list[l].province) !== -1 )
                  &&(adarray[i].list[l].city.length ===0 || adarray[i].list[l].city.indexOf(city) !==-1 || city.indexOf(adarray[i].list[l].city) !== -1 )
                  ){
                      adt3html += adarray[i].list[l].adcode.split('</a>')[0]
                      adt3html += '<div>'+adarray[i].list[l].title + '</div>'
                      adt3html += '</a>'
                      ishaveinadm = 1
                  }
              }
              document.getElementById(placeName).innerHTML = adt3html
            } else {
              for (let h in adarray[i].list){
                if ((adarray[i].list[h].pagename.length === 0 || adarray[i].list[h].pagename.indexOf(pagename) !== -1 )&&
                (adarray[i].list[h].typeid.length === 0 || adarray[i].list[h].typeid.indexOf(ptypeid.toString()) !== -1 )&&
                (adarray[i].list[h].categoryid.length === 0 || adarray[i].list[h].typeid.indexOf(pcategoryid.toString()) !== -1 )&&
                (adarray[i].list[h].province.length === 0 || adarray[i].list[h].province.indexOf(province) !== -1 || province.indexOf(adarray[i].list[h].province) !== -1 )&&
                (adarray[i].list[h].city.length === 0 || adarray[i].list[h].city.indexOf(city) !== -1 || city.indexOf(adarray[i].list[h].city) !== -1 )
                ){
                    document.getElementById(placeName).innerHTML = adarray[i].list[h].adcode
                    ishaveinadm = 1
                    return false
                }
              }
            }
          }
      }
      if (ishaveinadm === 0) {
        switch (placeName) {
          case 'ad_c1':
            let clFreeitemLength = 0
            for (let i in adarray){
                if (adarray[i].placeName === 'c_free'){
                  clFreeitemLength = adarray[i].list.length
                }
            }
            let clFreeItemPosition = Math.floor(Math.random() * (clFreeitemLength))
            for (let f in clFreeSelected) {
                if (clFreeSelected[f] === clFreeItemPosition) {
                  clFreeItemPosition = Math.floor(Math.random() * (clFreeitemLength))
                }
            }
            clFreeSelected[clFreeSelected.length] = clFreeItemPosition
            for (let s in adarray){
                if (adarray[s].placeName === 'c_free'){
                  document.getElementById(placeName).innerHTML = adarray[s].list[clFreeItemPosition].adcode
                }
            }
            break
          default:
          break
        }
      }
    }
    function checkAdmIPajax (responsexml) {
      for (let i = 0; i < adplace.length; i++) {
        loadadm(responsexml, '', '', adplace[i])
      }
      let errReportStr =
        '<img src="https://error-report.danongchang.cn/img.aspx?Appname=njtwap&priority=5&Url=' +
        window.location.href +
        '&Errcode=admipajax" />'
        document.body.appendChild(errReportStr)
    }
    function randomad(arr){
      for (let i = 0, len = arr.length; i < len; i++ ) {
        let rand = parseInt(Math.random()*len)
        let temp = arr[rand]
        arr[rand] = arr[i]
        arr[i] = temp
      }
      return arr
    }
  }
}
