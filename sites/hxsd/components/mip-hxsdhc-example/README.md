# mip-hcGo-example

标题|内容
获取视窗后内容自适应|主要是实现获取视窗宽度后内容自适应，字体内容以自适应的比例展示。
类型|通用
支持布局|responsive,fixed-height,fill
所需脚本| 无依赖脚本

## 说明
根据获取到视窗的宽度然后内容、字体自适应。
如：设计稿宽度为640时，css写法为：width:6.4rem
750的时候：width:7.5rem
以除以100的比例缩放。


## 示例
js：
let width = document.documentElement.clientWidth || document.body.clientWidth;
let fontSize = (100 / hcClintWidth) * width;
// 代码示例
Html框架无变化，主要依靠css以px为单位的进行缩，css的写法以rem出现。

## 属性

### 属性1

**说明**：
获取视窗宽度后根据设计稿尺寸，内容进行自适应。
**必选项**：
是
**单位**：
rem

**默认值**：
