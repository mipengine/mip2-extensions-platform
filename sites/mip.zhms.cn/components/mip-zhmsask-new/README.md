# mip-zhmsaskv2

标题|内容
----|----
类型|js组件
支持布局|支持 与页面视图结合使用
所需脚本| [https://c.mipcdn.com/extensions/platform/v2/mip.zhms.cn/mip-zhmsaskv2/mip-zhmsaskv2.js](https://c.mipcdn.com/extensions/platform/v2/mip.zhms.cn/mip-zhmsaskv2/mip-zhmsaskv2.js)

## 说明

mip.zhms.cn站点留言面板组件，实现留言提交。

## 示例

示例说明

```
<mip-zhmsask-new data-merchantId="5" data-brandId="1066" data-categoryId="77" data-source="{&quot;SourceUrl&quot;:&quot;https://mip.zhms.cn/jm/1066&quot;,&quot;IntentionBrand&quot;:&quot;测试用例&quot;}">
            <div class="mt10 mip-zhmsask">
                <div class="mip-zhmsask-fz mip-zhmsask-bg-fff mip-zhmsask-ptb25 mip-zhmsask-plr15">
                    <h2 class="mip-zhmsask-f16 mip-zhmsask-fw6">加盟咨询</h2>
                    <p class="mip-zhmsask-s-c8c8 mip-zhmsask-mt10 mip-zhmsask-f12"><b class="mip-zhmsask-s-c595">温馨提示：</b>如果你对本品牌感兴趣，并希望了解更多加盟信息，请填写下方表格，方便本品牌企业与你联系。</p>
                    <mip-form class="mip-zhmsask-from" method="post" url="https://mip.zhms.cn/brand/addconsultation/">
                        <ul class="mip-zhmsask-from-list mip-zhmsask-mt15">
                            <li class="mip-zhmsask-bor1">
                                <input type="text" name="data-nickname" id="data-nickname" placeholder="您的称谓" class="mip-zhmsask-text">
                            </li>
                            <li class="mip-zhmsask-borb1 sex-radio-box">
                                <div class="mip-zhmsask-div">
                                    <label class="lable-sex">
                                        <input type="radio" name="sex" value="1" checked="checked" />先生
                                    </label>
                                    <label class="lable-sex">
                                        <input type="radio" name="sex" value="2" />女士
                                    </label>
                                </div>
                            </li>
                            <li class="mip-zhmsask-bor1">
                                <input type="text" name="data-tel" id="data-tel" class="mip-zhmsask-text" placeholder="请输入手机号">
                            </li>
                            <div target="tel">请填写手机号码</div>
                            <li class="mip-zhmsask-bor1">
                                <textarea class="mip-zhmsask-area" name="data-question" id="data-question" placeholder="您想了解的问题"></textarea>
                                <dl class="kuaijie">
                                    <dt>快捷留言：</dt>
                                    <dd>
                                        <span class="quick-question">想要加盟，请尽快联系。</span>
                                        <span class="quick-question">加盟流程是怎样的？</span>
                                        <span class="quick-question">加盟费需要是多少钱？</span>
                                        <span class="quick-question">有哪些扶持政策</span>
                                        <span class="quick-question">能实地考察吗？</span>
                                    </dd>
                                </dl>
                            </li>
                            <li>
                                <input type="button" class="mip-zhmsask-submit-btn" value="提交">
                            </li>
                        </ul>
                    </mip-form>
                </div>
                <mip-toast id="toast-bar" info-text="" station="bottom" name="toast-bar">
                </mip-toast>
            </div>
        </mip-zhmsask-new>
```

## 属性

### data-merchantId

**说明**：商家编号

**必选项**：非必选项

**单位**：数字

**默认值**：0

### data-brandId

**说明**：品牌编号

**必选项**：非必选项

**单位**：数字

**默认值**：0

### data-categoryId

**说明**：分类编号

**必选项**：非必选项

**单位**：数字

**默认值**：0

### data-source

**说明**：来源信息

**必选项**：必选项

**单位**：json字符串

**默认值**：""