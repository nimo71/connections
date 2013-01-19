window.application = window.application || {};
window.application.touch = window.application.touch || {};

(function(touch, $) {
	
	document.addEventListener('touchstart', function(e) {
		e.preventDefault();
		var touch = e.touches[0];
		alert("touchstart: "+ touch.pageX + " - " + touch.pageY);
	}, false);
	
	document.addEventListener('touchmove', function(e) {
		e.preventDefault();
		var touch = e.touches[0];
		alert("touchmove: "+ touch.pageX + " - " + touch.pageY);
	}, false);
	
	document.addEventListener('touchend', function(e) {
		e.preventDefault();
		var touch = e.touches[0];
		alert("touchend: "+ touch.pageX + " - " + touch.pageY);
	}, false);
	
	document.addEventListener('touchcancel', function(e) {
		e.preventDefault();
		var touch = e.touches[0];
		alert("touchcancel: "+ touch.pageX + " - " + touch.pageY);
	}, false);
	
} (window.application.touch, jQuery));

