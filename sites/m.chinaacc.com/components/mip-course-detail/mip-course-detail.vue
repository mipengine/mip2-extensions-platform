<template>
  <div class="wrapper">
    <!--课程名-->
    <div class="course-head">
      <div class="course-audition">
        <a
          :href="'http://m.chinaacc.com/mip/shitingList/' + courseType + '/c' + productId + '.shtml'"
          data-type="mip">
          <mip-img
            :src="'http://m.chinaacc.com/mip/static/images/course/'+ productId +'.jpg'"
            layout="responsive"
            width="750"
            height="420"
            alt=""/>
        </a>
      </div>
      <div class="course-info">
        <h1 v-text="eduSubjectName + '-' + selCourseTitle"/>
        <p class="price">{{ price }}</p>
        <div class="relevant">
          <div class="rv-item">
            <strong>活动</strong>
            <div
              v-for="item in discountShows"
              :key="item.discountId"
              class="rv-dd"
              v-text="item.discountName + item.detailName"/>
          </div>
          <div class="rv-item">
            <strong>活动</strong>
            <div
              v-if="courseInfo.enjoyDiscount == 1 || courseInfo.canuseCard == 1 || courseInfo.saleProductKind == 1 || courseInfo.isRelation != 0 || courseInfo.isFQPay != 0"
              class="rv-support">
              <mip-img
                v-if="courseInfo.enjoyDiscount == 1"
                src="http://m.chinaacc.com/mip/static/images/vip-icon.png"
                alt="支持VIP"/>
              <mip-img
                v-if="courseInfo.canuseCard == 1"
                src="http://m.chinaacc.com/mip/static/images/card-icon.png"
                alt="支持学习卡"/>
              <mip-img
                v-if="courseInfo.saleProductKind == 1"
                src="http://m.chinaacc.com/mip/static/images/dow-icon.png"
                alt="支持下载"/>
              <mip-img
                v-if="courseInfo.isRelation == 1"
                src="http://m.chinaacc.com/mip/static/images/continued-icon.png"
                alt="支持延期保障"/>
              <mip-img
                v-if="courseInfo.isFQPay != 0"
                src="http://m.chinaacc.com/mip/static/images/fq-icon.png"
                alt="支持分期"/>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--课程名 end-->
    <!--同时购买-->
    <section
      v-if="(courseInfo.saleProductKind == 1||courseInfo.saleProductKind == 9||courseInfo.saleProductKind == 10) && (courseInfo.noPaperList.length > 0 || courseInfo.isRelation != 0 || courseInfo.saleProductBook.length > 0)"
      class="courseMod">
      <div class="course-title">
        <h2>同时购买</h2>
      </div>
      <div
        v-if="courseInfo.isRelation != 0"
        class="course-match">
        <div class="left2 fl">延期保障</div>
        <div class="right fl">
          <div class="xkc pr zg_yanqi">
            未弃考即可获得下一考期{{ courseInfo.className }}全部课程及服务&#12288;
            <i class="j abs"/>
            <input
              id="yanqi"
              :value="courseInfo.refProductId"
              class="coursechk_name"
              name="bzCourse"
              type="checkbox">
          </div>
          <p class="ts">选中即同意<a href="http://m.chinaacc.com/wangxiao/gonggao/li1803063216.shtml">延期保障协议</a></p>
        </div>
      </div>
      <div
        v-if="bookType.isBook == 2"
        class="course-match">
        <div class="cm-head">纸 质 书</div>
        <div class="cm-body">
          <mip-showmore
            id="zzsMore"
            maxheight="160"
            bottomshadow="1">
            <ul class="cm-list">
              <li
                v-for="item in courseInfo.saleProductBook"
                v-if="item.productType == 2"
                :key="item.productId">
                <input
                  :value="item.productId"
                  :id="'zzs_' + item.productId"
                  :saleProductKind="item.saleProductKind"
                  type="checkbox"
                  name="selectBookList">
                <label :for="'zzs_' + item.productId"><span v-text="item.infoName"/>{{ item.price }}</label>
              </li>
            </ul>
          </mip-showmore>
          <div
            class="cm-more"
            on="click:zzsMore.toggle"
            data-closetext="">
            <a>更多好书</a>
          </div>
        </div>
      </div>
      <div
        v-if="bookType.isEBook == 3"
        class="course-match">
        <div class="cm-head">电 子 书</div>
        <div class="cm-body">
          <mip-showmore
            id="dzsMore"
            maxheight="160"
            bottomshadow="1">
            <ul class="cm-list">
              <li
                v-for="item in courseInfo.saleProductBook"
                v-if="item.productType == 3"
                :key="item.productId">
                <input
                  :value="item.productId"
                  :id="'dzs_' + item.productId"
                  :saleProductKind="item.saleProductKind"
                  type="checkbox"
                  name="selectBookList">
                <label :for="'dzs_' + item.productId"><span v-text="item.infoName"/>{{ item.price }}</label>
              </li>
            </ul>
          </mip-showmore>
          <div
            class="cm-more"
            on="click:dzsMore.toggle"
            data-closetext="">
            <a>更多好书</a>
          </div>
        </div>
      </div>
      <div
        v-if="courseInfo.noPaperList.length > 0"
        class="course-match">
        <div class="cm-head">机考模拟</div>
        <div class="cm-body">
          <mip-showmore
            id="jkmnMore"
            maxheight="160"
            bottomshadow="1">
            <ul class="cm-list">
              <li
                v-for="item in courseInfo.noPaperList"
                :key="item.productId">
                <input
                  :value="item.productId"
                  :id="'jkmn_' + item.productId"
                  type="checkbox"
                  name="jikaoCourse">
                <label :for="'jkmn_' + item.productId"><span>机考模拟系统&#12288;</span>{{ item.price }}</label>
              </li>
            </ul>
          </mip-showmore>
          <div
            class="cm-more"
            on="click:jkmnMore.toggle"
            data-closetext="">
            <a>更多好书</a>
          </div>
        </div>
      </div>
    </section>
    <!--同时购买 end-->
    <!--课程内容-->
    <section class="courseMod">
      <div class="course-title">
        <h2>课程内容</h2>
      </div>
      <mip-scrollbox data-type="row">
        <div data-wrapper>
          <div data-inner>
            <div data-scroller>
              <div
                data-item
                data-col="24">
                <table
                  cellspacing="0"
                  cellpadding="0"
                  width="100%"
                  class="course-table">
                  <tr class="tabtit">
                    <td width="25%">阶段课程</td>
                    <td width="35%">授课名师</td>
                    <td width="20%">课程开通时间</td>
                    <td width="20%">课程关闭时间</td>
                  </tr>
                  <tr
                    v-for="courseContent in courseContentList"
                    :key="courseContent.cwClassID">
                    <td>{{ courseContent.cwClassName }}<span v-if="courseContent.isFree == 1"> [赠送往年]</span></td>
                    <td class="t-cen">{{ courseContent.teacherName }}</td>
                    <td v-if="courseContent.useFul == 1">已开通</td>
                    <td v-if="courseContent.useFul == 2">{{ courseContent.prompt }}</td>
                    <td v-if="courseContent.studyDay != undefined && courseContent.studyDay.length > 0">开课后{{ courseContent.studyDay }}天</td>
                    <td v-if="courseContent.studyDay == undefined">{{ courseContent.closeDate }}</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
        </div>
      </mip-scrollbox>
    </section>
    <!--课程内容 end-->
    <!-- 课程介绍 -->
    <section class="courseMod">
      <div class="course-title">
        <h2>课程介绍</h2>
      </div>
      <div
        v-for="(tag, index) in tagList"
        v-if="tag != undefined || tag != ''"
        :key="index"
        class="introduce"
        v-html="tag.tagUrlWap"/>
    </section>
    <!-- 课程介绍end -->
    <!-- 相关课程 -->
    <section class="courseMod">
      <div class="course-title">
        <h2>相关课程</h2>
      </div>
      <div
        v-for="corrCourseItem in corrCourse"
        :key="corrCourseItem.classID"
        class="course-relevant">
        <div
          :class="{
            'cr-item-blue':corrCourseItem.showColor === 1 || corrCourseItem.showColor == undefined,
            'cr-item-orange':corrCourseItem.showColor === 2,
            'cr-item-purple':corrCourseItem.showColor === 3,
            'cr-item-green':corrCourseItem.showColor === 4,
            'cr-item-yellow':corrCourseItem.showColor === 5}"
          class="cr-item">
          <a
            :href="'http://m.chinaacc.com/mip/kecheng/?cId=' + corrCourseItem.productId + '&type=' + courseType + '.shtml'"
            class="cr-head">
            <strong>{{ corrCourseItem.eduSubjectName }}</strong>
            <p>{{ corrCourseItem.selCourseTitle }}</p>
          </a>
          <div class="cr-body">
            <p
              v-if="corrCourseItem.saleProductKind != 2 || (corrCourseItem.saleProductKind === 2 && corrCourseItem.lowFacePrice == undefined)"
              class="price">¥{{ corrCourseItem.price }}</p>
            <p
              v-if="corrCourseItem.saleProductKind === 2 && corrCourseItem.lowFacePrice != undefined"
              class="price">
              ¥{{ corrCourseItem.lowFacePrice }}
              <span v-if="corrCourseItem.lowFacePrice < corrCourseItem.highFacePrice">~¥{{ corrCourseItem.highFacePrice }}</span>
            </p>
            <label
              v-if="corrCourseItem.refProductId != undefined"
              class="ensureLabel"
              for="ensure">
              <i/>
              <input
                :id="'js_'+corrCourse.productId"
                :value="corrCourseItem.refProductId"
                type="checkbox">续学保障
              <span>+{{ corrCourseItem.dispMoney }}</span>元
            </label>
            <a
              class="addCart"
              @click="addShopCart('select_course_list',corrCourseItem.productId,corrCourseItem.saleProductKind)">购课</a>
          </div>
        </div>
      </div>
    </section>
    <!-- 相关课程 end -->
    <mip-fixed
      type="bottom"
      class="bottomPanelMod">
      <div class="bottomPanel">
        <div
          class="shopCart fl"
          @click="gotoUrl('/payment/shopCart.html')">
          <span v-if="uid == ''">0</span>
          <span
            v-if="shopCartNum != -1"
            v-text="shopCartNum"/>
        </div>
        <div class="bottom-btns fr">
          <div class="bottom-add">
            <input
              id="add10001"
              type="checkbox"
              @click="goShopCart(1)">
            <label for="add10001">加入购物车</label>
          </div>
          <a @click="goShopCart(2)">立即购买</a>
        </div>
      </div>
    </mip-fixed>
    <!--隐藏域-->
    <input
      id="courseProId"
      :value="courseInfo.productId"
      type="hidden">
    <input
      id="productName"
      :value="courseInfo.selCourseTitle"
      type="hidden">
    <input
      id="saleProductKind"
      :value="courseInfo.saleProductKind"
      type="hidden">

    <div v-if="courseInfo == ''">课程不存在</div>
    <div class="bottomPanelAfter"/>
  </div>
</template>

<script>
import { getCookie, setCookie } from '../../common/utils/cookie'
import { Toast } from '../../common/utils/toast'
import { currency, getUrlParams, gotoUrl } from '../../common/utils'
import {
  getCourseDetail,
  getShopCartNum,
  getCartList,
  getCheckLogin
} from '../../common/api'
export default {
  data () {
    return {
      productId: '',
      courseType: '',
      courseInfo: {},
      eduSubjectName: '',
      selCourseTitle: '',
      isRelation: '',
      price: '',
      discountShows: [],
      bookType: {},
      courseContentList: [],
      shopCartNum: 0,
      uid: ''
    }
  },
  created () {
    let params = getUrlParams()
    this.productId = params.cId
    this.courseType = params.type
  },
  async mounted () {
    const that = this
    await getCourseDetail({ productId: that.productId }).then(courseData => {
      let courseInfo = (that.courseInfo = courseData.courseInfo)
      that.eduSubjectName = courseInfo.eduSubjectName
      that.selCourseTitle = courseInfo.selCourseTitle
      that.isRelation = courseInfo.isRelation
      that.price = currency(courseInfo.price)
      that.discountShows = courseData.discountShows
      that.cwareInfoList = courseData.cwareInfoList
      that.bookType = courseData.bookType
      that.courseContentList = courseData.courseContentList
      that.corrCourse = courseData.corrCourse
      that.tagList = courseData.tagList
    })
    await getCheckLogin().then(checkLoginData => {
      that.uid = checkLoginData.uid
    })
    that.getCartNum()
    if (that.uid + '' !== '') {
      await getShopCartNum().then(shopCartNumData => {
        that.shopCartNum = shopCartNumData.result
      })
    }
  },
  methods: {
    goShopCart (index, obj, type) {
      const that = this
      let currentCourseId = document.querySelector('#courseProId').value // 当前课程Id
      let selCourseCookie = ''
      let bookId = ''
      let courseId = currentCourseId + ','
      if (getCookie('select_course_list') !== undefined) {
        selCourseCookie = getCookie('select_course_list')
      }
      if (type + '' !== '2') {
        if (
          selCourseCookie + '' === '' ||
          selCourseCookie.indexOf(currentCourseId) < 0
        ) {
          that.addShopCart('select_course_list', currentCourseId, 1)
          that.getCartNum()
        }
      }
      // 电子书及纸质书选中添加至购物车
      let selectBookList = document.querySelectorAll(
        "[name = 'selectBookList']"
      )
      selectBookList.forEach((ele, index) => {
        if (ele.checked) {
          bookId = ele.value + ':1:1'
          let saleProductKind = ele.getAttribute('saleProductKind')
          that.addShopCart('buy_book_list', bookId, saleProductKind)
        }
      })
      let jikaoCourse = document.querySelectorAll("[name = 'jikaoCourse']")
      jikaoCourse.forEach((ele, index) => {
        if (ele.checked) {
          courseId = ele.value
          that.addShopCart('select_course_list', courseId, 1)
        }
      })
      if (type + '' === '2') {
        let areaCount = 0
        jikaoCourse.forEach((ele, item) => {
          if (ele.checked) {
            areaCount++
            courseId = ele.value
            that.getCartNum()
            that.addShopCart('select_course_list', courseId, 1)
          }
        })
        if (areaCount + '' === '0') {
          return false
        }
      }
      // 延期保障添加至购物车
      let bzCourse = document.querySelectorAll("[name = 'bzCourse']")
      bzCourse.forEach((ele, index) => {
        if (ele.checked) {
          courseId = ele.value
          that.addShopCart('select_course_list', courseId, 1)
        }
      })

      if (index + '' === '1') {
        that.goUrl()
      }
      if (index + '' === '2') {
        gotoUrl('/payment/shopCart.html')
      }
    },
    // 加入购物车
    addShopCart (cookieName, value, saleProductKind) {
      const that = this
      // 判断面授课
      if (saleProductKind + '' === '2') {
        return false
      }
      let jsElement = document.getElementById('#js_' + value)
      let selCookie = ''
      let refProductId = ''
      if (getCookie(cookieName) !== undefined) {
        selCookie = getCookie(cookieName)
      }

      if (cookieName + '' === 'select_course_list') {
        if (jsElement != null) {
          if (jsElement.checked) {
            let refProductId1 = jsElement.value
            if (selCookie.indexOf(refProductId1) < 0) {
              refProductId = refProductId1 + ''
            }
          }
        }
        if (selCookie.indexOf(value) + '' === '-1') {
          setCookie(cookieName, selCookie + ',' + value + ',' + refProductId)
        } else {
          setCookie(cookieName, selCookie + ',' + refProductId)
        }
      }

      // 书重复添加需要增加数量
      if (cookieName + '' === 'buy_book_list') {
        let tooBookCookieArr = []
        let tooBookCo = ''
        let tooBookCookie = ''
        if (selCookie + '' !== '') {
          tooBookCookie = selCookie.split(',')
        }
        if (tooBookCookie.length > 0) {
          let flag = false
          tooBookCookie.forEach((item, index) => {
            let tooIt = item
            let bookC = item.split(':')[0]
            let bookT = value.split(':')[0]
            if (bookC + '' === bookT + '') {
              if (saleProductKind + '' !== '5') {
                let bookN = item.split(':')[1]
                let bookM = parseInt(bookN) + 1
                tooIt = bookC + ':' + bookM + ':1'
                flag = true
              }
            }
            tooBookCookieArr.push(tooIt)
          })
          tooBookCo = tooBookCookieArr.join(',')
          if (flag) {
            setCookie(cookieName, tooBookCo + ',')
          } else {
            setCookie(cookieName, tooBookCo + ',' + value + ',')
          }
        } else {
          setCookie(cookieName, value)
        }
      }

      if (that.uid + '' !== '') {
        that.goUrl()
      } else {
        that.getCartNum()
      }
    },
    // 获取购物车数量
    getCartNum () {
      const that = this
      if (that.uid + '' !== '') {
        getShopCartNum().then(shopCartNumData => {
          that.shopCartNum = shopCartNumData.result
        })
      } else {
        that.getCookieProNum()
      }
    },
    // 没有登录时加的购物车数量
    getCookieProNum () {
      let count = 0
      let courses = []
      let books = []
      // cookie中课程列表
      let cookieCourseLi = getCookie('select_course_list')
      if (cookieCourseLi != null) {
        cookieCourseLi = cookieCourseLi.replace(/"/g, '')
        courses = cookieCourseLi.split(',')
      }
      courses.forEach((item, index) => {
        if (item != null && item + '' !== '') {
          count++
        }
      })
      // cookie中书籍列表
      let cookieBookLi = getCookie('buy_book_list')
      if (cookieBookLi != null) {
        cookieBookLi = cookieBookLi.replace(/"/g, '')
        books = cookieBookLi.split(',')
      }
      if (books != null && books.length > 0) {
        let booksId = ''
        for (let j in books) {
          booksId = books[j].split(':')
          if (booksId[0] != null && booksId[0] + '' !== '') {
            count += parseInt(booksId[1])
          }
        }
      }
      this.shopCartNum = count
    },
    goUrl () {
      let freeList = getCookie('free_list')
      if (freeList != null) {
        freeList = freeList.replace(/"/g, '')
      }
      let courseId = getCookie('select_course_list')
      if (courseId != null) {
        courseId = courseId.replace(/"/g, '')
      }
      let bookId = getCookie('buy_book_list')
      if (bookId != null) {
        bookId = bookId.replace(/"/g, '')
      }
      let setting = {
        sel_source: '1',
        select_course_list: courseId,
        free_list: freeList,
        buy_book_list: bookId
      }
      getCartList(setting).then(CartListData => {
        let $Toast = new Toast()
        $Toast.open({ message: '加入购物车成功', duration: 800 })
        this.getCartNum()
      })
    },
    gotoUrl (path) {
      gotoUrl(path)
    }
  }
}
</script>
