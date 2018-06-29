<template>
    <div class="hotList">
        <div class="header flex">
            <div class="logo"></div>
            <div class="title">热门维修</div>
        </div>
        <ul class="list-wrapper flex">
            <li v-for="(item,index) in data" :key="index" class="list" :class="{left:index%2>0}">
                <a :href="`./order.html?modelName=${item.modelName.split(' ').join('')},${item.deviceId},${item.malfunctionName},${item.price},${item.malfunctionId},${item.deviceId}&scope=snsapi_userinfo&state=STATE`">
                    <p class="name">{{item.modelName}}</p>
                    <p class="problem">{{item.malfunctionName}}</p>
                    <p class="price">￥{{item.price}}</p>
                    <p class="officePrice">
                        <span>市场价￥{{item.officialPrice}}</span>
                        <span class="arrow"></span>
                    </p>
                </a>
            </li>
        </ul>
        <div class="check_more">
                <a href="./order.html" rel="external">&lt;&lt;查看更多型号和故障&gt;&gt;</a>
        </div>
    </div>
</template>
<script>
import {fetch} from '@/common/js/fetch'
import apiUrl from '@/common/js/config.api'
export default {
    data(){
        return {
            data:[],
            redirect_uri:""
        }
    },
  created(){
      this.redirect_uri = encodeURIComponent("https://t.jikexiu.com/resources/mip/order.html")
      
    fetch(apiUrl.hotRepaire).then(res=>{
        let len = res.data.hotList.length
        if(len%2!=0)res.data.hotList.pop()
        this.data =res.data.hotList
    })
  }
}
</script>
<style scoped lang="less">
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
