<template>
  <div class="content-page">
    <div class="content-detail">
      <div class="content-header">
        <div
          v-if="content.show.showdiscount && !content.show.sensitive"
          class="discount">
          <div class="number">
            {{ ((content.show.discount || 1) * 10).toFixed(1) }}
          </div>
          折起
        </div>
        <div class="header-bg">
          <div
            v-show="content.show.posterURL"
            :style="{'backgroundImage': 'url('+content.show.posterURL+')'}"
            class="img-holder"/>
          <div class="serration"/>
        </div>
        <div class="show-img">
          <div
            v-show="content.show.posterURL"
            :style="{'backgroundImage': 'url('+content.show.posterURL+')'}"
            class="img"/>
        </div>
        <div class="detail">
          <div class="row">
            <div class="show-name">{{ content.show.showName }}</div>
          </div>
          <div class="row">
            <div
              v-if="content.show.firstShowTime"
              class="show-time">
              <div
                v-if="!content.show.showDate"
                class="row-flex">
                <p v-if="content.show.firstShowTime !== content.show.lastShowTime">{{ content.show.firstShowTime }} - {{ content.show.lastShowTime }}</p>
                <p v-if="content.show.firstShowTime === content.show.lastShowTime">{{ content.show.firstShowTime }}</p>
              </div>
              <div
                v-if="content.show.showDate"
                class="row-flex">
                <p>{{ content.show.showDate }}</p>
              </div>
            </div>
            <div
              v-show="content.show.minPrice && !content.show.sensitive"
              class="price">
              <div class="number">{{ content.show.minPrice }}</div>
              <div class="text">元起</div>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="getShowStatusTip()"
        class="show-status-tip"
        ng-click="showStatusTip()">
        <div
          :class="[content.showStatus.tagClass]"
          class="show-tag"/>
        <div class="show-status-tip-content">
          {{ content.showStatus.title }}
        </div>
        <!-- <div class="forward-icon">
              查看
              <div class="right-forward-icon"></div>
            </div> -->
      </div>
      <div class="content-row">
        <div class="row-flex">
          <div class="venue-name truncate">{{ content.show.venueName }}</div>
          <div class="venue-address truncate">{{ content.show.venueAddress }}</div>
        </div>
      </div>
      <div
        class="content-row"
        ng-click="showTicketTags()">
        <div class="content-title">服务</div>
        <div class="content-detail">
          <div
            v-if="content.show.supportExpress"
            class="ticket-tag"><div class="ticket-tag-maru"/>快递送票</div>
          <div
            v-if="content.show.supportOnsite"
            class="ticket-tag"><div class="ticket-tag-maru"/>上门自取</div>
          <div
            v-if="content.show.supportVenue"
            class="ticket-tag"><div class="ticket-tag-maru"/>现场取票</div>
        </div>
        <div class="forward-icon"/>
      </div>
      <div
        v-if="content.show.operationalPropaganda"
        class="advertising">
        <div class="content-detail">{{ content.show.operationalPropaganda }}</div>
      </div>
      <div class="section-line"/>
      <div class="show-detail">
        <div class="section-title">演出介绍</div>
        <div
          :style="{height: showWholeDetail?'auto':'100px'}"
          class="detail-content short">
          <div v-html="content.show.content"/>
        </div>
        <div
          :class="{short: !showWholeDetail,normal: showWholeDetail}"
          class="toggle-detail-btn"
          @click="showWholeDetail =!showWholeDetail">
          <span v-if="!showWholeDetail">展开</span>
          <span v-if="showWholeDetail">收起</span>
        </div>
        <div class="inner-border"/>
      </div>
      <div
        class="content-row no-padding"
        @click="showPurchaseTip()">
        <div class="row-flex">
          <div class="section-title">{{ content.isShowDescription?"观影须知":"购票提示" }}</div>
        </div>
        <div class="forward-icon">
          <div class="right-forward-icon-small"/>
        </div>
      </div>
      <div class="section-line"/>
      <div
        v-if="content.recommendShows.length"
        class="show-detail">
        <div class="section-title">相关演出</div>
        <show-component
          ng-repeat="show in content.recommendShows"
          show="show"/>
      </div>
      <div
        class="service-assurance"
        ng-click="content.showGpts()">
        <div class="assurance-title-wrapper">
          <div class="assurance-title">
            摩天轮服务保障
          </div>
        </div>
        <div class="assurance-items">
          <div class="assurance-item real">真票保障</div>
          <div class="assurance-item ticket">出票保障</div>
          <div class="assurance-item delivery">配送保障</div>
        </div>
      </div>
    </div>
    <mip-fixed
      type="bottom"
      still>
      <div class="content-footer">
        <a
          class="customer-service"
          href="tel://400-636-2266"
          style="text-align:center;">客服
        </a>
        <!-- <div class="favourate" v-bind:class="{active: content.favoured}">
                <div class="icon" v-bind:class="{animate: content.favoured_animate,static: !content.favoured_animate}" ng-click="content.toggleFavourate()"></div>
            </div> -->
        <div class="footer-btn-wrapper">
          <a
            v-if="isShowInPresell"
            :href="bookingLink(content.show.showOID)"
            mip-link
            class="footer-btn book-ticket">
            立即预定
          </a>
          <a
            v-if="content.show.minPrice > 0 && content.show.showStatus.code ===3"
            :href="bookingLink(content.show.showOID)"
            mip-link
            class="footer-btn choose-ticket">
            立即购买
          </a>
          <div
            v-if="isShowInPreBook"
            class="footer-btn prebook-btn"
            ng-click="content.prebook()">
            待开售
          </div>
          <div
            v-if="isShowInLackage"
            class="footer-btn book-lackage"
            ng-click="content.enroll()">
            缺票中
          </div>
          <div
            v-if="isShowInOver"
            class="footer-btn show-over" >
            已结束
          </div>
        </div>
      </div>
    </mip-fixed>
    <div
      v-if="displayPurchaseTip"
      class="bottom-popup">
      <mip-fixed
        type="bottom"
        class="popup-content"
        still>
        <div class="popup-title">
          {{ content.show.isShowDescription?"观影须知":"购票提示" }}
        </div>
        <div
          v-if="content.show.isShowDescription"
          class="popup-inner-content">
          <div class="tips-content">
            <div
              v-for="(item,index) in showDesc"
              :key="index"
              :style="{backgroundImage: 'url('+item.icon+')'}"
              class="tip-item tip-desc">
              <div class="tip-name">{{ item.name }}</div>
              <div class="tip-value">{{ item.value }}</div>
            </div>
          </div>
        </div>
        <div
          v-if="!content.show.isShowDescription"
          class="popup-inner-content">
          <div class="tips-content">
            <div
              v-for="(t,index) in tips()"
              :key="index"
              class="tip-item">{{ index+1 }}、{{ t }}</div>
          </div>
        </div>
        <div
          class="footer-btn"
          @click="displayPurchaseTip=false">
          <div class="footer-btn-inner">完成</div>
        </div>
      </mip-fixed>
      <mip-fixed
        type="bottom"
        class="back-bg"
        @click="displayPurchaseTip=false"/>
    </div>
  </div>
</template>

<style scoped lang="less">
@main-color: #ff1d41;
@dark-font: #323038;
@normal-font: #494949;
@light-font: #aaa;
@normal-border: 1px solid #e4e4e4;
@medium-font: #95949d;

@credit-stye-color: #6A3FBE;
.right-forward-icon-small {
    width: .8rem;
    height: 1.2rem;
    display: inline-block;
    background-image: url(~@/static/icon/right-forward.png);
    background-size: 100% 100%;
}
.bottom-popup{
    z-index: 10000;
    .back-bg{
        position: absolute;
        left: 0px;
        top: 0px;
        bottom: 0px;
        z-index: 9990;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.4);
        filter: alpha(opacity=30);
        opacity: 0.8;
    }
    .popup-content{
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 9999;
        width: 100%;
        background-color: #fff;
    }
    .footer-btn{
        width: 100%;
        padding: 1rem 1.8rem;
        z-index: 10010;
        border: solid 1px rgba(151, 151, 151, 0.3);
        .footer-btn-inner{
          height: 4.4rem;
          border-radius: 2px;
          background-image: linear-gradient(277deg, #ff1d41, #ee0e87);
          text-align: center;
          line-height: 4.4rem;
          color: #fff;
          font-size: 1.6rem;
        }
    }
    .popup-title{
        width: 100%;
        text-align: center;
        font-size: 1.6rem;
        color: @dark-font;
        padding: 1.8rem 0;
    }
    .tips-content{
    font-size: 1.4rem;
    line-height: 2.3rem;
    color: #68676c;
    .tip-item{
      padding-bottom: 2.2rem;

      &.tip-desc {
        background-repeat: no-repeat;
        background-size: 1.2rem;
        background-position: left 0.5rem;
        padding-left: 2.5rem;
        padding-bottom: 1.5rem;

        .tip-name {
          color: @dark-font;
        }

        .tip-value {
          color: @medium-font;
        }
      }
    }
  }
}
.header_title {
    height: 50px;
    line-height: 50px;
    text-align: center;
    position: relative;
    background-color: #fff;
    z-index: 8888;
    font-size: 1.5rem;
    border-bottom: 1px solid #ccc;
}
.pull-left {
    float: left !important;
}
.pull-right {
    float: right !important;
}
.header_title .title {
    font-size: 1.6rem;
}
.icon-back {
    width: 26px;
    background: url(~@/static/icon/mtl_spites.png) 7px -54px no-repeat;
    height: 25px;
    margin: 12px 0 0 10px;
    background-size: 210px 210px;
}
.img {
    background-size: 100% 100%;
    width: 100%;
    height: 100%;
    border-radius: 2px;
    background-repeat: no-repeat;
}
.content-page {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    overflow: hidden;
    @background-color: #f6f6f7;
    @padding-h: 1.8rem;
    @border-color: #eaeaeb;
    color: @dark-font;
    padding-bottom:6.2rem;
    .preload(@name){
      position: absolute;
      width: 1px;
      height: 1px;
      animation: @name 1s;
      background: url(~@/static/icon/favorite_1.png) center center no-repeat;
    }
    .to-login{
      display: none;
    }
    .favourate{
      &.preload{
        .preload(active);
      }
      width: 5.5rem;
      height: 2.2rem;
      .icon{
        background: url(~@/static/icon/favorite_1.png) center center no-repeat;
        background-size: 30px 30px;
        width: 100%;
        height: 100%;
      }
      &.active{
        .icon{
          &.static{
            background-image: url(~@/static/icon/favorite_27.png);
          }
          &.animate{
            transition: background-image 5s;
            background-image: url(~@/static/icon/favorite_27.png);
          }
        }
      }
    }
    .section-line{
        height: 7px;
        width: 100%;
        background: @background-color;
    }
    .inner-border{
      border-bottom: 1px solid @border-color;
      width: 100%;
    }
    .show-status-tip{
      background-color: #ffe9ec;
      color: @main-color;
      display: flex;
      align-items: center;
      padding: 0 1.8rem;
      height: 4rem;
      line-height: 4rem;
      font-size: 1.4rem;
      justify-content: space-between;
      .right-forward-icon{
        width: 0.8rem;
        height: 0.8rem;
        border-right: 1px solid @main-color;
        border-bottom: 1px solid @main-color;
        transform: rotateZ(-45deg);
      }
      .show-tag{
        width: 1.6rem;
        height: 1.6rem;
        position: absolute;
      }
      .show-status-tip-content{
        padding-left: 2.4rem;
      }
    }
    .show-tag{
      padding-left: 2.3rem;
      &.prebook{
        background: url(~@/static/icon/show-prebook.png) no-repeat left center;
        background-size: 16px 16px;
      }
      &.presell{
        background: url(~@/static/icon/show-presell.png) no-repeat left center;
        background-size: 16px 16px;
      }
      &.lackage{
        background: url(~@/static/icon/show-lackage.png) no-repeat left center;
        background-size: 16px 16px;
      }
    }
    .ticket-tags{
      padding: 1.8rem 0;
      margin:0 @padding-h;
      border-bottom: solid 0.1rem @border-color;
      overflow-x: auto;
    }
    .ticket-tag-maru{
      width: 1.9rem;
      height: 1.9rem;
      background: url(~@/static/icon/gpts_icon.png) left top no-repeat;
      background-size: 100% 100%;
      display: inline-block;
      vertical-align: middle;
      margin-right: 0.4rem;
    }
    .ticket-tag{
        display: inline-flex;
        align-items: center;
        padding-left: 1.6rem;
        padding-right: 1rem;
        font-size: 1.4rem;
        color: #323038;
        white-space: nowrap;
        &.real{
          background: url(~@/static/icon/assurance-real.png) no-repeat left center;
          background-size: 16px 16px;
        }
        &.ticket{
          background: url(~@/static/icon/assurance-ticket.png) no-repeat left center;
          background-size: 16px 16px;
        }
        &.delivery{
          background: url(~@/static/icon/assurance-delivery.png) no-repeat left center;
          background-size: 16px 16px;
        }
        &.vr{
            background: url(~@/static/icon/ticket-vr.png) no-repeat left center;
            background-size: 16px 16px;
        }
        &.seat-picking{
            background: url(~@/static/icon/ticket-pickseat.png) no-repeat left center;
            background-size: 16px 16px;
        }
        &.express{
            background: url(~@/static/icon/ticket-express.png) no-repeat left center;
            background-size: 16px 16px;
        }
        &.onsite{
            background: url(~@/static/icon/ticket-onsite.png) no-repeat left center;
            background-size: 16px 16px;
        }
        &.venue{
            background: url(~@/static/icon/ticket-venue.png) no-repeat left center;
            background-size: 16px 16px;
        }
    }
    .newuser-decorator{
        background: url(~@/static/icon/red-package.png) no-repeat center center;
        background-size: 16px 16px;
        width: 1.6rem;
        height: 1.6rem;
        margin-right: 1rem;
    }
    .coupon-decorator{
        text-align: center;
        width: 4.2rem;
        height: 2rem;
        line-height: 2rem;
        color: #ff1d41;
        background-color: #ffedf0;
        font-size: 1rem;
        position: relative;
        .right-border{
          position: absolute;
          right: 0;
          border-left: 0.7rem solid #ffedf0;
          border-top: 1.1rem solid #fff;
          border-bottom: 1.1rem solid #fff;
          top: 0;
        }
    }
    .back-home{
        padding: 10px 0;
        position: absolute;
        width: 54px;
        height: 54px;
        border-radius: 54px;
        text-align: center;
        color: #fff;
        font-size: 13px;
        right: 11px;
        bottom: 74px;
        z-index: 1000;
        background-image: linear-gradient(315deg, rgba(255, 29, 65, 0.8), rgba(238, 14, 135, 0.8));
    }
    .forward-icon{
        display: flex;
        align-items: center;
    }
    .truncate{
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    .content-detail{
        flex: 1;
        overflow-y: auto;
        overflow-x: hidden;
        position: relative;
        .normal-color{
            color: #333;
        }
        .light-color{
            color: rgb(119,119,119);
        }
        .promise-txt{
            display: inline-block;
            vertical-align: middle;
        }
        .venue-name{
            font-size: 1.6rem;
            color: #000;
        }
        .venue-address{
            color: #95949d;
            font-size: 1.4rem;
        }
        .content-row,.coupon-row{
            display: flex;
            align-items: center;
            padding: 1.8rem 0;
            margin:0 @padding-h;
            font-size: 1.4rem;
            line-height: 2rem;
            border-bottom: solid 0.1rem @border-color;
            .row-flex{
                flex: 1;
                overflow: hidden;
            }
          &.no-padding{
            padding: 0;
          }
          .get-coupon{
            color: @medium-font;
          }
          .available-coupon{
            background-color: #fff3f5;
            border: solid 0.5px rgba(255, 119, 141, 0.5);
            color: @main-color;
            height: 2.8rem;
            line-height: 2.8rem;
            padding: 0 1rem;
            margin-right: 1.8rem;
            position: relative;
            &:before,&:after{
              position: absolute;
              content: "";
              width: 0.6rem;
              height: 1.2rem;
              background: #fff;
              top: 50%;
              transform: translateY(-50%);
              border: solid 0.5px rgba(255, 119, 141, 0.5);
            }
            &:before{
              left: -1px;
              border-left: 1px solid #fff;
              border-top-right-radius: 1rem;
              border-bottom-right-radius: 1rem;
            }
            &:after{
              right: -1px;
              border-right: 1px solid #fff;
              border-top-left-radius: 1rem;
              border-bottom-left-radius: 1rem;
            }
          }
          .content-title{
            display: inline-block;
            font-weight: bold;
            color: #000;
            padding-right: 1.8rem;
            vertical-align: top;
          }
          .content-detail{
            display: inline-block;
            vertical-align: top;
            flex: 1;
          }
          .activity{
            display: inline-block;
            color: @main-color;
          }
        }
        .coupon-row{
            display: flex;
            font-size: 1.2rem;
            align-items: center;
            .row-flex{
                flex: 1;
                overflow: hidden;
            }
        }
        .splitor{
            position: relative;
            .common{
                content: "";
                position: absolute;
                border-radius: 1.3rem;
                height: 1.3rem;
                width: 1.3rem;
                background-color: rgb(228,228,228);
                bottom: -7px;
            }
            &:before{
                .common;
                left: -0.6rem;
            }
            &:after{
                .common;
                right: -0.6rem;
            }
            height: 2rem;
            border-bottom: 1px dashed rgb(228,228,228);
        }
        .section-title{
            padding: 1.8rem 0;
            color: #331511;
            font-size: 1.6rem;
            line-height: 1.7rem;
            font-weight: bold;
        }
        .advertising{
            padding: 1.8rem;
            .content-detail{
                    background: url(~@/static/icon/show-advertisement.png) no-repeat 18px 18px;
                    background-size: 23px 20px;
                    text-indent: 3rem;
                    padding: 1.8rem;
                    line-height: 2rem;
                    padding-top: 2.5rem;
                    background-color: rgba(255, 29, 65, 0.05);
                    border: solid 1px rgba(149, 148, 157, 0.2);
            }
        }
        .criticisms{
            background-color: @background-color;
            padding: @padding-h;
            .criticism-list{
                display: flex;
                flex-wrap: nowrap;
                overflow-x: auto;
                .separator{
                    min-width: 1.5rem;
                }
                .criticism{
                    background-color: #ffffff;
                    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.06);
                    border: solid 1px rgba(149, 148, 157, 0.2);
                    min-width: 100%;
                    padding: 1.8rem;
                    margin-right: 0.8rem;
                    border-radius: 4px;
                    &.last{
                        margin-right: 0;
                    }
                    .criticism-author{
                        display: flex;
                        align-items: center;
                        .criticism-author-icon{
                            width: 2.9rem;
                            height: 2.9rem;
                            border-radius: 2.9rem;
                        }
                        .criticism-author-name{
                            padding: 0 1rem;
                            color: #95949d;
                            font-size: 1.3rem;
                        }
                        .v-icon{
                            width: 25px;
                            height: 12px;
                        }
                    }
                    .criticism-content{
                        .criticism-title{
                            color: #333;
                            font-size: 1.4rem;
                            line-height: 1.7rem;
                            padding: 1rem 0;
                        }
                        .criticism-detail{
                            font-size: 1.2rem;
                            color: rgb(119,119,119);
                            line-height: 1.6rem;
                        }
                    }
                }
            }
        }
        .service-assurance{
            width: 100%;
            height: 14rem;
            background-color: rgba(149, 148, 157, 0.09);
            padding: 0 2.2rem;
            .assurance-title-wrapper{
              display: flex;
              justify-content: center;
              width: 100%;
              padding: 1.8rem 0;
              .assurance-title{
                font-size: 1.4rem;
                font-weight: bold;
                text-align: center;
                position: relative;
                &:before,&:after{
                  top: 50%;
                  border-top: solid 1px rgba(149, 148, 157, 0.2);
                  position: absolute;
                  width: 2.7rem;
                  content: "";
                }
                &:before{
                  left: -3.6rem;
                }
                &:after{
                  right: -3.6rem;
                }
              }
            }
            .assurance-items{
              display: flex;
              justify-content: space-around;
              font-size: 1.3rem;
              align-items: center;
              .assurance-item{
                width: 5.2rem;
                line-height: 1.8rem;
                padding-top: 4rem;
                background-repeat: no-repeat;
                background-position: center top;
                background-size: 30px;
                color: #95949d;
                &.real{
                  background-image: url(~@/static/icon/assurance-real-dark.png);
                }
                &.ticket{
                  background-image: url(~@/static/icon/assurance-ticket-dark.png);
                }
                &.delivery{
                  background-image: url(~@/static/icon/assurance-delivery-dark.png);
                }
              }
            }
        }
        .show-detail{
            padding-left: @padding-h;
            padding-right: @padding-h;
            .detail-content{
                color: rgb(119,119,119);
                font-size: 1.2rem;
                line-height: 1.8rem;
                transition: height 0.5s;
                img{
                    max-width: 98%;
                }
                &.short{
                    overflow: hidden;
                }
                &.normal{
                    height: auto;
                }
            }
            .toggle-detail-btn{
                position: relative;
                margin-bottom: 1.8rem;
                &.short:before{
                    content: "";
                    top: -3rem;
                    position: absolute;
                    height: 3rem;
                    width: 100%;
                    left: 0;
                    background-color: -webkit-linear-gradient(270deg,rgba(255,255,255,0) 8%,rgba(255,255,255,.48) 20%,#FFF 72%);
                    background-color: linear-gradient(-180deg,rgba(255,255,255,0) 8%,rgba(255,255,255,.48) 20%,#FFF 72%);
                }
                font-size: 1.2rem;
                color: @main-color;
                line-height: 2rem;
                height: 2rem;
                text-align: center;
                &.short{
                    span:after{
                      border-top: 5px solid @main-color;
                      top: 45%;
                    }
                }
                &.normal{
                    span:after{
                        top: 30%;
                        border-bottom: 5px solid @main-color;
                    }
                }
                span{
                    position: relative;
                    &:after{
                        content: "";
                        position: absolute;
                        left: -1.5rem;
                        border-left: 5px solid transparent;
                        border-right: 5px solid transparent;
                    }
                }
            }
        }
    }
    .header-bg{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        overflow: hidden;
        z-index: 1;
        background-color: rgba(0,0,0,0.3);
        .placeholder{
            width: 100%;
            height: 100%;
        }
        .img-holder{
            width: 100%;
            height: 100%;
            background-repeat: no-repeat;
            background-position: center;
            filter: blur(40px);
            transform: scale(1.5);
        }
        .serration{
            display: none;
            background: url(~@/static/icon/bg-serration.png) left bottom;
            background-size: 100% 100%;
            width: 100%;
            height: 1rem;
            position: absolute;
            bottom: 0;
        }
    }
    .content-header{
        width: 100%;
        position: relative;
        display: flex;
        align-items: flex-end;
        padding: 2.9rem 1.8rem;
        .show-img{
            width: 8.4rem;
            height: 11.8rem;
            z-index: 10;
        }
        .discount{
            width: 5.3rem;
            height: 5.3rem;
            border-radius: 2.8rem;
            background-image: linear-gradient(315deg, #ff1d41, #ee0e87);
            box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.2);
            font-size: 1.2rem;
            text-align: center;
            position: absolute;
            right: 1.5rem;
            color: #fff;
            z-index: 100;
            bottom: 1.8rem;
            .number{
                font-size: 2rem;
                padding-top: 0.8rem;
                line-height: 2rem;
            }
        }
        .detail{
            flex: 1;
            display: flex;
            flex-direction: column;
            color: #fff;
            z-index: 10;
            padding-left: 1.5rem;
            .row{
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: center;
            }
            .show-name{
                line-height: 2.2rem;
                height: 6.6rem;
                font-size: 1.6rem;
                overflow: hidden;
            }
            .show-time{
                font-size: 1.3rem;
                color: rgba(255, 255, 255, 0.7);
            }
            .price{
                height: 3rem;
                .number{
                    line-height: 3rem;
                    font-size: 2.2rem;
                    display: inline-block;
                    padding-right: 0.5rem;
                }
                .text{
                    font-size: 1rem;
                    display: inline-block;
                    color: rgba(255, 255, 255, 0.7);
                }
            }
        }
    }
    .content-footer{
        min-height: 6.2rem;
        flex-basis: 6.2rem;
        display: flex;
        width: 100%;
        border-top: 1px solid rgb(228,228,228);
        padding: 0.9rem 0;
        z-index: 1000;
        align-items: center;
        position: relative;
        background-color: #fff;
        .show-operation-tip{
          display: none;
          width: 100%;
          position: absolute;
          top: -4rem;
          height: 4rem;
          color: #fff;
          background-image: linear-gradient(276deg, rgba(255, 29, 65, 0.93), rgba(238, 14, 135, 0.93));
          line-height: 4rem;
          text-align: center;
          font-size: 1.3rem;
        }
        .icon{
            width: 100%;
            height: 2.5rem;
        }
        .label{
             width: 100%;
             font-size: 1rem;
             color: rgb(170,170,170);
             text-align: center;
        }
        .customer-service{
            width: 5.5rem;
            border-right: 1px solid rgb(228,228,228);
            .icon{
                background: url(~@/static/icon/customer-service.png) center center no-repeat;
                background-size: 22px 22px;
            }
        }
        .footer-btn-wrapper{
          flex: 1;
          padding-right: 0.9rem;
          display: flex;
        }
        .footer-btn{
          color: #fff;
          line-height: 4.4rem;
          height: 4.4rem;
          text-align: center;
          font-size: 1.6rem;
          flex: 1;
          margin-right: 0.9rem;
          border-radius: 2px;
        }
        .choose-seat{
            background-image: linear-gradient(107deg, #fec736, #ff8006);
        }
        .book-ticket{
            background-image: linear-gradient(287deg, #f80000, #fc5f13);
        }
        .choose-ticket{
            background-image: linear-gradient(287deg, #ff1d41, #ee0e87);
        }
        .prebook-btn{
            background-image: linear-gradient(278deg, #00a35f, #30d08d);
        }
        .prebooked{
            background-color: #f6f6f7;
            color: #68676c;
        }
        .book-lackage{
            background-color: #323038;
        }
        .lackage-booked,.show-over{
          background-color: #f6f6f7;
          color: #68676c;
        }
    }
    .popup-title{
      width: 100%;
      text-align: center;
      font-size: 1.6rem;
      color: @dark-font;
      padding: 1.8rem 0;
    }
    .popup-inner-content{
      height: 27rem;
      overflow-x: hidden;
      overflow-y: auto;
      padding:0 1.8rem;
      .ticket-tag{
        background-size: 1.9rem;
      }
      .show-tag{
        background-size: 1.9rem;
      }
    }
    .tag-detail{
      padding-bottom: 2.9rem;
      .tag-name{
        font-size: 1.6rem;
        font-weight: bold;
        line-height: 2.2rem;
      }
      .tag-content{
        font-size: 1.4rem;
        padding-left: 2.4rem;
        line-height: 2.3rem;
        color: #68676c;
      }
    }
    .tips-content{
      font-size: 1.4rem;
      line-height: 2.3rem;
      color: #68676c;
      .tip-item{
        padding-bottom: 2.2rem;
      }
    }
  .coupon-operation{
    display: flex;
    justify-content: space-between;
    .label{
      font-size: 1.4rem;
      color: @medium-font;
    }
    .btn{
      width: 6.4rem;
      height: 2.4rem;
      line-height: 2.4rem;
      text-align: center;
      border-radius: 2px;
      color: #fff;
      background-image: linear-gradient(291deg, #ff1d41, #ee0e87);
      &.inactive{
        background: #eaeaeb;
        color: @medium-font;
      }
    }
  }
}
</style>

<script>
import { httpGet } from '@/common/httpUtil'
import { templateCompile } from '@/common/urlUtil'
import * as sessionStorageUtil from '@/common/sessionStorageUtil'
import * as adapterStorageUtil from '@/common/adapterStorageUtil'
export default {
  props: {
    prefixUrl: {
      type: String,
      default: ''
    },
    src: {
      type: String,
      default: ''
    },
    nextUrl: {
      type: String,
      default: ''
    },
    showBuyTipUrl: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      displayPurchaseTip: false,
      showWholeDetail: false,
      content: {
        show: {
          posterURL: ''
        },
        showStatus: {},
        recommendShows: {}
      },
      availabeCoupons: [],
      pocketCoupons: [],
      showStatusMap: {
        presell: {
          title: '本节目尚在预售中',
          tagName: '预售中',
          tagClass: 'presell'
        },
        prebook: {
          title: '本节目尚未开售',
          tagName: '未开售',
          tagClass: 'prebook'
        },
        lackage: {
          title: '本节目暂时缺票',
          tagName: '暂时缺票',
          tagClass: 'lackage'
        }
      }
    }
  },
  computed: {
    isShowInPresell () {
      let _self = this
      let status = _self.content.show.showStatus ? _self.content.show.showStatus.code : 2
      return status === 2 && _self.content.show.minPrice > 0
    },
    isShowInLackage () {
      let _self = this
      let status = _self.content.show.showStatus ? _self.content.show.showStatus.code : 2
      return (status === 2 || status === 3) && _self.content.show.minPrice === 0
    },
    isShowInPreBook () {
      let _self = this
      let status = _self.content.show.showStatus ? _self.content.show.showStatus.code : 2
      return status === 1
    },
    isShowInOver () {
      let _self = this
      let status = _self.content.show.showStatus ? _self.content.show.showStatus.code : 2
      return status === 4
    }
  },
  mounted () {
    let _self = this
    sessionStorageUtil.syncSessionData()
    _self.prefixUrl && sessionStorageUtil.set('prefix', _self.prefixUrl)
    _self.fetchShow(MIP.hash.get('id'))
  },
  methods: {
    fetchShow (id) {
      let _self = this
      let fetchUrl = templateCompile(this.src, {id})
      httpGet(fetchUrl)
        .then(function (data) {
          if (data.result && data.result.data) {
            _self.content.show = data.result.data
            let limitation = data.result.data.limitation
            adapterStorageUtil.set('buy_num_limit', limitation)
            _self.content.showStatus = _self.getShowStatusTip() || {}
          }
        }).catch(function (err) {
          console.log(err)
        })
    },
    bookingLink (id) {
      return `${this.nextUrl}#id=${id}`
    },
    tips () {
      return ['演出详情仅供参考，具体信息以主办方公布信息及现场为准，请准时到场以免错过演出。',
        '鉴于文体演出票品特殊性（具有时效性、唯一性等特征），一旦用户与卖家达成有效订单代表交易协议生效，用户不能主动要求取消交易（因演出活动被取消或延期除外）。',
        '鉴于票品的不可复制性与稀缺性，本平台对每个演出（活动）均设有限购数量，平台有权无理由取消任何用户超过限购数量的交易，平台识别同一用户的方式包括但不限于同一注册手机号、同一收货手机号、同一快递地址、同一付款账户、同一下单设备等。',
        '本平台尽最大努力促使卖家对交易协议的履行，如果卖家付票过程中发生问题，本平台可寻求其它卖家提供更高票面或相同票面更好位置票品代替，否则，平台将全额退款并按订单上约定的赔付方式与金额向用户进行赔付，详细规则请见<常见问题-无票赔付>。']
    },
    getShowStatusTip () {
      if (this.isShowInPresell) {
        return this.showStatusMap.presell
      }
      if (this.isShowInPreBook) {
        return this.showStatusMap.prebook
      }
      if (this.isShowInLackage) {
        return this.showStatusMap.lackage
      }
    },
    showPurchaseTip () {
      let me = this
      if (me.content.show.isShowDescription) {
        let id = me.content.show.showOID
        let showBuyTipUrl = templateCompile(this.showBuyTipUrl, {id})
        httpGet(showBuyTipUrl).then(function (data) {
          if (data.statusCode === 200) {
            me.showDesc = data.result.data
            me.displayPurchaseTip = true
          }
        })
      } else {
        me.displayPurchaseTip = true
      }
    }
  }
}
</script>
