# mip-53popup

标题|内容
----|----
类型|
支持布局|
所需脚本| [https://c.mipcdn.com/extensions/platform/v2/53.com.cn/mip-53popup/mip-53popup.js](https://c.mipcdn.com/extensions/platform/v2/53.com.cn/mip-53popup/mip-53popup.js)

## 说明

> 通过id: `my-popup`,的对组件进行隐藏显示，通过 `selct`,`input`的属性值来获取用户输入选择的值并提交内容

## 示例

示例说明

```html
<mip-53popup id="my-popup" class="my-popup-box" selct="itemselect" input="iteminput">
  <div class="popup-content">
    <div class="mip-popup-header">免费预约资深专家 量身定制加盟方案</div>
    <div class="mip-popup-body">
        <div class="laber-input">
          <span class="item-name">我要加盟</span>
          <select class="item-select" id="itemselect">
            <option value="">--请选择加盟品牌--</option>
            <option value="餐饮品牌">餐饮品牌</option>
            <option value="服装品牌">服装品牌</option>
            <option value="零售品牌">零售品牌</option>
            <option value="美容品牌">美容品牌</option>
            <option value="教育品牌">教育品牌</option>
            <option value="母婴品牌">母婴品牌</option>
            <option value="酒水品牌">酒水品牌</option>
            <option value="其他">其他</option>
          </select>
        </div>
        <div class="laber-input">
          <span class="item-name">手机号码</span>
          <input class="item-input" type="number" placeholder="请输入您的手机号" class="mip-input" id=iteminput >
        </div>
    </div>
    <div class="mip-popup-tishi" id="mip-popup-tishi"></div>
    <div class="mip-popup-footer">
      <div class="mip-popup-buttons">
        <div class="mip-popup-button" on="tap:my-popup.close">取消</div>
        <div class="mip-popup-button" on="tap:my-popup.subme">确定</div>
      </div>
    </div>
  </div>
</mip-53popup>
```

## 属性

### selct
说明：内容对应的id

必选项：否

类型：字符串

取值范围：无

单位：无

默认值：无

### input
说明：内容对应的id

必选项：否

类型：字符串

取值范围：无

单位：无

默认值：无

**说明**：

**必选项**：

**单位**：

**默认值**：
