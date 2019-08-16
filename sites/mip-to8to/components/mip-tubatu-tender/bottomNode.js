export default `    <div class="layerout"></div>
                    <mip-fixed type="bottom" class="fixed-footer">
                        <div class="bottom-form-btn-box">
                            <ul>
                                <li class="btn-mfsj-list" data-index="0">
                                    <a href="javascript:void(0);" class="btn-mfsj" data-pg="2_3_7_7620">
                                        <i></i><span>免费设计</span>
                                    </a>
                                </li>
                                <li class="btn-zxbj-list" data-index="1">
                                    <a href="javascript:void(0);" class="btn-zxbj" data-pg="2_3_7_7622">
                                        <i></i><span>免费报价</span>
                                    </a>
                                </li>
                                <li class="btn-lhb-list" data-index="2">
                                    <a href="javascript:void(0);" class="btn-lhb" data-pg="2_3_7_7634">
                                        <div class="center-ico"><i></i></div>
                                        <span>装修礼包</span>
                                    </a>
                                </li>
                                <li class="btn-zxgs-list" data-index="3">
                                    <a href="javascript:void(0);" class="btn-zxgs" data-pg="2_3_7_7628">
                                        <i></i><span>装修公司</span>
                                    </a>
                                </li>
                                <li class="btn-zxfq-list" data-index="4">
                                    <a href="javascript:void(0);" class="btn-zxfq" data-pg="2_3_7_7632">
                                        <i></i><span>装修分期</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div class="tab-bottom-form-box">
                            <div class="mfsj-form-box result-box tab-bottom-form-con">
                                <div class="form-top-box">
                                    <span class="ico-mfsj-title"></span>
                                    <p class="title-text-mfsj title-text-box">110万合作设计师</p>
                                    <p class="title-text-one">合理空间布局，专业定制设计</p>
                                </div>
                                <mip-form id="mfsj_form" class="common-form" url="//to8tozb.to8to.com/zb/zb-index-get.php">
                                    <div class="mfsj-form tab-form-box">
                                        <div class="element-line area-box download-arrow1">
                                            <input type="text" id="city" class="common-city" placeholder="选择城市" readonly="">
                                        </div>
                                        <div class="element-line clearfix">
                                            <input type="tel" id="uphone" name="phone" class="common-phone" placeholder="请输入手机号" maxlength="11">
                                        </div>
                                        <input type="hidden" id="mfsj_pg" name="ptag" value="2_3_7_7619">
                                        <a href="javascript:void(0);" id="sub_mfsj" class="sub-mfsj-form" data-pg="">立即申请</a>
                                    </div>
                                </mip-form>
                            </div>
                            <div class="zxbj-form-box result-box tab-bottom-form-con">
                                <div class="form-top-box">
                                    <span class="ico-mfbj-title"></span>
                                    <p class="title-text-mfbj title-text-box">2600万真实业主数据</p>
                                    <p class="title-text-two">预知装修费用，不再花冤枉钱</p>
                                </div>
                                <mip-form action="" id="zxbj_form" url="//to8tozb.to8to.com/zb/zb.php">
                                    <div class="mfsj-form tab-form-box">
                                        <div class="element-line clearfix">
                                            <div class="area-box">
                                                <input type="text" id="newcity" class="common-city" placeholder="选择城市" readonly="">
                                            </div>
                                            <div class="fr">
                                                <input type="number" id="quare" name="quare" placeholder="面积">
                                                <span>㎡</span>
                                            </div>
                                        </div>
                                        <div class="element-line area-hx-box">
                                            <div class="yusuan-jishi download-arrow2" id="huxingInput_test">
                                                <em id="testshi">1</em>室
                                                <em id="testting">1</em>厅
                                                <em id="testwei">1</em>卫
                                                <em id="testyangtai">1</em>阳台
                                            </div>
                                        </div>
                                        <div class="element-line">
                                            <input type="tel" id="newphone" name="phone" placeholder="请输入手机，短信获取报价结果" maxlength="11">
                                            <input type="hidden" id="zxbj_pg" name="ptag" value="2_3_7_7621">
                                        </div>
                                        <a href="javascript:void(0);" id="sub_zxjb" class="sub-mfsj-form" data-pg="">免费获取报价</a>
                                        <input type="hidden" name="fang" id="secshi" value="1">
                                        <input type="hidden" name="ting" id="secting" value="1">
                                        <input type="hidden" name="wei" id="secwei" value="1">
                                        <input type="hidden" name="yangtai" id="secyangtai" value="1">
                                        <input type="hidden" name="chu" id="secchu" value="1">
                                    </div>'
                                </mip-form>
                            </div>
                            <div class="lhb-form-box result-box tab-bottom-form-con">
                                <div class="form-top-box">
                                    <span class="ico-lhb-title"></span>
                                    <p class="title-text-lhb title-text-box">土巴兔送你的¥3000</p>
                                    <p class="title-text-three">定制设计、专业量房、预算规划</p>
                                </div>
                                <mip-form action="" id="lhb_form" class="common-form" url="//to8tozb.to8to.com/zb/zb-index-get.php">
                                    <div class="mfsj-form tab-form-box">
                                        <div class="element-line area-box download-arrow1">
                                            <input type="text" id="lhbcity" class="common-city" placeholder="选择城市" readonly="">
                                        </div>
                                        <div class="element-line clearfix">
                                            <input type="tel" id="lhbphone" name="phone" class="common-phone" placeholder="请输入手机号" maxlength="11">
                                        </div>
                                        <input type="hidden" id="lhb_pg" name="ptag" value="2_3_7_7633">
                                        <a href="javascript:void(0);" id="sub_lhb" class="sub-mfsj-form" data-pg="">立即领取</a>
                                    </div>
                                </mip-form>
                            </div>
                            <div class="zxgs-form-box result-box tab-bottom-form-con">
                                <div class="form-top-box">
                                    <span class="ico-zxgs-title"></span>
                                    <p class="title-text-zxgs title-text-box">8万家合作装修公司</p>
                                    <p class="title-text-four">免费上门量房，货比三家，服务更满意</p>
                                </div>
                                <mip-form id="zxgs_form" class="common-form" url="//to8tozb.to8to.com/zb/zb-index-get.php">
                                    <div class="mfsj-form tab-form-box">
                                        <div class="element-line area-box download-arrow1">
                                            <input type="text" id="zxgscity" class="common-city" placeholder="选择城市" readonly="">
                                        </div>
                                        <div class="element-line clearfix">
                                            <input type="tel" id="zxgsphone" name="phone" class="common-phone" placeholder="请输入手机号" maxlength="11">
                                        </div>
                                        <input type="hidden" id="zxgs_pg" name="ptag" value="2_3_7_7627">
                                        <a href="javascript:void(0);" id="sub_zxgs" class="sub-mfsj-form" data-pg="">免费获取上门量房服务</a>
                                    </div>
                                </mip-form>
                            </div>
                            <div class="zxfq-form-box result-box tab-bottom-form-con">
                                <div class="form-top-box">
                                    <span class="ico-zxfq-title"></span>
                                    <p class="title-text-zxfq title-text-box">中行/建行 专业贷款服务</p>
                                    <p class="title-text-five">门槛超低，申请简单，审核快速</p>
                                </div>
                                <mip-form id="zxfq_form" class="common-form" url="//to8tozb.to8to.com/zb/zb-index-get.php">
                                    <div class="mfsj-form tab-form-box">
                                        <div class="element-line area-box download-arrow1">
                                            <input type="text" id="zxfqcity" class="common-city" placeholder="选择城市" readonly="">
                                        </div>
                                        <div class="element-line clearfix">
                                            <input type="tel" id="zzxfqphone" name="phone" class="common-phone" placeholder="请输入手机号" maxlength="11">
                                        </div>
                                        <input type="hidden" id="zxfq_pg" name="ptag" value="2_3_7_7631">
                                        <a href="javascript:void(0);" id="sub_zxfq" class="sub-mfsj-form" data-pg="">点击查看贷款额度</a>
                                    </div>
                                </mip-form>
                            </div>
                        </div>
                    </mip-fixed>`
