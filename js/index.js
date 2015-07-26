
window.onload = function(){
	(function(){
		//旋转, 初始化
		var cube = fn.id("cube"),
			face = fn.filter(cube.childNodes, function(i, e){ return e.nodeType === 1 ? true : false; }),
			nav = fn.id("nav"),
			navLi = fn.tag("li", nav);
			//arrow = fn.cls("arrow", "div");

		var page = ['home', 'ability', 'project', '3D_work', 'info'],
			paramArr = window.location.href.split('#!'),
			param = paramArr[1];

		var n = face.length, i=0;

		
		cube.unit = -360/n,								//每次旋转变化的角度
		cube.cur = Math.max( 0, inArr(param, page) ),	//设置当前页,如果没有参数则默认首页
		cube.a = cube.unit*cube.cur,					//要旋转到的角度
		cube.time = 0.3*n;


		//根据face数量的不同, 设置旋转时间
		cube.style.webkitTransitionDuration = cube.time+"s";
		cube.style.transitionDuration = cube.time+"s";	
		
		adjust();
		changeUrl({url:paramArr[0]+ '#!' +page[cube.cur], cur:cube.cur});

		//动态添加nav, 并设置位置,class, 添加click事件
		nav.innerHTML = (function(){
			for(var i=0, temp=''; i<n; i++) temp+='<li></li>';
			return temp;
		})();
		nav.style.cssText = "left:"+(cube.width-nav.offsetWidth)/2+"px; top:"+(cube.height-20)+"px";
		navLi[cube.cur].className = "active";


		for(i=0; i<n; i++){
			navLi[i].index = i;
			fn.bind(navLi[i], "click", function(){
				changePage(cube.cur = this.index);
				changeUrl({url:paramArr[0]+ '#!' +page[cube.cur], cur:cube.cur});
			});
		}

		//设置翻页事件
		fn.bind(cube, "mousewheel", wheel);
		fn.bind(cube, "DOMMouseScroll", wheel);
		fn.bind(document, "keydown", wheel);

		fn.bind(window, "resize", function(){
			adjust();
			nav.style.cssText = "left:"+(cube.width-nav.offsetWidth)/2+"px; top:"+(cube.height-20)+"px";
		});

		//点击前进后退触发事件处理程序
		fn.bind(window, 'popstate', function(e){
			var state = e.state;
			changePage(cube.cur=state.cur);
		});

		//让cube自适应
		function adjust(){
			cube.width = window.innerWidth;
			cube.height = window.innerHeight;
			cube.d = (cube.width/2)/Math.tan(Math.PI/n);

			transform(cube, "translate3d(0, 0, "+(-cube.d)+"px) rotateY("+cube.a+"deg)");

			fn.each(face, function(i, e){
				transform(e, "rotateY("+ i*360/n +"deg) translate3d(0, 0, "+cube.d+"px)");
			});

			if(browser.mobile) fn.cls('skill_des')[0].style.width = '100%';

		}

		//滚滑轮和点击方向键执行函数
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
			
			changeUrl({url:paramArr[0]+ '#!' +page[cube.cur], cur:cube.cur});
			
		}

		//统一兼容行处理函数
		function transform(obj, value){
			obj.style.webkitTransform = value;
			obj.style.transform = value;
		}

		//修改当前页, 传入目标页
		function changePage(page){
			cube.cur = page = page<0 ? (page%n+n) : page%n;
			cube.a = page*cube.unit;
			cube.style.webkitTransform = "translate3d(0, 0, "+ (-cube.d)+"px) rotateY("+cube.a+"deg)";
			cube.style.transform = "translate3d(0, 0, "+ (-cube.d)+"px) rotateY("+cube.a+"deg)";

			for(i=0; i<n; i++) navLi[i].className = i===page ? 'active' : '';	
		}

		function changeUrl(state){
			state.url = state.url||window.location.href;
			state.title = state.title||document.title;
			window.history.pushState(state, state.title, state.url);
		}

		function inArr(v, arr){
			for(var i=0, m=arr.length; i<m; i++) if(arr[i] === v) return i;
			return -1;
		}

	})();





	(function(){
		//技能页
		var skill_chart = fn.cls('skill_chart')[0],
			I = fn.tag('i', skill_chart),
			skill_icon = fn.filter(I, function(i, e){ return e.parentNode.nodeName==="LI" ? true : false; }),
			skill_score = fn.filter(I, function(i, e){ return e.parentNode.nodeName==="DIV" ? true : false; });

		for(var i=0, m=skill_icon.length; i<m; i++){
			// skill_icon[i].style.backgroundPosition = "0px "+ i*-40 +"px";
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

		var url = ['img/work/1/3.jpg', 
				   'img/work/2/3.jpg', 
				   'img/work/3/3.jpg',
				   'img/work/4/3.jpg',
				   'img/work/5/3.jpg'];

		
		fn.bind(w_ul, 'mousewheel', cancelBubble);
		fn.bind(w_ul, 'DOMMouseScroll', cancelBubble);

		//先加载外面显示的图片,,等全部加载完成之后才加载其他图片
		fn.img(url, function(over){
			//如果是前几张就按照顺序排列, 第二行就按照哪个短排列哪个
			w_li[shortIndex(w_li)].innerHTML += "<i><img n="+this.serial+" src='"+ this.src +"'/></i>";

			show.innerHTML += "<i><img src='"+ this.src +"'/></i>";

			if(over){
				//首页图片加载完成之后再加载其他图片, 然后设置事件
				otherImg(url);
				fn.each(w_img, function(i, e){
					fn.bind(e, 'click', function(){
						//将n得到, n代表第几个加载完成,从0开始
						var num = +fn.get(this, 'n');
						show.style.display = 'block';
						show.scrollTop = fn.position(showImg[num]).top-30;
					});

					fn.bind(showImg[i], 'click', cancelBubble);
					fn.bind(showImg[i], 'mousemove', function(e){
						e = e||window.event;
						var n = Math.ceil( (e.clientX - fn.position(this).left)*3/this.offsetWidth );
						n = Math.max(1, Math.min(3, n));
						this.src = this.src.replace(/^(.+\/)[0-9]+(\.[^\.]+)$/g, function(){
							return arguments[1] + n + arguments[2];
						});
					});
				});
			}
		});



		fn.bind(show, 'click', function(){
			show.style.display = 'none';
		});


		function cancelBubble(e){
			e = e||window.event;
			var delta;
			var delta = e.detail || e.wheelDelta/-40;

			if( !(w_ul.scrollTop === 0 && delta < 0) && !(w_ul.scrollTop + w_ul.clientHeight >= w_ul.scrollHeight - 5 && delta > 0) ){
				if(e.stopPropagation) e.stopPropagation();
				e.cancelBubble = true;
			}
		}

		function otherImg(arr){
			var other = [], temp;
			for(var i=0, m=arr.length; i<m; i++){
				temp = arr[i].split('3.');
				other.push( temp.join('1.') );
				other.push( temp.join('2.') );
			}
			fn.img(other);
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


	if( browser.support ){
		fn.img([bgUrl], function(over){
			if(over){
				var bg = document.createElement('img');
				bg.src = this.src;
				bg.style.cssText = 'position:absolute; opacity:0;';
				fn.id('stage').insertBefore(bg, fn.id('stage').firstChild);

				setTimeout(function(){
					bg.style.cssText = 'position:absolute; opacity:1; -webkit-transition-duration:1s; -moz-transition-duration:1s'
				}, 100);
			}
		});

		fn.img(['img/me.png'], function(over){
			if(over){
				var avatarContainer = fn.cls('avatar-container', 'div')[0];
				var svg = avatarContainer.getElementsByTagName('svg')[0];
				var path = svg.getElementsByTagName('path');
				var avatar = avatarContainer.getElementsByTagName('img')[0];

				fn.move(2100, 950, 12000, function(v){
					fn.each(path, function(i, e){
						e.style.strokeDashoffset = v;	
					});
				}, function(){
					fn.move(1, 0, 1000, function(v){
						svg.style.opacity = v;
					}, function(){
						svg.parentNode.removeChild(svg);
					})
					fn.move(0, 1, 2000, function(v){
						avatar.style.opacity = v;
					})
				})
			}
		});
	}

	document.body.ondragstart = function(){ return false; }

}