export const getTypeOf = v =>
  v === undefined
    ? 'undefined'
    : v === null
      ? 'null'
      : v.constructor.name.toLowerCase()

export const isTypeOf = (v, t) => getTypeOf(v) === t

export const isObject = v => isTypeOf(v, 'object')

export const isString = v => isTypeOf(v, 'string')

export const isJSON = str => {
  try {
    str = JSON.parse(str)
  } catch (e) {
    return false
  }
  return isObject(str)
}
