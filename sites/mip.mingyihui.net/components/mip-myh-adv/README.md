# mip-myh-adv

标题|内容
----|----
类型| 通用
支持布局| responsive,fixed-height,fill,container,fixed
所需脚本| https://c.mipcdn.com/static/v2/mip-mustache/mip-mustache.js,https://c.mipcdn.com/extensions/platform/v2/mip.mingyihui.net/mip-myh-adv/mip-myh-adv.js

## 说明

名医汇根据广告位，位置属性筛选内部合适广告

## 示例

示例说明

```
<mip-myh-adv src="http://localhost/my/thinkphp_5.0.24_with_extend/public/" data-post="{adpp_id:'adpp_index_1'}" data-post-extParams="{}" inner-cpnt="mip-carousel" cpnt-attrs="{autoplay:'autoplay',height:'250',width:'600',indicator:'indicator',indicatorId:'mip-carousel-example'}">
            <template type="mip-mustache">
                <div>
                    <a href="{{ad_url}}"><mip-img src="{{ad_content}}"></mip-img></a>
                </div>
            </template>
</mip-myh-adv>

<mip-myh-adv id="myhAdv2" src="http://localhost/my/thinkphp_5.0.24_with_extend/public/" data-post="{adpp_id:'adpp_index_1'}" data-post-extParams="{}">
            <template type="mip-mustache">
                <a href="{{ad_url}}"><mip-img on="tap:myhAdv2.click({{ad_sign}})" src="{{ad_content}}"></mip-img></a>
                {{#lists}}
                <a  href="{{ad_url}}" on="tap:myhAdv2.click({{ad_sign}})">{{ad_content}}</a>
                {{/lists}}
            </template>
</mip-myh-adv>
```

## 属性

### src

**说明**：广告请求地址

**必选项**：必须

### data-post

**说明**：广告位标签,json格式字符串

**必选项**：必须

### data-post-extParams

**说明**：广告位内容扩展属性,json格式字符串

**必选项**：可选

### inner-cpnt

**说明**：内嵌容器类型

**必选项**：可选

### cpnt-attrs

**说明**：内嵌容器属性,json格式字符串

**必选项**：可选