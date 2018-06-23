/**
 * @author hbb
 * @time 2018-01-23
 * 项目相关接口配置文件
*/

const apiUrl = {
  login: 'authentication/mobile',                 // 登录接口 
  count:'common/count',                            //修复手机数量
  hotRepaire: 'common/hotrepair',                 // 热门维修
  appraiseList: 'appraise/list/good',             // 评价列表
  imgCode: 'common/imgcode',                      // 图形验证码
  provinceList: 'common/province/list',            // 省列表
  cityList: 'common/city/list',                    // 市列表
  distList: 'common/dist/list',                    // 区列表
  categoryList: 'device/category/list',            // 分类列表
  deviceList: 'device/list',                         // 设备列表
  getMalfunction: 'device/sm/getMalfunction',       // 获取故障列表
  getUserOrderList: 'device/attr/list',              // 获取颜色列表
  sendCode: 'common/smscode',                        // 发送短信验证码
  codeValidate: 'common/validate',                   // 验证验证码
  refreshToken: 'oauth/token', // 刷新token
  saveOrder: 'order/saveOrder', // 保存订单
  getByName:'common/dist/getByName'  //根据市区获取市区id
}

export default apiUrl
