/**
 * app.js
 * @author  Seasand-yyh
 * @date  2019-03-27
 */
var app = {

	init: function() {

	},



};


var opt_default = {
	widget_selector: '.gridster-box',
	widget_base_dimensions: portalLayoutConfig.baseDimensions,
	widget_margins: portalLayoutConfig.baseMargins,
	//autogrow_cols: true,
	min_cols: 1,
	max_cols: portalLayoutConfig.maxCols,
	min_rows: 1,
	max_rows: portalLayoutConfig.maxRows,
	//extra_rows: 100,
	autogenerate_stylesheet: true,
	avoid_overlapped_widgets: true,
	shift_widgets_up: true,
	shift_larger_widgets_down: true,
	collision: {
		wait_for_mouseup: true
	},
			
	        resize: {
	            enabled: true,
	            axes: ['x', 'y'],
	            min_size: [4, 1],
	            //max_size: [10, 10],
	            start: function (e, ui, $widget) {
	            	
	            },
	            resize: function (e, ui, $widget) {
	            	portalLayoutConfig.customResizingHandler($widget);
	            },
	            stop: function (e, ui, $widget) { //缩放动作停止，保存布局
	            	portalLayoutConfig.customResizedHandler($widget);
	            	portalLayoutConfig.saveLayout();
	            	if($('#customLayoutInfoId').val()){
	            		portalLayoutConfig.storeLayoutInfo();
	            	}else{
	            		portalLayoutConfig.storeLayoutInfo(function(){
		            		window.location.href = window.location.href;
		            	});
	            	}
	            }
	        },
	        draggable: {
	        	handle: '.dtx_gridster_drag_handler',
	        	stop: function (e, ui) { //拖拽动作停止，保存布局
	        		portalLayoutConfig.removeEmptyAreaAfterDrag(ui);
	        		portalLayoutConfig.customDragHandler(ui);
	        		portalLayoutConfig.saveLayout();
	        		if($('#customLayoutInfoId').val()){
	            		portalLayoutConfig.storeLayoutInfo();
	            	}else{
	            		portalLayoutConfig.storeLayoutInfo(function(){
		            		window.location.href = window.location.href;
		            	});
	            	}
	            }
	        },
	        serialize_params: function($w, wgd) {
	        	var blockId = $w.attr('blockId');
	        	var blockName = $w.attr('blockName');
	        	var blockCode = $w.attr('blockCode');
	        	var blockModuleId = $w.attr('blockModuleId');
	        	var blockColorId = $w.attr('blockColorId');
	        	var blockColorName = $w.attr('blockColorName');
	        	var blockColorCode = $w.attr('blockColorCode');
	        	var blockIsDisabledRemove = $w.attr('blockIsDisabledRemove');
	        	var blockIsDisabledDrag = $w.attr('blockIsDisabledDrag');
	        	var blockIsDisabledResize = $w.attr('blockIsDisabledResize');
	        	var blockDisable = $w.attr('blockDisable');
	        	var blockResourceUrl = $w.attr('blockResourceUrl');
	        	var blockRemark = $w.attr('blockRemark');
	        	var blockIsStop = $w.attr('blockIsStop');
	        	var blockStopRemark = $w.attr('blockStopRemark');
	        	var blockMinSizeX = $w.attr('blockMinSizeX');
	        	var blockMinSizeY = $w.attr('blockMinSizeY');
	        	var blockMaxSizeX = $w.attr('blockMaxSizeX');
	        	var blockMaxSizeY = $w.attr('blockMaxSizeY');
	        	
	        	return {
	        		col: wgd.col, 
	        		row: wgd.row, 
	        		size_x: wgd.size_x, 
	        		size_y: wgd.size_y,
	        		
	        		blockId: blockId,
	        		blockName: blockName,
	        		blockCode: blockCode,
	        		blockModuleId: blockModuleId,
	        		blockColorId: blockColorId,
	        		blockColorName: blockColorName,
	        		blockColorCode: blockColorCode,
	        		blockIsDisabledRemove: blockIsDisabledRemove,
	        		blockIsDisabledDrag: blockIsDisabledDrag,
	        		blockIsDisabledResize: blockIsDisabledResize,
	        		blockDisable: blockDisable,
	        		blockResourceUrl: blockResourceUrl,
	        		blockRemark: blockRemark,
	        		blockIsStop: blockIsStop,
	        		blockStopRemark: blockStopRemark,
	        		blockMinSizeX: blockMinSizeX,
	        		blockMinSizeY: blockMinSizeY,
	        		blockMaxSizeX: blockMaxSizeX,
	        		blockMaxSizeY: blockMaxSizeY
	        	} 
	        }
	    };

