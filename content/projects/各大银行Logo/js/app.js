/**
 * app.js
 * @author  Seasand-yyh
 * @date  2020-05-07
 */
var app = {

	init: function() {
		app.loadData();
	},

	//加载数据.
	loadData: function() {
		$.ajax({
			type: 'get',
			url: './data/data.json',
			dataType: 'json',
			success: function(data) {
				app.render(data);
			},
			error: function() {
				console.error('Can not load list data!');
			}
		});
	},

	//渲染列表.
	render: function(datalist) {
		if(!datalist) return;
		var html = [];
		for(var i = 0; i < datalist.length; i++) {
			var data = datalist[i];
			var str = '';
			str += '<div class="img">';
	    str += '  <img title="'+data.title+'" alt="'+data.title+'" src="./images/'+data.path+'" />';
	    str += '  <div class="text">'+data.title+'</div>';
	    str += '</div>';
	    html.push(str);
		}
		$('#imgWrapper').html(html.join(''));
	}

};
