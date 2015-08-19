
## 搭建3D交互式网页简历
=====
这是我的3D网页简历 [fanlinfeng.xyz](http://fanlinfeng.xyz), 此网页在较新版本的chrome, safari, Firefox, opera中可以正常显示3D效果, 如果你喜欢, 可以修改里面的数据, 然后编译生成你自己的3D网页简历.
考虑性能问题, 移动端是另一套网页

###1. 下载, 配置环境,
```$ git clone git@github.com:flfwzgl/resume.git``` 下载此项目, 将下载的resume文件夹重命名为dev.

```$ git clone -b gh-pages git@github.com:flfwzgl/resume.git```下载目标文件夹, 将下载的resume文件夹重命名为www

dev用于开发, www是最终编译到的目标文件夹.
安装nodejs, 然后安装gulp, ```$ sudo npm install gulp -g``` 安装gulp.

###2. 修改数据
在dev/data/data.json中修改对应数据, 可以使用 ```<br>``` 或者是一些行内标签, 也可以用```p```增加段数, 页面会自适应, 如果想添加或删除面, 可以直接去dev/index.src.html和dev/mobile/index.src.jade 添加删除 class为face的div, 然后在里面进行修改, 整个立方体会自动匹配角度.
图片没有进行编译, 因此修改图片的位置在 www/img

###3. 编译生成目标文件上传
在终端中切换到dev文件夹中, 执行```gulp ``` 即可开始编译, 此过程会将dev中的less进行编译压缩, 还会将src.jade模板文件通过读取data/var.jade中的数据进行数据替换, 编译完成之后只需将 www 文件夹中上传到服务器中即可.

###4. 协议
MIT