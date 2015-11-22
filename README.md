
## 搭建3D交互式网页简历
=====
这是我的3D网页简历 [fanlinfeng.xyz](http://fanlinfeng.xyz), 此网页在较新版本的chrome, safari, Firefox, opera中可以正常显示3D效果, 如果你喜欢, 可以修改里面的数据, 然后编译生成你自己的3D网页简历.
考虑性能问题, 移动端是另一套网页

###1. 下载, 配置环境
* 安装 [git](http://git-scm.com/download/)(如果已安装请跳过)

* 在终端中切换到想放置的文件夹, 使用```$ git clone git@github.com:flfwzgl/resume.git``` 下载此dev项目.  dev用于开发, www是最终编译到的目标文件夹.

* 安装 [nodejs](https://nodejs.org/en/)(如果已安装请跳过)

* 安装 gulp, 终端中输入```sudo npm install gulp -g```

* 安装 gulp插件, 终端中切换到上面下载的www目录, 使用```sudo npm install```

###2. 修改数据
在dev/data/data.jade中修改对应数据, 技能页在dev/data/skill.html 可以使用 ```<br>``` 或者是一些行内标签, 也可以用```p```增加段数, 页面会自适应, 如果想添加或删除面, 可以直接去dev/index.src.jade和dev/mobile/index.src.jade 添加删除 class为face的div, 然后在里面进行修改, 整个立方体会自动匹配角度.

###3. 编译生成目标文件上传
终端中输入```make``` 执行编译, 会在 ```dev```文件所处文件夹中生成一个```www```文件夹, 此 ```www```文件夹既是网站根目录, 上传即可.

###4. 协议
MIT