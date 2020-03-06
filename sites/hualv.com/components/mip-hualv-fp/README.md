# mip-hualv-fp

标题|内容
----|----
类型|js组件
支持布局|
所需脚本| [https://c.mipcdn.com/extensions/platform/v2/hualv.com/mip-hualv-fp/mip-hualv-fp.js](https://c.mipcdn.com/extensions/platform/v2/hualv.com/mip-hualv-fp/mip-hualv-fp.js)

## 说明

1、通过用户换机参数计算指纹（fingerprint）id,
2、用户访问日志传输至sls服务进行存储

## 示例

示例说明

```
<mip-hualv-fp>
	<mip-data id="FingerPrint" scope>
		<script type="application/json">
		{
			
		}
		</script>
	</mip-data>
	// 以下为示例用显示demo，使用时可忽略
	<div>duration：<span m-text="FingerPrint.duration"></span></div>
	<div>fingerprint：<span m-text="FingerPrint.fingerprint"></span></div>
	<div>sessionId：<span m-text="FingerPrint.sessionId"></span></div>
	<div>type：<span m-text="FingerPrint.type"></span></div>
	<div>request：<span m-text="FingerPrint.request"></span></div>
	<div>referrer：<span m-text="FingerPrint.referrer"></span></div>
	<div>agent：<span m-text="FingerPrint.agent"></span></div>
	//demo结束
</mip-hualv-fp>
```

## 属性

无