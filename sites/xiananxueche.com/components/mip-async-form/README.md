# mip-async-form 异步表单

异步提交表单，提高用户体验

标题|内容
----|----
类型|通用
支持布局|N/A
所需脚本| [https://c.mipcdn.com/extensions/platform/v2/xiananxueche.com/mip-async-form/mip-async-form.js](https://c.mipcdn.com/extensions/platform/v2/xiananxueche.com/mip-async-form/mip-async-form.js)

组件支持 `formsuccess` , `formfailure` , `formerror` 三个事件，在服务器响应的 `ret` 值为 `0` 时触发 `formsuccess` 事件，在服务器响应的 `ret` 值为 `非0的值` 时触发 `formfailure` 事件，此两个事件触发时携带两个参数： `msg` 和 `data`,分别表示 `响应说明消息` 和 `自定义响应数据`。服务器响应非正确格式的JSON数据时触发 `formerror` 事件。正确的服务器响应JSON数据格式为：`{ret:0,msg:"ok"}`

##### 服务器响应数据格式要求如下：

响应值|类型|必须|说明
----|----|----|----
ret|Integer|是|响应结果，0表示成功，其他表示失败
msg|String|是|响应说明消息
data|Object|否|自定义响应数据

## 示例

### 基本使用

```html
<mip-async-form id="my-async-form" method="post" url="http://www.example.com/api/baidumip/">
    <p><input type="text" name="name" placeholder="姓名"></p>
    <p>性别：<input required  type="radio" value="1" name="radio">男<input required  type="radio" value="2" name="radio">女</p>
    <p><input required type="text" name="mobile" placeholder="电话"></p>
    <p>标签：<input  type="checkbox" value="1" name="checkbox[]">标签1<input  type="checkbox" value="2" name="checkbox[]">标签2</p>
    <p>是否本地人：<input type="checkbox" value="3" name="checkbox2"></p>
    <p><input type="password" name="password" placeholder="密码"></p>
    <p>
        <select required name="sex">
            <option value="">请选择性别</option>
            <option value="男">男</option>
            <option value="女">女</option>
        </select>
   </p>
   <p><textarea required name="remark" placeholder="备注"></textarea></p>
   <p><input type="hidden" name="hidden"></p>
   <p><button type="button" on="tap:my-async-form.send">提交表单</button></p>
</mip-async-form>
```

### 配置表单元素

表单元素放在组件标签内，必须必填的表单元素增加属性 `required` 。


### 触发提交表单

组件有公开事件方法 `send`，可直接调用触发表单提交。如：

```html
<button type="button" on="tap:my-async-form.send">提交表单</button>
```

## 属性

### id

说明：组件 `id`
必选项：是
类型：字符串

### url

说明：表单提交地址
必选项：否
类型：字符串
取值：默认当前页面地址

### method

说明：表单提交方法
必选项：否
类型：字符串
取值：`post` `get` 默认get

## 注意事项

- 服务器响应header头需要添加 `Access-Control-Allow-Origin` 进行跨域。
