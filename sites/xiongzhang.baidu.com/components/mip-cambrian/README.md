# mip-cambrian

注： mip-cambrian组件的mip2版本。

mip-cambrian 熊掌号SF bar组件，调用此组件，会向superframe postmessage，传递官方号id，sf会获取相关数据，更新titlebar。


| 标题   | 内容                                       |
| ---- | ---------------------------------------- |
| 类型   | 业务                                       |
| 支持布局 | responsive,fixed-height,fill,container,fixed |
| 所需脚本 | https://c.mipcdn.com/extensions/platform/v2/xiongzhang.baidu.com/mip-cambrian/mip-cambrian.js |

## 示例

### 基本用法
```html
<mip-cambrian site-id="12345"></mip-cambrian>
```

## 属性

### site-id

说明：官方号唯一id
必选项：是
类型：字符串

## 注意

一个页面内只允许存在一个熊掌号SF bar组件
