
window.onload = function(){
	(function(){
		//旋转, 初始化
		var stage = fn.id('stage'),
			cube = fn.id("cube"),
			face = fn.filter(cube.childNodes, function(i, e){ return e.nodeType === 1 ? true : false; }),
			nav = fn.id("nav"),
			navLi = fn.tag("li", nav);
			//arrow = fn.cls("arrow", "div");

		var page = ['home', 'ability', 'my-own-projects', '3d-works', 'info'],
				paramArr = window.location.href.split('#!'),
				param = paramArr[1];

		var n = face.length, i=0;

		
		cube.unit = -360/n,								//每次旋转变化的角度
		cube.cur = cube.old = Math.max( 0, page.indexOf(param) ),	//设置当前页,如果没有参数则默认首页
		cube.a = cube.unit*cube.cur,					//要旋转到的角度
		cube.time = 0.3*n;


		//根据face数量的不同, 设置旋转时间
		cube.style.webkitTransitionDuration = cube.time+"s";
		cube.style.transitionDuration = cube.time+"s";
		
		adjust();
		// changeUrl({url:paramArr[0]+ '#!' +page[cube.cur], cur:cube.cur});

		//动态添加nav, 并设置位置,class, 添加click事件
		nav.innerHTML = (function(){
			for(var i=0, temp=''; i<n; i++) temp+='<li></li>';
			return temp;
		})();
		navLi[cube.cur].className = "active";


		for(i=0; i<n; i++){
			navLi[i].index = i;
			fn.bind(navLi[i], "click", function(){
				changePage(cube.cur = this.index);
				location.hash = '#!' + page[cube.cur];
				// changeUrl({url:paramArr[0]+ '#!' +page[cube.cur], cur:cube.cur});
			});
		}

		//设置翻页事件
		fn.bind(stage, "mousewheel", wheel)
			.bind(stage, "DOMMouseScroll", wheel)
			.bind(document, "keydown", wheel)
			.bind(window, "resize", function(){
				adjust();
			})
			//点击前进后退触发事件处理程序
			// .bind(window, 'popstate', function(e){
			// 	var state = e.state;
			// 	changePage(cube.cur=state.cur);
			// 	e = null;
			// })
			.bind(window, 'hashchange', function() {
				var n = page.indexOf(location.hash.replace(/^#!/g, ''));
				if( n > -1 ){
					changePage(n);
				}
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

			if(fn.browser.mobile) fn.cls('skill_des')[0].style.width = '100%';

		}

		//滚滑轮和点击方向键执行函数
		function wheel(e){
			e = e || window.event;
			var delta;
			if(e.detail) delta = e.detail;
			else if(e.wheelDelta) delta = e.wheelDelta/-40;
			else if(e.keyCode){
				if(e.keyCode === 37 || e.keyCode === 38) delta = -3;
				else if(e.keyCode === 39 || e.keyCode === 40) delta = 3;
			} 

			if(cube.running === true) return;	//防止滑轮滚动的时候乱窜
			cube.running = true;
			setTimeout(function(){
				cube.running = false;
			}, cube.time*1000);

			if(delta>0) changePage(++cube.cur);
			else if(delta<0) changePage(--cube.cur);
			
			location.hash = '#!' + page[cube.cur];
			// changeUrl({url:paramArr[0]+ '#!' +page[cube.cur], cur:cube.cur});
			e = null;
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

		// function changeUrl(state){
		// 	state.url = state.url||window.location.href;
		// 	state.title = state.title||document.title;
		// 	window.history.pushState(state, state.title, state.url);
		// }

		// function inArr(v, arr){
		// 	for(var i=0, m=arr.length; i<m; i++) if(arr[i] === v) return i;
		// 	return -1;
		// }

	})();





/*	(function(){
		//技能页
		var skill_chart = fn.cls('skill_chart')[0],
				I = fn.tag('i', skill_chart),
				skill_icon = fn.filter(I, function(i, e){ return e.parentNode.nodeName==="LI"; }),
				skill_score = fn.filter(I, function(i, e){ return e.parentNode.nodeName==="DIV"; });

		for(var i=0, m=skill_icon.length; i<m; i++){
			// skill_icon[i].style.backgroundPosition = "0px "+ i*-40 +"px";
			skill_score[i].style.width = +fn.get(skill_icon[i], 'k').split('-')[1] + "%";
		}
	})();*/



	var me_url = fn.browser.mac ? 'img/wo.mac.png' : 'img/wo.png';
	if( fn.browser.support ){
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

		fn.img([config.base + me_url], function(over){
			if(over){
				var avatarContainer = fn.cls('avatar-container', 'div')[0];
				var svg = avatarContainer.getElementsByTagName('svg')[0];
				var path = svg.getElementsByTagName('path');
				var avatar = document.createElement('img');
				avatar.src = this.src;
				avatar.style.opacity = 0;
				avatarContainer.appendChild(avatar);

				fn.move.ease([2100, 1200], 6000, function(v){
					fn.each(path, function(i, e){
						e.style.strokeDashoffset = v;	
					});
				}, function(){
					fn.move.ease([1, 0], 1000, function(v){
						svg.style.opacity = v;
					}, function(){
						svg.parentNode.removeChild(svg);
					});
					fn.move.ease([0, 1], 2000, function(v){
						avatar.style.opacity = v;
					})
				})
			}
		});
	}

	(function(){
		//3d作品展示
		var w_ul = fn.cls('w_ul', 'ul')[0],
				w_li = fn.tag('li', w_ul),
				w_img = fn.tag('img', w_ul);

		var show = fn.id('show'),
				itag = fn.tag('i', show);
				showImg = fn.tag('img', show),
				temp = '';

		var url = ['img/work/watch/(frame|viewport|comp).jpg', 
								'img/work/einstein/(sculpt|frame|rim|comp).jpg', 
								'img/work/ironman/(frame|occ|rim|sp|comp).jpg',
								'img/work/snail/(frame|occ|comp).jpg',
								'img/work/policeman/(frame|comp).jpg',
								'img/work/tiger/comp.jpg',
						 		'img/work/bmw/comp.jpg',
						 		'img/work/lowpoly/comp.jpg',
						 		'img/work/5s/(frame|edge|wip|comp|comp2|comp3).jpg'
							];
		var loadAllUrl = [];
		var allUrl = (function(){
			for(var i = 0, m = url.length, res = []; i < m; i++){
				res.push( extendUrl(config.base + url[i]).split('|') );
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
				var o = e.target;
				if(o.tagName === 'IMG'){
					//将n得到, n代表第几个加载完成,从0开始, i代表在url中位于第几个
					var num = +o.dataset.serial;
					if(!(num < +Infinity)) return;	//防止num为NaN出错

					show.style.backgroundImage = 'url(../img/close.png)';
					show.style.display = 'block';
					show.scrollTop = fn.pos(itag[num]).top - 30;	
				}
			})
			.bind(show, 'mousemove', function(e){
				var o = e.target;
				if( o.tagName === 'IMG'){
					var serial = +o.parentNode.dataset.serial;
					if(!(serial < +Infinity)) return;

					var imgs = fn.tag('*', o.parentNode);
					// if(imgs.length < loadAllUrl[serial].length) return;
				  // var n = Math.floor( (e.clientX - fn.pos(o).left)*loadAllUrl[serial].length/o.offsetWidth );
				  var n = Math.floor( (e.clientX - fn.pos(o).left)*imgs.length/o.offsetWidth );
					n = Math.max(0, Math.min(loadAllUrl[serial].length - 1, n));
					if(o.parentNode.n !== n) {
						//切换图片
						o.parentNode.n = n;
						fn.each(imgs, function(i, e){
							e.style.display = i == n ? 'block' : 'none';
						});
					}
				}
				e = null;
			})
			.bind(show, 'click', function(e){
				if(this === e.target) show.style.display = 'none';
			});

		//先加载外面显示的图片,,等全部加载完成之后才加载其他图片
		fn.img(coverUrl, function(over){
			loadAllUrl.push(allUrl[this.index]);	//将allUrl按cover的加载顺序重排
			//如果是前几张就按照顺序排列, 第二行就按照哪个短排列哪个
			w_li[shortIndex(w_li)].innerHTML += [
				'<i>',
					'<img data-serial="', this.serial,'" src="', this.src, '"/>',
				'</i>'
			].join('');

			show.innerHTML += [
				'<i data-serial="', this.serial, '">',
					'<img src="', this.url, '" data-no="', (allUrl[this.index].length-1), '"/>',
				'</i>'
			].join('');

			//封面图片加载完成之后
			if(over) {
				fn.img(Array.prototype.concat.apply([], allUrl), function(over){
					//当前加载完的图片必须不是coverUrl中的, coverUrl上面已经加载完成了, 避免重复添加img
					if( coverUrl.indexOf(this.url) === -1 ) {
						var m, n;
						var pos = matrixPos(this.url, loadAllUrl);
						if(m = pos[0], n = pos[1], pos){
							var I = itag[m];
							var imgs = fn.tag('img', I);

							var img = document.createElement('img');
							img.style.display = 'none';
							img.src = this.url;
							fn.set(img, {
								no: n
							});

							//让所有图片根据no的顺序排列在i标签中, no是url中同一个文件夹类图片的顺序
							for(var i = 0, m = imgs.length; i < m; i++) {
								if(n < imgs[i].dataset.no) {
									I.insertBefore(img, imgs[i]);
									break;
								}
							}						
						}
					}
				});
			}
		});

		//得到元素在二维数组中的位置
		function matrixPos(e, matrix) {
			for(var i = 0, m = matrix.length, tmp; i < m; i++) {
				tmp = matrix[i].indexOf(e);
				if( tmp >= 0 ) return [i, tmp];
			}
			return null;
		}

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

		//a 是否包裹 b
		function isWrap(a, b){
			while(b){
				if( b === a ) return true;
				b = b.parentNode;
			}
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
	
	document.body.ondragstart = function(){ return false; }

}