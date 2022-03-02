/**
 * app.js
 * @author  Seasand-yyh
 * @date  2019-03-10
 */
var app = {

	//列表数据缓存.
	listdata: [],

	//初始化.
	init: function() {
		app.initList();
		app.searchList();
	},

	//初始化列表.
	initList: function() {
		app.getListData();
	},

	//加载列表数据.
	getListData: function() {
		$.ajax({
			type: 'get',
			url: 'data/data.json',
			dataType: 'json',
			success: function(data) {
				app.renderList(data);
				app.listdata = data;
			},
			error: function() {
				console.error('Can not load list data!');
			}
		});
	},

	//渲染列表.
	renderList: function(data) {
		var pageURL = window.location.href;
		var baseURL = pageURL.substring(0, pageURL.indexOf('index.html')) + 'projects';
		var str = [];
		data && data.forEach(function(item) {
			var addr = item.external === 1 ? item.path : baseURL + item.path;
			var html = '';
			html += '<li addr="'+addr+'" onclick="app.openListPage(this)">';
			html += '<span class="list-cont-title" title="'+item.title+'">'+item.title+'</span>';
			html += '<span class="list-cont-time" title="'+item.create_date+'">'+item.create_date+'</span>';
			html += '<div class="clearfix"></div>';
			html += '</li>';
			str.push(html);
		});
		$('#list-cont').html(str.join(''));
	},

	//打开新页面.
	openListPage: function(obj) {
		var addr = $(obj).attr('addr');
		addr && window.open(addr);
	},

	//查询.
	searchList: function() {
		$('#search-btn').bind('click', function() {
			app.search();
		});
		$(document).bind('keydown', function(e) {
			if(e.keyCode === 13) {
				app.search();
			}
		});
	},

	//查询.
	search: function() {
		var searchKey = $('#search-key').val();
		if(searchKey) {
			var data = new JsonFilter(app.listdata).filter('title like %'+searchKey+'%').sort('create_date DESC').end();
			app.renderList(data);
		} else {
			app.renderList(app.listdata);
		}
	}

};
