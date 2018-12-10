// const urls = "https://mip.1hai.com";
// const urls = "http://frontdemo.1hai.com/mip/";
const urls = "http://127.0.0.1:8111/mip/";

// const baseUrl = "https://appmini.1hai.cn/Baidu/"; // prod
// const baseUrl = 'https://unifytest.1hai.cn/BaiduDemo/'; // demo
const baseUrl = "https://unifytest.1hai.cn/mdev/"; // dev

const transformObjUrlToCache = urls => {
  let result = {};

  Object.keys(urls).map(key => {
    result[key] = MIP.util.makeCacheUrl(urls[key]);
    result[key] = urls[key];
  });

  return result;
};

export default {
  // dev
  htmlHref: transformObjUrlToCache({
    home: urls + "index.html",
    step1: urls + "step1.html",
    step1City: urls + "step1City.html",
    step1Store: urls + "step1Store.html",
    step2: urls + "step2.html",
    step3: urls + "step3.html",
    step3Complete: urls + "step3Complete.html",
    step4: urls + "step4.html",
    login: urls + "login.html",
    my: urls + "my.html",
    orderList: urls + "orderList.html",
    orderDetail: urls + "orderDetail.html"
  }),

  apiHref: {
    GetFocusPicture: baseUrl + "News/FocusPicture/List?",

    BookingInit: baseUrl + "Booking/InitCart",
    Step1SubmitValidate: baseUrl + "Booking/ValidateCart",

    StoreNearby: baseUrl + "AddressInfo/StoreNearby?",
    CityList: baseUrl + "AddressInfo/CityList?",
    StoreList: baseUrl + "AddressInfo/StoreList?",

    StoreListNear: baseUrl + "Store/List/Distance?",

    StockList: baseUrl + "Car/StoreStockList",
    Step2SubmitValidate: baseUrl + "Booking/SubmitCart",

    GetVerifyCode: baseUrl + "AuthCode",
    LoginPass: baseUrl + "Session/Login",

    GetPriceDetail: baseUrl + "Price/All",
    GetZhimaAndIllegal: baseUrl + "Price/Initialization",
    GetAddedService: baseUrl + "Price/AddedNew",
    GetAddedServiceList: baseUrl + "AddedService/List",
    AppointCarTypes: baseUrl + "Car/AppointCarType",
    GetPromotions: baseUrl + "OrderPromotion/OrderPromotionsAll",
    BindPromotionCode: baseUrl + "OrderPromotion/BindPromotionCode?query=",

    GetBlackListUserInfo: baseUrl + "Verify/BlackListUserInfo?",
    CreateOrder: baseUrl + "Orders/CreateOrderV2",

    GetCardType: baseUrl + "Mobile/Enum?",
    UpdateUser: baseUrl + "User/UpdateUser/SaveImage",

    UserBase: baseUrl + "User/Base?",

    CardCouponCount: baseUrl + "User/CardCoupon/Count?",
    UserBalance: baseUrl + "ChargeAccount/UserBalance?",
    UserPoints: baseUrl + "OrderPromotion/UserPoint?",
    UserFreeDays: baseUrl + "User/FreeDays?",

    GetOrderList: baseUrl + "Orders/List?",
    GetOrderDetail: baseUrl + "Orders/Detail?",
    CancelOrder: baseUrl + "Orders/",

    Renters: baseUrl + "FrequentContacts",
    IllegallyList: baseUrl + "Illegal/IllegalList?",

    AlipaySmallProgram: baseUrl + "Alipay/SmallProgram/Pay",
    GetAliyAuthUrl: baseUrl + "Mobile/AliyAuthUrl"
  }
};
