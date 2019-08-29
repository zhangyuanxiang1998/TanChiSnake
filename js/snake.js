// 自调用函数，开启一个新的局部作用域，防止命名冲突
;(function (window, undefined) {
	var position = 'absolute';
	//记录之前创建的蛇
	var elments = [];
	function Snake(options) {
		options = options || {};
		//蛇节的大小
		this.width = options.width || 20;
		this.height = options.height || 20;
		//蛇移动的方向
		this.direction = options.direction || 'right';
		//蛇的身体 (蛇节) 第一个元素是蛇头
		
		this.body = [
		   {x: 3, y: 2, color: 'red'},
		   {x: 2, y: 2, color: 'blue'},
		   {x: 1, y: 2, color: 'blue'}
		];
	}
	
	Snake.prototype.render = function (map) {
		//删除之前创建的蛇
		remove();
		
		for (var i = 0, len = this.body.length; i < len; i++) {
			//蛇节
			var object = this.body[i];
			var div = document.createElement('div');
			map.appendChild(div);
			//记录当前蛇
			elments.push(div);
			
			div.style.position = position;
			div.style.width = this.width + 'px';
			div.style.height = this.height + 'px';
			div.style.left = object.x * this.width + 'px';
			div.style.top = object.y * this.height + 'px';
			div.style.backgroundColor = object.color;
		}
	}
	//私有的成员
	function remove() {
		for (var i = elments.length - 1; i >= 0; i--) {
			elments[i].parentNode.removeChild(elments[i]);
			elments.splice(i, 1);
		}
	}
	
	//控制蛇的移动
	Snake.prototype.move = function (food, map) {
		//控制蛇的身体移动（当前蛇节到上一个蛇节的位置）
		for (var i = this.body.length - 1; i > 0; i--) {
			this.body[i].x = this.body[i - 1].x;
			this.body[i].y = this.body[i - 1].y;
		}
		//控制蛇头的移动
		var head = this.body[0];
		switch (this.direction) {
			case 'right':
			   head.x += 1;
			   break;
			case 'left':
			   head.x -= 1;
			   break;
			case 'top':
			   head.y -= 1;
			   break;
			case 'bottom':
			   head.y += 1;
			   break;
		}
		//2.4 判断蛇头是否和食物的坐标重合
		var headX = head.x * this.width;
		var headY = head.y * this.height;
		if (headX === food.x && headY === food.y) {
			//让蛇增加一节
			var last = this.body[this.body.length - 1];
			this.body.push({
				x: last.x,
				y: last.y,
				color: last.color
			});
			//随机在地图上
			food.render(map);
		}
	}
	
	window.Snake = Snake;
})(window, undefined)

