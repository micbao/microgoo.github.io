(function($) {
	$(document).ready(function() {
		init();

		$.indexedDB("databaseName", {
			"schema": {
				"1": function(versionTransaction) {
					versionTransaction.createObjectStore("objectStore1");
				},
				"2": function(versionTransaction) {
					versionTransaction.createObjectStore("objectStore2");
				}
			}
		}).transaction(["objectStore1", "objectStore2"]).then(function() {
			log("Transaction completed");
		}, function() {
			log("Transaction aborted");
		}, function(t) {
			log("Transaction in progress");
			t.objectStore("objectStore1").add({
				"valueProp": "val",
				"anotherProp": 2
			}, 1).then(function() {
				log("Data added");
			}, function() {
				log("Error adding data");
			});
		});
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
		$(window).on("resize", resize)
		//var hash=(location.hash || '#home').substr(1);
		$.getJSON("javascript/database/module.json", function(data, textStatus, jqXHR) {
			var content = $("#nav-ul");
			$.each(data, function(i, o) {
				var item = $("<li data-key=" + o.data + "><a href='javascript:void(0)'>" + o.name + "</a></li>")
				content.append(item);
			});
		});
	}
})(jQuery);