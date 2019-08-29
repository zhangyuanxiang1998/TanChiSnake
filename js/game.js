// 使用自调用函数，创建一个新的局部作用域，防止命名冲突
;(function (window, undefined) {
	var that; //记录游戏对象
	function Game(map) {
		this.food = new Food();
		this.snake = new Snake();
		this.map = map;
		that = this;
	}
	Game.prototype.start = function () {
		//1 把蛇和食物对象，渲染到地图上
		this.food.render(this.map);
		this.snake.render(this.map);
		
		//2 开始游戏的逻辑
		//2.1  让蛇移动起来
		//2.2  当蛇遇到边界游戏结束
		//2.3  通过键盘控制蛇移动的方向
		//2.4  当蛇遇到食物 做相应的处理
		runSnake();
		bindKey();
	}
	
	//2.3  通过键盘控制蛇移动的方向
	function bindKey() {
		document.addEventListener('keydown', function (e) {
			switch (e.keyCode) {
				case 37:
				  that.snake.direction = 'left';
				  break;
				case 38:
				  that.snake.direction = 'top';
				  break;
				case 39:
				  that.snake.direction = 'right';
				  break;
				case 40:
				  that.snake.direction = 'bottom';
				  break;
			}
		}, false);
	}
	
	//私有的函数
	function runSnake() {
		var timerId = setInterval(function () {
			//2.1  让蛇移动起来
			that.snake.move(that.food, that.map);
			that.snake.render(that.map);
			
			//2.2  当蛇遇到边界游戏结束
			//获取蛇头的坐标
			var maxX = that.map.offsetWidth / that.snake.width;
			var maxY = that.map.offsetHeight / that.snake.height;
			var headX = that.snake.body[0].x;
			var headY = that.snake.body[0].y;
			if (headX < 0 || headX >= maxX) {
				alert('Game Over');
				clearInterval(timerId);
			}
			if (headY < 0 || headY >= maxY) {
				alert('Game Over');
				clearInterval(timerId);
			}
		}, 150);	
	}
	
	window.Game = Game;
})(window, undefined)
