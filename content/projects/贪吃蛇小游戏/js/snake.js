/**
 * snake.js
 */
;(function(window, undefined) {
	var _position = 'absolute';
	var elements = [];

	function Snake(opt) {
		opt = opt || {};
		this.width = opt.width || 20;
		this.height = opt.height || 20;
		this.dir = opt.dir || 'right';
		this.body = [
			{x: 3, y: 2, color: 'red'},
			{x: 2, y: 2, color: 'blue'},
			{x: 1, y: 2, color: 'blue'},
		];
	}

	Snake.prototype.render = function(map) {
		if(!map) return;
		remove();

		var that = this;
		this.body.forEach(function(item) {
			var div = document.createElement('div');
			div.style.position = _position;
			div.style.width = that.width + 'px';
			div.style.height = that.height + 'px';
			div.style.left = item.x * that.width + 'px';
			div.style.top = item.y * that.height + 'px';
			div.style.backgroundColor = item.color;
			map.appendChild(div);

			elements.push(div);
		});
	};

	Snake.prototype.move = function(map, food) {
		//移动蛇身，从后往前移动.
		for(var i = this.body.length - 1; i > 0; i--) {
			this.body[i].x = this.body[i-1].x;
			this.body[i].y = this.body[i-1].y;
		}
		//移动蛇头.
		switch(this.dir) {
			case 'right':
				this.body[0].x += 1;
				break;
			case 'left':
				this.body[0].x -= 1;
				break;
			case 'top':
				this.body[0].y -= 1;
				break;
			case 'bottom':
				this.body[0].y += 1;
				break;
		}

		var headX = this.body[0].x * this.width;
		var headY = this.body[0].y * this.height;
		if(headX === food.x && headY === food.y) {
			//snake长一节.
			var tail = this.body[this.body.length - 1];
			this.body.push({
				x: tail.x,
				y: tail.y,
				color: tail.color
			});

			//重新生成food.
			food.render(map);
		}
	};

	function remove() {
		for(var i = elements.length - 1; i >= 0; i--) {
			elements[i].parentNode.removeChild(elements[i]);
			elements.splice(i, 1);
		}
	}

	window.Snake = Snake;

})(window, undefined)
