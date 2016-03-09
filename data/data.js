var fs = require('fs');
var path = require('path');
var markdown = require('marked');


function getstr(fileDir, md) {
	var str = fs.readFileSync(fileDir, 'utf-8').toString();
	if(md) return markdown(str);
	else return str;
}


module.exports = {
	bgUrl: 'img/bg.jpg',
	// bgUrl: 'http://imgstore.cdn.sogou.com/app/a/100540002/816020.jpg',
	name: '范林峰',
	phone: 18565720532,
	qq: '583187400',
	email: 'flfwzgl@qq.com',
	github: 'https://github.com/flfwzgl',
	lofter: 'http://flfwzgl.lofter.com',
	location: 'Shenzhen',
	weixin: 'flfwzgl',

	skill_des: getstr('./data/skill.md', true),

	skill_chart: {
		html: 70,
		css: 80,
		js: 80,
		jquery: 70,
		nodejs: 50,
		d3: 30,
		php: 50,
		mysql: 50,
		ps: 90,
		maya: 80
	},

	project: [/*{
		title: 'sczql',
		name: '环游网',
		des: '四川中青旅旗下一个网站, 此项目是初学时做的练习, 所以存在很多问题',
		href: 'http://www.sczql.cn'
	}, */{
		title: 'move',
		name: 'move',
		des: '一个js动画库, 包含几种常用的动画, 只要css属性中含有数字的均可用此实现过渡动画.',
		href: 'https://github.com/flfwzgl/move'
	}, /*{
		title: 'select',
		name: 'select',
		des: '一个超轻量且兼容到 <font color="#fbb">IE6</font> 的DOM选择器',
		href: 'https://github.com/flfwzgl/select'
	}, */{
		title: 'f',
		name: 'f.js',
		des: '一个功能仿jquery的库, 体积小, 加入了常用的jquery功能, 内部选择器是select',
		href: 'https://github.com/flfwzgl/f'
	}, {
		title: 'cal',
		name: 'calender',
		des: '一个轻量方便好用的日历组件',
		href: 'http://flfwzgl.github.io/calendar/'
	}, {
		title: 'vue-cnode',
		name: 'vue-cnode',
		des: '使用vue,webpack,ES6编写的h5 webapp, cnode社区提供后台API',
		href: 'https://github.com/flfwzgl/vue-cnode'
	}],

	info: [{
		title: '英语能力',
		content: 'CET-6'
	}, {
		title: '教育经历',
		content: '<b>毕业院校: </b>成都信息工程大学<br> <b>专业: </b>电子科学与技术<br><b>学历: </b>本科'
	}, {
		title: '获奖经历',
		content: '获学校Ps大赛三等奖<br>高中物理竞赛四川省三等奖'
	}, {
		title: '关于我',
		content: getstr('./data/about.md', true)
	}]

}








