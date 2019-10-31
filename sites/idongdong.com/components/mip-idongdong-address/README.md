# mip-idongdong-address

标题|下载地址处理组件
----|----
类型|mip组件
支持布局|无
所需脚本| [https://c.mipcdn.com/extensions/platform/v2/idongdong.com/mip-idongdong-address/mip-idongdong-address.js](https://c.mipcdn.com/extensions/platform/v2/idongdong.com/mip-idongdong-address/mip-idongdong-address.js)

## 说明

结合平台判断https://c.mipcdn.com/static/v2/mip-html-os/mip-html-os.js
处理下载地址

## 示例

示例说明

```
<mip-idongdong-address>
    <span id="btns"><a href="/down.asp?id=131256&device=ios" class="dbtn" rel="nofollow" isDown="0">立即下载</a></span>
    <p class="attr" id="down-href" username="dingpeng" type="0" datetime="2015/4/27" downid="142394" cid="634" rid="469" ppid="0"></p>
    <p class="attr" id="plat_Android" address="/37400359703/8460001/02300221792" typeid="58" resname="大话西游手游" resver="v1.1.177" ressystem="安卓, 2.3.1以上" cid="634" rid="469" platid="142394"></p>

    <p class="attr" id="plat_PC" address="/lzy7/DaHuaXY-1.1.140.exe" typeid="79" resname="大话西游手游电脑版" resver="v1.1.162" ressystem="Win7, Win8, Win10" cid="830" rid="483" platid="158824"></p>
    <p class="attr" id="plat_iPad" address="https://itunes.apple.com/cn/app/da-hua-xi-you-2015zui-shou/id1015364140?mt=8" typeid="32" resname="大话西游ipad版" resver="V1.1.55" ressystem="iOS6" cid="758" rid="479" platid="157991"></p>
    <mip-html-os os="android"><p class="attr" id="is_android">This Is Android</p></mip-html-os>
    <mip-html-os os="ios"><p class="attr" id="is_ios">This Is Ios</p></mip-html-os>
</mip-idongdong-address>
```

## 属性
