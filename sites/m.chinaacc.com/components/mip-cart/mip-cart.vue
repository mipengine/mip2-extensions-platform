<template>
  <div class="wrapper">
    <!--登录-->
    <mip-login id="mipLogin" on="isLogin:shopCart.watchLogin"></mip-login>
    <!--登录 end-->

    <!--商品内容-->
    <div class="spnr clearfix" v-if="productList != null && productList.length > 0">
      <div v-for="(product, index) in productList" :key="index">
        <!-- 课程 -->
        <div class="nr clearfix pr" v-if="product.productType == 1">
          <div class="kc clearfix sgd">
            <div class="kleft fl" v-if="product.course.saleProductKind != 6">课程</div>
            <div class="kleft fl" v-else>题</div>
            <div class="kcen fl">
              <p class="kcen-t">
                <span v-text="product.course.dispName"></span>
              </p>
              <p class="kcen-c">
                <span v-if="product.course.canuseCard == 1">支持学习卡</span>
                <em class="fr">
                  <span v-text="currency(product.course.price)"></span>
                </em>
              </p>
            </div>
            <div class="sxx" v-if="product.attatchList != null && product.attatchList.length > 0">
              <div class="xnr clearfix" v-for="(attatch, index) in product.attatchList" :key="index">
                <p class="xnr-l fl">[赠品]&nbsp;
                  <span v-text="limitTo(attatch.productName,12)"></span>&#12288;x1
                </p>
              </div>
            </div>
            <div class="sxx" v-if="product.ruleName != null && product.ruleName.length > 0">
              <div class="xnr clearfix" v-for="(ruleName, index) in product.ruleName" :key="index">
                <p class="xnr-l fl">[优惠]&nbsp;
                  <span v-text="limitTo(ruleName,15)"></span>
                </p>
              </div>
            </div>
          </div>
          <div class="chk abs">
            <input type="checkbox" name="selectGoods" :id="'course_' + product.productId" checked @click="updateSelection($event,product.productId,product.course.price,1)">
            <label :for="'course_' + product.productId"></label>
          </div>
          <div class="colse abs" v-if="product.productType == 1" @click="delProduct(product.course.productId)"></div>
        </div>
        <!-- 书 -->
        <div class="nr clearfix pr bb0" v-else>
          <div class="shu clearfix sgd">
            <div class="sleft fl">图书</div>
            <div class="scen fl">
              <p class="scen-t">
                <span v-text="product.saleProductBook.productName"></span>
              </p>
              <p class="scen-c" v-if="product.saleProductBook.canuseCard == 1">支持学习卡</p>
              <div class="scen-b">
                <em class="fr">
                  <span v-text="currency(product.saleProductBook.price)"></span>
                </em>
                <div class="sl fr" v-if="product.saleProductBook.saleProductKind == 4 && product.saleProductBook.price > 0">
                  <span v-if="product.saleProductBook.courseEduId != 254" :class="changeJianStyle(product.productNum)" @click="decrease(product.saleProductBook.productId)"></span>
                  <input type="text" class="sl-inp fl" :ref="product.saleProductBook.productId" v-if="product.saleProductBook.courseEduId != 254" maxlength="4" minlength="1" :value="product.productNum" @input="handleInputChange(product.saleProductBook.productId)">
                  <input type="text" class="sl-inp fl" v-if="product.saleProductBook.courseEduId == 254" :value="product.productNum" disabled readonly>
                  <span class="sl-jia an fl" v-if="product.saleProductBook.courseEduId != 254" @click="increase(product.saleProductBook.productId)"></span>
                </div>
                <div class="sl fr" v-if="product.saleProductBook.saleProductKind == 5 || product.saleProductBook.price <= 0">
                  <input type="text" class="sl-inp fl" :value="product.productNum">
                </div>
              </div>
            </div>
            <div class="sxx" v-if="product.attatchList != null && product.attatchList.length > 0">
              <div class="xnr clearfix" v-for="(attatch, index) in product.attatchList" :key="index">
                <p class="xnr fl">[赠品]&nbsp;
                  <span v-text="limitTo(attatch.productName,12)"></span>&#12288;×1
                </p>
              </div>
            </div>
            <div class="sxx" v-if="product.ruleName != null && product.ruleName.length > 0">
              <p class="xnr-l fl">[优惠]&nbsp;
                <span v-text="limitTo(ruleName,15)"></span>
              </p>
            </div>
          </div>
          <div class="chk abs">
            <input checked type="checkbox" name="selectGoods" :id="'book_' + product.productId" @click="updateSelection($event,product.productId,product.saleProductBook.price,2)">
            <label :for="'book_' + product.productId"></label>
          </div>
          <div class="colse abs" v-if="product.productType != 1" @click="delProduct(product.saleProductBook.productId)"></div>
        </div>
      </div>
    </div>
    <!--商品内容 end-->

    <!--空购物车-->
    <div class="kong clearfix" v-else>
      <div class="top pr">您的购物车空空如也,马上开始学习还不晚！
        <i class="abs"></i>
      </div>
      <div class="cen">
        <mip-img src="//sale.chinaacc.com/web/images/mobile/xuanke1/shop_15.png"></mip-img>
      </div>
    </div>
    <!--空购物车 end-->

    <!--结算浮层-->
    <div class="kctj clearfix"></div>
    <div class="jsfd" v-if="productList.length != 0">
      <div class="qx fl chkqx clearfix">
        <input type="checkbox" name="chk_all" id="chk_all" @change="selectAll" v-model="isSelectAll">
        <label for="chk_all" class="chk_all"></label>
        <span class="fr">全选</span>
      </div>
      <span class="han fr zgcount" v-if="loginFlag" on="tap:log.login">去结算</span>
      <span class="han fr zgcount" v-else @click="balance">去结算</span>
      <div class="zj fr">
        合计：
        <b>
          <span id="totalMoney">{{currency(totalMoney)}}</span>
        </b>
        <p class="zj-b">若有优惠，将在订单结算页面减扣</p>
      </div>
    </div>
    <!--结算浮层 end-->

    <!--重复书籍弹框-->
    <div class="book-mask" v-if="popBook"></div>
    <div class="book-sctk clearfix" v-if="popBook">
      <div class="cen">订单中有重复书籍，您确认要提交吗？</div>
      <div class="bot">
        <span class="bot-l fl colse" @click="popBook = false">取消</span>
        <span class="bot-r fl colse" @click="ensureGoOrder">确定</span>
      </div>
    </div>
    <!--重复书籍弹框 end-->

    <!--选课协议弹出-->
    <div id="protocolsBg" v-if="protocol"></div>
    <div class="protocols" v-if="protocol">
      <i class="closeXY" @click="protocol=false"><img src="/static/images/protocols-close.png"></i>
      <h1>温馨提示</h1>
      <div class="xyContainer">
        <div class="courseXYS" v-html="courseXYS"></div>
        <div class="btn-wrap">
          <a class="sure" @click="goNext">我知道了</a>
        </div>
      </div>
    </div>
    <!--选课协议弹出 end-->

  </div>
</template>

<script>
import { getCookie, setCookie } from "../../common/utils/cookie";
import { getUrlParams, checkLogin } from "../../common/utils";
import {
  getCartList,
  delShoppingCart,
  checkDupBook,
  getCourseTips
} from "../../common/api";
import { Toast, Loading } from "../../common/utils/toast";
import {
  currency,
  compareSort,
  limitTo,
  emptyArr,
  inNumArray,
  inStrArray,
  gotoUrl
} from "../../common/utils";
export default {
  data() {
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
      courseXYS: "",
      loginFlag: true
    };
  },
  mounted() {
    const that = this;
    that.initData();
    //登录监听
    that.$on("watchLogin", function() {
      //已登录
      that.loginFlag = false;
    });
  },
  methods: {
    currency(num) {
      return currency(num);
    },
    limitTo(str, len) {
      return limitTo(str, len);
    },
    changeJianStyle(num) {
      return num > 1 ? "sl-jian2 fl" : "sl-jian fl";
    },
    increase(id) {
      let inputVal = parseInt(this.$refs[id][0].value);
      if (!isNaN(inputVal)) {
        if (inputVal >= 9999) {
          let $Toast = new Toast();
          $Toast.open({
            message: "最多只能选9999本！"
          });
        } else {
          this.changeBookCookie(id, inputVal + 1, 1);
        }
      } else {
        this.changeBookCookie(id, 1, 1);
      }
    },
    decrease(id) {
      let inputVal = parseInt(this.$refs[id][0].value);
      if (!isNaN(inputVal)) {
        if (inputVal <= 1) {
          let $Toast = new Toast();
          $Toast.open({
            message: "最少只能选1本！"
          });
        } else {
          this.changeBookCookie(id, inputVal - 1, 1);
        }
      } else {
        this.$refs[id][0].value = 1;
        this.changeBookCookie(id, 1, 1);
      }
    },
    handleInputChange(id) {
      let inputVal = parseInt(this.$refs[id][0].value);
      let $Toast = new Toast();
      if (isNaN(inputVal)) {
        this.$refs[id][0].value = 1;
      } else {
        if (inputVal <= 1) {
          $Toast.open({
            message: "最少只能选1本！"
          });
          this.$refs[id][0].value = 1;
        } else if (inputVal >= 9999) {
          $Toast.open({
            message: "最多只能选9999本！"
          });
          this.$refs[id][0].value = 9999;
        }
      }
      this.changeBookCookie(id, this.$refs[id][0].value, 1);
    },
    changeBookCookie(id, num) {
      let cookie_book = getCookie("buy_book_list");
      if (cookie_book != null) {
        cookie_book = cookie_book.replace(/"/g, "");
      }
      let books = cookie_book.split(",");
      let newList = [];
      for (let item in books) {
        let items = books[item].split(":");
        if (items[0] == id) {
          newList.push(items[0] + ":" + num + ":1");
        } else {
          newList.push(books[item]);
        }
      }
      setCookie("buy_book_list", newList.join(","));
      this.initData();
    },
    initData() {
      const that = this;
      let $Loading = new Loading();
      $Loading.open();
      let params = getUrlParams();
      // 通过cookie获取所购买的课程、书信息
      let select_course_list = getCookie("select_course_list");
      if (select_course_list != null) {
        select_course_list = select_course_list.replace(/"/g, "");
      }
      let buy_book_list = getCookie("buy_book_list");

      if (buy_book_list != null) {
        buy_book_list = buy_book_list.replace(/"/g, "");
      }
      //构造请求数据
      let setting = {
        sel_source: "2",
        select_course_list: select_course_list,
        free_list: "",
        buy_book_list: buy_book_list
      };
      getCartList(setting).then(res => {
        that.productList = res.selectProducts.productList.sort(
          compareSort("productType")
        );
        that.allLen = that.productList.length;
        setCookie("select_course_list", res.select_course_list);
        setCookie("buy_book_list", res.buy_book_list);
        setCookie("order_book_list", "");
        setCookie("order_course_list", "");
        that.countMoney();
        $Loading.close();
      });
    },
    countMoney() {
      const that = this;
      that.totalMoney = 0;
      that.productList.forEach(item => {
        if (item.saleProductBook == undefined) {
          // 课程
          that.totalMoney += item.price;
        } else {
          //书
          let bookNum = parseInt(item.productNum);
          that.totalMoney += item.price * bookNum;
        }
      });
      let goodsList = document.querySelectorAll('input[name="selectGoods"]');
      goodsList.forEach(item => {
        item.checked = true;
      });
      that.isSelectAll = true;
    },
    selectAll() {
      let goodsList = document.querySelectorAll('input[name="selectGoods"]');
      if (this.isSelectAll) {
        goodsList.forEach(item => {
          item.checked = true;
        });
        this.countMoney();
      } else {
        goodsList.forEach(item => {
          item.checked = false;
        });
        this.totalMoney = 0;
      }
    },
    isAll() {
      let goodsList = document.querySelectorAll('input[name="selectGoods"]'),
        tmpLen = goodsList.length;
      goodsList.forEach(item => {
        if (!item.checked) {
          tmpLen -= 1;
        }
      });
      return this.allLen == tmpLen;
    },
    updateSelection(e, id, price, type) {
      let $this = e.currentTarget;
      if (this.isAll()) {
        this.isSelectAll = true;
      } else {
        this.isSelectAll = false;
      }
      switch (type) {
        case 1:
          if ($this.checked) {
            this.totalMoney = (this.totalMoney * 10000 + price * 10000) / 10000;
          } else {
            this.totalMoney = (this.totalMoney * 10000 - price * 10000) / 10000;
          }
          break;
        case 2:
          let num = this.$refs[id][0].value;
          if ($this.checked) {
            this.totalMoney =
              (this.totalMoney * 10000 + price * 10000 * parseInt(num)) / 10000;
          } else {
            this.totalMoney =
              (this.totalMoney * 10000 - price * 10000 * parseInt(num)) / 10000;
          }
          break;
      }
    },
    delProduct(id) {
      const that = this;
      let delProductId = id.toString();
      let setting = {
        delProductId: delProductId
      };
      let $Loading = new Loading();
      $Loading.open();
      delShoppingCart(setting).then(res => {
        let retFlag = res.result;
        let rmItem = res.product[0];
        if (retFlag != null && retFlag == 1) {
          //重写cookie
          //课程
          let select_course_list = getCookie("select_course_list");
          if (select_course_list != null) {
            select_course_list = select_course_list.replace(/"/g, "");
          }
          let courses = emptyArr(select_course_list.split(","));
          let isCourse = inNumArray(rmItem, courses);
          if (isCourse) {
            for (let i = 0; i < courses.length; i++) {
              if (rmItem == courses[i]) {
                courses.splice(i, 1);
              }
            }
            setCookie("select_course_list", courses.join(","));
          }

          //书
          let buy_book_list = getCookie("buy_book_list");
          if (buy_book_list != null) {
            buy_book_list = buy_book_list.replace(/"/g, "");
          }
          let books = emptyArr(buy_book_list.split(","));
          let isBook = inStrArray(rmItem, books);
          if (isBook) {
            for (let i = 0; i < books.length; i++) {
              if (books[i].indexOf(rmItem) != -1) {
                books.splice(i, 1);
              }
            }
            setCookie("buy_book_list", books.join(","));
          }
          that.initData();
        }
      });
    },
    getSubData() {
      const that = this;
      let goodsList = document.querySelectorAll('input[name="selectGoods"]');
      let courseArr = [],
        bookArr = [];
      goodsList.forEach(item => {
        let goodInfo = item.id.split("_");
        if (item.checked) {
          let name = goodInfo[0];
          let id = goodInfo[1];
          if (name === "course") {
            courseArr.push(id);
          } else if (name === "book") {
            let bookNum = that.$refs[id][0].value;
            bookArr.push(id + ":" + bookNum + ":1");
          }
        }
      });
      return {
        courseArr: courseArr,
        bookArr: bookArr
      };
    },
    balance() {
      const that = this;
      let bookArr = that.getSubData().bookArr;
      let courseArr = that.getSubData().courseArr;

      if (bookArr.length > 0) {
        let setting = {
          select_book_list: bookArr
        };
        checkDupBook(setting).then(res => {
          if (res == 1) {
            that.popBook = true;
          } else {
            if (courseArr.length > 0) {
              that.CourseTips(courseArr);
            } else {
              that.goNext();
            }
          }
        });
      } else {
        if (courseArr.length > 0) {
          that.CourseTips(courseArr);
        } else {
          let $Toast = new Toast();
          $Toast.open({
            message: "请选择结算商品"
          });
          return;
        }
      }
      setCookie("order_course_list", courseArr.join(","));
      setCookie("order_book_list", bookArr.join(","));
    },
    ensureGoOrder() {
      let courseArr = this.getSubData().courseArr;
      if (courseArr.length > 0) {
        this.CourseTips(courseArr);
      }
    },
    CourseTips(arr) {
      const that = this;
      let setting = {
        order_course_list: arr.join(",")
      };
      getCourseTips(setting).then(res => {
        if (res != null && res.length > 0) {
          that.popBook = false;
          that.courseXYS = res.join("");
          that.protocol = true;
        } else {
          that.goNext();
        }
      });
    },
    goNext() {
      this.protocol = false;
      gotoUrl("/payment/submitOrder.html");
    }
  }
};
</script>

<style scoped>
.login {
  height: 1.09rem;
  background: #f4f4f4;
}
.login-txt {
  line-height: 1.09rem;
  padding-left: 1.86rem;
  font-size: 0.32rem;
  color: #999;
}
.login-han {
  display: block;
  width: 1.3rem;
  height: 0.61rem;
  border: 1px solid #d0d0d0;
  text-align: center;
  line-height: 0.61rem;
  margin: 0.22rem 0.4rem 0 0;
  border-radius: 3px;
}
/*商品内容*/
.spnr {
  background: #fff;
  padding: 0 0.4rem;
  border-bottom: 0.26rem solid #f4f4f4;
}
.spnr .nr {
  padding: 0.46rem 0.8rem;
  border-bottom: 1px dashed #cacaca;
}
.spnr .nr .kleft {
  width: 0.76rem;
  line-height: 0.66rem;
  font-size: 0.32rem;
  color: #999;
}
.spnr .nr .kcen {
  width: 6.84rem;
}
.spnr .nr .kcen-t {
  font-size: 0.37rem;
  line-height: 0.66rem;
}
.spnr .nr .kcen-c {
  font-size: 0.32rem;
  line-height: 0.58rem;
  color: #666;
}
.spnr .nr .kcen-c em {
  font-size: 0.37rem;
  color: #fe7735;
}
.spnr .nr .sleft {
  width: 0.76rem;
  line-height: 0.66rem;
  font-size: 0.32rem;
  color: #999;
}
.spnr .nr .scen {
  width: 6.84rem;
}
.spnr .nr .scen-t {
  font-size: 0.37rem;
  line-height: 0.66rem;
}
.spnr .nr .scen-c {
  font-size: 0.32rem;
  line-height: 0.58rem;
  color: #666;
}
.spnr .nr .scen-b {
  height: 0.66rem;
  margin-bottom: 0.32rem;
}
.spnr .nr .scen-b em {
  width: 2.48rem;
  font-size: 0.37rem;
  color: #fe7735;
  text-align: right;
}
.spnr .nr .scen-b .sl {
  width: 1.82rem;
  height: 0.62rem;
  border: 1px solid #ccc;
  border-radius: 3px;
}
.spnr .nr .scen-b .sl-jian {
  width: 0.58rem;
  height: 0.62rem;
  border-right: 1px solid #ccc;
  background: url(/static/images/payment/shop_03-2.png) no-repeat center;
  background-size: 0.25rem auto;
}
.spnr .nr .scen-b .sl-jian2 {
  width: 0.58rem;
  height: 0.62rem;
  border-right: 1px solid #ccc;
  background: url(/static/images/payment/shop_03.png) no-repeat center;
  background-size: 0.25rem auto;
}
.spnr .nr .scen-b .sl-jia {
  width: 0.58rem;
  height: 0.62rem;
  border-left: 1px solid #ccc;
  background: url(/static/images/payment/shop_04.png) no-repeat center;
  background-size: 0.25rem auto;
}
.spnr .nr .scen-b .sl-inp {
  display: block;
  width: 0.6rem;
  height: 0.62rem;
  line-height: 0.26rem;
  outline: none;
  border: 0;
  text-align: center;
  font-size: 0.32rem;
}
.spnr .nr .sxx {
  overflow: hidden;
  clear: both;
  height: 1.32rem;
}
.spnr .nr .sxx .xnr {
  clear: both;
  line-height: 0.66rem;
  font-size: 0.32rem;
  color: #666;
}
.spnr .nr .sxx .xnr-l {
  width: 6.4rem;
}
.spnr .nr .xjt {
  height: 0.34rem;
}
.spnr .nr .xjt i {
  display: block;
  width: 0.38rem;
  height: 0.22rem;
  margin: 0.13rem 0.13rem 0 0;
  background: url(/static/images/payment/shop_05.png) no-repeat;
  background-size: 0.38rem auto;
  transition: all 0.3s linear;
}
.spnr .nr .xjt.on i {
  transform: rotateZ(180deg);
}
.spnr .nr .sxxauto {
  height: auto;
}
.spnr .nr .colse {
  display: block;
  width: 0.61rem;
  height: 0.61rem;
  top: 0.46rem;
  right: 0;
  background: url(/static/images/payment/shop_06.png) no-repeat;
  background-size: 0.61rem auto;
}
.spnr .bb0 {
  border-bottom: 0;
}
/*课程推荐*/
.kctj {
  background: #fff;
  padding-top: 0.5rem;
  margin-bottom: 1.32rem;
}
.kctj .tit {
  height: 0.32rem;
  line-height: 0.32rem;
  text-align: center;
  font-size: 0.32rem;
  color: #999;
  background: url(/static/images/payment/shop_16.png) no-repeat center;
  background-size: 10rem auto;
}
.kctj .kc {
  padding: 0.4rem;
  border-bottom: 1px dashed #d0d0d0;
}
.kctj .kcen {
  margin-bottom: 0.24rem;
}
.kctj .kcen .left {
  width: 0.76rem;
  line-height: 0.66rem;
  font-size: 0.32rem;
  color: #999;
}
.kctj .kcen .right {
  width: 8.44rem;
}
.kctj .kcen .right-t {
  font-size: 0.37rem;
  line-height: 0.66rem;
}
.kctj .kcen .right-c {
  font-size: 0.32rem;
  line-height: 0.58rem;
  color: #666;
}
.kctj .kcen .right-c em {
  line-height: 0.4rem;
  font-size: 0.37rem;
  color: #fe7735;
  margin-top: 0.18rem;
}
.kctj .kbot {
  height: 0.66rem;
}
.kctj .kbot-l {
  display: block;
  width: 0.8rem;
  height: 0.4rem;
  border: 1px solid #0e9cfa;
  text-align: center;
  line-height: 0.4rem;
  font-size: 0.32rem;
  color: #0e9cfa;
  margin: 0.1rem 0.17rem 0 0;
}
.kctj .kbot-c {
  overflow: hidden;
  width: 6rem;
  height: 0.66rem;
  line-height: 0.66rem;
  font-size: 0.32rem;
  color: #999;
}
.kctj .kbot-r {
  display: block;
  width: 1.97rem;
  height: 0.62rem;
  border: 0.02px solid #d0d0d0;
  text-align: center;
  line-height: 0.62rem;
  font-size: 0.32rem;
  border-radius: 3px;
}
.kctj .bb0 {
  border-bottom: 0;
}

/*结算浮层*/
.jsfd {
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
  background: #fff;
  height: 1.32rem;
  border-top: 1px solid #f0f0f0;
  z-index: 99;
}
.jsfd .qx {
  height: 0.57rem;
  margin: 0.375rem 0 0 0.4rem;
}
.jsfd .qx span {
  line-height: 0.57rem;
  font-size: 0.34rem;
  margin-left: 0.21rem;
}
.jsfd .dele {
  line-height: 0.57rem;
  font-size: 0.34rem;
  margin: 0.375rem 0 0 0.4rem;
}
.jsfd .zj {
  width: 5.3rem;
  margin: 0.18rem 0.253rem 0 0;
  line-height: 0.48rem;
  font-size: 0.32rem;
  text-align: right;
}
.jsfd .zj b {
  font-size: 0.4rem;
  color: #fe7735;
}
.jsfd .zj-b {
  text-align: right;
  color: #999;
}
.jsfd .han {
  display: block;
  width: 2.4rem;
  height: 1.32rem;
  background: #fe7735;
  line-height: 1.32rem;
  text-align: center;
  font-size: 0.45rem;
  color: #fff;
}
.kong {
  background: #fff;
  padding: 0.65rem 0.74rem 0.52rem;
  margin-bottom: 0.26rem;
}
.kong .top {
  width: 7.36rem;
  height: 0.74rem;
  border: 1px solid #e8e8e8;
  text-align: center;
  line-height: 0.74rem;
  font-size: 0.32rem;
  margin: 0 auto 0.42rem;
  border-radius: 0.5rem;
}
.kong .top i {
  display: block;
  width: 0.45rem;
  height: 0.19rem;
  bottom: -0.19rem;
  left: 50%;
  margin-left: -0.225rem;
  background: url(/static/images/shop_14.png) no-repeat;
  background-size: 0.45rem auto;
}
.kong .cen {
  width: 1.7rem;
  height: 1.7rem;
  margin: 0 auto 0.58rem;
}
.chk {
  width: 0.53rem;
  height: 0.53rem;
  top: 0.46rem;
  left: 0;
}
.chk label {
  width: 0.53rem;
  height: 0.53rem;
  border: 1px solid #ccc;
  border-radius: 1rem;
  display: block;
}
.chk input {
  display: none;
}
.chk input[type="checkbox"]:checked + label {
  border: 1px solid #0e9cfa;
  background: url(/static/images/payment/shop_01.png) no-repeat center #0e9cfa;
  background-size: 0.32rem auto;
}
.chk_all {
  width: 0.53rem;
  height: 0.53rem;
  border: 1px solid #ccc;
  border-radius: 1rem;
  display: inline-block;
}
#chk_all {
  display: none;
}
#chk_all[type="checkbox"]:checked + label {
  border: 1px solid #0e9cfa;
  background: url(/static/images/payment/shop_01.png) no-repeat center #0e9cfa;
  background-size: 0.32rem auto;
}
</style>
