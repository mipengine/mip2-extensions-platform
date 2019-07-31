import './index.less'
export default class MIPExample extends MIP.CustomElement {
  build () {
    let nick = this.element.getAttribute('popContact'), 
		  tel = this.element.getAttribute('popTel'), 
		  con = this.element.getAttribute('popInfo'), 
		  but = this.element.getAttribute('popButton'), 
      tid = this.element.getAttribute('projectId'), 
      laveMsg = this.element.getAttribute('laveMsg')
    let vm = this; 
    document.getElementById(but).onclick = function () { 
      let name = document.getElementById(nick).innerText.replace(/\s*/g,'') 
      let phone = document.getElementById(tel).innerText.replace(/\s*/g,'') 
      let conten = document.getElementById(con).innerText.replace(/\s*/g,'') 
      let  isphone = /^0?1[3|4|5|7|8|9][0-9]\d{8}$/ 
      if (nick !== '') { 
        if (name === '') { 
          document.getElementById(nick).setAttribute('placeholder','请输入姓名')
          document.getElementById(nick).style.borderColor='rgb(255, 0, 0)'
          return
        } else { 
          document.getElementById(nick).style.borderColor='rgb(210, 210, 210)'
        }
        if (phone === "") { 
          document.getElementById(tel).setAttribute('placeholder','请输入电话')
          document.getElementById(tel).style.borderColor='rgb(255, 0, 0)'
          return
        }
        if(!isphone.test(phone)) { 
          document.getElementById(tel).innerText = ''
          document.getElementById(tel).setAttribute('placeholder','请输入正确的联系方式')
          document.getElementById(tel).style.borderColor='rgb(255, 0, 0)'  
          return
        }else { 
          document.getElementById(tel).style.borderColor='rgb(210, 210, 210)'
        }
        let MeData = vm.GetIsTuiguang(tid,conten)
        // 提交参数
        let option = {
          tid: MeData.Pid,
          type: 'addMsg',
          tel: phone,
          popInfo: MeData.MeInfo,
          popContact: name  
        }
        
        // 提交请求
        let AJAXurl = 'https://m.53.com.cn/common/mipwebdo.ashx'
        let AJAXdata = `tid=${option.tid}&type=${option.type}&tel=${option.tel}&popInfo=${option.popInfo}&popContact=${option.popContact}`
        	fetch(AJAXurl, {
            method: "POST",
        		headers:{
        			'Content-Type': 'application/x-www-form-urlencoded'
        		},
            body: AJAXdata
          }).then(function(response) {
            return response.json()
        	}).then(function (res) {
            console.log(res);
            if(res !== ''){
              document.getElementById(nick).innerHTML = ""
              document.getElementById(tel).innerHTML = ""
              document.getElementById(con).innerHTML = ""
              document.getElementById(laveMsg).innerHTML = '留言成功!'
            }
          },function(error) {
        		
        	})
          // let AJAXurl = `https://m.53.com.cn/common/mipwebdo.ashx?tid=${option.tid}&type=${option.type}&tel=${option.tel}&popInfo=${option.popInfo}&popContact=${option.popContact}` 
          // let req = new Request(AJAXurl, { 
          //   headers: new Headers({
          //     'Accept': 'application/json', 
          //     'Content-Type': 'application/x-www-form-urlencoded' 
          //   }), 
          //   method: 'POST', 
          //   cache: 'reload', 
          // }) 
          // fetch(req).then(function (response) { 
          //   return response.json() 
          // }).then(function (res) { 
          //   // 成功回调 
          //   document.getElementById(nick).innerHTML = ""
          //   document.getElementById(tel).innerHTML = ""
          //   document.getElementById(con).innerHTML = ""
          //   if (res) {
          //     console.log('留言成功') 
          //   }else {
          //     console.log('留言失败3') 
          //   } 
          // }) 
      }
    }
  }
  GetIsTuiguang(pid, meinfo) {
    let Data = new Object() 
    let lsvalue = localStorage.getItem("IsTuiguang") 
    if(lsvalue) { 
      Data.Pid = 2944621 
      Data.MeInfo = lsvalue 
    }
    else {
      Data.Pid = pid 
      Data.MeInfo = meinfo 
    }
    return Data 
  }

} 
