const { CustomElement, util } = MIP
const { css } = util

export default class MIPMhotComment extends CustomElement {
    build() {
        let goHome = this.element.querySelectorAll('.go-home')[0];   // 隐藏的分类盒子
        goHome.onclick = function() {
            location.href = './index.html';
        }
    }
}