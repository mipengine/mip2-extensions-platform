# mip-video-over

标题|内容
----|----
类型|
支持布局|
所需脚本| [https://c.mipcdn.com/extensions/platform/v2/fh21.com.cn/mip-video-over/mip-video-over.js](https://c.mipcdn.com/extensions/platform/v2/fh21.com.cn/mip-video-over/mip-video-over.js)

## 说明

组件功能说明

## 示例

### 末尾带自定义弹窗
```html
<mip-video-over
	id="video"
	poster="https://file.bohe.cn/fhfile1/M00/73/EF/ooYBAF0Z2OGALZFjAAHJXpIzQBc95.jpeg"
	src="https://video.bohe.cn/20190701zzs10.mp4">
	<div class="hide pop">
	  <p class="close" on="click:video.close"><a>关闭</a><b></b></p>
	  <div class="play" on="click:video.play">继续播放</div>
	</div>
</mip-video-over>

## 属性

### src
说明：视频的url地址  
必选项：是
类型：string

### poster
说明：视频的封面图片    
必选项：是  
类型：string
