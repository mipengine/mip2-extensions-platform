import './index.less'

export default class MIPHualvfingerprint extends MIP.CustomElement {
  constructor (element) {
    super(element)
    this.defaultOptions = {
      preprocessor: null,
      audio: {
        timeout: 1000,
        // On iOS 11, audio context can only be used in response to user interaction.
        // We require users to explicitly enable audio fingerprinting on iOS 11.
        // See https://stackoverflow.com/questions/46363048/onaudioprocess-not-called-on-ios11#46534088
        excludeIOS11: true
      },
      fonts: {
        swfContainerId: 'fingerprintjs2',
        swfPath: 'flash/compiled/FontList.swf',
        userDefinedFonts: [],
        extendedJsFonts: false
      },
      screen: {
        // To ensure consistent fingerprints when users rotate their mobile devices
        detectScreenOrientation: true
      },
      plugins: {
        sortPluginsFor: [/palemoon/i],
        excludeIE: false
      },
      extraComponents: [],
      excludes: {
        // Unreliable on Windows, see https://github.com/Valve/fingerprintjs2/issues/375
        'enumerateDevices': true,
        // devicePixelRatio depends on browser zoom, and it's impossible to detect browser zoom
        'pixelRatio': true,
        // DNT depends on incognito mode for some browsers (Chrome) and it's impossible to detect incognito mode
        'doNotTrack': true,
        // uses js fonts already
        'fontsFlash': true
      },
      NOT_AVAILABLE: 'not available',
      ERROR: 'error',
      EXCLUDED: 'excluded'
    }
    this.components = [
      { key: 'userAgent', getData: this.UserAgent },
      { key: 'webdriver', getData: this.webdriver },
      { key: 'language', getData: this.languageKey },
      { key: 'colorDepth', getData: this.colorDepthKey },
      { key: 'deviceMemory', getData: this.deviceMemoryKey },
      { key: 'pixelRatio', getData: this.pixelRatioKey },
      { key: 'hardwareConcurrency', getData: this.hardwareConcurrencyKey },
      { key: 'screenResolution', getData: this.screenResolutionKey },
      { key: 'availableScreenResolution', getData: this.availableScreenResolutionKey },
      { key: 'timezoneOffset', getData: this.timezoneOffset },
      { key: 'timezone', getData: this.timezone },
      { key: 'sessionStorage', getData: this.sessionStorageKey },
      { key: 'localStorage', getData: this.localStorageKey },
      { key: 'indexedDb', getData: this.indexedDbKey },
      { key: 'addBehavior', getData: this.addBehaviorKey },
      { key: 'openDatabase', getData: this.openDatabaseKey },
      { key: 'cpuClass', getData: this.cpuClassKey },
      { key: 'platform', getData: this.platformKey },
      { key: 'doNotTrack', getData: this.doNotTrackKey },
      { key: 'plugins', getData: this.pluginsComponent },
      { key: 'canvas', getData: this.canvasKey },
      { key: 'webgl', getData: this.webglKey },
      { key: 'webglVendorAndRenderer', getData: this.webglVendorAndRendererKey },
      { key: 'adBlock', getData: this.adBlockKey },
      { key: 'hasLiedLanguages', getData: this.hasLiedLanguagesKey },
      { key: 'hasLiedResolution', getData: this.hasLiedResolutionKey },
      { key: 'hasLiedOs', getData: this.hasLiedOsKey },
      { key: 'hasLiedBrowser', getData: this.hasLiedBrowserKey },
      { key: 'touchSupport', getData: this.touchSupportKey },
      { key: 'fonts', getData: this.jsFontsKey, pauseBefore: true },
      { key: 'fontsFlash', getData: this.flashFontsKey, pauseBefore: true },
      { key: 'audio', getData: this.audioKey },
      { key: 'enumerateDevices', getData: this.enumerateDevicesKey }
    ]
    this.hasConsole = typeof console !== 'undefined'
    this.fpCacheKey = 'fp2'
    this.trackUrl = '//hualv.cn-beijing.log.aliyuncs.com/logstores/hualv-fingerprint2-test/track.gif?APIVersion=0.6.0'
    this.Fingerprint2 = {
      'VERSION': '2.1.0'
    }
  }
  build () {
    // detect if object is array
    // only implement if no native implementation is available
    this.init('Fingerprint2', this, this.arrayPropertyBind)
    this.Fingerprint2.x64hash128 = this.x64hash128
    this.Fingerprint2.get = this.Fingerprint2get
    this.Fingerprint2.getPromise = this.Fingerprint2getPromise
    this.Fingerprint2.getV18 = this.Fingerprint2getV18
    setTimeout(name => {
      let sessionId = this.cookie('hl.guid')
      let murmur = this.cache(this.fpCacheKey)
      if (murmur) {
        this.send({
          duration: 0,
          fingerprint: murmur,
          sessionId: sessionId,
          type: 'cache'
        })
      } else {
        try {
          this.fp(data => {
            data['sessionId'] = sessionId
            data['type'] = 'fp'
            this.send(data)
          })
        } catch (error) {
          this.guid(data => {
            data['sessionId'] = sessionId
            data['type'] = 'guid'
            data['err'] = error
            this.send(data)
          })
        }
      }
    }, this.showTime)
  }
  init (name, context, definition) {
    if (typeof window !== 'undefined' && typeof define === 'function' && define.amd) { define(definition) } else if (typeof module !== 'undefined' && module.exports) { module.exports = definition() } else if (context.exports) { context.exports = definition() } else { context[name] = definition() }
  }
  arrayPropertyBind () {
    if (typeof Array.isArray === 'undefined') {
      Array.isArray = obj => {
        return Object.prototype.toString.call(obj) === '[object Array]'
      }
    }
  }
  /// MurmurHash3 related functions

  //
  // Given two 64bit ints (as an array of two 32bit ints) returns the two
  // added together as a 64bit int (as an array of two 32bit ints).
  //
  x64Add (m, n) {
    m = [m[0] >>> 16, m[0] & 0xffff, m[1] >>> 16, m[1] & 0xffff]
    n = [n[0] >>> 16, n[0] & 0xffff, n[1] >>> 16, n[1] & 0xffff]
    let o = [0, 0, 0, 0]
    o[3] += m[3] + n[3]
    o[2] += o[3] >>> 16
    o[3] &= 0xffff
    o[2] += m[2] + n[2]
    o[1] += o[2] >>> 16
    o[2] &= 0xffff
    o[1] += m[1] + n[1]
    o[0] += o[1] >>> 16
    o[1] &= 0xffff
    o[0] += m[0] + n[0]
    o[0] &= 0xffff
    return [(o[0] << 16) | o[1], (o[2] << 16) | o[3]]
  }

  //
  // Given two 64bit ints (as an array of two 32bit ints) returns the two
  // multiplied together as a 64bit int (as an array of two 32bit ints).
  //
  x64Multiply (m, n) {
    m = [m[0] >>> 16, m[0] & 0xffff, m[1] >>> 16, m[1] & 0xffff]
    n = [n[0] >>> 16, n[0] & 0xffff, n[1] >>> 16, n[1] & 0xffff]
    let o = [0, 0, 0, 0]
    o[3] += m[3] * n[3]
    o[2] += o[3] >>> 16
    o[3] &= 0xffff
    o[2] += m[2] * n[3]
    o[1] += o[2] >>> 16
    o[2] &= 0xffff
    o[2] += m[3] * n[2]
    o[1] += o[2] >>> 16
    o[2] &= 0xffff
    o[1] += m[1] * n[3]
    o[0] += o[1] >>> 16
    o[1] &= 0xffff
    o[1] += m[2] * n[2]
    o[0] += o[1] >>> 16
    o[1] &= 0xffff
    o[1] += m[3] * n[1]
    o[0] += o[1] >>> 16
    o[1] &= 0xffff
    o[0] += (m[0] * n[3]) + (m[1] * n[2]) + (m[2] * n[1]) + (m[3] * n[0])
    o[0] &= 0xffff
    return [(o[0] << 16) | o[1], (o[2] << 16) | o[3]]
  }
  //
  // Given a 64bit int (as an array of two 32bit ints) and an int
  // representing a number of bit positions, returns the 64bit int (as an
  // array of two 32bit ints) rotated left by that number of positions.
  //
  x64Rotl (m, n) {
    n %= 64
    if (n === 32) {
      return [m[1], m[0]]
    } else if (n < 32) {
      return [(m[0] << n) | (m[1] >>> (32 - n)), (m[1] << n) | (m[0] >>> (32 - n))]
    } else {
      n -= 32
      return [(m[1] << n) | (m[0] >>> (32 - n)), (m[0] << n) | (m[1] >>> (32 - n))]
    }
  }
  //
  // Given a 64bit int (as an array of two 32bit ints) and an int
  // representing a number of bit positions, returns the 64bit int (as an
  // array of two 32bit ints) shifted left by that number of positions.
  //
  x64LeftShift (m, n) {
    n %= 64
    if (n === 0) {
      return m
    } else if (n < 32) {
      return [(m[0] << n) | (m[1] >>> (32 - n)), m[1] << n]
    } else {
      return [m[1] << (n - 32), 0]
    }
  }
  //
  // Given two 64bit ints (as an array of two 32bit ints) returns the two
  // xored together as a 64bit int (as an array of two 32bit ints).
  //
  x64Xor (m, n) {
    return [m[0] ^ n[0], m[1] ^ n[1]]
  }
  //
  // Given a block, returns murmurHash3's final x64 mix of that block.
  // (`[0, h[0] >>> 1]` is a 33 bit unsigned right shift. This is the
  // only place where we need to right shift 64bit ints.)
  //
  x64Fmix (h) {
    h = this.x64Xor(h, [0, h[0] >>> 1])
    h = this.x64Multiply(h, [0xff51afd7, 0xed558ccd])
    h = this.x64Xor(h, [0, h[0] >>> 1])
    h = this.x64Multiply(h, [0xc4ceb9fe, 0x1a85ec53])
    h = this.x64Xor(h, [0, h[0] >>> 1])
    return h
  }

  //
  // Given a string and an optional seed as an int, returns a 128 bit
  // hash using the x64 flavor of MurmurHash3, as an unsigned hex.
  //
  x64hash128 (key, seed) {
    key = key || ''
    seed = seed || 0
    let remainder = key.length % 16
    let bytes = key.length - remainder
    let h1 = [0, seed]
    let h2 = [0, seed]
    let k1 = [0, 0]
    let k2 = [0, 0]
    let c1 = [0x87c37b91, 0x114253d5]
    let c2 = [0x4cf5ad43, 0x2745937f]
    let i = 0
    for (i = 0; i < bytes; i = i + 16) {
      k1 = [((key.charCodeAt(i + 4) & 0xff)) | ((key.charCodeAt(i + 5) & 0xff) << 8) | ((key.charCodeAt(i + 6) & 0xff) << 16) | ((key.charCodeAt(i + 7) & 0xff) << 24), ((key.charCodeAt(i) & 0xff)) | ((key.charCodeAt(i + 1) & 0xff) << 8) | ((key.charCodeAt(i + 2) & 0xff) << 16) | ((key.charCodeAt(i + 3) & 0xff) << 24)]
      k2 = [((key.charCodeAt(i + 12) & 0xff)) | ((key.charCodeAt(i + 13) & 0xff) << 8) | ((key.charCodeAt(i + 14) & 0xff) << 16) | ((key.charCodeAt(i + 15) & 0xff) << 24), ((key.charCodeAt(i + 8) & 0xff)) | ((key.charCodeAt(i + 9) & 0xff) << 8) | ((key.charCodeAt(i + 10) & 0xff) << 16) | ((key.charCodeAt(i + 11) & 0xff) << 24)]
      k1 = this.x64Multiply(k1, c1)
      k1 = this.x64Rotl(k1, 31)
      k1 = this.x64Multiply(k1, c2)
      h1 = this.x64Xor(h1, k1)
      h1 = this.x64Rotl(h1, 27)
      h1 = this.x64Add(h1, h2)
      h1 = this.x64Add(this.x64Multiply(h1, [0, 5]), [0, 0x52dce729])
      k2 = this.x64Multiply(k2, c2)
      k2 = this.x64Rotl(k2, 33)
      k2 = this.x64Multiply(k2, c1)
      h2 = this.x64Xor(h2, k2)
      h2 = this.x64Rotl(h2, 31)
      h2 = this.x64Add(h2, h1)
      h2 = this.x64Add(this.x64Multiply(h2, [0, 5]), [0, 0x38495ab5])
    }
    k1 = [0, 0]
    k2 = [0, 0]
    switch (remainder) {
      case 15:
        k2 = this.x64Xor(k2, this.x64LeftShift([0, key.charCodeAt(i + 14)], 48))
      // fallthrough
      case 14:
        k2 = this.x64Xor(k2, this.x64LeftShift([0, key.charCodeAt(i + 13)], 40))
      // fallthrough
      case 13:
        k2 = this.x64Xor(k2, this.x64LeftShift([0, key.charCodeAt(i + 12)], 32))
      // fallthrough
      case 12:
        k2 = this.x64Xor(k2, this.x64LeftShift([0, key.charCodeAt(i + 11)], 24))
      // fallthrough
      case 11:
        k2 = this.x64Xor(k2, this.x64LeftShift([0, key.charCodeAt(i + 10)], 16))
      // fallthrough
      case 10:
        k2 = this.x64Xor(k2, this.x64LeftShift([0, key.charCodeAt(i + 9)], 8))
      // fallthrough
      case 9:
        k2 = this.x64Xor(k2, [0, key.charCodeAt(i + 8)])
        k2 = this.x64Multiply(k2, c2)
        k2 = this.x64Rotl(k2, 33)
        k2 = this.x64Multiply(k2, c1)
        h2 = this.x64Xor(h2, k2)
      // fallthrough
      case 8:
        k1 = this.x64Xor(k1, this.x64LeftShift([0, key.charCodeAt(i + 7)], 56))
      // fallthrough
      case 7:
        k1 = this.x64Xor(k1, this.x64LeftShift([0, key.charCodeAt(i + 6)], 48))
      // fallthrough
      case 6:
        k1 = this.x64Xor(k1, this.x64LeftShift([0, key.charCodeAt(i + 5)], 40))
      // fallthrough
      case 5:
        k1 = this.x64Xor(k1, this.x64LeftShift([0, key.charCodeAt(i + 4)], 32))
      // fallthrough
      case 4:
        k1 = this.x64Xor(k1, this.x64LeftShift([0, key.charCodeAt(i + 3)], 24))
      // fallthrough
      case 3:
        k1 = this.x64Xor(k1, this.x64LeftShift([0, key.charCodeAt(i + 2)], 16))
      // fallthrough
      case 2:
        k1 = this.x64Xor(k1, this.x64LeftShift([0, key.charCodeAt(i + 1)], 8))
      // fallthrough
      case 1:
        k1 = this.x64Xor(k1, [0, key.charCodeAt(i)])
        k1 = this.x64Multiply(k1, c1)
        k1 = this.x64Rotl(k1, 31)
        k1 = this.x64Multiply(k1, c2)
        h1 = this.x64Xor(h1, k1)
      // fallthrough
    }
    h1 = this.x64Xor(h1, [0, key.length])
    h2 = this.x64Xor(h2, [0, key.length])
    h1 = this.x64Add(h1, h2)
    h2 = this.x64Add(h2, h1)
    h1 = this.x64Fmix(h1)
    h2 = this.x64Fmix(h2)
    h1 = this.x64Add(h1, h2)
    h2 = this.x64Add(h2, h1)
    return ('00000000' + (h1[0] >>> 0).toString(16)).slice(-8) + ('00000000' + (h1[1] >>> 0).toString(16)).slice(-8) + ('00000000' + (h2[0] >>> 0).toString(16)).slice(-8) + ('00000000' + (h2[1] >>> 0).toString(16)).slice(-8)
  }

  each (obj, iterator) {
    if (Array.prototype.forEach && obj.forEach === Array.prototype.forEach) {
      obj.forEach(iterator)
    } else if (obj.length === +obj.length) {
      for (let i = 0, l = obj.length; i < l; i++) {
        iterator(obj[i], i, obj)
      }
    } else {
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          iterator(obj[key], key, obj)
        }
      }
    }
  }

  map (obj, iterator) {
    let results = []
    // Not using strict equality so that this acts as a
    // shortcut to checking for `null` and `undefined`.
    if (obj == null) {
      return results
    }
    if (Array.prototype.map && obj.map === Array.prototype.map) { return obj.map(iterator) }
    this.each(obj, (value, index, list) => {
      results.push(iterator(value, index, list))
    })
    return results
  }

  extendSoft (target, source) {
    if (source == null) { return target }
    let value
    let key
    for (key in source) {
      value = source[key]
      if (value != null && !(Object.prototype.hasOwnProperty.call(target, key))) {
        target[key] = value
      }
    }
    return target
  }

  // https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/enumerateDevices
  enumerateDevicesKey (done, options) {
    if (!this.isEnumerateDevicesSupported()) {
      return done(options.NOT_AVAILABLE)
    }
    navigator.mediaDevices.enumerateDevices().then(devices => {
      done(devices.map(device => {
        return 'id=' + device.deviceId + ';gid=' + device.groupId + ';' + device.kind + ';' + device.label
      }))
    })['catch'](error => {
      done(error)
    })
  }

  isEnumerateDevicesSupported () {
    return (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices)
  }
  // Inspired by and based on https://github.com/cozylife/audio-fingerprint
  audioKey (done, options) {
    let audioOptions = options.audio
    if (audioOptions.excludeIOS11 && navigator.userAgent.match(/OS 11.+Version\/11.+Safari/)) {
      // See comment for excludeUserAgent and https://stackoverflow.com/questions/46363048/onaudioprocess-not-called-on-ios11#46534088
      return done(options.EXCLUDED)
    }
    let AudioContext = window.OfflineAudioContext || window.webkitOfflineAudioContext
    if (AudioContext == null) {
      return done(options.NOT_AVAILABLE)
    }

    let context = new AudioContext(1, 44100, 44100)

    let oscillator = context.createOscillator()
    oscillator.type = 'triangle'
    oscillator.frequency.setValueAtTime(10000, context.currentTime)

    let compressor = context.createDynamicsCompressor()
    this.each([
      ['threshold', -50],
      ['knee', 40],
      ['ratio', 12],
      ['reduction', -20],
      ['attack', 0],
      ['release', 0.25]
    ], item => {
      if (compressor[item[0]] !== undefined && typeof compressor[item[0]].setValueAtTime === 'function') {
        compressor[item[0]].setValueAtTime(item[1], context.currentTime)
      }
    })

    oscillator.connect(compressor)
    compressor.connect(context.destination)
    oscillator.start(0)
    context.startRendering()

    let audioTimeoutId = setTimeout(() => {
      console.warn('Audio fingerprint timed out. Please report bug at https://github.com/Valve/fingerprintjs2 with your user agent: "' + navigator.userAgent + '".')
      context.oncomplete = () => { }
      context = null
      return done('audioTimeout')
    }, audioOptions.timeout)

    context.oncomplete = event => {
      let fingerprint
      try {
        clearTimeout(audioTimeoutId)
        fingerprint = event.renderedBuffer.getChannelData(0)
          .slice(4500, 5000)
          .reduce((acc, val) => { return acc + Math.abs(val) }, 0)
          .toString()
        oscillator.disconnect()
        compressor.disconnect()
      } catch (error) {
        done(error)
        return
      }
      done(fingerprint)
    }
  }
  UserAgent (done) {
    done(navigator.userAgent)
  }
  webdriver (done, options) {
    done(navigator.webdriver == null ? options.NOT_AVAILABLE : navigator.webdriver)
  }
  languageKey (done, options) {
    done(navigator.language || navigator.userLanguage || navigator.browserLanguage || navigator.systemLanguage || options.NOT_AVAILABLE)
  }
  colorDepthKey (done, options) {
    done(window.screen.colorDepth || options.NOT_AVAILABLE)
  }
  deviceMemoryKey (done, options) {
    done(navigator.deviceMemory || options.NOT_AVAILABLE)
  }
  pixelRatioKey (done, options) {
    done(window.devicePixelRatio || options.NOT_AVAILABLE)
  }
  screenResolutionKey (done, options) {
    done(this.getScreenResolution(options))
  }
  getScreenResolution (options) {
    let resolution = [window.screen.width, window.screen.height]
    if (options.screen.detectScreenOrientation) {
      resolution.sort().reverse()
    }
    return resolution
  }
  availableScreenResolutionKey (done, options) {
    done(this.getAvailableScreenResolution(options))
  }
  getAvailableScreenResolution (options) {
    if (window.screen.availWidth && window.screen.availHeight) {
      let available = [window.screen.availHeight, window.screen.availWidth]
      if (options.screen.detectScreenOrientation) {
        available.sort().reverse()
      }
      return available
    }
    // headless browsers
    return options.NOT_AVAILABLE
  }
  timezoneOffset (done) {
    done(new Date().getTimezoneOffset())
  }
  timezone (done, options) {
    if (window.Intl && window.Intl.DateTimeFormat) {
      done(new window.Intl.DateTimeFormat().resolvedOptions().timeZone)
      return
    }
    done(options.NOT_AVAILABLE)
  }
  sessionStorageKey (done, options) {
    done(this.hasSessionStorage(options))
  }
  localStorageKey (done, options) {
    done(this.hasLocalStorage(options))
  }
  indexedDbKey (done, options) {
    done(this.hasIndexedDB(options))
  }
  addBehaviorKey (done) {
    // body might not be defined at this point or removed programmatically
    done(!!(document.body && document.body.addBehavior))
  }
  openDatabaseKey (done) {
    done(!!window.openDatabase)
  }
  cpuClassKey (done, options) {
    done(this.getNavigatorCpuClass(options))
  }
  platformKey (done, options) {
    done(this.getNavigatorPlatform(options))
  }
  doNotTrackKey (done, options) {
    done(this.getDoNotTrack(options))
  }
  canvasKey (done, options) {
    if (this.isCanvasSupported()) {
      done(this.getCanvasFp(options))
      return
    }
    done(options.NOT_AVAILABLE)
  }
  webglKey (done, options) {
    if (this.isWebGlSupported()) {
      done(this.getWebglFp())
      return
    }
    done(options.NOT_AVAILABLE)
  }
  webglVendorAndRendererKey (done) {
    if (this.isWebGlSupported()) {
      done(this.getWebglVendorAndRenderer())
      return
    }
    done()
  }
  adBlockKey (done) {
    done(this.getAdBlock())
  }
  hasLiedLanguagesKey (done) {
    done(this.getHasLiedLanguages())
  }
  hasLiedResolutionKey (done) {
    done(this.getHasLiedResolution())
  }
  hasLiedOsKey (done) {
    done(this.getHasLiedOs())
  }
  hasLiedBrowserKey (done) {
    done(this.getHasLiedBrowser())
  }
  // flash fonts (will increase fingerprinting time 20X to ~ 130-150ms)
  flashFontsKey (done, options) {
    // we do flash if swfobject is loaded
    if (!this.hasSwfObjectLoaded()) {
      return done('swf object not loaded')
    }
    if (!this.hasMinFlashInstalled()) {
      return done('flash not installed')
    }
    if (!options.fonts.swfPath) {
      return done('missing options.fonts.swfPath')
    }
    this.loadSwfAndDetectFonts(fonts => {
      done(fonts)
    }, options)
  }
  // kudos to http://www.lalit.org/lab/javascript-css-font-detect/
  jsFontsKey (done, options) {
    // a font will be compared against all the three default fonts.
    // and if it doesn't match all 3 then that font is not available.
    let baseFonts = ['monospace', 'sans-serif', 'serif']

    let fontList = []

    if (options.fonts.extendedJsFonts) {
      let extendedFontList = []
      fontList = fontList.concat(extendedFontList)
    }

    fontList = fontList.concat(options.fonts.userDefinedFonts)

    // remove duplicate fonts
    fontList = fontList.filter((font, position) => {
      return fontList.indexOf(font) === position
    })

    // we use m or w because these two characters take up the maximum width.
    // And we use a LLi so that the same matching fonts can get separated
    let testString = 'mmmmmmmmmmlli'

    // we test using 72px font size, we may use any size. I guess larger the better.
    let testSize = '72px'

    let h = document.getElementsByTagName('body')[0]

    // div to load spans for the base fonts
    let baseFontsDiv = document.createElement('div')

    // div to load spans for the fonts to detect
    let fontsDiv = document.createElement('div')

    let defaultWidth = {}
    let defaultHeight = {}

    // creates a span where the fonts will be loaded
    let createSpan = () => {
      let s = document.createElement('span')
      /*
       * We need this css as in some weird browser this
       * span elements shows up for a microSec which creates a
       * bad user experience
       */
      s.style.position = 'absolute'
      s.style.left = '-9999px'
      s.style.fontSize = testSize

      // css font reset to reset external styles
      s.style.fontStyle = 'normal'
      s.style.fontWeight = 'normal'
      s.style.letterSpacing = 'normal'
      s.style.lineBreak = 'auto'
      s.style.lineHeight = 'normal'
      s.style.textTransform = 'none'
      s.style.textAlign = 'left'
      s.style.textDecoration = 'none'
      s.style.textShadow = 'none'
      s.style.whiteSpace = 'normal'
      s.style.wordBreak = 'normal'
      s.style.wordSpacing = 'normal'

      s.innerHTML = testString
      return s
    }

    // creates a span and load the font to detect and a base font for fallback
    let createSpanWithFonts = (fontToDetect, baseFont) => {
      let s = createSpan()
      s.style.fontFamily = "'" + fontToDetect + "'," + baseFont
      return s
    }

    // creates spans for the base fonts and adds them to baseFontsDiv
    let initializeBaseFontsSpans = () => {
      let spans = []
      for (let index = 0, length = baseFonts.length; index < length; index++) {
        let s = createSpan()
        s.style.fontFamily = baseFonts[index]
        baseFontsDiv.appendChild(s)
        spans.push(s)
      }
      return spans
    }

    // creates spans for the fonts to detect and adds them to fontsDiv
    let initializeFontsSpans = () => {
      let spans = {}
      for (let i = 0, l = fontList.length; i < l; i++) {
        let fontSpans = []
        for (let j = 0, numDefaultFonts = baseFonts.length; j < numDefaultFonts; j++) {
          let s = createSpanWithFonts(fontList[i], baseFonts[j])
          fontsDiv.appendChild(s)
          fontSpans.push(s)
        }
        spans[fontList[i]] = fontSpans // Stores {fontName : [spans for that font]}
      }
      return spans
    }

    // checks if a font is available
    let isFontAvailable = fontSpans => {
      let detected = false
      for (let i = 0; i < baseFonts.length; i++) {
        detected = (fontSpans[i].offsetWidth !== defaultWidth[baseFonts[i]] || fontSpans[i].offsetHeight !== defaultHeight[baseFonts[i]])
        if (detected) {
          return detected
        }
      }
      return detected
    }

    // create spans for base fonts
    let baseFontsSpans = initializeBaseFontsSpans()

    // add the spans to the DOM
    h.appendChild(baseFontsDiv)

    // get the default width for the three base fonts
    for (let index = 0, length = baseFonts.length; index < length; index++) {
      defaultWidth[baseFonts[index]] = baseFontsSpans[index].offsetWidth // width for the default font
      defaultHeight[baseFonts[index]] = baseFontsSpans[index].offsetHeight // height for the default font
    }

    // create spans for fonts to detect
    let fontsSpans = initializeFontsSpans()

    // add all the spans to the DOM
    h.appendChild(fontsDiv)

    // check available fonts
    let available = []
    for (let i = 0, l = fontList.length; i < l; i++) {
      if (isFontAvailable(fontsSpans[fontList[i]])) {
        available.push(fontList[i])
      }
    }

    // remove spans from DOM
    h.removeChild(fontsDiv)
    h.removeChild(baseFontsDiv)
    done(available)
  }
  pluginsComponent (done, options) {
    if (this.isIE()) {
      if (!options.plugins.excludeIE) {
        done(this.getIEPlugins(options))
      } else {
        done(options.EXCLUDED)
      }
    } else {
      done(this.getRegularPlugins(options))
    }
  }
  getRegularPlugins (options) {
    if (navigator.plugins == null) {
      return options.NOT_AVAILABLE
    }

    let plugins = []
    // plugins isn't defined in Node envs.
    for (let i = 0, l = navigator.plugins.length; i < l; i++) {
      if (navigator.plugins[i]) { plugins.push(navigator.plugins[i]) }
    }

    // sorting plugins only for those user agents, that we know randomize the plugins
    // every time we try to enumerate them
    if (this.pluginsShouldBeSorted(options)) {
      plugins = plugins.sort((a, b) => {
        if (a.name > b.name) { return 1 }
        if (a.name < b.name) { return -1 }
        return 0
      })
    }
    return this.map(plugins, p => {
      let mimeTypes = this.map(p, mt => {
        return [mt.type, mt.suffixes]
      })
      return [p.name, p.description, mimeTypes]
    })
  }
  getIEPlugins (options) {
    let result = []
    if ((Object.getOwnPropertyDescriptor && Object.getOwnPropertyDescriptor(window, 'ActiveXObject')) || ('ActiveXObject' in window)) {
      let names = [
        'AcroPDF.PDF', // Adobe PDF reader 7+
        'Adodb.Stream',
        'AgControl.AgControl', // Silverlight
        'DevalVRXCtrl.DevalVRXCtrl.1',
        'MacromediaFlashPaper.MacromediaFlashPaper',
        'Msxml2.DOMDocument',
        'Msxml2.XMLHTTP',
        'PDF.PdfCtrl', // Adobe PDF reader 6 and earlier, brrr
        'QuickTime.QuickTime', // QuickTime
        'QuickTimeCheckObject.QuickTimeCheck.1',
        'RealPlayer',
        'RealPlayer.RealPlayer(tm) ActiveX Control (32-bit)',
        'RealVideo.RealVideo(tm) ActiveX Control (32-bit)',
        'Scripting.Dictionary',
        'SWCtl.SWCtl', // ShockWave player
        'Shell.UIHelper',
        'ShockwaveFlash.ShockwaveFlash', // flash plugin
        'Skype.Detection',
        'TDCCtl.TDCCtl',
        'WMPlayer.OCX', // Windows media player
        'rmocx.RealPlayer G2 Control',
        'rmocx.RealPlayer G2 Control.1'
      ]
      // starting to detect plugins in IE
      result = this.map(names, name => {
        try {
          // eslint-disable-next-line no-new
          new window.ActiveXObject(name)
          return name
        } catch (e) {
          return options.ERROR
        }
      })
    } else {
      result.push(options.NOT_AVAILABLE)
    }
    if (navigator.plugins) {
      result = result.concat(this.getRegularPlugins(options))
    }
    return result
  }
  pluginsShouldBeSorted (options) {
    let should = false
    for (let i = 0, l = options.plugins.sortPluginsFor.length; i < l; i++) {
      let re = options.plugins.sortPluginsFor[i]
      if (navigator.userAgent.match(re)) {
        should = true
        break
      }
    }
    return should
  }
  touchSupportKey (done) {
    done(this.getTouchSupport())
  }
  hardwareConcurrencyKey (done, options) {
    done(this.getHardwareConcurrency(options))
  }
  hasSessionStorage (options) {
    try {
      return !!window.sessionStorage
    } catch (e) {
      return options.ERROR // SecurityError when referencing it means it exists
    }
  }

  // https://bugzilla.mozilla.org/show_bug.cgi?id=781447
  hasLocalStorage (options) {
    try {
      return !!window.localStorage
    } catch (e) {
      return options.ERROR // SecurityError when referencing it means it exists
    }
  }
  hasIndexedDB (options) {
    try {
      return !!window.indexedDB
    } catch (e) {
      return options.ERROR // SecurityError when referencing it means it exists
    }
  }
  getHardwareConcurrency (options) {
    if (navigator.hardwareConcurrency) {
      return navigator.hardwareConcurrency
    }
    return options.NOT_AVAILABLE
  }
  getNavigatorCpuClass (options) {
    return navigator.cpuClass || options.NOT_AVAILABLE
  }
  getNavigatorPlatform (options) {
    if (navigator.platform) {
      return navigator.platform
    } else {
      return options.NOT_AVAILABLE
    }
  }
  getDoNotTrack (options) {
    if (navigator.doNotTrack) {
      return navigator.doNotTrack
    } else if (navigator.msDoNotTrack) {
      return navigator.msDoNotTrack
    } else if (window.doNotTrack) {
      return window.doNotTrack
    } else {
      return options.NOT_AVAILABLE
    }
  }
  // This is a crude and primitive touch screen detection.
  // It's not possible to currently reliably detect the  availability of a touch screen
  // with a JS, without actually subscribing to a touch event.
  // http://www.stucox.com/blog/you-cant-detect-a-touchscreen/
  // https://github.com/Modernizr/Modernizr/issues/548
  // method returns an array of 3 values:
  // maxTouchPoints, the success or failure of creating a TouchEvent,
  // and the availability of the 'ontouchstart' property

  getTouchSupport () {
    let maxTouchPoints = 0
    let touchEvent
    if (typeof navigator.maxTouchPoints !== 'undefined') {
      maxTouchPoints = navigator.maxTouchPoints
    } else if (typeof navigator.msMaxTouchPoints !== 'undefined') {
      maxTouchPoints = navigator.msMaxTouchPoints
    }
    try {
      document.createEvent('TouchEvent')
      touchEvent = true
    } catch (_) {
      touchEvent = false
    }
    let touchStart = 'ontouchstart' in window
    return [maxTouchPoints, touchEvent, touchStart]
  }
  // https://www.browserleaks.com/canvas#how-does-it-work

  getCanvasFp (options) {
    let result = []
    // Very simple now, need to make it more complex (geo shapes etc)
    let canvas = document.createElement('canvas')
    canvas.width = 2000
    canvas.height = 200
    canvas.style.display = 'inline'
    let ctx = canvas.getContext('2d')
    // detect browser support of canvas winding
    // http://blogs.adobe.com/webplatform/2013/01/30/winding-rules-in-canvas/
    // https://github.com/Modernizr/Modernizr/blob/master/feature-detects/canvas/winding.js
    ctx.rect(0, 0, 10, 10)
    ctx.rect(2, 2, 6, 6)
    result.push('canvas winding:' + ((ctx.isPointInPath(5, 5, 'evenodd') === false) ? 'yes' : 'no'))

    ctx.textBaseline = 'alphabetic'
    ctx.fillStyle = '#f60'
    ctx.fillRect(125, 1, 62, 20)
    ctx.fillStyle = '#069'
    // https://github.com/Valve/fingerprintjs2/issues/66
    if (options.dontUseFakeFontInCanvas) {
      ctx.font = '11pt Arial'
    } else {
      ctx.font = '11pt no-real-font-123'
    }
    ctx.fillText('Cwm fjordbank glyphs vext quiz, \ud83d\ude03', 2, 15)
    ctx.fillStyle = 'rgba(102, 204, 0, 0.2)'
    ctx.font = '18pt Arial'
    ctx.fillText('Cwm fjordbank glyphs vext quiz, \ud83d\ude03', 4, 45)

    // canvas blending
    // http://blogs.adobe.com/webplatform/2013/01/28/blending-features-in-canvas/
    // http://jsfiddle.net/NDYV8/16/
    ctx.globalCompositeOperation = 'multiply'
    ctx.fillStyle = 'rgb(255,0,255)'
    ctx.beginPath()
    ctx.arc(50, 50, 50, 0, Math.PI * 2, true)
    ctx.closePath()
    ctx.fill()
    ctx.fillStyle = 'rgb(0,255,255)'
    ctx.beginPath()
    ctx.arc(100, 50, 50, 0, Math.PI * 2, true)
    ctx.closePath()
    ctx.fill()
    ctx.fillStyle = 'rgb(255,255,0)'
    ctx.beginPath()
    ctx.arc(75, 100, 50, 0, Math.PI * 2, true)
    ctx.closePath()
    ctx.fill()
    ctx.fillStyle = 'rgb(255,0,255)'
    // canvas winding
    // http://blogs.adobe.com/webplatform/2013/01/30/winding-rules-in-canvas/
    // http://jsfiddle.net/NDYV8/19/
    ctx.arc(75, 75, 75, 0, Math.PI * 2, true)
    ctx.arc(75, 75, 25, 0, Math.PI * 2, true)
    ctx.fill('evenodd')

    if (canvas.toDataURL) { result.push('canvas fp:' + canvas.toDataURL()) }
    return result
  }
  getWebglFp () {
    let gl
    let fa2s = fa => {
      gl.clearColor(0.0, 0.0, 0.0, 1.0)
      gl.enable(gl.DEPTH_TEST)
      gl.depthFunc(gl.LEQUAL)
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
      return '[' + fa[0] + ', ' + fa[1] + ']'
    }
    let maxAnisotropy = gl => {
      let ext = gl.getExtension('EXT_texture_filter_anisotropic') || gl.getExtension('WEBKIT_EXT_texture_filter_anisotropic') || gl.getExtension('MOZ_EXT_texture_filter_anisotropic')
      if (ext) {
        let anisotropy = gl.getParameter(ext.MAX_TEXTURE_MAX_ANISOTROPY_EXT)
        if (anisotropy === 0) {
          anisotropy = 2
        }
        return anisotropy
      } else {
        return null
      }
    }

    gl = this.getWebglCanvas()
    if (!gl) { return null }
    // WebGL fingerprinting is a combination of techniques, found in MaxMind antifraud script & Augur fingerprinting.
    // First it draws a gradient object with shaders and convers the image to the Base64 string.
    // Then it enumerates all WebGL extensions & capabilities and appends them to the Base64 string, resulting in a huge WebGL string, potentially very unique on each device
    // Since iOS supports webgl starting from version 8.1 and 8.1 runs on several graphics chips, the results may be different across ios devices, but we need to verify it.
    let result = []
    let vShaderTemplate = 'attribute vec2 attrVertex;varying vec2 varyinTexCoordinate;uniform vec2 uniformOffset;void main(){varyinTexCoordinate=attrVertex+uniformOffset;gl_Position=vec4(attrVertex,0,1);}'
    let fShaderTemplate = 'precision mediump float;varying vec2 varyinTexCoordinate;void main() {gl_FragColor=vec4(varyinTexCoordinate,0,1);}'
    let vertexPosBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexPosBuffer)
    let vertices = new Float32Array([-0.2, -0.9, 0, 0.4, -0.26, 0, 0, 0.732134444, 0])
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)
    vertexPosBuffer.itemSize = 3
    vertexPosBuffer.numItems = 3
    let program = gl.createProgram()
    let vshader = gl.createShader(gl.VERTEX_SHADER)
    gl.shaderSource(vshader, vShaderTemplate)
    gl.compileShader(vshader)
    let fshader = gl.createShader(gl.FRAGMENT_SHADER)
    gl.shaderSource(fshader, fShaderTemplate)
    gl.compileShader(fshader)
    gl.attachShader(program, vshader)
    gl.attachShader(program, fshader)
    gl.linkProgram(program)
    gl.useProgram(program)
    program.vertexPosAttrib = gl.getAttribLocation(program, 'attrVertex')
    program.offsetUniform = gl.getUniformLocation(program, 'uniformOffset')
    gl.enableVertexAttribArray(program.vertexPosArray)
    gl.vertexAttribPointer(program.vertexPosAttrib, vertexPosBuffer.itemSize, gl.FLOAT, !1, 0, 0)
    gl.uniform2f(program.offsetUniform, 1, 1)
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, vertexPosBuffer.numItems)
    try {
      result.push(gl.canvas.toDataURL())
    } catch (e) {
      /* .toDataURL may be absent or broken (blocked by extension) */
    }
    result.push('extensions:' + (gl.getSupportedExtensions() || []).join(';'))
    result.push('webgl aliased line width range:' + fa2s(gl.getParameter(gl.ALIASED_LINE_WIDTH_RANGE)))
    result.push('webgl aliased point size range:' + fa2s(gl.getParameter(gl.ALIASED_POINT_SIZE_RANGE)))
    result.push('webgl alpha bits:' + gl.getParameter(gl.ALPHA_BITS))
    result.push('webgl antialiasing:' + (gl.getContextAttributes().antialias ? 'yes' : 'no'))
    result.push('webgl blue bits:' + gl.getParameter(gl.BLUE_BITS))
    result.push('webgl depth bits:' + gl.getParameter(gl.DEPTH_BITS))
    result.push('webgl green bits:' + gl.getParameter(gl.GREEN_BITS))
    result.push('webgl max anisotropy:' + maxAnisotropy(gl))
    result.push('webgl max combined texture image units:' + gl.getParameter(gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS))
    result.push('webgl max cube map texture size:' + gl.getParameter(gl.MAX_CUBE_MAP_TEXTURE_SIZE))
    result.push('webgl max fragment uniform vectors:' + gl.getParameter(gl.MAX_FRAGMENT_UNIFORM_VECTORS))
    result.push('webgl max render buffer size:' + gl.getParameter(gl.MAX_RENDERBUFFER_SIZE))
    result.push('webgl max texture image units:' + gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS))
    result.push('webgl max texture size:' + gl.getParameter(gl.MAX_TEXTURE_SIZE))
    result.push('webgl max varying vectors:' + gl.getParameter(gl.MAX_VARYING_VECTORS))
    result.push('webgl max vertex attribs:' + gl.getParameter(gl.MAX_VERTEX_ATTRIBS))
    result.push('webgl max vertex texture image units:' + gl.getParameter(gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS))
    result.push('webgl max vertex uniform vectors:' + gl.getParameter(gl.MAX_VERTEX_UNIFORM_VECTORS))
    result.push('webgl max viewport dims:' + fa2s(gl.getParameter(gl.MAX_VIEWPORT_DIMS)))
    result.push('webgl red bits:' + gl.getParameter(gl.RED_BITS))
    result.push('webgl renderer:' + gl.getParameter(gl.RENDERER))
    result.push('webgl shading language version:' + gl.getParameter(gl.SHADING_LANGUAGE_VERSION))
    result.push('webgl stencil bits:' + gl.getParameter(gl.STENCIL_BITS))
    result.push('webgl vendor:' + gl.getParameter(gl.VENDOR))
    result.push('webgl version:' + gl.getParameter(gl.VERSION))

    try {
      // Add the unmasked vendor and unmasked renderer if the debug_renderer_info extension is available
      let extensionDebugRendererInfo = gl.getExtension('WEBGL_debug_renderer_info')
      if (extensionDebugRendererInfo) {
        result.push('webgl unmasked vendor:' + gl.getParameter(extensionDebugRendererInfo.UNMASKED_VENDOR_WEBGL))
        result.push('webgl unmasked renderer:' + gl.getParameter(extensionDebugRendererInfo.UNMASKED_RENDERER_WEBGL))
      }
    } catch (e) { /* squelch */ }

    if (!gl.getShaderPrecisionFormat) {
      this.loseWebglContext(gl)
      return result
    }

    this.each(['FLOAT', 'INT'], numType => {
      this.each(['VERTEX', 'FRAGMENT'], shader => {
        this.each(['HIGH', 'MEDIUM', 'LOW'], numSize => {
          this.each(['precision', 'rangeMin', 'rangeMax'], key => {
            let format = gl.getShaderPrecisionFormat(gl[shader + '_SHADER'], gl[numSize + '_' + numType])[key]
            if (key !== 'precision') {
              key = 'precision ' + key
            }
            let line = ['webgl ', shader.toLowerCase(), ' shader ', numSize.toLowerCase(), ' ', numType.toLowerCase(), ' ', key, ':', format].join('')
            result.push(line)
          })
        })
      })
    })
    this.loseWebglContext(gl)
    return result
  }
  getWebglVendorAndRenderer () {
    /* This a subset of the WebGL fingerprint with a lot of entropy, while being reasonably browser-independent */
    try {
      let glContext = this.getWebglCanvas()
      let extensionDebugRendererInfo = glContext.getExtension('WEBGL_debug_renderer_info')
      let params = glContext.getParameter(extensionDebugRendererInfo.UNMASKED_VENDOR_WEBGL) + '~' + glContext.getParameter(extensionDebugRendererInfo.UNMASKED_RENDERER_WEBGL)
      this.loseWebglContext(glContext)
      return params
    } catch (e) {
      return null
    }
  }
  getAdBlock () {
    let ads = document.createElement('div')
    ads.innerHTML = '&nbsp;'
    ads.className = 'adsbox'
    let result = false
    try {
      // body may not exist, that's why we need try/catch
      document.body.appendChild(ads)
      result = document.getElementsByClassName('adsbox')[0].offsetHeight === 0
      document.body.removeChild(ads)
    } catch (e) {
      result = false
    }
    return result
  }
  getHasLiedLanguages () {
    // We check if navigator.language is equal to the first language of navigator.languages
    // navigator.languages is undefined on IE11 (and potentially older IEs)
    if (typeof navigator.languages !== 'undefined') {
      try {
        let firstLanguages = navigator.languages[0].substr(0, 2)
        if (firstLanguages !== navigator.language.substr(0, 2)) {
          return true
        }
      } catch (err) {
        return true
      }
    }
    return false
  }
  getHasLiedResolution () {
    return window.screen.width < window.screen.availWidth || window.screen.height < window.screen.availHeight
  }
  getHasLiedOs () {
    let userAgent = navigator.userAgent.toLowerCase()
    let oscpu = navigator.oscpu
    let platform = navigator.platform.toLowerCase()
    let os
    // We extract the OS from the user agent (respect the order of the if else if statement)
    if (userAgent.indexOf('windows phone') >= 0) {
      os = 'Windows Phone'
    } else if (userAgent.indexOf('windows') >= 0 || userAgent.indexOf('win16') >= 0 || userAgent.indexOf('win32') >= 0 || userAgent.indexOf('win64') >= 0 || userAgent.indexOf('win95') >= 0 || userAgent.indexOf('win98') >= 0 || userAgent.indexOf('winnt') >= 0 || userAgent.indexOf('wow64') >= 0) {
      os = 'Windows'
    } else if (userAgent.indexOf('android') >= 0) {
      os = 'Android'
    } else if (userAgent.indexOf('linux') >= 0 || userAgent.indexOf('cros') >= 0 || userAgent.indexOf('x11') >= 0) {
      os = 'Linux'
    } else if (userAgent.indexOf('iphone') >= 0 || userAgent.indexOf('ipad') >= 0 || userAgent.indexOf('ipod') >= 0 || userAgent.indexOf('crios') >= 0 || userAgent.indexOf('fxios') >= 0) {
      os = 'iOS'
    } else if (userAgent.indexOf('macintosh') >= 0 || userAgent.indexOf('mac_powerpc)') >= 0) {
      os = 'Mac'
    } else {
      os = 'Other'
    }
    // We detect if the person uses a touch device
    let mobileDevice = (('ontouchstart' in window) ||
      (navigator.maxTouchPoints > 0) ||
      (navigator.msMaxTouchPoints > 0))

    if (mobileDevice && os !== 'Windows' && os !== 'Windows Phone' && os !== 'Android' && os !== 'iOS' && os !== 'Other' && userAgent.indexOf('cros') === -1) {
      return true
    }

    // We compare oscpu with the OS extracted from the UA
    if (typeof oscpu !== 'undefined') {
      oscpu = oscpu.toLowerCase()
      if (oscpu.indexOf('win') >= 0 && os !== 'Windows' && os !== 'Windows Phone') {
        return true
      } else if (oscpu.indexOf('linux') >= 0 && os !== 'Linux' && os !== 'Android') {
        return true
      } else if (oscpu.indexOf('mac') >= 0 && os !== 'Mac' && os !== 'iOS') {
        return true
      } else if ((oscpu.indexOf('win') === -1 && oscpu.indexOf('linux') === -1 && oscpu.indexOf('mac') === -1) !== (os === 'Other')) {
        return true
      }
    }

    // We compare platform with the OS extracted from the UA
    if (platform.indexOf('win') >= 0 && os !== 'Windows' && os !== 'Windows Phone') {
      return true
    } else if ((platform.indexOf('linux') >= 0 || platform.indexOf('android') >= 0 || platform.indexOf('pike') >= 0) && os !== 'Linux' && os !== 'Android') {
      return true
    } else if ((platform.indexOf('mac') >= 0 || platform.indexOf('ipad') >= 0 || platform.indexOf('ipod') >= 0 || platform.indexOf('iphone') >= 0) && os !== 'Mac' && os !== 'iOS') {
      return true
    } else if (platform.indexOf('arm') >= 0 && os === 'Windows Phone') {
      return false
    } else if (platform.indexOf('pike') >= 0 && userAgent.indexOf('opera mini') >= 0) {
      return false
    } else {
      let platformIsOther = platform.indexOf('win') < 0 &&
        platform.indexOf('linux') < 0 &&
        platform.indexOf('mac') < 0 &&
        platform.indexOf('iphone') < 0 &&
        platform.indexOf('ipad') < 0 &&
        platform.indexOf('ipod') < 0
      if (platformIsOther !== (os === 'Other')) {
        return true
      }
    }

    return typeof navigator.plugins === 'undefined' && os !== 'Windows' && os !== 'Windows Phone'
  }
  getHasLiedBrowser () {
    let userAgent = navigator.userAgent.toLowerCase()
    let productSub = navigator.productSub

    // we extract the browser from the user agent (respect the order of the tests)
    let browser
    if (userAgent.indexOf('edge/') >= 0 || userAgent.indexOf('iemobile/') >= 0) {
      // Unreliable, different versions use EdgeHTML, Webkit, Blink, etc.
      return false
    } else if (userAgent.indexOf('opera mini') >= 0) {
      // Unreliable, different modes use Presto, WebView, Webkit, etc.
      return false
    } else if (userAgent.indexOf('firefox/') >= 0) {
      browser = 'Firefox'
    } else if (userAgent.indexOf('opera/') >= 0 || userAgent.indexOf(' opr/') >= 0) {
      browser = 'Opera'
    } else if (userAgent.indexOf('chrome/') >= 0) {
      browser = 'Chrome'
    } else if (userAgent.indexOf('safari/') >= 0) {
      if (userAgent.indexOf('android 1.') >= 0 || userAgent.indexOf('android 2.') >= 0 || userAgent.indexOf('android 3.') >= 0 || userAgent.indexOf('android 4.') >= 0) {
        browser = 'AOSP'
      } else {
        browser = 'Safari'
      }
    } else if (userAgent.indexOf('trident/') >= 0) {
      browser = 'Internet Explorer'
    } else {
      browser = 'Other'
    }

    if ((browser === 'Chrome' || browser === 'Safari' || browser === 'Opera') && productSub !== '20030107') {
      return true
    }

    // eslint-disable-next-line no-eval
    let tempRes = eval.toString().length
    if (tempRes === 37 && browser !== 'Safari' && browser !== 'Firefox' && browser !== 'Other') {
      return true
    } else if (tempRes === 39 && browser !== 'Internet Explorer' && browser !== 'Other') {
      return true
    } else if (tempRes === 33 && browser !== 'Chrome' && browser !== 'AOSP' && browser !== 'Opera' && browser !== 'Other') {
      return true
    }

    // We create an error to see how it is handled
    let errFirefox
    try {
      // eslint-disable-next-line no-throw-literal
      throw 'a'
    } catch (err) {
      try {
        err.toSource()
        errFirefox = true
      } catch (errOfErr) {
        errFirefox = false
      }
    }
    return errFirefox && browser !== 'Firefox' && browser !== 'Other'
  }
  isCanvasSupported () {
    let elem = document.createElement('canvas')
    return !!(elem.getContext && elem.getContext('2d'))
  }
  isWebGlSupported () {
    // code taken from Modernizr
    if (!this.isCanvasSupported()) {
      return false
    }

    let glContext = this.getWebglCanvas()
    let isSupported = !!window.WebGLRenderingContext && !!glContext
    this.loseWebglContext(glContext)
    return isSupported
  }
  isIE () {
    if (navigator.appName === 'Microsoft Internet Explorer') {
      return true
    } else if (navigator.appName === 'Netscape' && /Trident/.test(navigator.userAgent)) { // IE 11
      return true
    }
    return false
  }
  hasSwfObjectLoaded () {
    return typeof window.swfobject !== 'undefined'
  }
  hasMinFlashInstalled () {
    return window.swfobject.hasFlashPlayerVersion('9.0.0')
  }
  addFlashDivNode (options) {
    let node = document.createElement('div')
    node.setAttribute('id', options.fonts.swfContainerId)
    document.body.appendChild(node)
  }
  loadSwfAndDetectFonts (done, options) {
    let hiddenCallback = '___fp_swf_loaded'
    window[hiddenCallback] = fonts => {
      done(fonts)
    }
    let id = options.fonts.swfContainerId
    this.addFlashDivNode()
    let flashvars = { onReady: hiddenCallback }
    let flashparams = { allowScriptAccess: 'always', menu: 'false' }
    window.swfobject.embedSWF(options.fonts.swfPath, id, '1', '1', '9.0.0', false, flashvars, flashparams, {})
  }
  getWebglCanvas () {
    let canvas = document.createElement('canvas')
    let gl = null
    try {
      gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    } catch (e) { /* squelch */ }
    if (!gl) { gl = null }
    return gl
  }
  loseWebglContext (context) {
    let loseContextExtension = context.getExtension('WEBGL_lose_context')
    if (loseContextExtension != null) {
      loseContextExtension.loseContext()
    }
  }

  Fingerprint2 () {
    throw new Error("'new Fingerprint()' is deprecated, see https://github.com/Valve/fingerprintjs2#upgrade-guide-from-182-to-200")
  }

  Fingerprint2get (options, callback) {
    if (!callback) {
      callback = options
      options = {}
    } else if (!options) {
      options = {}
    }
    this.extendSoft(options, this.defaultOptions)
    options.components = options.extraComponents.concat(this.components)

    let keys = {
      data: [],
      addPreprocessedComponent: (key, value) => {
        if (typeof options.preprocessor === 'function') {
          value = options.preprocessor(key, value)
        }
        keys.data.push({ key: key, value: value })
      }
    }

    let i = -1
    let chainComponents = alreadyWaited => {
      i += 1
      if (i >= options.components.length) { // on finish
        callback(keys.data)
        return
      }
      let component = options.components[i]

      if (options.excludes[component.key]) {
        chainComponents(false) // skip
        return
      }

      if (!alreadyWaited && component.pauseBefore) {
        i -= 1
        setTimeout(() => {
          chainComponents(true)
        }, 1)
        return
      }

      try {
        component.getData(value => {
          keys.addPreprocessedComponent(component.key, value)
          chainComponents(false)
        }, options)
      } catch (error) {
        // main body error
        keys.addPreprocessedComponent(component.key, String(error))
        chainComponents(false)
      }
    }

    chainComponents(false)
  }

  Fingerprint2getPromise (options) {
    return new Promise((resolve, reject) => {
      this.Fingerprint2.get(options, resolve)
    })
  }

  Fingerprint2getV18 (options, callback) {
    if (callback == null) {
      callback = options
      options = {}
    }
    return this.Fingerprint2.get(options, components => {
      let newComponents = []
      for (let i = 0; i < components.length; i++) {
        let component = components[i]
        if (component.value === (options.NOT_AVAILABLE || 'not available')) {
          newComponents.push({ key: component.key, value: 'unknown' })
        } else if (component.key === 'plugins') {
          newComponents.push({
            key: 'plugins',
            value: this.map(component.value, p => {
              let mimeTypes = this.map(p[2], mt => {
                if (mt.join) { return mt.join('~') }
                return mt
              }).join(',')
              return [p[0], p[1], mimeTypes].join('::')
            })
          })
        } else if (['canvas', 'webgl'].indexOf(component.key) !== -1 && Array.isArray(component.value)) {
          // sometimes WebGL returns error in headless browsers (during CI testing for example)
          // so we need to join only if the values are array
          newComponents.push({ key: component.key, value: component.value.join('~') })
        } else if (['sessionStorage', 'localStorage', 'indexedDb', 'addBehavior', 'openDatabase'].indexOf(component.key) !== -1) {
          if (component.value) {
            newComponents.push({ key: component.key, value: 1 })
          } else {
            // skip
            continue
          }
        } else {
          if (component.value) {
            newComponents.push(component.value.join ? { key: component.key, value: component.value.join(';') } : component)
          } else {
            newComponents.push({ key: component.key, value: component.value })
          }
        }
      }
      let murmur = this.x64hash128(this.map(newComponents, component => { return component.value }).join('~~~'), 31)
      callback(murmur, newComponents)
    })
  }
  send (data) {
    data['request'] = location.href
    data['referrer'] = document.referrer
    data['agent'] = navigator.userAgent
    if (this.hasConsole) {
      console.log('fp2', data)
    }
    data = data || {}
    data['_'] = +new Date()
    let param = []
    for (let i in data) {
      data.hasOwnProperty(i) && param.push(encodeURIComponent(i) + '=' + encodeURIComponent(data[i]))
    }
    let url = this.trackUrl + (~this.trackUrl.indexOf('?') ? '&' : '?') + param.join('&')
    let img = new Image()
    img.width = img.height = 0
    img.src = url
    img.style.display = 'none'
    document.body.appendChild(img)
    img.onload = img.onerror = () => {
      document.body.removeChild(img)
    }
  }
  storage (key, value) {
    if (value !== undefined) {
      return window['localStorage'].setItem(key, value)
    } else {
      return window['localStorage'].getItem(key)
    }
  }
  cookie (key, value) {
    if (value !== undefined) {
      let expire = new Date()
      expire.setDate(expire.getDate + 365)
      return (document.cookie = [
        key, '=', value,
        '; expires=' + expire.toUTCString(), // use expires attribute, max-age is not supported by IE
        '; domain=hm.hualv.com'
      ].join(''))
    } else {
      let result = RegExp('(^|\\s|;)' + key + '=([^;]*)(;|$)').exec(document.cookie)
      return result ? result[2] : ''
    }
  }
  cache (key, value) {
    return global['localStorage'] ? this.storage(key, value) : this.cookie(key, value)
  }
  guid (callback) {
    let d1 = new Date()
    let guidStr = ''
    for (let i = 1; i <= 32; i++) {
      let n = Math.floor(Math.random() * 16.0).toString(16)
      guidStr += n
      if ((i === 8) || (i === 12) || (i === 16) || (i === 20)) {
        guidStr += '-'
      }
    }
    let d2 = new Date()
    let time = d2 - d1
    this.cache(this.fpCacheKey, guidStr)
    if (callback) {
      let param = {
        fingerprint: guidStr,
        duration: time
      }
      callback(param)
    }
  }
  fp (callback) {
    let d1 = new Date()
    this.Fingerprint2.get(components => {
      let list = []
      for (let key in components) {
        if (components.hasOwnProperty(key)) {
          let pair = components[key]
          list.push(pair.value)
        }
      }
      let murmur = this.Fingerprint2.x64hash128(list.join(), 31)
      let d2 = new Date()
      let time = d2 - d1
      this.cache(this.fpCacheKey, murmur)
      if (callback) {
        let param = {
          fingerprint: murmur,
          duration: time
        }
        callback(param)
      }
    })
  }
}
