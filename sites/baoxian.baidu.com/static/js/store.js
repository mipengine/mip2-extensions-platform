/* eslint-disable */

/**
 * @file store.js
 * @author
 */

import Common from '@/common/common';

export default ({

    localStorage: {
        // 获取mip-session-id
        getMipSessionId () {
            let keys = Common.config.loginKey;
            return localStorage.getItem(keys) || '';
        }
    },
    session: {
        setOrder (id, data) {
            let _data = data || {};
            sessionStorage.setItem(id, JSON.stringify(_data));
        },
        getOrder (id) {
            let data = sessionStorage.getItem(id) || '{}';
            return JSON.parse(data);
        },
        removeOrder (id) {
            sessionStorage.removeItem(id);
        }
    }

})
