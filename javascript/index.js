(function($) {
	var urlHash = {
		'doc': './doc/index.html',
		'demo': './demo/index.html',
		'download': './download.html',
		'about': './about.html'
	}

	$(document).ready(function() {
		init();
	});
	function getViewport() {
		return {
			width: document.documentElement.clientWidth || window.innerWidth,
			height: document.documentElement.clientHeight || window.innerHeight
		}
	}

	function resize() {
		var vp = getViewport();
		$("#doc").css('height', Math.max(400, vp.height) + 'px');
		//$ifm.height = vp.height;
	}

	function init() {
		resize();
		$(window).on("resize",resize)
		//var hash=(location.hash || '#home').substr(1);
		$.getJSON("javascript/database/module.json",function(data, textStatus, jqXHR){
			console.log(data);
		});
	}
})(jQuery);	