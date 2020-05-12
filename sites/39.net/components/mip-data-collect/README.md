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
            "onlyTrackTags": ['a']
        }
        </script>
</mip-data-collect>
```



## 配置

| 字段名         | 默认值             | 类型          | 备注                                      |
| -------------- | ------------------ | ------------- | ----------------------------------------- |
| src            | ‘http://wt.39.net’ | string        | 上传的地址                                |
| clickAreas     | ['a']              | array \| null | 点击上报的区域                            |
| onlyTrackTags  | ['a']              | array \| null | 仅上报的标签集合，支持单个class，ID，标签 |
| listenerEvents | ['click']          | array         | 监听的事件                                |
| eventName      | 'web_event'        | string        | 默认的事件名称                            |
| cancel_view    | false              | boolean       | 取消发送view事件                          |
| cancel_close   | false              | boolean       | 取消发送close事件                         |
| additionData   | {}                 | object        | 附加的参数                                |



## 实例方法

 

| 方法名   | 参数                                                  | 返回值 | 备注                                                         |
| -------- | ----------------------------------------------------- | ------ | ------------------------------------------------------------ |
| setData  | （el, event, widthBaseData）根据规则找到的元素对象    | null   | 提供对外的数据生成方法，必须返回需要发送的数据对象;baseData是默认携带系统参数，可以设置成false去掉 |
| track    | (eventType, params)事件的类型 \| 传输的数据           | null   | 手动埋点函数                                                 |
| listener | (tag, type, callback)监听的标志 \| 监听的事件 \| 回调 | object | 监听元素，必须返回需要发送的数据对象                         |
| getEl    | tag类型                                               | array  | 根据标志获取元素集合                                         |



## 特殊类名

| 类名       | 说明                     |
| ---------- | ------------------------ |
| no-track   | 不追踪当前元素及以下元素 |
| mp-include | 追踪当前及以下元素       |



## 上报的优先级

mp-include | no-track > onlyTrackTags



