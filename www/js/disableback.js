$(document).ready(function() {

	$(document).bind("deviceready", function() {
					document.addEventListener("backbutton", function() {
						console.log("Disabled Back button");
					});
				});

});