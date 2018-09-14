<template>
  <div class="wrapper">
    <!--登录-->
    <mip-login
      id="mipLogin"
      on="isLogin:shopCart.watchLogin"/>
    <!--登录 end-->

    <!--商品内容-->
    <div
      v-if="productList != null && productList.length > 0"
      class="spnr clearfix">
      <div
        v-for="(product, index) in productList"
        :key="index">
        <!-- 课程 -->
        <div
          v-if="product.productType == 1"
          class="nr clearfix pr">
          <div class="kc clearfix sgd">
            <div
              v-if="product.course.saleProductKind != 6"
              class="kleft fl">课程</div>
            <div
              v-else
              class="kleft fl">题</div>
            <div class="kcen fl">
              <p class="kcen-t">
                <span v-text="product.course.dispName"/>
              </p>
              <p class="kcen-c">
                <span v-if="product.course.canuseCard == 1">支持学习卡</span>
                <em class="fr">
                  <span v-text="currency(product.course.price)"/>
                </em>
              </p>
            </div>
            <div
              v-if="product.attatchList != null && product.attatchList.length > 0"
              class="sxx">
              <div
                v-for="(attatch, index) in product.attatchList"
                :key="index"
                class="xnr clearfix">
                <p class="xnr-l fl">[赠品]&nbsp;
                  <span v-text="limitTo(attatch.productName,12)"/>&#12288;x1
                </p>
              </div>
            </div>
            <div
              v-if="product.ruleName != null && product.ruleName.length > 0"
              class="sxx">
              <div
                v-for="(ruleName, index) in product.ruleName"
                :key="index"
                class="xnr clearfix">
                <p class="xnr-l fl">[优惠]&nbsp;
                  <span v-text="limitTo(ruleName,15)"/>
                </p>
              </div>
            </div>
          </div>
          <div class="chk abs">
            <input
              :id="'course_' + product.productId"
              type="checkbox"
              name="selectGoods"
              checked
              @click="updateSelection($event,product.productId,product.course.price,1)">
            <label :for="'course_' + product.productId"/>
          </div>
          <div
            v-if="product.productType == 1"
            class="colse abs"
            @click="delProduct(product.course.productId)"/>
        </div>
        <!-- 书 -->
        <div
          v-else
          class="nr clearfix pr bb0">
          <div class="shu clearfix sgd">
            <div class="sleft fl">图书</div>
            <div class="scen fl">
              <p class="scen-t">
                <span v-text="product.saleProductBook.productName"/>
              </p>
              <p
                v-if="product.saleProductBook.canuseCard == 1"
                class="scen-c">支持学习卡</p>
              <div class="scen-b">
                <em class="fr">
                  <span v-text="currency(product.saleProductBook.price)"/>
                </em>
                <div
                  v-if="product.saleProductBook.saleProductKind == 4 && product.saleProductBook.price > 0"
                  class="sl fr">
                  <span
                    v-if="product.saleProductBook.courseEduId != 254"
                    :class="changeJianStyle(product.productNum)"
                    @click="decrease(product.saleProductBook.productId)"/>
                  <input
                    v-if="product.saleProductBook.courseEduId != 254"
                    :ref="product.saleProductBook.productId"
                    :value="product.productNum"
                    type="text"
                    class="sl-inp fl"
                    maxlength="4"
                    minlength="1"
                    @input="handleInputChange(product.saleProductBook.productId)">
                  <input
                    v-if="product.saleProductBook.courseEduId == 254"
                    :value="product.productNum"
                    type="text"
                    class="sl-inp fl"
                    disabled
                    readonly>
                  <span
                    v-if="product.saleProductBook.courseEduId != 254"
                    class="sl-jia an fl"
                    @click="increase(product.saleProductBook.productId)"/>
                </div>
                <div
                  v-if="product.saleProductBook.saleProductKind == 5 || product.saleProductBook.price <= 0"
                  class="sl fr">
                  <input
                    :value="product.productNum"
                    type="text"
                    class="sl-inp fl">
                </div>
              </div>
            </div>
            <div
              v-if="product.attatchList != null && product.attatchList.length > 0"
              class="sxx">
              <div
                v-for="(attatch, index) in product.attatchList"
                :key="index"
                class="xnr clearfix">
                <p class="xnr fl">[赠品]&nbsp;
                  <span v-text="limitTo(attatch.productName,12)"/>&#12288;×1
                </p>
              </div>
            </div>
            <div
              v-if="product.ruleName != null && product.ruleName.length > 0"
              class="sxx">
              <p class="xnr-l fl">[优惠]&nbsp;
                <span v-text="limitTo(ruleName,15)"/>
              </p>
            </div>
          </div>
          <div class="chk abs">
            <input
              :id="'book_' + product.productId"
              checked
              type="checkbox"
              name="selectGoods"
              @click="updateSelection($event,product.productId,product.saleProductBook.price,2)">
            <label :for="'book_' + product.productId"/>
          </div>
          <div
            v-if="product.productType != 1"
            class="colse abs"
            @click="delProduct(product.saleProductBook.productId)"/>
        </div>
      </div>
    </div>
    <!--商品内容 end-->

    <!--空购物车-->
    <div
      v-else
      class="kong clearfix">
      <div class="top pr">您的购物车空空如也,马上开始学习还不晚！
        <i class="abs"/>
      </div>
      <div class="cen">
        <mip-img src="http://sale.chinaacc.com/web/images/mobile/xuanke1/shop_15.png"/>
      </div>
    </div>
    <!--空购物车 end-->

    <!--结算浮层-->
    <div class="kctj clearfix"/>
    <div
      v-if="productList.length != 0"
      class="jsfd">
      <div class="qx fl chkqx clearfix">
        <input
          id="chk_all"
          v-model="isSelectAll"
          type="checkbox"
          name="chk_all"
          @change="selectAll">
        <label
          for="chk_all"
          class="chk_all"/>
        <span class="fr">全选</span>
      </div>
      <span
        v-if="loginFlag"
        class="han fr zgcount"
        on="tap:log.login">去结算</span>
      <span
        v-else
        class="han fr zgcount"
        @click="balance">去结算</span>
      <div class="zj fr">
        合计：
        <b>
          <span id="totalMoney">{{ currency(totalMoney) }}</span>
        </b>
        <p class="zj-b">若有优惠，将在订单结算页面减扣</p>
      </div>
    </div>
    <!--结算浮层 end-->

    <!--重复书籍弹框-->
    <div
      v-if="popBook"
      class="book-mask"/>
    <div
      v-if="popBook"
      class="book-sctk clearfix">
      <div class="cen">订单中有重复书籍，您确认要提交吗？</div>
      <div class="bot">
        <span
          class="bot-l fl colse"
          @click="popBook = false">取消</span>
        <span
          class="bot-r fl colse"
          @click="ensureGoOrder">确定</span>
      </div>
    </div>
    <!--重复书籍弹框 end-->

    <!--选课协议弹出-->
    <div
      v-if="protocol"
      id="protocolsBg"/>
    <div
      v-if="protocol"
      class="protocols">
      <i
        class="closeXY"
        @click="protocol=false"><img src="http://m.chinaacc.com/mip/static/images/protocols-close.png"></i>
      <h1>温馨提示</h1>
      <div class="xyContainer">
        <div
          class="courseXYS"
          v-html="courseXYS"/>
        <div class="btn-wrap">
          <a
            class="sure"
            @click="goNext">我知道了</a>
        </div>
      </div>
    </div>
    <!--选课协议弹出 end-->

  </div>
</template>

<script>
import { getCookie, setCookie } from '../../common/utils/cookie'
import {
  getCartList,
  delShoppingCart,
  checkDupBook,
  getCourseTips
} from '../../common/api'
import { Toast, Loading } from '../../common/utils/toast'
import {
  currency,
  compareSort,
  limitTo,
  emptyArr,
  inNumArray,
  inStrArray,
  gotoUrl
} from '../../common/utils'
export default {
  data () {
    return {
      productList: [],
      isRecommend: 0,
      recommendCourseLi: [],
      recommendBookLi: [],
      recommendTikuLi: [],
      totalMoney: 0,
      isSelectAll: true,
      allGoodsId: [],
      allLen: 0,
      popBook: false,
      protocol: false,
      courseXYS: '',
      loginFlag: true
    }
  },
  mounted () {
    const that = this
    that.initData()
    // 登录监听
    that.$on('watchLogin', function () {
      // 已登录
      that.loginFlag = false
    })
  },
  methods: {
    currency (num) {
      return currency(num)
    },
    limitTo (str, len) {
      return limitTo(str, len)
    },
    changeJianStyle (num) {
      return num > 1 ? 'sl-jian2 fl' : 'sl-jian fl'
    },
    increase (id) {
      let inputVal = parseInt(this.$refs[id][0].value)
      if (!isNaN(inputVal)) {
        if (inputVal >= 9999) {
          let $Toast = new Toast()
          $Toast.open({
            message: '最多只能选9999本！'
          })
        } else {
          this.changeBookCookie(id, inputVal + 1, 1)
        }
      } else {
        this.changeBookCookie(id, 1, 1)
      }
    },
    decrease (id) {
      let inputVal = parseInt(this.$refs[id][0].value)
      if (!isNaN(inputVal)) {
        if (inputVal <= 1) {
          let $Toast = new Toast()
          $Toast.open({
            message: '最少只能选1本！'
          })
        } else {
          this.changeBookCookie(id, inputVal - 1, 1)
        }
      } else {
        this.$refs[id][0].value = 1
        this.changeBookCookie(id, 1, 1)
      }
    },
    handleInputChange (id) {
      let inputVal = parseInt(this.$refs[id][0].value)
      let $Toast = new Toast()
      if (isNaN(inputVal)) {
        this.$refs[id][0].value = 1
      } else {
        if (inputVal <= 1) {
          $Toast.open({
            message: '最少只能选1本！'
          })
          this.$refs[id][0].value = 1
        } else if (inputVal >= 9999) {
          $Toast.open({
            message: '最多只能选9999本！'
          })
          this.$refs[id][0].value = 9999
        }
      }
      this.changeBookCookie(id, this.$refs[id][0].value, 1)
    },
    changeBookCookie (id, num) {
      let cookieBook = getCookie('buy_book_list')
      if (cookieBook != null) {
        cookieBook = cookieBook.replace(/"/g, '')
      }
      let books = cookieBook.split(',')
      let newList = []
      for (let item in books) {
        let items = books[item].split(':')
        if (items[0] + '' === id + '') {
          newList.push(items[0] + ':' + num + ':1')
        } else {
          newList.push(books[item])
        }
      }
      setCookie('buy_book_list', newList.join(','))
      this.initData()
    },
    initData () {
      const that = this
      let $Loading = new Loading()
      $Loading.open()
      // 通过cookie获取所购买的课程、书信息
      let selectCourseList = getCookie('select_course_list')
      if (selectCourseList != null) {
        selectCourseList = selectCourseList.replace(/"/g, '')
      }
      let buyBookList = getCookie('buy_book_list')
      if (buyBookList != null) {
        buyBookList = buyBookList.replace(/"/g, '')
      }
      // 构造请求数据
      let setting = {
        sel_source: '2',
        select_course_list: selectCourseList,
        free_list: '',
        buy_book_list: buyBookList
      }
      getCartList(setting).then(res => {
        that.productList = res.selectProducts.productList.sort(
          compareSort('productType')
        )
        that.allLen = that.productList.length
        setCookie('select_course_list', res.select_course_list)
        setCookie('buy_book_list', res.buy_book_list)
        setCookie('order_book_list', '')
        setCookie('order_course_list', '')
        that.countMoney()
        $Loading.close()
      })
    },
    countMoney () {
      const that = this
      that.totalMoney = 0
      that.productList.forEach(item => {
        if (item.saleProductBook === undefined) {
          // 课程
          that.totalMoney += item.price
        } else {
          // 书
          let bookNum = parseInt(item.productNum)
          that.totalMoney += item.price * bookNum
        }
      })
      let goodsList = document.querySelectorAll('input[name="selectGoods"]')
      goodsList.forEach(item => {
        item.checked = true
      })
      that.isSelectAll = true
    },
    selectAll () {
      let goodsList = document.querySelectorAll('input[name="selectGoods"]')
      if (this.isSelectAll) {
        goodsList.forEach(item => {
          item.checked = true
        })
        this.countMoney()
      } else {
        goodsList.forEach(item => {
          item.checked = false
        })
        this.totalMoney = 0
      }
    },
    isAll () {
      let goodsList = document.querySelectorAll('input[name="selectGoods"]')
      let tmpLen = goodsList.length
      goodsList.forEach(item => {
        if (!item.checked) {
          tmpLen -= 1
        }
      })
      return this.allLen + '' === tmpLen + ''
    },
    updateSelection (e, id, price, type) {
      let $this = e.currentTarget
      if (this.isAll()) {
        this.isSelectAll = true
      } else {
        this.isSelectAll = false
      }
      switch (type) {
        case 1:
          if ($this.checked) {
            this.totalMoney = (this.totalMoney * 10000 + price * 10000) / 10000
          } else {
            this.totalMoney = (this.totalMoney * 10000 - price * 10000) / 10000
          }
          break
        case 2:
          let num = this.$refs[id][0].value
          if ($this.checked) {
            this.totalMoney =
              (this.totalMoney * 10000 + price * 10000 * parseInt(num)) / 10000
          } else {
            this.totalMoney =
              (this.totalMoney * 10000 - price * 10000 * parseInt(num)) / 10000
          }
          break
      }
    },
    delProduct (id) {
      const that = this
      let delProductId = id.toString()
      let setting = {
        delProductId: delProductId
      }
      let $Loading = new Loading()
      $Loading.open()
      delShoppingCart(setting).then(res => {
        let retFlag = res.result
        let rmItem = res.product[0]
        if (retFlag != null && retFlag + '' === '1') {
          // 重写cookie
          // 课程
          let selectCourseList = getCookie('select_course_list')
          if (selectCourseList != null) {
            selectCourseList = selectCourseList.replace(/"/g, '')
          }
          let courses = emptyArr(selectCourseList.split(','))
          let isCourse = inNumArray(rmItem, courses)
          if (isCourse) {
            for (let i = 0; i < courses.length; i++) {
              if (rmItem + '' === courses[i] + '') {
                courses.splice(i, 1)
              }
            }
            setCookie('select_course_list', courses.join(','))
          }

          // 书
          let buyBookList = getCookie('buy_book_list')
          if (buyBookList != null) {
            buyBookList = buyBookList.replace(/"/g, '')
          }
          let books = emptyArr(buyBookList.split(','))
          let isBook = inStrArray(rmItem, books)
          if (isBook) {
            for (let i = 0; i < books.length; i++) {
              if (books[i].indexOf(rmItem) + '' !== '-1') {
                books.splice(i, 1)
              }
            }
            setCookie('buy_book_list', books.join(','))
          }
          that.initData()
        }
      })
    },
    getSubData () {
      const that = this
      let goodsList = document.querySelectorAll('input[name="selectGoods"]')
      let courseArr = []
      let bookArr = []
      goodsList.forEach(item => {
        let goodInfo = item.id.split('_')
        if (item.checked) {
          let name = goodInfo[0]
          let id = goodInfo[1]
          if (name + '' === 'course') {
            courseArr.push(id)
          } else if (name + '' === 'book') {
            let bookNum = that.$refs[id][0].value
            bookArr.push(id + ':' + bookNum + ':1')
          }
        }
      })
      return {
        courseArr: courseArr,
        bookArr: bookArr
      }
    },
    balance () {
      const that = this
      let bookArr = that.getSubData().bookArr
      let courseArr = that.getSubData().courseArr

      if (bookArr.length > 0) {
        let setting = {
          select_book_list: bookArr
        }
        checkDupBook(setting).then(res => {
          if (res + '' === '1') {
            that.popBook = true
          } else {
            if (courseArr.length > 0) {
              that.CourseTips(courseArr)
            } else {
              that.goNext()
            }
          }
        })
      } else {
        if (courseArr.length > 0) {
          that.CourseTips(courseArr)
        } else {
          let $Toast = new Toast()
          $Toast.open({
            message: '请选择结算商品'
          })
          return
        }
      }
      setCookie('order_course_list', courseArr.join(','))
      setCookie('order_book_list', bookArr.join(','))
    },
    ensureGoOrder () {
      let courseArr = this.getSubData().courseArr
      if (courseArr.length > 0) {
        this.CourseTips(courseArr)
      }
    },
    CourseTips (arr) {
      const that = this
      let setting = {
        order_course_list: arr.join(',')
      }
      getCourseTips(setting).then(res => {
        if (res != null && res.length > 0) {
          that.popBook = false
          that.courseXYS = res.join('')
          that.protocol = true
        } else {
          that.goNext()
        }
      })
    },
    goNext () {
      this.protocol = false
      gotoUrl('/payment/submitOrder.html')
    }
  }
}
</script>
