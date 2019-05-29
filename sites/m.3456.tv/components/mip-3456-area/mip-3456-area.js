import './index.less'

export default class MIP3456Area extends MIP.CustomElement {
  build() {
    var pvcList = require('./data/data');
    var pvcTag = this.element.querySelector('#pvc');
    var cityTag = this.element.querySelector('#city');

    pvcList.forEach(element => {
      var option = document.createElement("option");
      option.value = element.val;
      option.text = element.name;
      pvcTag.add(option);
    });

    pvcList[0].cityList.forEach(element => {
      var option = document.createElement("option");
      option.value = element.name;
      option.text = element.name;
      cityTag.add(option);
    });

    
    pvcTag.onchange = function () {
      cityTag.innerHTML = '';

      var cityList = pvcList[pvcTag.selectedIndex].cityList;    

      cityList.forEach(element => {
        var option = document.createElement("option");
        option.value = element.name;
        option.text = element.name;
        cityTag.add(option);
      });      
    };

  }
}
