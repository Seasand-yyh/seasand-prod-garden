/**
 * JsonFilter.js
 * @author Seasand-yyh
 * @date 2019-03-15
 */
;(function(window, undefined) {

	/**
	 * constructor
	 * @param {[Array]} data [array to filter]
	 */
	function JsonFilter(data) {
		this.data = data || [];
	}

	/**
	 * filter
	 * @param  {[String]} str [filter string]
	 */
	JsonFilter.prototype.filter = function(str) {
		var strArr = (str || '').replace(/\s+/g, '|').split('|');
		var filterName = strArr[0];
		var opType = strArr[1];
		var filterValue = strArr[2];

		if(!filterName) {
			throw new Error('无效的过滤条件：缺失过滤字段名称！');
			return this;
		}

		if(!filterValue) {
			throw new Error('无效的过滤条件：缺失比较值！');
			return this;
		}

		var opTypes = ['<', '<=', '=', '!=', '<>', '>=', '>', 'like'];
		if(!(opType && opTypes.indexOf(opType.toLowerCase()) > -1)) {
			throw new Error('无效的过滤条件：比较运算符不存在!');
			return this;
		}

		opType = opType === '=' ? '===' : opType;
		opType = opType === '!=' ? '!==' : opType;
		opType = opType === '<>' ? '!==' : opType;

		var filter;
		if(opType.toLowerCase() === 'like') {
			if(filterValue.startsWith('%') && filterValue.endsWith('%')) {
				filter = function(item) {return item[filterName].indexOf(filterValue.substring(1, filterValue.length-1)) > -1;}
			} else if(filterValue.startsWith('%')) {
				filter = function(item) {return item[filterName].endsWith(filterValue.substring(1));}
			} else if(filterValue.endsWith('%')) {
				filter = function(item) {return item[filterName].startsWith(filterValue.substring(0, filterValue.length-1));}
			} else {
				filter = function(item) {return item[filterName] === filterValue;}
			}
		} else {
			filter = new Function('item', 'return item["'+filterName+'"]  '+opType+'  '+filterValue+';');
		}
		this.data = this.data.filter(filter);
		return this;
	};

	/**
	 * sort
	 * @param  {[String]} str [order by string]
	 */
	JsonFilter.prototype.sort = function(str) {
		var strArr = (str || '').replace(/\s+/g, '|').split('|');
		var sortName = strArr[0];
		var sortType = strArr[1] || 'asc';

		if(sortName) {
			this.data.sort(function(a, b) {
				if(sortType.toLowerCase() === 'desc') {
					return b[sortName] === a[sortName] ? 0 : (b[sortName] > a[sortName] ? 1 : -1);
				} else {
					return a[sortName] === b[sortName] ? 0 : (a[sortName] > b[sortName] ? 1 : -1);
				}
			});
		} else {
			throw new Error('排序字段名称未指定!');
		}
		return this;
	};

	/**
	 * end
	 * @return {[type]} [description]
	 */
	JsonFilter.prototype.end = function() {
		return this.data;
	};

	window.JsonFilter = JsonFilter;

})(window, undefined)
