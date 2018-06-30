export default ({
  mapInit: function () {
    document.getElementsByTagName('body')[0].setAttribute('style', 'height:100% !important')
    let BMAP_STATUS_SUCCESS = 0
    function AddressSearch (BMap, cityName, provinceFilter, pageSize, searchComplete) {
      let that = this
      that.data = {}
      that.provinceReg = new RegExp(provinceFilter)
      that.searchComplete = searchComplete || function () {}
      that.pageindex = 0

      let onSearchComplete = function (results) {
        // console.log("_bMap.getStatus", that._bMap.getStatus());
        if (that._bMap.getStatus() === 0) {
          // 判断状态是否正确
          let searchData = {
            keyword: results.keyword,
            data: [],
            pageIndex: results.getPageIndex(),
            pageNum: results.getNumPages()
          }
          for (let i = 0; i < results.getCurrentNumPois(); i++) {
            let poi = results.getPoi(i)
            if (that.provinceReg.test(poi.province)) {
              searchData.data.push({
                title: poi.title,
                address: (poi.address || ''),
                lat: poi.point.lat,
                lng: poi.point.lng,
                city: poi.city,
                province: poi.province
              })
            }
          }
          that.setpageindex(results.getPageIndex())
          that.setCachedData(results.keyword, results.getPageIndex(), searchData)
          that.searchComplete(searchData)
        } else {
          that.searchComplete(false)
        }
      }
      that._bMap = new BMap.LocalSearch(cityName, {
        onSearchComplete: onSearchComplete
      })
      that._bMap.setLocation(cityName)
      that._bMap.setPageCapacity(pageSize)
    }

    AddressSearch.prototype.getCachedData = function (keyword, pageIndex) {
      return this.data[keyword + '::' + pageIndex]
    }
    AddressSearch.prototype.setCachedData = function (keyword, pageIndex, searchData) {
      this.data[keyword + '::' + pageIndex] = searchData
    }

    AddressSearch.prototype.search = function (queryStr) {
      let that = this

      that.keyword = queryStr
      that.pageindex = 0
      let searchData = that.getCachedData(that.keyword, that.pageindex)
      if (searchData) {
        that.searchComplete(searchData)
      } else {
        that._bMap.search(that.keyword, {
          forceLocal: true
        })
      }
    }

    AddressSearch.prototype.gotoPrePage = function () {
      let that = this

      let currentpageindex = that.getpageindex() - 1
      if (currentpageindex < 0) {
        currentpageindex = 0
      }

      that.gotoPage(currentpageindex)
    }

    AddressSearch.prototype.gotoNextPage = function () {
      let that = this

      let currentpageindex = that.getpageindex() + 1
      if (currentpageindex < that.getPageNum()) {
        that.gotoPage(currentpageindex)
      } else {
        that.searchComplete(false)
      }
    }

    AddressSearch.prototype.gotoPage = function (pageIndex) {
      let that = this
      let searchData = that.getCachedData(that.keyword, pageIndex)
      if (searchData) {
        that.setpageindex(pageIndex)
        that.searchComplete(searchData)
      } else {
        that._bMap.gotoPage(pageIndex)
      }
    }

    AddressSearch.prototype.getCityList = function () {
      return this._bMap.getResults().getCityList()
    }
    AddressSearch.prototype.getPageSize = function () {
      return this._bMap.getResults().getCurrentNumPois()
    }
    AddressSearch.prototype.getPageNum = function () {
      return this._bMap.getResults().getNumPages()
    }
    AddressSearch.prototype.getPositionSize = function () {
      return this._bMap.getResults().getNumPois()
    }
    AddressSearch.prototype.getpageindex = function () {
      return this.pageindex
    }
    AddressSearch.prototype.setpageindex = function (pageIndex) {
      this.pageindex = pageIndex
    }

    function BaiduMap (element, divs, address, setnitdata) {
      // this.config = config;
      this.ele = element
      this.divs = divs
      this.address = address
      this.setnitdata = setnitdata
      this.citylist = {
        '北京': {
          'title': '北京南站',
          'address': '北京市丰台区永外大街12号',
          'lat': 39.87128,
          'lng': 116.385488,
          'city': '北京市',
          'province': '北京市'
        },
        '上海': {
          'title': '上海虹桥火车站',
          'address': '上海市闵行区申贵路1500号',
          'lat': 31.200547,
          'lng': 121.326997,
          'city': '上海市',
          'province': '上海市'
        },
        '杭州': {
          'title': '杭州站',
          'address': '浙江省杭州市上城区环城东路1号',
          'lat': 30.249207,
          'lng': 120.189606,
          'city': '杭州市',
          'province': '浙江省'
        },

        '深圳': {
          'title': '深圳火车站',
          'address': '广东省深圳市罗湖区建设路1003号',
          'lat': 22.537961,
          'lng': 114.123611,
          'city': '深圳市',
          'province': '广东省'
        },

        '广州': {
          'title': '广州火车站',
          'address': '广州市越秀区环市西路159号',
          'lat': 23.154981,
          'lng': 113.264437,
          'city': '广州市',
          'province': '广东省'
        },

        '郑州': {
          'title': '郑州站',
          'address': '河南省郑州市二七区二马路82号',
          'lat': 34.752394,
          'lng': 113.666136,
          'city': '郑州市',
          'province': '河南省'
        },

        '南京': {
          'title': '南京火车站',
          'address': '南京市玄武区龙蟠路111号',
          'lat': 32.093502,
          'lng': 118.803714,
          'city': '南京市',
          'province': '江苏省'
        },

        '武汉': {
          'title': '武汉火车站',
          'address': '轨道交通4号线',
          'lat': 30.613165,
          'lng': 114.432237,
          'city': '武汉市',
          'province': '湖北省'
        },

        '成都': {
          'title': '成都站',
          'address': '四川省成都市金牛区站东路1号',
          'lat': 30.703259,
          'lng': 104.079853,
          'city': '成都市',
          'province': '四川省'
        },

        '重庆': {
          'title': '重庆站',
          'address': '重庆市渝中区菜园坝街道南区路249号',
          'lat': 29.555927,
          'lng': 106.553776,
          'city': '重庆市',
          'province': '重庆市'
        },
        '天津': {
          'lng': 117.216853,
          'lat': 39.142488,
          'title': '天津站',
          'address': '天津市河北区新纬路1号',
          'city': '天津市',
          'province': '天津市'
        },
        '东莞': {
          'title': '东莞火车站',
          'address': '广东省东莞市石龙镇西湖区环湖西路',
          'lat': 23.094664,
          'lng': 113.865486,
          'city': '东莞市',
          'province': '广东省'
        },
        '洛阳': {
          'title': '洛阳站',
          'address': '洛阳市道南路1号',
          'lat': 34.691747,
          'lng': 112.442586,
          'city': '洛阳市',
          'province': '河南省'
        },
        '安阳': {
          'title': '安阳火车站',
          'address': '河南省安阳市解放大道最西端',
          'lat': 36.110865,
          'lng': 114.34631,
          'city': '安阳市',
          'province': '河南省'
        }
      }
    }

    BaiduMap.prototype.handleResult = function (BMap, city, func) {
      this.map = new BMap.Map(this.divs)
      console.log()
      // this.map.centerAndZoom(new BMap.Point(116.404, 39.915), 17);
      let map = this.map
      console.log(city)
      let that = this
      let geolocation = new BMap.Geolocation()

      let geoc = new BMap.Geocoder()
      if (that.address.localtion.address === '') {
        geolocation.getCurrentPosition(function (r) {
          console.log(this.getStatus())
          console.log(BMAP_STATUS_SUCCESS)
          if (this.getStatus() === BMAP_STATUS_SUCCESS) {
            console.log('==============定位=================')
            let pt = r.point
            geoc.getLocation(pt, function (rs) {
              let addComp = rs.addressComponents
              console.log(addComp)
              console.log('===========================')
              let currentCity = addComp.province
              currentCity = currentCity.substring(0, currentCity.length - 1)
              console.log('当前城市:' + city)
              console.log('定位城市' + currentCity)
              if (city !== currentCity) {
                // 选择与定位城市 不一致
                console.log('==============选择与定位城市 不一致=============')
                let cityData = that.citylist[city]

                console.log(cityData)
                // 填充默认数据
                let point = new BMap.Point(cityData.lng, cityData.lat) // 创建点坐标
                map.clearOverlays()
                let myIcon = new BMap.Icon('https://www.lanxiniu.com/Public/baidumip/mapicon.png', new BMap.Size(26, 32))
                let mk = new BMap.Marker(point, {
                  icon: myIcon
                })
                map.addOverlay(mk)
                map.centerAndZoom(point, 16)
                // 根据存储的数据 默认定
                let obj = {
                  address: cityData.address,
                  city: '',
                  lat: cityData.lat,
                  lng: cityData.lng,
                  province: cityData.province,
                  title: cityData.title
                }
                let data = {
                  localtion: obj,
                  address: '',
                  phone: that.address.phone
                }
                console.log('查看:' + JSON.stringify(obj, null, 2))
                that.setnitdata(data)
              } else {
                //
                console.log('==============选择与定位城市一致=============')
                if (that.address.localtion.address === '') {
                  let myIcon = new BMap.Icon('https://www.lanxiniu.com/Public/baidumip/mapicon.png', new BMap.Size(26, 32))
                  let mk = new BMap.Marker(r.point, {
                    icon: myIcon
                  })
                  map.addOverlay(mk)
                  map.centerAndZoom(r.point, 16)

                  let pt = r.point
                  geoc.getLocation(pt, function (rs) {
                    let addComp = rs.addressComponents
                    console.log(addComp)
                    let obj = {
                      address: addComp.district,
                      city: '',
                      lat: pt.lat,
                      lng: pt.lng,
                      province: addComp.province,
                      title: addComp.street + ' ' + addComp.streetNumber
                    }
                    let data = {
                      localtion: obj,
                      address: '',
                      phone: that.address.phone
                    }
                    console.log('查看:' + JSON.stringify(obj, null, 2))
                    that.setnitdata(data)
                  })
                } else {
                  let localtion = this.address.localtion
                  let point = new BMap.Point(localtion.lng, localtion.lat) // 创建点坐标
                  map.clearOverlays()
                  let myIcon = new BMap.Icon('https://www.lanxiniu.com/Public/baidumip/mapicon.png', new BMap.Size(26, 32))
                  let mk = new BMap.Marker(point, {
                    icon: myIcon
                  })
                  map.addOverlay(mk)
                  map.centerAndZoom(point, 16)
                  this.setnitdata(this.address)
                }
              }
            })
          } else {
            console.log('==========测试=============')
          }
        }, {
          enableHighAccuracy: true
        })
      } else {
        let localtion = this.address.localtion
        let point = new BMap.Point(localtion.lng, localtion.lat) // 创建点坐标
        map.clearOverlays()
        let myIcon = new BMap.Icon('https://www.lanxiniu.com/Public/baidumip/mapicon.png', new BMap.Size(26, 32))
        let mk = new BMap.Marker(point, {
          icon: myIcon
        })
        map.addOverlay(mk)
        map.centerAndZoom(point, 16)
        this.setnitdata(this.address)
      }

      // 如果地址数据为空,取用浏览器定位数据
      console.log(this.address.localtion)

      let addressSearch = new AddressSearch(BMap, city,
        '', 20,
        function (searchData) {
          console.log('查看搜索地址数据:' + searchData)
          if (!searchData || !searchData.data || !searchData.data.length) {
            // 无匹配地址
            return false
          }
          func(searchData)
        })
      return addressSearch
    }
    return BaiduMap
  }
})
