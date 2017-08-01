(function($) {
	$(document).ready(function() {
		init();
	});
	
	function init() {
		$.getJSON("javascript/config.json",function(config, textStatus, jqXHR){
			console.log(config);
		});
	}
})(jQuery);