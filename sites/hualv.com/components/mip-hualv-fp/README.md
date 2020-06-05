# mip-hualv-fp

标题|内容
----|----
类型|js组件
支持布局|
所需脚本| [https://c.mipcdn.com/extensions/platform/v2/hualv.com/mip-hualv-fp/mip-hualv-fp.js](https://c.mipcdn.com/extensions/platform/v2/hualv.com/mip-hualv-fp/mip-hualv-fp.js)

## 说明

1、通过用户换机参数计算指纹（fingerprint）id
2、用户访问日志传输至sls服务进行存储
3、无埋点统计（2020-06-05迭代 新增功能）
4、自定义事件跟踪（2020-06-05迭代 新增功能）

## 示例

示例说明

```
<mip-hualv-fp>
    // FingerPrint数据接受容器，参数配置容器 必需！！！
	<mip-data id="FingerPrint" scope>
		<script type="application/json">
		{
			
		}
		</script>
	</mip-data>
	// demo开始 以下demo部分 仅为实例用，使用时可灵活改变使用位置，方式等（不局限于该组件内部使用）
	// 页面交互按钮 写入事件队列 demo
      <button on="tap: MIP.setData({ FingerPrint: { Hmga : ['_trackEvent','test-event',{'questionId':111123}]}})">交互测试</button>
	// 使用脚本 写入事件队列 demo （使用mip-script组件需引用该组件引用方法见末尾）
	<mip-script>
	  setTimeout(() => {
        MIP.setData({FingerPrint:{Hmga:['_trackEvent','test-event',{'questionId':111123}]}})
      },2000)
    </mip-script>
	// 指纹参数调用 demo
	  <div>duration：<span m-text="FingerPrint.Data.duration"></span></div>
      <div>fingerprint：<span m-text="FingerPrint.Data.fingerprint"></span></div>
      <div>sessionId：<span m-text="FingerPrint.Data.sessionId"></span></div>
      <div>type：<span m-text="FingerPrint.Data.type"></span></div>
      <div>request：<span m-text="FingerPrint.Data.request"></span></div>
      <div>referrer：<span m-text="FingerPrint.Data.referrer"></span></div>
      <div>agent：<span m-text="FingerPrint.Data.agent"></span></div>
	//demo结束
</mip-hualv-fp>
```

## 属性

无

## 组件依赖

若需使用mip-script组件需添加以下引用
  <script src="https://c.mipcdn.com/static/v2/mip-script/mip-script.js"></script>
