//自调用函数 -- 开启一个新的作用域，避免命名冲突
;(function(window, undefined) {
	var position = 'absolute';
	var elements = [];

	function Food(options) {
		options = options || {};
		this.x = options.x || 0;
		this.y = options.y || 0;

		this.width = options.width || 20;
		this.height = options.height || 20;

		this.color = options.color || 'green';
	}

	Food.prototype.render = function(map) {
		remove();

		this.x = Tools.getRandom(0, map.offsetWidth / this.width - 1) * this.width;
		this.y = Tools.getRandom(0, map.offsetHeight / this.height - 1) * this.height;
		//动态创建div 页面上显示的食物
		var div = document.createElement('div');
		map.appendChild(div);

		elements.push(div);
		div.style.position = position;
		div.style.left = this.x + 'px';
		div.style.top = this.y + 'px';
		div.style.width = this.width + 'px';
		div.style.height = this.height + 'px';
		div.style.backgroundColor = this.color;
	}

	function remove() {
		for(var i = elements.length - 1; i >= 0; i--) {
			elements[i].parentNode.removeChild(elements[i]);
			elements.splice(i, 1);
		}
	}
	
	//把Food构造函数放在window对象中,让外部可以访问
	window.Food = Food;
})(window, undefined)

