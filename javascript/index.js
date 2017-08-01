(function($) {
	var database;

	$(document).ready(function() {
		init();
	});

	function init() {
		$.getJSON("javascript/config.json", function(config, textStatus, jqXHR) {
			console.log(config);
			
			$.indexedDB("BookShop1", {
			    "schema": {
			        2: function(v) {
			            var objectStore = v.createObjectStore("BookList", {
			                "keyPath": "id",
			                "autoIncrement": true
			            });
			            objectStore.createIndex("price");
			            console.info("Created new object store");
			        }
			    }
			}).then(console.info, console.error);
			
			
			
			
			var request = window.indexedDB.open("BookShop1");
			request.onsuccess = function(event) {
				var db = request.result;
				var req = db.setVersion((isNaN(parseInt(db.version, 10)) ? 0 : parseInt(db.version, 10) + 1));
				req.onsuccess = function() {
					var transaction = req.result;
					var objectStore = transaction.db.createObjectStore("BookList", {
						"keyPath": "id",
						"autoIncrement": true
					});
					objectStore.createIndex("price");
					console.info(objectStore);
				};
				req.onerror = function(e) {
					console.error(e, req);
				};
			};
			request.onerror = function(e) {
				console.error(e, request);
			};
		});
	}
})(jQuery);