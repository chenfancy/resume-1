/* select.js v0.1.0
 * @author:flfwzgl https://github.com/flfwzgl/fn
 * @copyright: MIT license */

!function(browser, move){
	var win = window,
			doc = win.document,
			body = doc.body,
			html = doc.documentElement;

	var Fn = function(){};

	Fn.prototype = {
		each: function(arr, fn){
			for(var i = 0, m = arr.length; i < m; i++){
				if(fn.call(arr[i], i, arr[i]) === false) return false;
			}
		},

		filter: function(arr, fn){
			var res = [], _this = this;
			this.each(arr, function(i, e){ if(fn.call(_this, i, e)) res.push(e); }); //fn中的this指向F的实例
			return res;
		},

		some: function(arr, fn){
			for(var i = 0, m = arr.length; i < m; i++) if(fn.call(this, i, arr[i])) return true;
			return false;
		},

		every: function(arr, fn){
			for(var i = 0, m = arr.length; i< m; i++) if(!fn.call(this, i, arr[i])) return false;
			return true;
		},

		id: function(id){
			return doc.getElementById(id);
		},

		tag: function(tag, obj){
			return (obj || doc).getElementsByTagName(tag);
		},

		cls: function(cls, p){
			// if(!b.ie || (b.ie && b.v > 8)) return Array.prototype.slice(doc.getElementsByClassName(cls), 0);
			if(typeof p === 'string') p = this.tag(p);
			else if(typeof p === 'object' && object.length){}
			else p = this.tag('*');

			return this.filter(p, function(i, e){
				return this.hasCls(e, cls);
			})
		},

		hasCls: function(obj, cls){
			if(this.isElement(obj) && obj.className && typeof obj.className === 'string' && typeof cls === 'string'){	//svg元素的className是一个对象
				var arr = obj.className.split(/\s+/);
				for(var i = 0, m = arr.length; i < m; i++) if(cls === arr[i]) return true;
			}
			return false;
		},

		isElement: function(obj){
			if(typeof obj === 'object' && (obj.nodeType === 1 || obj.nodeType === 10 )) return true;
			return false;
		},

		bind: function(obj, type, fn){
			if(obj.attachEvent){
				obj.attachEvent('on' + type, function(){
					var ev = window.event;
					fn.call(obj, ev, ev.srcElement);
				});
			} else {
				obj.addEventListener(type, function(ev){
					fn.call(obj, ev, ev.target);
				}, false);
			}
			return this;
		},

		get: function(obj, attr){
			return obj.getAttribute(attr) || '';
		},

		set: function(obj, key, value){
			if(typeof key === 'object') {
				for(var a in key) {
					obj.setAttribute(a, key[a]);
				}
			} else obj.setAttribute(key, value);
		},

		rm: function(attr){
			//删除属性
			return obj.removeAttribute(attr);
		},

		pos: function(obj){
			//返回的对象left和top分别表示obj在整个网页中的位置
			var res = {left: obj.offsetLeft, top: obj.offsetTop};
			while(obj = obj.offsetParent){
				res.left += obj.offsetLeft;
				res.top += obj.offsetTop;
			}
			return res;
		},

		//预加载图片, 传入图片url数组 callback中 index属性是img的src位于urlArr中第几个,  serial属性是img是第几个加载完成的
		img: function(urlArr, fn){
			var oImg=[], n = 0;
			for(var i=0, m=urlArr.length; i<m; i++){
				oImg.push(new Image());
				oImg[i].index = i;
				oImg[i].url = urlArr[i];
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
			str = str || ' ';
			var reg = new RegExp('^' + str + '+|' + str + '+$', 'g' + (ignore===true?'i':''));
			return string.replace(reg, '');
		},

		browser: browser,
		move: move
	}

	

	module.exports = new Fn;

}(

function(){
	//浏览器对象模块
	var ua = window.navigator.userAgent,
			browser = {};

	if( ua.indexOf('Trident') > -1 ){
		browser.ie = true;
		browser.v = ua.indexOf('rv:11')>-1 ? 11 : +ua.replace(/^.+MSIE\s([0-9]+).+$/g, '$1');
	} else if( ua.indexOf('Chrome') > -1 ){
		browser.chrome = true;
		browser.v = +ua.replace(/^.+chrome\/([0-9]+).+$/gi, '$1');
	} else if( ua.indexOf('Firefox/') > -1 ){
		browser.ff = true;
		browser.v = +ua.replace(/^.+firefox\/([0-9]+).+$/gi, '$1');
	}

	if( ua.indexOf('Android') > -1 || ua.indexOf('iPad') > -1 || ua.indexOf('iPhone') > -1 ) browser.mobile = true;
	if( ua.indexOf('Macintosh') > -1 ) browser.mac = true;
	if( browser.ff || (browser.chrome && browser.v > 31) || browser.mac ) browser.support = true;
	if( browser.ie && browser.v < 9 ) browser.old_ie = true;

	return browser;
}()




);





