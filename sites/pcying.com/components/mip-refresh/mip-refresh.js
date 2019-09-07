
export default class MipRefresh extends MIP.CustomElement {
  build () {

      let cTime = this.element.getAttribute('refresh-cTime');
      let newData = this.element.getAttribute('refresh-newData');
      let type = this.element.getAttribute('refresh-type');

      window.onload = djs();

      function djs(){
          if(cTime<0){
              document.getElementById("Times").innerHTML="开奖中";
              cTime--;
              if(cTime % 1 == 0){

                  var data = {type:type,issue:newData};
                  var fd = new FormData();
                  for(var i in data){
                      fd.append(i,data[i]);
                  }
                  var req = new Request("ajax.php",{
                      method:"POST",
                      body:fd,
                      mode:"cors"
                  });

                  fetch(req)
                      .then(res => res.text())
                      .then(function(res){
                          res = JSON.parse(res);
                          if(res.data==1){
                              window.location.reload();
                          }
                      })
                      .catch(function(err) {
                          console.log(err);
                      });
              }
          }else{
              document.getElementById("Times").innerHTML=formatSeconds(cTime);
              cTime--;
          }
          setTimeout(djs,1000);
      }

      function formatSeconds(value) {
          let result = '';
          let theTime = parseInt(value);
          let theTime1 = 0;
          let theTime2 = 0;
          if(theTime > 60) {
              theTime1 = parseInt(theTime/60);
              theTime = parseInt(theTime%60);
              if(theTime1 > 60) {
                  theTime2 = parseInt(theTime1/60);
                  theTime1 = parseInt(theTime1%60);
              }
          }

          if(theTime2 > 0) {
              result = MathPos(parseInt(theTime2))+":"+MathPos(parseInt(theTime1));
          }else{
              result = MathPos(parseInt(theTime1))+":"+MathPos(parseInt(theTime));
          }

          return result;
      }

      function MathPos(z){
          if(z>9){
              return z;
          }else{
              if(z<-9){
                  return z;
              }else{
                  return "0"+z;
              }
          }
      }

  }
}
