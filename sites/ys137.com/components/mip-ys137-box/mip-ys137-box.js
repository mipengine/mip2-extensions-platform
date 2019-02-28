import './index.less'
const { CustomElement, util } = MIP

export default class MIPYs137Box extends MIP.CustomElement {
    constructor (...args) {
        super(...args)
      }
    firstInviewCallback(){
    }
    init(){
      console.log('init')
      this.myinit()
    }
    render () {
    }
    //初始化
    myinit(){
        const element = this.element
        const action = element.getAttribute('action')
        switch(action)
        {
            case 'show':
              break;
            case 'hide':
              element.style.display='none'
              break;
            case 'remove':
              element.remove()
              //element.parentNode.removeChild(el)
              break;
            default:
              element.remove()
              break;
        }
    }
    build () {
    }
   connectedCallback () {
  };
  
}
