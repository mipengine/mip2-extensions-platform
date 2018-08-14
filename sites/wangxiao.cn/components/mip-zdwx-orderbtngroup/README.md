# `mip-zdwx-orderbtngroup`

标题|订单按钮组组件
----|----
类型|mip组件
支持布局|无
所需脚本|无

## 说明

初始化订单按钮组，显示订单当前支持的操作。

## 示例

示例说明
<mip-data>
    <script type="application/json">
        {
            "orderInfo": {
                "evaluate":0,
                "payStatus":1
            }
        }
    </script>
</mip-data>
<mip-zdwx-orderbtngroup
    m-bind:order-info="orderInfo">
</mip-zdwx-orderbtngroup>
数据为订单信息，根据订单信息渲染
去评价跳转到evaluate.jsp
去学习调整到orderInfo.url
付款跳转到payorder.jsp
取消订单后跳转到 orderlist.jsp

## 属性

属性说明

orderInfo 订单详情
