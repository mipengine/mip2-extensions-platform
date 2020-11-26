import './index.less'

export default class barline extends MIP.CustomElement {
  prerenderAllowed () {
    return true
  }
   build () {
	const filled = this.element.getAttribute('filled') || ''
    this.element.setAttribute('style', 'width: ' + filled + '%');
 
 
  }
}

