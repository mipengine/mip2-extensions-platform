# `mip-jkx-alert`

## 说明

极客修弹窗组件

## 示例

<div class="wrapper" v-show="alertmsg.isError">
    <div class="jkx_msg" ref="jkxmsg">
      <p class="msg_main">{{alertmsg.errorTitle}}</p>
    </div>
</div>

## 属性

alertmsg:{
    isError:false,  //默认false，控制弹窗的显示与隐藏
    errorTitle:""   //默认为""， 弹窗的内容
}
