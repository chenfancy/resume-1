
## 搭建3D交互式网页简历
=====
这是我的3D网页简历 [resume.fanlinfeng.xyz](http://resume.fanlinfeng.xyz), 此网页在较新版本的chrome, safari, Firefox, opera中可以正常显示3D效果, 如果你喜欢, 可以修改里面的数据, 然后编译生成你自己的3D网页简历.
考虑性能和兼容性问题, 移动端和不支持3D效果的浏览器是另一套网页

###1. 下载, 配置环境

* ```$ git clone git@github.com:flfwzgl/resume.git``` 下载.

* 安装 nodejs

* 安装 gulp

* 安装 gulp插件, ```sudo npm install```

###2. 修改数据
在dev/data/data.jade中修改对应数据, 技能页在dev/data/skill.html 可以使用 ```<br>``` 或者是一些行内标签, 也可以用```p```增加段数, 页面自适应, 如果想添加或删除面, 可以直接去dev/index.src.jade和dev/mobile/index.src.jade 添加删除 class为face的div, 然后在里面进行修改, 立方体会自动匹配大小角度. 

> 所有svg图形都是鄙人手动绘制, 如果要添加你们自己的需要自己绘制哦 %>_<%, 用 AI 绘制即可.
> 所有的位图都是使用的个人服务器, config.base, 如果想把图片保存在img文件夹, 需要设置config.jade中的base是''

###3. 编译生成目标文件上传
终端中输入```make``` 执行编译, 会在dev文件夹旁边生成```www```文件夹, 此 ```www```文件夹既是网站根目录, 上传即可.

###4. 协议
MIT