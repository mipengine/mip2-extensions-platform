import Request from './request';
import { Base64 } from 'js-base64';

const Api = {

  getAccessToken: async (UID, SECRET) => {
    const opts = {
      url: '/oauth/token',
      method: 'POST',
      params: {
        "grant_type": 'client_credentials'
      },
      headers: {
        'Authorization': 'Basic' + ' ' + Base64.encode(`${UID}:${SECRET}`)
      }
    };
    return await Request(opts);
  },

  getAreaConfig: async (slug) => {

    const opts = {
      url: '/v1/current_app',
      params: {
        slug
      }
    };
    return await Request(opts);
  },
  getCsrfToken: async (slug) => {

    const opts = {
      url: '/v1/csrf/token',
    };
    return await Request(opts);
  },
  getPostion: async () => {
    let map, geolocation;

    const options = {
      enableHighAccuracy: true,//是否使用高精度定位，默认:true
      timeout: 4000,          //超过10秒后停止定位，默认：无穷大
    };
    // 若果是 http 禁止浏览器定位
    if (location.protocol == 'http:') {
     // options['noGeoLocation'] = 1;
    }

    //加载地图，调用浏览器定位服务
    map = new AMap.Map('__container__', {
      resizeEnable: true
    });

    return new Promise ((reslove, reject) => {
      map.plugin('AMap.Geolocation', function () {
        geolocation = new AMap.Geolocation(options);
  
        geolocation.getCurrentPosition();
  
        AMap.event.addListener(geolocation, 'complete', (data) => {
          reslove(data);
        });//返回定位信息
        AMap.event.addListener(geolocation, 'error', (err) => {
          reject(err);
        });
      }); //返回定位出错信息
    });
  },
  getCityInfoByCode: async (adcode) => {
    const opts = {
      url: `/v1/divisions/${adcode}/parent`,
    };
    return await Request(opts);
  },
  getCityInfoByIp: async () => {
    const opts = {
      url: `/v1/divisions/ip`,
    };
    return await Request(opts);
  }
};

export default Api;