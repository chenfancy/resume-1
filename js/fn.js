!function(){
	var fn = {
		bind: function(obj, type, fn){
			if(obj.attachEvent) obj.attachEvent('on'+type, function(){ fn.call(obj); });
			else obj.addEventListener(type, fn, false);
			return this;
		},
		filter:	function(arr, fn){
			for(var i=0, m=arr.length, res=[]; i<m; i++) if( fn.call(arr[i], i, arr[i], arr) ) res.push(arr[i]);
			return res;
		},
		tag: function(tag, obj){
			return typeof obj === "object" ? obj.getElementsByTagName(tag) : document.getElementsByTagName(tag);
		},
		id: function(id){
			return document.getElementById(id);
		},
		cls: function(className, tag){
			if( document.getElementsByClassName ){
				return document.getElementsByClassName(className);
			}
			else{
				var temp = fn.tag(typeof tag === 'string' ? tag : '*');
				return fn.filter(temp, function(i, e){ return fn.hasCls(e, className) ? true : false; });
			}
		},
		each: function(arr, fn){
			for(var i=0, m=arr.length; i<m; i++) fn.call(arr[i], i, arr[i], arr);
		},
		hasCls: function(obj, cls){
			var arr = obj.className.split(/\s+/g);
			for(var i=0, m=arr.length; i<m; i++) if(arr[i] === cls) return true;
			return false;
		},
		get: function(obj, attr){
			return obj.getAttribute(attr);
		},
		set: function(obj, attr, value){
			return obj.setAttribute(attr, value);
		},
		rm: function(attr){
			return obj.removeAttribute(attr);
		},
		position: function(obj){
			var res = {left: obj.offsetLeft, top: obj.offsetTop};
			while(obj = obj.offsetParent){
				res.left += obj.offsetLeft;
				res.top += obj.offsetTop;
			}
			return res;
		},
		//index属性是img的src位于urlArr中第几个,  serial属性是img是第几个加载完成的
		img: function(urlArr, fn){
			var oImg=[], n = 0;
			for(var i=0, m=urlArr.length; i<m; i++){
				oImg.push(new Image());
				oImg[i].index = i;
				oImg[i].src = urlArr[i];
				oImg[i].onload = oImg[i].onerror = function(){
					if(fn){
						this.serial = n++;
						if(n === urlArr.length) fn.call(this, true);
						else fn.call(this, false);					
					}
				}
			}
		},

		trim: function(string, str, ignore){
			str = str||' ';
			var reg = new RegExp('^'+str+'+|'+str+'+$', 'g'+(ignore===true?'i':''));
			return string.replace(reg, '');
		},

		move: function(range, time, fn, fnEnd){
			if(!fn) return;
			var interval = 13,
				from = range[0],
				to = range[1],
				total = Math.ceil(time/interval),	//总次数
				dis = to - from,
				va = dis/total,						//平均速度
				a = va*1.7/(total/2);					//加速度
				
			var v = va*0.3, d = 0, res, t = 0;

			var timer = setInterval(function(){
				t++;
				if( Math.abs(d) < 0.5*Math.abs(dis) ) v += a;
				else if ( Math.abs(d) > 0.5*Math.abs(dis) && Math.abs(d) < Math.abs(dis) ) v -= a;
				d += v;
				res = from + d;
				if( va >= 0 && res >= to || va < 0 && res <= to || t >= total ){
					clearInterval(timer);
					res = to;
					fn(res);
					if(fnEnd) fnEnd();
				}
				else fn(res);
			}, interval);
			return function(){
				clearInterval(timer);
				delete this.stop;
			};
		}
	};
	window.fn = fn;	
}();

(function(){
	var ua = window.navigator.userAgent, browser = {};
	if( ua.indexOf('Trident') > -1 ){
		browser.ie = true;
		browser.version = ua.indexOf('rv:11')>-1 ? 11 : +ua.replace(/^.+MSIE\s([0-9]+).+$/g, '$1');
	}
	else if( ua.indexOf('Chrome') > -1 ){
		browser.chrome = true;
		browser.version = +ua.replace(/^.+chrome\/([0-9]+).+$/gi, '$1');
	}
	else if( ua.indexOf('Firefox/') > -1 ){
		browser.ff = true;
		browser.version = +ua.replace(/^.+firefox\/([0-9]+).+$/gi, '$1');
	}

	if( ua.indexOf('Android') > -1 || ua.indexOf('iPad') > -1 || ua.indexOf('iPhone') > -1 ) browser.mobile = true;
	if( ua.indexOf('Macintosh') > -1 ) browser.mac = true;
	if( browser.ff || (browser.chrome&&browser.version>31) || browser.mobile || browser.mac ) browser.support = true;
	if( browser.ie && browser.version < 10 ) browser.old_ie = true;
	window.browser = browser;
})();



