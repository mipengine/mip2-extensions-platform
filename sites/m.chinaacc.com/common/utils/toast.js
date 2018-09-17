class Toast {
  constructor () {
    this.name = 'Toast'
  }
  open (params) {
    const that = this
    that.close()
    let html = `<div id="mask-toast">
      <span class="toast-text">${params.message ? params.message : ''}</span>  
    </div>`.trim()
    document.body.insertAdjacentHTML('beforeend', html)
    document.getElementById('mask-toast').addEventListener('touchmove', function (e) {
      e.preventDefault()
    })
    setTimeout(() => {
      that.close()
    }, params.hasOwnProperty('duration') ? params.duration : 1500)
  }
  close () {
    if (document.getElementById('mask-toast')) {
      document.getElementById('mask-toast').parentNode.removeChild(document.getElementById('mask-toast'))
    }
  }
}

class Loading {
  constructor () {
    this.name = 'Loading'
  }
  open () {
    this.close()
    let html = `<div id="mask-loading"></div><div id="animate-Loading"><i></i><i></i><i></i><i></i><i></i></div>`.trim()
    document.body.insertAdjacentHTML('beforeend', html)
    document.getElementById('mask-loading').addEventListener('touchmove', function (e) {
      e.preventDefault()
    })
  }
  close () {
    if (document.getElementById('mask-loading')) {
      document.getElementById('mask-loading').parentNode.removeChild(document.getElementById('mask-loading'))
    }
    if (document.getElementById('animate-Loading')) {
      document.getElementById('animate-Loading').parentNode.removeChild(document.getElementById('animate-Loading'))
    }
  }
}
export {
  Toast,
  Loading
}
