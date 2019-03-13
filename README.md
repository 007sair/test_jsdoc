# Test JSDoc3

## 开发

```bash
# 安装
$ npm install 

# 启动
$ gulp
```

启动 `gulp` 命令后：

- 根据 jsdoc 规则生成文档
- 生成的文档存放到 docs 目录，通过 gulp 命令可本地访问
- 修改 js 中的注释可实时预览文档网站

## 文档

### 命令行

| 参数  | 全称   | 说明  |
|------|--------|------|
| `-c`  |  `--configure`  | 引入配置项，默认为 jsdoc 安装目录的 `config.json` 文件  |
| `-d`  |  `--destination` |	配置文档输出的目录，默认为 `./out`  |
| `-P`  |  `--package` |	可以将 `package.json` 文件写入文档中，默认写入当前路径的第一个 `package.json`  |
| `-r`  |  `--recurse` |	递归调用路径的子目录查找 js 文件，当生成一个文件夹下的全部 js 的文档时必须使用这个参数  |
| `-R`  |  `--readme`  |	可以引入一个说明文件，默认将当前路径中的第一个 `readme.md` 文件添加到文档中  |
| `-t`  |  `--template` |	可以给文档指定一个第三方的模板  |

**举个例子**，比如我们要将 `./src` 路径下的所有 js 文件生成文档，然后存放在 `./docs` 文件夹中，操作如下：

```bash
# 使用 jsdoc 命令，以递归查找 src 目录的方式将文档生成到 docs 目录
jsdoc src -r -d docs
```

### 规则

- JSDOC 的解析器要求注释必须以 `/**` 开头，如果是以 `/*` 、 `/***` 或多于三个星号的注释都会被忽略。

### `jsdoc`项目配置说明

```js
{
    "tags": {
        "allowUnknownTags": false // 表示允许使用为定义的 tag 标签，不然使用未知标签会报错；
    },
    // 表示传递给 JSDOC 的文件
    "source": {
        "include": ["modules/", "package.json", "README.md"], // 表示 JSDOC 需要扫描哪些文件
        "exclude": ["src/libs"], // 表示 JSDOC 需要排除哪些文件
        "includePattern": ".server.controller.js$", // 设置为哪些文件生成doc
        "excludePattern": "(node_modules/|docs)" // 不包含哪些文件/文件夹
    },
    // 使用的插件集合
    "plugins": [
        "plugins/markdown",
        "plugins/summarize"
    ],
    "opts": {
        "template": "node_modules/docdash/", // 设置模板位置
        "encoding": "utf8", // 输出文件的编码格式
        "destination": "docs/", // 输出文档目录
        // 是否递归解析文件夹，如果设置成true，则则JSDoc将搜索10级深度的文件，
        // 如果想要更改搜索深度，在json根节点添加recurseDepth属性并设置一个数字类型的值来声明搜索深度
        "recurse": true,
        "verbose": true // 是否将编译的详细信息输出到控制台
    },
    "templates": {
        // 如果testlink是一个URL，那么{@link testlink}将以普通字体呈现，否则就是等宽字体
        "cleverLinks": false,
        // 链接的字体是否是等款字体，如果cleverLinks设置成true，那么monospaceLinks的值将被忽略
        "monospaceLinks": false
    }
}
```

### 标签说明

|标签 |	说明  |
|---- | ----- |
| `@alias` |	同名引用，用于指定一个同名属性或在非显示的情况下标明从属关系，详见下节 |
| `@author` |	说明这篇代码谁写的，方便出 bug 的时候削人 |
| `@class` `@constructor` |	标记一个函数为构造函数，可以使用 new 来实例化 |
| `@constant` `@const` |	将一个变量标记为常量 |
| `@description` `@desc` |	进行描述，一般会把注释开头的文字默认作为描述 |
| `@enum` |	标注一个对象为枚举对象 |
| `@example` |	可以给文档提供一个如何使用的例子 |
| `@file` `@fileoverview` `@overview` |	表示对一个文件的描述 |
| `@global` |	标记一个全局变量 |
| `@param` |	标记一个函数的参数 |
| `@returns` `@return` |	标记一个函数的返回值 |
| `@this` |	标注一个 this 关键字的指向 |

### 命名路径

例如：

```js
/**
 * @author Scarlex
 * @class
 * @name Application
 * @description Base Class of Application.
 * @param {Element} canvas The canvas dom element.
 * @param {Object} options The options of Application. See {@link Option} for detail.
 * @return {Application}
 *
 * @example
 * // create your application
 * new Application(canvas, options);
 */
export default class Aplication {

  /**
   * @private
   * @function
   * @name Application#intialize
   * @description Initialize the application.
   */
  initialize() {

  }
}
```

上面例子中是用 `Application#initialize` 来表示一个实例方法的。如果是静态方法，那应该怎么表示呢？JSDOC 有自己的解析规则：

- `Constructor.Method` 表示静态方法
- `Constructor#Method` 表示实例方法
- `Constructor~Method` 表示内部方法

### 参考

- [官方文档](http://usejsdoc.org/about-configuring-jsdoc.html)
- [JSDoc 配置使用概览](https://malcolmyu.github.io/malnote/2015/04/25/Introduction-of-Jsdoc/)
