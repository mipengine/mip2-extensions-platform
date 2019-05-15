# mip-example

标题|文章列表组件（上拉加载更多，接口数据格式已定） / 添加下载标签
----|----
类型|业务组件
支持布局|container
所需脚本| https://c.mipcdn.com/extensions/platform/v2/ruiwen.com/mip-gzpd-pubuliu/mip-gzpd-pubuliu.js |

## 说明

页面的title一定要写

当name属性为dldoc时，添加的是一条文档下载的标签。

当name属性为pubuliu时，为一个文章列表，上拉可以加载更多。此时title可以写为“黑板报”，“孩子”这类词进行测试

## 示例


```
<mip-gzpd-pubuliu name="pubuliu"></mip-gzpd-pubuliu>
<mip-gzpd-pubuliu name="dldoc"></mip-gzpd-pubuliu>
```

## 属性

### 属性1

name (必填)  等于dldoc时为一条跳转标签，等于pubuliu时为文章列表，上拉加载更多。