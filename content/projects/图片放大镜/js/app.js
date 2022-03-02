/**
 * app.js
 * @author Seasand-yyh
 * @date 2019-03-02
 */
function scroll(){
    return {
        top: document.documentElement.scrollTop || document.body.scrollTop,
        left: document.documentElement.scrollLeft || document.body.scrollLeft
    };
}

function page(e){
    return {
        x: e.clientX + scroll().left,
        y: e.clientY + scroll().top
    };
}

window.onload = function() {

	var smallBox = document.getElementById('smallBox');
	var bigBox = document.getElementById('bigBox');
	var mask = document.getElementById('mask');
	var smallImg = smallBox.getElementsByTagName('img')[0];
	var bigImg = bigBox.getElementsByTagName('img')[0];

	smallBox.onmouseenter = function() {
		mask.style.display = 'block';
		bigBox.style.display = 'block';
	};

	smallBox.onmouseleave = function() {
		mask.style.display = 'none';
		bigBox.style.display = 'none';
	};

	smallBox.onmousemove = function(e) {
		e = e || window.event;
		//鼠标当前位置距离smallBox左上角距离.
		var x = page(e).x - smallBox.offsetLeft;
		var y = page(e).y - smallBox.offsetTop;

		//让鼠标在mask中间.
		x = x - mask.offsetWidth/2;
		y = y - mask.offsetHeight/2;

		//限制mask只能在smallBox之内.
		x = x < 0 ? 0 : x;
		y = y < 0 ? 0 : y;

		maxX = smallBox.offsetWidth - mask.offsetWidth;
		maxY = smallBox.offsetHeight - mask.offsetHeight;

		x = x > maxX ? maxX : x;
		y = y > maxY ? maxY : y;

		mask.style.left = x + 'px';
		mask.style.top = y + 'px';

		maxXX = bigImg.offsetWidth - bigBox.offsetWidth;
		maxYY = bigImg.offsetHeight - bigBox.offsetHeight;

		bigImgX = x * (maxXX/maxX);
		bigImgY = y * (maxYY/maxY);

		bigImg.style.left = -bigImgX + 'px';
		bigImg.style.top = -bigImgY + 'px';
	};

};
