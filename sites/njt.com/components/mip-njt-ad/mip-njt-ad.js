export default class MIPNjtAd extends MIP.CustomElement {
  build () {
    let element = document.querySelectorAll('mip-njt-ad')[0]
    let ajaxIp = element.getAttribute('ajaxIp') ? element.getAttribute('ajaxIp') : '/API/IP.ashx?action=js'
    let ajaxJs = element.getAttribute('ajaxJs') || '/adm/18.js'
    let pagename = element.getAttribute('pagename')
    let ptypeid = element.getAttribute('ptypeid')
    let pcategoryid = element.getAttribute('pcategoryid')
    let adplace = element.getAttribute('adplace').split(",")
    let cl_free_selected = new Array()
    let remote_ip_info = false
    loadXml()
    function loadXml () {
      var formData = new FormData()
      formData.append('action' , 'AllAdvertising')
      fetch('/API/guest_getInfo.ashx',{method:"POST",body:formData}).then(function (res) {
        res.json().then(function(data){
          var adlist = data.ExtraJsonReturn
          var isLbs = false
          for(var i in adlist){
            for(var a in adplace){
              if(adlist[i].placeName == adplace[a]){
                  for(var l in adlist[i].list){
                      if((adlist[i].list[l].pagename.length==0||adlist[i].list[l].pagename.indexOf(pagename)!=-1)
                      &&(adlist[i].list[l].typeid.length==0||adlist[i].list[l].pagename.indexOf(ptypeid.toString())!=-1)
                      &&(adlist[i].list[l].categoryid.length==0||adlist[i].list[l].pagename.indexOf(pcategoryid.toString())!=-1)
                      &&(adlist[i].list[l].province.length>0||adlist[i].list[l].city.length>0)
                      ){
                          isLbs = true
                          return false
                      }
                  }
              }
            }
          }
          if (isLbs) {
            fetch('/API/IP.ashx?action=js',{method:"GET"}).then(function (ipres) {
              ipres.text().then(function(ipdata){
                ipdata = ipdata.split("=")[1].split(";")[0]
                if(!!ipdata){
                  remote_ip_info = JSON.parse(ipdata)
                  admipajaxsuccess = true
                  if (remote_ip_info.ret == 1) {
                      for (x in adplace) {
                          loadadm(adlist, remote_ip_info.province, remote_ip_info.city, adplace[x], bodywidth);
                      }
                  }
                  else {
                      for (x in adplace) {
                          loadadm(adlist, "", "", adplace[x], bodywidth)
                      }
                  }
                }else{
                  for (x in adplace) {
                      loadadm(adlist, "", "", adplace[x], bodywidth)
                  }
                  var err_report_str = '<img src="https://error-report.danongchang.cn/img.aspx?Appname=njtwap&priority=10&Url=' + window.location.href + '&Errcode=njtwap' + '" />';
                  document.body.appendChild(err_report_str)
                }
              })
            })
            setTimeout(function () { checkAdmIPajax(adlist)}, 3000)
          }else {
            for (var x in adplace) {
              loadadm(adlist, "", "", adplace[x])
            }
          }
        })
      })
    }
    function loadadm(adarray, province, city, placeName){
      var ishaveinadm = 0
      for(var i in adarray){
          if(adarray[i].placeName == placeName){
            if(placeName == "ad_t3"){
                adarray[i].list = randomad(adarray[i].list)
                var adt3html = ''
                for(var l in adarray[i].list){
                    if((adarray[i].list[l].pagename.length==0||adarray[i].list[l].pagename.indexOf(pagename)!=-1)
                    &&(adarray[i].list[l].typeid.length==0||adarray[i].list[l].typeid.indexOf(ptypeid.toString())!=-1)
                    &&(adarray[i].list[l].categoryid.length==0||adarray[i].list[l].typeid.indexOf(pcategoryid.toString())!=-1)
                    &&(adarray[i].list[l].province.length==0||adarray[i].list[l].province.indexOf(province)!=-1 || province.indexOf(adarray[i].list[l].province)!=-1)
                    &&(adarray[i].list[l].city.length==0||adarray[i].list[l].city.indexOf(city)!=-1 || city.indexOf(adarray[i].list[l].city)!=-1)
                    ){
                        adt3html+=adarray[i].list[l].adcode.split("</a>")[0]
                        adt3html+="<div>"+adarray[i].list[l].title+"</div>"
                        adt3html+="</a>"
                        ishaveinadm = 1
                    }
                }
                document.getElementById(placeName).innerHTML = adt3html
            }else{
                for(var l in adarray[i].list){
                    if((adarray[i].list[l].pagename.length==0||adarray[i].list[l].pagename.indexOf(pagename)!=-1)
                    &&(adarray[i].list[l].typeid.length==0||adarray[i].list[l].typeid.indexOf(ptypeid.toString())!=-1)
                    &&(adarray[i].list[l].categoryid.length==0||adarray[i].list[l].typeid.indexOf(pcategoryid.toString())!=-1)
                    &&(adarray[i].list[l].province.length==0||adarray[i].list[l].province.indexOf(province)!=-1 || province.indexOf(adarray[i].list[l].province)!=-1)
                    &&(adarray[i].list[l].city.length==0||adarray[i].list[l].city.indexOf(city)!=-1 || city.indexOf(adarray[i].list[l].city)!=-1)
                    ){
                        document.getElementById(placeName).innerHTML = adarray[i].list[l].adcode;
                        ishaveinadm = 1
                        return false
                    }
                }
            }
          }
      }
      if (ishaveinadm === 0) {
        var rnd = Math.floor(Math.random() * 100)
        switch (placeName) {
            case "ad_c1":
                var cl_free_itemLength = 0
                for(var i in adarray){
                    if(adarray[i].placeName=="c_free"){
                        cl_free_itemLength = adarray[i].list.length
                    }
                }
                var cl_free_itemPosition = Math.floor(Math.random() * (cl_free_itemLength))
                Outer:
                for (x in cl_free_selected) {
                    if (cl_free_selected[x] === cl_free_itemPosition) {
                        cl_free_itemPosition = Math.floor(Math.random() * (cl_free_itemLength))
                        continue Outer
                    }
                }
                cl_free_selected[cl_free_selected.length] = cl_free_itemPosition
                for(var i in adarray){
                    if(adarray[i].placeName == "c_free"){
                      document.getElementById(placeName).innerHTML = adarray[i].list[cl_free_itemPosition].adcode
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
      for (var i = 0,len = arr.length;i < len; i++ ) {
        var rand = parseInt(Math.random()*len)
        var temp = arr[rand]
        arr[rand] = arr[i]
        arr[i] = temp
      }
      return arr
    }
  }
}
