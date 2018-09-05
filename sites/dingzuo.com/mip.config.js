/**
 * @file mip页面项目配置项
 * @author
 */

module.exports = {
  dev: {
    /**
     * 启动mip server调试的端口号
     *
     * @type {number}
     */
    port: 8111,
<<<<<<< HEAD
=======

>>>>>>> b72e51fd71c800b142cb8aa28e0e046f06f2d31e
    /**
     * 启用调试页面自动刷新
     *
     * @type {boolean}
     */
    livereload: true,
<<<<<<< HEAD
    // asset:"http://xiongzhang.kebide.com",
    /**
     * server 启动自动打开页面，false 为关闭
     *
     * @type {string|boolean}
     */
    autoopen: '/example/index.html'
  },
  build:{
    asset:"http://mip.kebide.com",
    clean:true
=======

    /**
     * server 启动自动打开页面，false 为关闭
     * 如:
     * autoopen: '/example/index.html'
     *
     * @type {string|boolean}
     */
    autoopen: false
>>>>>>> b72e51fd71c800b142cb8aa28e0e046f06f2d31e
  }
}
