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

	

	window.fn = new Fn;

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
}(), 


/* move.js
 * @author:flfwzgl https://github.com/flfwzgl
 * @copyright: MIT license */

function(){
  var Move = function(){};

  var curve = Move.prototype = {
    extend: function(obj){
      for(var k in obj){
        if(k in curve){
          try{
            console.warn( k + '已经被修改!');
          } catch(e){}
        }
        curve[k] = (function(moveType){
          return function(){
            return _doMove.call(this, arguments, moveType);
          }
        })(obj[k]);
      }
    }
  }

  var request = window.requestAnimationFrame;
  //兼容setInterval, requestAnimationFrame
  function _move(fn, timer){
    var step;
    try {
      step = function(){
        if(!fn()) timer.id = request(step);
      }
      step();
    } catch(e) {
      timer.id = setInterval(fn, 16);
    }
  }

  //停止动画兼容函数
  function _stopMove(timer){
    try{
      window.cancelAnimationFrame(timer.id);
    } catch(e) {
      clearInterval(timer.id);
    }
  }

  //开始动画函数
  function _doMove(arg, moveType){
    var r, d, fn, fnEnd;

    // 严格限制传入参数, 且传入的参数可以没有顺序
    for(var i = 0; i < 4; i++){
      if(typeof arg[i] === 'object' && !r) r = arg[i];
      else if(typeof arg[i] === 'number' && !d) d = arg[i];
      else if(typeof arg[i] === 'function' && !fn) fn = arg[i];
      else if(typeof arg[i] === 'function' && !fnEnd) fnEnd = arg[i];
    }

    if(!r instanceof Array || !fn) return;

    d = d || 500;

    var from = +new Date, //起始时间
        x = 0,
        y,
        a = r[0],
        b = r[1];

    var timer = 't' + Math.random();

    self = this;

    //用于保存定时器ID的对象, requestAnimation递归调用必须传入对象
    this[timer] = {};


    _move(function(){
      x = (+new Date - from)/d;

      if(x >= 1){
        // 动画结束
        fn(b);
        if(fnEnd) fnEnd();
        return true;
      } else {
        y = moveType(x);
        fn(a + (b - a) * y);
      }
    }, self[timer]);
    
    return function(){
      _stopMove(self[timer]);
      return a + (b - a) * y;
    }
  }

  var PI = Math.PI,
      sin = Math.sin,
      cos = Math.cos,
      pow = Math.pow,
      abs = Math.abs,
      sqrt = Math.sqrt;


  /*****  动画曲线  ******/

  curve.extend({
    //定义域和值域均为[0, 1], 传入自变量x返回对应值y
    //先加速后减速
    ease: function(x){
      // return -0.5*cos(PI * (2 - x)) + 0.5;
      if(x <= 0.5) return 2*x*x;
      else if(x > 0.5) return -2*x*x + 4*x - 1;
    },

    // 初速度为0 ,一直加速
    easeIn: function(x){
      return x*x;
    },

    //先慢慢加速1/3, 然后突然大提速, 最后减速
    ease2: function(x){
      return x < 1/3 ? x*x : -2*x*x + 4*x - 1;
    },

    //初速度较大, 一直减速, 缓冲动画
    easeOut: function(x){
      return pow(x, 0.8);
    },

    //碰撞动画
    collision: function(x){
      var a, b; //a, b代表碰撞点的横坐标
      for(var i = 1, m = 20; i < m; i++){
        a = 1 - (4/3) * pow(0.5, i - 1);
        b = 1 - (4/3) * pow(0.5, i);
        if(x >= a && x <= b ){
          return pow(3*(x - (a + b)/2 ), 2) + 1 - pow(0.25, i - 1);
        }
      }
    },
  
    //弹性动画
    elastic: function(x){
      return -pow(1/12, x) * cos( PI*2.5*x*x ) + 1;
    },

    //匀速动画
    linear: function(x){
      return x;
    },

    //断断续续加速减速
    wave: function(x){
      return (1/12)*sin( 5*PI*x ) + x;
    },
    
    //先向反方向移动一小段距离, 然后正方向移动, 并超过终点一小段, 然后回到终点
    opposite: function(x){
      return (sqrt(2)/2)*sin( (3*PI/2)*(x - 0.5) ) + 0.5;
    }
    
  });

  // move中函数传入如下参数
  // r => 过渡范围, 例如[0, 1000]   (必须传, 且传数组)
  // d => 过渡时间, ms,             (可不传, 默认500)
  // fn => 每一帧的回调函数, 传入当前过渡值v   (必须传)
  // fnEnd => 动画结束时回调               (可不传)
  // 例如: m.ease([0, 1000], 500, function(v){ ... }, fnEnd)
  // 注意: 这些参数的顺序可以打乱!!!
  return new Move;

}()

);





