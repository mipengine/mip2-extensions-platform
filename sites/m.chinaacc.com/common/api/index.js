import Base from '../utils/config'
import Req from '../utils/request'
import {
  formatParams
} from '../utils'
// 获取课程详情
export const getCourseDetail = params => {
  let param = {
    para: JSON.stringify(params),
    domain: 'chinaacc',
    resourcePath: '+/xuanke/product/detailJson'
  }
  return Req(Base.commonUrl, formatParams(param))
}

// 获取购物车数量
export const getShopCartNum = () => {
  let param = {
    para: '',
    domain: 'chinaacc',
    resourcePath: '+/xuanke/shopCartNum/getShopCartNum'
  }
  return Req(Base.commonUrl, formatParams(param))
}

// 添加购物车、获取购物车内容
export const getCartList = params => {
  let param = {
    para: JSON.stringify(params),
    domain: 'chinaacc',
    resourcePath: '+/xuanke/shoppingCart/addShoppingCart'
  }
  return Req(Base.commonUrl, formatParams(param))
}

// 删除购物车
export const delShoppingCart = params => {
  let param = {
    para: JSON.stringify(params),
    domain: 'chinaacc',
    resourcePath: '+/xuanke/shoppingCart/delShoppingCart'
  }
  return Req(Base.commonUrl, formatParams(param))
}

// 判断重复书籍
export const checkDupBook = params => {
  let param = {
    para: JSON.stringify(params),
    domain: 'chinaacc',
    resourcePath: '+/xuanke/shoppingCart/checkDupBook'
  }
  return Req(Base.commonUrl, formatParams(param))
}

// 获取购物车辅导提示信息
export const getCourseTips = params => {
  let param = {
    para: JSON.stringify(params),
    domain: 'chinaacc',
    resourcePath: '+/xuanke/shoppingCart/getCourseTips'
  }
  return Req(Base.commonUrl, formatParams(param))
}

// 获取订单详情
export const getOrderDetail = params => {
  let param = {
    para: JSON.stringify(params),
    domain: 'chinaacc',
    resourcePath: '~/xuanke/order/getOrderDetail'
  }
  return Req(Base.commonUrl, formatParams(param))
}

// 获取折扣详情
export const getSpecialDiscount = params => {
  let param = {
    para: JSON.stringify(params),
    domain: 'chinaacc',
    resourcePath: '~/xuanke/order/getSpecialDiscountForBaidu'
  }
  return Req(Base.commonUrl, formatParams(param))
}

// 提交订单
export const updateOrder = params => {
  let param = {
    para: JSON.stringify(params),
    domain: 'chinaacc',
    resourcePath: '~/xuanke/order/updateOrderAndOrderDetail'
  }
  return Req(Base.commonUrl, formatParams(param))
}

// 获取地址列表
export const getAddressList = params => {
  let param = {
    para: JSON.stringify(params),
    domain: 'chinaacc',
    resourcePath: '~/xuanke/order/getUseAddressList'
  }
  return Req(Base.commonUrl, formatParams(param))
}

// 地址修改回显
export const getShopMemPostInfo = params => {
  let param = {
    para: JSON.stringify(params),
    domain: 'chinaacc',
    resourcePath: '~/xuanke/order/getShopMemPostInfo'
  }
  return Req(Base.commonUrl, formatParams(param))
}

// 修改地址
export const updatePostInfoInvoice = params => {
  let param = {
    para: JSON.stringify(params),
    domain: 'chinaacc',
    resourcePath: '~/xuanke/order/updatePostInfoInvoice'
  }
  return Req(Base.commonUrl, formatParams(param))
}

// 选择地址确定按钮
export const updatePostInfo = params => {
  let param = {
    para: JSON.stringify(params),
    domain: 'chinaacc',
    resourcePath: '~/xuanke/order/updatePostInfo'
  }
  return Req(Base.commonUrl, formatParams(param))
}

// 新增地址并使用

export const updatePostInfoInvoiceChangeOrder = params => {
  let param = {
    para: JSON.stringify(params),
    domain: 'chinaacc',
    resourcePath: '~/xuanke/order/updatePostInfoInvoiceChangeOrder'
  }
  return Req(Base.commonUrl, formatParams(param))
}

// 获取全部订单
export const getAllOrderData = params => {
  let param = {
    para: JSON.stringify(params),
    domain: 'chinaacc',
    resourcePath: '~/xuanke/order/getSaleOrderPage'
  }
  return Req(Base.commonUrl, formatParams(param))
}

// 获取地区列表
export const getAreaCode = params => {
  let param = {
    para: JSON.stringify(params),
    domain: 'chinaacc',
    resourcePath: '+/xuanke/order/getAreaInfoJson'
  }
  return Req(Base.commonUrl, formatParams(param))
}

// 核实登录
export const getCheckLogin = params => {
  let param = {
    para: JSON.stringify(params),
    domain: 'chinaacc',
    resourcePath: '+/xuanke/shoppingCart/checkLogin'
  }
  return Req(Base.commonUrl, formatParams(param))
}

// 获取发票信息
export const getInvoiceInfo = params => {
  let param = {
    para: JSON.stringify(params),
    domain: 'chinaacc',
    resourcePath: '~/xuanke/invoice/initJson'
  }
  return Req(Base.commonUrl, formatParams(param))
}

// 保存发票信息
export const saveInvoiceInfo = params => {
  let param = {
    para: JSON.stringify(params),
    domain: 'chinaacc',
    resourcePath: '~/xuanke/invoice/saveSaleInvoiceJson'
  }
  return Req(Base.commonUrl, formatParams(param))
}

// 不开发票信息
export const noInvoiceInfo = params => {
  let param = {
    para: JSON.stringify(params),
    domain: 'chinaacc',
    resourcePath: '~/xuanke/invoice/noInvoiceJson'
  }
  return Req(Base.commonUrl, formatParams(param))
}

// 判断是否有已绑定的登录用户
export const verifyBDLogin = () => {
  return Req('//m.chinaacc.com/m_member/baidu/verifyBDLogin.shtm', '', 'jsonpCallback')
}

// 获取支付接口
export const getPayUrl = params => {
  return Req('//sale.chinaacc.com/xuanke/payment/mipToPay.shtm?', formatParams(params))
}

// 支付接口
export const toBankPage = params => {
  let param = {
    para: JSON.stringify(params),
    domain: 'chinaacc',
    resourcePath: '~/xuanke/selectPayStyle/toBankPage'
  }
  return Req(Base.commonUrl, formatParams(param))
}
