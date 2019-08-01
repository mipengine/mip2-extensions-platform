/**
 * @file mip-ppkao-kaoshixinxi 组件
 * @author
 */
export default class MIPKaoshixinxi extends MIP.CustomElement {
  build () {
    let $ = require('zepto')
    let customElement = require('customElement').create()

    /**
     * 第一次进入可视区回调，只会执行一次
     */
    customElement.prototype.firstInviewCallback = function () {
      let ele = this.element

      function selectChange (ID) {
        $('#DQ_ID_' + ID).css({ display: 'flex' }).siblings('div').css({ display: 'none' })
      }

      $('#select-diqu').on('change', function () {
        selectChange($(this).find('option').not(function () {
          return !this.selected
        }).attr('value'))
      })

      let base64 = new Base64()

      $(document).ready(function () {
        let url = 'http://api.ppkao.com/Interface/YXK/PublicApi.ashx?action=' + ele.dataset.action
        $.ajax({
          url: url,
          type: 'POST',
          dataType: 'json',
          cache: false,
          error: function () {
            $('#xuanze-diqu mip-img').hide().siblings('mip-form').css({ display: 'flex' })
          }, // 错误执行方法
          success: function (data) {
            data = decode(data)
            let list = data.pList
            $('#select-diqu').val(list[0].ID)
            selectChange(list[0].ID)
            $('#xuanze-diqu mip-img').hide().siblings('mip-form').css({ display: 'flex' })
          }
        })
      })

      function decode (e) {
        let t = {}
        Object.keys(e).forEach(function (i) {
          let a = e[i]
          if (Array.isArray(a)) {
            t[i] = []
            a.forEach(function (e) {
              t[i].push(decode(e))
            })
          } else {
            if (a instanceof Object) {
              t[i] = decode(a)
            } else {
              t[i] = base64.decode(a)
            }
          }
        })
        return t
      }

      function Base64 () {
        // private property
        let keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='

        // public method for encoding
        this.encode = function (input) {
          let output = ''
          let chr1
          let chr2
          let chr3
          let enc1
          let enc2
          let enc3
          let enc4
          let i = 0
          input = utf8Encode(input)
          while (i < input.length) {
            chr1 = input.charCodeAt(i++)
            chr2 = input.charCodeAt(i++)
            chr3 = input.charCodeAt(i++)
            enc1 = chr1 >> 2
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4)
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6)
            enc4 = chr3 & 63
            if (isNaN(chr2)) {
              enc3 = enc4 = 64
            } else if (isNaN(chr3)) {
              enc4 = 64
            }
            output = output +
              keyStr.charAt(enc1) + keyStr.charAt(enc2) +
              keyStr.charAt(enc3) + keyStr.charAt(enc4)
          }
          return output
        }

        // public method for decoding
        this.decode = function (input) {
          if (input === 'undefined' || input === null || undefined === '' || input === '0') {
            return input
          }
          let output = ''
          let chr1
          let chr2
          let chr3
          let enc1
          let enc2
          let enc3
          let enc4
          let i = 0
          input = input.replace(/[^A-Za-z0-9+/=]/g, '')
          while (i < input.length) {
            enc1 = keyStr.indexOf(input.charAt(i++))
            enc2 = keyStr.indexOf(input.charAt(i++))
            enc3 = keyStr.indexOf(input.charAt(i++))
            enc4 = keyStr.indexOf(input.charAt(i++))
            chr1 = (enc1 << 2) | (enc2 >> 4)
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2)
            chr3 = ((enc3 & 3) << 6) | enc4
            output = output + String.fromCharCode(chr1)
            if (enc3 !== 64) {
              output = output + String.fromCharCode(chr2)
            }
            if (enc4 !== 64) {
              output = output + String.fromCharCode(chr3)
            }
          }
          output = utf8Decode(output)
          return output
        }

        // private method for UTF-8 encoding
        function utf8Encode (string) {
          string = string.replace(/\r\n/g, '\n')
          let utftext = ''
          for (let n = 0; n < string.length; n++) {
            let c = string.charCodeAt(n)
            if (c < 128) {
              utftext += String.fromCharCode(c)
            } else if ((c > 127) && (c < 2048)) {
              utftext += String.fromCharCode((c >> 6) | 192)
              utftext += String.fromCharCode((c & 63) | 128)
            } else {
              utftext += String.fromCharCode((c >> 12) | 224)
              utftext += String.fromCharCode(((c >> 6) & 63) | 128)
              utftext += String.fromCharCode((c & 63) | 128)
            }
          }
          return utftext
        }

        // private method for UTF-8 decoding
        function utf8Decode (utftext) {
          let string = ''
          let i = 0
          let c = 0
          // let c1 = 0
          let c2 = 0
          let c3 = 0
          while (i < utftext.length) {
            c = utftext.charCodeAt(i)
            if (c < 128) {
              string += String.fromCharCode(c)
              i++
            } else if ((c > 191) && (c < 224)) {
              c2 = utftext.charCodeAt(i + 1)
              string += String.fromCharCode(((c & 31) << 6) | (c2 & 63))
              i += 2
            } else {
              c2 = utftext.charCodeAt(i + 1)
              c3 = utftext.charCodeAt(i + 2)
              string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63))
              i += 3
            }
          }
          return string
        }
      }
    }
    return customElement
  }
}
