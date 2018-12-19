/**
 * Created by jiachenpan on 16/11/18.
 */
// import { Message } from 'element-ui'
/* url:合法URL ,lowerCase 小写 ，upperCase 大写 ，alphabets 大小写，phone 手机号，card 身份证，email 邮箱 */
const validateMap = {
  url: { rule: /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/, name: 'url输入不正确' },
  lowerCase: { rule: /^[a-z]+$/, name: '只能为小写字母' },
  upperCase: { rule: /^[A-Z]+$/, name: '只能为大写字母' },
  alphabets: { rule: /^[A-Za-z]+$/, name: '只能为大小写字母' },
  phone: { rule: /^1[0-9]{10}$/, name: '请输入正确手机号' },
  card: { rule: /(^\d{18}$)|(^\d{17}(\d|X|x)$)/, name: '请输入有效的身份证' },
  emial: { rule: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, name: '请输入正确的邮箱' }
}

// 必填项
export function validateRequire (rule, value, cb) {
  if (value === '') {
    typeof cb === 'function' && cb()
  } else {
    if (rule.ruleType && rule.ruleType !== '') {
      if (validateMap[rule.ruleType].rule.test(value) === false) {
        cb(validateMap[rule.ruleType].name)
      } else {
        typeof cb === 'function' && cb()
      }
    } else {
      typeof cb === 'function' && cb()
    }
  }
}
