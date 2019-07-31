const cache = MIP.util.customStorage(0)

export const get = key => cache.get(key)

export const set = (key, value, expire) => cache.set(key, value, expire)

export const remove = key => cache.rm(key)

export const clear = () => cache.clear()
