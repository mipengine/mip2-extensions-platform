# mip-dishen-datepicker

标题|内容
----|----
类型|
支持布局|
所需脚本| [https://c.mipcdn.com/extensions/platform/v2/m.dishen.com/mip-dishen-datepicker/mip-dishen-datepicker.js](https://c.mipcdn.com/extensions/platform/v2/m.dishen.com/mip-dishen-datepicker/mip-dishen-datepicker.js)

## 说明

日期选择组件,支持农历/阳历切换,可以选择单独选择日期(年/月/日),也可以单独选择时间(时/分)

## 示例

选择日期

```
// 代码示例
      <mip-dishen-datepicker data-date="2000-1-1" data-toid-date="date" data-type="0">
          <input type="hidden" name="date" id="date" value="0" on="change:MIP.setData({date:event.value})">
      </mip-dishen-datepicker>
```

选择时间

```
// 代码示例
      <mip-dishen-datepicker data-hour="0" data-min="0" data-toid-hour="hour" data-toid-min="min" data-fixed="true">
          <input type="hidden" name="hour" id="hour" value="0" on="change:MIP.setData({hour:event.value})">
          <input type="hidden" name="min" id="min" value="0" on="change:MIP.setData({min:event.value})">
      </mip-dishen-datepicker>
```
## 属性

### data-type

**说明**：日期类型 0：公历 1：农历

**必选项**：否

### data-fixed

**说明**：是否固定日期类型，true：不可切换日期类型 false：可以切换日期类型

**必选项**：否

### data-date

**说明**：日期初始值，格式为yyyy-MM-dd

**必选项**：否

**默认值**：当前日期

### data-toid-date

**说明**：写入日期值input的Id， 配置该项属性，才可以选择日期

**必选项**：否

### data-hour

**说明**：小时初始值

**必选项**：否

### data-toid-hour

**说明**：写入小时值input的Id， 配置该项属性，才可以选择小时

**必选项**：否

### data-min

**说明**：分钟初始值

**必选项**：否

### data-toid-min

**说明**：写入分钟值input的Id， 配置该项属性，才可以选择分钟

**必选项**：否

### data-confirm

**说明**：是否在选择日期后进行确认

**必选项**：否

