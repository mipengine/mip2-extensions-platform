# jkx-web-mip

#### 项目介绍
百度mip

#### 软件架构
软件架构说明


#### 安装教程

安装依赖

 npm install
执行编译

组件编译集成了 mip-extension-optimizer 工具，并通过 npm script 命令提供出来，如：

 npm run build
指定参数

如果需要指定编译参数（参数使用与 mip-extension-optimizer 一致），以 -- 分割，如指定输出目录和需编译的个别组件：

 npm run build -- -o output mip-form mip-access

#### 使用说明

使用该仓库下的组件前，需在页面中引入组件对应脚本。
 https://127.0.0.1：8111/{组件名}/{组件名}.js
示例

 <script src="http://127.0.0.1:8111/mip-order-fixed/mip-order-fixed.js"></script>

参考文件：https://mip-project.github.io/mip/cli/start-writing-first-mip.html

#### 码云特技

1. 使用 Readme\_XXX.md 来支持不同的语言，例如 Readme\_en.md, Readme\_zh.md
2. 码云官方博客 [blog.gitee.com](https://blog.gitee.com)
3. 你可以 [https://gitee.com/explore](https://gitee.com/explore) 这个地址来了解码云上的优秀开源项目
4. [GVP](https://gitee.com/gvp) 全称是码云最有价值开源项目，是码云综合评定出的优秀开源项目
5. 码云官方提供的使用手册 [http://git.mydoc.io/](http://git.mydoc.io/)
6. 码云封面人物是一档用来展示码云会员风采的栏目 [https://gitee.com/gitee-stars/](https://gitee.com/gitee-stars/)