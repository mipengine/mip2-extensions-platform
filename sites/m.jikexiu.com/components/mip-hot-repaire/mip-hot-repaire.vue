<template>
  <div class="hotList">
    <div class="header flex">
      <div class="logo"/>
      <div class="title">热门维修</div>
    </div>
    <!--热门维修列表-->
    <ul class="list-wrapper flex">
      <li
        v-for="(item,index) in data"
        :key="index"
        :class="{left:index%2>0}"
        class="list">
        <a
          :href="item.href"
          data-type="mip">
          <p class="name">{{ item.modelName }}</p>
          <p class="problem">{{ item.malfunctionName }}</p>
          <p class="price">￥{{ item.price }}</p>
          <p class="officePrice">
            <span>市场价￥{{ item.officialPrice }}</span>
            <span class="arrow"/>
          </p>
        </a>
      </li>
    </ul>
    <div class="check_more">
      <a
        href="./order.html?categoryId=12-"
        rel="external"
        data-type="mip">
        &lt;&lt;查看更多型号和故障&gt;&gt;
      </a>
    </div>
  </div>
</template>
<script>
// import {fetch} from '@/common/js/fetch'
import apiUrl from '@/common/js/config.api'
export default {
  data () {
    return {
      data: [],
      redirect_uri: '',
      redirect_uri1: './order.html?categoryId=12-'
    }
  },
  created () {
    this.redirect_uri = './order.html'
    fetch(apiUrl.hotRepaire, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(data => {
      return data.json()
    }).then(res => {
      let len = res.data.hotList.length
      if (len % 2 !== 0)res.data.hotList.pop()
      this.data = res.data.hotList
      this.data.forEach(item => {
        let redirectUri = `./order.html?modelName=${item.id}`
        item.href = redirectUri
      })
    })
  }
}
</script>
<style scoped lang="less">
    /*维修热门手机*/
    .hotList{
        margin: 10px 0;
        padding-bottom: 10px;
        background: #fff;
    }
    .flex{
        display: -webkit-flex;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }
    /*头部*/
    .hotList .header{
        padding: 10px 20px;
        .logo{
            visibility: visible;
            content: '';
            width: 15px;
            height: 20px;
            background: url("https://rs.jikexiu.com/appresources/images2016/landing/img7.png") no-repeat;
            background-size: 100% 100%;
            vertical-align: middle;
        }
        .title{
            height: 20px;
            margin-left: 10px;
            line-height: 20px;
            color: #f10215;
        }
    }
    /*维修列表*/
    .list-wrapper{
            width: 100%;
            border-bottom: 1px solid #e9ebee;
            .list{
                position: relative;
                width: 50%;
                a{
                    display: block;
                    padding: 15px;
                    .name{
                        font-size: 15px;
                        color: #000;
                    }
                    .problem{
                        font-size: 13px;
                    }
                    .price{
                        margin-top: 5px;
                        font-size: 16px;
                        color: #f10215;
                    }
                    .officePrice{
                        font-size: 12px;
                        color: #999;
                        span:nth-child(1){
                            text-decoration: line-through;
                        }
                        .arrow{
                            display: block;
                            float: right;
                            width: 15px;
                            height: 15px;
                            background: url("https://rs.jikexiu.com/appresources/images2016/landing/img8.png") no-repeat;
                            background-size: 100% 100%;
                        }
                    }
                }
            }
            /*边框*/
            .list:before,.left:after{
                position: absolute;
                top: 0;
                left: 0;
                content:'';
                width: 100%;
                height: 1px;
                background: #e9ebee;
            }
            .left:before{
                position: absolute;
                top: 0;
                left: 0;
                content:'';
                width: 1px;
                height: 100%;
                background: #e9ebee;
            }
        }
        /*更多按钮*/
        .check_more {
            width: 66%;
            margin: 10px auto 0;
            height: 33px;
            line-height: 33px;
            text-align: center;
            background-color: #f10215;
            border-radius: 8px;
            a{
                color: #fff;
                display: block;
                height: 100%;
                width: 100%;
            }
        }
</style>
