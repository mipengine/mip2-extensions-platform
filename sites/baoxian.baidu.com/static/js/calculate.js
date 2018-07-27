/**
 * 浮点数计算
 *
 */

let Calculation = {
    /**
     * 加法
     *
     * @param {number} num1 加数
     * @param {number} num2 加数
     * @return {number} 和
     */
    accAdd: function (num1, num2) {
        var r1, r2, m;
        try {
            r1 = num1.toString().split('.')[1].length;
        }
        catch (e) {
            r1 = 0;
        }
        try {
            r2 = num2.toString().split('.')[1].length;
        }
        catch (e) {
            r2 = 0;
        }
        m = Math.pow(10, Math.max(r1, r2));
        return Math.round(this.accMul(num1, m) + this.accMul(num2, m)) / m;
    },
    /**
     * 减法
     *
     * @param {number} num1 被减数
     * @param {number} num2 减数
     * @return {number} 差
     */
    accSub: function (num1, num2) {
        var r1, r2, m;
        try {
            r1 = num1.toString().split('.')[1].length;
        }
        catch (e) {
            r1 = 0;
        }
        try {
            r2 = num2.toString().split('.')[1].length;
        }
        catch (e) {
            r2 = 0;
        }
        m = Math.pow(10, Math.max(r1, r2));
        var n = (r1 >= r2) ? r1 : r2;
        return (Math.round(this.accMul(num1, m) - this.accMul(num2, m)) / m).toFixed(n);
    },
    /**
     * 除法
     *
     * @param {number} num1 被除数
     * @param {number} num2 除数
     * @return {number} 商
     */
    accDiv: function (num1, num2) {
        var t1, t2, r1, r2;
        try {
            t1 = num1.toString().split('.')[1].length;
        }
        catch (e) {
            t1 = 0;
        }
        try {
            t2 = num2.toString().split('.')[1].length;
        }
        catch (e) {
            t2 = 0;
        }
        r1 = Number(num1.toString().replace('.', ''));
        r2 = Number(num2.toString().replace('.', ''));
        return this.accMul((r1 / r2), Math.pow(10, t2 - t1));
    },
    /**
     * 乘法
     *
     * @param {number} num1 乘数
     * @param {number} num2 乘数
     * @return {number} 积
     */
    accMul: function (num1, num2) {
        var m = 0,
            s1 = num1.toString(),
            s2 = num2.toString();
        try {
            m += s1.split('.')[1].length;
        }
        catch (e) {

        }
        try {
            m += s2.split('.')[1].length;
        }
        catch (e) {

        }
        return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m);
    },
    /**
     * 截断
     *
     * @param {number} num1 输入
     * @param {number} num2 截断为几位
     * @return {string} 结果
     */
    accTrunc: function (num1, num2) {
        num2 = num2 || 2;
        var temp = Math.pow(10, num2);
        return this.accDiv(
            Number(
                this.accMul(
                    Number(num1),
                    temp
                ).toString().replace(/\.(\d+)/g, '')
            ),
            temp || 1
        ).toFixed(num2);
    }
};

export default Calculation;