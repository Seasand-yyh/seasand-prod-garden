/**
 * app.js
 * @author  Seasand-yyh
 * @date  2019-03-18
 */
var app = {

	init: function() {
		this.showIntroduce();
	},

	showIntroduce: function(){
		var intro = introJs();
		intro.setOptions({
			doneLabel2: '知道了',
			exitOnOverlayClick: false, //点击遮罩层时退出.
			steps: [{
				element: '#step_1',
				intro: "<div class='intr-tips'>step 01</div>",
				position: 'bottom'
			},{
				element: '#step_2',
				intro: "<div class='intr-tips'>step 02</div>",
				position: 'top'
			},{
				element: '#step_3',
				intro: "<div class='intr-tips'>step 03</div>",
				position: 'right'
			},{
				element: '#step_4',
				intro: "<div class='intr-tips'>step 04</div>",
				position: 'bottom'
			},{
				element: '#step_5',
				intro: "<div class='intr-tips'>step 05</div>",
				position: 'top'
			}]
		});
		intro.start();
	}

};
