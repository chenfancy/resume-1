fn = {
	bind: function(obj, type, fn){
		if(obj.attachEvent) obj.attachEvent('on'+type, function(){ fn.call(obj); });
		else obj.addEventListener(type, fn, false);
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

	move: function(from, to, time, fn, fnEnd){
		if(!fn) return;
		var over = false;
		var interval = 13;
		var total = Math.ceil( time/interval );
		var	t = 0;
		var	va = (to - from)/total;		//平均速度va
		var	v = 0.5*va;					//初速度是0.5倍va
		var	a = (3-0.5)*va/(0.5*total);	//加速度是最大速度3倍va-v0除以时间的一半
		var dis = to - from;
		var d = 0;	//位移
		var res;

		var timer = setInterval(function(){
			t++;
			if( Math.abs(d) < Math.abs(dis/2) ){
				v += a;
				d += v;
				
			}
			else if( Math.abs(d) >= Math.abs(dis/2) && Math.abs(d) <= Math.abs(dis) ){
				v -= a;
				d += v;
			}
			res = from + d;
			if((v > 0 && res > to) || (v < 0 && res < to)) res = to;
			
			fn(res);
			if( t > total || res === to ){
				clearInterval(timer);
				if(fnEnd) fnEnd();
			}
		}, interval);
	}
};

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



