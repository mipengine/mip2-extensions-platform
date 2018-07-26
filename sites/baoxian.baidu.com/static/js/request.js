/**
 * @file 工具方法
 */

import axios from 'axios';
import MtToast from 'mint-ui/lib/toast';
import Common from '@/common/common';

export default function request (opts) {
    let defaultParams = {
        method: 'get',
        timeout: 30 * 1000,
        dataType: 'json',
        cache: false
    };
    let defaultData = {
        from: '15' // 熊掌号
    };
    let params = Object.assign({}, defaultParams, opts);
    let key = params.method === 'get' ? 'params' : 'data';
    let data = {[key]: Object.assign({}, defaultData, opts.data)};

    axios({...params, ...data})
        .then(function (response) {
            let data = response.data;
            if ((Number(data.resultCode) === 0)) {
                if (opts.successCallback) {
                    opts.successCallback(data);
                }
            } else {
                // 如果errorCallback返回true，则使用自定义错误处理
                if (opts.errorCallback && opts.errorCallback(data)) {
                    return;
                }

                if (params.method === 'post') {
                    /* eslint-disable */
                    MtToast(Common.config.systemError);
                    /* eslint-disable */
                } else {
                    // GET 跳至错误页
                    Common.replace(Common.router.error + '?type=sys&url=' + encodeURIComponent(location.href));
                }
            }
        })
        .catch(function (error) {
            if (params.method === 'post') {
                /* eslint-disable */
                MtToast(Common.config.networkError);
                /* eslint-disable */
            } else {
                Common.replace(Common.router.error + '?url=' + encodeURIComponent(location.href));
            }

            if (opts.errorCallback) {
                opts.errorCallback(error);
            }
        })
        .then(function (e) {
            // always executed
            if (opts.completeCallback) {
                opts.completeCallback(e);
            }
        });
}
