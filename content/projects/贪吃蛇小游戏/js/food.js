/**
 * food.js
 */
;(function(window, undefined) {
	var _position = 'absolute';
	var elements = [];

	function Food(opt) {
		opt = opt || {};
		this.width = opt.width || 20;
		this.height = opt.height || 20;
		this.x = opt.x || 0;
		this.y = opt.y || 0;
		this.color = opt.color || 'yellow';
	}

	Food.prototype.render = function(map) {
		if(!map) return;
		remove();

		this.x = Common.random(0, map.offsetWidth / this.width - 1) * this.width;
		this.y = Common.random(0, map.offsetHeight / this.height - 1) * this.height;

		var div = document.createElement('div');
		div.style.position = _position;
		div.style.left = this.x + 'px';
		div.style.top = this.y + 'px';
		div.style.width = this.width + 'px';
		div.style.height = this.height + 'px';
		div.style.backgroundColor = this.color;
		map.appendChild(div);

		elements.push(div);
	};

	function remove() {
		for(var i = elements.length - 1; i >= 0; i--) {
			elements[i].parentNode.removeChild(elements[i]);
			elements.splice(i, 1);
		}
	}

	window.Food = Food;

})(window, undefined)
