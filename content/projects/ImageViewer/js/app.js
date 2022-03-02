/**
 * app.js
 * @author  Seasand-yyh
 * @date  2019-05-15
 */
var app = {

	imageData: [],

	imagePathPrefix: './repo/',

	currentImageNo: 0,

	init: function() {
		//加载图片数据.
		app.loadImageData();

		//默认加载显示第一张图片.
		app.showImage();

	},

	loadImageData: function() {
		$.ajax({
			type: "get",
			async: false,
			url: './repo/data.json',
			dataType: "json",
			success: function(data) {
				if(data && data.length>0) {
					app.imageData = data;
				}
			}
		});
	},

	showImage: function() {
		//new一个新的Image对象，src指向<img/>的地址，从而可以获取到图片的原始尺寸.
		var image = new Image();
		image.src = app.imagePathPrefix + app.imageData[app.currentImageNo];
		$(image).load(function() {
			$("#imageWidthOrigin").val(image.width);
			$("#imageHeightOrigin").val(image.height);
			app.imageOrigin();
			$("#img").attr('src', image.src);
		});
	},

	goPrev: function() {
		if(app.currentImageNo > 0) {
			app.currentImageNo --;
			app.showImage();
		}
	},

	goNext: function() {
		if(app.currentImageNo < app.imageData.length-1) {
			app.currentImageNo ++;
			app.showImage();
		}
	},

	imageOrigin: function() {
		$("#img").rotate(0);
		$("#angle").val("0"); //角度重置为0.

		//恢复图片原始大小.
		$("#img").width($("#imageWidthOrigin").val());
		$("#img").height($("#imageHeightOrigin").val());

		$("#imageWidthCurrent").val($("#imageWidthOrigin").val());
		$("#imageHeightCurrent").val($("#imageHeightOrigin").val());
	},

	imageScale: function(size) {
		var img = $("#img");
		var oWidth = img.width(); //取得图片的实际宽度.
		var oHeight = img.height(); //取得图片的实际高度.

		var imageWidthCurrent = oWidth + size;
		var imageHeightCurrent = oHeight + size/oWidth*oHeight;
		img.width(imageWidthCurrent);
		img.height(imageHeightCurrent);

		$("#imageWidthCurrent").val(imageWidthCurrent);
		$("#imageHeightCurrent").val(imageHeightCurrent);
	},

	imageRotate: function(angle) {
		var currentAngle = $("#angle").val();
		var totalAngle = parseInt(currentAngle) + parseInt(angle);
		$("#angle").val(totalAngle); //记录旋转的角度.

		$("#img").rotate(totalAngle); //旋转图片.
		$("#img").css('max-height', '100%');
	}

};
