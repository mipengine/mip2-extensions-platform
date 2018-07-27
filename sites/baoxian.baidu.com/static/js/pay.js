/* eslint-disable */

import MtMessageBox from 'mint-ui/lib/message-box';
import Common from '@/common/common';
import Store from '@/static/js/store';
import Calculate from '@/static/js/calculate';

export default function () {
    let self = this;
    let itemId = Number(Common.getParamValue('itemId')) || '0';
    let orderData = Store.session.getOrder(itemId);
    if (!orderData.itemId) {
        MtMessageBox({
            title: ' ',
            message: Common.config.payError
        });
        return;
    }

    let urlsParam = Common.setUrlParam({
        applicationNoExt: orderData.applicationNoExt,
        spNo: orderData.spNo
    });
    // 检查是否存在session

    let feeYuan = Calculate.accDiv(orderData.insurOrderInfo.premium, 100);
    let config = {
        "subject":      orderData.itemSimpleName || Common.config.appName,
        "fee":          feeYuan,
        "sessionId":    Store.localStorage.getMipSessionId(),
        "redirectUrl":  Common.router.payResult + '?' + urlsParam,
        "endpoint": {
            "alipay":   Common.api.alipay,
            "weixin":   Common.api.weixin,
            "baifubao": Common.api.baifubao
        },
        "postData":{
            "orderNoExt": orderData.orderNoExt,
            "spNo": orderData.spNo,
            "redirectUrl": Common.api.redirectPay + '/' + orderData.applicationNoExt + '/' + orderData.spNo
        }
    };
    MIP.setData({
        payConfig: Common.mipExtendData(self.payConfig, config)
    });
    console.log('支付提交的数据', Common.mipExtendData(self.payConfig, config));

    self.$emit('handlePay', {});

};