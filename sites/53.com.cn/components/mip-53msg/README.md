# mip-53msg

标题|内容
----|----
类型|
支持布局|
所需脚本| [https://c.mipcdn.com/extensions/platform/v2/53.com.cn/mip-53msg/mip-53msg.js](https://c.mipcdn.com/extensions/platform/v2/53.com.cn/mip-53msg/mip-53msg.js)

## 说明

> 通过 `popContact`,`laveMsg`,`popTel`,`popInfo`,`popButton`,`projectId`的属性值来获取用户输入的值并提交内容

## 示例

示例说明

// 代码示例

### 定制模板
```html
<mip-53msg popContact="Mcontact3" laveMsg="laveMsg" popTel="Mtel3" popInfo="Minfo3" popButton="Mbutton3" projectId="1">
  <p contenteditable="true" name="Mcontact3" id="Mcontact3" validatetarget="meContact" validatetype="must"
    placeholder="请输入您的姓名~"></p>
  <p contenteditable="true" name="Mtel3" id="Mtel3" validatetarget="meTel" validatetype="must"
    placeholder="请输入您的手机~"></p>
  <p contenteditable="true" class="msgTxt" name="Minfo3" id="Minfo3" placeholder="请输入留言内容~"></p>
  <div class="clause">
    <i class="check-box">
      <i></i>
    </i>
    <div> 我已阅读并同意<a target="_blank" href="https://www.53.com.cn/aboutus/msgprotocol.html">《53加盟网服务条款》</a>
    </div>
  </div>
  <span id="Mbutton3">提交留言</span>
</mip-53msg>
```

## 属性

### popContact
说明：内容对应的id

必选项：否

类型：字符串

取值范围：`Mcontact3`

单位：无

默认值：无

### laveMsg
说明：内容对应的id

必选项：否

类型：字符串

取值范围：`laveMsg`

单位：无

默认值：无

### popTel
说明：内容对应的id

必选项：否

类型：字符串

取值范围：`Mtel3`

单位：无

默认值：无

### popInfo
说明：内容对应的id

必选项：否

类型：字符串

取值范围：`Minfo3`

单位：无

默认值：无

### popButton
说明：内容对应的id

必选项：否

类型：字符串

取值范围：`Mbutton3`

单位：无

默认值：无

### projectId
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
