# mip2-extensions-platform

> 站长组件是扩展 MIP 功能的一种形式，在开发提交站长组件之前，请首先阅读[《请优先使用 MIP 现有机制和官方组件来实现业务功能》](https://www.mipengine.org/v2/contribute/getting-start/how-to-contribute.html)一文，看看所需要开发的站长组件是否已被 MIP 现有的机制和官方组件覆盖了，能够覆盖到的功能请勿重复开发相应的站长组件，减少开发和审核的时间成本。

## MIP 2 站长组件

与 MIP 1.0 采用的方式不同，MIP 2.0 以项目（一个站点）的粒度来管理站长组件。每一个项目（使用 `mip2 init` 命令生成）中包含了这个站点所需的所有自定义组件。

MIP 2.0 的站长组件托管在 [Github 站长组件仓库](https://github.com/mipengine/mip2-extensions-platform)，项目结构如下：

```
├──sites
    ├── test.a.com
    │   ├── common
    │   ├── components
    │   ├── example
    │   ├── mip.config.js
    │   ├── node_modules
    │   ├── package-lock.json
    │   ├── package.json
    │   └── static
    └── test.b.com
        ├── common
        ├── components
        ├── example
        ├── mip.config.js
        ├── package-lock.json
        ├── package.json
        └── static
├── LICENSE
└── README.md

```

`sites` 目录即是站点项目的集合。示例中已经托管了 `test.a.com` 和 `test.b.com` 两个站点的自定义组件。站长各自在其 `components` 目录下[编写组件](https://github.com/mipengine/mip2/blob/master/docs/contribute/development/component-syntax.md)。

本地需求实现并测试无误后，通过 `Pull Request` 的方式（暂时方案）提交审核，官方通过审核后会定期编译上线。

供站点使用的最终发布地址为：

```bash
https://c.mipcdn.com/extensions/platform/v2/{站点项目名}/{组件名}/{组件名}.js

# 例如 test.a.com 下的 mip-example 组件

https://c.mipcdn.com/extensions/platform/v2/test.a.com/mip-example/mip-example.js
```

## 站长组件开发、提交流程

1.**fork 官方组件仓库**

在 Github fork `https://github.com/mipengine/mip2-extensions-platform` 仓库，并 `clone` 到本地。

2.**开发**

进入仓库目录，先安装依赖，这一步将在本地安装 `eslint` 等工具辅助检查代码规范。不符合规范的组件将无法提交合入。

```
$ npm install
```

进入 `sites` 目录，如果是第一次提交一个站点的组件，运行命令

```
$ mip2 init
```

按照提示输入项目名称，如 `cafe.com`，新增一个站点项目。

```
$ cd cafe.com
```
切换到站点项目目录即可快速进行组件开发工作了：

- [组件开发](https://github.com/mipengine/mip2/blob/master/docs/contribute/development/component-syntax.md)
- [调试](https://github.com/mipengine/mip2/blob/master/docs/contribute/debug/mip-dev.md)
- [校验](https://www.mipengine.org/v2/contribute/getting-start/mip-cli-usage.html#mip2-validate-%E7%BB%84%E4%BB%B6%E5%92%8C%E9%A1%B5%E9%9D%A2%E6%A0%A1%E9%AA%8C)


3.**发起 Pull Request**

开发完成后，[发起 pull Request](https://help.github.com/articles/creating-a-pull-request-from-a-fork/)

4.**官方审核通过，合入上线**

官方审核通过后，代码将合入 `master` 分支并上线。若不通过，请根据反馈修改后再次提交。

5.**调用组件脚本**

```
// 页面中引用
<script src="https://c.mipcdn.com/extensions/platform/v2/{站点项目名}/{组件名}/{组件名}.js"></script>

# 例如 test.a.com 下的 mip-example 组件

<script src="https://c.mipcdn.com/extensions/platform/v2/test.a.com/mip-example/mip-example.js"></script>
```

