function addProperty (obj, properties) {
  for (let k in properties) {
    obj[k] = properties[k]
  }
}

class Toast {
  constructor () {
    this.el = document.createElement('div')
    addProperty(this.el.style, {
      position: 'fixed',
      maxWidth: '300px',
      minWidth: '100px',
      Height: '35px',
      'left': '10px',
      'display': 'none'
    })
    let bg = document.createElement('div')
    addProperty(bg.style, {
      backgroundColor: 'black',
      opacity: 0.7,
      position: 'absolute',
      width: '100%',
      height: '100%',
      borderRadius: '5px'
    })
    this.el.appendChild(bg)
    let text = document.createElement('div')
    addProperty(text.style, {
      color: 'white',
      fontSize: '14px',
      position: 'relative',
      textAlign: 'center',
      lineHeight: '35px',
      padding: '0 10px'
    })
    this.el.appendChild(text)
    this.text = text

    document.body.appendChild(this.el)
  }

  show (text, options) {
    let conf = {
      position: 'top-center',
      duration: 2000
    }
    addProperty(conf, options)
    this.text.innerText = text
    this.el.style.display = 'block'

    let screenWidth = MIP.viewport.getWidth()
    let {width} = MIP.util.rect.getElementRect(this.text)
    let left = (screenWidth - width) / 2
    this.el.style.left = left + 'px'
    if (conf.position === 'bottom-center') {
      this.el.style.bottom = '100px'
    } else {
      this.el.style.top = '100px'
    }
    setTimeout(() => {
      this.hide()
    }, conf.duration)
  }

  hide () {
    this.el.style.display = 'none'
  }
}

let toast = new Toast()

export default toast
