import {setUrlParam} from './common'
import getCommonParams from '../js/commonParams'
import {gConst} from '../js/config'
import {Mtoast} from './toast'
import {Mloading} from './loading'
import {Mdialog} from './dialog'
const Toast = new Mtoast()
const Loading = new Mloading()
const Dialog = new Mdialog()

const successState = function (res, opts) {
  Loading.close() // 隐藏loading
  // 统一判断后端返回的错误码
  // 默认弹出错误, isAlertErr: false 不弹出错误
  if (!opts.hasOwnProperty('isAlertErr') || (opts.hasOwnProperty('isAlertErr') && opts.isAlertErr !== false)) {
    Dialog.open({
      title: '提示',
      message: res.msg || '网络异常',
      showCancelButton: false
    })
  }
}

const errorState = function (response, opts) {
  Loading.close() // 隐藏loading
  // 如果http状态码正常，则直接返回数据
  if (response && (response.status !== 200 || response.status !== 304 || response.status !== 400)) {
    Toast.open('网络异常')
    // 如果不需要除了data之外的数据，可以直接 return response.data
  }
}

const $fetch = function (opts, params) {
  params = Object.assign({}, params, getCommonParams())
  let url = `${gConst.BASE_URL}${opts.url}`
  opts.credentials = 'include'
  // opts.credentials = 'same-origin'

  if (opts.method === 'get') {
    url = `${url}?${setUrlParam(params)}`
  }
  if (opts.method === 'post' || opts.method === 'put') {
    // 根据后端接受什么形式的数据选择对应的body与headers
    // opts.body = JSON.stringify(params)
    // opts.body = params
    url = `${url}?${setUrlParam(params)}`
  }
  // 参数为空或空对象时
  if (!params || (typeof params !== 'object') || !(Object.keys(params).length)) {
    url = `${gConst.BASE_URL}${opts.url}`
  }

  if (!opts.hasOwnProperty('headers')) {
    // 默认headers
    opts.headers = {
      'Accept': 'application/json'
    }
    if (opts.method === 'post' || opts.method === 'put') {
      // 根据后端接受什么形式的数据选择对应的body与headers
      opts.headers = {
        // 'Accept': 'application/json',
        // 'Content-Type': 'application/json; charset=utf-8'
      }
    }
  }

  let options = {
    // body: opts.body,
    method: opts.method
    // headers: opts.headers
  }
  return new Promise((resolve, reject) => {
    if (opts.hasOwnProperty('tip') && opts.tip === true) {
      Loading.open('请稍等...')
    } else if (opts.hasOwnProperty('tip') && opts.tip && typeof opts.tip === 'string') {
      Loading.open(opts.tip)
    }
    fetch(url, options).then(res => {
      return res.json()
    }).then(data => {
      console.log('fetch data', data)
      if (data.code === 200 || data.code === '200') {
        // resolve(res.data.result);

        resolve(data.result)
        Loading.close()
      } else {
        reject(data)
        successState(data, opts)
      }
    }).catch(err => {
      console.log('fetch err', err)
      // 捕获异常
      reject(err)
      errorState(err)
    })
  })
}

export default $fetch
