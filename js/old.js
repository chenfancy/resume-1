/*针对于不支持3d的浏览器*/

/* move.js
 * @author:flfwzgl https://github.com/flfwzgl
 * @copyright: MIT license */
var move = {
	css: function(obj, attr){
		if( typeof attr === "string" ){
			return obj.currentStyle ?obj.currentStyle[attr] : window.getComputedStyle(obj, false)[attr];
		}
		else if( typeof attr === "object" ){
			var a;
			for(a in attr){
				switch(a){
					case "width":
					case "height":
					case "left":
					case "top":
					case "right":
					case "padding":
					case "paddingLeft":
					case "paddingRight":
					case "paddingTop":
					case "paddingBottom":
					case "margin":
					case "marginLeft":
					case "marginRight":
					case "marginTop":
					case "marginBottom":
					case "borderRadius":
					case "borderWidth":
						if( typeof attr[a] === "number" )	obj.style[a] = attr[a] + 'px';
						else	obj.style[a] = attr[a];
						break;
					case "opacity":
						if( +attr[a] < 0 ) attr[a] = 0;
						obj.style.filter = "alpha(opacity="+ attr[a]*100 +")";
						obj.style.opacity = attr[a];
						break;
					default:
						obj.style[a] = attr[a];
				}
			}
		}
	},
	//初始化
	init: function(obj, json, time){
		if( !obj.ani ){
			obj.ani = {};				  	//动画对象
			obj.ani.s0 = {},				//当前值
			obj.ani.st = {},				//目标值
			obj.ani.dis = {},				//目标值和起始值距离			
			obj.ani.va = {},				//平均速度
			obj.ani.v = {},					//初始速度,当前速度
			obj.ani.a = {},					//加速度
			obj.ani.d = {},					//t时间段内的位移
			obj.ani.res = {};				//此刻的结果
		}
		obj.aniOver = false;
		obj.ani.time = time || 500;
		obj.ani.interval = 13;
		obj.ani.total = Math.ceil( obj.ani.time/obj.ani.interval );		//定时器总次数
		obj.ani.t = 0;			//当前次数


		//如果第一次动画还没结束第二次就开始了, 就将第二次的json属性传入obj.ani.st(第一次的还在)
		//并且上一次动画的目标值不受影响
		var attr;
		for( attr in json) obj.ani.st[attr] = parseFloat(json[attr], 10);
		for( attr in obj.ani.st ){
			obj.ani.s0[attr] = parseFloat(move.css(obj, attr), 10);
		//	obj.ani.st[attr] = obj.ani.st[attr];
			obj.ani.dis[attr] = obj.ani.st[attr] - obj.ani.s0[attr];
			obj.ani.va[attr] = obj.ani.dis[attr]/obj.ani.total;
			obj.ani.d[attr] = 0;
		}
	},
	//ease-in-out 先加速,后减速
	ease: function(obj, json, time, fn){
		if( obj.aniOver === false ) clearInterval(obj.ani.timer);
		this.init(obj, json, time);

		var attr, This = this;

		//因为每一种动画的初始速度, 最大速度, 加速度不同, 所以这三个单独设置
		for( attr in obj.ani.st ){
			obj.ani.v[attr] = 0.5*obj.ani.va[attr];
			//假设最大速度是3倍平均速度,初速度是0.5倍, 因此是3-0.5
			obj.ani.a[attr] = (3-0.5)*obj.ani.va[attr]/(0.5*obj.ani.total);
		}
		obj.ani.timer = setInterval(function(){
			obj.ani.t++;
			for( attr in obj.ani.st ){
				if( Math.abs(obj.ani.d[attr]) < Math.abs(obj.ani.dis[attr]/2) ){
					obj.ani.v[attr] += obj.ani.a[attr];
					obj.ani.d[attr] += obj.ani.v[attr];
				}
				else if( Math.abs(obj.ani.d[attr])>=Math.abs(obj.ani.dis[attr]/2) && Math.abs(obj.ani.d[attr])<=Math.abs(obj.ani.dis[attr]) ){
					obj.ani.v[attr] -= obj.ani.a[attr];
					obj.ani.d[attr] += obj.ani.v[attr];
				}
				obj.ani.res[attr] = obj.ani.s0[attr] + obj.ani.d[attr];
				if( (obj.ani.v[attr] > 0 && obj.ani.res[attr] > obj.ani.st[attr]) || (obj.ani.v[attr] < 0 && obj.ani.res[attr] < obj.ani.st[attr]) ) obj.ani.res[attr] = obj.ani.st[attr];
				if( obj.ani.t > obj.ani.total ){
					clearInterval(obj.ani.timer);
					obj.aniOver = true;
					break;
				} 
			}
			move.css(obj, obj.ani.res);
			if( obj.aniOver && fn ) fn.call(obj);
		}, obj.ani.interval);
	},
	
	//缓冲动画, 初速度较大,一直减速
	easeOut: function(obj, json, time, fn){
		if( obj.aniOver === false ) clearInterval(obj.ani.timer);
		this.init(obj, json, time);

		var attr, This = this;
		//因为每一种动画的初始速度, 最大速度, 加速度不同, 所以这三个单独设置
		for( attr in obj.ani.st ){
			obj.ani.v[attr] = 5*obj.ani.va[attr];
			obj.ani.a[attr] = -6*obj.ani.va[attr]/(0.5*obj.ani.total);
		}
		obj.ani.timer = setInterval(function(){
			obj.ani.t++;
			for( attr in obj.ani.st ){
				obj.ani.v[attr] += obj.ani.a[attr];
				obj.ani.d[attr] += obj.ani.v[attr];
				obj.ani.res[attr] = obj.ani.s0[attr] + obj.ani.d[attr];
				if( (obj.ani.v[attr] > 0 && obj.ani.res[attr] > obj.ani.st[attr]) || (obj.ani.v[attr] < 0 && obj.ani.res[attr] < obj.ani.st[attr]) ){
					for( attr in obj.ani.res )	obj.ani.res[attr] = obj.ani.st[attr];
					clearInterval(obj.ani.timer);
					obj.aniOver = true;
					break;
				}
			}
			move.css(obj, obj.ani.res);
			if( obj.aniOver && fn ) fn.call(obj);
		}, obj.ani.interval);
	}
};







(function(){
	var cube = fn.id("cube"),
		face = fn.filter(cube.childNodes, function(i, e){ return e.nodeType === 1 ? true : false; }),
		nav = fn.id("nav"),
		navLi = fn.tag("li", nav);

	var n = face.length, i=0;

	cube.cur = 0;
	cube.time = 1.5;

	if( !browser.old_ie ){
		cube.style.webkitTransitionDuration = cube.time+"s";
		cube.style.transitionDuration = cube.time+"s";		
	}

	

	nav.innerHTML = (function(){
		for(var i=0, temp=''; i<n; i++) temp+='<li></li>';
		return temp;
	})();

	
	adjust();

	for(i=0; i<n; i++){
		navLi[i].index = i;
		fn.bind(navLi[i], "click", function(){
			changePage(cube.cur = this.index);
		});
	}

	
	fn.bind(cube, "mousewheel", wheel)
		.bind(document, "keydown", wheel)
		.bind(window, 'resize', function(){
			adjust();
		});

	function wheel(e){
		e = e||window.event;
		var delta;
		if(e.detail) delta=e.detail;
		else if(e.wheelDelta) delta=e.wheelDelta/-40;
		else if(e.keyCode){
			if(e.keyCode===37||e.keyCode===38 ) delta=-3;
			else if(e.keyCode===39||e.keyCode===40) delta=3;
		} 

		if(cube.running === true) return;	//防止滑轮滚动的时候乱窜
		cube.running = true;
		setTimeout(function(){
			cube.running = false;
		}, cube.time*1000);

		if(delta>0) changePage(++cube.cur);
		else if(delta<0) changePage(--cube.cur);
	}

	function changePage(page){
		cube.cur = page = page<0 ? (page%n+n) : page%n;
		if(browser.old_ie) move.easeOut(cube, {left: page*-cube.width}, cube.time*1000);
		else{
			cube.style.webkitTransform = "translate3d("+page*-cube.width+"px, 0, 0)";
			cube.style.transform = "translate3d("+page*-cube.width+"px, 0, 0)";
		}
		

		for(i=0; i<n; i++) navLi[i].className = i===page ? 'active' : '';	
	}

	function adjust(){
		cube.width = document.body.clientWidth || document.documentElement.clientWidth;
		cube.height = document.body.clientHeight || document.documentElement.clientHeight;

		nav.style.cssText = "left:"+(cube.width-nav.offsetWidth)/2+"px; top:"+(cube.height-20)+"px";
		navLi[cube.cur].className = "active";

		if(browser.old_ie) move.easeOut(cube, {left: cube.cur*-cube.width}, cube.time*1000);
		else{
			cube.style.webkitTransform = "translate3d("+cube.cur*-cube.width+"px, 0, 0)";
			cube.style.transform = "translate3d("+cube.cur*-cube.width+"px, 0, 0)";
		}

		
	}

})();


(function(){
	//技能页
	var skill_chart = fn.cls('skill_chart')[0],
		I = fn.tag('i', skill_chart),
		skill_icon = fn.filter(I, function(i, e){ return e.parentNode.nodeName==="LI" ? true : false; }),
		skill_score = fn.filter(I, function(i, e){ return e.parentNode.nodeName==="DIV" ? true : false; });

	for(var i=0, m=skill_icon.length; i<m; i++){
		skill_icon[i].style.backgroundPosition = "0px "+ i*-40 +"px";
		skill_score[i].style.width = +fn.get(skill_icon[i], 'k').split('-')[1] + "%";
	}
})();


(function(){
		//3d作品展示
		var w_ul = fn.cls('w_ul', 'ul')[0],
			w_li = fn.tag('li', w_ul),
			w_img = fn.tag('img', w_ul);

		var show = fn.id('show'),
			showImg = fn.tag('img', show),
			temp = '';

		var url = ['img/work/watch/(frame|viewport|comp).jpg', 
								'img/work/einstein/(frame|rim|comp).jpg', 
								'img/work/ironman/(frame|occ|comp).jpg',
								'img/work/snail/(frame|occ|comp).jpg',
								'img/work/policeman/(frame|comp).jpg',
								'img/work/tiger/comp.jpg',
								'img/work/bmw/comp.jpg'
							];

		var allUrl = (function(){
			for(var i = 0, m = url.length, res = []; i < m; i++){
				res.push( extendUrl(url[i]).split('|') );
			}
			return res;
		})();
		var coverUrl = (function(){
			for(var i = 0, m = allUrl.length, res = [], temp; i < m; i++){
				temp = allUrl[i].length - 1;
				res.push( allUrl[i][temp] );
			}
			return res;
		})();

		
		fn.bind(w_ul, 'mousewheel', cancelBubble)
			.bind(w_ul, 'DOMMouseScroll', cancelBubble)
			.bind(w_ul, 'click', function(e){
				var o = e.target
				if( o.tagName === "IMG" ){
					//将n得到, n代表第几个加载完成,从0开始, i代表在url中位于第几个
					var num = +fn.get(o, 'n');
					show.style.display = 'block';
					show.scrollTop = fn.position(showImg[num]).top-30;	
				}
			})
			.bind(show, 'mousemove', function(e){
				var o = e.target;
				if(o.tagName === 'IMG'){
					e = e || window.event;
					var index = +fn.get(o, 'i');
					var n = Math.floor( (e.clientX - fn.position(o).left)*allUrl[index].length/o.offsetWidth );
					n = Math.max(0, Math.min(allUrl[index].length-1, n));
					o.src = allUrl[index][n];
				}
			})
			.bind(show, 'click', function(e){
				if(this === e.target) show.style.display = 'none';
			});

		//先加载外面显示的图片,,等全部加载完成之后才加载其他图片
		fn.img(coverUrl, function(over){
			//如果是前几张就按照顺序排列, 第二行就按照哪个短排列哪个
			w_li[shortIndex(w_li)].innerHTML += "<i><img n="+this.serial+" i="+this.index+" src='"+ this.src +"'/></i>";
			show.innerHTML += "<i><img n="+this.serial+" i="+this.index+" src='"+ this.src +"'/></i>";

			if(over) fn.img([].concat.apply([], allUrl));
		});

		// fn.each(url, function(i, e){
		// 	w_li[i%4].innerHTML += "<i><img src='"+ e +"'/></i>";
		// 	show.innerHTML += "<i><img src='"+ url[i] +"'/></i>";
		// });





		function cancelBubble(e){
			e = e||window.event;
			var delta;
			var delta = e.detail || e.wheelDelta/-40;

			if( !(w_ul.scrollTop === 0 && delta < 0) && !(w_ul.scrollTop + w_ul.clientHeight >= w_ul.scrollHeight - 5 && delta > 0) ){
				if(e.stopPropagation) e.stopPropagation();
				e.cancelBubble = true;
			}
		}

		//将 img/work/ironman/(diffuse|production).jpg 变为 img/work/ironman/diffuse.jpg|img/work/ironman/production.jpg
		function extendUrl(url){
			return url.replace(/^([^\(\)]*)\(([^\(\)]+\|+[^\(\)]+)\)([^\(\)]*)$/g, function(){
				var arg = arguments, temp = arg[2].split('|'), res='';
				for(var i=0, m=temp.length; i<m; i++){
					res += arg[1] + temp[i] + arg[3] + '|';
				}
				return res.replace(/\|*$/g, '')
			});
		}

		//传入一个数组, 返回数组中dom节点高度最小的index
		function shortIndex(arr){
			var minValue = arr[0].offsetHeight, minIndex = 0;
			for(var i=0, m=arr.length; i<m; i++){
				if( minValue > arr[i].offsetHeight ){
					minValue = arr[i].offsetHeight;
					minIndex = i;
				}
			}
			return minIndex;
		}
	})();


	if( !browser.support ){
		var avatarContainer = fn.cls('avatar-container', 'div')[0];
		avatarContainer.getElementsByTagName('svg')[0].style.display = 'none';
		avatarContainer.getElementsByTagName('img')[0].style.opacity = 1;
	}


document.body.ondragstart = function(){ return false; }