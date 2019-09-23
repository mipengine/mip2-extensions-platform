### 使用mip2 命令行工具进行mip开发 [参考文档](https://www.mipengine.org/v2/contribute/getting-start/mip-cli-usage.html)

#### mip2 add 新增一个组件
在项目根目录运行 mip2 add 命令，即可快速添加一个新组件

<pre>
# 快速添加名为 mip-new 的组件
$ mip2 add mip-hello-world

# 可选参数 使用 -f 或 --force 参数强制覆盖同名组件
$ mip2 add mip-hello-world -f
</pre>

#### mip2 dev 启动调试服务器
开发好的 MIP 组件需要经过编译之后才可以正常使用。命令行工具内置了编译器和简单的调试服务器，方便开发者调试组件和页面。在项目根目录运行：
<pre>
$ mip2 dev
</pre>

#### mip2 build 构建组件
自定义组件开发完成后，可以使用 mip2 build 命令将组件代码打包成为对应的 mip-组件名.js 文件，供发布使用。

在项目根目录运行
<pre>
$ mip2 build
</pre>

### 提交组件[参考文档](https://www.mipengine.org/v2/contribute/getting-start/contribute-with-mip-platform.html)

#### 1、提交的代码包应该包括整个站点文件夹
以目前的文件结构为例
```$xslt
├──mip-to8to
    ├───.git
    ├───.idea
    ├───common
    |── components
    │   ├── mip-example
    │   ├── mip-tubatu-quickapp
    │   └── mip-tubatu-tender
    |── dist
    |── example
    |── node_modules
    |── .editorconfig
    |── .eslintrc
    |── .gitignore
    |── mip.config.js
    |── package.json
    |── package-lock.json
    └── README.md
```
上传代码时需要将以下文件压缩成zip, 在[MIP组件审核平台](https://www.mipengine.org/platform/mip#/extensions)中上传zip包
```$xslt
├──mip-to8to
    ├───common
    |── components
    │   ├── mip-example
    │   ├── mip-tubatu-quickapp
    │   └── mip-tubatu-tender
    |── example
    |── static
    |── .editorconfig
    |── .eslintignore
    |── .eslintrc
    |── .gitignore
    |── mip.config.js
    |── package.json
    |── package-lock.json
    └── README.md
```
