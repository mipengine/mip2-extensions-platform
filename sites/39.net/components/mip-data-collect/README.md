# mip-example

标题|内容
----|----
类型|通用
支持布局|
所需脚本|

## 说明

收集浏览器的信息，web事件:click,change,submit信息的触发,通过gif形式，传输到后台

## 示例

示例说明

```
<mip-data-collect id="mip">
    <script type="application/json">
        {
            "src": "http://wt.39.net",
            "stopFlag": "a"
        }
        </script>
</mip-data-collect>
```

## 方法



| 名称    | 类型                        | 返回值 | 说明                                  |
| ------- | --------------------------- | ------ | ------------------------------------- |
| setData | Function(el， event)        | Object | 提供对外的数据生成方法                |
| track   | Function(eventType, params) | /      | 手动埋点函数，需传入eventType, params |
|         |                             |        |                                       |




## 属性



| 名称           | 类型   | m默认值                       | 说明                                                         |
| -------------- | ------ | ----------------------------- | ------------------------------------------------------------ |
| src            | String | /                             | 数据传输的后台地址                                           |
| stopFlag       | String | 'a'                           | 点击元素，向上递归，直到遇到该标志的节点，如果不存在则取点击节点 |
| listenerEvents | Array  | ['click']                     | 监听的事件                                                   |
| onlyFlag       | String | 'a'                           | 只上报标签元素                                                |

