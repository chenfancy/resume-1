
## 搭建3D交互式网页简历
=====
这是我的3D网页简历 [resume.fanlinfeng.com](http://resume.fanlinfeng.com), 此网页在较新版本的chrome, safari, Firefox, opera中可以正常显示3D效果, 考虑性能和兼容性问题, 移动端和不支持3D效果的浏览器(IE8和国内部分浏览器)是另一套网页


此网页简历之前使用es5编写, 并未做模块化开发, 结构混乱, 不便于管理. 之后使用了 ES6 对之前代码进行重构, 划分多个模块, 降低耦合. 由于页面单一, 模块较少, 为了方便使用 Browserify 进行打包, 使用 Gulp 进行构建. 构建过程会读取data文件中的变量, 有大篇幅文字的地方单独抽离出来放在 markdown 文件中.

此网页简历代码部分未引入任何第三方框架或库, 均是原生 js 写成. 动画部分主要是 css3 动画和我自己的[move.js](https://github.com/flfwzgl/move)实现.

###4. 协议
MIT