function base64Decode (str) {
  if (!str) return ''
  let base64DecodeChars = [
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
    52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
    -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
    -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1]
  // 解码的方法
  let c1, c2, c3, c4
  let i, len, out
  len = str.length
  i = 0
  out = ''
  while (i < len) {
    do {
      c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff]
    } while (i < len && c1 === -1)
    if (c1 === -1) { break }

    do {
      c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff]
    } while (i < len && c2 === -1)
    if (c2 === -1) { break }
    out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4))

    do {
      c3 = str.charCodeAt(i++) & 0xff
      if (c3 === 61) { return out }
      c3 = base64DecodeChars[c3]
    } while (i < len && c3 === -1)
    if (c3 === -1) { break }
    out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2))

    do {
      c4 = str.charCodeAt(i++) & 0xff
      if (c4 === 61) { return out }
      c4 = base64DecodeChars[c4]
    } while (i < len && c4 === -1)
    if (c4 === -1) { break }
    out += String.fromCharCode(((c3 & 0x03) << 6) | c4)
  }
  return out
}
function base64Encode (str) {
  if (!str) return ''
  let c1, c2, c3
  let base64EncodeChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
  let i = 0
  let len = str.length
  let string = ''
  while (i < len) {
    c1 = str.charCodeAt(i++) & 0xff
    if (i === len) {
      string += base64EncodeChars.charAt(c1 >> 2)
      string += base64EncodeChars.charAt((c1 & 0x3) << 4)
      string += '==='
      break
    }
    c2 = str.charCodeAt(i++)
    if (i === len) {
      string += base64EncodeChars.charAt(c1 >> 2)
      string += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4))
      string += base64EncodeChars.charAt((c2 & 0xF) << 2)
      string += '='
      break
    }
    c3 = str.charCodeAt(i++)
    string += base64EncodeChars.charAt(c1 >> 2)
    string += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4))
    string += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6))
    string += base64EncodeChars.charAt(c3 & 0x3F)
  }
  return string
}

// 生成随机Nonce的方式
function createLoginNonce (uuid, timestamp) {
  return `${uuid}_:_${timestamp}`
}

// 加密随机Nonce
function encryptLoginNonce (uuid, timestamp) {
  return base64Encode(createLoginNonce(uuid, timestamp))
}
function newGuid () {
  let guid = ''
  for (let i = 1; i <= 32; i++) {
    let n = Math.floor(Math.random() * 16.0).toString(16)
    guid += n
    if ((i === 8) || (i === 12) || (i === 16) || (i === 20)) { guid += '-' }
  }
  return guid
}
export {
  base64Decode,
  base64Encode,
  encryptLoginNonce,
  newGuid
}
