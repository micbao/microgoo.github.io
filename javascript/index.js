(function($) {
	$(document).ready(function() {
		init();
	});
	
	function init() {
		var config = $.getJSON("javascript/config.json");
		console.log(config);
	}
})(jQuery);