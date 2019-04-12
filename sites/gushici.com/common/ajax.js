/*
* @Author: shl
* @title: 
* @Date:   2019-04-09 14:51:26
* @Last Modified by:   shl
* @Last Modified time: 2019-04-12 14:10:00
*/
const apipath = 'https://www.gushici.com/';

function get(url,data,cb) {
  let param = '';
  for(let i in data){
    param+=i+'='+data[i]+'&';
  }
  if(param!=''){
    param = '?'+param.replace(/&$/,'');
    url = url+param;
  }
  let AJAXurl = new Request(apipath+url, {
    method: 'GET'
  })

  fetch(AJAXurl)
  .then(res=>{
    return res.json()
  })
  .then(json=>{
    cb(json)
  })
}


module.exports = {
  get
}