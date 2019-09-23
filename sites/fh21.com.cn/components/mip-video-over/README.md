# mip-video-over

标题|内容
----|----
类型|
支持布局|
所需脚本| [https://c.mipcdn.com/extensions/platform/v2/fh21.com.cn/mip-video-over/mip-video-over.js](https://c.mipcdn.com/extensions/platform/v2/fh21.com.cn/mip-video-over/mip-video-over.js)

## 说明

组件功能说明
自定义视频播放完后的弹窗内容 功能有关闭弹窗和重新播放

## 示例

### 末尾带自定义弹窗
```html
<mip-video-over
	id="video"
    controls="controls"
    preload="no"

    t7-video-player-type="inline"
    playsinline="playsinline"
    x5-playsinline="x5-playsinline"
    webkit-playsinline="webkit-playsinline"

    data-attrs="key1=value1||key2=value2||key3=value3"

	video-poster="https://file.bohe.cn/fhfile1/M00/73/EF/ooYBAF0Z2OGALZFjAAHJXpIzQBc95.jpeg"
	video-src="https://video.bohe.cn/20190701zzs10.mp4">
	<div class="hide pop">
	  <p class="close" on="click:video.close"><a>关闭</a><b></b></p>
	  <div class="play" on="click:video.play">继续播放</div>
	</div>
</mip-video-over>
```

## 属性

### video-src
说明：视频的url地址  
必选项：是
类型：string

### video-poster
说明：视频的封面图片    
必选项：是  
类型：string

### data-attrs
说明：视频需要的其它属性key=value||key=value...
必选项：否
类型：string