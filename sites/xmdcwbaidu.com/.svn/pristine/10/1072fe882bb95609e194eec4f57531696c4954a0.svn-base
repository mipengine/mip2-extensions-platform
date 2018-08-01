import {Storage} from '../utils/common'

export default function () {
  // let loginInfo = Storage.get('loginInfo')
  // let apitoken = ''
  // if(loginInfo) {
  //   apitoken =  loginInfo.userInfo.apitoken
  // }else {
  //   console.error('loginInfo 参数缺失')
  // }
  // return {
  //   apitoken
  // }

  let apitoken = Storage.get('apitoken')
  console.log('这里是commonParams.js的apitoken', apitoken)
  if (apitoken) {
    return {
      apitoken
    }
  } else {
    console.error('loginInfo 参数缺失')
  }
}
