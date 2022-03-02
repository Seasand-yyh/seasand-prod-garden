/**
 * game.js
 */
;(function(window, undefined) {
	var timerId = null;
	var that;

	function Game(map) {
		this.map = map;
		this.food = new Food();
		this.snake = new Snake();
		that = this;

		this.food.render(map);
		this.snake.render(map);
	}

	Game.prototype.start = function() {
		runSnake();
		bindKey();
	};

	Game.prototype.pause = function() {
		clearInterval(timerId);
	};

	function runSnake() {
		timerId = setInterval(function() {
			that.snake.move(that.map, that.food);
			that.snake.render(that.map);

			var maxX = that.map.offsetWidth / that.snake.width;
			var maxY = that.map.offsetHeight / that.snake.height;
			var headX = that.snake.body[0].x;
			var headY = that.snake.body[0].y;
			if(headX < 0 || headX >= maxX || headY < 0 || headY >= maxY) {
				clearInterval(timerId);
				alert('Game Over!!!');
			}

			for(var i = that.snake.body.length - 1; i > 0; i--) {
				if(headX === that.snake.body[i].x && headY === that.snake.body[i].y) {
					clearInterval(timerId);
					alert('Game Over!!!');
					return;
				}
			}
		}, 150);
	}

	function bindKey() {
		document.addEventListener('keydown', function(e) {
			e = e || event;
			var code = e.keyCode;
			if((code == 37 || code == 65) && that.snake.dir !== 'right') {
				that.snake.dir = 'left';
			} else if((code == 39 || code == 68) && that.snake.dir !== 'left') {
				that.snake.dir = 'right';
			} else if((code == 38 || code == 87) && that.snake.dir !== 'bottom') {
				that.snake.dir = 'top';
			} else if((code == 40 || code == 83) && that.snake.dir !== 'top') {
				that.snake.dir = 'bottom';
			}
		}, false);
	}

	window.Game = Game;

})(window, undefined)
