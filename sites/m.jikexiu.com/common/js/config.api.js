/**
 * @author hbb
 * @time 2018-01-23
 * 项目相关接口配置文件
 */
const baseurl = 'https://api.jikexiu.com/v1/'
const accountUrl = 'https://account.jikexiu.com/'
const apiUrl = {
  bannerList: baseurl + 'common/banner/list', //   首页轮播图接口
  login: accountUrl + 'authentication/mobile', // 登录接口
  count: baseurl + 'common/count', // 修复手机数量
  hotRepaire: baseurl + 'common/hotrepair', // 热门维修
  appraiseList: baseurl + 'appraise/list/good', // 评价列表
  imgCode: baseurl + 'common/imgcode', // 图形验证码
  provinceList: baseurl + 'common/province/list', // 省列表
  cityList: baseurl + 'common/city/list', // 市列表
  distList: baseurl + 'common/dist/list', // 区列表
  categoryList: baseurl + 'device/category/list', // 分类列表
  deviceList: baseurl + 'device/list', // 设备列表
  getMalfunction: baseurl + 'device/sm/getMalfunction', // 获取故障列表
  getUserOrderList: baseurl + 'device/attr/list', // 获取颜色列表
  sendCode: baseurl + 'common/smscode', // 发送短信验证码
  codeValidate: baseurl + 'common/validate', // 验证验证码
  refreshToken: accountUrl + 'oauth/token', // 刷新token
  saveOrder: baseurl + 'order/saveOrder', // 保存订单
  getSms: baseurl + 'device/sm/getSms', // 根据id获取故障设备信息
  getByName: baseurl + 'common/dist/getByName' // 根据市区获取市区id
}

export default apiUrl
