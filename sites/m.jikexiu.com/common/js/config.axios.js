/**
 * @author hbb
 * @time 2018-07-07
 * axios请求相关配置文件
 */

const config = {
  // 接口地址
  // 生产版接口地址
  proApi: 'https://api.jikexiu.com/v1/',
  // 生产版本登录api
  proApiAccount: 'https://account.jikexiu.com/',

  // 测试版接口地址
  testApi: 'https://api_t.jikexiu.com/v1/',
  // 测试版本登录接口
  testApiAccount: 'https://account_t.jikexiu.com/',

  // 生产版web地址
  proWeb: 'https://m.jikexiu.com',

  // 测试版web地址
  testWeb: 'https://t.jikexiu.com',

  // 请求延迟时间
  timeout: 0,

  // 公共参数对象
  params: {},
  // 请求头部信息
  headers: {},

  // 加载配置对象
  loadOptions: {
    // 默认是否启用加载效果
    // isLoad: true,
    // // 加载配置项
    // options: {
    //     // 当前遮罩层对象
    //     target: 'body',
    //     // 加载图标类名
    //     spinner: '',
    //     // 遮罩层背景色
    //     background: '',
    //     // lock 修饰符
    //     lock: false,
    //     // fullscreen 修饰符
    //     fullscreen: true,
    //     // 加载提示文字
    //     text: '拼命加载中...'
    // }
  }
}
export default config
